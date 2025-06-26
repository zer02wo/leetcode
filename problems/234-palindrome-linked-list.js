// https://leetcode.com/problems/palindrome-linked-list/
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
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // O(1) constant memory solution
    let slow = head;
    let fast = head;

    while (fast) {
        // move slow pointer 1 node per iteration
        slow = slow.next;
        // move fast pointer 2 nodes per iteration
        fast = fast.next.next;
    }

    // when fast node reaches the end, the slow node will be at the midpoint
    let mid = slow;

    // reverse the second half of the linked list
    let prev = null;
    let node = slow;
    let next = null;

    while (node) {
        // get next node in list
        next = node.next;

        // point current node to prev node (reverse connection)
        node.next = prev;

        // iterate through nodes
        prev = node;
        node = next;
    }

    // prev node now points to the head of the reversed second half
    let halfHead = prev;

    // iterate from head > mid and reversedHead > null
    while (head !== mid && halfHead) {
        if (head.val !== halfHead.val) {
            return false;
        }

        head = head.next;
        halfHead = halfHead.next;
    }

    return true;

    // TODO: fails for test case: head = [1]
};

var isPalindromeAdditionalMemory = function(head) {
    // store linked list values in array
    let sequence = [];

    while (head) {
        sequence.push(head.val);
        // iterate to next node
        head = head.next;
    }

    // two pointers to check array is palindrome
    let end = sequence.length - 1;

    for (let start = 0; start < end; start++) {
        // check left/start pointer matches right/end pointer
        if (sequence[start] !== sequence[end]) {
            return false;
        }

        // decrement end pointer
        end--;
    }

    return true;

    // 13 ms / beats 34.74%
    // "brute force" solution
};

// given head of singly linked list, return true if it is a palindrome, else false
    // i.e. the sequence of values is the same forwards as it is backwards

// EXAMPLE: 1 > 2 > 2 > 1
// OUTPUT: true

// EXAMPLE: 1 > 2
// OUTPUT: false

// constraints:
    // number of nodes in the range [1,10^5]
    // 0 <= Node.val <= 9

// doing this with additional O(n) space would be pretty trivial:
    // iterate through the linked list
        // push every value to a new strucutre (e.g. Array or String)
    // reverse the array or use two pointers on the array to check if palindrome
// TODO: let's start with this

// doing this with constant O(1) space is more complex:
    // we can't use a second pointer in the opposite direction,
        // because the list only goes one way
        // and we don't know where the tail is without first going all the way through
    // reversing the original linked list would technically only need a variable of the new head node
        // but this still has O(n) nodes
// could we reverse only the second half of the linked list?
    // if we use fast/slow pointers:
        // when the fast pointer reaches the end,
        // the slow pointer will be at the midpoint
    // then from the midpoint, reverse the second half of the list
        // then we iterate from start -> mid and mid -> end simultaneously
            // return false if nodes do not match

// FIND MIDPOINT:
// sf
// 1 > 2 > 2 > 1 > null
//     s   f
// 1 > 2 > 2 > 1 > null
//         s        f
// 1 > 2 > 2 > 1 > null

// REVERSE SECOND HALF
//         m   n
// 1 > 2 > 2 > 1 > null
//         m          n
// 1 > 2 > 2 > null | 1 > null
//         m
// 1 > 2 > 2 > null
//     1 -/
//     n