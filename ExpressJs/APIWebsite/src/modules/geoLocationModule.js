const http = require('http')

const IpAddress = () => {
    return new Promise((resolve, reject) => {

        const ipApiOption = {
            host: 'api.ipify.org',
            path: '',
            method: 'GET'
        }

        const ipApiRequest = http.request(ipApiOption, (ipApiResponse) => {

            let apiIpData = ''

            ipApiResponse.on('data', chunk => {
                apiIpData += chunk
            })

            ipApiResponse.on('end', () => {
                resolve(apiIpData)
            })
        })

        ipApiRequest.on('error', err => {
            reject(err)
        })

        ipApiRequest.end()
    })
}

const cityName = (ipAddress) => {
    return new Promise((resolve, reject) => {
        const geoApiOption = {
            host: 'ip-api.com',
            path: `/json/${ipAddress}`,
            method: 'GET'
        }

        const geoApiRequest = http.request(geoApiOption, geoApiResponse => {
            let geoApiData = ''
            geoApiResponse.on('data', chunk => {
                geoApiData += chunk
            })

            geoApiResponse.on('end', () => {
                resolve(JSON.parse(geoApiData).city)
            })
        })

        geoApiRequest.on('error', err => {
            reject(err)
        })

        geoApiRequest.end()
    })
}


module.exports = { IpAddress, cityName }