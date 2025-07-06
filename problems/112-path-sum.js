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
    // handle base case of root = []
    // also handles recursive child search for empty left or right subtrees
    if (!root) {
        return false;
    }

    // check leaf node
    if (!root.left && !root.right) {
        // determine if root -> leaf path === targetSum
        return targetSum === root.val;
    }

    // not a leaf node, so include in root -> leaf path sum
    targetSum -= root.val;

    // recursively search left/right subtrees
    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);

    // 0 ms / beats 100%
    // perhaps it's just the order of the questions I'm picking,
        // but recursion gets used a lot for binary tree problems
    // an iterative solution is possible, but would require a modified stack:
        // [[node, prevSum]] or [[node, newTarget]]
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

// handle base case
    // i.e. when root = []
// check for leaf node
    // check if root -> leaf sum === original targetSum
        // i.e. targetSum - leaf.val === 0
// else recursively search child nodes, including current node in root -> leaf path
    // i.e. subtract current node value from targetSum