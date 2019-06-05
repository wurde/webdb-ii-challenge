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
    try {
      let zoos = await Zoo.all()
      res.status(200).json(zoos)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during zoos fetch.' }})
    }
  })
  .post(async (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: { message: 'Missing form data.' }})
    }
    if (!req.body.name) {
      res.status(400).json({ error: { message: 'Missing name value.' }})
    }

    try {
      let zoo = await Zoo.insert({
        name: req.body.name
      })
      res.status(201).json(zoo)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during zoo creation.' }})
    }
  })

/**
 * Routes
 *   GET,PUT,DELETE /zoos/:id
 */

router.route('/:id')
  .get(async (req, res) => {
    try {
      let zoo = await Zoo.find(req.params.id)
      res.status(200).json(zoo)
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error during zoo fetch.' }})
    }
  })
  .put(async (req, res) => {
    try {
      let zoo = await Zoo.find(req.params.id)

      await Zoo.update(req.params.id, {
        name: (req.body.name || zoo.name)
      })

      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error during zoo update.' }})
    }
  })
  .delete(async (req, res) => {
    try {
      await Zoo.remove(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error during zoo deletion.' }})
    }
  })

/**
 * Export router
 */

module.exports = router
