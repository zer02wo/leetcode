// https://leetcode.com/problems/merge-sorted-array/
// tags: easy, array, two pointers, in place

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // pointer for each array
    let i1 = m - 1;
    let i2 = n - 1;
    // pointer for position in final sorted array (nums1)
    let end = m + n - 1;

    // loop until all elements from nums2 merged into nums1
    while (i2 >= 0) {
        // if i1 is a valid index && currently greater value than value of i2
        if (i1 >= 0 && nums1[i1] > nums2[i2]) {
            nums1[end] = nums1[i1];
            i1--;
        } else { // nums[i2] >= nums[i1] (or i1 is not a valid index)
            nums1[end] = nums2[i2];
            i2--;
        }

        // move end pointer down
        end--;
    }

    // https://leetcode.com/problems/merge-sorted-array/solutions/5714203/video-simple-solution-coding-exercise
    // 0 ms / beats 100%

    // I hated this question, modifying in place seems like a really forced constraint
    // iterating backwards made it easier but by that point I had already seen the solution linked above
};

// given two arrays (nums1 & nums 2) sorted in "non-decreasing" order,
    // and two integers (m & n) representing the number of elements in each array respectively
// merge nums1 & nums2 into a single array sorted in "non-decreasing" order

// final sorted array should not be return, modify nums1 in place
    // to accommodate nums1 has a length m + n:
        // first m elements denote elements that should be merged
        // last n elements are set to 0 and should be ignored
    // nums 2 has a length of n

// EXAMPLE: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// OUTPUT: [1,2,2,3,5,6]
    // [1,2,3] merged with [2,5,6]

// EXAMPLE: nums1 = [0], m = 0, nums2 = [1], n = 1
// OUTPUT: [1]
    // merging [] and [1]
    // because m = 0, there are no elements in nums1, the [0] is a placeholder

// if this did not require in-place memory usage:
// create two pointers at each array
    // push the smaller of the two numbers,
    // then increment the pointer for whichever array it came from

// because this requires in-place memory usage:
// HINT: iterate from the end to fill in the space to prevent need for additional memory