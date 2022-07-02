module.exports = {
	generalErrorHandler (err, req, res, next) {
		if (err instanceof Error) {
			res.json(err)
		} else {
			res.json(err)
		}
		next(err)
	}
}
