const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../database/constant')

exports.generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, PRIVATE_KEY, { expiresIn: '30 days' }, (error, token) => {
      if (error) reject(error)
      else resolve(token)
    })
  })
}

exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, PRIVATE_KEY, (error, decode) => {
      if (error) reject(error)
      else resolve(decode)
    })
  })
}