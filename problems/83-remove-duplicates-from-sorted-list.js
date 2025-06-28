// https://leetcode.com/problems/remove-duplicates-from-sorted-list/
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
var deleteDuplicates = function(head) {
    let prevNode = null;
    let node = head;

    while (node) {
        if (node.val === prevNode?.val) {
            // remove current node from list, it's a duplicate
            prevNode.next = node.next;
            node = prevNode.next;
        } else {
            // iterate through list
            prevNode = node;
            node = node.next;
        }
    }

    return head;

    // O(n) time complexity, O(1) space complexity
    // very similar to leetcode #203 which I did yesterday,
    // so it was easy to arrive at a solution
        // TODO: are there any alternative solutions?
};

// given head of sorted linked list, delete all duplicates
    // i.e. each element only appears once
// linked list must be returned sorted

// EXAMPLE: 1 > 1 > 2 > 3 > 3
// OUTPUT: 1 > 2 > 3

// constraints:
    // number of nodes in range [0,300]
    // -100 <= Node.val <= 100
    // list is guaranteed to be sorted in ascending order
        // i.e. do not need to worry about sorting

// intuition: given that the list is sorted we can keep a reference to the previous num
    // i.e. if the previous num appears again, remove the duplicate
    // i.e. if the previous num is new, set it as the previous num
// this means that we don't need O(n) memory like a Set, just O(1) memory for the prev node
// we don't need to worry about removing the head node (i.e. unlike leetcode #203)
    // because if there is a duplicate of the head node, we can remove the node after it
