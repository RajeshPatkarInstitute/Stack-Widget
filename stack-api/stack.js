const {v4: uuidv4} = require('uuid');
const EventEmitter = require('events');
const storage = require("./filestorage");

var useSingleStackPerServer = true;
// TODO remove defaulting to a single stack, once a stack selection flow is build
// ex - select stack from UI, or main stack per logge in user         
            

class Stack extends EventEmitter{
    constructor(id) {
        super();
        if (id) {
            this._stack = storage.load(id);
            this._stackId = id;            
        } else if(useSingleStackPerServer){
            this._stack = storage.load('default-stack');
            this._stackId = 'default-stack';            
        } else {
            this._stack = [];
            this._stackId = uuidv4();
            storage.synchronize(this._stack, this._stackId);
            console.log("Initializing empty array");
        }
    }

    push(elet) {
        console.log("Pushing :", elet);
        this._stack.push(elet);
        console.log("current stack has : " + this._stack);
        storage.synchronize(this._stack, this._stackId);
        this.emit('push',{elem: elet, stackId: this._stackId});
        // this.emit('overFlow', {stackId: this._stackId});

    }

    pop() {
        if (this.isEmpty()) {
            console.log("Stack is empty, can't pop");
            this.emit('empty', {stackId: this._stackId});
        } else {
            var poppedElet = this._stack.pop();
            console.log("Popped :", poppedElet);
            storage.synchronize(this._stack, this._stackId);
            this.emit('pop',{elem: poppedElet, stackId: this._stackId});
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
        // this.emit('stackRead', {stackId: this._stackId});
        return JSON.stringify(this._stack);
    }

}

module.exports = Stack;