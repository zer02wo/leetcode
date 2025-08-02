// https://leetcode.com/problems/permutations/
// tags: medium, array, recursion, backtracking

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const output = [];

    function backtrack(permutation, seen) {
        // reached the end of the branch
        if (permutation.length === nums.length) {
            // push permutation to output - must be cloned to prevent modifying reference
            output.push([...permutation]);
            return;
        }

        for (const num of nums) {
            // skip over/prevent outputting duplicate numbers
            if (seen.has(num)) {
                continue;
            }


            // add number to permutation / seen elements
            permutation.push(num);
            seen.add(num);

            // recursively create permutation branches
            backtrack(permutation, seen);

            // backtracking - remove element from data structures
            permutation.pop();
            seen.delete(num);
        }
    }

    // begin recursive backtracking
    backtrack([], new Set());

    return output;

    // 2 ms / beats 64.36% (first run)
    // 0 ms / beats 100% (second run)

    // O(n! * n) time complexity
        // O(n!) as we're generating permutations
            // at the first step in the decision tree there are n options
            // at the second step in the decision tree there are n-1 options
            // at the third step in the decision tree there are n-2 options
            // etc.
            // meaning we have n * n-1 * n-2 ... * 1, which is equivalent to n!
        // O(n) as we clone the array
            // (though in practice this is less because it happens for leaf nodes of branching only)
    // O(n! * n) space complexity
        // there are n! arrays with n length in the output
        // we can ignore the additional seen set/permutation array which are both O(n)

    // got this pretty much first try (other than some bugs with variable names)
    // doing the other similar questions/knowing the pattern helped massively of course
        // but this is fairly different with the decreasing number of decisions
};

// given array of distinct integers `nums`
    // return all possible permutations: rearrangement of the elements in an array
    // return answer in any order

// EXAMPLE: nums = [1,2,3]
// OUTPUT: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// EXAMPLE: nums = [0,1]
// OUTPUT: [[0,1],[1,0]]

// EXAMPLE: nums = [1]
// OUTPUT: [[1]]

// intuition: recursion/backtracking
    // similiar to leetcode #78 and leetcode #784
    // we're generating all permutations which means branching out all possibilities
// in this problem it seems like the time complexity is going to be even higher
    // i.e. at each element we need to create a branch for every other element
// a decision tree helped with a previous problem, so lets make one here for nums = [1,2,3]
//                             []
//         [1]                 [2]                 [3]
//     [1,2] [1,3]         [2,1] [2,3]         [3,1] [3,2]
// [1,2,3]     [1,3,2] [2,1,3]     [2,3,1] [3,1,2]     [3,2,1]

// so there the decisions actually reduce as the depth of the tree increases
    // as there are less elements that could be possibly used

// my thought is to keep a Set of the used elements to prevent duplicates (as we have unique integers in input array)
    // loop through the input array and create branches for every other element