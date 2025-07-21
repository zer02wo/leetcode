// https://leetcode.com/problems/find-the-duplicate-number/
// tags: medium, array, linked list, fast slow pointers

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicateBruteForce = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i+1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                return nums[i];
            }
        }
    }

    // should not be possible given constraints
    return -1;

    // TLE: Time Limit Exceeded
    // test case 56 / 59
};

// given integer array `nums` containing `n + 1` integers, where each integer in range [1, n] *inclusive*
// there is only *one* repeated number in `nums`, return this repeated number.
// solve the problem *without* modifying the array `nums` and only using constant extra space

// EXAMPLE: nums = [1,3,4,2,2]
// OUTPUT: 2

// EXAMPLE: nums = [3,3,3,3,3]
// OUTPUT: 3

// constraints:
    // 1 <= n <= 10^5
        // surely this needs to be at least 2 elements for a duplicate to exist?
    // nums.length == n + 1
    // 1 < nums[i] < = n
    // all integers in nums appear only once
    // except for precisely one integer which appears two or more times

// challenges due to O(1) space constraint:
    // we can't use a HashMap to find the count
        // i.e. a map of value => count
    // we can't use sorting
        // i.e. sort array, whenever prev == current return element
    // we can't use marking by negation
        // i.e. i.e. go to elemnent nums[nums[i]], if value is already negative return value
            // that would mean we've been to that index before

// typically for problems with an array of duplicate elements:
    // we use bitwise XOR operations
// however, in this instance that won't work because:
    // the 2 instances of duplicate will cancel each other out, but everything else remains
    // there's also the chance that there are *more* than 2 instances, which would undo this change

// brute force O(n^2) would be simple enough to implement:
    // for each element
        // check the rest of the array
            // if duplicate found
            // return element
// but the problem does state that there *is* a linear runtime complexity solution

// it feels like there's probably a trick with the fact that the integers are in the range [1, n]
    // e.g. if we took an mean average would that point to the duplicate element?
        // I don't think so, but *something* similar to this line of thinking maybe

// completely stumped on this question so following this video:
    // https://www.youtube.com/watch?v=wjYnzkAhcNk
// treat this as a linked-list (similar flow to the mark by negation pattern)
// EXAMPLE: nums = [1,3,4,2,2]
// nums[0] = 1
// nums[1] = 3
// nums[3] = 2
// nums[2] = 4
// nums[4] = 2
// nums[2] = 4
    // etc.

// 1 -> 3 - > 2
//           \ /
//            4

// i.e. we have a cycle between 2 & 4
    // we know it's node 2 specifically duplicated because there are multiple pointers to it
        // i.e. nums[3] and nums[4]
// because values are in range [1, n] (in this case 1 -> 4)
    // there is no exit condition to leave this range
    // nothing points at index [0] because of this constraint

// apply Floyd's algorithm to find the *start* of a cycle
    // i.e. fast/slow pointers
// starting at nums[0] as we know this is *not* part of the cycle
// apply fast/slow pointers to find itersection point
    // fast pointer can now be discarded
// create new slow pointer at nums[0]
// progress both slow pointers until they intersect
    // return intersection point

// NOTE: this works because the distance between the fast/slow intersection,
    // is always the same distance from the starting point to the cycle
    // 2 * slow = fast
// 2 (P + C - X)= (P + C - X + C)
// 2P + 2C - 2X = P + 2C - X
       // P - X = 0
           // P = X
