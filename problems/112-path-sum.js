// https://leetcode.com/problems/path-sum/
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {

};

// given root of a binary tree and an integer targetSum
    // return true if tree has a root-to-leaf path summing to equal targetSum

// EXAMPLE: (branch) 5 > 4 > 11 > 2, targetSum = 22
// OUTPUT: true

// EXAMPLE root = [], targetSum = 0
// OUTPUT: false
    // "Since the tree is empty, there are no root-to-leaf paths"
    // I understand where they're coming from because null !== 0
        // but this just feels like introducing an edge case for no reason

// constraints:
    // number of nodes in the range [0, 5000]
        // i.e. will need to do an empty check
        // see example above
    // -1000 <= Node.val <= 1000
    // -1000 <= targetSum <= 1000

// intuition: use DFS as we're dealing with nodes from root -> leaf
// recursion will likely be more intuitive, as we will need to pass along another value
    // i.e. a running total of the current root -> leaf sum
        // or totalSum - previous values from nodes on the branch
    // this means we don't need to declare a helper function within the provided function skeleton
        // as we already have two arguments: a node, an integer value