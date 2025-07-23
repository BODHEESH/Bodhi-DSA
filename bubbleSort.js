/**
 * Bubble Sort
 * Bodhi-DSA Course
 * 
 * Problem: Sort an array using the bubble sort algorithm
 * Bubble sort repeatedly steps through the list, compares adjacent elements
 * and swaps them if they are in the wrong order
 */

// ============= BRUTE FORCE APPROACH (Basic Bubble Sort) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Basic implementation without optimizations
function bubbleSortBruteForce(arr) {
    // Handle edge cases
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Create a copy to avoid modifying original array
    const result = [...arr];
    const n = result.length;
    
    // Outer loop for number of passes
    for (let i = 0; i < n - 1; i++) {
        // Inner loop for comparisons in each pass
        for (let j = 0; j < n - 1; j++) {
            // Compare adjacent elements
            if (result[j] > result[j + 1]) {
                // Swap if they are in wrong order
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    
    return result;
}

// ============= BETTER APPROACH (Optimized Bubble Sort) =============
// Time Complexity: O(n²) worst case, O(n) best case | Space Complexity: O(1)
// Optimize by reducing comparisons in each pass
function bubbleSortBetter(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    // Outer loop for number of passes
    for (let i = 0; i < n - 1; i++) {
        // After each pass, the largest element is at the end
        // So we can reduce the number of comparisons
        for (let j = 0; j < n - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    
    return result;
}

// ============= OPTIMIZED APPROACH (Early Termination) =============
// Time Complexity: O(n²) worst case, O(n) best case | Space Complexity: O(1)
// Stop early if array becomes sorted before all passes
function bubbleSortOptimized(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false; // Flag to track if any swap occurred
        
        for (let j = 0; j < n - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
    
    return result;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(n) - due to recursion stack
// Implement bubble sort using recursion
function bubbleSortRecursive(arr, n = arr.length) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Base case: if only one element, return
    if (n === 1) return arr;
    
    const result = [...arr];
    
    // One pass of bubble sort
    for (let i = 0; i < n - 1; i++) {
        if (result[i] > result[i + 1]) {
            [result[i], result[i + 1]] = [result[i + 1], result[i]];
        }
    }
    
    // Recursively sort the first n-1 elements
    return bubbleSortRecursive(result, n - 1);
}

// ============= VARIATIONS =============

// Bubble sort with custom comparator
function bubbleSortCustom(arr, compareFunc = (a, b) => a > b) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            if (compareFunc(result[j], result[j + 1])) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return result;
}

// Cocktail shaker sort (bidirectional bubble sort)
function cocktailShakerSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    let left = 0;
    let right = result.length - 1;
    let swapped = true;
    
    while (swapped && left < right) {
        swapped = false;
        
        // Forward pass (left to right)
        for (let i = left; i < right; i++) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                swapped = true;
            }
        }
        right--;
        
        if (!swapped) break;
        
        // Backward pass (right to left)
        for (let i = right; i > left; i--) {
            if (result[i] < result[i - 1]) {
                [result[i], result[i - 1]] = [result[i - 1], result[i]];
                swapped = true;
            }
        }
        left++;
    }
    
    return result;
}

// Odd-even sort (parallel bubble sort)
function oddEvenSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    let sorted = false;
    
    while (!sorted) {
        sorted = true;
        
        // Odd phase
        for (let i = 1; i < n - 1; i += 2) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                sorted = false;
            }
        }
        
        // Even phase
        for (let i = 0; i < n - 1; i += 2) {
            if (result[i] > result[i + 1]) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
                sorted = false;
            }
        }
    }
    
    return result;
}

// ============= HELPER FUNCTIONS =============

// Function to visualize bubble sort process
function visualizeBubbleSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    console.log(`\nBubble Sort Visualization for [${arr.join(', ')}]`);
    console.log("=" .repeat(50));
    
    const result = [...arr];
    const n = result.length;
    let pass = 1;
    
    for (let i = 0; i < n - 1; i++) {
        console.log(`\nPass ${pass}:`);
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            // Show current comparison
            const visual = result.map((val, idx) => {
                if (idx === j) return `[${val}]`;
                if (idx === j + 1) return `[${val}]`;
                return val.toString();
            });
            
            console.log(`  Compare: ${visual.join(' ')}`);
            
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                console.log(`  Swap: ${result[j + 1]} and ${result[j]}`);
                swapped = true;
            } else {
                console.log(`  No swap needed`);
            }
            
            console.log(`  Result: [${result.join(', ')}]`);
        }
        
        console.log(`  After Pass ${pass}: [${result.join(', ')}]`);
        console.log(`  Largest element (${result[n - 1 - i]}) is now in position ${n - 1 - i}`);
        
        if (!swapped) {
            console.log(`  🎯 Array is sorted! Early termination after ${pass} passes.`);
            break;
        }
        
        pass++;
    }
    
    console.log(`\n✅ Final sorted array: [${result.join(', ')}]`);
    return result;
}

// Function to count operations
function bubbleSortWithStats(arr) {
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
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            comparisons++;
            
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swaps++;
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return {
        sorted: result,
        comparisons: comparisons,
        swaps: swaps,
        passes: passes,
        efficiency: ((n * (n - 1) / 2 - comparisons) / (n * (n - 1) / 2) * 100).toFixed(2) + '%'
    };
}

// Function to compare different bubble sort variants
function compareBubbleSortVariants(arr) {
    console.log(`\n=== Comparing Bubble Sort Variants ===`);
    console.log(`Array: [${arr.join(', ')}]`);
    
    const variants = [
        { name: 'Brute Force', func: bubbleSortBruteForce },
        { name: 'Better (Optimized passes)', func: bubbleSortBetter },
        { name: 'Optimized (Early termination)', func: bubbleSortOptimized },
        { name: 'Recursive', func: bubbleSortRecursive },
        { name: 'Cocktail Shaker', func: cocktailShakerSort },
        { name: 'Odd-Even Sort', func: oddEvenSort }
    ];
    
    variants.forEach(variant => {
        console.time(variant.name);
        const result = variant.func(arr);
        console.timeEnd(variant.name);
        console.log(`${variant.name}: [${result.join(', ')}]`);
    });
    
    // Show detailed stats for optimized version
    const stats = bubbleSortWithStats(arr);
    console.log(`\nDetailed Statistics (Optimized):`, stats);
}

// Function to analyze bubble sort complexity
function analyzeBubbleSortComplexity(arraySize) {
    const worstCaseComparisons = arraySize * (arraySize - 1) / 2;
    const worstCaseSwaps = arraySize * (arraySize - 1) / 2;
    const bestCaseComparisons = arraySize - 1;
    const bestCaseSwaps = 0;
    
    return {
        arraySize: arraySize,
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        worstCase: {
            comparisons: worstCaseComparisons,
            swaps: worstCaseSwaps,
            passes: arraySize - 1
        },
        bestCase: {
            comparisons: bestCaseComparisons,
            swaps: bestCaseSwaps,
            passes: 1
        },
        stable: true,
        inPlace: true,
        adaptive: true
    };
}

// Function to generate test arrays
function generateTestArrays() {
    return {
        sorted: [1, 2, 3, 4, 5],
        reverse: [5, 4, 3, 2, 1],
        random: [3, 1, 4, 1, 5, 9, 2, 6],
        duplicates: [3, 1, 4, 1, 5, 1, 2, 6],
        single: [42],
        empty: [],
        twoElements: [2, 1],
        allSame: [5, 5, 5, 5, 5]
    };
}

// ============= ADVANCED APPLICATIONS =============

// Sort objects by property
function bubbleSortObjects(arr, property) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            if (result[j][property] > result[j + 1][property]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return result;
}

// Sort strings (case-insensitive)
function bubbleSortStrings(arr, caseSensitive = false) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            const str1 = caseSensitive ? result[j] : result[j].toLowerCase();
            const str2 = caseSensitive ? result[j + 1] : result[j + 1].toLowerCase();
            
            if (str1 > str2) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return result;
}

// Bubble sort with step-by-step callback
function bubbleSortWithCallback(arr, callback) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            // Call callback before comparison
            if (callback) {
                callback({
                    type: 'compare',
                    array: [...result],
                    indices: [j, j + 1],
                    pass: i + 1,
                    step: j + 1
                });
            }
            
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
                
                // Call callback after swap
                if (callback) {
                    callback({
                        type: 'swap',
                        array: [...result],
                        indices: [j, j + 1],
                        pass: i + 1,
                        step: j + 1
                    });
                }
            }
        }
        
        // Call callback after each pass
        if (callback) {
            callback({
                type: 'pass_complete',
                array: [...result],
                pass: i + 1,
                swapped: swapped
            });
        }
        
        if (!swapped) break;
    }
    
    return result;
}

// ============= TEST CASES =============
function testBubbleSort() {
    console.log("=== Bubble Sort Tests ===");
    
    const testArrays = generateTestArrays();
    
    Object.entries(testArrays).forEach(([name, arr]) => {
        console.log(`\nTest Case: ${name}`);
        console.log(`Input: [${arr.join(', ')}]`);
        
        // Test all approaches
        const results = {
            bruteForce: bubbleSortBruteForce(arr),
            better: bubbleSortBetter(arr),
            optimized: bubbleSortOptimized(arr),
            recursive: bubbleSortRecursive(arr)
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
        if (arr.length > 1 && arr.length <= 8) {
            const stats = bubbleSortWithStats(arr);
            console.log(`Statistics:`, stats);
        }
    });
}

// Test variations and applications
function testApplications() {
    console.log("\n=== Applications Tests ===");
    
    // Test object sorting
    const students = [
        { name: 'Alice', grade: 85 },
        { name: 'Bob', grade: 92 },
        { name: 'Charlie', grade: 78 },
        { name: 'Diana', grade: 96 }
    ];
    
    console.log("\nSorting students by grade:");
    console.log("Before:", students);
    console.log("After:", bubbleSortObjects(students, 'grade'));
    
    // Test string sorting
    const words = ['banana', 'Apple', 'cherry', 'Date'];
    console.log("\nSorting strings (case-insensitive):");
    console.log("Before:", words);
    console.log("After:", bubbleSortStrings(words));
    
    // Test custom comparator
    const numbers = [1, 2, 3, 4, 5];
    console.log("\nSorting in descending order:");
    console.log("Before:", numbers);
    console.log("After:", bubbleSortCustom(numbers, (a, b) => a < b));
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const sizes = [100, 500, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        
        // Generate random array
        const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
        
        compareBubbleSortVariants(arr.slice(0, 10)); // Show only first 10 elements
        
        // Show complexity analysis
        const analysis = analyzeBubbleSortComplexity(size);
        console.log(`Complexity Analysis:`, analysis);
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. How Bubble Sort Works:");
    console.log("Bubble sort compares adjacent elements and swaps them if needed");
    console.log("After each pass, the largest element 'bubbles up' to its correct position");
    console.log("The process repeats until no more swaps are needed");
    
    console.log("\n2. Algorithm Steps:");
    console.log("1. Compare adjacent elements");
    console.log("2. Swap if they are in wrong order");
    console.log("3. Continue through the array");
    console.log("4. Repeat until no swaps occur");
    
    console.log("\n3. Characteristics:");
    console.log("- Stable: Equal elements maintain relative order");
    console.log("- In-place: Sorts within the original array");
    console.log("- Adaptive: Performs better on partially sorted arrays");
    console.log("- Simple: Easy to understand and implement");
    
    console.log("\n4. When to use Bubble Sort:");
    console.log("- Educational purposes (learning sorting concepts)");
    console.log("- Very small datasets (< 50 elements)");
    console.log("- When simplicity is more important than efficiency");
    console.log("- Nearly sorted arrays (adaptive behavior)");
    
    console.log("\n5. Optimizations:");
    console.log("- Reduce comparisons after each pass");
    console.log("- Early termination when array becomes sorted");
    console.log("- Bidirectional sorting (Cocktail Shaker Sort)");
}

// Interactive learning function
function interactiveLearning(arr) {
    console.log(`\n=== Interactive Bubble Sort Learning ===`);
    console.log(`Array to sort: [${arr.join(', ')}]`);
    
    console.log("\n1. Step-by-step visualization:");
    const result = visualizeBubbleSort(arr);
    
    console.log("\n2. Detailed statistics:");
    const stats = bubbleSortWithStats(arr);
    console.log(`Comparisons: ${stats.comparisons}`);
    console.log(`Swaps: ${stats.swaps}`);
    console.log(`Passes: ${stats.passes}`);
    console.log(`Efficiency: ${stats.efficiency}`);
    
    console.log("\n3. Complexity analysis:");
    const analysis = analyzeBubbleSortComplexity(arr.length);
    console.log(`Time complexity: Best ${analysis.timeComplexity.best}, Average ${analysis.timeComplexity.average}, Worst ${analysis.timeComplexity.worst}`);
    console.log(`Space complexity: ${analysis.spaceComplexity}`);
    console.log(`Stable: ${analysis.stable}, In-place: ${analysis.inPlace}, Adaptive: ${analysis.adaptive}`);
    
    return result;
}

// Run tests
testBubbleSort();
testApplications();
performanceTest();
educationalDemo();

// Interactive examples
interactiveLearning([64, 34, 25, 12, 22, 11, 90]);
interactiveLearning([1, 2, 3, 4, 5]); // Best case
interactiveLearning([5, 4, 3, 2, 1]); // Worst case

// Export functions for use in other files
module.exports = {
    bubbleSortBruteForce,
    bubbleSortBetter,
    bubbleSortOptimized,
    bubbleSortRecursive,
    bubbleSortCustom,
    cocktailShakerSort,
    oddEvenSort,
    bubbleSortObjects,
    bubbleSortStrings,
    bubbleSortWithCallback,
    visualizeBubbleSort,
    bubbleSortWithStats,
    compareBubbleSortVariants,
    analyzeBubbleSortComplexity,
    generateTestArrays,
    interactiveLearning
};
