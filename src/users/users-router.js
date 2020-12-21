
const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')
const bcrypt = require('bcryptjs')
const { insertArticle } = require('../articles/articles-service')
const { response } = require('../app')

const usersRouter = express.Router()
const jsonParser = express.json()

usersRouter
  .post('/signup', jsonParser, (req, res, next) => {
    const { username, fullname, password } = req.body
    bcrypt.hash(password, 10).then(function (hash) {

      const newUser = { username, fullname, password: hash }
      UsersService.insertUser(req.app.get('db'), newUser)
        .then(result => {
          return res.status(201).json(result)
        })
      // insert the new user into database
    })

  })

module.exports = usersRouter