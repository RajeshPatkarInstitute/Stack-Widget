function ajaxController(e) {

    const parameters = e.data;
    const command = parameters.command;
    const data = parameters.data;

    console.log("Input:", command, data);
    switch (command) {

        case "push": push(data);
            break;

        case "pop": pop();
            break;

        case "serialize": serialize();
            break;

        default: console.log("No Such Command" + command);
            respond("FAILURE", "", command);

    }

}

function respond(status, response, command) {

    var result = { 'status': status, 'response': response, 'command': command };
    postMessage(result);

}

function pop() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log(xhttp.responseText);

            var poppedData = xhttp.responseText;
            respond("SUCCESS", poppedData, "pop");
        }
    }
    xhttp.open("GET", "/stack-api/pop", true);
    xhttp.send();

}

function push(pushData) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/stack-api/push/" + pushData, true);
    xhttp.send();
    respond("SUCCESS", "", "push");
}


function serialize() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status == 200) {
            const allData = xhttp.responseText;
            console.log("serialize result: ", allData);
            respond("SUCCESS", allData, "serialize");
        }
    }
    xhttp.open("GET", "/stack-api/serialize", true);
    xhttp.send();
}




onmessage = ajaxController
