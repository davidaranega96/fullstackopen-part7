import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogs'
import { setNotification } from '../reducers/notification'
import blogService from '../services/blogs'

const AddBlog = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const createBlog = async (newBlogObject) => {
    try {
      const response = await blogService.postBlog(newBlogObject)
      dispatch(newBlog(response.data))
      dispatch(setNotification({ message: 'blog added', tone: 'good' }))
    } catch (error) {
      dispatch(setNotification({ message: 'error creating blog', tone: 'bad' }))
    }
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      url: url,
      author: author,
    }
    createBlog(blog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleNewBlog} className="BlogForm">
      <div>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id="title-input"
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id="url-input"
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id="author-input"
        />
      </div>
      <button type="submit" id="submit-button">
        Add Blog
      </button>
    </form>
  )
}

AddBlog.displayName = 'BlogForm'

export default AddBlog
