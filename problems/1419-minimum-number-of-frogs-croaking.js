// https://leetcode.com/problems/minimum-number-of-frogs-croaking/
// tags: medium

/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function(croakOfFrogs) {
    // this question is pretty tough, so I only have one immediate intuition:
        // the string is invalid if there are not equal counts of: c, r, o, a, k
    // this lets us know when to return -1, but not whether frogs are consecutive or simultaneous

    if (croakOfFrogs.length % 5 !== 0) {
        // needs to be multiple of 5 to consist of full croaks
        return -1;
    }

    const croakMap = new Map([
        ['c', 0],
        ['r', 0],
        ['o', 0],
        ['a', 0],
        ['k', 0],
    ]);

    for (const sound of croakOfFrogs) {
        croakMap.set(sound, croakMap.get(sound) + 1);
    }

    const expectedCount = croakOfFrogs.length / 5;
    for (const [sound, count] of croakMap) {
        if (count !== expectedCount) {
            return -1
        }
    }

    // TODO: Figure out simultaneous croaking
    return 1;
};