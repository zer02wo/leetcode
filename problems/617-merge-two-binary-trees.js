// https://leetcode.com/problems/merge-two-binary-trees/
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {

};

// given roots of two binary trees
// imagine when overlapping the trees, some nodes cover the other, while others do not
// merge the two trees into a new binary tree
    // if two nodes overlap, sum the node values up in the new merged node
    // otherwise the null node will be used as the node of the new tree
// return the merged tree

// EXAMPLE
//    1       2            3
//   / \     / \          / \
//  3   2   1   3   =>   4   5
// /         \   \      / \   \
// 5          4   7    5  4    7

// intuition: rather than creating a new tree, because we are merging the trees,
    // we can update one of the existing trees to reduce new space used
// a recursive solution likely makes sense, as we're given a function to deal with two nodes at a time
    // i.e. we can recursively merge the two nodes
// an iterative solution would be possible, probably BFS with a queue for each tree

// cases:
    // both nodes are null
        // return null
    // either node is null
        // return the NOT null node
    // both nodes NOT null
        // sum the values on either node and return it