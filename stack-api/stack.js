const {v4: uuidv4} = require('uuid');

class Stack {
    constructor(stackJson) {
        if (stackJson) {
            this._stack = JSON.parse(stackJson);
            this._stackId = uuidv4();
        } else {
            this._stack = [];
            this._stackId = uuidv4();
            console.log("Initializing empty array");
        }
    }

    push(elet) {
        console.log("Pushing :", elet);
        this._stack.push(elet);
        console.log("current stack has : " + this._stack);
    }

    pop() {
        if (this.isEmpty()) {
            console.log("Stack is empty, can't pop");
        } else {
            var poppedElet = this._stack.pop();
            console.log("Popped :", poppedElet);
            return poppedElet;
        }
    }

    top() {
        if (this.isEmpty()) {
            console.log("Stack is empty, nothing on top");
        } else {
            var top = this._stack[this._stack.length - 1];
            console.log("Top element is : ", top)
            return top;
        }
    }

    isEmpty() {
        if (this._stack.length == 0) {
            return true;
        }
        return false;
    }

    toString() {
        return JSON.stringify(this._stack);
    }

}

module.exports = Stack;