/**
 * Remove Outermost Parentheses
 * Bodhi-DSA Course
 * 
 * Problem: A valid parentheses string is either empty "", "(" + A + ")", or A + B,
 * where A and B are valid parentheses strings, and + represents string concatenation.
 * 
 * Given a valid parentheses string s, return s after removing the outermost parentheses
 * of every primitive string in the primitive decomposition of s.
 * 
 * Example:
 * Input: s = "(()())(())"
 * Output: "()()()"
 * Explanation: 
 * - The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
 * - After removing outer parentheses of each part: "()()" + "()" = "()()()"
 * 
 * Input: s = "(()())(())(()(()))"
 * Output: "()()()()(())"
 * 
 * Input: s = "()()"
 * Output: ""
 */

// ============= APPROACH 1: STACK-BASED SOLUTION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to track depth and identify outermost parentheses

function removeOuterParenthesesStack(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n📚 Stack Approach: "${s}"`);
    
    const stack = [];
    const result = [];
    
    console.log(`\nStep-by-step processing:`);
    console.log(`Position | Char | Stack | Action | Result`);
    console.log(`---------|------|-------|--------|--------`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const stackBefore = [...stack];
        let action = '';
        
        if (char === '(') {
            if (stack.length > 0) {
                // Not outermost opening, add to result
                result.push(char);
                action = 'Add to result';
            } else {
                action = 'Skip (outermost)';
            }
            stack.push(char);
        } else if (char === ')') {
            stack.pop();
            if (stack.length > 0) {
                // Not outermost closing, add to result
                result.push(char);
                action = 'Add to result';
            } else {
                action = 'Skip (outermost)';
            }
        }
        
        const stackStr = `[${stackBefore.join('')}]`;
        const resultStr = result.join('');
        console.log(`${i.toString().padStart(8)} | ${char.padStart(4)} | ${stackStr.padStart(5)} | ${action.padStart(14)} | "${resultStr}"`);
    }
    
    const finalResult = result.join('');
    console.log(`\nFinal result: "${finalResult}"`);
    
    return finalResult;
}

// ============= APPROACH 2: COUNTER-BASED SOLUTION =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use counter to track depth without explicit stack

function removeOuterParenthesesCounter(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n⚡ Counter Approach: "${s}"`);
    
    let depth = 0;
    const result = [];
    
    console.log(`\nStep-by-step processing:`);
    console.log(`Position | Char | Depth Before | Depth After | Action | Result`);
    console.log(`---------|------|--------------|-------------|--------|--------`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const depthBefore = depth;
        let action = '';
        
        if (char === '(') {
            if (depth > 0) {
                result.push(char);
                action = 'Add to result';
            } else {
                action = 'Skip (outermost)';
            }
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth > 0) {
                result.push(char);
                action = 'Add to result';
            } else {
                action = 'Skip (outermost)';
            }
        }
        
        const resultStr = result.join('');
        console.log(`${i.toString().padStart(8)} | ${char.padStart(4)} | ${depthBefore.toString().padStart(12)} | ${depth.toString().padStart(11)} | ${action.padStart(14)} | "${resultStr}"`);
    }
    
    const finalResult = result.join('');
    console.log(`\nFinal result: "${finalResult}"`);
    
    return finalResult;
}

// ============= APPROACH 3: STRING BUILDING OPTIMIZATION =============
// Time Complexity: O(n) | Space Complexity: O(1) extra
// Algorithm: Build result string directly without array

function removeOuterParenthesesOptimized(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n🚀 Optimized Approach: "${s}"`);
    
    let depth = 0;
    let result = '';
    
    console.log(`\nProcessing with direct string building:`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(') {
            if (depth > 0) {
                result += char;
            }
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth > 0) {
                result += char;
            }
        }
    }
    
    console.log(`Result: "${result}"`);
    return result;
}

// ============= APPROACH 4: FUNCTIONAL PROGRAMMING =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use reduce with accumulator for functional style

function removeOuterParenthesesFunctional(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n🎯 Functional Approach: "${s}"`);
    
    const result = s.split('').reduce((acc, char) => {
        if (char === '(') {
            if (acc.depth > 0) {
                acc.result += char;
            }
            acc.depth++;
        } else if (char === ')') {
            acc.depth--;
            if (acc.depth > 0) {
                acc.result += char;
            }
        }
        return acc;
    }, { result: '', depth: 0 });
    
    console.log(`Result: "${result.result}"`);
    return result.result;
}

// ============= APPROACH 5: WITHOUT STACK (ALTERNATIVE) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Track primitive boundaries and extract inner parts

function removeOuterParenthesesAlternative(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n🔄 Alternative Approach: "${s}"`);
    
    let result = '';
    let start = 0;
    let depth = 0;
    
    console.log(`\nFinding primitive decompositions:`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth--;
        }
        
        // When depth becomes 0, we've found a complete primitive
        if (depth === 0) {
            const primitive = s.substring(start, i + 1);
            const inner = primitive.substring(1, primitive.length - 1);
            
            console.log(`Primitive: "${primitive}" → Inner: "${inner}"`);
            result += inner;
            
            start = i + 1;
        }
    }
    
    console.log(`Final result: "${result}"`);
    return result;
}

// ============= ADVANCED VARIATIONS =============

// Remove outermost with detailed analysis
function removeOuterParenthesesDetailed(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return {
            result: '',
            primitives: [],
            removedCount: 0
        };
    }
    
    console.log(`\n🔍 Detailed Analysis: "${s}"`);
    
    let depth = 0;
    let start = 0;
    const primitives = [];
    const result = [];
    let removedCount = 0;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(') {
            if (depth > 0) {
                result.push(char);
            } else {
                removedCount++;
            }
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth > 0) {
                result.push(char);
            } else {
                removedCount++;
                const primitive = s.substring(start, i + 1);
                const inner = primitive.substring(1, primitive.length - 1);
                primitives.push({ primitive, inner, start, end: i });
                start = i + 1;
            }
        }
    }
    
    const analysis = {
        result: result.join(''),
        primitives: primitives,
        removedCount: removedCount,
        originalLength: s.length,
        resultLength: result.length
    };
    
    console.log(`\nDetailed Analysis Results:`);
    console.log(`Original: "${s}" (length: ${analysis.originalLength})`);
    console.log(`Result: "${analysis.result}" (length: ${analysis.resultLength})`);
    console.log(`Primitives found: ${primitives.length}`);
    primitives.forEach((p, index) => {
        console.log(`  ${index + 1}. "${p.primitive}" → "${p.inner}" (pos ${p.start}-${p.end})`);
    });
    console.log(`Parentheses removed: ${analysis.removedCount}`);
    
    return analysis;
}

// Handle multiple types of brackets
function removeOuterBrackets(s, brackets = { '(': ')', '[': ']', '{': '}' }) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n🔧 Custom Brackets: "${s}"`);
    console.log(`Bracket pairs: ${JSON.stringify(brackets)}`);
    
    const openBrackets = Object.keys(brackets);
    const closeBrackets = Object.values(brackets);
    const bracketMap = new Map();
    
    // Create reverse mapping
    Object.entries(brackets).forEach(([open, close]) => {
        bracketMap.set(close, open);
    });
    
    let depth = 0;
    const result = [];
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (openBrackets.includes(char)) {
            if (depth > 0) {
                result.push(char);
            }
            depth++;
        } else if (closeBrackets.includes(char)) {
            depth--;
            if (depth > 0) {
                result.push(char);
            }
        } else {
            // Non-bracket character, always include
            result.push(char);
        }
    }
    
    const finalResult = result.join('');
    console.log(`Result: "${finalResult}"`);
    
    return finalResult;
}

// Generate test cases
function generateTestCases() {
    console.log(`\n🎲 Generating Test Cases`);
    
    const testCases = [
        { input: "(()())(())", expected: "()()()", description: "Two primitives with nested" },
        { input: "(()())(())(()(()))", expected: "()()()()(())", description: "Three primitives" },
        { input: "()()", expected: "", description: "Simple primitives only" },
        { input: "((()))", expected: "(())", description: "Single deeply nested" },
        { input: "()", expected: "", description: "Single primitive" },
        { input: "(()(()))", expected: "()(())", description: "Mixed nesting" },
        { input: "", expected: "", description: "Empty string" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: "${testCase.expected}"`);
        
        const result = removeOuterParenthesesOptimized(testCase.input);
        const passed = result === testCase.expected;
        console.log(`Actual: "${result}" ${passed ? '✅' : '❌'}`);
    });
    
    return testCases;
}

// ============= HELPER FUNCTIONS =============

function validateParentheses(s) {
    let depth = 0;
    
    for (let char of s) {
        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth < 0) {
                return false; // More closing than opening
            }
        }
    }
    
    return depth === 0; // All opened brackets are closed
}

function findPrimitiveDecomposition(s) {
    if (!validateParentheses(s)) {
        return [];
    }
    
    const primitives = [];
    let start = 0;
    let depth = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            depth++;
        } else if (s[i] === ')') {
            depth--;
        }
        
        if (depth === 0) {
            primitives.push(s.substring(start, i + 1));
            start = i + 1;
        }
    }
    
    return primitives;
}

function countNestingLevels(s) {
    let maxDepth = 0;
    let currentDepth = 0;
    
    for (let char of s) {
        if (char === '(') {
            currentDepth++;
            maxDepth = Math.max(maxDepth, currentDepth);
        } else if (char === ')') {
            currentDepth--;
        }
    }
    
    return maxDepth;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRemoval(s) {
    console.log(`\n🎬 Visualizing Removal Process`);
    console.log(`Input: "${s}"`);
    
    if (!validateParentheses(s)) {
        console.log(`❌ Invalid parentheses string`);
        return;
    }
    
    // Show primitive decomposition
    const primitives = findPrimitiveDecomposition(s);
    console.log(`\n📋 Primitive Decomposition:`);
    primitives.forEach((primitive, index) => {
        const inner = primitive.substring(1, primitive.length - 1);
        console.log(`${index + 1}. "${primitive}" → "${inner}"`);
    });
    
    // Show step-by-step removal
    console.log(`\n🔄 Step-by-step Removal:`);
    let depth = 0;
    const result = [];
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const before = s.substring(0, i);
        const after = s.substring(i + 1);
        
        let action = '';
        let include = false;
        
        if (char === '(') {
            if (depth > 0) {
                result.push(char);
                action = 'Include (inner opening)';
                include = true;
            } else {
                action = 'Skip (outer opening)';
            }
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth > 0) {
                result.push(char);
                action = 'Include (inner closing)';
                include = true;
            } else {
                action = 'Skip (outer closing)';
            }
        }
        
        console.log(`${i + 1}. "${before}[${char}]${after}" → ${action} → "${result.join('')}"`);
    }
    
    console.log(`\n✅ Final Result: "${result.join('')}"`);
    
    return result.join('');
}

function demonstrateApproaches() {
    console.log(`\n🎯 Demonstrating All Approaches`);
    
    const testString = "(()())(())";
    console.log(`Test string: "${testString}"`);
    
    const approaches = [
        { name: "Stack-based", func: removeOuterParenthesesStack },
        { name: "Counter-based", func: removeOuterParenthesesCounter },
        { name: "Optimized", func: removeOuterParenthesesOptimized },
        { name: "Functional", func: removeOuterParenthesesFunctional },
        { name: "Alternative", func: removeOuterParenthesesAlternative }
    ];
    
    approaches.forEach(approach => {
        console.log(`\n--- ${approach.name} Approach ---`);
        console.time(approach.name);
        const result = approach.func(testString);
        console.timeEnd(approach.name);
        console.log(`Result: "${result}"`);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log(`\n📊 Performance Analysis`);
    
    const approaches = [
        { name: "Stack-based", time: "O(n)", space: "O(n)", notes: "Uses explicit stack" },
        { name: "Counter-based", time: "O(n)", space: "O(1)", notes: "Integer counter only" },
        { name: "Optimized", time: "O(n)", space: "O(1)", notes: "Direct string building" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Reduce with accumulator" },
        { name: "Alternative", time: "O(n)", space: "O(1)", notes: "Primitive boundary tracking" }
    ];
    
    console.log(`\n📈 Complexity Comparison:`);
    console.log("=".repeat(85));
    console.log("| Approach      | Time | Space | Notes                     |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(13);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(25);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log(`\n🏆 Winner: Counter-based Approach`);
    console.log(`• O(n) time complexity - single pass`);
    console.log(`• O(1) space complexity - only counter variable`);
    console.log(`• Simple and intuitive logic`);
    console.log(`• Most efficient for large inputs`);
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• Depth tracking is sufficient - no need for explicit stack`);
    console.log(`• Outermost parentheses are at depth 0→1 and 1→0 transitions`);
    console.log(`• Inner parentheses are at depth > 0`);
    console.log(`• Single pass solution with constant extra space`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Expression Parsing:**`);
    console.log(`   - Remove unnecessary outer grouping`);
    console.log(`   - Simplify mathematical expressions`);
    
    console.log(`\n2. **Code Formatting:**`);
    console.log(`   - Remove redundant parentheses in code`);
    console.log(`   - Simplify conditional expressions`);
    
    console.log(`\n3. **String Processing:**`);
    console.log(`   - Clean up nested structures`);
    console.log(`   - Normalize bracket usage`);
    
    console.log(`\n4. **Compiler Design:**`);
    console.log(`   - Abstract syntax tree simplification`);
    console.log(`   - Expression optimization`);
    
    // Example: Expression simplifier
    console.log(`\n🧮 Example: Expression Simplifier`);
    
    class ExpressionSimplifier {
        constructor() {
            this.operators = '+-*/';
        }
        
        removeRedundantParentheses(expr) {
            console.log(`\n🔧 Simplifying: "${expr}"`);
            
            // Extract only parentheses for processing
            const parenthesesOnly = expr.replace(/[^()]/g, '');
            console.log(`Parentheses structure: "${parenthesesOnly}"`);
            
            if (parenthesesOnly.length === 0) {
                console.log(`No parentheses to remove`);
                return expr;
            }
            
            // Remove outer parentheses from the structure
            const simplified = removeOuterParenthesesOptimized(parenthesesOnly);
            console.log(`Simplified structure: "${simplified}"`);
            
            // In a real implementation, we'd reconstruct the expression
            // For demo purposes, we'll just show the concept
            console.log(`✅ Conceptual simplification demonstrated`);
            
            return expr; // Return original for demo
        }
    }
    
    const simplifier = new ExpressionSimplifier();
    simplifier.removeRedundantParentheses("((a + b))");
    simplifier.removeRedundantParentheses("(a + b) * (c + d)");
    
    // Example: Nested structure cleaner
    console.log(`\n📁 Example: Nested Structure Cleaner`);
    
    class StructureCleaner {
        cleanNestedBrackets(structure, brackets = { '(': ')', '[': ']', '{': '}' }) {
            console.log(`\n🧹 Cleaning: "${structure}"`);
            
            const result = removeOuterBrackets(structure, brackets);
            console.log(`Cleaned: "${result}"`);
            
            return result;
        }
    }
    
    const cleaner = new StructureCleaner();
    cleaner.cleanNestedBrackets("((nested))");
    cleaner.cleanNestedBrackets("[[array]]");
    cleaner.cleanNestedBrackets("{{object}}");
}

// ============= TEST CASES =============

function testRemoveOuterParentheses() {
    console.log(`\n🧪 Testing Remove Outer Parentheses`);
    
    const testCases = [
        { input: "(()())(())", expected: "()()()", description: "Standard case" },
        { input: "(()())(())(()(()))", expected: "()()()()(())", description: "Multiple primitives" },
        { input: "()()", expected: "", description: "Only outer parentheses" },
        { input: "((()))", expected: "(())", description: "Deeply nested" },
        { input: "()", expected: "", description: "Single pair" },
        { input: "(()(()))", expected: "()(())", description: "Mixed nesting" },
        { input: "", expected: "", description: "Empty string" },
        { input: "(((())))", expected: "((()))", description: "Very deep nesting" }
    ];
    
    const approaches = [
        { name: "Stack", func: removeOuterParenthesesStack },
        { name: "Counter", func: removeOuterParenthesesCounter },
        { name: "Optimized", func: removeOuterParenthesesOptimized }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test ${index + 1}: ${testCase.description} ---`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: "${testCase.expected}"`);
        
        approaches.forEach(approach => {
            const result = approach.func(testCase.input);
            const passed = result === testCase.expected;
            console.log(`${approach.name}: "${result}" ${passed ? '✅' : '❌'}`);
        });
    });
    
    // Test detailed analysis
    console.log(`\n--- Detailed Analysis Test ---`);
    const detailedResult = removeOuterParenthesesDetailed("(()())(())");
    console.log(`Analysis completed: ${detailedResult.primitives.length} primitives found`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REMOVE OUTERMOST PARENTHESES - BODHI DSA COURSE");
console.log("=" .repeat(55));

analyzePerformance();
demonstrateApproaches();
visualizeRemoval("(()())(())");
practicalApplications();
testRemoveOuterParentheses();

// Export functions
module.exports = {
    removeOuterParenthesesStack,
    removeOuterParenthesesCounter,
    removeOuterParenthesesOptimized,
    removeOuterParenthesesFunctional,
    removeOuterParenthesesAlternative,
    removeOuterParenthesesDetailed,
    removeOuterBrackets,
    generateTestCases,
    validateParentheses,
    findPrimitiveDecomposition,
    countNestingLevels,
    visualizeRemoval,
    demonstrateApproaches,
    analyzePerformance,
    practicalApplications,
    testRemoveOuterParentheses
};
