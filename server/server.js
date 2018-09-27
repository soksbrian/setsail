const express = require('express');
const path = require('path');
const app = express();


// logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

// serve statics
app.use('/', express.static(path.join(__dirname, '../public')));

// handlers


// server listen
const port = 8080;
app.listen(port, () => console.log(`Listening to port ${port}...`));
