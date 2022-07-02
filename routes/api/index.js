const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../../middleware/error-handler')
const jwtVerify = require('../../middleware/jwtVerify')
const todo = require('./modules/todos')
const auth = require('./modules/auth')

router.use('/auth', auth)
router.use('/todos', jwtVerify, todo)

router.use('/', generalErrorHandler)

module.exports = router
