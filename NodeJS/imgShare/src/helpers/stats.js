const { Image, Comment } = require('../models')

async function imageCounter() {
    return await Image.countDocuments()
}

async function commentCounter() {
    return await Comment.countDocuments()
}


async function imageTotalViewsCounter() {

    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }])
    return result[0].viewsTotal
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }])
    return result[0].likesTotal
}

module.exports = async () => {
    const result = await Promise.all([
        imageCounter(),
        commentCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ])
    return {
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    }
}
