// https://leetcode.com/problems/defanging-an-ip-address/description/
// tags: easy, leetle

// suspiciously simple question, but maybe some interesting insights gained about performance of operations
// but I also suspect there is a lot of possible variance within the measurements

/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
    // trying array solution to compare to string solution

    let output = [];

    for (const digit of address) {
        if (digit === '.') {
            output.push('[.]');
        } else {
            output.push(digit);
        }
    }

    return output.join('');

    // 51 ms / beats 5.13%
    // I would've expected this to have been faster than the string
    // but string concatenation must be highly optimised in the native code
    // perhaps this would be better for other languages with immutable strings (e.g. Java)

    // or perhaps the run-to-run variance makes comparison pretty irrelevant
};

var defangIPaddrRebuildString = function(address) {
    // trying a solution without built-ins as it feels like cheating
    // strings in JS are immutable, so we'll need to create our own new string
        // TODO: Would an array be faster than string concatenation?

    let defanged = '';

    for (const digit of address) {
        if (digit === '.') {
            defanged += '[.]';
        } else {
            defanged += digit;
        }
    }

    return defanged;

    // 44 ms / beats 35.92%
    // given how many solutions use built-ins, runtime probably doesn't mean much here
};

var defangIPaddrSplitJoin = function(address) {
    return address.split('.').join('[.]');

    // 52 ms / beats 5.13%
    // I'm surprised this is *that* much worse
    // but I suppose String.replaceAll() is incredibly optimised
};

var defangIPaddrReplaceAll = function(address) {
    return address.replaceAll('.', '[.]');

    // 32 ms / beats 92.59%
    // I feel like I'm missing something this question is too easy
    // but I don't see any constraints dictating why this isn't allowed

    // TODO: would array operations be faster? this isn't exactly *slow*
    // TODO: I would be surprised if regex is faster, given this is a single character check?
};