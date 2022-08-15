var jwt = require('jsonwebtoken')

var data = { username : 'rtr'}
var token = jwt.sign(data, 'rtrai')

console.log(token)
