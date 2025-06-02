// https://leetcode.com/problems/counting-bits/
// tags: easy, bit manipulation

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    let output = [];

    for (let i = 0; i <= n; i++) {
        let num = i;
        let setBits = 0;

        // repeatedly divide by 2 (i.e. the base of binary) to calculate number of set bits
        while (num > 0) {
            if (num % 2) {
                setBits++;
            }

            num = Math.floor(num / 2);
        }

        output.push(setBits);
    }

    return output;

    // O(nlogn) solution, brute force
    // 12 ms / beats 28.87%
    // TODO: how can we do this in linear time O(n)?
};

// given integer n, return array for the number of set bits (1's) in the binary representation of i in: 0 <= i <= n

// EXAMPLE: n = 5
// OUTPUT: [0,1,1,2,1,2]
    // i=0, 0   = 0
    // i=1, 1   = 1
    // i=2, 10  = 1
    // i=3, 11  = 2
    // i=4, 100 = 1
    // i=5, 101 = 2

// as seen in example for n = 5, number of set bits can decrease when going from a number represented by 2 bits to 3 bits
    // is there a way to generalise this pattern?
    // max num for bits = 2^n - 1
        // e.g. 1 bit = 2^1 - 1 = 1 (  1)
        // e.g. 2 bits= 2^2 - 1 = 3 ( 11)
        // e.g. 3 bits= 2^3 - 1 = 7 (111)
        // etc.

// we know that the rightmost/least significant bit will determine odd/even

// I'm not seeing an obvious pattern to reduce this from brute force, so let's just implement that first
    // for 0 .. n
        // convert to binary / count number of 1 bits
            // I normally do this by modulo/division
        // push to output array
