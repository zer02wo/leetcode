// https://leetcode.com/problems/odd-even-linked-list/
// tags: medium, leetle, linked-list

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
var oddEvenList = function(head) {
    // no changes for a list of zero, one or two nodes
    if (!head || !head.next || !head.next.next) {
        return head;
    }

    let odd = head;
    let even = head.next;
    // keep reference to first even item to join later
    let evenHead = even;

    while (even && even.next) {
        // 'leapfrogging' back and forth between odd and even

        // link current odd to next odd
        odd.next = even.next;
        // update current odd pointer to be next odd in list
        odd = odd.next;

        // link current even to next even
        even.next = odd.next;
        // update current even pointer to be next even
        even = even.next;
    }

    // connect odd tail to even head
    odd.next = evenHead;

    // head node is never modified
    return head;

    // 0 ms / beats 100%

    // had to look up a solution to this one
        // didn't cross my mind that keeping a reference to the even head pointer would be O(1), not O(n)
    // by which point I had already seen the optimal solution, which is pretty tricky to follow without a diagram
        // especially how it handles pointing to null on its own so simply
};

// within a linked list, group all of the odd indicies together followed by grouping all of the even indicies together
    // +1 to typical array notation to get odd/even
        // i.e. item 0 = 1st element (odd), item 1 = 2nd element (even), etc.

// constraints:
    // must solve the problem with O(1) (additional) space complexity
    // must solve the problem in O(n) time complexity

// EXAMPLE: head = [1,2,3,4,5]
// OUTPUT: [1,3,5,2,4]
    // 1 = 1st, 3 = 3rd, 5 = 5th    (odds)
    // 2 = 2nd, 4 = 4th             (evens)

    // indexes at the end becomes: [0,2,4,1,3,5]

    // 1 > 2 > 3 > 4 > 5
    // 1 > 3 > 4 > 5 > 2
    // 1 > 3 > 5 > 2 > 4
        // is it just as simple as linking the even node to the end of the current tail?
        // can't do that because that would require iterating through all elements to get to the tail

    // if the constraint didn't require O(1) space complexity we could form two lists:
        // i.e. 1 > 3 > 5    &    2 > 4
    // then combine them at the end by pointing oddTail to evenHead
        // THIS WAS THE HOLD UP ^
        // technically by keeping reference to the head of the even list, that is only O(1) space complexity (i.e. a single element)
            // even if it recursively links to O(n) elements

// EXAMPLE: head = [1,2,3,4,5,6,7,8,9]
// OUTPUT: [1,3,5,7,9,2,4,6,8]
    // longer example to try identify a pattern
    // is it easier to go backwards??

    // indexes at the end becomes: [0,2,4,6,8,1,3,5,7]

