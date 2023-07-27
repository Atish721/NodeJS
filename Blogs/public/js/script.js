document.addEventListener('DOMContentLoaded',()=>{
    const allButton = document.querySelectorAll('.searchBtn')
    const searchBar = document.querySelector('.searchBar')
    const searchInput = document.querySelector('#searchInput')
    const searchClose = document.querySelector('#searchClose')

    for(var i = 0; i<allButton.length;i++)
    {
        allButton[i].addEventListener('click',()=>{
            searchBar.style.visibility='visible'
            searchBar.classList.add('open')
            this.setAttribute('aria-expanded','ture')
            searchInput.focus()
        })
    }

    searchClose.addEventListener('click',()=>{
        searchBar.style.visibility='hidden'
        searchBar.classList.remove('open')
        this.setAttribute('aria-expanded','false')
    })
})