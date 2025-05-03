// https://leetcode.com/problems/add-digits/
// tags: easy, leetle

/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
    // split num into digits, sum digits until num < 10

    // seems like a really easy problem, especially after reviewing [202] / sum of squares yesterday
    while (num >= 10) {
        let n = num;
        let sum = 0;

        while (n > 0) {
            // add digit to sum
            const digit = n % 10;
            sum += digit;
            // remove current digit / shift other digits down
            n = Math.floor(n / 10);
        }

        num = sum;
    }

    return num;

    // 0 ms / beats 100%
    // TODO: this question also poses a potential O(1) solution without using any loop/recursion
};