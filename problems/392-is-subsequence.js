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
    let lastSubStart = null;

    for (let i = 0; i < t.length; i++) {
        // characters matching
        if (s[subsequenceIndex] === t[i]) {
            // keep reference to next instance of subsequence beginning char
            if (subsequenceIndex !== 0 && s[0] === t[i]) {
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
            subsequenceIndex = 0;
        }
    }

    return false;
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