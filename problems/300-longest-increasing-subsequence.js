// https://leetcode.com/problems/longest-increasing-subsequence/
// tags: medium, leetle, arrays, dynamic programming


// following video solution: https://www.youtube.com/watch?v=cjWnW0hdF1Y
// BRUTE FORCE: generate every subsequence
    // each element has two choices: 1. include in subsequence, 2. don't include in subsequence
    // 2^n subsequences
// DFS WITH CACHE: generate subsequence starting at each element
    // e.g. [1,2,4,3]
        // if we start at index 3, we get subsequence: [3]
            // this tells us that LIS[3] = 1
        // if we start at index 2, we get subsequence: [4,3]
            // except 3 < 4, so the LIS = [4]
            // this tells us that LIS[2] = 1
        // if we start at index 1, we get subsequence: [2,4] OR [2,3]
            // because we already know LIS[2] and LIS[3] === 1
            // we know that LIS[1] = nums[1] + LIS[2|3] === 2
        // if we start at index 0, we get subsequence: [1,2,4] OR [1,2,3]
            // because we already know LIS[1] = 2
            // we know that LIS[0] = nums[0] + LIS[1] === 3
    // from this we can learn the pattern is to start at last index and work UP towards beginning


// === FAILED ATTEMPTS BELOW THIS LINE ===

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
    function createSubsequence(prevIdx, curIdx, seqLen) {
        // end of input array reached, return length of sequence in this branch
        if (curIdx >= nums.length) {
            return seqLen;
        }

        const key = `${prevIdx}-${curIdx}-${seqLen}`;

        // if exists in memoization cache, retrieve instead of recalculate
        if (memo.has(key)) {
            return memo.get(key);
        }

        const prev = nums[prevIdx] === -1 ? -Infinity : nums[prevIdx];

        // not increasing, continue to next index
        while (curIdx < nums.length && nums[curIdx] <= prev) {
            curIdx++;
        }

        // end of input array reached, return length of sequence in this branch
        if (curIdx >= nums.length) {
            return seqLen;
        }

        // number is increasing, make branches from choice:
        // 1. take the current number
        const longestTake = createSubsequence(curIdx, curIdx + 1, seqLen + 1);
        // 2. skip the current number
        const longestSkip = createSubsequence(prevIdx, curIdx + 1, seqLen);

        // cache longest subsequence found when starting at index
        memo.set(key, Math.max(longestTake, longestSkip));

        return memo.get(key);
    }

    // initialise recursive helper function
    return createSubsequence(-1, 0, 0);

    // TODO: using previous index also fails
    // adding sequence length to the key once again returns to TLE, as the cache isn't effective enough
};

// BRUTE FORCE: create a subsequence from each element by keeping reference to previous subsequence value
    // EDIT: fails for test case [0,1,0,3,2,3] as this would create [0,1,3] greedily instead of [0,1,2,3] because we never "skip" any elements
// brute force is actually more complicated than this, as we would need to generate *every* possible subsequence
    // that would mean at each (increasing) element we have two choices:
        // 1. take the current element
        // 2. leaving the current element
// i.e. in this situation, brute force === DFS of (2^n)