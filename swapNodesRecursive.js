/**
 * Swap Nodes in Pairs - Recursive Approach
 * Bodhi-DSA Course
 * 
 * Problem: Swap every two adjacent nodes in a linked list using recursion.
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

// ============= BASIC RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Recursively swap pairs from head

function swapPairsRecursive(head) {
    // Base case: less than 2 nodes
    if (!head || !head.next) {
        return head;
    }
    
    // Store the second node
    const second = head.next;
    
    // Recursively swap the rest of the list
    head.next = swapPairsRecursive(second.next);
    
    // Swap current pair
    second.next = head;
    
    // Return new head of current pair
    return second;
}

// ============= OPTIMIZED RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: More explicit recursive solution

function swapPairsRecursiveOptimized(head) {
    // Base cases
    if (!head) return null;
    if (!head.next) return head;
    
    // Identify the pair
    const first = head;
    const second = head.next;
    const rest = second.next;
    
    // Recursively process the rest
    const swappedRest = swapPairsRecursiveOptimized(rest);
    
    // Swap current pair
    second.next = first;
    first.next = swappedRest;
    
    // Return new head (second node)
    return second;
}

// ============= TAIL RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Tail recursion with accumulator

function swapPairsTailRecursive(head) {
    return swapPairsHelper(head, null);
}

function swapPairsHelper(head, result) {
    // Base case: no more pairs to process
    if (!head || !head.next) {
        // Append remaining single node if exists
        if (head && result) {
            let tail = result;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = head;
        }
        return result || head;
    }
    
    // Extract current pair
    const first = head;
    const second = head.next;
    const rest = second.next;
    
    // Swap current pair
    second.next = first;
    first.next = null;
    
    // Append to result
    if (!result) {
        result = second;
    } else {
        let tail = result;
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = second;
    }
    
    // Recursively process rest
    return swapPairsHelper(rest, result);
}

// ============= RECURSIVE WITH DEPTH TRACKING =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Track recursion depth for analysis

function swapPairsRecursiveWithDepth(head, depth = 0) {
    // Base case
    if (!head || !head.next) {
        console.log(`  ${'  '.repeat(depth)}Base case reached at depth ${depth}`);
        return head;
    }
    
    console.log(`  ${'  '.repeat(depth)}Depth ${depth}: Swapping [${head.val}, ${head.next.val}]`);
    
    const second = head.next;
    
    // Recursive call
    head.next = swapPairsRecursiveWithDepth(second.next, depth + 1);
    
    // Swap
    second.next = head;
    
    console.log(`  ${'  '.repeat(depth)}Depth ${depth}: Returning ${second.val} as new head`);
    
    return second;
}

// ============= ADVANCED RECURSIVE VARIATIONS =============

// Recursive swap with step counting
function swapPairsRecursiveWithSteps(head, steps = []) {
    if (!head || !head.next) {
        return { result: head, steps: steps };
    }
    
    const stepNum = steps.length + 1;
    const first = head;
    const second = head.next;
    
    steps.push({
        step: stepNum,
        action: 'identify',
        pair: [first.val, second.val],
        remaining: listToArray(second.next)
    });
    
    // Recursive call
    const recursiveResult = swapPairsRecursiveWithSteps(second.next, steps);
    
    // Perform swap
    first.next = recursiveResult.result;
    second.next = first;
    
    steps.push({
        step: stepNum,
        action: 'swap',
        swapped: `${first.val} <-> ${second.val}`,
        newHead: second.val
    });
    
    return { result: second, steps: steps };
}

// Recursive swap with custom condition
function swapPairsRecursiveConditional(head, condition = () => true) {
    if (!head || !head.next) {
        return head;
    }
    
    const first = head;
    const second = head.next;
    
    // Check condition
    if (condition(first.val, second.val)) {
        // Swap this pair
        head.next = swapPairsRecursiveConditional(second.next, condition);
        second.next = head;
        return second;
    } else {
        // Don't swap, but continue recursion
        head.next = swapPairsRecursiveConditional(head.next, condition);
        return head;
    }
}

// Recursive swap in groups
function swapInGroupsRecursive(head, k) {
    if (!head || k <= 1) return head;
    
    // Check if we have k nodes
    let current = head;
    let count = 0;
    
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    if (count === k) {
        // Reverse k nodes
        current = swapInGroupsRecursive(current, k);
        
        // Reverse current k-group
        while (count > 0) {
            const next = head.next;
            head.next = current;
            current = head;
            head = next;
            count--;
        }
        
        head = current;
    }
    
    return head;
}

// Mutual recursion approach
function swapPairsOddEven(head) {
    if (!head) return null;
    
    if (!head.next) {
        // Odd positioned node
        return head;
    } else {
        // Even positioned node - swap with previous
        const next = head.next;
        head.next = swapPairsOddEven(next.next);
        next.next = head;
        return next;
    }
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

function getRecursionDepth(head) {
    if (!head || !head.next) return 0;
    return 1 + getRecursionDepth(head.next.next);
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRecursiveSwapping(head) {
    console.log("\n=== Visualizing Recursive Swapping ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    
    const length = getListLength(head);
    const maxDepth = getRecursionDepth(head);
    
    console.log(`List length: ${length}`);
    console.log(`Expected recursion depth: ${maxDepth}`);
    
    if (!head.next) {
        console.log("Single node - no swapping needed");
        return head;
    }
    
    console.log("\nRecursive call trace:");
    const result = swapPairsRecursiveWithDepth(head);
    
    console.log(`\nFinal result: ${displayList(result)}`);
    return result;
}

function demonstrateRecursiveMethods() {
    console.log("\n=== Demonstrating Recursive Methods ===");
    
    const testCases = [
        { list: [1, 2, 3, 4], name: "Even length" },
        { list: [1, 2, 3, 4, 5], name: "Odd length" },
        { list: [1, 2], name: "Two nodes" },
        { list: [1], name: "Single node" },
        { list: [], name: "Empty list" },
        { list: [1, 2, 3, 4, 5, 6], name: "Multiple pairs" }
    ];
    
    const methods = [
        { name: "Basic Recursive", func: swapPairsRecursive },
        { name: "Optimized Recursive", func: swapPairsRecursiveOptimized },
        { name: "Tail Recursive", func: swapPairsTailRecursive },
        { name: "Odd-Even Recursive", func: swapPairsOddEven }
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
        { name: "Basic Recursive", time: "O(n)", space: "O(n)", notes: "Simple recursion" },
        { name: "Optimized Recursive", time: "O(n)", space: "O(n)", notes: "Explicit steps" },
        { name: "Tail Recursive", time: "O(n)", space: "O(n)", notes: "Accumulator pattern" },
        { name: "With Depth Tracking", time: "O(n)", space: "O(n)", notes: "Debug version" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach           | Time | Space | Notes              |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(18);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\n🏆 Winner: Basic Recursive");
    console.log("• O(n) time - visits each node once");
    console.log("• O(n) space - recursion stack depth");
    console.log("• Elegant and intuitive solution");
    console.log("• Natural divide-and-conquer approach");
    console.log("• Easy to understand and implement");
    
    console.log("\n⚠️  Space Complexity Note:");
    console.log("• All recursive approaches use O(n) space");
    console.log("• Stack depth = number of pairs = n/2");
    console.log("• For large lists, iterative approach is better");
    console.log("• Recursive approach is more educational");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Swap Nodes in Pairs (Recursive) ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master recursive thinking for linked lists");
    console.log("2. Understand base cases and recursive cases");
    console.log("3. Learn to build solutions bottom-up");
    console.log("4. Compare recursive vs iterative approaches");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Base case: 0 or 1 nodes remaining");
    console.log("2. Recursive case: swap current pair + recurse on rest");
    console.log("3. Trust the recursion to handle subproblems");
    console.log("4. Build solution by combining results");
    
    console.log("\n🧠 Recursive Intuition:");
    console.log("1. If < 2 nodes: return as is (base case)");
    console.log("2. Take first two nodes (current pair)");
    console.log("3. Recursively swap the rest of the list");
    console.log("4. Swap current pair and connect to swapped rest");
    
    console.log("\n⚡ Algorithm Steps:");
    console.log("1. Check base case: !head || !head.next");
    console.log("2. Store second = head.next");
    console.log("3. Recursively swap: head.next = swapPairs(second.next)");
    console.log("4. Swap current pair: second.next = head");
    console.log("5. Return second (new head of current pair)");
    
    console.log("\n🔧 Recursive Thinking:");
    console.log("• Don't think about the entire problem");
    console.log("• Focus on: current pair + already solved rest");
    console.log("• Trust recursion to solve subproblems");
    console.log("• Combine current solution with recursive result");
    
    console.log("\n🎨 Visual Recursion:");
    console.log("Original: 1 -> 2 -> 3 -> 4");
    console.log("Step 1:   1 -> 2 -> [swap(3->4)]");
    console.log("Step 2:   1 -> 2 -> [4->3]");
    console.log("Step 3:   [swap(1->2)] -> 4 -> 3");
    console.log("Result:   2 -> 1 -> 4 -> 3");
    
    visualizeRecursiveSwapping(createListFromArray([1, 2, 3, 4, 5, 6]));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Educational Value:**");
    console.log("   - Teaches recursive thinking");
    console.log("   - Demonstrates divide-and-conquer");
    
    console.log("\n2. **Algorithm Design:**");
    console.log("   - Building block for complex recursions");
    console.log("   - Pattern for tree/graph algorithms");
    
    console.log("\n3. **Functional Programming:**");
    console.log("   - Natural fit for functional languages");
    console.log("   - Immutable data structure operations");
    
    console.log("\n4. **Problem Solving:**");
    console.log("   - Template for similar problems");
    console.log("   - Recursive pattern recognition");
    
    console.log("\n📊 Example Applications:");
    
    // Basic recursive swap
    const basic = createListFromArray([1, 2, 3, 4, 5, 6]);
    console.log(`\nBasic: ${displayList(basic)}`);
    const basicResult = swapPairsRecursive(basic);
    console.log(`Swapped: ${displayList(basicResult)}`);
    
    // Conditional recursive swap
    const conditional = createListFromArray([5, 2, 8, 1, 9, 3]);
    console.log(`\nConditional: ${displayList(conditional)}`);
    const condResult = swapPairsRecursiveConditional(conditional, (a, b) => a > b);
    console.log(`Swap if first > second: ${displayList(condResult)}`);
    
    // Step tracking
    const stepTracking = createListFromArray([1, 2, 3, 4]);
    console.log(`\nStep tracking: ${displayList(stepTracking)}`);
    const stepResult = swapPairsRecursiveWithSteps(stepTracking);
    console.log(`Result: ${displayList(stepResult.result)}`);
    console.log(`Steps taken: ${stepResult.steps.length}`);
    
    // Recursion depth analysis
    const depths = [2, 4, 6, 8, 10];
    console.log(`\nRecursion depth analysis:`);
    depths.forEach(size => {
        const testList = createListFromArray(Array.from({ length: size }, (_, i) => i + 1));
        const depth = getRecursionDepth(testList);
        console.log(`  Size ${size}: Depth ${depth}`);
    });
}

// ============= COMPARISON WITH ITERATIVE =============

function compareWithIterative() {
    console.log("\n=== Recursive vs Iterative Comparison ===");
    
    console.log("\n📊 Comparison Table:");
    console.log("=" .repeat(80));
    console.log("| Aspect           | Recursive      | Iterative      |");
    console.log("=" .repeat(80));
    console.log("| Time Complexity  | O(n)          | O(n)          |");
    console.log("| Space Complexity | O(n)          | O(1)          |");
    console.log("| Readability      | High          | Medium        |");
    console.log("| Memory Usage     | High          | Low           |");
    console.log("| Stack Overflow   | Possible      | No            |");
    console.log("| Educational      | Excellent     | Good          |");
    console.log("| Production Use   | Limited       | Preferred     |");
    console.log("=" .repeat(80));
    
    console.log("\n✅ When to Use Recursive:");
    console.log("• Learning recursion concepts");
    console.log("• Small to medium sized lists");
    console.log("• When code clarity is priority");
    console.log("• In functional programming contexts");
    
    console.log("\n✅ When to Use Iterative:");
    console.log("• Large lists (avoid stack overflow)");
    console.log("• Memory-constrained environments");
    console.log("• Production systems");
    console.log("• Performance-critical applications");
}

// ============= TEST CASES =============

function testRecursiveSwapPairs() {
    console.log("\n=== Testing Recursive Swap Pairs ===");
    
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
        
        const result = swapPairsRecursive(list);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Stack depth test
    console.log("\n--- Stack Depth Test ---");
    const sizes = [10, 50, 100];
    
    sizes.forEach(size => {
        const testList = createListFromArray(Array.from({ length: size }, (_, i) => i + 1));
        const expectedDepth = Math.floor(size / 2);
        
        console.log(`\nSize ${size}:`);
        console.log(`Expected recursion depth: ${expectedDepth}`);
        
        try {
            console.time(`Recursive swap - size ${size}`);
            const result = swapPairsRecursive(testList);
            console.timeEnd(`Recursive swap - size ${size}`);
            
            const resultLength = getListLength(result);
            console.log(`Result length: ${resultLength} ✅`);
        } catch (error) {
            console.log(`Stack overflow at size ${size} ❌`);
        }
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 SWAP NODES IN PAIRS (RECURSIVE) - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
demonstrateRecursiveMethods();
compareWithIterative();
testRecursiveSwapPairs();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    swapPairsRecursive,
    swapPairsRecursiveOptimized,
    swapPairsTailRecursive,
    swapPairsRecursiveConditional,
    swapInGroupsRecursive,
    displayList,
    createListFromArray,
    visualizeRecursiveSwapping,
    demonstrateRecursiveMethods,
    interactiveLearning
};
