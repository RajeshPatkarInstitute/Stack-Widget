const {v4: uuidv4} = require('uuid');
const EventEmitter = require('events');
const fs = require('fs');

class Stack extends EventEmitter{
    constructor(options={}) {
        super();
        let id = options.id;
        let data = options.data;
        if (id && data) {
            this._stack = data;
            this._stackId = id;
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
        this.emit('push',{elem: elet, stackId: this._stackId});
        // this.emit('overFlow', {stackId: this._stackId});
        persistStack({id: this._stackId,data: this._stack});

    }

    pop() {
        if (this.isEmpty()) {
            console.log("Stack is empty, can't pop");
            this.emit('empty', {stackId: this._stackId});
        } else {
            var poppedElet = this._stack.pop();
            console.log("Popped :", poppedElet);
            this.emit('pop',{elem: poppedElet, stackId: this._stackId});
            persistStack({id: this._stackId,data: this._stack});
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

    // factory
    static getStack(id){
        let instance;
        console.log('getstack id', id);
        
        if(id) {
            instance = getFromPersistence(id);
        } else {
            instance = new Stack();
        }
        return instance;
    }

}

function persistStack(stack) {
    let data = {};
    console.log(stack);
    data[stack.id] = stack.data;
    console.log(data);
    
    console.log('writing..', JSON.stringify(data));
    
    fs.writeFileSync('./persistence.json',JSON.stringify(data));

// this.emit('stackPersisted', {stackId: this._stackId});
}

function getFromPersistence(id) {
    let allData = JSON.parse(fs.readFileSync('./persistence.json','utf8'));
    let data = allData[id];

    return new Stack({id, data});
}

module.exports = Stack;