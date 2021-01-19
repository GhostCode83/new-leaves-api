const xss = require('xss')

const CommentsService = {
  getById(db, id) {
    return db
      .from('new_leaves_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
        'comm.article_id',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'username', usr.username,
              'fullname', usr.fullname,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'new_leaves_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.id', id)
      .first()
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('new_leaves_comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment =>
        CommentsService.getById(db, comment.id)
      )
  },

  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      text: xss(comment.text),
      article_id: comment.article_id,
      date_commented: new Date(comment.date_commented),
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = CommentsService
