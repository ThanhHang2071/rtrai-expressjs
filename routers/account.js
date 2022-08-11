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


module.exports = router