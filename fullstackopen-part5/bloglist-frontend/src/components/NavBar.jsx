import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/session'

const NavBar = () => {
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const handleLogout = () => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div className='navbar' id='navbar'>
      <Link className='link' to='/'>blogs</Link>
      <Link className='link' to='/users'>users</Link>
      {session && (
        <div>
          Logged in as {session.name}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default NavBar