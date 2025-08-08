// https://leetcode.com/problems/generate-parentheses/
// tags: medium, string

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {

};

// given `n` pairs of parentheses, write a function to generate *all combinations* of "well-formed parentheses"
    // defined better by examples, but need to open/close correctly with/without inner parentheses

// EXAMPLE: n = 3
// OUTPUT: ["((()))","(()())","(())()","()(())","()()()"]

// EXAMPLE: n = 1
// OUTPUT: ["()"]

// constraint: 1 <= n <= 8

// intuition: recursion/backtracking
    // given that we're asked to generate all combinations, this is the usual approach
// at each decision we have two options:
    // open a new parantheses: "("
    // close an existing parantheses ")"
        // assuming one is already open, we cannot start with ")"
        // so it may make sense to start the string with "(", given that n >= 1