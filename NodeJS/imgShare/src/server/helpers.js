const helpers = {}
const moment = require('moment')

helpers.timeAgo = date => {
    return moment(date).startOf('minute').fromNow()
}

module.exports = helpers