const express = require('express')
const path = require('path')
const app = express()
const expressJsx = require('./expressJsx')
const productsRouter = require('./routes/products')


app.engine("jsx", expressJsx)
app.set('views', path.join(__dirname,"./views" ))
app.set('view engine', "pug" )


app.get('/', productsRouter)

const server = app.listen(8000, ()=> {
  console.log('Server on port: ', server.address().port);
  
})