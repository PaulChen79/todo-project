const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const PORT = process.env.PORT || 3000
const router = require('./routes/api/index')

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use((req, res, next) => {
	res.locals.success_messages = req.flash('success_msg')
	res.locals.error_messages = req.flash('error_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	next()
})

app.use(router)

app.listen(PORT, () => {
	console.log(`app listening on port ${PORT}`)
})

module.exports = app
