const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

const app = express();

// 1) MIDDLEWARE

app.use(express.json())

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log("Hello from middleware 👋")
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

// 2) ROUTES

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


module.exports = app
