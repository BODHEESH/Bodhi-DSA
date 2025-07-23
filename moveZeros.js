/**
 * Move Zeros
 * Bodhi-DSA Course
 * 
 * Problem: Move all zeros to the end of array while maintaining relative order of non-zero elements
 * Modify the array in-place
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Find zeros and shift all elements after each zero
function moveZeroesBruteForce(nums) {
    let n = nums.length;
    
    // Iterate through array
    for (let i = 0; i < n; i++) {
        // If current element is zero
        if (nums[i] === 0) {
            // Shift all elements after this zero to the left
            for (let j = i; j < n - 1; j++) {
                nums[j] = nums[j + 1];
            }
            // Place zero at the end
            nums[n - 1] = 0;
            n--; // Reduce effective array size
            i--; // Check current position again
        }
    }
    
    return nums;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use extra array to store non-zero elements
function moveZeroesBetter(nums) {
    const nonZeros = [];
    let zeroCount = 0;
    
    // Collect non-zero elements and count zeros
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nonZeros.push(nums[i]);
        } else {
            zeroCount++;
        }
    }
    
    // Copy non-zero elements back to original array
    for (let i = 0; i < nonZeros.length; i++) {
        nums[i] = nonZeros[i];
    }
    
    // Fill remaining positions with zeros
    for (let i = nonZeros.length; i < nums.length; i++) {
        nums[i] = 0;
    }
    
    return nums;
}

// ============= OPTIMIZED APPROACH (Two Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use two pointers - one for non-zero position, one for iteration
function moveZeroesOptimized(nums) {
    let writeIndex = 0; // Pointer for next non-zero position
    
    // Move all non-zero elements to the front
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }
    
    // Fill remaining positions with zeros
    for (let i = writeIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
    
    return nums;
}

// ============= ALTERNATIVE: SWAP APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Swap non-zero elements with zeros
function moveZeroesSwap(nums) {
    let left = 0; // Pointer for next position to place non-zero element
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            // Swap only if positions are different
            if (left !== right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
            left++;
        }
    }
    
    return nums;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to move zeros
function moveZeroesRecursive(nums, index = 0, writeIndex = 0) {
    // Base case: reached end of array
    if (index >= nums.length) {
        // Fill remaining positions with zeros
        for (let i = writeIndex; i < nums.length; i++) {
            nums[i] = 0;
        }
        return nums;
    }
    
    // If current element is non-zero, place it at writeIndex
    if (nums[index] !== 0) {
        nums[writeIndex] = nums[index];
        return moveZeroesRecursive(nums, index + 1, writeIndex + 1);
    } else {
        // Skip zero and continue
        return moveZeroesRecursive(nums, index + 1, writeIndex);
    }
}

// ============= FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use filter and fill methods
function moveZeroesFunctional(nums) {
    // Filter non-zero elements
    const nonZeros = nums.filter(num => num !== 0);
    const zeroCount = nums.length - nonZeros.length;
    
    // Create array with non-zeros followed by zeros
    const result = [...nonZeros, ...new Array(zeroCount).fill(0)];
    
    // Copy back to original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = result[i];
    }
    
    return nums;
}

// ============= OPTIMIZED WITH SINGLE PASS =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Move zeros in single pass with minimal operations
function moveZeroesSinglePass(nums) {
    let insertPos = 0;
    
    // Move all non-zero elements to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            if (i !== insertPos) {
                nums[insertPos] = nums[i];
                nums[i] = 0;
            }
            insertPos++;
        }
    }
    
    return nums;
}

// ============= HELPER FUNCTIONS =============

// Function to create array copy
function copyArray(arr) {
    return [...arr];
}

// Function to count zeros in array
function countZeros(arr) {
    return arr.filter(num => num === 0).length;
}

// Function to validate move zeros result
function validateMoveZeros(original, result) {
    // Check if array length is same
    if (original.length !== result.length) {
        return { valid: false, reason: "Length mismatch" };
    }
    
    // Count elements in both arrays
    const originalCount = {};
    const resultCount = {};
    
    for (let num of original) {
        originalCount[num] = (originalCount[num] || 0) + 1;
    }
    
    for (let num of result) {
        resultCount[num] = (resultCount[num] || 0) + 1;
    }
    
    // Check if counts match
    for (let key in originalCount) {
        if (originalCount[key] !== resultCount[key]) {
            return { valid: false, reason: "Element count mismatch" };
        }
    }
    
    // Check if all zeros are at the end
    let foundNonZero = false;
    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] === 0) {
            if (foundNonZero) {
                return { valid: false, reason: "Zeros not at end" };
            }
        } else {
            foundNonZero = true;
        }
    }
    
    // Check if relative order of non-zeros is maintained
    const originalNonZeros = original.filter(num => num !== 0);
    const resultNonZeros = result.filter(num => num !== 0);
    
    for (let i = 0; i < originalNonZeros.length; i++) {
        if (originalNonZeros[i] !== resultNonZeros[i]) {
            return { valid: false, reason: "Relative order not maintained" };
        }
    }
    
    return { valid: true, reason: "Valid result" };
}

// Function to analyze array composition
function analyzeArray(arr) {
    const zeroCount = countZeros(arr);
    const nonZeroCount = arr.length - zeroCount;
    const uniqueElements = new Set(arr).size;
    
    return {
        totalElements: arr.length,
        zeroCount,
        nonZeroCount,
        uniqueElements,
        zeroPercentage: ((zeroCount / arr.length) * 100).toFixed(2) + '%'
    };
}

// ============= ADVANCED VARIATIONS =============

// Move specific value to end (generalized version)
function moveValueToEnd(nums, value) {
    let writeIndex = 0;
    
    // Move all non-target elements to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== value) {
            nums[writeIndex] = nums[i];
            writeIndex++;
        }
    }
    
    // Fill remaining positions with target value
    for (let i = writeIndex; i < nums.length; i++) {
        nums[i] = value;
    }
    
    return nums;
}

// Move zeros to beginning
function moveZeroesToBeginning(nums) {
    let writeIndex = nums.length - 1;
    
    // Move all non-zero elements to end
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] !== 0) {
            nums[writeIndex] = nums[i];
            writeIndex--;
        }
    }
    
    // Fill remaining positions with zeros
    for (let i = 0; i <= writeIndex; i++) {
        nums[i] = 0;
    }
    
    return nums;
}

// ============= TEST CASES =============
function testMoveZeros() {
    const testCases = [
        [0, 1, 0, 3, 12],           // Expected: [1, 3, 12, 0, 0]
        [0, 0, 1],                  // Expected: [1, 0, 0]
        [1, 0, 2, 0, 3, 0, 4],     // Expected: [1, 2, 3, 4, 0, 0, 0]
        [0],                        // Expected: [0]
        [1],                        // Expected: [1]
        [1, 2, 3],                  // Expected: [1, 2, 3]
        [0, 0, 0],                  // Expected: [0, 0, 0]
        [0, 1, 0, 2, 0, 3],        // Expected: [1, 2, 3, 0, 0, 0]
        [1, 0, 1, 0, 1],           // Expected: [1, 1, 1, 0, 0]
        []                          // Expected: []
    ];
    
    console.log("=== Move Zeros Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        
        // Analyze original array
        const analysis = analyzeArray(testCase);
        console.log(`Analysis:`, analysis);
        
        // Test different approaches
        let arr1 = copyArray(testCase);
        let result1 = moveZeroesBruteForce(arr1);
        console.log(`Brute Force: [${result1}]`);
        
        let arr2 = copyArray(testCase);
        let result2 = moveZeroesBetter(arr2);
        console.log(`Better: [${result2}]`);
        
        let arr3 = copyArray(testCase);
        let result3 = moveZeroesOptimized(arr3);
        console.log(`Optimized: [${result3}]`);
        
        let arr4 = copyArray(testCase);
        let result4 = moveZeroesSwap(arr4);
        console.log(`Swap: [${result4}]`);
        
        let arr5 = copyArray(testCase);
        let result5 = moveZeroesRecursive(arr5);
        console.log(`Recursive: [${result5}]`);
        
        let arr6 = copyArray(testCase);
        let result6 = moveZeroesSinglePass(arr6);
        console.log(`Single Pass: [${result6}]`);
        
        // Validate result
        const validation = validateMoveZeros(testCase, result3);
        console.log(`Validation:`, validation);
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: [], desc: "Empty array" },
        { input: [0], desc: "Single zero" },
        { input: [1], desc: "Single non-zero" },
        { input: [0, 0], desc: "All zeros" },
        { input: [1, 2], desc: "No zeros" },
        { input: [0, 1, 0], desc: "Alternating pattern" },
        { input: [1, 0, 0, 0, 2], desc: "Multiple consecutive zeros" },
        { input: [0, 0, 0, 1, 2, 3], desc: "Zeros at beginning" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: [${testCase.input}] (${testCase.desc})`);
        
        let arr = copyArray(testCase.input);
        let result = moveZeroesOptimized(arr);
        console.log(`Result: [${result}]`);
        
        let validation = validateMoveZeros(testCase.input, result);
        console.log(`Valid: ${validation.valid}`);
    });
}

// Performance comparison
function performanceTest() {
    // Create large array with random zeros
    const largeArray = [];
    for (let i = 0; i < 100000; i++) {
        largeArray.push(Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 100) + 1);
    }
    
    const iterations = 100;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largeArray.length}`);
    console.log(`Zero percentage: ${((countZeros(largeArray) / largeArray.length) * 100).toFixed(2)}%`);
    
    console.time("Better");
    for (let i = 0; i < iterations; i++) {
        moveZeroesBetter(copyArray(largeArray));
    }
    console.timeEnd("Better");
    
    console.time("Optimized");
    for (let i = 0; i < iterations; i++) {
        moveZeroesOptimized(copyArray(largeArray));
    }
    console.timeEnd("Optimized");
    
    console.time("Swap");
    for (let i = 0; i < iterations; i++) {
        moveZeroesSwap(copyArray(largeArray));
    }
    console.timeEnd("Swap");
    
    console.time("Single Pass");
    for (let i = 0; i < iterations; i++) {
        moveZeroesSinglePass(copyArray(largeArray));
    }
    console.timeEnd("Single Pass");
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    const testArray = [1, 2, 0, 3, 0, 4, 5];
    console.log(`Original: [${testArray}]`);
    
    // Move zeros to end
    let arr1 = copyArray(testArray);
    moveZeroesOptimized(arr1);
    console.log(`Zeros to end: [${arr1}]`);
    
    // Move zeros to beginning
    let arr2 = copyArray(testArray);
    moveZeroesToBeginning(arr2);
    console.log(`Zeros to beginning: [${arr2}]`);
    
    // Move specific value (2) to end
    let arr3 = copyArray(testArray);
    moveValueToEnd(arr3, 2);
    console.log(`Move 2 to end: [${arr3}]`);
}

// Run tests
testMoveZeros();
testEdgeCases();
performanceTest();
testVariations();

// Export functions for use in other files
module.exports = {
    moveZeroesBruteForce,
    moveZeroesBetter,
    moveZeroesOptimized,
    moveZeroesSwap,
    moveZeroesRecursive,
    moveZeroesFunctional,
    moveZeroesSinglePass,
    moveValueToEnd,
    moveZeroesToBeginning,
    copyArray,
    countZeros,
    validateMoveZeros,
    analyzeArray
};
