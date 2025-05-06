// https://leetcode.com/problems/rotate-image/
// tags: medium, leetle

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {

};

// solution dictates that this must be done **in-place** (modifying original 'matrix' 2D array)

// constraints dictate the matrix will always be square (n == matrix.length == matrix[i].length)
    // between 1x1 and 20x20
// constraints also dictate the values can be positive or negative (-1000 <= matrix[i][j] <= 1000)

// example: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    // output: [[7,4,1],[8,5,2],[9,6,3]]
// easier to visualise 90 degree clockwise rotation within matrix format:
    // |1|2|3|      |7|4|1|
    // |4|5|6|      |8|5|2|
    // |7|8|9|      |9|6|3|

// in terms of data structure changes:
    // the last (3rd) array becomes the 1st index of each array
    // the middle (2nd) array becomes the 2nd index of each array
    // the first (1st) array becomes the 3rd index of each array
// so to do this *not in-place*, we could simply iterate backwards through the first array
    // then push values to the relevant index in each 2D array
// to do this *in-place*, we'll need some way to swap the values:
    // we can't mark by negation, as we need to deal with negative values

// let's see if we can find a pattern in the index changes:
    // note: 2 = n-1 (max element for this example)
    // [0][0] -> [0][2]
    // [0][1] -> [1][2]
    // [0][2] -> [2][2]

    // [1][0] -> [0][1]
    // [1][1] -> [1][1]
    // [1][2] -> [2][1]

    // [2][0] -> [0][0]
    // [2][1] -> [1][0]
    // [2][2] -> [2][0]

    // we can see then that the index [j] becomes index [i] after the swap
    // and the new index [j] = (n-1) - [i]
        // (e.g. [0] = (3-1) - [0] = 2, e.g. [1] = (3-1) - [1] = 1, e.g. [2] = (3-1) - [2] = 0)