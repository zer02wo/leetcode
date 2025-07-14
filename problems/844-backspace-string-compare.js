// https://leetcode.com/problems/backspace-string-compare/
// tags: easy, string

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {

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

// first thought: brute force / O(n) memory
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