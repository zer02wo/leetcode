// https://leetcode.com/problems/spiral-matrix/
// tags: medium, array, matrix

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {

};

// given `m x n` matrix, return all elements in "spiral" order
    // i.e. starting at top left, finishing at centre

// EXAMPLE: [[1,2,3],[4,5,6],[7,8,9]]
// OUTPUT : [1,2,3,6,9,8,7,4,5]
// 1 > 2 > 3
//         v
// 4 > 5   6
// ^       v
// 7 < 8 < 9

// EXAMPLE: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// OUTPUT: [1,2,3,4,8,12,11,10,9,5,6,7]
// 1 > 2 > 3 > 4
//             v
// 5 > 6 > 7   8
// ^           v
// 9 < 10<11 <12

// intuition: find the pattern
    // there is going to be a pattern to the indicies for creating this spiral patter
    // walk through a small example and see if a pattern emerges

// EXAMPLE WALKTHROUGH:
// [0,0]
// [1,0]
// [2,0]
// [2,1]
// [2,2]
// [1,2]
// [0,2]
// [0,1]
// [1,1]

// doesn't seem like a mathematical formula (or at least not a simple one)
// but a *relatively* simple algorithm (at least to describe):
    // iterate along direction until reaching a boundary
    // then rotate 90 degrees and continue along direction
// rotating 90 degrees is switching the axis of movement and/or reversing the iteration direction
    // e.g. posX -> posY
    // e.g. posY -> negX
    // e.g. negX -> negY
    // e.g. negY -> posX
// also need to be aware of reducing the boundary after a row/column has been fully explored
    // e.g. instead of going 7 -> 4 -> 1, we hit a boundary at 1 and instead the path is 7 -> 4 -> 5

// iterate until m x n elements have been processed
// we need (at least):
    // an output array
    // an x/column coordinate
    // a y/row coordinate
    // an x direction
    // a y direction
    // an x boundary
    // a y boundary