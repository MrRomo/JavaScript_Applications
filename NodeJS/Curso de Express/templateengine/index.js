const express = require('express')
const app = express()
const expressJsx = require('./expressJsx')


app.engine("jsx", expressJsx)
app.set('views', "./views" )
app.set('view engine', "jsx" )


app.get('/', (req,res) => {
  res.render("index", {hello: 'Hola', world: 'mundo'})
})

const server = app.listen(8000, ()=> {
  console.log('Server on port: ', server.address().port);
  
})