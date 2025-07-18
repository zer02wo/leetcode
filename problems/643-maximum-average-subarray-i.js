// https://leetcode.com/problems/maximum-average-subarray-i/
// tags: easy, array, sliding window

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverageImproved = function(nums, k) {
    let windowSum = 0;

    // initialise sliding window with k elements
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    // keep reference to the maximum sum instead of average
        // prevents needing to calculate divison/average each iteration
        // still equates to the highest average, due to fixed window size k
    let maxSum = windowSum;

    for (let i = k; i < nums.length; i++) {
        // add new element to sliding window
        windowSum += nums[i];
        // remove old element from sliding window
        windowSum -= nums[i-k];
        // update maximum average if higher value found in current window
        maxSum = Math.max(maxSum, windowSum);
    }

    // return average of maximum sum (i.e. the maximum average)
    return maxSum / k;

    // 1 ms / beats 99.01%
    // O(n) time complexity, O(1) space complexity
    // much more readable than the previous version
    // also more efficient due to removing unnecessary calculations each iteration
        // i.e. average is calculated at the end, instead of per iteration
        // i.e. sliding window initialised in separate loop, no if condition check per iteration
};

var findMaxAverage = function(nums, k) {
    // initialise max average to lowest possible value
    let maxAverage = -Infinity;
    let windowSum = 0;

    for (let i = 0; i < nums.length; i++) {
        // add current number to sliding window
        windowSum += nums[i];

        // initialising first k values in sliding window
        if (i < k-1) {
            continue;
        }

        // remove previous number from sliding window
        windowSum -= nums[i-k] ?? 0;
        // calculate average for current values in sliding window
        let windowAverage = windowSum / k;
        // update maximum average if a higher value found in current window
        maxAverage = Math.max(maxAverage, windowAverage);
    }

    return maxAverage;

    // 8 ms / beats 13.62%
    // O(n) time complexity, O(1) space complexity
    // maybe overcomplicated this by trying to initialise the sliding window in the same loop
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