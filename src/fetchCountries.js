const URL = `https://restcountries.com/v3.1/name/`

const fetchCountries = (name) => {
return fetch(`${URL}${name}?fields=name,capital,population,flags,languages`).then(
Response => {
if(Response.status === 404){
    return Promise.reject(new Error());
}
return Response.json()

} 

)

}

export {fetchCountries}


