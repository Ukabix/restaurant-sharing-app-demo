// require express
const express = require("express");
// import resData
const resData = require("../util/restaurant-data");
// use router on express
const router = express.Router();

// serve /restaurants
router.get("/restaurants", function (req, res) {
  // call resData funcs
  const storedRestaurants = resData.getStoredRestaurants();

  /// use render method for ejs, 2nd argument is for dynamic elements in ejs
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});
// define path for dynamic routes via colon
router.get("/restaurants/:id", function(req, res) {
  // get access to concrete value for id
  const restaurantId = req.params.id;
  // call resData 
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
router.get("/recommend", function (req, res) {
  // use render method for ejs
  res.render("recommend");
});
// for user input - make post route handlers
router.post("/recommend", function (req, res) {
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
router.get("/confirm", function (req, res) {
  // use render method for ejs
  res.render("confirm");
});

module.exports = router;