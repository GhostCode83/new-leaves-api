
const path = require('path')
const express = require('express')
const xss = require('xss')
const ArticlesService = require('./articles-service')
const { requireAuth } = require('../middleware/basic-auth')

const articlesRouter = express.Router()
const jsonParser = express.json()

const serializeArticle = article => ({
  id: article.id,
  title: xss(article.title),
  summary: xss(article.summary),
  article_type: article.article_type,
  date_published: article.date_published
})


articlesRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {

    const knexInstance = req.app.get('db')
    ArticlesService.getAllArticles(knexInstance)
      .then(articles => {
        res.json(articles.map(serializeArticle))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {


    const { title, summary, article_type  /* , author */ } = req.body
    console.log(title, summary, article_type)

    const newArticle = { title, summary, article_type }

    for (const [key, value] of Object.entries(newArticle))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    //newArticle.author = author
    ArticlesService.insertArticle(
      req.app.get('db'),
      newArticle
    )
      .then(article => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.id}`))
          .json(serializeArticle(article))
      })
      .catch(next)
  })

articlesRouter
  .route('/:article_id')
  .all(requireAuth)
  .all((req, res, next) => {

    ArticlesService.getById(
      req.app.get('db'),
      Number(req.params.article_id)
    )
      .then(article => {
        if (!article) {
          return res.status(404).json({
            error: { message: `Article doesn't exist` }
          })
        }
        res.article = article // save the article for the next middleware
        next() // don't forget to call next so the next middleware happens!
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json({
      id: res.article.id,
      title: xss(res.article.title),
      summary: xss(res.article.summary),
      article_type: res.article.article_type,
      date_published: res.article.date_published
    })
    console.log(res.json({
      id: res.article.id,
      title: xss(res.article.title),
      summary: xss(res.article.summary),
      article_type: res.article.article_type,
      date_published: res.article.date_published
    }))
  })
  .delete((req, res, next) => {
    console.log(req.app.get('db'),
      req.params.article_id)
    ArticlesService.deleteArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {


    const { title, summary, article_type } = req.body
    const articleToUpdate = { title, summary, article_type }
    const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {

      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'summary' or 'article_type'`
        }
      })
    }
    console.log(req.app.get('db'),
      req.params.article_id,
      articleToUpdate)
    ArticlesService.updateArticle(
      req.app.get('db'),
      req.params.article_id,
      articleToUpdate
    )
      .then(numRowsAffected => {
        console.log(numRowsAffected, res)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = articlesRouter