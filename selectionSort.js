/**
 * Selection Sort
 * Bodhi-DSA Course
 * 
 * Problem: Sort an array using the selection sort algorithm
 * Selection sort finds the minimum element and places it at the beginning,
 * then finds the next minimum and places it in the second position, and so on
 */

// ============= BRUTE FORCE APPROACH (Basic Selection Sort) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Basic implementation without optimizations
function selectionSortBruteForce(arr) {
    // Handle edge cases
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Create a copy to avoid modifying original array
    const result = [...arr];
    const n = result.length;
    
    // Outer loop for each position
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Inner loop to find minimum element
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum element with current position
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}

// ============= BETTER APPROACH (Optimized Selection Sort) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Skip swap if element is already in correct position
function selectionSortBetter(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        // Only swap if minimum is not already at correct position
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}

// ============= OPTIMIZED APPROACH (Bidirectional Selection Sort) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Find both minimum and maximum in each pass
function selectionSortOptimized(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    let left = 0;
    let right = result.length - 1;
    
    while (left < right) {
        let minIndex = left;
        let maxIndex = left;
        
        // Find both minimum and maximum in current range
        for (let i = left; i <= right; i++) {
            if (result[i] < result[minIndex]) {
                minIndex = i;
            }
            if (result[i] > result[maxIndex]) {
                maxIndex = i;
            }
        }
        
        // Place minimum at left position
        if (minIndex !== left) {
            [result[left], result[minIndex]] = [result[minIndex], result[left]];
        }
        
        // If maximum was at left position, it's now at minIndex
        if (maxIndex === left) {
            maxIndex = minIndex;
        }
        
        // Place maximum at right position
        if (maxIndex !== right) {
            [result[right], result[maxIndex]] = [result[maxIndex], result[right]];
        }
        
        left++;
        right--;
    }
    
    return result;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(n) - due to recursion stack
// Implement selection sort using recursion
function selectionSortRecursive(arr, startIndex = 0) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Base case: if we've processed all elements
    if (startIndex >= arr.length - 1) return arr;
    
    const result = [...arr];
    let minIndex = startIndex;
    
    // Find minimum element in remaining array
    for (let i = startIndex + 1; i < result.length; i++) {
        if (result[i] < result[minIndex]) {
            minIndex = i;
        }
    }
    
    // Swap minimum with current position
    if (minIndex !== startIndex) {
        [result[startIndex], result[minIndex]] = [result[minIndex], result[startIndex]];
    }
    
    // Recursively sort the rest
    return selectionSortRecursive(result, startIndex + 1);
}

// ============= VARIATIONS =============

// Selection sort with custom comparator
function selectionSortCustom(arr, compareFunc = (a, b) => a < b) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let selectedIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compareFunc(result[j], result[selectedIndex])) {
                selectedIndex = j;
            }
        }
        
        if (selectedIndex !== i) {
            [result[i], result[selectedIndex]] = [result[selectedIndex], result[i]];
        }
    }
    
    return result;
}

// Selection sort for maximum element (descending order)
function selectionSortDescending(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let maxIndex = i;
        
        // Find maximum element in remaining array
        for (let j = i + 1; j < n; j++) {
            if (result[j] > result[maxIndex]) {
                maxIndex = j;
            }
        }
        
        if (maxIndex !== i) {
            [result[i], result[maxIndex]] = [result[maxIndex], result[i]];
        }
    }
    
    return result;
}

// Stable selection sort (maintains relative order of equal elements)
function selectionSortStable(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find minimum element
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        // Instead of swapping, shift elements to maintain stability
        if (minIndex !== i) {
            const minValue = result[minIndex];
            
            // Shift elements to the right
            for (let k = minIndex; k > i; k--) {
                result[k] = result[k - 1];
            }
            
            result[i] = minValue;
        }
    }
    
    return result;
}

// ============= HELPER FUNCTIONS =============

// Function to visualize selection sort process
function visualizeSelectionSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    console.log(`\nSelection Sort Visualization for [${arr.join(', ')}]`);
    console.log("=" .repeat(50));
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        console.log(`\nPass ${i + 1}: Finding minimum in unsorted portion`);
        
        let minIndex = i;
        let minValue = result[i];
        
        // Show the current state
        const visual = result.map((val, idx) => {
            if (idx < i) return `(${val})`; // Sorted portion
            if (idx === i) return `[${val}]`; // Current position
            return val.toString(); // Unsorted portion
        });
        
        console.log(`  Current: ${visual.join(' ')}`);
        console.log(`  Sorted: (${result.slice(0, i).join(', ')}) | Unsorted: [${result.slice(i).join(', ')}]`);
        
        // Find minimum
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
                minValue = result[j];
            }
        }
        
        console.log(`  Minimum found: ${minValue} at index ${minIndex}`);
        
        // Swap if needed
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
            console.log(`  Swap: ${minValue} ↔ ${result[minIndex]}`);
        } else {
            console.log(`  No swap needed (minimum already at position ${i})`);
        }
        
        console.log(`  After Pass ${i + 1}: [${result.join(', ')}]`);
    }
    
    console.log(`\n✅ Final sorted array: [${result.join(', ')}]`);
    return result;
}

// Function to count operations
function selectionSortWithStats(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return { sorted: arr, comparisons: 0, swaps: 0, passes: 0 };
    }
    
    const result = [...arr];
    const n = result.length;
    let comparisons = 0;
    let swaps = 0;
    let passes = 0;
    
    for (let i = 0; i < n - 1; i++) {
        passes++;
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
            swaps++;
        }
    }
    
    return {
        sorted: result,
        comparisons: comparisons,
        swaps: swaps,
        passes: passes,
        maxPossibleComparisons: n * (n - 1) / 2,
        maxPossibleSwaps: n - 1,
        efficiency: (comparisons / (n * (n - 1) / 2) * 100).toFixed(2) + '%'
    };
}

// Function to compare different selection sort variants
function compareSelectionSortVariants(arr) {
    console.log(`\n=== Comparing Selection Sort Variants ===`);
    console.log(`Array: [${arr.join(', ')}]`);
    
    const variants = [
        { name: 'Brute Force', func: selectionSortBruteForce },
        { name: 'Better (Skip unnecessary swaps)', func: selectionSortBetter },
        { name: 'Optimized (Bidirectional)', func: selectionSortOptimized },
        { name: 'Recursive', func: selectionSortRecursive },
        { name: 'Stable', func: selectionSortStable },
        { name: 'Descending', func: selectionSortDescending }
    ];
    
    variants.forEach(variant => {
        console.time(variant.name);
        const result = variant.func(arr);
        console.timeEnd(variant.name);
        console.log(`${variant.name}: [${result.join(', ')}]`);
    });
    
    // Show detailed stats
    const stats = selectionSortWithStats(arr);
    console.log(`\nDetailed Statistics:`, stats);
}

// Function to analyze selection sort complexity
function analyzeSelectionSortComplexity(arraySize) {
    const comparisons = arraySize * (arraySize - 1) / 2;
    const maxSwaps = arraySize - 1;
    
    return {
        arraySize: arraySize,
        timeComplexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        comparisons: comparisons,
        maxSwaps: maxSwaps,
        passes: arraySize - 1,
        stable: false,
        inPlace: true,
        adaptive: false,
        characteristics: [
            'Always makes exactly n-1 swaps',
            'Number of comparisons is always n(n-1)/2',
            'Performance is independent of input order',
            'Minimizes number of swaps compared to other O(n²) algorithms'
        ]
    };
}

// Function to find kth smallest element using selection sort concept
function findKthSmallest(arr, k) {
    if (!Array.isArray(arr) || k < 1 || k > arr.length) return null;
    
    const result = [...arr];
    
    // Only need to do k-1 passes to find kth smallest
    for (let i = 0; i < k; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < result.length; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result[k - 1];
}

// ============= ADVANCED APPLICATIONS =============

// Sort objects by property
function selectionSortObjects(arr, property) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (result[j][property] < result[minIndex][property]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}

// Sort strings with custom criteria
function selectionSortStrings(arr, criteria = 'alphabetical') {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    const compareFunc = {
        alphabetical: (a, b) => a.toLowerCase() < b.toLowerCase(),
        length: (a, b) => a.length < b.length,
        reverse: (a, b) => a.toLowerCase() > b.toLowerCase()
    };
    
    const compare = compareFunc[criteria] || compareFunc.alphabetical;
    
    for (let i = 0; i < n - 1; i++) {
        let selectedIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compare(result[j], result[selectedIndex])) {
                selectedIndex = j;
            }
        }
        
        if (selectedIndex !== i) {
            [result[i], result[selectedIndex]] = [result[selectedIndex], result[i]];
        }
    }
    
    return result;
}

// Selection sort with step-by-step callback
function selectionSortWithCallback(arr, callback) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Call callback at start of each pass
        if (callback) {
            callback({
                type: 'pass_start',
                array: [...result],
                pass: i + 1,
                sortedPortion: result.slice(0, i),
                unsortedPortion: result.slice(i)
            });
        }
        
        for (let j = i + 1; j < n; j++) {
            // Call callback for each comparison
            if (callback) {
                callback({
                    type: 'compare',
                    array: [...result],
                    comparing: [minIndex, j],
                    currentMin: minIndex,
                    pass: i + 1
                });
            }
            
            if (result[j] < result[minIndex]) {
                minIndex = j;
                
                // Call callback when new minimum is found
                if (callback) {
                    callback({
                        type: 'new_min',
                        array: [...result],
                        newMinIndex: minIndex,
                        newMinValue: result[minIndex],
                        pass: i + 1
                    });
                }
            }
        }
        
        // Swap if needed
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
            
            // Call callback after swap
            if (callback) {
                callback({
                    type: 'swap',
                    array: [...result],
                    swapped: [i, minIndex],
                    pass: i + 1
                });
            }
        }
        
        // Call callback at end of each pass
        if (callback) {
            callback({
                type: 'pass_complete',
                array: [...result],
                pass: i + 1,
                elementPlaced: result[i],
                position: i
            });
        }
    }
    
    return result;
}

// ============= TEST CASES =============
function testSelectionSort() {
    console.log("=== Selection Sort Tests ===");
    
    const testCases = [
        { name: 'Random', arr: [64, 25, 12, 22, 11] },
        { name: 'Sorted', arr: [1, 2, 3, 4, 5] },
        { name: 'Reverse sorted', arr: [5, 4, 3, 2, 1] },
        { name: 'Duplicates', arr: [3, 1, 4, 1, 5, 9, 2, 6, 5] },
        { name: 'Single element', arr: [42] },
        { name: 'Empty', arr: [] },
        { name: 'Two elements', arr: [2, 1] },
        { name: 'All same', arr: [7, 7, 7, 7] },
        { name: 'Negative numbers', arr: [-3, -1, -4, -1, -5] },
        { name: 'Mixed', arr: [0, -2, 3, -1, 2] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\nTest Case: ${testCase.name}`);
        console.log(`Input: [${testCase.arr.join(', ')}]`);
        
        // Test all approaches
        const results = {
            bruteForce: selectionSortBruteForce(testCase.arr),
            better: selectionSortBetter(testCase.arr),
            optimized: selectionSortOptimized(testCase.arr),
            recursive: selectionSortRecursive(testCase.arr)
        };
        
        console.log(`Results:`);
        Object.entries(results).forEach(([method, result]) => {
            console.log(`  ${method}: [${result.join(', ')}]`);
        });
        
        // Verify all methods give same result
        const allSame = Object.values(results).every(result => 
            JSON.stringify(result) === JSON.stringify(results.bruteForce)
        );
        console.log(`✓ All methods consistent: ${allSame}`);
        
        // Show statistics for interesting cases
        if (testCase.arr.length > 1 && testCase.arr.length <= 10) {
            const stats = selectionSortWithStats(testCase.arr);
            console.log(`Statistics:`, stats);
        }
    });
}

// Test applications
function testApplications() {
    console.log("\n=== Applications Tests ===");
    
    // Test object sorting
    const products = [
        { name: 'Laptop', price: 999 },
        { name: 'Phone', price: 599 },
        { name: 'Tablet', price: 399 },
        { name: 'Watch', price: 299 }
    ];
    
    console.log("\nSorting products by price:");
    console.log("Before:", products);
    console.log("After:", selectionSortObjects(products, 'price'));
    
    // Test string sorting
    const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    console.log("\nSorting cities alphabetically:");
    console.log("Before:", cities);
    console.log("After:", selectionSortStrings(cities, 'alphabetical'));
    
    console.log("\nSorting cities by length:");
    console.log("After:", selectionSortStrings(cities, 'length'));
    
    // Test kth smallest
    const numbers = [7, 10, 4, 3, 20, 15];
    console.log(`\nFinding 3rd smallest in [${numbers.join(', ')}]:`);
    console.log(`3rd smallest: ${findKthSmallest(numbers, 3)}`);
    
    // Test custom comparator
    const scores = [85, 92, 78, 96, 88];
    console.log("\nSorting scores in descending order:");
    console.log("Before:", scores);
    console.log("After:", selectionSortCustom(scores, (a, b) => a > b));
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const sizes = [100, 500, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        
        // Generate random array
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        compareSelectionSortVariants(arr.slice(0, 10)); // Show only first 10 elements
        
        // Show complexity analysis
        const analysis = analyzeSelectionSortComplexity(size);
        console.log(`Complexity Analysis:`, analysis);
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. How Selection Sort Works:");
    console.log("Selection sort divides the array into sorted and unsorted portions");
    console.log("It repeatedly finds the minimum element from unsorted portion");
    console.log("And places it at the beginning of the unsorted portion");
    
    console.log("\n2. Algorithm Steps:");
    console.log("1. Find the minimum element in the array");
    console.log("2. Swap it with the first element");
    console.log("3. Find the minimum in the remaining array");
    console.log("4. Swap it with the second element");
    console.log("5. Repeat until the array is sorted");
    
    console.log("\n3. Characteristics:");
    console.log("- Unstable: May change relative order of equal elements");
    console.log("- In-place: Sorts within the original array");
    console.log("- Not adaptive: Performance doesn't improve on sorted arrays");
    console.log("- Minimizes swaps: Makes at most n-1 swaps");
    
    console.log("\n4. Advantages:");
    console.log("- Simple to understand and implement");
    console.log("- Performs well on small datasets");
    console.log("- Minimizes the number of swaps");
    console.log("- Memory efficient (in-place sorting)");
    
    console.log("\n5. Disadvantages:");
    console.log("- O(n²) time complexity in all cases");
    console.log("- Not suitable for large datasets");
    console.log("- Not stable (can change order of equal elements)");
    console.log("- Not adaptive (doesn't benefit from partial sorting)");
    
    console.log("\n6. When to use Selection Sort:");
    console.log("- Small datasets (< 50 elements)");
    console.log("- When memory is limited (in-place sorting)");
    console.log("- When minimizing swaps is important");
    console.log("- Educational purposes");
}

// Interactive learning function
function interactiveLearning(arr) {
    console.log(`\n=== Interactive Selection Sort Learning ===`);
    console.log(`Array to sort: [${arr.join(', ')}]`);
    
    console.log("\n1. Step-by-step visualization:");
    const result = visualizeSelectionSort(arr);
    
    console.log("\n2. Detailed statistics:");
    const stats = selectionSortWithStats(arr);
    console.log(`Comparisons: ${stats.comparisons} (max possible: ${stats.maxPossibleComparisons})`);
    console.log(`Swaps: ${stats.swaps} (max possible: ${stats.maxPossibleSwaps})`);
    console.log(`Passes: ${stats.passes}`);
    console.log(`Efficiency: ${stats.efficiency}`);
    
    console.log("\n3. Complexity analysis:");
    const analysis = analyzeSelectionSortComplexity(arr.length);
    console.log(`Time complexity: ${analysis.timeComplexity.best} (all cases)`);
    console.log(`Space complexity: ${analysis.spaceComplexity}`);
    console.log(`Stable: ${analysis.stable}, In-place: ${analysis.inPlace}, Adaptive: ${analysis.adaptive}`);
    
    console.log("\n4. Key insights:");
    console.log("- Selection sort always makes exactly n-1 swaps");
    console.log("- Number of comparisons is always n(n-1)/2");
    console.log("- Performance is independent of input order");
    console.log("- Good when swapping is expensive operation");
    
    return result;
}

// Run tests
testSelectionSort();
testApplications();
performanceTest();
educationalDemo();

// Interactive examples
interactiveLearning([64, 25, 12, 22, 11]);
interactiveLearning([5, 2, 8, 1, 9]);

// Export functions for use in other files
module.exports = {
    selectionSortBruteForce,
    selectionSortBetter,
    selectionSortOptimized,
    selectionSortRecursive,
    selectionSortCustom,
    selectionSortDescending,
    selectionSortStable,
    selectionSortObjects,
    selectionSortStrings,
    selectionSortWithCallback,
    visualizeSelectionSort,
    selectionSortWithStats,
    compareSelectionSortVariants,
    analyzeSelectionSortComplexity,
    findKthSmallest,
    interactiveLearning
};
