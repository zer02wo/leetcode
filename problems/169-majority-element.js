// https://leetcode.com/problems/majority-element/
// tags: easy, arrays

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let candidate = null;
    let votes = 0;

    for (const num of nums) {
        // 'elect' a new candidate
        if (votes <= 0) {
            candidate = num;
        }

        // 'vote' for or against current element
        if (candidate === num) {
            votes++;
        } else {
            votes--;
        }
    }

    // as we know there is a majority, this will always return the mode element
    return candidate;

    // 2 ms / beats 75.22%
    // I don't know if I would've figured this out without having encountered a similar problem before
    // the algorithm is intuitive, but would be difficult to reinvent it blind
        // this is known as the 'Boyer-Moore majority vote algorithm': https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm
}

var majorityElementHashMap = function(nums) {
    let freqMap = new Map();
    const majority = nums.length / 2;

    for (const num of nums) {
        // initialise to 1 or increment by 1
        freqMap.set(num, (freqMap.get(num) + 1) || 1);

        // optimise by early return
        if (freqMap.get(num) > majority) {
            return num;
        }
    }

    // this should never occur given the constraints
    return -1;

    // 5 ms / beats 47.02%
    // O(n * m) time complexity solution
        // where n = nums length
        // where m = freqMap length (i.e. the number of unique digits in nums)
    // O(n) memory
    // but I knew this wouldn't be an optimal solution
}

var majorityElementSorting = function(nums) {
    nums.sort();

    return nums[Math.floor(nums.length / 2)];

    // 4 ms / beats 55.67%
    // the time / space complexity is therefore entirely dependent on the sorting method for the language
    // TODO: I don't like using built-ins where I can avoid it, so let's try something else
        // TODO: the problem suggests O(n) and O(1) solution is possible
};

// the objective is to find the mode element in an array
// my mind immediately jumped to a frequency HashMap,
// however the constraint that the majority (mode) element appears more than [n / 2] times allows us to use sorting

// if we sort the array, the majority element will always be present at the (n / 2)th index

// extra notes looking for O(n) time complexity & O(1) space complexity solution:
// I *vaguely* remember a solution to a similar problem where each element essentially casts a 'vote'
    // because we know there is a majority larger than 50%, the 'votes' reveal the mode element
    // as it will have more votes 'for' than any/all other elements have 'against'
// this way we only need to keep track of two things O(1):
    // current number of votes
    // current element associated with those votes
// if the current element has no votes, a new element is 'elected' for the voting system



// REVISITING PROBLEM:
// already seen from my notes above/glimpse at previous solution before resetting that this uses the voting algorithm
// because we know there is a *majority* that appears more than n / 2 times (i.e. 50%)
    // we keep track of a `candidate` and assign them votes each time the element appears
    // but we subtract votes whenever another element appears
    // if the vote count reaches 0, assign the current element as the new candidate
// because the majority element will have more than [n / 2] of the "votes"
    // even after subtracting all the other votes it will still remain at the end

// an alternative solution would be to use a HashMap
    // O(n) to collect the count for each element
        // as soon as an item count is greater than 50%, it can be returned
        // no need for an additional loop

// another alternative is to sort the array in O(n log n) time complexity
    // then return the midpoint
    // as we know the majority element takes up over 50% of the array
        // when sorted, it has to pass through the midpoint
        // (even if it is also the smallest or largest number in the array)

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let candidate = nums[0];
    let votes = 1;

    for (let i = 0; i < nums.length; i++) {
        // vote for/against candidate
        if (nums[i] === candidate) {
            votes++;
        } else {
            votes--;
        }

        // elect a new candidate
        if (votes === 0) {
            candidate = nums[i];
            votes = 1;
        }
    }

    return candidate;

    // 6 ms / beats 36.64% (variance?)
    // O(n) time complexity, O(1) space complexity
};