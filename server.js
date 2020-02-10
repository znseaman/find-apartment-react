const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 7000
const path = require('path')
require('dotenv').config()
const sequelize = require('./utils/database')
const listing = require('./routes/api/listing')
const user = require('./routes/api/user')
const search_setting = require('./routes/api/search_setting')
const { login, signup, logout, protect } = require('./utils/auth')
require('./database/pg_notify')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(
  cors({
    // Frontend host
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.get('/authenticated', protect, (req, res, next) =>
  res.json({ authenticated: true }),
)
app.post('/login', login)
app.post('/signup', signup)
app.get('/logout', logout)
app.use('/listing', protect, listing)
app.use('/user', user)
app.use('/search_setting', protect, search_setting)

if (process.env.NODE_ENV == 'production') {
  const clientBuild = path.join(__dirname, './client/build')
  app.use(express.static(clientBuild))

  app.get(`*`, (req, res) =>
    res.sendFile(path.join(__dirname, './client/build/index.html')),
  )
}

// Error handling middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500

  res.status(err.statusCode).json(err)
});
(async () => {
  try {
    // sync sequelize db .sync({force: true}) - reset the entire db
    await sequelize.sync()

    await sequelize
      .authenticate()
      .then(function (err) {
        console.log('Connection has been established successfully.')
      })
      .catch(function (err) {
        console.log('Unable to connect to the database:', err)
      })

    app.listen(port, () => {
      console.log(`App running on port ${port}.`)
    })
  } catch (error) {
    console.error(error)
  }
})()

// Catch unhandled rejections and exceptions
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  })
