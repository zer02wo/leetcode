// https://leetcode.com/problems/intersection-of-two-arrays/

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