/**
 * Reverse Integer
 * NamasteDSA Course
 * 
 * Problem: Reverse the digits of an integer
 * Handle overflow cases and negative numbers
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(log n)
// Convert to string, reverse, and convert back
function reverseIntegerBruteForce(x) {
    // Handle negative numbers
    const isNegative = x < 0;
    x = Math.abs(x);
    
    // Convert to string, reverse, and convert back
    let reversed = parseInt(x.toString().split('').reverse().join(''), 10);
    
    // Apply negative sign if original was negative
    if (isNegative) {
        reversed = -reversed;
    }
    
    // Check for 32-bit integer overflow
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    if (reversed > INT_MAX || reversed < INT_MIN) {
        return 0;
    }
    
    return reversed;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// Use mathematical approach with modulo and division
function reverseIntegerBetter(x) {
    // Handle negative numbers
    const isNegative = x < 0;
    x = Math.abs(x);
    
    let reversed = 0;
    
    // Reverse digits mathematically
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    // Apply negative sign if original was negative
    if (isNegative) {
        reversed = -reversed;
    }
    
    // Check for 32-bit integer overflow
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    if (reversed > INT_MAX || reversed < INT_MIN) {
        return 0;
    }
    
    return reversed;
}

// ============= OPTIMIZED APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// Check overflow during the reversal process itself
function reverseIntegerOptimized(x) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    let reversed = 0;
    
    while (x !== 0) {
        // Get the last digit
        const digit = x % 10;
        x = Math.trunc(x / 10); // Use Math.trunc to handle negative numbers
        
        // Check for overflow before actually reversing
        if (reversed > Math.floor(INT_MAX / 10) || 
            (reversed === Math.floor(INT_MAX / 10) && digit > 7)) {
            return 0;
        }
        
        if (reversed < Math.ceil(INT_MIN / 10) || 
            (reversed === Math.ceil(INT_MIN / 10) && digit < -8)) {
            return 0;
        }
        
        reversed = reversed * 10 + digit;
    }
    
    return reversed;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(log n) - due to recursion stack
// Use recursion to reverse digits
function reverseIntegerRecursive(x, reversed = 0) {
    // Base case: if x becomes 0, return reversed number
    if (x === 0) {
        return reversed;
    }
    
    // Check for overflow
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    const digit = x % 10;
    const newReversed = reversed * 10 + digit;
    
    if (newReversed > INT_MAX || newReversed < INT_MIN) {
        return 0;
    }
    
    // Recursive call with remaining digits
    return reverseIntegerRecursive(Math.trunc(x / 10), newReversed);
}

// ============= ALTERNATIVE: ARRAY APPROACH =============
// Time Complexity: O(log n) | Space Complexity: O(log n)
// Convert to array, reverse, and reconstruct
function reverseIntegerArray(x) {
    const isNegative = x < 0;
    x = Math.abs(x);
    
    // Convert to array of digits
    const digits = [];
    while (x > 0) {
        digits.push(x % 10);
        x = Math.floor(x / 10);
    }
    
    // Reconstruct number from reversed array
    let reversed = 0;
    for (let i = digits.length - 1; i >= 0; i--) {
        reversed = reversed * 10 + digits[i];
    }
    
    if (isNegative) {
        reversed = -reversed;
    }
    
    // Check overflow
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    if (reversed > INT_MAX || reversed < INT_MIN) {
        return 0;
    }
    
    return reversed;
}

// ============= HELPER FUNCTIONS =============

// Function to check if number is within 32-bit integer range
function isValidInteger(num) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    return num >= INT_MIN && num <= INT_MAX;
}

// Function to get digit count
function getDigitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// ============= TEST CASES =============
function testReverseInteger() {
    const testCases = [
        123,        // Expected: 321
        -123,       // Expected: -321
        120,        // Expected: 21
        0,          // Expected: 0
        1534236469, // Expected: 0 (overflow)
        -2147483648,// Expected: 0 (overflow)
        1000000003, // Expected: 0 (overflow)
        7,          // Expected: 7
        -7,         // Expected: -7
        1463847412, // Expected: 2147483641
        -1463847412 // Expected: -2147483641
    ];
    
    console.log("=== Reverse Integer Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: ${testCase}`);
        console.log(`Brute Force: ${reverseIntegerBruteForce(testCase)}`);
        console.log(`Better: ${reverseIntegerBetter(testCase)}`);
        console.log(`Optimized: ${reverseIntegerOptimized(testCase)}`);
        console.log(`Recursive: ${reverseIntegerRecursive(testCase)}`);
        console.log(`Array: ${reverseIntegerArray(testCase)}`);
        console.log(`Digit Count: ${getDigitCount(testCase)}`);
        console.log(`Valid Integer: ${isValidInteger(testCase)}`);
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: 2147483647, desc: "Max 32-bit integer" },
        { input: -2147483648, desc: "Min 32-bit integer" },
        { input: 1534236469, desc: "Reverse causes overflow" },
        { input: -1563847412, desc: "Negative reverse overflow" },
        { input: 100, desc: "Trailing zeros" },
        { input: -100, desc: "Negative with trailing zeros" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: ${testCase.input} (${testCase.desc})`);
        console.log(`Result: ${reverseIntegerOptimized(testCase.input)}`);
    });
}

// Performance comparison
function performanceTest() {
    const testNumber = 1234567890;
    const iterations = 100000;
    
    console.log("\n=== Performance Comparison ===");
    
    console.time("Brute Force");
    for (let i = 0; i < iterations; i++) {
        reverseIntegerBruteForce(testNumber);
    }
    console.timeEnd("Brute Force");
    
    console.time("Better");
    for (let i = 0; i < iterations; i++) {
        reverseIntegerBetter(testNumber);
    }
    console.timeEnd("Better");
    
    console.time("Optimized");
    for (let i = 0; i < iterations; i++) {
        reverseIntegerOptimized(testNumber);
    }
    console.timeEnd("Optimized");
}

// Run tests
testReverseInteger();
testEdgeCases();
performanceTest();

// Export functions for use in other files
module.exports = {
    reverseIntegerBruteForce,
    reverseIntegerBetter,
    reverseIntegerOptimized,
    reverseIntegerRecursive,
    reverseIntegerArray,
    isValidInteger,
    getDigitCount
};
