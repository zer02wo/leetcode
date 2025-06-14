// https://leetcode.com/problems/missing-number/
// tags: easy, array

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    // calculate sum of range [0,n]
    // EDIT: now using Gauss sum formula,
        // previously iterating through range and summing each number
    const n = nums.length;
    let rangeSum = (n * (n + 1)) / 2;

    // subtract each element in nums from range sum total
    for (let i = 0; i < nums.length; i++) {
        rangeSum -= nums[i];
    }

    // result is the missing number
    return rangeSum;

    // O(n) time complexity - two iterations, O(1) space complexity
    // 46 ms / beats 12.75% (before optimisation)
    // 1 ms / beats 70.15% (after Gauss sum formula)

    // NOTE: could cause overflow if the numbers were large enough,
    // but not a problem in our constraints
};

// given array nums containing n distinct numbers [0 -> n]
// return the *only* number in that range missing from the array

// EXAMPLE: [3,0,1]
// OUTPUT: 2

// EXAMPLE: [0,1]
// OUTPUT: 2
    // 2 numbers means range is [0 -> 2] (inclusive)

// first thoughts:
    // sorting would make this easy to iterate through, as you could check that the index === value
        // but might be a little slower than the optimal solution
    // using extra space (e.g. Set or HashMap) would still require an additional iteration of n to check for the missing number
        // even if the lookups are now O(1)
        // prefilling and deleting still requires the O(n) operation to fill the set, it just front loads this computation
    // could we use binary search here if we don't know what we're looking for?
        // it would also require sorting as well

    // we could calculate the sum of the range [0 -> n], then subtract each value we see in nums
        // this would leave us with the result
        // O(1) space compared to a HashMap or Set which would be O(n)
        // TODO: I like this solution to start with, so lets go with that

    // TODO: there is probably a bit manipulation (probably XOR) solution as well