// https://leetcode.com/problems/subsets/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const powerSet = [];

    function backtrack(subset, index) {
        // branch has reached end (progressed through input array)
        if (index === nums.length) {
            // push subset to output
            powerSet.push(subset);
            return;
        }

        const nextIndex = index + 1;

        // TODO: prevent needing to clone arrays
        // continue branching without adding current element to subset
        backtrack([...subset], nextIndex);
        // add current element to subset and continue branching
        subset.push(nums[index]);
        backtrack([...subset], nextIndex);
    }

    // begin recursive branching/backtracking with empty subset at index 0
    backtrack([], 0);

    // return the "power set", i.e. all possible subsets
    return powerSet;

    // 0 ms / beats 100%

    // O(2^n * n) time complexity
    // O(2^n * n) space complexity

    // reached a worked solution very quickly given previous backtracking questions
    // still some improvements to be made in terms of memory management
};

// given integer array `nums` of *unique* elements
// return the power set: all possible subsets
    // solution set must not contain duplicate subsets
    // solution can be returned in any order

// EXAMPLE: nums = [1,2,3]
// OUTPUT: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// EXAMPLE: nums = [0]
// OUTPUT: [[], [0]]

// intuition: recursive backtracking
    // similiar to leetcode #784
    // we want to create all the permutations of possible combinations
    // which means branching out the possibilities from a given element
// each element can either return nothing, or itself
    // e.g. for nums = [1,2,3], the empty subset [] is just when we return nothing at [1] nor [2] nor [3]
    // conversely [1,2,3] is the subset when we return the element at [1] and [2] and [3]
    // additionally, a partial subset like [1,3] happens when we return the element at [1], nothing at [2] and the element at [3]
// so we create a recursive backtrack function which accepts two arguments
    // array of current subset
    // index of current path (i.e. related to nums input array)
// then create two branches:
    // one where nothing is pushed to the subset
    // one where the current element is pushed to the subset