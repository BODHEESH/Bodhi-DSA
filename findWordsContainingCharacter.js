/**
 * Find Words Containing Character
 * Bodhi-DSA Course
 * 
 * Problem: Given an array of strings words and a character x, return an array of all words
 * that contain the character x.
 * 
 * Example:
 * Input: words = ["leet","code","leetcode"], x = "e"
 * Output: ["leet","leetcode"]
 * 
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
 * Output: ["abc","aaaa"]
 * 
 * Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
 * Output: []
 */

// ============= BRUTE FORCE APPROACH (Nested Loops) =============
// Time Complexity: O(n*m) | Space Complexity: O(k) where k is result size
// Algorithm: Check each character of each word

function findWordsContainingBruteForce(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    const result = [];
    
    // Check each word
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let found = false;
        
        // Check each character in the word
        for (let j = 0; j < word.length; j++) {
            if (word[j] === x) {
                found = true;
                break; // Early termination when character found
            }
        }
        
        if (found) {
            result.push(word);
        }
    }
    
    return result;
}

// ============= BETTER APPROACH (Built-in includes) =============
// Time Complexity: O(n*m) | Space Complexity: O(k)
// Algorithm: Use string includes method

function findWordsContainingBetter(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    const result = [];
    
    for (let i = 0; i < words.length; i++) {
        if (words[i].includes(x)) {
            result.push(words[i]);
        }
    }
    
    return result;
}

// ============= OPTIMIZED APPROACH (Filter with includes) =============
// Time Complexity: O(n*m) | Space Complexity: O(k)
// Algorithm: Use array filter for cleaner code

function findWordsContainingOptimized(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    return words.filter(word => word.includes(x));
}

// ============= FUNCTIONAL APPROACH (One-liner) =============
// Time Complexity: O(n*m) | Space Complexity: O(k)
// Algorithm: Functional programming style

function findWordsContainingFunctional(words, x) {
    return Array.isArray(words) && typeof x === 'string' && x.length === 1
        ? words.filter(word => word.includes(x))
        : [];
}

// ============= ADVANCED VARIATIONS =============

// Find words with character count
function findWordsWithCharacterCount(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    return words
        .map(word => ({
            word: word,
            count: (word.match(new RegExp(x, 'g')) || []).length
        }))
        .filter(item => item.count > 0);
}

// Find words with character positions
function findWordsWithPositions(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    return words
        .map(word => {
            const positions = [];
            for (let i = 0; i < word.length; i++) {
                if (word[i] === x) {
                    positions.push(i);
                }
            }
            return { word: word, positions: positions };
        })
        .filter(item => item.positions.length > 0);
}

// Case-insensitive search
function findWordsContainingCaseInsensitive(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    const lowerX = x.toLowerCase();
    
    return words.filter(word => 
        word.toLowerCase().includes(lowerX)
    );
}

// Find words with multiple characters (any)
function findWordsContainingAny(words, chars) {
    if (!Array.isArray(words) || !Array.isArray(chars)) {
        return [];
    }
    
    return words.filter(word => 
        chars.some(char => word.includes(char))
    );
}

// Find words with multiple characters (all)
function findWordsContainingAll(words, chars) {
    if (!Array.isArray(words) || !Array.isArray(chars)) {
        return [];
    }
    
    return words.filter(word => 
        chars.every(char => word.includes(char))
    );
}

// Find words with regex pattern
function findWordsWithPattern(words, pattern) {
    if (!Array.isArray(words) || !(pattern instanceof RegExp)) {
        return [];
    }
    
    return words.filter(word => pattern.test(word));
}

// Find words with character frequency analysis
function findWordsWithFrequencyAnalysis(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string' || x.length !== 1) {
        return [];
    }
    
    return words
        .map(word => {
            const frequency = {};
            for (let char of word) {
                frequency[char] = (frequency[char] || 0) + 1;
            }
            
            return {
                word: word,
                targetCount: frequency[x] || 0,
                frequency: frequency,
                hasTarget: (frequency[x] || 0) > 0
            };
        })
        .filter(item => item.hasTarget);
}

// ============= HELPER FUNCTIONS =============

function validateInput(words, x) {
    const errors = [];
    
    if (!Array.isArray(words)) {
        errors.push('words must be an array');
    }
    
    if (typeof x !== 'string') {
        errors.push('x must be a string');
    } else if (x.length !== 1) {
        errors.push('x must be a single character');
    }
    
    if (Array.isArray(words)) {
        words.forEach((word, index) => {
            if (typeof word !== 'string') {
                errors.push(`words[${index}] must be a string`);
            }
        });
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function analyzeWords(words) {
    if (!Array.isArray(words)) return null;
    
    const analysis = {
        totalWords: words.length,
        totalCharacters: words.reduce((sum, word) => sum + word.length, 0),
        averageLength: 0,
        shortestWord: '',
        longestWord: '',
        uniqueCharacters: new Set()
    };
    
    if (words.length > 0) {
        analysis.averageLength = analysis.totalCharacters / words.length;
        analysis.shortestWord = words.reduce((shortest, word) => 
            word.length < shortest.length ? word : shortest
        );
        analysis.longestWord = words.reduce((longest, word) => 
            word.length > longest.length ? word : longest
        );
        
        words.forEach(word => {
            for (let char of word) {
                analysis.uniqueCharacters.add(char);
            }
        });
    }
    
    return analysis;
}

function getCharacterStatistics(words, x) {
    if (!Array.isArray(words) || typeof x !== 'string') return null;
    
    const stats = {
        totalOccurrences: 0,
        wordsContaining: 0,
        averagePerWord: 0,
        maxInSingleWord: 0,
        wordsWithCharacter: []
    };
    
    words.forEach(word => {
        const count = (word.match(new RegExp(x, 'g')) || []).length;
        if (count > 0) {
            stats.wordsContaining++;
            stats.totalOccurrences += count;
            stats.maxInSingleWord = Math.max(stats.maxInSingleWord, count);
            stats.wordsWithCharacter.push({ word, count });
        }
    });
    
    if (stats.wordsContaining > 0) {
        stats.averagePerWord = stats.totalOccurrences / stats.wordsContaining;
    }
    
    return stats;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeSearch(words, x) {
    console.log("\n=== Visualizing Character Search ===");
    
    const validation = validateInput(words, x);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return [];
    }
    
    console.log(`Words: [${words.map(w => `"${w}"`).join(', ')}]`);
    console.log(`Target character: '${x}'`);
    
    const result = [];
    
    console.log("\nStep-by-step search:");
    words.forEach((word, index) => {
        process.stdout.write(`Word ${index + 1}: "${word}" → `);
        
        let found = false;
        const positions = [];
        
        for (let i = 0; i < word.length; i++) {
            if (word[i] === x) {
                found = true;
                positions.push(i);
            }
        }
        
        if (found) {
            console.log(`✅ FOUND at positions [${positions.join(', ')}]`);
            result.push(word);
        } else {
            console.log(`❌ NOT FOUND`);
        }
    });
    
    console.log(`\nResult: [${result.map(w => `"${w}"`).join(', ')}]`);
    console.log(`Found ${result.length} out of ${words.length} words`);
    
    return result;
}

function demonstrateSearchMethods() {
    console.log("\n=== Demonstrating Search Methods ===");
    
    const testCases = [
        { words: ["leet","code","leetcode"], x: "e", name: "Basic case" },
        { words: ["abc","bcd","aaaa","cbc"], x: "a", name: "Multiple matches" },
        { words: ["abc","bcd","aaaa","cbc"], x: "z", name: "No matches" },
        { words: ["hello","world","help"], x: "l", name: "Multiple occurrences" },
        { words: [], x: "a", name: "Empty array" },
        { words: ["a","b","c"], x: "a", name: "Single character words" },
        { words: ["programming","is","fun"], x: "g", name: "Mixed lengths" }
    ];
    
    const methods = [
        { name: "Brute Force", func: findWordsContainingBruteForce },
        { name: "Better (includes)", func: findWordsContainingBetter },
        { name: "Optimized (filter)", func: findWordsContainingOptimized },
        { name: "Functional", func: findWordsContainingFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Words: [${testCase.words.map(w => `"${w}"`).join(', ')}]`);
        console.log(`Character: '${testCase.x}'`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.words, testCase.x);
            console.timeEnd(method.name);
            
            console.log(`${method.name}: [${result.map(w => `"${w}"`).join(', ')}]`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n*m)", space: "O(k)", notes: "Manual character check" },
        { name: "Better (includes)", time: "O(n*m)", space: "O(k)", notes: "Built-in string method" },
        { name: "Optimized (filter)", time: "O(n*m)", space: "O(k)", notes: "Functional approach" },
        { name: "Functional", time: "O(n*m)", space: "O(k)", notes: "One-liner solution" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach           | Time    | Space | Notes                  |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(7);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(22);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\nWhere:");
    console.log("• n = number of words");
    console.log("• m = average word length");
    console.log("• k = number of matching words");
    
    console.log("\n🏆 Winner: Optimized (Filter)");
    console.log("• Same time complexity but cleaner code");
    console.log("• Leverages built-in optimizations");
    console.log("• More readable and maintainable");
    console.log("• Functional programming style");
    console.log("• Less prone to bugs");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Find Words Containing Character ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master array filtering techniques");
    console.log("2. Understand string searching methods");
    console.log("3. Compare imperative vs functional approaches");
    console.log("4. Learn input validation patterns");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Linear search through array of strings");
    console.log("2. Character matching within strings");
    console.log("3. Early termination for efficiency");
    console.log("4. Functional programming with filter");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Iterate through each word in array");
    console.log("2. For each word, check if target character exists");
    console.log("3. Collect words that contain the character");
    console.log("4. Return filtered results");
    
    console.log("\n⚡ Optimization Strategies:");
    console.log("1. Use built-in string methods (includes)");
    console.log("2. Early termination when character found");
    console.log("3. Functional approach with filter");
    console.log("4. Input validation for robustness");
    
    console.log("\n🔧 Implementation Patterns:");
    console.log("Pattern 1: Manual nested loops");
    console.log("Pattern 2: Built-in string methods");
    console.log("Pattern 3: Array filter with callback");
    console.log("Pattern 4: Functional one-liner");
    
    console.log("\n🎨 Code Evolution:");
    console.log("Brute Force → includes() → filter() → one-liner");
    console.log("More code → Less code → Cleaner code → Concise code");
    
    visualizeSearch(["hello", "world", "help", "code"], "l");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Search Functionality:**");
    console.log("   - Text search in applications");
    console.log("   - Filter search results");
    
    console.log("\n2. **Data Processing:**");
    console.log("   - Log file analysis");
    console.log("   - CSV data filtering");
    
    console.log("\n3. **User Interface:**");
    console.log("   - Autocomplete features");
    console.log("   - Search suggestions");
    
    console.log("\n4. **Data Validation:**");
    console.log("   - Input validation");
    console.log("   - Content filtering");
    
    console.log("\n📊 Example Applications:");
    
    // Search functionality
    const dictionary = ["apple", "banana", "grape", "orange", "pear"];
    console.log(`\nDictionary: [${dictionary.map(w => `"${w}"`).join(', ')}]`);
    const searchA = findWordsContainingOptimized(dictionary, "a");
    console.log(`Words containing 'a': [${searchA.map(w => `"${w}"`).join(', ')}]`);
    
    // Character count analysis
    const words = ["programming", "algorithm", "data", "structure"];
    console.log(`\nWords: [${words.map(w => `"${w}"`).join(', ')}]`);
    const withCounts = findWordsWithCharacterCount(words, "a");
    console.log(`Words with 'a' and counts:`);
    withCounts.forEach(item => {
        console.log(`  "${item.word}": ${item.count} occurrences`);
    });
    
    // Position analysis
    const positionWords = ["banana", "apple", "grape"];
    console.log(`\nPosition analysis for 'a':`);
    const withPositions = findWordsWithPositions(positionWords, "a");
    withPositions.forEach(item => {
        console.log(`  "${item.word}": positions [${item.positions.join(', ')}]`);
    });
    
    // Case-insensitive search
    const mixedCase = ["Hello", "WORLD", "Code", "PROGRAM"];
    console.log(`\nCase-insensitive search for 'o':`);
    const caseInsensitive = findWordsContainingCaseInsensitive(mixedCase, "o");
    console.log(`Result: [${caseInsensitive.map(w => `"${w}"`).join(', ')}]`);
    
    // Multiple character search
    const multiWords = ["javascript", "python", "java", "rust"];
    console.log(`\nMultiple character search:`);
    const anyVowels = findWordsContainingAny(multiWords, ["a", "e", "i"]);
    console.log(`Words with any vowel (a,e,i): [${anyVowels.map(w => `"${w}"`).join(', ')}]`);
    
    const allVowels = findWordsContainingAll(multiWords, ["a", "i"]);
    console.log(`Words with both 'a' and 'i': [${allVowels.map(w => `"${w}"`).join(', ')}]`);
    
    // Statistics
    const stats = getCharacterStatistics(words, "a");
    console.log(`\nStatistics for 'a' in programming words:`);
    console.log(`Total occurrences: ${stats.totalOccurrences}`);
    console.log(`Words containing: ${stats.wordsContaining}`);
    console.log(`Average per word: ${stats.averagePerWord.toFixed(2)}`);
    console.log(`Max in single word: ${stats.maxInSingleWord}`);
}

// ============= TEST CASES =============

function testFindWordsContaining() {
    console.log("\n=== Testing Find Words Containing Character ===");
    
    const testCases = [
        { 
            words: ["leet","code","leetcode"], 
            x: "e", 
            expected: ["leet","leetcode"], 
            description: "Basic case" 
        },
        { 
            words: ["abc","bcd","aaaa","cbc"], 
            x: "a", 
            expected: ["abc","aaaa"], 
            description: "Multiple matches" 
        },
        { 
            words: ["abc","bcd","aaaa","cbc"], 
            x: "z", 
            expected: [], 
            description: "No matches" 
        },
        { 
            words: [], 
            x: "a", 
            expected: [], 
            description: "Empty array" 
        },
        { 
            words: ["a","b","c"], 
            x: "a", 
            expected: ["a"], 
            description: "Single character words" 
        },
        { 
            words: ["hello","world"], 
            x: "l", 
            expected: ["hello","world"], 
            description: "Multiple occurrences" 
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Words: [${testCase.words.map(w => `"${w}"`).join(', ')}]`);
        console.log(`Character: '${testCase.x}'`);
        
        const result = findWordsContainingOptimized(testCase.words, testCase.x);
        
        console.log(`Expected: [${testCase.expected.map(w => `"${w}"`).join(', ')}]`);
        console.log(`Actual: [${result.map(w => `"${w}"`).join(', ')}]`);
        
        const isEqual = JSON.stringify(result.sort()) === JSON.stringify(testCase.expected.sort());
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const largeWords = Array.from({ length: 1000 }, (_, i) => `word${i}test`);
    
    console.time("Large array search");
    const result = findWordsContainingOptimized(largeWords, "t");
    console.timeEnd("Large array search");
    
    console.log(`Found ${result.length} words containing 't' out of ${largeWords.length}`);
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { words: null, x: "a", description: "Null words" },
        { words: ["test"], x: null, description: "Null character" },
        { words: ["test"], x: "", description: "Empty character" },
        { words: ["test"], x: "ab", description: "Multi-character" },
        { words: [123, "test"], x: "t", description: "Non-string word" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        try {
            const result = findWordsContainingOptimized(testCase.words, testCase.x);
            console.log(`Result: [${result.map(w => `"${w}"`).join(', ')}]`);
            console.log(`Status: ✅ HANDLED`);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            console.log(`Status: ❌ ERROR`);
        }
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 FIND WORDS CONTAINING CHARACTER - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateSearchMethods();
testFindWordsContaining();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    findWordsContainingBruteForce,
    findWordsContainingBetter,
    findWordsContainingOptimized,
    findWordsContainingFunctional,
    findWordsWithCharacterCount,
    findWordsWithPositions,
    findWordsContainingCaseInsensitive,
    findWordsContainingAny,
    findWordsContainingAll,
    validateInput,
    analyzeWords,
    visualizeSearch,
    demonstrateSearchMethods,
    interactiveLearning
};
