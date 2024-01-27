import { useSelector } from 'react-redux'

const UserRow = ({ username, blogs }) => {
  return (
    <tr>
      <td>{username}</td>
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
      userCounts[user] = 1
    } else {
      userCounts[user]++
    }
  })

  const users = Object.keys(userCounts).map((user) => ({
    username: user,
    blogs: userCounts[user],
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
            <UserRow username={user.username} blogs={user.blogs} key={user.username} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
