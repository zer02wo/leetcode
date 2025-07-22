// https://leetcode.com/problems/find-all-duplicates-in-an-array/
// tags: medium, array, mark by negation

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    const duplicates = [];

    for (let i = 0; i < nums.length; i++) {
        // need to -1 to map 0-start array index to map to range [1,n]
        const p = Math.abs(nums[i]) - 1;

        // if the value at the specified index is negative
        if (nums[p] < 0) {
            // push the *unmapped index* to the output array, as it has been seen before
            // +1 here to revert mapping done at start of iteration
            duplicates.push(p + 1);
        } else {
            // mark specified index as visited by negation
            nums[p] *= -1;
        }
    }

    return duplicates;

    // 4 ms / beats 95.04%
    // should've done a bit better on this one
        // relied too much on my work from yesterday in leetcode #287
        // which made me use the same linked-list style approach at first
    // figuring out the mapping was also a bit annoying
        // i.e. needing to access at -1 (mapped), but push as unmapped value
};

// given integer array `nums` of length `n`, where elements are in the range `[1, n]` and each integer appears *at most twice*:
    // return an array of all the integers that appears twice
// algorithm must run in O(n) time and use only *constant* auxiliary space (excluding the space needed to store the output)

// EXAMPLE: nums = [4,3,2,7,8,2,3,1]
// OUTPUT: [2,3]

// EXAMPLE: nums = [1]
// OUTPUT: [1]

// constraints:
    // n == nums.length
    // 1 <= n <= 10^5
    // 1 <= nums[i] <= n
    // each element in nums appears once or twice
        // or 0 times..?

// due to constraints for O(n) runtime & O(1) additional space:
    // we cannot use O(n^2) brute force
    // we cannot use O(n log n) sorting
    // we cannot use a Set/HashMap

// intuition: mark by negation
    // this is a similiar question to leetcode #287 completed yesterday
        // but that had the constraint of the input array being considered "read-only"
// because the numbers are within the range [1, n]
    // each element of the array points to another index in the array
    // but we need to map the array indexes+1, as n == nums.length
// also because we are only dealing with positive numbers
    // we can mark the numbers as "seen" by making them negative
    // this keeps their absolute value but allows us to see that we've visited this index before (i.e. there is a duplicate element)
