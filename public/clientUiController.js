importScripts("stack.js");

var StackModule = module.exports; //FIXME: not clean... think of better cleaner ways
const stacksMap = new Map();
function uiController(e) {

    const parameters = e.data;
    const command = parameters.command;
    const data = parameters.data;

    console.log("Input:", command, data);
    switch (command) {
        case "getStacks": getStacks(data);
            break;

        case "createStack": createStack(data);
            break;

        case "deleteStack": deleteStack(data);
            break;

        case "push": push(data);
            break;

        case "pop": pop(data);
            break;

        case "peek": peek(data);
            break;

        case "serialize": serialize(data);
            break;

        default: console.log("No Such Command" + command);
            respond("FAILURE", "", command);

    }

}

function respond(status, response, command) {

    var result = { 'status': status, 'data': response, 'command': command };
    postMessage(result);

}

function getStacks() {
    var stacksList = [];
    for (let key of stacksMap.keys()) {
        stacksList.push(key)
    }
    respond("SUCCESS", JSON.stringify(stacksList), "getStacks");  
}

function createStack(stackId) {
    var stack = new StackModule(parseInt(stackId));
    stacksMap.set(stackId, stack);
    respond("SUCCESS", stack.toString(), "createStack");
}

function deleteStack(stackId) {
    if(stacksMap.delete(stackId)){
        respond("SUCCESS", stackId, "deleteStack");
    } else {
        console.error('No stack with id #{data} found');
        respond("FAILURE", JSON.stringify(""), "deleteStack");        
    }

}

function pop(data) {
    var stack = stacksMap.get(data);
    if (stack == undefined) {
        console.error('No stack with id #{data} found');
        respond("FAILURE", [], "pop");

    } else {
        var poppedData = stack.pop();
        respond("SUCCESS", poppedData, "pop");
    }

}

function peek(data) {
    var stack = stacksMap.get(data);
    if (stack == undefined) {
        console.error('No stack with id #{data} found');
        respond("FAILURE", "", "peek");
    } else {
        var peekValue = stack.peek();
        console.log("peek value "+peekValue);
        respond("SUCCESS", peekValue, "peek");
    }
}

function push(pushData) {
    var dataArray = pushData.split("/");
    var stackId = dataArray[0];
    var data = dataArray[1];
    var stack = stacksMap.get(stackId);
    if (stack == undefined) {
        console.error('No stack with id #{data} found');
        respond("FAILURE", "", "push");
    } else {
        stack.push(data);
        respond("SUCCESS", "", "push");
    }
}


function serialize(data) {
    var stack = stacksMap.get(data);
    console.log("serialize result: ", stack.toString());
    respond("SUCCESS", JSON.parse(stack.toString()), "serialize");
}




onmessage = uiController;
