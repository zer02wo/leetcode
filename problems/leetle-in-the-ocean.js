// leetle 134 - https://leetle.app/?date=2025-05-14
// I'm not able to find an actual leetcode problem that matches this
// pasting description below for posterity:

// 134. In the Ocean

// Write a function solve that checks if a given string is a valid oceanic coordinate.
// The coordinate is valid if it follows the format of a cardinal direction followed by a degree value,
// and it must be within the valid ranges for both latitude and longitude,
// which are between 0 and 90 degrees for latitude and 0 and 180 degrees for longitude.

// Example:
// Input: "N45E90"
// Output: true
// Explanation: North 45 degrees, East 90 degrees.

function solve(coord) {
    if (!coord) {
        return false;
    }

    const latitudes = ['N', 'S'];
    const longitudes = ['E', 'W'];
    let i = 0;

    while (i < coord.length) {
        let current = coord[i];

        if (latitudes.includes(current) || longitudes.includes(current)) {
            // look for digits
            let j = i + 1;
            let degreesStr = '';

            while (j < coord.length) {
                let digit = coord[j];

                if (digit <= 9 || digit > 0) {
                    degreesStr += digit;
                } else {
                    // non-digit char
                    break;
                }

                j++;
            }

            const degrees = Number.parseInt(degreesStr);

            if (Number.isNaN(degrees) || degrees > 180 || degrees < 0) {
                return false;
            }

            if (
                (latitudes.includes(current) && degrees <= 90)
                || (longitudes.includes(current) && degrees <= 180)
            ) {
                i = j;
            } else {
                // not a valid coordinate
                return false;
            }

        } else {
            // we only want to deal with valid chars in this outer loop
            return false;
        }
    }

    return true;

    // TODO: this will fail if the direction can be two characters e.g. NE45,
    // but this is not provided in the constraints, nor within a test case

    // This passed all of their test cases - though the JavaScript testing was broken, so I had to manually review this
    // TODO: Regex implementation
}

// so the valid format is a character followed by 1-3 digits (only 1-2 if latitude)
    // North / South = Latitude
    // East / West = Longitude
// This absolutely seems like a great use case for regex, but let's try to solve it without at first