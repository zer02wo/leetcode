// https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/
// tags: easy, array, maths

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canMakeArithmeticProgression = function(arr) {
    // sort the array to create consistent order
        // I can't think of a case where arithmetic progression would be possible using an unsorted array
    const sortedArr = arr.sort((a, b) =>  a - b);
    // the difference between *any two* consecutive elements should be the same
    const difference = Math.abs(sortedArr[0] - sortedArr[1]);

    // for every other element in array
    for (let i = 2; i < arr.length; i++) {
        // check if consistent arithmetic progression difference between consecutive elements
        if (Math.abs(sortedArr[i-1] - sortedArr[i]) !== difference) {
            return false;
        }
    }

    return true;

    // 2 ms / beats 43.57%
    // O(n log n) time complexity (due to sort), O(1) space complexity
    // TODO: is there a more efficient approach?
        // what patterns emerge from reviewing alternative test cases?
};

// arithmetic progression: difference between any two consecutive elements are the same
// given arr, return true if array can be rearranged to form an arithmetic progression
    // otherwise return false

// EXAMPLE: arr = [3,5,1]
// OUTPUT: true
    // [1,3,5] has an arithmetic progression of 2
    // [5,3,1] has an arithmetic progression of -2

// EXAMPLE: arr = [1,2,4]
// OUTPUT: false
    // no order will create an arithmetic progression

// constraints:
    // 2 <= arr.length <= 1000
        // 2 elements is surely a guaranteed arithmetic progression by default?
    // -10^6 <= arr[i] <= 10^6

// first thoughts:
    // given that we're only returning true/false,
    // there is likely another mechanism to calculate arithmetic progression than sorting

// sorting / "brute force":
    // because the arithmetic progression needs to be consistent between all numbers,
    // sorting and comparing the first two values will determine the difference
        // if any of the future consecutive elements do not obey this distance, there is no arithmetic progression

// I can't think of an immediate pattern, so let's start with sorting ^