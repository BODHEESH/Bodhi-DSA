/**
 * Introduction to Linked Lists
 * Bodhi-DSA Course
 * 
 * Get started with the basics of Linked Lists
 * A linked list is a linear data structure where elements are stored in nodes,
 * and each node contains data and a reference to the next node
 */

// ============= NODE CLASS DEFINITION =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BASIC LINKED LIST OPERATIONS =============

// Create a linked list from array
function createLinkedList(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// Display linked list
function displayLinkedList(head) {
    if (!head) return "Empty list";
    
    const values = [];
    let current = head;
    
    while (current !== null) {
        values.push(current.val);
        current = current.next;
    }
    
    return values.join(' -> ') + ' -> null';
}

// ============= BASIC TRAVERSAL OPERATIONS =============

// Traverse and print all elements
function traverseLinkedList(head) {
    console.log("\nTraversing Linked List:");
    
    if (!head) {
        console.log("List is empty");
        return;
    }
    
    let current = head;
    let position = 0;
    
    while (current !== null) {
        console.log(`Position ${position}: ${current.val}`);
        current = current.next;
        position++;
    }
}

// Get length of linked list
function getLength(head) {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}

// Get element at specific index
function getElementAt(head, index) {
    if (index < 0) return null;
    
    let current = head;
    let currentIndex = 0;
    
    while (current !== null && currentIndex < index) {
        current = current.next;
        currentIndex++;
    }
    
    return current ? current.val : null;
}

// Search for a value
function searchValue(head, target) {
    let current = head;
    let index = 0;
    
    while (current !== null) {
        if (current.val === target) {
            return { found: true, index: index, node: current };
        }
        current = current.next;
        index++;
    }
    
    return { found: false, index: -1, node: null };
}

// ============= COMPARISON WITH ARRAYS =============

function compareWithArrays() {
    console.log("\n=== Linked List vs Array Comparison ===");
    
    console.log("\nLinked List Advantages:");
    console.log("- Dynamic size (can grow/shrink during runtime)");
    console.log("- Efficient insertion/deletion at beginning: O(1)");
    console.log("- Memory allocated as needed");
    console.log("- No memory waste");
    
    console.log("\nLinked List Disadvantages:");
    console.log("- No random access (must traverse from head)");
    console.log("- Extra memory for storing pointers");
    console.log("- Not cache-friendly due to non-contiguous memory");
    console.log("- No backward traversal (in singly linked list)");
    
    console.log("\nArray Advantages:");
    console.log("- Random access: O(1)");
    console.log("- Cache-friendly (contiguous memory)");
    console.log("- Less memory overhead");
    console.log("- Better for mathematical operations");
    
    console.log("\nArray Disadvantages:");
    console.log("- Fixed size (in most languages)");
    console.log("- Expensive insertion/deletion in middle: O(n)");
    console.log("- Memory allocated upfront");
    console.log("- Potential memory waste");
}

// ============= TYPES OF LINKED LISTS =============

function explainLinkedListTypes() {
    console.log("\n=== Types of Linked Lists ===");
    
    console.log("\n1. Singly Linked List:");
    console.log("   [Data|Next] -> [Data|Next] -> [Data|null]");
    console.log("   - Each node points to the next node");
    console.log("   - Last node points to null");
    console.log("   - Can only traverse forward");
    
    console.log("\n2. Doubly Linked List:");
    console.log("   null <- [Prev|Data|Next] <-> [Prev|Data|Next] -> null");
    console.log("   - Each node has pointers to both next and previous nodes");
    console.log("   - Can traverse in both directions");
    console.log("   - More memory overhead");
    
    console.log("\n3. Circular Linked List:");
    console.log("   [Data|Next] -> [Data|Next] -> [Data|Next] ->");
    console.log("                    ^                           |");
    console.log("                    |___________________________|");
    console.log("   - Last node points back to the first node");
    console.log("   - Forms a circle");
    console.log("   - No null pointers");
    
    console.log("\n4. Circular Doubly Linked List:");
    console.log("   - Combines features of doubly and circular linked lists");
    console.log("   - Can traverse in both directions infinitely");
}

// ============= MEMORY REPRESENTATION =============

function explainMemoryLayout() {
    console.log("\n=== Memory Layout ===");
    
    console.log("\nArray Memory Layout:");
    console.log("Memory: [1000][1004][1008][1012][1016]");
    console.log("Values: [ 10 ][ 20 ][ 30 ][ 40 ][ 50 ]");
    console.log("- Contiguous memory locations");
    console.log("- Easy to calculate address: base + (index * size)");
    
    console.log("\nLinked List Memory Layout:");
    console.log("Node 1 at 2000: [10|2500]");
    console.log("Node 2 at 2500: [20|3100]");
    console.log("Node 3 at 3100: [30|null]");
    console.log("- Non-contiguous memory locations");
    console.log("- Must follow pointers to access elements");
}

// ============= BASIC OPERATIONS COMPLEXITY =============

function analyzeComplexity() {
    console.log("\n=== Time Complexity Analysis ===");
    
    const operations = [
        { operation: "Access by index", array: "O(1)", linkedList: "O(n)" },
        { operation: "Search", array: "O(n)", linkedList: "O(n)" },
        { operation: "Insert at beginning", array: "O(n)", linkedList: "O(1)" },
        { operation: "Insert at end", array: "O(1)*", linkedList: "O(n)" },
        { operation: "Insert at middle", array: "O(n)", linkedList: "O(n)" },
        { operation: "Delete at beginning", array: "O(n)", linkedList: "O(1)" },
        { operation: "Delete at end", array: "O(1)*", linkedList: "O(n)" },
        { operation: "Delete at middle", array: "O(n)", linkedList: "O(n)" }
    ];
    
    console.log("\n" + "=".repeat(60));
    console.log("| Operation              | Array    | Linked List |");
    console.log("=".repeat(60));
    
    operations.forEach(op => {
        const operation = op.operation.padEnd(22);
        const array = op.array.padEnd(8);
        const linkedList = op.linkedList.padEnd(11);
        console.log(`| ${operation} | ${array} | ${linkedList} |`);
    });
    
    console.log("=".repeat(60));
    console.log("* Assuming dynamic array with amortized O(1) insertion");
}

// ============= PRACTICAL EXAMPLES =============

function practicalExamples() {
    console.log("\n=== Practical Examples ===");
    
    // Example 1: Simple list creation and traversal
    console.log("\n1. Creating a simple linked list:");
    const list1 = createLinkedList([1, 2, 3, 4, 5]);
    console.log(`Created: ${displayLinkedList(list1)}`);
    console.log(`Length: ${getLength(list1)}`);
    
    // Example 2: Searching
    console.log("\n2. Searching for elements:");
    const searchResult1 = searchValue(list1, 3);
    console.log(`Search for 3: ${JSON.stringify(searchResult1)}`);
    
    const searchResult2 = searchValue(list1, 10);
    console.log(`Search for 10: ${JSON.stringify(searchResult2)}`);
    
    // Example 3: Accessing elements
    console.log("\n3. Accessing elements by index:");
    console.log(`Element at index 0: ${getElementAt(list1, 0)}`);
    console.log(`Element at index 2: ${getElementAt(list1, 2)}`);
    console.log(`Element at index 10: ${getElementAt(list1, 10)}`);
    
    // Example 4: Different data types
    console.log("\n4. Linked list with different data types:");
    const mixedList = createLinkedList(['hello', 42, true, 3.14]);
    console.log(`Mixed data: ${displayLinkedList(mixedList)}`);
}

// ============= COMMON PATTERNS =============

function commonPatterns() {
    console.log("\n=== Common Linked List Patterns ===");
    
    console.log("\n1. Two Pointer Technique:");
    console.log("   - Fast and slow pointers");
    console.log("   - Used for finding middle, detecting cycles");
    console.log("   - Example: Floyd's Tortoise and Hare");
    
    console.log("\n2. Dummy Node Pattern:");
    console.log("   - Create a dummy node before the actual head");
    console.log("   - Simplifies edge cases in insertion/deletion");
    console.log("   - Especially useful when head might change");
    
    console.log("\n3. Recursive Approach:");
    console.log("   - Many linked list problems have elegant recursive solutions");
    console.log("   - Base case: null or single node");
    console.log("   - Recursive case: process current node and recurse on rest");
    
    console.log("\n4. Iterative Approach:");
    console.log("   - Use while loop with current pointer");
    console.log("   - More memory efficient than recursion");
    console.log("   - Better for very long lists");
}

// ============= VISUALIZATION HELPERS =============

function visualizeLinkedList(head, title = "Linked List") {
    console.log(`\n=== ${title} ===`);
    
    if (!head) {
        console.log("Empty list: null");
        return;
    }
    
    let current = head;
    let position = 0;
    const nodes = [];
    
    // Collect all nodes
    while (current !== null) {
        nodes.push({
            position: position,
            value: current.val,
            hasNext: current.next !== null
        });
        current = current.next;
        position++;
    }
    
    // Create visual representation
    let topLine = "";
    let middleLine = "";
    let bottomLine = "";
    let arrowLine = "";
    
    nodes.forEach((node, index) => {
        const valueStr = String(node.value);
        const width = Math.max(valueStr.length + 2, 6);
        
        // Top border
        topLine += "┌" + "─".repeat(width - 2) + "┐";
        
        // Value line
        const paddedValue = valueStr.padStart(Math.ceil((width - 2 + valueStr.length) / 2))
                                   .padEnd(width - 2);
        middleLine += "│" + paddedValue + "│";
        
        // Bottom border
        bottomLine += "└" + "─".repeat(width - 2) + "┘";
        
        // Arrow line
        if (node.hasNext) {
            topLine += "   ";
            middleLine += " → ";
            bottomLine += "   ";
        } else {
            arrowLine += " → null";
        }
    });
    
    console.log(topLine);
    console.log(middleLine + arrowLine);
    console.log(bottomLine);
    
    // Show positions
    let positionLine = "";
    nodes.forEach((node, index) => {
        const posStr = `[${node.position}]`;
        positionLine += posStr.padEnd(8);
    });
    console.log(positionLine);
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Linked List Learning ===");
    
    // Step 1: Create a list
    console.log("\n1. Creating a linked list from array [10, 20, 30]:");
    const list = createLinkedList([10, 20, 30]);
    visualizeLinkedList(list, "Initial List");
    
    // Step 2: Explain structure
    console.log("\n2. Understanding the structure:");
    console.log("   - Each box represents a node");
    console.log("   - Each node contains data and a pointer to next node");
    console.log("   - The last node points to null");
    console.log("   - Numbers in brackets show positions (0-indexed)");
    
    // Step 3: Traversal
    console.log("\n3. Traversing the list:");
    let current = list;
    let step = 1;
    
    while (current !== null) {
        console.log(`   Step ${step}: Visit node with value ${current.val}`);
        if (current.next) {
            console.log(`             Follow pointer to next node`);
        } else {
            console.log(`             Reached end (next is null)`);
        }
        current = current.next;
        step++;
    }
    
    // Step 4: Operations
    console.log("\n4. Basic operations:");
    console.log(`   Length: ${getLength(list)}`);
    console.log(`   Element at index 1: ${getElementAt(list, 1)}`);
    console.log(`   Search for 20: ${JSON.stringify(searchValue(list, 20))}`);
    
    // Step 5: Memory concept
    console.log("\n5. Memory concept:");
    console.log("   Unlike arrays, linked list nodes can be anywhere in memory");
    console.log("   We find elements by following the chain of pointers");
    console.log("   This is why accessing by index takes O(n) time");
}

// ============= ADVANTAGES AND DISADVANTAGES =============

function advantagesAndDisadvantages() {
    console.log("\n=== Advantages and Disadvantages ===");
    
    console.log("\n✅ Advantages:");
    console.log("1. Dynamic Size: Can grow or shrink during runtime");
    console.log("2. Memory Efficiency: Allocates memory as needed");
    console.log("3. Insertion/Deletion: O(1) at the beginning");
    console.log("4. No Memory Waste: Uses exactly what's needed");
    console.log("5. Implementation: Relatively simple to implement");
    
    console.log("\n❌ Disadvantages:");
    console.log("1. No Random Access: Must traverse from head to reach element");
    console.log("2. Extra Memory: Each node needs space for pointer");
    console.log("3. Cache Performance: Poor due to non-contiguous memory");
    console.log("4. Reverse Traversal: Not possible in singly linked list");
    console.log("5. Memory Overhead: Pointer storage adds overhead");
}

// ============= WHEN TO USE LINKED LISTS =============

function whenToUse() {
    console.log("\n=== When to Use Linked Lists ===");
    
    console.log("\n🎯 Use Linked Lists When:");
    console.log("1. Size is unknown or varies significantly");
    console.log("2. Frequent insertions/deletions at the beginning");
    console.log("3. Memory is limited and you want to avoid waste");
    console.log("4. You don't need random access to elements");
    console.log("5. Implementing other data structures (stacks, queues)");
    
    console.log("\n🚫 Avoid Linked Lists When:");
    console.log("1. You need frequent random access by index");
    console.log("2. Memory is a critical constraint (pointer overhead)");
    console.log("3. Cache performance is important");
    console.log("4. You need to perform many mathematical operations");
    console.log("5. The size is known and relatively fixed");
    
    console.log("\n💡 Real-world Applications:");
    console.log("1. Music playlists (next/previous song)");
    console.log("2. Browser history (back/forward navigation)");
    console.log("3. Undo functionality in applications");
    console.log("4. Implementation of stacks and queues");
    console.log("5. Memory management in operating systems");
}

// ============= TEST CASES =============

function testLinkedListBasics() {
    console.log("\n=== Testing Linked List Basics ===");
    
    // Test 1: Empty list
    console.log("\n1. Testing empty list:");
    const emptyList = createLinkedList([]);
    console.log(`Empty list: ${displayLinkedList(emptyList)}`);
    console.log(`Length: ${getLength(emptyList)}`);
    
    // Test 2: Single element
    console.log("\n2. Testing single element:");
    const singleList = createLinkedList([42]);
    console.log(`Single element: ${displayLinkedList(singleList)}`);
    console.log(`Length: ${getLength(singleList)}`);
    
    // Test 3: Multiple elements
    console.log("\n3. Testing multiple elements:");
    const multiList = createLinkedList([1, 2, 3, 4, 5]);
    console.log(`Multiple elements: ${displayLinkedList(multiList)}`);
    console.log(`Length: ${getLength(multiList)}`);
    
    // Test 4: Different data types
    console.log("\n4. Testing different data types:");
    const mixedList = createLinkedList([1, 'hello', true, 3.14, null]);
    console.log(`Mixed types: ${displayLinkedList(mixedList)}`);
    
    // Test 5: Search operations
    console.log("\n5. Testing search operations:");
    const searchList = createLinkedList([10, 20, 30, 40, 50]);
    console.log(`List: ${displayLinkedList(searchList)}`);
    console.log(`Search 30: ${JSON.stringify(searchValue(searchList, 30))}`);
    console.log(`Search 100: ${JSON.stringify(searchValue(searchList, 100))}`);
    
    // Test 6: Access by index
    console.log("\n6. Testing access by index:");
    for (let i = 0; i < 7; i++) {
        const element = getElementAt(searchList, i);
        console.log(`Index ${i}: ${element}`);
    }
}

// ============= RUN ALL DEMONSTRATIONS =============

// Run all the educational content
console.log("🎓 LINKED LIST INTRODUCTION - BODHI DSA COURSE");
console.log("=" .repeat(60));

compareWithArrays();
explainLinkedListTypes();
explainMemoryLayout();
analyzeComplexity();
commonPatterns();
advantagesAndDisadvantages();
whenToUse();
practicalExamples();
interactiveLearning();
testLinkedListBasics();

// Export for use in other files
module.exports = {
    ListNode,
    createLinkedList,
    linkedListToArray,
    displayLinkedList,
    traverseLinkedList,
    getLength,
    getElementAt,
    searchValue,
    visualizeLinkedList,
    compareWithArrays,
    explainLinkedListTypes,
    analyzeComplexity,
    interactiveLearning
};
