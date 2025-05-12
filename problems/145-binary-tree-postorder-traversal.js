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

    // seems like the simplest approach would be to visit in the opposite order, then reverse the result
        // root node -> right subtree -> left subtree

    const postorder = [];
    const nodeStack = [root];

    while(nodeStack.length) {
        const node = nodeStack.pop();
        // push current node to postorder result
        postorder.push(node.val);

        // because we're using a stack, push left before right
            // this means right will be traversed before left (FILO)
        if (node.left) {
            nodeStack.push(node.left);
        }

        if (node.right) {
            nodeStack.push(node.right);
        }
    }

    return postorder.reverse();

    // 0 ms / beats 100%
    // this was also pretty simple, just a slight variant on DFS approaches I have done before
    // I think reversing at the end makes more sense than Array.shift() to the front

    // NOTE: looking now, other solutions are doing this *without* reversing - but I don't see a constraint/suggestion against using it?
        // perhaps the question has changed over the years
};

var postorderTraversalRecursive = function(root) {
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