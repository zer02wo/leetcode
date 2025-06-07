// https://leetcode.com/problems/contains-duplicate-ii/
// tags: easy, hash table map, array

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    // cannot be duplicates when k == 0
    if (!k) {
        return false;
    }

    const numMap = new Map();
    const windowSize = Math.min(nums.length, k);

    // initialise sliding window & check for duplicates
    for (let i = 0; i <= windowSize; i++) {
        const num = nums[i];

        if (numMap.has(num)) {
            return true;
        }

        numMap.set(num, 1);
    }

    for (let i = windowSize+1; i <= nums.length; i++) {
        // delete old num that is no longer within range k
        const oldNum = nums[i - k - 1];
        numMap.delete(oldNum);

        const num = nums[i];

        // if num already exists in map, it's duplicate
        if (numMap.has(num)) {
            return true;
        }

        // num does not exist in map, set count to 1
        numMap.set(num, 1);
    }

    return false;

    // passes now after some additional validation of k
    // 27 ms / beats 65.40%
    // O(n) time complexity, O(n) space complexity
    // TODO: feels like I should be able to optimise the instantiation of the sliding window / prevent duplicate code
        // maybe using a Set? might be better than a HashMap in general
};

// duplicate if there are two *distinct indicies* (i & j) in the array
    // such that nums[i] === nums[j] and abs(i - j) <= k

// constraints:
    // 1 <= nums.length <= 10^5
        // i.e. do not need empty nums check
    // -10^9 <= nums[i] <= 10^5
        // i.e. positive and negative numbers
    // 0 <= k <= 10^5
        // i.e. k needs additional validation

// EXAMPLE: nums = [1,2,3,1], k = 3
// OUTPUT: true
    // i = 0, nums[i] = 1
    // j = 3, nums[j] = 1
        // abs(i - j) = 3 :: <= k

// EXAMPLE: nums = [1,0,1,1], k = 1
// OUTPUT: true
    // i = 2, nums[i] = 1
    // j = 3, nums[j] = 1
        // abs(i - j) = 1 :: <= k
    // cannot use the value '1' in index 0 as it is not close enough to a duplicate

// EXAMPLE: nums = [1,2,3,1,2,3], k = 2
// OUTPUT: false
    // all duplicates are greater than 2 indicies apart
        // nums[0] & nums[3] :: abs(i - j) > k
        // nums[1] & nums[4] :: abs(i - j) > k
        // nums[2] & nums[5] :: abs(i - j) > k

// first thought for brute force is:
    // at each index [i]
    // loop through to [i+k]
    // return true if any element matches nums[i]

// but instead we can use a sliding window of size k:
    // initialise map to size k
        // mapping numacter -> count in window
    // if any numacter (key) has a count > 1
        // return true

// in theory we don't even need to track count if we only keep values at 1 and remove keys at value 0
    // then if a key already exists, we know it's a duplicate