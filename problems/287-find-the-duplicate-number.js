// https://leetcode.com/problems/find-the-duplicate-number/
// tags: medium, array

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {

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
        // although I'm not sure how this would help anyway

// typically for problems with an array of duplicate elements:
    // we use bitwise XOR operations
// however, in this instance that won't work because:
    // the 2 instances of duplicate will cancel each other out, but everything else remains
    // there's also the chance that there are *more* than 2 instances, which would undo this change

// it feels like there's probably a trick with the fact that the integers are in the range [1, n]
    // e.g. if we took an mean average would that point to the duplicate element?
        // I don't think so, but *something* similar to this line of thinking maybe

// brute force O(n^2) would be simple enough to implement:
    // for each element
        // check the rest of the array
            // if duplicate found
            // return element
// but the problem does state that there *is* a linear runtime complexity solution