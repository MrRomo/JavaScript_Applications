const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')

app.use('/public', express.static(path.join(__dirname, './public')))

//settings 
app.set('port', 4000)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//routes 
app.use(require('./routes/index.routes'))

app.listen(app.get('port'), ()=> {
  console.log(`Server on port: ${app.get('port')}`);
  
})