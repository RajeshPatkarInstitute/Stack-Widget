importScripts("stack.js");

var StackModule = module.exports; //FIXME: not clean... think of better cleaner ways
var stacks = [];
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
    respond("SUCCESS", JSON.stringify(stacks), "getStacks");
}

function createStack(stackId) {
    const stack = new StackModule(stackId);
    stacks.push(stack);
    respond("SUCCESS", stack, "createStack");
}

function deleteStack(stackId) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log(xhttp.responseText);

            var poppedData = xhttp.responseText;
            respond("SUCCESS", poppedData, "deleteStack");
        }
    }
    xhttp.open("GET", "/staas/delete/" + stackId, true);
    xhttp.send();

}

function pop(data) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log(xhttp.responseText);

            var poppedData = xhttp.responseText;
            respond("SUCCESS", poppedData, "pop");
        }
    }
    xhttp.open("GET", "/staas/pop/" + data, true);
    xhttp.send();

}

function peek(data) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log(xhttp.responseText);

            var peekedData = xhttp.responseText;
            respond("SUCCESS", peekedData, "peek");
        }
    }
    xhttp.open("GET", "/staas/peek/" + data, true);
    xhttp.send();

}

function push(pushData) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/staas/push/" + pushData, true);
    xhttp.send();
    respond("SUCCESS", "", "push");
}


function serialize(data) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            const allData = xhttp.responseText;
            console.log("serialize result: ", allData);
            respond("SUCCESS", JSON.parse(allData), "serialize");
        }
    }
    xhttp.open("GET", "/staas/serialize/" + data, true);
    xhttp.send();
}




onmessage = uiController;
