// https://leetcode.com/problems/valid-mountain-array/
// tags: easy, leetle, array

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    // mountain array must be 3 or more elements
    if (arr.length < 3)  {
        return false;
    }

    // determine whether numbers should be increasing or decreasing
    let hasPeaked = false;
    let prev = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let step = arr[i];

        // we can never have two equal elements
        if (prev === step) {
            return false;
        }

        if (!hasPeaked) { // strictly increasing
            // first decrease, must continue decreasing
            if (prev > step) {
                hasPeaked = true;
            }
        } else { // strictly decreasing
            if (prev < step) { // not decreasing
                return false;
            }
        }

        // set new previous
        prev = step;
    }

    // needs to have peaked (i.e. started decreasing) to be valid
    return hasPeaked;

    // TODO: fails for the following test case:
        // arr = [9,8,7,6,5,4,3,2,1,0]
        // we are currently not keeping track that there is an element that has increased
};

// valid mountain array:
    // arr.length >= 3
    // there exists some element [i] in arr such that:
        // arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
        // arr[i] > arr[i + 1] > .. > arr[arr.length - 1]
    // i.e. all elements before [i] are *strictly* increasing & all after are *strictly* decreasing

// EXAMPLE: arr = [0,3,2,1]
// OUTPUT: TRUE
    // [0,3] = strictly increasing
    // [3,2,1] = strictly decreasing

// EXAMPLE: arr = [0,1,2,3]
// OUTPUT: FALSE
    // [0,1,2,3] = strictly increasing
    // [] = strictly decreasing (i.e. MUST have something decreasing)

// constraints:
    // 1 <= arr.length <= 10^4
        // i.e. WILL need length check (>= 3)
    // 0 <= arr[i] <= 10^4
        // i.e. no negative numbers

// the word "monotonic" comes to mind, but I can't remember if this determines a specific pattern that is best to use here
// for an O(n) solution we need to check:
    // numbers are *ONLY* increasing
        // (i.e. higher value than the previous element, not equal)
    // once the numbers decrease even once, they must continue to ONLY decrease

    // so once the elements start to decrease we can define a peak element/flag
        // then change the comparison operator