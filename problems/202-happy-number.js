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

    const previousNums = [];

    // lets handle happy numbers for now and handle how to check for unhappy numbers after
    while (n !== 1) {
        // split number into digits
        const digits = Array.from(n.toString(), Number);
        let sumOfSquares = 0;

        for (let digit of digits) {
            sumOfSquares += (digit**2);
        }

        // check for unhappy numbers - if we have already seen this value before, that means it's looping
        // TODO: this could become pretty expensive for larger numbers, is there a smarter way to handle it?
            // example of n=2:
                // 2^2 = 4, 4^2 = 16, 1^2 + 6^2 = 37, 3^2 + 7^2 = 58, 5^2 + 8^2 = 89, 8^2 + 9^2 = 145, ...
                // ... 1^2 + 4^2 + 5^2 = 42, 4^2 + 2^2 = 20, 2^2 + 0^2 = 4 [LOOP END]
            // we can see that the loop lasts a long time even on a small number, is there a pattern to detect?
        if (previousNums.includes(sumOfSquares)) {
            return false;
        }

        previousNums.push(sumOfSquares);

        n = sumOfSquares;
    }

    return n;

    // 4ms / beats 15.80%
};