/* Linked List based Stack */
import { v4 as uuidv4 } from 'uuid';


class Node{
    constructor(v,next){
       this.v = v;
       this.next = next;
    }
    getNext(){
        return this.next;
    }
    getValue(){
        return this.v;
    }
}

class Stack{
    constructor(){
        let d = new Date();
        this._head = this;
        this._count = 0;
        this._creation = d;
        this._updation = d;
        this._uuid = uuidv4();
    }
    push(v){
        var n = new Node(v,this._head);
        this._head = n;
        this._count++;
        _updation = new Date();
    }
    pop(){
      if(this._head !== this){
        let firstNode = this._head;
        this._head = this._head.next;
        this._count--;
        this._updation = new Date();
        return firstNode;
      }
      return null; /* Work Needed Here */
    }
    toTatva(){
          /* Work Needed Here */
    }
    peek(){
          return this._head;
    }
    flush(){
        this._head = this;
    }
    isEmpty(){
       return this.head === this._tail;
    }
    get Creation(){
        return this._creation;
    }
    set Creation(v){
        this._creation = v;
    }
    get Updation(){
        return this._updation;
    }
    set Updation(v){
        this._updation = v;
    }
    get Count(){
        return this._count;
    }
    set Count(v){
        this._count = v;
    }
    get uuid(){
       return this._uuid;
    }
}
