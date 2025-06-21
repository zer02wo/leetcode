// https://leetcode.com/problems/linked-list-cycle/
// tags: easy, linked list

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // keep reference to all the nodes we've seen
    const nodeSet = new Set();
    // pointer for current node
    let node = head;

    while (node.next) {
        // we've seen this node before, there is a cycle
        if (nodeSet.has(node)) {
            return true;
        }

        // add node to Set
        nodeSet.add(node);
        // progress to next node
        node = node.next;
    }

    return false;

    // TODO: fails for test case: head = []
};

// given head of singly linked list, determine if the linked list has a cycle in it
    // true if cycles, otherwise false
// cycle defined by:
    // some node in the list that can be reached again by continuously following the next pointer
// internally this problem uses a `pos` variable to denote the index of the node that the tail points to
    // this is not a parameter


// this seems pretty trivial to do using O(n) space complexity,
// just by creating a Set of nodes and checking if one is repeated
    // let's start with this for now

// TODO: question asks for a solution using constant O(1) memory