import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import { clearNotification } from './reducers/notification'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './reducers/session'
import { setBlogs } from './reducers/blogs'
import blogService from './services/blogs'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

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

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  const handleLogout = () => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <Router>
      <Notification notification={notification} />
      <NavBar />
      <h2>blogs</h2>
      {!session && <Login />}
      {session && (
        <div>
          logged in as {session.name}{' '}
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
