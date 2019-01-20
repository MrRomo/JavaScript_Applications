const multer = require('multer');
const path = require('path')
var storage = multer.memoryStorage()

var upload = multer({
  storage,
  limits: { fileSize: 3100000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return (cb(null, true))
    } else {
      cb("error: el archivo debe ser una imagen valida")
    }
  }
}).array('image', 8)


module.exports = upload;