// https://leetcode.com/problems/letter-case-permutation/
// tags: medium, string, array, backtracking

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {

};

// given string `s`, you can transform every letter individually to be lowercase or uppercase to create another string
// return (in any order) a list of all possible strings we could create

// EXAMPLE: s = 'a1b2'
// OUTPUT: ['a1b2','a1B2','A1b2','A1B2']

// EXAMPLE: s = '3z4'
// OUTPUT: ['3z4','3Z4']

// constraints:
    // 1 <= s.length <= 12
    // s consists of lower & uppercase English letters and digits

// intuition: recursion/backtracking
    // initially easy to oversimplify, but producing each permutation is more difficult
// for each character
    // if the character is a digit
        // only one permutation, so progress to next character
    // if the character is a letter
        // this has two permutations: uppercase & lowercase
        // push each permutation to the array
            // progress to next character in each permutation