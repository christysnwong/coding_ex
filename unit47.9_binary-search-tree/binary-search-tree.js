class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currNode = this.root;

    while (currNode) {
      let currVal = currNode.val;

      if (val < currVal) {
        if (!currNode.left) {
          currNode.left = newNode;
          currNode = null;
        } else {
          currNode = currNode.left;
        }
      }

      if (val > currVal) {
        if (!currNode.right) {
          currNode.right = newNode;
          currNode = null;
        } else {
          currNode = currNode.right;
        }
      }
    }

    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let insertNodeUnder = (currNode) => {
      if (val < currNode.val) {
        if (currNode.left) {
          insertNodeUnder(currNode.left);
        } else {
          currNode.left = newNode;
        }
      }

      if (val > currNode.val) {
        if (currNode.right) {
          insertNodeUnder(currNode.right);
        } else {
          currNode.right = newNode;
        }
      }
    };

    insertNodeUnder(this.root);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currNode = this.root;

    while (currNode) {
      if (currNode.val === val) {
        return currNode;
      }

      currNode = val < currNode.val ? currNode.left : currNode.right;
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    let findNode = (currNode) => {
      // base
      if (!currNode) return undefined;

      // normal
      if (currNode.val === val) {
        return currNode;
      } else {
        currNode = val < currNode.val ? currNode.left : currNode.right;
        return findNode(currNode);
      }
    };

    return findNode(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let arr = [];

    let traverse = (currNode) => {
      arr.push(currNode.val);
      if (currNode.left) traverse(currNode.left);
      if (currNode.right) traverse(currNode.right);
    };

    traverse(this.root);

    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let arr = [];

    let traverse = (currNode) => {
      if (currNode.left) traverse(currNode.left);
      arr.push(currNode.val);
      if (currNode.right) traverse(currNode.right);
    };

    traverse(this.root);

    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let arr = [];

    let traverse = (currNode) => {
      if (currNode.left) traverse(currNode.left);
      if (currNode.right) traverse(currNode.right);
      arr.push(currNode.val);
    };

    traverse(this.root);

    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let arr = [];

    let traverse = (currNodes) => {
      let childrenArr = [];

      for (let currNode of currNodes) {
        arr.push(currNode.val);
        if (currNode.left) childrenArr.push(currNode.left);
        if (currNode.right) childrenArr.push(currNode.right);
      }

      if (childrenArr.length > 0) traverse(childrenArr);
    };

    traverse([this.root]);

    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    let currNode = this.root;
    if (!currNode) return null;

    let minDepth = (currNode) => {
      if (!currNode) return 0;
      return Math.min(minDepth(currNode.left), minDepth(currNode.right)) + 1;
    };

    let maxDepth = (currNode) => {
      if (!currNode) return 0;
      return Math.max(maxDepth(currNode.left), maxDepth(currNode.right)) + 1;
    };

    return maxDepth(currNode) - minDepth(currNode) <= 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.right && !this.root.left)) return undefined;

    // find second highest value from the left side of root
    let find2ndHighLeft = (currNode) => {
      if (!currNode.right) {
        return currNode.val;
      } else {
        return find2ndHighLeft(currNode.right);
      }
    };

    // find second highest value from the right side of root
    let find2ndHighRight = (currNode) => {
      if (currNode.right && !currNode.right.left && !currNode.right.right) {
        return currNode.val;
      } else if (!currNode.right && currNode.left && !currNode.left.right) {
        return currNode.left.val;
      } else {
        return find2ndHighRight(currNode.right);
      }
    };

    // check tree structure to see which side the second highest value would be on
    if (!this.root.right) {
      return find2ndHighLeft(this.root.left);
    } else {
      return find2ndHighRight(this.root);
    }
  }
}

module.exports = BinarySearchTree;
