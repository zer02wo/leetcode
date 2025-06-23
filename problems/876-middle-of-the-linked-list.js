// https://leetcode.com/problems/middle-of-the-linked-list/
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
var middleNode = function(head) {
    // fast-slow pointers
    let slow = head;
    let fast = head;

    // from examples in notes,
    // this seems like the appropriate condition for odd & even length
    while (fast && fast.next) {
        // move slow node by 1
        slow = slow.next;
        // move fast node by 2
        fast = fast.next.next;
    }

    // when fast node has reached end, slow node is at middle
    return slow;

    // 0 ms / beats 100%
    // O(n) time complexity, O(1) space complexity
        // single iteration
    // got this really quick because of doing another fast-slow pointer linked-list question the other day
};

// given head of linked list, return the middle node
    // if there are two middle nodes, return the *second* middle node

// EXAMPLE: head = [1,2,3,4,5]
// OUTPUT: [3,4,5]
    // 3 is the middle node of the list

// EXAMPLE: head = [1,2,3,4,5,6]
// OUTPUT: [4,5,6]
    // 3 is the first middle node of the list
    // 4 is the second middle node of the list, return this one

// first thoughts:
// "brute force" approach:
    // iterate through entire list to find list length
    // iterate again with half of length
// fast-slow pointers approach:
    // slow pointer moves 1 node per iteration
    // fast pointer moves 2 nodes per iteration
        // when fast pointer is at end, slow pointer is at middle

// EXAMPLE: head = [1,2,3,4,5]
// slow = 1,2,3
// fast = 1,3,5
    // returning slow gives mid node 3

// EXAMPLE: head = [1,2,3,4,5,6]
// slow = 1,2,3,4
// fast = 1,3,5,null
    // returning slow gives second mid node 4

// ^ from above seems like a while loop for fast.next is appropriate condition