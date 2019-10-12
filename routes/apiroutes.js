var db = require("../models");
var Op = db.Sequelize.Op;

module.exports = function(app) {
  //GET index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  //GET all projects
  app.get("/projects", function(req, res) {
    db.Projects.findAll().then(function(result) {
      res.json(result);
    });
  });

  //GET projects that match tags
  app.get("/find/:tags", function(req, res) {
    console.log("req params", req.params.tags);
    var hashTags = req.params.tags;
    var data = {
      hashTags: hashTags.split(",")
    };
    console.log("hashtags", data.hashTags);

    //Create query to check each tag with the hasTags column
    function substring() {
      var query = [];
      for (var i = 0; i < data.hashTags.length; i++) {
        query.push({
          [Op.substring]: data.hashTags[i]
        });
      }
      return query;
    }

    //Find all that match the query
    db.Projects.findAll({
      where: {
        hashTags: {
          [Op.and]: substring()
        }
      }
    }).then(function(result) {
      //Return json response
      res.json(result);
    });
  });
};
