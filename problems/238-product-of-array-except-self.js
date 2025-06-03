// https://leetcode.com/problems/product-of-array-except-self/
// tags: medium, leetle, arrays

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const size = nums.length;

    // cumulative prefix product (i.e. start -> end)
    const prefixProduct = new Map();
    prefixProduct.set(0, nums[0])

    // we can ignore the last index
    for (let i = 1; i < size - 1; i++) {
        // cumulative prefix product
        prefixProduct.set(i, prefixProduct.get(i-1) * nums[i]);
    }

    // cumulative suffix product (i.e. end -> start)
    const suffixProduct = new Map();
    suffixProduct.set(size-1, nums[size-1])

    // we can ignore the last index
    for (let i = size - 2; i > 0; i--) {
        suffixProduct.set(i, suffixProduct.get(i+1) * nums[i]);
    }

    // calculate total sum
    const answers = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
        switch (i) {
            case 0:
                // no prefix (nothing on the left)
                // i.e. only suffixProduct
                answers[i] = suffixProduct.get(i+1)

                break;
            case size-1:
                // no suffix (nothing on the right)
                // i.e. only prefixProduct
                answers[i] = prefixProduct.get(i - 1);

                break;
            default:
                // suffix * prefix = product excluding [i]
                answers[i] = prefixProduct.get(i - 1) * suffixProduct.get(i + 1);

                break;
        }
    }

    return answers;

    // 79 ms / beats 5.01%
    // not sure why this is performing so badly, let's do some optimisation
};

// given integer array `nums`, return an array `answer` such that `answer[i]` = product of all elements of `nums` except `nums[i]`

// constraints:
    // algorithim must run in O(n) time and **without using the division operator**
    // product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer
    // 2 <= nums.length <= 10^5
    // -30 <= nums[i] <= 30

// EXAMPLE: nums = [1,2,3,4]
// OUTPUT: [24,12,8,6]
    // 24 = 2 * 3 * 4
    // 12 = 1 * 3 * 4
    //  8 = 1 * 2 * 4
    //  6 = 1 * 2 * 3


// as we can't use division, we need to calculate
    // product of the suffix (i.e. anything to the left of nums[i])
    // product of the prefix (i.e. anything to the right of nums[i])
// i.e. answer[i] = prefixProduct(0,i-1) * suffixProduct(i+1, nums.length)

// so this seems like a prefix sum (or rather prefix *product*) approach
    // let's try storing the products within a HashMap

// e.g. for the example nums = [1,2,3,4]
    // (2 * 3 * 4) = suffixProduct[0]
    // 1 * (3 * 4) = prefixProduct[1] * suffixProduct[1]
    // 1 * 2 * (4) = prefixProduct[2] * suffixProduct[2]
    // 1 * 2 * 3 = prefixProduct[3]
