var express = require("express");
var stackFactory = require("./stack");

var apiDefinitions = express.Router();

apiDefinitions.get("/push/:data", function (req, res) {
    // sample uuid -> 07e96190-f083-4c80-960e-aacb21d34388
    let uuidFromReq = '07e96190-f083-4c80-960e-aacb21d34388';
    // let uuidFromReq;
    var inputData = req.params.data;
    let stack = stackFactory(uuidFromReq);
    console.log('stack from factory is', stack);
    
    stack.on('push', (e) => {
            console.log('push event', e);
        })
    stack.push(inputData);
    res.send(stack.toString());
});
    
apiDefinitions.get("/pop", function (req, res) {
    let uuidFromReq = '07e96190-f083-4c80-960e-aacb21d34388';
    let stack = stackFactory(uuidFromReq);
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
    let uuidFromReq = '07e96190-f083-4c80-960e-aacb21d34388';
    let stack = stackFactory(uuidFromReq);
    res.send(stackData);
});

module.exports = apiDefinitions;