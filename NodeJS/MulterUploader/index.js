const express = require('express');
const app = express();
const router = require('./routes')
 
app.use('/', router)

// Create a Server
const server = app.listen(8080, function () {
  let host = server.address().address
  let port = server.address().port
  console.log(server.address());
  console.log("App listening on port: ",port); 
})