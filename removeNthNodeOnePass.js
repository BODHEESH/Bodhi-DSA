/**
 * Remove Nth Node from End - One Pass (Two Pointers)
 * Bodhi-DSA Course
 * 
 * Problem: Remove the nth node from the end of a linked list in one pass
 * Use two pointers technique for optimal efficiency
 * 
 * Example:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5] (removed 4, which is 2nd from end)
 * 
 * Key Insight: Maintain n+1 gap between two pointers
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (For Comparison) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Store nodes in array for easy access

function removeNthFromEndBruteForce(head, n) {
    if (!head) return null;
    
    const nodes = [];
    let current = head;
    
    // Store all nodes
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    const length = nodes.length;
    
    // Remove head case
    if (n === length) {
        return head.next;
    }
    
    // Remove nth from end
    const prevIndex = length - n - 1;
    nodes[prevIndex].next = nodes[prevIndex].next.next;
    
    return head;
}

// ============= BETTER APPROACH (Two Pass) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Count then remove (for comparison with one-pass)

function removeNthFromEndTwoPass(head, n) {
    if (!head) return null;
    
    // Count nodes
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    
    // Handle head removal
    if (n === length) {
        return head.next;
    }
    
    // Find and remove
    current = head;
    for (let i = 0; i < length - n - 1; i++) {
        current = current.next;
    }
    
    current.next = current.next.next;
    return head;
}

// ============= OPTIMIZED APPROACH (One Pass - Two Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use two pointers with n+1 gap

function removeNthFromEndOptimized(head, n) {
    // Create dummy node to handle edge cases
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let first = dummy;
    let second = dummy;
    
    // Move first pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }
    
    // Move both pointers until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }
    
    // Remove the nth node from end
    second.next = second.next.next;
    
    return dummy.next;
}

// ============= ELEGANT APPROACH (One Pass without Dummy) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Handle head case separately, use two pointers

function removeNthFromEndElegant(head, n) {
    if (!head) return null;
    
    let first = head;
    let second = head;
    
    // Move first pointer n steps ahead
    for (let i = 0; i < n; i++) {
        first = first.next;
    }
    
    // If first is null, we need to remove head
    if (!first) {
        return head.next;
    }
    
    // Move both pointers until first reaches end
    while (first.next) {
        first = first.next;
        second = second.next;
    }
    
    // Remove the nth node from end
    second.next = second.next.next;
    
    return head;
}

// ============= RECURSIVE APPROACH (One Pass) =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Use recursion to count from end

function removeNthFromEndRecursive(head, n) {
    const result = removeNthHelper(head, n);
    return result.node;
}

function removeNthHelper(node, n) {
    if (!node) {
        return { node: null, count: 0 };
    }
    
    const result = removeNthHelper(node.next, n);
    const currentCount = result.count + 1;
    
    // If this is the node to remove
    if (currentCount === n) {
        return { node: result.node, count: currentCount };
    }
    
    // Keep current node
    node.next = result.node;
    return { node: node, count: currentCount };
}

// ============= ADVANCED VARIATIONS =============

// Remove nth from end with gap visualization
function removeNthFromEndWithVisualization(head, n) {
    console.log(`\n=== Removing ${n}th node from end ===`);
    console.log(`Original: ${displayList(head)}`);
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let first = dummy;
    let second = dummy;
    
    // Create gap of n+1
    console.log(`\nCreating gap of ${n + 1} between pointers:`);
    for (let i = 0; i <= n; i++) {
        first = first.next;
        console.log(`Step ${i + 1}: first moved to [${first ? first.val : 'null'}]`);
    }
    
    console.log(`\nMoving both pointers until first reaches end:`);
    let step = 0;
    while (first) {
        first = first.next;
        second = second.next;
        step++;
        console.log(`Step ${step}: first=[${first ? first.val : 'null'}], second=[${second.val}]`);
    }
    
    console.log(`\nRemoving node: [${second.next.val}]`);
    second.next = second.next.next;
    
    const result = dummy.next;
    console.log(`Result: ${displayList(result)}`);
    return result;
}

// Remove nth from end with detailed info
function removeNthFromEndWithInfo(head, n) {
    if (!head) {
        return {
            newHead: null,
            removedValue: null,
            steps: 0,
            originalLength: 0
        };
    }
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let first = dummy;
    let second = dummy;
    let steps = 0;
    
    // Create gap
    for (let i = 0; i <= n; i++) {
        first = first.next;
        steps++;
    }
    
    // Move both pointers
    while (first) {
        first = first.next;
        second = second.next;
        steps++;
    }
    
    const removedValue = second.next ? second.next.val : null;
    second.next = second.next.next;
    
    return {
        newHead: dummy.next,
        removedValue: removedValue,
        steps: steps,
        originalLength: getListLength(head)
    };
}

// Remove multiple nodes from end in one pass
function removeMultipleFromEndOnePass(head, positions) {
    if (!head || !positions || positions.length === 0) return head;
    
    // Sort positions in descending order
    const sortedPositions = [...positions].sort((a, b) => b - a);
    
    let current = head;
    for (const n of sortedPositions) {
        current = removeNthFromEndOptimized(current, n);
    }
    
    return current;
}

// Safe removal with validation
function removeNthFromEndSafe(head, n) {
    if (!head) {
        throw new Error("Cannot remove from empty list");
    }
    
    if (n <= 0) {
        throw new Error("Position must be positive");
    }
    
    // Quick length check using two pointers
    let length = 0;
    let temp = head;
    while (temp) {
        length++;
        temp = temp.next;
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

// ============= VISUALIZATION FUNCTIONS =============

function visualizeTwoPointers(head, n) {
    console.log("\n=== Visualizing Two Pointers Technique ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    console.log(`Target: Remove ${n}th node from end`);
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let first = dummy;
    let second = dummy;
    
    console.log(`\n--- Phase 1: Create Gap of ${n + 1} ---`);
    console.log(`Initial: first=dummy, second=dummy`);
    
    for (let i = 0; i <= n; i++) {
        first = first.next;
        const firstVal = first ? first.val : 'null';
        console.log(`Step ${i + 1}: Move first to [${firstVal}]`);
    }
    
    console.log(`\nGap created: first=[${first ? first.val : 'null'}], second=[dummy]`);
    
    console.log(`\n--- Phase 2: Move Both Pointers ---`);
    let step = 0;
    
    while (first) {
        first = first.next;
        second = second.next;
        step++;
        
        const firstVal = first ? first.val : 'null';
        const secondVal = second.val;
        console.log(`Step ${step}: first=[${firstVal}], second=[${secondVal}]`);
    }
    
    console.log(`\n--- Phase 3: Remove Node ---`);
    const nodeToRemove = second.next;
    console.log(`Node to remove: [${nodeToRemove.val}]`);
    console.log(`Previous node: [${second.val}]`);
    
    second.next = second.next.next;
    
    const result = dummy.next;
    console.log(`\nFinal result: ${displayList(result)}`);
    
    return result;
}

function demonstrateOnePassMethods() {
    console.log("\n=== Demonstrating One-Pass Methods ===");
    
    const testCases = [
        { list: [1, 2, 3, 4, 5], n: 2, name: "Remove 2nd from end" },
        { list: [1, 2, 3, 4, 5], n: 5, name: "Remove head" },
        { list: [1, 2, 3, 4, 5], n: 1, name: "Remove tail" },
        { list: [1], n: 1, name: "Remove only node" },
        { list: [1, 2], n: 2, name: "Remove head of two" }
    ];
    
    const methods = [
        { name: "Two Pass (comparison)", func: removeNthFromEndTwoPass },
        { name: "One Pass (Dummy)", func: removeNthFromEndOptimized },
        { name: "One Pass (Elegant)", func: removeNthFromEndElegant },
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
        { name: "Brute Force (Array)", time: "O(n)", space: "O(n)", passes: "1", notes: "Extra space for array" },
        { name: "Two Pass", time: "O(n)", space: "O(1)", passes: "2", notes: "Two traversals" },
        { name: "One Pass (Dummy)", time: "O(n)", space: "O(1)", passes: "1", notes: "Optimal solution" },
        { name: "One Pass (Elegant)", time: "O(n)", space: "O(1)", passes: "1", notes: "No dummy node" },
        { name: "Recursive", time: "O(n)", space: "O(n)", passes: "1", notes: "Recursion stack" }
    ];
    
    console.log("\n" + "=".repeat(100));
    console.log("| Approach            | Time | Space | Passes | Notes                    |");
    console.log("=".repeat(100));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const passes = approach.passes.padEnd(6);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${passes} | ${notes} |`);
    });
    
    console.log("=".repeat(100));
    
    console.log("\n🏆 Winner: One Pass (Two Pointers)");
    console.log("• Single traversal of the list");
    console.log("• O(1) space complexity");
    console.log("• Elegant two-pointer technique");
    console.log("• Optimal time and space efficiency");
}

function compareOnePassVsTwoPass() {
    console.log("\n=== One Pass vs Two Pass Detailed Comparison ===");
    
    console.log("\n⚡ One Pass Method:");
    console.log("✅ Advantages:");
    console.log("  • Single traversal - more efficient");
    console.log("  • Better cache performance");
    console.log("  • Demonstrates advanced pointer technique");
    console.log("  • Optimal for large lists");
    
    console.log("❌ Disadvantages:");
    console.log("  • More complex logic initially");
    console.log("  • Requires understanding of two-pointer technique");
    console.log("  • Slightly harder to debug");
    
    console.log("\n🔄 Two Pass Method:");
    console.log("✅ Advantages:");
    console.log("  • Simpler logic and easier to understand");
    console.log("  • Easier to debug and modify");
    console.log("  • More intuitive approach");
    
    console.log("❌ Disadvantages:");
    console.log("  • Two traversals - less efficient");
    console.log("  • More cache misses");
    console.log("  • Not optimal for very large lists");
    
    console.log("\n📊 Performance Comparison:");
    
    const sizes = [1000, 5000, 10000];
    
    sizes.forEach(size => {
        console.log(`\nList size: ${size}`);
        const testList1 = createListFromArray(Array.from({length: size}, (_, i) => i + 1));
        const testList2 = createListFromArray(Array.from({length: size}, (_, i) => i + 1));
        
        console.time(`Two Pass - ${size}`);
        removeNthFromEndTwoPass(testList1, Math.floor(size / 2));
        console.timeEnd(`Two Pass - ${size}`);
        
        console.time(`One Pass - ${size}`);
        removeNthFromEndOptimized(testList2, Math.floor(size / 2));
        console.timeEnd(`One Pass - ${size}`);
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { name: "Single node", list: [1], n: 1, expected: [] },
        { name: "Two nodes - remove head", list: [1, 2], n: 2, expected: [2] },
        { name: "Two nodes - remove tail", list: [1, 2], n: 1, expected: [1] },
        { name: "Remove head from long list", list: [1, 2, 3, 4, 5], n: 5, expected: [2, 3, 4, 5] },
        { name: "Remove tail from long list", list: [1, 2, 3, 4, 5], n: 1, expected: [1, 2, 3, 4] },
        { name: "Remove middle", list: [1, 2, 3, 4, 5], n: 3, expected: [1, 2, 4, 5] },
        { name: "All same values", list: [7, 7, 7, 7], n: 2, expected: [7, 7, 7] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        const list = createListFromArray(testCase.list);
        console.log(`Input: [${testCase.list.join(', ')}], n = ${testCase.n}`);
        
        const result = removeNthFromEndOptimized(list, testCase.n);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Error Handling ---");
    
    try {
        removeNthFromEndSafe(null, 1);
        console.log("❌ Should have thrown error");
    } catch (error) {
        console.log(`✅ Correctly caught: ${error.message}`);
    }
    
    try {
        const testList = createListFromArray([1, 2, 3]);
        removeNthFromEndSafe(testList, 5);
        console.log("❌ Should have thrown error");
    } catch (error) {
        console.log(`✅ Correctly caught: ${error.message}`);
    }
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: One Pass Removal ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master the two-pointer technique");
    console.log("2. Understand gap-based positioning");
    console.log("3. Optimize from two-pass to one-pass");
    console.log("4. Handle edge cases elegantly");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Two pointers with controlled gap");
    console.log("2. Gap size = n + 1 (to reach node before target)");
    console.log("3. When first reaches end, second is at target's previous");
    console.log("4. Single traversal for optimal efficiency");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Create gap of n+1 between pointers");
    console.log("2. Move both pointers at same speed");
    console.log("3. When first reaches end, second is positioned perfectly");
    console.log("4. Remove node by updating second's next pointer");
    
    console.log("\n⚡ Why Gap = n + 1?");
    console.log("• To remove nth from end, we need (n-1)th from end");
    console.log("• Gap of n+1 ensures second stops at correct position");
    console.log("• When first is null, second points to node before target");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Use dummy node to handle head removal uniformly");
    console.log("2. Create gap first, then move both pointers");
    console.log("3. Check for edge cases (empty list, n > length)");
    console.log("4. Validate gap creation doesn't go out of bounds");
    
    visualizeTwoPointers(createListFromArray([1, 2, 3, 4, 5]), 2);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Real-time Data Processing:**");
    console.log("   - Remove recent entries from streaming data");
    console.log("   - Sliding window operations");
    
    console.log("\n2. **Memory Management:**");
    console.log("   - Efficient cleanup of recent allocations");
    console.log("   - Single-pass garbage collection");
    
    console.log("\n3. **Network Packet Processing:**");
    console.log("   - Remove recent packets from buffer");
    console.log("   - One-pass buffer management");
    
    console.log("\n4. **Database Optimization:**");
    console.log("   - Single-pass record deletion");
    console.log("   - Efficient log cleanup");
    
    console.log("\n5. **Algorithm Interviews:**");
    console.log("   - Demonstrates advanced pointer techniques");
    console.log("   - Shows optimization thinking");
    
    console.log("\n📊 Efficiency Comparison:");
    
    // Demonstrate efficiency with large list
    const largeList1 = createListFromArray(Array.from({length: 10000}, (_, i) => i + 1));
    const largeList2 = createListFromArray(Array.from({length: 10000}, (_, i) => i + 1));
    
    console.log("\nLarge list (10,000 nodes) - Remove 5000th from end:");
    
    console.time("Two Pass Method");
    removeNthFromEndTwoPass(largeList1, 5000);
    console.timeEnd("Two Pass Method");
    
    console.time("One Pass Method");
    removeNthFromEndOptimized(largeList2, 5000);
    console.timeEnd("One Pass Method");
}

// ============= TEST CASES =============

function testOnePassRemoval() {
    console.log("\n=== Testing One Pass Removal ===");
    
    console.log("\n--- Comprehensive Test Suite ---");
    
    const testCases = [
        { input: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5], description: "Standard case" },
        { input: [1], n: 1, expected: [], description: "Single node" },
        { input: [1, 2], n: 1, expected: [1], description: "Two nodes - remove tail" },
        { input: [1, 2], n: 2, expected: [2], description: "Two nodes - remove head" },
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
    
    console.log("\n--- Advanced Features Test ---");
    
    console.log("\n1. Removal with detailed info:");
    const infoList = createListFromArray([10, 20, 30, 40, 50]);
    const info = removeNthFromEndWithInfo(infoList, 3);
    console.log(`Original: [10, 20, 30, 40, 50], Remove 3rd from end`);
    console.log(`Removed value: ${info.removedValue}`);
    console.log(`Steps taken: ${info.steps}`);
    console.log(`Result: ${displayList(info.newHead)}`);
    
    console.log("\n2. Multiple removals:");
    const multiList = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const multiResult = removeMultipleFromEndOnePass(multiList, [2, 4, 6]);
    console.log(`Original: [1, 2, 3, 4, 5, 6, 7, 8, 9]`);
    console.log(`Remove positions [2, 4, 6] from end: ${displayList(multiResult)}`);
    
    console.log("\n3. Performance on large list:");
    const performanceList = createListFromArray(Array.from({length: 50000}, (_, i) => i + 1));
    
    console.time("Remove from 50,000 node list");
    const performanceResult = removeNthFromEndOptimized(performanceList, 25000);
    console.timeEnd("Remove from 50,000 node list");
    
    const resultLength = getListLength(performanceResult);
    console.log(`Result length: ${resultLength} (expected: 49,999)`);
    console.log(`Status: ${resultLength === 49999 ? '✅ PASS' : '❌ FAIL'}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REMOVE NTH NODE FROM END - ONE PASS - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
compareOnePassVsTwoPass();
testEdgeCases();
demonstrateOnePassMethods();
practicalApplications();
testOnePassRemoval();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    removeNthFromEndBruteForce,
    removeNthFromEndTwoPass,
    removeNthFromEndOptimized,
    removeNthFromEndElegant,
    removeNthFromEndRecursive,
    removeNthFromEndWithVisualization,
    removeNthFromEndWithInfo,
    removeMultipleFromEndOnePass,
    removeNthFromEndSafe,
    displayList,
    createListFromArray,
    visualizeTwoPointers,
    demonstrateOnePassMethods,
    interactiveLearning
};
