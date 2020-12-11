const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeArticlesArray } = require('./articles.fixtures')
const { makeAuthHeader } = require('./test-helpers')
const helpers = require('./test-helpers')


describe.only('Articles Endpoints', () => {
  let db

  const {
    testUsers,
    testArticles,
    //testComments,
  } = helpers.makeArticlesFixtures()


  before('make knex instance', () => {
    db = knex({

      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })


  beforeEach('clean the table', () => db.raw('TRUNCATE new_leaves_articles, new_leaves_users RESTART IDENTITY CASCADE'))
  after('disconnect from db', () => db.destroy())

  describe(`GET /api/articles`, () => {
    context(`given no articles`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/articles')
          .expect(200, [])
      })
    })

    context(`Given there are articles in the database`, () => {
      const testArticles = makeArticlesArray();

      beforeEach('insert articles', () => {
        return db
          .into('new_leaves_articles')
          .insert(testArticles)
      })

      it('responds with 200 and all of the articles', () => {
        return supertest(app)
          .get('/api/articles')
          .expect(200)
          .expect(response => {
            expect(response.body).to.be.a('array')
            for (let i = 0; i < response.body.length; i++) {
              expect(response.body[i]).to.include.keys('title', 'summary', 'id', 'date_published')
            }
          })
      })
    })
  })

  describe(`GET /api/articles/:article_id`, () => {
    context(`Given no article`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )
      it(`responds with 404`, () => {
        const articleId = 123456
        return supertest(app)
          .get(`/api/articles/${articleId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: { message: `Article doesn't exist` } })
      })
    })

    context('Given there are articles in the database', () => {
      beforeEach('insert articles', () =>
        helpers.seedArticlesTables(
          db,
          testUsers,
          testArticles,
          //testComments,
        )
      )

      it('responds with 200 and the specified article', () => {
        const articleId = 2
        const expectedArticle = helpers.makeExpectedArticle(
          testUsers,
          testArticles[articleId - 1],
          //testComments,
        )
        return supertest(app)
          .get(`/api/articles/${articleId}`)
          .set('Authorization', makeAuthHeader(testUsers[0]))
          .expect(200, expectedArticle)
      })
    })
  })

  describe(`POST /api/articles`, () => {
    it(`creates a article, responding with 201 and a new article`, () => {
      const newArticle = {
        title: 'this is the newArticle title',
        summary: 'this is the newArticle summary',
        article_type: 'Family'
      }
      return supertest(app)
        .post('/api/articles')
        .send(newArticle)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newArticle.title)
          expect(res.body.summary).to.eql(newArticle.summary)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/articles/${res.body.id}`)
        })
        .then(res => {
          supertest(app)
            .get(`/api/articles/${res.body.id}`)
            .expect(res.body)
        })
    })
  })

  describe(`DELETE /api/articles/:article_id`, () => {
    context(`given no articles`, () => {
      it(`responds with 404`, () => {
        const articleId = 999999
        return supertest(app)
          .delete(`/api/articles/${articleId}`)
          .expect(404)
      })
    })

    context(`given there are articles in the table`, () => {
      const testArticles = makeArticlesArray()

      beforeEach('insert articles', () => {
        return db
          .into('new_leaves_articles')
          .insert(testArticles)
      })

      it(`responds with 204 and deletes the article`, () => {
        const idToRemove = 2;
        const expectedArticles = testArticles.filter(article => article.id !== idToRemove)

        return supertest(app)
          .delete(`/api/articles/${idToRemove}`)
          .expect(204)
          .then(res => {
            supertest(app)
              .get(`/api/articles`)
              .expect(expectedArticles)
          })
      })
    })
  })

  // describe(`GET /api/articles/:article_id/comments`, () => {
  //   context(`Given no articles`, () => {
  //     beforeEach(() =>
  //       helpers.seedUsers(db, testUsers)
  //     )
  //   })
  // })
})