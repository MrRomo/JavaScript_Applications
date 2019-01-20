const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const morgan = require('morgan')
//app
const app = express();

//middleware global
app.use(bodyParser.json())

//set engine 
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middlewares
app.use(morgan('dev'))

//routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter)
app.get('/', (req,res)=> {res.redirect('/products')})

//start servver
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
