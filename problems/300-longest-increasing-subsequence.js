// https://leetcode.com/problems/longest-increasing-subsequence/
// tags: medium, leetle, arrays

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // records longest subsequence length (value) from starting index (key)
    let seqCounts = new Map();

    // starting at each index
    for (let i = 0; i < nums.length; i++) {
        // initialise to 1 to include current index
        let count = 1;
        let prev = nums[i]

        // get the longest subsequence
        for (let j = i + 1; j < nums.length; j++) {
            // current number must be greater than previous number
            if (nums[j] > nums[j-1]) {
                // prev = nums[j];
                count++;
            }
        }

        seqCounts.set(i, count);
    }

    let longest = -1;

    for (const [index, length] of seqCounts) {
        longest = Math.max(length, longest);
    }

    return longest;

    // TODO: comparing nums[j] > prev
        // fails for test case [0,1,0,3,2,3]
            // because it's too greedy and will always take the first 3 instead of the 2,3 afterwards
                // i.e. 0 -> 1 -> 3, when the longest subsequence would be 0 -> 1 -> 2 -> 3
    // TODO: comparing nums[j] > nums[j-1]
        // fails for test case [4,10,4,3,8,9]
            // because it only remembers the previous number, not all the numbers
                // i.e. 4 -> 10 then 3 -> 8 -> 9 = 4, when the answer should be 3
};

// find the longest subsequence in the array where consecutive elements have an increasing value

// EXAMPLE: [10,9,2,5,3,7,101,18]
// OUTPUT: 4
    // [2,3,7, 101] is the longest subsequence, with a length of 4
    // q: why can we ignore '5' ?
        // a: a subsequence allows deleting some elements, as long as the order remains the same

// an O(n^2) / brute force solution would be pretty easy here
    // outer loop for each index as the start of the subsequence
    // inner loop to iterate through the rest of the array
// O(n) space complexity in a HashMap

// we can't simply find the smallest element and start from there
    // e.g. [2,3,4,5,6,7,1] - finding '1' here would not be optimal compared to finding '2'

// sorting could help to find good candidates for starting, but it would still be an O(n^2) operation