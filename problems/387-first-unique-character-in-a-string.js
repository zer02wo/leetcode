// https://leetcode.com/problems/first-unique-character-in-a-string/description/

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqCharNPlus26 = function(s) {
    // first thought is to consider is an early return possible?
        // I don't *think* so, you need to go through all letters to make sure there is no duplicates
        // e.g. racecar has a duplicate at the first and last

    // initial idea is to create a HashMap of the count of each letter
        // then return the first key
    // O(n + 26)

    const charMap = {};

    for (let i = 0; i < s.length; i++) {
        if (!charMap[s[i]]) {
            // TODO: using a second object to store data feels unoptimal
            charMap[s[i]] = {
                firstIndex: i,
                count: 0,
            };
        }

        charMap[s[i]].count += 1;
    }

    for (const [key, data] of Object.entries(charMap)) {
        if (data.count === 1) {
            return data.firstIndex;
        }
    }

    // string entirely comprised of duplicates
    return -1;
};

var firstUniqChar2N = function(s) {
    // initial idea is to create a HashMap of the count of each letter
        // then iterate through the string again to find the first index where count == 1
    // O(2n)

    const charMap = {};

    for (const char of s) {
        if (!charMap[char]) {
            charMap[char] = 0;
        }

        charMap[char] += 1;
    }

    for (let i = 0; i < s.length; i++) {
        if (charMap[s[i]] === 1) {
            return i;
        }
    }

    // string entirely comprised of duplicates
    return -1;
};

var firstUniqChar = function(s) {
    // because we know the character set is O(26) (the lowercase alphabet)
    // it might be quicker to iterate through the characters instead of the string

    let uniqueIndex = Infinity;

    for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
        // prevent calculating index twice (or thrice)
        let firstIndex = s.indexOf(letter);

        if (firstIndex !== -1) {
            // NOTE: I'm surprised this is so much faster than the other methods
                // I would've thought s.indexOf and s.lastIndexOf are both O(n) operations
                // meaning this would be O(26 * 2n) = O(52n) ?
                    // (I know this scales down to O(n) in asymptotic notation, but it's still a maximum of 52 times searching the string vs 2)
            if (firstIndex === s.lastIndexOf(letter)) {
                uniqueIndex = Math.min(uniqueIndex, firstIndex);
            }
        }
    }

    return uniqueIndex === Infinity ? -1 : uniqueIndex;
}