const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const userController = {
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ where: { email } })
			if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Could not find user' })
			const isPasswordMatch = await bcrypt.compare(password, user.password)
			if (!isPasswordMatch) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Password incorrect'})
			const userId = user.id
			const expiresIn = '1d'
			const payload = {
				id: userId,
				iat: Date.now()
			}
			const signedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn })
			res.status(StatusCodes.OK).json({ userData: user, token: 'Bearer ' + signedToken, expires: expiresIn })
		} catch (error) {
			next(error)
		}
	},
	register: async (req, res, next) => {
		try {
			const { name, email, password, confirmPassword } = req.body
			if (password !== confirmPassword) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Password and Confirm Password are not the same' })
			const user = await User.findOne({ where: { email } })
			if (user) return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: 'Email already exist' })
			const hashPassword = await bcrypt.hash(password, 10)
			const newUser = await User.create({ name, email, password: hashPassword })
			res.status(StatusCodes.OK).json(newUser)
		} catch (error) {
			next(error)
		}
	}
}

module.exports = userController
