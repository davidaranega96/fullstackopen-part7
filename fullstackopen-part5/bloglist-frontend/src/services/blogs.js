import axios from 'axios'
import session from './session'
const baseUrl = 'http://localhost:3000/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async (blog) => {
  const token = session.getToken()
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response
}

const putBlog = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  return await axios.put(url, {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    user: blog.user.id,
    url: blog.url,
  })
}

const deleteBlog = async (blog) => {
  const token = session.getToken()
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog.id}`
  return await axios.delete(url, config)
}

export default { getAll, postBlog, putBlog, deleteBlog }
