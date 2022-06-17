const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const bodyParser = require('koa-bodyparser');
const router = require('./router/index.js')
const initDatabase = require('./database/init')
const { crossOrigin } = require('./middleware')

const staticPath = path.join(__dirname, '../build')

const app = new Koa()
initDatabase()

app.use(historyApiFallback({ whiteList: ['/api'] }))
app.use(serve(staticPath))
app.use(bodyParser());
app.use(crossOrigin)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080, () => {
  console.log('[Referral] server is running at port 8080...')
})