// https://leetcode.com/problems/convert-1d-array-into-2d-array/
// tags: easy, array

/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function(original, m, n) {
    // check if matrix is possible/valid
    if (m * n !== original.length) {
        // problem says to return empty 2D array
        // but actually expects empty 1D array?
        return [];
    }

    // 2D output array
    const output = [];
    // outer index for original array
    let i = 0;

    while (i < original.length) {
        const row = [];

        // alternatively, instead of nested loops, use slice:
        // original.slice(i * n, (i+1) * n);

        // construct 1D row array of appropriate size (number of columns)
        for (let j = 0; j < n; j++) {
            row.push(original[i]);
            i++;
        }

        // push row to 2D array
        output.push(row);
    }

    return output;

    // 13 ms / beats 32.88% (first run)
    // 4 ms / beats 88.36% (second run)
    // O(n) time complexity - visits each element once, despite nested loops
    // O(n) space complexity - 2D array size directly proportional to size of 1D input array
};

// given 0-index 1D integer array `original`, and two integers `m` and `n`:
    // create a 2D array with `m` rows and `n` columns using all elements from `original`
        // elements from indicies 0 -> n-1 (inclusive) of original should form first row
        // elements from indicies n -> 2 * n-1 (inclusive) should form second row
        // etc.
    // return an `m x n` 2D array constructed according to above procedure
        // return an empty 2D array if impossible

// EXAMPLE: original = [1,2,3,4], m = 2, n = 2
// OUTPUT: [[1,2],[3,4]]

// EXAMPLE: original = [1,2,3], m = 2, n = 1
// OUTPUT: []
    // impossible to fit 3 elements in 2x1 2D array

// constraints:
    // 1 <= original.length <= 5 * 10^4
    // 1 < = original[i] <= 10^5
    // 1 <= m, n <= 4 * 10^4

// intuition: for a 2D array to be valid
    // m x n === original.length
// as the problem does not appear to allow empty elements

// check matrix is possible
// for each m elements in array
    // create a new array (a row of size m)
// continue until array is fully traversed
    // columns are not needed, outside of original matrix validation