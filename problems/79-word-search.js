// https://leetcode.com/problems/word-search/
// tags: medium, array, matrix

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {

};

// given an `m x n` grid of characters `board`, and a string `word`:
    // return true if word exists in the grid
// word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighbouring
    // same letter cell may not be used more than once

// EXAMPLE: board =
// A B C E
// S F C S
// A D E E

// EXAMPLE: word = 'ABCCED'
// OUTPUT: true
    // A B C
    //     C
    //   D E

// EXAMPLE: word = 'SEE'
// OUTPUT: true
    //
    //       S
    //     E E

// EXAMPLE: word = 'ABCB'
// OUTPUT: false
    // word does not exist in board

// constraints:
    // m == board.length
    // n == board[i].length
    // 1 <= m, n <= 6
    // 1 <= word.length <= 15
    // board/word only consist of lower & uppercase english letters

// intuition: greedy (depth-first?) search
    // O(n^2) search through the board for the starting character
    // from the starting character search the (up to 4) neighbours for the next character
    // continue until word is completed
        // if word not found, look for another place to start
            // would likely need some form of backtracking in case there are multiple options in neighbour searches
            // or search all options recursively
// I can already tell this isn't going to be an easy one, but lots to learn!