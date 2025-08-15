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

// PROBLEM:
    // we are repeating multiple sums
    // e.g. when we calculate [0,n] we also calculate [0] + [1,n], [0,1] + [2,n], etc.
    // which to me is suggesting a Prefix Sum as we can calculate the sum at each index
        // SUM(i,j) = SUM(0,j) - SUM(0,i-1)

// APPROACH: sliding window
    // left pointer (start of window) & right pointer (end of window)
    // increment right pointer until **a condition**
        // TODO: but what should this condition be?
        // if we did current < previous we could get stuck

// APPROACH: prefix sum
    // calculate cumulative sum and store in a map (or array)
    // we then know that SUM(i,j) = SUM(0,j) - SUM(0,i-1)
    // we then need to find the maximum for all combinations of (i,j)
        // so this still seems like it would be O(n^2) ?
        // so there must be a better way to review this...

// EXAMPLE WALKTHROUGH: nums = [-2,1,-3,4,-1,2,1,-5,4]
// PrefixSum = [-2,-1,-4,0,-1,1,2,-3,1]

// from here we can see that the maximum value is 2 at PrefixSum[6]
// we see that the smallest value is -4 at PrefixSum[2]
// the maximum subarray = nums[3,6]
    // is this a coincidence, or a pattern?

// nums = [5,4,-1,7,8]
// PrefixSum = [5,9,8,15,23]

// max value is 23 at PrefixSum[4]
// min value is 5 at PrefixSum[0]
// the maximum subarray = nums[0,4]
    // in this example we are inclusive of [0], previous example we did min + 1
    // (because it was negative? or because this is index 0?)

// nums = [10,-4,6,8,-20,12]
// PrefixSum = [10,6,12,20,0,12]
// max value is 20 at PrefixSum[3]
// min value is 0, but that comes after the maximum value
    // the minimum value before the maximum value is 6 at PrefixSum[1]
// the maximum subarray = nums[0,4] BREAKS MY PATTERN

// SO HOW CAN WE USE THE PREFIX SUM INSTEAD?