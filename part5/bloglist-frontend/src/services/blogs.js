import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = { headers: {Authorization: token} }
  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (id) => {
  const response = await axios.post(`${baseUrl}/like/${id}`)
  return response.data
} 

export default { getAll, setToken, create, like }