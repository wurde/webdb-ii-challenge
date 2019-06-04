'use strict'

/**
 * Dependencies
 */

const express = require('express')
const Bear = require('../models/Bear')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 *   GET,POST /bears
 */

router.route('/')
  .get(async (req, res) => {
    try {
      let bears = await Bear.all()
      res.status(200).json(bears)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during bears fetch.' }})
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
      let bear = await Bear.insert({
        name: req.body.name
      })
      res.status(201).json(bear)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Server error during bear creation.' }})
    }
  })

/**
 * Routes
 *   GET,PUT,DELETE /bears/:id
 */

router.route('/:id')
  .get(async (req, res) => {
    try {
      let bear = await Bear.find(req.params.id)
      res.status(200).json(bear)
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error during bear fetch.' }})
    }
  })
  .put(async (req, res) => {
    try {
      let bear = await Bear.find(req.params.id)

      await Bear.update(req.params.id, {
        name: (req.body.name || bear.name)
      })

      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error during bear update.' }})
    }
  })
  .delete(async (req, res) => {
    try {
      await Bear.remove(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ error: { message: 'Server error during bear deletion.' }})
    }
  })

/**
 * Export router
 */

module.exports = router
