// https://leetcode.com/problems/intersection-of-two-arrays/
// tags: easy, leetle, array

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
var intersectionNativeSet = function(nums1, nums2) {
    var set1 = new Set(nums1);
    var set2 = new Set(nums2);

    return Array.from(set1.intersection(set2));

    // 1 ms / beats 82.71%
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