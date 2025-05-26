// https://leetcode.com/problems/valid-perfect-square/
// tags: easy, leetle, maths

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function num() {

}

var isPerfectSquareBruteForce = function(num) {
    // handle 1 as an edge case
    if (num === 1) {
        return true;
    }

    let isSquare = false;
    // smallest even square root
    let i = 2;

    // if square is odd, so is the square root
    if (num % 2 !== 0) {
        // smallest odd square root
        i = 3;
    }

    // any square root (other than 1) <= (1/2 * num)
    while (i <= num / 2) {
        // check for square
        if (i * i === num) {
            return true;
        }

        // go to next even/odd number respectively
        i += 2;
    }

    return isSquare;

    // 939 ms / beats 5.72%
    // obviously slow, but a decent brute force
        // 1837 ms / beats 5.01% when not checking for odd/even numbers

    // TODO: what's an efficient way to further narrow down the sample space?
        // binary search!
};

// identify if a number is a 'perfect square'
    // definition: an integer that is the square of an integer
        // i.e. it is the product of some integer with itself

// EXAMPLE: num = 16
// OUTPUT: true
    // 4 * 4 = 16

// constraint: **must not use any built-in library function, such as sqrt()**

// there is almost definitely a maths formula to calculate a square root, but I don't know what that is
    // so let's try brute force

// perfect squares: 1, 4, 9, 16, 25, 36, etc.
// perfect sqroots: 1, 2, 3,  4,  5,  6, etc.

    // other than 1, all square roots are >= 1/2 of the original value
    // we know that odd squares must have an odd square root (odd * odd = odd, even * even = even)
    // this at least reduces the sample space to search