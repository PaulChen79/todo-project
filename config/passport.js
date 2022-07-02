const passport = require('passport')
const LocalStretegy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

passport.use(new LocalStretegy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, email, password, done) => {
	try {
		const user = await User.findOne({ where: { email } })
		if (!user) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
		return done(null, user)
	} catch (error) {
		done(error, false)
	}
}))

passport.serializeUser((user, done) => {
	return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	try {
		let user = await User.findByPk(id)
		user = await user.toJSON()
		return done(null, user)
	} catch (error) {
		done(error, false)
	}
})

module.exports = passport
