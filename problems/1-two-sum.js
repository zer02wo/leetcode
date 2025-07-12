// https://leetcode.com/problems/two-sum/
// tags: easy, array

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {

};

// given array of integers `nums` and an integer `target`:
    // return *indicies* of two numbers such that they add up to `target`.
// assume each input has *exactly one solution*, cannot use same element twice
    // can return answer in any order

// EXAMPLE: nums = [2,7,11,15], target = 9
// OUTPUT: [0,1]
    // nums[0] + nums[1] = 2 + 7

// EXAMPLE nums [3,2,4], target = 6
// OUTPUT [1,2]
    // nums[1] + nums[2] = 2 + 4

// constraints:
    // 2 <= nums.length <= 10^4
    // -10^9 <= nums[i] <= 10^9
    // -10^9 <= target <= 10^9
    // only one valid answer exists

// an O(n^2) time complexity / brute force solution would be pretty simple:
    // outer loop through array `nums` from i
        // inner loop through array `nums` from i+1 (j)
            // check if nums[i] + nums[j] === target

// the problem also suggests coming up with improved over O(n^2)
    // but nothing is immediately coming to mind
    // start with brute force and see if that jogs any ideas