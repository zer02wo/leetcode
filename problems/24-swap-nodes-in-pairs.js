// https://leetcode.com/problems/swap-nodes-in-pairs/
// tags: medium, leetle

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
var swapPairs = function(head) {

};

// Start: 1 -> 2 -> 3 -> 4
// Goal: 2 -> 1 -> 4 -> 3

// if we swap 1 with 2, we lose the connection to nodes 3 & 4
// if we update the link of 1 -> 3, we then lose this when swapping 3 & 4, because 1 needs to link to 4

// we need to swap in pairs
    // keep reference to the next pair - so the link doesn't break
    // keep reference to the previous pair - to update the previous link to the new head of the pair


// Example flow:
// Divide list into pairs:                  [1 -> 2] -> [3 -> 4]
// Swap the current pair (breaks link):     [2 -> 1] xx [3 -> 4]
// Point current pair tail to next pair:    [2 -> 1] -> [3 -> 4]
// Go to the next pair, and swap:           [2 -> 1] xx [4 -> 3]
// Point prev pair tail to next pair head:  [2 -> 1] -> [4 -> 3]
// If there were another pair, keep swapping in the same way
    // Only special case is the first pair, as there is no previous link that needs to be updated