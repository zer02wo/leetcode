// https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/
// tags: easy, array, maths, sorting, set

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canMakeArithmeticProgression = function(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    // all values are the same, e.g. [3,3,3,3]
    if (max === min) {
        // prevents NaN from modulo (division) by 0
        return true;
    }

    // difference = max - min / arr.length-1
    const difference = (max - min) / (arr.length - 1);

    for (let i = 0; i < arr.length; i++) {
        // excluding the offset (i.e. the min value)
        // each nth term should be a multiple of the difference
            // therefore nthVal - min % difference === 0
            // for valid arithmetic progressions
        if ((arr[i] - min) % difference !== 0) {
            return false;
        }
    }

    return true;

    // TODO: fails for test case:
        // arr = [1,10,10,10,19]
        // we have no knowledge of duplicates, unlike the Set solution
        // TODO: is this as simple as checking for an integer difference?
};


var canMakeArithmeticProgressionSet = function(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    // difference = max - min / arr.length-1
    const difference = (max - min) / (arr.length - 1);

    // create Set from array for O(1) value lookups
    const lookup = new Set(arr);
    let nthVal = min;

    // increment from min -> max by difference
    while (nthVal < max) {
        nthVal += difference;

        // if nthVal of arithmetic progression does not exist, this is invalid
        if (!lookup.has(nthVal)) {
            return false;
        }
    }

    return true;

    // 0 ms / beats 100%
    // O(n) time complexity, O(n) space complexity

    // took a bit of trial/error & maths to figure out the pattern
    // then needed a hint about using a Set for looking up values
};

var canMakeArithmeticProgressionSorting = function(arr) {
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

// EXAMPLE: [1,3,5,7,9],    AP = 2 or -2
    // 1 + 9 = 10
    // 10 / 5 = 2
// EXAMPLE: [2,5,8,11,14],  AP = 3 or -3
    // 2 + 14 = 16
    // 16 / 5 = 3.2
// EXAMPLE: [4,8,12,16,20], AP = 4 or -4
    // 4 + 20 = 24
    // 24 / 5 = 4.8

// there's definitely *some* pattern here as I'm getting close values,
// but it's not as simple as what I've tried above...
    // n0 + n1 + ... + n-1 + n
    // n1 = n0 === n2 - n1

// EXAMPLE: [1,3,5,7,9]
    // 9 = 1 + (4 * 2)
        // max = min + (x * difference)
// EXAMPLE: [-2,1,4,7,10,13]
    // 13 = -2 + (5 * 3)
// EXAMPLE: [4,8,12,16,20]
    // 12 = 4 + (4 * 4)
        // max = min + ((arr.length-1) * difference)

// therefore, rearranging:
    // max - min = (arr.length-1) * difference
    // max - min / (arr.length-1) = difference
// so the formula is:
    // (max - min) / arr.length - 1

// 9 - 1 = 8
    // 8 / (5-1) = 2
// 14 - 2 = 12
    // 12 / (5-1) = 3
// 20 - 4 = 16
    // 16 / (5-1) = 4

// TODO: how can we use this difference to check without sorting..?
    // we could use a Set to lookup expected values (i.e. min + (n * diff)) in O(1) time
    // i.e. arithmetic progression = min, min + diff, min + 2*diff, min + 3*diff, ..., min + n-1*diff, max

// TODO: to do this without a Set:
// we know: max - min % difference === 0
        // therefore: nthVal - min % difference === 0
        // i.e. excluding the offset (the minimum value), this is just a multiple of the difference
// EXAMPLE: [1,3,5,7,9]
    // 7 - 1 = 6
    // 6 % 2 = 0
// EXAMPLE:
    // 4 - (-2) = 6
    // 6 % 3 = 0
// EXAMPLE: [4,8,12,16,20]
    // 16 - 4 = 12
    // 12 % 4 = 0

//