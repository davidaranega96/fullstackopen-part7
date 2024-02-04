import { useDispatch } from 'react-redux'
import { updateBlog } from '../../reducers/blogs'
import { setNotification } from '../../reducers/notification'
import blogService from '../../services/blogs'

const LikeBlogButton = ({ blog }) => {
  const dispatch = useDispatch()

  const updateBlogHandle = async (updatedBlog) => {
    try {
      await blogService.putBlog(updatedBlog)
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        tone: 'bad',
      }))
    }
  }

  const likeBlog = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlogHandle(updatedBlog)
  }

  return <button onClick={() => likeBlog()}>like</button>
}

export default LikeBlogButton