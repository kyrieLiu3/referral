const { validateToken } = require('../jwt')
const User = require('../controller/users')
const whiteList = ['/api/user/signin', '/api/user/signup', '/api/user/validateEmail']

exports.crossOrigin = async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Method', '*')
  ctx.response.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
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
        const token = ctx.headers['authorization']
        const { userId } = await validateToken(token)
        const [user] = await User.userData(userId)
        // pass user state though ctx.state
        ctx.state.user = user
        await next()
      } else {
        await next()
      }
    }
  } catch (error) {
    console.log(error, 'JWT verification fail')
    ctx.status = 401
  }
}