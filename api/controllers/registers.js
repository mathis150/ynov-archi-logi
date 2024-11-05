const { addRaspberry, getRaspberrys, getRaspberryById, deleteRaspberryById } = require('../services/registers')

exports.getRaspberrys = (req, res) => {
    res.json({
        success: true,
        rasberrys: getRaspberrys()
    })
}

exports.getRaspberryById = (req, res) => {
    const rasberry = getRaspberryById(req.params.id)
    res.json(rasberry)
}

exports.addRaspberry = (req, res) => {
    if(req.body.name === undefined || req.body.date === undefined) {
        res.status(400).json({
            success: false,
            message: "Missing raspberry NAME"
        })
        return
    }
    addRaspberry(req.body.name)
    res.status(201).send()
}

exports.deleteRaspberryById = (req, res) => {
    if(req.body.id === undefined) {
        res.status(400).json({
            success: false,
            message: "Missing raspberry ID"
        })
        return
    }
    deleteRaspberryById(req.params.id)
    res.status(201).send()
}