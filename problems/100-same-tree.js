// https://leetcode.com/problems/same-tree/
// tags: easy, binary tree, breadth-first search

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {

};

// given roots of two binary trees (p, q), check if they are the same:
    // structurally identical and the nodes have the same value

// EXAMPLE:
//   1         1
// 2   3     2   3
// OUTPUT: TRUE

// EXAMPLE:
//   1         1
// 2             2
// OUTPUT: FALSE
    // pTree is left child
    // qTree is right child

// EXAMPLE:
//   1         1
// 2   1     1   2
// OUTPUT: FALSE
    // trees are mirrored, not identical

// intuition: iterate through both trees as the same time via BFS
    // compare nodes at each level to check if they are identical
// two queues, one for each tree
    // check if the number of nodes in each level is identical
    // then iterate through the nodes of the level and check if the values are the same
        // by using two queues in the same iteration we know they *should* be in the same order if they are identical
// early return false if not identical
// return true at end otherwise

// constraints allow for 0 nodes, so may need some additional conditions to check for this base case