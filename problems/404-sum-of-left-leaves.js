// https://leetcode.com/problems/sum-of-left-leaves/
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
 * @return {number}
 */
var sumOfLeftLeavesBFS = function(root) {
    // firstly we know to return 0 if there are no leaf nodes on root
    if (!root.left && !root.right) {
        return 0;
    }

    let sum = 0;
    let queue = [root];

    // in a previous problem I just did a breadth-first search using a queue
    // so lets try that
    while (queue.length) {
        let node = queue.shift();

        if (node.left) {
            queue.push(node.left);

            // TODO: I read the question wrong, it's only the LEAF nodes that get summed
                // so I just need to check if it has any child nodes
            if (!node.left.left && !node.left.right) {
                sum += node.left.val;
            }
        }

        if (node.right) {
            queue.push(node.right);
        }
    }

    return sum;
};

var sumOfLeftLeavesDFS = function(root) {
    if (!root.left && !root.right) {
        return 0;
    }

    // this was an easy one, so I want to try a depth-first search instead
    // let's try with a stack
    let sum = 0;
    let stack = [root];

    while (stack.length) {
        let node = stack.pop();

        if (node.right) {
            stack.push(node.right);
        }

        if (node.left) {
            stack.push(node.left);

            if (!node.left.left && !node.left.right) {
                sum += node.left.val;
            }
        }
    }

    return sum;
}

var sumOfLeftLeavesDFSRecursive = function(root) {
    if (!root.left && !root.right) {
        return 0;
    }

    // that was also easy, so let's try DFS with recursion
    function searchNode(node, isLeft = false) {
        // search child nodes
        if (node.left) {
            searchNode(node.left, true);
        }

        if (node.right) {
            searchNode(node.right, false);
        }

        // increase sum if left leaf
        if (!node.left && !node.right && isLeft) {
            sum += node.val;
        }

        return;
    }

    let sum = 0;
    searchNode(root);

    return sum;
}

var sumOfLeftLeaves = function(root) {
    if (!root.left && !root.right) {
        return 0;
    }

    // my recursive method seemed off, so I checked the "standard" solution:

    // that was also easy, so let's try DFS with recursion
    function searchNode(node, isLeft = false) {
        // null/non-existent node passed
        if (!node) {
            return 0;
        }

        // check if left leaf node
        if (!node.left && !node.right && isLeft) {
            return node.val;
        }

        // recursively search child nodes
        return searchNode(node.left, true) + searchNode(node.right);
    }

    return searchNode(root);
}

// leetle for today is "Sum of Leaf Values", which doesn't seem to have a corresponding problem in leetcode
// so this seems to be the best place to put this, as it's essentially the same but summing *all* leaf nodes
// (instead of just the left ones)
var sumOfAllLeaves = function(root) {
    // DFS approach as we only care about the deepest nodes
    let stack = [root];
    let sum = 0;

    while (stack.length) {
        let node = stack.pop();

        if (!node.left && !node.right) {
            // leaf node
            sum += node.val;
            continue;
        }

        if (node.right) {
            stack.push(node.right);
        }

        if (node.left) {
            stack.push(node.left);
        }
    }

    return sum;
}

var sumOfAllLeavesRecursive = function(root) {
    // recursive function
    function searchForLeafNodes(node) {
        // parent node may not have had *both* a left and right node
        // handle possible null value
        if (!node) {
            return 0;
        }

        if (!node.left && !node.right) {
            // leaf node
            return node.val;
        }

        // not leaf, continue searching
        return searchForLeafNodes(node.left) + searchForLeafNodes(node.right);
    }

    return searchForLeafNodes(root);
}