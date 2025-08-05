// https://leetcode.com/problems/combination-sum/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {

};

// given array of distinct integers `candidates` and an integer `target`
// return a list of all *unique combinations* of `candidates` where the chosen numbers sum to `target`
    // may return combinations in any order

// same number may be chosen an unlimited number of times
// two combinations are unique if the frequency of at least one chosen number is different
// test cases generated to have less than 150 unique combinations for the given input

// EXAMPLE: candidates = [2,3,6,7], target = 7
// OUTPUT: [[2,2,3],[7]]
    // 2 gets used multiple times
    // 7 is a candidate and a target

// EXAMPLE: candidates = [2,3,5], target = 8
// OUTPUT: [[2,2,2,2],[2,3,3],[3,5]]

// EXAMPLE: candidates = [2], target = 1
// OUTPUT: []
    // target cannot be summed given candidates

// constraints:
    // 1 <= candidates.length <= 30
    // 2 <= candidates[i] <= 40
        // 1 is not included as a potential candidate, likely to reduce the size of the output
    // all elements of candidates are distinct/unique
    // 1 <= target <= 40

// intuition: recursion/backtracking
    // similar to previous leetcodes (e.g. #77 & #46) about generating combinations/permutations
    // if they only wanted a *single* sum, we could apply a non-"brute-force" approach
// actual intuition: subtract from remaining target
// backtracking helper funcion with combination array and integer remaining target arguments
    // return/add combination when remaining target === 0
    // for each number in the array of candidates
        // if it's less than the remaining target (as we're constrained to positive numbers)
            // create a recursive branch after subtracting number from target
// NOTE: as discovered from walkthrough below
    // we need a condition that outputs the combinations in ascending order to prevent duplicates
    // very similar to leetcode #77

// EXAMPLE WALKTHROUGH: candidates = [2,3,6,7], target = 7
// []
// [2] (first number in candidates <= target)
    // remaining target = 5
// [2,2] (first number in candidates <= target)
    // remaining target = 3
// [2,2,3]
    // push to output
// [2,2] (backtrack)
    // remaining target = 5 (again)
// [2,3] (second number in candidates <= target)
    // remaining target = 2
        // NOTE: we need a condition to prevent using a smaller number than the current number to prevent duplicates
        // similiar to leetcode #77
// [2] (backtrack)
// etc.