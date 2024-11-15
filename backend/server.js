require('dotenv').config()

// imports
const express = require('express')
const journalRoutes = require('./routes/journalRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')

// instantiate the express app
const app = express()

// middleware
app.use(express.json()) 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes 
app.use('/api/journals', journalRoutes)
app.use('/api/users', userRoutes)

// db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to databse & is listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

