// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
// tags: easy, leetle

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (!needle.length || needle === haystack) {
        return 0;
    }

    // needle cannot be greater in length than haystack
    if (needle.length > haystack.length) {
        return -1;
    }

    // 'point' of the needle
    let point = needle[0];

    // full needle contents cannot exist beyond a certain index
    const length = (haystack.length - needle.length) + 1;
    for (let i = 0; i < length; i++) {
        // iterate until finding point of needle
        if (haystack[i] !== point) {
            continue;
        }

        // handle needle of single character
        if (needle.length === 1) {
            return i;
        }

        // continue looking for rest of needle
        let needleIndex = 1;
        let newPoint = false;
        for (let j = i+1; j < haystack.length; j++) {
            if (haystack[j] !== needle[needleIndex]) {
                // go back to previous point of needle
                if (newPoint) {
                    // return newPoint -1, because of the automatic i++ in the outer loop
                    i = newPoint - 1;
                    break;
                }

                // return j - 1, because of the automatic i++ in the outer loop
                i = j - 1;
                break;
            }

            // full substring match when needle index == needle length
            if (needleIndex === needle.length - 1) {
                // return index at point of needle
                return i;
            }

            // save reference to first instance of 'point' of needle so we don't miss any potentials
            if (haystack[j] === point && !newPoint) {
                newPoint = j;
            }

            needleIndex++;
        }
    }

    // needle not found in haystack
    return -1;

    // 0 ms / beats 100%
    // definitely took a bit of trial / error with some of the edge cases
    // and likely a little verbose, but you can't deny the performance

    // this would be simpler if I simply continued on from i, instead of j
    // but there is some optimisation there to prevent repeatedly checking characters
        // because there are instances we have to go back to the point of a needle (e.g. 'mississipi' and 'issip'),
        // this is *technically* an O(n*m) solution in worst case scenarios (e.g. haystack = 'aaaaaaaaaa', needle = 'aaaab')
            // but should perform slightly better in real world situations than an O(n*m) solution without my optimisations
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