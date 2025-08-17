// https://leetcode.com/problems/house-robber-ii/description/
// tags: medium, array, dynamic programming

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // House Robber I implementation
    const n = nums.length;

    // recurrence relation loot[i] = Max(loot[i-2] + nums[i], loot[i-1])
    const loot = new Array(n);

    for (let i = 0; i < n; i++) {
        // rob previous house, leave current house
        const maxPrev = loot[i-1] ?? 0;
        // rob current house (and anything before the previous neighbour)
        const maxCurrent = (loot[i-2] ?? 0) + nums[i];

        loot[i] = Math.max(maxPrev, maxCurrent);
    }

    // return maximum available loot at last house
    return loot[n - 1];
};

// professional robber planning to rob houses along a street, which is **arranged in a circle**
    // i.e. first house is the neighbour of the last one
// adjacent houses have security systems to contact the police if two adjacent houses were broken into
// given an integer array `nums` representing the amount of money at each house:
    // return the maximum amount of money you can rob in one night without alerting the police

// EXAMPLE: nums = [2,3,2]
// OUTPUT: 3
    // cannot rob nums[0] and nums[1] because they are adjacent (due to circular street)

// EXAMPLE: nums = [1,2,3,1]
// OUTPUT: 4
    // nums[0] + nums[2] = 1 + 3

// EXAMPLE: nums = [1,2,3]
// OUTPUT: 3

// constraints:
    // 1 <= nums.length <= 100
    // 0 <= nums[i] <= 1000

// intuition: dynammic programming
    // this is clear, as it's an evolution on House Robber leetcode #198
    // the difference being we now have an additional constraint due to the circular street
        // preventing robbing nums[0] and nums[n-1]

// first and foremost, let's try to implement House Robber I again without checking
    // then we'll see how to adjust
// recurrence relation loot[i] = Max(loot[i-2] + nums[i], loot[i-1])
    // i.e. choose the maximum between robbing the current house (and all available prior houses),
     // or leaving this house and robbing the previous