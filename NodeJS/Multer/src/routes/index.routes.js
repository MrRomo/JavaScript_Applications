const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const router = Router()


const storage = multer.diskStorage({
  destination: path.join(__dirname,'../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLowerCase())
  }
})

const upload = multer({
  storage,
  limits: {fileSize: 1000000},
  fileFilter: (req,file,cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if(mimetype&&extname) {
      return(cb(null, true))
    }else{
      cb("error: el archivo debe ser una imagen valida")
    }

  }
}).single('image')



router.get('/', (req,res) => {
  res.render('')
})

router.post('/upload', (req,res) => {
  upload(req,res, function (err) {
    if(err){
      if((err.code=='LIMIT_FILE_SIZE')){
        return res.send('File to large')
      }else{
        return res.status('500').send('Internal error server')
      }
    }
    res.send(req.file)
  })
})


module.exports = router
