/**
 * Insertion Sort
 * Bodhi-DSA Course
 * 
 * Problem: Sort an array using the insertion sort algorithm
 * Insertion sort builds the sorted array one element at a time by
 * inserting each element into its correct position in the sorted portion
 */

// ============= BRUTE FORCE APPROACH (Basic Insertion Sort) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Basic implementation without optimizations
function insertionSortBruteForce(arr) {
    // Handle edge cases
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Create a copy to avoid modifying original array
    const result = [...arr];
    const n = result.length;
    
    // Start from second element (first is considered sorted)
    for (let i = 1; i < n; i++) {
        const key = result[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        
        // Insert key at correct position
        result[j + 1] = key;
    }
    
    return result;
}

// ============= BETTER APPROACH (Optimized Insertion Sort) =============
// Time Complexity: O(n²) worst case, O(n) best case | Space Complexity: O(1)
// Early termination when element is already in correct position
function insertionSortBetter(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        
        // If current element is already in correct position, skip
        if (key >= result[i - 1]) {
            continue;
        }
        
        let j = i - 1;
        
        // Shift elements to make space for key
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = key;
    }
    
    return result;
}

// ============= OPTIMIZED APPROACH (Binary Insertion Sort) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Use binary search to find insertion position
function insertionSortOptimized(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    // Binary search to find insertion position
    function binarySearch(arr, val, start, end) {
        if (start === end) {
            return arr[start] > val ? start : start + 1;
        }
        
        if (start > end) {
            return start;
        }
        
        const mid = Math.floor((start + end) / 2);
        
        if (arr[mid] < val) {
            return binarySearch(arr, val, mid + 1, end);
        } else if (arr[mid] > val) {
            return binarySearch(arr, val, start, mid - 1);
        } else {
            return mid;
        }
    }
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        const insertPos = binarySearch(result, key, 0, i - 1);
        
        // Shift elements to make space
        for (let j = i - 1; j >= insertPos; j--) {
            result[j + 1] = result[j];
        }
        
        result[insertPos] = key;
    }
    
    return result;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(n) - due to recursion stack
// Implement insertion sort using recursion
function insertionSortRecursive(arr, n = arr.length) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Base case
    if (n <= 1) return arr;
    
    const result = [...arr];
    
    // Sort first n-1 elements
    insertionSortRecursive(result, n - 1);
    
    // Insert the nth element at correct position
    const last = result[n - 1];
    let j = n - 2;
    
    while (j >= 0 && result[j] > last) {
        result[j + 1] = result[j];
        j--;
    }
    
    result[j + 1] = last;
    
    return result;
}

// ============= VARIATIONS =============

// Insertion sort with custom comparator
function insertionSortCustom(arr, compareFunc = (a, b) => a > b) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        let j = i - 1;
        
        while (j >= 0 && compareFunc(result[j], key)) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = key;
    }
    
    return result;
}

// Insertion sort for linked list simulation
function insertionSortLinkedList(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    // Simulate linked list with objects
    const nodes = arr.map((val, idx) => ({
        value: val,
        next: idx < arr.length - 1 ? idx + 1 : null
    }));
    
    let sorted = null;
    let current = 0;
    
    while (current !== null) {
        const next = nodes[current].next;
        
        // Insert current node into sorted list
        if (sorted === null || nodes[current].value <= nodes[sorted].value) {
            nodes[current].next = sorted;
            sorted = current;
        } else {
            let search = sorted;
            while (nodes[search].next !== null && 
                   nodes[nodes[search].next].value < nodes[current].value) {
                search = nodes[search].next;
            }
            nodes[current].next = nodes[search].next;
            nodes[search].next = current;
        }
        
        current = next;
    }
    
    // Convert back to array
    const result = [];
    let node = sorted;
    while (node !== null) {
        result.push(nodes[node].value);
        node = nodes[node].next;
    }
    
    return result;
}

// Shell sort (advanced insertion sort)
function shellSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Perform insertion sort for elements at gap distance
        for (let i = gap; i < n; i++) {
            const temp = result[i];
            let j = i;
            
            while (j >= gap && result[j - gap] > temp) {
                result[j] = result[j - gap];
                j -= gap;
            }
            
            result[j] = temp;
        }
    }
    
    return result;
}

// ============= HELPER FUNCTIONS =============

// Function to visualize insertion sort process
function visualizeInsertionSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    console.log(`\nInsertion Sort Visualization for [${arr.join(', ')}]`);
    console.log("=" .repeat(50));
    
    const result = [...arr];
    const n = result.length;
    
    console.log(`Initial: [${result.join(', ')}]`);
    console.log(`Sorted: [${result[0]}] | Unsorted: [${result.slice(1).join(', ')}]`);
    
    for (let i = 1; i < n; i++) {
        console.log(`\nStep ${i}: Inserting ${result[i]}`);
        
        const key = result[i];
        let j = i - 1;
        
        // Show current state
        const visual = result.map((val, idx) => {
            if (idx < i) return `(${val})`; // Sorted portion
            if (idx === i) return `[${val}]`; // Current element
            return val.toString(); // Unsorted portion
        });
        
        console.log(`  Before: ${visual.join(' ')}`);
        console.log(`  Sorted: [${result.slice(0, i).join(', ')}] | Current: ${key} | Unsorted: [${result.slice(i + 1).join(', ')}]`);
        
        // Find correct position
        let insertPos = i;
        while (j >= 0 && result[j] > key) {
            console.log(`  Compare: ${key} < ${result[j]} → shift ${result[j]} right`);
            result[j + 1] = result[j];
            j--;
            insertPos = j + 1;
        }
        
        result[insertPos] = key;
        
        console.log(`  Insert ${key} at position ${insertPos}`);
        console.log(`  After: [${result.join(', ')}]`);
        console.log(`  Sorted: [${result.slice(0, i + 1).join(', ')}] | Unsorted: [${result.slice(i + 1).join(', ')}]`);
    }
    
    console.log(`\n✅ Final sorted array: [${result.join(', ')}]`);
    return result;
}

// Function to count operations
function insertionSortWithStats(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return { sorted: arr, comparisons: 0, shifts: 0, passes: 0 };
    }
    
    const result = [...arr];
    const n = result.length;
    let comparisons = 0;
    let shifts = 0;
    let passes = 0;
    
    for (let i = 1; i < n; i++) {
        passes++;
        const key = result[i];
        let j = i - 1;
        
        while (j >= 0) {
            comparisons++;
            if (result[j] > key) {
                result[j + 1] = result[j];
                shifts++;
                j--;
            } else {
                break;
            }
        }
        
        if (j + 1 !== i) {
            result[j + 1] = key;
        }
    }
    
    return {
        sorted: result,
        comparisons: comparisons,
        shifts: shifts,
        passes: passes,
        worstCaseComparisons: n * (n - 1) / 2,
        bestCaseComparisons: n - 1,
        efficiency: ((n * (n - 1) / 2 - comparisons) / (n * (n - 1) / 2) * 100).toFixed(2) + '%'
    };
}

// Function to compare different insertion sort variants
function compareInsertionSortVariants(arr) {
    console.log(`\n=== Comparing Insertion Sort Variants ===`);
    console.log(`Array: [${arr.join(', ')}]`);
    
    const variants = [
        { name: 'Brute Force', func: insertionSortBruteForce },
        { name: 'Better (Early termination)', func: insertionSortBetter },
        { name: 'Optimized (Binary insertion)', func: insertionSortOptimized },
        { name: 'Recursive', func: insertionSortRecursive },
        { name: 'Linked List Style', func: insertionSortLinkedList },
        { name: 'Shell Sort', func: shellSort }
    ];
    
    variants.forEach(variant => {
        console.time(variant.name);
        const result = variant.func(arr);
        console.timeEnd(variant.name);
        console.log(`${variant.name}: [${result.join(', ')}]`);
    });
    
    // Show detailed stats
    const stats = insertionSortWithStats(arr);
    console.log(`\nDetailed Statistics:`, stats);
}

// Function to analyze insertion sort complexity
function analyzeInsertionSortComplexity(arraySize) {
    const worstCaseComparisons = arraySize * (arraySize - 1) / 2;
    const worstCaseShifts = arraySize * (arraySize - 1) / 2;
    const bestCaseComparisons = arraySize - 1;
    const bestCaseShifts = 0;
    
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
            shifts: worstCaseShifts,
            passes: arraySize - 1
        },
        bestCase: {
            comparisons: bestCaseComparisons,
            shifts: bestCaseShifts,
            passes: arraySize - 1
        },
        stable: true,
        inPlace: true,
        adaptive: true,
        online: true,
        characteristics: [
            'Efficient for small datasets',
            'Adaptive: performs well on nearly sorted arrays',
            'Stable: maintains relative order of equal elements',
            'Online: can sort array as it receives it',
            'In-place: requires only O(1) extra memory'
        ]
    };
}

// ============= ADVANCED APPLICATIONS =============

// Sort objects by property
function insertionSortObjects(arr, property) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        let j = i - 1;
        
        while (j >= 0 && result[j][property] > key[property]) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = key;
    }
    
    return result;
}

// Sort strings with various criteria
function insertionSortStrings(arr, criteria = 'alphabetical') {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    const compareFunc = {
        alphabetical: (a, b) => a.toLowerCase() > b.toLowerCase(),
        length: (a, b) => a.length > b.length,
        reverse: (a, b) => a.toLowerCase() < b.toLowerCase(),
        numeric: (a, b) => parseFloat(a) > parseFloat(b)
    };
    
    const compare = compareFunc[criteria] || compareFunc.alphabetical;
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        let j = i - 1;
        
        while (j >= 0 && compare(result[j], key)) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = key;
    }
    
    return result;
}

// Insertion sort with gap (for shell sort)
function insertionSortWithGap(arr, gap) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = gap; i < n; i++) {
        const key = result[i];
        let j = i - gap;
        
        while (j >= 0 && result[j] > key) {
            result[j + gap] = result[j];
            j -= gap;
        }
        
        result[j + gap] = key;
    }
    
    return result;
}

// Insertion sort with step-by-step callback
function insertionSortWithCallback(arr, callback) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        
        // Call callback at start of each insertion
        if (callback) {
            callback({
                type: 'insertion_start',
                array: [...result],
                currentElement: key,
                position: i,
                sortedPortion: result.slice(0, i),
                unsortedPortion: result.slice(i)
            });
        }
        
        let j = i - 1;
        let shifts = 0;
        
        while (j >= 0 && result[j] > key) {
            // Call callback for each comparison
            if (callback) {
                callback({
                    type: 'compare',
                    array: [...result],
                    comparing: [j, key],
                    willShift: true,
                    position: i
                });
            }
            
            result[j + 1] = result[j];
            shifts++;
            j--;
            
            // Call callback after shift
            if (callback) {
                callback({
                    type: 'shift',
                    array: [...result],
                    shiftedElement: result[j + 2],
                    fromPosition: j + 1,
                    toPosition: j + 2,
                    position: i
                });
            }
        }
        
        result[j + 1] = key;
        
        // Call callback after insertion
        if (callback) {
            callback({
                type: 'insertion_complete',
                array: [...result],
                insertedElement: key,
                insertedAt: j + 1,
                shiftsRequired: shifts,
                position: i
            });
        }
    }
    
    return result;
}

// ============= TEST CASES =============
function testInsertionSort() {
    console.log("=== Insertion Sort Tests ===");
    
    const testCases = [
        { name: 'Random', arr: [5, 2, 4, 6, 1, 3] },
        { name: 'Sorted', arr: [1, 2, 3, 4, 5] },
        { name: 'Reverse sorted', arr: [5, 4, 3, 2, 1] },
        { name: 'Duplicates', arr: [3, 1, 4, 1, 5, 9, 2, 6, 5] },
        { name: 'Single element', arr: [42] },
        { name: 'Empty', arr: [] },
        { name: 'Two elements', arr: [2, 1] },
        { name: 'All same', arr: [7, 7, 7, 7] },
        { name: 'Nearly sorted', arr: [1, 2, 4, 3, 5] },
        { name: 'Negative numbers', arr: [-3, -1, -4, -1, -5] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\nTest Case: ${testCase.name}`);
        console.log(`Input: [${testCase.arr.join(', ')}]`);
        
        // Test all approaches
        const results = {
            bruteForce: insertionSortBruteForce(testCase.arr),
            better: insertionSortBetter(testCase.arr),
            optimized: insertionSortOptimized(testCase.arr),
            recursive: insertionSortRecursive(testCase.arr)
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
            const stats = insertionSortWithStats(testCase.arr);
            console.log(`Statistics:`, stats);
        }
    });
}

// Test applications
function testApplications() {
    console.log("\n=== Applications Tests ===");
    
    // Test object sorting
    const books = [
        { title: 'The Hobbit', pages: 310 },
        { title: '1984', pages: 328 },
        { title: 'Dune', pages: 688 },
        { title: 'Brave New World', pages: 268 }
    ];
    
    console.log("\nSorting books by pages:");
    console.log("Before:", books);
    console.log("After:", insertionSortObjects(books, 'pages'));
    
    // Test string sorting
    const languages = ['Python', 'JavaScript', 'Java', 'C++', 'Go'];
    console.log("\nSorting languages alphabetically:");
    console.log("Before:", languages);
    console.log("After:", insertionSortStrings(languages, 'alphabetical'));
    
    console.log("\nSorting languages by length:");
    console.log("After:", insertionSortStrings(languages, 'length'));
    
    // Test custom comparator
    const temperatures = [23.5, 18.2, 25.1, 19.8, 22.3];
    console.log("\nSorting temperatures in descending order:");
    console.log("Before:", temperatures);
    console.log("After:", insertionSortCustom(temperatures, (a, b) => a < b));
    
    // Test shell sort
    const largeArray = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30];
    console.log("\nComparing insertion sort vs shell sort:");
    console.log("Original:", largeArray);
    console.log("Insertion Sort:", insertionSortBetter(largeArray));
    console.log("Shell Sort:", shellSort(largeArray));
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const sizes = [100, 500, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        
        // Test different array types
        const arrays = {
            random: Array.from({ length: size }, () => Math.floor(Math.random() * 1000)),
            sorted: Array.from({ length: size }, (_, i) => i),
            reverse: Array.from({ length: size }, (_, i) => size - i),
            nearlySorted: Array.from({ length: size }, (_, i) => i).map((val, idx) => 
                idx % 10 === 0 ? val + Math.floor(Math.random() * 10) : val)
        };
        
        Object.entries(arrays).forEach(([type, arr]) => {
            console.log(`\n${type.charAt(0).toUpperCase() + type.slice(1)} array:`);
            compareInsertionSortVariants(arr.slice(0, 10)); // Show only first 10 elements
        });
        
        // Show complexity analysis
        const analysis = analyzeInsertionSortComplexity(size);
        console.log(`\nComplexity Analysis:`, analysis);
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. How Insertion Sort Works:");
    console.log("Insertion sort builds the sorted array one element at a time");
    console.log("It takes each element and inserts it into its correct position");
    console.log("in the already sorted portion of the array");
    
    console.log("\n2. Algorithm Steps:");
    console.log("1. Start with the second element (first is considered sorted)");
    console.log("2. Compare it with elements in the sorted portion");
    console.log("3. Shift larger elements to the right");
    console.log("4. Insert the element at the correct position");
    console.log("5. Repeat for all remaining elements");
    
    console.log("\n3. Characteristics:");
    console.log("- Stable: Maintains relative order of equal elements");
    console.log("- In-place: Sorts within the original array");
    console.log("- Adaptive: Performs better on partially sorted arrays");
    console.log("- Online: Can sort data as it arrives");
    
    console.log("\n4. Advantages:");
    console.log("- Simple implementation");
    console.log("- Efficient for small datasets");
    console.log("- Adaptive behavior (O(n) for sorted arrays)");
    console.log("- Stable sorting algorithm");
    console.log("- Online algorithm");
    console.log("- In-place sorting");
    
    console.log("\n5. Disadvantages:");
    console.log("- O(n²) time complexity for large datasets");
    console.log("- More writes compared to selection sort");
    console.log("- Not suitable for large datasets");
    
    console.log("\n6. When to use Insertion Sort:");
    console.log("- Small datasets (< 50 elements)");
    console.log("- Nearly sorted arrays");
    console.log("- Online sorting (data arrives continuously)");
    console.log("- As a subroutine in hybrid algorithms");
    console.log("- When stability is required");
    
    console.log("\n7. Real-world Applications:");
    console.log("- Sorting small subarrays in quicksort/mergesort");
    console.log("- Online algorithms");
    console.log("- Sorting playing cards");
    console.log("- Maintaining sorted lists");
}

// Interactive learning function
function interactiveLearning(arr) {
    console.log(`\n=== Interactive Insertion Sort Learning ===`);
    console.log(`Array to sort: [${arr.join(', ')}]`);
    
    console.log("\n1. Step-by-step visualization:");
    const result = visualizeInsertionSort(arr);
    
    console.log("\n2. Detailed statistics:");
    const stats = insertionSortWithStats(arr);
    console.log(`Comparisons: ${stats.comparisons} (best: ${stats.bestCaseComparisons}, worst: ${stats.worstCaseComparisons})`);
    console.log(`Shifts: ${stats.shifts}`);
    console.log(`Passes: ${stats.passes}`);
    console.log(`Efficiency: ${stats.efficiency}`);
    
    console.log("\n3. Complexity analysis:");
    const analysis = analyzeInsertionSortComplexity(arr.length);
    console.log(`Time complexity: Best ${analysis.timeComplexity.best}, Average ${analysis.timeComplexity.average}, Worst ${analysis.timeComplexity.worst}`);
    console.log(`Space complexity: ${analysis.spaceComplexity}`);
    console.log(`Stable: ${analysis.stable}, In-place: ${analysis.inPlace}, Adaptive: ${analysis.adaptive}, Online: ${analysis.online}`);
    
    console.log("\n4. Key insights:");
    console.log("- Insertion sort is like sorting playing cards in your hand");
    console.log("- It's very efficient for small or nearly sorted arrays");
    console.log("- Each element is inserted into its correct position");
    console.log("- The sorted portion grows by one element in each iteration");
    
    return result;
}

// Run tests
testInsertionSort();
testApplications();
performanceTest();
educationalDemo();

// Interactive examples
interactiveLearning([5, 2, 4, 6, 1, 3]);
interactiveLearning([1, 2, 4, 3, 5]); // Nearly sorted
interactiveLearning([1, 2, 3, 4, 5]); // Best case

// Export functions for use in other files
module.exports = {
    insertionSortBruteForce,
    insertionSortBetter,
    insertionSortOptimized,
    insertionSortRecursive,
    insertionSortCustom,
    insertionSortLinkedList,
    shellSort,
    insertionSortObjects,
    insertionSortStrings,
    insertionSortWithGap,
    insertionSortWithCallback,
    visualizeInsertionSort,
    insertionSortWithStats,
    compareInsertionSortVariants,
    analyzeInsertionSortComplexity,
    interactiveLearning
};
