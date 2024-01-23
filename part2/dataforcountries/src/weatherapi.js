import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY

function weatherApi(pais) {
    const request = axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${pais}`)
    return request.then(response => response.data)
}

export default weatherApi