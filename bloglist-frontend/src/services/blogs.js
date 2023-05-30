import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('get resData:', response.data);
  return response.data;
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newBlog, config)
  console.log('post resData:', response.data);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken }