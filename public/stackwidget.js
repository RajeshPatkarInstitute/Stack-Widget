var serverSideUIController = UiControllerFactory();
    var clientSideUIController = UiControllerFactory("client-side");
    var uiController = serverSideUIController; // default

    function UiControllerFactory(type) {
        if (type == "client-side") {
            return new Worker('clientUiController.js');
        } else {
            return new Worker('serverUiController.js');
        }
    }

    function handleChangeMode(stackModeInput) {

        currentStackMode = stackModeInput.value;
        switch (currentStackMode) {
            case "serverSide": uiController = serverSideUIController; break;
            case "clientSide": uiController = clientSideUIController; break;
            default: uiController = serverSideUIController; break;
        }
        $('#stacks').empty();
        $('#allData').empty();

        var request = { 'command': "getStacks" };
        uiController.postMessage(request);
        uiController.onmessage = responseHandler;

    }

    function loadStacks() {
        var request = { 'command': "getStacks" };
        uiController.postMessage(request);
    }

    $(document).ready(loadStacks);

    function createStack() {
        var stackId = document.getElementById("stack_id").value;

        var request = { 'command': "createStack", 'data': stackId };
        uiController.postMessage(request);

        popup("creating stack");
    }

    function deleteStack() {
        var stackId = document.getElementById("stack_id").value;

        var request = { 'command': "deleteStack", 'data': stackId };
        uiController.postMessage(request);

        popup("deleting stack");
    }

    function pop() {
        var stackId = getStackId();

        var request = { 'command': "pop", 'data': stackId };
        uiController.postMessage(request);

        popup("popped");
    }

    function peek() {
        var stackId = getStackId();

        var request = { 'command': "peek", 'data': stackId };
        uiController.postMessage(request);

        popup("peeked");
    }

    function push() {
        var stackId = getStackId();
        var pushData = document.getElementById("input_box").value;

        var request = { 'command': "push", 'data': stackId + "/" + pushData };
        uiController.postMessage(request);
        popup("pushed");
        $("#input_box").val('');

    }

    function serialize() {
        var stackId = getStackId();
        var request = { 'command': "serialize", 'data': stackId };
        uiController.postMessage(request);

        popup("serialized");
    }

    function popResultHandler(result) {
        $("#input_box").val(result);
        serialize();
    }

    function peekResultHandler(result) {
        $("#input_box").val(result);
    }

    function pushResultHandler(result) {
        serialize();
    }

    function serializeResultHandler(stack) {
        let result = stack.data;
        $("#allData").empty();

        for (let data of result) {
            $("#allData").append(`<li>${data}</li>`);
        }
    }

    function createStackResultHandler(result) {
        let stack = JSON.parse(result);
        var mySelect = $('#stacks');

        var dropDown = $(`<option></option>`).val(stack.id).html(stack.id);
        mySelect.append(dropDown);
        $('#stack_id').val('');
    }

    function deleteStackResultHandler(result) {
        let stack = JSON.parse(result);
        loadStacks();
    }


    function getStacksResultHandler(result) {
        let stackIds = JSON.parse(result);
        var mySelect = $('#stacks');
        mySelect.empty();
        for (let stackId of stackIds) {
            var dropDown = $(`<option></option>`).val(stackId).html(stackId);
            mySelect.append(dropDown);
        }
    }

    function getStackId() {
        let stackId = $('#stacks').val();

        console.log("selected value : " + stackId)
        return stackId;
    }

    function popup(txt) {
        document.getElementById("status").innerHTML = txt;
        setTimeout(function () {
            document.getElementById("status").innerHTML = "";
        }, 3000);

    }

    uiController.onmessage = responseHandler;

    function responseHandler(e) {
        console.log("Response Handler:", e);

        var result = e.data;

        const command = result.command;
        const data = result.data;
        const status = result.status;

        console.log("Response Handler:", data);

        switch (command) {
            case "createStack": createStackResultHandler(data);
                break;
            case "deleteStack": deleteStackResultHandler(data);
                break;
            case "getStacks": getStacksResultHandler(data);
                break;
            case "pop": popResultHandler(data);
                break;
            case "push": pushResultHandler(data);
                break;
            case "peek": peekResultHandler(data);
                break;
            case "serialize": serializeResultHandler(data);
                break;

            default: console.log("Un handled response");
        }
    }