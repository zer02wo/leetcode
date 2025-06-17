// https://leetcode.com/problems/climbing-stairs/
// tags: easy, dynamic programming, memoization, fibonacci

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // starting terms for Fibonacci sequence
    let prev1 = 0;
    let prev2 = 1;

    for (let i = 1; i <= n; i++) {
        // calculate newest value in Fibonacci sequence
        const current = prev1 + prev2;

        // store previous two values for sum in next iteration
        prev1 = prev2;
        prev2 = current;
    }

    return prev2;

    // 0 ms / beats 100%
    // O(n) time complexity, O(1) space complexity

    // without finding the Fibonacci pattern, this would've been a very difficult problem to solve
};

var climbStairsRecursive = function(n) {
    // Memoization - store result of previous computations as optimisation
    const memo = new Map();

    function fibonacciSum(num) {
        // n == output, when n in [1,2,3]
        if (num <= 3) {
            return num;
        }

        // if value has not been previously
        if (!memo.has(num)) {
            // calculate recursively
            memo.set(num, (fibonacciSum(num-1) + fibonacciSum(num-2)));
        }

        // get previously computed value
        return memo.get(num);
    }

    // call recursive helper function to get nth value in Fibonacci sequence
    return fibonacciSum(n);

    // 0 ms / beats 100%
    // definitely *more* complicated compared to the bottom-up/iterative approach
        // also requires O(n) space (in comparison to O(1))
    // but still pretty intuitive after implementing
};

// climbing a staircase takes n steps to reach the top
// if you can climb either 1 or 2 steps at a time: how many distinct ways can you reach the top?

// EXAMPLE: n = 2
// OUTPUT: 2
    // 1 step + 1 step
    // 2 steps

// EXAMPLE: n = 3
// OUTPUT: 3
    // 1 step + 1 step + 1 step
    // 1 step + 2 step
    // 2 steps + 1 step

// constraint: 1 <= n <= 45

// because 1 steps is an option, we can always substitute a 2-step move with 2x 1-step moves
    // i.e. fill as many 2-step into n as possible, then add a 1-step if it's odd
    // then after each iteration replace a 2-step move with 2x 1-step moves

// the problem is that order matters: e.g. n = 5
    // 1-step + 2-step + 2-step
    // 2-step + 1-step + 2-step
    // 2-step + 2-step + 1-step

// in the above example, we would be doing repeated effort to calculate each combination
    // i.e. for n = 5, we would've already calculated part of this for n = 3 (shown in [] below)
    // [1-step + 2-step] + 2-step
    // 2-step + [1-step + 2-step]
    // but then how do we account for the case with 2x 2-step?
        // from n=4?

// let's find a pattern:
    // n = 1, output = 1
    // n = 2, output = 2
    // n = 3, output = 3
    // n = 4, output = 5
    // n = 5, output = 8
    // n = 6, output = 13
    // n = 7, output = 21
    // AKA Fibonacci sequence (without starting [0,1])

// there is likely a formula using the golden ratio to calculate the nth term in the Fibonacci sequence, but:
    // A: I don't know what it is from memory (obviously)
    // B: would it still work with our modified sequence start (maybe just -2 from result?)
// instead we will need to calculate this in a loop or recursively