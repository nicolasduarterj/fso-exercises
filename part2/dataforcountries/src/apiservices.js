import axios from "axios";

function retrieveCountries() {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return request.then(response => response.data)
}

export default retrieveCountries