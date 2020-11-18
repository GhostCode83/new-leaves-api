const knex = require('knex')
const app = require('../src/app')

describe.only('Posts Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({

      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  describe(`GET /api/posts`, () => {
    context(`given no posts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/posts')
          .expect(200, [])
      })
    })
  })

})