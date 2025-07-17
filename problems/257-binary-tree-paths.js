// https://leetcode.com/problems/binary-tree-paths/
// tags: easy, binary tree

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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {

};

// given root of a binary tree
    // return all root-to-leaf paths in any order

// EXAMPLE:
//   1
//  / \
// 2   3
//  \
//   5
// OUTPUT ['1->2->5', '1->3']

// constraints:
    // number of nodes in tree is in the range [1, 100]
    // -100 <= Node.val <= 100

// initial approaches:
// 1. recursive DFS
    // create an output array to push paths
    // create a recursive helper function with two arguments:
        // string representation of previous nodes
        // current node
    // if current node not a leaf node
        // append current node value to string representation
        // recursively search children
    // if leaf node (or perhaps null "child" of leaf node would be better)
        // push string representation to array
    // return output array once all nodes traversed

// 2. iterative BFS/DFS
    // create a modified stack/queue to keep track of previous nodes along path
    // iterate through modified data structure and pop/shift elements as appropriate
        // update the relevant paths for the nodes
        // push to an output array when leaf node encountered
    // return output array once all nodes traversed

// option 1. seems much easier to implement, so lets start with that