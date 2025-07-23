/**
 * Swap Nodes in Pairs - Iterative Approach
 * Bodhi-DSA Course
 * 
 * Problem: Swap every two adjacent nodes in a linked list and return its head.
 * You must solve the problem without modifying the values in the list's nodes
 * (i.e., only nodes themselves may be changed.)
 * 
 * Example:
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 * 
 * Input: head = []
 * Output: []
 * 
 * Input: head = [1]
 * Output: [1]
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Value Swapping) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Swap values instead of nodes (violates problem constraint)

function swapPairsBruteForce(head) {
    if (!head || !head.next) return head;
    
    let current = head;
    
    while (current && current.next) {
        // Swap values (not recommended as it violates constraint)
        const temp = current.val;
        current.val = current.next.val;
        current.next.val = temp;
        
        // Move to next pair
        current = current.next.next;
    }
    
    return head;
}

// ============= BETTER APPROACH (Three Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use three pointers to track and swap nodes

function swapPairsBetter(head) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let prev = dummy;
    let current = head;
    
    while (current && current.next) {
        const next = current.next;
        const afterNext = next.next;
        
        // Perform swap
        prev.next = next;
        next.next = current;
        current.next = afterNext;
        
        // Move pointers for next iteration
        prev = current;
        current = afterNext;
    }
    
    return dummy.next;
}

// ============= OPTIMIZED APPROACH (Clean Iterative) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Most elegant iterative solution

function swapPairsOptimized(head) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (prev.next && prev.next.next) {
        // Identify nodes to swap
        const first = prev.next;
        const second = prev.next.next;
        
        // Perform swap
        prev.next = second;
        first.next = second.next;
        second.next = first;
        
        // Move prev to end of swapped pair
        prev = first;
    }
    
    return dummy.next;
}

// ============= STACK APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to reverse pairs

function swapPairsStack(head) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    let current = dummy;
    let node = head;
    
    while (node && node.next) {
        const stack = [];
        
        // Push pair to stack
        stack.push(node);
        stack.push(node.next);
        
        // Move to next pair
        node = node.next.next;
        
        // Pop from stack and connect
        while (stack.length > 0) {
            current.next = stack.pop();
            current = current.next;
        }
    }
    
    // Connect remaining node if exists
    current.next = node;
    
    return dummy.next;
}

// ============= ADVANCED VARIATIONS =============

// Swap nodes in groups of k
function swapNodesInGroups(head, k) {
    if (!head || k <= 1) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (true) {
        // Check if we have k nodes remaining
        let current = prev;
        for (let i = 0; i < k && current; i++) {
            current = current.next;
        }
        
        if (!current) break; // Not enough nodes for a complete group
        
        // Reverse k nodes
        let groupPrev = prev.next;
        let groupCurrent = groupPrev.next;
        
        for (let i = 1; i < k; i++) {
            groupPrev.next = groupCurrent.next;
            groupCurrent.next = prev.next;
            prev.next = groupCurrent;
            groupCurrent = groupPrev.next;
        }
        
        prev = groupPrev;
    }
    
    return dummy.next;
}

// Swap with step tracking
function swapPairsWithSteps(head) {
    if (!head || !head.next) return { result: head, steps: [] };
    
    const steps = [];
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let stepCount = 0;
    
    while (prev.next && prev.next.next) {
        stepCount++;
        const first = prev.next;
        const second = prev.next.next;
        
        steps.push({
            step: stepCount,
            action: 'identify',
            first: first.val,
            second: second.val,
            before: listToArray(dummy.next)
        });
        
        // Perform swap
        prev.next = second;
        first.next = second.next;
        second.next = first;
        
        steps.push({
            step: stepCount,
            action: 'swap',
            swapped: `${first.val} <-> ${second.val}`,
            after: listToArray(dummy.next)
        });
        
        prev = first;
    }
    
    return { result: dummy.next, steps: steps };
}

// Swap alternate pairs (1st-2nd, 5th-6th, 9th-10th, ...)
function swapAlternatePairs(head) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let pairCount = 0;
    
    while (prev.next && prev.next.next) {
        pairCount++;
        
        if (pairCount % 2 === 1) {
            // Swap this pair
            const first = prev.next;
            const second = prev.next.next;
            
            prev.next = second;
            first.next = second.next;
            second.next = first;
            
            prev = first;
        } else {
            // Skip this pair
            prev = prev.next.next;
        }
    }
    
    return dummy.next;
}

// Conditional swap based on values
function swapPairsConditional(head, condition = (a, b) => a < b) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (prev.next && prev.next.next) {
        const first = prev.next;
        const second = prev.next.next;
        
        if (condition(first.val, second.val)) {
            // Perform swap
            prev.next = second;
            first.next = second.next;
            second.next = first;
            prev = first;
        } else {
            // Skip swap
            prev = prev.next;
        }
    }
    
    return dummy.next;
}

// Swap with position tracking
function swapPairsWithPositions(head) {
    if (!head || !head.next) return head;
    
    const swapInfo = [];
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let position = 0;
    
    while (prev.next && prev.next.next) {
        const first = prev.next;
        const second = prev.next.next;
        
        swapInfo.push({
            positions: [position + 1, position + 2],
            values: [first.val, second.val],
            swapped: true
        });
        
        // Perform swap
        prev.next = second;
        first.next = second.next;
        second.next = first;
        
        prev = first;
        position += 2;
    }
    
    return { result: dummy.next, swapInfo: swapInfo };
}

// ============= HELPER FUNCTIONS =============

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

function getListLength(head) {
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    return length;
}

function countSwaps(originalLength) {
    return Math.floor(originalLength / 2);
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeSwapping(head) {
    console.log("\n=== Visualizing Pair Swapping ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    
    const length = getListLength(head);
    const expectedSwaps = countSwaps(length);
    console.log(`List length: ${length}`);
    console.log(`Expected swaps: ${expectedSwaps}`);
    
    if (!head.next) {
        console.log("Single node - no swapping needed");
        return head;
    }
    
    const swapResult = swapPairsWithSteps(head);
    
    console.log("\nStep-by-step swapping:");
    swapResult.steps.forEach(step => {
        if (step.action === 'identify') {
            console.log(`Step ${step.step}: Identify pair [${step.first}, ${step.second}]`);
            console.log(`         Before: [${step.before.join(', ')}]`);
        } else if (step.action === 'swap') {
            console.log(`         Swap: ${step.swapped}`);
            console.log(`         After: [${step.after.join(', ')}]`);
        }
    });
    
    console.log(`\nFinal result: ${displayList(swapResult.result)}`);
    return swapResult.result;
}

function demonstrateSwapMethods() {
    console.log("\n=== Demonstrating Swap Methods ===");
    
    const testCases = [
        { list: [1, 2, 3, 4], name: "Even length" },
        { list: [1, 2, 3, 4, 5], name: "Odd length" },
        { list: [1, 2], name: "Two nodes" },
        { list: [1], name: "Single node" },
        { list: [], name: "Empty list" },
        { list: [1, 2, 3, 4, 5, 6], name: "Multiple pairs" }
    ];
    
    const methods = [
        { name: "Brute Force (Values)", func: swapPairsBruteForce },
        { name: "Better (3 Pointers)", func: swapPairsBetter },
        { name: "Optimized", func: swapPairsOptimized },
        { name: "Stack", func: swapPairsStack }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: [${testCase.list.join(', ')}]`);
        
        methods.forEach(method => {
            const testList = createListFromArray(testCase.list);
            
            console.time(method.name);
            const result = method.func(testList);
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
        { name: "Brute Force", time: "O(n)", space: "O(1)", notes: "Value swap (violates constraint)" },
        { name: "Better", time: "O(n)", space: "O(1)", notes: "Three pointers" },
        { name: "Optimized", time: "O(n)", space: "O(1)", notes: "Clean iterative" },
        { name: "Stack", time: "O(n)", space: "O(n)", notes: "Extra space for stack" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach    | Time | Space | Notes                      |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(26);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\n🏆 Winner: Optimized (Clean Iterative)");
    console.log("• O(n) time - single pass through list");
    console.log("• O(1) space - only uses a few pointers");
    console.log("• Swaps actual nodes (not values)");
    console.log("• Clean and readable implementation");
    console.log("• Handles all edge cases elegantly");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Swap Nodes in Pairs (Iterative) ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master node pointer manipulation");
    console.log("2. Understand dummy head technique");
    console.log("3. Handle edge cases (odd length, empty)");
    console.log("4. Swap nodes without modifying values");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Use dummy head to simplify edge cases");
    console.log("2. Track previous node to maintain connections");
    console.log("3. Identify first and second nodes in each pair");
    console.log("4. Carefully rewire connections");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. prev -> first -> second -> afterSecond");
    console.log("2. Rewire to: prev -> second -> first -> afterSecond");
    console.log("3. Move prev to first (now second in pair)");
    console.log("4. Continue until no more pairs");
    
    console.log("\n⚡ Swapping Steps:");
    console.log("1. prev.next = second");
    console.log("2. first.next = second.next");
    console.log("3. second.next = first");
    console.log("4. prev = first (for next iteration)");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Always use dummy head for easier handling");
    console.log("2. Check prev.next && prev.next.next for pairs");
    console.log("3. Store references before modifying pointers");
    console.log("4. Update prev pointer after each swap");
    
    console.log("\n🎨 Visual Pattern:");
    console.log("Before: prev -> 1 -> 2 -> 3 -> 4");
    console.log("After:  prev -> 2 -> 1 -> 4 -> 3");
    
    visualizeSwapping(createListFromArray([1, 2, 3, 4, 5, 6]));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Data Reordering:**");
    console.log("   - Rearrange data for better access patterns");
    console.log("   - Optimize cache performance");
    
    console.log("\n2. **Algorithm Design:**");
    console.log("   - Building block for more complex operations");
    console.log("   - Pattern for node manipulation");
    
    console.log("\n3. **Game Development:**");
    console.log("   - Swap player positions");
    console.log("   - Rearrange game elements");
    
    console.log("\n4. **UI/UX:**");
    console.log("   - Reorder list items");
    console.log("   - Swap adjacent elements");
    
    console.log("\n📊 Example Applications:");
    
    // Student pairs for projects
    const students = createListFromArray([1, 2, 3, 4, 5, 6]);
    console.log(`\nStudents: ${displayList(students)}`);
    const pairedStudents = swapPairsOptimized(students);
    console.log(`Paired: ${displayList(pairedStudents)}`);
    
    // Conditional swapping
    const numbers = createListFromArray([5, 2, 8, 1, 9, 3]);
    console.log(`\nNumbers: ${displayList(numbers)}`);
    const conditionalSwap = swapPairsConditional(numbers, (a, b) => a > b);
    console.log(`Swap if first > second: ${displayList(conditionalSwap)}`);
    
    // Group swapping
    const data = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(`\nData: ${displayList(data)}`);
    const groupSwapped = swapNodesInGroups(data, 3);
    console.log(`Swap in groups of 3: ${displayList(groupSwapped)}`);
    
    // Position tracking
    const tracked = createListFromArray([10, 20, 30, 40]);
    console.log(`\nTracked: ${displayList(tracked)}`);
    const positionResult = swapPairsWithPositions(tracked);
    console.log(`Result: ${displayList(positionResult.result)}`);
    console.log(`Swap info:`, positionResult.swapInfo);
}

// ============= TEST CASES =============

function testSwapPairs() {
    console.log("\n=== Testing Swap Nodes in Pairs ===");
    
    const testCases = [
        { input: [1, 2, 3, 4], expected: [2, 1, 4, 3], description: "Even length" },
        { input: [1, 2, 3, 4, 5], expected: [2, 1, 4, 3, 5], description: "Odd length" },
        { input: [1, 2], expected: [2, 1], description: "Two nodes" },
        { input: [1], expected: [1], description: "Single node" },
        { input: [], expected: [], description: "Empty list" },
        { input: [1, 2, 3, 4, 5, 6], expected: [2, 1, 4, 3, 6, 5], description: "Multiple pairs" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = createListFromArray(testCase.input);
        
        console.log(`Input: [${testCase.input.join(', ')}]`);
        
        const result = swapPairsOptimized(list);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
    const largeList = createListFromArray(largeArray);
    
    console.time("Large list swap");
    const result = swapPairsOptimized(largeList);
    console.timeEnd("Large list swap");
    
    const resultLength = getListLength(result);
    const expectedSwaps = countSwaps(1000);
    
    console.log(`Result length: ${resultLength} (expected: 1000)`);
    console.log(`Expected swaps: ${expectedSwaps}`);
    console.log(`Status: ${resultLength === 1000 ? '✅ PASS' : '❌ FAIL'}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 SWAP NODES IN PAIRS (ITERATIVE) - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateSwapMethods();
testSwapPairs();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    swapPairsBruteForce,
    swapPairsBetter,
    swapPairsOptimized,
    swapPairsStack,
    swapNodesInGroups,
    swapPairsConditional,
    displayList,
    createListFromArray,
    visualizeSwapping,
    demonstrateSwapMethods,
    interactiveLearning
};
