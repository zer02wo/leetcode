// https://leetcode.com/problems/find-pivot-index/

/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    // if (nums.length <= 1) {
    //     return -1;
    // }

    // seems like another two pointers / sliding window solution?
        // i.e. initialise leftSum to 0 (because index 0 is at the left edge)
        // then initialise rightSum to sum of nums[1] -> nums[n] (we exclude index 0)
        // the window then slides by incrementing leftSum and decrementing rightSum each iteration

    let leftSum = 0;
    // let rightSum = 0;
    let total = 0;

    // sum nums[1] -> nums[n]
    // EDIT: As I'm now calculating *total* sum of entire array (0 -> n), could use Array.reduce()
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }

    for (let index = 0; index < nums.length; index++) {
        let rightSum = total - leftSum - nums[index];

        if (leftSum === rightSum) {
            return index;
        }

        leftSum += nums[index];
        // TODO: Need to be careful for out of bounds
            // TODO: it would probably be better to calculate this at the start of the *next* loop instead
            // (i.e. starting from the total sum)
        // rightSum -= nums[index+1];
    }

    // really happy with my performance on this one and how quickly I arrived at the solution

    // no pivot index in nums
    return -1;
};