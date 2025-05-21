// https://leetcode.com/problems/detect-capital/
// tags: easy, leetle, strings

/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {

};

var detectCapitalUseSimple = function(word) {
    // all uppercase
    if (word.toUpperCase() === word) {
        return true;
    }

    // all lowercase
    if (word.toLowerCase() === word) {
        return true;
    }

    // only first letter capitalised
    if (word.match(/^[A-Z][a-z]*$/)) {
        return true;
    }

    return false;

    // 0 ms / beats 100%
    // as noted below, this does feel a bit cheat-y using built-ins
    // TODO: attempt to solve this in a single iteration
};

// following rules for valid use of capital letters in a word:
    // 1. all letters in word are capitals - e.g. "USA"
    // 2. all letters in word are lowercase - e.g. "leetcode"
    // 3. only first letter in word is capital - e.g. "Google"

// constraints:
    // 1 <= word.length <= 100
    // word consists of lowercase and uppercase English letters

// originally I thought we might have to split & handle words by spaces, so that at least makes this easier
// my first thought is to have 3 booleans, check all of them throughout the string:
    // allUpperCase, allLowerCase, isCapitalised
        // i.e. when finding a lowercase letter, allUpperCase is now false/invalid
        // i.e. when finding an uppercase letter, allLowerCase is now false/invalid
        // etc.

// then return an OR combination at the end to see if one of those conditions is valid



// there are obviously some simpler methods that could be used:
    // e.g. to check case #1:
        // word.toUpperCase() === word
        // proves that all letters in word are uppercase
    // e.g. to check case #2:
        // word.toLowerCase() === word
        // proves that all letters in word are lowercase
    // e.g. to solve case #3:
        // word.match(/^[A-Z][a-z]*$/)
        // regex to test only first letter capitalised, all else lowercase

    // but this requires an iteration for each case, rather than doing everything in a single iteration
        // see detectCapitalUseSimple()
