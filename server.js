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
    },
    "Mercedes": {
        "Color": "Pink",
        "Year": 2014
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

app.put("/update/:carName", (req, res) => {
    if (cars.hasOwnProperty(req.params.carName)) {
        cars[req.params.carName] = req.body
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Cannot update non-existing car " + req.params.carName })
    }
})

app.patch("/update/:carName/:wheels", (req, res) => {
    var carName = req.params.carName
    var wheels = parseInt(req.params.wheels)
    if (cars.hasOwnProperty(carName)) {
        var attributes = cars[carName]
        if (attributes.hasOwnProperty("Wheels")) {
            cars[carName]["Wheels"] = wheels
            res.sendStatus(200)
        } else {
            res.status(404)
            res.json({ "message": "Car does not have Wheels field" })
        }
    } else {
        res.status(404)
        res.json({ "message": "Cannot update non-existing car " + carName })
    }
})

app.delete("/delete/:carName", (req, res) => {
    var carName = req.params.carName
    if (cars.hasOwnProperty(carName)) {
        delete cars[carName]
        res.sendStatus(200)
    } else {
        res.status(404)
        res.json({ "message": "Not found" })
    }
})

app.listen(port, () => {
    console.log("Listening on port", port)
})