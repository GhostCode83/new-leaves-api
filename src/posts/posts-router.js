
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
// .post(jsonParser, (req, res, next) => {
//   const { title, content, style, author } = req.body
//   const newArticle = { title, content, style }

//   for (const [key, value] of Object.entries(newArticle))
//     if (value == null)
//       return res.status(400).json({
//         error: { message: `Missing '${key}' in request body` }
//       })
//   newArticle.author = author
//   ArticlesService.insertArticle(
//     req.app.get('db'),
//     newArticle
//   )
//     .then(article => {
//       res
//         .status(201)
//         .location(path.posix.join(req.originalUrl, `/${article.id}`))
//         .json(serializeArticle(article))
//     })
//     .catch(next)
//})

module.exports = postsRouter