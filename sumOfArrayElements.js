/**
 * Sum of All Numbers in Array
 * Bodhi-DSA Course
 * 
 * Problem: Find the sum of all elements in an array using recursion
 * Calculate total sum of array elements recursively
 */

// ============= BRUTE FORCE APPROACH (Iterative) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use loop to sum all elements
function sumArrayBruteForce(arr) {
    // Handle edge cases
    if (!arr || arr.length === 0) return 0;
    
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    
    return sum;
}

// ============= BETTER APPROACH (Simple Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to call stack
// Use basic recursion with index
function sumArrayRecursive(arr, index = 0) {
    // Base case: reached end of array
    if (!arr || index >= arr.length) return 0;
    
    // Recursive case: current element + sum of remaining elements
    return arr[index] + sumArrayRecursive(arr, index + 1);
}

// ============= OPTIMIZED APPROACH (Slice Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to array slicing and call stack
// Use recursion with array slicing
function sumArraySliceRecursive(arr) {
    // Base case: empty array
    if (!arr || arr.length === 0) return 0;
    
    // Base case: single element
    if (arr.length === 1) return arr[0];
    
    // Recursive case: first element + sum of rest
    return arr[0] + sumArraySliceRecursive(arr.slice(1));
}

// ============= ALTERNATIVE: TAIL RECURSION =============
// Time Complexity: O(n) | Space Complexity: O(n) - but can be optimized
// Use tail recursion with accumulator
function sumArrayTailRecursive(arr, index = 0, accumulator = 0) {
    // Base case: processed all elements
    if (!arr || index >= arr.length) return accumulator;
    
    // Tail recursive call: add current element to accumulator
    return sumArrayTailRecursive(arr, index + 1, accumulator + arr[index]);
}

// ============= ALTERNATIVE: DIVIDE AND CONQUER =============
// Time Complexity: O(n) | Space Complexity: O(log n)
// Use divide and conquer approach
function sumArrayDivideConquer(arr, start = 0, end = null) {
    // Initialize end if not provided
    if (end === null) end = arr.length - 1;
    
    // Base case: empty range
    if (!arr || start > end) return 0;
    
    // Base case: single element
    if (start === end) return arr[start];
    
    // Divide: find middle point
    const mid = Math.floor((start + end) / 2);
    
    // Conquer: sum left half + sum right half
    const leftSum = sumArrayDivideConquer(arr, start, mid);
    const rightSum = sumArrayDivideConquer(arr, mid + 1, end);
    
    return leftSum + rightSum;
}

// ============= ALTERNATIVE: FUNCTIONAL RECURSION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use functional programming approach
function sumArrayFunctional(arr) {
    // Base case: empty array
    if (!arr || arr.length === 0) return 0;
    
    // Use reduce with recursion concept
    return arr.reduce((sum, current) => sum + current, 0);
}

// ============= ALTERNATIVE: HELPER FUNCTION RECURSION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use helper function for cleaner interface
function sumArrayWithHelper(arr) {
    // Helper function for recursion
    function helper(arr, index) {
        if (index >= arr.length) return 0;
        return arr[index] + helper(arr, index + 1);
    }
    
    // Handle edge cases
    if (!arr || arr.length === 0) return 0;
    
    return helper(arr, 0);
}

// ============= HELPER FUNCTIONS =============

// Function to validate array input
function validateArray(arr) {
    if (!Array.isArray(arr)) {
        return { valid: false, reason: 'Input must be an array' };
    }
    
    if (arr.length === 0) {
        return { valid: true, warning: 'Array is empty' };
    }
    
    // Check if all elements are numbers
    const nonNumbers = arr.filter(item => typeof item !== 'number');
    if (nonNumbers.length > 0) {
        return { 
            valid: false, 
            reason: `Non-numeric elements found: ${nonNumbers}` 
        };
    }
    
    return { valid: true };
}

// Function to visualize sum calculation
function visualizeSumCalculation(arr) {
    if (!arr || arr.length === 0) return "[] = 0";
    
    const terms = arr.map(num => num.toString());
    const sum = sumArrayBruteForce(arr);
    
    return `[${arr.join(', ')}] = ${terms.join(' + ')} = ${sum}`;
}

// Function to show recursion steps
function showRecursionSteps(arr, index = 0, depth = 0) {
    const indent = "  ".repeat(depth);
    
    if (!arr || index >= arr.length) {
        console.log(`${indent}sumArray([], ${index}) → Base case: return 0`);
        return 0;
    }
    
    console.log(`${indent}sumArray([${arr.slice(index)}], ${index})`);
    console.log(`${indent}→ ${arr[index]} + sumArray([${arr.slice(index + 1)}], ${index + 1})`);
    
    const recursiveResult = showRecursionSteps(arr, index + 1, depth + 1);
    const result = arr[index] + recursiveResult;
    
    console.log(`${indent}→ Return: ${arr[index]} + ${recursiveResult} = ${result}`);
    return result;
}

// Function to analyze array properties
function analyzeArray(arr) {
    if (!arr || arr.length === 0) {
        return { length: 0, sum: 0, average: 0, min: null, max: null };
    }
    
    const sum = sumArrayBruteForce(arr);
    
    return {
        length: arr.length,
        sum: sum,
        average: sum / arr.length,
        min: Math.min(...arr),
        max: Math.max(...arr),
        hasNegatives: arr.some(num => num < 0),
        hasZeros: arr.some(num => num === 0),
        allPositive: arr.every(num => num > 0),
        uniqueElements: new Set(arr).size
    };
}

// Function to compare all approaches
function compareAllApproaches(arr) {
    console.log(`\n=== Comparing All Approaches ===`);
    console.log(`Array: [${arr}]`);
    
    const approaches = [
        { name: 'Brute Force (Iterative)', func: sumArrayBruteForce },
        { name: 'Simple Recursion', func: sumArrayRecursive },
        { name: 'Slice Recursion', func: sumArraySliceRecursive },
        { name: 'Tail Recursion', func: sumArrayTailRecursive },
        { name: 'Divide & Conquer', func: sumArrayDivideConquer },
        { name: 'Functional', func: sumArrayFunctional },
        { name: 'Helper Function', func: sumArrayWithHelper }
    ];
    
    approaches.forEach(approach => {
        console.time(approach.name);
        const result = approach.func(arr);
        console.timeEnd(approach.name);
        console.log(`${approach.name}: ${result}`);
    });
}

// Function to generate test arrays
function generateTestArray(size, min = 1, max = 100) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

// ============= VARIATIONS =============

// Sum of positive numbers only
function sumPositiveNumbers(arr, index = 0) {
    if (!arr || index >= arr.length) return 0;
    
    const current = arr[index] > 0 ? arr[index] : 0;
    return current + sumPositiveNumbers(arr, index + 1);
}

// Sum of even numbers only
function sumEvenNumbers(arr, index = 0) {
    if (!arr || index >= arr.length) return 0;
    
    const current = arr[index] % 2 === 0 ? arr[index] : 0;
    return current + sumEvenNumbers(arr, index + 1);
}

// Sum of odd numbers only
function sumOddNumbers(arr, index = 0) {
    if (!arr || index >= arr.length) return 0;
    
    const current = arr[index] % 2 !== 0 ? arr[index] : 0;
    return current + sumOddNumbers(arr, index + 1);
}

// Sum with condition function
function sumWithCondition(arr, conditionFunc, index = 0) {
    if (!arr || index >= arr.length) return 0;
    
    const current = conditionFunc(arr[index]) ? arr[index] : 0;
    return current + sumWithCondition(arr, conditionFunc, index + 1);
}

// Sum of absolute values
function sumAbsoluteValues(arr, index = 0) {
    if (!arr || index >= arr.length) return 0;
    
    return Math.abs(arr[index]) + sumAbsoluteValues(arr, index + 1);
}

// Weighted sum (multiply by index)
function weightedSum(arr, index = 0) {
    if (!arr || index >= arr.length) return 0;
    
    return (arr[index] * index) + weightedSum(arr, index + 1);
}

// ============= TEST CASES =============
function testSumArray() {
    const testCases = [
        [],                          // Expected: 0
        [5],                        // Expected: 5
        [1, 2, 3],                  // Expected: 6
        [1, 2, 3, 4, 5],           // Expected: 15
        [-1, -2, -3],              // Expected: -6
        [1, -2, 3, -4, 5],         // Expected: 3
        [0, 0, 0],                 // Expected: 0
        [10, 20, 30, 40, 50],      // Expected: 150
        [1.5, 2.5, 3.5],           // Expected: 7.5
        [100, -50, 25, -10, 5]     // Expected: 70
    ];
    
    console.log("=== Sum of Array Elements Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        
        // Validate input
        const validation = validateArray(testCase);
        if (!validation.valid) {
            console.log(`Invalid input: ${validation.reason}`);
            return;
        }
        
        if (validation.warning) {
            console.log(`Warning: ${validation.warning}`);
        }
        
        // Show visualization for small arrays
        if (testCase.length <= 5) {
            console.log(`Visualization: ${visualizeSumCalculation(testCase)}`);
        }
        
        // Analyze array
        const analysis = analyzeArray(testCase);
        console.log(`Analysis:`, analysis);
        
        // Test all approaches
        console.log(`Brute Force: ${sumArrayBruteForce(testCase)}`);
        console.log(`Simple Recursion: ${sumArrayRecursive(testCase)}`);
        console.log(`Slice Recursion: ${sumArraySliceRecursive(testCase)}`);
        console.log(`Tail Recursion: ${sumArrayTailRecursive(testCase)}`);
        console.log(`Divide & Conquer: ${sumArrayDivideConquer(testCase)}`);
        console.log(`Functional: ${sumArrayFunctional(testCase)}`);
        console.log(`Helper Function: ${sumArrayWithHelper(testCase)}`);
    });
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    const testArray = [1, -2, 3, -4, 5, 6];
    console.log(`\nTest Array: [${testArray}]`);
    
    console.log(`Sum of all: ${sumArrayRecursive(testArray)}`);
    console.log(`Sum of positive: ${sumPositiveNumbers(testArray)}`);
    console.log(`Sum of even: ${sumEvenNumbers(testArray)}`);
    console.log(`Sum of odd: ${sumOddNumbers(testArray)}`);
    console.log(`Sum of absolute values: ${sumAbsoluteValues(testArray)}`);
    console.log(`Weighted sum: ${weightedSum(testArray)}`);
    
    // Test with condition function
    const greaterThanZero = (num) => num > 0;
    console.log(`Sum with condition (>0): ${sumWithCondition(testArray, greaterThanZero)}`);
    
    const evenNumbers = (num) => num % 2 === 0;
    console.log(`Sum with condition (even): ${sumWithCondition(testArray, evenNumbers)}`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const testSizes = [100, 1000, 5000];
    
    testSizes.forEach(size => {
        console.log(`\nTesting with array size: ${size}`);
        const testArray = generateTestArray(size);
        compareAllApproaches(testArray);
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    const demoArray = [2, 4, 6];
    
    console.log(`\n1. Step-by-step recursion for [${demoArray}]:`);
    showRecursionSteps(demoArray);
    
    console.log("\n2. Recursion concept:");
    console.log("sum([2, 4, 6]) = 2 + sum([4, 6])");
    console.log("sum([4, 6]) = 4 + sum([6])");
    console.log("sum([6]) = 6 + sum([])");
    console.log("sum([]) = 0 (base case)");
    
    console.log("\n3. Different recursion strategies:");
    console.log("- Index-based: Track current position");
    console.log("- Slice-based: Create new arrays (less efficient)");
    console.log("- Tail recursion: Use accumulator");
    console.log("- Divide & conquer: Split array in half");
}

// Interactive learning function
function interactiveLearning(arr) {
    console.log(`\n=== Interactive Learning ===`);
    console.log(`Array: [${arr}]`);
    
    // Validate input
    const validation = validateArray(arr);
    if (!validation.valid) {
        console.log(`Error: ${validation.reason}`);
        return null;
    }
    
    console.log("\n1. Problem understanding:");
    console.log(`Find sum of all elements: ${visualizeSumCalculation(arr)}`);
    
    console.log("\n2. Recursive approach:");
    console.log("sum(array) = first_element + sum(rest_of_array)");
    console.log("Base case: sum([]) = 0");
    
    console.log("\n3. Step-by-step execution:");
    const result = showRecursionSteps(arr);
    
    console.log("\n4. Array analysis:");
    const analysis = analyzeArray(arr);
    console.log(analysis);
    
    return result;
}

// Run tests
testSumArray();
testVariations();
performanceTest();
educationalDemo();

// Interactive example
interactiveLearning([1, 3, 5, 7]);

// Export functions for use in other files
module.exports = {
    sumArrayBruteForce,
    sumArrayRecursive,
    sumArraySliceRecursive,
    sumArrayTailRecursive,
    sumArrayDivideConquer,
    sumArrayFunctional,
    sumArrayWithHelper,
    sumPositiveNumbers,
    sumEvenNumbers,
    sumOddNumbers,
    sumWithCondition,
    sumAbsoluteValues,
    weightedSum,
    validateArray,
    visualizeSumCalculation,
    showRecursionSteps,
    analyzeArray,
    compareAllApproaches,
    generateTestArray,
    interactiveLearning
};
