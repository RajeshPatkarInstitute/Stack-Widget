/* Linked List based Stack */
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
        this.head = null;
    }
    push(v){
        var n = new Node(v,this.head);
        this.head = n;
    }
    pop(){
      if(this.head !== null){
        let firstNode = this.head;
        this.head = this.head.next;
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
        head = null;
    }
    isEmpty(){
       return this.head === null;
    }
}