// https://leetcode.com/problems/backspace-string-compare/
// tags: easy, string, two pointers

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    let sIdx = s.length - 1;
    let tIdx = t.length - 1;

    // iterate backwards through strings
    while (sIdx >= 0 || tIdx >= 0) {
        // TODO: this doesn't account for consecutive backspaces
        while (s[sIdx] === '#') {
            sIdx -= 2;
        }
        while (t[tIdx] === '#') {
            tIdx -= 2;
        }

        // check if characters are equal
        if (s[sIdx] !== t[tIdx]) {
            return false;
        }

        // continue iteration
        sIdx--;
        tIdx--;
    }

    return true;
};

var backspaceCompareBruteForce = function(s, t) {
    // helper function to reduce code duplication
    function renderBackspaces(str) {
        const output = [];

        for (let i = 0; i < str.length; i++) {
            if (str[i] === '#') {
                output.pop();
            } else {
                output.push(str[i]);
            }
        }

        return output;
    }

    // build complete output for string s
    const sArray = renderBackspaces(s);

    // build complete output for string t
    const tArray = renderBackspaces(t);

    // length equality check for early return to improve runtime
    if (sArray.length !== tArray.length) {
        return false;
    }

    // check if all characters in both outputs are matching
    // TODO: could convert to strings to compare, but might be more expensive?
    for (let i = 0; i < sArray.length; i++) {
        if (sArray[i] !== tArray[i]) {
            return false;
        }
    }

    // all characters in output matches
    return true;

    // 0 ms / beats 100%
    // O(n) runtime complexity - technically O(s + t)
        // one loop for unmodified string s
        // one loop for unmodified string t
        // one loop for modified output array/stacks for s & t
            // (assuming they are equal length)
    // O(n) space complexity - technically O(s + t)
    // this did not seem particularly efficient, I'm surprised it's optimal runtime
};

// given two strings:
    // return true if they are equal when both are typed into empty text editors
    // '#' means a backspace character
        // backspacing an empty text will continue to have an empty text

// EXAMPLE: s = 'ab#c', t = 'ad#c'
// OUTPUT: true
    // s and t == 'ac' after backspaces

// EXAMPLE: s = 'ab##', t = 'c#d#'
// OUTPUT: true
    // s and t == '' after backspaces

// EXAMPLE: s = 'a#c', t = 'b'
// OUTPUT: false
    // s == 'c', t == 'b' after backspaces

// constraints:
    // 1 <= s.length, t.length <= 200
    // s and t only contain lowercase letters and '#' characters

// first thought: "brute force" / O(n) memory
    // iterate through each string
        // push() each character to an array
        // pop() when encountering a '#' (backspace)
    // compare strings for equality

// if we compare strings simulateneously,
    // there's potential for comparing too early when the strings could be equal
    // e.g. for the example of s ='ab##', t = 'c#d#'
        // if we compared 'a' === 'c', we'd incorrectly return false

// TODO: the problem suggests an O(n) time and O(1) space solution is possible
    // this would mean modifying the existing string
// I saw a hint for this to iterate backwards which makes this much simpler
    // as we're not returning the strings, just a boolean value
    // we don't need to modify/swap any values in the string
// use a pointer in each string starting at the end
    // whenever encountering a '#' skip ahead
        // continue doing this until both strings are at a lowercase letter character to compare