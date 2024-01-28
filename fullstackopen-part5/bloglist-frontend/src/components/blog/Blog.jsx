import { useState } from 'react'
import PropTypes from 'prop-types'
import DeleteBlogButton from './DeleteBlogButton'
import LikeBlogButton from './LikeBlogButton'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  if (show) {
    return (
      <div className="blog" id="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link><br />
        {blog.url} <br />
        {blog.likes} | <LikeBlogButton blog={blog} /> <br />
        {blog.author} <br />
        <DeleteBlogButton blog={blog} />
        <button
          onClick={() => {
            setShow(!show)
          }}
          id="show-blog"
        >
          Hide
        </button>{' '}
        <br />
      </div>
    )
  } else {
    return (
      <div className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <DeleteBlogButton blog={blog} />{' '}
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
