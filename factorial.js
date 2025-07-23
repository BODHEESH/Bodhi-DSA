/**
 * Factorial of N
 * Bodhi-DSA Course
 * 
 * Problem: Calculate factorial of n using recursion
 * Factorial of n = n! = n × (n-1) × (n-2) × ... × 2 × 1
 */

// ============= BRUTE FORCE APPROACH (Iterative) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Use loop to calculate factorial
function factorialBruteForce(n) {
    // Handle edge cases
    if (n < 0) return -1; // Factorial undefined for negative numbers
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

// ============= BETTER APPROACH (Simple Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) - due to call stack
// Use basic recursion
function factorialRecursive(n) {
    // Base cases
    if (n < 0) return -1; // Factorial undefined for negative numbers
    if (n === 0 || n === 1) return 1;
    
    // Recursive case: n! = n × (n-1)!
    return n * factorialRecursive(n - 1);
}

// ============= OPTIMIZED APPROACH (Memoized Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use memoization to avoid recalculating same values
function factorialMemoized(n, memo = {}) {
    // Handle negative numbers
    if (n < 0) return -1;
    
    // Base cases
    if (n === 0 || n === 1) return 1;
    
    // Check if already calculated
    if (memo[n] !== undefined) {
        return memo[n];
    }
    
    // Calculate and store in memo
    memo[n] = n * factorialMemoized(n - 1, memo);
    return memo[n];
}

// ============= ALTERNATIVE: TAIL RECURSION =============
// Time Complexity: O(n) | Space Complexity: O(n) - but can be optimized
// Use tail recursion with accumulator
function factorialTailRecursive(n, accumulator = 1) {
    // Handle negative numbers
    if (n < 0) return -1;
    
    // Base case: when n becomes 0 or 1, return accumulator
    if (n <= 1) return accumulator;
    
    // Tail recursive call: multiply current n with accumulator
    return factorialTailRecursive(n - 1, n * accumulator);
}

// ============= ALTERNATIVE: FUNCTIONAL APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use functional programming methods
function factorialFunctional(n) {
    if (n < 0) return -1;
    if (n <= 1) return 1;
    
    // Create array [1, 2, 3, ..., n] and reduce
    return Array.from({ length: n }, (_, i) => i + 1)
                .reduce((acc, num) => acc * num, 1);
}

// ============= ALTERNATIVE: STIRLING'S APPROXIMATION =============
// Time Complexity: O(1) | Space Complexity: O(1)
// Approximate factorial for large numbers using Stirling's formula
function factorialStirlingApproximation(n) {
    if (n < 0) return -1;
    if (n <= 1) return 1;
    
    // Stirling's approximation: n! ≈ √(2πn) * (n/e)^n
    const e = Math.E;
    const pi = Math.PI;
    
    return Math.sqrt(2 * pi * n) * Math.pow(n / e, n);
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
        return { valid: false, reason: 'Factorial is undefined for negative numbers' };
    }
    
    if (n > 170) {
        return { valid: false, reason: 'Result would be too large (JavaScript limit)' };
    }
    
    return { valid: true };
}

// Function to visualize factorial calculation
function visualizeFactorial(n) {
    if (n < 0) return "Undefined for negative numbers";
    if (n === 0 || n === 1) return `${n}! = 1`;
    
    const terms = [];
    for (let i = n; i >= 1; i--) {
        terms.push(i.toString());
    }
    
    return `${n}! = ${terms.join(' × ')} = ${factorialRecursive(n)}`;
}

// Function to show recursion steps
function showRecursionSteps(n, depth = 0) {
    const indent = "  ".repeat(depth);
    console.log(`${indent}factorial(${n})`);
    
    if (n < 0) {
        console.log(`${indent}→ Invalid: return -1`);
        return -1;
    }
    
    if (n === 0 || n === 1) {
        console.log(`${indent}→ Base case: return 1`);
        return 1;
    }
    
    console.log(`${indent}→ Recursive case: ${n} × factorial(${n - 1})`);
    const recursiveResult = showRecursionSteps(n - 1, depth + 1);
    const result = n * recursiveResult;
    
    console.log(`${indent}→ Return: ${n} × ${recursiveResult} = ${result}`);
    return result;
}

// Function to compare all approaches
function compareAllApproaches(n) {
    console.log(`\n=== Comparing All Approaches for n=${n} ===`);
    
    const approaches = [
        { name: 'Brute Force (Iterative)', func: factorialBruteForce },
        { name: 'Simple Recursion', func: factorialRecursive },
        { name: 'Memoized Recursion', func: factorialMemoized },
        { name: 'Tail Recursion', func: factorialTailRecursive },
        { name: 'Functional', func: factorialFunctional }
    ];
    
    approaches.forEach(approach => {
        console.time(approach.name);
        const result = approach.func(n);
        console.timeEnd(approach.name);
        console.log(`${approach.name}: ${result}`);
    });
    
    // Show Stirling's approximation for comparison
    if (n > 1) {
        const stirling = factorialStirlingApproximation(n);
        const actual = factorialRecursive(n);
        const error = Math.abs(stirling - actual) / actual * 100;
        console.log(`Stirling's Approximation: ${stirling.toExponential(2)} (Error: ${error.toFixed(2)}%)`);
    }
}

// Function to analyze factorial properties
function analyzeFactorial(n) {
    if (n < 0) return { error: 'Invalid input' };
    
    const result = factorialRecursive(n);
    const digits = result.toString().length;
    const trailingZeros = countTrailingZeros(n);
    
    return {
        input: n,
        result: result,
        digits: digits,
        trailingZeros: trailingZeros,
        isLarge: result > Number.MAX_SAFE_INTEGER,
        stirlingApprox: n > 1 ? factorialStirlingApproximation(n) : result,
        growthRate: n > 1 ? result / factorialRecursive(n - 1) : 1
    };
}

// Function to count trailing zeros in factorial
function countTrailingZeros(n) {
    if (n < 0) return 0;
    
    let count = 0;
    
    // Count factors of 5 (since factors of 2 are always more abundant)
    for (let i = 5; Math.floor(n / i) > 0; i *= 5) {
        count += Math.floor(n / i);
    }
    
    return count;
}

// ============= VARIATIONS =============

// Double factorial (n!! = n × (n-2) × (n-4) × ...)
function doubleFactorial(n) {
    if (n < 0) return -1;
    if (n <= 1) return 1;
    
    return n * doubleFactorial(n - 2);
}

// Subfactorial (derangements) - !n
function subfactorial(n) {
    if (n < 0) return -1;
    if (n === 0) return 1;
    if (n === 1) return 0;
    
    return (n - 1) * (subfactorial(n - 1) + subfactorial(n - 2));
}

// Factorial with custom step
function factorialWithStep(n, step = 1) {
    if (n < 0) return -1;
    if (n <= step) return n <= 0 ? 1 : n;
    
    return n * factorialWithStep(n - step, step);
}

// Rising factorial (Pochhammer symbol)
function risingFactorial(x, n) {
    if (n < 0) return -1;
    if (n === 0) return 1;
    
    return x * risingFactorial(x + 1, n - 1);
}

// Falling factorial
function fallingFactorial(x, n) {
    if (n < 0) return -1;
    if (n === 0) return 1;
    
    return x * fallingFactorial(x - 1, n - 1);
}

// ============= TEST CASES =============
function testFactorial() {
    const testCases = [
        0,    // Expected: 1
        1,    // Expected: 1
        2,    // Expected: 2
        3,    // Expected: 6
        4,    // Expected: 24
        5,    // Expected: 120
        6,    // Expected: 720
        10,   // Expected: 3628800
        -1,   // Expected: -1 (invalid)
        15,   // Expected: 1307674368000
        20    // Expected: 2432902008176640000
    ];
    
    console.log("=== Factorial Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: n = ${testCase}`);
        
        // Validate input
        const validation = validateInput(testCase);
        if (!validation.valid) {
            console.log(`Invalid input: ${validation.reason}`);
            if (testCase >= 0) {
                console.log(`Brute Force: ${factorialBruteForce(testCase)}`);
                console.log(`Simple Recursion: ${factorialRecursive(testCase)}`);
            }
            return;
        }
        
        // Show visualization for small numbers
        if (testCase <= 6) {
            console.log(`Visualization: ${visualizeFactorial(testCase)}`);
        }
        
        // Test all approaches
        console.log(`Brute Force: ${factorialBruteForce(testCase)}`);
        console.log(`Simple Recursion: ${factorialRecursive(testCase)}`);
        console.log(`Memoized: ${factorialMemoized(testCase)}`);
        console.log(`Tail Recursion: ${factorialTailRecursive(testCase)}`);
        console.log(`Functional: ${factorialFunctional(testCase)}`);
        
        // Show analysis
        const analysis = analyzeFactorial(testCase);
        console.log(`Analysis:`, analysis);
    });
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    const n = 5;
    console.log(`\nFor n = ${n}:`);
    console.log(`Factorial: ${factorialRecursive(n)}`);
    console.log(`Double Factorial: ${doubleFactorial(n)}`);
    console.log(`Subfactorial: ${subfactorial(n)}`);
    console.log(`Factorial with step 2: ${factorialWithStep(n, 2)}`);
    console.log(`Rising Factorial (5, 3): ${risingFactorial(5, 3)}`);
    console.log(`Falling Factorial (5, 3): ${fallingFactorial(5, 3)}`);
    console.log(`Trailing zeros in ${n}!: ${countTrailingZeros(n)}`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const testSizes = [10, 15, 20];
    
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
    
    console.log("\n2. Factorial growth:");
    console.log("Factorials grow extremely fast:");
    for (let i = 1; i <= 10; i++) {
        console.log(`${i}! = ${factorialRecursive(i)}`);
    }
    
    console.log("\n3. Mathematical properties:");
    console.log("- 0! = 1 by definition");
    console.log("- n! = n × (n-1)!");
    console.log("- Trailing zeros = floor(n/5) + floor(n/25) + floor(n/125) + ...");
    console.log("- Growth rate: n! grows faster than any exponential function");
    
    console.log("\n4. Applications:");
    console.log("- Permutations: n! ways to arrange n objects");
    console.log("- Combinations: C(n,r) = n! / (r! × (n-r)!)");
    console.log("- Probability calculations");
    console.log("- Series expansions (e^x, sin(x), cos(x))");
}

// Interactive learning function
function interactiveLearning(n) {
    console.log(`\n=== Interactive Learning for n=${n} ===`);
    
    const validation = validateInput(n);
    if (!validation.valid) {
        console.log(`Error: ${validation.reason}`);
        return null;
    }
    
    console.log("\n1. Problem understanding:");
    console.log(`Calculate ${n}! = ${visualizeFactorial(n)}`);
    
    console.log("\n2. Recursive thinking:");
    console.log(`${n}! = ${n} × ${n-1}!`);
    console.log(`${n-1}! = ${n-1} × ${n-2}!`);
    console.log("...");
    console.log("1! = 1 (base case)");
    console.log("0! = 1 (by definition)");
    
    console.log("\n3. Step-by-step execution:");
    const result = showRecursionSteps(n);
    
    console.log("\n4. Analysis:");
    const analysis = analyzeFactorial(n);
    console.log(`Result has ${analysis.digits} digits`);
    console.log(`Trailing zeros: ${analysis.trailingZeros}`);
    console.log(`Growth rate from ${n-1}!: ${analysis.growthRate}x`);
    
    return result;
}

// Large number handling demonstration
function largeNumberDemo() {
    console.log("\n=== Large Number Handling ===");
    
    console.log("\nJavaScript number limits:");
    console.log(`MAX_SAFE_INTEGER: ${Number.MAX_SAFE_INTEGER}`);
    console.log(`MAX_VALUE: ${Number.MAX_VALUE}`);
    
    console.log("\nFactorial limits:");
    for (let i = 15; i <= 25; i += 5) {
        const result = factorialRecursive(i);
        const isSafe = result <= Number.MAX_SAFE_INTEGER;
        console.log(`${i}! = ${result} (Safe: ${isSafe})`);
    }
    
    console.log("\nFor very large factorials, consider:");
    console.log("- Using BigInt for exact results");
    console.log("- Using Stirling's approximation for estimates");
    console.log("- Using logarithms: log(n!) = Σ log(i) for i=1 to n");
}

// Run tests
testFactorial();
testVariations();
performanceTest();
educationalDemo();
largeNumberDemo();

// Interactive example
interactiveLearning(5);

// Export functions for use in other files
module.exports = {
    factorialBruteForce,
    factorialRecursive,
    factorialMemoized,
    factorialTailRecursive,
    factorialFunctional,
    factorialStirlingApproximation,
    doubleFactorial,
    subfactorial,
    factorialWithStep,
    risingFactorial,
    fallingFactorial,
    validateInput,
    visualizeFactorial,
    showRecursionSteps,
    compareAllApproaches,
    analyzeFactorial,
    countTrailingZeros,
    interactiveLearning
};
