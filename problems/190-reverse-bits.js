// https://leetcode.com/problems/reverse-bits/description/
// tags: easy, leetle

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let output = 0;

    // repeatedly shift rightmost bit until n = 0
    while (n > 0) {
        let rightBit = n >>>= 1;
        output <<= rightBit;
    }

    return output;

    // TODO: the left/right-shift assignment operator does not work as I expected it to
        // it simply assigns the result of the left/right shift
        // rather than returning the end bit
            // (which makes sense after taking a second to think of it)
    // TODO: we need to leftshift output by 1
        // then add 1 to its rightmost bit depending on the rightmost bit of n
            // i.e. AND with 0..01
};

// reverse 32-bit unsigned integer
// example: n = 00000010100101000001111010011100
    // output = 964176192 (00111001011110000010100101000000)

// bit manipulation is obviously the name of the game here
    // first thought was maybe some kind of XOR / OR trick, but I don't think that's possible

    // so bit shifting seems like the next idea to review
        // but how do we loop bits back to the start?
    // we could shift the excess bits into a new number in the opposite direction