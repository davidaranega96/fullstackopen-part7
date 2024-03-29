import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notification'
import blogsReducer from './reducers/blogs'
import sessionReducer from './reducers/session'
import usersReducer from './reducers/users'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    session: sessionReducer,
    users: usersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
