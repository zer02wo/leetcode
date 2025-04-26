// https://leetcode.com/problems/isomorphic-strings/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphicSingle = function(s, t) {
    // intuition is that this *looks* like a caesar cipher
        // i.e. the characters are translated by an offset
        // egg = 577, add = 144
    // however, this isn't the case as the offset in the above example is inconsistent

    // so next idea is to create a map of characters
        // then early return if two different characters attempt to assign to the same field

    // cannot prefill the map, as character set is any ascii character
    const charMap = {};

    // we are told both strings are equal length, so we can iterate using either's length
    for (let i = 0; i < s.length; i++) {
        let keyChar = s[i];
        let valChar = t[i];

        // return if char already exists, and does not match current mapping
        if (charMap[keyChar] && charMap[keyChar] !== valChar) {
            return false;
        }

        // map char if no existing mapping
        if (!charMap[keyChar]) {
            // EDIT: Solve duplicate issue with additional check for existing value
            // inclusion makes this O(n^2)
            if (Object.values(charMap).includes(valChar)) {
                return false;
            }

            charMap[keyChar] = valChar;
        }
    }

    // TODO: This fails on s="badc", t="baba"
        // this is because there are duplicates but with our (s)key->(t)value mapping we have no knowledge of this
        // we could fix this by iterating over the values and checking for duplicates, but that seems slow
        // alternatively we could have two maps, but this is a lot of memory usage

    // Could we do something with a Set and CharCode?
        // this is only a list, there's no explicit key/mapping

    return true;
};

var isIsomorphic = function(s, t) {
    // trying approach again with two maps, to see how that changes the speed

    // space complexity has now doubled to O(2n)
    // EDIT: now using Map() instead of Object{}
    const sMap = new Map();
    const tMap = new Map();

    for (let i = 0; i < s.length; i++) {
        let sChar = s[i];
        let tChar = t[i];

        // if either map incorrect
        if ((sMap.has(sChar) && sMap.get(sChar) !== tChar)
            || tMap.has(tChar) && tMap.get(tChar) !== sChar) {
            return false;
        }

        if (!sMap[sChar]) {
            sMap.set(sChar, tChar);
        }

        if (!tMap[tChar]) {
            tMap.set(tChar, sChar);
        }
    }

    // ended up being about the same speed (9ms vs 10ms previously, so within variance)
    // now curious what the other 75% of people are doing to be faster
        // maybe using the JS Map() instead of an Object?

    return true;
}