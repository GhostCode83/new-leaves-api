
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
  post_type: post.post_type,
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
    const { title, summary, post_type  /* , author */ } = req.body
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

postsRouter
  .route('/:post_id')
  .all((req, res, next) => {
    PostsService.getById(
      req.app.get('db'),
      req.params.post_id
    )
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: { message: `Article doesn't exist` }
          })
        }
        res.post = post // save the article for the next middleware
        next() // don't forget to call next so the next middleware happens!
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json({
      id: res.post.id,
      title: xss(res.post.title),
      summary: xss(res.post.summary),
      post_type: res.post.post_type,
      date_published: res.post.date_published
    })
  })
  .delete((req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = postsRouter