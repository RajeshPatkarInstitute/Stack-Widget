let stackArea = document.getElementById('stackArea');
let stackResult = document.getElementById('stackResult');
let inputData = document.querySelector('#inputData');

function push() {
	let stackCount = stackResult.childElementCount;
	console.log('push executed');
	console.log(stackCount);
	if (stackCount == 5) {
		console.log('stack OVerflow');
	} else {
		var stackRaw = document.createElement('option');
		if (inputData.value == '') {
			console.log('Enter valide data');
		}
		var stackItem = document.createTextNode(inputData.value);
		stackRaw.appendChild(stackItem);
		stackResult.prepend(stackRaw);
	}

	inputData.value = '';
}

function pop() {
	console.log('stack underflow');
	let stackCount = stackResult.childElementCount;

	if (stackCount >= 0 && stackCount <= 5) {
		stackResult.removeChild(stackResult.firstChild);
	} else {
		console.log('Stack Underflow');
	}
}
