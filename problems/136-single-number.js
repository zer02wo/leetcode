// https://leetcode.com/problems/single-number/
// tags: easy, array, bit manipulation

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let output = 0;

    for (const num of nums) {
        output ^= num;
    }

    return output;

    // 3 ms / beats 51.26% (first run)
    // 2 ms / beats 60.89% (second run)
    // incredibly simple problem once you know the operator to use
};

// in array nums find element that only appears once
    // all other elements appear twice

// EXAMPLE: nums = [4,1,2,1,2]
// OUTPUT: 4

// constraints:
    // solution must be linear runtime complexity O(n) & constant extra space O(1)
    // 1 <= nums.length <= 3 * 10^4
        // i.e. nums is never empty
    // -3 * 10^4 <= nums[i] <= 3 * 10^4
        // i.e. num in array can be positive or negative
    // each element in array appears twice, except for one element which appears only once

// knowing this is for bit manipulation practice, the bitwise XOR operator comes to mind
    // i.e. nums = [2,2,1,5,1]
    // 2 ^ 2 = 0
    // 1 ^ 1 = 0
    // leaves 5 remaining as all the pairs get cancelled out


// revisiting problem:

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let xorResult = 0;

    for (const num of nums) {
        xorResult ^= num;
    }

    return xorResult;

    // 1 ms / beats 74.96%
    // O(n) time complexity, O(1) space complexity
};

// this is *the* bitwise XOR question
    // a ^ a == 0
    // b ^ b == 0
    // i.e. all the pairs cancel each other out...
    // n ^ 0 == n
        // leaving just the single number as the output