// https://leetcode.com/problems/majority-element/
// tags: easy, arrays

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElementHashMap = function(nums) {
    let freqMap = new Map();
    const majority = nums.length / 2;

    for (const num of nums) {
        // initialise to 1 or increment by 1
        freqMap.set(num, (freqMap.get(num) + 1) || 1);

        // optimise by early return
        if (freqMap.get(num) > majority) {
            return num;
        }
    }

    // this should never occur given the constraints
    return -1;

    // 5 ms / beats 47.02%
    // O(n * m) time complexity solution
        // where n = nums length
        // where m = freqMap length (i.e. the number of unique digits in nums)
    // O(n) memory
    // but I knew this wouldn't be an optimal solution
}

var majorityElementSorting = function(nums) {
    nums.sort();

    return nums[Math.floor(nums.length / 2)];

    // 4 ms / beats 55.67%
    // the time / space complexity is therefore entirely dependent on the sorting method for the language
    // TODO: I don't like using built-ins where I can avoid it, so let's try something else
        // TODO: the problem suggests O(n) and O(1) solution is possible
};

// the objective is to find the mode element in an array
// my mind immediately jumped to a frequency HashMap,
// however the constraint that the majority (mode) element appears more than [n / 2] times allows us to use sorting

// if we sort the array, the majority element will always be present at the (n / 2)th index