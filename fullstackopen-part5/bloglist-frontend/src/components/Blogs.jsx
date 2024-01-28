import { useRef } from 'react'
import BlogForm from './BlogForm'
import Blog from './blog/Blog'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  if (!blogs) {
    return null
  }

  return (
    <div className="blogs" id="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
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
