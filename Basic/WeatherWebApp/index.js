
const http = require('http');
const server = http.createServer()

const fs = require('fs')
const homeFile = fs.readFileSync(`${__dirname}/home.html`, 'utf-8')

const port = process.env.PORT || 8000;

function fetchIpAddress() {
    return new Promise((resolve, reject) => {
        const ipApiOptions = {
            host: 'api.ipify.org',
            path: '/',
            method: 'GET'
        };

        const ipApiRequest = http.request(ipApiOptions, (response) => {
            let ipAddress = '';
            response.on('data', (chunk) => {
                ipAddress += chunk;
            });

            response.on('end', () => {
                resolve(ipAddress);
            });
        });

        ipApiRequest.on('error', (error) => {
            reject(error);
        });

        ipApiRequest.end();
    });
}


function fetchCityName(ipAddress) {
    return new Promise((resolve, reject) => {
        const geoApiOptions = {
            host: 'ip-api.com',
            path: `/json/${ipAddress}`,
            method: 'GET'
        };

        const geoRequest = http.request(geoApiOptions, (response) => {
            let geoData = '';
            response.on('data', (chunk) => {
                geoData += chunk;
            });

            response.on('end', () => {
                const city = JSON.parse(geoData).city || 'Unknown';
                resolve(city);
            });
        });

        geoRequest.on('error', (error) => {
            reject(error);
        });

        geoRequest.end();
    });
}


const replaceValues = (values, htmlFile) => {
    let weatherDetails = htmlFile.replace('{%temperatureValue%}', values.main.temp)
    weatherDetails = weatherDetails.replace('{%temperatureMinValue%}', values.main.temp_min)
    weatherDetails = weatherDetails.replace('{%temperatureMaxValue%}', values.main.temp_max)
    weatherDetails = weatherDetails.replace('{%location%}', values.name)
    weatherDetails = weatherDetails.replace('{%country%}', values.sys.country)
    weatherDetails = weatherDetails.replace('{%weatherStatus%}', values.weather[0].main)
    weatherDetails = weatherDetails.replace('{%humidity%}', values.main.humidity)
    weatherDetails = weatherDetails.replace('{%windSpeed%}', values.wind.speed)

    return weatherDetails
}

server.on('request', async (request, response) => {

    const ipAddress = await fetchIpAddress();
    const cityName = await fetchCityName(ipAddress);

    if (request.url === '/') {

        const weatherApiOptions = {
            hostname: 'api.openweathermap.org',
            path: `/data/2.5/weather?q=${cityName}&appid=d19409cae10007fd2eff2d4be3407fa6&units=metric`,
            method: 'GET',
        };

        const apiWeatherRequest = http.request(weatherApiOptions, (apiResponse) => {

            let apiData = '';

            apiResponse.on('data', (chunk) => {
                apiData += chunk;
            });

            apiResponse.on('end', () => {

                let apiDataObject = JSON.parse(apiData)
                let apiDataArrayObject = [apiDataObject]
                let homeHtmlPage = apiDataArrayObject.map((elementsValue) => {
                    return replaceValues(elementsValue, homeFile)
                })

                response.writeHead(apiResponse.statusCode, 'Ok', { 'Content-Type': 'text/html' });
                response.write(homeHtmlPage.join(''));
                response.end()
            });
        });

        apiWeatherRequest.on('error', (error) => {
            response.statusCode = 500
            response.writeHead(response.statusCode, 'Error', { 'Content-Type': 'application/json' });
            response.write('Internal Server Error.')
            response.end()
        });


        apiWeatherRequest.end();


    } else {
        response.statusCode = 404;
        response.writeHead(response.statusCode, 'Error', { 'Content-Type': 'application/json' });
        response.write('Not Found.')
        response.end()
    }
});

server.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});

