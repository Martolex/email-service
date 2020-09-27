const config = {
  env: process.env.NODE_ENV || "prod",
  dbName: process.env.DBNAME || "martolexdb",
  dbHost:
    process.env.DBHOST ||
    "martolexdb.c6goceb9tkvq.ap-south-1.rds.amazonaws.com",
  dbUserName: process.env.DBUSER || "martolex",
  dbPassword: process.env.DBPASSWORD || "martolex2019",
  dbPort: process.env.DBPORT || 3306,
};

module.exports = config;
