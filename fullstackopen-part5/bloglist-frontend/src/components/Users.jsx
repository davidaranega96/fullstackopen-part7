import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserRow = ({ username, blogs, id }) => {
  return (
    <tr>
      <td><Link to={`/users/${id}`}>{username}</Link></td>
      <td>{blogs}</td>
    </tr>
  )
}

const Users = () => {
  const blogs = useSelector((state) => state.blogs)

  // Add a loading check
  if (blogs === null || blogs === undefined) {
    return <div>Loading...</div>
  }

  const userCounts = {}
  blogs.forEach((blog) => {
    const user = blog.user.name
    if (!userCounts[user]) {
      userCounts[user] = { nBlogs: 1, id: blog.user.id }
    } else {
      userCounts[user].nBlogs++
    }
  })

  const users = Object.keys(userCounts).map((user) => ({
    username: user,
    blogs: userCounts[user].nBlogs,
    id: userCounts[user].id
  }))


  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow username={user.username} blogs={user.blogs} key={user.id} id={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
