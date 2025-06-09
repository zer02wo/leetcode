// https://leetcode.com/problems/intersection-of-two-arrays/
// tags: easy, leetle, array, set

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    // based on last question I did, intuition is to create a set from each array
    // then do the intersection based on that
    let set1 = new Set(nums1);
    let set2 = new Set(nums2);

    // use the smaller of the two sets to reduce number of comparison iterations
    let iterSet = null;
    let compSet = null;

    if (set1.size <= set2.size) {
        iterSet = set1;
        compSet = set2;
    } else {
        iterSet = set2;
        compSet = set1;
    }

    let intersect = [];

    // check for intersection
    for (const num of iterSet) {
        if (compSet.has(num)) {
            intersect.push(num);
        }
    }

    // this is probably pretty high memory complexity, but seems pretty fast
        // space complexity could be reduced by just choosing *either* set

    return intersect;
};

// revisiting problem:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    // a Set would make more sense than a HashMap, but challenging myself not to use Set
    const numCount = new Map();

    let longer, shorter = null;
    // determine longer & shorter arrays to optimise
    if (nums1.length >= nums2.length) {
        longer = nums1;
        shorter = nums2;
    } else {
        longer = nums2;
        shorter = nums1;
    }

    for (const num of shorter) {
        // O(1) lookup
        if (!numCount.has(num)) {
            // we don't care about exact counts, only if it appears even once
            numCount.set(num, 1);
        }
    }

    const result = [];

    for (const num of longer) {
        // check if number already recorded in previous count
        if (numCount.has(num)) {
            // push to result output
            result.push(num);
            // delete from map to prevent duplicates
            numCount.delete(num);
        }

        // early return if all elements already visited
        // (because this is using the counts from shorter array, should be more likely to early return)
        if (!numCount.size) {
            break;
        }
    }

    return result;

    // 1 ms / beats 82.71% (first run)
    // O(n) time complexity / O(n) space complexity

    // 0 ms / beats 100%
    // after longer & shorter optimisation (could just have been due to variance)

    // TODO: probably something possible with sorting as another possible solution,
    // but seems like it would be slower given the need to also sort the elements first
};

var intersectionNativeSet = function(nums1, nums2) {
    var set1 = new Set(nums1);
    var set2 = new Set(nums2);

    return Array.from(set1.intersection(set2));

    // 1 ms / beats 82.71%
    // all native implementation
};

// find intersection of two arrays
    // definition: set of elements present in both arrays (i.e. the same as the Set operation)
// each element in the result must be unique, but can be in any order

// EXAMPLE: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// OUTPUT: [9,4] (or [4,9]
    // i.e. only [9] and [4] are contained in both arrays

// as mentioned above the easiest method will be Set1.intersection(Set2)
    // but perhaps the question wants us to demonstrate how to do this without sets
    // this might be worth visiting afterwards

// for a non-native implementation (without using Set at all):
// we could use a HashMap to count each instance of the number,
    // then check if it exists in the second array
    // O(n1+n2)