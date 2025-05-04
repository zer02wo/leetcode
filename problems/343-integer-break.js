// https://leetcode.com/problems/integer-break/
// tags: medium, leetle

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
    let product = 1;

    // edge cases when n < 5
    if (n < 5) {
        return Math.floor(n / 2) * Math.ceil(n / 2);
    }

    while (n > 0) {

        if (n === 4) {
            // we want (*4) instead of (*3*1)
            n = 0;
            product *= 4;
        } else if (n === 2) {
            // n < 3
            n = 0;
            product *= 2;
        } else {
            // 3 emerged as the best number to create the product
            // even cases above handle when we can't/shouldn't have another 3

            // TODO: There's got to be a way to calculate this with division/modulo
            // would prevent need for a loop
            n = n - 3;
            product *= 3;
        }
    }

    return product;

    // 0 ms / beats 100%
    // REALLY happy with finding the pattern here, it took a while but much easier than figuring out a brute force
};

// 2 <= n <= 58
// break n into the parts of its sum, aiming to maximise the product
// e.g. n=2, = 1 + 1 ...            = 1 * 1 = 1
// e.g. n=3, = 1 + 2 ...            = 1 * 2 = 2
// e.g. n=4, = 2 + 2 ...            = 2 * 2 = 4
// e.g. n=5, = 2 + 3 ...            = 2 * 3 = 6
// e.g. n=6, = 3 + 3 ...            = 3 * 3 = 9
// e.g. n=7, = 3 + 4 ...            = 3 * 4 = 12
// e.g. n=8, = 3 + 3 + 2 ...        = 3 * 3 * 2 = 18
// e.g. n=9, = 3 + 3 + 3 ...        = 3 * 3 * 3 = 27
// e.g. n=10, = 3 + 3 + 4 ... = 3 * 3 * 4 = 36
    // n=10 = 2 + 2 + 2 + 2 + 2 ... = 2^5 = 32
    // n=10 = 5 + 5 ...             = 5^2 = 25
    // etc.
// e.g. n=11, = 3 + 3 + 3 + 2 = 27 * 2      = 54
    // n=11 = 4 + 4 + 3 = 16 * 3 = 48

// we can see from the examples above that we don't just want the *most* numbers, nor do we necessarily want the biggest numbers
// needs to be a balance of how many parts and how large they are
// is the pattern to simply maximise the number of 3's, but fill the remaining space with an even number? (I.e. 2 or 4)
    // every answer after n=4 is a multiple of 3 (answers after)

// if this isn't the answer, the alternative would be to brute force generating every combination which sounds slow/expensive
