const { validateToken } = require('../jwt')
const User = require('../controller/users')
const { failStructure } = require('../service/utils')
const whiteList = [
  '/api/user/signin',
  '/api/user/signup',
  '/api/user/validateEmail',
]
const TokenExpiredError = 'TokenExpiredError'

exports.crossOrigin = async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Method', '*')
  ctx.response.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  )
  await next()
}

exports.validateJWT = async (ctx, next) => {
  try {
    if (ctx.request.method === 'OPTIONS') {
      await next()
    } else {
      const path = ctx.url.split('?')[0]
      // ask token if path not included in white list
      if (!whiteList.includes(path)) {
        const bearerToken = ctx.headers['authorization']
        if (!bearerToken) throw new Error('No token provided')
        const token = bearerToken.split(' ')[1]
        const { userId } = await validateToken(token)
        const [user] = await User.userData(userId)
        // pass user state though ctx.state
        ctx.state.user = user
      }
      await next()
    }
  } catch (error) {
    console.log(error, 'JWT verification fail')
    if (error.name === TokenExpiredError) {
      // Token expires
      ctx.body = {
        ...failStructure,
        code: 101,
        data: 'Session has been expired, please sign in again.',
      }
    } else {
      ctx.status = 401
    }
  }
}
