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
var mergeTreesAlt = function(root1, root2) {
    // either node null
    // also handles when both null
    if (!root1 || !root2) {
        // return other node
        return root1 || root2;
    }

    // nodes present from both trees, use tree1 as merge
    // "merge" (sum) values from both trees
    root1.val += root2.val;

    // recursively merge children nodes
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);

    return root1;

    // 1 ms / beats 66.67% (first run)
    // 1 ms / beats 66.67% (second run)
    // O(n) time complexity - total number of nodes in merged tree
    // O(h) space complexity - call stack equal to height of the larger tree

    // this solution would be more concise (without my comments)
        // but I do like the explicit/verbose way each case is handled in the previous one
};

var mergeTrees = function(root1, root2) {
    // both nodes null
    if (!root1 && !root2) {
        return null;
    }

    // handle if either node is null
    const mergedNode = root1 || root2;

    // nodes present from both trees
    if (root1 && root2) {
        // "merge" (sum) values from both trees
        mergedNode.val = root1.val + root2.val;
    }

    // recursively merge children nodes
        // optional chaining to handle null nodes
    mergedNode.left = mergeTrees(root1?.left, root2?.left);
    mergedNode.right = mergeTrees(root1?.right, root2?.right);

    return mergedNode;

    // 3 ms / beats 13.12% (first run)
    // 1 ms / beats 66.67% (second run)
    // O(n) time complexity - total number of nodes in merged tree
    // O(h) space complexity - call stack equal to height of the larger tree

    // really happy with getting to this solution as quickly/efficiently as I did
        // recursive binary trees actually felt intuitive after previous days questions
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
// an iterative solution would be possible, probably BFS with a queue for each tree?
    // or a modified queue with subarray of nodes from each tree

// cases:
    // both nodes are null
        // return null
    // either node is null
        // return the NOT null node
    // both nodes NOT null
        // sum the values on either node and return it