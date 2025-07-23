/**
 * Linked List Cycle Detection - Hash Table Approach
 * Bodhi-DSA Course
 * 
 * Problem: Detect if a linked list has a cycle using extra space
 * 
 * A cycle exists if a node can be reached again by continuously following next pointers
 * 
 * Example with cycle:
 * 3 -> 2 -> 0 -> -4
 *      ^          |
 *      |__________|
 * 
 * Example without cycle:
 * 1 -> 2 -> 3 -> 4 -> null
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Set/HashSet) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Store visited nodes in a Set, check for duplicates

function hasCycleBruteForce(head) {
    if (!head || !head.next) return false;
    
    const visited = new Set();
    let current = head;
    
    while (current) {
        // If we've seen this node before, there's a cycle
        if (visited.has(current)) {
            return true;
        }
        
        // Mark current node as visited
        visited.add(current);
        current = current.next;
    }
    
    return false; // Reached null, no cycle
}

// ============= BETTER APPROACH (Map with Additional Info) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use Map to store nodes with additional information

function hasCycleBetter(head) {
    if (!head || !head.next) return false;
    
    const visitedNodes = new Map();
    let current = head;
    let position = 0;
    
    while (current) {
        if (visitedNodes.has(current)) {
            const cycleStart = visitedNodes.get(current);
            console.log(`Cycle detected! Node at position ${cycleStart} revisited at position ${position}`);
            console.log(`Cycle length: ${position - cycleStart}`);
            return true;
        }
        
        visitedNodes.set(current, position);
        current = current.next;
        position++;
    }
    
    return false;
}

// ============= OPTIMIZED APPROACH (WeakSet) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use WeakSet for memory efficiency

function hasCycleOptimized(head) {
    if (!head || !head.next) return false;
    
    const visited = new WeakSet();
    let current = head;
    
    while (current) {
        if (visited.has(current)) {
            return true;
        }
        
        visited.add(current);
        current = current.next;
    }
    
    return false;
}

// ============= NODE MARKING APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Modify nodes temporarily to mark as visited

function hasCycleNodeMarking(head) {
    if (!head || !head.next) return false;
    
    const VISITED_MARKER = Symbol('visited');
    let current = head;
    
    while (current) {
        // If node is already marked, there's a cycle
        if (current[VISITED_MARKER]) {
            // Clean up markers before returning
            cleanupMarkers(head, VISITED_MARKER);
            return true;
        }
        
        // Mark current node as visited
        current[VISITED_MARKER] = true;
        current = current.next;
    }
    
    // Clean up markers
    cleanupMarkers(head, VISITED_MARKER);
    return false;
}

function cleanupMarkers(head, marker) {
    let current = head;
    while (current && current[marker]) {
        delete current[marker];
        current = current.next;
    }
}

// ============= ADVANCED CYCLE DETECTION =============

// Find cycle start node using hash table
function findCycleStart(head) {
    if (!head || !head.next) return null;
    
    const visited = new Map();
    let current = head;
    let position = 0;
    
    while (current) {
        if (visited.has(current)) {
            console.log(`Cycle starts at node with value: ${current.val}`);
            console.log(`Cycle start position: ${visited.get(current)}`);
            return current;
        }
        
        visited.set(current, position);
        current = current.next;
        position++;
    }
    
    return null; // No cycle
}

// Get cycle length using hash table
function getCycleLength(head) {
    if (!head || !head.next) return 0;
    
    const visited = new Map();
    let current = head;
    let position = 0;
    
    while (current) {
        if (visited.has(current)) {
            const cycleLength = position - visited.get(current);
            console.log(`Cycle length: ${cycleLength} nodes`);
            return cycleLength;
        }
        
        visited.set(current, position);
        current = current.next;
        position++;
    }
    
    return 0; // No cycle
}

// Get all nodes in cycle
function getNodesInCycle(head) {
    if (!head || !head.next) return [];
    
    const visited = new Map();
    const allNodes = [];
    let current = head;
    let position = 0;
    
    while (current) {
        if (visited.has(current)) {
            // Found cycle, extract cycle nodes
            const cycleStartPos = visited.get(current);
            const cycleNodes = allNodes.slice(cycleStartPos);
            
            console.log(`Cycle nodes: [${cycleNodes.map(node => node.val).join(', ')}]`);
            return cycleNodes;
        }
        
        visited.set(current, position);
        allNodes.push(current);
        current = current.next;
        position++;
    }
    
    return []; // No cycle
}

// Detect cycle and get comprehensive information
function analyzeCycle(head) {
    if (!head || !head.next) {
        return {
            hasCycle: false,
            cycleStart: null,
            cycleLength: 0,
            cycleNodes: [],
            totalNodes: 0
        };
    }
    
    const visited = new Map();
    const allNodes = [];
    let current = head;
    let position = 0;
    
    while (current) {
        if (visited.has(current)) {
            const cycleStartPos = visited.get(current);
            const cycleNodes = allNodes.slice(cycleStartPos);
            
            return {
                hasCycle: true,
                cycleStart: current,
                cycleLength: position - cycleStartPos,
                cycleNodes: cycleNodes,
                totalNodes: position,
                cycleStartPosition: cycleStartPos
            };
        }
        
        visited.set(current, position);
        allNodes.push(current);
        current = current.next;
        position++;
    }
    
    return {
        hasCycle: false,
        cycleStart: null,
        cycleLength: 0,
        cycleNodes: [],
        totalNodes: position
    };
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
    
    // Create cycle by pointing last node to cycleIndex
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
        values.push("... (cycle or long list)");
    } else {
        values.push("null");
    }
    
    return values.join(' -> ');
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeCycleDetection(head) {
    console.log("\n=== Visualizing Cycle Detection with Hash Table ===");
    
    if (!head) {
        console.log("Empty list");
        return false;
    }
    
    const visited = new Set();
    let current = head;
    let step = 0;
    
    console.log(`Step ${step}: Starting at node [${current.val}]`);
    
    while (current) {
        if (visited.has(current)) {
            console.log(`Step ${step}: 🔄 CYCLE DETECTED! Node [${current.val}] already visited`);
            console.log(`Visited nodes: ${Array.from(visited).map(node => node.val).join(', ')}`);
            return true;
        }
        
        console.log(`Step ${step}: Visiting node [${current.val}] - Adding to visited set`);
        visited.add(current);
        
        current = current.next;
        step++;
        
        if (step > 10) { // Safety limit for visualization
            console.log("... (stopping visualization for safety)");
            break;
        }
    }
    
    if (!current) {
        console.log(`Step ${step}: Reached null - NO CYCLE`);
        console.log(`Total nodes visited: ${visited.size}`);
    }
    
    return false;
}

function demonstrateCycleDetection() {
    console.log("\n=== Demonstrating Cycle Detection Methods ===");
    
    // Test case 1: No cycle
    console.log("\n1. List without cycle:");
    const noCycleList = createListFromArray([1, 2, 3, 4, 5]);
    console.log(`List: ${displayListSafely(noCycleList)}`);
    console.log(`Has cycle: ${hasCycleBruteForce(noCycleList)}`);
    
    // Test case 2: With cycle
    console.log("\n2. List with cycle:");
    const cycleList = createCyclicList([3, 2, 0, -4], 1);
    console.log(`List: 3 -> 2 -> 0 -> -4 -> (back to 2)`);
    console.log(`Has cycle: ${hasCycleBetter(cycleList)}`);
    
    // Test case 3: Self-loop
    console.log("\n3. Self-loop:");
    const selfLoop = new ListNode(1);
    selfLoop.next = selfLoop;
    console.log(`List: 1 -> (back to 1)`);
    console.log(`Has cycle: ${hasCycleBruteForce(selfLoop)}`);
    
    // Test case 4: Two nodes cycle
    console.log("\n4. Two nodes cycle:");
    const twoNodeCycle = createCyclicList([1, 2], 0);
    console.log(`List: 1 -> 2 -> (back to 1)`);
    console.log(`Has cycle: ${hasCycleBruteForce(twoNodeCycle)}`);
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Set/HashSet", time: "O(n)", space: "O(n)", notes: "Standard approach" },
        { name: "Map with info", time: "O(n)", space: "O(n)", notes: "Extra metadata" },
        { name: "WeakSet", time: "O(n)", space: "O(n)", notes: "Memory efficient" },
        { name: "Node marking", time: "O(n)", space: "O(1)", notes: "Modifies original" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach          | Time | Space | Notes                    |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(17);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log("\n📊 Space-Time Trade-offs:");
    console.log("• Hash table methods: Fast detection but use extra space");
    console.log("• Node marking: Space efficient but modifies original list");
    console.log("• WeakSet: Allows garbage collection of unused nodes");
}

function compareApproaches() {
    console.log("\n=== Comparing Hash Table Approaches ===");
    
    const approaches = [
        { name: "Set", func: hasCycleBruteForce },
        { name: "Map", func: hasCycleBetter },
        { name: "WeakSet", func: hasCycleOptimized },
        { name: "Node Marking", func: hasCycleNodeMarking }
    ];
    
    // Test with cycle
    const cycleList = createCyclicList([1, 2, 3, 4, 5], 2);
    console.log("\nTesting with cyclic list:");
    
    approaches.forEach(approach => {
        console.log(`\n${approach.name}:`);
        console.time(approach.name);
        const result = approach.func(cycleList);
        console.timeEnd(approach.name);
        console.log(`Result: ${result}`);
    });
    
    // Test without cycle
    const noCycleList = createListFromArray([1, 2, 3, 4, 5]);
    console.log("\nTesting with non-cyclic list:");
    
    approaches.forEach(approach => {
        console.log(`\n${approach.name}:`);
        console.time(approach.name);
        const result = approach.func(noCycleList);
        console.timeEnd(approach.name);
        console.log(`Result: ${result}`);
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { name: "Empty list", list: null },
        { name: "Single node", list: createListFromArray([1]) },
        { name: "Single node self-loop", list: (() => { const node = new ListNode(1); node.next = node; return node; })() },
        { name: "Two nodes no cycle", list: createListFromArray([1, 2]) },
        { name: "Two nodes with cycle", list: createCyclicList([1, 2], 0) },
        { name: "Long list no cycle", list: createListFromArray(Array.from({length: 100}, (_, i) => i)) },
        { name: "Long list with cycle", list: createCyclicList(Array.from({length: 100}, (_, i) => i), 50) }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        
        if (testCase.list && testCase.name.includes("Long")) {
            console.log("List: [large list - not displayed]");
        } else {
            console.log(`List: ${displayListSafely(testCase.list)}`);
        }
        
        const hasCycle = hasCycleBruteForce(testCase.list);
        console.log(`Has cycle: ${hasCycle}`);
        
        if (hasCycle) {
            const analysis = analyzeCycle(testCase.list);
            console.log(`Cycle length: ${analysis.cycleLength}`);
            console.log(`Cycle start value: ${analysis.cycleStart ? analysis.cycleStart.val : 'N/A'}`);
        }
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Cycle Detection with Hash Table ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Understand hash table approach for cycle detection");
    console.log("2. Learn space-time trade-offs");
    console.log("3. Master different hash table data structures");
    console.log("4. Handle edge cases effectively");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Hash table stores visited nodes");
    console.log("2. Check if current node already exists in hash table");
    console.log("3. If found: cycle detected");
    console.log("4. If not found: add to hash table and continue");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Traverse the list node by node");
    console.log("2. For each node, check if we've seen it before");
    console.log("3. Use hash table for O(1) lookup time");
    console.log("4. First duplicate node indicates cycle start");
    
    console.log("\n⚡ Advantages:");
    console.log("1. Simple and intuitive approach");
    console.log("2. Easy to implement and debug");
    console.log("3. Can provide additional cycle information");
    console.log("4. Works for any cycle configuration");
    
    console.log("\n⚠️ Disadvantages:");
    console.log("1. Requires O(n) extra space");
    console.log("2. Hash table overhead");
    console.log("3. Not suitable for memory-constrained environments");
    
    visualizeCycleDetection(createCyclicList([1, 2, 3, 4], 1));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Memory Leak Detection:**");
    console.log("   - Detect circular references in object graphs");
    console.log("   - Prevent infinite loops in data structures");
    
    console.log("\n2. **Graph Cycle Detection:**");
    console.log("   - Find cycles in directed graphs");
    console.log("   - Dependency resolution systems");
    
    console.log("\n3. **Debugging Infinite Loops:**");
    console.log("   - Detect when traversal gets stuck");
    console.log("   - Validate data structure integrity");
    
    console.log("\n4. **Cache Implementation:**");
    console.log("   - LRU cache with cycle detection");
    console.log("   - Prevent circular cache references");
    
    const exampleCycle = createCyclicList([1, 2, 3, 4], 1);
    const analysis = analyzeCycle(exampleCycle);
    
    console.log("\n📊 Example Analysis:");
    console.log(`Cycle detected: ${analysis.hasCycle}`);
    console.log(`Cycle length: ${analysis.cycleLength}`);
    console.log(`Total nodes traversed: ${analysis.totalNodes}`);
}

// ============= TEST CASES =============

function testCycleDetection() {
    console.log("\n=== Testing Cycle Detection ===");
    
    console.log("\n--- Basic Tests ---");
    
    const testCases = [
        { name: "No cycle", list: createListFromArray([1, 2, 3, 4, 5]), expected: false },
        { name: "Cycle at end", list: createCyclicList([1, 2, 3, 4], 2), expected: true },
        { name: "Cycle at start", list: createCyclicList([1, 2, 3, 4], 0), expected: true },
        { name: "Self loop", list: (() => { const n = new ListNode(1); n.next = n; return n; })(), expected: true },
        { name: "Empty list", list: null, expected: false }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.name}`);
        
        const result = hasCycleBruteForce(testCase.list);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`Status: ${result === testCase.expected ? '✅ PASS' : '❌ FAIL'}`);
        
        if (result && testCase.list) {
            const analysis = analyzeCycle(testCase.list);
            console.log(`  Cycle info: length=${analysis.cycleLength}, start=${analysis.cycleStart?.val}`);
        }
    });
    
    console.log("\n--- Advanced Tests ---");
    
    console.log("\n1. Large cycle:");
    const largeCycle = createCyclicList(Array.from({length: 1000}, (_, i) => i), 500);
    console.time("Large cycle detection");
    const hasLargeCycle = hasCycleBruteForce(largeCycle);
    console.timeEnd("Large cycle detection");
    console.log(`Large cycle detected: ${hasLargeCycle}`);
    
    console.log("\n2. Cycle analysis:");
    const analysisList = createCyclicList([10, 20, 30, 40, 50], 2);
    const fullAnalysis = analyzeCycle(analysisList);
    console.log(`Full analysis:`, fullAnalysis);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 LINKED LIST CYCLE DETECTION - HASH TABLE - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstrateCycleDetection();
practicalApplications();
testCycleDetection();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    hasCycleBruteForce,
    hasCycleBetter,
    hasCycleOptimized,
    hasCycleNodeMarking,
    findCycleStart,
    getCycleLength,
    getNodesInCycle,
    analyzeCycle,
    createListFromArray,
    createCyclicList,
    displayListSafely,
    visualizeCycleDetection,
    demonstrateCycleDetection,
    interactiveLearning
};
