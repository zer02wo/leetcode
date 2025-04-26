// https://leetcode.com/problems/reverse-vowels-of-a-string/

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    // early return for invalid input
    if (!s) {
        return '';
    }

    // we need a list of vowels to do the comparison
    // do lowercase comparison for simplicity
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    // create array from string
    const strArray = [...s];

    // so first idea was to do a stack (First-In-Last-Out)
        // but that would require looping through to get the letters
        // and then looping through again to replace them
    // instead, a two pointer system might be better?
        // i.e. iterate until finding a vowel at each end, then swap them
        // continue until the pointers cross
    let leftIndex = 0;
    let rightIndex = s.length - 1;

    while (leftIndex < rightIndex) {
        // look for next vowel from start
        if (!vowels.includes(strArray[leftIndex].toLowerCase())) {
            leftIndex++;
        }

        // look for next vowel from end
        if (!vowels.includes(strArray[rightIndex].toLowerCase())) {
            rightIndex--;
        }

        let leftChar = strArray[leftIndex];
        let rightChar = strArray[rightIndex];

        // perform swap
        if (vowels.includes(leftChar.toLowerCase()) && vowels.includes(rightChar.toLowerCase())) {
            // sadly can't use this syntax :(
                // EDIT: Can use this again now I'm using an array :D
            [strArray[leftIndex], strArray[rightIndex]] = [strArray[rightIndex], strArray[leftIndex]];

            // strings are immutable in js, going to convert it to an array instead
            // s[leftIndex] = rightChar;
            // s[rightIndex] = leftChar;

            // proceed to next character
            leftIndex++;
            rightIndex--;
        }
    }

    // TODO: I don't mind that this is verbose, but it could probably be improved by nesting loops
    // i.e. loop forwards until the next vowel, loop backwards until the next vowel, then swap
    // might be a bit more performant as there are less checks run each loop.

    return strArray.join('');
};