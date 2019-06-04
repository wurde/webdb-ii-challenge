'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Bear {
  static async all(query={}) {
    let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query
    const offset = limit * (page - 1)

    let rows = await db('bears')
      .orderBy(sortby, sortdir)
      .limit(limit)
      .offset(offset)

    return rows
  }

  static async find(id) {
    return await db('bears').where({ id }).first()
  }

  static async insert(zoo) {
    const [id] = await db('bears').insert(zoo)

    let new_zoo = await db('bears').where({ id }).first()

    return new_zoo
  }

  static async update(id, changes) {
    return await db('bears').where({ id }).update(changes)
  }

  static async remove(id) {
    return await db('bears').where({ id }).del()
  }
}

/**
 * Export model
 */

module.exports = Bear
