// https://leetcode.com/problems/combination-sum-iii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const output = [];

    // recursive backtracking helper function
    // TODO: technically we can get prevIndex from combination::[-1]
        // but is it just more efficient to pass this as an argument instead of looking it up?
    function backtrack(combination, prevIndex, curTarget) {
        // generated combination of k elements
        if (combination.length === k) {
            // combination is valid for target
            if (curTarget === 0) {
                // push to output array - clone to prevent modifying by reference
                output.push([...combination]);
            }

            // branch is finished (whether combination is valid or invalid)
            return;
        }

        for (let i = (prevIndex + 1); i < n; i++) {
            // combination sum exceeds target, return from branch as it is invalid
            if (i > curTarget) {
                return;
            }

            // recursively branch to generate combination sum
            combination.push(i);
            backtrack(combination, i, curTarget - i);
            // backtracking - remove element from combination
            combination.pop();
        }
    }

    // initialise recursive backtracking
    backtrack([], 0, n);

    return output;

    // TODO: fails for following test case: k = 2, n = 18
        // EXPECTED: []
        // ACTUAL: [[1,17],[2,16],[3,15],[4,14],[5,13],[6,12],[7,11],[8,10]]
            // probably just because I incorrectly constrained this
            // needs to only use numbers 1 to 9
                // not 1 to `n`, like I currently have it (as n can be <= 60)
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