'use strict'

/**
 * Dependencies
 */

const knex = require('knex')

/**
 * Constants
 */

const config = {
  client: 'sqlite3',
  connection: {
    filename: './server/db/development.sqlite',
  },
  useNullAsDefault: true
}

/**
 * Define client
 */

const client = knex(config)

/**
 * Export client
 */

module.exports = client
