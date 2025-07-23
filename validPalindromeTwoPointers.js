/**
 * Valid Palindrome - Approach 2 - Two Pointers
 * Bodhi-DSA Course
 * 
 * Problem: A phrase is a palindrome if, after converting all uppercase letters into 
 * lowercase letters and removing all non-alphanumeric characters, it reads the same 
 * forward and backward. Alphanumeric characters include letters and numbers.
 * 
 * Given a string s, return true if it is a palindrome, or false otherwise.
 * 
 * This approach uses two pointers technique with O(1) extra space.
 * 
 * Example:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: After cleaning: "amanaplanacanalpanama" is a palindrome.
 * 
 * Input: s = "race a car"
 * Output: false
 * Explanation: After cleaning: "raceacar" is not a palindrome.
 */

// ============= BRUTE FORCE APPROACH (Two Pointers with Manual Check) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Two pointers with manual alphanumeric checking

function isPalindromeBruteForce(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    function isAlphanumeric(char) {
        return (char >= 'a' && char <= 'z') || 
               (char >= 'A' && char <= 'Z') || 
               (char >= '0' && char <= '9');
    }
    
    function toLowerCase(char) {
        if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(char.charCodeAt(0) + 32);
        }
        return char;
    }
    
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (toLowerCase(s[left]) !== toLowerCase(s[right])) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// ============= BETTER APPROACH (Two Pointers with Built-in Methods) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Two pointers with regex and built-in methods

function isPalindromeBetter(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from right
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// ============= OPTIMIZED APPROACH (Efficient Two Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Optimized two pointers with early termination

function isPalindromeOptimized(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    const isAlphanumeric = (char) => /[a-zA-Z0-9]/.test(char);
    
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Find next valid character from left
        if (!isAlphanumeric(s[left])) {
            left++;
            continue;
        }
        
        // Find next valid character from right
        if (!isAlphanumeric(s[right])) {
            right--;
            continue;
        }
        
        // Compare characters
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

// ============= FUNCTIONAL APPROACH (Two Pointers with Recursion) =============
// Time Complexity: O(n) | Space Complexity: O(n) due to recursion
// Algorithm: Recursive two pointers approach

function isPalindromeFunctional(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    const isAlphanumeric = (char) => /[a-zA-Z0-9]/.test(char);
    
    function checkPalindrome(left, right) {
        // Base case: pointers meet or cross
        if (left >= right) {
            return true;
        }
        
        // Skip non-alphanumeric from left
        if (!isAlphanumeric(s[left])) {
            return checkPalindrome(left + 1, right);
        }
        
        // Skip non-alphanumeric from right
        if (!isAlphanumeric(s[right])) {
            return checkPalindrome(left, right - 1);
        }
        
        // Compare characters
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        // Recurse with next positions
        return checkPalindrome(left + 1, right - 1);
    }
    
    return checkPalindrome(0, s.length - 1);
}

// ============= ADVANCED VARIATIONS =============

// Two pointers with detailed step tracking
function isPalindromeWithSteps(s) {
    if (typeof s !== 'string') {
        return { isPalindrome: false, steps: [] };
    }
    
    const isAlphanumeric = (char) => /[a-zA-Z0-9]/.test(char);
    const steps = [];
    
    let left = 0;
    let right = s.length - 1;
    let stepCount = 0;
    
    while (left < right) {
        stepCount++;
        
        // Skip non-alphanumeric from left
        while (left < right && !isAlphanumeric(s[left])) {
            steps.push({
                step: stepCount,
                action: 'skip_left',
                left: left,
                right: right,
                leftChar: s[left],
                rightChar: s[right],
                reason: `Skipping non-alphanumeric '${s[left]}' at position ${left}`
            });
            left++;
        }
        
        // Skip non-alphanumeric from right
        while (left < right && !isAlphanumeric(s[right])) {
            steps.push({
                step: stepCount,
                action: 'skip_right',
                left: left,
                right: right,
                leftChar: s[left],
                rightChar: s[right],
                reason: `Skipping non-alphanumeric '${s[right]}' at position ${right}`
            });
            right--;
        }
        
        // If pointers crossed, we're done
        if (left >= right) {
            break;
        }
        
        // Compare characters
        const leftChar = s[left].toLowerCase();
        const rightChar = s[right].toLowerCase();
        const match = leftChar === rightChar;
        
        steps.push({
            step: stepCount,
            action: 'compare',
            left: left,
            right: right,
            leftChar: s[left],
            rightChar: s[right],
            leftNormalized: leftChar,
            rightNormalized: rightChar,
            match: match,
            reason: match 
                ? `'${leftChar}' === '${rightChar}' ✓`
                : `'${leftChar}' !== '${rightChar}' ✗`
        });
        
        if (!match) {
            return { isPalindrome: false, steps: steps };
        }
        
        left++;
        right--;
    }
    
    return { isPalindrome: true, steps: steps };
}

// Two pointers with performance metrics
function isPalindromeWithMetrics(s) {
    if (typeof s !== 'string') {
        return { isPalindrome: false, metrics: null };
    }
    
    const startTime = performance.now();
    const isAlphanumeric = (char) => /[a-zA-Z0-9]/.test(char);
    
    let left = 0;
    let right = s.length - 1;
    let comparisons = 0;
    let skips = 0;
    let validChars = 0;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
            skips++;
        }
        
        // Skip non-alphanumeric from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
            skips++;
        }
        
        if (left >= right) break;
        
        // Compare characters
        comparisons++;
        validChars += 2;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            const endTime = performance.now();
            return {
                isPalindrome: false,
                metrics: {
                    executionTime: endTime - startTime,
                    comparisons: comparisons,
                    skips: skips,
                    validChars: validChars,
                    totalChars: s.length,
                    efficiency: (validChars / s.length * 100).toFixed(2) + '%'
                }
            };
        }
        
        left++;
        right--;
    }
    
    const endTime = performance.now();
    return {
        isPalindrome: true,
        metrics: {
            executionTime: endTime - startTime,
            comparisons: comparisons,
            skips: skips,
            validChars: validChars,
            totalChars: s.length,
            efficiency: (validChars / s.length * 100).toFixed(2) + '%'
        }
    };
}

// ============= HELPER FUNCTIONS =============

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

function validateInput(s) {
    const errors = [];
    
    if (typeof s !== 'string') {
        errors.push('Input must be a string');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function getValidCharacterCount(s) {
    if (typeof s !== 'string') {
        return 0;
    }
    
    let count = 0;
    for (let char of s) {
        if (isAlphanumeric(char)) {
            count++;
        }
    }
    return count;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeTwoPointersPalindrome(s) {
    console.log("\n=== Visualizing Two Pointers Palindrome Check ===");
    
    const validation = validateInput(s);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return false;
    }
    
    console.log(`Original string: "${s}"`);
    console.log(`Length: ${s.length}`);
    
    const validCount = getValidCharacterCount(s);
    console.log(`Valid characters: ${validCount}`);
    
    const result = isPalindromeWithSteps(s);
    
    console.log(`\n🎯 Two Pointers Algorithm Steps:`);
    console.log("Step | Action   | L | R | L-Char | R-Char | Result");
    console.log("-----|----------|---|---|--------|--------|--------");
    
    result.steps.forEach((step, index) => {
        const stepNum = (index + 1).toString().padStart(4);
        const action = step.action.padEnd(8);
        const left = step.left.toString().padStart(2);
        const right = step.right.toString().padStart(2);
        const leftChar = (step.leftChar || '').padEnd(6);
        const rightChar = (step.rightChar || '').padEnd(6);
        const result = step.match !== undefined 
            ? (step.match ? '✓' : '✗')
            : (step.action.includes('skip') ? 'skip' : '');
        
        console.log(`${stepNum} | ${action} | ${left} | ${right} | ${leftChar} | ${rightChar} | ${result}`);
    });
    
    console.log(`\n🏆 Final Result: ${result.isPalindrome ? '✅ IS PALINDROME' : '❌ NOT PALINDROME'}`);
    
    return result.isPalindrome;
}

function demonstrateTwoPointersMethods() {
    console.log("\n=== Demonstrating Two Pointers Palindrome Methods ===");
    
    const testCases = [
        { s: "A man, a plan, a canal: Panama", name: "Classic palindrome", expected: true },
        { s: "race a car", name: "Not palindrome", expected: false },
        { s: " ", name: "Empty after cleaning", expected: true },
        { s: "Madam", name: "Simple palindrome", expected: true },
        { s: "hello", name: "Simple non-palindrome", expected: false },
        { s: "12321", name: "Numeric palindrome", expected: true }
    ];
    
    const methods = [
        { name: "Brute Force", func: isPalindromeBruteForce },
        { name: "Better (Regex)", func: isPalindromeBetter },
        { name: "Optimized", func: isPalindromeOptimized },
        { name: "Functional (Recursive)", func: isPalindromeFunctional }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`String: "${testCase.s}"`);
        console.log(`Expected: ${testCase.expected}`);
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testCase.s);
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
        { name: "Brute Force", time: "O(n)", space: "O(1)", notes: "Manual char checking" },
        { name: "Better (Regex)", time: "O(n)", space: "O(1)", notes: "Built-in regex test" },
        { name: "Optimized", time: "O(n)", space: "O(1)", notes: "Efficient two pointers" },
        { name: "Functional (Recursive)", time: "O(n)", space: "O(n)", notes: "Recursion stack space" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach               | Time | Space | Notes                  |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(22);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(22);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\n🏆 Winner: Optimized Two Pointers");
    console.log("• O(n) time complexity - single pass");
    console.log("• O(1) space complexity - no extra space");
    console.log("• Early termination on mismatch");
    console.log("• Clean and readable code");
    console.log("• Optimal for space-constrained environments");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Two Pointers Palindrome ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master two pointers technique");
    console.log("2. Understand space optimization strategies");
    console.log("3. Learn in-place string processing");
    console.log("4. Practice pointer manipulation patterns");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Two pointers pattern for palindromes");
    console.log("2. In-place character comparison");
    console.log("3. Space complexity optimization");
    console.log("4. Early termination strategies");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Start with pointers at both ends");
    console.log("2. Skip invalid characters from both sides");
    console.log("3. Compare valid characters when found");
    console.log("4. Move pointers inward and repeat");
    console.log("5. Return false on first mismatch");
    console.log("6. Return true when pointers meet/cross");
    
    visualizeTwoPointersPalindrome("A man, a plan, a canal: Panama");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Memory-Constrained Systems:**");
    console.log("   - Embedded systems programming");
    console.log("   - Mobile app optimization");
    
    console.log("\n2. **Real-time Processing:**");
    console.log("   - Stream processing algorithms");
    console.log("   - Live data validation");
    
    console.log("\n📊 Performance Metrics Comparison:");
    const testStrings = [
        "A man, a plan, a canal: Panama",
        "Was it a car or a cat I saw?",
        "Madam, I'm Adam"
    ];
    
    testStrings.forEach(str => {
        const metrics = isPalindromeWithMetrics(str);
        console.log(`\n"${str}"`);
        console.log(`  Result: ${metrics.isPalindrome}`);
        console.log(`  Execution time: ${metrics.metrics.executionTime.toFixed(4)}ms`);
        console.log(`  Comparisons: ${metrics.metrics.comparisons}`);
        console.log(`  Efficiency: ${metrics.metrics.efficiency}`);
    });
}

// ============= TEST CASES =============

function testValidPalindromeTwoPointers() {
    console.log("\n=== Testing Valid Palindrome (Two Pointers) ===");
    
    const testCases = [
        { s: "A man, a plan, a canal: Panama", expected: true, description: "Classic palindrome" },
        { s: "race a car", expected: false, description: "Not palindrome" },
        { s: " ", expected: true, description: "Empty after cleaning" },
        { s: "Madam", expected: true, description: "Simple palindrome" },
        { s: "hello", expected: false, description: "Simple non-palindrome" },
        { s: "12321", expected: true, description: "Numeric palindrome" },
        { s: "", expected: true, description: "Empty string" },
        { s: "a", expected: true, description: "Single character" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`String: "${testCase.s}"`);
        
        const result = isPalindromeOptimized(testCase.s);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        
        const isEqual = result === testCase.expected;
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 VALID PALINDROME - TWO POINTERS APPROACH - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
demonstrateTwoPointersMethods();
testValidPalindromeTwoPointers();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    isPalindromeBruteForce,
    isPalindromeBetter,
    isPalindromeOptimized,
    isPalindromeFunctional,
    isPalindromeWithSteps,
    isPalindromeWithMetrics,
    isAlphanumeric,
    validateInput,
    visualizeTwoPointersPalindrome,
    demonstrateTwoPointersMethods,
    interactiveLearning
};
