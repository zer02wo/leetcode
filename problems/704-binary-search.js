// https://leetcode.com/problems/binary-search/
// tags: easy, array, binary search

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

};

// given array of integers nums sorted in ascending order, and integer target
// write a function to search target in nums
    // if target exists, return index, else return -1
// algorithm must run in O(log n) time complexity

// EXAMPLE: nums = [-1,0,3,5,9,12], target = 9
// OUTPUT: 4
    // [9] exists at index 4

// "intuition": this is a binary search question
// implement binary search:
    // search space is already sorted
    // set lower and upper bounds
    // find the midpoint value
        // if midpoint is less than target, set lower bound = midpoint
        // if midpoint is greater than target, set upper bound = midpoint
            // i.e. constrain search space to half the remaining elements
    // continue until bounds are equal/pass, or target found at midpoint