/**
 * Binary Search
 * Bodhi-DSA Course
 * 
 * Problem: Find an element in a sorted array using binary search
 * Binary search uses divide and conquer to efficiently search sorted arrays
 */

// ============= BRUTE FORCE APPROACH (Linear Search on Sorted Array) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Even though array is sorted, we ignore this advantage
function binarySearchBruteForce(arr, target) {
    // Handle edge cases
    if (!arr || arr.length === 0) return -1;
    
    // Linear search (ignoring sorted property)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
        // Early termination if target is smaller than current element
        if (arr[i] > target) {
            return -1;
        }
    }
    
    return -1;
}

// ============= BETTER APPROACH (Iterative Binary Search) =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// Use iterative approach to implement binary search
function binarySearchIterative(arr, target) {
    // Handle edge cases
    if (!arr || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length - 1;
    let comparisons = 0;
    
    while (left <= right) {
        comparisons++;
        
        // Calculate middle index (avoid overflow)
        const mid = Math.floor(left + (right - left) / 2);
        
        // Found the target
        if (arr[mid] === target) {
            return { index: mid, comparisons: comparisons };
        }
        
        // Target is in the right half
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            // Target is in the left half
            right = mid - 1;
        }
    }
    
    return { index: -1, comparisons: comparisons };
}

// ============= OPTIMIZED APPROACH (Recursive Binary Search) =============
// Time Complexity: O(log n) | Space Complexity: O(log n) - due to recursion stack
// Use recursion to implement binary search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1, comparisons = 0) {
    // Base case: element not found
    if (left > right) {
        return { index: -1, comparisons: comparisons };
    }
    
    comparisons++;
    
    // Calculate middle index
    const mid = Math.floor(left + (right - left) / 2);
    
    // Found the target
    if (arr[mid] === target) {
        return { index: mid, comparisons: comparisons };
    }
    
    // Search in the appropriate half
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right, comparisons);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1, comparisons);
    }
}

// ============= ALTERNATIVE: TEMPLATE-BASED BINARY SEARCH =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// Use template to avoid infinite loops and handle edge cases
function binarySearchTemplate(arr, target) {
    if (!arr || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    // Check if element is found
    return (left < arr.length && arr[left] === target) ? left : -1;
}

// ============= VARIATIONS =============

// Find first occurrence of target
function binarySearchFirst(arr, target) {
    if (!arr || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching in left half
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find last occurrence of target
function binarySearchLast(arr, target) {
    if (!arr || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching in right half
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find insertion position (lower bound)
function binarySearchInsertPosition(arr, target) {
    if (!arr) return 0;
    
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Find range of target (first and last occurrence)
function binarySearchRange(arr, target) {
    const first = binarySearchFirst(arr, target);
    if (first === -1) return [-1, -1];
    
    const last = binarySearchLast(arr, target);
    return [first, last];
}

// Search in rotated sorted array
function binarySearchRotated(arr, target) {
    if (!arr || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Left half is sorted
        if (arr[left] <= arr[mid]) {
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Find peak element
function findPeakElement(arr) {
    if (!arr || arr.length === 0) return -1;
    if (arr.length === 1) return 0;
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

// Search in 2D matrix
function binarySearch2D(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    let left = 0;
    let right = rows * cols - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const row = Math.floor(mid / cols);
        const col = mid % cols;
        const midValue = matrix[row][col];
        
        if (midValue === target) {
            return { found: true, row: row, col: col };
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return { found: false, row: -1, col: -1 };
}

// ============= HELPER FUNCTIONS =============

// Function to visualize binary search process
function visualizeBinarySearch(arr, target) {
    console.log(`\nBinary Search for ${target} in [${arr.join(', ')}]`);
    
    let left = 0;
    let right = arr.length - 1;
    let step = 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const midValue = arr[mid];
        
        // Create visual representation
        const visual = arr.map((val, idx) => {
            if (idx === mid) return `[${val}]`;
            if (idx >= left && idx <= right) return val.toString();
            return '_';
        });
        
        console.log(`Step ${step}: ${visual.join(' ')}`);
        console.log(`         Left=${left}, Mid=${mid}, Right=${right}`);
        console.log(`         arr[${mid}] = ${midValue}`);
        
        if (midValue === target) {
            console.log(`🎯 Found ${target} at index ${mid}!`);
            return mid;
        } else if (midValue < target) {
            console.log(`         ${midValue} < ${target}, search right half`);
            left = mid + 1;
        } else {
            console.log(`         ${midValue} > ${target}, search left half`);
            right = mid - 1;
        }
        
        step++;
    }
    
    console.log(`❌ ${target} not found in array`);
    return -1;
}

// Function to compare search methods
function compareSearchMethods(arr, target) {
    console.log(`\n=== Comparing Search Methods ===`);
    console.log(`Array: [${arr.slice(0, 10).join(', ')}${arr.length > 10 ? '...' : ''}]`);
    console.log(`Target: ${target}`);
    
    // Linear search (brute force)
    console.time("Linear Search");
    const linearResult = binarySearchBruteForce(arr, target);
    console.timeEnd("Linear Search");
    console.log(`Linear Search: Index ${linearResult}`);
    
    // Binary search (iterative)
    console.time("Binary Search (Iterative)");
    const binaryIterResult = binarySearchIterative(arr, target);
    console.timeEnd("Binary Search (Iterative)");
    console.log(`Binary Search (Iterative): Index ${binaryIterResult.index}, Comparisons: ${binaryIterResult.comparisons}`);
    
    // Binary search (recursive)
    console.time("Binary Search (Recursive)");
    const binaryRecResult = binarySearchRecursive(arr, target);
    console.timeEnd("Binary Search (Recursive)");
    console.log(`Binary Search (Recursive): Index ${binaryRecResult.index}, Comparisons: ${binaryRecResult.comparisons}`);
    
    // Template-based
    console.time("Binary Search (Template)");
    const templateResult = binarySearchTemplate(arr, target);
    console.timeEnd("Binary Search (Template)");
    console.log(`Binary Search (Template): Index ${templateResult}`);
}

// Function to analyze search complexity
function analyzeSearchComplexity(arraySize, targetPosition) {
    const maxComparisons = Math.ceil(Math.log2(arraySize));
    const actualComparisons = targetPosition === -1 ? maxComparisons : 
                             Math.ceil(Math.log2(arraySize - targetPosition + 1));
    
    return {
        arraySize: arraySize,
        targetPosition: targetPosition,
        maxComparisons: maxComparisons,
        actualComparisons: actualComparisons,
        efficiency: ((maxComparisons - actualComparisons) / maxComparisons * 100).toFixed(2) + '%',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1) iterative, O(log n) recursive'
    };
}

// Function to validate sorted array
function validateSortedArray(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return true;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    
    return true;
}

// Function to generate test cases
function generateTestCases(size) {
    const arr = Array.from({ length: size }, (_, i) => i * 2); // Even numbers
    const testCases = [
        { target: arr[0], description: "First element" },
        { target: arr[Math.floor(size / 2)], description: "Middle element" },
        { target: arr[size - 1], description: "Last element" },
        { target: arr[Math.floor(size / 4)], description: "Quarter position" },
        { target: arr[Math.floor(3 * size / 4)], description: "Three-quarter position" },
        { target: -1, description: "Element smaller than all" },
        { target: arr[size - 1] + 2, description: "Element larger than all" },
        { target: arr[Math.floor(size / 2)] + 1, description: "Element not in array" }
    ];
    
    return { arr, testCases };
}

// ============= ADVANCED APPLICATIONS =============

// Find square root using binary search
function binarySearchSqrt(x, precision = 6) {
    if (x < 0) return NaN;
    if (x === 0 || x === 1) return x;
    
    let left = 0;
    let right = x;
    
    while (right - left > Math.pow(10, -precision)) {
        const mid = (left + right) / 2;
        const square = mid * mid;
        
        if (square === x) return mid;
        if (square < x) {
            left = mid;
        } else {
            right = mid;
        }
    }
    
    return (left + right) / 2;
}

// Find minimum in rotated sorted array
function findMinInRotatedArray(arr) {
    if (!arr || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] > arr[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return arr[left];
}

// Search for a range of values
function searchRange(arr, target) {
    const result = [-1, -1];
    
    // Find first occurrence
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result[0] = mid;
            right = mid - 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // If first occurrence not found, return [-1, -1]
    if (result[0] === -1) return result;
    
    // Find last occurrence
    left = 0;
    right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            result[1] = mid;
            left = mid + 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// ============= TEST CASES =============
function testBinarySearch() {
    const testCases = [
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 5, expected: 4 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 1, expected: 0 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 10, expected: 9 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 11, expected: -1 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 0, expected: -1 },
        { arr: [2, 4, 6, 8, 10], target: 6, expected: 2 },
        { arr: [1], target: 1, expected: 0 },
        { arr: [1], target: 2, expected: -1 },
        { arr: [], target: 1, expected: -1 },
        { arr: [1, 3, 3, 3, 5], target: 3, expected: 1 } // First occurrence
    ];
    
    console.log("=== Binary Search Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`Array: [${testCase.arr.join(', ')}]`);
        console.log(`Target: ${testCase.target}`);
        console.log(`Expected: ${testCase.expected}`);
        
        // Validate array is sorted
        const isSorted = validateSortedArray(testCase.arr);
        console.log(`Array is sorted: ${isSorted}`);
        
        if (!isSorted && testCase.arr.length > 0) {
            console.log("⚠️ Binary search requires sorted array!");
        }
        
        // Test different approaches
        const bruteForce = binarySearchBruteForce(testCase.arr, testCase.target);
        const iterative = binarySearchIterative(testCase.arr, testCase.target);
        const recursive = binarySearchRecursive(testCase.arr, testCase.target);
        const template = binarySearchTemplate(testCase.arr, testCase.target);
        
        console.log(`Brute Force: ${bruteForce}`);
        console.log(`Iterative: Index ${iterative.index}, Comparisons: ${iterative.comparisons}`);
        console.log(`Recursive: Index ${recursive.index}, Comparisons: ${recursive.comparisons}`);
        console.log(`Template: ${template}`);
        
        // Verify results
        const results = [bruteForce, iterative.index, recursive.index, template];
        const allCorrect = results.every(result => result === testCase.expected);
        console.log(`✓ All methods correct: ${allCorrect}`);
        
        // Show complexity analysis for valid cases
        if (testCase.arr.length > 0 && isSorted) {
            const analysis = analyzeSearchComplexity(testCase.arr.length, iterative.index);
            console.log(`Complexity Analysis:`, analysis);
        }
    });
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    // Test with duplicates
    const duplicates = [1, 2, 2, 2, 3, 4, 5];
    const target = 2;
    
    console.log(`\nArray with duplicates: [${duplicates.join(', ')}], Target: ${target}`);
    console.log(`First occurrence: ${binarySearchFirst(duplicates, target)}`);
    console.log(`Last occurrence: ${binarySearchLast(duplicates, target)}`);
    console.log(`Range: [${binarySearchRange(duplicates, target).join(', ')}]`);
    console.log(`Insert position: ${binarySearchInsertPosition(duplicates, 2.5)}`);
    
    // Test rotated array
    const rotated = [4, 5, 6, 7, 0, 1, 2];
    console.log(`\nRotated array: [${rotated.join(', ')}]`);
    console.log(`Search for 0: ${binarySearchRotated(rotated, 0)}`);
    console.log(`Search for 3: ${binarySearchRotated(rotated, 3)}`);
    console.log(`Minimum element: ${findMinInRotatedArray(rotated)}`);
    
    // Test peak finding
    const peak = [1, 2, 3, 1];
    console.log(`\nPeak array: [${peak.join(', ')}]`);
    console.log(`Peak element index: ${findPeakElement(peak)}`);
    
    // Test 2D search
    const matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16]];
    console.log(`\n2D Matrix search for 5:`);
    console.log(binarySearch2D(matrix, 5));
    
    // Test square root
    console.log(`\nSquare root of 25: ${binarySearchSqrt(25)}`);
    console.log(`Square root of 2: ${binarySearchSqrt(2, 4)}`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const sizes = [1000, 10000, 100000, 1000000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        
        const { arr, testCases } = generateTestCases(size);
        
        testCases.slice(0, 3).forEach(testCase => {
            console.log(`\nTarget: ${testCase.target} (${testCase.description})`);
            compareSearchMethods(arr, testCase.target);
        });
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. Binary Search Algorithm:");
    console.log("Binary search works by repeatedly dividing the search space in half");
    console.log("It compares the target with the middle element and eliminates half");
    console.log("This process continues until the element is found or space is exhausted");
    
    console.log("\n2. Prerequisites:");
    console.log("- Array must be sorted");
    console.log("- Random access to elements (arrays, not linked lists)");
    
    console.log("\n3. Time Complexity:");
    console.log("- Best Case: O(1) - element is at middle");
    console.log("- Average Case: O(log n)");
    console.log("- Worst Case: O(log n) - element not found or at extremes");
    
    console.log("\n4. Space Complexity:");
    console.log("- Iterative: O(1)");
    console.log("- Recursive: O(log n) - due to call stack");
    
    console.log("\n5. Advantages:");
    console.log("- Very efficient for large sorted arrays");
    console.log("- Logarithmic time complexity");
    console.log("- Predictable performance");
    
    console.log("\n6. Disadvantages:");
    console.log("- Requires sorted array");
    console.log("- Not suitable for small arrays (overhead)");
    console.log("- Insertion/deletion requires maintaining sorted order");
    
    console.log("\n7. Applications:");
    console.log("- Database indexing");
    console.log("- Finding elements in sorted collections");
    console.log("- Optimization problems");
    console.log("- Mathematical computations (square root, etc.)");
}

// Interactive learning function
function interactiveLearning(arr, target) {
    console.log(`\n=== Interactive Binary Search Learning ===`);
    
    // Validate input
    if (!validateSortedArray(arr)) {
        console.log("⚠️ Array must be sorted for binary search!");
        console.log("Sorting the array first...");
        arr = [...arr].sort((a, b) => a - b);
    }
    
    console.log(`Sorted Array: [${arr.join(', ')}]`);
    console.log(`Target: ${target}`);
    
    console.log("\n1. Step-by-step visualization:");
    const result = visualizeBinarySearch(arr, target);
    
    console.log("\n2. Complexity analysis:");
    const analysis = analyzeSearchComplexity(arr.length, result);
    console.log(`Array size: ${analysis.arraySize}`);
    console.log(`Maximum possible comparisons: ${analysis.maxComparisons}`);
    console.log(`Actual comparisons: ${analysis.actualComparisons}`);
    console.log(`Time complexity: ${analysis.timeComplexity}`);
    console.log(`Space complexity: ${analysis.spaceComplexity}`);
    
    console.log("\n3. Comparison with linear search:");
    const linearComparisons = result === -1 ? arr.length : result + 1;
    console.log(`Linear search would need: ${linearComparisons} comparisons`);
    console.log(`Binary search needed: ${analysis.actualComparisons} comparisons`);
    console.log(`Improvement: ${((linearComparisons - analysis.actualComparisons) / linearComparisons * 100).toFixed(1)}% fewer comparisons`);
    
    return result;
}

// Run tests
testBinarySearch();
testVariations();
performanceTest();
educationalDemo();

// Interactive examples
interactiveLearning([1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 11);
interactiveLearning([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 15);

// Export functions for use in other files
module.exports = {
    binarySearchBruteForce,
    binarySearchIterative,
    binarySearchRecursive,
    binarySearchTemplate,
    binarySearchFirst,
    binarySearchLast,
    binarySearchInsertPosition,
    binarySearchRange,
    binarySearchRotated,
    findPeakElement,
    binarySearch2D,
    binarySearchSqrt,
    findMinInRotatedArray,
    searchRange,
    visualizeBinarySearch,
    compareSearchMethods,
    analyzeSearchComplexity,
    validateSortedArray,
    generateTestCases,
    interactiveLearning
};
