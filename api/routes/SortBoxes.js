module.exports = app => {
    console.log(app.controllers)
    const controller = app.controllers.SortBoxes

    app.route('/api/sort-boxes').get(controller.sortBoxes)
}