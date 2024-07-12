require('dotenv').config();

module.exports = {
  //   "development": {
  //     "username": process.env.DB_USER,
  //     "password": process.env.DB_PASSWORD,
  //     "database": process.env.DB_NAME,
  //     "host": process.env.DB_HOST,
  //     "dialect": "mysql"
  //   },
  //   "test": {
  //     "username": process.env.DB_USER,
  //     "password": process.env.DB_PASSWORD,
  //     "database": process.env.DB_NAME_TEST,
  //     "host": process.env.DB_HOST,
  //     "dialect": "mysql"
  //   },
  //   "production": {
  //     "username": process.env.DB_USER,
  //     "password": process.env.DB_PASSWORD,
  //     "database": process.env.DB_NAME_PROD,
  //     "host": process.env.DB_HOST,
  //     "dialect": "mysql"
  //   }
  // };
  

  "development": {
    "username": "root",
    "password": "milo2023**",
    "database": "wewashdb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "wewashdb_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "wewashdb_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
