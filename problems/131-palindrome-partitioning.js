// https://leetcode.com/problems/palindrome-partitioning/
// tags: medium, string

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {

};

// given string `s`: partition it such that every substring of the partition is a palindrome
// return all possible palindrome partitioning of `s`

// EXAMPLE: s = 'aab'
// OUTPUT: [['a','a','b'],['aa','b']]
    // all single characters count as a palindrome
    // 'aa' also counts as a palindrome

// EXAMPLE: s = 'abbab'
// OUTPUT: [
//  ['a','b','b','a','b'],
//  ['a','b','bab'],
//  ['a','bb','a','b'],
//  ['abba','b'],
// ]

// constraints:
    // 1 <= s.length <= 16
    // s contains only lowercase english letters

// intuition: recursion/backtracking and/or dynamic programming
    // given that we want to generate combinations this suggests recursion/backtracking
    // but the palindrome condition/complexity suggests some form of dynamic programming to optimise
// at each step of generating the substring:
    // leave current substring
    // add next character to current substring
// the exact implementation might be easier to identify after performing a walkthrough

// EXAMPLE WALKTHROUGH DECISION TREE: s = 'abbab'
    // left branch = keep current, right branch = concatenate to current
    // we can always start with s[0]
//                                                                  a
//                                            a,b                                                                  ab
//                      a,b,b                                                a,bb                       ab,b                abb
//        a,b,b,a                a,b,ba                         a,bb,a               a,bba                        abb,a           abba
// [a,b,b,a,b]   a,b,b,ab   a,b,ba,b   [a,b,bab]        [a,bb,a,b]   a,bb,ab   a,bba,b   a,bbab                            [abba,b]   abbab

// we can return if one of the substrings isn't a palindrome (after we start the next substring)
    // we can't return before starting the next substring otherwise we potentially miss some palindromes
    // e.g. 'abb' is not a palindrome, but 'abba' is