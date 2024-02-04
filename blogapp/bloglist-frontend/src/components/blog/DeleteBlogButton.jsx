import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notification'
import { deleteBlog } from '../../reducers/blogs'
import blogService from '../../services/blogs'

const DeleteBlogButton = ({ blog }) => {
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  const deleteBlogHadle = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete)
      dispatch(deleteBlog(blogToDelete))
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        tone: 'bad',
      }))
    }
  }

  if (!session){
    return null
  } else if (session.username !== blog.user.username) {
    return null
  } else {
    return <button onClick={() => deleteBlogHadle(blog)}>delete</button>
  }
}

export default DeleteBlogButton