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

// // Tạo tài khoản hàng loạt 
// for (let i = 0; i < 10; i++) {
//   AccountModel.create({
//     username : "RTR_AI" + i,
//     password : 'rtr',
//     role : '0'
//   })
// console.log("Done" + i)
// }

module.exports = AccountModel