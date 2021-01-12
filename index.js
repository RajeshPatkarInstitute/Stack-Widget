var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var apiDefinitions = require("./staas/web-controller");

app.use(bodyParser.urlencoded({extended:false}));

app.use("/staas", apiDefinitions);

app.use(express.static("public"));

app.listen(8080, function () {
    console.log("started express on 8080");
});