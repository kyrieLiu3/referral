const Router = require('@koa/router')
const routes = require('./config')

const router = new Router()
router.prefix('/api')

routes.map(route => router[route.method](route.path, route.handler))

module.exports = router
