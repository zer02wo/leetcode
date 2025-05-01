// https://leetcode.com/problems/minimum-number-of-frogs-croaking/
// tags: medium

/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
    // following someone else's approach for learning purposes

    // we know a fully formed croak requires 5 characters
        // so the length of croakOfFrogs must be wholly divisible by 5
    if (croakOfFrogs.length % 5 !== 0) {
        return -1;
    }

    // we know:
        // c is the start/first stage of a new croak
        // k is the end/last stage of an existing croak
        // each subsequent letter in the croak should never be greater than the former

    // counter aray keeps track of how many frogs at each stage of croaking (i.e. c -> k)
        // increment the current stage (i.e. the frog has just started it)
        // decrement the previous stage (i.e. the frog has moved on from it)
            // if any stage has a negative value, this means the croak is out of order
    const croakStages = [0,0,0,0,0];
    // map the indexes to relevant characters
    const croakMap = {c:0, r:1, o:2, a:3, k:4};

    // we are interested in the maximum concurrency
        // i.e. greatest value of croakStages[0] at any given point
        // this will always be highest when the current stage = 'c'
    let maxCroaks = 0;
    // if any currentCroaks !== 0 after finishing iteration, then we have incomplete croak(s)
    let currentCroaks = 0;

    for (const stage of croakOfFrogs) {
        let stageIndex = croakMap[stage];

        croakStages[stageIndex]++;

        if (stageIndex === 0) {
            // 'c' -> start of a new croak, check for max
            currentCroaks++;
            maxCroaks = Math.max(maxCroaks, currentCroaks);
        } else {
            // 'r,o,a,k' -> decrement previous stage
                // Note: -- at the start to return the subtracted value
            let previous = --croakStages[stageIndex-1];

            // croaking not in order
            if (previous < 0) {
                return -1;
            }

            if (stageIndex === 4) {
                // 'k' -> end of an existing croak
                currentCroaks--;
            }
        }
    }

    if (currentCroaks > 0) {
        return -1;
    } else {
        return maxCroaks;
    }

    // 16ms / beats 45.4%
    // surprised this isn't much faster than mine, but it is a lot cleaner & more extensible
}

function minNumberOfFrogsOptimal(croakOfFrogs) {
    // this solution was taken from leetcode as a "5ms" solution (though it ran at 11ms for me)
    // largely the same skeletal algorithm as the walkthrough I just did, but has individual cases/variables for each letter/stage

    // Initialize counters for each character in "croak"
    let c = 0, r = 0, o = 0, a = 0, k = 0;
    let frogs = 0, maxFrogs = 0;

    for (let char of croakOfFrogs) {
        if (char === 'c') {
            c++;
            frogs++;
        } else if (char === 'r') {
            r++;
        } else if (char === 'o') {
            o++;
        } else if (char === 'a') {
            a++;
        } else if (char === 'k') {
            k++;
            frogs--;
        }

        // Check if the sequence is valid
        if (r > c || o > r || a > o || k > a) {
            return -1;
        }

        // Update the maximum number of frogs needed
        maxFrogs = Math.max(maxFrogs, frogs);
    }

    // Check if all croaks are complete
    if (c === r && r === o && o === a && a === k) {
        return maxFrogs;
    } else {
        return -1;
    }
}

var minNumberOfFrogsUnoptimal = function(croakOfFrogs) {
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

        if (cCount < rCount || rCount < oCount || oCount < aCount || aCount < kCount) {
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