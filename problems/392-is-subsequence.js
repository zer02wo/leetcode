// https://leetcode.com/problems/is-subsequence/
// tags: easy, strings

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    // handle edge cases
    if (!s.length) {
        return true;
    }

    if (s.length > t.length) {
        return false;
    }

    let subsequenceIndex = 0;

    for (const char of t) {
        // characters matching
        if (s[subsequenceIndex] === char) {
            // increment subsequence to next character (index)
            subsequenceIndex++;

            // all characters in subsequence have been found
            if (subsequenceIndex >= s.length) {
                return true;
            }
        }
    }

    return false;

    // 1 ms / beats 72.44%
    // O(n) time complexiy solution - only visits each char in t a maximum of 1 time
        // this is why we don't try to "optimise" prematurely
        // the other problem being so fresh in my memory probably doesn't help
}

var isSubsequenceWithRestart = function(s, t) {
    // handle edge cases
    if (!s.length) {
        return true;
    }

    if (s.length > t.length) {
        return false;
    }

    let subsequenceIndex = 0;
    let lastSubStart = null;

    for (let i = 0; i < t.length; i++) {
        // characters matching
        if (s[subsequenceIndex] === t[i]) {
            // keep reference to next instance of subsequence beginning char
            if (!lastSubStart && subsequenceIndex !== 0 && s[0] === t[i]) {
                lastSubStart = i;
            }

            // increment subsequence to next character (index)
            subsequenceIndex++;

            // all characters in subsequence have been found
            if (subsequenceIndex >= s.length) {
                return true;
            }
        }

        // reached the end without finding subsequence, check again for different sequence beginning
        if (i === t.length - 1 && lastSubStart) {
            // set outer loop to last instance of first character
            // - 1 due to automatic i++ in outer loop
            i = lastSubStart - 1;

            // reset subsequence order
            lastSubStart = null;
            subsequenceIndex = 0;
        }
    }

    return false;

    // 2 ms / beats 36.04%
    // o(n * m) time complexity, O(1) space complexity
        // I think I relied too heavily on my recent completion of #28
        // because only relative position matters, there's no need to restart
    // TODO: remove unnecessary restart logic
};

// subsequence: a new string formed from original string by deleting some (or none) of the characters
    // relative positions must remain in the same order
// better illustrated in examples below:

// EXAMPLE: s = "abc", t = "ahbgdc"
// OUTPUT: true
    // a = t[0], b = t[2], c = t[5]
    // relative order is the same

// EXAMPLE: s = "axc", t = "ahbgdc"
// OUTPUT: false
    // 'x' does not exist in original string

// EXAMPLE: s = "acb", t = "ahbgdc"
    // a = t[0] c = t[5], b = t[2]
// OUTPUT: false
    // relative order is not the same, i.e. c should appear before b


// approach:
    // no constraint that s < t, so we need to handle that edge case
    // iterate through t until finding s[0]
    // continue iterating through to find s[1], s[2], etc...
    // there will need to be some form of backtracking if not found
        // e.g. like searching for 'issip' in 'mississipi' for leetcode #28
            // feels pretty similar to that problem in general

// not using String.indexOf() as that feels like cheating