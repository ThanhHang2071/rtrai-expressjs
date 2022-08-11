const express = require('express')
const bodyParser = require('body-parser')
const path  = require('path') 

const AccountModel = require('./models/account')

const port = 7777
const app = express()

app.use("/public" ,express.static(path.join(__dirname, '/public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const PAGE_SIZE = 2   // Số phần tử giới hạn

app.get('/user', (req, res, next) => {
  var page = req.query.page
  // http://localhost:7777/user?page=1
  if(page) {
    // get page
    page = parseInt(page)
    if (page < 1) {
        page = 1
      }
    var skip = (page - 1) * PAGE_SIZE // Số lượng bỏ qua
    AccountModel.find({})
    .skip(skip)
    .limit(PAGE_SIZE)   
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json("Có lỗi bên server")
    })
  }
  else {
    // get all
    AccountModel.find({})
    .then(data => {
      res.json(data)  
    })
    .catch(err => {
      res.status(500).json("Có lỗi bên server")
    })
  }
})

// app.listen(process.env.PORT, () => {
//     console.log(`App listening`)
//     // console.log(`App listening at http://localhost:${port}`)
//   })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })