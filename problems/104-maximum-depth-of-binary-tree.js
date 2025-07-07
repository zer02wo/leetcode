// https://leetcode.com/problems/maximum-depth-of-binary-tree/
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
 * @return {number}
 */
var maxDepth = function(root) {

};

// given the root of a binary tree, return its maximum depth:
    // the number of nodes on the longgest path from the root to the farthest leaf node

// intuition: given that we want to find the deepest part of the tree first:
    // use depth-first search
// unlike leetcode #111 where breadth-first search made sense (in the end),
    // we're doing the opposite operation here so we use the opposite algorithm

// recursive solution likely makes more sense, so we can pass along the current depth as an argument
    // within an iterative solution we would need to create a modified stack:
        // e.g. [[node, prevDepth]]
    // which would be easier to do in a recursive helper function (node, prevDepth)