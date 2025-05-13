// https://leetcode.com/problems/house-robber/
// tags: medium, leetle

/**
 * @param {number[]} nums
 * @return {number}
 */
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
