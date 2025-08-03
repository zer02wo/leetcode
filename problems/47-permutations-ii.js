// https://leetcode.com/problems/permutations-ii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const output = [];

    // sort input array to more easily handle duplicates
    nums.sort((a, b) => (a - b));

    // recursive backtracking helper function
    function backtrack(permutation, seenIndexes) {
        // end of branch reached
        if (permutation.length === nums.length) {
            // push clone of permutation to output array (prevents modifying by reference)
            output.push([...permutation]);
        }

        for (let i = 0; i < nums.length; i++) {
            // don't use a duplicate of a number we've already skipped previously
            if (nums[i] === nums[i-1] && !seenIndexes.has(i-1)) {
                continue;
            }

            // if we have already used this index, don't use it again
            if (seenIndexes.has(i)) {
                continue;
            }

            // add current index as seen for permutation
            seenIndexes.add(i);
            // add current element to permutation
            permutation.push(nums[i]);
            // recursively add other elements to permutation
            backtrack(permutation, seenIndexes);

            // backtracking - returning from branch, update data structures
            seenIndexes.delete(i);
            permutation.pop();
        }
    }

    // initialise recursive backtracking
    backtrack([], new Set());

    return output;

    // 5 ms / beats 47.05% (first run)
    // 3 ms / beats 68.36% (second run)

    // O(n! * n) time complexity
        // in actuality, likely a bit less than n!, as we're removing duplicates
        // we could define this as a separate value, e.g. O(k * n) but feels like this undersells the complexity
    // O(n! * n) space complexity

    // definitely a tricky one, even with doing Subsets II
    // although solution was similar in the end, the condition is not the most intuitive
        // at least not without a diagram/end output to work from
};

// given collection of (potentially duplicate) numbers `nums`
    // return all possible unique permutations in any order

// EXAMPLE: nums = [1,1,2]
// OUTPUT: [[1,1,2], [1,2,1], [2,1,1]]

// EXAMPLE: nums = [1,2,3]
// OUTPUT: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// intuition: use the index to mark seen in a set?
    // within leetcode #46 permutations (I) we used recursion/backtracking
    // however, in that situation we were given an input array of unique integers
        // in this situation, there can be duplicates
    // so instead of using a set of the seen elements,
        // we use a set of each index to keep track of which elements are left within the decision tree

// output array

// recursive backtrack function: current permutation array, set of seen indexes
    // return when permutation length === input array length
    // for each element
        // if index has been used before
            // continue / skip
        // create recursive branch for new element

        // update data structures when backtracking

// PROBLEM: this results in duplicates in the output array
    // TODO: we need to apply the same sorting & consecutive/duplicate element check as Subsets II (leetcode #90)
        // nums[i] === nums[i-1] && !seenIndexes.has(i-1)