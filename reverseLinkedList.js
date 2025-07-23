/**
 * Reverse Linked List
 * Bodhi-DSA Course
 * 
 * Problem: Reverse a singly linked list in-place
 * 
 * Example:
 * Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
 * Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Using Array) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Store values in array, create new list in reverse order

function reverseListBruteForce(head) {
    if (!head) return null;
    
    // Store all values in array
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    // Create new list in reverse order
    const newHead = new ListNode(values[values.length - 1]);
    current = newHead;
    
    for (let i = values.length - 2; i >= 0; i--) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }
    
    return newHead;
}

// ============= BETTER APPROACH (Using Stack) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Push all nodes to stack, pop to create reversed list

function reverseListBetter(head) {
    if (!head) return null;
    
    const stack = [];
    let current = head;
    
    // Push all nodes to stack
    while (current) {
        stack.push(current);
        current = current.next;
    }
    
    // Pop nodes to create reversed list
    const newHead = stack.pop();
    current = newHead;
    
    while (stack.length > 0) {
        current.next = stack.pop();
        current = current.next;
    }
    
    current.next = null; // Important: terminate the list
    return newHead;
}

// ============= OPTIMIZED APPROACH (Iterative - Three Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use three pointers to reverse links iteratively

function reverseListOptimized(head) {
    let prev = null;
    let current = head;
    let next = null;
    
    while (current) {
        // Store next node
        next = current.next;
        
        // Reverse the link
        current.next = prev;
        
        // Move pointers forward
        prev = current;
        current = next;
    }
    
    return prev; // prev is now the new head
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Recursively reverse the rest, then fix current node

function reverseListRecursive(head) {
    // Base case: empty list or single node
    if (!head || !head.next) {
        return head;
    }
    
    // Recursively reverse the rest of the list
    const newHead = reverseListRecursive(head.next);
    
    // Reverse the current connection
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

// ============= TAIL RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use helper function with accumulator

function reverseListTailRecursive(head) {
    return reverseHelper(head, null);
}

function reverseHelper(current, prev) {
    // Base case: reached end
    if (!current) {
        return prev;
    }
    
    // Store next and reverse current link
    const next = current.next;
    current.next = prev;
    
    // Tail recursive call
    return reverseHelper(next, current);
}

// ============= VARIATIONS =============

// Reverse first k nodes
function reverseFirstK(head, k) {
    if (!head || k <= 1) return head;
    
    let prev = null;
    let current = head;
    let count = 0;
    
    // Reverse first k nodes
    while (current && count < k) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        count++;
    }
    
    // Connect with remaining list
    if (head) {
        head.next = current;
    }
    
    return prev;
}

// Reverse last k nodes
function reverseLastK(head, k) {
    if (!head || k <= 1) return head;
    
    const length = getListLength(head);
    if (k >= length) return reverseListOptimized(head);
    
    // Find the node before the last k nodes
    let current = head;
    for (let i = 0; i < length - k - 1; i++) {
        current = current.next;
    }
    
    // Reverse the last k nodes
    current.next = reverseListOptimized(current.next);
    
    return head;
}

// Reverse nodes in groups of k
function reverseInGroupsOfK(head, k) {
    if (!head || k <= 1) return head;
    
    // Check if we have k nodes
    let current = head;
    let count = 0;
    
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    // If we have k nodes, reverse them
    if (count === k) {
        // Reverse first k nodes
        current = reverseInGroupsOfK(current, k);
        
        // Reverse current group
        let prev = current;
        current = head;
        
        while (count > 0) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
            count--;
        }
        
        head = prev;
    }
    
    return head;
}

// Reverse between positions m and n (1-indexed)
function reverseBetween(head, m, n) {
    if (!head || m === n) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let prev = dummy;
    
    // Move to position m-1
    for (let i = 1; i < m; i++) {
        prev = prev.next;
    }
    
    // Start reversing from position m
    let current = prev.next;
    
    for (let i = 0; i < n - m; i++) {
        const next = current.next;
        current.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    
    return dummy.next;
}

// ============= HELPER FUNCTIONS =============

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

function listsAreEqual(list1, list2) {
    while (list1 && list2) {
        if (list1.val !== list2.val) return false;
        list1 = list1.next;
        list2 = list2.next;
    }
    
    return !list1 && !list2;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeReversal(head) {
    console.log("\n=== Visualizing Iterative Reversal ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original: ${displayList(head)}`);
    
    let prev = null;
    let current = head;
    let step = 0;
    
    console.log(`\nStep ${step}: prev=null, current=[${current.val}]`);
    
    while (current) {
        const next = current.next;
        
        console.log(`Step ${++step}: Reversing link from [${current.val}] to [${prev ? prev.val : 'null'}]`);
        
        current.next = prev;
        prev = current;
        current = next;
        
        console.log(`  Result so far: ${displayList(prev)}`);
        if (current) {
            console.log(`  Remaining: ${displayList(current)}`);
        }
    }
    
    console.log(`\nFinal reversed list: ${displayList(prev)}`);
    return prev;
}

function visualizeRecursiveReversal(head, depth = 0) {
    const indent = "  ".repeat(depth);
    
    if (!head || !head.next) {
        console.log(`${indent}Base case: ${head ? `[${head.val}]` : 'null'}`);
        return head;
    }
    
    console.log(`${indent}Reversing from [${head.val}], going deeper...`);
    
    const newHead = visualizeRecursiveReversal(head.next, depth + 1);
    
    console.log(`${indent}Back at [${head.val}], reversing link`);
    console.log(`${indent}Setting [${head.next.val}].next = [${head.val}]`);
    console.log(`${indent}Setting [${head.val}].next = null`);
    
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

function demonstrateReversalMethods() {
    console.log("\n=== Demonstrating Different Reversal Methods ===");
    
    const originalList = createListFromArray([1, 2, 3, 4, 5]);
    console.log(`Original list: ${displayList(originalList)}`);
    
    // Test each method
    const methods = [
        { name: "Brute Force (Array)", func: reverseListBruteForce },
        { name: "Better (Stack)", func: reverseListBetter },
        { name: "Optimized (Iterative)", func: reverseListOptimized },
        { name: "Recursive", func: reverseListRecursive },
        { name: "Tail Recursive", func: reverseListTailRecursive }
    ];
    
    methods.forEach(method => {
        const testList = createListFromArray([1, 2, 3, 4, 5]);
        console.log(`\n${method.name}:`);
        
        console.time(method.name);
        const result = method.func(testList);
        console.timeEnd(method.name);
        
        console.log(`Result: ${displayList(result)}`);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force (Array)", time: "O(n)", space: "O(n)", notes: "Creates new nodes" },
        { name: "Stack Based", time: "O(n)", space: "O(n)", notes: "Uses extra stack space" },
        { name: "Iterative (3 pointers)", time: "O(n)", space: "O(1)", notes: "Optimal solution" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursion stack overhead" },
        { name: "Tail Recursive", time: "O(n)", space: "O(n)", notes: "Still uses call stack" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach                | Time | Space | Notes                    |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(23);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\n🏆 Winner: Iterative (3 pointers) - O(1) space, simple logic");
}

function compareApproaches() {
    console.log("\n=== Comparing Reversal Approaches ===");
    
    const sizes = [10, 100, 1000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with list size: ${size}`);
        
        const approaches = [
            { name: "Iterative", func: reverseListOptimized },
            { name: "Recursive", func: reverseListRecursive }
        ];
        
        approaches.forEach(approach => {
            const testList = createListFromArray(Array.from({length: size}, (_, i) => i + 1));
            
            console.time(`${approach.name} (${size})`);
            const result = approach.func(testList);
            console.timeEnd(`${approach.name} (${size})`);
            
            // Verify correctness for small lists
            if (size <= 10) {
                console.log(`  Result: ${displayList(result)}`);
            }
        });
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { name: "Empty list", list: null },
        { name: "Single node", list: createListFromArray([42]) },
        { name: "Two nodes", list: createListFromArray([1, 2]) },
        { name: "Three nodes", list: createListFromArray([1, 2, 3]) },
        { name: "Identical values", list: createListFromArray([5, 5, 5, 5]) },
        { name: "Already sorted desc", list: createListFromArray([5, 4, 3, 2, 1]) }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        console.log(`Original: ${displayList(testCase.list)}`);
        
        // Test with iterative approach
        const listCopy = testCase.list ? createListFromArray(
            displayList(testCase.list).split(' -> ').slice(0, -1).map(Number)
        ) : null;
        
        const result = reverseListOptimized(listCopy);
        console.log(`Reversed: ${displayList(result)}`);
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Reverse Linked List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master the three-pointer technique");
    console.log("2. Understand iterative vs recursive trade-offs");
    console.log("3. Handle edge cases properly");
    console.log("4. Optimize for space complexity");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Three pointers: prev, current, next");
    console.log("2. Reverse one link at a time");
    console.log("3. Move pointers forward after each reversal");
    console.log("4. Return prev as new head");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Keep track of previous node (starts as null)");
    console.log("2. Store next node before breaking link");
    console.log("3. Point current node to previous");
    console.log("4. Move all pointers one step forward");
    console.log("5. Repeat until current becomes null");
    
    console.log("\n⚡ Why Iterative is Better:");
    console.log("1. O(1) space complexity");
    console.log("2. No recursion stack overflow risk");
    console.log("3. More intuitive pointer manipulation");
    console.log("4. Better performance for large lists");
    
    visualizeReversal(createListFromArray([1, 2, 3, 4]));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Undo Operations:**");
    console.log("   - Reverse recent actions");
    console.log("   - Browser back button functionality");
    
    console.log("\n2. **Palindrome Checking:**");
    const palindromeList = createListFromArray([1, 2, 3, 2, 1]);
    console.log(`   Original: ${displayList(palindromeList)}`);
    console.log("   Reverse second half to check palindrome");
    
    console.log("\n3. **Data Processing Pipeline:**");
    console.log("   - Reverse processing order");
    console.log("   - LIFO (Last In, First Out) behavior");
    
    console.log("\n4. **Algorithm Building Block:**");
    console.log("   - Used in merge sort for linked lists");
    console.log("   - Part of more complex list operations");
}

// ============= TEST CASES =============

function testReversalOperations() {
    console.log("\n=== Testing Reversal Operations ===");
    
    console.log("\n--- Basic Reversal Tests ---");
    
    const testCases = [
        { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
        { input: [1, 2], expected: [2, 1] },
        { input: [1], expected: [1] },
        { input: [], expected: [] }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}:`);
        const list = testCase.input.length > 0 ? createListFromArray(testCase.input) : null;
        console.log(`Input: [${testCase.input.join(', ')}]`);
        
        const result = reverseListOptimized(list);
        const actualArray = result ? displayList(result).split(' -> ').slice(0, -1).map(Number) : [];
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actualArray.join(', ')}]`);
        
        const isEqual = JSON.stringify(actualArray) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Advanced Reversal Tests ---");
    
    console.log("\n1. Reverse first 3 nodes:");
    const list1 = createListFromArray([1, 2, 3, 4, 5, 6]);
    console.log(`Original: ${displayList(list1)}`);
    const result1 = reverseFirstK(list1, 3);
    console.log(`Result: ${displayList(result1)}`);
    
    console.log("\n2. Reverse between positions 2 and 4:");
    const list2 = createListFromArray([1, 2, 3, 4, 5]);
    console.log(`Original: ${displayList(list2)}`);
    const result2 = reverseBetween(list2, 2, 4);
    console.log(`Result: ${displayList(result2)}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REVERSE LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstrateReversalMethods();
practicalApplications();
testReversalOperations();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    reverseListBruteForce,
    reverseListBetter,
    reverseListOptimized,
    reverseListRecursive,
    reverseListTailRecursive,
    reverseFirstK,
    reverseLastK,
    reverseInGroupsOfK,
    reverseBetween,
    displayList,
    createListFromArray,
    visualizeReversal,
    demonstrateReversalMethods,
    interactiveLearning
};
