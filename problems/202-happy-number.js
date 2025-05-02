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

    // lets handle happy numbers for now and handle how to check for unhappy numbers after
    while (n !== 1) {
        // split number into digits
        const digits = Array.from(n.toString(), Number);
        let sumOfSquares = 0;

        for (let digit of digits) {
            sumOfSquares += (digit**2);
        }

        // TODO: check for unhappy numbers

        n = sumOfSquares;
    }

    return n;
};