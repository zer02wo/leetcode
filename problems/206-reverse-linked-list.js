// https://leetcode.com/problems/reverse-linked-list/
// tags: easy, linked list

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // keep track of previous node for reversing link
    let prev = null;
    // current node pointer
    let node = head;
    // keep track of next node for iteration
    let next = null;

    while (node) {
        // get next node in linked list
        next = node.next;

        // point current node to previous node
            // i.e. reverse link direction
        node.next = prev;

        // current node is now previous node
        prev = node;
        // next node is now current node
        node = next;
    }

    return prev;

    // 0 ms / beats 100%
    // O(n) time complexity, O(1) space complexity

    // TODO: problem suggests a recursive solution as well
};

// given head of singly linked list, reverse the list & return it

// EXAMPLE: 1 > 2 > 3 > 4 > 5
// OUTPUT: 5 > 4 > 3 > 2 > 1

// constraints:
    // number of nodes in range [0,5000]
    // -5000 <= Node.val <= 5000

// first thought: keep reference to previous node and override the Node.next pointer with the current node
    // but we also need to keep reference to the current next node before we modify it, to continue iterating through list

// EXAMPLE: p = prev, c = current, n = next

//  p     c   n
// null | 1 > 2 > 3 > 4 > null

//        p   c   n
// null < 1 | 2 > 3 > 4 > null

//            p   c   n
// null < 1 < 2 | 3 > 4 > null

//                p   c    n
// null < 1 < 2 < 3 | 4 > null

//                    p   c/n
// null < 1 < 2 < 3 < 4 | null

// we need a while loop to stop after current node is set to null
    // then return prev