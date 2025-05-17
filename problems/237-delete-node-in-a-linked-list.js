// https://leetcode.com/problems/delete-node-in-a-linked-list/
// tags: medium, leetle

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    // set current node value to next value
    node.val = node.next.val;
    // remove next node, as it is now effectively the current node
    node.next = node.next.next;

    // TODO: I massively overcomplicated my first solution
        // we may not have been able to skip linking the node we wanted to delete
        // but we can do it for the node we overwrite instead

    // 53 ms / beats 43.49% (first run)
    // 42 ms / beats 91.80% (second run)
    // O(1) solution - only modifies/accesses the current, next and next-next nodes

    // funny comment within the leetcode discussion:
    // https://leetcode.com/problems/delete-node-in-a-linked-list/description/comments/1643550/
}

var deleteNodeIterative = function(node) {
    // we have to modify the original node as in-place
    while (node && node.next) {
        // set next node value to be this node's value
        let nextVal = node.next.val;
        node.val = nextVal;

        // set 2nd last node as new tail node
        if (!node.next.next) {
            node.next = null;
        }

        // go to next node
        node = node.next;
    }

    // 55 ms / beats 32.17%
    // O(n) solution - we visit (almost) each node once (slightly less depending on start node position)
};

// given a singly linked list of nodes, delete the specified node
// IMPORTANT: you are not given access to the head of the list
    // this is really important as it would otherwise trivialise this problem
// IMPORTANT: all values in the linked list are *unique*
    // specified node is also guaranteed to be in the list and to not be the last node
        // this would also trivialise some test cases by allowing to null the value
// definition of "deleting a node" provided by leetcode:
    // The value of the given node should not exist in the linked list.
    // The number of nodes in the linked list should decrease by one.
    // All the values before node should be in the same order.
    // All the values after node should be in the same order.

// EXAMPLE: head = [4,5,1,9], node = 5
    // OUTPUT: [4,1,9]

// as we don't have reference to any previous nodes to update the pointer
// the only solution seems to be to:
    // set current node value to next node value
    // set new tail node to be (tail - 1)th node