// https://leetcode.com/problems/coin-change/
// tags: medium, array, dynamic programming, recursion, memoization, tabulatione

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeBottomUp = function(coins, amount) {
    // coins must be sorted for our early break condition (coin > target)
    coins.sort((a, b) => a - b);

    // amount + 1 sized array to account for 0 indexing. range is [0, amount]
    // by default we assume it takes infinite coins to reach an amount, so any valid combination is better
    // we can't use -1 as the base value because this will interfere with our Math.min() calls
    const minCoins = new Array(amount + 1).fill(Infinity);
    minCoins[0] = 0;

    // bottom-up, figure out the smallest sub-problem first
    for (let target = 1; target <= amount; target++) {
        // check every (valid) coin to find
        for (const coin of coins) {
            // coin is larger than target, cannot be used
            if (coin > target) {
                break;
            }

            // min coins to make current target is either itself
            // or the min ways to make the sub-problem [target - coin] (+1 for coin being referenced currently)
            minCoins[target] = Math.min(minCoins[target], minCoins[target - coin] + 1);
        }
    }

    // we want to know the minimum number of coins to make amount (the target)
    const minCoinsForAmount = minCoins[amount];

    // infinity means no valid combination was found, so return -1
    if (minCoinsForAmount === Infinity) {
        return -1;
    }

    return minCoinsForAmount;

    // 30 ms / beats 81.62%

    // O(a * c) time complexity
        // for every value in [0, amount] we check (up to) every coin
    // O(a) space complexity
        // tabular data structure (array) is the size of amount

    // this was definitely easier after looking up the tabulation pattern
        // but I had already done the hard part yesterday in figuring out the sub-problem/recurrence relation
    // given this is the same time complexity I'm surprised it performs so much better
        // but I suppose there is more overhead with recursion
        // especially when we're dealing with up to (2^31) - 1 states

    // BOTTOM-UP TABULATION SOLUTION
};

var coinChangeTopDown = function(coins, amount) {
    // coins must be sorted for our early break condition (coin > target)
    coins.sort((a, b) => a - b);

    // mapping target => minNumCoins
    const memo = new Map();
    // base case: 0 coins to make 0 amount
    memo.set(0, 0)

    // recursive helper function
    function minCoinsForTarget(target) {
        // look up previous answer for target from memoization cache
        if (memo.has(target)) {
            return memo.get(target);
        }

        // start at infinity so any valid (minimum) solution is better
        let minCoins = Infinity;

        for (const coin of coins) {
            // coin is larger than target, cannot be used
            if (coin > target) {
                break;
            }

            // recursively search for a way to make the new target
            const newTarget = target - coin;
            const result = minCoinsForTarget(newTarget);

            // -1 means an invalid result, only consider valid combinations
            if (result >= 0) {
                // +1 to account for current coin in loop
                minCoins = Math.min(minCoins, result + 1);
            }
        }

        // no valid solution was found for target
        if (minCoins === Infinity) {
            memo.set(target, -1);
            return -1;
        }

        // set min number of coins required to reach target in memoization cache
        memo.set(target, minCoins);
        // return minimum number of coins required to make solution
        return minCoins;
    }

    // initialise recursive solution
    return minCoinsForTarget(amount);

    // 153 ms / beats 12.10%

    // O(c * a) time complexity
        // c = length of array coins
        // a = target amount
        // for range [amount,0], we check (up to) every coin in array
        // without memoization this would be O(c^a)
            // possible c branches up to depth of a
    // O(a) space complexity
        // recursion stack depth from amount -> 0 (assuming we -1 each call)
        // memoization cache all stores entries for [0, amount]

    // this is by no means optimal and it took me a while to get here
        // and this is with some small hints
    // dynamic programming problems really do throw me for a loop
        // it's so hard to define the sub-problem

    // TOP-DOWN MEMOIZATION SOLUTION
};

// given an integer array `coins` representing different denominations of coins, and an integer `amount` representing a total amount of money
    // return the fewest number of coins you need to make up that amount
    // if the amount cannot be reached with any combination of coins, return -1
// assume you have an infinite number of each kind of coin

// EXAMPLE: coins = [1,2,5], amount = 11
// OUTPUT: 3
    // 5 + 5 + 1

// EXAMPLE: coins = [2], amount = 3
// OUTPUT: -1
    // impossible to make amount from given coins

// EXAMPLE: coins = [1], amount = 0
// OUTPUT: 0

// constraints:
    // 1 <= coins.length <= 12
    // 1 <= coins[i] <= (2^31) - 1
    // 0 <= amount <= 10^4

// INTUITION: dynamic programming
    // despite making a "combination" of coins, we have a near infinite number of possibilities to consider
        // as each coin can be used infinite times, meaning we CANNOT use backtracking
    // there are overlapping sub-problems
// SUB-PROBLEMS:
    // after we add add a coin to our selection, we then have a new sub-target to reach:
        // newAmount = amount - coins[i]
    // the problem then becomes the most efficient way to reach newAmount
    // so we could implement a recursive top-down approach, but how would we memoize this?
        // mapping targetAmount => minNumCoins
// (TOP-DOWN) RECURSION INTUITION:
    // the minimum number of coins to make the sub-target (amount - coins[i])
    // will also be the minimum number of coins to make the main target
    // e.g. coins = [1,2,5], amount = 11
        // newTarget = amount - coins[0] = 11 - 1 = 10
        // we then find the most efficient way to make 10 is using 5 + 5 (2 coins)
            // we have also found that the most efficient way to make 5 is using 5 (1 coin)
                // etc.

// BOTTOM-UP APPROACH:
// the general pseudocode for tabulation looks like:
    // const dp = new Array(STATE_FOR_WHOLE_INPUT + 1).fill(BASE_CASE);
    // for (let state = SMALLEST_SUBPROBLEM; state <= STATE_FOR_WHOLE_INPUT; state++) {
        // if (BASE_CASE) dp[state] = BASE_CASE
        // dp[state] = RECURRENCE_RELATION(state)
    // }
// RECURRENCE_RELATION = dp[i] = Min(dp[i], dp[i - coin] + 1)
    // i.e. the min number of coins to make [i] is either the current:
        // the current way to make the number of coins
        // the way to make the sub-problem [i - coin] (+1) for current coin being used in sub-problem
// STATE_FOR_WHOLE_INPUT = amount
    // i.e. we need to know how to make all numbers in the range [0,amount] with coins
    // as these are used for sub-problems
// BASE_CASE = amount <= 0
    // when amount === 0, we know to return 0
    // when amount < 0, we know that the coin combination is invalid