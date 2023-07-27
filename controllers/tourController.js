const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.createTour = (req, res) => {
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

exports.getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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