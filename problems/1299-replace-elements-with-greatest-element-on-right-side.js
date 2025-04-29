// https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
// tags: easy

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
    // because we're only interested in elements to the right, we should loop backwards

    let currentMax = -1;

    for (let i = arr.length - 1; i >= 0; i--) {
        let left =  arr[i];

        arr[i] = currentMax;

        if (left > currentMax) {
            currentMax = left;
        }
    }

    return arr;

    // O(n) time & in-place O(1) memory solution: 1ms / beats 80.74%
    // took me longer than I would've liked - I had the right approach, just overcomplicated things
        // e.g. attempting to use two pointers for left and right, additional condition for right edge, etc.
        // once I figured out we're technically one iteration "behind" (due to right-edge), it clicked
};