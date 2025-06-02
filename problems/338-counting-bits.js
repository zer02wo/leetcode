// https://leetcode.com/problems/counting-bits/
// tags: easy, bit manipulation, dynamic programming

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const dp = new Array(n+1).fill(0);
    let offset = 1;

    for (let i = 1; i <= n; i++) {
        // new most significant bit discovered
        if (offset * 2 === i) {
            // increase offset
            offset = i;
        }

        // dp[i-offset] gives us the number of set bits for a value we've already calculated.
        // +1 here is representing the most significant bit,
        // as we have already handled case 0 separately
        dp[i] = dp[i-offset] + 1;
    }

    return dp;

    // O(n) solution, dynamic programming
    // 0 ms / beats 100%

    // struggled a lot with this one, not great at dynamic programming problems
    // I also convinced myself at some point we were being given an unsorted array instead of a peak element
        // (which is essentially used like a sorted array of consecutive numbers)
        // this made it even more difficult on myself
}

var countBitsBruteForce = function(n) {
    const output = [0];

    for (let i = 1; i <= n; i++) {
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

// it's obvious that we're doing repeated work calculating smaller binary numbers
    // i.e. 7 = 0111
        // 7 = 4 + 2 + 1
        // :: 0100 + 0010 + 0001
    // but how can we use this?
// NOTE: had to look up a solution as this wasn't clicking after a long day.
    // similar to what I noted earlier we need to recognise the relationship between significant bits & powers of 2
    // 0 & 1 are represented by 1 bit (2^0)
    // 2 & 3 are represented by 2 bits (2^1)
    // 4 > 7 are represented by 3 bits (2^2)
    // 8 > 15    represented by 4 bits (2^3)
    // 16 ... etc (2^4)

    // we create an *OFFSET* based on the most significant bit (highest power of 2 >= n)
        // e.g. 8 = 1000, equivalent to 000 ignoring most significant bit (MSB)
            // i.e. 8 - 8 = 0
        // e.g. 9 = 1001, equivalent to 001 ignoring MSB
            // i.e. 9 - 8 = 1
        // e.g. 10= 1010, equivalent to 010 ignoring MSB
            // i.e. 10 - 8 = 2
        // e.g. 11= 1011, equivalent to 011 ignoring MSB
            // i.e. 11 - 8 = 3
        // e.g. 12= 1100, equivalent to 100 ignoring MSB
            // i.e. 12 - 8 = 4 .. 4 - 4 = 0 (00)
        // e.g. 13= 1101, equivalent to 101 ignoring MSB
            // i.e. 13 - 8 = 5 .. 5 - 4 = 1 (01)
        // e.g. 14= 1110, equivalent to 110 ignoring MSB
            // i.e. 14 - 8 = 6 .. 6 - 4 = 2 (10)
        // e.g. 15= 1111, equivalent to 110 ignoring MSB
            // i.e. 15 - 8 = 7 .. 7 - 4 = 3 (11)
        // etc.
