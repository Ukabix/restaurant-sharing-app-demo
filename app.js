//// import packages
// import filesystem
const fs = require("fs");
// import path
const path = require("path");
// import uuid
const uuid = require("uuid");
// import express
const express = require("express");

//// import other app files with full relative path
const resData = require("./util/restaurant-data");

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

// serve dummy page
// app.get("/", function(req, res) {
//   res.send("<h1>Hello World</h1>");
// });

//// register routes
// serve /index
app.get("/", function (req, res) {
  // use render method for ejs
  res.render("index");
});

// serve /restaurants
app.get("/restaurants", function (req, res) {
  // call resData funcs
  const storedRestaurants = resData.getStoredRestaurants();

  /// use render method for ejs, 2nd argument is for dynamic elements in ejs
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
// define path for dynamic routes via colon
app.get("/restaurants/:id", function(req, res) {
  // get access to concrete value for id
  const restaurantId = req.params.id;
  // call resData funcs
  const storedRestaurants = resData.getStoredRestaurants();

  /// find restaurant in array - with for of loop
  for (const restaurant of storedRestaurants) {
    // compare restaurant.id with restaurantId
    if (restaurant.id === restaurantId) {
        // render new view with accepted dynamic argument { rid: }
        // pass restaurant
        return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  // at this point we know there is no matchning id
  res.render("404");
});


// serve /recommend
app.get("/recommend", function (req, res) {
  // use render method for ejs
  res.render("recommend");
});
// for user input - make post route handlers
app.post("/recommend", function (req, res) {
  /// extract data - store body!
  const restaurant = req.body;
  // enrich body with uuid -> new property via uuid
  restaurant.id = uuid.v4();
  // get getStoredRestaurants from restaurant-data.js
  const restaurants = resData.getStoredRestaurants();
  // add new data to array
  restaurants.push(restaurant);
  // call storeRestaurants from resData
  resData.storeRestaurants(restaurants);
  /// send response
  // redirect user
  res.redirect("/confirm"); // reconfigure html after that
});

// serve /confirm
app.get("/confirm", function (req, res) {
  // use render method for ejs
  res.render("confirm");
});

// serve /about
app.get("/about", function (req, res) {
  // use render method for ejs
  res.render("about");
});

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
