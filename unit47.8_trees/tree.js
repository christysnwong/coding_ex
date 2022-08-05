/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const stack = [this.root];
    let sum = 0;

    if (!this.root) return 0;

    while (stack.length) {
      const curr = stack.pop();
      sum += curr.val;

      for (let child of curr.children) {
        stack.push(child);
      }
      
    }

    return sum;
    
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const stack = [this.root];
    let countEven = 0;

    if (!this.root) return 0;

    while (stack.length) {
      const curr = stack.pop();
      if (curr.val % 2 === 0) {
        countEven++;
      }

      for (let child of curr.children) {
        stack.push(child);
      }

    }

    return countEven;

  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const stack = [this.root];
    let count = 0;

    if (!this.root) return 0;

    while (stack.length) {
      const curr = stack.pop();
      if (curr.val > lowerBound) {
        count++;
      }

      for (let child of curr.children) {
        stack.push(child);
      }

    }

    return count;

  }
}

module.exports = { Tree, TreeNode };
