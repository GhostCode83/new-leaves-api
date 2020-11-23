
const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('new_leaves_users')
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into('new_leaves_users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('new_leaves_users')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteUser(knex, id) {
    return knex('new_leaves_users')
      .where({ id })
      .delete()
  },
  updateUser(knex, id, newUserFields) {
    return knex('new_leaves_users')
      .where({ id })
      .update(newUserFields)
  },
}

module.exports = UsersService
