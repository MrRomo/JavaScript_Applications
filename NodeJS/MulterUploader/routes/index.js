const express = require('express');
const router = express.Router()
let configWorker = require('../config/configWorker.js');

const awsWorker = require('../service/awsWorker.js');


router.get('/', (req, res) => {
  res.send('OK')
})
router.delete('/api/delete', (req, res) => {
  console.log('deleting...'); 
  awsWorker.delete(req, res, req.query.Key)
    .then(result => {
      console.log(result);
      res.json({result})
    })
    .catch(result => {
      console.log(result);
      res.status(500).json(result)
    })
})

router.post('/upload', (req, res) => {
  configWorker(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json([err, req.files])
    }
    const params = {
      User: req.user,
      Key: `public/users/${req.user._id}/`
    }
    awsWorker.upload(req, res, params)
      .then(result => {
        console.log(result);
        res.json({ message: 'Files uploaded successfully!', result })
      })
      .catch(result => {
        console.log(result);
        res.status(500).json(result)
      })
  })
})

module.exports = router