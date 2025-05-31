// https://leetcode.com/problems/range-sum-query-immutable/
// tags: easy, arrays, prefix sum

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    // instantiate prefixSum array - first element has nothing to be summed with
    this.prefixSum = [nums[0]];

    for (let i = 1; i < nums.length; i++) {
        // calculate cumulative sum
        this.prefixSum.push(nums[i] + this.prefixSum[i-1]);
    }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    // sum (left,right) = sum(0,right) - sum(0,left)
    return this.prefixSum[right] - this.prefixSum[left];

    // TODO: this fails for provided test case as we are not making it *inclusive* of provided indicies
};


// given integer array `nums` handle multiple queries to:
    // calculate *sum* of elements between indicies `left` and `right` (inclusive)
// implement the NumArray class


// constraint:
    // 1 <= nums.length <= 10^4
        // i.e. nums is never empty
    // -10^5 <= nums[i] <= 10^5
        // i.e. values can be positive or negative
    // 0 <= left <= right < nums.length
        // i.e. left is always before right


// I know from other problems that we're doing a prefix sum solution here
    // this is confirmed by the left pointer always being less than the right pointer,
    // and the use of negative & positive values (though it does not seem like sliding window would apply here otherwise)
// this means within the constructor of our NumArray class we should calculate the cumulative sum at each index

// EXAMPLES:
    // NumArray.sumRange(2,5) is equivalent to: NumArray.sumRange(0,5) - NumArray.sumRange(0,2)