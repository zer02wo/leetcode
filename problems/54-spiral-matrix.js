// https://leetcode.com/problems/spiral-matrix/
// tags: medium, array, matrix

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const output = [];
    // start at [0,0]
    let x = 0;
    let y = 0;
    // moving along positive x (i.e. right) to start
    let dx = 1;
    let dy = 0;
    // define boundaries
    let rowSize = matrix.length;
    let colSize = matrix[0].length;

    for (let i = 0; i < (rowSize * colSize); i++) {
        console.log(x + ', '+ y);
        // push element to output array
        output.push(matrix[y][x]);

        // check if coordinate will exceed any boundary in next move
            // then change direction (i.e. rotate 90 degrees)
        if (x + dx >= colSize) {
            dx = 0;
            dy = 1;
        } else if (y + dy >= rowSize) {
            dx = -1;
            dy = 0
        } else if (x + dx < 0) {
            dx = 0;
            dy = -1;
        } else if (y + dy < 0) {
            dx = 1;
            dy = 0;
        }

        // moving position == coordinate + direction
        // i.e. dir = 1 (positive), dir = 0 (stationary), dir = -1 (negative)
        x += dx;
        y += dy;
    }

    return output;

    // TODO: failing due to not constraining boundaries
        // E.g. for first example of 3x3 matrix (1 -> 9)
        // This is returning to [0,0] instead of moving to [1,1] as we're not moving the boundary inwards
        // TODO: may need a lower boundary for each direction as well?
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