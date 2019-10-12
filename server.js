require("dotenv").config();

//Require Express
var express = require("express");

//Require Express Handlebars
// var exphbs = require("express-handlebars");

//Require database model
var db = require("./models");

//Initialise express
var app = express();

//PORT assign
// var PORT = process.env.PORT || 3000;
app.set( "port", ( process.env.PORT || 3000 ));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Handlebars
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

//Require Routes
require("./routes/apiroutes.js")(app);

//Clearing database only if the node environment is test
var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Starting server and syncing models
db.sequelize.sync(syncOptions).then(function() {
  // db.Projects.bulkCreate([
  //   {
  //     project: "Burger",
  //     description: "Lorem Ipsum is saying something about the burger",
  //     image: "img-burger",
  //     github: "https://github.com/priyam009/burger",
  //     website: "https://burgeat.herokuapp.com/",
  //     gif: "gif-burger",
  //     hashTags: "html,css,bootstrap,nodejs,express,mysql,handlebars"
  //   },
  //   {
  //     project: "Bamazon",
  //     description: "Lorem Ipsum is saying something about the bamazon",
  //     image: "img-bamazon",
  //     github: "https://github.com/priyam009/bamazon",
  //     gif: "gif-bamazon",
  //     hashTags: "nodejs,mysql"
  //   },
  //   {
  //     project: "Giphy",
  //     description: "Lorem Ipsum is saying something about the Giphy",
  //     image: "img-giphy",
  //     github: "https://github.com/priyam009/GiphyAPI",
  //     website: "https://priyam009.github.io/GiphyAPI/",
  //     gif: "gif-giphy",
  //     hashTags: "html,css,bootstrap,javascript,jquery"
  //   },
  //   {
  //     project: "Staxx",
  //     description: "Lorem Ipsum is saying something about the staxx",
  //     image: "img-staxx",
  //     github: "https://github.com/priyam009/Staxx",
  //     website: "https://shrouded-brook-64155.herokuapp.com/",
  //     gif: "gif-staxx",
  //     hashTags:
  //       "html,css,javascript,jquery,nodejs,express,sequelize,handlebars"
  //   }
  // ]);

  app.listen(PORT, function() {
    console.log( "Node server is running on port " + PORT);
  });
});
