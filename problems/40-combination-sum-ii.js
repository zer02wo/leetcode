// https://leetcode.com/problems/combination-sum-ii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const output = [];

    // sort input array to more easily check for duplicates
    candidates.sort((a, b) => a - b);

    // recursive backtracking helper function
    // TODO: "index" might be a bit of a confusing variable name startIndex
    function backtrack(combination, index, curTarget) {
        // a valid sum of candidates has been created
        if (curTarget === 0) {
            // push candidate sum to output - cloned to prevent modifying by reference
            output.push([...combination]);
            return;
        }

        // candidates exhausted if index exceeds bounds (invalid combination)
        // combination cannot be valid if already surpassed target (only dealing with positive integers)
        if (index >= candidates.length || curTarget < 0) {
            return;
        }

        for (let i = index; i < candidates.length; i++) {
            // current (and subsequent numbers) are invalid combinations
            if (candidates[i] > curTarget) {
                return;
            }

            // number is a duplicate AND was not previously selected (current index greater than supplied index)
                // i.e. only consider the first occurrence of each candidate
            if (candidates[i-1] === candidates[i] && i > index) {
                // continue until next non-duplicate value
                continue;
            }

            // create recursive branch with current candidate and remaining target
            combination.push(candidates[i]);
            backtrack(combination, i + 1, curTarget - candidates[i]);
            // backtracking - returning from branch, remove candidate
            combination.pop();
        }
    }

    // initialise recursive backtracking
    backtrack([], 0, target);

    return output;

    // 1 ms / beats 97.29%

    // (time/space complexity is a mess to figure out again, ignoring)

    // easier than it might have otherwise been given the solution I looked at yesterday was a similar pattern
    // but these backtracking problems are all pretty similar in general
        // makes it tricky to know what condition and/or if sorting is required though
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