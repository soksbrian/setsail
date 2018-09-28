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
app.get('/api/get/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  db.getItem(itemId, res);
})

// API3: Change deadline of a TODO item given TODO ID and new deadline
app.patch('/api/patch/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const newDeadline = faker.date.future();
  db.changeDeadline(itemId, newDeadline, res);
})

// API4: Delete a TODO item given TODO ID
app.delete('/api/delete/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  db.removeItem(itemId, res);
})

// API5: List all TODO items given User ID
app.get('/api/list/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  db.listItems(userId, res);
})

// server listen
const port = 8080;
app.listen(port, () => console.log(`Listening to port ${port}...`));
