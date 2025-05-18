// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
// tags: easy, leetle

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    // needle cannot be greater in length than haystack
    if (needle > haystack) {
        return -1;
    }

    if (!needle) {
        return 0;
    }

    // 'point' of the needle
    let point = needle[0];

    // full needle contents cannot exist beyond a certain index
    const length = haystack.length - needle.length;
    for (let i = 0; i < length; i++) {
        // iterate until finding point of needle
        if (haystack[i] !== point) {
            continue;
        }

        // continue looking for rest of needle
        let needleIndex = 1;
        for (let j = i+1; j < needle.length; j++) {
            if (haystack[j] !== needle[needleIndex]) {
                i = j;
                break;
            }

            // full substring match when needle index == needle length
            if (needleIndex === needle.length - 1) {
                // return index at point of needle
                return i;
            }

            needleIndex++;
        }
    }

    // needle not found in haystack
    return -1;

    // TODO: does not work for following scenario:
        // haystack = 'hello', needle = 'll'
};

// find the substring (needle) in the main string (haystack)
    // this is essentially String.indexOf(),
    // even returning -1 for instances it does not occur in the haystack
    // because of this, I imagine performance numbers will be pretty skewed

// as for the actual algorithm, this is what first came to mind:
    // iterate through haystack until finding first character in needle
        // lets call it the 'point' of the needle
    // once found, iterate through the rest of the letters
        // if all found, return the index for the 'point' of the needle
        // if not found, increment the outer loop by how many characters were matching to keep O(n), rather than O(n^2)

    // edge cases to be handled:
        // needle is longer than haystack - impossible, so always return -1
        // empty string as needle - returns 0 for String.indexOf() I believe