// https://leetcode.com/problems/maximum-product-of-three-numbers/
// tags: easy

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    // this is essentially asking to find the three largest numbers in an array
    // and then multiply the results together

    // the examples don't make this clear, but the question doesn't specify that the three numbers need to be sibling array elements

    // a brute force solution would simply be to find the largest element in the array 3 times
    // which would be an O(3n) solution

    // perform search 3 times
    const maxNums = [-Infinity, -Infinity, -Infinity];

    for (let [index, maxNum] of maxNums.entries()) {
        let maxPos = -1;

        for (const [i, num] of nums.entries()) {
            if (num > maxNum) {
                maxNum = num;
                maxPos = i;
            }
        }

        // remove number from original array
        nums[maxPos] = -Infinity;
        // set new maxNum
        maxNums[index] = maxNum;
    }

    // multiply maxNums together to get product
    return maxNums[0] * maxNums[1] * maxNums[2];

    // TODO: doesn't pass all cases because 2 negative numbers with greater absolute value can multiply into greater product
    // however we also can't solely use the absolute values, as 1 or 3 negative numbers would loop back into being negative
};