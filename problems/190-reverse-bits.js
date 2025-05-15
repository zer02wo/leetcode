// https://leetcode.com/problems/reverse-bits/description/
// tags: easy, leetle

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let output = 0;

    // keep count of how many trailing 0's when n = 0
    let remainingBits = 32;

    // repeatedly shift rightmost bit until n = 0
    while (n > 0) {
        // get rightmost bit (via AND)
        let rightBit = n & 1;
        // shift left to make space for new rightmost bit
        output <<= 1;
        // assign new rightmost bit (via OR)
        output |= rightBit;

        // shift n right by 1 bit
        n >>>= 1;
        // reduce remaining bits count
        remainingBits--;
    }

    // shift the output by the number of remaining bits (i.e. the number of 0's left in n at the end)
        // allows us to not need to do a full 32 iterations (i.e. one for each bit)
            // i.e. at maximum this is O(32) = O(1) time complexity, and of course O(1) space complexity
    // NOTE: the `>>> 0` is to ensure we're returning an *unsigned* integer due to the leftshift making this ambigious (2's complement)
    return (output << remainingBits) >>> 0;

    // 42 ms / beats 80.25%
    // happy enough with this, I'm not great at bit manipulation considering how infrequently I use it on a daily basis
};

// reverse 32-bit unsigned integer
// example: n = 00000010100101000001111010011100
    // output = 964176192 (00111001011110000010100101000000)

// bit manipulation is obviously the name of the game here
    // first thought was maybe some kind of XOR / OR trick, but I don't think that's possible

    // so bit shifting seems like the next idea to review
        // but how do we loop bits back to the start?
    // we could shift the excess bits into a new number in the opposite direction