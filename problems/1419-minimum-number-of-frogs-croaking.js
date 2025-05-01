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

    let croakCount = 0;
    let maxCroaks = 0;

    for (const sound of croakOfFrogs) {
        croakMap.set(sound, croakMap.get(sound) + 1);

        // Order matters as well - i.e. there cannot be more of 'r,o,a,k' than there is of 'c' at any time
            // e.g. cannot be less of 'o,a,k' than there is of 'r' at any time, etc
        // TODO: There has to be a more elegant way to write this
        const cCount = croakMap.get('c');
        const rCount = croakMap.get('r');
        const oCount = croakMap.get('o');
        const aCount = croakMap.get('a');
        const kCount = croakMap.get('k');

        if (cCount < rCount || cCount < oCount || cCount < aCount || cCount < kCount) {
            return -1;
        }

        if (rCount < oCount || rCount < aCount || rCount < kCount) {
            return -1;
        }

        if (oCount < aCount || oCount < kCount) {
            return -1;
        }

        if (aCount < kCount) {
            return -1;
        }

        // TODO: we know there are multiple frogs if we see a 'c' before seeing a 'k'
            // i.e. another croak has started, before the last has finished
            // TODO: Increment croakCount by difference between c & k?
        // the maximum number of frogs = the maximum number of 'c' before 'k'
        if (sound === 'c') {
            croakCount++;
            maxCroaks = Math.max(croakCount, maxCroaks);
        } else if (sound === 'k') {
            croakCount--;
        }
    }

    const expectedCount = croakOfFrogs.length / 5;
    for (const [sound, count] of croakMap) {
        if (count !== expectedCount) {
            return -1
        }
    }

    return maxCroaks;

    // 40 ms / beats 31.82%
    // not happy with this one, took a long time and needed a hint to figure out the max/current pointers
    // my approach to order is definitely not great either
};