// https://leetcode.com/problems/subsets-ii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const powerSet = new Set();

    function backtrack(subset, index) {
        // end of recursive branch - subset has been created from all of input array
        if (index === nums.length) {
            // push subset to output - need to clone to prevent modification during backtrack
            powerSet.add([...subset]);
            return;
        }

        // recursive branch/subset where current element not added
        backtrack(subset, index + 1);

        // recursive branch/subset where current element *is* added
        subset.push(nums[index]);
        backtrack(subset, index + 1);

        // backtracking - remove current element from subset
        subset.pop();
    }

    backtrack([], 0);

    return [...powerSet];

    // TODO: fails due to duplicate elements
        // e.g. [2] appears twice, [1,2] appears twice, etc.
};

// given integer array `nums` that *may contain duplicates*
    // return the power set: all possible subsets
    // solution can be returned in any order but *must not contain duplicate subsets*

// EXAMPLE: nums = [1,2,2]
// OUTPUT: [[],[1],[1,2],[1,2,2],[2],[2,2]]

// EXAMPLE: nums = [0]
// OUTPUT: [[],[0]]

// intuition: recursion/backtracking
    // obviously building upon Subsets I from leetcode #78
    // each branch has two possibilities:
        // add nothing to the subset
        // add the current value to the subset
// brute force: use a Set to keep the output
    // this would be the simplest way to remove duplicates from the output
    // but is there a smarter way to do this?
    // JavaScript sets don't work with arrays... clearly got ahead of myself here
// TODO: how can we skip the duplicate subsets?
    // we can't create a Set from the original array, as duplicates are still needed in combination subsets
        // e.g. [1,2,2]
    // we *could* remove the duplicates after the fact, but that's a very expensive (exponential) operation
    // removing the duplicates *during* the recursion would also mean less branches for greater overall efficiency (in comparison)
    // TODO: need to figure out the condition to ignore a duplicate number within a branch