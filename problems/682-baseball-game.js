// https://leetcode.com/problems/baseball-game/
// tags: easy, leetle, arrays

/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function(operations) {
    let record = [];

    for (const op of operations) {
        switch (op) {
            // remove previous score from record
            case 'C':
                record.pop();
                break;
            // double previous score as new score
            case 'D':
                const prevScore = record[record.length-1];
                record.push(prevScore * 2)
                break;
            // sum previous two scores as new score
            case '+':
                const lastScore = record[record.length-1];
                const penultimateScore = record[record.length-2];
                record.push(lastScore + penultimateScore);
                break;
            // integer value - push score to record
            default:
                record.push(parseInt(op));
                break;
        }
    }

    // will return 0 if record is empty
    let sum = 0;

    for (const score of record) {
        sum += parseInt(score);
    }

    return sum;

    // 1 ms / beats 84.34%
    // nice and easy after a long day
    // only trip up was JS doing string concatenation instead of addition,
        // but easy to fix with parseInt()
};

// calculate points for baseball game based on array of operations:
    // 'x'  - record new score 'x'
    // '+'  - record new score summing previous two scores
    // 'D'  - record new score doubling previous score
    // 'C'  - remove previous score from record

// EXAMPLE: ops = ["5","2","C","D","+"]
// OUTPUT: 30
    // [5]
    // [5, 2]
    // [5]
    // [5, 10]
    // [5, 10, 15] = 30

// constraints:
    // always at least 1 operation (don't need to handle empty array)
    // only specified string instructions or integer values
    // '+' operations will always be after 2+ previous scores on record
    // 'C' & 'D' operations will always be after 1+ previous score on record
        // i.e. no validation required

// this feels pretty straightforward
    // the trap might have been attempting to directly calculate the sum after each operation
    // but the examples tell you to keep an array of scores (the record)
// create an array of recorded scores, then update the record based on condition of each rule
    // shouldn't need a counter/pointer for the array, as it only wants to modify items at the last or 2nd last index
        // i.e. length-1 and length-2