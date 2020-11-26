
const path = require('path')
const express = require('express')
const xss = require('xss')
const ArticlesService = require('./articles-service')

const articlesRouter = express.Router()
const jsonParser = express.json()

const serializeArticle = article => ({
  id: article.id,
  title: xss(article.title),
  summary: xss(article.summary),
  article_type: article.article_type,
  date_published: article.date_published
})

console.log(serializeArticle)

articlesRouter
  .route('/')
  .get((req, res, next) => {


    const knexInstance = req.app.get('db')
    ArticlesService.getAllArticles(knexInstance)
      .then(articles => {
        console.log(1)
        res.json(articles.map(serializeArticle))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {


    const { title, summary, article_type  /* , author */ } = req.body
    console.log(title, summary, article_type)

    const newArticle = { title, summary, article_type }
    console.log(newArticle)
    console.log(2)
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
        console.log(article, serializeArticle(article))
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.id}`))
          .json(serializeArticle(article))
      })
      .catch(next)
  })

articlesRouter
  .route('/:article_id')
  .all((req, res, next) => {
    console.log(3)
    console.log(req.app.get('db'),
      req.params.article_id)

    ArticlesService.getById(
      req.app.get('db'),
      req.params.article_id
    )
      .then(article => {
        console.log(article)
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
    console.log(4)
    console.log(res.json({
      id: res.article.id,
      title: xss(res.article.title),
      summary: xss(res.article.summary),
      article_type: res.article.article_type,
      date_published: res.article.date_published
    }))
  })
  .delete((req, res, next) => {
    console.log(5)
    console.log(req.app.get('db'),
      req.params.article_id)
    ArticlesService.deleteArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(() => {
        res.status(204).end()
        console.log(res)
      })
      .catch(next)
  })
console.log(6)
  .patch(jsonParser, (req, res, next) => {


    const { title, summary, article_type } = req.body
    const articleToUpdate = { title, summary, article_type }
    console.log(title, summary, article_type, articleToUpdate)
    const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length
    console.log(numberOfValues)
    if (numberOfValues === 0) {
      console.log(res)
      console.log(7)
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
    console.log(8)
      .then(numRowsAffected => {
        console.log(numRowsAffected, res)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = articlesRouter