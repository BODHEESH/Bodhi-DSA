/**
 * Single Number
 * Bodhi-DSA Course
 * 
 * Problem: Find the unique element in an array where all others appear twice
 * Every element appears exactly twice except for one element which appears once
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Check each element against all other elements
function singleNumberBruteForce(nums) {
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        
        // Count occurrences of current element
        for (let j = 0; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                count++;
            }
        }
        
        // If element appears only once, return it
        if (count === 1) {
            return nums[i];
        }
    }
    
    return -1; // Should never reach here for valid input
}

// ============= BETTER APPROACH (Sorting) =============
// Time Complexity: O(n log n) | Space Complexity: O(1)
// Sort array and find the element without a pair
function singleNumberBetter(nums) {
    // Sort the array
    nums.sort((a, b) => a - b);
    
    // Check pairs
    for (let i = 0; i < nums.length; i += 2) {
        // If we're at the last element or current element != next element
        if (i === nums.length - 1 || nums[i] !== nums[i + 1]) {
            return nums[i];
        }
    }
    
    return -1; // Should never reach here
}

// ============= OPTIMIZED APPROACH (XOR) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use XOR properties: a ^ a = 0, a ^ 0 = a, XOR is commutative and associative
function singleNumberOptimized(nums) {
    let result = 0;
    
    // XOR all elements
    for (let num of nums) {
        result ^= num;
    }
    
    // All pairs cancel out, leaving only the single number
    return result;
}

// ============= ALTERNATIVE: HASH MAP APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use hash map to count occurrences
function singleNumberHashMap(nums) {
    const countMap = new Map();
    
    // Count occurrences of each element
    for (let num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    // Find element with count 1
    for (let [num, count] of countMap) {
        if (count === 1) {
            return num;
        }
    }
    
    return -1; // Should never reach here
}

// ============= ALTERNATIVE: SET APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use set to track seen elements
function singleNumberSet(nums) {
    const seen = new Set();
    
    for (let num of nums) {
        if (seen.has(num)) {
            seen.delete(num); // Remove if seen before
        } else {
            seen.add(num); // Add if not seen
        }
    }
    
    // Set should contain only the single number
    return Array.from(seen)[0];
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion with XOR
function singleNumberRecursive(nums, index = 0, xor = 0) {
    // Base case: processed all elements
    if (index >= nums.length) {
        return xor;
    }
    
    // XOR current element and recurse
    return singleNumberRecursive(nums, index + 1, xor ^ nums[index]);
}

// ============= FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use reduce with XOR
function singleNumberFunctional(nums) {
    return nums.reduce((xor, num) => xor ^ num, 0);
}

// ============= MATHEMATICAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use mathematical property: 2 * sum(unique) - sum(all) = single number
function singleNumberMath(nums) {
    const uniqueSet = new Set(nums);
    const sumUnique = Array.from(uniqueSet).reduce((sum, num) => sum + num, 0);
    const sumAll = nums.reduce((sum, num) => sum + num, 0);
    
    return 2 * sumUnique - sumAll;
}

// ============= HELPER FUNCTIONS =============

// Function to generate array with single number
function generateSingleNumberArray(size, singleNum = null) {
    if (singleNum === null) {
        singleNum = Math.floor(Math.random() * 100) + 1;
    }
    
    const arr = [singleNum];
    const pairCount = Math.floor((size - 1) / 2);
    
    // Add pairs of random numbers
    for (let i = 0; i < pairCount; i++) {
        let num;
        do {
            num = Math.floor(Math.random() * 100) + 1;
        } while (num === singleNum);
        
        arr.push(num, num); // Add pair
    }
    
    // Shuffle array
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    return { array: arr, singleNumber: singleNum };
}

// Function to validate single number array
function validateSingleNumberArray(nums) {
    const countMap = new Map();
    
    // Count occurrences
    for (let num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    let singleCount = 0;
    let singleNumber = null;
    
    // Check counts
    for (let [num, count] of countMap) {
        if (count === 1) {
            singleCount++;
            singleNumber = num;
        } else if (count !== 2) {
            return { 
                valid: false, 
                reason: `Number ${num} appears ${count} times (expected 1 or 2)` 
            };
        }
    }
    
    if (singleCount !== 1) {
        return { 
            valid: false, 
            reason: `Expected exactly 1 single number, found ${singleCount}` 
        };
    }
    
    return { valid: true, singleNumber };
}

// Function to analyze array
function analyzeArray(nums) {
    const countMap = new Map();
    
    for (let num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    const uniqueElements = countMap.size;
    const singleElements = Array.from(countMap.values()).filter(count => count === 1).length;
    const pairElements = Array.from(countMap.values()).filter(count => count === 2).length;
    const otherElements = Array.from(countMap.values()).filter(count => count > 2).length;
    
    return {
        totalElements: nums.length,
        uniqueElements,
        singleElements,
        pairElements,
        otherElements,
        min: Math.min(...nums),
        max: Math.max(...nums),
        sum: nums.reduce((a, b) => a + b, 0),
        isValid: singleElements === 1 && otherElements === 0
    };
}

// Function to create array copy
function copyArray(arr) {
    return [...arr];
}

// ============= ADVANCED VARIATIONS =============

// Single Number II: Find single number when others appear 3 times
function singleNumberII(nums) {
    let ones = 0, twos = 0;
    
    for (let num of nums) {
        ones = (ones ^ num) & ~twos;
        twos = (twos ^ num) & ~ones;
    }
    
    return ones;
}

// Single Number III: Find two single numbers when others appear twice
function singleNumberIII(nums) {
    // XOR all numbers
    let xor = 0;
    for (let num of nums) {
        xor ^= num;
    }
    
    // Find rightmost set bit
    const rightmostBit = xor & (-xor);
    
    let num1 = 0, num2 = 0;
    
    // Divide numbers into two groups and XOR separately
    for (let num of nums) {
        if (num & rightmostBit) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }
    
    return [num1, num2];
}

// Find single number with custom occurrence pattern
function singleNumberCustom(nums, singleOccurrence, pairOccurrence) {
    const countMap = new Map();
    
    for (let num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    for (let [num, count] of countMap) {
        if (count === singleOccurrence) {
            return num;
        }
    }
    
    return -1;
}

// ============= TEST CASES =============
function testSingleNumber() {
    const testCases = [
        [2, 2, 1],                    // Expected: 1
        [4, 1, 2, 1, 2],             // Expected: 4
        [1],                         // Expected: 1
        [2, 2, 3, 2],                // Expected: 3 (invalid for standard problem)
        [1, 2, 3, 2, 1],             // Expected: 3
        [5, 7, 5, 4, 7],             // Expected: 4
        [1, 1, 2, 2, 3, 3, 4],       // Expected: 4
        [0, 1, 0],                   // Expected: 1
        [-1, -1, -2],                // Expected: -2
        [1000, 999, 1000]            // Expected: 999
    ];
    
    console.log("=== Single Number Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        
        // Analyze array
        const analysis = analyzeArray(testCase);
        console.log(`Analysis:`, analysis);
        
        // Validate array
        const validation = validateSingleNumberArray(testCase);
        console.log(`Validation:`, validation);
        
        if (validation.valid || testCase.length === 1) {
            // Test different approaches
            console.log(`Brute Force: ${singleNumberBruteForce([...testCase])}`);
            console.log(`Better (Sorting): ${singleNumberBetter([...testCase])}`);
            console.log(`Optimized (XOR): ${singleNumberOptimized(testCase)}`);
            console.log(`Hash Map: ${singleNumberHashMap(testCase)}`);
            console.log(`Set: ${singleNumberSet(testCase)}`);
            console.log(`Recursive: ${singleNumberRecursive(testCase)}`);
            console.log(`Functional: ${singleNumberFunctional(testCase)}`);
            console.log(`Mathematical: ${singleNumberMath(testCase)}`);
        }
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: [1], desc: "Single element" },
        { input: [1, 1, 2], desc: "Minimum valid case" },
        { input: [0, 0, 1], desc: "With zero" },
        { input: [-1, -1, 0], desc: "With negative numbers" },
        { input: [1, 2, 1, 3, 2], desc: "Unsorted array" },
        { input: [100, 200, 100], desc: "Large numbers" },
        { input: [1, 1, 1, 2, 2], desc: "Invalid - number appears 3 times" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: [${testCase.input}] (${testCase.desc})`);
        
        const validation = validateSingleNumberArray(testCase.input);
        console.log(`Valid: ${validation.valid}`);
        
        if (validation.valid || testCase.input.length === 1) {
            const result = singleNumberOptimized(testCase.input);
            console.log(`Result: ${result}`);
        } else {
            console.log(`Reason: ${validation.reason}`);
        }
    });
}

// Performance comparison
function performanceTest() {
    const { array: largeArray } = generateSingleNumberArray(100001); // Odd size for valid single number
    const iterations = 1000;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largeArray.length}`);
    
    console.time("Better (Sorting)");
    for (let i = 0; i < iterations; i++) {
        singleNumberBetter([...largeArray]);
    }
    console.timeEnd("Better (Sorting)");
    
    console.time("Optimized (XOR)");
    for (let i = 0; i < iterations; i++) {
        singleNumberOptimized(largeArray);
    }
    console.timeEnd("Optimized (XOR)");
    
    console.time("Hash Map");
    for (let i = 0; i < iterations; i++) {
        singleNumberHashMap(largeArray);
    }
    console.timeEnd("Hash Map");
    
    console.time("Set");
    for (let i = 0; i < iterations; i++) {
        singleNumberSet(largeArray);
    }
    console.timeEnd("Set");
    
    console.time("Functional");
    for (let i = 0; i < iterations; i++) {
        singleNumberFunctional(largeArray);
    }
    console.timeEnd("Functional");
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    // Single Number II test
    const testII = [2, 2, 3, 2];
    console.log(`Single Number II: [${testII}] -> ${singleNumberII(testII)}`);
    
    // Single Number III test
    const testIII = [1, 2, 1, 3, 2, 5];
    console.log(`Single Number III: [${testIII}] -> [${singleNumberIII(testIII)}]`);
    
    // Custom occurrence test
    const testCustom = [1, 1, 1, 2, 2, 2, 3];
    console.log(`Custom (3,3): [${testCustom}] -> ${singleNumberCustom(testCustom, 1, 3)}`);
}

// Generate and test random cases
function testRandomCases() {
    console.log("\n=== Random Test Cases ===");
    
    for (let i = 0; i < 5; i++) {
        const size = Math.floor(Math.random() * 20) * 2 + 1; // Ensure odd size
        const { array, singleNumber } = generateSingleNumberArray(size);
        
        console.log(`\nRandom Case ${i + 1}:`);
        console.log(`Array: [${array}]`);
        console.log(`Expected Single: ${singleNumber}`);
        
        const result = singleNumberOptimized(array);
        console.log(`Found Single: ${result}`);
        console.log(`Correct: ${result === singleNumber}`);
    }
}

// Interactive test function
function interactiveTest(nums) {
    console.log(`\n=== Interactive Test ===`);
    console.log(`Input: [${nums}]`);
    
    const validation = validateSingleNumberArray(nums);
    if (!validation.valid && nums.length > 1) {
        console.log(`Warning: ${validation.reason}`);
    }
    
    const result = singleNumberOptimized(nums);
    const analysis = analyzeArray(nums);
    
    console.log(`Single Number: ${result}`);
    console.log(`Array Analysis:`, analysis);
    
    return result;
}

// Run tests
testSingleNumber();
testEdgeCases();
performanceTest();
testVariations();
testRandomCases();

// Example interactive test
interactiveTest([4, 1, 2, 1, 2]);

// Export functions for use in other files
module.exports = {
    singleNumberBruteForce,
    singleNumberBetter,
    singleNumberOptimized,
    singleNumberHashMap,
    singleNumberSet,
    singleNumberRecursive,
    singleNumberFunctional,
    singleNumberMath,
    singleNumberII,
    singleNumberIII,
    singleNumberCustom,
    generateSingleNumberArray,
    validateSingleNumberArray,
    analyzeArray,
    copyArray,
    interactiveTest
};
