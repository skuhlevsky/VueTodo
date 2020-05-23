
const express = require('express')
const history = require('connect-history-api-fallback')
const serveStatic = require("serve-static")
const path = require('path')

app = express()
//add this middleware
app.use(history())
app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started '+ port) 