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
    // can't have cycles if there is no list
    if (!head) {
        return false;
    }

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

    // 54 ms / beats 47.37%
};

// given head of singly linked list, determine if the linked list has a cycle in it
    // true if cycles, otherwise false
// cycle defined by:
    // some node in the list that can be reached again by continuously following the next pointer
// internally this problem uses a `pos` variable to denote the index of the node that the tail points to
    // this is not a parameter

// EXAMPLE: 3 > 2 > 0 -4 -¬
//              ^---------|
    // here we see that the tail links back to an existing node,
    // internally pos = 1 (2nd node)

// constraints:
    // number of nodes  in range [0, 10^4]
        // i.e. *will* need to check for empty linked list
    // -10^5 <= Node.val <= 10^5
    // pos is -1 or valid index in the linked list
        // i.e. either no cycle or valid cycle in linked list

// this seems pretty trivial to do using O(n) space complexity,
// just by creating a Set of nodes and checking if one is repeated
    // let's start with this for now

// TODO: question asks for a solution using constant O(1) memory