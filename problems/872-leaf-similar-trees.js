// https://leetcode.com/problems/leaf-similar-trees/
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    // we are interested in the pattern of the *leaf* nodes from left to right
        // as we're only interested in leaf nodes a DFS approach is my first intuition
        // second example also tells us that they must have the same order (e.g. 3 -> 2, is not "leafSimilar" to 2 -> 3)
    // the most straightforward method would be to gather all the leaf nodes, then compare if they have the same sequence
        // but ideally there would be a way to compare both at the same time?

    const leafList1 = [];
    const stack1 = [root1];

    while (stack1.length) {
        const node = stack1.pop();

        // leaf node when has no child (left or right) nodes
        if (!node.left && !node.right) {
            leafList1.push(node.val);
        }

        // order matters - right before left as we're using a stack
        if (node.right) {
            stack1.push(node.right);
        }

        if (node.left) {
            stack1.push(node.left);
        }
    }

    let leafIndex = 0;
    const stack2 = [root2];

    // perform same stack operation as previous loop
        // some duplicate code but lets us early return rather than having to calculate all leaf nodes
    while (stack2.length) {
        const node = stack2.pop();

        if (!node.left && !node.right) {
            // check if the current leaf node matches the expected leaf pattern from root1
            if (leafList1[leafIndex] !== node.val) {
                return false;
            }

            // increment pointer for next comparison
            leafIndex++;
        }

        if (node.right) {
            stack2.push(node.right);
        }

        if (node.left) {
            stack2.push(node.left);
        }
    }

    // if index does not match length, there is a differing amount of nodes
    if (leafList1.length !== leafIndex) {
        return false;
    }

    // no differences found
    return true;

    // 0ms / beats 100%
    // pretty happy with this solution, probably a bit long/verbose compared to other people
        // but it's readable
    // may also be enough to calculate the leaves for all nodes and only do comparisons at the end
        // (which would allow reusing the code to generate the leafLists)
        // but this seems like a nice optimisation to have
};


var leafSimilarHelperFunction = function(root1, root2) {
    // as mentioned above, using a helper function to generate node list
        // want to see if my early checking optimisation makes a difference

    // could also be done using recursion instead of a loop
        // benefit of being able to swap out the function
    function getLeafList(node) {
        const stack = [node];
        const leafList = [];

        while (stack.length) {
            const node = stack.pop();

            // leaf node
            if (!node.left && !node.right) {
                leafList.push(node.val);
            }

            // assign right before left for correct order with FIFO
            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }
        }

        return leafList;
    }

    const leafList1 = getLeafList(root1);
    const leafList2 = getLeafList(root2);

    // only similar if same length
    if (leafList1.length !== leafList2.length) {
        return false;
    }

    // check each index has same value
    for (let i = 0; i < leafList1.length; i++) {
        if (leafList1[i] !== leafList2[i]) {
            return false;
        }
    }

    // no differences in leaf sequence
    return true;

    // 1ms / beats 34.79% on first submission
    // 0ms / beats 100% on second submission (to confirm it wasn't just variance)
    // so at least for these test cases, my optimisation probably wasn't necessary
        // (perhaps this would matter for more than 200 nodes)
}
