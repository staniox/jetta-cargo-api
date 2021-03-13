module.exports = app => {
    const controller = app.controllers.SortBoxes

    app.route('/api/sort-boxes').post(controller.sortBoxes)
}