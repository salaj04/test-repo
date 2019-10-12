module.exports = function(sequelize, Datatypes) {
  var Projects = sequelize.define(
    "Projects",
    {
      project: {
        type: Datatypes.STRING,
        allowNull: false
      },
      description: {
        type: Datatypes.STRING(1234),
        allowNull: false
      },
      image: {
        type: Datatypes.STRING,
        allowNull: false
      },
      github: {
        type: Datatypes.STRING,
        allowNull: false
      },
      website: {
        type: Datatypes.STRING
      },
      gif: {
        type: Datatypes.STRING
      },
      hashTags: {
        type: Datatypes.STRING,
        allowNull: false,
        get: function() {
          return this.getDataValue("hashTags").split(",");
        }
      }
    },
    {
      //Timestamps
      timestamps: true,
      updatedAt: false
    }
  );

  return Projects;
};
