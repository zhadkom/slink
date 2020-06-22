const express = require('express')
const DB = require('../db/db')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const config = require('../config/config,js')
const jwt = require('jsonwebtoken')

const db = new DB('sqlitedb')
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

app.use(allowCrossDomain)

router.post('/sign-up', function (req, res) {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8),
  ]),
    function (err) {
      if (err) {
        return res.status(500).send('That was a problem registering the user')
      }
      db.selectByEmail(req.body.email, (err, user) => {
        if (err) {
          return res.status(500).send('That was a problem getting user')
        }
        let token = jwt.sign({ id: user.id }, config.secret, { expires: 86400 })
        res.status(200).send({ auth: true, token: token, user: user })
      })
    }
})

router.post('/sign-in', (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null })
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token, user: user })
  })
})

app.get('/', (req, res) => {
  res.send([
    {
      title: 'Hello World!',
      description: 'Hi there! How are you?',
    },
  ])
})

app.use(router)

app.listen(process.env.PORT || config.port, () => {
  console.log('Server start on port: ' + config.port)
})
