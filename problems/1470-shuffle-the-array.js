// https://leetcode.com/problems/shuffle-the-array/
// tags: easy, leetle, two-pointers

/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function(nums, n) {
    // new array of shuffled elements
    let shuffled = [];

    for (let i = 0; i < n; i++) {
        // push element from first half
        shuffled.push(nums[i]);
        // push element from second half
            // i + n is the same as i, relative to the second half of the array
        shuffled.push(nums[i+n]);
    }

    return shuffled;

    // 51 ms / beats 51.84% (first run)
    // 56 ms / beats 24.92% (second run)

    // TODO: not sure why this seems slow
        // seems like a pretty efficient O(n) solution (both time & space complexity)
};

// interleave the first n elements with the last n elements
    // [x1, x2, ..., xn, y1, y2, ..., yn] becomes: [x1, y1, x2, y2, ..., xn, yn]

// EXAMPLE: nums = [2,5,1,3,4,7], n = 3
// OUTPUT: [2,3,5,4,1,7]
    // because n = 3, divide element in two halves:
    // x1=2, x2=5, x3=1, y1=3, y2=4, y3=7
    // then reorder as x1, y1, x2, y2, x3, y3

// constraints:
    // nums is always exactly double of n
        // i.e. we don't need to worry about uneven halves
    // 1 <= n <= 500
        // i.e. we don't have to handle an empty case

// we essentially need to treat the array in two distinct halves
    // pointer for the first half
    // pointer for the second half
// iterate over both halves at the same time until reaching n
    // constraints simplify this a lot