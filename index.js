var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var apiDefinitions = require("./stack-api/api-definition");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));


app.use("/stack-api", apiDefinitions);

app.use(express.static("public"));

app.listen(8080, function () {
    console.log("started express on 8080");
});