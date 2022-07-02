const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../../middleware/error-handler')
const todo = require('./modules/todos')

router.use('/todos', todo)

router.use('/', generalErrorHandler)

module.exports = router
