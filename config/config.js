require("dotenv").config();

module.exports = {
  development: {
    username: process.env.dbusername,
    password: process.env.password,
    database: process.env.database,
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.username,
    password: process.env.password,
    database: "database_test",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};

