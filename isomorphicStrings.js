/**
 * Isomorphic Strings
 * Bodhi-DSA Course
 * 
 * Problem: Given two strings s and t, determine if they are isomorphic.
 * Two strings s and t are isomorphic if the characters in s can be replaced to get t.
 * All occurrences of a character must be replaced with the same character while preserving
 * the order of characters. No two characters may map to the same character, but a character
 * may map to itself.
 * 
 * Example:
 * Input: s = "egg", t = "add"
 * Output: true (e->a, g->d)
 * 
 * Input: s = "foo", t = "bar"
 * Output: false (o cannot map to both a and r)
 */

// ============= BRUTE FORCE APPROACH (Two Hash Maps) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Create mappings from s to t and t to s, check consistency

function isIsomorphicBruteForce(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    if (s.length !== t.length) {
        return false;
    }
    
    const mapStoT = {};
    const mapTtoS = {};
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        if (mapStoT[charS]) {
            if (mapStoT[charS] !== charT) {
                return false;
            }
        } else {
            mapStoT[charS] = charT;
        }
        
        if (mapTtoS[charT]) {
            if (mapTtoS[charT] !== charS) {
                return false;
            }
        } else {
            mapTtoS[charT] = charS;
        }
    }
    
    return true;
}

// ============= BETTER APPROACH (Single Hash Map with Set) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use one map for s->t and set to track used characters in t

function isIsomorphicBetter(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    if (s.length !== t.length) {
        return false;
    }
    
    const mapping = {};
    const usedChars = new Set();
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        if (mapping[charS]) {
            if (mapping[charS] !== charT) {
                return false;
            }
        } else {
            if (usedChars.has(charT)) {
                return false;
            }
            mapping[charS] = charT;
            usedChars.add(charT);
        }
    }
    
    return true;
}

// ============= OPTIMIZED APPROACH (Pattern Matching) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Convert both strings to pattern and compare

function isIsomorphicOptimized(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    if (s.length !== t.length) {
        return false;
    }
    
    return getPattern(s) === getPattern(t);
}

function getPattern(str) {
    const charMap = {};
    let pattern = '';
    let nextId = 0;
    
    for (let char of str) {
        if (!(char in charMap)) {
            charMap[char] = nextId++;
        }
        pattern += charMap[char] + ',';
    }
    
    return pattern;
}

// ============= FUNCTIONAL APPROACH (Array Methods) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Functional programming with array methods

function isIsomorphicFunctional(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return false;
    }
    
    if (s.length !== t.length) {
        return false;
    }
    
    const normalize = str => {
        const charMap = new Map();
        let id = 0;
        return str.split('').map(char => {
            if (!charMap.has(char)) {
                charMap.set(char, id++);
            }
            return charMap.get(char);
        }).join(',');
    };
    
    return normalize(s) === normalize(t);
}

// ============= ADVANCED VARIATIONS =============

function isIsomorphicDetailed(s, t) {
    if (typeof s !== 'string' || typeof t !== 'string') {
        return {
            isIsomorphic: false,
            reason: 'Invalid input types',
            mapping: null
        };
    }
    
    if (s.length !== t.length) {
        return {
            isIsomorphic: false,
            reason: 'Different lengths',
            mapping: null
        };
    }
    
    const mapping = {};
    const reverseMapping = {};
    const conflicts = [];
    
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        if (mapping[charS] && mapping[charS] !== charT) {
            conflicts.push({
                position: i,
                char: charS,
                expected: mapping[charS],
                actual: charT
            });
        } else {
            mapping[charS] = charT;
        }
        
        if (reverseMapping[charT] && reverseMapping[charT] !== charS) {
            conflicts.push({
                position: i,
                char: charT,
                expected: reverseMapping[charT],
                actual: charS
            });
        } else {
            reverseMapping[charT] = charS;
        }
    }
    
    return {
        isIsomorphic: conflicts.length === 0,
        reason: conflicts.length === 0 ? 'Valid mapping' : 'Mapping conflicts',
        mapping: conflicts.length === 0 ? mapping : null,
        conflicts: conflicts
    };
}

function findIsomorphicPairs(strings) {
    if (!Array.isArray(strings)) {
        return [];
    }
    
    const pairs = [];
    
    for (let i = 0; i < strings.length; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            if (typeof strings[i] === 'string' && typeof strings[j] === 'string') {
                if (isIsomorphicOptimized(strings[i], strings[j])) {
                    pairs.push([strings[i], strings[j]]);
                }
            }
        }
    }
    
    return pairs;
}

function groupIsomorphicStrings(strings) {
    if (!Array.isArray(strings)) {
        return [];
    }
    
    const groups = {};
    
    strings.forEach(str => {
        if (typeof str === 'string') {
            const pattern = getPattern(str);
            if (!groups[pattern]) {
                groups[pattern] = [];
            }
            groups[pattern].push(str);
        }
    });
    
    return Object.values(groups).filter(group => group.length > 0);
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeIsomorphicCheck(s, t) {
    console.log("\n=== Visualizing Isomorphic String Check ===");
    console.log(`String 1: "${s}"`);
    console.log(`String 2: "${t}"`);
    
    if (s.length !== t.length) {
        console.log(`❌ Cannot be isomorphic - different lengths`);
        return false;
    }
    
    const detailed = isIsomorphicDetailed(s, t);
    
    console.log(`\n🔤 Character Mapping:`);
    if (detailed.isIsomorphic) {
        Object.entries(detailed.mapping).forEach(([from, to]) => {
            console.log(`  '${from}' → '${to}'`);
        });
        
        console.log(`\n🎨 Pattern Representation:`);
        console.log(`  "${s}" → Pattern: ${getPattern(s)}`);
        console.log(`  "${t}" → Pattern: ${getPattern(t)}`);
    } else {
        console.log(`\n⚠️  Mapping Conflicts:`);
        detailed.conflicts.forEach((conflict, index) => {
            console.log(`  ${index + 1}. Position ${conflict.position}: '${conflict.char}' conflict`);
        });
    }
    
    console.log(`\n🏆 Result: ${detailed.isIsomorphic ? '✅ IS ISOMORPHIC' : '❌ NOT ISOMORPHIC'}`);
    
    return detailed.isIsomorphic;
}

function demonstrateIsomorphicMethods() {
    console.log("\n=== Demonstrating Isomorphic String Methods ===");
    
    const testCases = [
        { s: "egg", t: "add", expected: true, name: "Basic isomorphic" },
        { s: "foo", t: "bar", expected: false, name: "Not isomorphic" },
        { s: "paper", t: "title", expected: true, name: "Complex isomorphic" },
        { s: "ab", t: "aa", expected: false, name: "One-to-many mapping" },
        { s: "abba", t: "cddc", expected: true, name: "Palindromic pattern" }
    ];
    
    const methods = [
        { name: "Brute Force", func: isIsomorphicBruteForce },
        { name: "Better", func: isIsomorphicBetter },
        { name: "Optimized", func: isIsomorphicOptimized },
        { name: "Functional", func: isIsomorphicFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`s: "${testCase.s}", t: "${testCase.t}"`);
        console.log(`Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            const result = method.func(testCase.s, testCase.t);
            const status = result === testCase.expected ? '✅' : '❌';
            console.log(`${method.name}: ${result} ${status}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n)", space: "O(n)", notes: "Two hash maps" },
        { name: "Better", time: "O(n)", space: "O(n)", notes: "One map + set" },
        { name: "Optimized", time: "O(n)", space: "O(n)", notes: "Pattern matching" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Functional style" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Approach    | Time | Space | Notes           |");
    console.log("=".repeat(80));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(15);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log("\n🏆 Winner: Pattern Matching (Optimized)");
    console.log("• Clean separation of concerns");
    console.log("• Reusable pattern generation");
    console.log("• Easy to understand and debug");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Pattern Recognition:**");
    console.log("   - Template matching");
    console.log("   - Code pattern analysis");
    
    console.log("\n2. **Data Transformation:**");
    console.log("   - Character encoding/decoding");
    console.log("   - Data format conversion");
    
    console.log("\n📊 Example Applications:");
    
    const patterns = [
        ["abc", "def"],
        ["aab", "xxy"],
        ["abba", "cddc"]
    ];
    
    console.log(`\nPattern Matching Examples:`);
    patterns.forEach(([s, t]) => {
        const isIso = isIsomorphicOptimized(s, t);
        console.log(`"${s}" & "${t}" → ${isIso ? 'Isomorphic ✓' : 'Not isomorphic ✗'}`);
    });
    
    const words = ["egg", "add", "foo", "bar", "abc", "def"];
    console.log(`\nIsomorphic Groups:`);
    const groups = groupIsomorphicStrings(words);
    groups.forEach((group, index) => {
        if (group.length > 1) {
            console.log(`  Group ${index + 1}: [${group.map(w => `"${w}"`).join(', ')}]`);
        }
    });
}

// ============= TEST CASES =============

function testIsomorphicStrings() {
    console.log("\n=== Testing Isomorphic Strings ===");
    
    const testCases = [
        { s: "egg", t: "add", expected: true, description: "Basic isomorphic" },
        { s: "foo", t: "bar", expected: false, description: "Not isomorphic" },
        { s: "paper", t: "title", expected: true, description: "Complex isomorphic" },
        { s: "ab", t: "aa", expected: false, description: "One-to-many mapping" },
        { s: "abba", t: "cddc", expected: true, description: "Palindromic pattern" },
        { s: "", t: "", expected: true, description: "Empty strings" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`s: "${testCase.s}", t: "${testCase.t}"`);
        
        const result = isIsomorphicOptimized(testCase.s, testCase.t);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ISOMORPHIC STRINGS - BODHI DSA COURSE");
console.log("=" .repeat(45));

analyzePerformance();
demonstrateIsomorphicMethods();
testIsomorphicStrings();
practicalApplications();

// Export functions
module.exports = {
    isIsomorphicBruteForce,
    isIsomorphicBetter,
    isIsomorphicOptimized,
    isIsomorphicFunctional,
    isIsomorphicDetailed,
    findIsomorphicPairs,
    groupIsomorphicStrings,
    getPattern,
    visualizeIsomorphicCheck,
    demonstrateIsomorphicMethods
};
