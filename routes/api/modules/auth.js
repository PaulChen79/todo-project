const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/api/auth-contorller')

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router