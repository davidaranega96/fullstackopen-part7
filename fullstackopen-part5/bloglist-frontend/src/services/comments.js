import axios from 'axios'
import session from './session'
const baseUrl = 'http://localhost:3000/api/comments'

const getBlogComments = async (blogId) => {
  const response = await axios.get(baseUrl, { params: { blogId } })
  return response.data
}

const postComment = async (comment) => {
  const token = session.getToken()
  const config = {
    headers: { Authorization: token }
  }
  console.log(comment)
  const response = await axios.post(baseUrl, comment, config)
  return response
}

export default { getBlogComments, postComment }