const helpers = {}
const moment = require('moment')

helpers.timeago = date => {
    return moment(date).startOf('minute').fromNow()
}

module.exports = helpers