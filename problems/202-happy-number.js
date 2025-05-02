// https://leetcode.com/problems/happy-number/
// tags: easy

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    // 'happy' number definition:
        // must start with positive integer
        // replace n with sum of it's squares (e.g. n=19 = 1^2 + 9^2, n=82)
        // repeat until n = 1, this means it's happy
        // if number loops endlessly and does not reach 1, not happy

    const previousNums = new Set();

    // this method of obtaining the digits was significantly faster than string/array operations
    // required a hint to get to this
    function getSumOfSquares(num) {
        let sum = 0;

        while (num > 0) {
            // get single digit column using modulo
            let digit = num % 10;
            // add squared value to sum
            sum += (digit**2);
            // remove current digit column
            num = Math.floor(num / 10);
        }

        return sum;
    }

    // lets handle happy numbers for now and handle how to check for unhappy numbers after
    while (n !== 1) {
        const sumOfSquares = getSumOfSquares(n);

        // check for unhappy numbers - if we have already seen this value before, that means it's looping
            // example of n=2:
                // 2^2 = 4, 4^2 = 16, 1^2 + 6^2 = 37, 3^2 + 7^2 = 58, 5^2 + 8^2 = 89, 8^2 + 9^2 = 145, ...
                // ... 1^2 + 4^2 + 5^2 = 42, 4^2 + 2^2 = 20, 2^2 + 0^2 = 4 [LOOP END]
            // we can see that the loop lasts a long time even on a small number, is there a pattern to detect?

        // Using a set to reduce lookup time
            // main time save in getSumOfSquares() method using math operations instead of string/array operations
        if (previousNums.has(sumOfSquares)) {
            return false;
        }

        previousNums.add(sumOfSquares);

        n = sumOfSquares;
    }

    return n;

    // 1ms / beats 79.56%
};