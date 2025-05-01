// leetcode.com/problems/check-if-the-sentence-is-pangram/
// tags: easy

/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function(sentence) {
    // another problem that seems perfectly suited to a frequency map
    // space O(26) / constant as we're only dealing with lowercase english alphabet

    // we need at least 26 letters to form a pangram
    if (sentence.length < 26) {
        return false;
    }

    const charMap = new Map();

    // loop through each character of sentence to build frequency map
    for (const char of sentence) {
        charMap.set(char, (charMap.get(char) || 0) + 1);

        // we can early return if we already have 26 characters
        if (charMap.size === 26) {
            return true;
        }
    }

    return false;

    // 1ms / beats 82.06%
    // other data structures (e.g. Set, or a pre-filled array) might be faster - but this is good/readable enough
    // incredibly quick/easy one today, this pattern appears a lot
};