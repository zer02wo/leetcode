// https://leetcode.com/problems/excel-sheet-column-title/

/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    // this is essentially converting from decimal to base 26 (but starts at A instead of 1)

    // I did do a base conversion script years and years ago, but can't remember how it worked
    // so for now, I'm going to start using the modulo operator
        // i.e. 28 = 1 remainer 2 = A remainder B
        // i.e. 701 = 26 remainder 25 = Z remainder Y
    // TODO: An extra/recursive step will be needed once the quotient > 26

    // TODO: There's probably something we can do with CharCode, but for now I'm starting with an array
    // const lettersMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let output = [];

    while (columnNumber > 0) {
        columnNumber--;

        let remainder = columnNumber % 26;

        output.push(String.fromCharCode(remainder + 65));

        columnNumber = Math.floor(columnNumber / 26);
    }

    // really struggled with this one, I was like 95% of the way there but the edge cases for multiples of 26 were throwing me off
    // turns out the answer was to simply -1 to account for the difference between 0-based and 1-based indexing
    // intuition with CharCode was also correct, but I wouldn't know the offset (65) during an interview

    return output.reverse().join('');
};