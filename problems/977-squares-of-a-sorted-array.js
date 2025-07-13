// https://leetcode.com/problems/squares-of-a-sorted-array/
// tags: easy, array, two pointers

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {

};

// given integer array `nums` sorted in ascending (""non-decreasing"") order
    // reurn array of the squares of each number, sorted in non-decreasing order

// EXAMPLE: [-4,-1,0,3,10]
// OUTPUT: [0,1,9,16,100]
    // squared: [16,1,0,9,100]
    // sort to get output above

// the inclusion of negative numbers is the challenge in this problem:
    // i.e. in the example above, we cannot just do an O(n) operation because -4^2 > 3^2
// we could re-sort the array by *absolute* value
// or we could sort the output array in ascending order
    // but these options take time complexity from O(n) to O(n log n)

// intuition: use two pointers approach
    // first pointer represents the smallest *positive* number
    // second pointer represents the smallest *negative* number
    // compare pointers absolute values and choose the smallest one
    // i.e. work in -> out instead of start -> end
// HOWEVER: we would require an O(n) operation to find these initial points
// ADJUSTMENT: swap two pointers to work *inwards*
    // first pointer represents the largest magnitude *negative* number
        // i.e. nums[0], if it is negative
    // second pointer represents the largest magnitude *positive* number
        // i.e. nums[nums.length - 1], if it is positive
    // compare pointers absolute values and choose the largest one
    // i.e. work out -> in, instead of in -> out (or start -> end)
// we would either need to unshift() to front of array or reverse at end in this scenario