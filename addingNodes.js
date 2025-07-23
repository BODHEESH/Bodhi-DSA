/**
 * Adding Nodes to Linked List
 * Bodhi-DSA Course
 * 
 * Learn to insert nodes into a Linked List at various positions
 * This covers insertion at head, tail, and any given index
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Basic Insertion) =============
// Time Complexity: O(n) for middle insertion | Space Complexity: O(1)

// Insert at head - O(1)
function insertAtHeadBruteForce(head, val) {
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

// Insert at tail - O(n)
function insertAtTailBruteForce(head, val) {
    const newNode = new ListNode(val);
    
    // If list is empty
    if (!head) return newNode;
    
    // Traverse to the end
    let current = head;
    while (current.next) {
        current = current.next;
    }
    
    current.next = newNode;
    return head;
}

// Insert at specific index - O(n)
function insertAtIndexBruteForce(head, index, val) {
    // Insert at head
    if (index === 0) {
        return insertAtHeadBruteForce(head, val);
    }
    
    // Find position
    let current = head;
    for (let i = 0; i < index - 1 && current; i++) {
        current = current.next;
    }
    
    // Invalid index
    if (!current) return head;
    
    const newNode = new ListNode(val);
    newNode.next = current.next;
    current.next = newNode;
    
    return head;
}

// ============= BETTER APPROACH (With Validation) =============
// Time Complexity: O(n) | Space Complexity: O(1)

function insertAtHeadBetter(head, val) {
    // Input validation
    if (val === undefined || val === null) {
        throw new Error("Value cannot be null or undefined");
    }
    
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

function insertAtTailBetter(head, val) {
    if (val === undefined || val === null) {
        throw new Error("Value cannot be null or undefined");
    }
    
    const newNode = new ListNode(val);
    
    if (!head) return newNode;
    
    let current = head;
    while (current.next) {
        current = current.next;
    }
    
    current.next = newNode;
    return head;
}

function insertAtIndexBetter(head, index, val) {
    // Validation
    if (index < 0) {
        throw new Error("Index cannot be negative");
    }
    
    if (val === undefined || val === null) {
        throw new Error("Value cannot be null or undefined");
    }
    
    // Insert at head
    if (index === 0) {
        return insertAtHeadBetter(head, val);
    }
    
    // Check if we have enough nodes
    let length = getListLength(head);
    if (index > length) {
        throw new Error(`Index ${index} out of bounds. List length is ${length}`);
    }
    
    let current = head;
    for (let i = 0; i < index - 1; i++) {
        current = current.next;
    }
    
    const newNode = new ListNode(val);
    newNode.next = current.next;
    current.next = newNode;
    
    return head;
}

// ============= OPTIMIZED APPROACH (Using Dummy Node) =============
// Time Complexity: O(n) | Space Complexity: O(1)

function insertAtIndexOptimized(head, index, val) {
    if (index < 0) return head;
    
    // Create dummy node to handle edge cases uniformly
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    
    // Move to position before insertion point
    for (let i = 0; i < index && current; i++) {
        current = current.next;
    }
    
    // If current is null, index is out of bounds
    if (!current) return head;
    
    const newNode = new ListNode(val);
    newNode.next = current.next;
    current.next = newNode;
    
    return dummy.next;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack

function insertAtIndexRecursive(head, index, val) {
    // Base case: insert at head
    if (index === 0) {
        const newNode = new ListNode(val);
        newNode.next = head;
        return newNode;
    }
    
    // Base case: reached end without finding position
    if (!head) return null;
    
    // Recursive case
    head.next = insertAtIndexRecursive(head.next, index - 1, val);
    return head;
}

// ============= VARIATIONS =============

// Insert multiple values at once
function insertMultipleAtHead(head, values) {
    if (!Array.isArray(values)) return head;
    
    // Insert in reverse order to maintain original order
    for (let i = values.length - 1; i >= 0; i--) {
        head = insertAtHeadBetter(head, values[i]);
    }
    
    return head;
}

function insertMultipleAtTail(head, values) {
    if (!Array.isArray(values)) return head;
    
    for (const val of values) {
        head = insertAtTailBetter(head, val);
    }
    
    return head;
}

// Insert in sorted order
function insertSorted(head, val) {
    const newNode = new ListNode(val);
    
    // Insert at head if list is empty or val is smallest
    if (!head || val <= head.val) {
        newNode.next = head;
        return newNode;
    }
    
    let current = head;
    while (current.next && current.next.val < val) {
        current = current.next;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    
    return head;
}

// Insert after a specific value
function insertAfterValue(head, targetVal, newVal) {
    if (!head) return head;
    
    let current = head;
    while (current && current.val !== targetVal) {
        current = current.next;
    }
    
    if (current) {
        const newNode = new ListNode(newVal);
        newNode.next = current.next;
        current.next = newNode;
    }
    
    return head;
}

// Insert before a specific value
function insertBeforeValue(head, targetVal, newVal) {
    // If inserting before head
    if (head && head.val === targetVal) {
        return insertAtHeadBetter(head, newVal);
    }
    
    if (!head) return head;
    
    let current = head;
    while (current.next && current.next.val !== targetVal) {
        current = current.next;
    }
    
    if (current.next) {
        const newNode = new ListNode(newVal);
        newNode.next = current.next;
        current.next = newNode;
    }
    
    return head;
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

// ============= VISUALIZATION FUNCTIONS =============

function visualizeInsertion(head, index, val, operation = "insert") {
    console.log(`\n=== Visualizing ${operation} at index ${index} ===`);
    
    console.log("Before:");
    console.log(displayList(head));
    
    // Show step by step
    if (index === 0) {
        console.log("\nStep 1: Creating new node");
        console.log(`New node: [${val}] -> null`);
        
        console.log("\nStep 2: Point new node to current head");
        console.log(`[${val}] -> ${displayList(head)}`);
        
        console.log("\nStep 3: Update head to new node");
    } else {
        console.log(`\nStep 1: Traverse to position ${index - 1}`);
        
        let current = head;
        for (let i = 0; i < index - 1 && current; i++) {
            current = current.next;
        }
        
        if (current) {
            console.log(`Found node at position ${index - 1}: [${current.val}]`);
            
            console.log("\nStep 2: Create new node");
            console.log(`New node: [${val}] -> null`);
            
            console.log("\nStep 3: Point new node to next node");
            console.log(`[${val}] -> [${current.next ? current.next.val : 'null'}]`);
            
            console.log("\nStep 4: Point previous node to new node");
        }
    }
    
    const result = insertAtIndexBetter(head, index, val);
    console.log("\nAfter:");
    console.log(displayList(result));
    
    return result;
}

function demonstrateInsertionTypes() {
    console.log("\n=== Demonstrating Different Insertion Types ===");
    
    let head = createListFromArray([2, 4, 6]);
    console.log(`Initial list: ${displayList(head)}`);
    
    // Insert at head
    console.log("\n1. Insert at Head (1):");
    head = insertAtHeadBetter(head, 1);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(1)");
    
    // Insert at tail
    console.log("\n2. Insert at Tail (8):");
    head = insertAtTailBetter(head, 8);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    // Insert at middle
    console.log("\n3. Insert at Index 2 (3):");
    head = insertAtIndexBetter(head, 2, 3);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    // Insert in sorted order
    console.log("\n4. Insert in Sorted Order (5):");
    head = insertSorted(head, 5);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    // Insert after value
    console.log("\n5. Insert After Value 6 (7):");
    head = insertAfterValue(head, 6, 7);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    return head;
}

// ============= PERFORMANCE ANALYSIS =============

function analyzeInsertionPerformance() {
    console.log("\n=== Insertion Performance Analysis ===");
    
    const operations = [
        { operation: "Insert at Head", timeComplexity: "O(1)", spaceComplexity: "O(1)", notes: "Always constant time" },
        { operation: "Insert at Tail", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "Must traverse to end" },
        { operation: "Insert at Index k", timeComplexity: "O(k)", spaceComplexity: "O(1)", notes: "Traverse to position k" },
        { operation: "Insert Sorted", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "Find correct position" },
        { operation: "Insert After Value", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "Search for value first" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Operation           | Time      | Space | Notes                    |");
    console.log("=".repeat(90));
    
    operations.forEach(op => {
        const operation = op.operation.padEnd(19);
        const time = op.timeComplexity.padEnd(9);
        const space = op.spaceComplexity.padEnd(5);
        const notes = op.notes.padEnd(24);
        console.log(`| ${operation} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
}

function compareInsertionMethods() {
    console.log("\n=== Comparing Insertion Methods ===");
    
    const methods = [
        { name: "Brute Force", func: insertAtIndexBruteForce },
        { name: "Better (with validation)", func: insertAtIndexBetter },
        { name: "Optimized (dummy node)", func: insertAtIndexOptimized },
        { name: "Recursive", func: insertAtIndexRecursive }
    ];
    
    const testList = createListFromArray([1, 2, 4, 5]);
    console.log(`Original list: ${displayList(testList)}`);
    
    methods.forEach(method => {
        const listCopy = createListFromArray([1, 2, 4, 5]);
        console.log(`\n${method.name}:`);
        
        try {
            console.time(method.name);
            const result = method.func(listCopy, 2, 3);
            console.timeEnd(method.name);
            console.log(`Result: ${displayList(result)}`);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    // Test 1: Insert into empty list
    console.log("\n1. Insert into empty list:");
    let emptyList = null;
    emptyList = insertAtHeadBetter(emptyList, 1);
    console.log(`Result: ${displayList(emptyList)}`);
    
    // Test 2: Insert at index 0
    console.log("\n2. Insert at index 0:");
    let list = createListFromArray([2, 3, 4]);
    list = insertAtIndexBetter(list, 0, 1);
    console.log(`Result: ${displayList(list)}`);
    
    // Test 3: Insert at end
    console.log("\n3. Insert at end:");
    list = insertAtIndexBetter(list, 4, 5);
    console.log(`Result: ${displayList(list)}`);
    
    // Test 4: Insert multiple values
    console.log("\n4. Insert multiple values at head:");
    list = insertMultipleAtHead(list, [0, -1, -2]);
    console.log(`Result: ${displayList(list)}`);
    
    // Test 5: Error cases
    console.log("\n5. Error handling:");
    try {
        insertAtIndexBetter(list, -1, 10);
    } catch (error) {
        console.log(`Negative index error: ${error.message}`);
    }
    
    try {
        insertAtIndexBetter(list, 100, 10);
    } catch (error) {
        console.log(`Out of bounds error: ${error.message}`);
    }
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Adding Nodes ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master different insertion techniques");
    console.log("2. Understand time complexity trade-offs");
    console.log("3. Handle edge cases properly");
    console.log("4. Choose appropriate method for each scenario");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Head insertion is always O(1)");
    console.log("2. Tail insertion requires traversal (O(n)) unless we maintain tail pointer");
    console.log("3. Index-based insertion requires traversal to position");
    console.log("4. Dummy nodes can simplify edge case handling");
    
    console.log("\n🔧 Best Practices:");
    console.log("1. Always validate input parameters");
    console.log("2. Handle empty list cases");
    console.log("3. Use dummy nodes for complex operations");
    console.log("4. Consider maintaining tail pointer for frequent tail insertions");
    
    demonstrateInsertionTypes();
}

// ============= TEST CASES =============

function testInsertionOperations() {
    console.log("\n=== Testing Insertion Operations ===");
    
    // Test basic insertions
    console.log("\n--- Basic Insertion Tests ---");
    let list = null;
    
    console.log("1. Insert into empty list:");
    list = insertAtHeadBetter(list, 5);
    console.log(`   ${displayList(list)}`);
    
    console.log("2. Insert at head:");
    list = insertAtHeadBetter(list, 3);
    console.log(`   ${displayList(list)}`);
    
    console.log("3. Insert at tail:");
    list = insertAtTailBetter(list, 7);
    console.log(`   ${displayList(list)}`);
    
    console.log("4. Insert at index 1:");
    list = insertAtIndexBetter(list, 1, 4);
    console.log(`   ${displayList(list)}`);
    
    console.log("5. Insert at index 2:");
    list = insertAtIndexBetter(list, 2, 6);
    console.log(`   ${displayList(list)}`);
    
    // Test special insertions
    console.log("\n--- Special Insertion Tests ---");
    
    console.log("6. Insert in sorted order (2):");
    list = insertSorted(list, 2);
    console.log(`   ${displayList(list)}`);
    
    console.log("7. Insert after value 5 (5.5):");
    list = insertAfterValue(list, 5, 5.5);
    console.log(`   ${displayList(list)}`);
    
    console.log("8. Insert before value 7 (6.5):");
    list = insertBeforeValue(list, 7, 6.5);
    console.log(`   ${displayList(list)}`);
    
    console.log(`\nFinal list: ${displayList(list)}`);
    console.log(`List length: ${getListLength(list)}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ADDING NODES TO LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzeInsertionPerformance();
compareInsertionMethods();
testEdgeCases();
testInsertionOperations();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    insertAtHeadBruteForce,
    insertAtTailBruteForce,
    insertAtIndexBruteForce,
    insertAtHeadBetter,
    insertAtTailBetter,
    insertAtIndexBetter,
    insertAtIndexOptimized,
    insertAtIndexRecursive,
    insertMultipleAtHead,
    insertMultipleAtTail,
    insertSorted,
    insertAfterValue,
    insertBeforeValue,
    displayList,
    createListFromArray,
    visualizeInsertion,
    demonstrateInsertionTypes,
    interactiveLearning
};
