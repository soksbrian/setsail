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

// API1: Add a TODO item
app.post('/api/post/', (req, res) => {
  const userId = Math.floor(Math.random() * 9) + 1; // Random UserId from 1 to 10; 
  const itemName = faker.lorem.words();
  const itemDeadline = faker.date.future();
  const itemCreated = Date.now();

  db.addItem(userId, itemName, itemDeadline, itemCreated, res);
})

// API2: Read a TODO item with given TODO ID
// app.get('/api/get')

// server listen
const port = 8080;
app.listen(port, () => console.log(`Listening to port ${port}...`));
