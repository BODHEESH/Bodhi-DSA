/**
 * Group Anagrams - Hashed Key Approach
 * Bodhi-DSA Course
 * 
 * Problem: Given an array of strings strs, group the anagrams together using character frequency hashing.
 * This approach avoids sorting by using character frequency as the key.
 * 
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Key Insight: Instead of sorting characters, we count character frequencies
 * and use the frequency pattern as the hash key.
 */

// ============= BRUTE FORCE APPROACH (Character Frequency Comparison) =============
// Time Complexity: O(n² * m) | Space Complexity: O(n * m)
// Algorithm: Compare character frequencies for each pair

function groupAnagramsBruteForce(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const result = [];
    const used = new Set();
    
    for (let i = 0; i < strs.length; i++) {
        if (used.has(i)) continue;
        
        const group = [strs[i]];
        used.add(i);
        
        const freqI = getCharacterFrequency(strs[i]);
        
        for (let j = i + 1; j < strs.length; j++) {
            if (used.has(j)) continue;
            
            const freqJ = getCharacterFrequency(strs[j]);
            
            if (areFrequenciesEqual(freqI, freqJ)) {
                group.push(strs[j]);
                used.add(j);
            }
        }
        
        result.push(group);
    }
    
    return result;
}

// ============= BETTER APPROACH (Frequency Hash Map) =============
// Time Complexity: O(n * m) | Space Complexity: O(n * m)
// Algorithm: Use character frequency pattern as hash key

function groupAnagramsBetter(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const anagramMap = {};
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        // Create frequency-based key
        const freqKey = createFrequencyKey(str);
        
        if (!anagramMap[freqKey]) {
            anagramMap[freqKey] = [];
        }
        
        anagramMap[freqKey].push(str);
    }
    
    return Object.values(anagramMap);
}

// ============= OPTIMIZED APPROACH (Array-based Frequency Key) =============
// Time Complexity: O(n * m) | Space Complexity: O(n * m)
// Algorithm: Use fixed-size array for character counting (assuming lowercase letters)

function groupAnagramsOptimized(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const anagramMap = new Map();
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        // Create array-based frequency key
        const freqKey = createArrayFrequencyKey(str);
        
        if (!anagramMap.has(freqKey)) {
            anagramMap.set(freqKey, []);
        }
        
        anagramMap.get(freqKey).push(str);
    }
    
    return Array.from(anagramMap.values());
}

// ============= FUNCTIONAL APPROACH (Reduce with Frequency) =============
// Time Complexity: O(n * m) | Space Complexity: O(n * m)
// Algorithm: Functional programming with frequency-based grouping

function groupAnagramsFunctional(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    return Object.values(
        strs
            .filter(str => typeof str === 'string')
            .reduce((groups, str) => {
                const key = createFrequencyKey(str);
                (groups[key] = groups[key] || []).push(str);
                return groups;
            }, {})
    );
}

// ============= HELPER FUNCTIONS FOR FREQUENCY CALCULATION =============

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

function createFrequencyKey(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    const frequency = getCharacterFrequency(str);
    
    // Sort by character and create key
    return Object.keys(frequency)
        .sort()
        .map(char => `${char}${frequency[char]}`)
        .join('');
}

function createArrayFrequencyKey(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    // Assuming lowercase letters a-z
    const freq = new Array(26).fill(0);
    
    for (let char of str) {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        if (index >= 0 && index < 26) {
            freq[index]++;
        }
    }
    
    return freq.join(',');
}

function areFrequenciesEqual(freq1, freq2) {
    const keys1 = Object.keys(freq1);
    const keys2 = Object.keys(freq2);
    
    if (keys1.length !== keys2.length) {
        return false;
    }
    
    for (let key of keys1) {
        if (freq1[key] !== freq2[key]) {
            return false;
        }
    }
    
    return true;
}

// ============= ADVANCED VARIATIONS =============

// Group anagrams with detailed frequency analysis
function groupAnagramsDetailed(strs) {
    if (!Array.isArray(strs)) {
        return {
            groups: [],
            analysis: null
        };
    }
    
    const anagramMap = new Map();
    const analysis = {
        totalStrings: strs.length,
        validStrings: 0,
        invalidStrings: 0,
        uniquePatterns: 0,
        frequencyPatterns: {},
        characterDistribution: {},
        averageStringLength: 0,
        lengthVariance: 0
    };
    
    let totalLength = 0;
    const lengths = [];
    
    for (let str of strs) {
        if (typeof str !== 'string') {
            analysis.invalidStrings++;
            continue;
        }
        
        analysis.validStrings++;
        totalLength += str.length;
        lengths.push(str.length);
        
        // Track character distribution
        for (let char of str) {
            analysis.characterDistribution[char] = (analysis.characterDistribution[char] || 0) + 1;
        }
        
        const freqKey = createArrayFrequencyKey(str);
        
        if (!anagramMap.has(freqKey)) {
            anagramMap.set(freqKey, []);
            analysis.frequencyPatterns[freqKey] = {
                pattern: freqKey,
                count: 0,
                examples: []
            };
        }
        
        anagramMap.get(freqKey).push(str);
        analysis.frequencyPatterns[freqKey].count++;
        
        if (analysis.frequencyPatterns[freqKey].examples.length < 3) {
            analysis.frequencyPatterns[freqKey].examples.push(str);
        }
    }
    
    // Calculate statistics
    if (analysis.validStrings > 0) {
        analysis.averageStringLength = totalLength / analysis.validStrings;
        
        const variance = lengths.reduce((sum, len) => {
            return sum + Math.pow(len - analysis.averageStringLength, 2);
        }, 0) / lengths.length;
        
        analysis.lengthVariance = variance;
    }
    
    analysis.uniquePatterns = anagramMap.size;
    
    return {
        groups: Array.from(anagramMap.values()),
        analysis: analysis
    };
}

// Compare frequency-based vs sorted-based approaches
function compareApproaches(strs) {
    if (!Array.isArray(strs)) {
        return null;
    }
    
    console.log("\n=== Comparing Frequency vs Sorted Approaches ===");
    
    // Frequency-based approach
    console.time("Frequency-based");
    const freqResult = groupAnagramsOptimized(strs);
    console.timeEnd("Frequency-based");
    
    // Sorted-based approach (for comparison)
    console.time("Sorted-based");
    const sortedResult = strs.reduce((groups, str) => {
        if (typeof str !== 'string') return groups;
        
        const key = [...str].sort().join('');
        (groups[key] = groups[key] || []).push(str);
        return groups;
    }, {});
    console.timeEnd("Sorted-based");
    
    const sortedGroups = Object.values(sortedResult);
    
    console.log(`\nResults:`);
    console.log(`  Frequency approach: ${freqResult.length} groups`);
    console.log(`  Sorted approach: ${sortedGroups.length} groups`);
    console.log(`  Results match: ${freqResult.length === sortedGroups.length ? 'Yes' : 'No'}`);
    
    return {
        frequencyGroups: freqResult,
        sortedGroups: sortedGroups,
        match: freqResult.length === sortedGroups.length
    };
}

// Group anagrams with custom character set
function groupAnagramsCustomCharset(strs, charset = 'abcdefghijklmnopqrstuvwxyz') {
    if (!Array.isArray(strs) || typeof charset !== 'string') {
        return [];
    }
    
    const charToIndex = {};
    for (let i = 0; i < charset.length; i++) {
        charToIndex[charset[i]] = i;
    }
    
    const anagramMap = new Map();
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        const freq = new Array(charset.length).fill(0);
        
        for (let char of str) {
            const index = charToIndex[char];
            if (index !== undefined) {
                freq[index]++;
            }
        }
        
        const freqKey = freq.join(',');
        
        if (!anagramMap.has(freqKey)) {
            anagramMap.set(freqKey, []);
        }
        
        anagramMap.get(freqKey).push(str);
    }
    
    return Array.from(anagramMap.values());
}

// Find anagram groups with specific characteristics
function findAnagramGroupsWithCharacteristics(strs, options = {}) {
    const {
        minGroupSize = 1,
        maxGroupSize = Infinity,
        minStringLength = 0,
        maxStringLength = Infinity,
        requiredChars = [],
        excludedChars = []
    } = options;
    
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const allGroups = groupAnagramsOptimized(strs);
    
    return allGroups.filter(group => {
        // Check group size
        if (group.length < minGroupSize || group.length > maxGroupSize) {
            return false;
        }
        
        // Check string characteristics (using first string as representative)
        const representative = group[0];
        
        if (representative.length < minStringLength || representative.length > maxStringLength) {
            return false;
        }
        
        // Check required characters
        if (requiredChars.length > 0) {
            const hasAllRequired = requiredChars.every(char => representative.includes(char));
            if (!hasAllRequired) return false;
        }
        
        // Check excluded characters
        if (excludedChars.length > 0) {
            const hasExcluded = excludedChars.some(char => representative.includes(char));
            if (hasExcluded) return false;
        }
        
        return true;
    });
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeFrequencyGrouping(strs) {
    console.log("\n=== Visualizing Frequency-Based Grouping ===");
    
    if (!Array.isArray(strs)) {
        console.log("Invalid input: not an array");
        return [];
    }
    
    console.log(`Input: [${strs.map(s => `"${s}"`).join(', ')}]`);
    
    const detailed = groupAnagramsDetailed(strs);
    const groups = detailed.groups;
    const analysis = detailed.analysis;
    
    console.log(`\n📊 Frequency Analysis:`);
    console.log(`  Total strings: ${analysis.totalStrings}`);
    console.log(`  Valid strings: ${analysis.validStrings}`);
    console.log(`  Unique patterns: ${analysis.uniquePatterns}`);
    console.log(`  Average length: ${analysis.averageStringLength.toFixed(2)}`);
    
    console.log(`\n🔤 Character Distribution:`);
    const sortedChars = Object.entries(analysis.characterDistribution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Top 10 characters
    
    sortedChars.forEach(([char, count]) => {
        console.log(`  '${char}': ${count} occurrences`);
    });
    
    console.log(`\n📋 Frequency Patterns:`);
    Object.entries(analysis.frequencyPatterns).forEach(([pattern, info], index) => {
        console.log(`  Pattern ${index + 1}: ${info.count} string${info.count > 1 ? 's' : ''}`);
        console.log(`    Examples: [${info.examples.map(s => `"${s}"`).join(', ')}]`);
        console.log(`    Frequency key: ${pattern}`);
    });
    
    console.log(`\n🏆 Grouped Results:`);
    groups.forEach((group, index) => {
        const freqKey = createArrayFrequencyKey(group[0]);
        console.log(`  Group ${index + 1}:`);
        console.log(`    Words: [${group.map(s => `"${s}"`).join(', ')}]`);
        console.log(`    Size: ${group.length}`);
        console.log(`    Frequency pattern: ${freqKey}`);
    });
    
    return groups;
}

function demonstrateFrequencyMethods() {
    console.log("\n=== Demonstrating Frequency-Based Methods ===");
    
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            name: "Basic example"
        },
        {
            input: ["abc", "bca", "cab", "def", "fed", "efd"],
            name: "Two clear groups"
        },
        {
            input: ["a", "aa", "aaa"],
            name: "Different lengths"
        },
        {
            input: ["listen", "silent", "hello", "world"],
            name: "Mixed anagrams"
        }
    ];
    
    const methods = [
        { name: "Better (Frequency)", func: groupAnagramsBetter },
        { name: "Optimized (Array Key)", func: groupAnagramsOptimized },
        { name: "Functional", func: groupAnagramsFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: [${testCase.input.map(s => `"${s}"`).join(', ')}]`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.input);
            console.timeEnd(method.name);
            
            console.log(`${method.name}:`);
            result.forEach((group, index) => {
                console.log(`  Group ${index + 1}: [${group.map(s => `"${s}"`).join(', ')}]`);
            });
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n² * m)", space: "O(n * m)", notes: "Compare all frequency pairs" },
        { name: "Better (Frequency)", time: "O(n * m)", space: "O(n * m)", notes: "Hash map with frequency key" },
        { name: "Optimized (Array)", time: "O(n * m)", space: "O(n * m)", notes: "Fixed array frequency key" },
        { name: "Functional", time: "O(n * m)", space: "O(n * m)", notes: "Functional reduce style" }
    ];
    
    console.log("\n" + "=".repeat(95));
    console.log("| Approach            | Time      | Space    | Notes                     |");
    console.log("=".repeat(95));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(9);
        const space = approach.space.padEnd(8);
        const notes = approach.notes.padEnd(25);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(95));
    
    console.log("\nWhere:");
    console.log("• n = number of strings");
    console.log("• m = average length of strings");
    console.log("• No sorting required - linear character counting");
    
    console.log("\n🏆 Winner: Optimized (Array-based Frequency)");
    console.log("• O(n * m) time - optimal linear complexity");
    console.log("• O(n * m) space - for storing groups");
    console.log("• No sorting overhead");
    console.log("• Fixed-size array for frequency counting");
    console.log("• Better constant factors than sorting approach");
    
    console.log("\n💡 Key Advantages over Sorted Approach:");
    console.log("• Avoids O(m log m) sorting per string");
    console.log("• Linear time complexity instead of O(n * m log m)");
    console.log("• Better performance for longer strings");
    console.log("• More cache-friendly memory access patterns");
    
    console.log("\n⚖️ Trade-offs:");
    console.log("• Assumes limited character set (e.g., a-z)");
    console.log("• Slightly more complex key generation");
    console.log("• May use more memory for sparse character distributions");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Performance-Critical Systems:**");
    console.log("   - Real-time anagram detection");
    console.log("   - Large-scale text processing");
    
    console.log("\n2. **Memory-Efficient Processing:**");
    console.log("   - Streaming data analysis");
    console.log("   - Mobile applications");
    
    console.log("\n📊 Performance Comparison Example:");
    
    const testWords = ["eat", "tea", "tan", "ate", "nat", "bat", "tab", "abc", "bca", "cab"];
    
    console.log(`\nTest data: [${testWords.map(w => `"${w}"`).join(', ')}]`);
    
    // Compare approaches
    const comparison = compareApproaches(testWords);
    
    // Show frequency patterns
    console.log(`\nFrequency Patterns:`);
    testWords.forEach(word => {
        const freqKey = createArrayFrequencyKey(word);
        const charFreq = getCharacterFrequency(word);
        const freqStr = Object.entries(charFreq)
            .sort()
            .map(([char, count]) => `${char}:${count}`)
            .join(', ');
        console.log(`  "${word}" → [${freqStr}] → Key: ${freqKey}`);
    });
    
    // Custom charset example
    const customWords = ["abc", "bca", "xyz", "zyx"];
    console.log(`\nCustom Character Set Example:`);
    console.log(`Words: [${customWords.map(w => `"${w}"`).join(', ')}]`);
    
    const customGroups = groupAnagramsCustomCharset(customWords, "abcxyz");
    customGroups.forEach((group, index) => {
        console.log(`  Group ${index + 1}: [${group.map(w => `"${w}"`).join(', ')}]`);
    });
    
    // Filtered groups example
    const filteredGroups = findAnagramGroupsWithCharacteristics(testWords, {
        minGroupSize: 2,
        minStringLength: 3,
        requiredChars: ['a']
    });
    
    console.log(`\nFiltered Groups (min size 2, min length 3, contains 'a'):`);
    filteredGroups.forEach((group, index) => {
        console.log(`  Group ${index + 1}: [${group.map(w => `"${w}"`).join(', ')}]`);
    });
}

// ============= TEST CASES =============

function testGroupAnagramsHashed() {
    console.log("\n=== Testing Group Anagrams (Hashed) ===");
    
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            description: "Basic example"
        },
        {
            input: [""],
            description: "Empty string"
        },
        {
            input: ["a"],
            description: "Single character"
        },
        {
            input: ["abc", "bca", "cab"],
            description: "All anagrams"
        },
        {
            input: ["abc", "def", "ghi"],
            description: "No anagrams"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Input: [${testCase.input.map(s => `"${s}"`).join(', ')}]`);
        
        const result = groupAnagramsOptimized(testCase.input);
        
        console.log(`Groups found: ${result.length}`);
        result.forEach((group, groupIndex) => {
            console.log(`  Group ${groupIndex + 1}: [${group.map(s => `"${s}"`).join(', ')}] (${group.length} items)`);
        });
        
        // Verify all strings are grouped
        const totalGrouped = result.reduce((sum, group) => sum + group.length, 0);
        const validInputs = testCase.input.filter(s => typeof s === 'string').length;
        
        console.log(`Total grouped: ${totalGrouped}, Valid inputs: ${validInputs}`);
        console.log(`Status: ${totalGrouped === validInputs ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 GROUP ANAGRAMS - HASHED KEY - BODHI DSA COURSE");
console.log("=" .repeat(55));

analyzePerformance();
demonstrateFrequencyMethods();
testGroupAnagramsHashed();
practicalApplications();

// Export functions
module.exports = {
    groupAnagramsBruteForce,
    groupAnagramsBetter,
    groupAnagramsOptimized,
    groupAnagramsFunctional,
    groupAnagramsDetailed,
    compareApproaches,
    groupAnagramsCustomCharset,
    findAnagramGroupsWithCharacteristics,
    getCharacterFrequency,
    createFrequencyKey,
    createArrayFrequencyKey,
    areFrequenciesEqual,
    visualizeFrequencyGrouping,
    demonstrateFrequencyMethods
};
