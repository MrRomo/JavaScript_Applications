'use strict'

const { spawn } = require('child_process')

const ps = spawn('ping', ['-c', '5', 'google.com'])

ps.stdout.setEncoding('utf8')
ps.stdout.on('data', data => {
    console.log(data);
})