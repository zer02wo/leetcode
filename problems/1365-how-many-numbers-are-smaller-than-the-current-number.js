// https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
// tags: easy

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    // lets try a sorting approach
        // after sorting, we can use the index to determine how many elements are smaller
            // e.g. sorted index 3 has indexes 0,1,2 which are all smaller than it
        // but we need to be conscious of duplicates
            // e.g. nums[0], nums[1], nums[2] could all be '1', so nums[2] should have a count of 0
            // i.e. the first index - but not using indexOf due to it using native code implementation

    // sort array
    const sortedNums = [...nums].sort((a,b) => a - b);
    // create map to store counts (via the index)
    const indexMap = new Map();

    for (let i = 0; i < sortedNums.length; i++) {
        // set count to be lowest index for that number
        if (!indexMap.has(sortedNums[i])) {
            indexMap.set(sortedNums[i], i);
        }
    }

    const output = [];

    for (const num of nums) {
        output.push(indexMap.get(num));
    }

    return output;

    // 6ms / beats 65.78%
    // seems pretty optimised, I imagine a lot of people are using native JS methods to improve speed
}

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