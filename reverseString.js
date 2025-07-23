/**
 * Reverse String
 * Bodhi-DSA Course
 * 
 * Problem: Reverse the characters of a string in-place
 * Modify the input array directly without using extra space
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Create new array and copy elements in reverse order
function reverseStringBruteForce(s) {
    const reversed = [];
    
    // Copy elements in reverse order
    for (let i = s.length - 1; i >= 0; i--) {
        reversed.push(s[i]);
    }
    
    // Copy back to original array
    for (let i = 0; i < s.length; i++) {
        s[i] = reversed[i];
    }
    
    return s;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use built-in reverse method
function reverseStringBetter(s) {
    // Convert to array if it's a string, reverse, then convert back
    if (typeof s === 'string') {
        return s.split('').reverse().join('');
    }
    
    // If it's already an array, reverse in place
    s.reverse();
    return s;
}

// ============= OPTIMIZED APPROACH (Two Pointers) =============
// Time Complexity: O(n/2) = O(n) | Space Complexity: O(1)
// Use two pointers from start and end, swap elements
function reverseStringOptimized(s) {
    let left = 0;
    let right = s.length - 1;
    
    // Swap elements from both ends moving inward
    while (left < right) {
        // Swap characters at left and right positions
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        
        // Move pointers inward
        left++;
        right--;
    }
    
    return s;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to reverse string
function reverseStringRecursive(s, left = 0, right = null) {
    // Initialize right pointer on first call
    if (right === null) {
        right = s.length - 1;
    }
    
    // Base case: pointers meet or cross
    if (left >= right) {
        return s;
    }
    
    // Swap characters at current positions
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    
    // Recursive call with inner pointers
    return reverseStringRecursive(s, left + 1, right - 1);
}

// ============= ALTERNATIVE: USING STACK =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use stack data structure to reverse
function reverseStringStack(s) {
    const stack = [];
    
    // Push all characters to stack
    for (let i = 0; i < s.length; i++) {
        stack.push(s[i]);
    }
    
    // Pop characters and place back in array
    for (let i = 0; i < s.length; i++) {
        s[i] = stack.pop();
    }
    
    return s;
}

// ============= FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use functional programming methods
function reverseStringFunctional(s) {
    // Convert to array, reverse, and convert back
    const reversed = Array.from(s).reverse();
    
    // Copy back to original array
    for (let i = 0; i < s.length; i++) {
        s[i] = reversed[i];
    }
    
    return s;
}

// ============= OPTIMIZED WITH DESTRUCTURING =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use ES6 destructuring for swapping
function reverseStringDestructuring(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // ES6 destructuring assignment for swapping
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    
    return s;
}

// ============= HELPER FUNCTIONS =============

// Function to convert string to character array
function stringToArray(str) {
    return str.split('');
}

// Function to convert character array to string
function arrayToString(arr) {
    return arr.join('');
}

// Function to create copy of array for testing
function copyArray(arr) {
    return [...arr];
}

// Function to validate if string is properly reversed
function isReversed(original, reversed) {
    if (original.length !== reversed.length) {
        return false;
    }
    
    for (let i = 0; i < original.length; i++) {
        if (original[i] !== reversed[original.length - 1 - i]) {
            return false;
        }
    }
    
    return true;
}

// ============= ADVANCED: REVERSE WORDS IN STRING =============
// Reverse individual words while keeping word order
function reverseWordsInString(s) {
    const words = s.split(' ');
    
    for (let i = 0; i < words.length; i++) {
        const wordArray = words[i].split('');
        reverseStringOptimized(wordArray);
        words[i] = wordArray.join('');
    }
    
    return words.join(' ');
}

// ============= ADVANCED: REVERSE VOWELS ONLY =============
// Reverse only the vowels in the string
function reverseVowelsOnly(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    const arr = s.split('');
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Move left pointer to next vowel
        while (left < right && !vowels.has(arr[left])) {
            left++;
        }
        
        // Move right pointer to previous vowel
        while (left < right && !vowels.has(arr[right])) {
            right--;
        }
        
        // Swap vowels
        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    
    return arr.join('');
}

// ============= TEST CASES =============
function testReverseString() {
    const testCases = [
        "hello",        // Expected: "olleh"
        "world",        // Expected: "dlrow"
        "a",            // Expected: "a"
        "ab",           // Expected: "ba"
        "abcd",         // Expected: "dcba"
        "racecar",      // Expected: "racecar" (palindrome)
        "12345",        // Expected: "54321"
        "A man a plan a canal Panama", // Expected: "amanaP lanac a nalp a nam A"
        "",             // Expected: ""
        "aA"            // Expected: "Aa"
    ];
    
    console.log("=== Reverse String Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: "${testCase}"`);
        
        // Convert string to array for testing
        let arr1 = stringToArray(testCase);
        let result1 = reverseStringBruteForce(copyArray(arr1));
        console.log(`Brute Force: "${arrayToString(result1)}"`);
        
        let arr2 = stringToArray(testCase);
        let result2 = reverseStringOptimized(copyArray(arr2));
        console.log(`Optimized: "${arrayToString(result2)}"`);
        
        let arr3 = stringToArray(testCase);
        let result3 = reverseStringRecursive(copyArray(arr3));
        console.log(`Recursive: "${arrayToString(result3)}"`);
        
        let arr4 = stringToArray(testCase);
        let result4 = reverseStringDestructuring(copyArray(arr4));
        console.log(`Destructuring: "${arrayToString(result4)}"`);
        
        // Test advanced functions
        console.log(`Reverse Words: "${reverseWordsInString(testCase)}"`);
        console.log(`Reverse Vowels: "${reverseVowelsOnly(testCase)}"`);
        
        // Validate result
        let validation = isReversed(stringToArray(testCase), result2);
        console.log(`Validation: ${validation}`);
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: "", desc: "Empty string" },
        { input: "a", desc: "Single character" },
        { input: "aa", desc: "Two identical characters" },
        { input: "ab", desc: "Two different characters" },
        { input: "aaa", desc: "All same characters" },
        { input: "123", desc: "Numbers only" },
        { input: "!@#", desc: "Special characters only" },
        { input: "A1a", desc: "Mixed case and numbers" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: "${testCase.input}" (${testCase.desc})`);
        
        let arr = stringToArray(testCase.input);
        let result = reverseStringOptimized(copyArray(arr));
        console.log(`Result: "${arrayToString(result)}"`);
    });
}

// Performance comparison
function performanceTest() {
    // Create large string
    const largeString = "a".repeat(100000);
    const iterations = 1000;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with string of length: ${largeString.length}`);
    
    console.time("Brute Force");
    for (let i = 0; i < iterations; i++) {
        reverseStringBruteForce(stringToArray(largeString));
    }
    console.timeEnd("Brute Force");
    
    console.time("Optimized (Two Pointers)");
    for (let i = 0; i < iterations; i++) {
        reverseStringOptimized(stringToArray(largeString));
    }
    console.timeEnd("Optimized (Two Pointers)");
    
    console.time("Destructuring");
    for (let i = 0; i < iterations; i++) {
        reverseStringDestructuring(stringToArray(largeString));
    }
    console.timeEnd("Destructuring");
    
    console.time("Built-in Reverse");
    for (let i = 0; i < iterations; i++) {
        reverseStringBetter(largeString);
    }
    console.timeEnd("Built-in Reverse");
}

// Interactive test function
function interactiveTest(inputString) {
    console.log(`\n=== Interactive Test ===`);
    console.log(`Input: "${inputString}"`);
    
    const arr = stringToArray(inputString);
    const result = reverseStringOptimized(copyArray(arr));
    
    console.log(`Reversed: "${arrayToString(result)}"`);
    console.log(`Is Palindrome: ${inputString === arrayToString(result)}`);
    
    return arrayToString(result);
}

// Run tests
testReverseString();
testEdgeCases();
performanceTest();

// Export functions for use in other files
module.exports = {
    reverseStringBruteForce,
    reverseStringBetter,
    reverseStringOptimized,
    reverseStringRecursive,
    reverseStringStack,
    reverseStringFunctional,
    reverseStringDestructuring,
    reverseWordsInString,
    reverseVowelsOnly,
    stringToArray,
    arrayToString,
    copyArray,
    isReversed,
    interactiveTest
};
