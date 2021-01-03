var express = require("express");

var Stack = require("./stack");

var stack = new Stack(["bottom"]);

var apiDefinitions = express.Router();

apiDefinitions.get("/push/:data", function (req, res) {
    var inputData = req.params.data;

    stack.push(inputData);
    res.send(stack.toString());
});

apiDefinitions.get("/pop", function (req, res) {
    var elet = stack.pop();
    res.send({ 'data': elet });
});

apiDefinitions.get("/serialize", function (req, res) {
    var stackData = stack.toString();
    res.send(stackData);
});

module.exports = apiDefinitions;