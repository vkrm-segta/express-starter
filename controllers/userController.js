const fs = require('fs')

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`))

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
}

exports.createUser = (req, res) => {
    const newId = users[users.length - 1].id + 1
    const newUser = Object.assign({ id: newId }, req.body)

    users.push(newUser)

    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), () => {
        res.status(201).json({
            status: 'success',
            data: {
                User: newUser
            }
        })
    })
}

exports.getUser = (req, res) => {
    const id = req.params.id * 1
    const User = users.find(el => el.id === id)
    console.log(req.requestTime)
    if (!User) {
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
            User
        }
    })
}

exports.updateUser = (req, res) => {
    const id = req.params.id * 1
    const User = users.find(el => el.id === id)
    if (!User) {
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

exports.deleteUser = (req, res) => {
    const id = req.params.id * 1
    const User = users.find(el => el.id === id)
    if (!User) {
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