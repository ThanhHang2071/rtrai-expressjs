const express = require('express')
const path  = require('path') 
const bodyParser = require('body-parser')


const app = express()
const port = 7777

app.use("/public" ,express.static(path.join(__dirname, '/public')))

app.get("/", (req, res) => {
    var duongDanFile = path.join(__dirname, 'home.html')
    res.sendFile(duongDanFile)
})

app.get("/home", (req, res) => {
    res.json("HOME")
})


app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${port}`)
  })