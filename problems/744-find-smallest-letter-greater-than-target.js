// https://leetcode.com/problems/find-smallest-letter-greater-than-target/
// tags: easy, array, binary search

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {

};

// given alphabetically sorted array of letters, and character target
// return smallest character in letters that is *lexicographically* greater than target.
    // if such a character does not exist, return the first character in letters

// EXAMPLE: letters = ['c','f','j'], target = 'a'
// OUTPUT: 'c'
    // 'c' < 'a'

// EXAMPLE: letters = ['c','f','j'], target = 'c'
// OUTPUT: 'f'
    // 'c' == 'c'
    // 'f' > 'c'

// EXAMPLE: letters = ['x','x','y','y'], target = 'z'
// OUTPUT: 'x'
    // i.e. no characters lexicographically greater than 'z', return letters[0]

// constraints:
    // 2 <= letters.length <= 10^4
    // letters[i] is a lowercase English letter
    // target is a lowercase English letter
    // letters sorted *non-decreasing* order

// intuition: as we are given a sorted input, we use binary search O(log n)
    // this would likely be trivial to brute force as O(n)
    // see leetcode #704 for explanation on general binary search algorithm
// specifically here we're dealing with characters instead of numbers
    // so we likely want to use charCode for the comparison
        // but JS does allow string greater/less-than comparisons too
    // this means we don't need to create some sort of additional memory structure to compare by index (for example)