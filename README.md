1. [TỔNG QUAN FRAMEWORK EXPRESSJS NODEJS](#tổng-quan-framework-expressjs-nodejs)
2. [KHỞI TẠO DỰ ÁN](#khởi-tạo-dự-án)
3. [CÁCH SỬ DỤNG ROUTER TRONG EXPRESSJS](#cách-sử-dụng-router-trong-expressjs)
4. [MIDDLEWARE](#middleware)
5. [SỬ DỤNG CÁC METHOD GET, POST, PUT, DELETE CHUẨN RESTFUL API](#sử-dụng-các-method-get-post-put-delete-chuẩn-restful-api)
6. [TRIỂN KHAI CHỨC NĂNG ĐĂNG KÝ, ĐĂNG NHẬP](#triển-khai-chức-năng-đăng-ký-đăng-nhập)
7. [TÌM HIỂU CHUẨN RESTFUL API](#tìm-hiểu-chuẩn-restful-api)
8. [EXPRESS STATIC , THIẾT LẬP FILE TĨNH, PUBLIC FILE TRONG EXPRESSJS](#express-static--thiết-lập-file-tĩnh-public-file-trong-expressjs)
9. [HƯỚNG DẪN ĐẨY CODE EXPRESSJS NODEJS LÊN HEROKU - DELOY SERVER HEROKU](#hướng-dẫn-đẩy-code-expressjs-nodejs-lên-heroku---deloy-server-heroku)
10. [PHÂN TRANG API, PAGINATION API](#phân-trang-api-pagination-api)
11. [LUYỆN TẬP PHÂN TRANG PAGINATION API DƯỚI CLIENT](#luyện-tập-phân-trang-pagination-api-dưới-client)
12. [GIỚI THIỆU VỀ CORS VÀ CÁCH MỞ CORS TRONG EXPRESS SERVER](#giới-thiệu-về-cors-và-cách-mở-cors-trong-express-server)
13. [JSONWEBTOKEN TRONG EXPRESSJS](#jsonwebtoken-trong-expressjs)
14. [ÁP DỤNG JWT LÀM CHỨC NĂNG ĐĂNG NHẬP, XÁC THỰC LOGIN VÀ BẢO VỆ ROUTER](#áp-dụng-jwt-làm-chức-năng-đăng-nhập-xác-thực-login-và-bảo-vệ-router)
15. [ÁP DỤNG JWT PHÂN QUYỀN USER](#áp-dụng-jwt-phân-quyền-user)
16. [AJAX VÀ XÁC THỰC PHÂN QUYỀN](#ajax-và-xác-thực-phân-quyền)

# TỔNG QUAN FRAMEWORK EXPRESSJS NODEJS

Express là một framework application web. Cung cấp các API

- Kiến thức cần chuẩn bị trước :
  - Có nền tảng JS chắc chắn 
  - Biết áp dụng bất đồng bộ trong JS
  - Đã tìm hiểu về nodejs và các builtin cơ bản : FS, Path, ...
  - Biết sử dụng npm các package
  - Biết Database cơ bản 


# KHỞI TẠO DỰ ÁN 

- Sử dụng lệnh sau để tạo file `package.json` :
``` 
$ npm init -y
```
- Cài đặt `express` :
``` 
$ npm i express
```
- Cài đặt `nodemon` :
``` 
$ npm i nodemon -save--dev
```
- Đoạn code mẫu trong file `index.js`
``` javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
```
*Note* : Đặt `port` nên đặt trên 1000

- Trong file `package.json` với `"scripts"` tạo thêm start để mỗi lần ở terminal chỉ cần lệnh `npm start` là có thể chạy khởi tạo server và cập nhập liên tục
``` json
 "scripts": {
    "start" : "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

# CÁCH SỬ DỤNG ROUTER TRONG EXPRESSJS

- **Routers** : Người quản lý đường dẫn, nhóm lại các đường dẫn
- **`index.js`** : 
``` javascript
const express = require('express')
const router1 = express.Router()
const router2 = express.Router()
const port = 7777
const app = express()

router1.get("/", (req, res) => {
    res.json('Router 1 user')
})

app.get('/', (req, res) => {
  res.json('Home')
})

app.use("/api1/", router1)
// localhost:7777/api1/

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
```
Để quản lý các đường dẫn có chung tiền tố, tạo một file dạng _Router.js để các đường dẫn ấy vào, ví dụ có chung tiền tố `/api1/`, tạo 1 file `apiRouter.js`

`apiRouter.js` :
```javascript
const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.json('Router 1 user')
})

router.get("/product", (req, res) => {
    res.json('Router 1 product')
})

router.get("/cart", (req, res) => {
    res.json('Router 1 user')
})

module.exports = router
```
Còn file `index.js` thành : 
``` javascript
const express = require('express')
const router1 = require('./apiRouter')
const port = 7777
const app = express()

app.use("/api/", router)
// localhost:7777/api/

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
```

# MIDDLEWARE

- **Middleware** : dùng để ngăn chặn quyền truy cập 

# SỬ DỤNG CÁC METHOD GET, POST, PUT, DELETE CHUẨN RESTFUL API

- Truy xuất đường dẫn trên trang web mặc định là GET 
- Khi POST các dữ liệu lên cần đổi các dữ liệu đấy vào request, sử dụng thư viện `body-parser`
```
$ npm i body-parser
```
Require thư viện trong `index.js` :
```javascript
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```
- Muốn đọc request body với headers thì dùng lệnh :
``` javascript
req.headers
req.body
```

# TRIỂN KHAI CHỨC NĂNG ĐĂNG KÝ, ĐĂNG NHẬP 

- Cài đặt `mongoose` :
```
$ npm i mongoose
```
- Tạo folder `models` để chứa các model
- Trong models tạo một file `account.js` để tạo Schema cho các data lưu vào MongoDB
- **`account.js`** :
``` javascript
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
```
- Require AccountModel trong `index.js` và chỉnh lại phần POST :
```javascript
const AccountModel = require('./models/account')

app.post("/register", (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  console.log(username, password)
  // res.json("username, password")
  AccountModel.create({
    username: username,
    password: password
  })
  .then(data => {
    res.json('Tạo tài khoản thành công')
  })
  .catch(err => {
    res.status(500).json('Tạo tài khoản thất bại')
  })
})
```
- (`index.js`) Để không bị trùng username với nhau, đổi đoạn post thành :
``` javascript
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
```
- Tạo chức năng login, trong file `index.js` thêm đoạn code sau :
```javascript
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
```
- Sử dụng `Thunder Client` (extension VS code) hoặc `Postman` để test API :


# TÌM HIỂU CHUẨN RESTFUL API 

- Tạo folder `routers`, sau đó tạo file `account.js` 
- **`routers/account.js`** thêm đoạn sau để lấy dữ liệu các tài khoản đã tạo có trong DB :
```javascript
const express = require('express')
const router =  express.Router()
const AccountModel = require('../models/account')

// Lấy dữ liệu từ DB
router.get('/', (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json("Lỗi server")
    })
})

// Thêm mới dữ liệu từ DB
router.post('/', (req, res, next) => {
    AccountModel.create({})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json("Lỗi server")
    })
})
```
- Thử API trong Thunder Client :
<div align='center'>
<img src="img/accountGET.png" 
width='100%'>
</div>

- **`routers/account.js`** Thêm tiếp đoạn sau để tạo tài khoản :
``` javascript
// Thêm mới dữ liệu từ DB
router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    AccountModel.create({
        username : username,
        password : password
    })
    .then(data => {
        res.json("Tạo tài khoản thành công!")
    })
    .catch(err => {
        res.status(500).json("Lỗi server")
    })
})
```
- Tiếp tục thử trong Thunder Client :

<div align='center'>
<img src="img/accountPOST.png" 
width='100%'>
</div>

Kiểm tra trong MongoDB hoặc sử dụng method GET để xem dữ liệu đã được thêm chưa

- **`routers/account.js`** Thêm tiếp đoạn sau để update tài khoản (đổi password) :

``` javascript
// Update dữ liệu trong DB
router.put('/:id', (req, res, next) => {
    var id = req.params.id
    var newPassword = req.body.password
    AccountModel.findByIdAndUpdate(id, {
        password : newPassword 
    })
    .then(data => {
        res.json("Đổi mật khẩu thành công!")
    })
    .catch(err => {
        res.status(500).json("Lỗi server")
    })
})
```
- Tiếp tục thử trong Thunder Client, lấy id một tài khoản đã tạo để vào trong đường link :

<div align='center'>
<img src="img/accountPUT.png" 
width='100%'>
</div>

- **`routers/account.js`** Thêm tiếp đoạn sau để xóa tài khoản trong DB :

``` javascript
// Xóa dữ liệu trong DB
router.delete('/:id', (req, res, next) => {
    var id = req.params.id
    AccountModel.deleteOne({
        _id : id
    })
    .then(data => {
        res.json("Xóa tài khoản thành công!")
    })
    .catch(err => {
        res.status(500).json("Lỗi server")
    })
})
```
- Tiếp tục thử trong Thunder Client, lấy id một tài khoản đã tạo để vào trong đường link :

<div align='center'>
<img src="img/accountDEL.png" 
width='100%'>
</div>

- **`routers/account.js`** Để xem thông tin của một tài khoản, thêm đoạn code sau : 
``` javascript
router.get('/:id', (req, res, next) => {
    var id = req.params.id
    AccountModel.findById(id)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json("Lỗi server")
    })
})
```

# EXPRESS STATIC , THIẾT LẬP FILE TĨNH, PUBLIC FILE TRONG EXPRESSJS

-Tạo một folder `public`, tạo file `server.js` thêm đoạn code sau :
```javascript
const express = require('express')
const path  = require('path') 

const app = express()
const port = 7777

app.use("/public" ,express.static(path.join(__dirname, '/public')))

app.get("/", (req, res) => {
    var duongDanFile = path.join(__dirname, 'home.html')
    res.sendFile(duongDanFile)
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
```
- Tạo file `home.html` :
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./public/home.css">
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```
- Tạo file `home.css` trong `public`:
```css
h1{
    color: red;
    font-size: 50px;
}
```
- Chạy `npm start` để khởi tạo server, nhớ đổi trong `package.json` từ `index.js` -> `server.js`, sau khi chạy được như hình :
<div align='center'>
<img src="img/startsv.png" 
width='50%'>
</div>

# HƯỚNG DẪN ĐẨY CODE EXPRESSJS NODEJS LÊN HEROKU - DELOY SERVER HEROKU

- Truy cập <a href="https://www.heroku.com/">Heroku</a>
- Tạo tài khoản, chọn `Create a new app` để tạo app mới
<div align='center'>
<img src="img/homeHeroku.png" 
width='100%'>
</div>

- Vào `GitHub` tạo resposity mới và up dữ liệu lên GitHub theo hướng dẫn <a href="https://fullstack.edu.vn/blog/cach-dua-code-len-github-va-tao-github-pages.html">này</a>
<div align='center'>
<img src="img/createReGit.png" 
width='100%'>
</div>

- Chọn `Connect to GitHub`, chọn dự án đã up, kéo xuống chọn `Enable Automatic Deploys` 

<div align='center'>
<img src="img/autodeployGit.png" 
width='100%'>
</div>

- Kéo lên bấm vào `Open App` sẽ có giao diện, chờ khoảng vài phút 

- Mỗi lần sửa code xong cần up lên dùng lệnh trong terminal :
``` 
$ git add .
```
- Thêm commit :
```
$ git commit -m "..."
```
```
$ git push
```
- Chỉnh lại file server đoạn tạo port lắng nghe :
```javascript
app.listen(process.env.PORT, () => {
    console.log(`App listening`)
    // console.log(`App listening at http://localhost:${port}`)
  })
```

# PHÂN TRANG API, PAGINATION API 

- Tăng trải nghiệm người dùng tốt hơn với phân trang, mỗi lần lướt xuống hoặc qua trang sẽ load khối phần tử trong dữ liệu đó 
- Xem giải thích ở clip <a href="https://www.youtube.com/watch?v=s5DmOa10aG8&list=PLodO7Gi1F7R1GMefX_44suLAaXnaNYMyC&index=10">này</a>
- Tạo file `User.js` trong folder `models` :
- **`User.js`** :
```javascript
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

for (let i = 0; i < 20; i++) {
  AccountModel.create({
    username : "RTR_AI_" + i,
    password : 123456
  })
}

module.exports = AccountModel
```
*Vòng lặp for để tạo 20 acc với pass là "123456", sau đó xóa phần vòng lặp đó đi.*

- Lúc này `server.js` sẽ như thế này để xem all users, hoặc coi theo từng trang :
```javascript
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
```

# LUYỆN TẬP PHÂN TRANG PAGINATION API DƯỚI CLIENT

- Tạo file `index.html` trong đó : 
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./public/home.css">
</head>
<body>
    <h1>Welcome</h1>
</body>
<script src="./public/js/jquery-3.6.0.min.js"></script>
<script src="./public/js/main.js"></script>
</html>
```

- Tạo folder `js` trong folder `public`, sau đó :
  - Vào <a href="https://code.jquery.com/jquery-3.6.0.min.js">đây</a> save thành file `public/js/jquery-3.6.0.min.js` 
  - Tạo file `main.js`, trong đó :
```javascript
var currentPage = 1

function loadPage(page) {
    currentPage = page
    $.ajax({
        url : '/user?page=' + page,
        type : 'GET'
    })
    .then(data => {
        $(`#content`).html('')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = $(`
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $(`#content`).append(item)
        }
    })
    .catch(err => {
        console.log('API lỗi')
    })
}

function nextPage() {
    currentPage++
    $.ajax({
        url : '/user?page=' + currentPage,
        type : 'GET'
    })
    .then(data => {
        $(`#content`).html('')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = $(`
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $(`#content`).append(item)
        }
    })
    .catch(err => {
        console.log('API lỗi')
    })
}

function prePage() {
    currentPage--
    $.ajax({
        url : '/user?page=' + currentPage,
        type : 'GET'
    })
    .then(data => {
        $(`#content`).html('')
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            var item = $(`
                <h1>${element.username} : ${element.password}</h1>
            `)
    
            $(`#content`).append(item)
        }
    })
    .catch(err => {
        console.log('API lỗi')
    })
}

```
- `index.html`:
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./public/css/home.css">
</head>
<link rel="stylesheet" href="./public/css/bootstrap.css">
<body>
    <div id="content"></div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#" onclick="prePage(1)">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#" onclick="loadPage(1)">1</a></li>
          <li class="page-item"><a class="page-link" href="#" onclick="loadPage(2)">2</a></li>
          <li class="page-item"><a class="page-link" href="#" onclick="loadPage(3)">3</a></li>
          <li class="page-item"><a class="page-link" href="#" onclick="loadPage(4)">4</a></li>
          <li class="page-item"><a class="page-link" href="#" onclick="loadPage(5)">5</a></li>
          <li class="page-item"><a class="page-link" href="#" onclick="nextPage()">Next</a></li>
        </ul>
    </nav>
</body>
<script src="./public/js/pagination.js"></script>
<script src="./public/js/jquery-3.6.0.min.js"></script>
<script src="./public/js/main.js"></script>
</html>
```

# GIỚI THIỆU VỀ CORS VÀ CÁCH MỞ CORS TRONG EXPRESS SERVER

- CORS là một cơ chế cho phép nhiều tài nguyên khác nhau (fonts, Javascript, v.v…) của một trang web có thể được truy vấn từ domain khác với domain của trang đó. CORS là viết tắt của từ `Cross-origin resource sharing`.
- Tải thư viện về :
```
$ npm i cors
```
- Thêm vào `server.js` đoạn sau :
```javascript
//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
```
# JSONWEBTOKEN TRONG EXPRESSJS 

(Xem video giải thích ở <a href="https://www.youtube.com/watch?v=MMhW3SNZwJQ&list=PLodO7Gi1F7R1GMefX_44suLAaXnaNYMyC&index=14">đây</a>)

- `JWT` là một phương tiện đại diện cho các yêu cầu chuyển giao giữa hai bên Client – Server , các thông tin trong chuỗi JWT được định dạng bằng JSON . Trong đó chuỗi Token phải có 3 phần là :
  - `Header` : Chứa kiểu dữ liệu, và thuật toán sử dụng để mã hóa ra chuỗi JWT
``` json
{
    "typ": "JWT",
    "alg": "HS256"
}
```
*“typ” (type) chỉ ra rằng đối tượng là một JWT
“alg” (algorithm) xác định thuật toán mã hóa cho chuỗi là HS256*

  - `Payload` : chứa các thông tin muốn đặt trong chuỗi Token như :
``` json
{
  "user_name": "admin",
  "user_id": "1513717410",
  "authorities": "ADMIN_USER",
  "jti": "474cb37f-2c9c-44e4-8f5c-1ea5e4cc4d18"
}
```
  - `Signature` : được tạo ra bằng cách mã hóa phần header, payload kèm theo một chuỗi *secret* (khóa bí mật) :
```js
data = base64urlEncode( header ) + "." + base64urlEncode( payload )
signature = Hash( data, secret );
```
*base64UrlEncoder : thuật toán mã hóa header và payload*
Sau khi mã hóa :
```
// header
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// payload
eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTEzNzE
```
Sau đó mã hóa 2 chuỗi trên kèm theo secret (khóa bí mật) bằng thuật toán HS256 :
```
9nRhBWiRoryc8fV5xRpTmw9iyJ6EM7WTGTjvCM1e36Q
```
--> *Cuối cùng kết hợp 3 chuỗi trên sẽ được một chuỗi JWT hoàn chỉnh*

- Tải thư viện :
```
$ npm i jsonwebtoken
```

- Tạo 1 file `training.js` :
```javascript
var jwt = require('jsonwebtoken')

var data = { username : 'rtr'}
var token = jwt.sign(data, 'rtrai')

console.log(token)
```
- Chạy file được đoạn mã hóa sau :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ0ciIsImlhdCI6MTY2MDU0Njk4OX0.QrWdM8DeXbVq6CeaTMRh7YPvxWDVf-BGBacE0yH_WH8
```
- Muốn xem mã hóa ngược vào <a href="https://fullstack.edu.vn/blog/cach-dua-code-len-github-va-tao-github-pages.html">đây</a>

*NOTE* :
  - token = header.payload.signature

  - data + secret (sign) => token
  - token + secret (verify) => data

  - Sign : có callback là hàm bất đồng bộ (async), có thể set ExpriedIn
  
  - Mỗi token đều có tham số riêng, khi tạo ra không hủy được token đó

# ÁP DỤNG JWT LÀM CHỨC NĂNG ĐĂNG NHẬP, XÁC THỰC LOGIN VÀ BẢO VỆ ROUTER 
- Tạo một file `login.html` :
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    Username : <input type="text"><br>
    Password : <input type="text"><br>
    <button onclick="">Login</button>
</body>
</html>
```
- Thêm vào trong `server.js` method post và get cho login :
```javascript
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
      return res.json('Bạn đã đăng nhập thành công')
    }
    else {
      return res.json('Đăng nhập thất bại')
    }
  })
  .catch(err => {
    res.status(500).json('Lỗi server')
  })
})
```
- Trả về token là một id (`server.js`), sửa lại phần post thành :

```javascript
const jwt = require('jsonwebtoken')

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
```
Test API được :

<div align='center'>
<img src="img/loginAPI.png" 
width='100%'>
</div>

- Chỉnh giao diện để tương tác (`login.html`) :
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<script src="./public//js/jquery-3.6.0.min.js"></script>
<body>
    Username : <input type="text" id="username" placeholder="Username" required><br>
    Password : <input type="text" id="password" placeholder="Password" required><br>
    <button onclick="login()">Login</button>
</body>
<script>
    function login() {  
        $.ajax({
            url : '/login',
            type : 'POST',
            data : {
                username : $('#username').val(),
                password : $('#password').val(),
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
</script>
</html>
```
- Tạo một trang chỉ đăng nhập mới được xem (/private), có lưu token vào cookie
- `server.js` :
```javascript
// ---------------PRIVATE-------------------------------------------------
app.get('/private/:token', (req, res, next) => {
  try {
    var token = req.params.token 
    var ketqua = jwt.verify(token, 'mk')
    if (ketqua) {
      next
    }
  } catch (error) {
    return res.json('Bạn cần đăng nhập')
  }
}, (req, res, next) => {
  res.json('Welcomeeee!!!')
})
```
- `login.html` :
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<script src="./public//js/jquery-3.6.0.min.js"></script>
<body>
    Username : <input type="text" id="username" placeholder="Username" required><br>
    Password : <input type="text" id="password" placeholder="Password" required><br>
    <button onclick="login()">Login</button>
</body>
<script>
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function login() {  
        $.ajax({
            url : '/login',
            type : 'POST',
            data : {
                username : $('#username').val(),
                password : $('#password').val(),
            }
        })
        .then(data => {
            setCookie('token', data.token, 1)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
</script>
</html>
```
- Để đọc được cookie cần tải thư viện `cookie - parser`
```
$ npm i cookie-parser
```

- Thêm vào `server.js` :
```javascript
const cookieParser = require('cookie-parser')

app.use(cookieParser())

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
```

# ÁP DỤNG JWT PHÂN QUYỀN USER

- Tạo 1 middleware check login :
``` javascript
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
```
- Thêm middleware này vào route /task, cho tất cả người dùng vào nên chỉ cần checkLogin
``` javascript
// -----------------------------ALL TASK----------------
app.get('/task', checkLogin, (req, res, next) => {
  res.json('ALL TASK')
})
```
- Tạo middleware chỉ account student, teacher, manager mới được vào :
``` javascript
var checkStudent = (req, res, next) => {
  var role = req.data.role
  if (role === 'student' || role === 'teacher' || role === 'manager') {
    next()
  }
  else {
    res.json('NOT PERMISSION')
  }
}

// -----------------------------ALL TASK----------------
app.get('/task', checkLogin, checkStudent, (req, res, next) => {
  res.json('ALL TASK')
})
```
- Tạo middleware chỉ account teacher, manager mới được vào :
``` javascript
var checkTeacher = (req, res, next) => {
  var role = req.data.role
  if (role === 'teacher' || role === 'manager') {
    next()
  }
  else {
    res.json('NOT PERMISSION')
  }
}

app.get('/student', checkLogin, checkTeacher, (req, res, next) => {
  res.json('STUDENT')
})
```
- Tạo middleware chỉ account manager mới được vào :
``` javascript
var checkManager = (req, res, next) => {
  var role = req.data.role
  if (role === 'manager') {
    next()
  }
  else {
    res.json('NOT PERMISSION')
  } 
}

app.get('/teacher', checkLogin, checkManager, (req, res, next) => {
  res.json('TEACHER')
})
```
- Có thể thay các role bằng số để dễ viết giải thuật của các middleware hơn.
- Với các hệ thống có nhiều phân quyền có thể tham khảo thư viện <a href="https://www.npmjs.com/package/acl">acl</a>


# AJAX VÀ XÁC THỰC PHÂN QUYỀN

- Tạo 1 file `home.html` :
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
</head>
<body>
    Đây là trang home
</body>
</html>
```

- Vào `server.js` tạo route cho /home
```javascript
// ---------------HOME-------------------------------------------------
// GET
app.get('/home', (req, res, next) => {
  var token = req.cookies.token
  var decodeToken = jwt.verify(token,'mk')
  AccountModel.find({_id : decodeToken._id})
  .then(data => {
    if (data.Length == 0) {
      return res.redirect('/login')
    }
    else {
      if (data[0].role == 2) {
        next()
      }
      else {
        return res.redirect('/login')
      }
    }
  })
  next()
},
(req, res, next) => {
  res.sendFile(path.join(__dirname,'home.html')) 
})
```

- Chỉnh lại `login.html` để sau khi login thì chuyển sang trang home :
```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<script src="./public//js/jquery-3.6.0.min.js"></script>
<body>
    Username : <input type="text" id="username" placeholder="Username" required><br>
    Password : <input type="text" id="password" placeholder="Password" required><br>
    <button onclick="login()">Login</button>
</body>
<script>
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function login() {  
        $.ajax({
            url : '/login',
            type : 'POST',
            data : {
                username : $('#username').val(),
                password : $('#password').val(),
            }
        })
        .then(data => {
            setCookie('token', data.token, 1)
            // console.log(data)
            window.location.href = "/home"
        })
        .catch(err => {
            console.log(err)
        })
    }
</script>
</html>
```

-  Tạo file `student.html` :
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student</title>
</head>
<body>
    Đây là trang Student
</body>
</html>
```

- Tạo route cho /student trong `server.js` :
```javascript
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
```

- Tạo route /home với method GET chỉ cho manager và teacher có quyền vào (`server.js`): 
```javascript
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
```

- Tạo route /edit với method POST chỉ cho manager có quyền chỉnh sửa (`server.js`): 
```javascript
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
```
  - `home.html` sửa thành : 
``` html  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
</head>
<body>
    Đây là trang home
    <button id = "btn">Edit</button>
</body>
<script>
    $("#btn").click(function() {
        var token = getCookie("token")
        $.ajax({
            url : "/edit",
            headers : {
                token :token
            },
            type : "post"
        })
        .then(data => console.log(data))
    })
   

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
        }
</script>
</html>
```

