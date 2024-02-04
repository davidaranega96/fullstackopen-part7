import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import { clearNotification } from './reducers/notification'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from './reducers/blogs'
import blogService from './services/blogs'
import usersService from './services/users'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import User from './components/User'
import { setUsers } from './reducers/users'
import BlogView from './components/blog/BlogView'

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
    usersService.getAll().then((users) => dispatch(setUsers(users)))
  }, [])

  return (
    <div className='container'>
      <Router>
        <Notification notification={notification} />
        <NavBar />
        <Routes>
          <Route path='/' element={<Blogs />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<BlogView />} />
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router></div>
  )
}

export default App
