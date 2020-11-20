
const path = require('path')
const express = require('express')
const xss = require('xss')
const PostsService = require('./posts-service')

const postsRouter = express.Router()
const jsonParser = express.json()

const serializePost = post => ({
  id: post.id,
  title: xss(post.title),
  summary: xss(post.summary),
  date_published: post.date_published
})

postsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getAllPosts(knexInstance)
      .then(posts => {
        res.json(posts.map(serializePost))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, summary, post_type /* , author */ } = req.body
    const newPost = { title, summary, post_type }

    for (const [key, value] of Object.entries(newPost))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    //newArticle.author = author
    PostsService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
          .json(serializePost(post))
      })
      .catch(next)
  })

module.exports = postsRouter