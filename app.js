const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// 2) ROUTE HANDLERS

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    console.log(req.requestTime)
    if (!tour) {
        return res.status(404).json(
            {
                status: 'failed',
                message: 'Invalid Id',
            }
        )
    }

    res.status(200).json({
        status: 'success',
        requestAt: req.requestTime,
        data: {
            tour
        }
    })
}

const updateTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json(
            {
                status: 'failed',
                message: 'Invalid Id'
            }
        )
    }

    res.status(200).json({
        status: 'success',
        data: {
            message: "updated line..."
        }
    })
}

const deleteTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json(
            {
                status: 'failed',
                message: 'Invalid Id'
            }
        )
    }

    res.status(200).json({
        status: 'success',
        data: null
    })
}

// 3) ROUTES

// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

// 4) START SERVER

const port = 3030
app.listen(port, () => {
    console.log(`App is running from ${port}...`)
})