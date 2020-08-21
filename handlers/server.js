const express = require('express');
const app = express();


app.use(express.static(__dirname + "webpage"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/webpage/index.html");
});

module.exports = app
