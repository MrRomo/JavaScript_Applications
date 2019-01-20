const express = require('express');
const router = express.Router()
let configWorker = require('../config/multer.config.js');

const uploaderWorker = require('../service/awsUploader.js');


router.get('/', (req, res) => {
  res.send('OK')
})
router.post('/upload', configWorker, (req, res) => {
  const params = {
    User: req.user,
    Key: `public/user/`
  }
  uploaderWorker.doUpload(req, res, params)
    .then(result => {
      console.log(result);
      res.json({ message: 'Files uploaded successfully!', result})
    })
    .catch(result => {
      console.log(result);
      res.status(500).json(result)
    })
})

module.exports = router