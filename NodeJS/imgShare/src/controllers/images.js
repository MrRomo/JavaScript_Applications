const path = require('path')
const ctrl = {}
const {randomName} = require('../helpers/libs')
const fs = require('fs-extra')
const {Image,Comment} = require('../models')
const md5 = require('md5')

ctrl.index = async (req, res) => {
    const viewModel = {image:{}, comments:{}}
    const image = await Image.findOne({filename:{$regex: req.params.image_id}}) 
    if(image)   {
        image.views+=1
        viewModel.image = image
        await image.save()
        const comments = await Comment.find({image_id: image._id})
        viewModel.comments = comments
        res.render('image', viewModel)
    }else{
        res.redirect('/')
    }
}
ctrl.create = async (req, res) => {
    let name = randomName()    
    const ext = path.extname(req.file.originalname).toLowerCase()
    let imgs = await Image.find({filename:  name+ext})
    while (imgs.length>0) {
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
        res.redirect('/images/'+name)
    } else {
        await fs.unlink(imagePath)
        res.status(500).json({error: 'Solo estan permitidas imagenes'})
    }

}
ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename:{$regex: req.params.image_id}})
    if(image) {
        image.likes +=1
        await image.save()
        res.json({likes: image.likes })
    } else {
        res.status(500).json({error: 'Internal Error'})
    }
}
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename:{$regex: req.params.image_id}})
    if(image){
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id
        await newComment.save()        
        res.redirect('/images/' + image.uniqueId)
    }else{
        res.redirect('/' + image.uniqueId)
    }
}
ctrl.remove = async (req, res) => {
    console.log(req.params.image_id)
    const image = await Image.findOne({filename:{$regex: req.params.image_id}})
    if(image){
        await fs.unlink(path.resolve('./src/public/upload/'+ image.filename))
        await Comment.deleteOne({image_id: image._id})
        await image.remove()
        res.json(true)
    }else{
        res.status(500).json({error: 'Internal Error'})
    }
}


module.exports = ctrl