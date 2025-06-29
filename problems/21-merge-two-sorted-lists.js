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
        // TODO: do I need to do a separate null and set to Infinity or something?
        if (list1?.val <= list2?.val) {
            // merge node from list1 into new list
            mergedNode.next = list1;
            // iterate in list1
            list1 = list1.next;
        } else {
            // merge node from list2 into new list
            mergedNode.next = list2;
            list2 = list2.next;
        }

        // iterate through merged list
        mergedNode = mergedNode.next;
    }

    return dummy.next;

    // TODO: fails for following test case:
        // list1 = [1], list2 = []
        // need to improve null checking as already theorised above
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