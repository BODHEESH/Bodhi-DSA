/**
 * Split a String in Balanced Strings
 * Bodhi-DSA Course
 * 
 * Problem: Balanced strings are those that have an equal quantity of 'L' and 'R' characters.
 * Given a balanced string s, split it in the maximum amount of balanced strings.
 * Return the maximum amount of balanced strings you can obtain.
 * 
 * Example:
 * Input: s = "RLRRLLRLRL"
 * Output: 4
 * Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
 * 
 * Input: s = "RLLLLRRRLR"
 * Output: 3
 * Explanation: s can be split into "RLLLLRRR", "L", "R", each substring contains same number of 'L' and 'R'.
 * 
 * Input: s = "LLLLRRRR"
 * Output: 1
 * Explanation: s can be split into "LLLLRRRR".
 */

// ============= BRUTE FORCE APPROACH (Check All Substrings) =============
// Time Complexity: O(n²) | Space Complexity: O(n)
// Algorithm: Generate all possible splits and find maximum balanced substrings

function balancedStringSplitBruteForce(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return 0;
    }
    
    function isBalanced(str) {
        let count = 0;
        for (let char of str) {
            if (char === 'R') count++;
            else if (char === 'L') count--;
        }
        return count === 0;
    }
    
    function findMaxSplits(str, index, currentSplits) {
        if (index === str.length) {
            return currentSplits;
        }
        
        let maxSplits = 0;
        
        // Try all possible next splits
        for (let i = index + 1; i <= str.length; i++) {
            const substring = str.slice(index, i);
            if (isBalanced(substring)) {
                const splits = findMaxSplits(str, i, currentSplits + 1);
                maxSplits = Math.max(maxSplits, splits);
            }
        }
        
        return maxSplits;
    }
    
    return findMaxSplits(s, 0, 0);
}

// ============= BETTER APPROACH (Greedy with Balance Counter) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use counter to track balance, split when balanced

function balancedStringSplitBetter(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return 0;
    }
    
    let balance = 0;
    let splits = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'R') {
            balance++;
        } else if (s[i] === 'L') {
            balance--;
        }
        
        // When balance is 0, we have a balanced substring
        if (balance === 0) {
            splits++;
        }
    }
    
    return splits;
}

// ============= OPTIMIZED APPROACH (Greedy with Early Termination) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Optimized greedy approach with validation

function balancedStringSplitOptimized(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return 0;
    }
    
    // Validate input contains only 'R' and 'L'
    for (let char of s) {
        if (char !== 'R' && char !== 'L') {
            return 0; // Invalid input
        }
    }
    
    let balance = 0;
    let splits = 0;
    
    for (let char of s) {
        balance += (char === 'R') ? 1 : -1;
        
        if (balance === 0) {
            splits++;
        }
    }
    
    return splits;
}

// ============= FUNCTIONAL APPROACH (Reduce) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Functional programming style with reduce

function balancedStringSplitFunctional(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return 0;
    }
    
    const result = s.split('').reduce((acc, char) => {
        acc.balance += (char === 'R') ? 1 : -1;
        
        if (acc.balance === 0) {
            acc.splits++;
        }
        
        return acc;
    }, { balance: 0, splits: 0 });
    
    return result.splits;
}

// ============= ADVANCED VARIATIONS =============

// Split with detailed information
function balancedStringSplitDetailed(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return { 
            splits: 0, 
            substrings: [], 
            positions: [], 
            analysis: null 
        };
    }
    
    let balance = 0;
    let splits = 0;
    let start = 0;
    const substrings = [];
    const positions = [];
    
    for (let i = 0; i < s.length; i++) {
        balance += (s[i] === 'R') ? 1 : -1;
        
        if (balance === 0) {
            const substring = s.slice(start, i + 1);
            substrings.push(substring);
            positions.push({ start: start, end: i, length: i - start + 1 });
            splits++;
            start = i + 1;
        }
    }
    
    const analysis = {
        totalLength: s.length,
        averageSubstringLength: splits > 0 ? s.length / splits : 0,
        shortestSubstring: substrings.length > 0 ? Math.min(...substrings.map(sub => sub.length)) : 0,
        longestSubstring: substrings.length > 0 ? Math.max(...substrings.map(sub => sub.length)) : 0,
        isFullyBalanced: balance === 0
    };
    
    return {
        splits: splits,
        substrings: substrings,
        positions: positions,
        analysis: analysis
    };
}

// Find all possible balanced splits (not necessarily maximum)
function findAllBalancedSplits(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return [];
    }
    
    const allSplits = [];
    
    function backtrack(index, currentSplit, allSubstrings) {
        if (index === s.length) {
            if (currentSplit.length === 0) {
                allSplits.push([...allSubstrings]);
            }
            return;
        }
        
        // Try all possible next balanced substrings
        let balance = 0;
        for (let i = index; i < s.length; i++) {
            balance += (s[i] === 'R') ? 1 : -1;
            
            if (balance === 0) {
                const substring = s.slice(index, i + 1);
                allSubstrings.push(substring);
                backtrack(i + 1, s.slice(i + 1), allSubstrings);
                allSubstrings.pop();
            }
        }
    }
    
    backtrack(0, s, []);
    return allSplits;
}

// Count balance at each position
function getBalanceTrace(s) {
    if (!s || typeof s !== 'string') {
        return [];
    }
    
    const trace = [];
    let balance = 0;
    
    for (let i = 0; i < s.length; i++) {
        balance += (s[i] === 'R') ? 1 : -1;
        trace.push({
            position: i,
            character: s[i],
            balance: balance,
            isBalanced: balance === 0
        });
    }
    
    return trace;
}

// Validate if string can be balanced
function canBeBalanced(s) {
    if (!s || typeof s !== 'string') {
        return false;
    }
    
    let rCount = 0;
    let lCount = 0;
    
    for (let char of s) {
        if (char === 'R') rCount++;
        else if (char === 'L') lCount++;
    }
    
    return rCount === lCount;
}

// Find minimum splits needed
function findMinimumSplits(s) {
    if (!s || typeof s !== 'string' || s.length === 0) {
        return 0;
    }
    
    if (!canBeBalanced(s)) {
        return -1; // Cannot be balanced
    }
    
    // For balanced strings, minimum splits is always 1 (the whole string)
    return 1;
}

// Find maximum possible splits (same as our main solution)
function findMaximumSplits(s) {
    return balancedStringSplitOptimized(s);
}

// ============= HELPER FUNCTIONS =============

function validateBalancedString(s) {
    const errors = [];
    
    if (typeof s !== 'string') {
        errors.push('Input must be a string');
    }
    
    if (typeof s === 'string') {
        if (s.length === 0) {
            errors.push('String cannot be empty');
        }
        
        if (s.length % 2 !== 0) {
            errors.push('String length must be even for balanced strings');
        }
        
        for (let char of s) {
            if (char !== 'R' && char !== 'L') {
                errors.push('String must contain only R and L characters');
                break;
            }
        }
        
        if (!canBeBalanced(s)) {
            errors.push('String must have equal number of R and L characters');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function generateBalancedString(length) {
    if (length % 2 !== 0) {
        throw new Error('Length must be even for balanced string');
    }
    
    const chars = [];
    const half = length / 2;
    
    // Add equal R and L characters
    for (let i = 0; i < half; i++) {
        chars.push('R', 'L');
    }
    
    // Shuffle to create random balanced string
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    return chars.join('');
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeBalancedSplit(s) {
    console.log("\n=== Visualizing Balanced String Split ===");
    
    const validation = validateBalancedString(s);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return 0;
    }
    
    console.log(`Input string: "${s}"`);
    
    const detailed = balancedStringSplitDetailed(s);
    const trace = getBalanceTrace(s);
    
    console.log("\n📊 Character-by-character analysis:");
    console.log("Pos | Char | Balance | Balanced?");
    console.log("----|------|---------|----------");
    
    trace.forEach(item => {
        const pos = item.position.toString().padStart(3);
        const char = item.character.padStart(4);
        const balance = item.balance.toString().padStart(7);
        const balanced = item.isBalanced ? '✅ YES' : '❌ NO';
        console.log(`${pos} | ${char} | ${balance} | ${balanced}`);
    });
    
    console.log(`\n🔄 Balanced substrings found: ${detailed.splits}`);
    console.log("Substrings:");
    detailed.substrings.forEach((substring, index) => {
        const pos = detailed.positions[index];
        console.log(`  ${index + 1}. "${substring}" (positions ${pos.start}-${pos.end}, length: ${pos.length})`);
    });
    
    console.log(`\n📈 Analysis:`);
    console.log(`  Total length: ${detailed.analysis.totalLength}`);
    console.log(`  Average substring length: ${detailed.analysis.averageSubstringLength.toFixed(2)}`);
    console.log(`  Shortest substring: ${detailed.analysis.shortestSubstring}`);
    console.log(`  Longest substring: ${detailed.analysis.longestSubstring}`);
    console.log(`  Fully balanced: ${detailed.analysis.isFullyBalanced ? 'Yes' : 'No'}`);
    
    return detailed.splits;
}

function demonstrateBalancedSplitMethods() {
    console.log("\n=== Demonstrating Balanced Split Methods ===");
    
    const testCases = [
        { s: "RLRRLLRLRL", name: "Basic case", expected: 4 },
        { s: "RLLLLRRRLR", name: "Uneven distribution", expected: 3 },
        { s: "LLLLRRRR", name: "Grouped characters", expected: 1 },
        { s: "RL", name: "Minimum case", expected: 1 },
        { s: "RLRL", name: "Alternating", expected: 2 },
        { s: "RRLLRRLL", name: "Paired groups", expected: 2 },
        { s: "RLRLRLRL", name: "All alternating", expected: 4 }
    ];
    
    const methods = [
        { name: "Brute Force", func: balancedStringSplitBruteForce },
        { name: "Better (Greedy)", func: balancedStringSplitBetter },
        { name: "Optimized", func: balancedStringSplitOptimized },
        { name: "Functional", func: balancedStringSplitFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`String: "${testCase.s}" (Expected: ${testCase.expected})`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.s);
            console.timeEnd(method.name);
            
            const status = result === testCase.expected ? '✅' : '❌';
            console.log(`${method.name}: ${result} ${status}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n²)", space: "O(n)", notes: "Recursive backtracking" },
        { name: "Better (Greedy)", time: "O(n)", space: "O(1)", notes: "Single pass with counter" },
        { name: "Optimized", time: "O(n)", space: "O(1)", notes: "Greedy with validation" },
        { name: "Functional", time: "O(n)", space: "O(1)", notes: "Functional reduce style" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach           | Time  | Space | Notes                    |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\nWhere:");
    console.log("• n = length of input string");
    
    console.log("\n🏆 Winner: Better/Optimized (Greedy)");
    console.log("• O(n) linear time complexity");
    console.log("• O(1) constant space");
    console.log("• Single pass through string");
    console.log("• Greedy approach guarantees maximum splits");
    console.log("• Simple balance counter technique");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Balanced String Split ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master greedy algorithm technique");
    console.log("2. Understand balance counter pattern");
    console.log("3. Learn when greedy gives optimal solution");
    console.log("4. Practice string processing algorithms");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Balanced substring definition");
    console.log("2. Greedy choice property");
    console.log("3. Balance counter technique");
    console.log("4. Maximum vs minimum splits");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Track running balance (R=+1, L=-1)");
    console.log("2. When balance reaches 0, we have balanced substring");
    console.log("3. Greedy: split immediately when balanced");
    console.log("4. This gives maximum number of splits");
    
    console.log("\n⚡ Why Greedy Works:");
    console.log("1. Each balanced substring is independent");
    console.log("2. Splitting early doesn't affect future splits");
    console.log("3. Maximum splits = earliest possible splits");
    console.log("4. No benefit in delaying splits");
    
    console.log("\n🔧 Implementation Patterns:");
    console.log("Pattern 1: Recursive backtracking (brute force)");
    console.log("Pattern 2: Balance counter (greedy)");
    console.log("Pattern 3: Functional reduce");
    console.log("Pattern 4: Detailed analysis with tracking");
    
    console.log("\n🎨 Balance Counter Technique:");
    console.log("• Initialize balance = 0");
    console.log("• For each R: balance++");
    console.log("• For each L: balance--");
    console.log("• When balance = 0: increment splits");
    
    visualizeBalancedSplit("RLRRLLRLRL");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Parentheses Matching:**");
    console.log("   - Balanced parentheses validation");
    console.log("   - Expression parsing");
    
    console.log("\n2. **Load Balancing:**");
    console.log("   - Distribute tasks evenly");
    console.log("   - Resource allocation");
    
    console.log("\n3. **Game Development:**");
    console.log("   - Turn-based game mechanics");
    console.log("   - Team balancing");
    
    console.log("\n4. **Data Structures:**");
    console.log("   - Binary tree balancing");
    console.log("   - Queue management");
    
    console.log("\n📊 Example Applications:");
    
    // Parentheses analogy
    console.log(`\nParentheses Analogy:`);
    const parentheses = "()((())())";
    console.log(`Parentheses: "${parentheses}"`);
    // Convert to RL format for demonstration
    const rlFormat = parentheses.replace(/\(/g, 'R').replace(/\)/g, 'L');
    console.log(`As RL format: "${rlFormat}"`);
    const splits = balancedStringSplitOptimized(rlFormat);
    console.log(`Balanced groups: ${splits}`);
    
    // Generate random balanced strings
    console.log(`\nRandom Balanced Strings:`);
    for (let length of [4, 6, 8]) {
        const randomString = generateBalancedString(length);
        const splits = balancedStringSplitOptimized(randomString);
        console.log(`Length ${length}: "${randomString}" → ${splits} splits`);
    }
    
    // All possible splits analysis
    const testString = "RLRL";
    console.log(`\nAll Possible Splits for "${testString}":`);
    const allSplits = findAllBalancedSplits(testString);
    allSplits.forEach((split, index) => {
        console.log(`  Option ${index + 1}: [${split.map(s => `"${s}"`).join(', ')}]`);
    });
    
    // Balance trace visualization
    const traceString = "RRLLRL";
    console.log(`\nBalance Trace for "${traceString}":`);
    const trace = getBalanceTrace(traceString);
    let visualization = "";
    trace.forEach(item => {
        visualization += item.character;
        if (item.isBalanced) {
            visualization += "|";
        }
    });
    console.log(`Visual: ${visualization}`);
    console.log(`Splits: ${balancedStringSplitOptimized(traceString)}`);
}

// ============= TEST CASES =============

function testBalancedStringSplit() {
    console.log("\n=== Testing Balanced String Split ===");
    
    const testCases = [
        { s: "RLRRLLRLRL", expected: 4, description: "Basic case" },
        { s: "RLLLLRRRLR", expected: 3, description: "Uneven distribution" },
        { s: "LLLLRRRR", expected: 1, description: "Grouped characters" },
        { s: "RL", expected: 1, description: "Minimum case" },
        { s: "RLRL", expected: 2, description: "Alternating" },
        { s: "RRLLRRLL", expected: 2, description: "Paired groups" },
        { s: "RLRLRLRL", expected: 4, description: "All alternating" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`String: "${testCase.s}"`);
        
        const result = balancedStringSplitOptimized(testCase.s);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        const testString = generateBalancedString(size);
        
        console.log(`\nSize: ${size} characters`);
        
        const methods = [
            { name: "Better (Greedy)", func: balancedStringSplitBetter },
            { name: "Optimized", func: balancedStringSplitOptimized }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testString);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: ${result} splits`);
        });
    });
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { s: "", description: "Empty string" },
        { s: "R", description: "Single character" },
        { s: "RRL", description: "Unbalanced string" },
        { s: "RLXY", description: "Invalid characters" },
        { s: null, description: "Null input" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = balancedStringSplitOptimized(testCase.s);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === 0 ? '✅ HANDLED' : '⚠️  CHECK'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 SPLIT A STRING IN BALANCED STRINGS - BODHI DSA COURSE");
console.log("=" .repeat(65));

analyzePerformance();
demonstrateBalancedSplitMethods();
testBalancedStringSplit();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    balancedStringSplitBruteForce,
    balancedStringSplitBetter,
    balancedStringSplitOptimized,
    balancedStringSplitFunctional,
    balancedStringSplitDetailed,
    findAllBalancedSplits,
    getBalanceTrace,
    canBeBalanced,
    validateBalancedString,
    generateBalancedString,
    visualizeBalancedSplit,
    demonstrateBalancedSplitMethods,
    interactiveLearning
};
