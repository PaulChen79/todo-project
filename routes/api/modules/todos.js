const express = require('express')
const router = express.Router()
const todoController = require('../../../controllers/api/todo-controller')

router.get('/:id', todoController.getTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)
router.get('/', todoController.getTodos)
router.post('/', todoController.createTodo)

module.exports = router