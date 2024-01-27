import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notification'
import { deleteBlog, updateBlog } from '../reducers/blogs'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

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

  const LikeButton = () => {
    return <button onClick={() => likeBlog()}>like</button>
  }

  const DeleteButton = () => {
    if (user.username !== blog.user.username) {
      return null
    } else {
      return <button onClick={() => deleteBlogHadle(blog)}>delete</button>
    }
  }

  const likeBlog = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlogHandle(updatedBlog)
  }

  if (show) {
    return (
      <div className="blog" id="blog">
        {blog.title} <br />
        {blog.url} <br />
        {blog.likes} | <LikeButton /> <br />
        {blog.author} <br />
        <DeleteButton />
        <button
          onClick={() => {
            setShow(!show)
          }}
          id="delete-blog"
        >
          Hide
        </button>{' '}
        <br />
      </div>
    )
  } else {
    return (
      <div className="blog">
        {blog.title} <DeleteButton />{' '}
        <button onClick={() => setShow(!show)} id="show-blog">
          Show
        </button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}
Blog.displayName = 'Blog'

export default Blog
