// https://leetcode.com/problems/longest-consecutive-sequence/
// tags: medium, array

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {

};

// given unsorted integer array `nums`
    // return the length of the longest consecutive elements sequence
// must write an algorithm that runs in O(n) time

// EXAMPLE: nums = [100,4,200,1,3,2]
// OUTPUT: 4
    // [1,2,3,4] = length of 4

// EXAMPLE: nums = [0,3,7,2,5,8,4,6,0,1]
// OUTPUT: 9
    // [0,1,2,3,4,5,6,7,8] = length of 9
    // all numbers are present, but necessarily in that order

// EXAMPLE: nums = [1,0,1,2]
// OUTPUT: 3
    // [0,1,2]
    // duplicate 1 is not considered consecutive

// constraints:
    // 0 <= nums.length <= 10^5
    // -10^5 <= nums[i] <= 10^5

// solving this problem in O(n log n) would be trivial with sorting, i.e.
    // sort the array
    // keep a maximum consecutive count
    // keep a local/current consecutive count
    // iterate through the sorted array
        // if nums[i-1] === nums[i] - 1
            // increment consecutive count
            // Math.max to check if current/local count greater than current maximum
        // else if nums[i-1] === nums[i]
            // skip over duplicate
        // else reset local/current count

// solving this problem in O(n) is trickier
    // we can define a Set of the integers from nums to allow for O(1) lookups
        // this would be an O(n) operation
    // we can then check for each (non-duplicate) number in nums (i.e. O(n) loop)
        // does nums[i-1] exist in the Set
        // but this only tells us individually how many numbers have a consecutive pair
            // how do we expand this to merge all consecutive numbers?
