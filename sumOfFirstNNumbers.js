/**
 * Sum of First N Numbers
 * Bodhi-DSA Course
 * 
 * Problem: Calculate the sum of the first n natural numbers using recursion
 * Find sum of 1 + 2 + 3 + ... + n
 */

// ============= BRUTE FORCE APPROACH (Iterative) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use loop to calculate sum
function sumOfFirstNBruteForce(n) {
    // Handle edge cases
    if (n <= 0) return 0;
    
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    
    return sum;
}

// ============= BETTER APPROACH (Simple Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to call stack
// Use basic recursion
function sumOfFirstNRecursive(n) {
    // Base case: sum of first 0 numbers is 0
    if (n <= 0) return 0;
    
    // Base case: sum of first 1 number is 1
    if (n === 1) return 1;
    
    // Recursive case: n + sum of first (n-1) numbers
    return n + sumOfFirstNRecursive(n - 1);
}

// ============= OPTIMIZED APPROACH (Mathematical Formula) =============
// Time Complexity: O(1) | Space Complexity: O(1)
// Use mathematical formula: n * (n + 1) / 2
function sumOfFirstNOptimized(n) {
    // Handle edge cases
    if (n <= 0) return 0;
    
    // Mathematical formula for sum of first n natural numbers
    return (n * (n + 1)) / 2;
}

// ============= ALTERNATIVE: TAIL RECURSION =============
// Time Complexity: O(n) | Space Complexity: O(n) - but can be optimized
// Use tail recursion with accumulator
function sumOfFirstNTailRecursive(n, accumulator = 0) {
    // Base case: when n becomes 0, return accumulator
    if (n <= 0) return accumulator;
    
    // Tail recursive call: add current n to accumulator
    return sumOfFirstNTailRecursive(n - 1, accumulator + n);
}

// ============= ALTERNATIVE: MEMOIZED RECURSION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use memoization to avoid recalculating same values
function sumOfFirstNMemoized(n, memo = {}) {
    // Base case
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    // Check if already calculated
    if (memo[n] !== undefined) {
        return memo[n];
    }
    
    // Calculate and store in memo
    memo[n] = n + sumOfFirstNMemoized(n - 1, memo);
    return memo[n];
}

// ============= ALTERNATIVE: RECURSIVE WITH RANGE =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Calculate sum from start to end
function sumOfRange(start, end) {
    // Base case: when start exceeds end
    if (start > end) return 0;
    
    // Base case: when start equals end
    if (start === end) return start;
    
    // Recursive case: start + sum of (start+1 to end)
    return start + sumOfRange(start + 1, end);
}

// ============= ALTERNATIVE: DIVIDE AND CONQUER =============
// Time Complexity: O(log n) | Space Complexity: O(log n)
// Use divide and conquer approach
function sumOfFirstNDivideConquer(n) {
    // Base cases
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 3;
    
    // Divide the problem
    const mid = Math.floor(n / 2);
    
    // Conquer: sum of first half + sum of second half
    const firstHalf = sumOfFirstNDivideConquer(mid);
    const secondHalf = sumOfRange(mid + 1, n);
    
    return firstHalf + secondHalf;
}

// ============= HELPER FUNCTIONS =============

// Function to validate input
function validateInput(n) {
    if (typeof n !== 'number') {
        return { valid: false, reason: 'Input must be a number' };
    }
    
    if (!Number.isInteger(n)) {
        return { valid: false, reason: 'Input must be an integer' };
    }
    
    if (n < 0) {
        return { valid: false, reason: 'Input must be non-negative' };
    }
    
    return { valid: true };
}

// Function to visualize sum calculation
function visualizeSumCalculation(n) {
    if (n <= 0) return "0";
    
    const terms = [];
    for (let i = 1; i <= n; i++) {
        terms.push(i.toString());
    }
    
    return terms.join(' + ') + ` = ${sumOfFirstNOptimized(n)}`;
}

// Function to show step-by-step recursion
function showRecursionSteps(n, depth = 0) {
    const indent = "  ".repeat(depth);
    console.log(`${indent}sumOfFirstN(${n})`);
    
    if (n <= 0) {
        console.log(`${indent}→ Base case: return 0`);
        return 0;
    }
    
    if (n === 1) {
        console.log(`${indent}→ Base case: return 1`);
        return 1;
    }
    
    console.log(`${indent}→ Recursive case: ${n} + sumOfFirstN(${n - 1})`);
    const recursiveResult = showRecursionSteps(n - 1, depth + 1);
    const result = n + recursiveResult;
    
    console.log(`${indent}→ Return: ${n} + ${recursiveResult} = ${result}`);
    return result;
}

// Function to compare all approaches
function compareAllApproaches(n) {
    console.log(`\n=== Comparing All Approaches for n=${n} ===`);
    
    const approaches = [
        { name: 'Brute Force (Iterative)', func: sumOfFirstNBruteForce },
        { name: 'Simple Recursion', func: sumOfFirstNRecursive },
        { name: 'Optimized (Formula)', func: sumOfFirstNOptimized },
        { name: 'Tail Recursion', func: sumOfFirstNTailRecursive },
        { name: 'Memoized Recursion', func: sumOfFirstNMemoized },
        { name: 'Divide and Conquer', func: sumOfFirstNDivideConquer }
    ];
    
    approaches.forEach(approach => {
        console.time(approach.name);
        const result = approach.func(n);
        console.timeEnd(approach.name);
        console.log(`${approach.name}: ${result}`);
    });
}

// Function to analyze complexity
function analyzeComplexity(n) {
    return {
        input: n,
        expectedResult: (n * (n + 1)) / 2,
        timeComplexities: {
            bruteForce: 'O(n)',
            simpleRecursion: 'O(n)',
            optimized: 'O(1)',
            tailRecursion: 'O(n)',
            memoized: 'O(n)',
            divideConquer: 'O(log n)'
        },
        spaceComplexities: {
            bruteForce: 'O(1)',
            simpleRecursion: 'O(n)',
            optimized: 'O(1)',
            tailRecursion: 'O(n)',
            memoized: 'O(n)',
            divideConquer: 'O(log n)'
        },
        recommendation: n <= 1000 ? 'Use optimized formula' : 'Use optimized formula (always best)'
    };
}

// ============= VARIATIONS =============

// Sum of first n even numbers
function sumOfFirstNEven(n) {
    if (n <= 0) return 0;
    if (n === 1) return 2;
    
    return (2 * n) + sumOfFirstNEven(n - 1);
}

// Sum of first n odd numbers
function sumOfFirstNOdd(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    return (2 * n - 1) + sumOfFirstNOdd(n - 1);
}

// Sum of squares of first n numbers
function sumOfSquares(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    return (n * n) + sumOfSquares(n - 1);
}

// Sum of cubes of first n numbers
function sumOfCubes(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    return (n * n * n) + sumOfCubes(n - 1);
}

// Sum with custom step
function sumWithStep(n, step = 1) {
    if (n <= 0) return 0;
    
    const current = n * step;
    if (n === 1) return current;
    
    return current + sumWithStep(n - 1, step);
}

// ============= TEST CASES =============
function testSumOfFirstN() {
    const testCases = [
        0,    // Expected: 0
        1,    // Expected: 1
        2,    // Expected: 3 (1+2)
        3,    // Expected: 6 (1+2+3)
        4,    // Expected: 10 (1+2+3+4)
        5,    // Expected: 15 (1+2+3+4+5)
        10,   // Expected: 55
        100,  // Expected: 5050
        -5,   // Expected: 0 (edge case)
        1000  // Expected: 500500
    ];
    
    console.log("=== Sum of First N Numbers Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: n = ${testCase}`);
        
        // Validate input
        const validation = validateInput(testCase);
        if (!validation.valid) {
            console.log(`Invalid input: ${validation.reason}`);
            return;
        }
        
        // Show visualization for small numbers
        if (testCase <= 10 && testCase > 0) {
            console.log(`Visualization: ${visualizeSumCalculation(testCase)}`);
        }
        
        // Test all approaches
        console.log(`Brute Force: ${sumOfFirstNBruteForce(testCase)}`);
        console.log(`Simple Recursion: ${sumOfFirstNRecursive(testCase)}`);
        console.log(`Optimized: ${sumOfFirstNOptimized(testCase)}`);
        console.log(`Tail Recursion: ${sumOfFirstNTailRecursive(testCase)}`);
        console.log(`Memoized: ${sumOfFirstNMemoized(testCase)}`);
        console.log(`Divide & Conquer: ${sumOfFirstNDivideConquer(testCase)}`);
        
        // Show complexity analysis
        if (testCase > 0) {
            const analysis = analyzeComplexity(testCase);
            console.log(`Expected: ${analysis.expectedResult}`);
            console.log(`Recommendation: ${analysis.recommendation}`);
        }
    });
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    const n = 5;
    console.log(`\nFor n = ${n}:`);
    console.log(`Sum of first ${n} natural numbers: ${sumOfFirstNOptimized(n)}`);
    console.log(`Sum of first ${n} even numbers: ${sumOfFirstNEven(n)}`);
    console.log(`Sum of first ${n} odd numbers: ${sumOfFirstNOdd(n)}`);
    console.log(`Sum of squares of first ${n} numbers: ${sumOfSquares(n)}`);
    console.log(`Sum of cubes of first ${n} numbers: ${sumOfCubes(n)}`);
    console.log(`Sum with step 3: ${sumWithStep(n, 3)}`);
    console.log(`Sum from 3 to 7: ${sumOfRange(3, 7)}`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const testSizes = [100, 1000, 10000];
    
    testSizes.forEach(size => {
        console.log(`\nTesting with n = ${size}:`);
        compareAllApproaches(size);
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. Step-by-step recursion for n=4:");
    showRecursionSteps(4);
    
    console.log("\n2. Mathematical insight:");
    console.log("Sum of 1 to n = n * (n + 1) / 2");
    console.log("This formula comes from pairing numbers:");
    console.log("1 + n = (n + 1)");
    console.log("2 + (n-1) = (n + 1)");
    console.log("...");
    console.log("We have n/2 such pairs, each summing to (n + 1)");
    
    console.log("\n3. Recursion vs Iteration trade-offs:");
    console.log("Recursion: More elegant, but uses O(n) space");
    console.log("Iteration: Less elegant, but uses O(1) space");
    console.log("Formula: Most efficient, O(1) time and space");
}

// Interactive learning function
function interactiveLearning(n) {
    console.log(`\n=== Interactive Learning for n=${n} ===`);
    
    console.log("\n1. Problem understanding:");
    console.log(`Find sum of: ${visualizeSumCalculation(n)}`);
    
    console.log("\n2. Recursive thinking:");
    console.log(`sum(${n}) = ${n} + sum(${n - 1})`);
    console.log(`sum(${n - 1}) = ${n - 1} + sum(${n - 2})`);
    console.log("...");
    console.log("sum(1) = 1 (base case)");
    
    console.log("\n3. Step-by-step execution:");
    const result = showRecursionSteps(n);
    
    console.log("\n4. Complexity analysis:");
    const analysis = analyzeComplexity(n);
    console.log("Time Complexities:", analysis.timeComplexities);
    console.log("Space Complexities:", analysis.spaceComplexities);
    
    return result;
}

// Run tests
testSumOfFirstN();
testVariations();
performanceTest();
educationalDemo();

// Interactive example
interactiveLearning(4);

// Export functions for use in other files
module.exports = {
    sumOfFirstNBruteForce,
    sumOfFirstNRecursive,
    sumOfFirstNOptimized,
    sumOfFirstNTailRecursive,
    sumOfFirstNMemoized,
    sumOfFirstNDivideConquer,
    sumOfRange,
    sumOfFirstNEven,
    sumOfFirstNOdd,
    sumOfSquares,
    sumOfCubes,
    sumWithStep,
    validateInput,
    visualizeSumCalculation,
    showRecursionSteps,
    compareAllApproaches,
    analyzeComplexity,
    interactiveLearning
};
