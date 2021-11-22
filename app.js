// import path
const path = require("path");
// import express
const express = require("express");
// make an app
const app = express();

// middleware for static files with static method - css, js
// for each incoming request express will check the public folder and will return it
// if not it will reroute to next handlers
app.use(express.static("public"));

// serve dummy page
// app.get("/", function(req, res) {
//   res.send("<h1>Hello World</h1>");
// });

//// register routes
// serve /index
app.get("/", function (req, res){
  // construct a path
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  // send 
  res.sendFile(htmlFilePath);
});
// serve /restaurants
app.get("/restaurants", function (req, res){
  // construct a path
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // send 
  res.sendFile(htmlFilePath);
});
// serve /recommend
app.get("/recommend", function (req, res){
  // construct a path
  const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // send 
  res.sendFile(htmlFilePath);
});
// serve /confirm
app.get("/confirm", function (req, res){
  // construct a path
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // send 
  res.sendFile(htmlFilePath);
});
// serve /about
app.get("/about", function (req, res){
  // construct a path
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  // send 
  res.sendFile(htmlFilePath);
});


// setup a server with listen
app.listen(3000);