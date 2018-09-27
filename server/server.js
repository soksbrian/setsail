const express = require('express');
const path = require('path');
const faker = require('faker');
const db = require('../database/database.js');

// Initialize Express server
const app = express();

// logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

// serve statics
app.use('/', express.static(path.join(__dirname, '../public')));

// handlers
app.post('/api/post/', (req, res) => {
  db.addItem();
})

// server listen
const port = 8080;
app.listen(port, () => console.log(`Listening to port ${port}...`));
