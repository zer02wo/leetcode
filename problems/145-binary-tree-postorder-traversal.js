// https://leetcode.com/problems/binary-tree-postorder-traversal/
// tags: easy, leetle

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
var postorderTraversal = function(root) {
    // handle empty case
    if (!root) {
        return [];
    }

    const postorder = [];

    // recursive dfs to begin
    function traverseNodes(node) {
        if (node.left) {
            traverseNodes(node.left);
        }

        if (node.right) {
            traverseNodes(node.right);
        }

        postorder.push(node.val);
    }

    traverseNodes(root);

    return postorder;

    // 0 ms / beats 100%
    // I think I overcomplicated this in my head, but it didn't take very long still
    // TODO: the description states: "Recursive solution is trivial, could you do it iteratively?"
        // So let's try it
};

// I'm unfamiliar with the term 'postorder traversal', so here is the definition (as it isn't provided within the description):
    // "Postorder traversal is a tree traversal method that follows the Left-Right-Root order:
    // - The left subtree is visited first.
    // - The right subtree is visited next.
    // - The root node is processed last."
// So this definitely seems like the order a depth-first search processes nodes
    // But the leaf nodes are visited after branch nodes, so recording them before might be tricky
    // One possible solution would be to do it in 3 parts (i.e. as in the definition above), then merge into a single array in the correct (reversed) order
    // alternatively doing it recursively would probably be pretty easy