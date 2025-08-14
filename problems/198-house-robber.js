// https://leetcode.com/problems/house-robber/
// tags: medium, array, dynamic programming, tabulation
/**
 * @param {number[]} nums
 * @return {number}
 */
var robConstantSpace = function(nums) {
    let maxPrev = 0, maxCur = 0;

    for (let i = 0; i < nums.length; i++) {
        // all the money made by robbing up to 2 houses ago AND the current house
        const robCur = maxPrev + nums[i];

        // dp[i-2], dp[i-1] = dp[i-1], MAX(dp[i-2] + nums[i], dp[i-1])
        [maxPrev, maxCur] = [maxCur, Math.max(robCur, maxCur)];
    }

    return maxCur;

    // 0 ms / beats 100%

    // O(n) time complexity
    // O(1) space complexity
        // only defining the equivalent to dp[i-2] and dp[i-1] from previous solution

    // much less readable than the previous solution, but even smaller footprint

    // TODO: what would a recursive solution look like? even if it is less performant?
};

var rob = function(nums) {
    // maximum money that can be robbed at each house
    const loot = new Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        // all the money made by robbing up to/(potentially) including the previous house
        const maxPrev = loot[i-1] ?? 0;
        // all the money made by robbing up to 2 houses ago AND the current house
        const maxCurrent = (loot[i-2] ?? 0) + nums[i];

        // maximum money that can be made up to (and potentially including) this house on the street
        loot[i] = Math.max(maxPrev, maxCurrent);
    }

    // return the maximum amount of money that can be robbed
    // referencing the last house on the street
    return loot[loot.length - 1];

    // 0 ms / beats 100%

    // O(n) time complexity
        // each element is visited once and performs O(1) lookups
    // O(n) space complexity
        // DP array is the same size as the input array
        // TODO: this could be reduced to O(1) space complexity as we only need loot[i-1] and loot[i-2]

    // the code is ridiculously simple
        // could easily be reduced to just a few lines (I've added more for clarity/comments)
    // but the pattern was really hard to figure out
        // explanation video below made it more easy to understand
        // but I'm not sure I would've found this pattern
        // I probably would've ended up doing recursion/backtracking or some other brute force method
    // need to get better about identifying the sub-problems

    // this dynamic programming method is TABULATION (bottom-up)
};

// given integer array `nums` representing the money at each house on a street
// return the maximum amount of money you can "rob" without "alerting the police"
    // adjacent houses have security systems connected
    // police will automatically be alerted if two adjacent houses were broken into on the same night

// EXAMPLE: nums = [1,2,3,1]
// OUTPUT: 4
    // nums[0] + nums[2] = 4
    // nums[1] + nums[3] = 3
    // nums[0] + nums[3] = 2

// EXAMPLE: nums = [2,7,9,3,1]
// OUTPUT: 12
    // nums[0] + nums[2] + nums[4] = 12

// EXAMPLE: nums = [2,1,1,2]
// OUTPUT: 4
    // nums[0] + nums[3] = 4
    // i.e. sometimes worth to skip two consecutive houses

// constraints:
    // 1 <= nums.length <= 100
    // 0 <= nums[i] <= 400

// no immediate/obvious intuition, lets try to break this down:
// if we take nums[i], this means we cannot take nums[i+1] or nums[i-1]
// so we have two decisions:
    // rob current house
    // don't rob current house

// EXAMPLE WALKTHROUGH: nums = [2,7,9,3,1]
// Rob nums[0]      = 2
// NoRob nums[0]    = 0

// Rob nums[1]      = 7
// NoRob nums[1]    = 2
    // because we could rob the previous house (nums[0]) instead

// Rob nums[2]      = 11
    // because we could rob this *and* nums[0]
// NoRob nums[2]    = 7
    // because we could rob the previous house (nums[1]) instead

// Rob nums[3]      = 10
    // because we could rob this *and* nums[1]
// NoRob nums[3]    = 11
    // because we could rob the previous house (nums[2])
        // *and* that allows us to rob nums[0]

// Rob nums[4]      = 12
    // because we could rob this *and* nums[2] *and* nums[0]
// NoRob nums[4]    = 11
    // because we could rob the previous house (nums[3])
        // *and* that allows us to rob nums[1]

// at each of these steps we would want to record the maximum we could earn:
// nums = [2, 7,  9,  3,  1]
// loot = [2, 7, 11, 11, 12]

// recurrence relationship:
//               (NoRob)            (Rob)
// loot[i] = max(loot[i-1], (loot[i-2] + nums[i]))

// referenced this video for explanation on principle, not viewed code:
    // https://www.youtube.com/watch?v=kIII1uT6F8Y



// ----- OLD / FAILED FIRST ATTEMPT BELOW LINE -----

// https://leetcode.com/problems/house-robber/
// tags: medium, leetle

/**
 * @param {number[]} nums
 * @return {number}
 */
var robOversimplifiedAlt = function(nums) {
    let lootSum = 0;
    let i = 0;

    while (i < nums.length) {
        const current = nums[i];
        const next = nums[i+1];

        if (current > next) {
            lootSum += current;
            i += 2;
        } else {
            lootSum += next;
            i += 3;
        }
    }

    return lootSum;

    // TODO: this is too greedy and doesn't consider the long-term
        // i.e. this works for [2,1,1,2]
        // but not for [1,2,3,1]
    // TODO: We need some kind of method of looking back as well
}

var robOversimplified = function(nums) {
    let evenSum = 0;
    let oddSum = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i % 2) {
            // odd index
            oddSum += nums[i];
        } else {
            // even index
            evenSum += nums[i];
        }
    }

    return Math.max(evenSum, oddSum);

    // TODO: yes, I was oversimplifying this
        // e.g. [2,1,1,2] = 4 (2 + 2) <- mixture of odd & even indexes
    // TODO: we could do a greedy approach (i.e. pick the largest out of the next 2 non-adjacent houses)
        // but this could result in less money overall
            // e.g. [1,2,100,1000] starting at [1] we would choose [100], which would then mean we can't choose [1000]
};

// you are presented an array, representing houses along a street
// the value of each array index (house) represents the money stashed there
// constraint: cannot "rob" from adjacent houses, as security systems will alert the police if **two adjacent houses broken into**

// Example: nums = [1,2,3,1]    = 4
    // i.e. (1 + 3 = 4) > (2 + 1 = 3)
// Example: nums = [2,7,9,3,1]  = 12
    // i.e. (2 + 9 + 1 = 12) > (7 + 3 = 10)

// this seems to just be comparing the sum of the even indexes against the sum of the odd indexes?
    // this feels way too simple of a solution for a medium, so I am probably missing some constraint/complexity?

// notes continued after initial attempt:
// Example: nums = [2,1,1,2]    = 4
    // I.e. (2 + 2 = 4) > (2 + 1 = 3)

// as we can't have adjacent numbers, should we deal with the numbers as pairs?
// i.e. for the example above, separate [2, 1] and [1, 2] into pairs and then find the maximum (valid) sum between the two?
    // this still feels like a greedy approach that could result in a local maxima only
// "pairs" might not be a valid categorisation, but rather looking ahead at the next two non-adjacent houses from the current house

// we could find the global maxima element and work from there
    // again this is a greedy approach that only works if one house has an especially higher value than the others
    // e.g. this would fail for nums = [99,100,99,1]
