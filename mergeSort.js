/**
 * Merge Sort
 * Bodhi-DSA Course
 * 
 * Problem: Learn how Merge Sort works using recursion and divide & conquer
 * Merge sort divides the array into halves, sorts them, and merges back
 */

// ============= BRUTE FORCE APPROACH (Simple Merge Sort) =============
// Time Complexity: O(n log n) | Space Complexity: O(n)
function mergeSortBruteForce(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Base case
    if (arr.length <= 1) return arr;
    
    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    // Conquer
    const sortedLeft = mergeSortBruteForce(left);
    const sortedRight = mergeSortBruteForce(right);
    
    // Merge
    return merge(sortedLeft, sortedRight);
}

// Helper function to merge two sorted arrays
function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    
    // Add remaining elements
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    
    return result;
}

// ============= BETTER APPROACH (Optimized Merge Sort) =============
// Time Complexity: O(n log n) | Space Complexity: O(n)
function mergeSortBetter(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    function mergeSort(arr, left, right) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        mergeInPlace(arr, left, mid, right);
    }
    
    function mergeInPlace(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    const result = [...arr];
    mergeSort(result, 0, result.length - 1);
    return result;
}

// ============= OPTIMIZED APPROACH (Bottom-up Merge Sort) =============
// Time Complexity: O(n log n) | Space Complexity: O(n)
function mergeSortOptimized(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    // Bottom-up approach
    for (let size = 1; size < n; size *= 2) {
        for (let left = 0; left < n - size; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            
            mergeInPlace(result, left, mid, right);
        }
    }
    
    function mergeInPlace(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
    
    return result;
}

// ============= VARIATIONS =============

// Merge sort with custom comparator
function mergeSortCustom(arr, compareFunc = (a, b) => a <= b) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortCustom(arr.slice(0, mid), compareFunc);
    const right = mergeSortCustom(arr.slice(mid), compareFunc);
    
    return mergeWithComparator(left, right, compareFunc);
}

function mergeWithComparator(left, right, compareFunc) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (compareFunc(left[i], right[j])) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// ============= HELPER FUNCTIONS =============

// Visualize merge sort process
function visualizeMergeSort(arr) {
    console.log(`\nMerge Sort Visualization for [${arr.join(', ')}]`);
    console.log("=" .repeat(50));
    
    let depth = 0;
    
    function mergeSortVisualize(arr, level = 0) {
        const indent = "  ".repeat(level);
        console.log(`${indent}Divide: [${arr.join(', ')}]`);
        
        if (arr.length <= 1) {
            console.log(`${indent}Base case: [${arr.join(', ')}]`);
            return arr;
        }
        
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        
        console.log(`${indent}Split into: [${left.join(', ')}] and [${right.join(', ')}]`);
        
        const sortedLeft = mergeSortVisualize(left, level + 1);
        const sortedRight = mergeSortVisualize(right, level + 1);
        
        const merged = merge(sortedLeft, sortedRight);
        console.log(`${indent}Merge: [${sortedLeft.join(', ')}] + [${sortedRight.join(', ')}] = [${merged.join(', ')}]`);
        
        return merged;
    }
    
    const result = mergeSortVisualize(arr);
    console.log(`\n✅ Final sorted array: [${result.join(', ')}]`);
    return result;
}

// Count operations
function mergeSortWithStats(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return { sorted: arr, comparisons: 0, merges: 0, recursionDepth: 0 };
    }
    
    let comparisons = 0;
    let merges = 0;
    let maxDepth = 0;
    
    function mergeSortCount(arr, depth = 0) {
        maxDepth = Math.max(maxDepth, depth);
        
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = mergeSortCount(arr.slice(0, mid), depth + 1);
        const right = mergeSortCount(arr.slice(mid), depth + 1);
        
        return mergeCount(left, right);
    }
    
    function mergeCount(left, right) {
        merges++;
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            comparisons++;
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
    
    const sorted = mergeSortCount(arr);
    
    return {
        sorted: sorted,
        comparisons: comparisons,
        merges: merges,
        recursionDepth: maxDepth,
        theoreticalComparisons: Math.ceil(arr.length * Math.log2(arr.length))
    };
}

// ============= TEST CASES =============
function testMergeSort() {
    console.log("=== Merge Sort Tests ===");
    
    const testCases = [
        { name: 'Random', arr: [38, 27, 43, 3, 9, 82, 10] },
        { name: 'Sorted', arr: [1, 2, 3, 4, 5] },
        { name: 'Reverse', arr: [5, 4, 3, 2, 1] },
        { name: 'Duplicates', arr: [3, 1, 4, 1, 5, 9, 2, 6, 5] },
        { name: 'Single', arr: [42] },
        { name: 'Empty', arr: [] },
        { name: 'Two elements', arr: [2, 1] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\nTest Case: ${testCase.name}`);
        console.log(`Input: [${testCase.arr.join(', ')}]`);
        
        const results = {
            bruteForce: mergeSortBruteForce(testCase.arr),
            better: mergeSortBetter(testCase.arr),
            optimized: mergeSortOptimized(testCase.arr)
        };
        
        Object.entries(results).forEach(([method, result]) => {
            console.log(`${method}: [${result.join(', ')}]`);
        });
        
        if (testCase.arr.length > 1 && testCase.arr.length <= 10) {
            const stats = mergeSortWithStats(testCase.arr);
            console.log(`Statistics:`, stats);
        }
    });
}

// Interactive learning
function interactiveLearning(arr) {
    console.log(`\n=== Interactive Merge Sort Learning ===`);
    console.log(`Array to sort: [${arr.join(', ')}]`);
    
    console.log("\n1. Step-by-step visualization:");
    const result = visualizeMergeSort(arr);
    
    console.log("\n2. Algorithm analysis:");
    console.log("- Divide: Split array into two halves");
    console.log("- Conquer: Recursively sort both halves");
    console.log("- Combine: Merge the sorted halves");
    
    console.log("\n3. Complexity:");
    console.log("- Time: O(n log n) in all cases");
    console.log("- Space: O(n) for temporary arrays");
    console.log("- Stable: Yes");
    console.log("- In-place: No");
    
    return result;
}

// Run tests
testMergeSort();
interactiveLearning([38, 27, 43, 3, 9, 82, 10]);

// Export functions
module.exports = {
    mergeSortBruteForce,
    mergeSortBetter,
    mergeSortOptimized,
    mergeSortCustom,
    merge,
    visualizeMergeSort,
    mergeSortWithStats,
    interactiveLearning
};
