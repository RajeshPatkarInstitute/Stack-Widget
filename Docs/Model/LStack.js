/* Linked List based Stack */
class Meta{
    constructor(){
        let d = new Date();
        this._count = 0;
        this._creation = d;
        this._updation = d;
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
    increment(){
        this._count++;
    }
    decrement(){
        this._count--;
    }
}



class Node{
    constructor(v,next=null){
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
        let m = Meta();
        this.head = m;
        this._tail = m;
    }
    push(v){
        var n = new Node(v,this.head);
        this.head = n;
        this._tail.increment();
        this._tail.Updation = new Date();
    }
    pop(){
      if(this.head !== null){
        let firstNode = this.head;
        this.head = this.head.next;
        this._tail.decrement();
        this._tail.Updation = new Date();
        return firstNode;
      }
      return null; /* Work Needed Here */
    }
    toTatva(){
          /* Work Needed Here */
    }
    peek(){
          /* Work Needed Here */
    }
    flush(){
        head = tail;
    }
    isEmpty(){
       return this.head === this._tail;
    }
    get Meta(){
        return this._tail;
    }
}
