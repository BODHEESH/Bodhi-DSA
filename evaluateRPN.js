/**
 * Evaluate Reverse Polish Notation (RPN)
 * Bodhi-DSA Course
 * 
 * Problem: Evaluate the value of an arithmetic expression in Reverse Polish Notation.
 * Valid operators are +, -, *, and /. Each operand may be an integer or another expression.
 * 
 * Note that division between two integers should truncate toward zero.
 * It is guaranteed that the given RPN expression is always valid.
 * 
 * Example:
 * Input: tokens = ["2","1","+","3","*"]
 * Output: 9
 * Explanation: ((2 + 1) * 3) = 9
 * 
 * Input: tokens = ["4","13","5","/","+"]
 * Output: 6
 * Explanation: (4 + (13 / 5)) = 6
 * 
 * Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
 * Output: 22
 */

// ============= APPROACH 1: STACK-BASED SOLUTION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to evaluate RPN expression

function evaluateRPNStack(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
        return 0;
    }
    
    console.log(`\n📚 Stack Approach: [${tokens.join(', ')}]`);
    
    const stack = [];
    const operators = new Set(['+', '-', '*', '/']);
    
    console.log(`\nStep-by-step evaluation:`);
    console.log(`Token | Stack Before | Operation | Stack After | Notes`);
    console.log(`------|--------------|-----------|-------------|-------`);
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const stackBefore = [...stack];
        let operation = '';
        let notes = '';
        
        if (operators.has(token)) {
            // Pop two operands
            const b = stack.pop();
            const a = stack.pop();
            let result;
            
            switch (token) {
                case '+':
                    result = a + b;
                    operation = `${a} + ${b} = ${result}`;
                    break;
                case '-':
                    result = a - b;
                    operation = `${a} - ${b} = ${result}`;
                    break;
                case '*':
                    result = a * b;
                    operation = `${a} * ${b} = ${result}`;
                    break;
                case '/':
                    // Truncate toward zero
                    result = Math.trunc(a / b);
                    operation = `${a} / ${b} = ${result}`;
                    notes = 'Truncated toward zero';
                    break;
            }
            
            stack.push(result);
        } else {
            // Push operand
            const num = parseInt(token);
            stack.push(num);
            operation = `Push ${num}`;
            notes = 'Operand';
        }
        
        const stackBeforeStr = `[${stackBefore.join(', ')}]`;
        const stackAfterStr = `[${stack.join(', ')}]`;
        
        console.log(`${token.padStart(5)} | ${stackBeforeStr.padStart(12)} | ${operation.padStart(9)} | ${stackAfterStr.padStart(11)} | ${notes}`);
    }
    
    const result = stack[0];
    console.log(`\nFinal result: ${result}`);
    
    return result;
}

// ============= APPROACH 2: OPTIMIZED STACK =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Cleaner implementation with helper functions

function evaluateRPNOptimized(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
        return 0;
    }
    
    console.log(`\n⚡ Optimized Approach: [${tokens.join(', ')}]`);
    
    const stack = [];
    
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (const token of tokens) {
        if (token in operations) {
            const b = stack.pop();
            const a = stack.pop();
            const result = operations[token](a, b);
            stack.push(result);
            console.log(`${a} ${token} ${b} = ${result}, Stack: [${stack.join(', ')}]`);
        } else {
            const num = parseInt(token);
            stack.push(num);
            console.log(`Push ${num}, Stack: [${stack.join(', ')}]`);
        }
    }
    
    const result = stack[0];
    console.log(`Result: ${result}`);
    
    return result;
}

// ============= APPROACH 3: RECURSIVE EVALUATION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Recursive approach using array as stack

function evaluateRPNRecursive(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
        return 0;
    }
    
    console.log(`\n🔄 Recursive Approach: [${tokens.join(', ')}]`);
    
    const stack = [];
    
    function evaluate(index) {
        if (index >= tokens.length) {
            return stack[0];
        }
        
        const token = tokens[index];
        console.log(`Processing token ${index}: "${token}"`);
        
        if (['+', '-', '*', '/'].includes(token)) {
            const b = stack.pop();
            const a = stack.pop();
            let result;
            
            switch (token) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = Math.trunc(a / b); break;
            }
            
            stack.push(result);
            console.log(`  ${a} ${token} ${b} = ${result}, Stack: [${stack.join(', ')}]`);
        } else {
            const num = parseInt(token);
            stack.push(num);
            console.log(`  Push ${num}, Stack: [${stack.join(', ')}]`);
        }
        
        return evaluate(index + 1);
    }
    
    const result = evaluate(0);
    console.log(`Final result: ${result}`);
    
    return result;
}

// ============= APPROACH 4: FUNCTIONAL PROGRAMMING =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use reduce with accumulator stack

function evaluateRPNFunctional(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
        return 0;
    }
    
    console.log(`\n🎯 Functional Approach: [${tokens.join(', ')}]`);
    
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    const finalStack = tokens.reduce((stack, token) => {
        if (token in operations) {
            const b = stack.pop();
            const a = stack.pop();
            const result = operations[token](a, b);
            stack.push(result);
            console.log(`${a} ${token} ${b} = ${result}`);
        } else {
            const num = parseInt(token);
            stack.push(num);
            console.log(`Push ${num}`);
        }
        return stack;
    }, []);
    
    const result = finalStack[0];
    console.log(`Result: ${result}`);
    
    return result;
}

// ============= APPROACH 5: IN-PLACE EVALUATION =============
// Time Complexity: O(n) | Space Complexity: O(1) extra
// Algorithm: Use the input array itself as stack (if modification allowed)

function evaluateRPNInPlace(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
        return 0;
    }
    
    console.log(`\n🚀 In-Place Approach: [${tokens.join(', ')}]`);
    console.log(`Note: This modifies the input array`);
    
    let stackTop = -1; // Index of top element in our "stack"
    
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        if (token in operations) {
            const b = parseFloat(tokens[stackTop--]);
            const a = parseFloat(tokens[stackTop--]);
            const result = operations[token](a, b);
            
            tokens[++stackTop] = result.toString();
            console.log(`${a} ${token} ${b} = ${result}, Stack top at index ${stackTop}`);
        } else {
            tokens[++stackTop] = token;
            console.log(`Push ${token} at index ${stackTop}`);
        }
    }
    
    const result = parseFloat(tokens[0]);
    console.log(`Result: ${result}`);
    
    return result;
}

// ============= ADVANCED VARIATIONS =============

// RPN Calculator with detailed steps
class RPNCalculator {
    constructor() {
        this.steps = [];
        this.operations = {
            '+': { func: (a, b) => a + b, precedence: 1, associativity: 'left' },
            '-': { func: (a, b) => a - b, precedence: 1, associativity: 'left' },
            '*': { func: (a, b) => a * b, precedence: 2, associativity: 'left' },
            '/': { func: (a, b) => Math.trunc(a / b), precedence: 2, associativity: 'left' },
            '^': { func: (a, b) => Math.pow(a, b), precedence: 3, associativity: 'right' }
        };
    }
    
    evaluate(tokens) {
        console.log(`\n🧮 RPN Calculator: [${tokens.join(', ')}]`);
        
        this.steps = [];
        const stack = [];
        
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            if (token in this.operations) {
                const b = stack.pop();
                const a = stack.pop();
                const result = this.operations[token].func(a, b);
                
                const step = {
                    index: i,
                    token: token,
                    operands: [a, b],
                    operation: `${a} ${token} ${b}`,
                    result: result,
                    stackBefore: [...stack, a, b],
                    stackAfter: [...stack, result]
                };
                
                this.steps.push(step);
                stack.push(result);
                
                console.log(`Step ${this.steps.length}: ${step.operation} = ${result}`);
            } else {
                const num = parseFloat(token);
                stack.push(num);
                console.log(`Push: ${num}`);
            }
        }
        
        return stack[0];
    }
    
    getSteps() {
        return this.steps;
    }
    
    getDetailedReport() {
        console.log(`\n📋 Detailed Calculation Report:`);
        console.log(`Total steps: ${this.steps.length}`);
        
        this.steps.forEach((step, index) => {
            console.log(`\nStep ${index + 1}:`);
            console.log(`  Token: ${step.token}`);
            console.log(`  Operation: ${step.operation}`);
            console.log(`  Result: ${step.result}`);
            console.log(`  Stack before: [${step.stackBefore.join(', ')}]`);
            console.log(`  Stack after: [${step.stackAfter.join(', ')}]`);
        });
    }
}

// Convert infix to RPN (bonus feature)
function infixToRPN(infix) {
    console.log(`\n🔄 Converting Infix to RPN: "${infix}"`);
    
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const associativity = { '+': 'L', '-': 'L', '*': 'L', '/': 'L', '^': 'R' };
    
    const output = [];
    const operators = [];
    const tokens = infix.match(/\d+|[+\-*/^()]/g) || [];
    
    console.log(`Tokens: [${tokens.join(', ')}]`);
    console.log(`\nShunting Yard Algorithm:`);
    
    for (const token of tokens) {
        if (/\d+/.test(token)) {
            output.push(token);
            console.log(`Number ${token} → Output: [${output.join(', ')}]`);
        } else if (token in precedence) {
            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== '(' &&
                (precedence[operators[operators.length - 1]] > precedence[token] ||
                 (precedence[operators[operators.length - 1]] === precedence[token] && associativity[token] === 'L'))
            ) {
                output.push(operators.pop());
            }
            operators.push(token);
            console.log(`Operator ${token} → Operators: [${operators.join(', ')}], Output: [${output.join(', ')}]`);
        } else if (token === '(') {
            operators.push(token);
            console.log(`Left paren → Operators: [${operators.join(', ')}]`);
        } else if (token === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop(); // Remove the '('
            console.log(`Right paren → Output: [${output.join(', ')}], Operators: [${operators.join(', ')}]`);
        }
    }
    
    while (operators.length > 0) {
        output.push(operators.pop());
    }
    
    console.log(`\nRPN Result: [${output.join(', ')}]`);
    return output;
}

// Validate RPN expression
function validateRPN(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
        return { valid: false, error: 'Empty or invalid input' };
    }
    
    let operandCount = 0;
    const operators = new Set(['+', '-', '*', '/']);
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        if (operators.has(token)) {
            if (operandCount < 2) {
                return {
                    valid: false,
                    error: `Insufficient operands for operator '${token}' at position ${i}`,
                    position: i
                };
            }
            operandCount -= 1; // Two operands consumed, one result produced
        } else {
            // Check if it's a valid number
            if (isNaN(parseFloat(token))) {
                return {
                    valid: false,
                    error: `Invalid token '${token}' at position ${i}`,
                    position: i
                };
            }
            operandCount += 1;
        }
    }
    
    if (operandCount !== 1) {
        return {
            valid: false,
            error: `Expression should result in exactly one value, but has ${operandCount}`,
            finalCount: operandCount
        };
    }
    
    return { valid: true, error: null };
}

// ============= HELPER FUNCTIONS =============

function isOperator(token) {
    return ['+', '-', '*', '/'].includes(token);
}

function isNumber(token) {
    return !isNaN(parseFloat(token)) && isFinite(token);
}

function performOperation(operator, a, b) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return Math.trunc(a / b);
        default: throw new Error(`Unknown operator: ${operator}`);
    }
}

function tokenize(expression) {
    // Split expression into tokens (numbers and operators)
    return expression.match(/-?\d+|[+\-*/]/g) || [];
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRPNEvaluation(tokens) {
    console.log(`\n🎬 Visualizing RPN Evaluation`);
    console.log(`Expression: [${tokens.join(', ')}]`);
    
    const validation = validateRPN(tokens);
    if (!validation.valid) {
        console.log(`❌ Invalid RPN: ${validation.error}`);
        return;
    }
    
    console.log(`✅ Valid RPN expression`);
    
    const stack = [];
    const steps = [];
    
    console.log(`\n📋 Evaluation Steps:`);
    console.log(`${'Step'.padStart(4)} | ${'Token'.padStart(5)} | ${'Stack Before'.padStart(15)} | ${'Operation'.padStart(12)} | ${'Stack After'.padStart(15)}`);
    console.log(`-----|-------|-----------------|--------------|----------------`);
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const stackBefore = [...stack];
        let operation = '';
        
        if (isOperator(token)) {
            const b = stack.pop();
            const a = stack.pop();
            const result = performOperation(token, a, b);
            stack.push(result);
            operation = `${a} ${token} ${b} = ${result}`;
        } else {
            const num = parseFloat(token);
            stack.push(num);
            operation = `Push ${num}`;
        }
        
        const step = {
            stepNumber: i + 1,
            token: token,
            stackBefore: stackBefore,
            operation: operation,
            stackAfter: [...stack]
        };
        
        steps.push(step);
        
        const stepNum = step.stepNumber.toString().padStart(4);
        const tokenStr = token.padStart(5);
        const beforeStr = `[${stackBefore.join(', ')}]`.padStart(15);
        const opStr = operation.padStart(12);
        const afterStr = `[${stack.join(', ')}]`.padStart(15);
        
        console.log(`${stepNum} | ${tokenStr} | ${beforeStr} | ${opStr} | ${afterStr}`);
    }
    
    console.log(`\n🎯 Final Result: ${stack[0]}`);
    
    return {
        result: stack[0],
        steps: steps
    };
}

function demonstrateAllApproaches() {
    console.log(`\n🎯 Demonstrating All Approaches`);
    
    const testExpression = ["2", "1", "+", "3", "*"];
    console.log(`Test expression: [${testExpression.join(', ')}]`);
    console.log(`Expected: ((2 + 1) * 3) = 9`);
    
    const approaches = [
        { name: "Stack-based", func: evaluateRPNStack },
        { name: "Optimized", func: evaluateRPNOptimized },
        { name: "Recursive", func: evaluateRPNRecursive },
        { name: "Functional", func: evaluateRPNFunctional }
    ];
    
    approaches.forEach(approach => {
        console.log(`\n--- ${approach.name} Approach ---`);
        console.time(approach.name);
        const result = approach.func([...testExpression]); // Copy to avoid modification
        console.timeEnd(approach.name);
        console.log(`Result: ${result}`);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log(`\n📊 Performance Analysis`);
    
    const approaches = [
        { name: "Stack-based", time: "O(n)", space: "O(n)", notes: "Standard stack implementation" },
        { name: "Optimized", time: "O(n)", space: "O(n)", notes: "Cleaner code with operations map" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursive calls + stack space" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Reduce with accumulator" },
        { name: "In-place", time: "O(n)", space: "O(1)", notes: "Modifies input array" }
    ];
    
    console.log(`\n📈 Complexity Comparison:`);
    console.log("=".repeat(90));
    console.log("| Approach    | Time | Space | Notes                           |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(31);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log(`\n🏆 Winner: Optimized Stack Approach`);
    console.log(`• O(n) time complexity - single pass`);
    console.log(`• O(n) space complexity - stack for operands`);
    console.log(`• Clean and readable implementation`);
    console.log(`• Easy to extend with new operators`);
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• Stack is perfect for RPN evaluation`);
    console.log(`• LIFO property matches operator precedence`);
    console.log(`• Each token processed exactly once`);
    console.log(`• Space usage proportional to expression complexity`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Calculator Implementation:**`);
    console.log(`   - Scientific calculators use RPN internally`);
    console.log(`   - HP calculators famous for RPN interface`);
    
    console.log(`\n2. **Compiler Design:**`);
    console.log(`   - Expression evaluation in compilers`);
    console.log(`   - Intermediate code generation`);
    
    console.log(`\n3. **Programming Languages:**`);
    console.log(`   - Forth programming language uses RPN`);
    console.log(`   - PostScript language for printers`);
    
    console.log(`\n4. **Mathematical Software:**`);
    console.log(`   - Computer algebra systems`);
    console.log(`   - Numerical computation libraries`);
    
    // Example: Simple calculator
    console.log(`\n🧮 Example: RPN Calculator`);
    
    const calculator = new RPNCalculator();
    
    const expressions = [
        ["3", "4", "+", "2", "*", "7", "/"],
        ["15", "7", "1", "1", "+", "-", "/", "3", "*", "2", "1", "1", "+", "+", "-"]
    ];
    
    expressions.forEach((expr, index) => {
        console.log(`\n--- Expression ${index + 1} ---`);
        const result = calculator.evaluate([...expr]);
        console.log(`Final result: ${result}`);
    });
    
    // Example: Infix to RPN conversion
    console.log(`\n🔄 Example: Infix to RPN Conversion`);
    
    const infixExpressions = [
        "3 + 4 * 2",
        "(1 + 2) * (3 + 4)",
        "3 + 4 * 2 / (1 - 5) ^ 2"
    ];
    
    infixExpressions.forEach(infix => {
        const rpn = infixToRPN(infix);
        const result = evaluateRPNOptimized(rpn);
        console.log(`"${infix}" → [${rpn.join(', ')}] = ${result}`);
    });
}

// ============= TEST CASES =============

function testEvaluateRPN() {
    console.log(`\n🧪 Testing RPN Evaluation`);
    
    const testCases = [
        { tokens: ["2","1","+","3","*"], expected: 9, description: "Basic arithmetic" },
        { tokens: ["4","13","5","/","+"], expected: 6, description: "Division with truncation" },
        { tokens: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"], expected: 22, description: "Complex expression" },
        { tokens: ["18"], expected: 18, description: "Single number" },
        { tokens: ["3","11","+","5","-"], expected: 9, description: "Addition and subtraction" },
        { tokens: ["3","11","5","+","-"], expected: -13, description: "Different operator order" },
        { tokens: ["4","3","-"], expected: 1, description: "Simple subtraction" },
        { tokens: ["4","3","/"], expected: 1, description: "Integer division" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test ${index + 1}: ${testCase.description} ---`);
        console.log(`Tokens: [${testCase.tokens.join(', ')}]`);
        console.log(`Expected: ${testCase.expected}`);
        
        const result = evaluateRPNOptimized([...testCase.tokens]);
        const passed = result === testCase.expected;
        console.log(`Actual: ${result} ${passed ? '✅' : '❌'}`);
        
        if (!passed) {
            console.log(`❌ Test failed!`);
        }
    });
    
    // Test validation
    console.log(`\n--- Validation Tests ---`);
    const invalidCases = [
        { tokens: ["1", "+"], description: "Insufficient operands" },
        { tokens: ["1", "2", "3", "+"], description: "Too many operands" },
        { tokens: ["1", "abc", "+"], description: "Invalid token" },
        { tokens: [], description: "Empty expression" }
    ];
    
    invalidCases.forEach((testCase, index) => {
        console.log(`\nInvalid Test ${index + 1}: ${testCase.description}`);
        console.log(`Tokens: [${testCase.tokens.join(', ')}]`);
        
        const validation = validateRPN(testCase.tokens);
        console.log(`Valid: ${validation.valid} ${!validation.valid ? '✅' : '❌'}`);
        if (!validation.valid) {
            console.log(`Error: ${validation.error}`);
        }
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 EVALUATE REVERSE POLISH NOTATION - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateAllApproaches();
visualizeRPNEvaluation(["2", "1", "+", "3", "*"]);
practicalApplications();
testEvaluateRPN();

// Export functions and classes
module.exports = {
    evaluateRPNStack,
    evaluateRPNOptimized,
    evaluateRPNRecursive,
    evaluateRPNFunctional,
    evaluateRPNInPlace,
    RPNCalculator,
    infixToRPN,
    validateRPN,
    isOperator,
    isNumber,
    performOperation,
    tokenize,
    visualizeRPNEvaluation,
    demonstrateAllApproaches,
    analyzePerformance,
    practicalApplications,
    testEvaluateRPN
};
