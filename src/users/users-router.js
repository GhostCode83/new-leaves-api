
const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')
const bcrypt = require('bcryptjs')
const { insertArticle } = require('../articles/articles-service')
const { response } = require('../app')
const { comparePasswords } = require('../auth/auth-service')

const usersRouter = express.Router()
const jsonParser = express.json()

//sign-up
usersRouter
  .post('/', jsonParser, (req, res, next) => {
    const { password, username, fullname } = req.body

    for (const field of ['username', 'fullname', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError) {
      return res.status(400).json({ error: passwordError })
    }

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {

            const newUser = {
              username,
              password: hashedPassword,
              fullname,
              date_created: 'now()',
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
    // bcrypt.hash(password, 10).then(function (hash) {

    //   const newUser = { username, fullname, password: hash }
    //   UsersService.insertUser(req.app.get('db'), newUser)
    //     .then(result => {
    //       return res.status(201).json(result)
    //     })
    // insert the new user into database
    // })

  })

module.exports = usersRouter