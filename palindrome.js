/**
 * Check Palindrome
 * Bodhi-DSA Course
 * 
 * Problem: Check if a string or number is a palindrome
 * A palindrome reads the same forwards and backwards
 */

// ============= BRUTE FORCE APPROACH (String) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Convert to string, reverse it, and compare
function isPalindromeBruteForceString(str) {
    // Convert to string and make lowercase for case-insensitive comparison
    str = str.toString().toLowerCase();
    
    // Reverse the string and compare with original
    const reversed = str.split('').reverse().join('');
    
    return str === reversed;
}

// ============= BETTER APPROACH (Two Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use two pointers from start and end
function isPalindromeBetter(str) {
    // Convert to string and make lowercase
    str = str.toString().toLowerCase();
    
    let left = 0;
    let right = str.length - 1;
    
    // Compare characters from both ends moving inward
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// ============= OPTIMIZED APPROACH (Number) =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// For numbers, reverse mathematically without string conversion
function isPalindromeOptimizedNumber(num) {
    // Handle negative numbers (they can't be palindromes)
    if (num < 0) {
        return false;
    }
    
    // Special case: single digit numbers are palindromes
    if (num < 10) {
        return true;
    }
    
    let original = num;
    let reversed = 0;
    
    // Reverse the number mathematically
    while (num > 0) {
        reversed = reversed * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    
    return original === reversed;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to check palindrome
function isPalindromeRecursive(str, start = 0, end = null) {
    // Convert to string and make lowercase
    str = str.toString().toLowerCase();
    
    // Initialize end pointer on first call
    if (end === null) {
        end = str.length - 1;
    }
    
    // Base case: if pointers meet or cross, it's a palindrome
    if (start >= end) {
        return true;
    }
    
    // If characters don't match, not a palindrome
    if (str[start] !== str[end]) {
        return false;
    }
    
    // Recursive call with inner pointers
    return isPalindromeRecursive(str, start + 1, end - 1);
}

// ============= ADVANCED: ALPHANUMERIC PALINDROME =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Check palindrome considering only alphanumeric characters
function isPalindromeAlphanumeric(str) {
    // Convert to string and make lowercase
    str = str.toString().toLowerCase();
    
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphanumeric(str[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphanumeric(str[right])) {
            right--;
        }
        
        // Compare alphanumeric characters
        if (str[left] !== str[right]) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// Helper function to check if character is alphanumeric
function isAlphanumeric(char) {
    return /[a-z0-9]/.test(char);
}

// ============= HALF COMPARISON OPTIMIZATION =============
// Time Complexity: O(n/2) | Space Complexity: O(1)
// Only compare first half with second half
function isPalindromeHalfComparison(str) {
    str = str.toString().toLowerCase();
    const len = str.length;
    const mid = Math.floor(len / 2);
    
    // Compare first half with second half (reversed)
    for (let i = 0; i < mid; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    
    return true;
}

// ============= TEST CASES =============
function testPalindrome() {
    const testCases = [
        "racecar",      // Expected: true
        "hello",        // Expected: false
        "A man a plan a canal Panama", // Expected: true (alphanumeric)
        "race a car",   // Expected: false (alphanumeric)
        121,            // Expected: true
        123,            // Expected: false
        -121,           // Expected: false
        0,              // Expected: true
        1,              // Expected: true
        "Madam",        // Expected: true
        "12321",        // Expected: true
        "12345",        // Expected: false
        ""              // Expected: true (empty string)
    ];
    
    console.log("=== Palindrome Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: "${testCase}"`);
        console.log(`Brute Force String: ${isPalindromeBruteForceString(testCase)}`);
        console.log(`Better (Two Pointers): ${isPalindromeBetter(testCase)}`);
        
        if (typeof testCase === 'number') {
            console.log(`Optimized Number: ${isPalindromeOptimizedNumber(testCase)}`);
        }
        
        console.log(`Recursive: ${isPalindromeRecursive(testCase)}`);
        console.log(`Half Comparison: ${isPalindromeHalfComparison(testCase)}`);
        
        if (typeof testCase === 'string') {
            console.log(`Alphanumeric: ${isPalindromeAlphanumeric(testCase)}`);
        }
    });
}

// Performance comparison
function performanceTest() {
    const longPalindrome = "racecar".repeat(1000);
    const iterations = 10000;
    
    console.log("\n=== Performance Comparison ===");
    
    console.time("Brute Force String");
    for (let i = 0; i < iterations; i++) {
        isPalindromeBruteForceString(longPalindrome);
    }
    console.timeEnd("Brute Force String");
    
    console.time("Better (Two Pointers)");
    for (let i = 0; i < iterations; i++) {
        isPalindromeBetter(longPalindrome);
    }
    console.timeEnd("Better (Two Pointers)");
    
    console.time("Half Comparison");
    for (let i = 0; i < iterations; i++) {
        isPalindromeHalfComparison(longPalindrome);
    }
    console.timeEnd("Half Comparison");
}

// Run tests
testPalindrome();
performanceTest();

// Export functions for use in other files
module.exports = {
    isPalindromeBruteForceString,
    isPalindromeBetter,
    isPalindromeOptimizedNumber,
    isPalindromeRecursive,
    isPalindromeAlphanumeric,
    isPalindromeHalfComparison
};
