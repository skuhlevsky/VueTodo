
const express = require('express')
const history = require('connect-history-api-fallback')
const serveStatic = require("serve-static")
// const path = require('path')

const app = express()

const staticFileMiddleware = express.static(__dirname)
app.use(staticFileMiddleware)
app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use(history({
  disableDotRule: true,
  verbose: true
}))
app.use(staticFileMiddleware)

const port = process.env.PORT || 80
app.listen(port)

console.log('server started '+ port)