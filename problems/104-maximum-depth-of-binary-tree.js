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
    function findDeepestNode(node, prevDepth) {
        // empty node, return previous depth
        if (!node) {
            return prevDepth;
        }

        // increment prevDepth for current node depth - new variable for readability
        const curDepth = ++prevDepth;

        // check leaf node
        if (!node.left && !node.right) {
            return curDepth;
        }

        // not a leaf node, recursively search child nodes
        return Math.max(findDeepestNode(node.left, curDepth), findDeepestNode(node.right, curDepth));
    }

    return findDeepestNode(root, 0);

    // 1 ms / beats 48.25%
    // very happy with getting to this recursive DFS solution,
        // but seems like there is a more efficient approach
    // TODO: look for improvement
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