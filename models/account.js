const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ExpressJS')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
  username : {
    type : String,
    require : true
  }, 
  password : {
    type : String,
    require : true
  }
}, {
    collection : 'account'
})

const AccountModel = mongoose.model("account", AccountSchema)
module.exports = AccountModel