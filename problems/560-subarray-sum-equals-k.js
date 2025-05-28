// https://leetcode.com/problems/subarray-sum-equals-k/
// tags: medium, leetle, arrays, prefix sum

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // PrefixSum + HashMap
    // within the brute force solution we are doing repeated work calculating subarrays
        // e.g. [1,2,3,4] has the subarray [2,3]
            // we would've already calculated this on the first pass as it is included in [1,2,3]
            // so it is equivalent to [1,2,3] - [1]     i.e. subtracting the prefix
    // more generally we can write this as sum(i,j) = sum(0,j) - sum(0,i)

    // if sum - k = 0, that subarray sum totals to the value k
        // otherwise, we would need to remove a prefix from the array to get the value k
        // e.g. nums = [2,-1,2,1], k = 3
            // [2,-1,2] = 3 - k = 0
            // [2,-1,2,1] = 4 - k = 1
                // but, we have subarray [2,-1] = 1
                // so if we remove that prefix, we get [2,1] = 3 - k = 0

    // by keeping track of the count of each prefix sum,
    // we know how many subarrays can be created for that value based on the remainder from sum - k

    // HashMap to keep track of count for each prefix sum
    let prefixSum = new Map();
    // initialise count for 0 prefix to 1,
    // because if sum - k = 0 we don't need to remove a prefix
    prefixSum.set(0, 1);

    // number of subarrays === k
    let subarrayCount = 0;
    // cumulative sum
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        // increase cumulative sum by current value
        sum += nums[i];

        // calculate remainder from k
        let remainder = sum - k;

        // if prefix sum of [sum - k] exists
        if (prefixSum.get(remainder)) {
            // increment the subarray by relevant count
            subarrayCount += prefixSum.get(remainder);
        }

        // set a new prefix sum, with count of 1
        // or increment existing prefix sum by 1
        prefixSum.set(sum, (prefixSum.get(sum) || 0) + 1);
    }

    return subarrayCount;

    // 18 ms / beats 67.91%
    // O(n) time complexity, O(n) space complexity

    // pretty simple algorithm once you know the pattern,
    // but would've been incredibly difficult to come up with on the spot
}

var subarraySumBruteForce = function(nums, k) {
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
        // TODO: had to look at the solutions, there is a pattern called "prefix sum" + HashMap
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