const db = require('../../models')
const Todo = db.Todo
const { StatusCodes } = require('http-status-codes')

const todoController = {
	getTodos: async (req, res, next) => {
		try {
			const todos = await Todo.findAll({ raw: true })
			res.status(StatusCodes.OK).json(todos)
		} catch (error) {
			next(error)
		}
	},
	getTodo: async (req, res, next) => {
		try {
			const id = req.params.id
			const todo = await Todo.findByPk(id, { raw: true })
			if (!todo) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' })
			res.status(StatusCodes.OK).json(todo)
		} catch (error) {
			next(error)
		}
	},
	createTodo: async (req, res, next) => {
		try {
			const { name, UserId } = req.body
			const todo = await Todo.findOne({ raw: true, where: { name } })
			if (todo) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'todo already exist' })
			await Todo.create({ name, UserId })
			const newTodo = await Todo.findOne({ where: { name } })
			res.status(StatusCodes.CREATED).json(newTodo)
		} catch (error) {
			next(error)
		}
	},
	updateTodo: async (req, res, next) => {
		try {
			const id = req.params.id
			const todo = await Todo.findByPk(id)
			if (!todo) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' })
			const updatedTodo = await todo.update(req.body)
			res.status(StatusCodes.OK).json(updatedTodo)
		} catch (error) {
			next(error)
		}
	},
	deleteTodo: async (req, res, next) => {
		try {
			const id = req.params.id
			const todo = await Todo.findByPk(id)
			if (!todo) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' })
			const deletedTodo = await todo.destroy()
			res.status(StatusCodes.OK).json(deletedTodo)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = todoController
