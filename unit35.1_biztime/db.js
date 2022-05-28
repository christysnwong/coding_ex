/** Database setup for BizTime. */

// require('dotenv').config();
const { Client } = require("pg");

let DB_URI;

// console.log(JSON.stringify(process.env, null ,2));


if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///biztime_test";
} else {
  DB_URI = "postgresql:///biztime";
}


let db = new Client({  
  connectionString: DB_URI,
  // user: 'cwong',
  // password: 'ident',
  // database: 'biztime'
});

db.connect();

module.exports = db;