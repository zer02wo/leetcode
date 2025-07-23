// https://leetcode.com/problems/set-matrix-zeroes/
// tags: medium, array, matrix

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const zeroRows = new Set();
    const zeroCols = new Set();

    // first pass: identify zeroes
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            // mark the current row/column to be set to 0's
            if (matrix[row][col] === 0) {
                zeroRows.add(row);
                zeroCols.add(col);
            }
        }
    }

    // second pass: set zeroes
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            // if matrix cell aligned with zeroRows or zeroCols value
                // i.e. aligned with 0 in same row and/or column in unmodified matrix
            if (zeroRows.has(row) || zeroCols.has(col)) {
                // set element to 0
                matrix[row][col] = 0;
            }
        }
    }

    // 2 ms / beats 77.93% (first run)
    // 1 ms / beats 95.85% (second run)
    // O(m * n) time complexity - two iterations
    // O(m + n) space complexity - space for rows + space for cols

    // really happy with this solution and how quickly I arrived at it
    // even beats 88.27% on memory as well which is nice

    // TODO: how to improve this to constant space?
};

// given an `m x n` integer matrix:
    // if an element is 0, set its entire row and columns to 0's
// you must do it in place

// EXAMPLE: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// OUTPUT: [[1,0,1],[0,0,0],[1,0,1]]
// 1 1 1    1 0 1
// 1 0 1 => 0 0 0
// 1 1 1    1 0 1

// EXAMPLE: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// OUTPUT: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
// 0 1 2 0      0 0 0 0
// 3 4 5 2  =>  0 4 5 0
// 1 3 1 5      0 3 1 0

// constraints:
    // m == matrix.length
    // n == matrix[0].length
    // 1 <= m, n <= 200
    // -2^31 <= matrix[i][j] <= (2^31) - 1

// intuition: two passes
    // if we try to update the 0 values as we discover them,
    // we would result in every row and column being set to 0
// first pass: find the original 0's
    // i.e. the purple 0's in the leetcode diagrams
    // create an array (or maybe a Set) for the rows
    // create an array (or maybe a Set) for the columns
    // iterate through the matrix by row => column
        // push the row/column to the relevant data structures
// second pass: set the new 0's
    // i.e. the blue 0's in the leetcode diagrams
    // iterate through the matrix again row => column
        // if the current row/column intersects with one of the values in the data structure
            // update its value to be zero
// using a Set would almost definitely be better to allow O(1) lookups and prevent duplicates
// this would be O(m + n) space complexity

// TODO: the problem describes the possibility for a constant space solution