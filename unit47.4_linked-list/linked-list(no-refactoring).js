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

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    

    if (this.length === 0) {
      this.tail = newNode;
    } 

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    let currNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;

      return currNode.val;

    } else {
      while (currNode.next.next !== null) {
        currNode = currNode.next;
      }

      let removedNode = currNode.next;

      this.tail = currNode;
      this.tail.next = null;

      this.length--;

      return removedNode.val;
    }

  }

  /** shift(): return & remove first item. */

  shift() {
    let oldHead = this.head;
    let newHead = this.head.next;
    this.head = newHead;
    
    this.length--;
    
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return oldHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let currNode = this.head;
    for (let i = 0; i < idx; i++) {
      currNode = currNode.next;
    }
    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let currNode = this.head;
    for (let i = 0; i < idx; i++) {
      currNode = currNode.next;
    }
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let newNode = new Node(val);
    let currNode = this.head;

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      for (let i = 0; i < idx - 1; i++) {
        currNode = currNode.next;
      }

      newNode.next = currNode.next;
      currNode.next = newNode;

      if (this.length === idx) {
        this.tail = newNode;
      }
    }

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let currNode = this.head;
    let removedNode;

    if (this.length === 0) {
      return 0;
    } else if (idx === 0) {
      // removes head

      if (this.length === 1) {
        removedNode = this.head;
        this.head = null;
        this.tail = null;
      } else {
        removedNode = this.head;
        this.head = this.head.next;
      }

    } else if (idx = this.length - 1) {
      // removes tail
      removedNode = this.tail;

      if (this.length === 2) {
        currNode = this.head;
      } else {
        for (let i = 0; i < this.length - 2; i++) {
          currNode = currNode.next;
        }
      }

      this.tail = currNode;
      this.tail.next = null;
    } else {
      for (let i = 0; i < idx - 1; i++) {
        currNode = currNode.next;
      }

      removedNode = currNode.next;
      currNode.next = currNode.next.next;
    }

    this.length--;

    return removedNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let currNode = this.head;
    let total = 0;

    if (this.length === 0) return 0;

    for (let i = 0; i < this.length; i++) {
      total += currNode.val;
      currNode = currNode.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;

