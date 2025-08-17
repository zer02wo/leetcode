// https://leetcode.com/problems/house-robber-ii/description/
// tags: medium, array, dynamic programming, tabulation

/**
 * @param {number[]} nums
 * @return {number}
 */
var robOneLoop = function(nums) {
    const n = nums.length;

    // base cases - handled separately for simplicity
    if (n === 1) {
        return nums[0];
    }

    if (n === 2) {
        return Math.max(nums[0], nums[1]);
    }

    // pointers for robbing houses: [0,n-2] (don't consider last house)
        // prevents robbing first / last house together
    let prevExclLast = 0, curExclLast = 0;
    // pointers for robbing houses: [1,n-1] (don't consider first house)
        // allows us to check for a solution using last house
    let prevExclFirst = 0, curExclFirst = 0;
    // OPTIMISATION ^ using constant space, instead of array

    // recurrence relation maxLoot = Max(prev + nums[i], current)

    // OPTIMISATION: handle both scenarios in a single loop
    for (let i = 0; i < n - 1; i++) {
        // 0 -> n - 2
        const newCurExclLast = Math.max(curExclLast, prevExclLast + nums[i]);
        // swap: oldPrev, oldCur => oldCur, newCur
        [prevExclLast, curExclLast] = [curExclLast, newCurExclLast];

        // 1 -> n - 1 (hence +1 when referencing index)
        const newCurExclFirst = Math.max(curExclFirst, prevExclFirst + nums[i+1]);
        // swap: oldPrev, oldCur => oldCur, newCur
        [prevExclFirst, curExclFirst] = [curExclFirst, newCurExclFirst];
    }

    // return maximum available loot with either house exclusions
    return Math.max(curExclFirst, curExclLast);

    // 0 ms / beats 100%

    // O(n) time complexity
        // single for loop through nums
    // O(1) space complexity
        // removed arrays from previous solution

    // reducing this to constant space made it a bit simpler/more readable
        // although I'm still not particularly happy with readability, variable names are difficult for two things so similar
        // prev1 and cur1 / prev2 and cur2 might've been better...
    // would likely be more readable with a helper function, but then we're missing out on the performance improvements of a single loop
        // unless we could memoize it?
};

var robTwoLoops = function(nums) {
    const n = nums.length;

    // base cases - handled separately for simplicity
    if (n === 1) {
        return nums[0];
    }

    if (n === 2) {
        return Math.max(nums[0], nums[1]);
    }

    // pointer for robbing houses: [0,n-2] (don't consider last house)
        // prevents robbing first / last house together
    const lootExcludingLast = new Array(n - 1);
    // pointer for robbing houses: [1,n-1] (don't consider first house)
        // allows us to check for a solution using last house
    const lootExcludingFirst = new Array(n - 1);

    // recurrence relation loot[i] = Max(loot[i-2] + nums[i], loot[i-1])

    // 1. lootExcludingLast loop
    for (let i = 0; i < n - 1; i++) {
        // rob previous house, leave current house
        const maxPrev = lootExcludingLast[i-1] ?? 0;
        // rob current house (and anything before the previous neighbour)
        const maxCurrent = (lootExcludingLast[i-2] ?? 0) + nums[i];

        lootExcludingLast[i] = Math.max(maxPrev, maxCurrent);
    }

    // 2. lootExcludingFirst loop
    // TODO: after testing this method works, combine into single loop to reduce duplication
    // i values offset by -1 compared to loop above, accounts for starting position
    for (let i = 1; i < n; i++) {
        // rob previous house, leave current house
        const maxPrev = lootExcludingFirst[i-2] ?? 0;
        // rob current house (and anything before the previous neighbour)
        const maxCurrent = (lootExcludingFirst[i-3] ?? 0) + nums[i];

        lootExcludingFirst[i-1] = Math.max(maxPrev, maxCurrent);
    }

    // return maximum available loot with either house exclusions
    return Math.max(lootExcludingFirst[n - 2], lootExcludingLast[n - 2]);

    // 0 ms / beats 100%

    // O(n) time complexity
        // O(2n) technically, as we're doing two loops
    // O(n) space complexity
        // O(2(n-1)) technically, as we have two arrays equal to length n-1

    // surprised that this is the optimal technique/approach, at least in terms of runtime
    // I thought there would be a more elegant solution
    // still want to improve this to be a single loop, but maybe in a separate function to better show progression of optimisation
        // as we're doing a lot of repeated work (so this could also be solved via memoization?)
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

// the circular street adds two additional conditions:
    // if we rob nums[0], we cannot rob nums[n-1]
    // if we rob nums[n-1], we cannot rob nums[0]
// the simplest method would be to remove nums[n-1] from consideration if we rob nums[0]
    // but that causes a greedy trap, e.g. nums = [3,1,2,2,100]
    // we rob nums[0] (because 3 > 1), but then that later means we can't rob nums[n-1]
// we could resolve this by doing two passes:
    // robbing nums[0,n-2] robbing nums[1,n-1]
    // i.e. robbing first house up to 2nd last house
    // or robbing 2nd house up to last house
// TODO: but is there a smarter way to do this?