/**
 * Missing Number
 * Bodhi-DSA Course
 * 
 * Problem: Find the missing number in a sequence from 1 to N
 * Given an array containing n distinct numbers from 0 to n, find the missing number
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Check each number from 0 to n if it exists in array
function missingNumberBruteForce(nums) {
    const n = nums.length;
    
    // Check each number from 0 to n
    for (let i = 0; i <= n; i++) {
        let found = false;
        
        // Search for current number in array
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] === i) {
                found = true;
                break;
            }
        }
        
        // If number not found, it's the missing number
        if (!found) {
            return i;
        }
    }
    
    return -1; // Should never reach here for valid input
}

// ============= BETTER APPROACH (Sorting) =============
// Time Complexity: O(n log n) | Space Complexity: O(1)
// Sort array and find the gap
function missingNumberBetter(nums) {
    // Sort the array
    nums.sort((a, b) => a - b);
    
    // Check if 0 is missing
    if (nums[0] !== 0) {
        return 0;
    }
    
    // Check for gap in sorted array
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1] + 1) {
            return nums[i - 1] + 1;
        }
    }
    
    // If no gap found, missing number is n
    return nums.length;
}

// ============= OPTIMIZED APPROACH (Sum Formula) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use mathematical sum formula: sum of 0 to n = n*(n+1)/2
function missingNumberOptimized(nums) {
    const n = nums.length;
    
    // Calculate expected sum using formula
    const expectedSum = n * (n + 1) / 2;
    
    // Calculate actual sum of array elements
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    
    // Missing number is the difference
    return expectedSum - actualSum;
}

// ============= ALTERNATIVE: XOR APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use XOR properties: a ^ a = 0, a ^ 0 = a
function missingNumberXOR(nums) {
    const n = nums.length;
    let xor = 0;
    
    // XOR all numbers from 0 to n
    for (let i = 0; i <= n; i++) {
        xor ^= i;
    }
    
    // XOR all numbers in array
    for (let num of nums) {
        xor ^= num;
    }
    
    // Result is the missing number
    return xor;
}

// ============= ALTERNATIVE: SET APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use Set for O(1) lookup
function missingNumberSet(nums) {
    const n = nums.length;
    const numSet = new Set(nums);
    
    // Check each number from 0 to n
    for (let i = 0; i <= n; i++) {
        if (!numSet.has(i)) {
            return i;
        }
    }
    
    return -1; // Should never reach here
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion with XOR
function missingNumberRecursive(nums, index = 0, xor = 0) {
    const n = nums.length;
    
    // Base case: processed all elements
    if (index > n) {
        return xor;
    }
    
    // XOR with current index
    xor ^= index;
    
    // XOR with array element if index is within bounds
    if (index < n) {
        xor ^= nums[index];
    }
    
    return missingNumberRecursive(nums, index + 1, xor);
}

// ============= ALTERNATIVE: BINARY SEARCH =============
// Time Complexity: O(n log n) | Space Complexity: O(1)
// Use binary search on sorted array
function missingNumberBinarySearch(nums) {
    nums.sort((a, b) => a - b);
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // If nums[mid] == mid, missing number is on the right
        if (nums[mid] === mid) {
            left = mid + 1;
        } else {
            // Missing number is on the left or is mid
            right = mid - 1;
        }
    }
    
    return left;
}

// ============= HELPER FUNCTIONS =============

// Function to generate array with one missing number
function generateArrayWithMissingNumber(n, missingNum = null) {
    if (missingNum === null) {
        missingNum = Math.floor(Math.random() * (n + 1));
    }
    
    const arr = [];
    for (let i = 0; i <= n; i++) {
        if (i !== missingNum) {
            arr.push(i);
        }
    }
    
    // Shuffle array to make it more realistic
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    return { array: arr, missingNumber: missingNum };
}

// Function to validate if array is valid for missing number problem
function validateMissingNumberArray(nums) {
    const n = nums.length;
    const expected = new Set();
    
    // Create expected set (0 to n with one missing)
    for (let i = 0; i <= n; i++) {
        expected.add(i);
    }
    
    // Remove numbers that exist in array
    for (let num of nums) {
        if (expected.has(num)) {
            expected.delete(num);
        } else {
            return { valid: false, reason: `Invalid number ${num} found` };
        }
    }
    
    // Should have exactly one missing number
    if (expected.size !== 1) {
        return { valid: false, reason: `Expected 1 missing number, found ${expected.size}` };
    }
    
    return { valid: true, missingNumber: Array.from(expected)[0] };
}

// Function to analyze array properties
function analyzeArray(nums) {
    const n = nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const sum = nums.reduce((a, b) => a + b, 0);
    const expectedSum = n * (n + 1) / 2;
    
    return {
        length: n,
        expectedLength: n + 1,
        min,
        max,
        sum,
        expectedSum,
        difference: expectedSum - sum,
        isSorted: nums.every((val, i, arr) => i === 0 || arr[i - 1] <= val),
        hasNegatives: nums.some(num => num < 0),
        hasDuplicates: new Set(nums).size !== nums.length
    };
}

// ============= ADVANCED VARIATIONS =============

// Find missing number in range [a, b]
function missingNumberInRange(nums, a, b) {
    const expectedSum = ((b - a + 1) * (a + b)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
}

// Find multiple missing numbers
function findMultipleMissingNumbers(nums, n) {
    const present = new Set(nums);
    const missing = [];
    
    for (let i = 0; i <= n; i++) {
        if (!present.has(i)) {
            missing.push(i);
        }
    }
    
    return missing;
}

// Find missing number with duplicates allowed
function missingNumberWithDuplicates(nums) {
    const n = nums.length;
    const seen = new Array(n + 1).fill(false);
    
    // Mark present numbers
    for (let num of nums) {
        if (num >= 0 && num <= n) {
            seen[num] = true;
        }
    }
    
    // Find first missing number
    for (let i = 0; i <= n; i++) {
        if (!seen[i]) {
            return i;
        }
    }
    
    return n + 1;
}

// ============= TEST CASES =============
function testMissingNumber() {
    const testCases = [
        [3, 0, 1],              // Expected: 2
        [0, 1],                 // Expected: 2
        [9, 6, 4, 2, 3, 5, 7, 0, 1], // Expected: 8
        [0],                    // Expected: 1
        [1],                    // Expected: 0
        [1, 2],                 // Expected: 0
        [0, 1, 2, 3, 4, 6, 7, 8], // Expected: 5
        [1, 0, 3],              // Expected: 2
        [0, 1, 3, 4, 5, 6, 7, 8, 9], // Expected: 2
        [2, 0, 1]               // Expected: 3
    ];
    
    console.log("=== Missing Number Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        
        // Analyze array
        const analysis = analyzeArray(testCase);
        console.log(`Analysis:`, analysis);
        
        // Validate array
        const validation = validateMissingNumberArray(testCase);
        console.log(`Validation:`, validation);
        
        // Test different approaches
        console.log(`Brute Force: ${missingNumberBruteForce([...testCase])}`);
        console.log(`Better (Sorting): ${missingNumberBetter([...testCase])}`);
        console.log(`Optimized (Sum): ${missingNumberOptimized(testCase)}`);
        console.log(`XOR: ${missingNumberXOR(testCase)}`);
        console.log(`Set: ${missingNumberSet(testCase)}`);
        console.log(`Recursive: ${missingNumberRecursive(testCase)}`);
        console.log(`Binary Search: ${missingNumberBinarySearch([...testCase])}`);
        
        // Test variations
        const multipleMissing = findMultipleMissingNumbers(testCase, testCase.length);
        console.log(`All Missing: [${multipleMapping}]`);
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: [0], desc: "Single element - 0" },
        { input: [1], desc: "Single element - 1" },
        { input: [0, 1], desc: "Two elements - no missing in middle" },
        { input: [1, 2], desc: "Two elements - 0 missing" },
        { input: [0, 2], desc: "Two elements - 1 missing" },
        { input: [], desc: "Empty array" },
        { input: [0, 1, 2, 3, 4], desc: "No missing number (edge case)" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: [${testCase.input}] (${testCase.desc})`);
        
        if (testCase.input.length === 0) {
            console.log(`Result: 0 (empty array case)`);
        } else {
            const result = missingNumberOptimized(testCase.input);
            console.log(`Result: ${result}`);
            
            const validation = validateMissingNumberArray(testCase.input);
            console.log(`Valid: ${validation.valid}`);
        }
    });
}

// Performance comparison
function performanceTest() {
    const { array: largeArray } = generateArrayWithMissingNumber(100000);
    const iterations = 1000;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largeArray.length}`);
    
    console.time("Better (Sorting)");
    for (let i = 0; i < iterations; i++) {
        missingNumberBetter([...largeArray]);
    }
    console.timeEnd("Better (Sorting)");
    
    console.time("Optimized (Sum)");
    for (let i = 0; i < iterations; i++) {
        missingNumberOptimized(largeArray);
    }
    console.timeEnd("Optimized (Sum)");
    
    console.time("XOR");
    for (let i = 0; i < iterations; i++) {
        missingNumberXOR(largeArray);
    }
    console.timeEnd("XOR");
    
    console.time("Set");
    for (let i = 0; i < iterations; i++) {
        missingNumberSet(largeArray);
    }
    console.timeEnd("Set");
}

// Generate and test random cases
function testRandomCases() {
    console.log("\n=== Random Test Cases ===");
    
    for (let i = 0; i < 5; i++) {
        const n = Math.floor(Math.random() * 20) + 5; // Random size 5-25
        const { array, missingNumber } = generateArrayWithMissingNumber(n);
        
        console.log(`\nRandom Case ${i + 1}:`);
        console.log(`Array: [${array}]`);
        console.log(`Expected Missing: ${missingNumber}`);
        
        const result = missingNumberOptimized(array);
        console.log(`Found Missing: ${result}`);
        console.log(`Correct: ${result === missingNumber}`);
    }
}

// Interactive test function
function interactiveTest(nums) {
    console.log(`\n=== Interactive Test ===`);
    console.log(`Input: [${nums}]`);
    
    const validation = validateMissingNumberArray(nums);
    if (!validation.valid) {
        console.log(`Error: ${validation.reason}`);
        return null;
    }
    
    const result = missingNumberOptimized(nums);
    const analysis = analyzeArray(nums);
    
    console.log(`Missing Number: ${result}`);
    console.log(`Array Analysis:`, analysis);
    
    return result;
}

// Run tests
testMissingNumber();
testEdgeCases();
performanceTest();
testRandomCases();

// Example interactive test
interactiveTest([3, 0, 1]);

// Export functions for use in other files
module.exports = {
    missingNumberBruteForce,
    missingNumberBetter,
    missingNumberOptimized,
    missingNumberXOR,
    missingNumberSet,
    missingNumberRecursive,
    missingNumberBinarySearch,
    missingNumberInRange,
    findMultipleMissingNumbers,
    missingNumberWithDuplicates,
    generateArrayWithMissingNumber,
    validateMissingNumberArray,
    analyzeArray,
    interactiveTest
};
