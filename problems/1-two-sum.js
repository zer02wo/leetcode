// https://leetcode.com/problems/two-sum/
// tags: easy, array, HashMap

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // value => index mapping for nums
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const sumPair = target - num;

        // check if complement exists in HashMap
        if (numMap.has(sumPair)) {
            return [i, numMap.get(sumPair)];
        }

        // add to value => index mapping
        numMap.set(num, i);
    }

    // should never occur given constraints
    return -1;

    // 4 ms / beats 55.39% (2 loops)
    // 0 ms / beats 100% (1 loop)
    // O(n) time complexity - 1 loop worst case
        // HashMap allows O(1) lookups for sum complement
    // O(n) space complexity - store value => index key in HashMap
};

var twoSumBruteForce = function(nums, target) {
    // for each element
    for (let i = 0; i < nums.length; i++) {
        // check if every other element can sum to target
        for (let j = i+1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i,j];
            }
        }
    }

    // should never occur given constraints
    return [-1];

    // 33 ms / beats 34.59%
    // O(n^2) time complexity, O(1) space complexity
    // not awful for a brute force solution
        // but we're doing a lot of repeated work
};

// given array of integers `nums` and an integer `target`:
    // return *indicies* of two numbers such that they add up to `target`.
// assume each input has *exactly one solution*, cannot use same element twice
    // can return answer in any order

// EXAMPLE: nums = [2,7,11,15], target = 9
// OUTPUT: [0,1]
    // nums[0] + nums[1] = 2 + 7

// EXAMPLE nums [3,2,4], target = 6
// OUTPUT [1,2]
    // nums[1] + nums[2] = 2 + 4

// constraints:
    // 2 <= nums.length <= 10^4
    // -10^9 <= nums[i] <= 10^9
    // -10^9 <= target <= 10^9
    // only one valid answer exists

// an O(n^2) time complexity / brute force solution would be pretty simple:
    // outer loop through array `nums` from i
        // inner loop through array `nums` from i+1 (j)
            // check if nums[i] + nums[j] === target

// the problem also suggests coming up with improved over O(n^2)
    // but nothing is immediately coming to mind
    // start with brute force and see if that jogs any ideas

// intuition:
// within the brute force solutiong we're checking every element multiple times
    // if we created an additional data structure, like a HashMap
    // we can do an O(n) operation to populate the count of numbers
        // value => index mapping
    // then loop through again (another O(n) operation)
        // then we can do an O(1) lookup to get the index for (target - currentValue)