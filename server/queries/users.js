const db = require('../db')
const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  image_url: Joi.string().uri(),
  created_at: Joi.date().default(Date.now),
  role_id: Joi.number().integer(),
})

module.exports = {
  findByEmail(email) {
    return db('users').where('email', email).first()
  },
  insert(user) {
    return db('users')
      .insert(user, 'id')
      .then((ids) => {
        console.log('ids[0]: ' + ids[0])
        return ids[0]
      })
      .catch((error) => {
        return error
      })
    // TODO: joi validate
    // const result = Joi.validate(user, schema)
    // if (result.error === null) {
    //   return db('users').insert(user)
    // } else {
    //   return Promise.reject(result.error)
    // }
  },
}
