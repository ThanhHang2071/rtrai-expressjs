const express = require('express')
const bodyParser = require('body-parser')
const path  = require('path') 
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const AccountModel = require('./models/account')

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  next();
}

const port = 7777
const app = express()
app.use(cookieParser())

app.use("/public" ,express.static(path.join(__dirname, '/public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// ---------------MIDDLEWARE-------------------------------------------------

var checkLogin = (req, res, next) => {
  // check login
  try {
    var token = req.cookies.token
    var idUser = jwt.verify(token, 'mk')
    AccountModel.findOne({
      _id : idUser
    })
    .then(data => {
      if (data) {
        req.data = data
        next()
      }
      else {
        res.json("NOT PERMISSION")
      }
    })
    .catch(err => {})
  } catch (error) {
    res.status(500).json("Token không hợp lệ")
  }
}

var checkStudent = (req, res, next) => {
  var role = req.data.role
  if (role === 'student' || role === 'teacher' || role === 'manager') {
    next()
  }
  else {
    res.json('NOT PERMISSION')
  }
}

var checkTeacher = (req, res, next) => {
  var role = req.data.role
  if (role === 'teacher' || role === 'manager') {
    next()
  }
  else {
    res.json('NOT PERMISSION')
  }
}

var checkManager = (req, res, next) => {
  var role = req.data.role
  if (role === 'manager') {
    next()
  }
  else {
    res.json('NOT PERMISSION')
  }
}

// ---------------PHÂN TRANG-------------------------------------------------

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
      AccountModel.countDocuments({}).then((total) =>{
        var allPage = Math.ceil(total / PAGE_SIZE)
        res.json({
          allPage : allPage,
          data : data
        })
      }) 
    })
    .catch(err => {
      res.status(500).json("Có lỗi bên server")
    })
  }
  else {
    // get all
    AccountModel.find({})
    .then(data => {
      AccountModel.countDocuments({}).then((total) =>{
        console.log(err, total)
        var allPage = Math.ceil(total / PAGE_SIZE)
        res.json({
          allPage : allPage,
          data : data
        })
      })  
    })
    .catch(err => {
      res.status(500).json("Có lỗi bên server")
    })
  }
})

// app.get('/home', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })  

// ---------------LOGIN-------------------------------------------------
// GET
app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname,'login.html')) 
})

// POST
app.post('/login', (req, res, next) => {
  var username = req.body.username
  var password = req.body.password

  AccountModel.findOne({
    username: username,
    password: password 
  })
  .then(data => {
    if (data) {
      var token = jwt.sign({
        _id : data._id
      }, `mk`)
      return res.json({
        message : 'Bạn đã đăng nhập thành công',
        token : token
      })
    }
    else {
      return res.json('Đăng nhập thất bại')
    }
  })
  .catch(err => {
    res.status(500).json('Lỗi server')
  })
})

// ---------------HOME-------------------------------------------------
// GET
app.get('/home', (req, res, next) => {
  var token = req.cookies.token
  var decodeToken = jwt.verify(token,'mk')
  AccountModel.find({_id : decodeToken._id})
  .then((data) => {
    console.log("3")
    if (data.Length == 0) {
      return res.redirect('/login')
    }
    else {
      if (data[0].role < 2) {
        next()
      }
      else {
        return res.redirect('/login')
      }
    }
  })
  .catch(err => {
    console.error(err)
  })
  // next()
},
(req, res, next) => {
  res.sendFile(path.join(__dirname,'home.html')) 
})

// ---------------EDIT-------------------------------------------------
// POST

app.post('/edit', (req, res, next) => {
  var token = req.headers.cookie.split("-")[1]
  var decodeToken = jwt.verify(token, 'mk')

  AccountModel.find({_id : decodeToken._id})
  .then(function(data) {
    if (data.Length == 0) {
      return res.redirect('/login')
    }
    else {
      if (data[0].role == 0) {
        next()
      }
      else {
        return res.json({
          error : true,
          message : "Bạn không có quyền sửa"
        })
      }
    }
  })
  console.log(token)
}, 
(req, res) => {
  res.json('Sửa thành công')
})


// ---------------STUDENT-------------------------------------------------
// GET
app.get('/student', (req, res, next) => {
  var token = req.cookies
  console.log(token)
  next()
},
(req, res, next) => {
  res.sendFile(path.join(__dirname,'student.html')) 
}) 


// ---------------PRIVATE-------------------------------------------------
app.get('/private', (req, res, next) => {
  try {
    var token = req.cookies.token
    var ketqua = jwt.verify(token, 'mk')
    if (ketqua) {
      next()
    }
  } catch (error) {
    // return res.json('Bạn cần đăng nhập')
    return res.redirect('/login') 
  }
}, (req, res, next) => {
  res.json('Welcomeeee!!!')
})



// -----------------------------ALL TASK----------------
app.get('/task', checkLogin, checkStudent, (req, res, next) => {
  res.json('ALL TASK')
})

app.get('/student', checkLogin, checkTeacher, (req, res, next) => {
  res.json('STUDENT')
})

app.get('/teacher', checkLogin, checkManager, (req, res, next) => {
  res.json('TEACHER')
})



// app.listen(process.env.PORT, () => {
//     console.log(`App listening`)
//     // console.log(`App listening at http://localhost:${port}`)
//   })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  }) 