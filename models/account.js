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
  },
  role : String
}, {
    collection : 'account'
})

const AccountModel = mongoose.model("account", AccountSchema)

// Tạo tài khoản hàng loạt 
// for (let i = 0; i < 20; i++) {
//   AccountModel.create({
//     username : "RTR_AI_" + i,
//     password : 123456
//   })
// }

module.exports = AccountModel