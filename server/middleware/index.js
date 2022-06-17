exports.crossOrigin = async (ctx, next) => {
  await next()
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Method', '*')
  ctx.response.set("Access-Control-Allow-Headers", "Content-Type")
}