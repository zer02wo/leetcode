// https://leetcode.com/problems/combination-sum/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSumNoLoop = function(candidates, target) {
    // solution from here: https://leetcode.com/problems/combination-sum/solutions/6146998/simple-solution/
    const output = [];

    // CHANGE: do not need to sort input array

    // CHANGE: additional `index` argument for
    function backtrack(combination, curTarget, index) {
        // a valid sum of candidates has been created
        if (curTarget === 0) {
            // push candidate sum to output - cloned to prevent modifying by reference
            output.push([...combination]);
            return;
        }

        // CHANGE: no loop
        // combination is not valid sum if we've already passed target
        // candidate is not valid if exceeds array bounds
        if (curTarget < 0 || index >= candidates.length) {
            return;
        }

        const num = candidates[index];

        // create recursive branch with current candidate and remaining target
        combination.push(num);
        // IMPORTANT: don't increment the index so we can re-use the same number multiple times
        backtrack(combination, curTarget - num, index);

        // backtracking - returning from branch
        // remove candidate from combination
        combination.pop();
        // create recursive branch *without* current candidate, after incrementing index
        backtrack(combination, curTarget, index + 1);
    }

    backtrack([], target, 0);

    return output;

    // 5 ms / beats 36.63% (first run)
    // 4 ms / beats 49.15% (second run)

    // upon further inspection, I actually think I prefer *my* solution,
    // reviewing the candidates in a loop seems more efficient than creating a recursive branch to check the condition
        // we're guaranteeing 2 recursive calls at each step
        // whereas in *my* solution we only explore (potentially) valid candidates
            // e.g. with the early exit when num > curTarget
    // potentially more readable? and at least doesn't need to sort input array?

    // this also appears to perform worse in the real world according to leetcode results above
        // could be variance?
};

var combinationSum = function(candidates, target) {
    const output = [];

    // sort candidates to make it easier to prevent duplicates
    candidates.sort((a, b) => a - b);

    // recursive backtracking helper function
    function backtrack(combination, curTarget) {
        // a valid sum of candidates has been created
        if (curTarget === 0) {
            // push candidate sum to output - cloned to prevent modifying by reference
            output.push([...combination]);
            return;
        }

        for (const num of candidates) {
            // no remaining candidates can reach sum, backtrack from this branch
            if (num > curTarget) {
                return;
            }

            // only allow adding candidates in ascending order to prevent duplicates
            if (combination.at(-1) > num) {
                continue;
            }

            // create recursive branch with current candidate and remaining target
            combination.push(num);
            backtrack(combination, curTarget - num);
            // backtracking - returning from branch, remove candidate
            combination.pop();
        }
    }

    // initialise recursive backtracking
    backtrack([], target);

    return output;

    // 1 ms / beats 97.50% (first run)
    // 3 ms / beats 67.75% (second run)
    // 1 ms / beats 97.50% (third run)

    // not even going to attempt to calculate the time/space complexity here...

    // pretty happy with this solution, although looking at another solution it does look like I have overcomplicated it
        // performance is already near optimal for this, but may not have been for a larger input size
        // recency bias of completing Permutations II (leetcode #47) made me think of sorting
        // but I should've done something more similar to Combinations (leetcode #77)
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
// [2,2,2] (first number in candidates <= target)
    // remaining target = 1
// [2,2] (backtrack)
    // remaining target = 3 (again)
// [2,2,3]
    // remaining target = 0
    // push to output
// [2,2] (backtrack)
    // remaining target = 5 (again)
// [2,3] (second number in candidates <= target)
    // remaining target = 2
        // NOTE: we need a condition to prevent using a smaller number than the current number to prevent duplicates
        // similiar to leetcode #77
// [2] (backtrack)
// etc.