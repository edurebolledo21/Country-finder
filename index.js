const input = document.querySelector('.inpute');
const boton = document.querySelector('#boton-buscar');
const infoDiv = document.querySelector('.information');
const reload = document.querySelector('#reload');
const mensaje = document.querySelector('.specify');
const entrada = document.querySelector('#entrada');

let contries = [];

boton.addEventListener('click', e => {
    input.classList.add('visible');
    
});


const getCountry = async  () => {
    
    contries = await (await fetch('https://restcountries.com/v3.1/all', {method: 'GET'})).json();
};
getCountry();


input.addEventListener('input', async e => {
    const filtroPaises = contries.filter(filtro => filtro.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
    infoDiv.innerHTML =  ` <div class="lds-facebook"><div></div><div></div><div></div></div>`;
    
    
    if (filtroPaises.length > 10 && filtroPaises.length < contries.length ) {
        infoDiv.innerHTML = '';
        mensaje.classList.add('show-specify');
        infoDiv.classList.add('show-information');
        
    }
    
    else if(filtroPaises.length < 10 && filtroPaises.length !== 1 ){
        mensaje.classList.remove('show-specify');
        infoDiv.innerHTML = '';
        
        [...filtroPaises].forEach(async todos =>  { 
            const element = document.createElement('li');
            const nombre = todos.name.common;
            const flag = todos.flags.png;
            
            element.innerHTML = 
            `
            <p>Country: ${nombre} </p>
            <img id="bandera" src="${flag}" alt="">
            `
            infoDiv.append(element);
            
            infoDiv.classList.remove('show-information');
        });
    }

    else if(filtroPaises.length === 1 ){ 
        mensaje.classList.remove('show-specify');
        let temperatura = await (await fetch(`https://goweather.herokuapp.com/weather/${filtroPaises[0].capital}`, {method: 'GET'})).json();
        console.log(temperatura);
        const element = document.createElement('li');
        const nombre = filtroPaises[0].name.common;
        const capital = filtroPaises[0].capital;
        const habitantes = filtroPaises[0].population;
        const region = filtroPaises[0].region;
        const flag = filtroPaises[0].flags.png;
        const temperature= temperatura.temperature;
        const clima = temperatura.description;
        
        element.innerHTML = 
        `
        <p>Country: ${nombre} </p>
        <p>Capital: ${capital} </p>
        <p>Inhabitants: ${habitantes} </p>
        <p>Region: ${region} </p>
        <p>Temperature: ${temperature} </p>
        <p>Current climate: ${clima}</p>
        <img id="bandera" src="${flag}" alt="">
        `
        infoDiv.innerHTML = '';
        infoDiv.append(element);
        
        infoDiv.classList.remove('show-information');
        
        
    }
    
    else {
        infoDiv.innerHTML = '';
        mensaje.classList.remove('show-specify');
    }
   
    
});
    
    
    
    