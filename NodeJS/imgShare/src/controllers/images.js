const path = require('path')
const ctrl = {}
const {randomName} = require('../helpers/libs')
const fs = require('fs-extra')
const {Image} = require('../models')
ctrl.index = (req, res) => {
    res.send('Index Images page')
}
ctrl.create = async (req, res) => {
    let name = randomName()    
    const ext = path.extname(req.file.originalname).toLowerCase()
    let imgs = await Image.find({filename:  name+ext})
    console.log(imgs)
    while (imgs.length>0) {
        console.log('Name repeat ', name)
        name = randomName()
        imgs = await Image.find({filename: name+ext})
    }
    const imagePath = req.file.path
    const targetPath = path.resolve(`src/public/upload/${name}${ext}`)
    if((ext==='.jpg')||(ext==='.png')||(ext==='.jpeg')){
        await fs.rename(imagePath, targetPath)
        const newImg = new Image ({
          title:  req.body.title,
          filename: name + ext,
          description:  req.body.description,

        })
        const imageSave = await newImg.save()
        res.redirect('/images')
    } else {
        await fs.unlink(imagePath)
        res.status(500).json({error: 'Solo estan permitidas imagenes'})
    }

}
ctrl.like = (req, res) => {
    res.send('Index page')
}
ctrl.comment = (req, res) => {
    res.send('Index page')
}
ctrl.remove = (req, res) => {
    res.send('Index page')
}


module.exports = ctrl