import './css/styles.css';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const inputValue = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const listWithInfo = document.querySelector('.country-info')
const emptyString = str => (str.innerHTML = '')



const oneResultAndFlags = (data) => {

if(data.length === 1){
emptyString(list)
listWithInfo.innerHTML=listWithInfoCreate(data)
}
else{
emptyString(listWithInfo)
list.innerHTML=listCreate(data)
}

} 



const listWithInfoCreate = (data) => {
    return data.map(
        ({ name, capital, population, flags, languages }) =>
       
          `<h1><img src="${flags.png}" alt="${name.official}" width="60" height="60">${
            name.official
          }</h1>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages)}</p>`
)
}



const listCreate = (data) =>{
    return data.map(({name,flags}) =>
    `<li><img src="${flags.png}" alt="${name.official}" width="60" height="60">${name.official}</li>`
    )
.join('')

}


const inputHandler = (event) => {
    const inputValue = event.target.value.trim()
    
    if(!inputValue){
        emptyString(list)
        emptyString(listWithInfo)
        return
    }
    
    fetchCountries(inputValue).then(data => {
        if(data.length > 10){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name')
            return
        }
        oneResultAndFlags(data)
    }
    )
    .catch( error => {
        emptyString(list)
        emptyString(listWithInfo)
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } 
    
    )
    }

inputValue.addEventListener("input",debounce(inputHandler,DEBOUNCE_DELAY) )

