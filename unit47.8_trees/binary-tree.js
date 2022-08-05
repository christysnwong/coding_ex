/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let minDepth = Number.MAX_VALUE;

    let findMinDepth = (currNode, depth = 1) => {
      // base case
      if (!currNode.left && !currNode.right) return depth;
      
      // normal case
      if (currNode.left && currNode.right) {
        // case 1 has both left and right path, search by recursion

        minDepth = Math.min(
          findMinDepth(currNode.left, depth+1),
          findMinDepth(currNode.right, depth+1)
        );
        
      } else if (currNode.left && !currNode.right) {
        // case 2 no right path, find min depth and stop search here
        minDepth = depth+1;

      } else if (currNode.right && !currNode.left) {
        // case 3 no left path, find min depth and stop search here;
        minDepth = depth+1;

      }

      return minDepth;
    };

    return findMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let maxDepth = 0;
    if (!this.root) return maxDepth;

    let findMaxDepth = (currNode, depth = 1) => {
      // base case
      if (!currNode.left && !currNode.right) return depth;

      // normal case
      if (currNode.left && currNode.right) {
        // case 1 has both left and right path, search by recursion
        maxDepth = Math.max(
          findMaxDepth(currNode.left, depth+1),
          findMaxDepth(currNode.right, depth+1)
        );

      } else if (currNode.left && !currNode.right) {
        // case 2 no right path, find max depth from left side
        maxDepth = findMaxDepth(currNode.left, depth+1);

      } else if (currNode.right && !currNode.left) {
        // case 3 no left path, find max depth from right side
        maxDepth = findMaxDepth(currNode.right, depth+1);

      }

      return maxDepth;
    };

    return findMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;

    let rootLeftSum = 0;
    let rootRightSum = 0;

    let findNodeMaxSum = (currNode) => {
      if (currNode === null) return 0;
      let tempLeftSum = findNodeMaxSum(currNode.left);
      let tempRightSum = findNodeMaxSum(currNode.right);
      
      return Math.max(0, tempLeftSum + currNode.val, tempRightSum + currNode.val);
    };

    if (this.root.left) rootLeftSum = Math.max(0, findNodeMaxSum(this.root.left));
    if (this.root.right) rootRightSum = Math.max(0, findNodeMaxSum(this.root.right));

    return this.root.val + rootLeftSum + rootRightSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let ans = null;

    while (queue.length) {
      let currNode = queue.shift();
      
      if (currNode.val > lowerBound && ans) {
        ans = Math.min(ans, currNode.val);
      } else if (currNode.val > lowerBound) {
        ans = currNode.val;
      }

      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);

    }

    return ans;

  }

  ///////////////////////////

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // helper function to check if both nodes refer to the same address, i.e. both are the same node
    let checkNode = (nodeA, nodeB) => {
      // console.log("nodeA", nodeA)
      // console.log("nodeB", nodeB)
      if (nodeA === null) return false;
      if (nodeA === nodeB) return true;
      return false;
    };

    // find children nodes for each level, compare with target nodes, check if cousins
    let findChildren = (parents) => {
      let children = [];

      // get children nodes from the parents using breadth first search
      // pushes null to separate children from different parents
      while (parents.length) {
        let currParent = parents.shift();
        children.push(currParent.left, currParent.right, null);

      }

      // find target nodes and their indexes in children
      if (children.length > 0) {
        let idxNode1 = children.findIndex((node) => checkNode(node, node1));
        let idxNode2 = children.findIndex((node) => checkNode(node, node2));

        // check difference of indexes
        // if diff of indexes > 1, they are not siblings but cousins
        if (idxNode1 !== -1 && idxNode1 !== idxNode2) {
          return Math.abs(idxNode1 - idxNode2) > 1;
        } else {

          // if target nodes are not found in this level, check the next level of children
          return findChildren(children.filter((child) => child !== null));
        }
      }

      // if no cousins or target nodes are found, return false
      return false;
    };

    return findChildren([this.root]);
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    // spingboard solution
    const vals = [];

    const traverse = currNode => {
      if (currNode) {
        vals.push(currNode.val);
        traverse(currNode.left);
        traverse(currNode.right);
      } else {
        vals.push("null");
      }
    }

    traverse(tree.root);
    return vals.join(" ");

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    // spingboard solution
    if (!stringTree) return null;

    const vals = stringTree.split(" ");

    const buildTree = () => {
      if (vals.length) {
        const currVal = vals.shift();

        if (currVal === "null") return null;

        let currNode = new BinaryTreeNode(+currVal);
        currNode.left = buildTree();
        currNode.right = buildTree();

        return currNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (!this.root) return null;

    let findNode = (currNode) => {
      // Step 1 check if the current node is valid
      if (!currNode) return null;

      // Step 2 - check children left and right
      let leftResult = findNode(currNode.left);
      let rightResult = findNode(currNode.right);

      // Step 3 - compare
      // case 1 - found from current node and children
      let currResult =
        currNode === node1 ? currNode : currNode === node2 ? currNode : null;

      if (currResult && leftResult) return currNode;
      if (currResult && rightResult) return currNode;

      // case 2 not found from left or right children or current node
      if (!currResult && !leftResult && !rightResult) return null;

      // case 3 - found from both left & right children
      if (leftResult && rightResult) return currNode;

      // case 4 - found from left children or right children or current node or
      if (leftResult || rightResult || currResult) {
        return leftResult || rightResult || currResult;
      }
    };

    return findNode(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };

// 1st attempt before refactoring

// minDepth() {
//   if (!this.root) return 0;
//   let minDepth = Number.MAX_VALUE;

//   let findMinDepth = (currNode, depth = 1) => {
//     // base case
//     if (currNode.left === null && currNode.right === null) {
//       return depth;
//     }

//     // normal case
//     if (currNode.left && currNode.right) {
//       // case 1 has both left and right path, search by recursion
//       depth++;

//       minDepth = Math.min(
//         findMinDepth(currNode.left, depth),
//         findMinDepth(currNode.right, depth)
//       );
//       console.log("case 1 min depth:", depth, minDepth);
//     } else if (currNode.left && !currNode.right) {
//       // case 2 no right path, find min depth and stop search here
//       depth++;
//       minDepth = depth;

//       console.log("case 2 right min depth:", minDepth);
//     } else if (currNode.right && !currNode.left) {
//       // case 3 no left path, find min depth and stop search here;
//       depth++;
//       minDepth = depth;

//       console.log("case 3 left min depth:", minDepth);
//     }

//     return minDepth;
//   };

//   return findMinDepth(this.root);
// }

///////////////////////////////////

// maxDepth() {
//   let maxDepth = 0;

//   if (!this.root) return maxDepth;

//   let findMaxDepth = (currNode, depth = 1) => {
//     // base case
//     if (currNode.left === null && currNode.right === null) {
//       return depth;
//     }

//     // normal case
//     if (currNode.left && currNode.right) {
//       // case 1 has both left and right path, search by recursion
//       depth++;

//       maxDepth = Math.max(
//         findMaxDepth(currNode.left, depth),
//         findMaxDepth(currNode.right, depth)
//       );
//       console.log("case 1 max depth:", depth, maxDepth);
//     } else if (currNode.left && !currNode.right) {
//       // case 2 no right path, find max depth from left side
//       depth++;
//       maxDepth = findMaxDepth(currNode.left, depth);

//       console.log("case 2 left max depth:", maxDepth);
//     } else if (currNode.right && !currNode.left) {
//       // case 3 no left path, find max depth from right side
//       depth++;
//       maxDepth = findMaxDepth(currNode.right, depth);

//       console.log("case 3 right max depth:", maxDepth);
//     }

//     return maxDepth;
//   };

//   return findMaxDepth(this.root);
// }

///////////////////////////////////


// maxSum() {
//   if (!this.root) return 0;

//   let rootLeftSum = 0;
//   let rootRightSum = 0;

//   let findNodeMaxSum = (currNode) => {
//     let tempLeftSum = 0;
//     let tempRightSum = 0;

//     let max = Number.MIN_VALUE;

//     // base case
//     if (!currNode.left && !currNode.right) {
//       return Math.max(0, currNode.val);
//     }

//     // normal case
//     if (currNode.left && currNode.right) {
//       // case 1
//       tempLeftSum = findNodeMaxSum(currNode.left);
//       tempRightSum = findNodeMaxSum(currNode.right);

//       max = Math.max(0, tempLeftSum, tempRightSum);
//       console.log("case 1 max:", max);
//     } else if (currNode.left && !currNode.right) {
//       // case 2
//       tempLeftSum = findNodeMaxSum(currNode.left);

//       max = Math.max(0, tempLeftSum);
//       console.log("case 2 left:", max);
//     } else if (currNode.right && !currNode.left) {
//       // case 3
//       tempRightSum = findNodeMaxSum(currNode.right);

//       max = Math.max(0, tempRightSum);
//       console.log("case 3 right:", max);
//     }

//     return currNode.val + max;
//   };

//   if (this.root.left) rootLeftSum = findNodeMaxSum(this.root.left);
//   if (this.root.right) rootRightSum = findNodeMaxSum(this.root.right);

//   return this.root.val + rootLeftSum + rootRightSum;
// }

///////////////////////////////////

// nextLarger(lowerBound) {
//     if (!this.root) return null;

//     // depth first search approach
//     let findSmallVal = (currNode) => {
//       let smallVal = null;
//       let leftSmallVal = null;
//       let rightSmallVal = null;

//       // base case
//       if (!currNode.left && !currNode.right) {
//         if (currNode.val > lowerBound) return currNode.val;

//         return null;
//       }

//       // normal case
//       if (currNode.left && currNode.right) {
//         // case 1
//         leftSmallVal = findSmallVal(currNode.left);
//         rightSmallVal = findSmallVal(currNode.right);

//         if (!leftSmallVal && !rightSmallVal) smallVal = null;
//         if (leftSmallVal && rightSmallVal)
//           smallVal = Math.min(leftSmallVal, rightSmallVal);
//         if (!leftSmallVal) smallVal = rightSmallVal;
//         if (!rightSmallVal) smallVal = leftSmallVal;

//         console.log("case 1 min small val:", smallVal);
//       } else if (currNode.left && !currNode.right) {
//         // case 2
//         leftSmallVal = findSmallVal(currNode.left);

//         if (currNode.val > lowerBound) {
//           smallVal = Math.min(currNode.val, leftSmallVal);
//         } else {
//           smallVal = leftSmallVal;
//         }

//         console.log("case 2 min small val:", smallVal);
//       } else if (currNode.right && !currNode.left) {
//         // case 3
//         rightSmallVal = findSmallVal(currNode.right);

//         if (currNode.val > lowerBound) {
//           smallVal = Math.min(currNode.val, rightSmallVal);
//         } else {
//           smallVal = rightSmallVal;
//         }

//         console.log("case 3 min small val:", smallVal);
//       }

//       console.log("currVal", currNode.val);

//       if (currNode.val > lowerBound && !smallVal) smallVal = currNode.val;
//       if (currNode.val > lowerBound && smallVal)
//         smallVal = Math.min(currNode.val, smallVal);

//       return smallVal;
//     };

//     return findSmallVal(this.root);
// }


///////////////////////////////////

// lowestCommonAncestor(node1, node2) {
//     let ancestor = null;
//     if (!this.root) return null;

//     let findNode = (currNode) => {
//       let leftResult;
//       let rightResult;

//       // Step 1 - first check if current node value is one of the target nodes
//       // if target node is found, result is true, otherwise false
//       let result = currNode === node1 || currNode === node2;

//       // Step 2 - check children left and right
//       if (!currNode.left && !currNode.right) {
//         // case 1 - no children
//         return result;
//       }

//       if (currNode.left && currNode.right) {
//         // case 2 - has children

//         leftResult = findNode(currNode.left);
//         rightResult = findNode(currNode.right);
//       } else if (currNode.left && !currNode.right) {
//         // case 3 - has left children only
//         leftResult = findNode(currNode.left);
//       } else if (currNode.right && !currNode.left) {
//         // case 4 - has right children only
//         rightResult = findNode(currNode.right);
//       }

//       // Step 3 - compare results from child with result from current node
//       if (leftResult && rightResult) ancestor = currNode;
//       if ((result && leftResult) || (result && rightResult))
//         ancestor = currNode;

//       return result || leftResult || rightResult;
//     };

//     if (findNode(this.root) && ancestor) {
//       return ancestor;
//     }

//     return null;
//   }

