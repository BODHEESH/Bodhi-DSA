/**
 * Power of Two
 * Bodhi-DSA Course
 * 
 * Problem: Check if a number is a power of 2 and calculate powers of 2
 * A number is a power of 2 if it can be expressed as 2^k where k >= 0
 */

// ============= BRUTE FORCE APPROACH (Check Power of 2) =============
// Time Complexity: O(log n) | Space Complexity: O(1)
// Keep dividing by 2 until we reach 1 or an odd number
function isPowerOfTwoBruteForce(n) {
    // Handle edge cases
    if (n <= 0) return false;
    
    // Keep dividing by 2
    while (n > 1) {
        if (n % 2 !== 0) {
            return false; // If odd number (other than 1), not a power of 2
        }
        n = Math.floor(n / 2);
    }
    
    return true; // Reached 1, so it's a power of 2
}

// ============= BETTER APPROACH (Bit Manipulation) =============
// Time Complexity: O(1) | Space Complexity: O(1)
// Use bit manipulation: n & (n-1) == 0 for powers of 2
function isPowerOfTwoBetter(n) {
    // Handle edge cases
    if (n <= 0) return false;
    
    // For powers of 2: n & (n-1) == 0
    // Example: 8 (1000) & 7 (0111) = 0
    return (n & (n - 1)) === 0;
}

// ============= OPTIMIZED APPROACH (Logarithm) =============
// Time Complexity: O(1) | Space Complexity: O(1)
// Use logarithm: if log2(n) is an integer, n is a power of 2
function isPowerOfTwoOptimized(n) {
    // Handle edge cases
    if (n <= 0) return false;
    
    // Calculate log base 2
    const log2n = Math.log2(n);
    
    // Check if log2(n) is an integer
    return Number.isInteger(log2n);
}

// ============= RECURSIVE APPROACH (Check Power of 2) =============
// Time Complexity: O(log n) | Space Complexity: O(log n) - due to recursion stack
// Use recursion to check if number is power of 2
function isPowerOfTwoRecursive(n) {
    // Base cases
    if (n <= 0) return false;
    if (n === 1) return true;
    
    // If n is odd (and not 1), it's not a power of 2
    if (n % 2 !== 0) return false;
    
    // Recursive case: check n/2
    return isPowerOfTwoRecursive(n / 2);
}

// ============= CALCULATE POWER OF 2 - ITERATIVE =============
// Time Complexity: O(k) | Space Complexity: O(1)
// Calculate 2^k iteratively
function powerOfTwoIterative(k) {
    // Handle negative exponents
    if (k < 0) return 1 / powerOfTwoIterative(-k);
    
    let result = 1;
    for (let i = 0; i < k; i++) {
        result *= 2;
    }
    
    return result;
}

// ============= CALCULATE POWER OF 2 - RECURSIVE =============
// Time Complexity: O(k) | Space Complexity: O(k) - due to recursion stack
// Calculate 2^k recursively
function powerOfTwoRecursive(k) {
    // Base cases
    if (k === 0) return 1;
    if (k < 0) return 1 / powerOfTwoRecursive(-k);
    
    // Recursive case: 2^k = 2 × 2^(k-1)
    return 2 * powerOfTwoRecursive(k - 1);
}

// ============= CALCULATE POWER OF 2 - OPTIMIZED (Bit Shifting) =============
// Time Complexity: O(1) | Space Complexity: O(1)
// Use bit shifting: 2^k = 1 << k
function powerOfTwoOptimizedBitShift(k) {
    // Handle negative exponents
    if (k < 0) return 1 / powerOfTwoOptimizedBitShift(-k);
    
    // Handle large exponents that would overflow
    if (k >= 31) return Math.pow(2, k); // Fallback to Math.pow
    
    // Use bit shifting: 1 << k = 2^k
    return 1 << k;
}

// ============= FAST EXPONENTIATION (Divide and Conquer) =============
// Time Complexity: O(log k) | Space Complexity: O(log k)
// Use fast exponentiation for calculating 2^k
function powerOfTwoFastExponentiation(k) {
    // Handle negative exponents
    if (k < 0) return 1 / powerOfTwoFastExponentiation(-k);
    
    // Base cases
    if (k === 0) return 1;
    if (k === 1) return 2;
    
    // If k is even: 2^k = (2^(k/2))^2
    if (k % 2 === 0) {
        const half = powerOfTwoFastExponentiation(k / 2);
        return half * half;
    } else {
        // If k is odd: 2^k = 2 × 2^(k-1)
        return 2 * powerOfTwoFastExponentiation(k - 1);
    }
}

// ============= HELPER FUNCTIONS =============

// Function to find the power if number is power of 2
function findPowerOfTwo(n) {
    if (!isPowerOfTwoBetter(n)) {
        return { isPowerOfTwo: false, power: -1 };
    }
    
    // Find the power using log2
    const power = Math.log2(n);
    return { isPowerOfTwo: true, power: power };
}

// Function to generate first n powers of 2
function generatePowersOfTwo(n) {
    const powers = [];
    for (let i = 0; i < n; i++) {
        powers.push({
            power: i,
            value: powerOfTwoOptimizedBitShift(i),
            binary: (1 << i).toString(2)
        });
    }
    return powers;
}

// Function to find next power of 2 greater than n
function nextPowerOfTwo(n) {
    if (n <= 0) return 1;
    
    // If n is already a power of 2, return next power
    if (isPowerOfTwoBetter(n)) {
        return n * 2;
    }
    
    // Find the position of the most significant bit
    let power = 1;
    while (power < n) {
        power *= 2;
    }
    
    return power;
}

// Function to find previous power of 2 less than n
function previousPowerOfTwo(n) {
    if (n <= 1) return 0;
    
    // If n is already a power of 2, return previous power
    if (isPowerOfTwoBetter(n) && n > 1) {
        return n / 2;
    }
    
    // Find the largest power of 2 less than n
    let power = 1;
    while (power * 2 < n) {
        power *= 2;
    }
    
    return power;
}

// Function to count set bits (number of 1s in binary)
function countSetBits(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// Function to visualize binary representation
function visualizeBinary(n, bits = 8) {
    const binary = n.toString(2).padStart(bits, '0');
    const decimal = n;
    const isPower = isPowerOfTwoBetter(n);
    
    return {
        decimal: decimal,
        binary: binary,
        isPowerOfTwo: isPower,
        setBits: countSetBits(n),
        representation: `${decimal} = ${binary}₂`
    };
}

// ============= VARIATIONS =============

// Check if number is power of any base
function isPowerOfBase(n, base) {
    if (n <= 0 || base <= 1) return false;
    if (n === 1) return true;
    
    while (n > 1) {
        if (n % base !== 0) return false;
        n = Math.floor(n / base);
    }
    
    return true;
}

// Find all powers of 2 in a range
function findPowersOfTwoInRange(start, end) {
    const powers = [];
    let power = 0;
    let value = 1;
    
    while (value <= end) {
        if (value >= start) {
            powers.push({ power, value });
        }
        power++;
        value *= 2;
    }
    
    return powers;
}

// Sum of first n powers of 2
function sumOfPowersOfTwo(n) {
    // Sum = 2^0 + 2^1 + 2^2 + ... + 2^(n-1) = 2^n - 1
    return powerOfTwoOptimizedBitShift(n) - 1;
}

// Check if number can be expressed as sum of powers of 2
function canBeExpressedAsSumOfPowersOfTwo(n) {
    // Any positive integer can be expressed as sum of distinct powers of 2
    // This is essentially the binary representation
    if (n <= 0) return false;
    
    const powers = [];
    let temp = n;
    let power = 0;
    
    while (temp > 0) {
        if (temp & 1) {
            powers.push(power);
        }
        temp >>= 1;
        power++;
    }
    
    return {
        possible: true,
        powers: powers,
        sum: powers.reduce((sum, p) => sum + powerOfTwoOptimizedBitShift(p), 0)
    };
}

// ============= TEST CASES =============
function testPowerOfTwo() {
    const testCases = [
        1,    // Expected: true (2^0)
        2,    // Expected: true (2^1)
        3,    // Expected: false
        4,    // Expected: true (2^2)
        5,    // Expected: false
        8,    // Expected: true (2^3)
        16,   // Expected: true (2^4)
        32,   // Expected: true (2^5)
        64,   // Expected: true (2^6)
        100,  // Expected: false
        128,  // Expected: true (2^7)
        256,  // Expected: true (2^8)
        0,    // Expected: false
        -4,   // Expected: false
        1024  // Expected: true (2^10)
    ];
    
    console.log("=== Power of Two Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: n = ${testCase}`);
        
        // Test all approaches for checking power of 2
        console.log(`Brute Force: ${isPowerOfTwoBruteForce(testCase)}`);
        console.log(`Better (Bit Manipulation): ${isPowerOfTwoBetter(testCase)}`);
        console.log(`Optimized (Logarithm): ${isPowerOfTwoOptimized(testCase)}`);
        console.log(`Recursive: ${isPowerOfTwoRecursive(testCase)}`);
        
        // Additional analysis
        const powerInfo = findPowerOfTwo(testCase);
        console.log(`Power Info:`, powerInfo);
        
        const binaryViz = visualizeBinary(testCase);
        console.log(`Binary: ${binaryViz.representation}`);
        console.log(`Set Bits: ${binaryViz.setBits}`);
        
        if (testCase > 0) {
            console.log(`Next Power of 2: ${nextPowerOfTwo(testCase)}`);
            console.log(`Previous Power of 2: ${previousPowerOfTwo(testCase)}`);
        }
    });
}

// Test power calculation
function testPowerCalculation() {
    console.log("\n=== Power Calculation Tests ===");
    
    const powerTests = [0, 1, 2, 3, 4, 5, 8, 10, -2, -3];
    
    powerTests.forEach(k => {
        console.log(`\n2^${k}:`);
        
        if (k >= 0 && k <= 10) {
            console.log(`Iterative: ${powerOfTwoIterative(k)}`);
            console.log(`Recursive: ${powerOfTwoRecursive(k)}`);
        }
        
        if (k >= 0 && k < 31) {
            console.log(`Bit Shift: ${powerOfTwoOptimizedBitShift(k)}`);
        }
        
        console.log(`Fast Exponentiation: ${powerOfTwoFastExponentiation(k)}`);
        console.log(`Math.pow: ${Math.pow(2, k)}`);
    });
}

// Test variations
function testVariations() {
    console.log("\n=== Variations Tests ===");
    
    console.log("\n1. First 10 powers of 2:");
    const powers = generatePowersOfTwo(10);
    powers.forEach(p => {
        console.log(`2^${p.power} = ${p.value} = ${p.binary}₂`);
    });
    
    console.log("\n2. Powers of 2 in range 10-100:");
    const rangePowers = findPowersOfTwoInRange(10, 100);
    console.log(rangePowers);
    
    console.log("\n3. Sum of first 5 powers of 2:");
    console.log(`Sum = ${sumOfPowersOfTwo(5)} (2^5 - 1 = ${(1 << 5) - 1})`);
    
    console.log("\n4. Express 13 as sum of powers of 2:");
    const expression = canBeExpressedAsSumOfPowersOfTwo(13);
    console.log(expression);
    console.log(`13 = ${expression.powers.map(p => `2^${p}`).join(' + ')}`);
    
    console.log("\n5. Check powers of other bases:");
    console.log(`8 is power of 2: ${isPowerOfBase(8, 2)}`);
    console.log(`27 is power of 3: ${isPowerOfBase(27, 3)}`);
    console.log(`16 is power of 4: ${isPowerOfBase(16, 4)}`);
}

// Performance test
function performanceTest() {
    console.log("\n=== Performance Test ===");
    
    const testNumbers = [1024, 1048576, 16777216]; // 2^10, 2^20, 2^24
    const iterations = 100000;
    
    testNumbers.forEach(num => {
        console.log(`\nTesting with n = ${num}:`);
        
        console.time("Brute Force");
        for (let i = 0; i < iterations; i++) {
            isPowerOfTwoBruteForce(num);
        }
        console.timeEnd("Brute Force");
        
        console.time("Bit Manipulation");
        for (let i = 0; i < iterations; i++) {
            isPowerOfTwoBetter(num);
        }
        console.timeEnd("Bit Manipulation");
        
        console.time("Logarithm");
        for (let i = 0; i < iterations; i++) {
            isPowerOfTwoOptimized(num);
        }
        console.timeEnd("Logarithm");
    });
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Educational Demonstration ===");
    
    console.log("\n1. Powers of 2 pattern:");
    console.log("2^0 = 1  = 0001₂");
    console.log("2^1 = 2  = 0010₂");
    console.log("2^2 = 4  = 0100₂");
    console.log("2^3 = 8  = 1000₂");
    console.log("Notice: Each power of 2 has exactly one bit set");
    
    console.log("\n2. Bit manipulation trick:");
    console.log("For any power of 2 n:");
    console.log("n     = ...1000...₂ (one bit set)");
    console.log("n-1   = ...0111...₂ (all bits after that position set)");
    console.log("n & (n-1) = 0 (no common bits)");
    
    console.log("\n3. Examples:");
    const examples = [8, 16, 32];
    examples.forEach(n => {
        const nMinus1 = n - 1;
        const andResult = n & nMinus1;
        console.log(`${n} & ${nMinus1} = ${n.toString(2)} & ${nMinus1.toString(2)} = ${andResult}`);
    });
    
    console.log("\n4. Applications:");
    console.log("- Memory allocation (powers of 2 for efficiency)");
    console.log("- Hash table sizing");
    console.log("- Binary tree operations");
    console.log("- Bit manipulation algorithms");
    console.log("- Computer graphics (texture sizes)");
}

// Interactive learning function
function interactiveLearning(n) {
    console.log(`\n=== Interactive Learning for n=${n} ===`);
    
    console.log("\n1. Check if power of 2:");
    const isPower = isPowerOfTwoBetter(n);
    console.log(`${n} is ${isPower ? '' : 'not '}a power of 2`);
    
    console.log("\n2. Binary analysis:");
    const binary = visualizeBinary(n, 16);
    console.log(`${binary.representation}`);
    console.log(`Set bits: ${binary.setBits}`);
    console.log(`Power of 2 has exactly 1 set bit: ${binary.setBits === 1}`);
    
    console.log("\n3. Bit manipulation check:");
    const nMinus1 = n - 1;
    const andResult = n & nMinus1;
    console.log(`${n} & ${nMinus1} = ${andResult}`);
    console.log(`Result is 0: ${andResult === 0} (confirms power of 2)`);
    
    if (isPower) {
        const powerInfo = findPowerOfTwo(n);
        console.log(`\n4. Power information:`);
        console.log(`${n} = 2^${powerInfo.power}`);
    } else {
        console.log(`\n4. Nearest powers of 2:`);
        console.log(`Previous: ${previousPowerOfTwo(n)}`);
        console.log(`Next: ${nextPowerOfTwo(n)}`);
        
        const expression = canBeExpressedAsSumOfPowersOfTwo(n);
        console.log(`\n5. Express as sum of powers of 2:`);
        console.log(`${n} = ${expression.powers.map(p => `2^${p}`).join(' + ')}`);
    }
    
    return isPower;
}

// Run tests
testPowerOfTwo();
testPowerCalculation();
testVariations();
performanceTest();
educationalDemo();

// Interactive example
interactiveLearning(16);
interactiveLearning(15);

// Export functions for use in other files
module.exports = {
    isPowerOfTwoBruteForce,
    isPowerOfTwoBetter,
    isPowerOfTwoOptimized,
    isPowerOfTwoRecursive,
    powerOfTwoIterative,
    powerOfTwoRecursive,
    powerOfTwoOptimizedBitShift,
    powerOfTwoFastExponentiation,
    findPowerOfTwo,
    generatePowersOfTwo,
    nextPowerOfTwo,
    previousPowerOfTwo,
    countSetBits,
    visualizeBinary,
    isPowerOfBase,
    findPowersOfTwoInRange,
    sumOfPowersOfTwo,
    canBeExpressedAsSumOfPowersOfTwo,
    interactiveLearning
};
