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
    // empty node
    if (!root) {
        return 0;
    }

    // recursively search left / right subtrees
    // +1 to account for current node in depth
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;

    // 0 ms / beats 100%
    // much cleaner solution,
        // I do think using the helper function is more explicit
        // but this solution is more optimal
    // O(n) time complexity, O(h) space complexity (maximum height of binary tree)
};

var maxDepthRecursiveHelperDFS = function(root) {
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
    // O(n) time complexity, O(h) space complexity (maximum height of binary tree)
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

// IMPROVEMENT:
// we don't need to supply a (prevDepth) argument for a recursive solution
// from the root node we have a left & right subtree
    // the maximum depth is therefore the subtree with the greatest depth
    // i.e. Math.max(root.left, root.right)
// given that we're asking for depth (rather than height), we also need to +1 for the root node
    // i.e. Math.max(root.left, root.right) + 1
// this formula can be applied recursively, where each subtree becomes its own root node
    // i.e. +1 for every node visited in the root -> leaf path (+0 for when you reach a null/empty node)