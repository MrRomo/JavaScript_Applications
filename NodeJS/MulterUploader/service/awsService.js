
let configWorker = require('../config/configWorker.js');
const awsWorker = require('../service/awsWorker.js');
const express = require('express');
const router = express.Router()

module.exports = configWorker(req, res, Key, function (err) {
  if (err) {
    console.log(err);
    return {ok:false, err}
  }
  const params = {
    User: req.user,
    Key
  }
  awsWorker.upload(req, res, params)
    .then(result => {
      console.log(result);
      return { ok:true, message: 'Files uploaded successfully!', result }
    })
    .catch(result => {
      console.log(result);
      return { ok:false, err: result }
    })
})