require('dotenv').config('../env')
const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const app = express()

//conexao BD
mongoose.connect(process.env.CONNECTIONBD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.emit('ok')
}).catch(err => {
    console.log(err)
    return console.log('database connection failed')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

//server
app.on('ok', () => {
    app.listen(3000, () => {
        console.log('Servidor rodando')
        console.log('http://localhost:3000')
    })
})
