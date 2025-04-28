// https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
// tags: easy

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrentHashMap = function(nums) {
    // lets try the frequency map approach
    const numFreq = new Map();
    const output = [];

    // build frequency map
    for (const num of nums) {
        // usually I do a condition to handle the assignment, but trying out this pattern
            // (even if I think it's less readable)
        numFreq.set(num, (numFreq.get(num) || 0) + 1);
    }

    // get counts to build output
    for (const num of nums) {
        let count = 0;

        // still nested loops, but not O(n^2) due to the constant (O(1)) 0 -> 100 num constraint
        for (let i = 0; i < num; i++) {
            if (numFreq.has(i)) {
                count += numFreq.get(i);
            }
        }

        output.push(count);
    }

    return output;

    // this solution is actually *slower* than brute forcing: 13ms / beats 16.86%
    // if O(100) > O(n) this makes sense, but I cannot confirm as test cases are hidden
};

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