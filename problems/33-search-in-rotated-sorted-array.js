// https://leetcode.com/problems/search-in-rotated-sorted-array/
// tags: medium, leetle, array, binary search

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let lower = 0;
    let upper = nums.length - 1;

    while (lower <= upper) {
        const mid = Math.floor((lower + upper) / 2);

        // standard binary search up until this point
        // doing this check here is quicker,
            // and allows us to use (mid + 1) or (mid - 1) later on because we've already checked it here
        if (nums[mid] === target) {
            return mid;
        }

        // we now need the intuition that half of the array will still be sorted after the pivot
            // e.g. [4,5,6,7] and [0,1,2]
            // e.g. [4,5,6] and [7,0,1,2]
            // etc.

        // if midpoint > lower bound, numbers between them are sorted ascending
        // [4,5,6,7,0,1,2]
        //  L     M     U
        if (nums[mid] >= nums[lower]) {
            // if nums[lower] <= target <= nums[mid]
                // we can essentially binary search this sorted "half"
                // then we know if target exists within this range
            if (nums[lower] <= target && target <= nums[mid]) {
                // narrow search range to lower half
                upper = mid - 1;
            } else {
                // target must exist in upper half
                lower = mid + 1
            }
        }
        // else, numbers between midpoint & lower bound are not (fully) sorted
            // [4,5,6,7,0,1,2]
            //  L       M   U
        else {
            // if nums[mid] <= target <= nums[upper]
                // again we can essentially binary search this (potentialy sorted) half
                // then we know if target exists within this range
            if (nums[mid] <= target && target <= nums[upper]) {
                // this half is sorted & target exists within range
                // narrow search range to upper half
                lower = mid + 1;
            } else {
                // target must exist in lower half
                upper = mid - 1;
            }
        }
    }

    return -1;

    // solution informed by:
    // https://leetcode.com/problems/search-in-rotated-sorted-array/solutions/6753669/video-find-a-sorted-part-in-ascending-order
    // 0 ms / beats 100%
};

var searchTwoSearches = function(nums, target) {
    let pivotLower = 0;
    let pivotUpper = nums.length - 1;

    // binary search to find pivot point
    while (pivotLower < pivotUpper) {
        const mid = Math.floor((pivotUpper + pivotLower) / 2);

        if (nums[mid] > nums[pivotUpper]) {
            pivotLower = mid + 1;
        } else {
            pivotUpper = mid;
        }
    }

    // pivotLower === pivotUpper === index of pivot point
    let pivotIndex = pivotLower;

    let lower = 0;
    let upper = nums.length - 1;

    // binary search to find target
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

    // 0 ms / beats 100%
    // really complicated to solve, even with hints

    // TODO: see if there is a more intuitive alternative approach
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