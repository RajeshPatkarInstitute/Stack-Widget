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
        if(this._stack.length == 10) { //TMP TODO stack full
            // this.emit('stackFull', {stackId: this._stackId});
            throw new StackFullException(this._stackId);
        }
        console.log("Pushing :", elet);
        this._stack.push(elet);
        console.log("current stack has : " + this._stack);
        this.emit('push',{elem: elet, stackId: this._stackId});
        persistStack({id: this._stackId,val: elet});

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

}

/*
{
    "7e7246c1-6589-49ad-9a81-08199e014b62":["1"],
    "fghy46c1-sdsa-49ad-9a81-08199e014b62":["2","3"]
}
*/
function persistStack(stackElem) {
    let allData;
    let fileData = fs.readFileSync('./persistence.json','utf8');
    if(fileData) {
        allData = JSON.parse(fileData);
        if(allData[stackElem.id]){
            allData[stackElem.id].push(stackElem.val);
        } else {
            allData[stackElem.id] = [stackElem.val];
        }
    } else {
        allData = {
            [allData[stackElem.id]] : [stackElem.val]
        }
    }
    fs.writeFileSync('./persistence.json',JSON.stringify(allData));
// this.emit('stackPersisted', {stackId: this._stackId});
}

function getFromPersistence(id) {
    let allData = JSON.parse(fs.readFileSync('./persistence.json','utf8'));
    let data = allData[id];
    let st = new Stack({id, data});
    return st;
}

function StackFullException(id) {
    this.fromStack = id;
}

function stackFactory(id){
    let instance;
    console.log('getstack id', id);
    if(id) {
        instance = getFromPersistence(id);
    } else {
        instance = new Stack();
    }

    instance.push = new Proxy(instance.push, {
        apply: (target,thisArg,argList) => {
            console.log(`entering ${target.name}`);
            try {
                target.call(thisArg, ...argList);
            } catch(exception) {
                console.log('exception.fromStack id :',exception.fromStack);
                let id = exception.fromStack;
                let instance = new Stack();
                instance._stackId = id;
                instance.push(...argList);
            }
            console.log(`leaving ${target.name}`);
        }
    })
    return instance;
}

class StackProxy {
    constructor(target, args) {
        
    }
}
module.exports = stackFactory;