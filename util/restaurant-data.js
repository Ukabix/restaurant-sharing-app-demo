  // get filepath to restaurants
  const filePath = path.join(__dirname, "data", "restaurants.json");

function getStoredRestaurants() {
  //// create JSON file - /data/restaurants.json
  /// open that file, write data and store it back
  // open and read file
  const fileData = fs.readFileSync(filePath);
  // translate json to array with parser
  const storedRestaurants = JSON.parse(fileData);
  
  return storedRestaurants;
}

function storedRestaurants(storableRestaurants) {
    // save the array as JSON with stringify
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}