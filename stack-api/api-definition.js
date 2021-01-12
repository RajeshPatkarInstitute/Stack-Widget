var express = require("express");
var Stack = require("./stack");
var fs = require("fs");

var apiDefinitions = express.Router();


apiDefinitions.get("/push/:id/:data", function (req, res) {
    var inputData = req.params.data;
    let stack = Stack.fromTatva(req.params.id);
    stack.push(inputData);
    stack.toTatva();
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

apiDefinitions.get("/pop/:id", function (req, res) {
    let stack = Stack.fromTatva(req.params.id);
    var elet = stack.pop();
    stack.toTatva();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(elet));
});

apiDefinitions.get("/serialize/:id", function (req, res) {
    let stack = Stack.fromTatva(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

apiDefinitions.get("/create/:id", function (req, res) {
    /* Validation work to be done */
    let stack = new Stack(parseInt(req.params.id));
    stack.toTatva();
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

apiDefinitions.get("/getAll", function (req, res) {
    let files = fs.readdirSync(__dirname + "/StackStore/");
    let stackIds = files.map((file) => { return file.replace(".json", ""); });

    res.setHeader('Content-Type', 'application/json');
    res.send(stackIds);
});

apiDefinitions.get("/flush/:id", function (req, res) {
    /* Validation work to be done */
    console.log("id for create is " + req.params.id);
    let stack = new Stack(parseInt(req.params.id));
    stack.flush();
    stack.toTatva();
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

apiDefinitions.get("/delete/:id", function (req, res) {
    fs.unlinkSync(__dirname + "/StackStore/" + req.params.id + '.json');
    res.send(`Stack with id = ${req.params.id} deleted from StackStore`);
});

module.exports = apiDefinitions;