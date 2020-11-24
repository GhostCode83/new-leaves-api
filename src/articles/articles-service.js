const ArticlesService = {
  getAllArticles(knex) {
    return knex.select('*').from('new_leaves_articles')
  },
  insertArticle(knex, newArticle) {
    return knex
      .insert(newArticle)
      .into('new_leaves_articles')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('new_leaves_articles')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteArticle(knex, id) {
    return knex('new_leaves_articles')
      .where({ id })
      .delete()
  },
  updateArticle(knex, id, newArticleFields) {
    return knex('new_leaves_articles')
      .where({ id })
      .update(newArticleFields)
  },
}

module.exports = ArticlesService
