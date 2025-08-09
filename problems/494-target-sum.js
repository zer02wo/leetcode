// https://leetcode.com/problems/target-sum/
// tags: medium, array

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {

};

// given array of integers and an integer target
// build an *expression* out of nums by adding one of the symbols '+' and '-' before each integer, then concatenate them all.
    // e.g. nums = [2, 1] :: add '+' before 2 and '-' before 1, resulting expression is '+2-1'
// return the number of different expressions that you can build which evaluates to target

// EXAMPLE: nums = [1,1,1,1,1], target = 3
// OUTPUT: 5
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3

// EXAMPLE: nums = [1], target = 1
// OUTPUT: 1

// constraints:
    // 1 <= nums.length <= 20
    // 0 <= nums[i] <= 1000
    // 0 <= sum(nums[i]) <= 1000
    // -1000 <= target <= 1000

// intuition: recursion/backtracking
    // given that we need to generate all possible combinations ("expressions")
    // if we only needed a single combination/validity check, maybe could be simpler
// if we were to purposefully try to reach the target:
    // i.e. subtract when above the target, add when below the target
    // we would miss out on possible combinations
// this means for every element we need to create two branches:
    // 1. add current number to expression
    // 2. subtract current number from expression
// we still only return the valid branches
    // however we cannot early return, due to the fact we're using positive *and* negative numbers
    // and we need to use all of the numbers in the array
// we will need a recursive helper function with arguments:
    // expression (string or array)
    // index for input array
    // remaining target / cumulative total

// EXAMPLE DECISION TREE: nums = [2,1,3], target = 4
    // left branch prioritise add, right branch prioritise subtract
//              +2                              -2
//     +2+1            +2-1            -2+1            -2-1
// +2+1+3 +2+1-3   +2-1+3 +2-1-3   -2+1+3 -2+1-3   -2-1+3 -2-1-3

// +2+1+3 = 6
// +2+1-3 = 0
// +2-1+3 = 4 !!
// +2-1-3 =-2
// -2+1+3 = 2
// -2+1-3 =-4
// -2-1+3 = 0
// -2-1-3 =-6

// OUTPUT = ['+2-1+3']