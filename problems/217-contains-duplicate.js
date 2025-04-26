// https://leetcode.com/problems/contains-duplicate/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    // previously using an object (HashMap)
        // this is MUCH faster
    let numSet = new Set();

    // first idea is to create a HashMap counting each instance of the numbers
    for (const num of nums) {
        // to prevent a full iteration, we can early return here
        // we don't need to know *which* numbers are duplicate, just if there are *ANY*
        if (numSet.has(num)) {
            return true;
        }

        numSet.add(num);
    }

    // TODO: I don't think any sorting algorithm would be faster than this?
        // but it would be reduced space complexity

    return false;
};