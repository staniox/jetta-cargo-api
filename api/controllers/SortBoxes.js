module.exports = () => {
    const controller ={}
    const test = {
        "data": [0,1,2,3,4,5,6,7,8,9]
    }
    controller.sortBoxes = (req, res) => res.status(200).json(test)
    return controller
}