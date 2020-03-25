/**
 * npm install express
 * npm install nodemon
 * npm install knex --save
 * npm install sqlite3
 * npx knex init
 * npx knex migrate:make create_ongs
 * npx knex migrate:latest
 * npx knex migrate:make create_incidents
 * npx knex migrate:latest
 * npm install cors
 */

const express  = require('express');
const cors =  require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen("3333");
