// https://leetcode.com/problems/defanging-an-ip-address/description/
// tags: easy, leetle

/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
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