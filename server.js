const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 9000

app.use(bodyParser.json())

var cars = {
    "Nexia": {
        "Wheels": 4,
        "Color": "Red",
        "Year": 2010
    },
    "Cobalt": {
        "Wheels": 4,
        "Color": "Black",
        "Year": 2020
    }
}

app.get("/", (req, res) => {
    res.json(cars)
})

app.get("/:carName", (req, res) => {
    if (cars.hasOwnProperty(req.params.carName)) {
        var car = cars[req.params.carName]
        res.json(car)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.post("/create", (req, res) => {
    var keys = Object.keys(req.body)
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i]
        var body = req.body[key]
        cars[key] = body
    }

    res.sendStatus(200)
})

app.listen(port, () => {
    console.log("Listening on port", port)
})