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

// EXAMPLE DECISION TREE: n = 3
    // left branch = prioritise open, right branch = prioritise close
//                  (
//        ((                 ()
//     (((   (()             ()(
//    ((()   (()(        ()((  ()()
//   ((())   (()()      ()(()   ()()(
//  ((()))   (()())    ()(())   ()()()

// we could use a counter to determine the number of open parantheses
    // increment/decrement based on decision for each branch
    // use this as a condition to ensure it is valid
// conditions:
    // we can add another '(' when there are currently less than `n`
        // e.g. for n = 3, '(((' is a valid start
    // we can add another ')' when there are less than the number currently open
        // e.g. for n = 3:
            // '()' there are one open/one closed, so we can't close another
            // '((' there are two open/zero closed, so we can close two
            // '(()' there are two open, one closed, so we can close one
            // '()()' there are two open, two closed, so we can't close another
            // '(((' there are three open, zero closed, so we can close three
            // etc.