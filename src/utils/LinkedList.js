class Node{
  constructor(val){
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList{

  constructor(){
    this.head = null;
    this.tail = null; 
    this.length = 0;
  }

  push = (val) => {
    let newNode = new Node(val);
  
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  
    this.length++;
  
    return this;
  };

  unshift = (val) => {
    let newNode = new Node(val);
  
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  
    this.length++;
  
    return this;
  };

  pop = () => {

    if (!this.tail) {
      return undefined;
    } else if (!this.tail.prev) {
      this.head = null;
      this.tail = null;
    }
  
    let temp = this.tail;
    let previousNode = this.tail.prev;
    temp.prev = null;
    previousNode.next = null;
    this.tail = previousNode;
  
    this.length--;
  
    return temp.val;
  };
  
  shift = () => {  
    if (!this.head) {
      return undefined;
    }
  
    let temp = this.head;
    this.head = this.head.next;
    temp.next = null;
    if (this.head) this.head.prev = null;
  
    this.length--;
  
    return temp.val;
  };

  map = (callback) => {
    const arr = [];

    let node = this.head;

    for(let i = 0; i < this.length; i++){

      arr.push(callback(node.val,i));
      
      node = node.next;
    }

    return arr;
  }
  
}


export default LinkedList;