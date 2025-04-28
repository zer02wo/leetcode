// https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
// tags: easy

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrentBruteForce = function(nums) {
    // quick thoughts:
        // originally thought a Set could be useful, but we also need to count duplicates
        // does a frequency Map make sense here?
            // numbers are between 0 and 100, so it might not result in much better performance than brute force
        // we could also sort the array, but how do we utilise that best?

    const output = [];

    // let's start with brute force O(n^2)
    for (const num of nums) {
        let count = 0;
        for (const compareNum of nums) {
            if (compareNum < num) {
                count++;
            }
        }

        output.push(count);
    }

    return output

    // as expected this is a slow solution: 12ms / beats 20.78%
    // now to optimise
};