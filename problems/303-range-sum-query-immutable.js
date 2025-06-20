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
    // when left = 0
    if (left === 0) {
        // sum (left,right) = sum(0,right)
        // i.e. there is no previous value to subtract
        return this.prefixSum[right];
    }

    // sum (left,right) = sum(0,right) - sum(0,left)
        // because we want to be *inclusive* of the left index,
        // we need to subtract the cumulative sum up to the *previous* index
    return this.prefixSum[right] - this.prefixSum[left - 1];

    // 8 ms / beats 45.34% (first run)
    // 8 ms / beats 45.34% (second run)
    // 5 ms / beats 86.22% (third run)
        // without the prefix sum approach, *each instance* of calling sumRange() would be an O(n) operation
        // however, due to the precomputation of prefix sum we perform sumRange() as a constant time O(1) operation
            // i.e. at most 2 array lookups and a mathematical subtraction
        // the original precomputation/constructor is still an O(n) operation
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

// EXAMPLE: [0,1,2,3,4,5]
    // NumArray.sumRange(2,5) is equivalent to: NumArray.sumRange(0,5) - NumArray.sumRange(0,2)
        // i.e. [0+1+2+3+4+5] - [0+1] = [2+3+4+5] :: which is equivalent to range (2,5)
    // NOTE: because we want to be inclusive of left index (2), we cannot subtract this from the sum
        // so this is more accurately: NumArray.sumRange(0,5) - NumArray.sumRange(0,(2-1))



// revisiting problem:

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 *
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    // cumulative sum so far
    let totSum = nums[0];

    // initialise to 0th element, as cannot be summed with anything yet
    this.prefixSum = [totSum];

    // calculate cumulative sum at each index
    for (let i = 1; i < nums.length; i++) {
        totSum += nums[i];
        this.prefixSum.push(totSum);
    }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    // account for 0th left index
        // i.e. there is no previous index to be inclusive of, so we subtract nothing
    if (left === 0) {
        return this.prefixSum[right];
    }

    // sumRange(l,r) = sumRange(0,r) - sumRange(0,l-1)
    return this.prefixSum[right] - this.prefixSum[left - 1];

    // 7 ms / beats 56.44%

    // NumArray constructor is an O(n) operation
    // each subsequent call of NumArray.sumRange() is O(1)
        // without the PrefixSum it would be O(n) to calculate sumRange() each time
};

// the fundamental intuition/principal of this problem is that:
    // sumRange(i,j) = sumRange(0,j) - sumRange(0,i-1)
        // i-1 because we want to be inclusive of i
// i.e. PrefixSum: calculate the cumulative sum from 0 to i

// EXAMPLE: [-2,0,3,-5,2,-1]
// sumRange(2,5) = [3+(-5)+2+(-1)] =            -1
    // sumRange(0,1) = [(-2)+0] =               -2
    // sumRange(0,5) = [(-2)+0+3+(-5)+2+(-1)] = -3

    // therefore: -3 - (-2) = -3 + 2 = -1