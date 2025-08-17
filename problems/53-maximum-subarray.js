// https://leetcode.com/problems/maximum-subarray/
// tags: medium, array, prefix sum, sliding window, Kadane's algorithm

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArrayKadane = function(nums) {
    // video explanation: https://www.youtube.com/watch?v=5WZl3MMT0Eg
    // essentially this is a sliding window, but we "reset" the window whenever we see a negative value

    let curSum = 0;
    let maxSum = nums[0];

    for (const num of nums) {
        // reset "sliding window" to 0 when we go negative
        if (curSum < 0) {
            curSum = 0;
        }

        // add next element to the "sliding window"
        curSum += num;

        // keep reference the maximum sum value seen
        maxSum = Math.max(maxSum, curSum);
    }

    return maxSum;

    // 4 ms / beats 23.94%

    // O(n) time complexity
    // O(1) space complexity

    // again, ridiculously simple code but it was just not intuitive to me at all
        // maybe I should've tried to pursue a sliding window solution instead of prefix sum
            // but the condition of "reset when negative" wasn't obvious
        // I suppose the mathematical proof is "if a subarray ever goes negative", it will always make sense to exclude that value moving forwards
        // e.g. [5,4,-10,20,1]
            // even though the "20" offsets the negative, there is no scenario in which we would want to include -10

    // I don't really understand the "recurrence relation" for this DP problem

    // TODO: need to look at "Divide and Conquer" solution as well
    // https://www.geeksforgeeks.org/dsa/maximum-subarray-sum-using-divide-and-conquer-algorithm/
};

var maxSubArrayPrefixSumIsh = function(nums) {
    // "Prefix Sum" approach
    let curSum = 0;
    let minPrefix = 0;
    let maxSum = nums[0];

    for (const num of nums) {
        // calculate the "prefix sum" (i.e. cumulative sum)
        curSum += num;

        // calculate new "maximum sum" = prefixSum - minPrefix
        maxSum = Math.max(maxSum, curSum - minPrefix);

        // calculate the "minimum prefix" (i.e. smallest prefix sum value seen so far)
        minPrefix = Math.min(minPrefix, curSum);
    }

    // see:
        // https://leetcode.com/problems/maximum-subarray/solutions/7070741/prefix-sums-is-more-intuitive-best-time-to-buy-and-sell-stock/
        // https://leetcode.com/problems/maximum-subarray/solutions/799981/say-goodbye-to-kadane-hello-to-intuitive-o-n-prefix-sum-solution-java/
    return maxSum;

    // 4 ms / beats 23.94% (first run)
    // 3 ms / beats 44.86% (second run)

    // O(n) time complexity
        // visits each element in nums once
    // O(1) space complexity
        // only defines 3 variables in memory

    // the code is relatively simple but this problem was so hard for me to wrap my head around
        // I'm not sure that I still fully understand it now, even after the hint
        // not sure if it really counts as Prefix Sum either, as we're just using it as a cumulative sum
        // this might have been one where coding the solution made more sense, as I might have thought of initialising to 0
            // rather than beginning with nums[0] like in my walkthroughs
    // TODO: people in comments are mentioning "Kadane's algorithim", let's see what that looks like
};

var maxSubArrayBruteForceTLE = function(nums) {
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
            // EDIT AFTER: Kadane's algorithm
                // reset sliding window when cumulative sum goes negative (curSum < 0)
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
// hint from solution here: https://leetcode.com/problems/maximum-subarray/solutions/7070741/prefix-sums-is-more-intuitive-best-time-to-buy-and-sell-stock/

// I was incredibly close, we just need to consider a starting "minimum" value of 0
    // i.e. imagine there is an imaginary [0] element prefixing all arrays
// e.g. nums = [10,-4, 6, 8,-20,12]
// PrefixSum = [10, 6,12,20,  0,12]
// MinPrefix = [ 0, 0, 0, 0,  0, 0]
//                        ^ 20 - 0 = 20 (the maximum)

// e.g. nums = [-2, 1,-3, 4,-1, 2, 1,-5, 4]
// PrefixSum = [-2,-1,-4, 0,-1, 1, 2,-3, 1]
// MinPrefix = [ 0,-2,-2,-4,-4,-4,-4,-4,-4]
//                                 ^ 2 - (-4) = 6 (the maximum)
    // we start with a minimum of 0 (i.e. nothing before the start of the array = minimum of 0)
    // we then set the new minimum to -2, as this is < 0
    // we then set the new minimum to -4, as again this is < -2

// e.g. nums = [-3, 4, 5,-1, 2,-4,-5, 3]
// PrefixSum = [-3, 1, 6, 5, 7, 3,-2, 1]
// MinPrefix = [ 0,-3,-3,-3,-3,-3,-3,-3]
//                           ^ 7 - (-3) = 10 (the maximum)