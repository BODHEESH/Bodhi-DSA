/**
 * Recursion 101
 * Bodhi-DSA Course
 * 
 * Problem: Understand the basics of recursion with clear explanations and examples
 * Learn fundamental concepts: base case, recursive case, call stack
 */

// ============= BASIC RECURSION CONCEPTS =============

// Example 1: Simple countdown
function countdown(n) {
    // Base case: stop when n reaches 0
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    
    console.log(n);
    // Recursive case: call function with n-1
    countdown(n - 1);
}

// Example 2: Count up to n
function countUp(start, end) {
    // Base case: stop when start exceeds end
    if (start > end) {
        return;
    }
    
    console.log(start);
    // Recursive case: call function with start+1
    countUp(start + 1, end);
}

// ============= BRUTE FORCE APPROACH (Iterative) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Print numbers from n to 1 using loop
function printNumbersIterative(n) {
    console.log("=== Iterative Approach ===");
    for (let i = n; i >= 1; i--) {
        console.log(i);
    }
    console.log("Done!");
}

// ============= BETTER APPROACH (Simple Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to call stack
// Print numbers using basic recursion
function printNumbersRecursive(n) {
    // Base case: when n becomes 0 or negative
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    
    // Print current number
    console.log(n);
    
    // Recursive case: call with n-1
    printNumbersRecursive(n - 1);
}

// ============= OPTIMIZED APPROACH (Tail Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) - but can be optimized by compiler
// Use tail recursion for better performance
function printNumbersTailRecursive(n, current = n) {
    // Base case
    if (current <= 0) {
        console.log("Done!");
        return;
    }
    
    console.log(current);
    // Tail recursive call - last operation in function
    return printNumbersTailRecursive(n, current - 1);
}

// ============= RECURSION PATTERNS =============

// Pattern 1: Linear Recursion (one recursive call)
function linearRecursion(n) {
    if (n <= 0) return 0;
    return n + linearRecursion(n - 1);
}

// Pattern 2: Binary Recursion (two recursive calls)
function binaryRecursion(n) {
    if (n <= 1) return n;
    return binaryRecursion(n - 1) + binaryRecursion(n - 2);
}

// Pattern 3: Multiple Recursion (multiple recursive calls)
function multipleRecursion(n, branches = 3) {
    if (n <= 0) return 1;
    
    let sum = 0;
    for (let i = 1; i <= branches; i++) {
        sum += multipleRecursion(n - i, branches);
    }
    return sum;
}

// ============= RECURSION WITH DIFFERENT PARAMETERS =============

// Recursion with accumulator
function recursionWithAccumulator(n, accumulator = 0) {
    if (n <= 0) return accumulator;
    return recursionWithAccumulator(n - 1, accumulator + n);
}

// Recursion with multiple parameters
function recursionMultipleParams(start, end, step = 1) {
    if (start > end) return [];
    return [start].concat(recursionMultipleParams(start + step, end, step));
}

// Recursion with helper function
function recursionWithHelper(n) {
    const result = [];
    
    function helper(current) {
        if (current <= 0) return;
        result.push(current);
        helper(current - 1);
    }
    
    helper(n);
    return result;
}

// ============= RECURSION VISUALIZATION =============

// Function to visualize recursion call stack
function visualizeRecursion(n, depth = 0) {
    const indent = "  ".repeat(depth);
    console.log(`${indent}→ visualizeRecursion(${n}) called`);
    
    // Base case
    if (n <= 0) {
        console.log(`${indent}← Base case reached, returning 0`);
        return 0;
    }
    
    // Recursive case
    console.log(`${indent}  Making recursive call with ${n - 1}`);
    const result = n + visualizeRecursion(n - 1, depth + 1);
    
    console.log(`${indent}← visualizeRecursion(${n}) returning ${result}`);
    return result;
}

// Function to track recursion depth
function trackRecursionDepth(n, maxDepth = 0, currentDepth = 0) {
    maxDepth = Math.max(maxDepth, currentDepth);
    
    if (n <= 0) {
        return { result: 0, maxDepth };
    }
    
    const recursiveResult = trackRecursionDepth(n - 1, maxDepth, currentDepth + 1);
    return {
        result: n + recursiveResult.result,
        maxDepth: recursiveResult.maxDepth
    };
}

// ============= COMMON RECURSION MISTAKES =============

// Mistake 1: Missing base case (causes infinite recursion)
function infiniteRecursion(n) {
    console.log(n);
    // Missing base case - DON'T RUN THIS!
    // return infiniteRecursion(n - 1);
    
    // Correct version:
    if (n <= 0) return;
    return infiniteRecursion(n - 1);
}

// Mistake 2: Wrong base case
function wrongBaseCase(n) {
    // Wrong: base case never reached for positive n
    if (n === 0) return 0;
    return n + wrongBaseCase(n + 1); // This will cause stack overflow
}

// Mistake 3: Not making progress toward base case
function noProgress(n) {
    if (n <= 0) return 0;
    // Wrong: not making progress toward base case
    return n + noProgress(n); // This causes infinite recursion
}

// ============= RECURSION BEST PRACTICES =============

// Best Practice 1: Always have a base case
function bestPracticeBaseCase(n) {
    // Always check base case first
    if (n <= 0) return 0;
    return n + bestPracticeBaseCase(n - 1);
}

// Best Practice 2: Make progress toward base case
function bestPracticeProgress(n) {
    if (n <= 0) return 0;
    // Always move closer to base case
    return n + bestPracticeProgress(n - 1);
}

// Best Practice 3: Handle edge cases
function bestPracticeEdgeCases(n) {
    // Handle negative numbers
    if (n < 0) return 0;
    // Handle zero
    if (n === 0) return 0;
    // Handle positive numbers
    return n + bestPracticeEdgeCases(n - 1);
}

// ============= HELPER FUNCTIONS =============

// Function to measure recursion performance
function measureRecursionPerformance(func, n, iterations = 1000) {
    console.time(`${func.name} with n=${n}`);
    
    for (let i = 0; i < iterations; i++) {
        func(n);
    }
    
    console.timeEnd(`${func.name} with n=${n}`);
}

// Function to compare iterative vs recursive
function compareIterativeVsRecursive(n) {
    console.log(`\n=== Comparing Iterative vs Recursive (n=${n}) ===`);
    
    console.time("Iterative");
    let iterativeSum = 0;
    for (let i = 1; i <= n; i++) {
        iterativeSum += i;
    }
    console.timeEnd("Iterative");
    console.log(`Iterative result: ${iterativeSum}`);
    
    console.time("Recursive");
    const recursiveSum = linearRecursion(n);
    console.timeEnd("Recursive");
    console.log(`Recursive result: ${recursiveSum}`);
    
    console.log(`Results match: ${iterativeSum === recursiveSum}`);
}

// ============= TEST CASES =============
function testRecursionBasics() {
    console.log("=== Recursion 101 Tests ===");
    
    console.log("\n1. Basic Countdown:");
    countdown(5);
    
    console.log("\n2. Count Up:");
    countUp(1, 5);
    
    console.log("\n3. Print Numbers Recursive:");
    printNumbersRecursive(3);
    
    console.log("\n4. Linear Recursion (Sum 1 to n):");
    console.log(`Sum of 1 to 5: ${linearRecursion(5)}`);
    
    console.log("\n5. Binary Recursion (Fibonacci-like):");
    console.log(`Binary recursion for 5: ${binaryRecursion(5)}`);
    
    console.log("\n6. Recursion with Accumulator:");
    console.log(`Sum with accumulator: ${recursionWithAccumulator(5)}`);
    
    console.log("\n7. Recursion with Helper:");
    console.log(`Numbers with helper: [${recursionWithHelper(5)}]`);
    
    console.log("\n8. Multiple Parameters:");
    console.log(`Range 1 to 10 step 2: [${recursionMultipleParams(1, 10, 2)}]`);
}

// Visualization tests
function testRecursionVisualization() {
    console.log("\n=== Recursion Visualization ===");
    
    console.log("\n1. Visualize Recursion Call Stack:");
    const result = visualizeRecursion(3);
    console.log(`Final result: ${result}`);
    
    console.log("\n2. Track Recursion Depth:");
    const depthResult = trackRecursionDepth(5);
    console.log(`Result: ${depthResult.result}, Max Depth: ${depthResult.maxDepth}`);
}

// Performance tests
function testRecursionPerformance() {
    console.log("\n=== Recursion Performance ===");
    
    // Compare different approaches
    compareIterativeVsRecursive(100);
    
    // Test with different sizes
    const testSizes = [10, 100, 500];
    testSizes.forEach(size => {
        console.log(`\nTesting with n=${size}:`);
        measureRecursionPerformance(linearRecursion, size, 100);
    });
}

// Educational examples
function recursionEducationalExamples() {
    console.log("\n=== Educational Examples ===");
    
    console.log("\n1. Understanding Base Case:");
    console.log("Without base case → infinite recursion (stack overflow)");
    console.log("With base case → controlled termination");
    
    console.log("\n2. Understanding Recursive Case:");
    console.log("Each call should move closer to base case");
    console.log("Example: countdown(5) → countdown(4) → countdown(3) → ...");
    
    console.log("\n3. Understanding Call Stack:");
    console.log("Each recursive call is added to call stack");
    console.log("When base case is reached, calls return in reverse order");
    
    console.log("\n4. Memory Usage:");
    console.log("Each recursive call uses stack memory");
    console.log("Deep recursion can cause stack overflow");
    console.log("Tail recursion can be optimized by some compilers");
}

// Interactive learning function
function interactiveRecursionLearning(n) {
    console.log(`\n=== Interactive Recursion Learning (n=${n}) ===`);
    
    console.log("\n1. Step-by-step execution:");
    visualizeRecursion(n);
    
    console.log("\n2. Depth analysis:");
    const analysis = trackRecursionDepth(n);
    console.log(`Maximum call stack depth: ${analysis.maxDepth}`);
    console.log(`Final result: ${analysis.result}`);
    
    console.log("\n3. Memory considerations:");
    console.log(`Stack frames created: ${analysis.maxDepth}`);
    console.log(`Memory usage: O(${analysis.maxDepth})`);
    
    return analysis;
}

// Run all tests
testRecursionBasics();
testRecursionVisualization();
testRecursionPerformance();
recursionEducationalExamples();

// Interactive example
interactiveRecursionLearning(4);

// Export functions for use in other files
module.exports = {
    countdown,
    countUp,
    printNumbersIterative,
    printNumbersRecursive,
    printNumbersTailRecursive,
    linearRecursion,
    binaryRecursion,
    multipleRecursion,
    recursionWithAccumulator,
    recursionMultipleParams,
    recursionWithHelper,
    visualizeRecursion,
    trackRecursionDepth,
    bestPracticeBaseCase,
    bestPracticeProgress,
    bestPracticeEdgeCases,
    measureRecursionPerformance,
    compareIterativeVsRecursive,
    interactiveRecursionLearning
};
