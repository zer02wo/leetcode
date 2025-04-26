// https://leetcode.com/problems/find-all-anagrams-in-a-string/

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagramsSlow = function(s, p) {
    // first idea is iterate through elements
        // create a substring for the next p-1 elements
        // remove all letters from p in the substring
            // if substring is empty, return the index
    // intuition: only need to go through s-p elements
        // slight optimisation/prevents bound issues

    const output = [];
    const length = s.length - p.length;

    for (let i = 0; i <= length; i++) {
        const upperBound = i + p.length;
        let str = s.substring(i, upperBound);

        // we could either loop through p and remove each letter
        // or we could do a bitwise comparison?

        for (const char of p) {
            if (str.includes(char)) {
                str = str.replace(char, '');
            }
        }

        if (!str) {
            output.push(i);
        }
    }

    // This approach gets time limit exceeded on a very long string (10k characters)
    // Instead of creating a new substring each iteration, how about popping the previous element off the front
    // and adding the new element to the end (queue structure)

    return output;
};

var findAnagramsStrArrayIssue = function(s, p) {
    const output = [];
    const length = s.length - p.length;

    // -1 from upper bound for 0th iteration
    // add empty char to front for 0th iteration
        // saves checking a condition every iteration
    let str = ' ' + s.substring(0, p.length - 1);

    for (let i = 0; i <= length; i++) {
        // remove previous element
        str.shift();
        // add new element at upper bound
        str += i + (p.length - 1);

        // Instead of removing/updating the string we could do a counter instead?
        // I don't think we can do an early return because it's not ordered
        let matchCount = 0;
        for (const char of p) {
            if (str.includes(char)) {
                matchCount++;
            }
        }

        if (matchCount === p.length) {
            output.push(i);
        }
    }

    // This approach won't work either, because even though a string is basically an array of chars
    // I cannot use the 'Array.shift()' method.
    // What if instead of creating a different structure, I just reference the two relevant indicies as the start/end

    return output;
}

var findAnagramsEvenSlower = function(s, p) {
    const output = [];
    const length = s.length - p.length;

    for (let i = 0; i <= length; i++) {
        const upperBound = i + p.length;
        let lettersHash = {};

        for (let lowerBound = i; lowerBound < upperBound; lowerBound++) {
            // how can I exclude duplicates without deleting the structure,
            // do I need to create a hashmap for the letter count again?
            let char = s[lowerBound];

            if (!lettersHash[char]) {
                lettersHash[char] = 0;
            }

            lettersHash[char] += 1;
        }

        for (let char of p) {
            // contains an unknown letter, cannot be an anagram
            if (!lettersHash[char]) {
                continue;
            }

            lettersHash[char] -= 1;

            if (lettersHash[char] === 0) {
                delete lettersHash[char];
            }
        }

        if (Object.keys(lettersHash).length === 0) {
            output.push(i);
        }
    }

    // This approach ALSO gets time limit exceeded on a very long string (10k characters)
    // I kind of figured it would because it has 2 loops nested inside a loop O(2n^2) or O(n^3) ?
    // pretty stumped on this one

    // I need to prevent re-calculating the HashMap for p each iteration

    return output;
}


var findAnagrams = function(s, p) {
    const output = [];
    const length = s.length - p.length;

    // NOTE: Moved this into the loop below to prevent an additional +O(p) time
    // create frequency of letters in p
    // const lettersHash = {};
    // for (let char of p) {
    //     if (!lettersHash[char]) {
    //         lettersHash[char] = 0;
    //     }

    //     lettersHash[char] += 1;
    // }

    // create frequency of letters in s and p (from 0 to p.length)
    const lettersHash = {}; // p
    const substrHash = {}; // s
    for (let i = 0; i < p.length; i++) {
        let pChar = p[i];
        let sChar = s[i];

        lettersHash[pChar] = 1 + (lettersHash[pChar] || 0);
        substrHash[sChar] = 1 + (substrHash[sChar] || 0);
    }

    // iterate through s
    for (let index = 0; index <= length; index++) {
        // only update HashMap with changed letters (i.e. one removed, one added)
        if (index !== 0) {
            let previousChar = s[index-1];
            let nextChar = s[index + (p.length-1)];

            substrHash[previousChar] -= 1;
            // prevent going below 0
            if (substrHash[previousChar] < 0) {
                substrHash[previousChar] = 0;
            }

            if (!substrHash[nextChar]) {
                substrHash[nextChar] = 0;
            }

            substrHash[nextChar] += 1;
        }

        // check that the two HashMaps are still the same
            // looping through substring is slow
            // instead compare by keys = max of O(26)

        let isMatching = true;
        for (let key of Object.keys(lettersHash)) {
            if (lettersHash[key] !== substrHash[key]) {
                isMatching = false;
                break;
            }
        }

        if (isMatching) {
            output.push(index);
        }
    }

    // still not particularly happy with this, feels unoptimal

    return output;
}