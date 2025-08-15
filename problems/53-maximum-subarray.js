// https://leetcode.com/problems/maximum-subarray/
// tags: medium, array

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {

};

// given integer array `nums`, find the subarray with the largest sum
    // subarray: contiguous non-empty element sequence within array

// EXAMPLE: nums = [-2,1,-3,4,-1,2,1,-5,4]
// OUTPUT: 6
    // [4,-1,2,1]

// EXAMPLE: nums = [1]
// OUTPUT: 1

// EXAMPLE: nums = [5,4,-1,7,8]
// OUTPUT: 23
    // the entire array can be used as a subarray

// constraints:
    // 1 <= nums.length <= 10^5
    // -10^4 <= nums[i] <= 10^4

// brute force idea:
// loop through nums
    // loop from i to n
        // add current value to sum
        // check if it is greater than the current maximum

// TODO: seems like we could probably optimise with a sliding window?
// lets review the outcome of the brute force solution