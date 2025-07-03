// https://leetcode.com/problems/minimum-depth-of-binary-tree/
// tags: easy, binary tree, depth-first search, breadth-first search

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
var minDepth = function(root) {
    if (!root) {
        return 0; // no nodes = depth of 0
    }

    const queue = [root];
    let depth = 0;

    while (queue.length) {
        depth++;

        const size = queue.length;

        // similar to leetcode #637
        // we need to review all nodes per level in one iteration
        for (let i = 0; i < size; i++) {
            const node = queue.shift();

            // check if leaf node
            if (!node.left && !node.right) {
                // first leaf node encountered, return depth
                return depth;
            }

            // push child nodes to queue
            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    return depth;

    // 0 ms / beats 100%
    // I think the "depth" in the question made me too quickly assume DFS,
    // when this BFS was very easy to implement based off leetcode #637 done yesterday
};

// given the root of a binary tree, find its minimum depth:
    // the number of nodes along the shortest path from the root node down to the nearest leaf node

// EXAMPLE:
//   3
// 9   20
//   15  7
// OUTPUT: 2
    // 3 -> 9
    // i.e. in this question the root node counts as a depth of 1, instead of 0 like you would expect

// constraints:
    // number of nodes in tree in range [0,10^5]
        // i.e. a null/empty check is required
    // -1000 <= Node.val <= 1000

// intuition: given that we're dealing with the depth of a node
    // we want to use a depth-first search (DFS)
    // implement using a stack (FILO) or recursion
// although we could use a BFS approach to keep track of the level more simply
// otherwise we would need to modify the stack to also keep track of the depth of each node
    // i.e. a 2D array of [[node,depth],[node,depth]]
// recursion may be a more intuitive solution in this case

// let's start with BFS