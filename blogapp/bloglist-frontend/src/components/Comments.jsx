import commentsService from '../services/comments'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState(null)
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.session)

  useEffect(() => {
    const fetchData = async () => {
      const result = await commentsService.getBlogComments(blogId)
      setComments(result)
    }
    fetchData()
  }, [])

  if (!comments) {
    return <div>Loading comments...</div>
  }

  const addComment = async (newComment) => {
    try {
      const response = await commentsService.postComment(newComment)
      setComments(comments.concat(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewComment = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment,
      blogId: blogId,
      user: user.id
    }
    addComment(newComment)
    setComment('')
  }

  return (
    <div className='comments' id='comments'>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}<br />
      { user && (<form onSubmit={handleNewComment}>
        <div>
          <input
            type='text'
            name='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id='comment-input' />
        </div>
        <button type='submit' id='submit-button'>Add comment</button>
      </form>)}
    </div>
  )
}

export default Comments