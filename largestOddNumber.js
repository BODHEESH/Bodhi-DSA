/**
 * Largest Odd Number in a String
 * Bodhi-DSA Course
 * 
 * Problem: You are given a string num, representing a large integer. 
 * Return the largest-valued odd number (as a string) that is a non-empty substring of num, 
 * or an empty string "" if no odd number exists.
 * 
 * A substring is a contiguous sequence of characters within a string.
 * 
 * Example:
 * Input: num = "52"
 * Output: "5"
 * Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
 * 
 * Input: num = "4206"
 * Output: ""
 * Explanation: There are no odd numbers in "4206".
 * 
 * Input: num = "35427"
 * Output: "35427"
 * Explanation: "35427" is already an odd number.
 */

// ============= BRUTE FORCE APPROACH (Generate All Substrings) =============
// Time Complexity: O(n³) | Space Complexity: O(n²)
// Algorithm: Generate all substrings, filter odd ones, find maximum

function largestOddNumberBruteForce(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return "";
    }
    
    // Validate input contains only digits
    if (!/^\d+$/.test(num)) {
        return "";
    }
    
    const oddSubstrings = [];
    
    // Generate all possible substrings
    for (let i = 0; i < num.length; i++) {
        for (let j = i; j < num.length; j++) {
            const substring = num.slice(i, j + 1);
            
            // Check if substring represents an odd number
            if (isOddNumber(substring)) {
                oddSubstrings.push(substring);
            }
        }
    }
    
    // If no odd substrings found
    if (oddSubstrings.length === 0) {
        return "";
    }
    
    // Find the largest odd substring
    let largest = oddSubstrings[0];
    for (let i = 1; i < oddSubstrings.length; i++) {
        if (compareNumberStrings(oddSubstrings[i], largest) > 0) {
            largest = oddSubstrings[i];
        }
    }
    
    return largest;
}

// ============= BETTER APPROACH (Right to Left Scan) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Scan from right, find first odd digit, return prefix

function largestOddNumberBetter(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return "";
    }
    
    // Validate input contains only digits
    if (!/^\d+$/.test(num)) {
        return "";
    }
    
    // Scan from right to left to find the first odd digit
    for (let i = num.length - 1; i >= 0; i--) {
        const digit = parseInt(num[i]);
        
        // If current digit is odd, return substring from start to current position
        if (digit % 2 === 1) {
            return num.slice(0, i + 1);
        }
    }
    
    // No odd digit found
    return "";
}

// ============= OPTIMIZED APPROACH (Single Pass with Character Check) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Optimized single pass with direct character comparison

function largestOddNumberOptimized(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return "";
    }
    
    // Validate input contains only digits
    if (!/^\d+$/.test(num)) {
        return "";
    }
    
    // Scan from right to left
    for (let i = num.length - 1; i >= 0; i--) {
        const char = num[i];
        
        // Check if character represents an odd digit (1, 3, 5, 7, 9)
        if (char === '1' || char === '3' || char === '5' || char === '7' || char === '9') {
            return num.slice(0, i + 1);
        }
    }
    
    return "";
}

// ============= FUNCTIONAL APPROACH (Array Methods) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Functional programming with array methods

function largestOddNumberFunctional(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return "";
    }
    
    // Validate input contains only digits
    if (!/^\d+$/.test(num)) {
        return "";
    }
    
    // Find the last index of an odd digit
    const digits = num.split('');
    const lastOddIndex = digits
        .map((digit, index) => ({ digit, index }))
        .reverse()
        .find(item => parseInt(item.digit) % 2 === 1)?.index;
    
    return lastOddIndex !== undefined ? num.slice(0, lastOddIndex + 1) : "";
}

// ============= ADVANCED VARIATIONS =============

// Find all odd number substrings
function findAllOddSubstrings(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return [];
    }
    
    const oddSubstrings = [];
    
    for (let i = 0; i < num.length; i++) {
        for (let j = i; j < num.length; j++) {
            const substring = num.slice(i, j + 1);
            
            if (isOddNumber(substring)) {
                oddSubstrings.push({
                    value: substring,
                    start: i,
                    end: j,
                    length: substring.length
                });
            }
        }
    }
    
    // Sort by numeric value (descending)
    return oddSubstrings.sort((a, b) => compareNumberStrings(b.value, a.value));
}

// Find largest odd number with detailed analysis
function largestOddNumberDetailed(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return {
            result: "",
            analysis: null
        };
    }
    
    const analysis = {
        originalNumber: num,
        length: num.length,
        hasOddDigits: false,
        oddDigits: [],
        evenDigits: [],
        lastOddDigitIndex: -1,
        allOddSubstrings: []
    };
    
    // Analyze each digit
    for (let i = 0; i < num.length; i++) {
        const digit = parseInt(num[i]);
        
        if (digit % 2 === 1) {
            analysis.hasOddDigits = true;
            analysis.oddDigits.push({ digit: digit, index: i });
            analysis.lastOddDigitIndex = i;
        } else {
            analysis.evenDigits.push({ digit: digit, index: i });
        }
    }
    
    // Find result
    const result = analysis.hasOddDigits ? num.slice(0, analysis.lastOddDigitIndex + 1) : "";
    
    // Find all odd substrings for analysis
    analysis.allOddSubstrings = findAllOddSubstrings(num);
    
    return {
        result: result,
        analysis: analysis
    };
}

// Find largest odd number with step tracking
function largestOddNumberWithSteps(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return { result: "", steps: [] };
    }
    
    const steps = [];
    
    // Scan from right to left
    for (let i = num.length - 1; i >= 0; i--) {
        const digit = num[i];
        const isOdd = parseInt(digit) % 2 === 1;
        
        steps.push({
            position: i,
            digit: digit,
            isOdd: isOdd,
            action: isOdd ? 'Found odd digit - return prefix' : 'Continue scanning'
        });
        
        if (isOdd) {
            const result = num.slice(0, i + 1);
            steps.push({
                position: i,
                digit: digit,
                isOdd: true,
                action: `Return "${result}"`
            });
            
            return { result: result, steps: steps };
        }
    }
    
    steps.push({
        position: -1,
        digit: '',
        isOdd: false,
        action: 'No odd digits found - return empty string'
    });
    
    return { result: "", steps: steps };
}

// Compare with different algorithms
function compareOddNumberAlgorithms(num) {
    if (!num || typeof num !== 'string') {
        return null;
    }
    
    const algorithms = [
        { name: 'Brute Force', func: largestOddNumberBruteForce },
        { name: 'Better (Right-Left)', func: largestOddNumberBetter },
        { name: 'Optimized (Char Check)', func: largestOddNumberOptimized },
        { name: 'Functional', func: largestOddNumberFunctional }
    ];
    
    const results = {};
    
    algorithms.forEach(algorithm => {
        const startTime = performance.now();
        const result = algorithm.func(num);
        const endTime = performance.now();
        
        results[algorithm.name] = {
            result: result,
            executionTime: endTime - startTime,
            correct: result === largestOddNumberOptimized(num)
        };
    });
    
    return results;
}

// Find largest even number (opposite problem)
function largestEvenNumber(num) {
    if (!num || typeof num !== 'string' || num.length === 0) {
        return "";
    }
    
    // Scan from right to left to find the first even digit
    for (let i = num.length - 1; i >= 0; i--) {
        const digit = parseInt(num[i]);
        
        if (digit % 2 === 0) {
            return num.slice(0, i + 1);
        }
    }
    
    return "";
}

// ============= HELPER FUNCTIONS =============

function isOddNumber(numStr) {
    if (!numStr || numStr.length === 0) {
        return false;
    }
    
    // A number is odd if its last digit is odd
    const lastDigit = parseInt(numStr[numStr.length - 1]);
    return lastDigit % 2 === 1;
}

function compareNumberStrings(num1, num2) {
    // Remove leading zeros for comparison
    const clean1 = num1.replace(/^0+/, '') || '0';
    const clean2 = num2.replace(/^0+/, '') || '0';
    
    // Compare by length first
    if (clean1.length !== clean2.length) {
        return clean1.length - clean2.length;
    }
    
    // If same length, compare lexicographically
    return clean1.localeCompare(clean2);
}

function validateNumberString(num) {
    const errors = [];
    
    if (typeof num !== 'string') {
        errors.push('Input must be a string');
    }
    
    if (typeof num === 'string') {
        if (num.length === 0) {
            errors.push('String cannot be empty');
        }
        
        if (!/^\d+$/.test(num)) {
            errors.push('String must contain only digits');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getDigitFrequency(num) {
    if (typeof num !== 'string') {
        return null;
    }
    
    const frequency = {};
    for (let digit of num) {
        frequency[digit] = (frequency[digit] || 0) + 1;
    }
    
    return frequency;
}

function analyzeNumberString(num) {
    if (typeof num !== 'string') {
        return null;
    }
    
    const analysis = {
        length: num.length,
        digitFrequency: getDigitFrequency(num),
        oddDigitCount: 0,
        evenDigitCount: 0,
        firstDigit: num[0],
        lastDigit: num[num.length - 1],
        isOdd: isOddNumber(num),
        hasLeadingZeros: num.length > 1 && num[0] === '0'
    };
    
    for (let digit of num) {
        const d = parseInt(digit);
        if (d % 2 === 1) {
            analysis.oddDigitCount++;
        } else {
            analysis.evenDigitCount++;
        }
    }
    
    return analysis;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeLargestOddNumber(num) {
    console.log("\n=== Visualizing Largest Odd Number Search ===");
    
    const validation = validateNumberString(num);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return "";
    }
    
    console.log(`Input number: "${num}"`);
    
    const analysis = analyzeNumberString(num);
    console.log(`\n📊 Number Analysis:`);
    console.log(`  Length: ${analysis.length}`);
    console.log(`  Odd digits: ${analysis.oddDigitCount}`);
    console.log(`  Even digits: ${analysis.evenDigitCount}`);
    console.log(`  Last digit: ${analysis.lastDigit} (${analysis.isOdd ? 'odd' : 'even'})`);
    
    const stepResult = largestOddNumberWithSteps(num);
    
    console.log(`\n🔍 Right-to-Left Scan:`);
    console.log("Pos | Digit | Odd? | Action");
    console.log("----|-------|------|---------------------------");
    
    stepResult.steps.forEach(step => {
        const pos = step.position.toString().padStart(3);
        const digit = step.digit.padStart(5);
        const isOdd = step.isOdd ? 'Yes' : 'No';
        const action = step.action;
        
        console.log(`${pos} | ${digit} | ${isOdd.padStart(4)} | ${action}`);
    });
    
    console.log(`\n🏆 Result: "${stepResult.result}"`);
    
    // Visual representation
    if (num.length <= 20) {
        console.log(`\n🎨 Visual Representation:`);
        console.log(`Number:   ${num.split('').map(d => d.padStart(2)).join('')}`);
        console.log(`Position: ${num.split('').map((_, i) => i.toString().padStart(2)).join('')}`);
        console.log(`Odd?:     ${num.split('').map(d => (parseInt(d) % 2 === 1 ? '✓' : '✗').padStart(2)).join('')}`);
        
        if (stepResult.result) {
            const resultLength = stepResult.result.length;
            const highlight = num.split('').map((_, i) => (i < resultLength ? '█' : ' ').padStart(2)).join('');
            console.log(`Result:   ${highlight}`);
        }
    }
    
    return stepResult.result;
}

function demonstrateLargestOddMethods() {
    console.log("\n=== Demonstrating Largest Odd Number Methods ===");
    
    const testCases = [
        { num: "52", expected: "5", name: "Basic case" },
        { num: "4206", expected: "", name: "No odd digits" },
        { num: "35427", expected: "35427", name: "Already odd" },
        { num: "123456789", expected: "123456789", name: "Long odd number" },
        { num: "2468", expected: "", name: "All even digits" },
        { num: "13579", expected: "13579", name: "All odd digits" },
        { num: "1000", expected: "1", name: "Odd at start" },
        { num: "9", expected: "9", name: "Single odd digit" },
        { num: "8", expected: "", name: "Single even digit" }
    ];
    
    const methods = [
        { name: "Brute Force", func: largestOddNumberBruteForce },
        { name: "Better (Right-Left)", func: largestOddNumberBetter },
        { name: "Optimized (Char Check)", func: largestOddNumberOptimized },
        { name: "Functional", func: largestOddNumberFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Number: "${testCase.num}" (Expected: "${testCase.expected}")`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.num);
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
        { name: "Brute Force", time: "O(n³)", space: "O(n²)", notes: "Generate all substrings" },
        { name: "Better (Right-Left)", time: "O(n)", space: "O(1)", notes: "Single pass scan" },
        { name: "Optimized (Char Check)", time: "O(n)", space: "O(1)", notes: "Direct char comparison" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Array methods" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach                | Time  | Space | Notes                    |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(23);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\nWhere:");
    console.log("• n = length of input string");
    
    console.log("\n🏆 Winner: Optimized (Character Check)");
    console.log("• O(n) time complexity - single pass");
    console.log("• O(1) space complexity - no extra space");
    console.log("• Direct character comparison (no parseInt)");
    console.log("• Early termination when odd digit found");
    console.log("• Most efficient for large numbers");
    
    console.log("\n💡 Key Insight:");
    console.log("• A number is odd iff its last digit is odd");
    console.log("• Largest odd substring ends at rightmost odd digit");
    console.log("• Scan right-to-left to find first odd digit");
    console.log("• Return prefix from start to that position");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Largest Odd Number ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Understand number properties (odd/even)");
    console.log("2. Master string scanning techniques");
    console.log("3. Learn optimization through mathematical insight");
    console.log("4. Practice substring and prefix operations");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Odd number identification");
    console.log("2. Substring generation and analysis");
    console.log("3. Right-to-left scanning pattern");
    console.log("4. Mathematical optimization");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. A number is odd if its last digit is odd");
    console.log("2. Largest odd substring must end at an odd digit");
    console.log("3. To maximize value, include as many leading digits as possible");
    console.log("4. Scan from right to find the rightmost odd digit");
    console.log("5. Return prefix from start to that position");
    
    console.log("\n⚡ Optimization Insight:");
    console.log("1. Brute force: Check all O(n²) substrings");
    console.log("2. Key insight: Only substrings ending in odd digits matter");
    console.log("3. Largest value = longest valid substring");
    console.log("4. Rightmost odd digit gives longest prefix");
    
    console.log("\n🔧 Implementation Strategies:");
    console.log("Strategy 1: Generate all substrings, filter, find max");
    console.log("Strategy 2: Scan right-to-left for first odd digit");
    console.log("Strategy 3: Direct character comparison (avoid parseInt)");
    console.log("Strategy 4: Functional approach with array methods");
    
    console.log("\n🎨 Pattern Recognition:");
    console.log("• Right-to-left scan is common for 'rightmost' problems");
    console.log("• Mathematical properties can simplify algorithms");
    console.log("• Prefix/suffix operations are fundamental");
    console.log("• Early termination improves average performance");
    
    visualizeLargestOddNumber("35427");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Financial Systems:**");
    console.log("   - Account number validation");
    console.log("   - Transaction ID processing");
    
    console.log("\n2. **Data Processing:**");
    console.log("   - Number extraction from strings");
    console.log("   - Data validation and cleaning");
    
    console.log("\n3. **Game Development:**");
    console.log("   - Score calculation systems");
    console.log("   - Random number generation");
    
    console.log("\n4. **Cryptography:**");
    console.log("   - Key generation algorithms");
    console.log("   - Hash function implementations");
    
    console.log("\n📊 Example Applications:");
    
    // Financial system example
    const accountNumbers = ["123456789", "987654320", "555666777"];
    console.log(`\nAccount Number Processing:`);
    accountNumbers.forEach(num => {
        const largestOdd = largestOddNumberOptimized(num);
        const largestEven = largestEvenNumber(num);
        console.log(`Account ${num}:`);
        console.log(`  Largest odd prefix: "${largestOdd}"`);
        console.log(`  Largest even prefix: "${largestEven}"`);
    });
    
    // Data analysis
    const dataStrings = ["20231225", "19990101", "20001231"];
    console.log(`\nDate String Analysis:`);
    dataStrings.forEach(date => {
        const detailed = largestOddNumberDetailed(date);
        console.log(`Date ${date}:`);
        console.log(`  Odd digits: ${detailed.analysis.oddDigitCount}`);
        console.log(`  Even digits: ${detailed.analysis.evenDigitCount}`);
        console.log(`  Largest odd: "${detailed.result}"`);
    });
    
    // Performance comparison
    const largeNumber = "1".repeat(1000) + "2".repeat(1000);
    console.log(`\nPerformance Test (${largeNumber.length} digits):`);
    const comparison = compareOddNumberAlgorithms(largeNumber);
    Object.entries(comparison).forEach(([method, data]) => {
        console.log(`${method}: "${data.result.slice(0, 10)}..." (${data.executionTime.toFixed(4)}ms)`);
    });
    
    // All odd substrings analysis
    const analysisNumber = "12345";
    console.log(`\nAll Odd Substrings in "${analysisNumber}":`);
    const allOdd = findAllOddSubstrings(analysisNumber);
    allOdd.forEach((item, index) => {
        console.log(`  ${index + 1}. "${item.value}" (pos ${item.start}-${item.end}, len ${item.length})`);
    });
}

// ============= TEST CASES =============

function testLargestOddNumber() {
    console.log("\n=== Testing Largest Odd Number ===");
    
    const testCases = [
        { num: "52", expected: "5", description: "Basic case" },
        { num: "4206", expected: "", description: "No odd digits" },
        { num: "35427", expected: "35427", description: "Already odd" },
        { num: "123456789", expected: "123456789", description: "Long odd number" },
        { num: "2468", expected: "", description: "All even digits" },
        { num: "13579", expected: "13579", description: "All odd digits" },
        { num: "1000", expected: "1", description: "Odd at start" },
        { num: "9", expected: "9", description: "Single odd digit" },
        { num: "8", expected: "", description: "Single even digit" },
        { num: "102030", expected: "1", description: "Multiple zeros" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`Number: "${testCase.num}"`);
        
        const result = largestOddNumberOptimized(testCase.num);
        
        console.log(`Expected: "${testCase.expected}"`);
        console.log(`Actual: "${result}"`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        const testNumber = '2'.repeat(size - 1) + '1'; // Even digits with odd at end
        
        console.log(`\nSize: ${size} digits`);
        
        const methods = [
            { name: "Better (Right-Left)", func: largestOddNumberBetter },
            { name: "Optimized (Char Check)", func: largestOddNumberOptimized }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testNumber);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: "${result.slice(0, 10)}..."`);
        });
    });
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { num: "", description: "Empty string" },
        { num: "0", description: "Single zero" },
        { num: "00000", description: "All zeros" },
        { num: "abc123", description: "Non-digit characters" },
        { num: null, description: "Null input" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = largestOddNumberOptimized(testCase.num);
        console.log(`Result: "${result}"`);
        console.log(`Status: ✅ HANDLED`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 LARGEST ODD NUMBER IN A STRING - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateLargestOddMethods();
testLargestOddNumber();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    largestOddNumberBruteForce,
    largestOddNumberBetter,
    largestOddNumberOptimized,
    largestOddNumberFunctional,
    largestOddNumberDetailed,
    findAllOddSubstrings,
    largestEvenNumber,
    isOddNumber,
    compareNumberStrings,
    validateNumberString,
    analyzeNumberString,
    visualizeLargestOddNumber,
    demonstrateLargestOddMethods,
    interactiveLearning
};
