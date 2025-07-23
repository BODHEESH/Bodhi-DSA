/**
 * Valid Palindrome - Approach 1 - Extra Space
 * Bodhi-DSA Course
 * 
 * Problem: A phrase is a palindrome if, after converting all uppercase letters into 
 * lowercase letters and removing all non-alphanumeric characters, it reads the same 
 * forward and backward. Alphanumeric characters include letters and numbers.
 * 
 * Given a string s, return true if it is a palindrome, or false otherwise.
 * 
 * This approach uses extra space to clean and reverse the string.
 * 
 * Example:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 * 
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 * 
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 */

// ============= BRUTE FORCE APPROACH (Clean + Reverse + Compare) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Clean string, create reversed copy, compare

function isPalindromeBruteForce(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    // Step 1: Clean the string (remove non-alphanumeric, convert to lowercase)
    let cleaned = '';
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if ((char >= 'a' && char <= 'z') || 
            (char >= 'A' && char <= 'Z') || 
            (char >= '0' && char <= '9')) {
            cleaned += char.toLowerCase();
        }
    }
    
    // Step 2: Create reversed string
    let reversed = '';
    for (let i = cleaned.length - 1; i >= 0; i--) {
        reversed += cleaned[i];
    }
    
    // Step 3: Compare original cleaned with reversed
    return cleaned === reversed;
}

// ============= BETTER APPROACH (Built-in Methods) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use regex and built-in reverse method

function isPalindromeBetter(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    // Clean string using regex and built-in methods
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Create reversed string
    const reversed = cleaned.split('').reverse().join('');
    
    // Compare
    return cleaned === reversed;
}

// ============= OPTIMIZED APPROACH (Single Pass Clean + Array Reverse) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Clean in single pass, use array for efficient reversal

function isPalindromeOptimized(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    // Clean string in single pass
    const cleanedChars = [];
    for (let char of s) {
        if (/[a-zA-Z0-9]/.test(char)) {
            cleanedChars.push(char.toLowerCase());
        }
    }
    
    // Create reversed array
    const reversedChars = [...cleanedChars].reverse();
    
    // Compare arrays
    return cleanedChars.join('') === reversedChars.join('');
}

// ============= FUNCTIONAL APPROACH (Functional Programming) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Functional style with filter, map, and reverse

function isPalindromeFunctional(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    const cleaned = s
        .split('')
        .filter(char => /[a-zA-Z0-9]/.test(char))
        .map(char => char.toLowerCase())
        .join('');
    
    const reversed = cleaned
        .split('')
        .reverse()
        .join('');
    
    return cleaned === reversed;
}

// ============= ADVANCED VARIATIONS =============

// Palindrome check with detailed analysis
function isPalindromeDetailed(s) {
    if (typeof s !== 'string') {
        return {
            isPalindrome: false,
            original: '',
            cleaned: '',
            reversed: '',
            length: 0,
            removedChars: [],
            analysis: null
        };
    }
    
    const removedChars = [];
    const cleanedChars = [];
    
    // Clean and track removed characters
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (/[a-zA-Z0-9]/.test(char)) {
            cleanedChars.push(char.toLowerCase());
        } else {
            removedChars.push({ char: char, position: i });
        }
    }
    
    const cleaned = cleanedChars.join('');
    const reversed = [...cleanedChars].reverse().join('');
    const isPalindrome = cleaned === reversed;
    
    // Find mismatch positions if not palindrome
    const mismatches = [];
    if (!isPalindrome) {
        for (let i = 0; i < cleaned.length; i++) {
            if (cleaned[i] !== reversed[i]) {
                mismatches.push({
                    position: i,
                    expected: reversed[i],
                    actual: cleaned[i]
                });
            }
        }
    }
    
    const analysis = {
        originalLength: s.length,
        cleanedLength: cleaned.length,
        removedCount: removedChars.length,
        removalPercentage: s.length > 0 ? (removedChars.length / s.length * 100).toFixed(2) : 0,
        mismatches: mismatches,
        symmetryPoint: Math.floor(cleaned.length / 2)
    };
    
    return {
        isPalindrome: isPalindrome,
        original: s,
        cleaned: cleaned,
        reversed: reversed,
        length: cleaned.length,
        removedChars: removedChars,
        analysis: analysis
    };
}

// Case-sensitive palindrome check
function isPalindromeCaseSensitive(s) {
    if (typeof s !== 'string') {
        return false;
    }
    
    // Clean but preserve case
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    
    return cleaned === reversed;
}

// Palindrome check ignoring specific characters
function isPalindromeIgnoreChars(s, ignoreChars = [' ', ',', '.', ':', '!', '?']) {
    if (typeof s !== 'string') {
        return false;
    }
    
    const ignoreSet = new Set(ignoreChars);
    
    // Clean string by removing ignored characters
    const cleaned = s
        .split('')
        .filter(char => !ignoreSet.has(char))
        .join('')
        .toLowerCase();
    
    const reversed = cleaned.split('').reverse().join('');
    
    return cleaned === reversed;
}

// Palindrome check with custom validation
function isPalindromeCustom(s, options = {}) {
    if (typeof s !== 'string') {
        return false;
    }
    
    const {
        caseSensitive = false,
        allowNumbers = true,
        allowLetters = true,
        customIgnore = []
    } = options;
    
    const ignoreSet = new Set(customIgnore);
    
    // Build regex pattern based on options
    let pattern = '';
    if (allowLetters) pattern += 'a-zA-Z';
    if (allowNumbers) pattern += '0-9';
    
    const regex = new RegExp(`[${pattern}]`);
    
    // Clean string
    const cleaned = s
        .split('')
        .filter(char => !ignoreSet.has(char) && regex.test(char))
        .map(char => caseSensitive ? char : char.toLowerCase())
        .join('');
    
    const reversed = cleaned.split('').reverse().join('');
    
    return cleaned === reversed;
}

// Find longest palindromic substring using extra space
function findLongestPalindromicSubstring(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    let longest = '';
    
    // Check all possible substrings
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const substring = s.slice(i, j + 1);
            if (isPalindromeOptimized(substring) && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    
    return longest;
}

// Count palindromic substrings
function countPalindromicSubstrings(s) {
    if (typeof s !== 'string') {
        return 0;
    }
    
    let count = 0;
    const palindromes = [];
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const substring = s.slice(i, j + 1);
            if (isPalindromeOptimized(substring)) {
                count++;
                palindromes.push({
                    substring: substring,
                    start: i,
                    end: j,
                    length: substring.length
                });
            }
        }
    }
    
    return { count: count, palindromes: palindromes };
}

// ============= HELPER FUNCTIONS =============

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

function cleanString(s, preserveCase = false) {
    if (typeof s !== 'string') {
        return '';
    }
    
    let cleaned = '';
    for (let char of s) {
        if (isAlphanumeric(char)) {
            cleaned += preserveCase ? char : char.toLowerCase();
        }
    }
    return cleaned;
}

function reverseString(s) {
    if (typeof s !== 'string') {
        return '';
    }
    
    return s.split('').reverse().join('');
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

function getCharacterTypes(s) {
    if (typeof s !== 'string') {
        return null;
    }
    
    const types = {
        letters: 0,
        numbers: 0,
        spaces: 0,
        punctuation: 0,
        other: 0
    };
    
    for (let char of s) {
        if (/[a-zA-Z]/.test(char)) {
            types.letters++;
        } else if (/[0-9]/.test(char)) {
            types.numbers++;
        } else if (char === ' ') {
            types.spaces++;
        } else if (/[.,!?;:'"()-]/.test(char)) {
            types.punctuation++;
        } else {
            types.other++;
        }
    }
    
    return types;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizePalindromeCheck(s) {
    console.log("\n=== Visualizing Palindrome Check (Extra Space) ===");
    
    const validation = validateInput(s);
    if (!validation.valid) {
        console.log("Invalid input:");
        validation.errors.forEach(error => console.log(`  - ${error}`));
        return false;
    }
    
    console.log(`Original string: "${s}"`);
    
    const detailed = isPalindromeDetailed(s);
    
    console.log(`\n📊 Character Analysis:`);
    const charTypes = getCharacterTypes(s);
    console.log(`  Letters: ${charTypes.letters}`);
    console.log(`  Numbers: ${charTypes.numbers}`);
    console.log(`  Spaces: ${charTypes.spaces}`);
    console.log(`  Punctuation: ${charTypes.punctuation}`);
    console.log(`  Other: ${charTypes.other}`);
    
    console.log(`\n🧹 Cleaning Process:`);
    console.log(`  Original length: ${detailed.analysis.originalLength}`);
    console.log(`  Cleaned length: ${detailed.analysis.cleanedLength}`);
    console.log(`  Removed ${detailed.analysis.removedCount} characters (${detailed.analysis.removalPercentage}%)`);
    
    if (detailed.removedChars.length > 0) {
        console.log(`  Removed characters:`);
        detailed.removedChars.forEach(item => {
            console.log(`    Position ${item.position}: '${item.char}'`);
        });
    }
    
    console.log(`\n🔄 Comparison:`);
    console.log(`  Cleaned:  "${detailed.cleaned}"`);
    console.log(`  Reversed: "${detailed.reversed}"`);
    
    // Visual comparison
    if (detailed.cleaned.length > 0) {
        console.log(`\n🎨 Character-by-character comparison:`);
        console.log(`Position: ${detailed.cleaned.split('').map((_, i) => i.toString().padStart(2)).join('')}`);
        console.log(`Cleaned:  ${detailed.cleaned.split('').map(c => c.padStart(2)).join('')}`);
        console.log(`Reversed: ${detailed.reversed.split('').map(c => c.padStart(2)).join('')}`);
        
        const matches = detailed.cleaned.split('').map((c, i) => 
            c === detailed.reversed[i] ? '✓' : '✗'
        ).map(m => m.padStart(2)).join('');
        console.log(`Match:    ${matches}`);
    }
    
    console.log(`\n🏆 Result: ${detailed.isPalindrome ? '✅ IS PALINDROME' : '❌ NOT PALINDROME'}`);
    
    if (!detailed.isPalindrome && detailed.analysis.mismatches.length > 0) {
        console.log(`\n❌ Mismatches found:`);
        detailed.analysis.mismatches.forEach(mismatch => {
            console.log(`  Position ${mismatch.position}: expected '${mismatch.expected}', got '${mismatch.actual}'`);
        });
    }
    
    return detailed.isPalindrome;
}

function demonstratePalindromeMethods() {
    console.log("\n=== Demonstrating Palindrome Check Methods ===");
    
    const testCases = [
        { s: "A man, a plan, a canal: Panama", name: "Classic palindrome", expected: true },
        { s: "race a car", name: "Not palindrome", expected: false },
        { s: " ", name: "Empty after cleaning", expected: true },
        { s: "Madam", name: "Simple palindrome", expected: true },
        { s: "No 'x' in Nixon", name: "Complex palindrome", expected: true },
        { s: "Mr. Owl ate my metal worm", name: "Long palindrome", expected: true },
        { s: "hello", name: "Simple non-palindrome", expected: false },
        { s: "12321", name: "Numeric palindrome", expected: true },
        { s: "A1B2b1a", name: "Mixed alphanumeric", expected: true }
    ];
    
    const methods = [
        { name: "Brute Force", func: isPalindromeBruteForce },
        { name: "Better (Regex)", func: isPalindromeBetter },
        { name: "Optimized (Array)", func: isPalindromeOptimized },
        { name: "Functional", func: isPalindromeFunctional }
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
        { name: "Brute Force", time: "O(n)", space: "O(n)", notes: "Manual clean + reverse" },
        { name: "Better (Regex)", time: "O(n)", space: "O(n)", notes: "Built-in methods" },
        { name: "Optimized (Array)", time: "O(n)", space: "O(n)", notes: "Array operations" },
        { name: "Functional", time: "O(n)", space: "O(n)", notes: "Functional style" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach            | Time | Space | Notes                  |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(22);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\nWhere:");
    console.log("• n = length of input string");
    console.log("• All approaches use O(n) extra space for cleaned string");
    
    console.log("\n🏆 Winner: Better (Regex)");
    console.log("• Clean and concise code");
    console.log("• Leverages built-in optimizations");
    console.log("• Good readability and maintainability");
    console.log("• Regex is optimized for pattern matching");
    console.log("• Less prone to implementation errors");
    
    console.log("\n⚠️  Note: Extra Space Approach");
    console.log("• Uses O(n) additional space");
    console.log("• Creates cleaned and reversed strings");
    console.log("• Good for learning and understanding");
    console.log("• Two-pointer approach is more space-efficient");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Valid Palindrome (Extra Space) ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master string cleaning and preprocessing");
    console.log("2. Understand extra space trade-offs");
    console.log("3. Learn multiple string manipulation techniques");
    console.log("4. Practice regex and built-in methods");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. String normalization (case, characters)");
    console.log("2. String reversal techniques");
    console.log("3. Character filtering and validation");
    console.log("4. Space complexity analysis");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Clean input by removing non-alphanumeric");
    console.log("2. Convert to lowercase for case-insensitive comparison");
    console.log("3. Create reversed copy of cleaned string");
    console.log("4. Compare original cleaned with reversed");
    
    console.log("\n⚡ Extra Space Strategy:");
    console.log("1. Trade space for simplicity");
    console.log("2. Easier to understand and implement");
    console.log("3. Good for debugging (can inspect intermediate results)");
    console.log("4. Suitable when space is not a constraint");
    
    console.log("\n🔧 Implementation Techniques:");
    console.log("Technique 1: Manual character filtering");
    console.log("Technique 2: Regex pattern matching");
    console.log("Technique 3: Array methods (filter, map)");
    console.log("Technique 4: Functional programming style");
    
    console.log("\n🎨 String Cleaning Patterns:");
    console.log("• Manual loop: Check each character individually");
    console.log("• Regex replace: /[^a-z0-9]/g pattern");
    console.log("• Filter method: Array.filter with test function");
    console.log("• Built-in methods: Combine multiple string methods");
    
    visualizePalindromeCheck("A man, a plan, a canal: Panama");
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Text Validation:**");
    console.log("   - User input validation");
    console.log("   - Data integrity checks");
    
    console.log("\n2. **Bioinformatics:**");
    console.log("   - DNA sequence analysis");
    console.log("   - Protein structure validation");
    
    console.log("\n3. **Cryptography:**");
    console.log("   - Pattern detection in ciphers");
    console.log("   - Key validation algorithms");
    
    console.log("\n4. **Natural Language Processing:**");
    console.log("   - Text preprocessing");
    console.log("   - Language pattern recognition");
    
    console.log("\n📊 Example Applications:");
    
    // Text validation
    const userInputs = [
        "Was it a car or a cat I saw?",
        "Never odd or even",
        "Do geese see God?",
        "Hello World"
    ];
    
    console.log(`\nText Validation Examples:`);
    userInputs.forEach(input => {
        const result = isPalindromeOptimized(input);
        console.log(`"${input}" → ${result ? 'Valid palindrome' : 'Not a palindrome'}`);
    });
    
    // Custom validation options
    console.log(`\nCustom Validation Options:`);
    const testString = "A man, a plan, a canal: Panama!";
    
    const options = [
        { caseSensitive: false, allowNumbers: true, allowLetters: true },
        { caseSensitive: true, allowNumbers: true, allowLetters: true },
        { caseSensitive: false, allowNumbers: false, allowLetters: true },
        { caseSensitive: false, allowNumbers: true, allowLetters: true, customIgnore: [',', ':', '!'] }
    ];
    
    options.forEach((option, index) => {
        const result = isPalindromeCustom(testString, option);
        console.log(`Option ${index + 1}: ${JSON.stringify(option)} → ${result}`);
    });
    
    // Palindromic substring analysis
    const analysisText = "racecar";
    console.log(`\nPalindromic Substring Analysis for "${analysisText}":`);
    const substrings = countPalindromicSubstrings(analysisText);
    console.log(`Total palindromic substrings: ${substrings.count}`);
    substrings.palindromes.forEach(p => {
        console.log(`  "${p.substring}" (${p.start}-${p.end}, length: ${p.length})`);
    });
    
    // Longest palindromic substring
    const longText = "babad";
    console.log(`\nLongest Palindromic Substring in "${longText}":`);
    const longest = findLongestPalindromicSubstring(longText);
    console.log(`Result: "${longest}"`);
    
    // Case sensitivity comparison
    const caseTest = "Aa";
    console.log(`\nCase Sensitivity Comparison for "${caseTest}":`);
    console.log(`Case-insensitive: ${isPalindromeOptimized(caseTest)}`);
    console.log(`Case-sensitive: ${isPalindromeCaseSensitive(caseTest)}`);
}

// ============= TEST CASES =============

function testValidPalindromeExtraSpace() {
    console.log("\n=== Testing Valid Palindrome (Extra Space) ===");
    
    const testCases = [
        { s: "A man, a plan, a canal: Panama", expected: true, description: "Classic palindrome" },
        { s: "race a car", expected: false, description: "Not palindrome" },
        { s: " ", expected: true, description: "Empty after cleaning" },
        { s: "Madam", expected: true, description: "Simple palindrome" },
        { s: "No 'x' in Nixon", expected: true, description: "Complex palindrome" },
        { s: "hello", expected: false, description: "Simple non-palindrome" },
        { s: "12321", expected: true, description: "Numeric palindrome" },
        { s: "A1B2b1a", expected: true, description: "Mixed alphanumeric" },
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
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        // Create palindromic test string
        const half = 'a'.repeat(size / 2);
        const testString = half + half.split('').reverse().join('');
        
        console.log(`\nSize: ${size} characters`);
        
        const methods = [
            { name: "Better (Regex)", func: isPalindromeBetter },
            { name: "Optimized (Array)", func: isPalindromeOptimized }
        ];
        
        methods.forEach(method => {
            console.time(method.name);
            const result = method.func(testString);
            console.timeEnd(method.name);
            console.log(`  ${method.name}: ${result}`);
        });
    });
    
    // Edge cases test
    console.log("\n--- Edge Cases Test ---");
    const edgeCases = [
        { s: null, description: "Null input" },
        { s: undefined, description: "Undefined input" },
        { s: 123, description: "Non-string input" },
        { s: "!@#$%^&*()", description: "Only special characters" },
        { s: "12345", description: "Only numbers" },
        { s: "ABCDE", description: "Only letters (uppercase)" }
    ];
    
    edgeCases.forEach(testCase => {
        console.log(`\n${testCase.description}:`);
        const result = isPalindromeOptimized(testCase.s);
        console.log(`Result: ${result}`);
        console.log(`Status: ✅ HANDLED`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 VALID PALINDROME - EXTRA SPACE APPROACH - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
demonstratePalindromeMethods();
testValidPalindromeExtraSpace();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    isPalindromeBruteForce,
    isPalindromeBetter,
    isPalindromeOptimized,
    isPalindromeFunctional,
    isPalindromeDetailed,
    isPalindromeCaseSensitive,
    isPalindromeIgnoreChars,
    isPalindromeCustom,
    findLongestPalindromicSubstring,
    countPalindromicSubstrings,
    isAlphanumeric,
    cleanString,
    reverseString,
    validateInput,
    visualizePalindromeCheck,
    demonstratePalindromeMethods,
    interactiveLearning
};
