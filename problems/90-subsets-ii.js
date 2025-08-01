// https://leetcode.com/problems/subsets-ii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const powerSet = [];

    // sort the input array so we can check duplicates
        // O(n log n) sorting insignificant compared to backtracking running in exponential time
    nums.sort((a,b) => a - b);

    function backtrack(subset, index) {
        // end of recursive branch - subset has been created from all of input array
        if (index === nums.length) {
            // push subset to output - need to clone to prevent modification during backtrack
            powerSet.push([...subset]);
            return;
        }

        // 1. recursive branch/subset where nums[index] *is* added

        // create recursive branch with current number
        subset.push(nums[index]);
        backtrack(subset, index + 1);
        // backtracking - remove current element from subset
        subset.pop();

        // 2. recursive branch/subset where nums[index] not added

        // we're choosing to skip nums[index], so skip all duplicate values of nums[index] as well
            // e.g. for [1,2,2] if we skip the first `2`, we would still get a duplicate value if we included the second `2`
        while (index + 1 < nums.length && nums[index] === nums[index + 1]) {
            index++;
        }

        backtrack(subset, index + 1);
    }

    backtrack([], 0);

    return powerSet;

    // 0 ms / beats 100%
    // O(2^n * n) time complexity
    // O(2^n * n) space complexity

    // getting the general skeleton was easy from previous questions
    // but removing duplicates was not intuitive at all
    // it makes sense in hindsight, but I should probably have a pen/paper with me to draw out diagrams
        // decision tree from video I linked below was very useful
    // having to change the order of the branches also wasn't intuitive to me
        // although I suppose if you defined a separate index it wouldn't *technically* be necessary
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
// decision tree from explanation in this video was very helpful:
    // https://www.youtube.com/watch?v=Vn2v6ajA7U0