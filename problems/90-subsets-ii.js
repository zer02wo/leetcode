// https://leetcode.com/problems/subsets-ii/
// tags: medium, array

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {

};

// given integer array `nums` that *may contain duplicates*
    // return the power set: all possible subsets
    // solution can be returned in any order but *must not contain duplicate subsets*

// EXAMPLE: nums = [1,2,2]
// OUTPUT: [[],[1],[1,2],[1,2,2],[2],[2,2]]

// EXAMPLE: nums = [0]
// OUTPUT: [[],[0]]

// intuition: recursion/backtracking
    // obviously building upon Subsets I from leetcode #78
// brute force: use a Set to keep the output
    // this would be the simplest way to remove duplicates from the output
    // but is there a smarter way to do this?