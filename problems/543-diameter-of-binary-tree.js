// https://leetcode.com/problems/diameter-of-binary-tree/
// tags: easy, binary tree,

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
var diameterOfBinaryTree = function(root) {
    if (!root) {
        return 0;
    }

    // TODO: this is accounting for *every* node in the tree, not just along the deepest path
        // very quick attempt to build off previous solution for leetcode #104
    return diameterOfBinaryTree(root.left) + diameterOfBinaryTree(root.right) + 1;
};

// given root of binary tree, return the length of the diameter of the tree
    // diameter: length of the longest path between any two nodes in tree
        // may or may not pass through the `root`
    // length of path: represented by the number of edges between them

// EXAMPLE:
//   1
//  / \
//  2  3
// / \
// 4  5
// OUTPUT: 3
    // E.g. 4 > 2 > 1 > 3
    // E.g. 5 > 2 > 1 > 3

// intuition: this problem *seems* to be able to simplify to:
    // maxDepth(leftSubtree) + maxDepth(rightSubtree)
        // + 1 for root node
// the question does state the path "may not" route through the root node,
    // but I'm not provided an example where this isn't the case
    // maybe a situation where e.g. a child node in the left subtree has two deep subtrees
        // and no right subtree is provided from the root node