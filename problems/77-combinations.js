// https://leetcode.com/problems/combinations/
// tags: medium, array, recursion, backtracking

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {

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