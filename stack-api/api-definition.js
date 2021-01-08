var express = require("express");
var Stack = require("./stack");

var apiDefinitions = express.Router();

apiDefinitions.get("/push/:data", function (req, res) {
    // sample uuid -> 5b1be952-52af-409c-ad1b-645e7d2ec500
    let uuidFromReq = '5b1be952-52af-409c-ad1b-645e7d2ec500';
    // let uuidFromReq;
    var inputData = req.params.data;
    let stack = Stack.getStack(uuidFromReq);
    stack.on('push', (e) => {
        console.log('push event', e);
    })
    stack.push(inputData);
    req.session.stackData = stack.toString();
    res.send(stack.toString());
});

apiDefinitions.get("/pop", function (req, res) {
    let uuidFromReq = '5b1be952-52af-409c-ad1b-645e7d2ec500';
    let stack = Stack.getStack(uuidFromReq);
    stack.on('pop', (e) => {
        console.log('pop event', e);
    });
    stack.on('empty', (e) => {
        console.log('pop event when empty', e);
    })
    var elet = stack.pop();
    req.session.stackData = stack.toString();
    res.send({ 'data': elet });
});

apiDefinitions.get("/serialize", function (req, res) {
    let uuidFromReq = '5b1be952-52af-409c-ad1b-645e7d2ec500';
    let stack = Stack.getStack(uuidFromReq);
    var stackData = stack.toString();
    res.send(stackData);
});

module.exports = apiDefinitions;