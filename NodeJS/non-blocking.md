# CƠ CHẾ BẤT ĐỒNG BỘ 

Về cơ bản, bất đồng bộ là các câu lệnh chạy có thể không theo thứ tự, lệnh chạy trước có thể kết thúc sau câu lệnh chạy sau.

- ***Non-blocking*** : 
Bất đồng bộ giải quyết được vấn đề blocking của đồng bộ, được gọi là non-blocking. Nghĩa là khi chạy một tác vụ nặng (IO, network,...) thì những lệnh tiếp theo được phép chạy ngay mà không cần chờ tác vụ kia hoàn thành.

# MODULE EXPORTS VÀ LỆNH REQUIRE

- Dùng lệnh trong file cần sử dụng, đặt biến tùy ý
``` javascript
const _ = require('/_.js')
```
Còn trong file có module, cần có lệnh :
```javascript
module.exports = _  // Tên function
```

- Cách lấy đường dẫn nội bộ : 
```javascript
const path = require('path')
const duongdan = path.join(__dirname, 'index.js)
console.log(duongdan)
```

# CÁC PACKAGE THƯ VIỆN JAVASCRIPT CÓ SẴN, LODASH, CHALK, JQUERY

- Để tải các thư viện : 
```
npm i namepackage
```
- Tạo `package.json` chứa thông tin toàn bộ dự án bằng lệnh, `-y` để tự tạo toàn bộ khi chưa cần nhập thông tin, ở đây sẽ chứa tên các thư viện đã cài đặt :
```
npm init -y
```

- Thư viện `lodash` chuyên các hàm có sẵn của javascript
```
npm i lodash
```
*.js*
``` javascript
const _ = require('lodash')
```
- Mỗi lần đổi dự án không cần có file `node_modules`, để khởi động lại dự án dùng lệnh để tải lại các thư viện :
```
npm install
```

- Thiết lập `start` để mỗi lần chuyển người khác chỉ cần chạy lệnh này để chạy khởi động dự án :
```
npm start
```

Trong file `package.json`, thêm vào trong `"scripts"` dòng này, `index chính là tên tệp khởi động dự án`

``` json
"scripts" : {
    "start" : "nodemon index.js"
}
```
Có thể chạy 2 file cùng lúc : 
``` json
"scripts" : {
    "start" : "nodemon index.js && nodemon demo.js"
}
```

# TỔNG ÔN KIẾN THỨC NÂNG CAO VỀ NODEJS

Bất đồng bộ 
    Promise
    Async await
Method căn bản trong javascript
String : split, include, toUpperCases
Math : FLoor, round, random, pow
Date : Date.now

Object, array :
    Object.assign()
    push : thêm vào phần tử 
    pop : Đẩy ra phần tử 
    filter : 
    map : biến đổi array thành array mới

``` javascript
var arr1 = [1, 2, 3, 4]
var arr2 = arr1.map((item) => {
    return item * 2
})
// arr2 [2,4,6,8]
```

- childProces :
  - spawn : sinh ra từ một đường dẫn, cửa sổ, câu lệnh nào đó
  - fork : nhân bản
``` javascript
function fork() {
    spawn(abc)
}
```
  - cluster : chạy trên 1 luồng, 1 cụm các process truyền dữ liệu qua nhau, mỗi process chiếm 1 luồng CPU 
``` javascript
childProces.fork() => process1
childProces.fork() => process2
childProces.fork() => process3
childProces.fork() => process4
```

# FILE SYSTEM TRONG NODEJS

Học tới đây : https://www.youtube.com/watch?v=qp5qm6tY1UA&list=PLodO7Gi1F7R3oGh2GVryNQZLU_PnNsOVY&index=5

