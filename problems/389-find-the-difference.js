// https://leetcode.com/problems/find-the-difference/

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifferenceWrongInterpretation = function(s, t) {
    // description says t is generated from s with an additional letter
    // so if s is empty, the difference is t
    if (!s) {
        return t;
    }

    // intuition is to loop through t via index, compare to same index at s
    for (let i = 0; i < t.length; i++) {
        if (!s[i]) {
            return t[i];
        }

        if (s[i] !== t[i]) {
            return t[i];
        }
    }

    // I've misunderstood the question (examples weren't great)
    // we can't iterate through sequentially because they are ordered differently
};

var findTheDifference = function(s, t) {
    // next idea is to count the number of each letter and compare the difference
    const letters = {};

    for (const char of t) {
        if (!letters[char]) {
            letters[char] = 0
        }

        letters[char] += 1;
    }

    for (const letter of s) {
        letters[letter] -= 1;

        // remove key if no letters remain
        if (letters[letter] === 0) {
            delete letters[letter];
        }
    }

    return Object.keys(letters)[0];
}

// TODO: Already seen that a bitwise operation is possible