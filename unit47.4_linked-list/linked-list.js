/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  traverse() {
    let currNode = this.head;
    while (currNode) {
      console.log(currNode);
      currNode = currNode.next;
    }
  }

  getNode(idx) {
    let currNode = this.head;
    for (let i = 0; i < idx; i++) {
      currNode = currNode.next;
    }

    return currNode;
  }

  isIdxValid(idx) {
    if (idx < 0 || idx > this.length) {
      throw new Error("Invalid index.");
    }
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.push(val);
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    } 
    
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length-1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    this.isIdxValid(idx);
    return this.getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this.isIdxValid(idx);

    let currNode = this.getNode(idx);
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    this.isIdxValid(idx);

    let newNode = new Node(val);
    let prevNode = this.getNode(idx-1);

    if (idx === 0) {
      return this.unshift(val);
    } 

    if (idx === this.length) {
      return this.push(val);
    }
    
    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    this.isIdxValid(idx);
    let removedNode; 

    // if an array is already empty
    if (this.length === 0) {
      return "There isn't anything to remove";
    } 

    if (idx === 0) {
      // removes head
      if (this.length === 1) {
        removedNode = this.head;
        this.head = null;
        this.tail = null;
      } else {
        removedNode = this.head;
        this.head = this.head.next;
      }

    } else if ((idx = this.length - 1)) {
      // removes tail
      
      removedNode = this.tail;
      let prevNode = this.getNode(idx-1);

      this.tail = prevNode;
      this.tail.next = null;
      
    } else {
      // removes any node inbetween
      
      prevNode = this.getNode(idx-1);
      prevNode = prevNode.next.next;

      removedNode = prevNode.next;

    }

    this.length--;
    return removedNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let currNode = this.head;
    let total = 0;

    if (this.length === 0) return 0;

    while (currNode) {
      total += currNode.val;
      currNode = currNode.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;