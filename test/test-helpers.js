function makeUsersArray() {
  return [
    {
      fullname: 'Test-user-1',
      password: 'password',
      username: 'test-user-1',
    },
    {
      fullname: 'Test-user-2',
      password: 'password',
      username: 'test-user-2',
    },
    {
      fullname: 'Test-user-3',
      password: 'password',
      username: 'test-user-3',
    },
    {
      fullname: 'Test-user-4',
      password: 'password',
      username: 'test-user-4',
    },
  ]
}

function makeArticlesArray(author) {
  return [
    {
      title: 'First test thing!',
      article_type: 'Holiday',
      author: 1,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      title: 'Second test thing!',
      article_type: 'Daily Practice',
      author: 2,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      title: 'Third test thing!',
      article_type: 'Family',
      author: 3,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      title: 'Fourth test thing!',
      article_type: 'Adaptation',
      author: 4,
      date_published: '2029-01-22T16:28:32.615Z',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

// function makeCommentsArray(users, things) {
//   return [
//     {
//       id: 1,
//       rating: 2,
//       text: 'First test comment!',
//       thing_id: things[0].id,
//       user_id: users[0].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 2,
//       rating: 3,
//       text: 'Second test comment!',
//       thing_id: things[0].id,
//       user_id: users[1].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 3,
//       rating: 1,
//       text: 'Third test comment!',
//       thing_id: things[0].id,
//       user_id: users[2].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 4,
//       rating: 5,
//       text: 'Fourth test comment!',
//       thing_id: things[0].id,
//       user_id: users[3].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 5,
//       rating: 1,
//       text: 'Fifth test comment!',
//       thing_id: things[things.length - 1].id,
//       user_id: users[0].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 6,
//       rating: 2,
//       text: 'Sixth test comment!',
//       thing_id: things[things.length - 1].id,
//       user_id: users[2].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//     {
//       id: 7,
//       rating: 5,
//       text: 'Seventh test comment!',
//       thing_id: things[3].id,
//       user_id: users[0].id,
//       date_created: '2029-01-22T16:28:32.615Z',
//     },
//   ];
// }

function makeExpectedArticle(users, article = []) {
  const user = users
    .find(user => user.id === article.user_id)

  // const thingComments = comments
  //   .filter(comment => comment.thing_id === thing.id)

  // const number_of_comments = thingComments.length
  // const average_comment_rating = calculateAverageCommentRating(thingComments)

  return {
    id: article.id,
    title: article.title,
    summary: article.content,
    date_published: article.date_published,
    // number_of_comments,
    // average_comment_rating,
    user: {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
    },
  }
}

// function calculateAverageCommentRating(comments) {
//   if (!comments.length) return 0

//   const sum = comments
//     .map(comment => comment.rating)
//     .reduce((a, b) => a + b)

//   return Math.round(sum / comments.length)
// }

// function makeExpectedThingComments(users, thingId, comments) {
//   const expectedComments = comments
//     .filter(comment => comment.thing_id === thingId)

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
  // const testComments = makeCommentssArray(testUsers, testThings)
  return { testUsers, testArticles, /* testComments */ }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE new_leaves_articles, new_leaves_users RESTART IDENTITY CASCADE;`
  )
}

function seedArticlesTables(db, users, articles = []) {
  return db
    .into('new_leaves_users')
    .insert(users)
    .then(() =>
      db
        .into('new_leaves_articles')
        .insert(articles)
    )
  // .then(() =>
  //   comments.length && db.into('thingful_comments').insert(comments)
  // )
}

function seedMaliciousArticles(db, user, article) {
  return db
    .into('new_leaves_users')
    .insert([user])
    .then(() =>
      db
        .into('new_leaves_articles')
        .insert([article])
    )
}

function makeAuthHeader(user) {
  const token = Buffer.from(`${user.username}:${user.password}`).toString('base64')
  return `Basic ${token}`
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
}

