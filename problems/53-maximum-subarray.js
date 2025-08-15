// https://leetcode.com/problems/maximum-subarray/
// tags: medium, array

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // initialise max sum to -Infinity, as the maximum sum could be negative
    let maxSum = -Infinity;
    const n = nums.length;

    // brute force solution - calculate all possible sums from [i] to [n]
    for (let i = 0; i < n; i++) {
        let localSum = 0

        for (let j = i; j < n; j++) {
            localSum += nums[j];
            maxSum = Math.max(maxSum, localSum);
        }
    }

    return maxSum;

    // TLE

    // O(n^2) time complexity
    // O(1) space complexity

    // as expected this passes test cases but runs too slowly,
        // but usually a good idea to implement this and figure out how to optimise
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
// TODO: seems like a prefix sum solution could also work?
// lets review the outcome of the brute force solution