// https://leetcode.com/problems/subarray-sum-equals-k/
// tags: medium, leetle, arrays

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let subarrayCount = 0;

    for (let i = 0; i < nums.length; i++) {
        let sum = 0;

        for (let j = i; j < nums.length; j++) {
            sum += nums[j];

            if (sum === k) {
                subarrayCount++;
            }
        }
    }

    return subarrayCount;

    // 1567 ms / beats 13.10%
        // O(n^2) time complexity, O(1) space complexity
    // not optimal at all,
        // but even writing extensive notes it only took ~10 minutes to get a working solution

    // TODO: investigate how to optimise
};

// return the number of subarrays (in `nums`) whose sum equals value `k`
    // subarray definition: contigious *non-empty* sequence of elements in array

// EXAMPLE: nums = [1,1,1], k = 2
// OUTPUT: 2
    // [1,1] & [1,1]

// EXAMPLE: nums = [1,2,3], k = 3
// OUTPUT: 3
    // [1,2] & [3]

// constraints:
    // 1 <= nums.length <= 2 * 10^4
        // i.e. no empty array check needed
    // -1000 <= nums[i] <= 1000
        // i.e. we cannot early return when sum is greater than k, because it might go back down.
            // e.g. nums = [1,2,3,-2], k = 1
            // [1] & [3,-2]
    // -10^7 <= k <= 10^7
        // i.e. k can be positive or negative

// a brute force O(n^2) solution should be pretty easy here because we're dealing with contigious elements
    // outer loop starting at each index
        // check if current element === k, increase counter
    // inner loop continuing through n
        // increment sum with each additional element
            // if current sum === k, increase counter

    // return counter

// as noted in constraints we need to see *every* value, no early return optimisations
    // e.g. nums = [2,2,-2], k = 2
    // output = 3
        // [2] (nums[0]) & [2,2,-2] (nums[0,1,2]) & [2] (nums[1])
        // i.e. there can be multiple subarrays from the same index due to negative values
// also rules out something like a sliding window pattern

// I don't see an immediate pattern emerging, so lets try brute force first