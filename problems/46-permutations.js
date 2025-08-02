// https://leetcode.com/problems/permutations/
// tags: medium, array

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {

};

// given array of distinct integers `nums`
    // return all possible permutations: rearrangement of the elements in an array
    // return answer in any order

// EXAMPLE: nums = [1,2,3]
// OUTPUT: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// EXAMPLE: nums = [0,1]
// OUTPUT: [[0,1],[1,0]]

// EXAMPLE: nums = [1]
// OUTPUT: [[1]]

// intuition: recursion/backtracking
    // similiar to leetcode #78 and leetcode #784
    // we're generating all permutations which means branching out all possibilities
// in this problem it seems like the time complexity is going to be even higher
    // i.e. at each element we need to create a branch for every other element
// a decision tree helped with a previous problem, so lets make one here for nums = [1,2,3]
//                             []
//         [1]                 [2]                 [3]
//     [1,2] [1,3]         [2,1] [2,3]         [3,1] [3,2]
// [1,2,3]     [1,3,2] [2,1,3]     [2,3,1] [3,1,2]     [3,2,1]

// so there the decisions actually reduce as the depth of the tree increases
    // as there are less elements that could be possibly used

// my thought is to keep a Set of the used elements to prevent duplicates (as we have unique integers in input array)
    // loop through the input array and create branches for every other element