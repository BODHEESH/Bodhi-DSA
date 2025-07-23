/**
 * Max Consecutive Ones
 * Bodhi-DSA Course
 * 
 * Problem: Find the maximum number of consecutive 1s in a binary array
 * Array contains only 0s and 1s
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Check all possible subarrays and find longest consecutive 1s
function findMaxConsecutiveOnesBruteForce(nums) {
    let maxCount = 0;
    
    // Check every possible starting position
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            let currentCount = 0;
            
            // Count consecutive 1s from current position
            for (let j = i; j < nums.length && nums[j] === 1; j++) {
                currentCount++;
            }
            
            maxCount = Math.max(maxCount, currentCount);
        }
    }
    
    return maxCount;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Single pass with counter reset on encountering 0
function findMaxConsecutiveOnesBetter(nums) {
    let maxCount = 0;
    let currentCount = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0; // Reset counter when we encounter 0
        }
    }
    
    return maxCount;
}

// ============= OPTIMIZED APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Same as better but with cleaner implementation
function findMaxConsecutiveOnesOptimized(nums) {
    let maxCount = 0;
    let currentCount = 0;
    
    for (const num of nums) {
        if (num === 1) {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }
    
    return maxCount;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to find consecutive ones
function findMaxConsecutiveOnesRecursive(nums, index = 0, currentCount = 0, maxCount = 0) {
    // Base case: reached end of array
    if (index >= nums.length) {
        return maxCount;
    }
    
    if (nums[index] === 1) {
        currentCount++;
        maxCount = Math.max(maxCount, currentCount);
    } else {
        currentCount = 0;
    }
    
    return findMaxConsecutiveOnesRecursive(nums, index + 1, currentCount, maxCount);
}

// ============= FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use reduce to find maximum consecutive ones
function findMaxConsecutiveOnesFunctional(nums) {
    const result = nums.reduce(
        (acc, num) => {
            if (num === 1) {
                acc.currentCount++;
                acc.maxCount = Math.max(acc.maxCount, acc.currentCount);
            } else {
                acc.currentCount = 0;
            }
            return acc;
        },
        { currentCount: 0, maxCount: 0 }
    );
    
    return result.maxCount;
}

// ============= ALTERNATIVE: STRING APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Convert to string and use split method
function findMaxConsecutiveOnesString(nums) {
    // Convert array to string and split by '0'
    const consecutiveOnesGroups = nums.join('').split('0');
    
    // Find the longest group of consecutive 1s
    let maxLength = 0;
    for (const group of consecutiveOnesGroups) {
        maxLength = Math.max(maxLength, group.length);
    }
    
    return maxLength;
}

// ============= ADVANCED: WITH POSITION TRACKING =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Also return start and end positions of longest consecutive 1s
function findMaxConsecutiveOnesWithPosition(nums) {
    let maxCount = 0;
    let currentCount = 0;
    let maxStart = -1;
    let maxEnd = -1;
    let currentStart = -1;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            if (currentCount === 0) {
                currentStart = i; // Start of new sequence
            }
            currentCount++;
            
            if (currentCount > maxCount) {
                maxCount = currentCount;
                maxStart = currentStart;
                maxEnd = i;
            }
        } else {
            currentCount = 0;
        }
    }
    
    return {
        maxCount,
        startIndex: maxStart,
        endIndex: maxEnd,
        sequence: maxStart !== -1 ? nums.slice(maxStart, maxEnd + 1) : []
    };
}

// ============= ADVANCED: MULTIPLE SEQUENCES =============
// Time Complexity: O(n) | Space Complexity: O(k) where k is number of sequences
// Find all consecutive sequences of 1s
function findAllConsecutiveOnesSequences(nums) {
    const sequences = [];
    let currentCount = 0;
    let currentStart = -1;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            if (currentCount === 0) {
                currentStart = i;
            }
            currentCount++;
        } else {
            if (currentCount > 0) {
                sequences.push({
                    length: currentCount,
                    startIndex: currentStart,
                    endIndex: i - 1,
                    sequence: nums.slice(currentStart, i)
                });
                currentCount = 0;
            }
        }
    }
    
    // Handle case where array ends with 1s
    if (currentCount > 0) {
        sequences.push({
            length: currentCount,
            startIndex: currentStart,
            endIndex: nums.length - 1,
            sequence: nums.slice(currentStart)
        });
    }
    
    return sequences.sort((a, b) => b.length - a.length); // Sort by length descending
}

// ============= HELPER FUNCTIONS =============

// Function to validate binary array
function isBinaryArray(nums) {
    return nums.every(num => num === 0 || num === 1);
}

// Function to generate random binary array
function generateBinaryArray(size, onesPercentage = 0.5) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.random() < onesPercentage ? 1 : 0);
    }
    return arr;
}

// Function to analyze binary array
function analyzeBinaryArray(nums) {
    const onesCount = nums.filter(num => num === 1).length;
    const zerosCount = nums.length - onesCount;
    const sequences = findAllConsecutiveOnesSequences(nums);
    
    return {
        totalElements: nums.length,
        onesCount,
        zerosCount,
        onesPercentage: ((onesCount / nums.length) * 100).toFixed(2) + '%',
        zerosPercentage: ((zerosCount / nums.length) * 100).toFixed(2) + '%',
        totalSequences: sequences.length,
        longestSequence: sequences.length > 0 ? sequences[0].length : 0,
        averageSequenceLength: sequences.length > 0 ? 
            (sequences.reduce((sum, seq) => sum + seq.length, 0) / sequences.length).toFixed(2) : 0
    };
}

// Function to create array copy
function copyArray(arr) {
    return [...arr];
}

// ============= VARIATIONS =============

// Max consecutive zeros
function findMaxConsecutiveZeros(nums) {
    let maxCount = 0;
    let currentCount = 0;
    
    for (const num of nums) {
        if (num === 0) {
            currentCount++;
            maxCount = Math.max(maxCount, currentCount);
        } else {
            currentCount = 0;
        }
    }
    
    return maxCount;
}

// Max consecutive ones with at most k zeros flipped
function findMaxConsecutiveOnesWithKFlips(nums, k) {
    let left = 0;
    let maxLength = 0;
    let zerosCount = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zerosCount++;
        }
        
        // Shrink window if we have more than k zeros
        while (zerosCount > k) {
            if (nums[left] === 0) {
                zerosCount--;
            }
            left++;
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// ============= TEST CASES =============
function testMaxConsecutiveOnes() {
    const testCases = [
        [1, 1, 0, 1, 1, 1],         // Expected: 3
        [1, 0, 1, 1, 0, 1],         // Expected: 2
        [0, 0, 0, 0, 0],            // Expected: 0
        [1, 1, 1, 1, 1],            // Expected: 5
        [1],                        // Expected: 1
        [0],                        // Expected: 0
        [1, 0],                     // Expected: 1
        [0, 1],                     // Expected: 1
        [1, 1, 0, 0, 1, 1, 1, 0, 1], // Expected: 3
        [],                         // Expected: 0
        [1, 0, 1, 0, 1, 0, 1],      // Expected: 1
        [0, 1, 1, 0, 1, 1, 1, 1]    // Expected: 4
    ];
    
    console.log("=== Max Consecutive Ones Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        
        // Validate binary array
        const isBinary = isBinaryArray(testCase);
        console.log(`Is Binary Array: ${isBinary}`);
        
        if (isBinary) {
            // Analyze array
            const analysis = analyzeBinaryArray(testCase);
            console.log(`Analysis:`, analysis);
            
            // Test different approaches
            console.log(`Brute Force: ${findMaxConsecutiveOnesBruteForce(testCase)}`);
            console.log(`Better: ${findMaxConsecutiveOnesBetter(testCase)}`);
            console.log(`Optimized: ${findMaxConsecutiveOnesOptimized(testCase)}`);
            console.log(`Recursive: ${findMaxConsecutiveOnesRecursive(testCase)}`);
            console.log(`Functional: ${findMaxConsecutiveOnesFunctional(testCase)}`);
            console.log(`String: ${findMaxConsecutiveOnesString(testCase)}`);
            
            // Test advanced functions
            const withPosition = findMaxConsecutiveOnesWithPosition(testCase);
            console.log(`With Position:`, withPosition);
            
            const allSequences = findAllConsecutiveOnesSequences(testCase);
            console.log(`All Sequences:`, allSequences);
            
            // Test variations
            console.log(`Max Consecutive Zeros: ${findMaxConsecutiveZeros(testCase)}`);
            console.log(`Max Ones with 1 flip: ${findMaxConsecutiveOnesWithKFlips(testCase, 1)}`);
        }
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: [], desc: "Empty array" },
        { input: [1], desc: "Single 1" },
        { input: [0], desc: "Single 0" },
        { input: [1, 1], desc: "All 1s" },
        { input: [0, 0], desc: "All 0s" },
        { input: [1, 0, 1], desc: "Alternating pattern" },
        { input: [0, 1, 1, 1, 0], desc: "1s in middle" },
        { input: [1, 1, 1, 0, 0], desc: "1s at start" },
        { input: [0, 0, 1, 1, 1], desc: "1s at end" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: [${testCase.input}] (${testCase.desc})`);
        
        const result = findMaxConsecutiveOnesOptimized(testCase.input);
        console.log(`Result: ${result}`);
        
        if (testCase.input.length > 0) {
            const analysis = analyzeBinaryArray(testCase.input);
            console.log(`Analysis: ${analysis.onesCount} ones, ${analysis.zerosCount} zeros`);
        }
    });
}

// Performance comparison
function performanceTest() {
    const largeBinaryArray = generateBinaryArray(100000, 0.6); // 60% ones
    const iterations = 1000;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largeBinaryArray.length}`);
    
    const analysis = analyzeBinaryArray(largeBinaryArray);
    console.log(`Array composition: ${analysis.onesPercentage} ones, ${analysis.zerosPercentage} zeros`);
    
    console.time("Better");
    for (let i = 0; i < iterations; i++) {
        findMaxConsecutiveOnesBetter(largeBinaryArray);
    }
    console.timeEnd("Better");
    
    console.time("Optimized");
    for (let i = 0; i < iterations; i++) {
        findMaxConsecutiveOnesOptimized(largeBinaryArray);
    }
    console.timeEnd("Optimized");
    
    console.time("Functional");
    for (let i = 0; i < iterations; i++) {
        findMaxConsecutiveOnesFunctional(largeBinaryArray);
    }
    console.timeEnd("Functional");
    
    console.time("String");
    for (let i = 0; i < iterations; i++) {
        findMaxConsecutiveOnesString(largeBinaryArray);
    }
    console.timeEnd("String");
}

// Interactive test
function interactiveTest(binaryArray) {
    console.log(`\n=== Interactive Test ===`);
    console.log(`Input: [${binaryArray}]`);
    
    if (!isBinaryArray(binaryArray)) {
        console.log("Error: Not a binary array!");
        return;
    }
    
    const result = findMaxConsecutiveOnesOptimized(binaryArray);
    const detailed = findMaxConsecutiveOnesWithPosition(binaryArray);
    const analysis = analyzeBinaryArray(binaryArray);
    
    console.log(`Max Consecutive Ones: ${result}`);
    console.log(`Detailed Result:`, detailed);
    console.log(`Array Analysis:`, analysis);
    
    return result;
}

// Run tests
testMaxConsecutiveOnes();
testEdgeCases();
performanceTest();

// Example interactive test
interactiveTest([1, 1, 0, 1, 1, 1, 0, 1, 1]);

// Export functions for use in other files
module.exports = {
    findMaxConsecutiveOnesBruteForce,
    findMaxConsecutiveOnesBetter,
    findMaxConsecutiveOnesOptimized,
    findMaxConsecutiveOnesRecursive,
    findMaxConsecutiveOnesFunctional,
    findMaxConsecutiveOnesString,
    findMaxConsecutiveOnesWithPosition,
    findAllConsecutiveOnesSequences,
    findMaxConsecutiveZeros,
    findMaxConsecutiveOnesWithKFlips,
    isBinaryArray,
    generateBinaryArray,
    analyzeBinaryArray,
    copyArray,
    interactiveTest
};
