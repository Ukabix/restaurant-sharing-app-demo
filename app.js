//// import packages
// import path
const path = require("path");
// import express
const express = require("express");

//// import other app files with full relative path

// import router for default
const defaultRoutes = require("./routes/default");
// import router for restaurants
const restaurantRoutes = require("./routes/restaurants");

//// make an app from main file
const app = express();

// set views setting
app.set("views", path.join(__dirname, "views"));
// call templating engine
app.set("view engine", "ejs");

// middleware for static files with static method - css, js
// for each incoming request express will check the public folder and will return it
// if not it will reroute to next handlers
app.use(express.static("public"));

// middleware for parsing incoming post data
app.use(express.urlencoded({ extended: false }));

// middleware default routes from default.js
// "/" - every route will be handled with it
app.use("/", defaultRoutes);
// middleware restaurant routes from restaurant.js
app.use("/", restaurantRoutes);

// serve dummy page
// app.get("/", function(req, res) {
//   res.send("<h1>Hello World</h1>");
// });

//// register routes

// middleware for 404 - will catch any requests that are not handled via other routes
app.use(function(req, res) {
  res.status(404).render("404");
});

// middleware for other errors - 4 params!
app.use(function(error, req, res, next) {
  res.status(404).render("500");
});

// setup a server with listen
app.listen(3000);
