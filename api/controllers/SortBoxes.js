    module.exports = () => {
    const Box = require('../models/Box')
    const controller ={}
    controller.sortBoxes = (req, res) => {
        Box(req.body)
        const response = Box.optimizeBox(req.body)
        res.status(200).json(response)

    }
    return controller
}