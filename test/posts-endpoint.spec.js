const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makePostsArray } = require('./posts.fixtures')

describe.only('Posts Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({

      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })


  before('clean the table', () => db.raw('TRUNCATE new_leaves_posts RESTART IDENTITY CASCADE'))
  after('disconnect from db', () => db.destroy())

  describe(`GET /api/posts`, () => {
    context(`given no posts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/posts')
          .expect(200, [])
      })
    })

    context(`Given there are posts in the database`, () => {
      const testPosts = makePostsArray();

      beforeEach('insert posts', () => {
        return db
          .into('new_leaves_posts')
          .insert(testPosts)
      })

      it('responds with 200 and all of the posts', () => {
        return supertest(app)
          .get('/api/posts')
          .expect(200)
          .expect(response => {
            expect(response.body).to.be.a('array')
            console.log(response.body)
            for (let i = 0; i < response.body.length; i++) {
              expect(response.body[i]).to.include.keys('title', 'summary', 'id', 'date_published')
            }
          })
      })
    })
  })

  describe(`POST /api/posts`, () => {
    it(`creates a post, responding with 201 and a new post`, () => {
      const newPost = {
        title: 'this is the newPost title',
        summary: 'this is the newPost summary',
        post_type: 'Family'
      }
      return supertest(app)
        .post('/api/posts')
        .send(newPost)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newPost.title)
          expect(res.body.summary).to.eql(newPost.summary)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/posts/${res.body.id}`)
        })
        .then(res => {
          supertest(app)
            .get(`/api/posts/${res.body.id}`)
            .expect(res.body)
        })

    })
  })
})


