// https://leetcode.com/problems/sum-root-to-leaf-numbers/
// tags: medium, leetle

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    // data structure to store reference to node and previous path values-
    let nodePath = { node: root, pathSum: 0 };
    let stack = [nodePath];

    let output = 0;

    while (stack.length) {
        let { node, pathSum } = stack.pop();

        // update path with current node
            // multiply existing path by 10 and add current digit
                // this is essentially concatenation, but only using arithmetic operations
            // we can do this because we know the node values are always 0 - 9
        let newPathSum = (pathSum * 10) + node.val;

        if (node.right) {
            stack.push({node: node.right, pathSum: newPathSum});
        }

        if (node.left) {
            stack.push({node: node.left, pathSum: newPathSum});
        }

        // leaf node
        if (!node.left && !node.right) {
            output += newPathSum;
        }
    }

    return output;

    // 0 ms / beats 100%
    // definitely found this a little tricky, got caught up trying to limit myself to basic data structures
    // pretty simple O(n) time complexity solution, but not the most memory efficient
};

var sumNumbersRecursive = function(root) {
    // TODO: I never know what to call the recursive DFS helper function :/
    function sumNodeValues(node, currentSum) {
        if (!node) {
            return 0;
        }

        // update path with current node
            // multiply existing path by 10 and add current digit
                // this is essentially concatenation, but only using arithmetic operations
            // we can do this because we know the node values are always 0 - 9
        let newSum = (currentSum * 10) + node.val;

        // leaf node
        if (!node.left && !node.right) {
            return newSum;
        }

        return sumNodeValues(node.left, newSum) + sumNodeValues(node.right, newSum);
    }

    return sumNodeValues(root, 0);

    // 0 ms / beats 100%
    // very quick/easy to implement having already figured out the iterative approach
        // this is still probably less memory efficient due to recursive function stack/depth
    // but good knowledge to have
}

// each root-to-leaf path forms a number
// return the sum of all root-to-leaf path numbers

// EXAMPLE: root = [1,2,3]
//      [1]
//      / \
//    [2] [3]
// root-to-leaf paths: 1->2, 1->3
    // sum: 12 + 13
// OUTPUT: 25

// as we're interested with leaf nodes, the immediate idea is to use a DFS approach
// probably(?) best not to use recursive DFS to have easier access to the previous node values
// but if we use a stack, we have to figure out how to handle nodes that are not on the current root-to-leaf path
    // we also pop nodes from the stack, which removes reference to them making this more difficult
    // so we could use a more complicated data structure to store reference to the current path at each node