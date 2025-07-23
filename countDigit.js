/**
 * Count Digits in a Number
 * Bodhi-DSA Course
 * 
 * Problem: Count the number of digits in an integer
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(log n)
// Convert number to string and get length
function countDigitsBruteForce(n) {
    // Handle negative numbers by taking absolute value
    n = Math.abs(n);
    
    // Special case: 0 has 1 digit
    if (n === 0) {
        return 1;
    }
    
    // Convert number to string and return length
    return n.toString().length;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// Use loop to divide by 10 repeatedly
function countDigitsBetter(n) {
    // Handle negative numbers by taking absolute value
    n = Math.abs(n);
    
    // Special case: 0 has 1 digit
    if (n === 0) {
        return 1;
    }
    
    let count = 0;
    
    // Keep dividing by 10 until number becomes 0
    while (n > 0) {
        count++;        // Increment digit count
        n = Math.floor(n / 10); // Remove last digit
    }
    
    return count;
}

// ============= OPTIMIZED APPROACH =============
// Time Complexity: O(1) | Space Complexity: O(1)
// Use logarithm to find digits directly
function countDigitsOptimized(n) {
    // Handle negative numbers by taking absolute value
    n = Math.abs(n);
    
    // Special case: 0 has 1 digit
    if (n === 0) {
        return 1;
    }
    
    // log10(n) + 1 = number of digits
    // Use Math.log10() to find directly
    return Math.floor(Math.log10(n)) + 1;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(log n) - due to recursion stack
// Use recursion to count digits
function countDigitsRecursive(n) {
    // Handle negative numbers by taking absolute value
    n = Math.abs(n);
    
    // Base case: single digit number returns 1
    if (n < 10) {
        return 1;
    }
    
    // Recursive case: divide by 10 and make recursive call
    return 1 + countDigitsRecursive(Math.floor(n / 10));
}

// ============= ALTERNATIVE METHODS =============

// Method using Array conversion
function countDigitsArray(n) {
    n = Math.abs(n);
    if (n === 0) return 1;
    
    // Convert number to array of digits and get length
    return Array.from(String(n), Number).length;
}

// Method using Regular Expression
function countDigitsRegex(n) {
    n = Math.abs(n);
    
    // Use regex to match all digits
    const matches = n.toString().match(/\d/g);
    return matches ? matches.length : 0;
}

// ============= TEST CASES =============
function testCountDigits() {
    const testCases = [
        0,          // Expected: 1
        5,          // Expected: 1
        -5,         // Expected: 1
        12,         // Expected: 2
        123,        // Expected: 3
        -123,       // Expected: 3
        1000,       // Expected: 4
        99999,      // Expected: 5
        -999999,    // Expected: 6
        1234567890  // Expected: 10
    ];
    
    console.log("=== Count Digits Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: ${testCase}`);
        console.log(`Brute Force: ${countDigitsBruteForce(testCase)}`);
        console.log(`Better: ${countDigitsBetter(testCase)}`);
        console.log(`Optimized: ${countDigitsOptimized(testCase)}`);
        console.log(`Recursive: ${countDigitsRecursive(testCase)}`);
        console.log(`Array Method: ${countDigitsArray(testCase)}`);
        console.log(`Regex Method: ${countDigitsRegex(testCase)}`);
    });
}

// Performance comparison function
function performanceTest() {
    const largeNumber = 123456789012345;
    const iterations = 100000;
    
    console.log("\n=== Performance Comparison ===");
    
    // Brute Force timing
    console.time("Brute Force");
    for (let i = 0; i < iterations; i++) {
        countDigitsBruteForce(largeNumber);
    }
    console.timeEnd("Brute Force");
    
    // Better approach timing
    console.time("Better Approach");
    for (let i = 0; i < iterations; i++) {
        countDigitsBetter(largeNumber);
    }
    console.timeEnd("Better Approach");
    
    // Optimized approach timing
    console.time("Optimized Approach");
    for (let i = 0; i < iterations; i++) {
        countDigitsOptimized(largeNumber);
    }
    console.timeEnd("Optimized Approach");
}

// Run tests
testCountDigits();
performanceTest();

// Export functions for use in other files
module.exports = {
    countDigitsBruteForce,
    countDigitsBetter,
    countDigitsOptimized,
    countDigitsRecursive,
    countDigitsArray,
    countDigitsRegex
};
