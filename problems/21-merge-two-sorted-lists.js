// https://leetcode.com/problems/merge-two-sorted-lists/
// tags: easy, linked list

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // dummy node to start new merged list
    let dummy = new ListNode(0, null);
    let mergedNode = dummy;

    while (list1 || list2) {
        // set value to infinity if there are no nodes left in list
        const val1 = list1?.val ?? Infinity;
        const val2 = list2?.val ?? Infinity;

        if (val1 <= val2) {
            // merge node from list1 into new list
            mergedNode.next = list1;
            // iterate in list1
            list1 = list1.next;
        } else {
            // merge node from list2 into new list
            mergedNode.next = list2;
            // iterate in list2
            list2 = list2.next;
        }

        // iterate through merged list
        mergedNode = mergedNode.next;
    }

    return dummy.next;

    // 0 ms / beats 100%
    // O(m+n) time complexity, O(1) space complexity
    // very nice question after the recent linked list questions I've been doing,
    // probably not *perfectly* optimal but I got here quickly and it's 0 ms runtime

    // TODO: what about a recursive solution?
};

// given heads of two *sorted* linked lists, merge the two lists into one sorted list
    // i.e. splice together nodes of the two list and return the head of the merged list

// EXAMPLE: list1 = 1 > 2 > 4, list2 = 1 > 3 > 4
// OUTPUT: 1 > 1 > 2 > 3 > 4

// general pattern:
    // two pointers, one at each list
    // compare pointer values, merge lower value node into new list

// complications will be ensuring we can still iterate through the two lists,
    // i.e. without creating a break/loop
// there's technically no constraint *against* reconstructing the nodes,
    // but this feels against the spirit of the question
// a dummy node may also help with constructing the merged list