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
    // both trees have 0 nodes
    if (!p && !q) {
        return true;
    }

    // one tree has 0 nodes, the other does not
    if (!p || !q) {
        return false;
    }

    // BFS data structure for both trees
    let pQueue = [p];
    let qQueue = [q];

    while (pQueue.length || qQueue.length) {
        let pSize = pQueue.length;
        let qSize = qQueue.length;

        // if trees are identical, number of nodes at each level should be the same
        if (pSize !== qSize) {
            return false;
        }

        for (let i = 0; i < pSize; i++) {
            let pNode = pQueue.shift();
            let qNode = qQueue.shift();

            // values are not aligned, trees are not the same
            if (pNode.val !== qNode.val) {
                return false;
            }

            if (pNode.left && qNode.left) {
                // both trees have left node, add to queues
                pQueue.push(pNode.left);
                qQueue.push(qNode.left);
            } else if (pNode.left || qNode.left) {
                // only one of the trees has a left node, not identical
                return false;
            }

            if (pNode.right && qNode.right) {
                // both trees have right node, add to queues
                pQueue.push(pNode.right);
                qQueue.push(qNode.right);
            } else if (pNode.right || qNode.right) {
                // only one of the trees has a right node, not identical
                return false;
            }
        }
    }

    return true;

    // 0 ms / beats 100%
    // pretty happy with this solution, arrived at it very quickly
        // albeit because I am using the same algorithm as the past couple of days
        // but this is modified to need some additional checks
    // my solution is probably a little verbose, I imagine there are more clean ways to do this
        // need to not fall into the trap of doing what I'm familiar with
        // TODO: maybe a DFS / following a single node would be sufficient?
        // TODO: maybe a recursive solution would be more appropriate?
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