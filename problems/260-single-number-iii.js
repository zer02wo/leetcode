// https://leetcode.com/problems/single-number-iii/
// tags: medium, bit manipulation

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
    let xorResult = 0;

    // first pass of XOR
        // XOR(c,c) = 0
            // i.e. duplicate values cancel out
        // XOR(a,b) = ?
            // this will be the remainder from this operation
    for (const num of nums) {
        xorResult ^= num;
    }

    let mask = 1;
    // find rightmost bit with a 1 (i.e. where the XOR(a,b) is different)
    while (!(xorResult & mask)) {
        // not found, shift bit to the left
        mask <<= 1;
    }

    // number where mask position == 1
    let a = 0;
    // number where mask position == 0
    let b = 0

    // second pass of XOR
    for (const num of nums) {
        // any duplicate values get filtered out by XOR assignment
        if (num & mask) {
            // matches the mask bit
            a ^= num;
        } else {
            // does not match the mask bit
            b ^= num;
        }
    }

    return [a,b];

    // O(n) runtime complexity, O(1) space complexity
    // 4 ms / beats 62.44%
    // I wouldn't have thought of using a second XOR to separate the numbers
    // but I did get the first half and intuit needing to differentiate the numbers via a 1 bit in the XOR result
};

// in array `nums` find exactly two elements that only appear once
    // all other elements appear exactly twice

// EXAMPLE: nums = [1,2,1,3,2,5]
// OUTPUT [3,5]
    // [5,3] is also valid

// constraints:
    // algorithim must run in linear runtime O(n) and only use constant extra space O(1)
    // 2 <= nums.length <= 3 * 10^4
        // i.e. no empty/invalid cases need to be checked
    // -2^31 <= nums[i] <= (2^31) - 1
        // i.e. 32 bit signed integer
    // each integer in nums appears exactly twice
        // except for two integers that each appear only once

// clearly a sequel to 136-single-number
// but what trivalised that question was XOR cancelling out all the other bits
    // e.g. 1 ^ 2 ^ 1 ^ (3) ^ 2 = 3
// however here, using the same method will result in a different number
    // e.g. 1 ^ 2 ^ 1 ^ (3) ^ 2 ^ (5) = 6
    // i.e. 011 ^ 101 = 110
// so there are too many combinations of numbers to consider
    // e.g. (11^13) 1011 ^ 1101 = 110
// so how can we reverse this?

// due to XOR, we know that wherever there is a 1, the two numbers were different
    // thus one number requires a '1' in that position and the other requires a '0'
// iterate through nums again using this bit to check if numbers are different to separate them
    // how do we ignore the duplicates?
        // EDIT: had to get a hint, but we can just XOR again,
        // as this will remove any duplicates as original