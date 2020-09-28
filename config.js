const config = {
  env: process.env.NODE_ENV || "dev",
  dbName: process.env.DBNAME || "martolex-new",
  dbHost: process.env.DBHOST || "localhost",
  dbUserName: process.env.DBUSER || "root",
  dbPassword: process.env.DBPASSWORD || "",
  dbPort: process.env.DBPORT || 3306,
};

module.exports = config;
