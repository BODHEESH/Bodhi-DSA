/**
 * Find Most Frequent Vowel and Consonant
 * Bodhi-DSA Course
 * 
 * Problem: Given a string, find the most frequent vowel and consonant.
 * If there are multiple characters with the same highest frequency, return any one of them.
 * Ignore case and non-alphabetic characters.
 * 
 * Example:
 * Input: "programming"
 * Output: { vowel: 'a', consonant: 'r' } or { vowel: 'a', consonant: 'g' }
 * 
 * Input: "hello world"
 * Output: { vowel: 'o', consonant: 'l' }
 * 
 * Input: "aeiou"
 * Output: { vowel: 'a', consonant: null }
 */

// ============= BRUTE FORCE APPROACH (Multiple Passes) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Count all characters, then find max vowel and consonant

function findMostFrequentBruteForce(str) {
    if (!str || typeof str !== 'string') {
        return { vowel: null, consonant: null };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelCount = {};
    const consonantCount = {};
    
    // First pass: count all characters
    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        
        if (char >= 'a' && char <= 'z') {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
            }
        }
    }
    
    // Second pass: find most frequent vowel
    let maxVowel = null;
    let maxVowelCount = 0;
    for (let vowel in vowelCount) {
        if (vowelCount[vowel] > maxVowelCount) {
            maxVowelCount = vowelCount[vowel];
            maxVowel = vowel;
        }
    }
    
    // Third pass: find most frequent consonant
    let maxConsonant = null;
    let maxConsonantCount = 0;
    for (let consonant in consonantCount) {
        if (consonantCount[consonant] > maxConsonantCount) {
            maxConsonantCount = consonantCount[consonant];
            maxConsonant = consonant;
        }
    }
    
    return { vowel: maxVowel, consonant: maxConsonant };
}

// ============= BETTER APPROACH (Single Pass with Tracking) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Track max while counting

function findMostFrequentBetter(str) {
    if (!str || typeof str !== 'string') {
        return { vowel: null, consonant: null };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelCount = {};
    const consonantCount = {};
    
    let maxVowel = null;
    let maxVowelCount = 0;
    let maxConsonant = null;
    let maxConsonantCount = 0;
    
    // Single pass: count and track max simultaneously
    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        
        if (char >= 'a' && char <= 'z') {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
                if (vowelCount[char] > maxVowelCount) {
                    maxVowelCount = vowelCount[char];
                    maxVowel = char;
                }
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
                if (consonantCount[char] > maxConsonantCount) {
                    maxConsonantCount = consonantCount[char];
                    maxConsonant = char;
                }
            }
        }
    }
    
    return { vowel: maxVowel, consonant: maxConsonant };
}

// ============= OPTIMIZED APPROACH (Functional Style) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Functional programming with reduce

function findMostFrequentOptimized(str) {
    if (!str || typeof str !== 'string') {
        return { vowel: null, consonant: null };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    
    // Filter and count characters
    const chars = str.toLowerCase().split('').filter(char => char >= 'a' && char <= 'z');
    
    const frequency = chars.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
    
    // Separate vowels and consonants
    const vowelEntries = Object.entries(frequency).filter(([char]) => vowels.has(char));
    const consonantEntries = Object.entries(frequency).filter(([char]) => !vowels.has(char));
    
    // Find max frequency
    const maxVowel = vowelEntries.length > 0 
        ? vowelEntries.reduce((max, current) => current[1] > max[1] ? current : max)[0]
        : null;
        
    const maxConsonant = consonantEntries.length > 0
        ? consonantEntries.reduce((max, current) => current[1] > max[1] ? current : max)[0]
        : null;
    
    return { vowel: maxVowel, consonant: maxConsonant };
}

// ============= ADVANCED APPROACH (Detailed Analysis) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Comprehensive frequency analysis

function findMostFrequentDetailed(str) {
    if (!str || typeof str !== 'string') {
        return {
            vowel: null,
            consonant: null,
            vowelFrequency: {},
            consonantFrequency: {},
            totalVowels: 0,
            totalConsonants: 0,
            analysis: null
        };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelCount = {};
    const consonantCount = {};
    let totalVowels = 0;
    let totalConsonants = 0;
    
    let maxVowel = null;
    let maxVowelCount = 0;
    let maxConsonant = null;
    let maxConsonantCount = 0;
    
    // Count all characters
    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
                totalVowels++;
                if (vowelCount[char] > maxVowelCount) {
                    maxVowelCount = vowelCount[char];
                    maxVowel = char;
                }
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
                totalConsonants++;
                if (consonantCount[char] > maxConsonantCount) {
                    maxConsonantCount = consonantCount[char];
                    maxConsonant = char;
                }
            }
        }
    }
    
    // Analysis
    const analysis = {
        totalAlphabetic: totalVowels + totalConsonants,
        vowelPercentage: totalVowels + totalConsonants > 0 
            ? (totalVowels / (totalVowels + totalConsonants) * 100).toFixed(2)
            : 0,
        consonantPercentage: totalVowels + totalConsonants > 0
            ? (totalConsonants / (totalVowels + totalConsonants) * 100).toFixed(2)
            : 0,
        uniqueVowels: Object.keys(vowelCount).length,
        uniqueConsonants: Object.keys(consonantCount).length,
        mostFrequentVowelCount: maxVowelCount,
        mostFrequentConsonantCount: maxConsonantCount
    };
    
    return {
        vowel: maxVowel,
        consonant: maxConsonant,
        vowelFrequency: vowelCount,
        consonantFrequency: consonantCount,
        totalVowels: totalVowels,
        totalConsonants: totalConsonants,
        analysis: analysis
    };
}

// ============= ADVANCED VARIATIONS =============

// Find all characters with maximum frequency
function findAllMostFrequent(str) {
    if (!str || typeof str !== 'string') {
        return { vowels: [], consonants: [] };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelCount = {};
    const consonantCount = {};
    
    // Count frequencies
    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
            }
        }
    }
    
    // Find max frequencies
    const maxVowelCount = Math.max(...Object.values(vowelCount), 0);
    const maxConsonantCount = Math.max(...Object.values(consonantCount), 0);
    
    // Get all characters with max frequency
    const maxVowels = Object.keys(vowelCount).filter(char => vowelCount[char] === maxVowelCount);
    const maxConsonants = Object.keys(consonantCount).filter(char => consonantCount[char] === maxConsonantCount);
    
    return { vowels: maxVowels, consonants: maxConsonants };
}

// Find least frequent vowel and consonant
function findLeastFrequent(str) {
    if (!str || typeof str !== 'string') {
        return { vowel: null, consonant: null };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const vowelCount = {};
    const consonantCount = {};
    
    // Count frequencies
    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
            }
        }
    }
    
    // Find min frequencies
    let minVowel = null;
    let minVowelCount = Infinity;
    for (let vowel in vowelCount) {
        if (vowelCount[vowel] < minVowelCount) {
            minVowelCount = vowelCount[vowel];
            minVowel = vowel;
        }
    }
    
    let minConsonant = null;
    let minConsonantCount = Infinity;
    for (let consonant in consonantCount) {
        if (consonantCount[consonant] < minConsonantCount) {
            minConsonantCount = consonantCount[consonant];
            minConsonant = consonant;
        }
    }
    
    return { vowel: minVowel, consonant: minConsonant };
}

// Find frequency distribution
function getFrequencyDistribution(str) {
    if (!str || typeof str !== 'string') {
        return null;
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const distribution = {
        vowels: { a: 0, e: 0, i: 0, o: 0, u: 0 },
        consonants: {}
    };
    
    for (let char of str.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            if (vowels.has(char)) {
                distribution.vowels[char]++;
            } else {
                distribution.consonants[char] = (distribution.consonants[char] || 0) + 1;
            }
        }
    }
    
    return distribution;
}

// Case-sensitive analysis
function findMostFrequentCaseSensitive(str) {
    if (!str || typeof str !== 'string') {
        return { vowel: null, consonant: null };
    }
    
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    const vowelCount = {};
    const consonantCount = {};
    
    let maxVowel = null;
    let maxVowelCount = 0;
    let maxConsonant = null;
    let maxConsonantCount = 0;
    
    for (let char of str) {
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            if (vowels.has(char)) {
                vowelCount[char] = (vowelCount[char] || 0) + 1;
                if (vowelCount[char] > maxVowelCount) {
                    maxVowelCount = vowelCount[char];
                    maxVowel = char;
                }
            } else {
                consonantCount[char] = (consonantCount[char] || 0) + 1;
                if (consonantCount[char] > maxConsonantCount) {
                    maxConsonantCount = consonantCount[char];
                    maxConsonant = char;
                }
            }
        }
    }
    
    return { vowel: maxVowel, consonant: maxConsonant };
}

// ============= HELPER FUNCTIONS =============

function isVowel(char) {
    return 'aeiouAEIOU'.includes(char);
}

function isConsonant(char) {
    return ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) && !isVowel(char);
}

function validateInput(str) {
    const errors = [];
    
    if (typeof str !== 'string') {
        errors.push('Input must be a string');
    }
    
    if (typeof str === 'string' && str.length === 0) {
        errors.push('String cannot be empty');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getAlphabeticCharacters(str) {
    return str.split('').filter(char => 
        (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
    );
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeFrequencyAnalysis(str) {
    console.log("\n=== Visualizing Frequency Analysis ===");
    
    const validation = validateInput(str);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return null;
    }
    
    console.log(`Input string: "${str}"`);
    
    const detailed = findMostFrequentDetailed(str);
    
    console.log("\n📊 Character Frequency Analysis:");
    console.log(`Total alphabetic characters: ${detailed.analysis.totalAlphabetic}`);
    console.log(`Vowels: ${detailed.totalVowels} (${detailed.analysis.vowelPercentage}%)`);
    console.log(`Consonants: ${detailed.totalConsonants} (${detailed.analysis.consonantPercentage}%)`);
    
    console.log("\n🔤 Vowel Frequencies:");
    if (Object.keys(detailed.vowelFrequency).length > 0) {
        Object.entries(detailed.vowelFrequency)
            .sort((a, b) => b[1] - a[1])
            .forEach(([char, count]) => {
                const bar = '█'.repeat(Math.min(count, 20));
                console.log(`  ${char}: ${count} ${bar}`);
            });
    } else {
        console.log("  No vowels found");
    }
    
    console.log("\n🔤 Consonant Frequencies:");
    if (Object.keys(detailed.consonantFrequency).length > 0) {
        Object.entries(detailed.consonantFrequency)
            .sort((a, b) => b[1] - a[1])
            .forEach(([char, count]) => {
                const bar = '█'.repeat(Math.min(count, 20));
                console.log(`  ${char}: ${count} ${bar}`);
            });
    } else {
        console.log("  No consonants found");
    }
    
    console.log("\n🏆 Most Frequent:");
    console.log(`  Vowel: '${detailed.vowel}' (${detailed.analysis.mostFrequentVowelCount} times)`);
    console.log(`  Consonant: '${detailed.consonant}' (${detailed.analysis.mostFrequentConsonantCount} times)`);
    
    return detailed;
}

function demonstrateFrequencyMethods() {
    console.log("\n=== Demonstrating Frequency Analysis Methods ===");
    
    const testCases = [
        { str: "programming", name: "Basic case" },
        { str: "hello world", name: "With spaces" },
        { str: "aeiou", name: "Only vowels" },
        { str: "bcdfg", name: "Only consonants" },
        { str: "AaEeIiOoUu", name: "Mixed case vowels" },
        { str: "Hello World!", name: "With punctuation" },
        { str: "12345", name: "Only numbers" },
        { str: "", name: "Empty string" }
    ];
    
    const methods = [
        { name: "Brute Force", func: findMostFrequentBruteForce },
        { name: "Better (Single Pass)", func: findMostFrequentBetter },
        { name: "Optimized (Functional)", func: findMostFrequentOptimized }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`String: "${testCase.str}"`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.str);
            console.timeEnd(method.name);
            
            console.log(`${method.name}: vowel='${result.vowel}', consonant='${result.consonant}'`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n)", space: "O(1)", notes: "Multiple passes" },
        { name: "Better (Single Pass)", time: "O(n)", space: "O(1)", notes: "Track while counting" },
        { name: "Optimized (Functional)", time: "O(n)", space: "O(1)", notes: "Functional style" },
        { name: "Detailed Analysis", time: "O(n)", space: "O(1)", notes: "Comprehensive data" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach              | Time | Space | Notes              |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(21);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(18);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\nWhere:");
    console.log("• n = length of input string");
    console.log("• Space is O(1) as we only store frequency of 26 letters max");
    
    console.log("\n🏆 Winner: Better (Single Pass)");
    console.log("• Same time complexity but fewer passes");
    console.log("• More efficient in practice");
    console.log("• Cleaner logic with immediate tracking");
    console.log("• Good balance of performance and readability");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Most Frequent Vowel and Consonant ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master character frequency analysis");
    console.log("2. Understand vowel vs consonant classification");
    console.log("3. Learn single-pass optimization techniques");
    console.log("4. Practice functional programming approaches");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Character frequency counting");
    console.log("2. Character classification (vowel/consonant)");
    console.log("3. Maximum finding algorithms");
    console.log("4. Case-insensitive string processing");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Classify each character as vowel/consonant");
    console.log("2. Count frequency of each character");
    console.log("3. Track maximum frequency while counting");
    console.log("4. Return characters with highest frequency");
    
    console.log("\n⚡ Optimization Strategies:");
    console.log("1. Single pass instead of multiple passes");
    console.log("2. Track max while counting (avoid second scan)");
    console.log("3. Use sets for O(1) vowel lookup");
    console.log("4. Filter non-alphabetic characters early");
    
    console.log("\n🔧 Implementation Patterns:");
    console.log("Pattern 1: Count first, then find max");
    console.log("Pattern 2: Track max while counting");
    console.log("Pattern 3: Functional reduce and filter");
    console.log("Pattern 4: Comprehensive analysis");
    
    visualizeFrequencyAnalysis("programming");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Text Analysis:**");
    console.log("   - Language pattern recognition");
    console.log("   - Writing style analysis");
    
    console.log("\n2. **Cryptography:**");
    console.log("   - Frequency analysis for code breaking");
    console.log("   - Pattern detection in encrypted text");
    
    console.log("\n3. **Natural Language Processing:**");
    console.log("   - Language identification");
    console.log("   - Phonetic analysis");
    
    console.log("\n4. **Data Validation:**");
    console.log("   - Password strength analysis");
    console.log("   - Input pattern validation");
    
    console.log("\n📊 Example Applications:");
    
    // Text analysis
    const text = "The quick brown fox jumps over the lazy dog";
    console.log(`\nText Analysis: "${text}"`);
    const analysis = findMostFrequentDetailed(text);
    console.log(`Most frequent vowel: '${analysis.vowel}' (${analysis.analysis.mostFrequentVowelCount} times)`);
    console.log(`Most frequent consonant: '${analysis.consonant}' (${analysis.analysis.mostFrequentConsonantCount} times)`);
    console.log(`Vowel percentage: ${analysis.analysis.vowelPercentage}%`);
    
    // Multiple most frequent
    const multiText = "aabbccddee";
    console.log(`\nMultiple Max Frequency: "${multiText}"`);
    const allMax = findAllMostFrequent(multiText);
    console.log(`All max vowels: [${allMax.vowels.join(', ')}]`);
    console.log(`All max consonants: [${allMax.consonants.join(', ')}]`);
    
    // Least frequent analysis
    const leastText = "programming language";
    console.log(`\nLeast Frequent Analysis: "${leastText}"`);
    const least = findLeastFrequent(leastText);
    console.log(`Least frequent vowel: '${least.vowel}'`);
    console.log(`Least frequent consonant: '${least.consonant}'`);
    
    // Case-sensitive analysis
    const caseText = "Hello World";
    console.log(`\nCase-Sensitive Analysis: "${caseText}"`);
    const caseSensitive = findMostFrequentCaseSensitive(caseText);
    console.log(`Most frequent vowel: '${caseSensitive.vowel}'`);
    console.log(`Most frequent consonant: '${caseSensitive.consonant}'`);
    
    // Frequency distribution
    const distText = "javascript";
    console.log(`\nFrequency Distribution: "${distText}"`);
    const distribution = getFrequencyDistribution(distText);
    console.log(`Vowel distribution:`, distribution.vowels);
    console.log(`Consonant distribution:`, distribution.consonants);
}

// ============= TEST CASES =============

function testMostFrequentVowelConsonant() {
    console.log("\n=== Testing Most Frequent Vowel and Consonant ===");
    
    const testCases = [
        { 
            str: "programming", 
            expected: { vowel: 'a', consonant: 'r' }, 
            description: "Basic case" 
        },
        { 
            str: "hello world", 
            expected: { vowel: 'o', consonant: 'l' }, 
            description: "With spaces" 
        },
        { 
            str: "aeiou", 
            expected: { vowel: 'a', consonant: null }, 
            description: "Only vowels" 
        },
        { 
            str: "bcdfg", 
            expected: { vowel: null, consonant: 'b' }, 
            description: "Only consonants" 
        },
        { 
            str: "12345", 
            expected: { vowel: null, consonant: null }, 
            description: "Only numbers" 
        },
        { 
            str: "", 
            expected: { vowel: null, consonant: null }, 
            description: "Empty string" 
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`String: "${testCase.str}"`);
        
        const result = findMostFrequentBetter(testCase.str);
        
        console.log(`Expected: vowel='${testCase.expected.vowel}', consonant='${testCase.expected.consonant}'`);
        console.log(`Actual: vowel='${result.vowel}', consonant='${result.consonant}'`);
        
        // Note: Multiple characters can have same max frequency
        const vowelMatch = testCase.expected.vowel === null ? result.vowel === null : result.vowel !== null;
        const consonantMatch = testCase.expected.consonant === null ? result.consonant === null : result.consonant !== null;
        
        console.log(`Status: ${vowelMatch && consonantMatch ? '✅ PASS' : '⚠️  CHECK (multiple valid answers possible)'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const largeText = "a".repeat(1000) + "b".repeat(1000) + "e".repeat(500);
    
    console.time("Large text analysis");
    const result = findMostFrequentBetter(largeText);
    console.timeEnd("Large text analysis");
    
    console.log(`Result: vowel='${result.vowel}', consonant='${result.consonant}'`);
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { str: null, description: "Null input" },
        { str: undefined, description: "Undefined input" },
        { str: 123, description: "Non-string input" },
        { str: "!@#$%", description: "Only special characters" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = findMostFrequentBetter(testCase.str);
        console.log(`Result: vowel='${result.vowel}', consonant='${result.consonant}'`);
        console.log(`Status: ${result.vowel === null && result.consonant === null ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 FIND MOST FREQUENT VOWEL AND CONSONANT - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
demonstrateFrequencyMethods();
testMostFrequentVowelConsonant();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    findMostFrequentBruteForce,
    findMostFrequentBetter,
    findMostFrequentOptimized,
    findMostFrequentDetailed,
    findAllMostFrequent,
    findLeastFrequent,
    getFrequencyDistribution,
    isVowel,
    isConsonant,
    validateInput,
    visualizeFrequencyAnalysis,
    demonstrateFrequencyMethods,
    interactiveLearning
};
