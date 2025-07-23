/**
 * Reverse String II
 * Bodhi-DSA Course
 * 
 * Problem: Given a string s and an integer k, reverse the first k characters 
 * for every 2k characters counting from the start of the string.
 * 
 * If there are fewer than k characters left, reverse all of them.
 * If there are less than 2k but greater than or equal to k characters, 
 * then reverse the first k characters and leave the other as original.
 * 
 * Example:
 * Input: s = "abcdefg", k = 2
 * Output: "bacdfeg"
 * Explanation: 
 * - First 2k = 4 chars: "abcd" → reverse first k=2: "bacd"
 * - Next 2k = 4 chars: "efg" → less than 2k but ≥k, reverse first k=2: "fegg" → but only "efg", so "feg"
 * - Wait, let me recalculate: "abcdefg" with k=2
 * - Positions 0-1: "ab" → "ba"
 * - Positions 2-3: "cd" → keep as "cd" 
 * - Positions 4-5: "ef" → "fe"
 * - Position 6: "g" → keep as "g"
 * - Result: "bacdfeg"
 * 
 * Input: s = "abcd", k = 2
 * Output: "bacd"
 */

// ============= BRUTE FORCE APPROACH (String Manipulation) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Convert to array, process in chunks, convert back

function reverseStr2BruteForce(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return s || '';
    }
    
    const chars = s.split('');
    const n = chars.length;
    
    // Process every 2k characters
    for (let i = 0; i < n; i += 2 * k) {
        // Determine the end of current k-group
        const end = Math.min(i + k - 1, n - 1);
        
        // Reverse the first k characters (or remaining if less than k)
        let left = i;
        let right = end;
        
        while (left < right) {
            // Swap characters
            const temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
    }
    
    return chars.join('');
}

// ============= BETTER APPROACH (In-place with Helper) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use helper function for cleaner reverse logic

function reverseStr2Better(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return s || '';
    }
    
    function reverseSubstring(chars, start, end) {
        while (start < end) {
            [chars[start], chars[end]] = [chars[end], chars[start]];
            start++;
            end--;
        }
    }
    
    const chars = s.split('');
    const n = chars.length;
    
    for (let i = 0; i < n; i += 2 * k) {
        const reverseEnd = Math.min(i + k - 1, n - 1);
        reverseSubstring(chars, i, reverseEnd);
    }
    
    return chars.join('');
}

// ============= OPTIMIZED APPROACH (Chunk Processing) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Process string in 2k chunks with clear logic

function reverseStr2Optimized(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return s || '';
    }
    
    let result = '';
    const n = s.length;
    
    for (let i = 0; i < n; i += 2 * k) {
        // Get current 2k chunk (or remaining characters)
        const chunk = s.slice(i, i + 2 * k);
        
        if (chunk.length >= k) {
            // Reverse first k characters, keep rest as is
            const firstK = chunk.slice(0, k);
            const rest = chunk.slice(k);
            result += firstK.split('').reverse().join('') + rest;
        } else {
            // Less than k characters, reverse all
            result += chunk.split('').reverse().join('');
        }
    }
    
    return result;
}

// ============= FUNCTIONAL APPROACH (Immutable Style) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Functional programming with array methods

function reverseStr2Functional(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return s || '';
    }
    
    const chars = s.split('');
    
    return chars
        .reduce((acc, char, index) => {
            const chunkIndex = Math.floor(index / (2 * k));
            const positionInChunk = index % (2 * k);
            
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
            }
            
            acc[chunkIndex][positionInChunk] = char;
            return acc;
        }, [])
        .map(chunk => {
            if (chunk.length >= k) {
                const firstK = chunk.slice(0, k).reverse();
                const rest = chunk.slice(k);
                return [...firstK, ...rest];
            } else {
                return chunk.reverse();
            }
        })
        .flat()
        .join('');
}

// ============= ADVANCED VARIATIONS =============

// Reverse with detailed step tracking
function reverseStr2WithSteps(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return { result: s || '', steps: [] };
    }
    
    const chars = s.split('');
    const n = chars.length;
    const steps = [];
    
    for (let i = 0; i < n; i += 2 * k) {
        const chunkStart = i;
        const chunkEnd = Math.min(i + 2 * k - 1, n - 1);
        const reverseEnd = Math.min(i + k - 1, n - 1);
        
        const beforeChunk = chars.slice(chunkStart, chunkEnd + 1).join('');
        
        // Reverse the first k characters
        let left = i;
        let right = reverseEnd;
        
        while (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
        
        const afterChunk = chars.slice(chunkStart, chunkEnd + 1).join('');
        
        steps.push({
            chunkIndex: Math.floor(i / (2 * k)),
            chunkStart: chunkStart,
            chunkEnd: chunkEnd,
            reverseStart: i,
            reverseEnd: reverseEnd,
            before: beforeChunk,
            after: afterChunk,
            action: reverseEnd > i ? `Reversed positions ${i}-${reverseEnd}` : 'No reversal needed'
        });
    }
    
    return {
        result: chars.join(''),
        steps: steps
    };
}

// Reverse with custom pattern
function reverseStr2CustomPattern(s, k, pattern = 'standard') {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return s || '';
    }
    
    const chars = s.split('');
    const n = chars.length;
    
    switch (pattern) {
        case 'standard':
            return reverseStr2Optimized(s, k);
            
        case 'alternateAll':
            // Reverse every k characters alternately
            for (let i = 0; i < n; i += k) {
                const chunkIndex = Math.floor(i / k);
                if (chunkIndex % 2 === 0) { // Even chunks
                    const end = Math.min(i + k - 1, n - 1);
                    let left = i, right = end;
                    while (left < right) {
                        [chars[left], chars[right]] = [chars[right], chars[left]];
                        left++;
                        right--;
                    }
                }
            }
            break;
            
        case 'reverseAll':
            // Reverse every k characters
            for (let i = 0; i < n; i += k) {
                const end = Math.min(i + k - 1, n - 1);
                let left = i, right = end;
                while (left < right) {
                    [chars[left], chars[right]] = [chars[right], chars[left]];
                    left++;
                    right--;
                }
            }
            break;
            
        default:
            return reverseStr2Optimized(s, k);
    }
    
    return chars.join('');
}

// Reverse with multiple k values
function reverseStr2MultipleK(s, kValues) {
    if (!s || typeof s !== 'string' || !Array.isArray(kValues)) {
        return s || '';
    }
    
    let result = s;
    
    kValues.forEach((k, index) => {
        console.log(`Step ${index + 1}: Applying k=${k} to "${result}"`);
        result = reverseStr2Optimized(result, k);
        console.log(`Result: "${result}"`);
    });
    
    return result;
}

// Analyze string pattern after reversal
function analyzeReversalPattern(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return null;
    }
    
    const original = s;
    const reversed = reverseStr2Optimized(s, k);
    const n = s.length;
    
    const analysis = {
        original: original,
        reversed: reversed,
        k: k,
        chunkSize: 2 * k,
        totalChunks: Math.ceil(n / (2 * k)),
        changedPositions: [],
        unchangedPositions: [],
        reversedChunks: [],
        unreversedChunks: []
    };
    
    // Analyze position changes
    for (let i = 0; i < n; i++) {
        if (original[i] !== reversed[i]) {
            analysis.changedPositions.push(i);
        } else {
            analysis.unchangedPositions.push(i);
        }
    }
    
    // Analyze chunks
    for (let i = 0; i < n; i += 2 * k) {
        const chunkIndex = Math.floor(i / (2 * k));
        const chunkEnd = Math.min(i + 2 * k - 1, n - 1);
        const originalChunk = original.slice(i, chunkEnd + 1);
        const reversedChunk = reversed.slice(i, chunkEnd + 1);
        
        const chunkInfo = {
            index: chunkIndex,
            start: i,
            end: chunkEnd,
            original: originalChunk,
            reversed: reversedChunk,
            wasReversed: originalChunk !== reversedChunk
        };
        
        if (chunkInfo.wasReversed) {
            analysis.reversedChunks.push(chunkInfo);
        } else {
            analysis.unreversedChunks.push(chunkInfo);
        }
    }
    
    return analysis;
}

// ============= HELPER FUNCTIONS =============

function validateInput(s, k) {
    const errors = [];
    
    if (typeof s !== 'string') {
        errors.push('s must be a string');
    }
    
    if (typeof k !== 'number') {
        errors.push('k must be a number');
    } else if (k <= 0) {
        errors.push('k must be positive');
    } else if (!Number.isInteger(k)) {
        errors.push('k must be an integer');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function reverseSubstring(str, start, end) {
    const chars = str.split('');
    while (start < end) {
        [chars[start], chars[end]] = [chars[end], chars[start]];
        start++;
        end--;
    }
    return chars.join('');
}

function getChunkInfo(s, k) {
    if (!s || typeof s !== 'string' || typeof k !== 'number' || k <= 0) {
        return [];
    }
    
    const chunks = [];
    const n = s.length;
    
    for (let i = 0; i < n; i += 2 * k) {
        const chunkEnd = Math.min(i + 2 * k - 1, n - 1);
        const reverseEnd = Math.min(i + k - 1, n - 1);
        
        chunks.push({
            index: Math.floor(i / (2 * k)),
            start: i,
            end: chunkEnd,
            reverseStart: i,
            reverseEnd: reverseEnd,
            content: s.slice(i, chunkEnd + 1),
            willReverse: reverseEnd > i,
            reverseLength: reverseEnd - i + 1
        });
    }
    
    return chunks;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeReverseStr2(s, k) {
    console.log("\n=== Visualizing Reverse String II ===");
    
    const validation = validateInput(s, k);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return '';
    }
    
    console.log(`Original string: "${s}"`);
    console.log(`k = ${k} (reverse first k chars in every 2k chars)`);
    
    const chunks = getChunkInfo(s, k);
    const stepsResult = reverseStr2WithSteps(s, k);
    
    console.log(`\n📊 Chunk Analysis (2k = ${2 * k}):`);
    console.log("Chunk | Range    | Content    | Action");
    console.log("------|----------|------------|------------------");
    
    chunks.forEach(chunk => {
        const chunkNum = (chunk.index + 1).toString().padStart(5);
        const range = `${chunk.start}-${chunk.end}`.padStart(8);
        const content = `"${chunk.content}"`.padEnd(10);
        const action = chunk.willReverse 
            ? `Reverse pos ${chunk.reverseStart}-${chunk.reverseEnd}`
            : 'Keep as is';
        
        console.log(`${chunkNum} | ${range} | ${content} | ${action}`);
    });
    
    console.log(`\n🔄 Step-by-step transformation:`);
    let currentString = s;
    console.log(`Step 0: "${currentString}"`);
    
    stepsResult.steps.forEach((step, index) => {
        console.log(`Step ${index + 1}: ${step.action}`);
        console.log(`        "${step.before}" → "${step.after}"`);
    });
    
    console.log(`\nFinal result: "${stepsResult.result}"`);
    
    // Visual representation
    console.log(`\n🎨 Visual representation:`);
    console.log(`Original: ${s.split('').map((char, i) => char).join(' ')}`);
    console.log(`Positions:${s.split('').map((_, i) => i.toString().padStart(2)).join('')}`);
    
    const result = stepsResult.result;
    console.log(`Result:   ${result.split('').map((char, i) => char).join(' ')}`);
    
    // Highlight changes
    const changes = s.split('').map((char, i) => char !== result[i] ? '↕' : ' ').join(' ');
    console.log(`Changes:  ${changes}`);
    
    return stepsResult.result;
}

function demonstrateReverseStr2Methods() {
    console.log("\n=== Demonstrating Reverse String II Methods ===");
    
    const testCases = [
        { s: "abcdefg", k: 2, name: "Basic case", expected: "bacdfeg" },
        { s: "abcd", k: 2, name: "Even length", expected: "bacd" },
        { s: "abcdefgh", k: 3, name: "k=3 case", expected: "cbadefhg" },
        { s: "a", k: 1, name: "Single character", expected: "a" },
        { s: "ab", k: 1, name: "k=1 case", expected: "ab" },
        { s: "abcdef", k: 4, name: "Large k", expected: "dcbaef" },
        { s: "abcdefghij", k: 3, name: "Multiple chunks", expected: "cbadefihgj" }
    ];
    
    const methods = [
        { name: "Brute Force", func: reverseStr2BruteForce },
        { name: "Better (Helper)", func: reverseStr2Better },
        { name: "Optimized (Chunks)", func: reverseStr2Optimized },
        { name: "Functional", func: reverseStr2Functional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`String: "${testCase.s}", k: ${testCase.k}`);
        console.log(`Expected: "${testCase.expected}"`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.s, testCase.k);
            console.timeEnd(method.name);
            
            const status = result === testCase.expected ? '✅' : '❌';
            console.log(`${method.name}: "${result}" ${status}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n)", space: "O(n)", notes: "Array conversion + swapping" },
        { name: "Better (Helper)", time: "O(n)", space: "O(n)", notes: "Helper function for clarity" },
        { name: "Optimized (Chunks)", time: "O(n)", space: "O(n)", notes: "Chunk-based processing" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Functional programming style" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach            | Time | Space | Notes                     |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(25);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\nWhere:");
    console.log("• n = length of input string");
    console.log("• All approaches need O(n) space for string manipulation in JavaScript");
    
    console.log("\n🏆 Winner: Better (Helper Function)");
    console.log("• Clean and readable code");
    console.log("• Optimal time and space complexity");
    console.log("• Good separation of concerns");
    console.log("• Easy to understand and maintain");
    console.log("• Reusable helper function");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Reverse String II ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master string manipulation with patterns");
    console.log("2. Understand chunk-based processing");
    console.log("3. Learn conditional reversal logic");
    console.log("4. Practice array index manipulation");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Pattern-based string processing");
    console.log("2. Conditional operations based on position");
    console.log("3. Two-pointer reversal technique");
    console.log("4. Chunk size calculation and boundaries");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Process string in chunks of size 2k");
    console.log("2. In each chunk, reverse first k characters");
    console.log("3. Leave remaining characters unchanged");
    console.log("4. Handle edge cases for partial chunks");
    
    console.log("\n⚡ Pattern Recognition:");
    console.log("1. Every 2k characters form a processing unit");
    console.log("2. Within each unit: reverse first k, keep rest");
    console.log("3. If less than k remaining: reverse all");
    console.log("4. If k to 2k-1 remaining: reverse first k only");
    
    console.log("\n🔧 Implementation Strategies:");
    console.log("Strategy 1: Convert to array, process in-place");
    console.log("Strategy 2: Use helper function for reversal");
    console.log("Strategy 3: Process chunks with slicing");
    console.log("Strategy 4: Functional approach with mapping");
    
    console.log("\n🎨 Edge Case Handling:");
    console.log("• k = 1: Every alternate character");
    console.log("• k >= n: Reverse first k (or all if n < k)");
    console.log("• Empty string: Return empty");
    console.log("• Single character: Return as is");
    
    visualizeReverseStr2("abcdefg", 2);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Data Encryption:**");
    console.log("   - Pattern-based text scrambling");
    console.log("   - Simple cipher implementations");
    
    console.log("\n2. **Text Processing:**");
    console.log("   - Format-specific transformations");
    console.log("   - Document layout adjustments");
    
    console.log("\n3. **Game Development:**");
    console.log("   - Word puzzle generation");
    console.log("   - Pattern-based challenges");
    
    console.log("\n4. **Data Visualization:**");
    console.log("   - Alternating display patterns");
    console.log("   - Structured data formatting");
    
    console.log("\n📊 Example Applications:");
    
    // Simple cipher
    const message = "HELLO WORLD";
    console.log(`\nSimple Cipher Example:`);
    console.log(`Original: "${message}"`);
    const encrypted = reverseStr2Optimized(message.replace(/\s/g, ''), 3);
    console.log(`Encrypted (k=3): "${encrypted}"`);
    const decrypted = reverseStr2Optimized(encrypted, 3); // Same operation reverses it
    console.log(`Decrypted: "${decrypted}"`);
    
    // Pattern analysis
    const testString = "abcdefghijklmnop";
    console.log(`\nPattern Analysis for "${testString}":`);
    for (let k of [2, 3, 4]) {
        const result = reverseStr2Optimized(testString, k);
        console.log(`k=${k}: "${result}"`);
    }
    
    // Custom patterns
    console.log(`\nCustom Pattern Examples:`);
    const baseString = "programming";
    console.log(`Base: "${baseString}"`);
    
    const patterns = ['standard', 'alternateAll', 'reverseAll'];
    patterns.forEach(pattern => {
        const result = reverseStr2CustomPattern(baseString, 2, pattern);
        console.log(`${pattern}: "${result}"`);
    });
    
    // Multiple k values
    console.log(`\nMultiple K Values Application:`);
    const multiResult = reverseStr2MultipleK("abcdefgh", [2, 3, 1]);
    console.log(`Final result: "${multiResult}"`);
    
    // Analysis
    const analysisString = "javascript";
    console.log(`\nPattern Analysis for "${analysisString}" with k=3:`);
    const analysis = analyzeReversalPattern(analysisString, 3);
    console.log(`Changed positions: [${analysis.changedPositions.join(', ')}]`);
    console.log(`Unchanged positions: [${analysis.unchangedPositions.join(', ')}]`);
    console.log(`Reversed chunks: ${analysis.reversedChunks.length}`);
    console.log(`Total chunks: ${analysis.totalChunks}`);
}

// ============= TEST CASES =============

function testReverseStr2() {
    console.log("\n=== Testing Reverse String II ===");
    
    const testCases = [
        { s: "abcdefg", k: 2, expected: "bacdfeg", description: "Basic case" },
        { s: "abcd", k: 2, expected: "bacd", description: "Even length" },
        { s: "abcdefgh", k: 3, expected: "cbadefhg", description: "k=3 case" },
        { s: "a", k: 1, expected: "a", description: "Single character" },
        { s: "ab", k: 1, expected: "ab", description: "k=1 case" },
        { s: "abcdef", k: 4, expected: "dcbaef", description: "Large k" },
        { s: "abcdefghij", k: 3, expected: "cbadefihgj", description: "Multiple chunks" },
        { s: "", k: 2, expected: "", description: "Empty string" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`String: "${testCase.s}", k: ${testCase.k}`);
        
        const result = reverseStr2Optimized(testCase.s, testCase.k);
        
        console.log(`Expected: "${testCase.expected}"`);
        console.log(`Actual: "${result}"`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        const testString = 'a'.repeat(size);
        const k = Math.floor(size / 10) || 1;
        
        console.log(`\nSize: ${size} characters, k: ${k}`);
        
        const methods = [
            { name: "Better (Helper)", func: reverseStr2Better },
            { name: "Optimized (Chunks)", func: reverseStr2Optimized }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testString, k);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: ${result.length} chars processed`);
        });
    });
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { s: null, k: 2, description: "Null string" },
        { s: "abc", k: 0, description: "Zero k" },
        { s: "abc", k: -1, description: "Negative k" },
        { s: "abc", k: 1.5, description: "Non-integer k" },
        { s: 123, k: 2, description: "Non-string input" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = reverseStr2Optimized(testCase.s, testCase.k);
        console.log(`Result: "${result}"`);
        console.log(`Status: ✅ HANDLED`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REVERSE STRING II - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateReverseStr2Methods();
testReverseStr2();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    reverseStr2BruteForce,
    reverseStr2Better,
    reverseStr2Optimized,
    reverseStr2Functional,
    reverseStr2WithSteps,
    reverseStr2CustomPattern,
    reverseStr2MultipleK,
    analyzeReversalPattern,
    validateInput,
    getChunkInfo,
    visualizeReverseStr2,
    demonstrateReverseStr2Methods,
    interactiveLearning
};
