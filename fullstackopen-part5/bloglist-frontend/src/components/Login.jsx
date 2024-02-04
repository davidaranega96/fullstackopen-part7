import { useState, useEffect } from 'react'
import loginService from '../services/login'
import session from '../services/session'
import { setNotification } from '../reducers/notification'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/session'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      session.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const auth = await loginService.login({ username, password })
    if (auth) {
      dispatch(login(auth))
      session.setToken(auth.token)
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

  if (user) {
    return <div>Already logged in</div>
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text' name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password' name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>login</Button>
      </Form>
    </div>
  )
}

Login.displayName = 'Login'

export default Login
