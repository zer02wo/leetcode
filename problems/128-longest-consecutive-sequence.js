// https://leetcode.com/problems/longest-consecutive-sequence/
// tags: medium, array, set

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    // remove duplicates from nums and allow O(1) lookups
    const numsSet = new Set(nums);
    // maximum consecutive length
    let maxConLen = 0;

    for (const num of numsSet) {
        // this is not the start of a consecutive sequence, as there is a prior consecutive element
        if (numsSet.has(num-1)) {
            continue;
        }

        // this is the start of a consecutive sequence
        let conLen = 1;
        while (numsSet.has(num + conLen)) {
            // delete the number from the sequence to prevent visiting it later
            // NOTE: commented out as this seems to worsen the performance
            // numsSet.delete(num + conLen);

            // increase current consecutive length
            // also iterates to next consecutive number (if it exists)
            conLen++;
        }

        // update the maximum consecutive length if the current consecutive length sequence is greater
        maxConLen = Math.max(maxConLen, conLen);
    }

    return maxConLen;

    // 47 ms / beats 24.33% (first run with set delete)
    // 37 ms / beats 76.10% (second run with set delete)
    // 41 ms / beats 49.90% (first run after improvements)
    // 30 ms / beats 97.52% (second run after improvements)
        // *seems* like the set delete isn't worth it, but inconclusive

    // O(n) time complexity:
        // despite nested loops this is O(3n) at the worst case:
            // O(n) to create the set
            // O(n) to iterate through the set
            // O(n) to find the consecutive length (which could be the entire set/input array)
        // because we skip over any elements that are not the beginning of a sequence, this is not O(n^2)
            // as there is only one number that performs the inner O(n) loop, rather *every* element
        // TODO: I'm deleting numbers from the sequence in hopes of improving performance,
            // but this might just be more overhead than not doing so?
    // O(n) space complexity - the set from nums
};

// given unsorted integer array `nums`
    // return the length of the longest consecutive elements sequence
// must write an algorithm that runs in O(n) time

// EXAMPLE: nums = [100,4,200,1,3,2]
// OUTPUT: 4
    // [1,2,3,4] = length of 4

// EXAMPLE: nums = [0,3,7,2,5,8,4,6,0,1]
// OUTPUT: 9
    // [0,1,2,3,4,5,6,7,8] = length of 9
    // all numbers are present, but necessarily in that order

// EXAMPLE: nums = [1,0,1,2]
// OUTPUT: 3
    // [0,1,2]
    // duplicate 1 is not considered consecutive

// constraints:
    // 0 <= nums.length <= 10^5
    // -10^5 <= nums[i] <= 10^5

// solving this problem in O(n log n) would be trivial with sorting, i.e.
    // sort the array
    // keep a maximum consecutive count
    // keep a local/current consecutive count
    // iterate through the sorted array
        // if nums[i-1] === nums[i] - 1
            // increment consecutive count
            // Math.max to check if current/local count greater than current maximum
        // else if nums[i-1] === nums[i]
            // skip over duplicate
        // else reset local/current count

// solving this problem in O(n) is trickier
    // we can define a Set of the integers from nums to allow for O(1) lookups
        // this would be an O(n) operation
    // we can then check for each (non-duplicate) number in nums (i.e. O(n) loop)
        // does nums[i-1] exist in the Set
        // but this only tells us individually how many numbers have a consecutive pair
            // how do we expand this to merge all consecutive numbers?
// walkthrough here has a great visualisation: https://www.youtube.com/watch?v=P6RZZMu_maU
// <------------------------->
// [1,2,3,4]    [100]    [200]
// the groups/sequences of numbers have distinct starting positions

// INTUITION: we should only attempt to find a consecutive length if we're at the *start* of a sequence
        // i.e. nums[i-1] does not exist in the Set
