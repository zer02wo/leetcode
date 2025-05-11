// https://leetcode.com/problems/number-of-1-bits/
// tags: easy, leetle

/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    let setBits = 0;

    // I vaguely remember converting between bases requires the use of division/modulo
        // ... figured it out pretty quick
    while (n > 0) {
        // because we are in binary, remainder will only be 1 or 0 (truthy/falsy)
        if (n % 2) {
            setBits++;
        }

        n = Math.floor(n / 2);
    }

    return setBits;

    // 1 ms / beats 31.78% (first run)
    // 0 ms / beats 100.0% (second run)
    // TODO: There's probably a bitwise operation that works here as well
        // obviously this is already fast enough, but interested to learn
        // because we're working with numbers from 1 to 2^31 - 1, that means 32 bits
};

// Following solutions were identified using hints & ideas from other people's solutions:
var hammingWeightBitwise = function(n) {
    let setBits = 0;

    // shifting the rightmost bit by 1, is effectively equivalent to / 2
        // e.g. 11 >> 1 = 5, 5 >> 1 = 2
            // i.e. 1101 >> 1 = 0101, 0101 >> 1 = 0010
    // using bitwise AND (&) will allow us to check for set bits
        // by always performing the bitwise AND with 1, we are comparing the rightmost bit

    // 32 iterations for the 32 possible bits
    for (let i = 0; i < 32; i++) {
        // returns 1 if the rightmost digit for the loop is a set bit (1), else 0
        setBits += (n >> i) & 1;
    }

    return setBits;

    // 0 ms / beats 100%
    // TODO: in theory this would result in more iterations for smaller numbers
        // e.g. '11' only requires 4 iterations for my method, rather than 32
};

var hammingWeightBitwiseAlt = function(n) {
    let setBits = 0;

    while (n > 0) {
        // compare the rightmost bit
        setBits += n & 1;

        // right bitshift: set the new rightmost bit to be the second-rightmost bit
        n = n >> 1;
    }

    return setBits;

    // 0 ms / beats 100%
    // TODO: this solution is very similar to my original solution, but using bitwise operations instead of mathematical
        // I imagine this would be more effective in lower level languages than JS
};

// Objective: take a base 10 number and count the number of set bits in its binary representation
    // I.e. how many 1's in a binary number
    // E.g. 11 = 1011, 3 set bits
    // E.g. 128 = 10000000, 1 set bit
// Approach: I see two parts:
    // 1. Convert the base 10 number to binary
    // 2. Count the instances of 1 in the binary
// It seems very possible to do both parts together

// Example base conversions (to refresh my memory):
    // 11 / 2 = 5 r 1
    // 5 / 2 = 2 r  1
    // 2 / 2 = 1 r  0
    // 1 / 2 = 0 r  1

    // 128 / 2 = 64 r   0
    // 64 / 2 = 32 r    0
    // 32 / 2 = 16 r    0
    // 16 / 2 = 8 r     0
    // 8 / 2 = 4 r      0
    // 4 / 2 = 2 r      0
    // 2 / 2 = 1 r      0
    // 1 / 2 = 0 r      1