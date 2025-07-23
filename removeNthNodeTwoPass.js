/**
 * Remove Nth Node from End of List - Two Pass Method
 * Bodhi-DSA Course
 * 
 * Problem: Remove the nth node from the end of a linked list
 * Return the head of the modified list
 * 
 * Example:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5] (removed 4, which is 2nd from end)
 * 
 * Input: head = [1], n = 1
 * Output: [] (removed the only node)
 * 
 * Note: n is always valid (1 ≤ n ≤ list length)
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Convert to Array) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Store all nodes in array, remove nth from end

function removeNthFromEndBruteForce(head, n) {
    if (!head) return null;
    
    // Store all nodes in array
    const nodes = [];
    let current = head;
    
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    const length = nodes.length;
    
    // Handle edge case: remove head
    if (n === length) {
        return head.next;
    }
    
    // Find the node to remove (nth from end = (length - n)th from start)
    const indexToRemove = length - n;
    const prevNode = nodes[indexToRemove - 1];
    
    // Remove the node
    prevNode.next = prevNode.next.next;
    
    return head;
}

// ============= BETTER APPROACH (Two Pass - Count then Remove) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: First pass to count nodes, second pass to remove

function removeNthFromEndBetter(head, n) {
    if (!head) return null;
    
    // First pass: count total nodes
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    // Handle edge case: remove head (nth from end = length)
    if (n === length) {
        return head.next;
    }
    
    // Second pass: find and remove the node
    // nth from end = (length - n)th from start (0-indexed)
    const stepsToNodeBeforeTarget = length - n - 1;
    
    current = head;
    for (let i = 0; i < stepsToNodeBeforeTarget; i++) {
        current = current.next;
    }
    
    // Remove the target node
    current.next = current.next.next;
    
    return head;
}

// ============= OPTIMIZED APPROACH (Two Pass with Dummy Node) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use dummy node to handle edge cases uniformly

function removeNthFromEndOptimized(head, n) {
    // Create dummy node to handle edge cases
    const dummy = new ListNode(0);
    dummy.next = head;
    
    // First pass: count total nodes
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    // Second pass: find and remove the node
    // Move to the node before the target
    const stepsToNodeBeforeTarget = length - n;
    
    current = dummy;
    for (let i = 0; i < stepsToNodeBeforeTarget; i++) {
        current = current.next;
    }
    
    // Remove the target node
    current.next = current.next.next;
    
    return dummy.next;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Use recursion to count from end and remove

function removeNthFromEndRecursive(head, n) {
    const result = removeNthFromEndHelper(head, n);
    return result.node;
}

function removeNthFromEndHelper(node, n) {
    // Base case: reached end
    if (!node) {
        return { node: null, count: 0 };
    }
    
    // Recursive call
    const result = removeNthFromEndHelper(node.next, n);
    
    // Current position from end
    const currentCount = result.count + 1;
    
    // If this is the node to remove
    if (currentCount === n) {
        return { node: result.node, count: currentCount };
    }
    
    // Otherwise, keep current node
    node.next = result.node;
    return { node: node, count: currentCount };
}

// ============= ADVANCED VARIATIONS =============

// Remove nth from end with detailed info
function removeNthFromEndWithInfo(head, n) {
    if (!head) {
        return {
            newHead: null,
            removedNode: null,
            originalLength: 0,
            newLength: 0,
            removedValue: null,
            removedPosition: -1
        };
    }
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    // First pass: count nodes
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    // Calculate position from start (0-indexed)
    const positionFromStart = length - n;
    
    // Second pass: remove node
    current = dummy;
    for (let i = 0; i < positionFromStart; i++) {
        current = current.next;
    }
    
    const removedNode = current.next;
    current.next = current.next.next;
    
    return {
        newHead: dummy.next,
        removedNode: removedNode,
        originalLength: length,
        newLength: length - 1,
        removedValue: removedNode ? removedNode.val : null,
        removedPosition: positionFromStart
    };
}

// Remove multiple nodes from end
function removeMultipleFromEnd(head, positions) {
    if (!head || !positions || positions.length === 0) return head;
    
    // Sort positions in descending order to remove from end first
    const sortedPositions = [...positions].sort((a, b) => b - a);
    
    let current = head;
    
    for (const n of sortedPositions) {
        current = removeNthFromEndOptimized(current, n);
    }
    
    return current;
}

// Remove nth from end with validation
function removeNthFromEndSafe(head, n) {
    if (!head) {
        throw new Error("Cannot remove from empty list");
    }
    
    if (n <= 0) {
        throw new Error("Position must be positive");
    }
    
    // Count nodes to validate n
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    if (n > length) {
        throw new Error(`Position ${n} exceeds list length ${length}`);
    }
    
    return removeNthFromEndOptimized(head, n);
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

function listToArray(head) {
    const result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

function findNthFromEnd(head, n) {
    if (!head || n <= 0) return null;
    
    const length = getListLength(head);
    if (n > length) return null;
    
    const stepsFromStart = length - n;
    let current = head;
    
    for (let i = 0; i < stepsFromStart; i++) {
        current = current.next;
    }
    
    return current;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRemoval(head, n) {
    console.log("\n=== Visualizing Two-Pass Removal ===");
    
    if (!head) {
        console.log("Empty list - nothing to remove");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    console.log(`Remove ${n}th node from end`);
    
    // First pass: count nodes
    console.log("\n--- First Pass: Counting Nodes ---");
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        console.log(`Step ${length}: Found node [${current.val}]`);
        current = current.next;
    }
    
    console.log(`Total nodes: ${length}`);
    
    // Calculate target position
    const positionFromStart = length - n;
    console.log(`${n}th from end = ${positionFromStart + 1}th from start (1-indexed)`);
    
    if (n > length) {
        console.log("❌ Invalid: n exceeds list length");
        return head;
    }
    
    // Second pass: find and remove
    console.log("\n--- Second Pass: Finding and Removing ---");
    
    const dummy = new ListNode(0);
    dummy.next = head;
    current = dummy;
    
    console.log(`Step 0: At dummy node`);
    
    for (let i = 0; i < positionFromStart; i++) {
        current = current.next;
        console.log(`Step ${i + 1}: Moved to node [${current.val}]`);
    }
    
    const nodeToRemove = current.next;
    console.log(`\nFound node to remove: [${nodeToRemove.val}]`);
    console.log(`Previous node: [${current.val}]`);
    console.log(`Next node: [${nodeToRemove.next ? nodeToRemove.next.val : 'null'}]`);
    
    // Perform removal
    current.next = current.next.next;
    console.log(`\nRemoval complete!`);
    console.log(`Result: ${displayList(dummy.next)}`);
    
    return dummy.next;
}

function demonstrateRemovalMethods() {
    console.log("\n=== Demonstrating Two-Pass Removal Methods ===");
    
    const testCases = [
        { list: [1, 2, 3, 4, 5], n: 2, name: "Remove 2nd from end" },
        { list: [1, 2, 3, 4, 5], n: 5, name: "Remove head (5th from end)" },
        { list: [1, 2, 3, 4, 5], n: 1, name: "Remove tail (1st from end)" },
        { list: [1], n: 1, name: "Remove only node" },
        { list: [1, 2], n: 1, name: "Remove from two-node list" }
    ];
    
    const methods = [
        { name: "Brute Force (Array)", func: removeNthFromEndBruteForce },
        { name: "Better (Two Pass)", func: removeNthFromEndBetter },
        { name: "Optimized (Dummy)", func: removeNthFromEndOptimized },
        { name: "Recursive", func: removeNthFromEndRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: [${testCase.list.join(', ')}], n = ${testCase.n}`);
        
        methods.forEach(method => {
            const testList = createListFromArray(testCase.list);
            
            console.time(method.name);
            const result = method.func(testList, testCase.n);
            console.timeEnd(method.name);
            
            const resultArray = listToArray(result);
            console.log(`${method.name}: [${resultArray.join(', ')}]`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force (Array)", time: "O(n)", space: "O(n)", notes: "Extra array storage" },
        { name: "Two Pass", time: "O(n)", space: "O(1)", notes: "Two traversals" },
        { name: "Dummy Node", time: "O(n)", space: "O(1)", notes: "Clean edge case handling" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursion stack overhead" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach            | Time | Space | Notes                    |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\n📊 Two-Pass Method Characteristics:");
    console.log("• First pass: Count total nodes");
    console.log("• Second pass: Navigate to target and remove");
    console.log("• Simple and intuitive approach");
    console.log("• Easy to understand and implement");
    console.log("• Good for learning pointer manipulation");
}

function compareWithOnePass() {
    console.log("\n=== Two-Pass vs One-Pass Comparison ===");
    
    console.log("\n🔄 Two-Pass Method:");
    console.log("✅ Pros:");
    console.log("  • Simple and intuitive logic");
    console.log("  • Easy to understand and debug");
    console.log("  • Clear separation of concerns");
    console.log("  • No complex pointer arithmetic");
    
    console.log("❌ Cons:");
    console.log("  • Requires two traversals");
    console.log("  • Slightly less efficient");
    console.log("  • More cache misses");
    
    console.log("\n⚡ One-Pass Method (for comparison):");
    console.log("✅ Pros:");
    console.log("  • Single traversal");
    console.log("  • More efficient");
    console.log("  • Better cache performance");
    
    console.log("❌ Cons:");
    console.log("  • More complex logic");
    console.log("  • Harder to understand initially");
    console.log("  • Requires two-pointer technique");
    
    console.log("\n🎯 When to Use Two-Pass:");
    console.log("• Learning pointer manipulation");
    console.log("• When clarity is more important than efficiency");
    console.log("• In interviews to show understanding");
    console.log("• When debugging complex pointer logic");
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { name: "Single node", list: [1], n: 1, expected: [] },
        { name: "Two nodes - remove first", list: [1, 2], n: 2, expected: [2] },
        { name: "Two nodes - remove second", list: [1, 2], n: 1, expected: [1] },
        { name: "Remove head", list: [1, 2, 3, 4, 5], n: 5, expected: [2, 3, 4, 5] },
        { name: "Remove tail", list: [1, 2, 3, 4, 5], n: 1, expected: [1, 2, 3, 4] },
        { name: "Remove middle", list: [1, 2, 3, 4, 5], n: 3, expected: [1, 2, 4, 5] },
        { name: "Large list", list: Array.from({length: 100}, (_, i) => i + 1), n: 50, expected: "calculated" }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        const list = createListFromArray(testCase.list);
        console.log(`Input: [${testCase.list.length > 10 ? `${testCase.list.slice(0, 5).join(', ')}...` : testCase.list.join(', ')}], n = ${testCase.n}`);
        
        const result = removeNthFromEndOptimized(list, testCase.n);
        const actual = listToArray(result);
        
        if (testCase.expected === "calculated") {
            // For large list, calculate expected
            const expected = testCase.list.filter((_, index) => index !== testCase.list.length - testCase.n);
            const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
            console.log(`Expected length: ${expected.length}, Actual length: ${actual.length}`);
            console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
        } else {
            console.log(`Expected: [${testCase.expected.join(', ')}]`);
            console.log(`Actual: [${actual.join(', ')}]`);
            
            const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
            console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
        }
    });
    
    console.log("\n--- Error Handling Tests ---");
    
    try {
        removeNthFromEndSafe(null, 1);
        console.log("❌ Should have thrown error for null list");
    } catch (error) {
        console.log(`✅ Correctly caught error: ${error.message}`);
    }
    
    try {
        const testList = createListFromArray([1, 2, 3]);
        removeNthFromEndSafe(testList, 5);
        console.log("❌ Should have thrown error for n > length");
    } catch (error) {
        console.log(`✅ Correctly caught error: ${error.message}`);
    }
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Remove Nth Node (Two-Pass) ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master the two-pass technique");
    console.log("2. Understand position calculations");
    console.log("3. Handle edge cases properly");
    console.log("4. Learn when two-pass is preferred");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Two passes: count then remove");
    console.log("2. Position conversion: nth from end = (length - n)th from start");
    console.log("3. Dummy node simplifies edge cases");
    console.log("4. Clear separation of counting and removal logic");
    
    console.log("\n🧠 Algorithm Steps:");
    console.log("1. First pass: traverse to count total nodes");
    console.log("2. Calculate target position from start");
    console.log("3. Second pass: navigate to node before target");
    console.log("4. Update pointer to skip target node");
    
    console.log("\n⚡ Position Calculation:");
    console.log("• List length: L");
    console.log("• nth from end (1-indexed)");
    console.log("• Position from start (0-indexed): L - n");
    console.log("• Steps to previous node: L - n - 1");
    
    console.log("\n🔧 Implementation Strategy:");
    console.log("1. Always use dummy node for uniform handling");
    console.log("2. Validate n against list length");
    console.log("3. Handle head removal as special case");
    console.log("4. Test with various edge cases");
    
    visualizeRemoval(createListFromArray([1, 2, 3, 4, 5]), 2);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Undo Operations:**");
    console.log("   - Remove recent actions from history");
    console.log("   - Rollback nth last operation");
    
    console.log("\n2. **Log Management:**");
    console.log("   - Remove old log entries");
    console.log("   - Cleanup nth last records");
    
    console.log("\n3. **Queue Management:**");
    console.log("   - Remove items from end of queue");
    console.log("   - Priority queue operations");
    
    console.log("\n4. **Version Control:**");
    console.log("   - Remove nth last commit");
    console.log("   - Rollback operations");
    
    console.log("\n5. **Data Stream Processing:**");
    console.log("   - Remove outliers from end");
    console.log("   - Sliding window operations");
    
    console.log("\n📊 Example Applications:");
    
    // Browser history example
    const browserHistory = createListFromArray(['google.com', 'github.com', 'stackoverflow.com', 'youtube.com', 'reddit.com']);
    console.log(`\nBrowser history: ${displayList(browserHistory)}`);
    const afterRemoval = removeNthFromEndOptimized(browserHistory, 2);
    console.log(`After removing 2nd last visit: ${displayList(afterRemoval)}`);
    
    // Task queue example
    const taskQueue = createListFromArray(['task1', 'task2', 'task3', 'task4', 'task5']);
    console.log(`\nTask queue: ${displayList(taskQueue)}`);
    const info = removeNthFromEndWithInfo(taskQueue, 1);
    console.log(`Removed task: ${info.removedValue}`);
    console.log(`Updated queue: ${displayList(info.newHead)}`);
}

// ============= TEST CASES =============

function testTwoPassRemoval() {
    console.log("\n=== Testing Two-Pass Removal ===");
    
    console.log("\n--- Standard Test Cases ---");
    
    const testCases = [
        { input: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5], description: "Remove 2nd from end" },
        { input: [1], n: 1, expected: [], description: "Remove only node" },
        { input: [1, 2], n: 1, expected: [1], description: "Remove last of two" },
        { input: [1, 2], n: 2, expected: [2], description: "Remove first of two" },
        { input: [1, 2, 3, 4, 5], n: 1, expected: [1, 2, 3, 4], description: "Remove tail" },
        { input: [1, 2, 3, 4, 5], n: 5, expected: [2, 3, 4, 5], description: "Remove head" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = createListFromArray(testCase.input);
        console.log(`Input: [${testCase.input.join(', ')}], n = ${testCase.n}`);
        
        const result = removeNthFromEndOptimized(list, testCase.n);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Performance Test ---");
    
    console.log("\n1. Large list removal:");
    const largeList = createListFromArray(Array.from({length: 10000}, (_, i) => i + 1));
    
    console.time("Large list removal");
    const largeResult = removeNthFromEndOptimized(largeList, 5000);
    console.timeEnd("Large list removal");
    
    const resultLength = getListLength(largeResult);
    console.log(`Original length: 10000, Result length: ${resultLength}`);
    console.log(`Status: ${resultLength === 9999 ? '✅ PASS' : '❌ FAIL'}`);
    
    console.log("\n2. Method comparison on large list:");
    const methods = [
        { name: "Two Pass", func: removeNthFromEndBetter },
        { name: "Dummy Node", func: removeNthFromEndOptimized }
    ];
    
    methods.forEach(method => {
        const testList = createListFromArray(Array.from({length: 1000}, (_, i) => i + 1));
        
        console.time(`${method.name} - 1000 nodes`);
        const result = method.func(testList, 500);
        console.timeEnd(`${method.name} - 1000 nodes`);
        
        console.log(`  ${method.name}: Result length ${getListLength(result)}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REMOVE NTH NODE FROM END - TWO PASS - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
compareWithOnePass();
testEdgeCases();
demonstrateRemovalMethods();
practicalApplications();
testTwoPassRemoval();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    removeNthFromEndBruteForce,
    removeNthFromEndBetter,
    removeNthFromEndOptimized,
    removeNthFromEndRecursive,
    removeNthFromEndWithInfo,
    removeMultipleFromEnd,
    removeNthFromEndSafe,
    findNthFromEnd,
    displayList,
    createListFromArray,
    visualizeRemoval,
    demonstrateRemovalMethods,
    interactiveLearning
};
