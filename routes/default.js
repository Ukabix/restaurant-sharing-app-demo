// serve /index
app.get("/", function (req, res) {
  // use render method for ejs
  res.render("index");
});