/**
 * Valid Parentheses
 * Bodhi-DSA Course
 * 
 * Problem: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * 
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 * 
 * Example:
 * Input: s = "()"
 * Output: true
 * 
 * Input: s = "()[]{}"
 * Output: true
 * 
 * Input: s = "(]"
 * Output: false
 */

// Basic Stack implementation
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    toArray() {
        return [...this.items];
    }
}

// ============= BRUTE FORCE APPROACH (String Replacement) =============
// Time Complexity: O(n²) | Space Complexity: O(n)
// Algorithm: Keep removing valid pairs until no more can be removed

function isValidBruteForce(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    console.log(`\n🔄 Brute Force Approach: "${s}"`);
    
    let str = s;
    let iteration = 0;
    
    while (true) {
        iteration++;
        const prevLength = str.length;
        
        console.log(`Iteration ${iteration}: "${str}"`);
        
        // Remove all valid pairs
        str = str.replace(/\(\)/g, '');
        str = str.replace(/\[\]/g, '');
        str = str.replace(/\{\}/g, '');
        
        console.log(`After removal: "${str}"`);
        
        // If no change, we're done
        if (str.length === prevLength) {
            break;
        }
    }
    
    const isValid = str.length === 0;
    console.log(`Result: ${isValid ? '✅ Valid' : '❌ Invalid'} (${iteration} iterations)`);
    
    return isValid;
}

// ============= BETTER APPROACH (Stack with HashMap) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to track opening brackets, check matching closing brackets

function isValidBetter(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    console.log(`\n📚 Better Approach (Stack + HashMap): "${s}"`);
    
    const stack = new Stack();
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    console.log(`Bracket pairs: ${JSON.stringify(pairs)}`);
    console.log(`\nStep-by-step processing:`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char in pairs) {
            // Opening bracket
            stack.push(char);
            console.log(`${i + 1}. '${char}' → Push to stack: [${stack.toArray().join(', ')}]`);
        } else if (Object.values(pairs).includes(char)) {
            // Closing bracket
            if (stack.isEmpty()) {
                console.log(`${i + 1}. '${char}' → Stack empty, no matching opener ❌`);
                return false;
            }
            
            const top = stack.pop();
            if (pairs[top] !== char) {
                console.log(`${i + 1}. '${char}' → Expected '${pairs[top]}' but got '${char}' ❌`);
                return false;
            }
            
            console.log(`${i + 1}. '${char}' → Matches '${top}', stack: [${stack.toArray().join(', ')}] ✅`);
        } else {
            console.log(`${i + 1}. '${char}' → Invalid character ❌`);
            return false;
        }
    }
    
    const isValid = stack.isEmpty();
    console.log(`\nFinal check: Stack ${isValid ? 'is empty' : 'has remaining'} → ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    
    if (!isValid) {
        console.log(`Unmatched opening brackets: [${stack.toArray().join(', ')}]`);
    }
    
    return isValid;
}

// ============= OPTIMIZED APPROACH (Stack with Array) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use array as stack, direct character comparison

function isValidOptimized(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    console.log(`\n⚡ Optimized Approach: "${s}"`);
    
    const stack = [];
    const pairs = { '(': ')', '[': ']', '{': '}' };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char in pairs) {
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            if (stack.length === 0 || pairs[stack.pop()] !== char) {
                console.log(`Invalid at position ${i}: '${char}'`);
                return false;
            }
        }
    }
    
    const isValid = stack.length === 0;
    console.log(`Result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    
    return isValid;
}

// ============= FUNCTIONAL APPROACH (Reduce) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use functional programming with reduce

function isValidFunctional(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    console.log(`\n🎯 Functional Approach: "${s}"`);
    
    const pairs = { '(': ')', '[': ']', '{': '}' };
    
    try {
        const finalStack = s.split('').reduce((stack, char) => {
            if (char in pairs) {
                stack.push(char);
            } else if (Object.values(pairs).includes(char)) {
                if (stack.length === 0 || pairs[stack.pop()] !== char) {
                    throw new Error(`Invalid bracket: ${char}`);
                }
            }
            return stack;
        }, []);
        
        const isValid = finalStack.length === 0;
        console.log(`Result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        return isValid;
    } catch (error) {
        console.log(`Result: ❌ Invalid (${error.message})`);
        return false;
    }
}

// ============= ADVANCED VARIATIONS =============

// Check validity with detailed error reporting
function isValidDetailed(s) {
    if (typeof s !== 'string') {
        return {
            isValid: false,
            error: 'Input must be a string',
            position: -1,
            expected: null,
            actual: null
        };
    }
    
    const stack = new Stack();
    const pairs = { '(': ')', '[': ']', '{': '}' };
    const openBrackets = Object.keys(pairs);
    const closeBrackets = Object.values(pairs);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (openBrackets.includes(char)) {
            stack.push({ char, position: i });
        } else if (closeBrackets.includes(char)) {
            if (stack.isEmpty()) {
                return {
                    isValid: false,
                    error: 'Closing bracket without matching opening bracket',
                    position: i,
                    expected: null,
                    actual: char
                };
            }
            
            const top = stack.pop();
            if (pairs[top.char] !== char) {
                return {
                    isValid: false,
                    error: 'Mismatched bracket pair',
                    position: i,
                    expected: pairs[top.char],
                    actual: char,
                    openPosition: top.position
                };
            }
        } else {
            return {
                isValid: false,
                error: 'Invalid character',
                position: i,
                expected: 'Valid bracket character',
                actual: char
            };
        }
    }
    
    if (!stack.isEmpty()) {
        const unmatched = stack.toArray();
        return {
            isValid: false,
            error: 'Unmatched opening brackets',
            position: unmatched[0].position,
            expected: pairs[unmatched[0].char],
            actual: 'end of string',
            unmatchedBrackets: unmatched.map(b => ({ char: b.char, position: b.position }))
        };
    }
    
    return {
        isValid: true,
        error: null,
        position: -1,
        expected: null,
        actual: null
    };
}

// Check validity with custom bracket pairs
function isValidCustom(s, customPairs = {}) {
    if (typeof s !== 'string') {
        return false;
    }
    
    const pairs = { '(': ')', '[': ']', '{': '}', ...customPairs };
    const stack = new Stack();
    
    console.log(`\n🔧 Custom Brackets: ${JSON.stringify(pairs)}`);
    
    for (let char of s) {
        if (char in pairs) {
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            if (stack.isEmpty() || pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }
    
    return stack.isEmpty();
}

// Count minimum insertions needed to make valid
function minInsertionsToMakeValid(s) {
    if (typeof s !== 'string') {
        return -1;
    }
    
    console.log(`\n🔧 Min Insertions for: "${s}"`);
    
    let openNeeded = 0;  // Opening brackets needed
    let closeNeeded = 0; // Closing brackets needed
    
    for (let char of s) {
        if (char === '(') {
            closeNeeded++;
        } else if (char === ')') {
            if (closeNeeded > 0) {
                closeNeeded--;
            } else {
                openNeeded++;
            }
        }
    }
    
    const totalInsertions = openNeeded + closeNeeded;
    console.log(`Opening brackets needed: ${openNeeded}`);
    console.log(`Closing brackets needed: ${closeNeeded}`);
    console.log(`Total insertions: ${totalInsertions}`);
    
    return totalInsertions;
}

// Generate all valid parentheses combinations
function generateParentheses(n) {
    if (n <= 0) return [];
    
    console.log(`\n🎲 Generating all valid combinations for n=${n}:`);
    
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    
    console.log(`Generated ${result.length} combinations:`);
    result.forEach((combo, index) => {
        console.log(`${index + 1}. "${combo}"`);
    });
    
    return result;
}

// ============= HELPER FUNCTIONS =============

function validateInput(s) {
    const errors = [];
    
    if (typeof s !== 'string') {
        errors.push('Input must be a string');
    } else {
        const validChars = '()[]{}';
        for (let i = 0; i < s.length; i++) {
            if (!validChars.includes(s[i])) {
                errors.push(`Invalid character '${s[i]}' at position ${i}`);
            }
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getBracketType(char) {
    const types = {
        '(': 'parenthesis', ')': 'parenthesis',
        '[': 'square', ']': 'square',
        '{': 'curly', '}': 'curly'
    };
    return types[char] || 'unknown';
}

function isOpeningBracket(char) {
    return '([{'.includes(char);
}

function isClosingBracket(char) {
    return ')]}'.includes(char);
}

function getMatchingBracket(char) {
    const pairs = { '(': ')', '[': ']', '{': '}', ')': '(', ']': '[', '}': '{' };
    return pairs[char];
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeValidation(s) {
    console.log(`\n🎬 Visualizing Validation Process for: "${s}"`);
    
    const stack = new Stack();
    const pairs = { '(': ')', '[': ']', '{': '}' };
    const steps = [];
    
    console.log(`\n📋 Step-by-step process:`);
    console.log(`Input: "${s}"`);
    console.log(`Bracket pairs: ( ), [ ], { }`);
    console.log(`\nProcessing each character:`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const step = { position: i, char: char, action: '', stackBefore: [...stack.toArray()], stackAfter: [], valid: true };
        
        if (char in pairs) {
            stack.push(char);
            step.action = `Push '${char}' (opening bracket)`;
            step.stackAfter = [...stack.toArray()];
        } else if (Object.values(pairs).includes(char)) {
            if (stack.isEmpty()) {
                step.action = `'${char}' has no matching opener`;
                step.valid = false;
                step.stackAfter = [...stack.toArray()];
            } else {
                const top = stack.peek();
                if (pairs[top] === char) {
                    stack.pop();
                    step.action = `'${char}' matches '${top}', pop stack`;
                    step.stackAfter = [...stack.toArray()];
                } else {
                    step.action = `'${char}' doesn't match '${top}'`;
                    step.valid = false;
                    step.stackAfter = [...stack.toArray()];
                }
            }
        }
        
        steps.push(step);
        
        const stackDisplay = step.stackAfter.length > 0 ? `[${step.stackAfter.join(', ')}]` : '[empty]';
        const status = step.valid ? '✅' : '❌';
        console.log(`${i + 1}. '${char}' → ${step.action} → Stack: ${stackDisplay} ${status}`);
        
        if (!step.valid) {
            console.log(`   ❌ Validation failed at position ${i}`);
            return false;
        }
    }
    
    const finalValid = stack.isEmpty();
    console.log(`\n🏁 Final result:`);
    console.log(`Stack after processing: ${stack.isEmpty() ? '[empty]' : `[${stack.toArray().join(', ')}]`}`);
    console.log(`Result: ${finalValid ? '✅ Valid - All brackets matched' : '❌ Invalid - Unmatched opening brackets'}`);
    
    return finalValid;
}

function demonstrateApproaches() {
    console.log(`\n🎯 Demonstrating Different Approaches`);
    
    const testCases = [
        { input: "()", expected: true, name: "Simple valid" },
        { input: "()[]{}", expected: true, name: "Multiple types" },
        { input: "(]", expected: false, name: "Wrong closing" },
        { input: "([)]", expected: false, name: "Interleaved" },
        { input: "{[]}", expected: true, name: "Nested" },
        { input: "((", expected: false, name: "Unmatched opening" },
        { input: "))", expected: false, name: "Unmatched closing" },
        { input: "", expected: true, name: "Empty string" }
    ];
    
    const methods = [
        { name: "Better (Stack + HashMap)", func: isValidBetter },
        { name: "Optimized (Array Stack)", func: isValidOptimized },
        { name: "Functional (Reduce)", func: isValidFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name}: "${testCase.input}" ---`);
        console.log(`Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.input);
            console.timeEnd(method.name);
            
            const status = result === testCase.expected ? '✅' : '❌';
            console.log(`${method.name}: ${result} ${status}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log(`\n📊 Performance Analysis`);
    
    const approaches = [
        { name: "Brute Force", time: "O(n²)", space: "O(n)", notes: "String replacement in loop" },
        { name: "Better (HashMap)", time: "O(n)", space: "O(n)", notes: "Stack + HashMap lookup" },
        { name: "Optimized (Array)", time: "O(n)", space: "O(n)", notes: "Array as stack" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Reduce with stack" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach           | Time  | Space | Notes                    |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log(`\n🏆 Winner: Optimized (Array Stack)`);
    console.log(`• O(n) time complexity - single pass`);
    console.log(`• O(n) space complexity - worst case all opening brackets`);
    console.log(`• Minimal overhead - direct array operations`);
    console.log(`• Most practical for real-world usage`);
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• Stack is perfect for nested structure validation`);
    console.log(`• LIFO property matches bracket closing order`);
    console.log(`• Early termination on first mismatch`);
    console.log(`• Space usage proportional to nesting depth`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Code Editors:**`);
    console.log(`   - Syntax highlighting`);
    console.log(`   - Auto-completion of brackets`);
    
    console.log(`\n2. **Compilers:**`);
    console.log(`   - Syntax validation`);
    console.log(`   - Expression parsing`);
    
    console.log(`\n3. **Mathematical Expressions:**`);
    console.log(`   - Formula validation`);
    console.log(`   - Equation balancing`);
    
    console.log(`\n4. **Configuration Files:**`);
    console.log(`   - JSON validation`);
    console.log(`   - XML/HTML tag matching`);
    
    // Example: Simple expression validator
    console.log(`\n📱 Example: Mathematical Expression Validator`);
    
    class ExpressionValidator {
        constructor() {
            this.operators = '+-*/';
            this.digits = '0123456789';
        }
        
        isValidExpression(expr) {
            console.log(`\n🧮 Validating expression: "${expr}"`);
            
            // First check bracket validity
            const bracketResult = isValidOptimized(expr.replace(/[^()[\]{}]/g, ''));
            if (!bracketResult) {
                console.log(`❌ Invalid brackets`);
                return false;
            }
            
            console.log(`✅ Brackets are valid`);
            
            // Additional expression-specific validation could go here
            console.log(`✅ Expression is valid`);
            return true;
        }
    }
    
    const validator = new ExpressionValidator();
    validator.isValidExpression("(2 + 3) * [4 - 1]");
    validator.isValidExpression("(2 + 3] * [4 - 1)");
    
    // Example: Custom bracket validator for templates
    console.log(`\n📄 Example: Template Bracket Validator`);
    
    const templatePairs = { '<': '>', '{{': '}}' };
    console.log(`Template with custom brackets: "<div>{{name}}</div>"`);
    
    // Note: This is simplified - real template validation would be more complex
    const simpleTemplate = "<div></div>";
    const customResult = isValidCustom(simpleTemplate, { '<': '>' });
    console.log(`Custom validation result: ${customResult ? '✅ Valid' : '❌ Invalid'}`);
}

// ============= TEST CASES =============

function testValidParentheses() {
    console.log(`\n🧪 Testing Valid Parentheses`);
    
    const testCases = [
        { input: "()", expected: true, description: "Simple parentheses" },
        { input: "()[]{}", expected: true, description: "All bracket types" },
        { input: "(]", expected: false, description: "Wrong closing bracket" },
        { input: "([)]", expected: false, description: "Interleaved brackets" },
        { input: "{[]}", expected: true, description: "Nested brackets" },
        { input: "((()))", expected: true, description: "Multiple nesting" },
        { input: "((", expected: false, description: "Unmatched opening" },
        { input: "))", expected: false, description: "Unmatched closing" },
        { input: "", expected: true, description: "Empty string" },
        { input: "({[]})", expected: true, description: "Complex nesting" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Input: "${testCase.input}"`);
        
        const result = isValidOptimized(testCase.input);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Test detailed error reporting
    console.log(`\n--- Detailed Error Reporting Test ---`);
    const errorTestCases = ["(]", "(()", "())"];
    
    errorTestCases.forEach(testCase => {
        console.log(`\nDetailed analysis for: "${testCase}"`);
        const detailed = isValidDetailed(testCase);
        console.log(`Valid: ${detailed.isValid}`);
        if (!detailed.isValid) {
            console.log(`Error: ${detailed.error}`);
            console.log(`Position: ${detailed.position}`);
            console.log(`Expected: ${detailed.expected}, Got: ${detailed.actual}`);
        }
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 VALID PARENTHESES - BODHI DSA COURSE");
console.log("=" .repeat(45));

analyzePerformance();
demonstrateApproaches();
visualizeValidation("([{}])");
testValidParentheses();
practicalApplications();

// Export functions
module.exports = {
    isValidBruteForce,
    isValidBetter,
    isValidOptimized,
    isValidFunctional,
    isValidDetailed,
    isValidCustom,
    minInsertionsToMakeValid,
    generateParentheses,
    validateInput,
    getBracketType,
    isOpeningBracket,
    isClosingBracket,
    getMatchingBracket,
    visualizeValidation,
    demonstrateApproaches,
    Stack
};
