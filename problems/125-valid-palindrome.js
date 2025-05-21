// https://leetcode.com/problems/valid-palindrome/
// tags: easy, strings

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let i = 0, j = s.length - 1;

    function isAlphanumeric(char) {
        return char.match(/^[0-9a-zA-Z]+$/);
    }

    while (i < j) {
        // get next alphanumeric character from start
        while (i < j && !isAlphanumeric(s[i])) {
            i++;
        }

        // get next alphanumeric character from end
        while (i < j && !isAlphanumeric(s[j])) {
            j--;
        }

        // check characters are the same
        if (s[i].toLowerCase() !== s[j].toLowerCase()) {
            return false;
        }

        // bring pointers towards middle
        i++;
        j--;
    }

    return true;

    // 3 ms / beats 85.88% (first run)
    // 13 ms / beats 11.07% (second run) ???
    // 8 ms / beats 26.37% (third run) ??
        // not sure if there is just a lot of variance in this particular problem,
        // or if I got very lucky on my first run

    // O(n) time complexity / O(1) space complexity
    // TODO: would it be faster to sanitise/normalise the string first?
        // ANS: no, see below
};

var isPalindromeNormaliseFirst = function(s) {
    // normalise string:
    s = s.toLowerCase();
    s = s.replace(/[^0-9a-z]/g, '');

    let i = 0, j = s.length - 1;

    while (i < j) {
        // check characters are the same
        if (s[i] !== s[j]) {
            return false;
        }

        // bring pointers towards middle
        i++;
        j--;
    }

    return true;

    // 7 ms / beats 35.86% (first run)
    // 5 ms / betats 62.98% (second run)

    // still O(n) time complexity, but in reality there will be more iterations over string 's'
        // i.e. once to switch to lowercase, twice to remove non-alphanumeric characters
    // previous solution was an "in-place" solution, but because JS strings are immutable
        // toLowerCase and replace will re-create the string (even if we are overwriting it)
}

// palindrome: a string that is the same read normally/forwards as it is reversed/backwards
// constraints:
    // string contains "printable ASCII characters"
    // description hints that we'll need to check for upper and lower case characters

// EXAMPLE: s = "A man, a plan, a canal: Panama"
// OUTPUT: true
    // 'amanaplanacanalpanama' is a valid palindrome, ignoring whitespace/punctuation/cases

// palindrome is a classic two pointer problem
    // just remember to account for all non-alphanumeric characters
    // we could remove them all beforehand, but that would increase the runtime?

// it's also possible to simply reverse the normalised string and compare,
    // but in practice that would result in more "iterations"
// it is probably faster when using the built-in methods