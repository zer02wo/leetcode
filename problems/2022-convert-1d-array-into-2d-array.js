// https://leetcode.com/problems/convert-1d-array-into-2d-array/
// tags: easy, array

/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function(original, m, n) {

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