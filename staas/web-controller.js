var express = require("express");
var Stack = require("./stack");
var store = require("./persistence");

var webController = express.Router();


webController.get("/push/:id/:data", function (req, res) {
    var inputData = req.params.data;
    let stack = store.fromTatva(req.params.id);
    stack.push(inputData);
    store.toTatva(stack);
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

webController.get("/pop/:id", function (req, res) {
    let stack = store.fromTatva(req.params.id);
    var elet = stack.pop();
    store.toTatva(stack);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(elet));
});

webController.get("/serialize/:id", function (req, res) {
    let stack = store.fromTatva(req.params.id.trim());
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

webController.get("/create/:id", function (req, res) {
    /* Validation work to be done */
    let stack = new Stack(parseInt(req.params.id));
    store.toTatva(stack);
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

webController.get("/getAll", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(store.getAll());
});

webController.get("/flush/:id", function (req, res) {
    /* Validation work to be done */
    console.log("id for create is " + req.params.id);
    let stack = new Stack(parseInt(req.params.id));
    stack.flush();
    store.toTatva(stack);
    res.setHeader('Content-Type', 'application/json');
    res.send(stack.toString());
});

webController.get("/delete/:id", function (req, res) {
    store.deleteTatva(req.params.id);
    res.send(`Stack with id = ${req.params.id} deleted from StackStore`);
});

module.exports = webController;