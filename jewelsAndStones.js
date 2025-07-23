/**
 * Jewels and Stones
 * Bodhi-DSA Course
 * 
 * Problem: You're given strings jewels representing the types of stones that are jewels,
 * and stones representing the stones you have. Each character in stones is a type of stone you have.
 * You want to know how many of the stones you have are also jewels.
 * 
 * Letters are case sensitive, so "a" is considered a different type of stone from "A".
 * 
 * Example:
 * Input: jewels = "aA", stones = "aAAbbbb"
 * Output: 3
 * Explanation: The stones "aAA" are jewels.
 * 
 * Input: jewels = "z", stones = "ZZ"
 * Output: 0
 * Explanation: No stones are jewels (case sensitive).
 */

// ============= BRUTE FORCE APPROACH (Nested Loops) =============
// Time Complexity: O(n*m) | Space Complexity: O(1)
// Algorithm: For each stone, check if it's in jewels string

function numJewelsInStonesBruteForce(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return 0;
    }
    
    let count = 0;
    
    // Check each stone
    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        
        // Check if this stone is a jewel
        for (let j = 0; j < jewels.length; j++) {
            if (stone === jewels[j]) {
                count++;
                break; // Found match, no need to check further
            }
        }
    }
    
    return count;
}

// ============= BETTER APPROACH (String includes) =============
// Time Complexity: O(n*m) | Space Complexity: O(1)
// Algorithm: Use string includes method for cleaner code

function numJewelsInStonesBetter(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return 0;
    }
    
    let count = 0;
    
    for (let i = 0; i < stones.length; i++) {
        if (jewels.includes(stones[i])) {
            count++;
        }
    }
    
    return count;
}

// ============= OPTIMIZED APPROACH (Set for O(1) lookup) =============
// Time Complexity: O(n+m) | Space Complexity: O(m)
// Algorithm: Use Set for constant time jewel lookup

function numJewelsInStonesOptimized(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return 0;
    }
    
    // Create set of jewels for O(1) lookup
    const jewelSet = new Set(jewels);
    
    let count = 0;
    
    // Check each stone against the set
    for (let i = 0; i < stones.length; i++) {
        if (jewelSet.has(stones[i])) {
            count++;
        }
    }
    
    return count;
}

// ============= FUNCTIONAL APPROACH (Filter and reduce) =============
// Time Complexity: O(n+m) | Space Complexity: O(m)
// Algorithm: Functional programming style with filter

function numJewelsInStonesFunctional(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return 0;
    }
    
    const jewelSet = new Set(jewels);
    
    return stones
        .split('')
        .filter(stone => jewelSet.has(stone))
        .length;
}

// ============= ADVANCED VARIATIONS =============

// Count jewels with detailed breakdown
function numJewelsInStonesDetailed(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return { total: 0, breakdown: {}, jewelTypes: 0 };
    }
    
    const jewelSet = new Set(jewels);
    const breakdown = {};
    let total = 0;
    
    // Initialize breakdown for all jewel types
    for (let jewel of jewels) {
        if (!breakdown[jewel]) {
            breakdown[jewel] = 0;
        }
    }
    
    // Count each stone
    for (let stone of stones) {
        if (jewelSet.has(stone)) {
            breakdown[stone] = (breakdown[stone] || 0) + 1;
            total++;
        }
    }
    
    return {
        total: total,
        breakdown: breakdown,
        jewelTypes: Object.keys(breakdown).filter(key => breakdown[key] > 0).length
    };
}

// Count with stone analysis
function analyzeJewelsAndStones(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return null;
    }
    
    const jewelSet = new Set(jewels);
    const stoneFrequency = {};
    const jewelStones = [];
    const nonJewelStones = [];
    
    // Analyze each stone
    for (let stone of stones) {
        stoneFrequency[stone] = (stoneFrequency[stone] || 0) + 1;
        
        if (jewelSet.has(stone)) {
            jewelStones.push(stone);
        } else {
            nonJewelStones.push(stone);
        }
    }
    
    return {
        totalStones: stones.length,
        jewelCount: jewelStones.length,
        nonJewelCount: nonJewelStones.length,
        jewelPercentage: (jewelStones.length / stones.length * 100).toFixed(2),
        stoneFrequency: stoneFrequency,
        uniqueStones: Object.keys(stoneFrequency).length,
        jewelStones: jewelStones,
        nonJewelStones: nonJewelStones
    };
}

// Case-insensitive version
function numJewelsInStonesCaseInsensitive(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return 0;
    }
    
    const jewelSet = new Set(jewels.toLowerCase());
    let count = 0;
    
    for (let stone of stones) {
        if (jewelSet.has(stone.toLowerCase())) {
            count++;
        }
    }
    
    return count;
}

// Count with position tracking
function numJewelsInStonesWithPositions(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return { count: 0, positions: [] };
    }
    
    const jewelSet = new Set(jewels);
    const positions = [];
    let count = 0;
    
    for (let i = 0; i < stones.length; i++) {
        if (jewelSet.has(stones[i])) {
            count++;
            positions.push({
                index: i,
                stone: stones[i],
                isJewel: true
            });
        }
    }
    
    return { count: count, positions: positions };
}

// Performance comparison
function compareJewelCountingMethods(jewels, stones) {
    if (!jewels || !stones || typeof jewels !== 'string' || typeof stones !== 'string') {
        return null;
    }
    
    const methods = [
        { name: 'Brute Force', func: numJewelsInStonesBruteForce },
        { name: 'Better (includes)', func: numJewelsInStonesBetter },
        { name: 'Optimized (Set)', func: numJewelsInStonesOptimized },
        { name: 'Functional', func: numJewelsInStonesFunctional }
    ];
    
    const results = {};
    
    methods.forEach(method => {
        const startTime = performance.now();
        const result = method.func(jewels, stones);
        const endTime = performance.now();
        
        results[method.name] = {
            result: result,
            time: endTime - startTime,
            correct: result === numJewelsInStonesOptimized(jewels, stones)
        };
    });
    
    return results;
}

// ============= HELPER FUNCTIONS =============

function validateInput(jewels, stones) {
    const errors = [];
    
    if (typeof jewels !== 'string') {
        errors.push('jewels must be a string');
    }
    
    if (typeof stones !== 'string') {
        errors.push('stones must be a string');
    }
    
    if (typeof jewels === 'string' && jewels.length === 0) {
        errors.push('jewels cannot be empty');
    }
    
    if (typeof stones === 'string' && stones.length === 0) {
        errors.push('stones cannot be empty');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getUniqueCharacters(str) {
    return [...new Set(str)];
}

function getCharacterFrequency(str) {
    const frequency = {};
    for (let char of str) {
        frequency[char] = (frequency[char] || 0) + 1;
    }
    return frequency;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeJewelCounting(jewels, stones) {
    console.log("\n=== Visualizing Jewel Counting ===");
    
    const validation = validateInput(jewels, stones);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return 0;
    }
    
    console.log(`Jewels: "${jewels}"`);
    console.log(`Stones: "${stones}"`);
    
    const jewelSet = new Set(jewels);
    console.log(`Jewel types: {${[...jewelSet].join(', ')}}`);
    
    let count = 0;
    console.log("\nChecking each stone:");
    
    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        const isJewel = jewelSet.has(stone);
        
        if (isJewel) {
            count++;
            console.log(`Position ${i}: '${stone}' → ✅ JEWEL (count: ${count})`);
        } else {
            console.log(`Position ${i}: '${stone}' → ❌ Not a jewel`);
        }
    }
    
    console.log(`\nTotal jewels found: ${count}`);
    
    return count;
}

function demonstrateJewelMethods() {
    console.log("\n=== Demonstrating Jewel Counting Methods ===");
    
    const testCases = [
        { jewels: "aA", stones: "aAAbbbb", name: "Basic case" },
        { jewels: "z", stones: "ZZ", name: "Case sensitive" },
        { jewels: "abc", stones: "aabbccdd", name: "Multiple jewel types" },
        { jewels: "x", stones: "xxxxxx", name: "All jewels" },
        { jewels: "xyz", stones: "abcdef", name: "No jewels" },
        { jewels: "aA", stones: "a", name: "Single stone" },
        { jewels: "a", stones: "", name: "Empty stones" },
        { jewels: "", stones: "abc", name: "Empty jewels" }
    ];
    
    const methods = [
        { name: "Brute Force", func: numJewelsInStonesBruteForce },
        { name: "Better (includes)", func: numJewelsInStonesBetter },
        { name: "Optimized (Set)", func: numJewelsInStonesOptimized },
        { name: "Functional", func: numJewelsInStonesFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Jewels: "${testCase.jewels}", Stones: "${testCase.stones}"`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.jewels, testCase.stones);
            console.timeEnd(method.name);
            
            console.log(`${method.name}: ${result}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n*m)", space: "O(1)", notes: "Nested loops" },
        { name: "Better (includes)", time: "O(n*m)", space: "O(1)", notes: "String includes" },
        { name: "Optimized (Set)", time: "O(n+m)", space: "O(m)", notes: "Hash set lookup" },
        { name: "Functional", time: "O(n+m)", space: "O(m)", notes: "Functional style" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Approach           | Time    | Space | Notes           |");
    console.log("=".repeat(80));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(7);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(15);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log("\nWhere:");
    console.log("• n = length of stones string");
    console.log("• m = length of jewels string");
    
    console.log("\n🏆 Winner: Optimized (Set)");
    console.log("• O(n+m) time - linear complexity");
    console.log("• O(m) space - stores jewel types in set");
    console.log("• O(1) lookup time for each stone");
    console.log("• Scales well with large inputs");
    console.log("• Most practical for real-world use");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Jewels and Stones ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master hash set optimization technique");
    console.log("2. Understand time complexity trade-offs");
    console.log("3. Learn when to use extra space for speed");
    console.log("4. Compare different lookup strategies");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Character lookup and counting");
    console.log("2. Set data structure for O(1) lookup");
    console.log("3. Space-time complexity trade-offs");
    console.log("4. Case sensitivity in string matching");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Need to check if each stone is a jewel");
    console.log("2. Naive: Check each stone against all jewels");
    console.log("3. Optimized: Pre-process jewels into set");
    console.log("4. Then check each stone in O(1) time");
    
    console.log("\n⚡ Optimization Strategy:");
    console.log("1. Identify repeated operations (jewel lookup)");
    console.log("2. Pre-compute data structure for fast lookup");
    console.log("3. Trade space for time complexity");
    console.log("4. Use appropriate data structure (Set)");
    
    console.log("\n🔧 Implementation Patterns:");
    console.log("Pattern 1: Nested loops (brute force)");
    console.log("Pattern 2: String includes (cleaner)");
    console.log("Pattern 3: Set lookup (optimized)");
    console.log("Pattern 4: Functional approach (modern)");
    
    console.log("\n🎨 Complexity Evolution:");
    console.log("O(n*m) → O(n*m) → O(n+m) → O(n+m)");
    console.log("Nested → includes → Set → Functional");
    
    visualizeJewelCounting("aA", "aAAbbbb");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Inventory Management:**");
    console.log("   - Count valuable items in inventory");
    console.log("   - Filter products by category");
    
    console.log("\n2. **Text Analysis:**");
    console.log("   - Count specific characters in text");
    console.log("   - Analyze character frequency");
    
    console.log("\n3. **Data Validation:**");
    console.log("   - Validate allowed characters");
    console.log("   - Filter valid inputs");
    
    console.log("\n4. **Game Development:**");
    console.log("   - Count collectible items");
    console.log("   - Score calculation systems");
    
    console.log("\n📊 Example Applications:");
    
    // Inventory example
    const valuableItems = "ABCD";
    const inventory = "AAABBCCCDDDEEEFFFxyz";
    console.log(`\nInventory Management:`);
    console.log(`Valuable items: "${valuableItems}"`);
    console.log(`Inventory: "${inventory}"`);
    const valuable = numJewelsInStonesOptimized(valuableItems, inventory);
    console.log(`Valuable items count: ${valuable}`);
    
    // Detailed analysis
    const detailed = numJewelsInStonesDetailed(valuableItems, inventory);
    console.log(`Breakdown:`, detailed.breakdown);
    console.log(`Valuable item types found: ${detailed.jewelTypes}`);
    
    // Text analysis
    const vowels = "aeiouAEIOU";
    const text = "Hello World Programming";
    console.log(`\nText Analysis:`);
    console.log(`Text: "${text}"`);
    console.log(`Vowels: "${vowels}"`);
    const vowelCount = numJewelsInStonesOptimized(vowels, text);
    console.log(`Vowel count: ${vowelCount}`);
    
    // Complete analysis
    const analysis = analyzeJewelsAndStones(vowels, text);
    console.log(`Vowel percentage: ${analysis.jewelPercentage}%`);
    console.log(`Unique characters: ${analysis.uniqueStones}`);
    
    // Position tracking
    const positions = numJewelsInStonesWithPositions("aeiou", "programming");
    console.log(`\nVowel positions in "programming":`);
    positions.positions.forEach(pos => {
        console.log(`  Position ${pos.index}: '${pos.stone}'`);
    });
    
    // Performance comparison
    const largeJewels = "abcdefghijklmnopqrstuvwxyz";
    const largeStones = "a".repeat(1000) + "z".repeat(1000);
    console.log(`\nPerformance comparison (large input):`);
    const comparison = compareJewelCountingMethods(largeJewels, largeStones);
    Object.entries(comparison).forEach(([method, data]) => {
        console.log(`${method}: ${data.result} (${data.time.toFixed(4)}ms)`);
    });
}

// ============= TEST CASES =============

function testJewelsAndStones() {
    console.log("\n=== Testing Jewels and Stones ===");
    
    const testCases = [
        { jewels: "aA", stones: "aAAbbbb", expected: 3, description: "Basic case" },
        { jewels: "z", stones: "ZZ", expected: 0, description: "Case sensitive" },
        { jewels: "abc", stones: "aabbccdd", expected: 6, description: "Multiple jewel types" },
        { jewels: "x", stones: "xxxxxx", expected: 6, description: "All jewels" },
        { jewels: "xyz", stones: "abcdef", expected: 0, description: "No jewels" },
        { jewels: "aA", stones: "a", expected: 1, description: "Single stone" },
        { jewels: "a", stones: "", expected: 0, description: "Empty stones" },
        { jewels: "", stones: "abc", expected: 0, description: "Empty jewels" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Jewels: "${testCase.jewels}", Stones: "${testCase.stones}"`);
        
        const result = numJewelsInStonesOptimized(testCase.jewels, testCase.stones);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        const jewels = "abcdefghijklmnopqrstuvwxyz";
        const stones = "a".repeat(size / 2) + "z".repeat(size / 2);
        
        console.log(`\nSize: ${size} stones`);
        
        const methods = [
            { name: "Brute Force", func: numJewelsInStonesBruteForce },
            { name: "Optimized (Set)", func: numJewelsInStonesOptimized }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(jewels, stones);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: ${result}`);
        });
    });
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { jewels: null, stones: "abc", description: "Null jewels" },
        { jewels: "abc", stones: null, description: "Null stones" },
        { jewels: 123, stones: "abc", description: "Non-string jewels" },
        { jewels: "abc", stones: 123, description: "Non-string stones" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = numJewelsInStonesOptimized(testCase.jewels, testCase.stones);
        console.log(`Result: ${result} (expected: 0)`);
        console.log(`Status: ${result === 0 ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 JEWELS AND STONES - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateJewelMethods();
testJewelsAndStones();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    numJewelsInStonesBruteForce,
    numJewelsInStonesBetter,
    numJewelsInStonesOptimized,
    numJewelsInStonesFunctional,
    numJewelsInStonesDetailed,
    analyzeJewelsAndStones,
    numJewelsInStonesCaseInsensitive,
    validateInput,
    visualizeJewelCounting,
    demonstrateJewelMethods,
    interactiveLearning
};
