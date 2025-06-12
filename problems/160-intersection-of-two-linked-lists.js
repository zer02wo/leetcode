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
var getIntersectionNodeConstantSpace = function(headA, headB) {
    // the only space we need:
        // lengthA
        // lengthB
        // nodeA
        // nodeB
        // lengthOffset

    let nodeA = headA;
    // init to 1 for head node
    let lengthA = 1;

    // iterate through nodes in listA to end
    while (nodeA && nodeA.next) {
        // increase list length by node
        lengthA++;
        // increment to next node
            // this will be the last node after iteration complete
        nodeA = nodeA.next;
    }

    let nodeB = headB;
    // init to 1 for head node
    let lengthB = 1;

    // iterate through nodes in listB to end
    while (nodeB && nodeB.next) {
        // increase list length by node
        lengthB++;
        // increment to next node
            // this will be last node after iteration complete
        nodeB = nodeB.next;
    }

    // last nodes must be the same for an intersection to occur
    if (nodeA !== nodeB) {
        return null;
    }

    let lengthOffset = Math.abs(lengthA - lengthB);
    // reset nodes to head
    nodeA = headA;
    nodeB = headB;

    // offset longer list by difference in length
    if (lengthA > lengthB) {
        let count = 0;
        while (count < lengthOffset) {
            nodeA = nodeA.next;
            count++;
        }
    } else {
        let count = 0;
        while (count < lengthOffset) {
            nodeB = nodeB.next;
            count++;
        }
    }

    // nodeA & nodeB are now aligned towards intersection
    while (nodeA && nodeB) {
        // nodes are equal, intersection!
        if (nodeA === nodeB) {
            return nodeA;
        }

        // continue to next node
        nodeA = nodeA.next;
        nodeB = nodeB.next;
    }

    return null;

    // 68 ms / beats 18.11
    // obviously slower than the other solution as we need to:
        // iterate listA
        // iterate listB
        // iterate listA & listB simulatenously
    // set solution below was a single iteration
}

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

// implementing constant O(1) space complexity (after some hints):
    // if we know the length of both lists, we can offset the length of the smaller list to align the pointers
        // iterate through listA to get the tail node (informs us the length)
        // iterate through listB to get the tail node (informs us the length)
    // if tailA !== tailB, no intersection

    // calculate the offset (difference in length) and apply x amount of imaginary head nodes to the shorter list,
    // e.g. for a difference in length of 2
        // [x1] > [x2] > 4 > 1 \
        //                      {8} > 4 > 5
        //   3  >   5  > 6 > 1 /
    // in practice we can simply start the pointer of the second list by the offset x nodes,
    // e.g. for a difference in length of 2
        //         [4] > 1 \
        //                 {8} > 4 > 5
        // 3 > 5 > [6] > 1 /
        // listA starts at [4]
        // listB starts at [6] (2 nodes after its actual start)
    // then the pointers are aligned, so compare the nodes