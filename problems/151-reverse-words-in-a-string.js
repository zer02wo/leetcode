// https://leetcode.com/problems/reverse-words-in-a-string/
// tags: medium, strings

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let output = [];
    // as strings are immutable, lets use an array to build words
    let word = [];

    for (let i = 0; i < s.length; i++) {
        // encountered a space handle start/end of a word
        if (s[i] === ' ') {
            // don't push an empty "word"
            if (word.length) {
                output.push(word.join(''));
            }

            // reset current word
            word = [];
        } else {
            // any other character is part of the word
            word.push(s[i]);
        }
    }

    // push final word, if it exists
    if (word.length) {
        output.push(word.join(''));
    }

    // iterate backwards through collected words
        // could also do two pointers and swap words
    let reversedOutput = '';
    for (let j = output.length - 1; j >= 0; j--) {
        reversedOutput += output[j];

        // add spaces between words, prevent trailing space for last word
        if (j > 0) {
            reversedOutput += ' ';
        }
    }

    return reversedOutput;

    // 7 ms / beats 11.74%
        // obviously going to be slower than using built-in methods running on native code

    // O(n + m) time complexity = O(n)
        // n is the number of characters in s, m is the number of words in s
    // using join() feels fair to prevent re-building the string whilst concatenating the words

    // this problem feels a bit odd,
    // it feels like the description should have put some more constraints on how to approach this
    // or perhaps this should be limited to languages with mutable strings,
        // at which point maybe this becomes a hard problem?
}

var reverseWordsSimple = function(s) {
    // split sentence into array of words, filtering out empty strings
    const words = s.split(' ').filter(word => word);

    // reverse array order and convert to string
    return words.reverse().join(' ');

    // 1 ms  / beats 83.81%
    // as mentioned below this feels like it avoids the problem, rather than engaging with it
    // TODO: implement a solution without using (only) built-in methods
};

// objective is to reverse the order of words in a sentence, not reverse the contents of words
    // AKA almost Yoda-ifying the sentence

// EXAMPLE: s = "  the  sky is    blue   "
// OUTPUT: "blue is sky the"
    // word order is reversed, but words themselves stay the same
    // leading/trailing whitespace is expected to be removed

// constraints:
    // s will always contain *at least* one word
    // s wcontains English letters (upper & lower), digits & spaces ' '

// similar to leetcode #520, this seems like another relatively simple one if you rely on built-ins:
    // trim the string
        // edit: this is actually unnecessary because of filtering later on
    // split the string on spaces
    // remove empty strings (due to multiple spaces)
    // reverse the array of words
    // return array joined as string with spaces
// see reverseWordsSimple()

// but is that again a bit cheat-y/not in the spirit of the problem?
// alternate solution to showcase algorithimic logic better:
    // iterate through string
        // any alphanumeric character after a space (or at the beginning of the string) is the start of a new word
            // concatenate/push characters to make a word
        // any space after an alphanumeric character is the end of that word
    // push the word to an array
    // iterate backwards through the array of words to construct the string
        // could unshift() to the front of the array, but probably slower in practicality?
// see reverseWords()