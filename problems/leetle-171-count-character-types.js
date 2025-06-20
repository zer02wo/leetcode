// leetle 171 - https://leetle.app/?date=2025-06-20
// I'm not able to find an actual leetcode problem that matches this
// pasting description below for posterity:

// 171. Count Character Types

// Write a function solve that counts different types of characters in a string.
// Return a dictionary/object with counts for: vowels, consonants, digits, and spaces.
// Note: Vowels are a, e, i, o, u (case insensitive).

// Example:
// Input: "Hello World 123"
// Output: {"vowels": 3, "consonants": 7, "digits": 3, "spaces": 2}

// Test Case 1:
// Input: s = "Hello World 123"
// Output: {"consonants":7, "digits":3, "spaces":2, "vowels":3}

// Test Case 2:
// Input: s = ""
// Output: {"consonants":0, "digits":0, "spaces":0, "vowels":0}

// Test Case 3:
// Input: s = "AEIOU"
// Output: {"consonants":0, "digits":0, "spaces":0, "vowels":5}

// Test Case 4:
// Input: s = "bcdfg"
// Output: {"consonants":5, "digits":0, "spaces":0, "vowels":0}

// Test Case 5:
// Input: s = "12345"
// Output: {"consonants":0, "digits":5, "spaces":0, "vowels":0}

// Test Case 6:
// Input: s = " "
// Output: {"consonants":0, "digits":0, "spaces":3, "vowels":0}

function solveRegex(s) {
    // flags: /g used to get all matches, /i used to check case insensitive
    // optional chaining on length, otherwise if null result return a count of 0
    return {
        // matches vowels i.e. chars in group [aeiou]
        vowels: s.match(/[aeiou]/gi)?.length ?? 0,
        // matches consonants i.e. word chars (\w) that are NOT vowels or digits (\d)
        consonants: s.match(/(?![aeiou\d])\w/gi)?.length ?? 0,
        // matches digits (\d)
        digits: s.match(/[\d]/g)?.length ?? 0,
        // matches whitespace chars (\s)
        spaces: s.match(/[\s]/g)?.length ?? 0,
    };

    // passes all test cases
    // O(n) time complexity, O(1) space complexity
        // 4 passes - 1 for each character count type recorded
};

function solveNoRegex(s) {
    const counts = {
        vowels: 0,
        consonants: 0,
        digits: 0,
        spaces: 0,
    };

    // get charCode for vowel, upper & lower case
    function isVowel(code) {
        switch (code) {
            case 65:    // A
            case 69:    // E
            case 73:    // I
            case 79:    // O
            case 85:    // U
            case 97:    // a
            case 101:   // e
            case 105:   // i
            case 111:   // o
            case 117:   // u
                return true;
            default:
                return false;
        }
    }

    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);

        if (isVowel(charCode)) {
            counts.vowels++;
        } else if (!isNaN(parseInt(s[i]))) {
            counts.digits++;
        } else if (s[i] === ' ') {
            counts.spaces++;
        } else {
            // assuming no special chars (we are not provided constraints)
                // otherwise this would need a function similar to isVowel to check charCode
            counts.consonants++;
        }
    }

    return counts;

    // passes all test cases
    // O(n) time complexity, O(1) space complexity
        // single pass to get all character type counts

    // don't know if this even ends up being faster than the regex.
        // leetle has no time execution feedback
    // it's also not particularly nice to need to hardcode charCodes
};

// I can see two immediate solutions:
// 1. 4 passes of regex
    // i.e. one for each character type
    // String.prototype.match(/g) or matchAll(/g) returns an array of matches for the entire string,
        // so we can get the length from that
        // I don't think there's a way to do this in a single regex and get the count
// 2. Single pass, manually checking each character in string
    // could still use Regex like RegExp.prototype.test()
    // could also use charCodes which is likely more efficient
