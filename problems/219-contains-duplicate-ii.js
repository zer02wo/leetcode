// https://leetcode.com/problems/contains-duplicate-ii/
// tags: easy, hash table map, array, set

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

    const numSet = new Set();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];

        // if num already exists in set, it's duplicate
        if (numSet.has(num)) {
            return true;
        }

        // num does not exist in set, add to set
        numSet.add(num);

        // delete old num that is no longer within range k
        if (numSet.size > k) {
            numSet.delete(nums[i - k]);
        }
    }

    return false;

    // 21 ms / beats 89.11%
    // much cleaner than the HashMap approach, unsure why this is flagged with that topic over a Set
        // we could initialise the set to a subarray of nums[0 -> k], but it would probably end up being slower/unnecessary?
};


var containsNearbyDuplicateHashMap = function(nums, k) {
    // cannot be duplicates when k == 0
    if (!k) {
        return false;
    }

    const numMap = new Map();

    for (let i = 0; i <= nums.length; i++) {
        const num = nums[i];

        // if num already exists in map, it's duplicate
        if (numMap.has(num)) {
            return true;
        }

        // num does not exist in map, set count to 1
        numMap.set(num, 1);

        // delete old num that is no longer within range k
        if (numMap.size > k) {
            numMap.delete(nums[i - k]);
        }
    }

    return false;

    // 27 ms / beats 65.40% (initial solution - see previous commits)
    // 25 ms / beats 72.73 (after clean up)
        // this is essentially identical to the Set approach above
        // Set seems more appropriate as we're dealing with duplicates of any amount/do not need a specific count
        // TODO: utilise the HashMap better we could reference the index instead of the count
    // O(n) time complexity, O(k) space complexity
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

// first thought for brute force O(n^2) is:
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