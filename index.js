const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const AccountModel = require('./models/account')

// const router = require('./apiRouter.js')
const accountRouter = require('./routers/account')
const port = 7777
const app = express()

app.use("/publish" ,express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use("/", router)
// localhost:7777/api1/

app.post("/register", (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  console.log(username, password)
  // res.json("username, password")

  AccountModel.findOne({
    username: username
  })
  .then(data => {
    if (data) {
      res.json('Tài khoản đã tồn tại ')
    }
    else {
      return AccountModel.create({
        username: username,
        password: password
      })
    }
  })
  .then(data => {
    res.json('Tạo tài khoản thành công')
  })
  .catch(err => {
    res.status(500).json('Tạo tài khoản thất bại')
  })
})

app.post('/login', (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  AccountModel.findOne({
    username : username,
    password : password
  })
  .then(data => {
    if(data) {
      res.json("Đăng nhập thành công")
    }
    else {
      res.status(400).json("Username hoặc Password không đúng!")
    }

  })
  .catch(err => {
    res.status(500).json("Đăng nhập thất bại có lỗi bên server")
  })
})

app.use("/api/account/", accountRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})