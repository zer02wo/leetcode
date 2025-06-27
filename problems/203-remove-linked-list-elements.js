// https://leetcode.com/problems/remove-linked-list-elements/
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    let node = head;
    let prev = null;

    while (node) {
        // standard iteration
        if (node.val !== val) {
            prev = node;
            node = node.next;
            continue;
        }

        // node.val === val, we need to remove a node
        if (prev) {
            // remove current node from list
            prev.next = node.next;
            node.next = null;

            // iterate to new next node in list (prev remains the same)
            node = prev.next;
        } else { // no previous node means we need to update the head node
            // update new head node
            head = node.next;
            // remove current node from list
            node.next = null;
            // iterate to new head node
            node = head;
        }
    }

    return head;

    // 0 ms / beats 100%
    // O(n) time complexity, O(1) space complexity
    // relatively happy with this one
        // TODO: this logic maybe seems overly complicated, refactor?
    // wasn't able to put it into words particularly well
        // but got to a working answer pretty quickly when I started implementing
};

// given head of a linked list and an integer val,
// remove all the nodes of the linked list where Node.val === val
    // return the new head

// EXAMPLE: 1 > 2 > 6 > 3 > 4 > 5 > 6, val = 6
// OUTPUT: 1 > 2 > 3 > 4 > 5

// EXAMPLE: 7 > 7 > 7 > 7, val = 7
// OUTPUT: null/[]

// constraints:
    // number of nodes in range [0,10^4]
    // 1 <= Node.val <= 50
    // 0 <= val <= 50

// intuition: we need to make the comparison from the previous node
    // check Node.next.val === val
    // then replace Node.next with Node.next.next to remove the matching node from the list
// the head node will need some additional consideration, because it needs to be returned
    // and there is no previous node to check it from
    // do we need to keep a 'prev' variable to keep track of the previous node and compare from here instead?
        // TODO: I think this is probably the better approach to take

// walkthrough: 1 > 2 > 6 > 3 > 6, val = 6
//  p     n
// null | 1 > 2 > 6 > 3 > 6 > null
// p   n
// 1 > 2 > 6 > 3 > 6 > null
//     p   n
// 1 > 2 > 6 > 3 > 6 > null
    // link   2 > 3     (skip over node with matching val)
    // unlink 6 > null  (unlink node from linked list)
//     p   n
// 1 > 2 > 3 > 6 > null
//         p   n
// 1 > 2 > 3 > 6 > null
    // link   3 > null (skip over node with matching val)
//         p    n
// 1 > 2 > 3 > null
    // return head (1 > 2 > 3)

// walkthrough: 7 > 7 > 7, val = 7
//  p     n
// null | 7 > 7 > 7 > null
    // set head = node.next
    // unlink 7 (head) > null
//  p     n
// null | 7 > 7 > null
    // set head = node.next
    // unlink 7 (head) > null
//  p     n
// null | 7 > null
    // set head = node.next
    // unlink 7 (head) > null
// p    | n
// null | null
    // return head (null)