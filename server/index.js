const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const body = require('koa-body')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const router = require('./router/index.js')
const initDatabase = require('./database/init')
const { crossOrigin, validateJWT } = require('./middleware')

const staticPath = path.join(__dirname, '../build')

const app = new Koa()
initDatabase()

app.use(logger())
app.use(historyApiFallback({ whiteList: ['/api'] }))
app.use(serve(staticPath))
app.use(
  body({
    multipart: true,
    formidable: {
      keepExtensions: true,
    },
  })
)
app.use(helmet())
app.use(crossOrigin)
app.use(validateJWT)
app.use(router.routes())
app.use(router.allowedMethods())

app.onerror = error => console.log('TOP LEVEL ERROR: ', error)
app.listen(8080, () => {
  console.log('[Referral] server is running at port 8080...')
})
