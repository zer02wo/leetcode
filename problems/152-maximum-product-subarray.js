// https://leetcode.com/problems/maximum-product-subarray/
// tags: medium, array, dynamic programming

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    // referenced solution: https://leetcode.com/problems/maximum-product-subarray/solutions/4142979/kadane-maximum-product-algorithm/

    // keep reference to (local) maximum and minimum products
    // these can be swapped depending on the number of negative numbers in input array
    let maxProduct = nums[0];
    let minProduct = nums[0];
    // keep reference to global maximum product, i.e. final output
    let globalMaxProduct = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];

        // modified Kadane's algorithm(?)
        if (num < 0) {
            // swap maximum/minimum pointers on sign change (handles odd/even number of negative numbers)
            // e.g. +max * neg = min, -min * neg = max
            [maxProduct, minProduct] = [minProduct, maxProduct];
        }

        // reset max product if current number is greater (e.g. stuck at 0)
        maxProduct = Math.max(num, maxProduct * num);
        // reset min product if current number is lesser (e.g. stuck at 0)
        minProduct = Math.min(num, minProduct * num);

        globalMaxProduct = Math.max(globalMaxProduct, maxProduct);
    }

    // maximum product found via either condition/pointer methods
    return globalMaxProduct;

    // 5 ms / beats 37.44%
    // (I see same solution recorded at 2ms not sure why mine is worse)

    // O(n) time complexity
        // single loop through nums
    // O(1) space complexity
        // no dynamically sized data structures
        // only requires 3 integer variables

    // it would be hard to recognise this as Kadane's algorithm, even if it is similar layout
    // I was working along the right lines with my solution but I don't know if I would've gotten to this solution without a hint
};

var maxProductKadaneModifiedBad = function(nums) {
    let curProduct = 1;
    let curProductNoNeg = 1;
    let maxProduct = nums[0];
    let maxProductNoNeg = nums[0];

    for (const num of nums) {
        // modified Kadane's algorithm
        // reset "sliding window" when current product === 0 (because anything * 0 = 0)
        if (curProduct === 0) {
            curProduct = 1;
        }

        // modified Kadane's algorithm, second pointer
        // reset "sliding window" when current product <= 0 (to handle an odd number of negative numbers in nums)
            // e.g. handles test case [3,-1,4], as it will reset after -1 to return [4]
        if (curProductNoNeg <= 0) {
            curProductNoNeg = 1;
        }

        // add current number to "sliding window" (subarray)
        curProduct *= num;
        curProductNoNeg *= num;
        // keep reference to maximum product seen
        maxProduct = Math.max(maxProduct, curProduct);
        maxProductNoNeg = Math.max(maxProductNoNeg, curProductNoNeg);
    }

    // maximum product found via either condition/pointer methods
    return Math.max(maxProduct, maxProductNoNeg);

    // TODO: fails for test case nums = [2,-5,-2,-4,3]
        // OUTPUT: 20 [2,-5,-2]
        // EXPECTED: 24 [-2,-4,3]
    // the second pointer I've added is too simple to handle these cases
        // what about if we kept reference to a *minimum* product in the hopes of finding an additional negative value to turn this positive again?
};

// given an integer array nums, find a subarray that has the largest product and return that largest product
    // subarray: contiguous non-empty sequence of elements within an array

// EXAMPLE: nums = [2,3,-2,4]
// OUTPUT: 6
    // [2,3]

// EXAMPLE: nums = [-2,0,-1]
// OUTPUT: 0
    // all subarrays with length > 1 include `0` which mean the product == 0
    // all individual subarrays are negative, except [0]
    // so in this scenario [-2,0,-1] and [0] both return the same answer == 0

// EXAMPLE: nums = [3,-4,-5,-6]
// OUTPUT: 60
    // 3 * -4 * -5 === 3 * 4 * 5 = 60
    // i.e. two negatives multiplied cancel out, e.g. -5 * -6 = 30
        // including -4 would return this to being negative: -120

// constraints:
    // 1 <= nums.length <= 2 * 10^4
    // -10 <= nums[i] <= 10
    // product of subarray nums guaranteed to fit in 32-bit integer

// INTUITION: product rules to be aware of
    // an equal number of negative numbers will create a positive product (e.g. -4 * -5 = +30)
        // an odd number of negative numbers will create a negative product (e.g. -4 * -5 * -6 = -120)
    // any product multiplied by 0 == 0 (e.g. 10 * 10 = 100, 10 * 10 * 0 = 0)
// it may be that these properties of multiplication aren't used for a solution and we keep a similar algorithm to:
    // leetcode #53 maximum subarray
// Kadane's algorithm dictated that the "sliding window" is reset (previously to 0 for sum, 1 in this case for product)
    // if (current <= 0), but think of the scenario: nums = [-10,-10,2,3]
    // in this instance the negative values would be ignored and return 6 [2 * 3] as the answer
        // but 600 [-10 * 10 * 2 * 3] is the actual answer
    // so instead we could see if a modified condition of (current === 0) works,
        // but this likely won't work for an odd number of negative numbers
// ... after first approach/attempt we found it failed for test case: nums = [3,-1,4]
    // as stated above this modified Kadane's algorithm wasn't able to handle an odd number of negatives
    // attempted to resolve by adding a second pointer that *doesn't* allow any negatives for this scenario
        // e.g. when this second pointer <= 0, reset to 1
    // but this still fails for more complex test cases e.g. nums = [2,-5,-2,-4,3]
