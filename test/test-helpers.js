const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      fullname: 'Test-user-1',
      password: 'password',
      username: 'test-user-1',
    },
    {
      id: 2,
      fullname: 'Test-user-2',
      password: 'password',
      username: 'test-user-2',
    },
    {
      id: 3,
      fullname: 'Test-user-3',
      password: 'password',
      username: 'test-user-3',
    },
    {
      id: 4,
      fullname: 'Test-user-4',
      password: 'password',
      username: 'test-user-4',
    },
  ]
}

function makeArticlesArray(author) {
  return [
    {
      id: 1,
      title: 'First test article!',
      article_type: 'Holiday',
      author: 1,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test article!',
      article_type: 'Daily Practice',
      author: 2,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test article!',
      article_type: 'Family',
      author: 3,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test article!',
      article_type: 'Adaptation',
      author: 4,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

// function makeCommentsArray(users, articles) {
//   return [
//     {
//       id: 1,
//       rating: 2,
//       text: 'First test comment!',
//       article_id: articles[0].id,
//       user_id: users[0].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 2,
//       rating: 3,
//       text: 'Second test comment!',
//       article_id: articles[0].id,
//       user_id: users[1].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 3,
//       rating: 1,
//       text: 'Third test comment!',
//       article_id: articles[0].id,
//       user_id: users[2].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 4,
//       rating: 5,
//       text: 'Fourth test comment!',
//       article_id: articles[0].id,
//       user_id: users[3].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 5,
//       rating: 1,
//       text: 'Fifth test comment!',
//       article_id: articles[articles.length - 1].id,
//       user_id: users[0].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 6,
//       rating: 2,
//       text: 'Sixth test comment!',
//       article_id: articles[articles.length - 1].id,
//       user_id: users[2].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 7,
//       rating: 5,
//       text: 'Seventh test comment!',
//       article_id: articles[3].id,
//       user_id: users[0].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//   ];
// }

function makeExpectedArticle(users, article = []) {
  const user = users
    .find(user => user.id === article.author)
  // const articleComments = comments
  //   .filter(comment => comment.article_id === article.id)

  // const number_of_comments = articleComments.length
  // const average_comment_rating = calculateAverageCommentRating(articleComments)

  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    date_published: article.date_published,
    article_type: article.article_type,
    author: article.author,
    // number_of_comments,
    // average_comment_rating,

  }
}

// function calculateAverageCommentRating(comments) {
//   if (!comments.length) return 0

//   const sum = comments
//     .map(comment => comment.rating)
//     .reduce((a, b) => a + b)

//   return Math.round(sum / comments.length)
// }

// function makeExpectedarticleComments(users, articleId, comments) {
//   const expectedComments = comments
//     .filter(comment => comment.article_id === articleId)

//   return expectedComments.map(comment => {
//     const commentUser = users.find(user => user.id === comment.user_id)
//     return {
//       id: comment.id,
//       text: comment.text,
//       rating: comment.rating,
//       date_created: comment.date_created,
//       user: {
//         id: commentUser.id,
//         user_name: commentUser.user_name,
//         full_name: commentUser.full_name,
//         nickname: commentUser.nickname,
//         date_created: commentUser.date_created,
//       }
//     }
//   })
// }

function makeMaliciousArticle(user) {
  const maliciousArticle = {
    id: 911,
    date_published: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    summary: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedArticle = {
    ...makeExpectedArticle([user], maliciousArticle),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    summary: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousArticle,
    expectedArticle,
  }
}

function makeArticlesFixtures() {
  const testUsers = makeUsersArray()
  const testArticles = makeArticlesArray(testUsers)

  // const testComments = makeCommentssArray(testUsers, testarticles)
  return { testUsers, testArticles, /* testComments */ }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE new_leaves_articles, new_leaves_users RESTART IDENTITY CASCADE;`
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  // console.log(preppedUsers)
  return db.into('new_leaves_users').insert(preppedUsers).returning('*')
    /* */
    .then(() => {
      return db.raw(
        `SELECT setval('new_leaves_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    }
      /* */
    )
}

function seedArticlesTables(db, users, articles, /*comments = []*/) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('new_leaves_articles').insert(articles)
    /**/
    await trx.raw(
      `SELECT setval('new_leaves_articles_id_seq', ?)`,
      [articles[articles.length - 1].id],
    )
    if (comments.length) {
      await trx.into('blogful_comments').insert(comments)
      await trx.raw(
        `SELECT setval('blogful_comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
    /* */
  }
  )
}



function seedMaliciousArticles(db, user, article) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('new_leaves_articles')
        .insert([article])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeArticlesArray,
  makeExpectedArticle,
  // makeExpectedThingComments,
  makeMaliciousArticle,
  // makeCommentsArray,

  makeArticlesFixtures,
  cleanTables,
  seedArticlesTables,
  seedMaliciousArticles,
  makeAuthHeader,
  seedUsers,
}

