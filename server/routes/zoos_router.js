'use strict'

/**
 * Dependencies
 */

const express = require('express')
const Zoo = require('../models/Zoo')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 *   GET,POST /zoos
 */

router.route('/')
  .get(async (req, res) => {
    res.sendStatus(200)
  })
  .post(async (req, res) => {
    res.sendStatus(200)
  })

/**
 * Routes
 *   GET,PUT,DELETE /zoos/:id
 */

router.route('/:id')
  .get(async (req, res) => {
    res.sendStatus(200)
  })
  .put(async (req, res) => {
    res.sendStatus(200)
  })
  .delete(async (req, res) => {
    res.sendStatus(200)
  })

/**
 * Export router
 */

module.exports = router
