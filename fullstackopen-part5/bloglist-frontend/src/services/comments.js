import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/comments'

let token = null

const getBlogComments = async ({ blogId }) => {
  console.log(blogId)
  const blogUrl = `${baseUrl}/${blogId}`
  console.log(blogUrl)
  const response = await axios.get(blogUrl)
  return response.data
}

const postComment = async (comment) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, comment, config)
  return response
}

export default { getBlogComments, postComment }