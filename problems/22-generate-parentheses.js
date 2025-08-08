// https://leetcode.com/problems/generate-parentheses/
// tags: medium, string, recursion, backtracking

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var output = [];

    // recursive backtracking helper function
    function backtrack(parantheses, numOpen, numClosed) {
        // n well-formed parantheses have been generated
        if (numOpen === numClosed && numClosed === n) {
            // push string of valid parantheses to output
            output.push(parantheses.join(''));
            return;
        }

        // we have not opened all (n) parantheses pairs yet
        if (numOpen < n) {
            // open a new parantheses pair
            parantheses.push('(');
            // create recursive branch to open/close pairs
            backtrack(parantheses, numOpen + 1, numClosed);
            // backtracking - remove open parantheses
            parantheses.pop();
        }

        // we have not closed all (n) parantheses pairs yet
        if (numClosed < numOpen) {
            // close an existing parantheses pair
            parantheses.push(')');
            // create recursive branch to open/close pairs - one less open, one more complete
            backtrack(parantheses, numOpen, numClosed + 1);
            // backtracking - remove closed parantheses
            parantheses.pop();
        }
    }

    // initialise recursive backtracking
    // starting with an open parantheses as this is the only valid option to begin
    // using array instead of string for more efficient "concatenation"
    backtrack(['('], 1, 0);

    return output;

    // 2 ms / beats 42.80%

    // completely lost on time/space complexity again...

    // the general skeleton of recursion/backtracking is easy now
    // but getting the right conditions is still tricky
        // even though I knew the two branch decision tree
        // I still got caught up a couple times until I revisited the decision tree to define them more clearly
            // AKA don't jump into the code *too* quickly before fully understanding
    // I also had to pivot from my original intuition of a single counter for numOpen to also have a numClosed counter
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