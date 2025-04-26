// https://leetcode.com/problems/find-peak-element/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElementLinear = function(nums) {
    // linear O(n) solution

    for (let i = 0; i < nums.length; i++) {
        // first/last elements only need to be greater than their single neighbour
        const prev = nums[i-1] ?? Number.NEGATIVE_INFINITY;
        const next = nums[i+1] ?? Number.NEGATIVE_INFINITY;

        if (prev < nums[i] && nums[i] > next) {
            return i;
        }
    }

    // constraints note that a peak should always exist, so this should never be returned
    return -1;
};


var findPeakElement = function(nums) {
    // binary search O(log n) solution

    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        let mid = Math.floor((high+low) / 2);

        const prev = nums[mid-1] ?? Number.NEGATIVE_INFINITY;
        const next = nums[mid+1] ?? Number.NEGATIVE_INFINITY;

        // check adjacent neighbours
        if (prev < nums[mid] && nums[mid] > next) {
            return mid;
        }

        if (next > nums[mid]) {
            // update lower bound to ignore first half of array
            low = mid + 1;
        } else {
            // update upper bound to ignore second half of array
            high = mid;
        }
    }

    // constraints note that a peak should always exist, so this should never be returned
    return -1;
};