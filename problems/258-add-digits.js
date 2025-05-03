// https://leetcode.com/problems/add-digits/
// tags: easy, leetle

/**
 * @param {number} num
 * @return {number}
 */
var addDigitsNaive = function(num) {
    // split num into digits, sum digits until num < 10

    // seems like a really easy problem, especially after reviewing [202] / sum of squares yesterday
    while (num >= 10) {
        let n = num;
        let sum = 0;

        while (n > 0) {
            // add digit to sum
            const digit = n % 10;
            sum += digit;
            // remove current digit / shift other digits down
            n = Math.floor(n / 10);
        }

        num = sum;
    }

    return num;

    // 0 ms / beats 100%
    // TODO: this question also poses a potential O(1) solution without using any loop/recursion
};

// O(1) solution approach notes:
    // what is the pattern for the answers?
    // num < 10, return num
    // 10=1+0=1, 11=1+1=2, 12=1+2=3, ..., 18=1+8=9, 19=1+9=10=1+0=1                 (first number to be >= 10 on first "iteration")
    // 20=2+0=2, 21=2+1=3, 22=2+2=4, ..., 27=2+7=9, 28=2+8=10=1+0=1, 29=2+9=1+1=2
    // 30=3+0=3, ..., 37=3+7=10=1+0=1, ..., 46=4+6=10=1+0=1, ..., 55=5+5=10=1+0=1   (a pattern is emerging every 9 numbers)
    // 31=3+1=4, ..., 40=4+0=4, ..., 49=4+9=13=1+3=4, ..., 58=5+8=13=1+3=4          (is this to do with the remainder of % 9 ?)*

    // *E.g. 38 % 9 = 2, 49 % 9 = 4, 19 % 9 = 1, 145 % 9 = 1
    // **Except if the number is wholly divisible by 9
        // E.g. 9 % 9 = 0 (expected 9), 18 % 9 = 0 (expected 9), 27 % 9 = 0 (expected 9)
var addDigits = function (num) {
    if (num === 0) {
        return 0;
    }

    let sum = (num % 9);

    return sum ? sum : 9;

    // 0 ms / beats 100%
}