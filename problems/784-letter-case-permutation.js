// https://leetcode.com/problems/letter-case-permutation/
// tags: medium, string, array, backtracking

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
    const permutations = [];

    function backtrack(str, index) {
        // end of string has been reached, no further characters
        if (index === str.length) {
            // end of backtracking branch, push permutation
            permutations.push(str);
            return;
        }

        const char = s[index];
        const nextIndex = index + 1;

        // current character is a digit
        if (char >= 0 && char <= 9) {
            // no other permutations to create, so continue through string
            return backtrack(str, nextIndex);
        }

        let charAlt = '';

        if (/[a-z]/.test(char)) {
            // is lowercase, create uppercase permutation
            charAlt = char.toUpperCase();
        } else {
            // is uppercase, create lowercase permutation
            charAlt = char.toLowerCase();
        }

        // generate permutation for alternative character case
        // TODO: is there a more efficient way to do this?
        const strAlt = str.substring(0, index) + charAlt + str.substring(index+1);

        // recursively backtrack/create permutations for rest of string
        backtrack(str, nextIndex);
        backtrack(strAlt, nextIndex);
    }

    backtrack(s, 0);

    return permutations;

    // 7 ms / beats 55.28% (hacky Set / too much pushing)
    // 3 ms / beats 90.88% (after removing Set / unnecessary pushes)

    // O(2^l * n) time complexity:
        // for every letter can branch into 2 recursive calls
        // each of these calls substring() which is an O(n) operation
        // l = length of input string
    // O(2^l * n) space complexity - array of permutations

    // pretty happy with the overall approach/algorithm

        // but the use of the Set feels a bit hacky
            // seems like there's some optimisations to prevent unnecessary branching
                // or maybe just unnecessary pushing ?

    // above use of Set has now been resolved by only pushing at the END of each branch
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