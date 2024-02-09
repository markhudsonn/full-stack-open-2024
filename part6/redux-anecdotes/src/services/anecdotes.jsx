import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id, newObject) => {
  const response = await axios.get(`${baseUrl}/${id}`, newObject)
  const objectToUpdate = response.data
  const updatedObject = { ...objectToUpdate, votes: objectToUpdate.votes + 1 }   
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}

export default { getAll, createNew, addVote }