// https://leetcode.com/problems/combinations/
// tags: medium, array, recursion, backtracking

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const output = [];

    // recursive backtracking helper function
    function backtrack(combination, index) {
        // end of branch - choosing k elements to create combination
        if (combination.length === k) {
            // push clone of combination to output (prevent modifying by reference)
            output.push([...combination]);
            return;
        }

        // to prevent duplicates, begin generating the combination from 1 + the previous index used
            // e.g. if we add [1,2] to the combination, we don't want to add [2,1]
        // this condition ensures we only generate the combinations in *ascending* order,
            // which in turn prevents duplicates
        for (let i = (index + 1); i <= n; i++) {
            // add current number to combination
            combination.push(i);
            // recursively generate combinations
            backtrack(combination, i);
            // returning/backtracking - remove current number from combination
            combination.pop();
        }
    }

    // begin recursive backtracking
    backtrack([], 0);

    return output;

    // 65 ms / beats 48.32% (first run)
    // 61 ms / beats 62.82% (second run)
    // 58 ms / beats 73.47% (third run)
        // other solutions seem pretty much identical, so not sure why there is so much variance

    // O(n choose k) time complexity
        // in actual terms this is some form of factorial
            // (I don't remember the formula)
        // i.e. there are initially n numbers to choose, then n-1, etc.
        // we do this for size k
    // O(n choose k * k) space complexity
        // we are generating n choose k combinations
        // which each have a length of k

    // I know this is very similar to previous backtracking leetcodes
        // but I'm proud of how quickly I got this one
    // the conditions for these are always deceptively easy,
        // but are always more tricky to actually figure out
    // once again writing out the possible reasons and examining the output makes it easier
};

// given two integers `n` and `k`
// return all possible combinations of `k` numbers chosen from the range [1, n]
    // may return in any order

// EXAMPLE: n = 4, k = 2
// OUTPUT: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
    // 4 choose 2 = 6 combinations
    // Combinations are unordered, [1,2] and [2,1] are considered the same combination

// EXAMPLE: n = 1, k = 1
// OUTPUT: [[1]]
    // 1 choose 1 = 1 total combination

// constraints:
    // 1 <= n <= 20
    // 1 <= k <= n

// intuition: recursion/backtracking
    // feels similiar to leetcode #47 & #90
    // i.e. dealing with generating all possibilities whilst handling potential duplicates

// what is the condition for handling the duplicates?
    // given that we're going to be generating *from* 1 *to* n,
    // we'll always have a smaller number before a larger number

    // so the condition is to start the loop from previous i + 1
        // i.e. because duplicates of the same number are also not valid
// EXAMPLE permutations (including duplicates) for: n = 4, k = 2
// [1,2]
// [1,3]
// [1,4]
// [2,1] <- duplicate [1,2]
// [2,3]
// [2,4]
// [3,1] <- duplicate [1,3]
// [3,2] <- duplicate [2,3]
// [3,4]
// [4,1] <- duplicate [1,4]
// [4,2] <- duplicate [2,4]
// [4,3] <- duplicate [3,4]

// we'll need to see how this holds up when k >= 3 (i.e. 3+ elements in an array...)