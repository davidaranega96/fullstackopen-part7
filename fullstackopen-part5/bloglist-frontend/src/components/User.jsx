import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './blog/Blog'

const User = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  if (!users || !blogs) {
    return <div>Loading...</div>
  }

  const user = users.find((user) => user.id === id)
  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  return (
    <div>
      <h3>{user.name}</h3>
      {userBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} id='blog' />
      ))}
    </div>
  )
}

export default User