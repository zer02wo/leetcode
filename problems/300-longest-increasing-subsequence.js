// https://leetcode.com/problems/longest-increasing-subsequence/
// tags: medium, leetle, arrays, dynamic programming

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



// REVISTING PROBLEM:

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLISMemoization = function(nums) {
    // OPTIMISATION - memoization
    // cache longest increasing subsequence when starting at given index
    const memo = new Map();

    // DFS recursive helper function
    function createSubsequence(prev, index, seqLen) {
        const key = `${prev}-${index}`;

        // if exists in memoization cache, retrieve instead of recalculate
        if (memo.has(key)) {
            return memo.get(key);
        }

        // not increasing, continue to next index
        while (nums[index] <= prev && index < nums.length) {
            index++;
        }

        // end of input array reached, return length of sequence in this branch
        if (index >= nums.length) {
            return seqLen;
        }

        // number is increasing, make branches from choice:
        // 1. take the current number
        const longestTake = createSubsequence(nums[index], index + 1, seqLen + 1);
        // 2. skip the current number
        const longestSkip = createSubsequence(prev, index + 1, seqLen);

        // cache longest subsequence found when starting at index
        memo.set(key, Math.max(longestTake, longestSkip));

        return memo.get(key);
    }

    // initialise recursive helper function
    return createSubsequence(-Infinity, 0, 0);

    // TODO: fails for test case: nums = [3,5,6,2,5,4,19,5,6,7,12]
        // EXPECTED: 6 [2,4,5,6,7,12]
        // ACTUAL: 5
    // this might just be the key not being specific enough? (i.e. as we have duplicate `5` elements)
        // reference previous *index* instead of previous *element*? (i.e. no duplicates)
};

// BRUTE FORCE: create a subsequence from each element by keeping reference to previous subsequence value
    // EDIT: fails for test case [0,1,0,3,2,3] as this would create [0,1,3] greedily instead of [0,1,2,3] because we never "skip" any elements
// brute force is actually more complicated than this, as we would need to generate *every* possible subsequence
    // that would mean at each (increasing) element we have two choices:
        // 1. take the current element
        // 2. leaving the current element
// i.e. in this situation, brute force === DFS of (2^n)