// https://leetcode.com/problems/binary-tree-paths/
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
 * @return {string[]}
 */
var binaryTreePathsArray = function(root) {
    const output = [];

    function createTreePath(node, pathArr) {
        // null node, nothing to add to path
        if (!node) {
            return;
        }

        // push current node to path
        pathArr.push(node.val);

        // leaf node
        if (!node.left && !node.right) {
            // push string path to output, joining elements by '->' link
            output.push(pathArr.join('->'));
            // no children to search
            return;
        }

        // recursively search child nodes - destructure array to clone/remove reference updates
            // i.e. pass path array by value
        createTreePath(node.left, [...pathArr]);
        createTreePath(node.right, [...pathArr]);
    }

    createTreePath(root, []);

    return output;

    // 1 ms / beats 20.97% (first run)
    // 1 ms / beats 20.97% (second run)
    // I'm sure the 1ms is just runtime variance

    // but this definitely does use more memory/doesn't seem worth it compared to string
        // i.e. we don't need to use those previous values for anything other than output
            // makes no sense to keep access to them in memory
        // especially when we need to clone the array to update by value instead of reference
            // does this make the space complexity O(n^2) ?
};

var binaryTreePathsString = function(root) {
    const output = [];

    function createTreePath(node, pathStr) {
        // null node, nothing to add to path
        if (!node) {
            return;
        }

        // if previous node in path, add '->' to link previous node
            // otherwise, first node in string so no link is added
        const strLink = (pathStr !== '') ? '->' : '';

        // update string path with current node
        pathStr += strLink + node.val;

        // leaf node
        if (!node.left && !node.right) {
            // push path to output
            output.push(pathStr);
            // no children to search
            return;
        }

        // recursively search child nodes
        createTreePath(node.left, pathStr);
        createTreePath(node.right, pathStr);
    }

    createTreePath(root, '');

    return output;

    // 0 ms / beats 100%
    // O(n) time complexity - recursively visits each node once
    // O(n) space complexity - output array & recursive call stack

    // very happy with how quickly I arrived at this solution
        // glad I'm considering recursion first when dealing with binary trees
        // iterative approach would've been much less intuitive I think
    // TODO: what if we used an array for the path instead of a string?
};

// given root of a binary tree
    // return all root-to-leaf paths in any order

// EXAMPLE:
//   1
//  / \
// 2   3
//  \
//   5
// OUTPUT ['1->2->5', '1->3']

// constraints:
    // number of nodes in tree is in the range [1, 100]
    // -100 <= Node.val <= 100

// initial approaches:
// 1. recursive DFS
    // create an output array to push paths
    // create a recursive helper function with two arguments:
        // string representation of previous nodes
        // current node
    // if current node not a leaf node
        // append current node value to string representation
        // recursively search children
    // if leaf node (or perhaps null "child" of leaf node would be better)
        // push string representation to array
    // return output array once all nodes traversed

// 2. iterative DFS (or BFS)
    // create a modified stack (or queue) to keep track of previous nodes along path
    // iterate through modified data structure and pop/shift elements as appropriate
        // update the relevant paths for the nodes
        // push to an output array when leaf node encountered
    // return output array once all nodes traversed

// option 1. seems much easier to implement, so lets start with that