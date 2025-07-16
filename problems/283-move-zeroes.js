// https://leetcode.com/problems/move-zeroes/
// tags: easy, arrays, two pointers

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroesFirstIdea = function(nums) {
    // first idea was something like this:
    const length = nums.length;

    for (let i = 0; i < length; i++) {
        if (nums[i] === 0) {
            delete nums[i];
            nums.push(0);
        }
    }

    // but this doesn't shift everything down, creates empty/undefined elements (which increases the size of the array)
    // could use Array.splice() instead, but seems expensive
};

// Next idea after checking hint - could definitely be simplified
var moveZeroesMessy = function(nums) {
    if (nums.length <= 1) {
        return nums;
    }

    for (let i = 0; i < nums.length; i++) {
        // non-zero, no action needed
        if (nums[i] !== 0) {
            continue;
        }

        // Set pointers
        const pointerStart = nums[i];
        let endIndex = i+1;

        // Look for the next non-zero element
        while (nums[endIndex] === 0) {
            if (endIndex >= nums.length - 1) {
                break;
            }

            endIndex++;
        }

        // We're finished as all numbers between the pointers (up to the end) are zero
        if (nums[endIndex] === 0) {
            // Could return here, but I like the return being at the end of the function
            break;
        }

        // Swap values
        nums[i] = nums[endIndex];
        nums[endIndex] = pointerStart;
    }

    return nums;
}

var moveZeroes = function(nums) {
    // Simpler to evaluate pointers opposite way to above
    let nonZeroPointer = 0;

    for (let i = 0; i < nums.length; i++) {
        // Moving non-zero numbers left, rather than moving zeroes right
        if (nums[i] !== 0) {
            // Much better syntax for swapping
            [nums[nonZeroPointer], nums[i]] = [nums[i], nums[nonZeroPointer]];
            nonZeroPointer++;
        }
    }
}


// REVISITING problem:

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let nonZeroPos = 0;

    for (let i = 0; i < nums.length; i++) {
        // current element is 0, swap with known non-zero position
        if (nums[i] !== 0) {
            [nums[i], nums[nonZeroPos]] = [nums[nonZeroPos], nums[i]];
            nonZeroPos++;
        }
    }

    // 5 ms / beats 25.87% (not sure why this is so slow?)
    // O(n) time complexity, O(1) space complexity
};

// I vaguely remember a two pointers solution for this:
    // first pointer moves start -> end and looks for next non-zero element
    // second pointer moves start -> end and keeps track of current count of non-zero elements
        // defines the position to swap non-zero values to
// swap pointers when current value !== 0
    // then continue iteration
// better explained/walkthrough here: https://leetcode.com/problems/move-zeroes/solutions/6743967/video-two-pointer-solution/
