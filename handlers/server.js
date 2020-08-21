const express = require('express');
const router = express.Router();


router.get("/", function(request, response) {
    response.sendFile(__dirname + "/webpage/index.html");
});
module.exports = router
