/**
 * Merge Sorted Arrays
 * Bodhi-DSA Course
 * 
 * Problem: Merge two sorted arrays into one sorted array
 * Handle different array sizes and maintain sorted order
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O((m+n)log(m+n)) | Space Complexity: O(m+n)
// Concatenate arrays and sort the result
function mergeSortedArraysBruteForce(nums1, nums2) {
    // Concatenate both arrays
    const merged = nums1.concat(nums2);
    
    // Sort the concatenated array
    merged.sort((a, b) => a - b);
    
    return merged;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(m+n) | Space Complexity: O(m+n)
// Use two pointers to merge arrays
function mergeSortedArraysBetter(nums1, nums2) {
    const merged = [];
    let i = 0; // Pointer for nums1
    let j = 0; // Pointer for nums2
    
    // Compare elements and add smaller one to result
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i]);
            i++;
        } else {
            merged.push(nums2[j]);
            j++;
        }
    }
    
    // Add remaining elements from nums1
    while (i < nums1.length) {
        merged.push(nums1[i]);
        i++;
    }
    
    // Add remaining elements from nums2
    while (j < nums2.length) {
        merged.push(nums2[j]);
        j++;
    }
    
    return merged;
}

// ============= OPTIMIZED APPROACH (In-place for LeetCode style) =============
// Time Complexity: O(m+n) | Space Complexity: O(1)
// Merge nums2 into nums1 in-place (assumes nums1 has enough space)
function mergeSortedArraysOptimized(nums1, m, nums2, n) {
    // Start from the end of both arrays
    let i = m - 1;      // Last element in nums1
    let j = n - 1;      // Last element in nums2
    let k = m + n - 1;  // Last position in nums1
    
    // Merge from the end to avoid overwriting
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
    
    // Copy remaining elements from nums2
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
    
    // No need to copy remaining from nums1 as they're already in place
    return nums1;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(m+n) | Space Complexity: O(m+n) - due to recursion stack
// Use recursion to merge arrays
function mergeSortedArraysRecursive(nums1, nums2, i1 = 0, i2 = 0, result = []) {
    // Base cases
    if (i1 >= nums1.length && i2 >= nums2.length) {
        return result;
    }
    
    if (i1 >= nums1.length) {
        return result.concat(nums2.slice(i2));
    }
    
    if (i2 >= nums2.length) {
        return result.concat(nums1.slice(i1));
    }
    
    // Recursive case
    if (nums1[i1] <= nums2[i2]) {
        result.push(nums1[i1]);
        return mergeSortedArraysRecursive(nums1, nums2, i1 + 1, i2, result);
    } else {
        result.push(nums2[i2]);
        return mergeSortedArraysRecursive(nums1, nums2, i1, i2 + 1, result);
    }
}

// ============= ALTERNATIVE: USING GENERATORS =============
// Time Complexity: O(m+n) | Space Complexity: O(1) for generator
// Use generator function for memory-efficient merging
function* mergeSortedArraysGenerator(nums1, nums2) {
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            yield nums1[i];
            i++;
        } else {
            yield nums2[j];
            j++;
        }
    }
    
    while (i < nums1.length) {
        yield nums1[i];
        i++;
    }
    
    while (j < nums2.length) {
        yield nums2[j];
        j++;
    }
}

// ============= ADVANCED: MERGE MULTIPLE SORTED ARRAYS =============
// Time Complexity: O(n*k*log(k)) | Space Complexity: O(k)
// Merge k sorted arrays using min heap approach
function mergeMultipleSortedArrays(arrays) {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0];
    
    // Use divide and conquer approach
    while (arrays.length > 1) {
        const mergedArrays = [];
        
        // Merge arrays in pairs
        for (let i = 0; i < arrays.length; i += 2) {
            const arr1 = arrays[i];
            const arr2 = arrays[i + 1] || [];
            mergedArrays.push(mergeSortedArraysBetter(arr1, arr2));
        }
        
        arrays = mergedArrays;
    }
    
    return arrays[0];
}

// ============= HELPER FUNCTIONS =============

// Function to validate if array is sorted
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Function to create array copy
function copyArray(arr) {
    return [...arr];
}

// Function to generate random sorted array
function generateSortedArray(size, min = 1, max = 100) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr.sort((a, b) => a - b);
}

// Function to validate merge result
function validateMerge(nums1, nums2, merged) {
    // Check if result is sorted
    if (!isSorted(merged)) {
        return { valid: false, reason: "Result is not sorted" };
    }
    
    // Check if all elements are present
    const expectedLength = nums1.length + nums2.length;
    if (merged.length !== expectedLength) {
        return { valid: false, reason: "Length mismatch" };
    }
    
    // Check if all elements from both arrays are present
    const allElements = [...nums1, ...nums2].sort((a, b) => a - b);
    const mergedSorted = [...merged].sort((a, b) => a - b);
    
    for (let i = 0; i < allElements.length; i++) {
        if (allElements[i] !== mergedSorted[i]) {
            return { valid: false, reason: "Elements don't match" };
        }
    }
    
    return { valid: true, reason: "Valid merge" };
}

// ============= SPECIALIZED MERGE FUNCTIONS =============

// Merge with duplicates handling
function mergeSortedArraysNoDuplicates(nums1, nums2) {
    const merged = mergeSortedArraysBetter(nums1, nums2);
    const result = [];
    
    for (let i = 0; i < merged.length; i++) {
        if (i === 0 || merged[i] !== merged[i - 1]) {
            result.push(merged[i]);
        }
    }
    
    return result;
}

// Merge with intersection only
function mergeSortedArraysIntersection(nums1, nums2) {
    const intersection = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            intersection.push(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    return intersection;
}

// ============= TEST CASES =============
function testMergeSortedArrays() {
    const testCases = [
        { nums1: [1, 2, 3], nums2: [2, 5, 6] },           // Expected: [1, 2, 2, 3, 5, 6]
        { nums1: [1, 3, 5], nums2: [2, 4, 6] },           // Expected: [1, 2, 3, 4, 5, 6]
        { nums1: [], nums2: [1, 2, 3] },                  // Expected: [1, 2, 3]
        { nums1: [1, 2, 3], nums2: [] },                  // Expected: [1, 2, 3]
        { nums1: [1], nums2: [2] },                       // Expected: [1, 2]
        { nums1: [2], nums2: [1] },                       // Expected: [1, 2]
        { nums1: [1, 1, 1], nums2: [2, 2, 2] },          // Expected: [1, 1, 1, 2, 2, 2]
        { nums1: [1, 2, 3, 0, 0, 0], nums2: [2, 5, 6], m: 3, n: 3 }, // LeetCode style
        { nums1: [4, 5, 6], nums2: [1, 2, 3] },          // Expected: [1, 2, 3, 4, 5, 6]
        { nums1: [1, 3, 5, 7], nums2: [2, 4, 6, 8, 9] }  // Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ];
    
    console.log("=== Merge Sorted Arrays Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`nums1: [${testCase.nums1}]`);
        console.log(`nums2: [${testCase.nums2}]`);
        
        // Test different approaches
        let result1 = mergeSortedArraysBruteForce(testCase.nums1, testCase.nums2);
        console.log(`Brute Force: [${result1}]`);
        
        let result2 = mergeSortedArraysBetter(testCase.nums1, testCase.nums2);
        console.log(`Better: [${result2}]`);
        
        let result3 = mergeSortedArraysRecursive(testCase.nums1, testCase.nums2);
        console.log(`Recursive: [${result3}]`);
        
        // Test generator
        let result4 = Array.from(mergeSortedArraysGenerator(testCase.nums1, testCase.nums2));
        console.log(`Generator: [${result4}]`);
        
        // Test specialized functions
        let noDuplicates = mergeSortedArraysNoDuplicates(testCase.nums1, testCase.nums2);
        console.log(`No Duplicates: [${noDuplicates}]`);
        
        let intersection = mergeSortedArraysIntersection(testCase.nums1, testCase.nums2);
        console.log(`Intersection: [${intersection}]`);
        
        // Validate result
        let validation = validateMerge(testCase.nums1, testCase.nums2, result2);
        console.log(`Validation:`, validation);
        
        // Test LeetCode style if applicable
        if (testCase.m !== undefined && testCase.n !== undefined) {
            let nums1Copy = copyArray(testCase.nums1);
            let optimizedResult = mergeSortedArraysOptimized(nums1Copy, testCase.m, testCase.nums2, testCase.n);
            console.log(`Optimized (in-place): [${optimizedResult}]`);
        }
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { nums1: [], nums2: [], desc: "Both arrays empty" },
        { nums1: [1], nums2: [], desc: "Second array empty" },
        { nums1: [], nums2: [1], desc: "First array empty" },
        { nums1: [1, 1, 1], nums2: [1, 1, 1], desc: "All elements same" },
        { nums1: [1, 3, 5], nums2: [2, 4, 6], desc: "Interleaved elements" },
        { nums1: [1, 2, 3], nums2: [4, 5, 6], desc: "No overlap" },
        { nums1: [4, 5, 6], nums2: [1, 2, 3], desc: "Reverse order arrays" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: ${testCase.desc}`);
        console.log(`nums1: [${testCase.nums1}], nums2: [${testCase.nums2}]`);
        
        let result = mergeSortedArraysBetter(testCase.nums1, testCase.nums2);
        console.log(`Result: [${result}]`);
        
        let validation = validateMerge(testCase.nums1, testCase.nums2, result);
        console.log(`Valid: ${validation.valid}`);
    });
}

// Performance comparison
function performanceTest() {
    const largeArray1 = generateSortedArray(50000);
    const largeArray2 = generateSortedArray(50000);
    const iterations = 100;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with arrays of length: ${largeArray1.length} and ${largeArray2.length}`);
    
    console.time("Brute Force");
    for (let i = 0; i < iterations; i++) {
        mergeSortedArraysBruteForce(largeArray1, largeArray2);
    }
    console.timeEnd("Brute Force");
    
    console.time("Better (Two Pointers)");
    for (let i = 0; i < iterations; i++) {
        mergeSortedArraysBetter(largeArray1, largeArray2);
    }
    console.timeEnd("Better (Two Pointers)");
    
    console.time("Recursive");
    for (let i = 0; i < iterations; i++) {
        mergeSortedArraysRecursive(largeArray1, largeArray2);
    }
    console.timeEnd("Recursive");
}

// Test multiple arrays merge
function testMultipleArraysMerge() {
    console.log("\n=== Multiple Arrays Merge Test ===");
    
    const multipleArrays = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [0, 10, 11]
    ];
    
    console.log("Input arrays:");
    multipleArrays.forEach((arr, index) => {
        console.log(`Array ${index + 1}: [${arr}]`);
    });
    
    const result = mergeMultipleSortedArrays(multipleArrays);
    console.log(`Merged result: [${result}]`);
    console.log(`Is sorted: ${isSorted(result)}`);
}

// Run tests
testMergeSortedArrays();
testEdgeCases();
performanceTest();
testMultipleArraysMerge();

// Export functions for use in other files
module.exports = {
    mergeSortedArraysBruteForce,
    mergeSortedArraysBetter,
    mergeSortedArraysOptimized,
    mergeSortedArraysRecursive,
    mergeSortedArraysGenerator,
    mergeMultipleSortedArrays,
    mergeSortedArraysNoDuplicates,
    mergeSortedArraysIntersection,
    isSorted,
    copyArray,
    generateSortedArray,
    validateMerge
};
