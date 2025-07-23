/**
 * Rotate List
 * Bodhi-DSA Course
 * 
 * Problem: Rotate the list to the right by k places.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 * 
 * Input: head = [0,1,2], k = 4
 * Output: [2,0,1]
 * 
 * Input: head = [1], k = 1
 * Output: [1]
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Array Rotation) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Convert to array, rotate, convert back

function rotateRightBruteForce(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Convert to array
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    const n = values.length;
    k = k % n; // Handle k > n
    
    if (k === 0) return head;
    
    // Rotate array
    const rotated = [...values.slice(-k), ...values.slice(0, -k)];
    
    // Convert back to linked list
    const newHead = new ListNode(rotated[0]);
    current = newHead;
    
    for (let i = 1; i < rotated.length; i++) {
        current.next = new ListNode(rotated[i]);
        current = current.next;
    }
    
    return newHead;
}

// ============= BETTER APPROACH (Find Break Point) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Find new tail and head, break and reconnect

function rotateRightBetter(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Find length and tail
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Optimize k
    k = k % length;
    if (k === 0) return head;
    
    // Find new tail (length - k - 1 steps from head)
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next;
    }
    
    // New head is next of new tail
    const newHead = newTail.next;
    
    // Break the connection
    newTail.next = null;
    
    // Connect old tail to old head
    tail.next = head;
    
    return newHead;
}

// ============= OPTIMIZED APPROACH (Circular List) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Make circular, find break point, break circle

function rotateRightOptimized(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Find length and make circular
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Make circular
    tail.next = head;
    
    // Find new tail position
    k = k % length;
    const stepsToNewTail = length - k;
    
    let newTail = head;
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }
    
    // New head is next of new tail
    const newHead = newTail.next;
    
    // Break the circle
    newTail.next = null;
    
    return newHead;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Recursively find rotation point

function rotateRightRecursive(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    const length = getLength(head);
    k = k % length;
    
    if (k === 0) return head;
    
    return rotateHelper(head, length - k);
}

function rotateHelper(head, steps) {
    if (steps === 1) {
        const newHead = head.next;
        head.next = null;
        
        // Find tail of new head and connect to old head
        let tail = newHead;
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = head;
        
        return newHead;
    }
    
    const result = rotateHelper(head.next, steps - 1);
    
    // Find tail and connect current head
    let tail = result;
    while (tail.next) {
        tail = tail.next;
    }
    
    return result;
}

function getLength(head) {
    let length = 0;
    while (head) {
        length++;
        head = head.next;
    }
    return length;
}

// ============= ADVANCED VARIATIONS =============

// Rotate left by k positions
function rotateLeftOptimized(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    k = k % length;
    if (k === 0) return head;
    
    // For left rotation, we need to find the kth node
    let newTail = head;
    for (let i = 1; i < k; i++) {
        newTail = newTail.next;
    }
    
    const newHead = newTail.next;
    newTail.next = null;
    tail.next = head;
    
    return newHead;
}

// Rotate by k with step tracking
function rotateRightWithSteps(head, k) {
    if (!head || !head.next || k === 0) return { result: head, steps: [] };
    
    const steps = [];
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    steps.push({ action: 'measure', length: length });
    
    k = k % length;
    steps.push({ action: 'optimize_k', original_k: k, optimized_k: k });
    
    if (k === 0) return { result: head, steps: steps };
    
    tail.next = head;
    steps.push({ action: 'make_circular', message: 'Connected tail to head' });
    
    const stepsToNewTail = length - k;
    let newTail = head;
    
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }
    
    steps.push({ action: 'find_new_tail', position: stepsToNewTail });
    
    const newHead = newTail.next;
    newTail.next = null;
    
    steps.push({ action: 'break_circle', new_head_value: newHead.val });
    
    return { result: newHead, steps: steps };
}

// Rotate in groups of size g
function rotateInGroups(head, k, groupSize) {
    if (!head || groupSize <= 0) return head;
    
    let current = head;
    let prevGroupTail = null;
    let newHead = null;
    
    while (current) {
        // Extract group
        let groupHead = current;
        let groupTail = current;
        let count = 1;
        
        while (count < groupSize && groupTail.next) {
            groupTail = groupTail.next;
            count++;
        }
        
        const nextGroupHead = groupTail.next;
        groupTail.next = null; // Disconnect group
        
        // Rotate this group
        const rotatedGroup = rotateRightOptimized(groupHead, k);
        
        // Find new tail of rotated group
        let rotatedTail = rotatedGroup;
        while (rotatedTail.next) {
            rotatedTail = rotatedTail.next;
        }
        
        // Connect to previous group
        if (prevGroupTail) {
            prevGroupTail.next = rotatedGroup;
        } else {
            newHead = rotatedGroup;
        }
        
        prevGroupTail = rotatedTail;
        current = nextGroupHead;
    }
    
    return newHead;
}

// Reverse rotate (rotate left)
function reverseRotate(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Convert right rotation to left rotation
    k = k % length;
    const leftRotation = (length - k) % length;
    
    return rotateLeftOptimized(head, leftRotation);
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

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRotation(head, k) {
    console.log("\n=== Visualizing List Rotation ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    console.log(`Rotate right by: ${k} positions`);
    
    const length = getListLength(head);
    console.log(`List length: ${length}`);
    
    const optimizedK = k % length;
    console.log(`Optimized k: ${optimizedK} (k % length)`);
    
    if (optimizedK === 0) {
        console.log("No rotation needed (k is multiple of length)");
        return head;
    }
    
    console.log(`\nBreak point: ${length - optimizedK} positions from start`);
    console.log(`New tail will be at position: ${length - optimizedK}`);
    console.log(`New head will be at position: ${length - optimizedK + 1}`);
    
    const result = rotateRightOptimized(head, k);
    console.log(`\nResult: ${displayList(result)}`);
    
    return result;
}

function demonstrateRotationMethods() {
    console.log("\n=== Demonstrating Rotation Methods ===");
    
    const testCases = [
        { list: [1, 2, 3, 4, 5], k: 2, name: "Standard case" },
        { list: [0, 1, 2], k: 4, name: "k > length" },
        { list: [1], k: 1, name: "Single node" },
        { list: [1, 2], k: 1, name: "Two nodes" },
        { list: [1, 2, 3, 4, 5], k: 0, name: "No rotation" },
        { list: [1, 2, 3, 4, 5], k: 5, name: "Full rotation" }
    ];
    
    const methods = [
        { name: "Brute Force", func: rotateRightBruteForce },
        { name: "Better", func: rotateRightBetter },
        { name: "Optimized", func: rotateRightOptimized },
        { name: "Recursive", func: rotateRightRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`List: [${testCase.list.join(', ')}], k = ${testCase.k}`);
        
        methods.forEach(method => {
            const testList = createListFromArray(testCase.list);
            
            console.time(method.name);
            const result = method.func(testList, testCase.k);
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
        { name: "Brute Force", time: "O(n)", space: "O(n)", notes: "Array conversion" },
        { name: "Better", time: "O(n)", space: "O(1)", notes: "Two passes" },
        { name: "Optimized", time: "O(n)", space: "O(1)", notes: "Single pass" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Call stack" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Approach    | Time | Space | Notes           |");
    console.log("=".repeat(80));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(15);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log("\n🏆 Winner: Optimized (Circular List)");
    console.log("• O(n) time - single pass");
    console.log("• O(1) space - in-place rotation");
    console.log("• Elegant circular list technique");
    console.log("• Handles all edge cases efficiently");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Rotate List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master circular list manipulation");
    console.log("2. Understand modular arithmetic optimization");
    console.log("3. Handle edge cases (k > length)");
    console.log("4. Optimize to O(1) space complexity");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Right rotation by k = left rotation by (n-k)");
    console.log("2. k % n optimizes large k values");
    console.log("3. Circular list simplifies reconnection");
    console.log("4. Find new tail at position (n-k)");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Make list circular (tail.next = head)");
    console.log("2. Find new tail at (length - k) steps");
    console.log("3. New head = newTail.next");
    console.log("4. Break circle: newTail.next = null");
    
    console.log("\n⚡ Why This Works:");
    console.log("1. Circular list preserves all connections");
    console.log("2. Single break point creates rotation");
    console.log("3. No need to traverse multiple times");
    console.log("4. Handles all cases uniformly");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Always check k % length first");
    console.log("2. Handle edge cases: empty, single node");
    console.log("3. Make circular before finding break point");
    console.log("4. Don't forget to break the circle");
    
    visualizeRotation(createListFromArray([1, 2, 3, 4, 5]), 2);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Circular Buffers:**");
    console.log("   - Rotate data in circular queues");
    console.log("   - Shift operations in ring buffers");
    
    console.log("\n2. **Game Development:**");
    console.log("   - Rotate player positions");
    console.log("   - Circular turn management");
    
    console.log("\n3. **Data Processing:**");
    console.log("   - Shift time series data");
    console.log("   - Rotate data windows");
    
    console.log("\n4. **UI/Animation:**");
    console.log("   - Carousel rotations");
    console.log("   - Circular menu navigation");
    
    console.log("\n📊 Example Applications:");
    
    // Player rotation in game
    const players = createListFromArray([1, 2, 3, 4, 5]);
    console.log(`\nPlayers: ${displayList(players)}`);
    const rotatedPlayers = rotateRightOptimized(players, 2);
    console.log(`After 2 rotations: ${displayList(rotatedPlayers)}`);
    
    // Left rotation example
    const data = createListFromArray([10, 20, 30, 40, 50]);
    console.log(`\nData: ${displayList(data)}`);
    const leftRotated = rotateLeftOptimized(data, 2);
    console.log(`Left rotate by 2: ${displayList(leftRotated)}`);
    
    // Group rotation
    const groupData = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(`\nGroup data: ${displayList(groupData)}`);
    const groupRotated = rotateInGroups(groupData, 1, 3);
    console.log(`Rotate groups of 3 by 1: ${displayList(groupRotated)}`);
}

// ============= TEST CASES =============

function testRotateList() {
    console.log("\n=== Testing Rotate List ===");
    
    const testCases = [
        { list: [1, 2, 3, 4, 5], k: 2, expected: [4, 5, 1, 2, 3], description: "Standard case" },
        { list: [0, 1, 2], k: 4, expected: [2, 0, 1], description: "k > length" },
        { list: [1], k: 1, expected: [1], description: "Single node" },
        { list: [1, 2], k: 1, expected: [2, 1], description: "Two nodes" },
        { list: [1, 2, 3, 4, 5], k: 0, expected: [1, 2, 3, 4, 5], description: "No rotation" },
        { list: [1, 2, 3, 4, 5], k: 5, expected: [1, 2, 3, 4, 5], description: "Full rotation" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = createListFromArray(testCase.list);
        
        console.log(`Input: [${testCase.list.join(', ')}], k = ${testCase.k}`);
        
        const result = rotateRightOptimized(list, testCase.k);
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
    
    console.time("Large list rotation");
    const result = rotateRightOptimized(largeList, 250);
    console.timeEnd("Large list rotation");
    
    const resultLength = getListLength(result);
    console.log(`Result length: ${resultLength} (expected: 1000)`);
    console.log(`Status: ${resultLength === 1000 ? '✅ PASS' : '❌ FAIL'}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ROTATE LIST - BODHI DSA COURSE");
console.log("=" .repeat(40));

analyzePerformance();
demonstrateRotationMethods();
testRotateList();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    rotateRightBruteForce,
    rotateRightBetter,
    rotateRightOptimized,
    rotateRightRecursive,
    rotateLeftOptimized,
    rotateInGroups,
    displayList,
    createListFromArray,
    visualizeRotation,
    demonstrateRotationMethods,
    interactiveLearning
};
