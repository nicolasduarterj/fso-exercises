import axios from 'axios'

const defaultURL = 'http://localhost:3001/persons'

function getAll() {
    const request = axios.get(defaultURL)
    return request.then(response => response.data)
}

function postPerson(note) {
    const request = axios.post(defaultURL, note)
    return request.then(response => response.data)
}

function deletePerson(id) {
    return axios.delete(`${defaultURL}/${id}`)
}

export default {getAll, postPerson, deletePerson}