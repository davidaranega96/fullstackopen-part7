import { useState, useRef, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'
import { setBlogs } from '../reducers/blogs'
import { useDispatch, useSelector } from 'react-redux'

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  console.log(blogs)

  if (!blogs) {
    return null
  }

  return (
    <div className="blogs" id="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          id="blog"
        />
      ))}
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm/>
      </Togglable>
    </div>
  )
}

Blogs.displayName = 'Blogs'

export default Blogs
