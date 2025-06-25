// https://leetcode.com/problems/symmetric-tree/
// tags: easy, leetle, binary tree, BFS

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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    let queue = [root.left, root.right];

    while (queue.length) {
        let leftNode = queue.shift();
        let rightNode = queue.shift();

        // nothing to compare as both "nodes" are null
        if (!leftNode && !rightNode) {
            continue;
        }

        // check that left & right nodes are equal
            // optional chaining in case *either* of the nodes are null
            // i.e. this is equivalent to adding: || leftNode === null || rightNode === null
        if (leftNode?.val !== rightNode?.val) {
            return false;
        }

        // push "outer" node pairs
        queue.push(leftNode.left, rightNode.right);
        // push "inner" node pairs
        queue.push(leftNode.right, rightNode.left);
    }

    // no asymmetry detected
    return true;

    // 0 ms / beats 100%
    // O(n) time complexity, O(n) space complexity
    // needed a hint to get here quickly, but maybe should've spent more time thinking about it
        // we're allowed to break the "rules" of a BFS algorithm because we only care about symmetry
        // i.e. making assumptions that there are left & right nodes is fine, because this helps us identify the answer
};

var isSymmetricRecursive = function(root) {
    // recursive helper function
    function areNodesSymmetric(leftNode, rightNode) {
        // nothing to compare as both "nodes" are null
        if (!leftNode && !rightNode) {
            return true;
        }

        // check that left & right nodes are equal
            // optional chaining in case *either* of the nodes are null
            // i.e. this is equivalent to adding: || leftNode === null || rightNode === null
        if (leftNode?.val !== rightNode?.val) {
            return false;
        }

        return areNodesSymmetric(leftNode.left, rightNode.right) // outer pair
            && areNodesSymmetric(leftNode.right, rightNode.left);// inner pair
    }

    return areNodesSymmetric(root.left, root.right);

    // 0 ms / beats 100%
    // O(n) time complexity, O(n) space complexity
    // largely just copied from the iterative solution above
        // I typically tend to opt for iterative solutions first as they're more intuitive to me,
            // and also don't need to worry about call stack depth issues
        // but in this case it might have been easier to start with the recursive implementation
};

// given the root of a binary tree, check whether it is a mirror of itself

// EXAMPLE: root = [1,2,2,3,4,4,3]
//     1
//  2  |  2
// 3 4 | 4 3
// OUTPUT: true

// EXAMPLE: root = [1,2,2,null,3,null,3]
//     1
//  2     2
//   3     3
// OUTPUT: false
    // i.e. the pointers for 3 are not mirrored (right/left) they are both right leaf nodes

// constraints:
    // number of nodes in range [1,1000]
        // i.e. no null/empty tree check required
    // -100 <= Node.val <= 100

// intuition: this sounds a breadth-first-search (BFS) problem
    // as we need to compare the nodes at each depth
// but we typically create a queue of nodes to shift and compute individually
    // do we need to manage two data structures for the left/right side of the root node?
    // or alternatively we need to shift two nodes at a time (left/right) to review this
// we then need to make sure to push the nodes in pairs:
    // i.e. outer nodes & inner nodes
    // e.g. root = [1,2,2,3,4,4,3]
        //         1
        //    2    |    2
        // {3} [4] | [4] {3}
        // 5 6 7 8 | 8 7 6 5
    // outer nodes {3} are equal, inner nodes [4] are equal
        // we would then compare nodes [5,6] with [6,5]
        // and nodes [7,8] with [8,7]

// recursive solution:
    // similar to the iterative solution, we will need to check the left & right nodes each iteration
        // so the recursive helper function will have 2 nodes as the input
    // then make the same null/value comparisons
    // then recursively call the function with the outer & inner pairs respectively