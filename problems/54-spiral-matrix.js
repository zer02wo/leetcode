// https://leetcode.com/problems/spiral-matrix/
// tags: medium, array, matrix

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const output = [];
    // start at [0,0]
    let x = 0; let y = 0;
    // moving along positive x (i.e. right) to start
    let dx = 1; let dy = 0;
    // define boundaries
    let rowMin = 0;
    let rowMax = matrix.length;
    let colMin = 0;
    let colMax = matrix[0].length;

    // total number of elements in matrix
    const nm = rowMax * colMax;

    for (let i = 0; i < nm; i++) {
        // push element to output array
        output.push(matrix[y][x]);

        // check if coordinate will exceed any boundary in next move
            // 1. change direction (i.e. rotate 90 degrees)
            // 2. constrain boundaries
        if (x + dx >= colMax) {
            dx = 0; dy = 1;
            rowMin++;
        } else if (y + dy >= rowMax) {
            dx = -1; dy = 0;
            colMax--;
        } else if (x + dx < colMin) {
            dx = 0; dy = -1;
            rowMax--;
        } else if (y + dy < rowMin) {
            dx = 1; dy = 0;
            colMin++;
        }

        // moving position == coordinate + direction
        // i.e. dir = 1 (positive), dir = 0 (stationary), dir = -1 (negative)
        x += dx;
        y += dy;
    }

    return output;

    // 0 ms / beats 100%
    // O(m * n) time complexity - visits each element once
    // O(1) time complexity - lots of variables, but all static size

    // this question was really difficult,
        // lots of variables/directions/conditions to keep track of
    // pretty satisfying to get there in the end
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