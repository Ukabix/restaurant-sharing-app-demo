// import express
const express = require("express");
// make an app
const app = express();
// setup dummy path
app.get("/", function(req, res) {
  res.send("<h1>Hello World</h1>");
});



// setup a server with listen
app.listen(3000);