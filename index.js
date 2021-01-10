var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var apiDefinitions = require("./stack-api/api-definition");

app.use(bodyParser.urlencoded({extended:false}));

app.use("/stack-api", apiDefinitions);

app.use(express.static("public"));

app.listen(8080, function () {
    console.log("started express on 8080");
});