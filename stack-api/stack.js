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
        if (this._stack.length > 0) {
            var poppedElet = this._stack.pop();
            console.log("Popped :", poppedElet);
            return poppedElet;
        } else {
            console.log("Stack is empty");
        }
    }

    top() {
        var top = this._stack[this._stack.length - 1];
        console.log("Top element is : ", top)
        return top;
    }

    toString() {
        return JSON.stringify(this._stack);
    }

}

module.exports = Stack;