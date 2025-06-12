// https://leetcode.com/problems/intersection-of-two-linked-lists/
// tags: easy, linked list

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    const nodeSet = new Set();

    // add all nodes from listA to Set
    let nodeA = headA;
    while (nodeA) {
        // do not need to check for existing nodes,
        // as otherwise we would have a looping list
        nodeSet.add(nodeA);
        // incremement to next node
        nodeA = nodeA.next;
    }

    // check every node in listA if it existed in listB
    let nodeB = headB;
    while (nodeB) {
        // node already seen in listA, this is the intersection
        if (nodeSet.has(nodeB)) {
            return nodeB;
        }

        // increment to next node
        nodeB = nodeB.next;
    }

    // intersection not found
    return null;

    // 52 ms / beats 81.61%
    // O(n + m) time complexity, O(n) space complexity
    // TODO: how to achieve this with constant O(1) space?
};

// given heads of two singly linked lists (A & B)
    // return the node at which the two lists intersect
    // return null if they have no intersection

// EXAMPLE: listA = 4>1>8>4>5, listB =  5>6>1>8>4>5
// OUTPUT: node {8}
    //     4 > 1 \
    //           {8} > 4 > 5
    // 5 > 6 > 1 /
// IMPORTANT: Note here that despite having the same value at `1`,
    // they are not referencing the same node, so it is not an intersection

// EXAMPLE: listA = 2>6>4, listB = 1>5
// OUTPUT: null
    // 2 > 6 > 4
    //     1 > 5

// constraints:
    // `m` nodes in listA, `n` nodes in listB
        // i.e. can be different lengths
    // 1 <= m, n <= 3 * 10^4
        // i.e. no empty lists
    // 1 <= Node.val <= 10^5
        // i.e. positive integer greater than 0
        // can be duplicate values


// we will need two pointers to traverse both lists, but there are some problems:
    // if there can be duplicate values,
        // how can we check if both lists are referencing the same node?
    // if there can be different length of "skip" nodes (i.e. nodes before the intersection),
        // how can we make sure to align both lists around the intersection?

// we know an intersection occurs if the last node in both lists are the same
    // i.e. they never diverge after intersecting
// this would align the pointers, but we can't traverse backwards from this point

// the question suggests an O(n + m) time complexity and O(1) solution is possible
    // but for now, lets use extra memory and create a similar solution to question #349 (intersection of two arrays)
    // I'm assuming a Set can still be used to compare nodes by reference, as we cannot use it to compare their (potentially duplicate) values