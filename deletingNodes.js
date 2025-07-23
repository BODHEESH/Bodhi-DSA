/**
 * Deleting Nodes in Linked List
 * Bodhi-DSA Course
 * 
 * Understand node deletion in a Linked List
 * This covers deletion at head, tail, specific index, and by value
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Basic Deletion) =============
// Time Complexity: O(n) for middle/tail deletion | Space Complexity: O(1)

// Delete at head - O(1)
function deleteAtHeadBruteForce(head) {
    if (!head) return null;
    return head.next;
}

// Delete at tail - O(n)
function deleteAtTailBruteForce(head) {
    if (!head) return null;
    if (!head.next) return null; // Only one node
    
    let current = head;
    while (current.next.next) {
        current = current.next;
    }
    
    current.next = null;
    return head;
}

// Delete at specific index - O(n)
function deleteAtIndexBruteForce(head, index) {
    if (!head || index < 0) return head;
    
    // Delete head
    if (index === 0) {
        return head.next;
    }
    
    let current = head;
    for (let i = 0; i < index - 1 && current.next; i++) {
        current = current.next;
    }
    
    if (current.next) {
        current.next = current.next.next;
    }
    
    return head;
}

// Delete by value - O(n)
function deleteByValueBruteForce(head, val) {
    if (!head) return null;
    
    // If head needs to be deleted
    if (head.val === val) {
        return head.next;
    }
    
    let current = head;
    while (current.next && current.next.val !== val) {
        current = current.next;
    }
    
    if (current.next) {
        current.next = current.next.next;
    }
    
    return head;
}

// ============= BETTER APPROACH (With Validation and Error Handling) =============
// Time Complexity: O(n) | Space Complexity: O(1)

function deleteAtHeadBetter(head) {
    if (!head) {
        console.log("Warning: Attempting to delete from empty list");
        return null;
    }
    
    const deletedValue = head.val;
    const newHead = head.next;
    
    // Clean up the deleted node
    head.next = null;
    
    console.log(`Deleted head node with value: ${deletedValue}`);
    return newHead;
}

function deleteAtTailBetter(head) {
    if (!head) {
        console.log("Warning: Attempting to delete from empty list");
        return null;
    }
    
    // Only one node
    if (!head.next) {
        const deletedValue = head.val;
        console.log(`Deleted tail node with value: ${deletedValue}`);
        return null;
    }
    
    let current = head;
    while (current.next.next) {
        current = current.next;
    }
    
    const deletedValue = current.next.val;
    current.next = null;
    
    console.log(`Deleted tail node with value: ${deletedValue}`);
    return head;
}

function deleteAtIndexBetter(head, index) {
    if (index < 0) {
        throw new Error("Index cannot be negative");
    }
    
    if (!head) {
        console.log("Warning: Attempting to delete from empty list");
        return null;
    }
    
    // Delete head
    if (index === 0) {
        return deleteAtHeadBetter(head);
    }
    
    // Check if index is valid
    let length = getListLength(head);
    if (index >= length) {
        throw new Error(`Index ${index} out of bounds. List length is ${length}`);
    }
    
    let current = head;
    for (let i = 0; i < index - 1; i++) {
        current = current.next;
    }
    
    const deletedValue = current.next.val;
    current.next = current.next.next;
    
    console.log(`Deleted node at index ${index} with value: ${deletedValue}`);
    return head;
}

function deleteByValueBetter(head, val) {
    if (!head) {
        console.log("Warning: Attempting to delete from empty list");
        return null;
    }
    
    let deletedCount = 0;
    
    // Handle head deletions
    while (head && head.val === val) {
        const deletedValue = head.val;
        head = head.next;
        deletedCount++;
        console.log(`Deleted head node with value: ${deletedValue}`);
    }
    
    if (!head) {
        console.log(`Total nodes deleted: ${deletedCount}`);
        return null;
    }
    
    let current = head;
    while (current.next) {
        if (current.next.val === val) {
            const deletedValue = current.next.val;
            current.next = current.next.next;
            deletedCount++;
            console.log(`Deleted node with value: ${deletedValue}`);
        } else {
            current = current.next;
        }
    }
    
    console.log(`Total nodes deleted: ${deletedCount}`);
    return head;
}

// ============= OPTIMIZED APPROACH (Using Dummy Node) =============
// Time Complexity: O(n) | Space Complexity: O(1)

function deleteAtIndexOptimized(head, index) {
    if (index < 0) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    for (let i = 0; i < index && current.next; i++) {
        current = current.next;
    }
    
    if (current.next) {
        current.next = current.next.next;
    }
    
    return dummy.next;
}

function deleteByValueOptimized(head, val) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    let deletedCount = 0;
    
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
            deletedCount++;
        } else {
            current = current.next;
        }
    }
    
    console.log(`Deleted ${deletedCount} nodes with value: ${val}`);
    return dummy.next;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack

function deleteAtIndexRecursive(head, index) {
    // Base case: empty list or invalid index
    if (!head || index < 0) return head;
    
    // Base case: delete head
    if (index === 0) {
        return head.next;
    }
    
    // Recursive case
    head.next = deleteAtIndexRecursive(head.next, index - 1);
    return head;
}

function deleteByValueRecursive(head, val) {
    // Base case: empty list
    if (!head) return null;
    
    // If current node should be deleted
    if (head.val === val) {
        return deleteByValueRecursive(head.next, val);
    }
    
    // Recursive case
    head.next = deleteByValueRecursive(head.next, val);
    return head;
}

// ============= ADVANCED DELETION OPERATIONS =============

// Delete all nodes with values in a given range
function deleteInRange(head, min, max) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    let deletedCount = 0;
    
    while (current.next) {
        if (current.next.val >= min && current.next.val <= max) {
            const deletedValue = current.next.val;
            current.next = current.next.next;
            deletedCount++;
            console.log(`Deleted node with value: ${deletedValue}`);
        } else {
            current = current.next;
        }
    }
    
    console.log(`Total nodes deleted in range [${min}, ${max}]: ${deletedCount}`);
    return dummy.next;
}

// Delete every nth node
function deleteEveryNthNode(head, n) {
    if (!head || n <= 0) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    let count = 0;
    let deletedCount = 0;
    
    while (current.next) {
        count++;
        if (count % n === 0) {
            const deletedValue = current.next.val;
            current.next = current.next.next;
            deletedCount++;
            console.log(`Deleted ${count}th node with value: ${deletedValue}`);
        } else {
            current = current.next;
        }
    }
    
    console.log(`Total nodes deleted: ${deletedCount}`);
    return dummy.next;
}

// Delete duplicates from sorted list
function deleteDuplicatesSorted(head) {
    if (!head) return null;
    
    let current = head;
    let deletedCount = 0;
    
    while (current.next) {
        if (current.val === current.next.val) {
            const deletedValue = current.next.val;
            current.next = current.next.next;
            deletedCount++;
            console.log(`Deleted duplicate with value: ${deletedValue}`);
        } else {
            current = current.next;
        }
    }
    
    console.log(`Total duplicates deleted: ${deletedCount}`);
    return head;
}

// Delete duplicates from unsorted list
function deleteDuplicatesUnsorted(head) {
    if (!head) return null;
    
    const seen = new Set();
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    let deletedCount = 0;
    
    while (current.next) {
        if (seen.has(current.next.val)) {
            const deletedValue = current.next.val;
            current.next = current.next.next;
            deletedCount++;
            console.log(`Deleted duplicate with value: ${deletedValue}`);
        } else {
            seen.add(current.next.val);
            current = current.next;
        }
    }
    
    console.log(`Total duplicates deleted: ${deletedCount}`);
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

// ============= VISUALIZATION FUNCTIONS =============

function visualizeDeletion(head, index, operation = "delete") {
    console.log(`\n=== Visualizing ${operation} at index ${index} ===`);
    
    console.log("Before:");
    console.log(displayList(head));
    
    if (index === 0) {
        console.log("\nStep 1: Deleting head node");
        console.log(`Node to delete: [${head ? head.val : 'null'}]`);
        console.log("Step 2: Update head to next node");
    } else {
        console.log(`\nStep 1: Traverse to position ${index - 1}`);
        
        let current = head;
        for (let i = 0; i < index - 1 && current; i++) {
            current = current.next;
        }
        
        if (current && current.next) {
            console.log(`Found node at position ${index - 1}: [${current.val}]`);
            console.log(`Node to delete: [${current.next.val}]`);
            console.log("Step 2: Update pointer to skip deleted node");
            console.log(`[${current.val}] -> [${current.next.next ? current.next.next.val : 'null'}]`);
        }
    }
    
    const result = deleteAtIndexBetter(head, index);
    console.log("\nAfter:");
    console.log(displayList(result));
    
    return result;
}

function demonstrateDeletionTypes() {
    console.log("\n=== Demonstrating Different Deletion Types ===");
    
    let head = createListFromArray([1, 2, 3, 4, 5, 6, 7]);
    console.log(`Initial list: ${displayList(head)}`);
    
    // Delete at head
    console.log("\n1. Delete at Head:");
    head = deleteAtHeadBetter(head);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(1)");
    
    // Delete at tail
    console.log("\n2. Delete at Tail:");
    head = deleteAtTailBetter(head);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    // Delete at middle
    console.log("\n3. Delete at Index 2:");
    head = deleteAtIndexBetter(head, 2);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    // Delete by value
    console.log("\n4. Delete by Value (4):");
    head = deleteByValueBetter(head, 4);
    console.log(`Result: ${displayList(head)}`);
    console.log("Time Complexity: O(n)");
    
    return head;
}

// ============= PERFORMANCE ANALYSIS =============

function analyzeDeletionPerformance() {
    console.log("\n=== Deletion Performance Analysis ===");
    
    const operations = [
        { operation: "Delete at Head", timeComplexity: "O(1)", spaceComplexity: "O(1)", notes: "Always constant time" },
        { operation: "Delete at Tail", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "Must traverse to second last" },
        { operation: "Delete at Index k", timeComplexity: "O(k)", spaceComplexity: "O(1)", notes: "Traverse to position k-1" },
        { operation: "Delete by Value", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "May need to search entire list" },
        { operation: "Delete All Duplicates", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "Single pass through list" },
        { operation: "Delete in Range", timeComplexity: "O(n)", spaceComplexity: "O(1)", notes: "Check each node once" }
    ];
    
    console.log("\n" + "=".repeat(95));
    console.log("| Operation             | Time      | Space | Notes                        |");
    console.log("=".repeat(95));
    
    operations.forEach(op => {
        const operation = op.operation.padEnd(21);
        const time = op.timeComplexity.padEnd(9);
        const space = op.spaceComplexity.padEnd(5);
        const notes = op.notes.padEnd(28);
        console.log(`| ${operation} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(95));
}

function compareDeletionMethods() {
    console.log("\n=== Comparing Deletion Methods ===");
    
    const methods = [
        { name: "Brute Force", func: deleteAtIndexBruteForce },
        { name: "Better (with validation)", func: deleteAtIndexBetter },
        { name: "Optimized (dummy node)", func: deleteAtIndexOptimized },
        { name: "Recursive", func: deleteAtIndexRecursive }
    ];
    
    methods.forEach(method => {
        const testList = createListFromArray([1, 2, 3, 4, 5]);
        console.log(`\n${method.name}:`);
        console.log(`Original: ${displayList(testList)}`);
        
        try {
            console.time(method.name);
            const result = method.func(testList, 2);
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
    
    // Test 1: Delete from empty list
    console.log("\n1. Delete from empty list:");
    let emptyList = null;
    emptyList = deleteAtHeadBetter(emptyList);
    console.log(`Result: ${displayList(emptyList)}`);
    
    // Test 2: Delete only node
    console.log("\n2. Delete only node:");
    let singleList = createListFromArray([42]);
    singleList = deleteAtHeadBetter(singleList);
    console.log(`Result: ${displayList(singleList)}`);
    
    // Test 3: Delete at invalid index
    console.log("\n3. Delete at invalid index:");
    let list = createListFromArray([1, 2, 3]);
    try {
        list = deleteAtIndexBetter(list, 10);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    
    // Test 4: Delete non-existent value
    console.log("\n4. Delete non-existent value:");
    list = deleteByValueBetter(list, 100);
    console.log(`Result: ${displayList(list)}`);
    
    // Test 5: Delete all nodes with same value
    console.log("\n5. Delete all nodes with same value:");
    let duplicateList = createListFromArray([1, 1, 1, 1]);
    duplicateList = deleteByValueBetter(duplicateList, 1);
    console.log(`Result: ${displayList(duplicateList)}`);
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Deleting Nodes ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master different deletion techniques");
    console.log("2. Understand pointer manipulation");
    console.log("3. Handle edge cases safely");
    console.log("4. Choose appropriate method for each scenario");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Head deletion is always O(1)");
    console.log("2. Tail deletion requires finding second-to-last node");
    console.log("3. Always update pointers before losing reference");
    console.log("4. Dummy nodes simplify edge case handling");
    
    console.log("\n⚠️ Common Pitfalls:");
    console.log("1. Memory leaks (not cleaning up deleted nodes)");
    console.log("2. Null pointer exceptions");
    console.log("3. Losing reference to nodes");
    console.log("4. Not handling empty list cases");
    
    demonstrateDeletionTypes();
}

// ============= TEST CASES =============

function testDeletionOperations() {
    console.log("\n=== Testing Deletion Operations ===");
    
    // Test basic deletions
    console.log("\n--- Basic Deletion Tests ---");
    let list = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    console.log(`Initial: ${displayList(list)}`);
    
    console.log("\n1. Delete at head:");
    list = deleteAtHeadBetter(list);
    console.log(`   ${displayList(list)}`);
    
    console.log("2. Delete at tail:");
    list = deleteAtTailBetter(list);
    console.log(`   ${displayList(list)}`);
    
    console.log("3. Delete at index 3:");
    list = deleteAtIndexBetter(list, 3);
    console.log(`   ${displayList(list)}`);
    
    console.log("4. Delete by value 7:");
    list = deleteByValueBetter(list, 7);
    console.log(`   ${displayList(list)}`);
    
    // Test advanced deletions
    console.log("\n--- Advanced Deletion Tests ---");
    
    console.log("5. Create list with duplicates:");
    let dupList = createListFromArray([1, 2, 2, 3, 3, 3, 4, 5, 5]);
    console.log(`   ${displayList(dupList)}`);
    
    console.log("6. Delete duplicates (unsorted):");
    dupList = deleteDuplicatesUnsorted(dupList);
    console.log(`   ${displayList(dupList)}`);
    
    console.log("7. Delete in range [2, 4]:");
    dupList = deleteInRange(dupList, 2, 4);
    console.log(`   ${displayList(dupList)}`);
    
    console.log(`\nFinal list: ${displayList(list)}`);
    console.log(`Final duplicate list: ${displayList(dupList)}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 DELETING NODES IN LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzeDeletionPerformance();
compareDeletionMethods();
testEdgeCases();
testDeletionOperations();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    deleteAtHeadBruteForce,
    deleteAtTailBruteForce,
    deleteAtIndexBruteForce,
    deleteByValueBruteForce,
    deleteAtHeadBetter,
    deleteAtTailBetter,
    deleteAtIndexBetter,
    deleteByValueBetter,
    deleteAtIndexOptimized,
    deleteByValueOptimized,
    deleteAtIndexRecursive,
    deleteByValueRecursive,
    deleteInRange,
    deleteEveryNthNode,
    deleteDuplicatesSorted,
    deleteDuplicatesUnsorted,
    displayList,
    createListFromArray,
    visualizeDeletion,
    demonstrateDeletionTypes,
    interactiveLearning
};
