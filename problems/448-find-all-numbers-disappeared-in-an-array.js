// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbersSet = function(nums) {
    // first thought that comes to mind is to:
        // sort the array
        // iterate through the array and check for each number

    // but that feels slow/wrong
        // examples show us that there can be duplicates
        // which would mean in array of 10k elements of all [1,1,1...,1] it would be slow

    // making a Set seems to be a good idea? This will filter duplicates
        // AND give us access to the has() method for quick O(1) comparisons

    const numsSet = new Set(nums);
    const n = nums.length;
    const output = [];

    for (let i = 1; i <= n; i++) {
        if (!numsSet.has(i)) {
            output.push(i);
        }
    }

    // this seems *relatively* performant, but it seems like there's room for improvement
        // I imagine there's some kind of bitwise XOR that could be done for range of 1 -> n vs nums ?
            // actually that can't work because we can have *multiple* missing elements

    return output;
};

var findDisappearedNumbers = function(nums) {
    // question suggests doing this without extra space, which would require overwriting array nums
    // but how could we do that in O(n) runtime with the array unsorted?

    // if we iterate through and swap the element to the appropiate index, how do we then reduce the array?
        // e.g. for [4,1,2,4] if we swap nums, this returns [1,2,4,4] -> how do we know that 3 is missing at the end of this?
        // EDIT/NOTE: result array is excluded from memory considerations, meaning we do not need to reduce array nums

    // solution is "marking by negation":
        // mark the existing value at the index of num to be negative
            // E.g. starting with [1,4,4,2]
                // [-1,4,4,2] (n = 1, negate nums[n-1])
                // [-1,4,4,-2] (n = 4, negate nums[n-1])
                // [-1,4,4,-2] (same as last iteration)
                // [-1,-4,4,-2] (n = 2, negate nums[n-1])
                // nums[2] being *positive* tells us that 3 is missing (2 = n-1, n=3)
        // Indicies  0 -> nums.length maps to (1 -> n)-1

    // mark nums by negation
    for (let num of nums) {
        // use absolute value to prevent reverting mark
        let n = Math.abs(num) - 1;
        nums[n] = -1 * Math.abs(nums[n]);
    }

    const output = [];

    // return indicies+1 with positive numbers
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            output.push(i+1);
        }
    }

    return output;
}
