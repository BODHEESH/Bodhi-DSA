/**
 * Middle of Linked List
 * Bodhi-DSA Course
 * 
 * Problem: Find the middle node of a linked list
 * If there are two middle nodes, return the second middle node
 * 
 * Example:
 * Input: 1 -> 2 -> 3 -> 4 -> 5
 * Output: 3 (middle node)
 * 
 * Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6
 * Output: 4 (second middle node)
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: First pass to count nodes, second pass to find middle

function findMiddleBruteForce(head) {
    if (!head) return null;
    
    // First pass: count total nodes
    let count = 0;
    let current = head;
    
    while (current) {
        count++;
        current = current.next;
    }
    
    // Calculate middle position
    let middleIndex = Math.floor(count / 2);
    
    // Second pass: traverse to middle
    current = head;
    for (let i = 0; i < middleIndex; i++) {
        current = current.next;
    }
    
    return current;
}

// ============= BETTER APPROACH (Array Storage) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Store all nodes in array, return middle element

function findMiddleBetter(head) {
    if (!head) return null;
    
    const nodes = [];
    let current = head;
    
    // Store all nodes in array
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    // Return middle node
    const middleIndex = Math.floor(nodes.length / 2);
    return nodes[middleIndex];
}

// ============= OPTIMIZED APPROACH (Two Pointers - Tortoise and Hare) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Slow pointer moves 1 step, fast pointer moves 2 steps

function findMiddleOptimized(head) {
    if (!head) return null;
    
    let slow = head;
    let fast = head;
    
    // Move slow one step and fast two steps
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack

function findMiddleRecursive(head) {
    if (!head) return null;
    
    const result = findMiddleRecursiveHelper(head, head);
    return result.middle;
}

function findMiddleRecursiveHelper(slow, fast) {
    // Base case: fast reached end
    if (!fast || !fast.next) {
        return { middle: slow };
    }
    
    // Recursive case: move pointers
    return findMiddleRecursiveHelper(slow.next, fast.next.next);
}

// ============= VARIATIONS =============

// Find first middle node (for even length lists)
function findFirstMiddle(head) {
    if (!head) return null;
    
    let slow = head;
    let fast = head.next; // Start fast one step ahead
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// Find both middle nodes (for even length lists)
function findBothMiddles(head) {
    if (!head) return { first: null, second: null };
    if (!head.next) return { first: head, second: head };
    
    let slow = head;
    let fast = head;
    let prev = null;
    
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // If even number of nodes, prev and slow are the two middles
    if (!fast) {
        return { first: prev, second: slow };
    }
    
    // If odd number of nodes, slow is the middle
    return { first: slow, second: slow };
}

// Find middle with position information
function findMiddleWithInfo(head) {
    if (!head) return { node: null, position: -1, isEven: false };
    
    let slow = head;
    let fast = head;
    let position = 0;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        position++;
    }
    
    // Determine if list length is even or odd
    const isEven = !fast;
    
    return {
        node: slow,
        position: position,
        isEven: isEven,
        totalNodes: isEven ? position * 2 : position * 2 + 1
    };
}

// Find kth node from middle
function findKthFromMiddle(head, k) {
    const middle = findMiddleOptimized(head);
    if (!middle) return null;
    
    let current = middle;
    
    // Move k steps from middle
    if (k > 0) {
        // Move forward
        for (let i = 0; i < k && current; i++) {
            current = current.next;
        }
    } else if (k < 0) {
        // Move backward (need to restart from head)
        const middleInfo = findMiddleWithInfo(head);
        const targetPosition = middleInfo.position + k;
        
        if (targetPosition < 0) return null;
        
        current = head;
        for (let i = 0; i < targetPosition; i++) {
            current = current.next;
        }
    }
    
    return current;
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

function highlightMiddleInList(head, middleNode) {
    if (!head || !middleNode) return "Empty list";
    
    const values = [];
    let current = head;
    
    while (current) {
        if (current === middleNode) {
            values.push(`[${current.val}]`); // Highlight middle
        } else {
            values.push(current.val);
        }
        current = current.next;
    }
    
    return values.join(' -> ') + ' -> null';
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeTwoPointers(head) {
    console.log("\n=== Visualizing Two Pointers Approach ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    let slow = head;
    let fast = head;
    let step = 0;
    
    console.log(`Step ${step}: slow=[${slow.val}], fast=[${fast.val}]`);
    console.log(`List: ${highlightPointers(head, slow, fast)}`);
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        step++;
        
        console.log(`Step ${step}: slow=[${slow.val}], fast=[${fast ? fast.val : 'null'}]`);
        console.log(`List: ${highlightPointers(head, slow, fast)}`);
    }
    
    console.log(`\nMiddle found: [${slow.val}]`);
    return slow;
}

function highlightPointers(head, slow, fast) {
    if (!head) return "Empty list";
    
    const values = [];
    let current = head;
    
    while (current) {
        let marker = current.val;
        
        if (current === slow && current === fast) {
            marker = `S,F(${current.val})`;
        } else if (current === slow) {
            marker = `S(${current.val})`;
        } else if (current === fast) {
            marker = `F(${current.val})`;
        }
        
        values.push(marker);
        current = current.next;
    }
    
    return values.join(' -> ') + ' -> null';
}

function demonstrateMiddleFinding() {
    console.log("\n=== Demonstrating Middle Finding ===");
    
    const testCases = [
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6, 7]
    ];
    
    testCases.forEach((arr, index) => {
        console.log(`\nTest Case ${index + 1}: [${arr.join(', ')}]`);
        const list = createListFromArray(arr);
        
        const middle = findMiddleOptimized(list);
        const middleInfo = findMiddleWithInfo(list);
        
        console.log(`List: ${displayList(list)}`);
        console.log(`Middle: ${middle ? middle.val : 'null'}`);
        console.log(`Position: ${middleInfo.position}`);
        console.log(`Total nodes: ${middleInfo.totalNodes}`);
        console.log(`Is even length: ${middleInfo.isEven}`);
        console.log(`Highlighted: ${highlightMiddleInList(list, middle)}`);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force (Two Pass)", time: "O(n)", space: "O(1)", notes: "Two traversals required" },
        { name: "Array Storage", time: "O(n)", space: "O(n)", notes: "Extra space for array" },
        { name: "Two Pointers", time: "O(n)", space: "O(1)", notes: "Single pass, optimal" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursion stack overhead" }
    ];
    
    console.log("\n" + "=".repeat(85));
    console.log("| Approach                | Time | Space | Notes                    |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(23);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
}

function compareApproaches() {
    console.log("\n=== Comparing Different Approaches ===");
    
    const testList = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log(`Test list: ${displayList(testList)}`);
    
    const approaches = [
        { name: "Brute Force", func: findMiddleBruteForce },
        { name: "Array Storage", func: findMiddleBetter },
        { name: "Two Pointers", func: findMiddleOptimized },
        { name: "Recursive", func: findMiddleRecursive }
    ];
    
    approaches.forEach(approach => {
        console.log(`\n${approach.name}:`);
        console.time(approach.name);
        const result = approach.func(testList);
        console.timeEnd(approach.name);
        console.log(`Result: ${result ? result.val : 'null'}`);
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
        { name: "Large even list", list: createListFromArray(Array.from({length: 1000}, (_, i) => i + 1)) },
        { name: "Large odd list", list: createListFromArray(Array.from({length: 1001}, (_, i) => i + 1)) }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        
        if (testCase.list && getListLength(testCase.list) <= 10) {
            console.log(`List: ${displayList(testCase.list)}`);
        } else if (testCase.list) {
            console.log(`List length: ${getListLength(testCase.list)}`);
        } else {
            console.log("List: null");
        }
        
        const middle = findMiddleOptimized(testCase.list);
        console.log(`Middle: ${middle ? middle.val : 'null'}`);
        
        if (testCase.list) {
            const info = findMiddleWithInfo(testCase.list);
            console.log(`Position: ${info.position}, Total: ${info.totalNodes}, Even: ${info.isEven}`);
        }
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Finding Middle of Linked List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Understand the two-pointers technique");
    console.log("2. Master the tortoise and hare algorithm");
    console.log("3. Handle edge cases for different list lengths");
    console.log("4. Optimize for single-pass solutions");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Two pointers move at different speeds");
    console.log("2. When fast pointer reaches end, slow is at middle");
    console.log("3. For even length: second middle is returned");
    console.log("4. Single traversal is more efficient than two passes");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Slow pointer: 1 step per iteration");
    console.log("2. Fast pointer: 2 steps per iteration");
    console.log("3. Fast pointer covers 2x distance");
    console.log("4. When fast reaches end, slow is at middle");
    
    console.log("\n⚡ Optimization Benefits:");
    console.log("1. Single pass through the list");
    console.log("2. Constant extra space");
    console.log("3. No need to count nodes first");
    console.log("4. Works for any list length");
    
    visualizeTwoPointers(createListFromArray([1, 2, 3, 4, 5, 6, 7]));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Splitting Linked List:**");
    const list1 = createListFromArray([1, 2, 3, 4, 5, 6]);
    const middle1 = findMiddleOptimized(list1);
    console.log(`Original: ${displayList(list1)}`);
    console.log(`Split at middle: First half ends at ${middle1.val}`);
    
    console.log("\n2. **Palindrome Check Preparation:**");
    const list2 = createListFromArray([1, 2, 3, 2, 1]);
    const middle2 = findMiddleOptimized(list2);
    console.log(`List: ${displayList(list2)}`);
    console.log(`Middle for palindrome check: ${middle2.val}`);
    
    console.log("\n3. **Finding Median in Sorted List:**");
    const sortedList = createListFromArray([10, 20, 30, 40, 50]);
    const median = findMiddleOptimized(sortedList);
    console.log(`Sorted list: ${displayList(sortedList)}`);
    console.log(`Median value: ${median.val}`);
    
    console.log("\n4. **Binary Search on Linked List:**");
    const searchList = createListFromArray([1, 3, 5, 7, 9, 11, 13]);
    const searchMiddle = findMiddleOptimized(searchList);
    console.log(`Search list: ${displayList(searchList)}`);
    console.log(`Binary search starting point: ${searchMiddle.val}`);
}

// ============= TEST CASES =============

function testMiddleFinding() {
    console.log("\n=== Testing Middle Finding Operations ===");
    
    console.log("\n--- Basic Tests ---");
    
    const testCases = [
        { input: [1, 2, 3, 4, 5], expected: 3 },
        { input: [1, 2, 3, 4, 5, 6], expected: 4 },
        { input: [1], expected: 1 },
        { input: [1, 2], expected: 2 },
        { input: [], expected: null }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}:`);
        const list = testCase.input.length > 0 ? createListFromArray(testCase.input) : null;
        console.log(`Input: [${testCase.input.join(', ')}]`);
        
        const result = findMiddleOptimized(list);
        const actual = result ? result.val : null;
        
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${actual}`);
        console.log(`Status: ${actual === testCase.expected ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Advanced Tests ---");
    
    console.log("\n1. Both middles for even length:");
    const evenList = createListFromArray([1, 2, 3, 4]);
    const bothMiddles = findBothMiddles(evenList);
    console.log(`List: ${displayList(evenList)}`);
    console.log(`First middle: ${bothMiddles.first.val}, Second middle: ${bothMiddles.second.val}`);
    
    console.log("\n2. Kth node from middle:");
    const testList = createListFromArray([1, 2, 3, 4, 5, 6, 7]);
    console.log(`List: ${displayList(testList)}`);
    console.log(`1 step forward from middle: ${findKthFromMiddle(testList, 1)?.val}`);
    console.log(`2 steps forward from middle: ${findKthFromMiddle(testList, 2)?.val}`);
    console.log(`1 step backward from middle: ${findKthFromMiddle(testList, -1)?.val}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 MIDDLE OF LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstrateMiddleFinding();
practicalApplications();
testMiddleFinding();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    findMiddleBruteForce,
    findMiddleBetter,
    findMiddleOptimized,
    findMiddleRecursive,
    findFirstMiddle,
    findBothMiddles,
    findMiddleWithInfo,
    findKthFromMiddle,
    displayList,
    createListFromArray,
    visualizeTwoPointers,
    demonstrateMiddleFinding,
    interactiveLearning
};
