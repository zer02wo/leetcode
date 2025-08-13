// https://leetcode.com/problems/palindrome-partitioning/
// tags: medium, string, recursion, backtracking

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const output = [];

    // palindrome helper function
    function isPalindrome(substring) {
        // two pointers approach
        let start = 0;
        let end = substring.length - 1;

        // continue until pointers cross/overlap
        while (start < end) {
            // letters do not match, not a palindrome
            if (substring[start] !== substring[end]) {
                return false;
            }

            // move pointers towards middle
            start++;
            end--;
        }

        // all letters matched, is a palindrome
        return true;
    }

    // recursive backtracking helper function
    // TODO: is it more efficient to pass lastSubstring or to look it up from the end of the array?
        // i.e. partition.at(-1) or partition[partition.length - 1]
    function createPartitions(partition, lastSubstring, index) {
        // check if the last substring added to the partition is a palindrome
        const isLastSubstringPalindrome = isPalindrome(lastSubstring);

        if (index === s.length) {
            // validate output before returning
            if (isLastSubstringPalindrome) {
                // push partition to output - cloned to prevent modifying by reference
                output.push([...partition]);
            }

            return;
        }

        // last substring is a valid palindrome
        if (isLastSubstringPalindrome) {
            // we can create a recursive branch where we create a new substring in the partition using the current character
            partition.push(s[index]);
            createPartitions(partition, s[index], index + 1);
            // backtracking - remove newly added substring
            partition.pop();
        }

        // create a recursive branch by adding the current character to the last substring
        // TODO: feels like there should be a nicer way to assign this without extra memory/string operations...
        const newSubstring = lastSubstring + s[index];
        partition[partition.length - 1] = newSubstring;
        createPartitions(partition, newSubstring, index + 1);
        // backtracking - remove last character from previous substring
        partition[partition.length - 1] = lastSubstring;
    }

    // initialise recursive backtracking
    createPartitions([s[0]], s[0], 1);

    return output;

    // 11 ms / beats 96.56%

    // O(2^n * n) time complexity
        // we can create (up to) 2 branches with each recursive call
        // and have to clone the array which is an O(n) operation
    // O(n) space complexity
        // recursion stack depth == n
        // we're also creating an array where size is (mostly) proportional to string length
        // string operations may not be O(n) ?

    // having to define two helper functions wasn't particularly nice
    // writing out the decision tree the way I did was also pretty tricky, would've been nicer to draw it as a picture
        // might be worth doing that moving forwards to save time/improve readability

    // TODO: seems like no dynamic programming was needed here?
        // is there a DP solution?
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
    // * = cannot continue as previous substring is not a palindrome
    // we can always start with s[0]
//                                                                  a
//                                            a,b                                                         ab
//                      a,b,b                                              a,bb                    *              abb
//        a,b,b,a                a,b,ba                         a,bb,a            a,bba                       *         abba
// [a,b,b,a,b]   a,b,b,ab       *    [a,b,bab]        [a,bb,a,b]   a,bb,ab      *       a,bbab                     [abba,b]   abbab

// drawn diagram for reference: ../visual-explanations/131-decision-tree.png

// we can return if one of the substrings isn't a palindrome (after we start the next substring)
    // we can't return before starting the next substring otherwise we potentially miss some palindromes
    // e.g. 'abb' is not a palindrome, but 'abba' is
// this means we need to check if the *previous* substring in the partition is a palindrome
    // if it is not, we cannot create a new substring and must add to the existing substring
