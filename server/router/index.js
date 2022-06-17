const Router = require('@koa/router')
const router = new Router()
const routes = require('./config')

router.prefix('/api')

routes.map((route) => {
  return router[route.method](route.path, route.handler)
})

module.exports = router