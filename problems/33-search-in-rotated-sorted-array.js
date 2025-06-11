// https://leetcode.com/problems/search-in-rotated-sorted-array/
// tags: medium, leetle, array, binary search

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let pivotLower = 0;
    let pivotUpper = nums.length - 1;

    // binary search to find pivot point
    while (pivotLower < pivotUpper) {
        const mid = Math.floor((pivotUpper + pivotLower) / 2);

        if (nums[mid] > nums[pivotUpper]) {
            pivotLower = mid + 1;
        } else {
            pivotUpper = mid - 1;
        }
    }

    // pivotLower === pivotUpper === index of pivot point
    let pivotIndex = pivotLower;

    let lower = 0;
    let upper = nums.length - 1;

    while (lower <= upper) {
        const mid = Math.floor((upper + lower) / 2);
        const offsetMid = (mid + pivotIndex) % nums.length;

        if (nums[offsetMid] === target) {
            return offsetMid;
        }

        if (nums[offsetMid] > target) {
            upper = mid - 1;
        } else {
            lower = mid + 1;
        }
    }

    return -1;

    // TODO: fails for testcase:
        // nums = [5.1,3], target = 5
        // returning -1, not finding it
};

// integer array nums of distinct values, sorted in ascending order
    // nums is (possibly) rotated at an unknown pivot index (k)
    // resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]
// return the index of integer target
    // or -1 if it is not in nums array

// constraints:
    // algorithim must run in O(log n) runtime complexity
        // i.e. cannot brute force every element
    // all values in nums are unique
    // all values in nums were sorted in ascending order before (possible) rotation
    // 1 <= k < nums.length
        // i.e. rotation could happen at any index other than 0, as that would result in no change

// EXAMPLE: nums = [4,5,6,7,0,1,2], target = 0
// OUTPUT: 4
    // [0] appears at 4th index
    // k = 3, sorted array would have been: [0,1,2,4,5,6,7]

// EXAMPLE nums = [1], target = 0
// OUTPUT: -1
    // [0] does not appear in array

// given that we're being provided a *sorted* array,
    // *and* we need an O(log n) runtime
// this question is definitely pushing towards some kind of modified binary search

// how do we appropriately determine upper/lower bounds?
    // the array could be rotated at any position so we might accidentally look the wrong way

// we need two searches:
    // binary search to find the pivot
    // binary search to find the target (informed by the pivot)

// binary search to find the pivot
    // find midpoint
        // if midpoint > upper
            // then pivot exists in latter half
        // if midpoint < upper
            // then pivot exists in first half

// binary search to find the target
    // find midpoint
    // offset by pivot: (midpoint + pivot) % length
        // binary search as usual