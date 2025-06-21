// https://leetcode.com/problems/linked-list-cycle/
// tags: easy, linked list, set, fast-slow pointers

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycleFastSlowPointers= function(head) {
    // can't have cycles if there is no list
    if (!head) {
        return false;
    }

    // fast-slow pointers algorithm
    // constant O(1) memory only need two pointers
    let slow = head;
    let fast = head;

    // if the fast node reaches null,
        // that means there is no cycle
        // so we don't need to consider the slow node condition
    while (fast.next && fast.next.next) {
        // move slow pointer by 1 node
        slow = slow.next;
        // move fast pointer by 2 nodes
        fast = fast.next.next;

        // if the pointers eventually meet
        if (slow === fast) {
            // there is a cycle
            return true;
        }
    }

    return false;

    // 51 ms / beats 64.68%
    // needed a hint to get this answer
        // I do wonder where else this algorithm applies
};

var hasCycle = function(head) {
    // can't have cycles if there is no list
    if (!head) {
        return false;
    }

    // keep reference to all the nodes we've seen
    const nodeSet = new Set();
    // pointer for current node
    let node = head;

    while (node.next) {
        // we've seen this node before, there is a cycle
        if (nodeSet.has(node)) {
            return true;
        }

        // add node to Set
        nodeSet.add(node);
        // progress to next node
        node = node.next;
    }

    return false;

    // 54 ms / beats 47.37%
};

// given head of singly linked list, determine if the linked list has a cycle in it
    // true if cycles, otherwise false
// cycle defined by:
    // some node in the list that can be reached again by continuously following the next pointer
// internally this problem uses a `pos` variable to denote the index of the node that the tail points to
    // this is not a parameter

// EXAMPLE: 3 > 2 > 0 > -4 -¬
//              ^-----------|
    // here we see that the tail links back to an existing node,
    // internally pos = 1 (2nd node)

// constraints:
    // number of nodes  in range [0, 10^4]
        // i.e. *will* need to check for empty linked list
    // -10^5 <= Node.val <= 10^5
        // we can't use mark by negation on the value, because we see positive/negative numbers
    // pos is -1 or valid index in the linked list
        // i.e. either no cycle or valid cycle in linked list

// this seems pretty trivial to do using O(n) space complexity,
// just by creating a Set of nodes and checking if one is repeated
    // let's start with this for now

// TODO: question asks for a solution using constant O(1) memory
    // instead of keeping reference to *all* seen nodes, we could keep reference to a single node
        // then return if we see that node again
        // but how would we know if that node exists in the cycle?

    // we could modify the values for the existing nodes,
        // but given that we can't mark by negation, how is this possible?

    // this *feels* like a fast/slow pointer question, but I'm not entirely sure how that algorithm works
        // so I may need to look at a solution
    // i.e. with one pointer moving faster than a second pointer:
        // eventually the two pointers will meet again
        // unless there is no cycle, at which point they will eventually arrive at null

// fast-slow pointer cycle example:
// 3 > 2 > 0 > -4 -¬
//     ^-----------|

// both nodes start at head, but fast pointer will move 2 for every 1 slow node movement
// slow = 3
// fast = 3

// slow = 2
// fast = 0

// slow = 0
// fast = 2

// slow = -4
// fast = -4
    // pointers have met, cycle confirmed

// fast-slow pointer no cycle example:
// 3 > 2 > 0 > -4

// both nodes start at head, but fast pointer will move 2 for every 1 slow node movement
// slow = 3
// fast = 3

// slow = 2
// fast = 0

// slow = 0
// fast = null
    // null pointer, no cycle (in half the iterations)

// here are some more comprehensive explanations on this algorithm:
// https://codingfreak.blogspot.com/2012/09/detecting-loop-in-singly-linked-list_22.html
// https://leetcode.com/problems/linked-list-cycle/solutions/44669/Fully-Explained!-why-fast-and-slow-can-meet-in-the-cycle/