// https://leetcode.com/problems/diameter-of-binary-tree/
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
var diameterOfBinaryTree = function(root) {
    let diameter = 0;

    dfs(root);

    return diameter;

    function dfs(node) {
        if (!node) {
            return 0;
        }

        // recursively search left/right subtree for longest path
        const leftPath = dfs(node.left);
        const rightPath = dfs(node.right);

        // diameter = maxDepth(leftSubtree) + maxDepth(rightSubtree)
        diameter = Math.max(diameter, leftPath + rightPath);

        // maximum depth of subtrees + 1 for backtracking from current node
        return Math.max(leftPath, rightPath) + 1;
    }

    // 1 ms / beats 87.18%
    // O(n) time complexity, O(h) space complexity (h = height of tree)

    // great solution here: https://leetcode.com/problems/diameter-of-binary-tree/
        // includes great/visual explanation here: https://www.youtube.com/watch?v=Tu-9JVF0Mz0

    // definitely not an easy question
        // would've really struggled to get this without a hint
        // I had the initial logic/formula for the diameter,
        // but tried to early/over-optimise without a helper function
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
// the question does state the path "may not" route through the root node,
    // but I'm not provided an example where this isn't the case
    // maybe a situation where e.g. a child node in the left subtree has two deep subtrees
        // and no right subtree is provided from the root node