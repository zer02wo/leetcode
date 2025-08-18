// https://leetcode.com/problems/coin-change/
// tags: medium, array, dynamic programming, recursion, memoization

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
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
// RECURSION INTUITION:
    // the minimum number of coins to make the sub-target (amount - coins[i])
    // will also be the minimum number of coins to make the main target
    // e.g. coins = [1,2,5], amount = 11
        // newTarget = amount - coins[0] = 11 - 1 = 10
        // we then find the most efficient way to make 10 is using 5 + 5 (2 coins)
            // we have also found that the most efficient way to make 5 is using 5 (1 coin)
                // etc.