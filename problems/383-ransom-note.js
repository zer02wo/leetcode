// https://leetcode.com/problems/ransom-note/description
// tags: easy

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    // quick thoughts:
        // 1. magazine can be longer than ransomNote, but not vice versa
        // 2. only dealing with lowercase English letters, which means O(26) constant time potential
        // 3. we only need to return a boolean, which could save some space complexity

    if (magazine.length < ransomNote.length) {
        return false;
    }

    // difficult to glean from the examples, but no constraints mention order, so we will assume this is unordered
    // in which case a character frequency map probably makes the most sense

    const charMap = new Map();

    for (const char of magazine) {
        if (!charMap.has(char)) {
            charMap.set(char, 0);
        }

        charMap.set(char, charMap.get(char)+1);
    }

    // reduce count from map, early return if negative count or no key at all
    for (const char of ransomNote) {
        if (!charMap.has(char) || charMap.get(char) <= 0) {
            return false;
        }

        charMap.set(char, charMap.get(char)-1);
    }

    // has required letters for construction
    return true;

    // O(r + m) -> O(n) time complexity
    // O(26) -> space complexity

    // TODO: 25ms runtime, beats 17.25% -> how can we optimise?
        // TODO: now 17ms / beats 65.58% when using Map() methods (has(), get(), set())
};

var canConstructStringReplace = function(ransomNote, magazine) {
    if (magazine.length < ransomNote.length) {
        return false;
    }

    // trying out an alt method by reducing the magazine characters by each letter of ransomNote

    for (const char of ransomNote) {
        // character not present in magazine
        if (magazine.indexOf(char) === 0) {
            return false;
        }

        // non-native indexOf
        // let matchIndex = -1;
        // for (let i = 0; i < magazine; i++) {
        //     if (char === magazine[i]) {
        //         matchIndex = i;
        //     }
        // }
        // if(matchIndex === -1) {
        //     return false;
        // }

        // remove char from magazine
        magazine = magazine.replace(char, '');
    }

    return true;

    // JavaScript strings are immutable, so this is not an in-place solution and therefore uses more memory
    // indexOf() is also an O(n) operation, meaning this is an O(n^2) time complexity

    // however, this (somewhat) surprisingly results in a better performance compared to the previous method:
    // 4ms / beats 98.41%
    // I believe this is because these built-in/native methods have improved performance (and use C/C++),
    // so this feels a little cheat-y to use e.g. replacing indexOf() with a for loop, the performance significantly drops:
    // 426ms / beats 5.04%
}