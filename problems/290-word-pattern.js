// https://leetcode.com/problems/word-pattern/
// tags: easy, leetle, string, hash map

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    // convert string of words into array of words
    const sArray = s.split(' ');

    // pattern cannot be valid if cannot fully map pattern to s
    if (sArray.length !== pattern.length) {
        return false;
    }

    // due to bijective (one-to-one) mapping,
        // we need to check this relationship both ways
    // using two HashMaps allows us to do O(1) lookups for value => key,
        // instead of searching the Object.values() (i.e. O(m))

    // mapping word s (key) to char pattern (value)
    const sMap = new Map();
    // mapping char pattern (key) to word s (value)
    const pMap = new Map();

    for (let i = 0; i < pattern.length; i++) {
        const sWord = sArray[i];
        const pChar = pattern[i];

        // two if conditions for readability, could be a single condition
        if (sMap.has(sWord) && sMap.get(sWord) !== pChar) {
            return false;
        }

        if (pMap.has(pChar) && pMap.get(pChar) !== sWord) {
            return false;
        }

        sMap.set(sWord, pChar);
        pMap.set(pChar, sWord);
    }

    return true;

    // 0 ms / beats 100%
    // O(n) time complexity, O(n) space complexity
    // basically the same as a problem I've seen before (#205),
        // so not surprised I got it quickly/on first run
};

var wordPatternOneMapOneSet = function(pattern, s) {
    // same principle as previous solution above, but using a Set instead of one of the Maps

    const sArray = s.split(' ');

    if (sArray.length !== pattern.length) {
        return false;
    }

    const pMap = new Map();
    // using Set instead of Map
    const seenWords = new Set();

    for (let i = 0; i < pattern.length; i++) {
        const sWord = sArray[i];
        const pChar = pattern[i];

        // if we have seen this pattern character before:
        if (pMap.has(pChar)) {
            // it should map to the current word
            if (pMap.get(pChar) !== sWord) {
                return false;
            }
        } else { // we haven't seen this character before
            // which means we shouldn't have seen this word before
            if (seenWords.has(sWord)) {
                return false;
            }

            // set mapping / mark word as seen
            pMap.set(pChar, sWord);
            seenWords.add(sWord);
        }
    }

    return true;

    // 0 ms / beats 100%
    // a little less intuitive/harder to read than the two Maps solution (in my opinion)
    // but would use a bit less memory in practice, despite having same time/space complexity in big-O notation
};

// find if string s follows the pattern (defined as a string),
// specifically: full match such that there is a bijection between a letter in pattern and a non-empty word in s
    // each letter in pattern maps to exactly one unique word in s
    // each unique word in s maps to exactly one letter in pattern
    // no two letters map to the same word
    // no two words map to the same letter


// EXAMPLE: pattern = 'abba', s = 'dog cat cat dog'
// OUTPUT: true
    // bijection established as:
        // 'a' maps to 'dog'
        // 'b' maps to 'cat'

// EXAMPLE: pattern = 'abba', s = 'dog cat cat fish'
// OUTPUT: false
    // 'a' maps to 'dog'
    // 'b' maps to 'cat'
    // 'a' cannot map to 'fish', because it already maps to 'dog'

// EXAMPLE: pattern = 'aaaa', s = 'dog cat cat dog'
// OUTPUT: false
    // 'a' maps to dog
    // 'a' cannot map to 'cat', because it already maps to 'dog'

// constraints:
    // s contains only lowercase English letters and spaces
    // s does not contain any leading or trailing spaces
    // all the words in s are separated by a single space

// intuition:
    // this seems very similar to leetcode #205 (isomorphic strings)
    // as we need to establish a mapping, a Map structure makes sense

// as we are provided s as a string, we will need to create an array
    // constraints tell us we can simply split on ' '
// iterate through s & pattern simultaneously to create mapping:
    // sArray[i] == pattern[i]
// return false if existing mapping is violated

// similar to leetcode #205, the difficulty will come from checking the mapping of value => key
    // I think I used two maps to solve this previously, but maybe there is a better solution