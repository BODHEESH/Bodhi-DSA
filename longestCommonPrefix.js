/**
 * Longest Common Prefix
 * Bodhi-DSA Course
 * 
 * Problem: Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 * 
 * Example:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 * 
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 * 
 * Input: strs = ["interspecies","interstellar","interstate"]
 * Output: "inters"
 */

// ============= BRUTE FORCE APPROACH (Compare All Pairs) =============
// Time Complexity: O(n²*m) | Space Complexity: O(1)
// Algorithm: Compare each string with every other string

function longestCommonPrefixBruteForce(strs) {
    if (!Array.isArray(strs) || strs.length === 0) {
        return "";
    }
    
    if (strs.length === 1) {
        return strs[0] || "";
    }
    
    let commonPrefix = "";
    const firstString = strs[0] || "";
    
    // Check each character position
    for (let i = 0; i < firstString.length; i++) {
        const currentChar = firstString[i];
        
        // Check if this character exists at position i in all strings
        let isCommon = true;
        for (let j = 1; j < strs.length; j++) {
            if (!strs[j] || i >= strs[j].length || strs[j][i] !== currentChar) {
                isCommon = false;
                break;
            }
        }
        
        if (isCommon) {
            commonPrefix += currentChar;
        } else {
            break;
        }
    }
    
    return commonPrefix;
}

// ============= BETTER APPROACH (Vertical Scanning) =============
// Time Complexity: O(n*m) | Space Complexity: O(1)
// Algorithm: Compare characters vertically across all strings

function longestCommonPrefixBetter(strs) {
    if (!Array.isArray(strs) || strs.length === 0) {
        return "";
    }
    
    if (strs.length === 1) {
        return strs[0] || "";
    }
    
    // Find the minimum length to avoid index out of bounds
    let minLength = Math.min(...strs.map(str => (str || "").length));
    
    let commonPrefix = "";
    
    // Check each character position up to minimum length
    for (let i = 0; i < minLength; i++) {
        const currentChar = strs[0][i];
        
        // Check if all strings have the same character at position i
        for (let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== currentChar) {
                return commonPrefix;
            }
        }
        
        commonPrefix += currentChar;
    }
    
    return commonPrefix;
}

// ============= OPTIMIZED APPROACH (Horizontal Scanning) =============
// Time Complexity: O(n*m) | Space Complexity: O(1)
// Algorithm: Compare strings pairwise, reducing prefix each time

function longestCommonPrefixOptimized(strs) {
    if (!Array.isArray(strs) || strs.length === 0) {
        return "";
    }
    
    if (strs.length === 1) {
        return strs[0] || "";
    }
    
    let prefix = strs[0] || "";
    
    // Compare with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        const currentString = strs[i] || "";
        
        // Find common prefix between current prefix and current string
        let j = 0;
        while (j < prefix.length && j < currentString.length && prefix[j] === currentString[j]) {
            j++;
        }
        
        prefix = prefix.slice(0, j);
        
        // Early termination if no common prefix
        if (prefix === "") {
            return "";
        }
    }
    
    return prefix;
}

// ============= FUNCTIONAL APPROACH (Reduce Method) =============
// Time Complexity: O(n*m) | Space Complexity: O(m)
// Algorithm: Use reduce to find common prefix

function longestCommonPrefixFunctional(strs) {
    if (!Array.isArray(strs) || strs.length === 0) {
        return "";
    }
    
    if (strs.length === 1) {
        return strs[0] || "";
    }
    
    return strs.reduce((prefix, currentString) => {
        if (!prefix || !currentString) {
            return "";
        }
        
        let commonLength = 0;
        const minLength = Math.min(prefix.length, currentString.length);
        
        for (let i = 0; i < minLength; i++) {
            if (prefix[i] === currentString[i]) {
                commonLength++;
            } else {
                break;
            }
        }
        
        return prefix.slice(0, commonLength);
    }, strs[0] || "");
}

// ============= ADVANCED VARIATIONS =============

// Detailed analysis with step tracking
function longestCommonPrefixDetailed(strs) {
    if (!Array.isArray(strs) || strs.length === 0) {
        return {
            prefix: "",
            steps: [],
            analysis: null
        };
    }
    
    const steps = [];
    const analysis = {
        inputCount: strs.length,
        inputStrings: strs.slice(),
        minLength: 0,
        maxLength: 0,
        averageLength: 0
    };
    
    // Analyze input
    const validStrings = strs.filter(s => typeof s === 'string');
    
    if (validStrings.length === 0) {
        return { prefix: "", steps: [], analysis: analysis };
    }
    
    const lengths = validStrings.map(s => s.length);
    analysis.minLength = Math.min(...lengths);
    analysis.maxLength = Math.max(...lengths);
    analysis.averageLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    
    if (validStrings.length === 1) {
        return {
            prefix: validStrings[0],
            steps: [{ step: 1, action: "Single string", result: validStrings[0] }],
            analysis: analysis
        };
    }
    
    let prefix = validStrings[0];
    steps.push({
        step: 1,
        action: "Initialize",
        prefix: prefix,
        comparing: "N/A",
        result: prefix
    });
    
    // Compare with each subsequent string
    for (let i = 1; i < validStrings.length; i++) {
        const currentString = validStrings[i];
        const oldPrefix = prefix;
        
        // Find common prefix
        let j = 0;
        while (j < prefix.length && j < currentString.length && prefix[j] === currentString[j]) {
            j++;
        }
        
        prefix = prefix.slice(0, j);
        
        steps.push({
            step: i + 1,
            action: "Compare",
            prefix: oldPrefix,
            comparing: currentString,
            commonLength: j,
            result: prefix
        });
        
        if (prefix === "") {
            break;
        }
    }
    
    return {
        prefix: prefix,
        steps: steps,
        analysis: analysis
    };
}

// Find all common prefixes (not just longest)
function findAllCommonPrefixes(strs) {
    if (!Array.isArray(strs) || strs.length === 0) {
        return [];
    }
    
    const longestPrefix = longestCommonPrefixOptimized(strs);
    const prefixes = [];
    
    for (let i = 1; i <= longestPrefix.length; i++) {
        prefixes.push(longestPrefix.slice(0, i));
    }
    
    return prefixes;
}

// ============= HELPER FUNCTIONS =============

function validateStringArray(strs) {
    const errors = [];
    
    if (!Array.isArray(strs)) {
        errors.push('Input must be an array');
    }
    
    if (Array.isArray(strs)) {
        if (strs.length === 0) {
            errors.push('Array cannot be empty');
        }
        
        strs.forEach((str, index) => {
            if (typeof str !== 'string' && str !== null && str !== undefined) {
                errors.push(`Element at index ${index} must be a string`);
            }
        });
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getStringStatistics(strs) {
    if (!Array.isArray(strs)) {
        return null;
    }
    
    const validStrings = strs.filter(s => typeof s === 'string');
    
    if (validStrings.length === 0) {
        return {
            count: 0,
            minLength: 0,
            maxLength: 0,
            averageLength: 0,
            totalCharacters: 0
        };
    }
    
    const lengths = validStrings.map(s => s.length);
    
    return {
        count: validStrings.length,
        minLength: Math.min(...lengths),
        maxLength: Math.max(...lengths),
        averageLength: lengths.reduce((sum, len) => sum + len, 0) / lengths.length,
        totalCharacters: lengths.reduce((sum, len) => sum + len, 0)
    };
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeLongestCommonPrefix(strs) {
    console.log("\n=== Visualizing Longest Common Prefix ===");
    
    const validation = validateStringArray(strs);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return "";
    }
    
    console.log(`Input strings: [${strs.map(s => `"${s}"`).join(', ')}]`);
    
    const stats = getStringStatistics(strs);
    console.log(`\n📊 String Statistics:`);
    console.log(`  Count: ${stats.count}`);
    console.log(`  Min length: ${stats.minLength}`);
    console.log(`  Max length: ${stats.maxLength}`);
    console.log(`  Average length: ${stats.averageLength.toFixed(2)}`);
    
    const detailed = longestCommonPrefixDetailed(strs);
    
    console.log(`\n🔍 Step-by-step Analysis:`);
    console.log("Step | Action    | Current Prefix | Comparing With | Result");
    console.log("-----|-----------|----------------|----------------|--------");
    
    detailed.steps.forEach(step => {
        const stepNum = step.step.toString().padStart(4);
        const action = step.action.padEnd(9);
        const prefix = `"${step.prefix || ''}"`.padEnd(14);
        const comparing = `"${step.comparing || 'N/A'}"`.padEnd(14);
        const result = `"${step.result || ''}"`;
        
        console.log(`${stepNum} | ${action} | ${prefix} | ${comparing} | ${result}`);
    });
    
    console.log(`\n🏆 Final Result: "${detailed.prefix}"`);
    
    return detailed.prefix;
}

function demonstrateCommonPrefixMethods() {
    console.log("\n=== Demonstrating Common Prefix Methods ===");
    
    const testCases = [
        { strs: ["flower","flow","flight"], expected: "fl", name: "Basic case" },
        { strs: ["dog","racecar","car"], expected: "", name: "No common prefix" },
        { strs: ["interspecies","interstellar","interstate"], expected: "inters", name: "Long prefix" },
        { strs: ["abc"], expected: "abc", name: "Single string" },
        { strs: ["same","same","same"], expected: "same", name: "Identical strings" }
    ];
    
    const methods = [
        { name: "Brute Force", func: longestCommonPrefixBruteForce },
        { name: "Better (Vertical)", func: longestCommonPrefixBetter },
        { name: "Optimized (Horizontal)", func: longestCommonPrefixOptimized },
        { name: "Functional (Reduce)", func: longestCommonPrefixFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Strings: [${testCase.strs.map(s => `"${s}"`).join(', ')}]`);
        console.log(`Expected: "${testCase.expected}"`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.strs);
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
        { name: "Brute Force", time: "O(n²*m)", space: "O(1)", notes: "Compare all pairs" },
        { name: "Better (Vertical)", time: "O(n*m)", space: "O(1)", notes: "Vertical scanning" },
        { name: "Optimized (Horizontal)", time: "O(n*m)", space: "O(1)", notes: "Horizontal scanning" },
        { name: "Functional (Reduce)", time: "O(n*m)", space: "O(m)", notes: "Reduce method" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach                | Time      | Space | Notes              |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(23);
        const time = approach.time.padEnd(9);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(18);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\n🏆 Winner: Optimized (Horizontal Scanning)");
    console.log("• O(n*m) time complexity - optimal");
    console.log("• O(1) space complexity - constant space");
    console.log("• Early termination when no common prefix");
    console.log("• Simple and intuitive algorithm");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Longest Common Prefix ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master string comparison algorithms");
    console.log("2. Understand different scanning approaches");
    console.log("3. Learn early termination optimization");
    console.log("4. Practice array processing patterns");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Prefix definition and properties");
    console.log("2. Character-by-character comparison");
    console.log("3. Horizontal vs vertical scanning");
    console.log("4. Early termination strategies");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Common prefix must be present in ALL strings");
    console.log("2. Length limited by shortest string");
    console.log("3. First mismatch determines prefix end");
    console.log("4. Empty result if any string starts differently");
    
    visualizeLongestCommonPrefix(["flower", "flow", "flight"]);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **File System Operations:**");
    console.log("   - Find common directory paths");
    console.log("   - Group files by path prefix");
    
    console.log("\n2. **URL Processing:**");
    console.log("   - Extract common base URLs");
    console.log("   - API endpoint grouping");
    
    console.log("\n📊 Example Applications:");
    
    // File system paths
    const filePaths = [
        "/home/user/documents/project/src/main.js",
        "/home/user/documents/project/src/utils.js",
        "/home/user/documents/project/src/config.js"
    ];
    console.log(`\nFile System Paths:`);
    console.log(`Common path: "${longestCommonPrefixOptimized(filePaths)}"`);
    
    // URL processing
    const urls = [
        "https://api.example.com/v1/users",
        "https://api.example.com/v1/posts",
        "https://api.example.com/v1/comments"
    ];
    console.log(`\nURL Processing:`);
    console.log(`Base URL: "${longestCommonPrefixOptimized(urls)}"`);
}

// ============= TEST CASES =============

function testLongestCommonPrefix() {
    console.log("\n=== Testing Longest Common Prefix ===");
    
    const testCases = [
        { strs: ["flower","flow","flight"], expected: "fl", description: "Basic case" },
        { strs: ["dog","racecar","car"], expected: "", description: "No common prefix" },
        { strs: ["interspecies","interstellar","interstate"], expected: "inters", description: "Long prefix" },
        { strs: ["abc"], expected: "abc", description: "Single string" },
        { strs: ["","abc"], expected: "", description: "Empty string" },
        { strs: ["same","same","same"], expected: "same", description: "Identical strings" },
        { strs: [], expected: "", description: "Empty array" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Strings: [${testCase.strs.map(s => `"${s}"`).join(', ')}]`);
        
        const result = longestCommonPrefixOptimized(testCase.strs);
        
        console.log(`Expected: "${testCase.expected}"`);
        console.log(`Actual: "${result}"`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 LONGEST COMMON PREFIX - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateCommonPrefixMethods();
testLongestCommonPrefix();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    longestCommonPrefixBruteForce,
    longestCommonPrefixBetter,
    longestCommonPrefixOptimized,
    longestCommonPrefixFunctional,
    longestCommonPrefixDetailed,
    findAllCommonPrefixes,
    validateStringArray,
    getStringStatistics,
    visualizeLongestCommonPrefix,
    demonstrateCommonPrefixMethods,
    interactiveLearning
};
