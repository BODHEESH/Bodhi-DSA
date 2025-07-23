/**
 * Linear Search
 * Bodhi-DSA Course
 * 
 * Problem: Find an element in an array using linear search
 * Linear search checks each element sequentially until the target is found
 */

// ============= BRUTE FORCE APPROACH (Basic Linear Search) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Check each element one by one from start to end
function linearSearchBruteForce(arr, target) {
    // Handle edge cases
    if (!arr || arr.length === 0) return -1;
    
    // Search through each element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    
    return -1; // Element not found
}

// ============= BETTER APPROACH (Early Termination) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Same as brute force but with better handling and validation
function linearSearchBetter(arr, target) {
    // Input validation
    if (!Array.isArray(arr) || arr.length === 0) {
        return { index: -1, found: false, message: "Invalid or empty array" };
    }
    
    // Search with detailed tracking
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return { 
                index: i, 
                found: true, 
                comparisons: i + 1,
                message: `Found at index ${i} after ${i + 1} comparisons`
            };
        }
    }
    
    return { 
        index: -1, 
        found: false, 
        comparisons: arr.length,
        message: `Not found after ${arr.length} comparisons`
    };
}

// ============= OPTIMIZED APPROACH (Sentinel Search) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use sentinel to avoid boundary checking in loop
function linearSearchOptimized(arr, target) {
    if (!arr || arr.length === 0) return -1;
    
    // Make a copy to avoid modifying original array
    const searchArray = [...arr];
    const n = searchArray.length;
    
    // Store the last element
    const last = searchArray[n - 1];
    
    // Set target as sentinel at the end
    searchArray[n - 1] = target;
    
    let i = 0;
    // Search without boundary checking
    while (searchArray[i] !== target) {
        i++;
    }
    
    // Restore the last element
    searchArray[n - 1] = last;
    
    // Check if element was found before sentinel position
    // or if the last element is the target
    if (i < n - 1 || last === target) {
        return i;
    }
    
    return -1;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to recursion stack
// Use recursion to search through the array
function linearSearchRecursive(arr, target, index = 0) {
    // Base cases
    if (!arr || index >= arr.length) return -1;
    
    // Found the target
    if (arr[index] === target) return index;
    
    // Recursive case: search in the rest of the array
    return linearSearchRecursive(arr, target, index + 1);
}

// ============= FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use built-in array methods
function linearSearchFunctional(arr, target) {
    if (!Array.isArray(arr)) return -1;
    
    // Using findIndex
    return arr.findIndex(element => element === target);
}

// ============= VARIATIONS =============

// Search for all occurrences
function linearSearchAll(arr, target) {
    if (!Array.isArray(arr)) return [];
    
    const indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    
    return indices;
}

// Search with custom comparison function
function linearSearchCustom(arr, target, compareFunc = (a, b) => a === b) {
    if (!Array.isArray(arr)) return -1;
    
    for (let i = 0; i < arr.length; i++) {
        if (compareFunc(arr[i], target)) {
            return i;
        }
    }
    
    return -1;
}

// Search from the end (reverse linear search)
function linearSearchReverse(arr, target) {
    if (!Array.isArray(arr)) return -1;
    
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === target) {
            return i;
        }
    }
    
    return -1;
}

// Search with early termination on condition
function linearSearchConditional(arr, condition) {
    if (!Array.isArray(arr) || typeof condition !== 'function') return -1;
    
    for (let i = 0; i < arr.length; i++) {
        if (condition(arr[i], i, arr)) {
            return i;
        }
    }
    
    return -1;
}

// Two-way linear search (search from both ends)
function linearSearchTwoWay(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return -1;
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Check left pointer
        if (arr[left] === target) return left;
        
        // Check right pointer
        if (arr[right] === target) return right;
        
        left++;
        right--;
    }
    
    return -1;
}

// ============= HELPER FUNCTIONS =============

// Function to visualize search process
function visualizeLinearSearch(arr, target) {
    console.log(`\nSearching for ${target} in [${arr.join(', ')}]`);
    
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const status = current === target ? '✓ FOUND' : '✗';
        const arrow = i === 0 ? '→' : ' →';
        
        console.log(`Step ${i + 1}: ${arrow} arr[${i}] = ${current} ${status}`);
        
        if (current === target) {
            console.log(`🎯 Target found at index ${i}!`);
            return i;
        }
    }
    
    console.log(`❌ Target ${target} not found in array`);
    return -1;
}

// Function to compare search performance
function compareSearchMethods(arr, target) {
    console.log(`\n=== Comparing Linear Search Methods ===`);
    console.log(`Array: [${arr.slice(0, 10).join(', ')}${arr.length > 10 ? '...' : ''}]`);
    console.log(`Target: ${target}`);
    
    const methods = [
        { name: 'Brute Force', func: linearSearchBruteForce },
        { name: 'Better', func: (arr, target) => linearSearchBetter(arr, target).index },
        { name: 'Optimized (Sentinel)', func: linearSearchOptimized },
        { name: 'Recursive', func: linearSearchRecursive },
        { name: 'Functional', func: linearSearchFunctional },
        { name: 'Reverse', func: linearSearchReverse },
        { name: 'Two-way', func: linearSearchTwoWay }
    ];
    
    methods.forEach(method => {
        console.time(method.name);
        const result = method.func(arr, target);
        console.timeEnd(method.name);
        console.log(`${method.name}: Index ${result}`);
    });
}

// Function to analyze search statistics
function analyzeSearchPerformance(arr, target) {
    const result = linearSearchBetter(arr, target);
    const arraySize = arr.length;
    const position = result.index;
    
    return {
        found: result.found,
        position: position,
        comparisons: result.comparisons,
        worstCase: arraySize,
        bestCase: 1,
        averageCase: Math.ceil(arraySize / 2),
        efficiency: position === -1 ? 0 : ((arraySize - result.comparisons) / arraySize * 100).toFixed(2) + '%',
        searchTime: result.comparisons / arraySize
    };
}

// Function to generate search statistics
function generateSearchStats(arr, targets) {
    const stats = {
        totalSearches: targets.length,
        found: 0,
        notFound: 0,
        totalComparisons: 0,
        averageComparisons: 0,
        positions: []
    };
    
    targets.forEach(target => {
        const result = linearSearchBetter(arr, target);
        stats.totalComparisons += result.comparisons;
        
        if (result.found) {
            stats.found++;
            stats.positions.push(result.index);
        } else {
            stats.notFound++;
        }
    });
    
    stats.averageComparisons = (stats.totalComparisons / stats.totalSearches).toFixed(2);
    
    return stats;
}

// ============= ADVANCED VARIATIONS =============

// Search in 2D array
function linearSearch2D(matrix, target) {
    if (!Array.isArray(matrix) || matrix.length === 0) return null;
    
    for (let i = 0; i < matrix.length; i++) {
        if (!Array.isArray(matrix[i])) continue;
        
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === target) {
                return { row: i, col: j };
            }
        }
    }
    
    return null;
}

// Search with frequency count
function linearSearchWithCount(arr, target) {
    if (!Array.isArray(arr)) return { index: -1, count: 0 };
    
    let firstIndex = -1;
    let count = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            if (firstIndex === -1) firstIndex = i;
            count++;
        }
    }
    
    return { index: firstIndex, count: count };
}

// Search with range
function linearSearchRange(arr, target, start = 0, end = arr.length - 1) {
    if (!Array.isArray(arr) || start < 0 || end >= arr.length || start > end) {
        return -1;
    }
    
    for (let i = start; i <= end; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    
    return -1;
}

// Search closest element
function linearSearchClosest(arr, target) {
    if (!Array.isArray(arr) || arr.length === 0) return -1;
    
    let closestIndex = 0;
    let minDiff = Math.abs(arr[0] - target);
    
    for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - target);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    }
    
    return closestIndex;
}

// ============= TEST CASES =============
function testLinearSearch() {
    const testCases = [
        { arr: [1, 2, 3, 4, 5], target: 3, expected: 2 },
        { arr: [1, 2, 3, 4, 5], target: 1, expected: 0 },
        { arr: [1, 2, 3, 4, 5], target: 5, expected: 4 },
        { arr: [1, 2, 3, 4, 5], target: 6, expected: -1 },
        { arr: [], target: 1, expected: -1 },
        { arr: [1], target: 1, expected: 0 },
        { arr: [1, 1, 1, 1], target: 1, expected: 0 },
        { arr: [5, 3, 8, 1, 9, 2], target: 8, expected: 2 },
        { arr: ['a', 'b', 'c', 'd'], target: 'c', expected: 2 },
        { arr: [10, 20, 30, 40, 50], target: 25, expected: -1 }
    ];
    
    console.log("=== Linear Search Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}:`);
        console.log(`Array: [${testCase.arr.join(', ')}]`);
        console.log(`Target: ${testCase.target}`);
        console.log(`Expected: ${testCase.expected}`);
        
        // Test all approaches
        const results = {
            bruteForce: linearSearchBruteForce(testCase.arr, testCase.target),
            better: linearSearchBetter(testCase.arr, testCase.target).index,
            optimized: linearSearchOptimized(testCase.arr, testCase.target),
            recursive: linearSearchRecursive(testCase.arr, testCase.target),
            functional: linearSearchFunctional(testCase.arr, testCase.target)
        };
        
        console.log(`Results:`, results);
        
        // Verify all methods give same result
        const allSame = Object.values(results).every(result => result === testCase.expected);
        console.log(`✓ All methods consistent: ${allSame}`);
        
        // Show detailed analysis for interesting cases
        if (testCase.arr.length > 0 && testCase.arr.length <= 10) {
            const analysis = analyzeSearchPerformance(testCase.arr, testCase.target);
            console.log(`Analysis:`, analysis);
        }
    });
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    const arr = [1, 3, 5, 3, 7, 3, 9];
    const target = 3;
    
    console.log(`\nArray: [${arr.join(', ')}], Target: ${target}`);
    
    console.log(`All occurrences: [${linearSearchAll(arr, target).join(', ')}]`);
    console.log(`Reverse search: ${linearSearchReverse(arr, target)}`);
    console.log(`Two-way search: ${linearSearchTwoWay(arr, target)}`);
    console.log(`With count: ${JSON.stringify(linearSearchWithCount(arr, target))}`);
    console.log(`Range search (1-4): ${linearSearchRange(arr, target, 1, 4)}`);
    
    // Test 2D search
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    console.log(`\n2D search for 5 in matrix: ${JSON.stringify(linearSearch2D(matrix, 5))}`);
    
    // Test closest element
    const numbers = [1, 5, 10, 15, 20];
    console.log(`Closest to 12 in [${numbers.join(', ')}]: index ${linearSearchClosest(numbers, 12)} (value: ${numbers[linearSearchClosest(numbers, 12)]})`);
    
    // Test custom comparison
    const objects = [{id: 1, name: 'A'}, {id: 2, name: 'B'}, {id: 3, name: 'C'}];
    const customResult = linearSearchCustom(objects, 2, (obj, target) => obj.id === target);
    console.log(`Custom search for id=2: index ${customResult}`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const sizes = [1000, 10000, 100000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        
        // Create test array
        const arr = Array.from({ length: size }, (_, i) => i);
        const target = Math.floor(size * 0.75); // Search for element at 75% position
        
        compareSearchMethods(arr, target);
        
        // Generate statistics
        const randomTargets = Array.from({ length: 100 }, () => Math.floor(Math.random() * size));
        const stats = generateSearchStats(arr, randomTargets);
        console.log(`\nSearch Statistics:`, stats);
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. How Linear Search Works:");
    console.log("Linear search examines each element sequentially");
    console.log("It starts from the first element and continues until:");
    console.log("- The target element is found, OR");
    console.log("- The end of the array is reached");
    
    console.log("\n2. Time Complexity Analysis:");
    console.log("- Best Case: O(1) - element is at first position");
    console.log("- Average Case: O(n/2) - element is in middle");
    console.log("- Worst Case: O(n) - element is at last position or not found");
    
    console.log("\n3. Space Complexity: O(1) - uses constant extra space");
    
    console.log("\n4. When to use Linear Search:");
    console.log("- Small arrays (< 100 elements)");
    console.log("- Unsorted arrays");
    console.log("- When simplicity is preferred over efficiency");
    console.log("- One-time searches");
    
    console.log("\n5. Advantages:");
    console.log("- Simple to implement and understand");
    console.log("- Works on unsorted arrays");
    console.log("- No preprocessing required");
    console.log("- Memory efficient");
    
    console.log("\n6. Disadvantages:");
    console.log("- Slow for large arrays");
    console.log("- Not suitable for frequent searches");
    console.log("- Cannot take advantage of sorted data");
}

// Interactive learning function
function interactiveLearning(arr, target) {
    console.log(`\n=== Interactive Linear Search Learning ===`);
    console.log(`Array: [${arr.join(', ')}]`);
    console.log(`Target: ${target}`);
    
    console.log("\n1. Step-by-step visualization:");
    const result = visualizeLinearSearch(arr, target);
    
    console.log("\n2. Performance analysis:");
    const analysis = analyzeSearchPerformance(arr, target);
    console.log(`Found: ${analysis.found}`);
    console.log(`Position: ${analysis.position}`);
    console.log(`Comparisons made: ${analysis.comparisons}`);
    console.log(`Best case comparisons: ${analysis.bestCase}`);
    console.log(`Average case comparisons: ${analysis.averageCase}`);
    console.log(`Worst case comparisons: ${analysis.worstCase}`);
    console.log(`Search efficiency: ${analysis.efficiency}`);
    
    console.log("\n3. Alternative approaches:");
    console.log(`All occurrences: [${linearSearchAll(arr, target).join(', ')}]`);
    console.log(`Reverse search result: ${linearSearchReverse(arr, target)}`);
    console.log(`Two-way search result: ${linearSearchTwoWay(arr, target)}`);
    
    return result;
}

// Run tests
testLinearSearch();
testVariations();
performanceTest();
educationalDemo();

// Interactive examples
interactiveLearning([10, 25, 30, 45, 50, 65, 70], 45);
interactiveLearning([1, 3, 5, 7, 9], 6);

// Export functions for use in other files
module.exports = {
    linearSearchBruteForce,
    linearSearchBetter,
    linearSearchOptimized,
    linearSearchRecursive,
    linearSearchFunctional,
    linearSearchAll,
    linearSearchCustom,
    linearSearchReverse,
    linearSearchConditional,
    linearSearchTwoWay,
    linearSearch2D,
    linearSearchWithCount,
    linearSearchRange,
    linearSearchClosest,
    visualizeLinearSearch,
    compareSearchMethods,
    analyzeSearchPerformance,
    generateSearchStats,
    interactiveLearning
};
