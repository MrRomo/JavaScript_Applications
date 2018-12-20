const ctrl = {}
const {Image} = require('../models')

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({date:'desc'})
    console.log(images)
    res.render('index', {images})
}

module.exports = ctrl