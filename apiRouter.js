const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.json('Router 1 user GET')
})

router.post("/", (req, res) => {
    console.log(req.headers)
    res.json('Router 1 user POST')
})

router.put("/", (req, res) => {
    res.json('Router 1 user PUT')
})

router.delete("/", (req, res) => {
    res.json('Router 1 user DELETE')
})

router.get("/product", (req, res) => {
    res.json('Router 1 product')
})

router.get("/cart", (req, res) => {
    res.json('Router 1 cart')
})

router.get("/:id", (req, res) => {
    res.json('Router 1 user' + req.params.id)
})

module.exports = router