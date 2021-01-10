var express = require("express");
var Stack = require("./stack");
var apiDefinitions = express.Router();

apiDefinitions.get("/push/:data", function (req, res) {
    var inputData = req.params.data;
    var stackId = req.params.stackId;
    let stack = new Stack(stackId);
    stack.on('push', (e) => {
        console.log('push event', e);
    })
    stack.push(inputData);
    res.send(stack.toString());
});

apiDefinitions.get("/pop", function (req, res) {
    var stackId = req.params.stackId;
    let stack = new Stack(stackId);
    stack.on('pop', (e) => {
        console.log('pop event', e);
    });
    stack.on('empty', (e) => {
        console.log('pop event when empty', e);
    })
    var elet = stack.pop();
    res.send({ 'data': elet });
});

apiDefinitions.get("/serialize", function (req, res) {
    var stackId = req.params.stackId;
    let stack = new Stack(stackId);
    var stackData = stack.toString();
    res.send(stackData);
});

module.exports = apiDefinitions;