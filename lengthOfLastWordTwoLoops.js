/**
 * Length of Last Word - Approach 1 - Two Loops
 * Bodhi-DSA Course
 * 
 * Problem: Given a string s consisting of words and spaces, return the length of the last word.
 * A word is a maximal substring consisting of non-space characters only.
 * 
 * Example:
 * Input: s = "Hello World"
 * Output: 5
 * Explanation: The last word is "World" with length 5.
 * 
 * Input: s = "   fly me   to   the moon  "
 * Output: 4
 * Explanation: The last word is "moon" with length 4.
 * 
 * Input: s = "luffy is still joyboy"
 * Output: 6
 * Explanation: The last word is "joyboy" with length 6.
 */

// ============= BRUTE FORCE APPROACH (Split and Filter) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Split by spaces, filter empty strings, get last word length

function lengthOfLastWordBruteForce(s) {
    if (!s || typeof s !== 'string') return 0;
    
    // Split by spaces and filter out empty strings
    const words = s.split(' ').filter(word => word.length > 0);
    
    if (words.length === 0) return 0;
    
    // Return length of last word
    return words[words.length - 1].length;
}

// ============= BETTER APPROACH (Trim and Split) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Trim whitespace, split, get last element

function lengthOfLastWordBetter(s) {
    if (!s || typeof s !== 'string') return 0;
    
    // Trim leading and trailing spaces
    const trimmed = s.trim();
    
    if (trimmed.length === 0) return 0;
    
    // Split by spaces
    const words = trimmed.split(' ');
    
    // Return length of last word
    return words[words.length - 1].length;
}

// ============= TWO LOOPS APPROACH (Main Focus) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: First loop to find last word start, second loop to count length

function lengthOfLastWordTwoLoops(s) {
    if (!s || typeof s !== 'string') return 0;
    
    const n = s.length;
    if (n === 0) return 0;
    
    // First loop: Skip trailing spaces from the end
    let i = n - 1;
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    // If all characters are spaces
    if (i < 0) return 0;
    
    // Second loop: Count characters of the last word
    let length = 0;
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }
    
    return length;
}

// ============= OPTIMIZED TWO LOOPS (With Early Termination) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Enhanced two loops with better edge case handling

function lengthOfLastWordTwoLoopsOptimized(s) {
    if (!s || typeof s !== 'string') return 0;
    
    const n = s.length;
    if (n === 0) return 0;
    
    let i = n - 1;
    
    // First loop: Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    // Early termination: all spaces
    if (i < 0) return 0;
    
    // Second loop: Count last word characters
    let wordLength = 0;
    while (i >= 0 && s[i] !== ' ') {
        wordLength++;
        i--;
    }
    
    return wordLength;
}

// ============= ADVANCED VARIATIONS =============

// Two loops with word extraction
function lengthOfLastWordWithExtraction(s) {
    if (!s || typeof s !== 'string') return { length: 0, word: '' };
    
    const n = s.length;
    if (n === 0) return { length: 0, word: '' };
    
    let i = n - 1;
    
    // First loop: Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    if (i < 0) return { length: 0, word: '' };
    
    // Second loop: Extract last word
    let word = '';
    while (i >= 0 && s[i] !== ' ') {
        word = s[i] + word; // Prepend character
        i--;
    }
    
    return { length: word.length, word: word };
}

// Two loops with step tracking
function lengthOfLastWordWithSteps(s) {
    if (!s || typeof s !== 'string') return { length: 0, steps: [] };
    
    const steps = [];
    const n = s.length;
    
    if (n === 0) {
        steps.push({ phase: 'validation', message: 'Empty string' });
        return { length: 0, steps: steps };
    }
    
    let i = n - 1;
    
    // First loop: Skip trailing spaces
    steps.push({ phase: 'loop1_start', message: 'Starting to skip trailing spaces', position: i });
    
    while (i >= 0 && s[i] === ' ') {
        steps.push({ phase: 'loop1', message: `Skipping space at position ${i}`, character: s[i] });
        i--;
    }
    
    steps.push({ phase: 'loop1_end', message: 'Finished skipping spaces', position: i });
    
    if (i < 0) {
        steps.push({ phase: 'early_exit', message: 'All characters are spaces' });
        return { length: 0, steps: steps };
    }
    
    // Second loop: Count last word characters
    steps.push({ phase: 'loop2_start', message: 'Starting to count word characters', position: i });
    
    let wordLength = 0;
    while (i >= 0 && s[i] !== ' ') {
        wordLength++;
        steps.push({ phase: 'loop2', message: `Counting character '${s[i]}' at position ${i}`, character: s[i], currentLength: wordLength });
        i--;
    }
    
    steps.push({ phase: 'loop2_end', message: 'Finished counting word', finalLength: wordLength });
    
    return { length: wordLength, steps: steps };
}

// Two loops with multiple words analysis
function analyzeAllWordsWithTwoLoops(s) {
    if (!s || typeof s !== 'string') return { words: [], lastWordLength: 0 };
    
    const words = [];
    const n = s.length;
    let i = 0;
    
    while (i < n) {
        // Skip spaces
        while (i < n && s[i] === ' ') {
            i++;
        }
        
        if (i >= n) break;
        
        // Extract word using two-loop concept
        let wordStart = i;
        let wordLength = 0;
        
        // Count word characters
        while (i < n && s[i] !== ' ') {
            wordLength++;
            i++;
        }
        
        const word = s.substring(wordStart, wordStart + wordLength);
        words.push({ word: word, length: wordLength, startIndex: wordStart });
    }
    
    const lastWordLength = words.length > 0 ? words[words.length - 1].length : 0;
    
    return { words: words, lastWordLength: lastWordLength };
}

// Two loops with character frequency
function lengthOfLastWordWithFrequency(s) {
    if (!s || typeof s !== 'string') return { length: 0, frequency: {} };
    
    const n = s.length;
    if (n === 0) return { length: 0, frequency: {} };
    
    let i = n - 1;
    
    // First loop: Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    if (i < 0) return { length: 0, frequency: {} };
    
    // Second loop: Count characters and build frequency
    const frequency = {};
    let wordLength = 0;
    
    while (i >= 0 && s[i] !== ' ') {
        const char = s[i];
        frequency[char] = (frequency[char] || 0) + 1;
        wordLength++;
        i--;
    }
    
    return { length: wordLength, frequency: frequency };
}

// ============= HELPER FUNCTIONS =============

function validateInput(s) {
    if (s === null || s === undefined) {
        return { valid: false, message: 'Input is null or undefined' };
    }
    
    if (typeof s !== 'string') {
        return { valid: false, message: 'Input is not a string' };
    }
    
    return { valid: true, message: 'Input is valid' };
}

function analyzeString(s) {
    if (!s || typeof s !== 'string') return null;
    
    return {
        length: s.length,
        hasSpaces: s.includes(' '),
        leadingSpaces: s.length - s.trimStart().length,
        trailingSpaces: s.length - s.trimEnd().length,
        totalSpaces: (s.match(/ /g) || []).length,
        wordCount: s.trim().split(/\s+/).filter(word => word.length > 0).length
    };
}

function extractAllWords(s) {
    if (!s || typeof s !== 'string') return [];
    
    const words = [];
    const n = s.length;
    let i = 0;
    
    while (i < n) {
        // Skip spaces
        while (i < n && s[i] === ' ') {
            i++;
        }
        
        if (i >= n) break;
        
        // Extract word
        let word = '';
        const startIndex = i;
        
        while (i < n && s[i] !== ' ') {
            word += s[i];
            i++;
        }
        
        words.push({
            word: word,
            length: word.length,
            startIndex: startIndex,
            endIndex: i - 1
        });
    }
    
    return words;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeTwoLoopsApproach(s) {
    console.log("\n=== Visualizing Two Loops Approach ===");
    
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
    
    const result = lengthOfLastWordWithSteps(s);
    
    console.log("\nStep-by-step execution:");
    result.steps.forEach((step, index) => {
        console.log(`Step ${index + 1}: [${step.phase}] ${step.message}`);
        if (step.character) {
            console.log(`         Character: '${step.character}'`);
        }
        if (step.position !== undefined) {
            console.log(`         Position: ${step.position}`);
        }
        if (step.currentLength !== undefined) {
            console.log(`         Current length: ${step.currentLength}`);
        }
    });
    
    console.log(`\nFinal result: ${result.length}`);
    
    return result.length;
}

function demonstrateTwoLoopsMethods() {
    console.log("\n=== Demonstrating Two Loops Methods ===");
    
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
        { name: "Brute Force", func: lengthOfLastWordBruteForce },
        { name: "Better", func: lengthOfLastWordBetter },
        { name: "Two Loops", func: lengthOfLastWordTwoLoops },
        { name: "Two Loops Optimized", func: lengthOfLastWordTwoLoopsOptimized }
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
        { name: "Brute Force", time: "O(n)", space: "O(n)", notes: "Split creates array" },
        { name: "Better", time: "O(n)", space: "O(n)", notes: "Trim + split" },
        { name: "Two Loops", time: "O(n)", space: "O(1)", notes: "Optimal space" },
        { name: "Two Loops Optimized", time: "O(n)", space: "O(1)", notes: "Best approach" }
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
    
    console.log("\n🏆 Winner: Two Loops Optimized");
    console.log("• O(n) time - worst case visits each character once");
    console.log("• O(1) space - only uses a few variables");
    console.log("• Two distinct phases: skip spaces, count characters");
    console.log("• No additional data structures needed");
    console.log("• Handles all edge cases efficiently");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Length of Last Word (Two Loops) ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master two-phase algorithm design");
    console.log("2. Understand backward string traversal");
    console.log("3. Handle edge cases (spaces, empty strings)");
    console.log("4. Optimize space complexity to O(1)");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Two distinct loops with different purposes");
    console.log("2. Backward traversal from end of string");
    console.log("3. Phase 1: Skip trailing spaces");
    console.log("4. Phase 2: Count word characters");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Start from the end of the string");
    console.log("2. Skip all trailing spaces first");
    console.log("3. Then count characters until next space");
    console.log("4. Return the count as word length");
    
    console.log("\n⚡ Why Two Loops?");
    console.log("1. Separation of concerns - each loop has one job");
    console.log("2. Clear logic flow - skip then count");
    console.log("3. Easy to debug and understand");
    console.log("4. Handles edge cases naturally");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Always validate input first");
    console.log("2. Use backward traversal (i = n-1; i >= 0; i--)");
    console.log("3. Check for all-spaces case after first loop");
    console.log("4. Count characters in second loop until space");
    
    console.log("\n🎨 Visual Pattern:");
    console.log("String: '  hello world  '");
    console.log("Phase 1: Skip '  ' from end");
    console.log("Phase 2: Count 'dlrow' (5 chars)");
    console.log("Result: 5");
    
    visualizeTwoLoopsApproach("  hello world  ");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Text Processing:**");
    console.log("   - Parse command line arguments");
    console.log("   - Extract file extensions");
    
    console.log("\n2. **Data Validation:**");
    console.log("   - Validate form inputs");
    console.log("   - Check last word in sentences");
    
    console.log("\n3. **Log Analysis:**");
    console.log("   - Extract last field from log entries");
    console.log("   - Parse structured text data");
    
    console.log("\n4. **String Utilities:**");
    console.log("   - Building blocks for text editors");
    console.log("   - Word processing applications");
    
    console.log("\n📊 Example Applications:");
    
    // Command line parsing
    const command = "git commit -m 'Initial commit'";
    console.log(`\nCommand: "${command}"`);
    const extraction = lengthOfLastWordWithExtraction(command);
    console.log(`Last argument: "${extraction.word}" (length: ${extraction.length})`);
    
    // File path analysis
    const filePath = "C:\\Users\\Documents\\project\\main.js";
    console.log(`\nFile path: "${filePath}"`);
    const fileInfo = lengthOfLastWordWithExtraction(filePath);
    console.log(`Filename: "${fileInfo.word}" (length: ${fileInfo.length})`);
    
    // Sentence analysis
    const sentence = "The quick brown fox jumps";
    console.log(`\nSentence: "${sentence}"`);
    const allWords = analyzeAllWordsWithTwoLoops(sentence);
    console.log(`All words:`, allWords.words.map(w => `"${w.word}"`));
    console.log(`Last word length: ${allWords.lastWordLength}`);
    
    // Character frequency
    const text = "programming is fun";
    console.log(`\nText: "${text}"`);
    const freqResult = lengthOfLastWordWithFrequency(text);
    console.log(`Last word length: ${freqResult.length}`);
    console.log(`Character frequency:`, freqResult.frequency);
}

// ============= TEST CASES =============

function testLengthOfLastWord() {
    console.log("\n=== Testing Length of Last Word (Two Loops) ===");
    
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
        
        const result = lengthOfLastWordTwoLoops(testCase.input);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const largeString = "word ".repeat(1000) + "lastword";
    
    console.time("Large string test");
    const result = lengthOfLastWordTwoLoops(largeString);
    console.timeEnd("Large string test");
    
    console.log(`Result: ${result} (expected: 8)`);
    console.log(`Status: ${result === 8 ? '✅ PASS' : '❌ FAIL'}`);
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { input: null, expected: 0, description: "Null input" },
        { input: undefined, expected: 0, description: "Undefined input" },
        { input: 123, expected: 0, description: "Number input" },
        { input: [], expected: 0, description: "Array input" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = lengthOfLastWordTwoLoops(testCase.input);
        console.log(`Result: ${result}, Expected: ${testCase.expected}`);
        console.log(`Status: ${result === testCase.expected ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 LENGTH OF LAST WORD (TWO LOOPS) - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateTwoLoopsMethods();
testLengthOfLastWord();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    lengthOfLastWordBruteForce,
    lengthOfLastWordBetter,
    lengthOfLastWordTwoLoops,
    lengthOfLastWordTwoLoopsOptimized,
    lengthOfLastWordWithExtraction,
    analyzeAllWordsWithTwoLoops,
    validateInput,
    analyzeString,
    visualizeTwoLoopsApproach,
    demonstrateTwoLoopsMethods,
    interactiveLearning
};
