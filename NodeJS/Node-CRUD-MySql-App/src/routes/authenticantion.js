const express = require('express')
const router = express.Router()

router.get('/a', (req,res) => {
    res.send('Authentication')
})





module.exports = router