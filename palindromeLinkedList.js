/**
 * Palindrome Linked List
 * Bodhi-DSA Course
 * 
 * Problem: Check if a linked list is a palindrome
 * A palindrome reads the same forwards and backwards
 * 
 * Examples:
 * Input: 1 -> 2 -> 2 -> 1 -> null
 * Output: true
 * 
 * Input: 1 -> 2 -> 3 -> 2 -> 1 -> null
 * Output: true
 * 
 * Input: 1 -> 2 -> 3 -> 4 -> null
 * Output: false
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Array Conversion) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Convert to array and check palindrome

function isPalindromeBruteForce(head) {
    if (!head || !head.next) return true;
    
    // Convert linked list to array
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    // Check if array is palindrome
    let left = 0;
    let right = values.length - 1;
    
    while (left < right) {
        if (values[left] !== values[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// ============= BETTER APPROACH (Stack) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to reverse first half, compare with second half

function isPalindromeBetter(head) {
    if (!head || !head.next) return true;
    
    // Find the middle of the list
    let slow = head;
    let fast = head;
    const stack = [];
    
    // Push first half to stack while finding middle
    while (fast && fast.next) {
        stack.push(slow.val);
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // If odd number of nodes, skip the middle element
    if (fast) {
        slow = slow.next;
    }
    
    // Compare second half with stack (reversed first half)
    while (slow) {
        if (stack.pop() !== slow.val) {
            return false;
        }
        slow = slow.next;
    }
    
    return true;
}

// ============= OPTIMIZED APPROACH (Reverse Second Half) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Find middle, reverse second half, compare, restore

function isPalindromeOptimized(head) {
    if (!head || !head.next) return true;
    
    // Step 1: Find the middle of the list
    let slow = head;
    let fast = head;
    let prevSlow = null;
    
    while (fast && fast.next) {
        prevSlow = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Step 2: Handle odd length (skip middle element)
    let secondHalf = slow;
    if (fast) { // Odd number of nodes
        secondHalf = slow.next;
    }
    
    // Step 3: Reverse the second half
    const reversedSecondHalf = reverseList(secondHalf);
    
    // Step 4: Compare first half with reversed second half
    const isPalin = compareLists(head, reversedSecondHalf);
    
    // Step 5: Restore the list (optional, for good practice)
    reverseList(reversedSecondHalf);
    
    return isPalin;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Use recursion to compare from both ends

function isPalindromeRecursive(head) {
    if (!head || !head.next) return true;
    
    const result = { isPalindrome: true };
    const frontPointer = { node: head };
    
    checkPalindromeRecursive(head, frontPointer, result);
    return result.isPalindrome;
}

function checkPalindromeRecursive(currentNode, frontPointer, result) {
    if (!currentNode) return;
    
    // Recurse to the end
    checkPalindromeRecursive(currentNode.next, frontPointer, result);
    
    // Compare values when returning from recursion
    if (result.isPalindrome && frontPointer.node.val === currentNode.val) {
        frontPointer.node = frontPointer.node.next;
    } else {
        result.isPalindrome = false;
    }
}

// ============= HELPER FUNCTIONS =============

function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

function compareLists(list1, list2) {
    while (list1 && list2) {
        if (list1.val !== list2.val) {
            return false;
        }
        list1 = list1.next;
        list2 = list2.next;
    }
    
    return true; // One or both lists ended, comparison successful
}

function getListLength(head) {
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    return length;
}

function displayList(head) {
    if (!head) return "Empty list";
    
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    return values.join(' -> ') + ' -> null';
}

function createListFromArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    
    let head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// ============= VARIATIONS =============

// Check palindrome ignoring case (for character lists)
function isPalindromeIgnoreCase(head) {
    if (!head || !head.next) return true;
    
    const values = [];
    let current = head;
    
    while (current) {
        // Convert to lowercase if it's a string
        const val = typeof current.val === 'string' ? 
                   current.val.toLowerCase() : current.val;
        values.push(val);
        current = current.next;
    }
    
    let left = 0;
    let right = values.length - 1;
    
    while (left < right) {
        if (values[left] !== values[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Check palindrome with custom comparator
function isPalindromeCustom(head, compareFn = (a, b) => a === b) {
    if (!head || !head.next) return true;
    
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    let left = 0;
    let right = values.length - 1;
    
    while (left < right) {
        if (!compareFn(values[left], values[right])) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

// Find longest palindromic subsequence in linked list
function longestPalindromicSubsequence(head) {
    if (!head) return 0;
    
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    // Use dynamic programming to find LPS
    const n = values.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));
    
    // Single characters are palindromes of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // Check for palindromes of length 2 and more
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            
            if (values[i] === values[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[0][n - 1];
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizePalindromeCheck(head) {
    console.log("\n=== Visualizing Palindrome Check ===");
    
    if (!head) {
        console.log("Empty list is palindrome: true");
        return true;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    
    // Step 1: Find middle
    console.log("\nStep 1: Finding middle of the list");
    let slow = head;
    let fast = head;
    let step = 0;
    
    while (fast && fast.next) {
        console.log(`  Step ${step}: slow=[${slow.val}], fast=[${fast.val}]`);
        slow = slow.next;
        fast = fast.next.next;
        step++;
    }
    
    console.log(`  Middle found at: [${slow.val}]`);
    
    // Step 2: Determine second half start
    let secondHalf = slow;
    if (fast) { // Odd length
        console.log("  Odd length list - skipping middle element");
        secondHalf = slow.next;
    }
    
    // Step 3: Show what we're comparing
    console.log("\nStep 2: Preparing for comparison");
    console.log(`First half: ${displayListUpTo(head, slow)}`);
    console.log(`Second half: ${displayList(secondHalf)}`);
    
    // Step 4: Reverse second half
    console.log("\nStep 3: Reversing second half");
    const reversedSecondHalf = reverseList(secondHalf);
    console.log(`Reversed second half: ${displayList(reversedSecondHalf)}`);
    
    // Step 5: Compare
    console.log("\nStep 4: Comparing first half with reversed second half");
    const result = compareLists(head, reversedSecondHalf);
    
    console.log(`Result: ${result ? 'PALINDROME' : 'NOT PALINDROME'}`);
    
    // Restore list
    reverseList(reversedSecondHalf);
    
    return result;
}

function displayListUpTo(head, endNode) {
    if (!head) return "Empty";
    
    const values = [];
    let current = head;
    
    while (current && current !== endNode) {
        values.push(current.val);
        current = current.next;
    }
    
    return values.join(' -> ') + (values.length > 0 ? ' -> ...' : '');
}

function demonstratePalindromeMethods() {
    console.log("\n=== Demonstrating Palindrome Detection Methods ===");
    
    const testCases = [
        { name: "Even palindrome", list: createListFromArray([1, 2, 2, 1]) },
        { name: "Odd palindrome", list: createListFromArray([1, 2, 3, 2, 1]) },
        { name: "Not palindrome", list: createListFromArray([1, 2, 3, 4]) },
        { name: "Single node", list: createListFromArray([1]) }
    ];
    
    const methods = [
        { name: "Array Conversion", func: isPalindromeBruteForce },
        { name: "Stack Method", func: isPalindromeBetter },
        { name: "Reverse Half", func: isPalindromeOptimized },
        { name: "Recursive", func: isPalindromeRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name}: ${displayList(testCase.list)} ---`);
        
        methods.forEach(method => {
            // Create a fresh copy for each method
            const listCopy = createListFromArray(
                displayList(testCase.list).split(' -> ').slice(0, -1).map(Number)
            );
            
            console.log(`${method.name}: ${method.func(listCopy)}`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Array Conversion", time: "O(n)", space: "O(n)", notes: "Simple, uses extra array" },
        { name: "Stack Method", time: "O(n)", space: "O(n)", notes: "Uses stack for first half" },
        { name: "Reverse Half", time: "O(n)", space: "O(1)", notes: "Optimal solution" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursion stack overhead" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach          | Time | Space | Notes                        |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(17);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(28);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\n🏆 Winner: Reverse Half Method");
    console.log("• O(1) space complexity");
    console.log("• O(n) time complexity");
    console.log("• Doesn't require extra data structures");
    console.log("• Can restore original list structure");
}

function compareApproaches() {
    console.log("\n=== Comparing Palindrome Detection Approaches ===");
    
    const sizes = [10, 100, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with palindrome of size: ${size}`);
        
        // Create palindromic array
        const half = Array.from({length: Math.floor(size/2)}, (_, i) => i + 1);
        const palindromeArray = [...half, ...(size % 2 ? [0] : []), ...half.reverse()];
        
        const approaches = [
            { name: "Array", func: isPalindromeBruteForce },
            { name: "Stack", func: isPalindromeBetter },
            { name: "Reverse", func: isPalindromeOptimized }
        ];
        
        approaches.forEach(approach => {
            const testList = createListFromArray(palindromeArray);
            
            console.time(`${approach.name}-${size}`);
            const result = approach.func(testList);
            console.timeEnd(`${approach.name}-${size}`);
            
            console.log(`  ${approach.name}: ${result}`);
        });
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { name: "Empty list", list: null, expected: true },
        { name: "Single node", list: createListFromArray([1]), expected: true },
        { name: "Two identical", list: createListFromArray([1, 1]), expected: true },
        { name: "Two different", list: createListFromArray([1, 2]), expected: false },
        { name: "Even palindrome", list: createListFromArray([1, 2, 2, 1]), expected: true },
        { name: "Odd palindrome", list: createListFromArray([1, 2, 3, 2, 1]), expected: true },
        { name: "Not palindrome", list: createListFromArray([1, 2, 3, 4, 5]), expected: false },
        { name: "All same values", list: createListFromArray([5, 5, 5, 5, 5]), expected: true },
        { name: "Large palindrome", list: createListFromArray([1, 2, 3, 4, 5, 4, 3, 2, 1]), expected: true }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        console.log(`List: ${displayList(testCase.list)}`);
        
        const result = isPalindromeOptimized(testCase.list);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`Status: ${result === testCase.expected ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Palindrome Linked List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master multiple palindrome detection approaches");
    console.log("2. Understand space-time trade-offs");
    console.log("3. Learn the reverse-half technique");
    console.log("4. Apply two-pointer and recursion concepts");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Palindrome: reads same forwards and backwards");
    console.log("2. Find middle using two pointers");
    console.log("3. Reverse second half for comparison");
    console.log("4. Handle odd/even length differences");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Split list into two halves");
    console.log("2. Reverse one half");
    console.log("3. Compare both halves element by element");
    console.log("4. If all match, it's a palindrome");
    
    console.log("\n⚡ Optimization Insights:");
    console.log("1. Don't need to store entire list");
    console.log("2. Only reverse half the list");
    console.log("3. Use two pointers to find middle efficiently");
    console.log("4. Can restore original list after checking");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Handle odd length by skipping middle element");
    console.log("2. Be careful with pointer manipulation");
    console.log("3. Consider restoring original list structure");
    console.log("4. Test with various edge cases");
    
    visualizePalindromeCheck(createListFromArray([1, 2, 3, 2, 1]));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Data Validation:**");
    console.log("   - Validate symmetric data structures");
    console.log("   - Check configuration consistency");
    
    console.log("\n2. **DNA Sequence Analysis:**");
    console.log("   - Find palindromic sequences in DNA");
    console.log("   - Identify restriction enzyme sites");
    
    console.log("\n3. **Text Processing:**");
    console.log("   - Detect palindromic phrases");
    console.log("   - Word game implementations");
    
    console.log("\n4. **Cryptography:**");
    console.log("   - Palindromic keys or patterns");
    console.log("   - Symmetric encryption validation");
    
    console.log("\n5. **Algorithm Building Block:**");
    console.log("   - Part of more complex string algorithms");
    console.log("   - Used in pattern matching");
    
    console.log("\n📊 Example Applications:");
    
    // DNA sequence example
    const dnaSequence = createListFromArray(['A', 'T', 'G', 'C', 'G', 'T', 'A']);
    console.log(`DNA sequence: ${displayList(dnaSequence)}`);
    console.log(`Is palindromic: ${isPalindromeOptimized(dnaSequence)}`);
    
    // Number sequence example
    const numberSequence = createListFromArray([1, 2, 3, 4, 3, 2, 1]);
    console.log(`Number sequence: ${displayList(numberSequence)}`);
    console.log(`Is palindromic: ${isPalindromeOptimized(numberSequence)}`);
}

// ============= TEST CASES =============

function testPalindromeDetection() {
    console.log("\n=== Testing Palindrome Detection ===");
    
    console.log("\n--- Comprehensive Test Suite ---");
    
    const testCases = [
        { input: [1, 2, 2, 1], expected: true, description: "Even length palindrome" },
        { input: [1, 2, 3, 2, 1], expected: true, description: "Odd length palindrome" },
        { input: [1, 2, 3, 4], expected: false, description: "Not a palindrome" },
        { input: [1], expected: true, description: "Single element" },
        { input: [1, 1], expected: true, description: "Two identical elements" },
        { input: [1, 2], expected: false, description: "Two different elements" },
        { input: [], expected: true, description: "Empty list" },
        { input: [5, 5, 5, 5], expected: true, description: "All same elements" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = testCase.input.length > 0 ? createListFromArray(testCase.input) : null;
        console.log(`Input: [${testCase.input.join(', ')}]`);
        
        const result = isPalindromeOptimized(list);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`Status: ${result === testCase.expected ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Performance Test ---");
    
    console.log("\n1. Large palindrome test:");
    const largePalindrome = [];
    for (let i = 1; i <= 500; i++) largePalindrome.push(i);
    for (let i = 500; i >= 1; i--) largePalindrome.push(i);
    
    const largeList = createListFromArray(largePalindrome);
    console.time("Large palindrome check");
    const largeResult = isPalindromeOptimized(largeList);
    console.timeEnd("Large palindrome check");
    console.log(`Large palindrome (1000 nodes): ${largeResult}`);
    
    console.log("\n2. Custom comparator test:");
    const stringList = createListFromArray(['A', 'b', 'B', 'a']);
    const caseInsensitive = isPalindromeCustom(stringList, (a, b) => 
        a.toLowerCase() === b.toLowerCase()
    );
    console.log(`Case-insensitive palindrome ['A','b','B','a']: ${caseInsensitive}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 PALINDROME LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstratePalindromeMethods();
practicalApplications();
testPalindromeDetection();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    isPalindromeBruteForce,
    isPalindromeBetter,
    isPalindromeOptimized,
    isPalindromeRecursive,
    isPalindromeIgnoreCase,
    isPalindromeCustom,
    longestPalindromicSubsequence,
    displayList,
    createListFromArray,
    visualizePalindromeCheck,
    demonstratePalindromeMethods,
    interactiveLearning
};
