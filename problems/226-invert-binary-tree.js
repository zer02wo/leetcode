// https://leetcode.com/problems/invert-binary-tree/
// tags: easy, binary tree, depth-first search

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
 * @return {TreeNode}
 */
var invertTree = function(root) {

};

// given root of binary tree, invert the tree and return its root

// EXAMPLE:
//   2        2
//  / \  =>  / \
// 1   3    3   1

// intuition: inversion is more like "mirroring"
    // aka we just need to swap the left/right nodes
// using a depth-first search
    // we can recursively swap the left & right nodes

// check for null node (i.e. root or "child" of leaf)
// swap the left & right nodes
// recursively invert the left & right child nodes
// return the root node

// could probably be done with an (iterative) BFS as well by swapping left/right nodes in pairs