// https://leetcode.com/problems/product-of-array-except-self/
// tags: medium, leetle, arrays, prefix sum

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let size = nums.length;
    let answers = new Array(size).fill(1);

    let prefixProduct = 1;
    let suffixProduct = 1;

    for (let i = 0; i < size; i++) {
        answers[i] *= prefixProduct;
        prefixProduct *= nums[i];

        let indexFromEnd = size - 1 - i;
        answers[indexFromEnd] *= suffixProduct;
        suffixProduct *= nums[indexFromEnd];
    }

    return answers;

    // 1 ms / beats 99.28%
    // this is an incredibly efficient approach,
    // condenses previous approach into a single loop with opposite pointers
}

var productExceptSelfTwoPasses = function(nums) {
    let size = nums.length;
    let answers = new Array(size).fill(1);

    // "prefix" pass (start -> end)
    let prefixProduct = 1;
    for (let i = 0; i < size; i++) {
        answers[i] = prefixProduct;
        prefixProduct *= nums[i]; // recalculate product after passing index
    }

    // "suffix" pass (end -> start)
    let suffixProduct = 1;
    for (let i = size - 1; i >= 0; i--) {
        answers[i] *= suffixProduct; // multiply by existing prefixProduct pass
        suffixProduct *= nums[i]; // recalculate product after passing index
    }

    return answers;

    // 5 ms / beats 78.14%
    // I can understand this using less memory than my solution,
    // but I'm not sure why it's so much slower consider they both use 2 iterations
}

var productExceptSelfMapSuffixSum = function(nums) {
    const size = nums.length - 1;

    // cumulative suffix product (i.e. end -> start)
    const suffixProduct = new Map();
    suffixProduct.set(size, nums[size]);
    let currentSuffixProduct = nums[size];

    for (let i = size-1; i > 0; i--) {
        // cumulative suffix product
        currentSuffixProduct *= nums[i];
        suffixProduct.set(i, currentSuffixProduct);
    }

    // calculate total product
    const answers = new Array(size + 1).fill(0);
    // calculate prefixProduct as we go
    let prefixProduct = 1;

    for (let i = 0; i <= size; i++) {
        switch (i) {
            case 0:
                // no prefix (nothing on the left)
                // i.e. only suffixProduct
                answers[i] = suffixProduct.get(i+1);

                break;
            case size:
                // calculate prefixProduct one last time
                prefixProduct *= nums[i-1];

                // no suffix (nothing on the right)
                // i.e. only prefixProduct
                answers[i] = prefixProduct;

                break;
            default:
                // calculate prefixProduct as we go
                prefixProduct *= nums[i-1];
                // suffix * prefix = product excluding [i]
                answers[i] = prefixProduct * suffixProduct.get(i + 1);

                break;
        }
    }

    return answers;

    // 74 ms / beats 5.01% (ORIGINAL 3 loops)
    // 34 ms / beats 10.08% (IMPROVEMENT1: 2 loops)
    // 28 ms / beats 13.06% (IMPROVEMENT2: 2 loops + cumulative suffix product)
    // not sure why this is performing so badly, let's do some optimisation
        // IMPROVEMENT1: removed additional HashMap/loop to calculate prefixProduct earlier
        // IMPROVEMENT2: replaced calls to suffixPrefix.get() with a cumulative product variable `currentSuffixProduct`
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



// REVISITING PROBLEM:
// intuition: to exclude nums[i] you need nums[0->(i-1)] * nums[(i+1)->n]
    // therefore we need a PrefixSum and SuffixSum (*Product, but Sum is the pattern term typically used)
    // this is slightly given away within the question:
        // "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums)
{
    // array size
    const n = nums.length - 1;
    // current cumulative product for numbers [0->n]
    let prefixProduct = 1;
    // current cumulative product for numbers [n->0]
    let suffixProduct = 1;
    // prefill array to make prefix/suffix assignment easier
        // use value `1` to allow multiplicative assignment
    const answer = new Array(n+1).fill(1);

    for (let i = 0; i <= n; i++) {
        // push "previous" prefix product to current index (i.e. excluding current index)
        answer[i] *= prefixProduct;
        // calculate prefix product including current index
        prefixProduct *= nums[i];

        // push "previous" suffix product to current reverse index (i.e. excluding current relative index from end)
        answer[n-i] *= suffixProduct;
        // calculate suffix product including current reverse index
        suffixProduct *= nums[n-i];
    }

    return answer;

    // 4 ms / beats 87.5%
    // O(n) time complexity, O(n) space complexity
    // to be a bit more intuitive/readable, this could be done in two loops/passes:
        // first loop sets prefixProduct at each index
        // second loop sets suffixProduct at each index
    // I do like this pattern a lot though, this is a good question
};