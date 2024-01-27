import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import { clearNotification } from './reducers/notification'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)
    return () => clearTimeout(timer)
  }, [notification])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      {!user && <Login setUser={setUser} />}
      {user && (
        <div>
          logged in as {user.name}{' '}
          <button onClick={handleLogout}>logout</button>
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
