const mongoose = require('mongoose')
const {Schema} = mongoose
const path = require('path')

const imageSchema = new Schema ({
                        title: {type: String},
                        description: {type: String},
                        filename: {type: String},
                        likes: {type: Number, default:0},
                        views: {type: Number, default:0},
                        filename: {type: String},
                        date: {type: Date, default: Date.now}
                    })
imageSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename),'')
    })
module.exports = mongoose.model('Image',imageSchema)