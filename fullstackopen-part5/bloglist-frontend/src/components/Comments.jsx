import commentsService from '../services/comments'
import { useState, useEffect } from 'react'

const Comments = (blogId) => {
  const [comments, setComments] = useState(null)
  useEffect(() => {
    setComments(commentsService.getBlogComments(blogId))
  }, [])

  console.log(comments)
  return <div>TESTING COMMENTS BOX</div>
}

export default Comments