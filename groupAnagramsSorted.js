/**
 * Group Anagrams - Sorted Key Approach
 * Bodhi-DSA Course
 * 
 * Problem: Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Input: strs = [""]
 * Output: [[""]]
 * 
 * Input: strs = ["a"]
 * Output: [["a"]]
 */

// ============= BRUTE FORCE APPROACH (Compare All Pairs) =============
// Time Complexity: O(n² * m log m) | Space Complexity: O(n * m)
// Algorithm: Compare each string with every other string using sorting

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
        
        const sortedI = strs[i].split('').sort().join('');
        
        for (let j = i + 1; j < strs.length; j++) {
            if (used.has(j)) continue;
            
            const sortedJ = strs[j].split('').sort().join('');
            
            if (sortedI === sortedJ) {
                group.push(strs[j]);
                used.add(j);
            }
        }
        
        result.push(group);
    }
    
    return result;
}

// ============= BETTER APPROACH (Hash Map with Sorted Keys) =============
// Time Complexity: O(n * m log m) | Space Complexity: O(n * m)
// Algorithm: Use sorted string as key in hash map

function groupAnagramsBetter(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const anagramMap = {};
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        // Sort characters to create key
        const sortedKey = str.split('').sort().join('');
        
        if (!anagramMap[sortedKey]) {
            anagramMap[sortedKey] = [];
        }
        
        anagramMap[sortedKey].push(str);
    }
    
    return Object.values(anagramMap);
}

// ============= OPTIMIZED APPROACH (Efficient Sorting) =============
// Time Complexity: O(n * m log m) | Space Complexity: O(n * m)
// Algorithm: Optimized sorting with Map for better performance

function groupAnagramsOptimized(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const anagramMap = new Map();
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        // Create sorted key efficiently
        const sortedKey = [...str].sort().join('');
        
        if (!anagramMap.has(sortedKey)) {
            anagramMap.set(sortedKey, []);
        }
        
        anagramMap.get(sortedKey).push(str);
    }
    
    return Array.from(anagramMap.values());
}

// ============= FUNCTIONAL APPROACH (Array Methods) =============
// Time Complexity: O(n * m log m) | Space Complexity: O(n * m)
// Algorithm: Functional programming with reduce and array methods

function groupAnagramsFunctional(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    return Object.values(
        strs
            .filter(str => typeof str === 'string')
            .reduce((groups, str) => {
                const key = str.split('').sort().join('');
                (groups[key] = groups[key] || []).push(str);
                return groups;
            }, {})
    );
}

// ============= ADVANCED VARIATIONS =============

// Group anagrams with detailed analysis
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
        largestGroup: 0,
        smallestGroup: Infinity,
        averageGroupSize: 0,
        singletonGroups: 0,
        keyFrequency: {},
        lengthDistribution: {}
    };
    
    // Process strings
    for (let str of strs) {
        if (typeof str !== 'string') {
            analysis.invalidStrings++;
            continue;
        }
        
        analysis.validStrings++;
        
        // Track length distribution
        const len = str.length;
        analysis.lengthDistribution[len] = (analysis.lengthDistribution[len] || 0) + 1;
        
        const sortedKey = [...str].sort().join('');
        
        if (!anagramMap.has(sortedKey)) {
            anagramMap.set(sortedKey, []);
            analysis.keyFrequency[sortedKey] = 0;
        }
        
        anagramMap.get(sortedKey).push(str);
        analysis.keyFrequency[sortedKey]++;
    }
    
    const groups = Array.from(anagramMap.values());
    
    // Calculate statistics
    analysis.uniquePatterns = groups.length;
    
    if (groups.length > 0) {
        const groupSizes = groups.map(group => group.length);
        analysis.largestGroup = Math.max(...groupSizes);
        analysis.smallestGroup = Math.min(...groupSizes);
        analysis.averageGroupSize = groupSizes.reduce((sum, size) => sum + size, 0) / groups.length;
        analysis.singletonGroups = groupSizes.filter(size => size === 1).length;
    }
    
    return {
        groups: groups,
        analysis: analysis
    };
}

// Group anagrams ignoring case
function groupAnagramsCaseInsensitive(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const anagramMap = new Map();
    
    for (let str of strs) {
        if (typeof str !== 'string') continue;
        
        const sortedKey = [...str.toLowerCase()].sort().join('');
        
        if (!anagramMap.has(sortedKey)) {
            anagramMap.set(sortedKey, []);
        }
        
        anagramMap.get(sortedKey).push(str);
    }
    
    return Array.from(anagramMap.values());
}

// Group anagrams with minimum group size filter
function groupAnagramsMinSize(strs, minSize = 2) {
    if (!Array.isArray(strs) || minSize < 1) {
        return [];
    }
    
    const groups = groupAnagramsOptimized(strs);
    return groups.filter(group => group.length >= minSize);
}

// Find largest anagram group
function findLargestAnagramGroup(strs) {
    if (!Array.isArray(strs)) {
        return [];
    }
    
    const groups = groupAnagramsOptimized(strs);
    
    if (groups.length === 0) {
        return [];
    }
    
    return groups.reduce((largest, current) => 
        current.length > largest.length ? current : largest
    );
}

// Count anagram groups by size
function countAnagramGroupsBySize(strs) {
    if (!Array.isArray(strs)) {
        return {};
    }
    
    const groups = groupAnagramsOptimized(strs);
    const sizeCount = {};
    
    groups.forEach(group => {
        const size = group.length;
        sizeCount[size] = (sizeCount[size] || 0) + 1;
    });
    
    return sizeCount;
}

// Get anagram statistics
function getAnagramStatistics(strs) {
    if (!Array.isArray(strs)) {
        return null;
    }
    
    const detailed = groupAnagramsDetailed(strs);
    const groups = detailed.groups;
    const analysis = detailed.analysis;
    
    return {
        totalInputs: strs.length,
        validStrings: analysis.validStrings,
        totalGroups: groups.length,
        largestGroupSize: analysis.largestGroup,
        smallestGroupSize: analysis.smallestGroup === Infinity ? 0 : analysis.smallestGroup,
        averageGroupSize: parseFloat(analysis.averageGroupSize.toFixed(2)),
        singletonGroups: analysis.singletonGroups,
        multipleAnagramGroups: groups.length - analysis.singletonGroups,
        uniquePatterns: analysis.uniquePatterns,
        lengthDistribution: analysis.lengthDistribution
    };
}

// ============= HELPER FUNCTIONS =============

function validateGroupAnagramsInput(strs) {
    const errors = [];
    
    if (!Array.isArray(strs)) {
        errors.push('Input must be an array');
        return { valid: false, errors: errors };
    }
    
    const invalidItems = strs.filter((item, index) => {
        if (typeof item !== 'string') {
            errors.push(`Item at index ${index} is not a string: ${typeof item}`);
            return true;
        }
        return false;
    });
    
    return {
        valid: errors.length === 0,
        errors: errors,
        validCount: strs.length - invalidItems.length,
        invalidCount: invalidItems.length
    };
}

function sortString(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return [...str].sort().join('');
}

function areAnagrams(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        return false;
    }
    
    if (str1.length !== str2.length) {
        return false;
    }
    
    return sortString(str1) === sortString(str2);
}

function findAnagramsOfWord(strs, targetWord) {
    if (!Array.isArray(strs) || typeof targetWord !== 'string') {
        return [];
    }
    
    const targetSorted = sortString(targetWord);
    
    return strs.filter(str => 
        typeof str === 'string' && sortString(str) === targetSorted
    );
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeGroupAnagrams(strs) {
    console.log("\n=== Visualizing Group Anagrams ===");
    
    const validation = validateGroupAnagramsInput(strs);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return [];
    }
    
    console.log(`Input: [${strs.map(s => `"${s}"`).join(', ')}]`);
    
    const detailed = groupAnagramsDetailed(strs);
    const groups = detailed.groups;
    const analysis = detailed.analysis;
    
    console.log(`\n📊 Analysis:`);
    console.log(`  Total strings: ${analysis.totalStrings}`);
    console.log(`  Valid strings: ${analysis.validStrings}`);
    console.log(`  Unique patterns: ${analysis.uniquePatterns}`);
    console.log(`  Total groups: ${groups.length}`);
    console.log(`  Largest group: ${analysis.largestGroup}`);
    console.log(`  Average group size: ${analysis.averageGroupSize.toFixed(2)}`);
    
    console.log(`\n🔤 Grouped Results:`);
    groups.forEach((group, index) => {
        const sortedKey = sortString(group[0]);
        console.log(`  Group ${index + 1} (key: "${sortedKey}"):`);
        console.log(`    [${group.map(s => `"${s}"`).join(', ')}]`);
        console.log(`    Size: ${group.length}`);
    });
    
    console.log(`\n📈 Group Size Distribution:`);
    const sizeCount = countAnagramGroupsBySize(strs);
    Object.entries(sizeCount).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach(([size, count]) => {
        console.log(`  Size ${size}: ${count} group${count > 1 ? 's' : ''}`);
    });
    
    return groups;
}

function demonstrateGroupAnagramMethods() {
    console.log("\n=== Demonstrating Group Anagram Methods ===");
    
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            name: "Basic example"
        },
        {
            input: [""],
            name: "Empty string"
        },
        {
            input: ["a"],
            name: "Single character"
        },
        {
            input: ["abc", "bca", "cab", "xyz", "zyx", "yxz"],
            name: "Two groups"
        },
        {
            input: ["listen", "silent", "hello", "world"],
            name: "Mixed anagrams"
        }
    ];
    
    const methods = [
        { name: "Better (HashMap)", func: groupAnagramsBetter },
        { name: "Optimized (Map)", func: groupAnagramsOptimized },
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
        { name: "Brute Force", time: "O(n² * m log m)", space: "O(n * m)", notes: "Compare all pairs" },
        { name: "Better (HashMap)", time: "O(n * m log m)", space: "O(n * m)", notes: "Hash map with sorted keys" },
        { name: "Optimized (Map)", time: "O(n * m log m)", space: "O(n * m)", notes: "Map with spread operator" },
        { name: "Functional", time: "O(n * m log m)", space: "O(n * m)", notes: "Functional reduce style" }
    ];
    
    console.log("\n" + "=".repeat(100));
    console.log("| Approach           | Time           | Space    | Notes                    |");
    console.log("=".repeat(100));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(14);
        const space = approach.space.padEnd(8);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(100));
    
    console.log("\nWhere:");
    console.log("• n = number of strings");
    console.log("• m = average length of strings");
    console.log("• Sorting dominates the time complexity");
    
    console.log("\n🏆 Winner: Optimized (Map)");
    console.log("• O(n * m log m) time - optimal for sorted key approach");
    console.log("• O(n * m) space - for storing groups");
    console.log("• Map provides better performance than Object");
    console.log("• Spread operator is efficient for small strings");
    console.log("• Clean and readable implementation");
    
    console.log("\n💡 Key Insights:");
    console.log("• Sorting is the bottleneck in this approach");
    console.log("• Hash map groups anagrams efficiently");
    console.log("• Sorted string serves as perfect key");
    console.log("• Alternative: frequency counting can avoid sorting");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Word Games:**");
    console.log("   - Scrabble word grouping");
    console.log("   - Anagram puzzle generators");
    
    console.log("\n2. **Text Analysis:**");
    console.log("   - Document similarity");
    console.log("   - Plagiarism detection");
    
    console.log("\n3. **Data Processing:**");
    console.log("   - Duplicate detection");
    console.log("   - Data clustering");
    
    console.log("\n📊 Example Applications:");
    
    // Word game example
    const gameWords = ["eat", "tea", "ate", "bat", "tab", "cat", "act"];
    console.log(`\nWord Game Grouping:`);
    console.log(`Words: [${gameWords.map(w => `"${w}"`).join(', ')}]`);
    
    const gameGroups = groupAnagramsOptimized(gameWords);
    gameGroups.forEach((group, index) => {
        console.log(`  Group ${index + 1}: [${group.map(w => `"${w}"`).join(', ')}] (${group.length} words)`);
    });
    
    // Statistics example
    const stats = getAnagramStatistics(gameWords);
    console.log(`\nStatistics:`);
    console.log(`  Total groups: ${stats.totalGroups}`);
    console.log(`  Largest group: ${stats.largestGroupSize} words`);
    console.log(`  Groups with multiple anagrams: ${stats.multipleAnagramGroups}`);
    
    // Case-insensitive example
    const mixedCase = ["Listen", "Silent", "HELLO", "world", "Act", "Cat"];
    console.log(`\nCase-Insensitive Grouping:`);
    console.log(`Input: [${mixedCase.map(w => `"${w}"`).join(', ')}]`);
    
    const caseGroups = groupAnagramsCaseInsensitive(mixedCase);
    caseGroups.forEach((group, index) => {
        console.log(`  Group ${index + 1}: [${group.map(w => `"${w}"`).join(', ')}]`);
    });
    
    // Find specific anagrams
    const dictionary = ["listen", "silent", "hello", "world", "eat", "tea", "ate"];
    const target = "tea";
    const anagrams = findAnagramsOfWord(dictionary, target);
    console.log(`\nAnagrams of "${target}" in dictionary:`);
    console.log(`  Found: [${anagrams.map(w => `"${w}"`).join(', ')}]`);
}

// ============= TEST CASES =============

function testGroupAnagrams() {
    console.log("\n=== Testing Group Anagrams ===");
    
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
            description: "Basic example"
        },
        {
            input: [""],
            expected: [[""]],
            description: "Empty string"
        },
        {
            input: ["a"],
            expected: [["a"]],
            description: "Single character"
        },
        {
            input: ["abc", "bca", "cab"],
            expected: [["abc", "bca", "cab"]],
            description: "All anagrams"
        },
        {
            input: ["abc", "def", "ghi"],
            expected: [["abc"], ["def"], ["ghi"]],
            description: "No anagrams"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Input: [${testCase.input.map(s => `"${s}"`).join(', ')}]`);
        
        const result = groupAnagramsOptimized(testCase.input);
        
        // Sort groups for comparison
        const sortedResult = result.map(group => [...group].sort()).sort();
        const sortedExpected = testCase.expected.map(group => [...group].sort()).sort();
        
        console.log(`Expected groups: ${testCase.expected.length}`);
        console.log(`Actual groups: ${result.length}`);
        
        const isEqual = JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
        
        if (!isEqual) {
            console.log(`Expected: ${JSON.stringify(testCase.expected)}`);
            console.log(`Actual: ${JSON.stringify(result)}`);
        }
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 GROUP ANAGRAMS - SORTED KEY - BODHI DSA COURSE");
console.log("=" .repeat(55));

analyzePerformance();
demonstrateGroupAnagramMethods();
testGroupAnagrams();
practicalApplications();

// Export functions
module.exports = {
    groupAnagramsBruteForce,
    groupAnagramsBetter,
    groupAnagramsOptimized,
    groupAnagramsFunctional,
    groupAnagramsDetailed,
    groupAnagramsCaseInsensitive,
    groupAnagramsMinSize,
    findLargestAnagramGroup,
    countAnagramGroupsBySize,
    getAnagramStatistics,
    validateGroupAnagramsInput,
    sortString,
    areAnagrams,
    findAnagramsOfWord,
    visualizeGroupAnagrams,
    demonstrateGroupAnagramMethods
};
