const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const config = require('../config/config.js')
const jwt = require('jsonwebtoken')
const { notFound, errorHandler } = require('../middlewares')
// require db tables
const users = require('../queries/users')

// app settings
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
  users.findByEmail(req.body.email).then((user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 8).then((hash) => {
        const createdUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          image_url: '',
          created_at: new Date(),
          role_id: 1,
        }
        users.insert(createdUser).then((id) => {
          users
            .findByEmail(createdUser.email)
            .then((user) => {
              if (!user) {
                return res
                  .status(500)
                  .send(`That was a problem got the user: ${user.email}`)
              }
              let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400,
              })
              console.log('token: ' + token)
              console.log(`user ${user.id}`)
              res.status(200).send({ auth: true, token: token, user: user })
            })
            .catch((error) => {
              res.status(500).send(error.message)
            })
        })
      })
    }
  })
})

router.post('/sign-in', (req, res) => {
  users.findByEmail(req.body.email).then((user) => {
    if (!user) {
      return res.status(404).send('No user found')
    }
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null })
    }
    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 })
    res.status(200).send({ auth: true, token: token, user: user })
  })
})

app.get('/', (req, res) => {
  res.send([
    {
      title: 'Hello World!',
      description: 'Updating docker image',
    },
  ])
})

app.use(router)

//custom middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || config.port, () => {
  console.log(`Server start on port: ${config.port}`)
})
