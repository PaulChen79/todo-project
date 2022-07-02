const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../../middleware/error-handler')
const passport = require('passport')
const todo = require('./modules/todos')
const auth = require('./modules/auth')

router.use('/auth', auth)
router.use('/todos', passport.authenticate('jwt', { session: false }), todo)

router.use('/', generalErrorHandler)

module.exports = router
