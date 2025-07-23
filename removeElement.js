/**
 * Remove Element
 * Bodhi-DSA Course
 * 
 * Problem: Remove all instances of a specific value from array in-place
 * Return the length of the modified array
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Find and remove elements one by one, shifting remaining elements
function removeElementBruteForce(nums, val) {
    let length = nums.length;
    let i = 0;
    
    while (i < length) {
        if (nums[i] === val) {
            // Shift all elements to the left
            for (let j = i; j < length - 1; j++) {
                nums[j] = nums[j + 1];
            }
            length--; // Decrease length
        } else {
            i++; // Move to next element only if current is not removed
        }
    }
    
    return length;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use additional array to store non-target elements
function removeElementBetter(nums, val) {
    const result = [];
    
    // Copy all non-target elements to result array
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            result.push(nums[i]);
        }
    }
    
    // Copy result back to original array
    for (let i = 0; i < result.length; i++) {
        nums[i] = result[i];
    }
    
    return result.length;
}

// ============= OPTIMIZED APPROACH (Two Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use two pointers - one for reading, one for writing
function removeElementOptimized(nums, val) {
    let writeIndex = 0; // Pointer for writing valid elements
    
    // Iterate through array with read pointer
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        // If current element is not the target value
        if (nums[readIndex] !== val) {
            nums[writeIndex] = nums[readIndex]; // Copy to write position
            writeIndex++; // Move write pointer
        }
        // If element equals val, just skip it (don't increment writeIndex)
    }
    
    return writeIndex; // Return new length
}

// ============= ALTERNATIVE: SWAP WITH LAST =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Swap target elements with elements from the end
function removeElementSwapLast(nums, val) {
    let i = 0;
    let n = nums.length;
    
    while (i < n) {
        if (nums[i] === val) {
            // Swap with last element and reduce size
            nums[i] = nums[n - 1];
            n--;
        } else {
            i++;
        }
    }
    
    return n;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to remove elements
function removeElementRecursive(nums, val, index = 0, writeIndex = 0) {
    // Base case: reached end of array
    if (index >= nums.length) {
        return writeIndex;
    }
    
    // If current element is not target value
    if (nums[index] !== val) {
        nums[writeIndex] = nums[index];
        return removeElementRecursive(nums, val, index + 1, writeIndex + 1);
    } else {
        // Skip target element
        return removeElementRecursive(nums, val, index + 1, writeIndex);
    }
}

// ============= FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use filter method (creates new array)
function removeElementFunctional(nums, val) {
    const filtered = nums.filter(num => num !== val);
    
    // Copy filtered elements back to original array
    for (let i = 0; i < filtered.length; i++) {
        nums[i] = filtered[i];
    }
    
    return filtered.length;
}

// ============= HELPER FUNCTIONS =============

// Function to create array copy for testing
function copyArray(arr) {
    return [...arr];
}

// Function to count occurrences of a value
function countOccurrences(arr, val) {
    return arr.filter(num => num === val).length;
}

// Function to validate result
function validateResult(originalArray, val, newLength, modifiedArray) {
    const originalCount = countOccurrences(originalArray, val);
    const expectedLength = originalArray.length - originalCount;
    
    // Check if new length is correct
    const lengthCorrect = newLength === expectedLength;
    
    // Check if first newLength elements don't contain val
    let noTargetInResult = true;
    for (let i = 0; i < newLength; i++) {
        if (modifiedArray[i] === val) {
            noTargetInResult = false;
            break;
        }
    }
    
    return {
        lengthCorrect,
        noTargetInResult,
        originalLength: originalArray.length,
        newLength,
        expectedLength,
        removedCount: originalCount
    };
}

// ============= TEST CASES =============
function testRemoveElement() {
    const testCases = [
        { nums: [3, 2, 2, 3], val: 3 },           // Expected: 2, array: [2, 2]
        { nums: [0, 1, 2, 2, 3, 0, 4, 2], val: 2 }, // Expected: 5, array: [0, 1, 3, 0, 4]
        { nums: [1], val: 1 },                    // Expected: 0, array: []
        { nums: [1], val: 2 },                    // Expected: 1, array: [1]
        { nums: [4, 5], val: 4 },                 // Expected: 1, array: [5]
        { nums: [1, 1, 1, 1], val: 1 },          // Expected: 0, array: []
        { nums: [1, 2, 3, 4, 5], val: 6 },       // Expected: 5, array: [1, 2, 3, 4, 5]
        { nums: [], val: 1 }                      // Expected: 0, array: []
    ];
    
    console.log("=== Remove Element Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`Original: [${testCase.nums}], Remove: ${testCase.val}`);
        
        // Test each approach with array copy
        let arr1 = copyArray(testCase.nums);
        let result1 = removeElementBruteForce(arr1, testCase.val);
        console.log(`Brute Force: length=${result1}, array=[${arr1.slice(0, result1)}]`);
        
        let arr2 = copyArray(testCase.nums);
        let result2 = removeElementBetter(arr2, testCase.val);
        console.log(`Better: length=${result2}, array=[${arr2.slice(0, result2)}]`);
        
        let arr3 = copyArray(testCase.nums);
        let result3 = removeElementOptimized(arr3, testCase.val);
        console.log(`Optimized: length=${result3}, array=[${arr3.slice(0, result3)}]`);
        
        let arr4 = copyArray(testCase.nums);
        let result4 = removeElementSwapLast(arr4, testCase.val);
        console.log(`Swap Last: length=${result4}, array=[${arr4.slice(0, result4)}]`);
        
        let arr5 = copyArray(testCase.nums);
        let result5 = removeElementRecursive(arr5, testCase.val);
        console.log(`Recursive: length=${result5}, array=[${arr5.slice(0, result5)}]`);
        
        // Validate result
        let validation = validateResult(testCase.nums, testCase.val, result3, arr3);
        console.log(`Validation:`, validation);
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { nums: [], val: 1, desc: "Empty array" },
        { nums: [1], val: 1, desc: "Single element to remove" },
        { nums: [1], val: 2, desc: "Single element not to remove" },
        { nums: [1, 1, 1], val: 1, desc: "All elements same as target" },
        { nums: [1, 2, 3], val: 4, desc: "Target not in array" },
        { nums: [1, 2, 1, 2, 1], val: 1, desc: "Alternating pattern" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: ${testCase.desc}`);
        console.log(`Input: [${testCase.nums}], Remove: ${testCase.val}`);
        
        let arr = copyArray(testCase.nums);
        let result = removeElementOptimized(arr, testCase.val);
        console.log(`Result: length=${result}, array=[${arr.slice(0, result)}]`);
    });
}

// Performance comparison
function performanceTest() {
    // Create large array with target values
    const largeArray = [];
    const targetVal = 5;
    
    for (let i = 0; i < 100000; i++) {
        largeArray.push(i % 10); // Creates pattern with target value
    }
    
    const iterations = 100;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largeArray.length}`);
    console.log(`Target value: ${targetVal}`);
    
    console.time("Brute Force");
    for (let i = 0; i < iterations; i++) {
        removeElementBruteForce(copyArray(largeArray), targetVal);
    }
    console.timeEnd("Brute Force");
    
    console.time("Better");
    for (let i = 0; i < iterations; i++) {
        removeElementBetter(copyArray(largeArray), targetVal);
    }
    console.timeEnd("Better");
    
    console.time("Optimized");
    for (let i = 0; i < iterations; i++) {
        removeElementOptimized(copyArray(largeArray), targetVal);
    }
    console.timeEnd("Optimized");
    
    console.time("Swap Last");
    for (let i = 0; i < iterations; i++) {
        removeElementSwapLast(copyArray(largeArray), targetVal);
    }
    console.timeEnd("Swap Last");
}

// Run tests
testRemoveElement();
testEdgeCases();
performanceTest();

// Export functions for use in other files
module.exports = {
    removeElementBruteForce,
    removeElementBetter,
    removeElementOptimized,
    removeElementSwapLast,
    removeElementRecursive,
    removeElementFunctional,
    copyArray,
    countOccurrences,
    validateResult
};
