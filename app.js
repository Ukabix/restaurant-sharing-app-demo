// import filesystem
const fs = require("fs");
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

// middleware for parsing incoming post data
app.use(express.urlencoded({extended: false}));

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
// for user input - make post route handlers
app.post("/recommend", function(req, res) {
  // extract data - store body!
  const restaurant = req.body;
  //// create JSON file - /data/restaurants.json
  /// open that file, write data and store it back
  // get filepath to restaurants
  const filePath = path.join(__dirname, "data", "restaurants.json");
  // open and read file
  const fileData = fs.readFileSync(filePath);
  // translate json to array with parser
  const storedRestaurants = JSON.parse(fileData);
  // add new data to array
  storedRestaurants.push(restaurant);
  // save the array as JSON with stringify
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  /// send response
  // redirect user
  res.redirect("/confirm"); // reconfigure html after that

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

//// handling form 



// setup a server with listen
app.listen(3000);