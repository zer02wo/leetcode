// https://leetcode.com/problems/combination-sum-iii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {

};

// find all valid combinations of `k` numbers that sum up to `n` such that:
    // only numbers 1 through 9 are used
    // each number is used *at most once*
// return all possible valid combinations in any order - must not include same combination twice

// EXAMPLE: k = 3, n = 7
// OUTPUT: [[1,2,4]]
    // 1 + 2 + 4 is the only valid combination
    // i.e. [1,6] or [7] is < k
    // i.e. [1,3,3] contains duplicate numbers

// EXAMPLE: k = 3, n = 9
// OUTPUT: [[1,2,6],[1,3,5],[2,3,4]]

// EXAMPLE: k = 4, n = 1
// OUTPUT: []
    // smallest sum of 4 numbers = 1+2+3+4 = 10
    // therefore no valid combinations

// constraints:
    // 2 <= k <= 9
    // 1 <= n <= 60

// intuition: recursion/backtracking
    // more specifically this seems to be similar to Combinations (leetcode #77)
// to prevent duplicate combinations, we only add elements in ascending order
    // e.g. this ensures we add [1,2,6] but don't add [2,6,1] or [6,2,1] or etc.
// this also prevents duplicate element usage
    // e.g. after we use [1] increment the index, so we will *at least* be adding 2 or higher to the combination subsequently

// pseudocode
// recursive backtracking function with arguments: array combination & integer previous index & integer current target
    // if combination length === k && current target === 0
        // push result and then return

    // else if combination.length >= k && current target !== 0
        // return without pushing

    // iterate from previous index + 1 to n ((ensures elements added only in ascending order to prevent duplicate combinations))
        // if current element greater than target
            // return ((no elements will satisfy the current combination attempt))
        // create recursive branch for current combination