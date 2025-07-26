// https://leetcode.com/problems/word-search/
// tags: medium, array, matrix, depth-first search, recursion, backtracking

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var existOptimal = function(board, word) {
    const start = word[0];
    const m = board.length;
    const n = board[0].length;
    // previous solution used a Set to prevent revisiting same node
    // this has been replaced with modifying the board with a '!' character
        // prevents additional overhead of accessing set from outer scope/keeping it in memory
        // using the string as the Set key probably also wasn't the most efficient either

    // search board for first character in word
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (board[row][col] === start) {
                // DFS to find subsequent characters in word
                if (searchAdjacent(row, col, 0)) {
                    return true;
                }
            }
        }
    }

    // recursive/backtracking DFS helper function
    function searchAdjacent(row, col, index) {
        // full length of word has been found
        if (index === word.length) {
            return true;
        }

        // check coordinate is in-bounds
        if (row < 0 || row >= m || col < 0 || col > n) {
            return false;
        }

        // check current character matches supplied index of word
        if (board[row][col] !== word[index]) {
            return false;
        }

        // current element is valid for word

        // store current value
        const temp = board[row][col];
        // overwrite with '!' to mark as visited in path
            // prevents the same cell on board from being reused
        board[row][col] = '!';

        // search adjacent nodes for next character in word
        const nextIndex = index+1;

        // clone path sets as otherwise they're updating by reference
        const res = searchAdjacent(row-1, col, nextIndex)   // above
            || searchAdjacent(row, col+1, nextIndex)        // right
            || searchAdjacent(row+1, col, nextIndex)        // below
            || searchAdjacent(row, col-1, nextIndex);       // left

        // remove current character from path, unmark as '!' with original value
        board[row][col] = temp;

        return res;
    }

    // word not found in board
    return false;

    // 388 ms / beats 38.68% (first run)
    // 373 ms / beats 40.71% (second run)
    // O(m * n * 4^w) time complexity
        // m * n characters in the board
        // each have 4 recursive paths that can happen up to w times (the length of the word)
    // O(w) space complexity
        // depth of recursive call stack = length of a word
};

var exist = function(board, word) {
    const start = word[0];
    const m = board.length;
    const n = board[0].length;
    // create set to store nodes on word path
    const path = new Set();

    // search board for first character in word
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (board[row][col] === start) {
                // DFS to find subsequent characters in word
                if (searchAdjacent(row, col, 0)) {
                    return true;
                }
            }
        }
    }

    // DFS helper function
    function searchAdjacent(row, col, index) {
        // full length of word has been found
        if (index === word.length) {
            return true;
        }

        // check coordinate is in-bounds
        if (row < 0 || row >= m || col < 0 || col > n) {
            return false;
        }

        const pathCoord = `[${row}][${col}]`;

        // check coordinate has been visited previously in word path
        if (path.has(pathCoord)) {
            return false;
        }

        // check current character matches supplied index of word
        if (board[row][col] !== word[index]) {
            return false;
        }

        // current element is valid for word, add to path
        path.add(pathCoord);

        // search adjacent nodes for next character in word
        const nextIndex = index+1;

        // clone path sets as otherwise they're updating by reference
        const res = searchAdjacent(row-1, col, nextIndex)   // above
            || searchAdjacent(row, col+1, nextIndex)        // right
            || searchAdjacent(row+1, col, nextIndex)        // below
            || searchAdjacent(row, col-1, nextIndex);       // left

        // remove current character from path, as we're not visiting the position any longer
        path.delete(pathCoord);

        return res;
    }

    // word not found in board
    return false;

    // O(m * n * 4^w) time complexity
        // where 4^w = 4 ^ the length of the word
    // O(w) space complexity
        // where w = the length of the word
    // doesn't look like recursion is acceptible..?
    // the following solution uses a heuristic trick to determine whether to search the word forward or reversed:
        // https://leetcode.com/problems/word-search/solutions/5767663/video-check-4-directions-with-counting-length-of-a-path/
        // but this feels like a trick, rather than a proper solution
            // although you could argue the leetcode testcases are also intentionally tricks...

    // TLE fixed by also reducing memory overhead of cloning sets (which was also causing additional time to be spent on this)
    // 2053 ms / beats 6.45%
        // not exactly efficient...
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

// video explanation uses same method: https://www.youtube.com/watch?v=pfiQ_PS1g8E
