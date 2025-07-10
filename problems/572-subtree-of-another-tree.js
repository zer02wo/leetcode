// https://leetcode.com/problems/subtree-of-another-tree/
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    // searched entire root tree
    if (!root) {
        return false;
    }

    // if not identical, recursively check subtrees of root for subRoot tree
    return isIdentical(root, subRoot)
        || isSubtree(root.left, subRoot)
        || isSubtree(root.right, subRoot);

    // 10 ms / beats 20.77% (first run)
    // 6 ms / beats 82.26% (second run)

    // I liked this question until it introduced duplicates
    // needing to define a second recursive helper function outside the initial recursive function was unintuitive
        // maybe I'm just used to solving problems within the confines of the provided skeleton function
};
function isIdentical(root, subRoot) {
    // base / leaf node case
    if (!root && !subRoot) {
        return true;
    } else if (!root || !subRoot) {
        // either node is null, not equal/subtree
        return false;
    }

    // if root nodes are identical, recursively compare subtrees
    return root.val === subRoot.val
        && isIdentical(root.left, subRoot.left)
        && isIdentical(root.right, subRoot.right);
};

// given roots of two binary trees (root and subRoot)
    // return true if there is a subtree of root with the same structure/node values of subRoot
        // return false otherwise
    // subtree: a tree consistent of descendant nodes within a tree
        // a tree could be considered a subtree of itself

// EXAMPLE:
//   root
//     3
//    / \   subRoot
//   4   5     4
//  / \       / \
// 1   2     1   2
// OUTPUT: true
    // subRoot can be seen within the left subtree of the root tree/node

// intuition: as we're dealing with a recursive structure,
// and expect the subRoot to be within the root
// a recursive DFS approach seems to make the most sense

// the general recursive step is:
    // check root nodes are equal
        // isEqual(root, subRoot)
    // recursively check left subtree is equal
        // i.e. isEqual(root.left, subRoot.left)
    // recursively check right subtree is equal
        // i.e. isEqual(root.right, subRoot.right)
// we will need additional logic to start comparing with the child node as the new subRoot
    // e.g. for the example above root [3] !== subRoot [4]
        // but root.left [4] === subRoot [4]