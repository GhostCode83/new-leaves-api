const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
  getUserWithUserName(db, username) {
    return db('new_leaves_users')
      .where({ username })
      .first()
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    })
  },
  veryifyJwt(token) {
    return jwt.veryify(token, config.JWT_SECRET, {
      algorithms: ['HS256']
    })
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':')
  },
}

module.exports = AuthService