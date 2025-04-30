// https://leetcode.com/problems/maximum-product-of-three-numbers/
// tags: easy

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    // that problematic case with brute force will make it easier to just solve in a more efficient way
    // sorting the array will let us easily get access to the numbers of greatest magnitudes
        // i.e. biggest negative number at nums[0] and biggest positive number at nums[n] (for example)

    const sortedNums = nums.sort((a, b) => (a - b));
    const length = sortedNums.length;

    const maxAllSame = sortedNums[length-1] * sortedNums[length-2] * sortedNums[length-3];

    if (sortedNums[0] >= 0 && sortedNums[length-1] >= 0) {
        // all numbers are positive, get product of last 3 elements
            // i.e. the largest positive numbers, for the largest positive result
        return maxAllSame;
    }

    if (sortedNums[0] < 0 && sortedNums[length-1] < 0) {
        // all numbers are negative, get product of last 3 elements
            // i.e. the smallest negative numbers, for the smallest (absolute) negative result
        return maxAllSame;
    }

    // TODO: What happens if there are a mix of positive and negative?
        // compare the product of nums[0] * nums[1] * nums[n-1] (assuming at least 2 negative numbers and one positive number)
        // with nums[n-1] * nums[n-2] * nums[n-3]

    // greedy assumption for 2 negative and 1 positive
    const maxGreedyNegPos = sortedNums[0] * sortedNums[1] * sortedNums[length-1];

    return Math.max(maxGreedyNegPos, maxAllSame);

    // time complexity will be as fast as the sorting algorithm, i.e. O(n log n)
    // space complexity is constant / O(1)
    // 38 ms / beats 52.17%
}

var maximumProductBruteForceAttempt = function(nums) {
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