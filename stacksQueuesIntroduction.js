/**
 * Introduction to Stacks & Queues
 * Bodhi-DSA Course
 * 
 * This file introduces the fundamental concepts of Stacks and Queues,
 * two essential linear data structures with different access patterns.
 * 
 * STACK: Last In, First Out (LIFO)
 * - Elements are added and removed from the same end (top)
 * - Like a stack of plates - you can only add/remove from the top
 * 
 * QUEUE: First In, First Out (FIFO)
 * - Elements are added at one end (rear) and removed from the other (front)
 * - Like a line of people - first person in line is first to be served
 */

// ============= STACK IMPLEMENTATION =============

class Stack {
    constructor() {
        this.items = [];
        this.size = 0;
    }
    
    // Push element to top of stack
    push(element) {
        this.items.push(element);
        this.size++;
        return this.size;
    }
    
    // Remove and return top element
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        this.size--;
        return this.items.pop();
    }
    
    // Return top element without removing
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }
    
    // Check if stack is empty
    isEmpty() {
        return this.size === 0;
    }
    
    // Get current size
    getSize() {
        return this.size;
    }
    
    // Clear all elements
    clear() {
        this.items = [];
        this.size = 0;
    }
    
    // Convert to array (for visualization)
    toArray() {
        return [...this.items];
    }
    
    // String representation
    toString() {
        return `Stack: [${this.items.join(', ')}] (top: ${this.peek()})`;
    }
}

// ============= QUEUE IMPLEMENTATION =============

class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }
    
    // Add element to rear of queue
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
        return this.getSize();
    }
    
    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }
    
    // Return front element without removing
    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.front];
    }
    
    // Check if queue is empty
    isEmpty() {
        return this.front === this.rear;
    }
    
    // Get current size
    getSize() {
        return this.rear - this.front;
    }
    
    // Clear all elements
    clear() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }
    
    // Convert to array (for visualization)
    toArray() {
        const result = [];
        for (let i = this.front; i < this.rear; i++) {
            result.push(this.items[i]);
        }
        return result;
    }
    
    // String representation
    toString() {
        const elements = this.toArray();
        return `Queue: [${elements.join(', ')}] (front: ${elements[0] || 'empty'})`;
    }
}

// ============= OPTIMIZED QUEUE (Circular Array) =============

class CircularQueue {
    constructor(capacity = 10) {
        this.items = new Array(capacity);
        this.capacity = capacity;
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }
    
    enqueue(element) {
        if (this.isFull()) {
            throw new Error("Queue is full");
        }
        
        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
        }
        
        this.items[this.rear] = element;
        this.size++;
        return this.size;
    }
    
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        
        const item = this.items[this.front];
        this.items[this.front] = undefined;
        
        if (this.size === 1) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }
        
        this.size--;
        return item;
    }
    
    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.front];
    }
    
    isEmpty() {
        return this.size === 0;
    }
    
    isFull() {
        return this.size === this.capacity;
    }
    
    getSize() {
        return this.size;
    }
    
    getCapacity() {
        return this.capacity;
    }
}

// ============= DEQUE (Double-Ended Queue) =============

class Deque {
    constructor() {
        this.items = [];
    }
    
    // Add to front
    addFront(element) {
        this.items.unshift(element);
        return this.items.length;
    }
    
    // Add to rear
    addRear(element) {
        this.items.push(element);
        return this.items.length;
    }
    
    // Remove from front
    removeFront() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        return this.items.shift();
    }
    
    // Remove from rear
    removeRear() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        return this.items.pop();
    }
    
    // Peek front
    peekFront() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        return this.items[0];
    }
    
    // Peek rear
    peekRear() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    getSize() {
        return this.items.length;
    }
    
    toArray() {
        return [...this.items];
    }
}

// ============= PRACTICAL APPLICATIONS =============

// Undo/Redo functionality using stacks
class UndoRedoManager {
    constructor() {
        this.undoStack = new Stack();
        this.redoStack = new Stack();
    }
    
    executeAction(action) {
        this.undoStack.push(action);
        this.redoStack.clear(); // Clear redo stack when new action is performed
        console.log(`Executed: ${action}`);
    }
    
    undo() {
        if (this.undoStack.isEmpty()) {
            console.log("Nothing to undo");
            return null;
        }
        
        const action = this.undoStack.pop();
        this.redoStack.push(action);
        console.log(`Undid: ${action}`);
        return action;
    }
    
    redo() {
        if (this.redoStack.isEmpty()) {
            console.log("Nothing to redo");
            return null;
        }
        
        const action = this.redoStack.pop();
        this.undoStack.push(action);
        console.log(`Redid: ${action}`);
        return action;
    }
    
    getHistory() {
        return {
            undoStack: this.undoStack.toArray(),
            redoStack: this.redoStack.toArray()
        };
    }
}

// Browser history using stacks
class BrowserHistory {
    constructor() {
        this.backStack = new Stack();
        this.forwardStack = new Stack();
        this.currentPage = null;
    }
    
    visit(url) {
        if (this.currentPage) {
            this.backStack.push(this.currentPage);
        }
        this.currentPage = url;
        this.forwardStack.clear();
        console.log(`Visited: ${url}`);
    }
    
    back() {
        if (this.backStack.isEmpty()) {
            console.log("No pages to go back to");
            return this.currentPage;
        }
        
        this.forwardStack.push(this.currentPage);
        this.currentPage = this.backStack.pop();
        console.log(`Went back to: ${this.currentPage}`);
        return this.currentPage;
    }
    
    forward() {
        if (this.forwardStack.isEmpty()) {
            console.log("No pages to go forward to");
            return this.currentPage;
        }
        
        this.backStack.push(this.currentPage);
        this.currentPage = this.forwardStack.pop();
        console.log(`Went forward to: ${this.currentPage}`);
        return this.currentPage;
    }
    
    getCurrentPage() {
        return this.currentPage;
    }
}

// Task scheduler using queue
class TaskScheduler {
    constructor() {
        this.taskQueue = new Queue();
        this.isProcessing = false;
    }
    
    addTask(task) {
        this.taskQueue.enqueue(task);
        console.log(`Task added: ${task}`);
        
        if (!this.isProcessing) {
            this.processTasks();
        }
    }
    
    async processTasks() {
        this.isProcessing = true;
        
        while (!this.taskQueue.isEmpty()) {
            const task = this.taskQueue.dequeue();
            console.log(`Processing task: ${task}`);
            
            // Simulate task processing time
            await new Promise(resolve => setTimeout(resolve, 100));
            
            console.log(`Completed task: ${task}`);
        }
        
        this.isProcessing = false;
        console.log("All tasks completed");
    }
    
    getPendingTasks() {
        return this.taskQueue.toArray();
    }
    
    getQueueSize() {
        return this.taskQueue.getSize();
    }
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeStackOperations() {
    console.log("\n=== Stack Operations Visualization ===");
    
    const stack = new Stack();
    
    console.log("Initial state:", stack.toString());
    
    // Push operations
    console.log("\nPush operations:");
    [1, 2, 3, 4, 5].forEach(num => {
        stack.push(num);
        console.log(`After push(${num}):`, stack.toString());
    });
    
    // Pop operations
    console.log("\nPop operations:");
    while (!stack.isEmpty()) {
        const popped = stack.pop();
        console.log(`Popped ${popped}:`, stack.isEmpty() ? "Stack is empty" : stack.toString());
    }
}

function visualizeQueueOperations() {
    console.log("\n=== Queue Operations Visualization ===");
    
    const queue = new Queue();
    
    console.log("Initial state:", queue.toString());
    
    // Enqueue operations
    console.log("\nEnqueue operations:");
    ['A', 'B', 'C', 'D', 'E'].forEach(item => {
        queue.enqueue(item);
        console.log(`After enqueue(${item}):`, queue.toString());
    });
    
    // Dequeue operations
    console.log("\nDequeue operations:");
    while (!queue.isEmpty()) {
        const dequeued = queue.dequeue();
        console.log(`Dequeued ${dequeued}:`, queue.isEmpty() ? "Queue is empty" : queue.toString());
    }
}

function demonstrateStackVsQueue() {
    console.log("\n=== Stack vs Queue Comparison ===");
    
    const stack = new Stack();
    const queue = new Queue();
    const data = [1, 2, 3, 4, 5];
    
    // Add same data to both
    console.log("Adding data [1, 2, 3, 4, 5] to both structures:");
    data.forEach(num => {
        stack.push(num);
        queue.enqueue(num);
    });
    
    console.log("Stack:", stack.toString());
    console.log("Queue:", queue.toString());
    
    // Remove all elements
    console.log("\nRemoving all elements:");
    console.log("Stack (LIFO):", []);
    while (!stack.isEmpty()) {
        process.stdout.write(stack.pop() + " ");
    }
    
    console.log("\nQueue (FIFO):", []);
    while (!queue.isEmpty()) {
        process.stdout.write(queue.dequeue() + " ");
    }
    console.log();
}

function demonstrateCircularQueue() {
    console.log("\n=== Circular Queue Demonstration ===");
    
    const cq = new CircularQueue(5);
    
    console.log("Adding elements to circular queue (capacity: 5):");
    [1, 2, 3, 4, 5].forEach(num => {
        cq.enqueue(num);
        console.log(`After enqueue(${num}): size=${cq.getSize()}, front=${cq.peek()}`);
    });
    
    console.log("\nRemoving 2 elements:");
    console.log(`Dequeued: ${cq.dequeue()}`);
    console.log(`Dequeued: ${cq.dequeue()}`);
    
    console.log("\nAdding 2 more elements (demonstrating circular nature):");
    cq.enqueue(6);
    cq.enqueue(7);
    console.log(`Current size: ${cq.getSize()}, front: ${cq.peek()}`);
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const operations = [
        { structure: "Stack", push: "O(1)", pop: "O(1)", peek: "O(1)", search: "O(n)" },
        { structure: "Queue", enqueue: "O(1)", dequeue: "O(1)", peek: "O(1)", search: "O(n)" },
        { structure: "Circular Queue", enqueue: "O(1)", dequeue: "O(1)", peek: "O(1)", search: "O(n)" },
        { structure: "Deque", addFront: "O(1)", addRear: "O(1)", removeFront: "O(1)", removeRear: "O(1)" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Structure      | Insert | Delete | Peek | Search |");
    console.log("=".repeat(80));
    
    operations.forEach(op => {
        const structure = op.structure.padEnd(14);
        const insert = (op.push || op.enqueue || op.addFront || 'O(1)').padEnd(6);
        const remove = (op.pop || op.dequeue || op.removeFront || 'O(1)').padEnd(6);
        const peek = op.peek.padEnd(4);
        const search = op.search.padEnd(6);
        console.log(`| ${structure} | ${insert} | ${remove} | ${peek} | ${search} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log("\n💡 Key Insights:");
    console.log("• All basic operations are O(1) - constant time");
    console.log("• Search requires O(n) - linear traversal");
    console.log("• Circular queue prevents memory waste");
    console.log("• Deque provides flexibility for both ends");
}

// ============= PRACTICAL APPLICATIONS DEMO =============

function demonstratePracticalApplications() {
    console.log("\n=== Practical Applications Demo ===");
    
    // Undo/Redo system
    console.log("\n1. Undo/Redo System:");
    const undoRedo = new UndoRedoManager();
    undoRedo.executeAction("Type 'Hello'");
    undoRedo.executeAction("Type ' World'");
    undoRedo.executeAction("Bold text");
    undoRedo.undo();
    undoRedo.undo();
    undoRedo.redo();
    
    // Browser history
    console.log("\n2. Browser History:");
    const browser = new BrowserHistory();
    browser.visit("google.com");
    browser.visit("stackoverflow.com");
    browser.visit("github.com");
    browser.back();
    browser.back();
    browser.forward();
    
    // Task scheduler
    console.log("\n3. Task Scheduler:");
    const scheduler = new TaskScheduler();
    scheduler.addTask("Send email");
    scheduler.addTask("Process payment");
    scheduler.addTask("Update database");
}

// ============= COMMON PATTERNS AND ALGORITHMS =============

function demonstrateCommonPatterns() {
    console.log("\n=== Common Stack/Queue Patterns ===");
    
    // 1. Balanced parentheses check
    function isBalanced(str) {
        const stack = new Stack();
        const pairs = { '(': ')', '[': ']', '{': '}' };
        
        for (let char of str) {
            if (char in pairs) {
                stack.push(char);
            } else if (Object.values(pairs).includes(char)) {
                if (stack.isEmpty() || pairs[stack.pop()] !== char) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
    
    console.log("\n1. Balanced Parentheses:");
    const testStrings = ["()", "()[]{}", "(]", "([)]", "{[]}"];
    testStrings.forEach(str => {
        console.log(`"${str}" is ${isBalanced(str) ? 'balanced' : 'not balanced'}`);
    });
    
    // 2. Reverse string using stack
    function reverseString(str) {
        const stack = new Stack();
        
        // Push all characters
        for (let char of str) {
            stack.push(char);
        }
        
        // Pop all characters
        let reversed = '';
        while (!stack.isEmpty()) {
            reversed += stack.pop();
        }
        
        return reversed;
    }
    
    console.log("\n2. String Reversal:");
    const testStr = "Hello World";
    console.log(`"${testStr}" reversed is "${reverseString(testStr)}"`);
    
    // 3. Level-order traversal simulation
    function simulateLevelOrder(tree) {
        if (!tree) return [];
        
        const queue = new Queue();
        const result = [];
        
        queue.enqueue(tree);
        
        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            result.push(node.value);
            
            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
        }
        
        return result;
    }
    
    console.log("\n3. Level-order Traversal Pattern:");
    const sampleTree = {
        value: 1,
        left: { value: 2, left: { value: 4 }, right: { value: 5 } },
        right: { value: 3, left: { value: 6 }, right: { value: 7 } }
    };
    console.log("Tree traversal:", simulateLevelOrder(sampleTree));
}

// ============= TEST CASES =============

function testStacksAndQueues() {
    console.log("\n=== Testing Stacks and Queues ===");
    
    // Test Stack
    console.log("\n--- Stack Tests ---");
    const stack = new Stack();
    
    try {
        // Test empty stack
        console.log("Empty stack size:", stack.getSize());
        console.log("Is empty:", stack.isEmpty());
        
        // Test push operations
        [1, 2, 3].forEach(num => stack.push(num));
        console.log("After pushing [1,2,3]:", stack.toArray());
        console.log("Top element:", stack.peek());
        console.log("Size:", stack.getSize());
        
        // Test pop operations
        console.log("Popped:", stack.pop());
        console.log("After pop:", stack.toArray());
        
        console.log("✅ Stack tests passed");
    } catch (error) {
        console.log("❌ Stack test failed:", error.message);
    }
    
    // Test Queue
    console.log("\n--- Queue Tests ---");
    const queue = new Queue();
    
    try {
        // Test empty queue
        console.log("Empty queue size:", queue.getSize());
        console.log("Is empty:", queue.isEmpty());
        
        // Test enqueue operations
        ['A', 'B', 'C'].forEach(item => queue.enqueue(item));
        console.log("After enqueuing [A,B,C]:", queue.toArray());
        console.log("Front element:", queue.peek());
        console.log("Size:", queue.getSize());
        
        // Test dequeue operations
        console.log("Dequeued:", queue.dequeue());
        console.log("After dequeue:", queue.toArray());
        
        console.log("✅ Queue tests passed");
    } catch (error) {
        console.log("❌ Queue test failed:", error.message);
    }
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 STACKS & QUEUES INTRODUCTION - BODHI DSA COURSE");
console.log("=" .repeat(55));

analyzePerformance();
visualizeStackOperations();
visualizeQueueOperations();
demonstrateStackVsQueue();
demonstrateCircularQueue();
demonstrateCommonPatterns();
demonstratePracticalApplications();
testStacksAndQueues();

// Export classes and functions
module.exports = {
    Stack,
    Queue,
    CircularQueue,
    Deque,
    UndoRedoManager,
    BrowserHistory,
    TaskScheduler,
    visualizeStackOperations,
    visualizeQueueOperations,
    demonstrateStackVsQueue,
    analyzePerformance
};
