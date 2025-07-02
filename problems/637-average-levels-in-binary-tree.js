// https://leetcode.com/problems/average-of-levels-in-binary-tree/
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {

};

// given root of binary tree, return the average value of the nodes on each level (in an array)
    // answers within 10^-5 will be accepted

// EXAMPLE:
//   3
// 9   20
//   15   7
// OUTPUT: [3,14.5,11]
    // average of level 0 = 3
    // average of level 1 = 9 + 20 / 2 = 14.5
    // average of level 2 = 15 + 7 / 2 = 11

// constraints:
// number of nodes in the range [1,10^4]
    // i.e. no null check required
// -2^31 <= Node.val <= (2^31)-1

// intuition: given that we're dealing with nodes at each level
    // we want to use a breadth-first search (BFS)
    // implement using a queue (FIFO) or recursion
// iterate through all nodes currently in the queue:
    // add the value to a sum
    // add the child nodes to the queue
// calculate the average from the sum of node values
    // push to array
// continue until no nodes left in queue