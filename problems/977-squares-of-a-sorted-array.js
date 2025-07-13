// https://leetcode.com/problems/squares-of-a-sorted-array/
// tags: easy, array, two pointers

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    const output = [];

    // "negative" and "positive" variable names are used to make this more intuitive to read
    // but this also works in scenarios where all values in nums are of the same sign
    // but it would be more accurate to label these as "lower" and "upper" (or left/right)
    let negIdx = 0;
    let posIdx = nums.length-1;

    // all elements visited when pointers overlap
    while (negIdx <= posIdx) {
        const negNum = nums[negIdx];
        const posNum = nums[posIdx];

        // we have a negative number with a greater magnitude than any positive number
        if (Math.abs(negNum) >= Math.abs(posNum)) {
            // push squared value to array
            output.push(negNum * negNum);
            // iterate inwards
            negIdx++;
        } else { // we have a positive number with a greater magnitude than any negative number
            // push squared value to array
            output.push(posNum * posNum);
            // iterate inwards
            posIdx--;
        }
    }

    // squared values have been added in descending ("non-increasing") order, so reverse it
    return output.reverse();

    // 4 ms / beats 73.35%
    // O(n) time complexity, O(n) space complexity
    // I did see the topic hint for "two pointers",
        // otherwise it would've taken me a bit longer to think of this
};

var sortedSquaresBruteForce = function(nums) {
    // brute force/unoptimal solution

    // calculate squares for each element
    for (let i = 0; i < nums.length; i++) {
        nums[i] = nums[i] ** 2;
    }

    // return array sorted in "non-decreasing" order
    return nums.sort((a, b) => a - b);

    // 13 ms / beats 18.17%
    // O(n log n) time complexity - due to sorting
    // O(1) space complexity - due to modifying existing array
        // although nums.sort() may actually be O(n) space for JS
};

// given integer array `nums` sorted in ascending (""non-decreasing"") order
    // reurn array of the squares of each number, sorted in non-decreasing order

// EXAMPLE: [-4,-1,0,3,10]
// OUTPUT: [0,1,9,16,100]
    // squared: [16,1,0,9,100]
    // sort to get output above

// the inclusion of negative numbers is the challenge in this problem:
    // i.e. in the example above, we cannot just do an O(n) operation because -4^2 > 3^2
// we could re-sort the array by *absolute* value
// or we could sort the output array in ascending order
    // but these options take time complexity from O(n) to O(n log n)

// intuition: use two pointers approach
    // first pointer represents the smallest *positive* number
    // second pointer represents the smallest *negative* number
    // compare pointers absolute values and choose the smallest one
    // i.e. work in -> out instead of start -> end
// HOWEVER: we would require an O(n) operation to find these initial points
// ADJUSTMENT: swap two pointers to work *inwards*
    // first pointer represents the largest magnitude *negative* number
        // i.e. nums[0], if it is negative
    // second pointer represents the largest magnitude *positive* number
        // i.e. nums[nums.length - 1], if it is positive
    // compare pointers absolute values and choose the largest one
    // i.e. work out -> in, instead of in -> out (or start -> end)
// we would either need to unshift() to front of array or reverse at end in this scenario