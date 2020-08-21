const express = require('express');
const app = express();


app.get("/", function(request, response) {
    response.sendFile(__dirname + "/webpage/index.html");
});
module.exports = router
