const PostsService = {
  getAllPosts(knex) {
    return knex.select('*').from('new_leaves_posts')
  },
  insertPost(knex, newPost) {
    return knex
      .insert(newPost)
      .into('new_leaves_posts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('new_leaves_posts')
      .select('*')
      .where('id', id)
      .first()
  },
  deletePost(knex, id) {
    return knex('new_leaves_posts')
      .where({ id })
      .delete()
  },
  updatePost(knex, id, newPostFields) {
    return knex('new_leaves_posts')
      .where({ id })
      .update(newPostFields)
  },
}

module.exports = PostsService
