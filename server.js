const express = require('express');
const app = express.Router();


app.get("/", function(request, response) {
    response.sendFile(__dirname + "/webpage/index.html");
});
module.exports = app
