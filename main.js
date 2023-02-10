// importing modules
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
mongoose.set('strictQuery', false);

//initialising express
const app = express()
const port = process.env.PORT || 3000

//Connecting to database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", err => console.log(err))
db.once("open", () => { console.log("Successfully connected to database") })
//setting up middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
    secret: 'Key',
    saveUninitialized: true,
    resave: false
}))
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
//Template engine setup
app.set('view engine', 'ejs')
//Setting Routes
app.get('/', (req, res) => {
    res.send("<h1>Hello there...</h1>")
})

app.listen(port, () => {
    console.log(`Server intialised at http://localhost:${port}`)

})