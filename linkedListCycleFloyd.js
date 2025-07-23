/**
 * Linked List Cycle Detection - Floyd's Algorithm (Tortoise and Hare)
 * Bodhi-DSA Course
 * 
 * Problem: Detect if a linked list has a cycle using O(1) space
 * 
 * Floyd's Algorithm uses two pointers moving at different speeds:
 * - Slow pointer (tortoise): moves 1 step at a time
 * - Fast pointer (hare): moves 2 steps at a time
 * 
 * If there's a cycle, the fast pointer will eventually meet the slow pointer
 * 
 * Example with cycle:
 * 3 -> 2 -> 0 -> -4
 *      ^          |
 *      |__________|
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (For Comparison) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Algorithm: For each node, traverse from head to check if we can reach it again

function hasCycleBruteForce(head) {
    if (!head || !head.next) return false;
    
    let current = head;
    
    while (current) {
        let runner = head;
        let steps = 0;
        
        // Try to reach current node again from head
        while (runner && steps < 10000) { // Safety limit
            if (runner === current && steps > 0) {
                return true; // Found cycle
            }
            runner = runner.next;
            steps++;
        }
        
        current = current.next;
    }
    
    return false;
}

// ============= BETTER APPROACH (Single Speed Pointer with Counter) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use a counter to detect if we're traversing too many nodes

function hasCycleBetter(head) {
    if (!head || !head.next) return false;
    
    let current = head;
    let count = 0;
    const maxNodes = 10000; // Reasonable limit
    
    while (current && count < maxNodes) {
        current = current.next;
        count++;
    }
    
    // If we traversed more than expected, likely a cycle
    return current !== null;
}

// ============= OPTIMIZED APPROACH (Floyd's Tortoise and Hare) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Two pointers at different speeds will meet if there's a cycle

function hasCycleOptimized(head) {
    if (!head || !head.next) return false;
    
    let slow = head;      // Tortoise: moves 1 step
    let fast = head;      // Hare: moves 2 steps
    
    while (fast && fast.next) {
        slow = slow.next;           // Move 1 step
        fast = fast.next.next;      // Move 2 steps
        
        if (slow === fast) {
            return true;  // Pointers met, cycle detected
        }
    }
    
    return false; // Fast pointer reached end, no cycle
}

// ============= ADVANCED FLOYD'S ALGORITHM VARIATIONS =============

// Find the start of the cycle using Floyd's algorithm
function findCycleStart(head) {
    if (!head || !head.next) return null;
    
    // Phase 1: Detect if cycle exists
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            break; // Cycle detected
        }
    }
    
    // No cycle found
    if (!fast || !fast.next) return null;
    
    // Phase 2: Find cycle start
    // Move one pointer to head, keep other at meeting point
    // Move both at same speed until they meet
    slow = head;
    
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow; // This is the start of the cycle
}

// Get cycle length using Floyd's algorithm
function getCycleLength(head) {
    if (!head || !head.next) return 0;
    
    // Phase 1: Detect cycle
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            break; // Cycle detected
        }
    }
    
    // No cycle
    if (!fast || !fast.next) return 0;
    
    // Phase 2: Calculate cycle length
    let length = 1;
    fast = fast.next;
    
    while (slow !== fast) {
        fast = fast.next;
        length++;
    }
    
    return length;
}

// Complete cycle analysis using Floyd's algorithm
function analyzeCycleFloyd(head) {
    if (!head || !head.next) {
        return {
            hasCycle: false,
            cycleStart: null,
            cycleLength: 0,
            meetingPoint: null
        };
    }
    
    // Phase 1: Detect cycle and find meeting point
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            break; // Cycle detected
        }
    }
    
    // No cycle
    if (!fast || !fast.next) {
        return {
            hasCycle: false,
            cycleStart: null,
            cycleLength: 0,
            meetingPoint: null
        };
    }
    
    const meetingPoint = slow;
    
    // Phase 2: Find cycle start
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    const cycleStart = slow;
    
    // Phase 3: Calculate cycle length
    let length = 1;
    fast = fast.next;
    while (slow !== fast) {
        fast = fast.next;
        length++;
    }
    
    return {
        hasCycle: true,
        cycleStart: cycleStart,
        cycleLength: length,
        meetingPoint: meetingPoint
    };
}

// ============= MATHEMATICAL PROOF DEMONSTRATION =============

function demonstrateFloydMath(head) {
    console.log("\n=== Mathematical Proof of Floyd's Algorithm ===");
    
    const analysis = analyzeCycleFloyd(head);
    
    if (!analysis.hasCycle) {
        console.log("No cycle to analyze");
        return;
    }
    
    console.log("\n📐 Mathematical Analysis:");
    console.log("Let's say:");
    console.log("- Distance from head to cycle start = m");
    console.log("- Distance from cycle start to meeting point = k");
    console.log("- Cycle length = n");
    
    console.log("\nWhen pointers meet:");
    console.log("- Slow pointer traveled: m + k");
    console.log("- Fast pointer traveled: m + k + n (at least one full cycle more)");
    console.log("- Since fast moves 2x speed: 2(m + k) = m + k + n");
    console.log("- Solving: m + k = n");
    console.log("- Therefore: m = n - k");
    
    console.log("\nThis means:");
    console.log("- Distance from head to cycle start = Distance from meeting point to cycle start");
    console.log("- That's why moving both pointers at same speed finds the cycle start!");
    
    console.log(`\nActual cycle length: ${analysis.cycleLength}`);
    console.log(`Meeting point value: ${analysis.meetingPoint.val}`);
    console.log(`Cycle start value: ${analysis.cycleStart.val}`);
}

// ============= HELPER FUNCTIONS =============

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

function createCyclicList(arr, cycleIndex) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    if (cycleIndex < 0 || cycleIndex >= arr.length) return createListFromArray(arr);
    
    const nodes = [];
    
    // Create all nodes
    for (let i = 0; i < arr.length; i++) {
        nodes.push(new ListNode(arr[i]));
    }
    
    // Link nodes
    for (let i = 0; i < arr.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    
    // Create cycle
    nodes[arr.length - 1].next = nodes[cycleIndex];
    
    return nodes[0];
}

function displayListSafely(head, maxNodes = 20) {
    if (!head) return "Empty list";
    
    const values = [];
    let current = head;
    let count = 0;
    
    while (current && count < maxNodes) {
        values.push(current.val);
        current = current.next;
        count++;
    }
    
    if (current) {
        values.push("... (cycle or continues)");
    } else {
        values.push("null");
    }
    
    return values.join(' -> ');
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeFloydAlgorithm(head) {
    console.log("\n=== Visualizing Floyd's Algorithm ===");
    
    if (!head || !head.next) {
        console.log("List too short for cycle");
        return false;
    }
    
    let slow = head;
    let fast = head;
    let step = 0;
    
    console.log(`Step ${step}: slow=[${slow.val}], fast=[${fast.val}]`);
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        step++;
        
        console.log(`Step ${step}: slow=[${slow.val}], fast=[${fast ? fast.val : 'null'}]`);
        
        if (slow === fast) {
            console.log(`🎯 MEETING POINT FOUND at step ${step}!`);
            console.log(`Both pointers at node with value: ${slow.val}`);
            return true;
        }
        
        if (step > 10) { // Safety limit for visualization
            console.log("... (limiting visualization steps)");
            break;
        }
    }
    
    if (!fast || !fast.next) {
        console.log("🚫 NO CYCLE: Fast pointer reached end");
    }
    
    return false;
}

function visualizeCycleStartFinding(head) {
    console.log("\n=== Visualizing Cycle Start Finding ===");
    
    // First detect cycle
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            console.log(`Meeting point found at: [${slow.val}]`);
            break;
        }
    }
    
    if (!fast || !fast.next) {
        console.log("No cycle to find start for");
        return null;
    }
    
    // Now find cycle start
    console.log("\nPhase 2: Finding cycle start");
    slow = head;
    let step = 0;
    
    console.log(`Step ${step}: head_pointer=[${slow.val}], meeting_pointer=[${fast.val}]`);
    
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
        step++;
        console.log(`Step ${step}: head_pointer=[${slow.val}], meeting_pointer=[${fast.val}]`);
    }
    
    console.log(`🎯 CYCLE START FOUND: [${slow.val}]`);
    return slow;
}

function demonstrateFloydSteps() {
    console.log("\n=== Step-by-Step Floyd's Algorithm ===");
    
    // Create a list with cycle: 1->2->3->4->5->3 (cycle back to 3)
    const cycleList = createCyclicList([1, 2, 3, 4, 5], 2);
    console.log("List: 1 -> 2 -> 3 -> 4 -> 5 -> (back to 3)");
    
    console.log("\n🐢 Phase 1: Cycle Detection");
    const hasCycle = visualizeFloydAlgorithm(cycleList);
    
    if (hasCycle) {
        console.log("\n🎯 Phase 2: Finding Cycle Start");
        visualizeCycleStartFinding(cycleList);
        
        console.log("\n📏 Phase 3: Mathematical Analysis");
        demonstrateFloydMath(cycleList);
    }
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n²)", space: "O(1)", notes: "Nested loops, inefficient" },
        { name: "Counter Method", time: "O(n)", space: "O(1)", notes: "Simple but unreliable" },
        { name: "Floyd's Algorithm", time: "O(n)", space: "O(1)", notes: "Optimal solution" },
        { name: "Hash Table", time: "O(n)", space: "O(n)", notes: "Fast but uses extra space" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach          | Time  | Space | Notes                    |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(17);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\n🏆 Floyd's Algorithm Advantages:");
    console.log("• O(1) space complexity - no extra memory needed");
    console.log("• O(n) time complexity - linear time");
    console.log("• Elegant mathematical foundation");
    console.log("• Can find cycle start and length");
    console.log("• Works for any cycle configuration");
}

function compareWithHashTable() {
    console.log("\n=== Floyd's vs Hash Table Comparison ===");
    
    const testSizes = [100, 1000, 10000];
    
    testSizes.forEach(size => {
        console.log(`\nTesting with list size: ${size}`);
        
        // Create large cyclic list
        const largeCycle = createCyclicList(
            Array.from({length: size}, (_, i) => i), 
            Math.floor(size / 2)
        );
        
        console.log("Floyd's Algorithm:");
        console.time(`Floyd-${size}`);
        const floydResult = hasCycleOptimized(largeCycle);
        console.timeEnd(`Floyd-${size}`);
        console.log(`Result: ${floydResult}`);
        
        // Note: We can't easily test hash table here without importing it
        // but we can show the concept
        console.log(`Hash Table would use ~${size * 8} bytes extra memory`);
        console.log(`Floyd's uses constant extra memory`);
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { 
            name: "Empty list", 
            list: null,
            expected: false
        },
        { 
            name: "Single node", 
            list: createListFromArray([1]),
            expected: false
        },
        { 
            name: "Single node self-loop", 
            list: (() => { const node = new ListNode(1); node.next = node; return node; })(),
            expected: true
        },
        { 
            name: "Two nodes no cycle", 
            list: createListFromArray([1, 2]),
            expected: false
        },
        { 
            name: "Two nodes with cycle", 
            list: createCyclicList([1, 2], 0),
            expected: true
        },
        { 
            name: "Large cycle", 
            list: createCyclicList(Array.from({length: 1000}, (_, i) => i), 500),
            expected: true
        }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        
        if (testCase.name.includes("Large")) {
            console.log("List: [large list - not displayed]");
        } else {
            console.log(`List: ${displayListSafely(testCase.list)}`);
        }
        
        console.time(testCase.name);
        const result = hasCycleOptimized(testCase.list);
        console.timeEnd(testCase.name);
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`Status: ${result === testCase.expected ? '✅ PASS' : '❌ FAIL'}`);
        
        if (result && testCase.list) {
            const analysis = analyzeCycleFloyd(testCase.list);
            console.log(`  Cycle length: ${analysis.cycleLength}`);
            console.log(`  Cycle start value: ${analysis.cycleStart?.val}`);
        }
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Floyd's Cycle Detection ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master the two-pointer technique");
    console.log("2. Understand why different speeds detect cycles");
    console.log("3. Learn the mathematical proof");
    console.log("4. Apply Floyd's algorithm variations");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Two pointers: slow (1 step) and fast (2 steps)");
    console.log("2. If cycle exists, fast will eventually catch slow");
    console.log("3. Meeting point has special mathematical properties");
    console.log("4. Can find cycle start using the meeting point");
    
    console.log("\n🧠 Intuition - Why It Works:");
    console.log("1. Think of a circular race track");
    console.log("2. Fast runner (2x speed) vs slow runner (1x speed)");
    console.log("3. Fast runner will lap the slow runner in a cycle");
    console.log("4. In linear track, fast runner reaches end first");
    
    console.log("\n🔬 Mathematical Beauty:");
    console.log("1. Distance relationships create elegant solution");
    console.log("2. Meeting point is exactly where it needs to be");
    console.log("3. Same algorithm finds cycle start and length");
    console.log("4. No extra space needed - pure algorithmic elegance");
    
    console.log("\n⚡ Practical Advantages:");
    console.log("1. O(1) space - memory efficient");
    console.log("2. O(n) time - optimal performance");
    console.log("3. Simple implementation");
    console.log("4. Multiple use cases (detection, start, length)");
    
    demonstrateFloydSteps();
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Memory-Constrained Systems:**");
    console.log("   - Embedded systems with limited RAM");
    console.log("   - Mobile applications");
    console.log("   - IoT devices");
    
    console.log("\n2. **Large Data Structures:**");
    console.log("   - When hash table overhead is significant");
    console.log("   - Processing massive linked structures");
    
    console.log("\n3. **Real-time Systems:**");
    console.log("   - Predictable memory usage");
    console.log("   - No dynamic memory allocation");
    
    console.log("\n4. **Algorithm Interviews:**");
    console.log("   - Classic two-pointer technique");
    console.log("   - Demonstrates mathematical thinking");
    
    console.log("\n5. **Functional Programming:**");
    console.log("   - No side effects (doesn't modify list)");
    console.log("   - Pure algorithmic approach");
    
    const example = createCyclicList([1, 2, 3, 4, 5], 2);
    const analysis = analyzeCycleFloyd(example);
    
    console.log("\n📊 Example Analysis:");
    console.log(`Input: 1->2->3->4->5->(back to 3)`);
    console.log(`Cycle detected: ${analysis.hasCycle}`);
    console.log(`Cycle length: ${analysis.cycleLength}`);
    console.log(`Cycle start: ${analysis.cycleStart?.val}`);
    console.log(`Meeting point: ${analysis.meetingPoint?.val}`);
}

// ============= TEST CASES =============

function testFloydAlgorithm() {
    console.log("\n=== Testing Floyd's Algorithm ===");
    
    console.log("\n--- Basic Detection Tests ---");
    
    const basicTests = [
        { name: "No cycle", list: createListFromArray([1, 2, 3, 4, 5]), expected: false },
        { name: "Cycle at end", list: createCyclicList([1, 2, 3, 4], 2), expected: true },
        { name: "Cycle at start", list: createCyclicList([1, 2, 3, 4], 0), expected: true },
        { name: "Self loop", list: (() => { const n = new ListNode(1); n.next = n; return n; })(), expected: true }
    ];
    
    basicTests.forEach((test, index) => {
        console.log(`\nTest ${index + 1}: ${test.name}`);
        
        const result = hasCycleOptimized(test.list);
        console.log(`Expected: ${test.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`Status: ${result === test.expected ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Advanced Analysis Tests ---");
    
    console.log("\n1. Cycle start detection:");
    const cycleList = createCyclicList([10, 20, 30, 40, 50], 2);
    console.log("List: 10->20->30->40->50->(back to 30)");
    const cycleStart = findCycleStart(cycleList);
    console.log(`Cycle start: ${cycleStart ? cycleStart.val : 'null'}`);
    console.log(`Expected: 30, Actual: ${cycleStart?.val}, Status: ${cycleStart?.val === 30 ? '✅ PASS' : '❌ FAIL'}`);
    
    console.log("\n2. Cycle length calculation:");
    const cycleLength = getCycleLength(cycleList);
    console.log(`Cycle length: ${cycleLength}`);
    console.log(`Expected: 3, Actual: ${cycleLength}, Status: ${cycleLength === 3 ? '✅ PASS' : '❌ FAIL'}`);
    
    console.log("\n3. Complete analysis:");
    const fullAnalysis = analyzeCycleFloyd(cycleList);
    console.log("Full analysis:", {
        hasCycle: fullAnalysis.hasCycle,
        cycleLength: fullAnalysis.cycleLength,
        cycleStartValue: fullAnalysis.cycleStart?.val,
        meetingPointValue: fullAnalysis.meetingPoint?.val
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 FLOYD'S CYCLE DETECTION ALGORITHM - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
compareWithHashTable();
testEdgeCases();
demonstrateFloydSteps();
practicalApplications();
testFloydAlgorithm();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    hasCycleBruteForce,
    hasCycleBetter,
    hasCycleOptimized,
    findCycleStart,
    getCycleLength,
    analyzeCycleFloyd,
    createListFromArray,
    createCyclicList,
    displayListSafely,
    visualizeFloydAlgorithm,
    demonstrateFloydSteps,
    interactiveLearning
};
