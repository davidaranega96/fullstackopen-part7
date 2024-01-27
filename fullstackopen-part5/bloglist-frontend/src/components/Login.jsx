import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notification'
import { useDispatch } from 'react-redux'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    const auth = await loginService.login({ username, password })
    console.log(auth)
    if (auth) {
      setUser(auth)
      blogService.setToken(auth.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(auth))
      dispatch(setNotification({ message: 'correctly logged in', tone: 'good' }))
      setPassword('')
    } else {
      dispatch(setNotification({
        message: 'incorrect username or password',
        tone: 'bad',
      }))
    }
  }

  return (
    <Togglable buttonLabel="login" className="login">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </Togglable>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired
}
Login.displayName = 'Login'

export default Login
