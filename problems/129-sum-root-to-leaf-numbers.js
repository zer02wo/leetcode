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
    let nodePath = { node: root, path: '' };
    let stack = [nodePath];

    let output = 0;

    while (stack.length) {
        let { node, path } = stack.pop();

        // update path with current node (string concatenation, not addition)
        let newPath = path + node.val;

        if (node.right) {
            stack.push({node: node.right, path: newPath});
        }

        if (node.left) {
            stack.push({node: node.left, path: newPath});
        }

        // leaf node
        if (!node.left && !node.right) {
            output += parseInt(newPath);
        }
    }

    return output;

    // 0 ms / beats 100%
    // definitely found this a little tricky, got caught up trying to limit myself to basic data structures
    // pretty simple O(n) time complexity solution, but definitely not the most memory efficient

    // TODO: would a recursive solution make more sense?
};

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