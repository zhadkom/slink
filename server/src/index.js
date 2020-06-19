const express = require('express')
const DB = require('../db/db')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const config = require('../config/config,js')

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

router.post('/register', function (req, res) {
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

app.get('/posts', (req, res) => {
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
