const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const mongoose = require('mongoose')
const helpers = require('./helpers')
const Blog = require('../models/blog')

commentsRouter.get('/:id', async (request, response, next) => {
  try {
    const id = new mongoose.Types.ObjectId(request.params.id)
    const comment = await Comment.findById(id)
    if (!comment) {
      response.status(404).end()
    } else {
      response.json(comment)
    }
  } catch (error) {
    next(error)
  }
})

commentsRouter.get('', async (request, response, next) => {
  try {
    const { blogId, userId } = request.query

    const query = {}
    if (blogId) {
      query.blog = blogId
    }
    if (userId) {
      query.user = userId
    }
    const comments = await Comment.find(query)
    response.json(comments)
  } catch (error) {
    next(error)
  }
})

commentsRouter.post('', async (request, response, next) => {
  console.log('Trying to post a comment...')
  try {
    const decodedToken = helpers.decodeBearerToken(request)
    if (!decodedToken) {
      response.status(401).send({ error: 'token invalid' })
      return
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.body.blogId)
    const newComment = {
      content: request.body.content,
      blog: request.body.blogId,
      user: decodedToken.id,
    }
    const comment = new Comment(newComment)
    const savedComment = await comment.save()
    await savedComment.populate('user', { name: 1, username: 1, id: 1 })
    await savedComment.populate('blog', { title: 1, author: 1 })
    user.comments = user.comments.concat(savedComment._id)
    blog.comments = blog.comments.concat(savedComment._id)
    await user.save()
    await blog.save()

    response.status(201).json(savedComment)
  } catch (error) {
    next(error)
  }
})

module.exports = commentsRouter
