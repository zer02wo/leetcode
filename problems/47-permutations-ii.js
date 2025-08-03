// https://leetcode.com/problems/permutations-ii/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const output = [];

    // recurse backtracking helper function
    function backtrack(permutation, seenIndexes) {
        // end of branch reached
        if (permutation.length === nums.length) {
            // push clone of permutation to output array (prevents modifying by reference)
            output.push([...permutation]);
        }

        for (let i = 0; i < nums.length; i++) {
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

    // TODO: fails due to duplicates in output array, e.g. nums = [1,1,2]
    // EXPECTED: [[1,1,2],[1,2,1],[2,1,1]]
    // ACTUAL: [[1,1,2],[1,2,1],[1,1,2],[1,2,1],[2,1,1],[2,1,1]]
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