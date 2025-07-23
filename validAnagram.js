/**
 * Valid Anagram
 * Bodhi-DSA Course
 * 
 * Problem: Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 * 
 * Input: s = "rat", t = "car"
 * Output: false
 * 
 * Input: s = "listen", t = "silent"
 * Output: true
 */

// ============= BRUTE FORCE APPROACH (Sort Both Strings) =============
// Time Complexity: O(n log n) | Space Complexity: O(n)
// Algorithm: Sort both strings and compare

function isAnagramBruteForce(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    // Different lengths cannot be anagrams
    if (s.length !== t.length) {
        return false;
    }
    
    // Sort both strings and compare
    const sortedS = s.split('').sort().join('');
    const sortedT = t.split('').sort().join('');
    
    return sortedS === sortedT;
}

// ============= BETTER APPROACH (Character Frequency Count) =============
// Time Complexity: O(n) | Space Complexity: O(1) - assuming fixed alphabet size
// Algorithm: Count character frequencies and compare

function isAnagramBetter(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    // Different lengths cannot be anagrams
    if (s.length !== t.length) {
        return false;
    }
    
    // Count character frequencies
    const charCount = {};
    
    // Count characters in first string
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract character counts from second string
    for (let char of t) {
        if (!charCount[char]) {
            return false; // Character not found or count exhausted
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}

// ============= OPTIMIZED APPROACH (Single Pass Frequency) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Single pass with frequency counting

function isAnagramOptimized(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    // Different lengths cannot be anagrams
    if (s.length !== t.length) {
        return false;
    }
    
    const charCount = {};
    
    // Single pass: increment for s, decrement for t
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        charCount[charS] = (charCount[charS] || 0) + 1;
        charCount[charT] = (charCount[charT] || 0) - 1;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}

// ============= FUNCTIONAL APPROACH (Array Methods) =============
// Time Complexity: O(n log n) | Space Complexity: O(n)
// Algorithm: Functional programming with array methods

function isAnagramFunctional(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    if (s.length !== t.length) {
        return false;
    }
    
    const normalize = str => str.split('').sort().join('');
    
    return normalize(s) === normalize(t);
}

// ============= ADVANCED VARIATIONS =============

// Anagram check with detailed analysis
function isAnagramDetailed(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return {
            isAnagram: false,
            reason: 'Invalid input types',
            analysis: null
        };
    }
    
    const analysis = {
        string1: s,
        string2: t,
        length1: s.length,
        length2: t.length,
        lengthMatch: s.length === t.length,
        frequency1: {},
        frequency2: {},
        missingChars: [],
        extraChars: [],
        commonChars: []
    };
    
    // Count frequencies
    for (let char of s) {
        analysis.frequency1[char] = (analysis.frequency1[char] || 0) + 1;
    }
    
    for (let char of t) {
        analysis.frequency2[char] = (analysis.frequency2[char] || 0) + 1;
    }
    
    if (!analysis.lengthMatch) {
        return {
            isAnagram: false,
            reason: 'Different lengths',
            analysis: analysis
        };
    }
    
    // Compare frequencies
    const allChars = new Set([...s, ...t]);
    
    for (let char of allChars) {
        const count1 = analysis.frequency1[char] || 0;
        const count2 = analysis.frequency2[char] || 0;
        
        if (count1 === count2 && count1 > 0) {
            analysis.commonChars.push({ char, count: count1 });
        } else if (count1 > count2) {
            analysis.extraChars.push({ char, extra: count1 - count2 });
        } else if (count2 > count1) {
            analysis.missingChars.push({ char, missing: count2 - count1 });
        }
    }
    
    const isAnagram = analysis.missingChars.length === 0 && analysis.extraChars.length === 0;
    
    return {
        isAnagram: isAnagram,
        reason: isAnagram ? 'Valid anagram' : 'Character frequency mismatch',
        analysis: analysis
    };
}

// Case-insensitive anagram check
function isAnagramCaseInsensitive(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    return isAnagramOptimized(s.toLowerCase(), t.toLowerCase());
}

// Anagram check ignoring spaces and punctuation
function isAnagramIgnoreNonAlpha(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    // Remove non-alphabetic characters and convert to lowercase
    const clean1 = s.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const clean2 = t.replace(/[^a-zA-Z]/g, '').toLowerCase();
    
    return isAnagramOptimized(clean1, clean2);
}

// Find all anagrams in a list
function findAnagrams(words) {
    if (!Array.isArray(words)) {
        return [];
    }
    
    const anagramGroups = {};
    
    words.forEach(word => {
        if (typeof word === 'string') {
            const key = word.split('').sort().join('');
            if (!anagramGroups[key]) {
                anagramGroups[key] = [];
            }
            anagramGroups[key].push(word);
        }
    });
    
    // Return groups with more than one word
    return Object.values(anagramGroups).filter(group => group.length > 1);
}

// Check if string can form anagram with target
function canFormAnagram(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    const charCount = {};
    
    // Count characters in target
    for (let char of t) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Check if source has enough characters
    for (let char of s) {
        if (charCount[char] > 0) {
            charCount[char]--;
        }
    }
    
    // Check if all target characters are satisfied
    return Object.values(charCount).every(count => count === 0);
}

// Generate anagrams of a string
function generateAnagrams(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return [];
    }
    
    if (s.length === 1) {
        return [s];
    }
    
    const anagrams = [];
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const remaining = s.slice(0, i) + s.slice(i + 1);
        const subAnagrams = generateAnagrams(remaining);
        
        for (let subAnagram of subAnagrams) {
            anagrams.push(char + subAnagram);
        }
    }
    
    // Remove duplicates
    return [...new Set(anagrams)];
}

// ============= HELPER FUNCTIONS =============

function validateAnagramInput(s, t) {
    const errors = [];
    
    if (typeof s !== 'string') {
        errors.push('First parameter must be a string');
    }
    
    if (typeof t !== 'string') {
        errors.push('Second parameter must be a string');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getCharacterFrequency(str) {
    if (typeof str !== 'string') {
        return {};
    }
    
    const frequency = {};
    for (let char of str) {
        frequency[char] = (frequency[char] || 0) + 1;
    }
    return frequency;
}

function compareFrequencies(freq1, freq2) {
    const allKeys = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);
    
    for (let key of allKeys) {
        if ((freq1[key] || 0) !== (freq2[key] || 0)) {
            return false;
        }
    }
    
    return true;
}

function analyzeStrings(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return null;
    }
    
    return {
        string1: s,
        string2: t,
        length1: s.length,
        length2: t.length,
        lengthDifference: Math.abs(s.length - t.length),
        uniqueChars1: new Set(s).size,
        uniqueChars2: new Set(t).size,
        commonChars: new Set([...s].filter(char => t.includes(char))).size,
        frequency1: getCharacterFrequency(s),
        frequency2: getCharacterFrequency(t)
    };
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeAnagramCheck(s, t) {
    console.log("\n=== Visualizing Anagram Check ===");
    
    const validation = validateAnagramInput(s, t);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return false;
    }
    
    console.log(`String 1: "${s}"`);
    console.log(`String 2: "${t}"`);
    
    const analysis = analyzeStrings(s, t);
    
    console.log(`\n📊 Basic Analysis:`);
    console.log(`  Length 1: ${analysis.length1}`);
    console.log(`  Length 2: ${analysis.length2}`);
    console.log(`  Length match: ${analysis.length1 === analysis.length2 ? 'Yes' : 'No'}`);
    console.log(`  Unique chars 1: ${analysis.uniqueChars1}`);
    console.log(`  Unique chars 2: ${analysis.uniqueChars2}`);
    console.log(`  Common chars: ${analysis.commonChars}`);
    
    if (analysis.length1 !== analysis.length2) {
        console.log(`\n❌ Cannot be anagrams - different lengths`);
        return false;
    }
    
    console.log(`\n🔤 Character Frequency Analysis:`);
    console.log("Char | Count in S1 | Count in S2 | Match");
    console.log("-----|-------------|-------------|-------");
    
    const allChars = new Set([...s, ...t]);
    let isAnagram = true;
    
    for (let char of [...allChars].sort()) {
        const count1 = analysis.frequency1[char] || 0;
        const count2 = analysis.frequency2[char] || 0;
        const match = count1 === count2;
        
        if (!match) isAnagram = false;
        
        const charDisplay = char.padStart(4);
        const count1Display = count1.toString().padStart(11);
        const count2Display = count2.toString().padStart(11);
        const matchDisplay = match ? '✓' : '✗';
        
        console.log(`${charDisplay} | ${count1Display} | ${count2Display} | ${matchDisplay}`);
    }
    
    console.log(`\n🏆 Result: ${isAnagram ? '✅ IS ANAGRAM' : '❌ NOT ANAGRAM'}`);
    
    if (isAnagram) {
        console.log(`\n🎨 Sorted representations:`);
        console.log(`  "${s}" → "${s.split('').sort().join('')}"`);
        console.log(`  "${t}" → "${t.split('').sort().join('')}"`);
    }
    
    return isAnagram;
}

function demonstrateAnagramMethods() {
    console.log("\n=== Demonstrating Anagram Check Methods ===");
    
    const testCases = [
        { s: "anagram", t: "nagaram", expected: true, name: "Basic anagram" },
        { s: "rat", t: "car", expected: false, name: "Not anagram" },
        { s: "listen", t: "silent", expected: true, name: "Classic anagram" },
        { s: "evil", t: "vile", expected: true, name: "Short anagram" },
        { s: "a", t: "aa", expected: false, name: "Different lengths" },
        { s: "ab", t: "ba", expected: true, name: "Two characters" },
        { s: "", t: "", expected: true, name: "Empty strings" },
        { s: "aab", t: "aba", expected: true, name: "Repeated characters" }
    ];
    
    const methods = [
        { name: "Brute Force (Sort)", func: isAnagramBruteForce },
        { name: "Better (Frequency)", func: isAnagramBetter },
        { name: "Optimized (Single Pass)", func: isAnagramOptimized },
        { name: "Functional", func: isAnagramFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`s: "${testCase.s}", t: "${testCase.t}"`);
        console.log(`Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.s, testCase.t);
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
        { name: "Brute Force (Sort)", time: "O(n log n)", space: "O(n)", notes: "Sort both strings" },
        { name: "Better (Frequency)", time: "O(n)", space: "O(1)", notes: "Two-pass frequency count" },
        { name: "Optimized (Single Pass)", time: "O(n)", space: "O(1)", notes: "Single-pass frequency" },
        { name: "Functional", time: "O(n log n)", space: "O(n)", notes: "Functional style sorting" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach                 | Time      | Space | Notes                   |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(24);
        const time = approach.time.padEnd(9);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(23);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\nWhere:");
    console.log("• n = length of input strings");
    console.log("• Space is O(1) assuming fixed alphabet size (e.g., 26 letters)");
    
    console.log("\n🏆 Winner: Optimized (Single Pass Frequency)");
    console.log("• O(n) time complexity - linear");
    console.log("• O(1) space complexity - constant space");
    console.log("• Single pass through both strings");
    console.log("• Early termination on length mismatch");
    console.log("• Most efficient for large inputs");
    
    console.log("\n💡 Key Insights:");
    console.log("• Anagrams must have same length");
    console.log("• Anagrams must have same character frequencies");
    console.log("• Sorting approach is intuitive but slower");
    console.log("• Frequency counting is optimal for this problem");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Valid Anagram ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master character frequency analysis");
    console.log("2. Understand sorting vs counting trade-offs");
    console.log("3. Learn single-pass optimization techniques");
    console.log("4. Practice hash table applications");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Anagram definition and properties");
    console.log("2. Character frequency counting");
    console.log("3. Hash table for O(1) lookups");
    console.log("4. String manipulation techniques");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Anagrams have identical character frequencies");
    console.log("2. Different lengths → impossible to be anagrams");
    console.log("3. Count characters in one string, subtract from other");
    console.log("4. All counts should be zero if anagrams");
    
    console.log("\n⚡ Optimization Strategies:");
    console.log("1. Early termination on length mismatch");
    console.log("2. Single pass instead of two passes");
    console.log("3. Hash table for O(1) character access");
    console.log("4. Avoid unnecessary string operations");
    
    console.log("\n🔧 Implementation Approaches:");
    console.log("Approach 1: Sort both strings and compare");
    console.log("Approach 2: Count frequencies separately");
    console.log("Approach 3: Single pass increment/decrement");
    console.log("Approach 4: Functional programming style");
    
    console.log("\n🎨 Problem Variations:");
    console.log("• Case-insensitive anagrams");
    console.log("• Ignore spaces and punctuation");
    console.log("• Find all anagrams in a list");
    console.log("• Generate all possible anagrams");
    
    visualizeAnagramCheck("listen", "silent");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Word Games:**");
    console.log("   - Scrabble and word puzzles");
    console.log("   - Anagram solvers");
    
    console.log("\n2. **Text Analysis:**");
    console.log("   - Plagiarism detection");
    console.log("   - Text similarity analysis");
    
    console.log("\n3. **Data Processing:**");
    console.log("   - Duplicate detection");
    console.log("   - Data deduplication");
    
    console.log("\n4. **Cryptography:**");
    console.log("   - Simple cipher analysis");
    console.log("   - Pattern recognition");
    
    console.log("\n📊 Example Applications:");
    
    // Word game example
    const wordPairs = [
        ["listen", "silent"],
        ["evil", "vile"],
        ["a gentleman", "elegant man"],
        ["conversation", "voices rant on"]
    ];
    
    console.log(`\nWord Game Examples:`);
    wordPairs.forEach(([word1, word2]) => {
        const isAnagram = isAnagramIgnoreNonAlpha(word1, word2);
        console.log(`"${word1}" & "${word2}" → ${isAnagram ? 'Anagram ✓' : 'Not anagram ✗'}`);
    });
    
    // Find anagram groups
    const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
    console.log(`\nAnagram Groups in [${words.map(w => `"${w}"`).join(', ')}]:`);
    const anagramGroups = findAnagrams(words);
    anagramGroups.forEach((group, index) => {
        console.log(`  Group ${index + 1}: [${group.map(w => `"${w}"`).join(', ')}]`);
    });
    
    // Detailed analysis example
    const detailedExample = isAnagramDetailed("anagram", "nagaram");
    console.log(`\nDetailed Analysis for "anagram" vs "nagaram":`);
    console.log(`  Result: ${detailedExample.isAnagram}`);
    console.log(`  Reason: ${detailedExample.reason}`);
    console.log(`  Common characters: ${detailedExample.analysis.commonChars.length}`);
    
    // Case variations
    const caseTests = [
        ["Listen", "Silent"],
        ["The Eyes", "They See"],
        ["Dormitory", "Dirty Room"]
    ];
    
    console.log(`\nCase-Insensitive & Space-Ignoring Examples:`);
    caseTests.forEach(([s1, s2]) => {
        const result = isAnagramIgnoreNonAlpha(s1, s2);
        console.log(`"${s1}" & "${s2}" → ${result ? 'Anagram ✓' : 'Not anagram ✗'}`);
    });
    
    // Performance comparison
    const longString1 = "a".repeat(1000) + "b".repeat(1000);
    const longString2 = "b".repeat(1000) + "a".repeat(1000);
    
    console.log(`\nPerformance Test (${longString1.length} characters):`);
    console.time("Frequency Method");
    const freqResult = isAnagramOptimized(longString1, longString2);
    console.timeEnd("Frequency Method");
    
    console.time("Sorting Method");
    const sortResult = isAnagramBruteForce(longString1, longString2);
    console.timeEnd("Sorting Method");
    
    console.log(`Both methods result: ${freqResult} (should be ${sortResult})`);
}

// ============= TEST CASES =============

function testValidAnagram() {
    console.log("\n=== Testing Valid Anagram ===");
    
    const testCases = [
        { s: "anagram", t: "nagaram", expected: true, description: "Basic anagram" },
        { s: "rat", t: "car", expected: false, description: "Not anagram" },
        { s: "listen", t: "silent", expected: true, description: "Classic anagram" },
        { s: "evil", t: "vile", expected: true, description: "Short anagram" },
        { s: "a", t: "aa", expected: false, description: "Different lengths" },
        { s: "ab", t: "ba", expected: true, description: "Two characters" },
        { s: "", t: "", expected: true, description: "Empty strings" },
        { s: "aab", t: "aba", expected: true, description: "Repeated characters" },
        { s: "abc", t: "def", expected: false, description: "Completely different" },
        { s: "aabbcc", t: "abcabc", expected: true, description: "Multiple repeats" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`s: "${testCase.s}", t: "${testCase.t}"`);
        
        const result = isAnagramOptimized(testCase.s, testCase.t);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const s = Array.from({length: size}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const t = s.split('').sort(() => Math.random() - 0.5).join(''); // Shuffle to create anagram
        
        console.log(`\nSize: ${size} characters`);
        
        const methods = [
            { name: "Better (Frequency)", func: isAnagramBetter },
            { name: "Optimized (Single Pass)", func: isAnagramOptimized }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(s, t);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: ${result}`);
        });
    });
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { s: null, t: "test", description: "Null first string" },
        { s: "test", t: null, description: "Null second string" },
        { s: 123, t: "test", description: "Non-string first parameter" },
        { s: "test", t: 456, description: "Non-string second parameter" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = isAnagramOptimized(testCase.s, testCase.t);
        console.log(`Result: ${result} (expected: false)`);
        console.log(`Status: ${result === false ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 VALID ANAGRAM - BODHI DSA COURSE");
console.log("=" .repeat(40));

analyzePerformance();
demonstrateAnagramMethods();
testValidAnagram();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    isAnagramBruteForce,
    isAnagramBetter,
    isAnagramOptimized,
    isAnagramFunctional,
    isAnagramDetailed,
    isAnagramCaseInsensitive,
    isAnagramIgnoreNonAlpha,
    findAnagrams,
    canFormAnagram,
    generateAnagrams,
    validateAnagramInput,
    getCharacterFrequency,
    visualizeAnagramCheck,
    demonstrateAnagramMethods,
    interactiveLearning
};
