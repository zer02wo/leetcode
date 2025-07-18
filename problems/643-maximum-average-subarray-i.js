// https://leetcode.com/problems/maximum-average-subarray-i/
// tags: easy, array

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {

};

// given integer array `nums` consisting of `n` elements, and an integer `k`:
// find a contiguous subarray whose length is equal to `k`, that has the maximum average value and return *this value*
    // any answer with a calculation error lesss than 10^-5 will be accepted

// EXAMPLE: nums = [1,12,-5,-6,50,3], k = 4
// OUTPUT: 12.75
    // Maximum average = (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

// constraints:
    // n === nums.length
    // 1 <= k <= n <= 10^5
        // i.e. don't need to handle case where window size > search space
    // -10^4 <= nums[i] <= 10^4

// intuition: sliding window
// initialise a sliding window of k elements
    // calculate the average
// when iterating to the next element
    // subtract the element leaving the window
    // add the element entering the window
    // re-calculate the average
// keep a variable storing the current maximum average found
    // i.e. maxAverage = Math.max(maxAverage, (windowSum / k))