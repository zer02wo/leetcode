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