import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LikeBlogButton from './LikeBlogButton'
import Comments from '../Comments'

const BlogView = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)

  if (!blogs) {
    return <div>Loading...</div>
  }

  const blog = blogs.find((blog) => blog.id === id)

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      likes: {blog.likes} <LikeBlogButton blog={blog} /><br />
      added by {blog.user.name}
      <Comments blogId={blog.id} />
    </div>
  )
}

export default BlogView