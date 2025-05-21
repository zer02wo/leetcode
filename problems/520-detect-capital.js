// https://leetcode.com/problems/detect-capital/
// tags: easy, leetle, strings

/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
    // easier to assume all true and make false when rule broken
    let allUpperCase = true;
    let allLowerCase = true;
    let capitalised = true;

    // handle 0 separately/beforehand for simplicity & prevents additional condition checks every iteration
    const firstChar = word[0];

    if (firstChar.toLowerCase() === firstChar) {
        // first character being lowercase invalidates these rules
        allUpperCase = false;
        capitalised = false;
    } else {
        // first character being uppercase invalidates this rule
        allLowerCase = false;
    }

    // handle rest of chars
    for (let i = 1; i < word.length; i++) {
        // because we've handled first char separately, comparison is easier
        let char = word[i];

        if (char.toLowerCase() === char) {
            // any character being lowercase invalidates this rule
            allUpperCase = false;
        } else {
            // any character being uppercase invalidates this rule
            allLowerCase = false;
            // any character *after the first* being uppercase invalidates this rule
            capitalised = false;
        }

        // early return if all false
        if (!allUpperCase && !allLowerCase && !capitalised) {
            return false;
        }
    }

    // valid if any one of the rules are true
    return allUpperCase || allLowerCase || capitalised;

    // 0 ms / beats 100%
    // the only thing I might change about this is how I'm checking the case of characters
        // could define a helper function using regex or checking charCodeAt
        // not sure what would be fastest
    // this is good enough :)

    // O(n), technically the same as the previous method
        // but this will visit each character at *most* one time
        // the previous could visit each character at *most* three times
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
    // see detectCapitalUse()


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
