/**
 * Remove Duplicates from Sorted Array
 * NamasteDSA Course
 * 
 * Problem: Remove duplicates from a sorted array in-place
 * Return the length of the array after removing duplicates
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use Set to remove duplicates, then copy back to original array
function removeDuplicatesBruteForce(nums) {
    if (nums.length === 0) return 0;
    
    // Use Set to get unique elements
    const uniqueSet = new Set(nums);
    const uniqueArray = Array.from(uniqueSet);
    
    // Copy unique elements back to original array
    for (let i = 0; i < uniqueArray.length; i++) {
        nums[i] = uniqueArray[i];
    }
    
    return uniqueArray.length;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use two pointers - one for reading, one for writing
function removeDuplicatesBetter(nums) {
    if (nums.length === 0) return 0;
    
    let writeIndex = 0; // Pointer for writing unique elements
    
    // Iterate through array starting from second element
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        // If current element is different from previous unique element
        if (nums[readIndex] !== nums[writeIndex]) {
            writeIndex++; // Move write pointer
            nums[writeIndex] = nums[readIndex]; // Copy unique element
        }
    }
    
    return writeIndex + 1; // Return count of unique elements
}

// ============= OPTIMIZED APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Same as better approach but with cleaner implementation
function removeDuplicatesOptimized(nums) {
    if (nums.length <= 1) return nums.length;
    
    let uniqueIndex = 1; // Index for next unique element position
    
    for (let i = 1; i < nums.length; i++) {
        // If current element is different from previous element
        if (nums[i] !== nums[i - 1]) {
            nums[uniqueIndex] = nums[i];
            uniqueIndex++;
        }
    }
    
    return uniqueIndex;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to remove duplicates
function removeDuplicatesRecursive(nums, index = 1, uniqueCount = 1) {
    // Base case: reached end of array
    if (index >= nums.length) {
        return uniqueCount;
    }
    
    // If current element is different from previous unique element
    if (nums[index] !== nums[uniqueCount - 1]) {
        nums[uniqueCount] = nums[index];
        uniqueCount++;
    }
    
    // Recursive call for next element
    return removeDuplicatesRecursive(nums, index + 1, uniqueCount);
}

// ============= ALTERNATIVE: FILTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use filter to create new array without duplicates
function removeDuplicatesFilter(nums) {
    if (nums.length === 0) return 0;
    
    // Filter unique elements
    const uniqueArray = nums.filter((value, index) => {
        return index === 0 || value !== nums[index - 1];
    });
    
    // Copy back to original array
    for (let i = 0; i < uniqueArray.length; i++) {
        nums[i] = uniqueArray[i];
    }
    
    return uniqueArray.length;
}

// ============= ADVANCED: REMOVE DUPLICATES WITH COUNT =============
// Remove duplicates and return both count and the modified array
function removeDuplicatesWithDetails(nums) {
    if (nums.length === 0) {
        return { count: 0, duplicatesRemoved: 0, array: nums };
    }
    
    let uniqueIndex = 1;
    let duplicatesRemoved = 0;
    const originalLength = nums.length;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[uniqueIndex] = nums[i];
            uniqueIndex++;
        } else {
            duplicatesRemoved++;
        }
    }
    
    return {
        count: uniqueIndex,
        duplicatesRemoved: duplicatesRemoved,
        originalLength: originalLength,
        array: nums.slice(0, uniqueIndex)
    };
}

// ============= HELPER FUNCTIONS =============

// Function to create a copy of array for testing
function copyArray(arr) {
    return [...arr];
}

// Function to validate if array is sorted
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Function to count duplicates in array
function countDuplicates(arr) {
    let duplicates = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            duplicates++;
        }
    }
    return duplicates;
}

// ============= TEST CASES =============
function testRemoveDuplicates() {
    const testCases = [
        [1, 1, 2],                    // Expected: 2, array: [1, 2]
        [0, 0, 1, 1, 1, 2, 2, 3, 3, 4], // Expected: 5, array: [0, 1, 2, 3, 4]
        [1, 2, 3, 4, 5],             // Expected: 5, array: [1, 2, 3, 4, 5]
        [1, 1, 1, 1, 1],             // Expected: 1, array: [1]
        [],                          // Expected: 0, array: []
        [1],                         // Expected: 1, array: [1]
        [1, 2, 2, 3, 3, 3, 4, 4, 4, 4] // Expected: 4, array: [1, 2, 3, 4]
    ];
    
    console.log("=== Remove Duplicates Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        console.log(`Original length: ${testCase.length}`);
        console.log(`Is sorted: ${isSorted(testCase)}`);
        console.log(`Duplicate count: ${countDuplicates(testCase)}`);
        
        // Test each approach with a copy of the array
        let arr1 = copyArray(testCase);
        let result1 = removeDuplicatesBruteForce(arr1);
        console.log(`Brute Force: length=${result1}, array=[${arr1.slice(0, result1)}]`);
        
        let arr2 = copyArray(testCase);
        let result2 = removeDuplicatesBetter(arr2);
        console.log(`Better: length=${result2}, array=[${arr2.slice(0, result2)}]`);
        
        let arr3 = copyArray(testCase);
        let result3 = removeDuplicatesOptimized(arr3);
        console.log(`Optimized: length=${result3}, array=[${arr3.slice(0, result3)}]`);
        
        let arr4 = copyArray(testCase);
        let result4 = removeDuplicatesRecursive(arr4);
        console.log(`Recursive: length=${result4}, array=[${arr4.slice(0, result4)}]`);
        
        let arr5 = copyArray(testCase);
        let details = removeDuplicatesWithDetails(arr5);
        console.log(`With Details:`, details);
    });
}

// Performance comparison
function performanceTest() {
    // Create large array with duplicates
    const largeArray = [];
    for (let i = 0; i < 100000; i++) {
        largeArray.push(Math.floor(i / 3)); // Creates duplicates
    }
    largeArray.sort((a, b) => a - b);
    
    const iterations = 100;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largeArray.length}`);
    
    console.time("Brute Force");
    for (let i = 0; i < iterations; i++) {
        removeDuplicatesBruteForce(copyArray(largeArray));
    }
    console.timeEnd("Brute Force");
    
    console.time("Better");
    for (let i = 0; i < iterations; i++) {
        removeDuplicatesBetter(copyArray(largeArray));
    }
    console.timeEnd("Better");
    
    console.time("Optimized");
    for (let i = 0; i < iterations; i++) {
        removeDuplicatesOptimized(copyArray(largeArray));
    }
    console.timeEnd("Optimized");
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { input: [], desc: "Empty array" },
        { input: [1], desc: "Single element" },
        { input: [1, 1], desc: "Two identical elements" },
        { input: [1, 2], desc: "Two different elements" },
        { input: [1, 1, 1, 1, 1], desc: "All identical elements" },
        { input: [-1, 0, 0, 1, 1, 2], desc: "Array with negative numbers" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: [${testCase.input}] (${testCase.desc})`);
        let arr = copyArray(testCase.input);
        let result = removeDuplicatesOptimized(arr);
        console.log(`Result: length=${result}, array=[${arr.slice(0, result)}]`);
    });
}

// Run tests
testRemoveDuplicates();
performanceTest();
testEdgeCases();

// Export functions for use in other files
module.exports = {
    removeDuplicatesBruteForce,
    removeDuplicatesBetter,
    removeDuplicatesOptimized,
    removeDuplicatesRecursive,
    removeDuplicatesFilter,
    removeDuplicatesWithDetails,
    copyArray,
    isSorted,
    countDuplicates
};
