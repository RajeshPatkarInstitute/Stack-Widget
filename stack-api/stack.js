class Stack {

    constructor(stackJson) {
        if (Array.isArray(stackJson)) {
            this._stack = stackJson;
        } else {
            this._stack = [];
            console.log("Bad input " + stackJson + " is not a list");
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