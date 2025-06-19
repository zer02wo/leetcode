// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// tags: easy, array, sliding window

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // lowest price seen so far
    let cost = prices[0];
    // maximum profit available so far
    let profit = 0;

    // on each day
    for (let i = 1; i < prices.length; i++) {
        // keep the lowest cost
        if (prices[i] < cost) {
            cost = prices[i];
        } else { // we are not going to make profit when cost === prices[i] (i.e. lowest buy & sell price)
            // calculate the profit from the current price
            profit = Math.max(profit, prices[i] - cost);
        }
    }

    return profit;

    // 3 ms / beats 63.44%
    // I got the intuition pretty much immediately,
        // just took a little bit to figure out the variables/data structures required
};

// given array prices,  prices[i] represents price of given stock on the ith day
// maximise your profit by choosing a single day to buy one stock and choosing a different day *in the future* to sell that stock
// return the maximum profit you can achieve,
    // if you cannot achieve any profit, return 0

// EXAMPLE: prices = [7,1,5,3,6,4]
// OUTPUT: 5
    // buy on day 2, price = 1
    // sell on day 5, price = 6
    // 6 - 1 = 5 profit

// EXAMPLE: prices = [7,6,4,3,1]
// OUTPUT: 0
    // no transactions
    // price in the future is always lower than the past,
        // i.e. no way to make profit

// constraints:
    // 1 <= prices.length <= 10^5
        // i.e. no empty check
    // 0 <= prices[i] <= 10^4

// we do not want to brute force as this would be an O(n^2) solution
    // for each day
        // for each future day
            // check the maximum profit from selling on day

    // return maximum profit recorded

// immediate thought was a sliding window style solution
// at each day determine if:
    // we have found a lower price to buy
        // because we want to buy at the lowest price possible
    // or a higher price to sell with the current lowest price
        // to maximise profit

// EXAMPLE ALGORITHM:
// prices = [2,6,1,8]
// cost = 2             (only seen one price to buy at, so it's the lowest)
// profit = 0           (cannot sell on same day)

// price = 6
// cost = 2
// profit = 6 - 2 = 4

// price = 1
// cost = 1             (because 1 < 2)
// profit = 4           (no change, because 1 - 1 = 0)

// price = 8
// cost = 1
// profit = 8 - 1 = 7

// EXAMPLE ALGORITHM 2:
// prices = [2,7,1,4,3]
// cost = 2             (only seen one price to buy at, so it's the lowest)
// profit = 0           (cannot sell on same day)

// price = 7
// cost = 2
// profit = 7 - 2 = 5

// price = 1
// cost = 1             (because 1 < 2)
// profit = 5           (no change, because 1 - 1 = 0)

// price = 4
// cost = 1             (no change, because 4 > 1)
// profit = 5           (no change, because 5 - 1 = 4 < existing profit of 5)

// price = 3
// cost = 1             (no change, because 3 > 1)
// profit = 5           (no change, because 3 - 1 = 2 < existing profit of 5)