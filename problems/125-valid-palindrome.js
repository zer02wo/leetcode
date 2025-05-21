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

    // 3 ms / beats 85.88%
    // O(n) time complexity / O(1) space complexity
    // TODO: would it be faster to sanitise/normalise the string first?
};

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