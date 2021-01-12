function ajaxController(e) {

    const parameters = e.data;
    const command = parameters.command;
    const data = parameters.data;
    
    console.log("Input:",command,data);
    switch (command) {
        case "getStacks": getStacks(data);
            break;

        case "createStack": createStack(data);
            break;

        case "push": push(data);
            break;

        case "pop": pop(data);
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

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log(xhttp.responseText);

            var stacks = xhttp.responseText;
            respond("SUCCESS", stacks, "getStacks");
        }
    }
    xhttp.open("GET", "/stack-api/getAll", true);
    xhttp.send();

}

function createStack(stackId) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log(xhttp.responseText);

            var poppedData = xhttp.responseText;
            respond("SUCCESS", poppedData, "createStack");
        }
    }
    xhttp.open("GET", "/stack-api/create/" + stackId, true);
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
    xhttp.open("GET", "/stack-api/pop/"+data, true);
    xhttp.send();

}

function push(pushData) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/stack-api/push/" + pushData, true);
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
    xhttp.open("GET", "/stack-api/serialize/"+data, true);
    xhttp.send();
}




onmessage = ajaxController
