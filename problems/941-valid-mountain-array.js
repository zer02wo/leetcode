// https://leetcode.com/problems/valid-mountain-array/
// tags: easy, leetle, array, two pointers

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    // mountain array must be 3 or more elements
    if (arr.length < 3)  {
        return false;
    }

    // for two pointers at either end of array
    // both should only see increasing values when going towards the "middle" (i.e. peak element)
    // this means there should be no "local" maxima in either direction
        // for a valid mountain array local maxima === global maxima

    let peakClimbing = 0;

    // find "local" maxima from start -> end
    while (peakClimbing < arr.length) {
        if (arr[peakClimbing] < arr[peakClimbing+1]) {
            peakClimbing++;
        } else {
            break;
        }
    }

    if (peakClimbing === arr.length - 1) {
        // all steps are climbing, i.e. only left side of mountain
        return false;
    }

    let peakDescending = arr.length - 1;

    // find "local" maxima from end -> start
    while (peakDescending >= 0) {
        if (arr[peakDescending] < arr[peakDescending - 1]) {
            peakDescending--;
        } else {
            break;
        }
    }

    if (peakDescending === 0) {
        // all steps are descending, i.e. only right side of mountain
        return false;
    }

    // if both local maxima are equal, it is a valid global maxima (i.e. a mountain array)
    if (peakClimbing === peakDescending) {
        return true;
    } else {
        return false;
    }

    // 42 ms / beats 83.91%
    // really interesting approach, needed a hint to get here but I understand the theory behind it
}

var validMountainArrayIntuitive = function(arr) {
    // mountain array must be 3 or more elements
    if (arr.length < 3)  {
        return false;
    }

    // determine whether numbers should be increasing or decreasing
    let hasClimbed = false
    let hasPeaked = false;
    let prev = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let step = arr[i];

        // we can never have two equal elements
        if (prev === step) {
            return false;
        }

        if (prev < step) { // increasing
            if (hasPeaked) { // peaked already, should be decreasing
                return false;
            }

            hasClimbed = true;
        } else { // decreasing
            if (!hasClimbed) { // needs to have increased at least once
                return false
            }

            hasPeaked = true;
        }

        // update previous to current step
        prev = step;
    }

    // needs to have climbed & peaked
    return hasClimbed && hasPeaked;

    // 57 ms / beats 10.34%
    // 45 ms / beats 70.17% (after clean up (could just be variance))
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

// fail conditions:
    // if two consecutive elements are ever equal
    // if increases after already decreasing
    // if never increases
    // if never decreases