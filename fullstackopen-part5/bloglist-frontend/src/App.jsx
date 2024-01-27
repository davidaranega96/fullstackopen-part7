import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import { clearNotification } from './reducers/notification'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './reducers/session'

const App = () => {
  const session = useSelector((state) => state.session)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)
    return () => clearTimeout(timer)
  }, [notification])

  const handleLogout = () => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      {!session && <Login />}
      {session && (
        <div>
          logged in as {session.name}{' '}
          <button onClick={handleLogout}>logout</button>
          <Blogs />
        </div>
      )}
    </div>
  )
}

export default App
