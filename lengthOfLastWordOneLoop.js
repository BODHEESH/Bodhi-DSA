/**
 * Length of Last Word - Approach 2 - One Loop
 * Bodhi-DSA Course
 * 
 * Problem: Given a string s consisting of words and spaces, return the length of the last word.
 * This approach uses a single loop to find the length more efficiently.
 * 
 * Example:
 * Input: s = "Hello World"
 * Output: 5
 * 
 * Input: s = "   fly me   to   the moon  "
 * Output: 4
 * 
 * Input: s = "luffy is still joyboy"
 * Output: 6
 */

// ============= BASIC ONE LOOP APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Single loop from end, skip spaces then count characters

function lengthOfLastWordOneLoop(s) {
    if (!s || typeof s !== 'string') return 0;
    
    const n = s.length;
    if (n === 0) return 0;
    
    let i = n - 1;
    let length = 0;
    let foundWord = false;
    
    // Single loop: skip spaces, then count word characters
    while (i >= 0) {
        if (s[i] === ' ') {
            if (foundWord) {
                // We've found the end of the last word
                break;
            }
            // Still skipping trailing spaces
        } else {
            // Character found
            foundWord = true;
            length++;
        }
        i--;
    }
    
    return length;
}

// ============= OPTIMIZED ONE LOOP APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: More efficient single loop with state tracking

function lengthOfLastWordOneLoopOptimized(s) {
    if (!s || typeof s !== 'string') return 0;
    
    let length = 0;
    let i = s.length - 1;
    
    // Single loop with implicit state machine
    while (i >= 0) {
        if (s[i] !== ' ') {
            length++;
        } else if (length > 0) {
            // Found space after counting characters - we're done
            break;
        }
        i--;
    }
    
    return length;
}

// ============= FORWARD ONE LOOP APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Single forward loop tracking last word length

function lengthOfLastWordForwardLoop(s) {
    if (!s || typeof s !== 'string') return 0;
    
    let lastWordLength = 0;
    let currentWordLength = 0;
    
    // Single forward loop
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            if (currentWordLength > 0) {
                lastWordLength = currentWordLength;
                currentWordLength = 0;
            }
        } else {
            currentWordLength++;
        }
    }
    
    // If string doesn't end with space, current word is the last word
    return currentWordLength > 0 ? currentWordLength : lastWordLength;
}

// ============= REGEX ONE LOOP APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use regex to find last word in single operation

function lengthOfLastWordRegex(s) {
    if (!s || typeof s !== 'string') return 0;
    
    // Match last word (non-space characters at the end, ignoring trailing spaces)
    const match = s.match(/\S+(?=\s*$)/);
    
    return match ? match[0].length : 0;
}

// ============= ADVANCED VARIATIONS =============

// One loop with detailed tracking
function lengthOfLastWordOneLoopDetailed(s) {
    if (!s || typeof s !== 'string') return { length: 0, details: null };
    
    const details = {
        totalChars: s.length,
        spacesSkipped: 0,
        wordCharsFound: 0,
        iterations: 0,
        lastWord: ''
    };
    
    let length = 0;
    let i = s.length - 1;
    let word = '';
    
    while (i >= 0) {
        details.iterations++;
        
        if (s[i] !== ' ') {
            length++;
            word = s[i] + word;
            details.wordCharsFound++;
        } else if (length > 0) {
            break;
        } else {
            details.spacesSkipped++;
        }
        i--;
    }
    
    details.lastWord = word;
    
    return { length: length, details: details };
}

// One loop with multiple word tracking
function analyzeWordsOneLoop(s) {
    if (!s || typeof s !== 'string') return { words: [], lastWordLength: 0 };
    
    const words = [];
    let currentWord = '';
    
    // Single loop to analyze all words
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            if (currentWord.length > 0) {
                words.push({
                    word: currentWord,
                    length: currentWord.length,
                    endIndex: i - 1
                });
                currentWord = '';
            }
        } else {
            currentWord += s[i];
        }
    }
    
    // Handle last word if string doesn't end with space
    if (currentWord.length > 0) {
        words.push({
            word: currentWord,
            length: currentWord.length,
            endIndex: s.length - 1
        });
    }
    
    const lastWordLength = words.length > 0 ? words[words.length - 1].length : 0;
    
    return { words: words, lastWordLength: lastWordLength };
}

// One loop with character classification
function lengthOfLastWordWithClassification(s) {
    if (!s || typeof s !== 'string') return { length: 0, classification: {} };
    
    const classification = {
        letters: 0,
        digits: 0,
        special: 0,
        spaces: 0
    };
    
    let length = 0;
    let i = s.length - 1;
    
    while (i >= 0) {
        const char = s[i];
        
        if (char === ' ') {
            if (length > 0) break;
            classification.spaces++;
        } else {
            length++;
            
            if (/[a-zA-Z]/.test(char)) {
                classification.letters++;
            } else if (/[0-9]/.test(char)) {
                classification.digits++;
            } else {
                classification.special++;
            }
        }
        i--;
    }
    
    return { length: length, classification: classification };
}

// One loop with performance metrics
function lengthOfLastWordWithMetrics(s) {
    if (!s || typeof s !== 'string') return { length: 0, metrics: null };
    
    const startTime = performance.now();
    let comparisons = 0;
    let iterations = 0;
    
    let length = 0;
    let i = s.length - 1;
    
    while (i >= 0) {
        iterations++;
        comparisons++;
        
        if (s[i] !== ' ') {
            length++;
        } else if (length > 0) {
            break;
        }
        i--;
    }
    
    const endTime = performance.now();
    
    const metrics = {
        executionTime: endTime - startTime,
        iterations: iterations,
        comparisons: comparisons,
        efficiency: (s.length - iterations) / s.length * 100
    };
    
    return { length: length, metrics: metrics };
}

// ============= HELPER FUNCTIONS =============

function compareApproaches(s) {
    if (!s || typeof s !== 'string') return null;
    
    const approaches = [
        { name: 'One Loop Basic', func: lengthOfLastWordOneLoop },
        { name: 'One Loop Optimized', func: lengthOfLastWordOneLoopOptimized },
        { name: 'Forward Loop', func: lengthOfLastWordForwardLoop },
        { name: 'Regex', func: lengthOfLastWordRegex }
    ];
    
    const results = {};
    
    approaches.forEach(approach => {
        const startTime = performance.now();
        const result = approach.func(s);
        const endTime = performance.now();
        
        results[approach.name] = {
            result: result,
            time: endTime - startTime
        };
    });
    
    return results;
}

function validateOneLoopResult(s, expected) {
    const methods = [
        lengthOfLastWordOneLoop,
        lengthOfLastWordOneLoopOptimized,
        lengthOfLastWordForwardLoop,
        lengthOfLastWordRegex
    ];
    
    return methods.every(method => method(s) === expected);
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeOneLoopApproach(s) {
    console.log("\n=== Visualizing One Loop Approach ===");
    
    if (!s || typeof s !== 'string') {
        console.log("Invalid input");
        return 0;
    }
    
    console.log(`Input string: "${s}"`);
    console.log(`String length: ${s.length}`);
    
    // Show string with indices
    console.log("\nString with indices:");
    for (let i = 0; i < s.length; i++) {
        process.stdout.write(`${i.toString().padStart(2)} `);
    }
    console.log();
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i] === ' ' ? '·' : s[i];
        process.stdout.write(`${char.padStart(2)} `);
    }
    console.log();
    
    // Trace execution
    console.log("\nExecution trace (backward):");
    let length = 0;
    let i = s.length - 1;
    let step = 0;
    
    while (i >= 0) {
        step++;
        const char = s[i];
        const displayChar = char === ' ' ? 'SPACE' : `'${char}'`;
        
        if (char !== ' ') {
            length++;
            console.log(`Step ${step}: Position ${i} = ${displayChar} → Count (length = ${length})`);
        } else if (length > 0) {
            console.log(`Step ${step}: Position ${i} = ${displayChar} → Stop (found word end)`);
            break;
        } else {
            console.log(`Step ${step}: Position ${i} = ${displayChar} → Skip (trailing space)`);
        }
        i--;
    }
    
    console.log(`\nFinal result: ${length}`);
    return length;
}

function demonstrateOneLoopMethods() {
    console.log("\n=== Demonstrating One Loop Methods ===");
    
    const testCases = [
        { input: "Hello World", name: "Basic case" },
        { input: "   fly me   to   the moon  ", name: "Multiple spaces" },
        { input: "luffy is still joyboy", name: "No trailing spaces" },
        { input: "a", name: "Single character" },
        { input: "   ", name: "Only spaces" },
        { input: "", name: "Empty string" },
        { input: "word", name: "Single word" },
        { input: "  single  ", name: "Single word with spaces" }
    ];
    
    const methods = [
        { name: "One Loop Basic", func: lengthOfLastWordOneLoop },
        { name: "One Loop Optimized", func: lengthOfLastWordOneLoopOptimized },
        { name: "Forward Loop", func: lengthOfLastWordForwardLoop },
        { name: "Regex", func: lengthOfLastWordRegex }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: "${testCase.input}"`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.input);
            console.timeEnd(method.name);
            
            console.log(`${method.name}: ${result}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "One Loop Basic", time: "O(n)", space: "O(1)", notes: "State tracking" },
        { name: "One Loop Optimized", time: "O(n)", space: "O(1)", notes: "Implicit state" },
        { name: "Forward Loop", time: "O(n)", space: "O(1)", notes: "Full traversal" },
        { name: "Regex", time: "O(n)", space: "O(1)", notes: "Pattern matching" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Approach           | Time | Space | Notes           |");
    console.log("=".repeat(80));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(15);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log("\n🏆 Winner: One Loop Optimized");
    console.log("• O(n) time - worst case visits each character once");
    console.log("• O(1) space - minimal variable usage");
    console.log("• Single loop with implicit state machine");
    console.log("• Early termination when word boundary found");
    console.log("• Clean and readable implementation");
    
    console.log("\n📊 Comparison with Two Loops:");
    console.log("• One Loop: Single traversal with state");
    console.log("• Two Loops: Separate phases (skip, count)");
    console.log("• Both have same complexity but different clarity");
    console.log("• One loop can be more efficient in practice");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Length of Last Word (One Loop) ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master single-loop algorithm design");
    console.log("2. Understand state machine concepts");
    console.log("3. Learn implicit vs explicit state tracking");
    console.log("4. Compare one-loop vs two-loop approaches");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Single loop with state tracking");
    console.log("2. Implicit state machine (skipping vs counting)");
    console.log("3. Early termination on word boundary");
    console.log("4. Backward traversal for efficiency");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Start from end and move backward");
    console.log("2. Track state: skipping spaces or counting chars");
    console.log("3. When in counting state and hit space → stop");
    console.log("4. Return accumulated count");
    
    console.log("\n⚡ State Machine Logic:");
    console.log("State 1: Skipping trailing spaces");
    console.log("State 2: Counting word characters");
    console.log("Transition: Space → Char (skip to count)");
    console.log("Termination: Char → Space (count to stop)");
    
    console.log("\n🔧 Implementation Patterns:");
    console.log("Pattern 1: Explicit state variable");
    console.log("Pattern 2: Implicit state (length > 0)");
    console.log("Pattern 3: Forward loop with tracking");
    console.log("Pattern 4: Regex pattern matching");
    
    console.log("\n🎨 Visual State Machine:");
    console.log("Input: 'hello world  '");
    console.log("  ← ← (skip spaces)");
    console.log("d l r o w (count chars)");
    console.log("Result: 5");
    
    visualizeOneLoopApproach("  hello world  ");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Stream Processing:**");
    console.log("   - Process data in single pass");
    console.log("   - Real-time text analysis");
    
    console.log("\n2. **Memory Efficiency:**");
    console.log("   - Minimal memory footprint");
    console.log("   - Embedded systems programming");
    
    console.log("\n3. **Performance Critical:**");
    console.log("   - High-frequency text processing");
    console.log("   - Game development text parsing");
    
    console.log("\n4. **Algorithm Design:**");
    console.log("   - Template for single-pass algorithms");
    console.log("   - State machine implementations");
    
    console.log("\n📊 Example Applications:");
    
    // Performance comparison
    const testString = "The quick brown fox jumps over the lazy dog";
    console.log(`\nTest string: "${testString}"`);
    
    const comparison = compareApproaches(testString);
    console.log("\nPerformance comparison:");
    Object.entries(comparison).forEach(([name, data]) => {
        console.log(`${name}: ${data.result} (${data.time.toFixed(4)}ms)`);
    });
    
    // Detailed analysis
    const detailed = lengthOfLastWordOneLoopDetailed(testString);
    console.log(`\nDetailed analysis:`);
    console.log(`Last word: "${detailed.details.lastWord}"`);
    console.log(`Length: ${detailed.length}`);
    console.log(`Iterations: ${detailed.details.iterations}`);
    console.log(`Spaces skipped: ${detailed.details.spacesSkipped}`);
    
    // Character classification
    const classified = lengthOfLastWordWithClassification("hello123!");
    console.log(`\nCharacter classification for "hello123!":`);
    console.log(`Length: ${classified.length}`);
    console.log(`Classification:`, classified.classification);
    
    // Multiple words analysis
    const multiWords = analyzeWordsOneLoop("one two three four");
    console.log(`\nMultiple words analysis:`);
    console.log(`Words found: ${multiWords.words.length}`);
    console.log(`Last word length: ${multiWords.lastWordLength}`);
    multiWords.words.forEach((word, i) => {
        console.log(`  Word ${i + 1}: "${word.word}" (length: ${word.length})`);
    });
}

// ============= TEST CASES =============

function testLengthOfLastWordOneLoop() {
    console.log("\n=== Testing Length of Last Word (One Loop) ===");
    
    const testCases = [
        { input: "Hello World", expected: 5, description: "Basic case" },
        { input: "   fly me   to   the moon  ", expected: 4, description: "Multiple spaces" },
        { input: "luffy is still joyboy", expected: 6, description: "No trailing spaces" },
        { input: "a", expected: 1, description: "Single character" },
        { input: "   ", expected: 0, description: "Only spaces" },
        { input: "", expected: 0, description: "Empty string" },
        { input: "word", expected: 4, description: "Single word" },
        { input: "  single  ", expected: 6, description: "Single word with spaces" },
        { input: "a b c", expected: 1, description: "Single char words" },
        { input: "test", expected: 4, description: "No spaces" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Input: "${testCase.input}"`);
        
        const result = lengthOfLastWordOneLoopOptimized(testCase.input);
        const allMatch = validateOneLoopResult(testCase.input, testCase.expected);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`All methods match: ${allMatch ? '✅' : '❌'}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance comparison test
    console.log("\n--- Performance Comparison Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        const testString = "word ".repeat(size - 1) + "lastword";
        console.log(`\nString size: ${size} words`);
        
        const methods = [
            { name: "One Loop", func: lengthOfLastWordOneLoopOptimized },
            { name: "Forward Loop", func: lengthOfLastWordForwardLoop },
            { name: "Regex", func: lengthOfLastWordRegex }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testString);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: ${result}`);
        });
    });
    
    // Metrics test
    console.log("\n--- Efficiency Metrics Test ---");
    const metricsTest = "   hello world   ";
    const metrics = lengthOfLastWordWithMetrics(metricsTest);
    
    console.log(`Input: "${metricsTest}"`);
    console.log(`Result: ${metrics.length}`);
    console.log(`Execution time: ${metrics.metrics.executionTime.toFixed(4)}ms`);
    console.log(`Iterations: ${metrics.metrics.iterations}`);
    console.log(`Efficiency: ${metrics.metrics.efficiency.toFixed(2)}%`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 LENGTH OF LAST WORD (ONE LOOP) - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateOneLoopMethods();
testLengthOfLastWordOneLoop();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    lengthOfLastWordOneLoop,
    lengthOfLastWordOneLoopOptimized,
    lengthOfLastWordForwardLoop,
    lengthOfLastWordRegex,
    lengthOfLastWordOneLoopDetailed,
    analyzeWordsOneLoop,
    compareApproaches,
    visualizeOneLoopApproach,
    demonstrateOneLoopMethods,
    interactiveLearning
};
