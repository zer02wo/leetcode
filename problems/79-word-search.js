// https://leetcode.com/problems/word-search/
// tags: medium, array, matrix, depth-first search, recursion, backtracking

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const start = word[0];
    const m = board.length;
    const n = board[0].length;

    // search board for first character in word
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (board[row][col] === start) {
                // create set to store nodes on word path
                const path = new Set();

                // DFS to find subsequent characters in word
                if (searchAdjacent(row, col, 0, path)) {
                    return true;
                }
            }
        }
    }

    // DFS helper function
    function searchAdjacent(row, col, index, path) {
        // full length of word has been found
        if (index === word.length) {
            return true;
        }

        // check coordinate is in-bounds
        if (row < 0 || row >= m || col < 0 || col > n) {
            return false;
        }

        // check coordinate has been visited previously in word path
        if (path.has(`[${row}][${col}]`)) {
            return false;
        }

        // check current character matches supplied index of word
        if (board[row][col] !== word[index]) {
            return false;
        }

        // current element is valid for word, add to path
        path.add(`[${row}][${col}]`);

        // search adjacent nodes for next character in word
        const nextIndex = index+1;

        // clone path sets as otherwise they're updating by reference
        return searchAdjacent(row-1, col, nextIndex, new Set(path)) // above
            || searchAdjacent(row, col+1, nextIndex, new Set(path)) // right
            || searchAdjacent(row+1, col, nextIndex, new Set(path)) // below
            || searchAdjacent(row, col-1, nextIndex, new Set(path));// left
    }

    // word not found in board
    return false;

    // TODO: Time Limit Exceeded (TLE) for test case:
        // board = [["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"]]
        // word = "AAAAAAAAAAAAAAa"
    // doesn't look like recursion is acceptible...
    // TODO: come up with alternative approach
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