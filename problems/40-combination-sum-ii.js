// https://leetcode.com/problems/combination-sum-ii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {

};

// given collection of candidate numbers and a target number
// find all *unique combinations* in `candidates` where the candidate numbers sum to `target`
// each candidate may only be used *once* in the combination
    // note: the solution set must not contain duplicate combinations

// EXAMPLE: candidates = [10,1,2,7,6,1,5], target = 8
// OUTPUT: [[1,1,6],[1,2,5],[1,7],[2,6]]
    // NOTE: the solution [1,1,6] contains a "duplicate" of `1`
        // but this is allowed because there are two elements of `1` in input array
        // candidates[1] & candidates[5]

// EXAMPLE: candidates = [2,5,2,1,2], target = 5
// OUTPUT: [[1,2,2],[5]]
    // NOTE: despite `2` appearing 3 times in input array
        // we can only make one unique combination: [1,2,2]
        // it doesn't matter if this is candidates[0] & candidates[2] or candidates[2] & candidates[4] (etc.)

// intuition: recursion/backtracking
    // obvious after doing Combination Sum I (leetcode #39) yesterday
// important intuition: reference elements by index
    // because we can have duplicate values, we need to reference them by index instead of by value
    // (i.e. we don't want to use the same index twice)
// however, we still need to keep track of used values to prevent duplicates in the output set
    // for this, we know that if we have skipped an element previously, skip all of its duplicates
    // i.e. nums[i-1] === nums[i]
        // set index to next non-duplicate number

// NOTE: this answer may have been slightly spoiled/unintentionally informed by an alternative solution for leetcode #39 seen yesterday