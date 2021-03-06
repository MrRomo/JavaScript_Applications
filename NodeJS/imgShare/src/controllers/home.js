const ctrl = {}
const {Image} = require('../models')
const sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({date:'desc'})
    let viewModel = {images:[]}
    viewModel.images = images
    viewModel = await sidebar(viewModel)
    console.log(viewModel.sidebar.comments[0].image)
    res.render('index', viewModel)
}

module.exports = ctrl

