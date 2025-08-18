// https://leetcode.com/problems/coin-change/
// tags: medium, array, dynamic programming

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // recursive helper function
    function minCoinsForTarget(target) {
        // base case: 0 coins to make 0 amount
        if (target === 0) {
            return 0;
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

        // no valid solution was found
        if (minCoins === Infinity) {
            return -1;
        }

        // return minimum number of coins required to make solution
        return minCoins;
    }

    // initialise recursive solution
    return minCoinsForTarget(amount);

    // TODO: TLE for test case: coins = [1,2,5], amount = 100
    // TODO: implement memoization
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