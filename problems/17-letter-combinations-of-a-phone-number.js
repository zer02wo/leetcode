// https://leetcode.com/problems/letter-combinations-of-a-phone-number/
// tags: medium, string, recursion, backtracking

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {

};

// given string containing digits 2-9 (inclusive):
    // return all possible letter combinations that the number could represent
    // return answer in any order
// mapping of letters is like a T9 phone keyboard:
    // 1 ___  2 abc  3 def
    // 4 ghi  5 jkl  6 mno
    // 7 pqrs 8 tuv  9 wxyz
    //  *     0 ___    ^ #

// EXAMPLE: digits = '23'
// OUTPUT: ['ad','ae','af','bd','be','bf','cd','ce','cf]
    // '2' represents a, b, or c
    // '3' represents d, e, or f

// EXAMPLE: digits = ''
// OUTPUT []
    // no digits to convert to letters

// INPUT: digits = '2'
// OUTPUT: ['a','b','c']

// constraints:
    // 0 <= digits.length <= 4
    // digits[i] is a digit in the range ['2', '9']

// INTUITION: recursion/backtracking
    // given that we need to generate combinations, this is the typical pattern to use
// we'll need to define a map of the T9 keyboard:
    // 2 -> ['a','b','c']
    // 3 -> ['d','e','f']
    // ...
    // 8 -> ['t','u','v']
    // 9 -> ['w','x','y','z']
// NOTE: would it be better to use a string here or an array?
    // probably wouldn't make a difference as we're only accessing from it?
    // a string is essentially an array of characters and in this situation is fixed/immutable, so makes more sense?
    // would be easier to define the map as well

// the general algorithm is to:
    // retrieve the characters related to the current digit
    // for each character
        // add current character to combination
        // create a recursive branch
        // remove current character from combination (backtracking)

    // return combination when we've used all digits

    // return all combinations when we've traversed all branches/combinations

// EXAMPLE WALKTHROUGH/DECISION TREE: digits = 23
    // leftmost branch = first index, rightmost branch = last index
    // e.g. 'ad' is the first character of 2/3
    // e.g. 'cf' is the last character of 2/3

//          ''
//   a       b       c
// d e f   d e f   d e f

// drawn diagram for reference: ../visual-explanations/17-decision-tree.png