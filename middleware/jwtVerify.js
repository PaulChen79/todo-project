const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const jwtVerify = (req, res, next) => {
	try {
		const tokentPart = req.headers.authorization.split(' ')
		if (tokentPart[0] === 'Bearer' && tokentPart[1].match(/\S+\.\S+\.\S+/) !== null) {
			try {
				const verification = jwt.verify(tokentPart[1], process.env.JWT_SECRET)
				req.jwt = verification
				next()
			} catch (error) {
				res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authorized to access this' })
			}
		}
	} catch (error) {
		res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authorized to access this' })
	}
}

module.exports = jwtVerify
