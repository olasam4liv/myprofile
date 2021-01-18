if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker
        .register('./js/sw.js')
        .then(reg => console.log(`Serviceworker Registered`))
        .catch(err => console.log(`Error:${err}`))
    })
}

let theme = localStorage.getItem('theme')

if(theme == null){
    setTheme('light')
}else{
    setTheme(theme)
}

let themeDots = document.getElementsByClassName("theme-dot");

for(let i = 0; themeDots.length >i; i++){
    themeDots[i].addEventListener('click', function(){
        let mode = this.dataset.mode;
        console.log('Item clicked', mode);
        setTheme(mode);
    })

}

function setTheme(mode){
    if(mode == 'light'){
        document.getElementById('theme-style').href ='../public/css/index.css';
    }
    if(mode == 'blue'){
        document.getElementById('theme-style').href ='../public/css/blue.css';
    }
    if(mode == 'green'){
        document.getElementById('theme-style').href ='../public/css/green.css';
    }
    if(mode == 'purple'){
        document.getElementById('theme-style').href ='../public/css/purple.css';
    }
    localStorage.setItem('theme', mode)

}