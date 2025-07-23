/**
 * Design Linked List
 * Bodhi-DSA Course
 * 
 * Learn how to design and implement your own Linked List
 * This file contains complete implementation of a custom linked list class
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Basic Implementation) =============
class MyLinkedListBruteForce {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Get value at index
    get(index) {
        if (index < 0 || index >= this.size) return -1;
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }
    
    // Add node at head
    addAtHead(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.size++;
    }
    
    // Add node at tail
    addAtTail(val) {
        const newNode = new ListNode(val);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        this.size++;
    }
    
    // Add node at index
    addAtIndex(index, val) {
        if (index < 0 || index > this.size) return;
        
        if (index === 0) {
            this.addAtHead(val);
            return;
        }
        
        const newNode = new ListNode(val);
        let current = this.head;
        
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }
    
    // Delete node at index
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) return;
        
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        current.next = current.next.next;
        this.size--;
    }
    
    // Display the list
    display() {
        if (!this.head) return "Empty list";
        
        const values = [];
        let current = this.head;
        
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        
        return values.join(' -> ') + ' -> null';
    }
}

// ============= BETTER APPROACH (With Dummy Head) =============
class MyLinkedListBetter {
    constructor() {
        this.dummy = new ListNode(0); // Dummy head to simplify operations
        this.size = 0;
    }
    
    get(index) {
        if (index < 0 || index >= this.size) return -1;
        
        let current = this.dummy.next;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }
    
    addAtHead(val) {
        this.addAtIndex(0, val);
    }
    
    addAtTail(val) {
        this.addAtIndex(this.size, val);
    }
    
    addAtIndex(index, val) {
        if (index < 0 || index > this.size) return;
        
        let prev = this.dummy;
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        }
        
        const newNode = new ListNode(val, prev.next);
        prev.next = newNode;
        this.size++;
    }
    
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) return;
        
        let prev = this.dummy;
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        }
        
        prev.next = prev.next.next;
        this.size--;
    }
    
    display() {
        if (this.size === 0) return "Empty list";
        
        const values = [];
        let current = this.dummy.next;
        
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        
        return values.join(' -> ') + ' -> null';
    }
    
    getHead() {
        return this.dummy.next;
    }
}

// ============= OPTIMIZED APPROACH (With Tail Pointer) =============
class MyLinkedListOptimized {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    get(index) {
        if (index < 0 || index >= this.size) return -1;
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.val;
    }
    
    addAtHead(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        
        if (this.size === 0) {
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    addAtTail(val) {
        const newNode = new ListNode(val);
        
        if (this.size === 0) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    addAtIndex(index, val) {
        if (index < 0 || index > this.size) return;
        
        if (index === 0) {
            this.addAtHead(val);
            return;
        }
        
        if (index === this.size) {
            this.addAtTail(val);
            return;
        }
        
        const newNode = new ListNode(val);
        let current = this.head;
        
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }
    
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) return;
        
        if (index === 0) {
            this.head = this.head.next;
            if (this.size === 1) {
                this.tail = null;
            }
            this.size--;
            return;
        }
        
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        
        if (index === this.size - 1) {
            this.tail = current;
        }
        
        current.next = current.next.next;
        this.size--;
    }
    
    display() {
        if (!this.head) return "Empty list";
        
        const values = [];
        let current = this.head;
        
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        
        return values.join(' -> ') + ' -> null';
    }
    
    getSize() {
        return this.size;
    }
    
    isEmpty() {
        return this.size === 0;
    }
    
    getHead() {
        return this.head;
    }
    
    getTail() {
        return this.tail;
    }
}

// ============= ADVANCED IMPLEMENTATION (With Additional Features) =============
class AdvancedLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Basic operations
    get(index) {
        const node = this.getNodeAt(index);
        return node ? node.val : -1;
    }
    
    getNodeAt(index) {
        if (index < 0 || index >= this.size) return null;
        
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current;
    }
    
    addAtHead(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        
        if (this.size === 0) {
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    addAtTail(val) {
        const newNode = new ListNode(val);
        
        if (this.size === 0) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
    }
    
    addAtIndex(index, val) {
        if (index < 0 || index > this.size) return false;
        
        if (index === 0) {
            this.addAtHead(val);
            return true;
        }
        
        if (index === this.size) {
            this.addAtTail(val);
            return true;
        }
        
        const newNode = new ListNode(val);
        const prev = this.getNodeAt(index - 1);
        
        newNode.next = prev.next;
        prev.next = newNode;
        this.size++;
        
        return true;
    }
    
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) return false;
        
        if (index === 0) {
            this.head = this.head.next;
            if (this.size === 1) {
                this.tail = null;
            }
            this.size--;
            return true;
        }
        
        const prev = this.getNodeAt(index - 1);
        const nodeToDelete = prev.next;
        
        prev.next = nodeToDelete.next;
        
        if (index === this.size - 1) {
            this.tail = prev;
        }
        
        this.size--;
        return true;
    }
    
    // Additional utility methods
    contains(val) {
        let current = this.head;
        while (current) {
            if (current.val === val) return true;
            current = current.next;
        }
        return false;
    }
    
    indexOf(val) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.val === val) return index;
            current = current.next;
            index++;
        }
        
        return -1;
    }
    
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        
        return result;
    }
    
    fromArray(arr) {
        this.clear();
        for (const val of arr) {
            this.addAtTail(val);
        }
    }
    
    reverse() {
        if (this.size <= 1) return;
        
        let prev = null;
        let current = this.head;
        this.tail = this.head;
        
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
    }
    
    display() {
        if (!this.head) return "Empty list";
        
        const values = [];
        let current = this.head;
        
        while (current) {
            values.push(current.val);
            current = current.next;
        }
        
        return values.join(' -> ') + ' -> null';
    }
    
    getSize() {
        return this.size;
    }
    
    isEmpty() {
        return this.size === 0;
    }
}

// ============= HELPER FUNCTIONS =============

function compareImplementations() {
    console.log("\n=== Comparing Different Implementations ===");
    
    const implementations = [
        { name: "Brute Force", class: MyLinkedListBruteForce },
        { name: "With Dummy Head", class: MyLinkedListBetter },
        { name: "With Tail Pointer", class: MyLinkedListOptimized },
        { name: "Advanced", class: AdvancedLinkedList }
    ];
    
    implementations.forEach(impl => {
        console.log(`\n${impl.name} Implementation:`);
        const list = new impl.class();
        
        // Test basic operations
        console.time(`${impl.name} - Operations`);
        
        list.addAtHead(1);
        list.addAtTail(3);
        list.addAtIndex(1, 2);
        
        console.timeEnd(`${impl.name} - Operations`);
        console.log(`Result: ${list.display()}`);
        console.log(`Get index 1: ${list.get(1)}`);
    });
}

function demonstrateFeatures() {
    console.log("\n=== Demonstrating Advanced Features ===");
    
    const list = new AdvancedLinkedList();
    
    console.log("1. Building list from array [10, 20, 30, 40, 50]:");
    list.fromArray([10, 20, 30, 40, 50]);
    console.log(`List: ${list.display()}`);
    console.log(`Size: ${list.getSize()}`);
    
    console.log("\n2. Search operations:");
    console.log(`Contains 30: ${list.contains(30)}`);
    console.log(`Index of 40: ${list.indexOf(40)}`);
    console.log(`Contains 100: ${list.contains(100)}`);
    
    console.log("\n3. Insertion operations:");
    list.addAtHead(5);
    console.log(`After adding 5 at head: ${list.display()}`);
    
    list.addAtTail(60);
    console.log(`After adding 60 at tail: ${list.display()}`);
    
    list.addAtIndex(3, 25);
    console.log(`After adding 25 at index 3: ${list.display()}`);
    
    console.log("\n4. Deletion operations:");
    list.deleteAtIndex(0);
    console.log(`After deleting at index 0: ${list.display()}`);
    
    list.deleteAtIndex(list.getSize() - 1);
    console.log(`After deleting last element: ${list.display()}`);
    
    console.log("\n5. Reverse operation:");
    list.reverse();
    console.log(`After reversing: ${list.display()}`);
    
    console.log("\n6. Convert to array:");
    console.log(`Array representation: [${list.toArray().join(', ')}]`);
}

function visualizeOperations() {
    console.log("\n=== Visualizing Operations ===");
    
    const list = new MyLinkedListOptimized();
    
    console.log("Starting with empty list:");
    console.log(`List: ${list.display()}`);
    
    console.log("\n1. addAtHead(1):");
    list.addAtHead(1);
    console.log(`List: ${list.display()}`);
    console.log("   [1] -> null");
    console.log("   ↑head/tail");
    
    console.log("\n2. addAtTail(3):");
    list.addAtTail(3);
    console.log(`List: ${list.display()}`);
    console.log("   [1] -> [3] -> null");
    console.log("   ↑head   ↑tail");
    
    console.log("\n3. addAtIndex(1, 2):");
    list.addAtIndex(1, 2);
    console.log(`List: ${list.display()}`);
    console.log("   [1] -> [2] -> [3] -> null");
    console.log("   ↑head         ↑tail");
    
    console.log("\n4. get(1):");
    const value = list.get(1);
    console.log(`Value at index 1: ${value}`);
    console.log("   [1] -> [2] -> [3] -> null");
    console.log("           ↑");
    console.log("        index 1");
    
    console.log("\n5. deleteAtIndex(1):");
    list.deleteAtIndex(1);
    console.log(`List: ${list.display()}`);
    console.log("   [1] -> [3] -> null");
    console.log("   ↑head  ↑tail");
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const operations = [
        { name: "get(index)", complexity: "O(n)", reason: "Must traverse from head to index" },
        { name: "addAtHead(val)", complexity: "O(1)", reason: "Direct insertion at head" },
        { name: "addAtTail(val)", complexity: "O(1)*", reason: "O(1) with tail pointer, O(n) without" },
        { name: "addAtIndex(index, val)", complexity: "O(n)", reason: "Must traverse to index position" },
        { name: "deleteAtIndex(index)", complexity: "O(n)", reason: "Must traverse to index position" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Operation           | Complexity | Reason                           |");
    console.log("=".repeat(80));
    
    operations.forEach(op => {
        const name = op.name.padEnd(19);
        const complexity = op.complexity.padEnd(10);
        const reason = op.reason.padEnd(32);
        console.log(`| ${name} | ${complexity} | ${reason} |`);
    });
    
    console.log("=".repeat(80));
    console.log("* With tail pointer optimization");
}

function designPatterns() {
    console.log("\n=== Design Patterns Used ===");
    
    console.log("\n1. Dummy Head Pattern:");
    console.log("   - Simplifies edge cases in insertion/deletion");
    console.log("   - Eliminates special handling for head operations");
    console.log("   - Makes code more uniform and less error-prone");
    
    console.log("\n2. Tail Pointer Optimization:");
    console.log("   - Maintains reference to last node");
    console.log("   - Makes tail insertion O(1) instead of O(n)");
    console.log("   - Useful for queue implementations");
    
    console.log("\n3. Size Tracking:");
    console.log("   - Keeps count of elements");
    console.log("   - Enables O(1) size queries");
    console.log("   - Helps with bounds checking");
    
    console.log("\n4. Method Chaining (could be added):");
    console.log("   - Return 'this' from modification methods");
    console.log("   - Allows fluent interface: list.add(1).add(2).add(3)");
    console.log("   - Improves API usability");
}

// ============= TEST CASES =============

function testLinkedListDesign() {
    console.log("\n=== Testing Linked List Design ===");
    
    // Test all implementations
    const implementations = [
        { name: "Brute Force", class: MyLinkedListBruteForce },
        { name: "Better", class: MyLinkedListBetter },
        { name: "Optimized", class: MyLinkedListOptimized }
    ];
    
    implementations.forEach(impl => {
        console.log(`\n--- Testing ${impl.name} Implementation ---`);
        const list = new impl.class();
        
        // Test sequence
        console.log("1. Initial state:");
        console.log(`   ${list.display()}`);
        
        console.log("2. Add at head (1):");
        list.addAtHead(1);
        console.log(`   ${list.display()}`);
        
        console.log("3. Add at tail (3):");
        list.addAtTail(3);
        console.log(`   ${list.display()}`);
        
        console.log("4. Add at index 1 (2):");
        list.addAtIndex(1, 2);
        console.log(`   ${list.display()}`);
        
        console.log("5. Get element at index 1:");
        console.log(`   Value: ${list.get(1)}`);
        
        console.log("6. Delete at index 1:");
        list.deleteAtIndex(1);
        console.log(`   ${list.display()}`);
        
        console.log("7. Final state:");
        console.log(`   ${list.display()}`);
    });
}

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Design Your Own Linked List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Understand different implementation approaches");
    console.log("2. Learn about trade-offs between simplicity and efficiency");
    console.log("3. Practice designing data structure APIs");
    console.log("4. Explore optimization techniques");
    
    console.log("\n📝 Design Decisions:");
    console.log("1. Node Structure: What should each node contain?");
    console.log("2. Class Structure: What instance variables do we need?");
    console.log("3. API Design: What methods should we provide?");
    console.log("4. Error Handling: How do we handle invalid operations?");
    console.log("5. Optimizations: What can we do to improve performance?");
    
    console.log("\n🔧 Implementation Approaches:");
    console.log("1. Basic: Simple head pointer, traverse for everything");
    console.log("2. Dummy Head: Simplifies insertion/deletion logic");
    console.log("3. Tail Pointer: Optimizes tail operations");
    console.log("4. Advanced: Additional features and optimizations");
    
    demonstrateFeatures();
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 DESIGN LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(60));

compareImplementations();
visualizeOperations();
analyzePerformance();
designPatterns();
testLinkedListDesign();
interactiveLearning();

// Export classes and functions
module.exports = {
    ListNode,
    MyLinkedListBruteForce,
    MyLinkedListBetter,
    MyLinkedListOptimized,
    AdvancedLinkedList,
    compareImplementations,
    demonstrateFeatures,
    visualizeOperations,
    analyzePerformance,
    interactiveLearning
};
