/**
 * Implement Queue using Two Stacks
 * Bodhi-DSA Course
 * 
 * Problem: Design a queue that supports enqueue, dequeue, peek, and empty operations using only two stacks.
 * 
 * Key Insight: Since stacks are LIFO and queues are FIFO, we need to reverse the order twice.
 * We can achieve this by using two stacks - one for input and one for output.
 * 
 * Approaches:
 * 1. Make enqueue operation costly - O(n) enqueue, O(1) dequeue
 * 2. Make dequeue operation costly - O(1) enqueue, O(n) dequeue (amortized O(1))
 */

// Basic Stack implementation for our queue
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }
    
    top() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    toArray() {
        return [...this.items];
    }
    
    clear() {
        this.items = [];
    }
}

// ============= APPROACH 1: COSTLY ENQUEUE =============
// Time Complexity: Enqueue O(n), Dequeue O(1), Peek O(1)
// Space Complexity: O(n)

class QueueUsingTwoStacksCostlyEnqueue {
    constructor() {
        this.stack1 = new Stack(); // Main stack (for dequeue)
        this.stack2 = new Stack(); // Helper stack
        this.queueSize = 0;
    }
    
    // Enqueue operation - O(n)
    enqueue(element) {
        console.log(`\n📥 Enqueuing ${element} (Costly Enqueue Approach)`);
        console.log(`Before: S1=[${this.stack1.toArray().join(', ')}], S2=[${this.stack2.toArray().join(', ')}]`);
        
        // Step 1: Move all elements from stack1 to stack2
        console.log(`Step 1: Move all elements from S1 to S2:`);
        while (!this.stack1.isEmpty()) {
            const item = this.stack1.pop();
            this.stack2.push(item);
            console.log(`  Move ${item}: S1=[${this.stack1.toArray().join(', ')}], S2=[${this.stack2.toArray().join(', ')}]`);
        }
        
        // Step 2: Push new element to stack1
        this.stack1.push(element);
        console.log(`Step 2: Push ${element} to S1: S1=[${this.stack1.toArray().join(', ')}]`);
        
        // Step 3: Move all elements back from stack2 to stack1
        console.log(`Step 3: Move all elements from S2 back to S1:`);
        while (!this.stack2.isEmpty()) {
            const item = this.stack2.pop();
            this.stack1.push(item);
            console.log(`  Move ${item}: S1=[${this.stack1.toArray().join(', ')}], S2=[${this.stack2.toArray().join(', ')}]`);
        }
        
        this.queueSize++;
        
        console.log(`After: S1=[${this.stack1.toArray().join(', ')}], S2=[${this.stack2.toArray().join(', ')}] (size: ${this.queueSize})`);
        console.log(`💡 New element ${element} is now at bottom of S1 for FIFO order`);
    }
    
    // Dequeue operation - O(1)
    dequeue() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot dequeue: Queue is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Dequeuing (Costly Enqueue Approach)`);
        console.log(`Before: S1=[${this.stack1.toArray().join(', ')}], S2=[${this.stack2.toArray().join(', ')}]`);
        
        const dequeued = this.stack1.pop();
        this.queueSize--;
        
        console.log(`After: S1=[${this.stack1.toArray().join(', ')}], S2=[${this.stack2.toArray().join(', ')}] (size: ${this.queueSize})`);
        console.log(`💡 Simply pop from S1 - O(1) operation`);
        
        return dequeued;
    }
    
    // Peek operation - O(1)
    peek() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot peek: Queue is empty`);
            return undefined;
        }
        
        const frontElement = this.stack1.top();
        console.log(`\n👀 Front element: ${frontElement} (O(1) operation)`);
        return frontElement;
    }
    
    // Check if empty
    isEmpty() {
        return this.queueSize === 0;
    }
    
    // Get size
    size() {
        return this.queueSize;
    }
    
    // Display current state
    display() {
        console.log(`\n📊 Queue State (Costly Enqueue):`);
        console.log(`Queue elements (front to rear): [${this.stack1.toArray().reverse().join(', ')}]`);
        console.log(`Stack1: [${this.stack1.toArray().join(', ')}] ← top`);
        console.log(`Stack2: [${this.stack2.toArray().join(', ')}] ← top`);
        console.log(`Size: ${this.queueSize}, Empty: ${this.isEmpty()}`);
    }
}

// ============= APPROACH 2: COSTLY DEQUEUE (OPTIMAL) =============
// Time Complexity: Enqueue O(1), Dequeue O(n) worst case, O(1) amortized
// Space Complexity: O(n)

class QueueUsingTwoStacksCostlyDequeue {
    constructor() {
        this.inStack = new Stack();  // For enqueue operations
        this.outStack = new Stack(); // For dequeue operations
        this.queueSize = 0;
    }
    
    // Enqueue operation - O(1)
    enqueue(element) {
        console.log(`\n📥 Enqueuing ${element} (Costly Dequeue Approach)`);
        console.log(`Before: InStack=[${this.inStack.toArray().join(', ')}], OutStack=[${this.outStack.toArray().join(', ')}]`);
        
        // Simply push to input stack
        this.inStack.push(element);
        this.queueSize++;
        
        console.log(`After: InStack=[${this.inStack.toArray().join(', ')}], OutStack=[${this.outStack.toArray().join(', ')}] (size: ${this.queueSize})`);
        console.log(`💡 Simply push to InStack - O(1) operation`);
    }
    
    // Dequeue operation - O(n) worst case, O(1) amortized
    dequeue() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot dequeue: Queue is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Dequeuing (Costly Dequeue Approach)`);
        console.log(`Before: InStack=[${this.inStack.toArray().join(', ')}], OutStack=[${this.outStack.toArray().join(', ')}]`);
        
        // If output stack is empty, transfer all elements from input stack
        if (this.outStack.isEmpty()) {
            console.log(`OutStack is empty, transferring from InStack:`);
            
            while (!this.inStack.isEmpty()) {
                const item = this.inStack.pop();
                this.outStack.push(item);
                console.log(`  Transfer ${item}: InStack=[${this.inStack.toArray().join(', ')}], OutStack=[${this.outStack.toArray().join(', ')}]`);
            }
        }
        
        // Pop from output stack
        const dequeued = this.outStack.pop();
        this.queueSize--;
        
        console.log(`After: InStack=[${this.inStack.toArray().join(', ')}], OutStack=[${this.outStack.toArray().join(', ')}] (size: ${this.queueSize})`);
        console.log(`💡 ${this.outStack.isEmpty() && !this.inStack.isEmpty() ? 'Transferred elements then' : 'Simply'} popped from OutStack`);
        
        return dequeued;
    }
    
    // Peek operation - O(n) worst case, O(1) amortized
    peek() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot peek: Queue is empty`);
            return undefined;
        }
        
        console.log(`\n👀 Peeking front element (Costly Dequeue Approach)`);
        
        // If output stack is empty, transfer all elements from input stack
        if (this.outStack.isEmpty()) {
            console.log(`OutStack is empty, transferring from InStack for peek:`);
            
            while (!this.inStack.isEmpty()) {
                const item = this.inStack.pop();
                this.outStack.push(item);
                console.log(`  Transfer ${item}: OutStack=[${this.outStack.toArray().join(', ')}]`);
            }
        }
        
        const frontElement = this.outStack.top();
        console.log(`Front element: ${frontElement}`);
        return frontElement;
    }
    
    // Check if empty
    isEmpty() {
        return this.queueSize === 0;
    }
    
    // Get size
    size() {
        return this.queueSize;
    }
    
    // Display current state
    display() {
        console.log(`\n📊 Queue State (Costly Dequeue):`);
        
        // Reconstruct queue order for display
        const queueOrder = [...this.outStack.toArray()].reverse().concat(this.inStack.toArray());
        console.log(`Queue elements (front to rear): [${queueOrder.join(', ')}]`);
        console.log(`InStack:  [${this.inStack.toArray().join(', ')}] ← top (newest)`);
        console.log(`OutStack: [${this.outStack.toArray().join(', ')}] ← top (oldest)`);
        console.log(`Size: ${this.queueSize}, Empty: ${this.isEmpty()}`);
    }
}

// ============= OPTIMIZED APPROACH (Single Stack with Recursion) =============
// Using recursion to simulate queue behavior with just one stack

class QueueUsingOneStackRecursive {
    constructor() {
        this.stack = new Stack();
        this.queueSize = 0;
    }
    
    // Enqueue operation - O(1)
    enqueue(element) {
        this.stack.push(element);
        this.queueSize++;
        console.log(`\n📥 Enqueued ${element} to single stack`);
    }
    
    // Dequeue operation - O(n)
    dequeue() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot dequeue: Queue is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Dequeuing using recursion`);
        const result = this.dequeueRecursive();
        this.queueSize--;
        return result;
    }
    
    dequeueRecursive() {
        // Base case: if only one element, return it
        if (this.stack.size() === 1) {
            return this.stack.pop();
        }
        
        // Recursive case: remove top, recurse, then put it back
        const item = this.stack.pop();
        const result = this.dequeueRecursive();
        this.stack.push(item);
        
        return result;
    }
    
    // Peek operation - O(n)
    peek() {
        if (this.isEmpty()) return undefined;
        
        return this.peekRecursive();
    }
    
    peekRecursive() {
        if (this.stack.size() === 1) {
            return this.stack.top();
        }
        
        const item = this.stack.pop();
        const result = this.peekRecursive();
        this.stack.push(item);
        
        return result;
    }
    
    isEmpty() {
        return this.queueSize === 0;
    }
    
    size() {
        return this.queueSize;
    }
    
    display() {
        console.log(`\n📊 Queue State (Single Stack Recursive):`);
        console.log(`Stack: [${this.stack.toArray().join(', ')}] ← top`);
        console.log(`Size: ${this.queueSize}, Empty: ${this.isEmpty()}`);
    }
}

// ============= COMPARISON AND ANALYSIS =============

function compareApproaches() {
    console.log(`\n🆚 Comparing Queue Implementation Approaches`);
    
    console.log(`\n1. Costly Enqueue Approach:`);
    console.log(`   ✅ Enqueue: O(n) - Transfer all elements twice`);
    console.log(`   ✅ Dequeue: O(1) - Simply pop from main stack`);
    console.log(`   ✅ Peek:    O(1) - Simply peek at main stack`);
    console.log(`   📝 Best when: More dequeues than enqueues`);
    
    console.log(`\n2. Costly Dequeue Approach (OPTIMAL):`);
    console.log(`   ✅ Enqueue: O(1) - Simply push to input stack`);
    console.log(`   ✅ Dequeue: O(n) worst, O(1) amortized - Transfer when needed`);
    console.log(`   ✅ Peek:    O(n) worst, O(1) amortized - Transfer when needed`);
    console.log(`   📝 Best when: More enqueues than dequeues (most common)`);
    
    console.log(`\n3. Single Stack Recursive:`);
    console.log(`   ✅ Enqueue: O(1) - Simply push`);
    console.log(`   ✅ Dequeue: O(n) - Recursive traversal`);
    console.log(`   ✅ Peek:    O(n) - Recursive traversal`);
    console.log(`   📝 Space efficient but slower operations`);
    
    const approaches = [
        { name: "Costly Enqueue", enqueue: "O(n)", dequeue: "O(1)", peek: "O(1)", space: "O(n)" },
        { name: "Costly Dequeue", enqueue: "O(1)", dequeue: "O(1)*", peek: "O(1)*", space: "O(n)" },
        { name: "Single Stack", enqueue: "O(1)", dequeue: "O(n)", peek: "O(n)", space: "O(n)" }
    ];
    
    console.log(`\n📊 Complexity Comparison:`);
    console.log("=".repeat(75));
    console.log("| Approach       | Enqueue | Dequeue | Peek    | Space |");
    console.log("=".repeat(75));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(14);
        const enqueue = approach.enqueue.padEnd(7);
        const dequeue = approach.dequeue.padEnd(7);
        const peek = approach.peek.padEnd(7);
        const space = approach.space.padEnd(5);
        console.log(`| ${name} | ${enqueue} | ${dequeue} | ${peek} | ${space} |`);
    });
    
    console.log("=".repeat(75));
    console.log("* Amortized complexity");
    
    console.log(`\n🏆 Winner: Costly Dequeue Approach`);
    console.log(`• O(1) amortized for all operations`);
    console.log(`• Most practical for real-world usage`);
    console.log(`• Each element is moved at most twice`);
    console.log(`• Optimal balance between operations`);
}

// ============= AMORTIZED ANALYSIS EXPLANATION =============

function explainAmortizedAnalysis() {
    console.log(`\n📈 Amortized Analysis - Why Costly Dequeue is O(1)`);
    
    console.log(`\n🔍 Key Insight:`);
    console.log(`Each element is moved from InStack to OutStack exactly once.`);
    console.log(`After that, it can be dequeued in O(1) time.`);
    
    console.log(`\n📊 Example with 5 enqueues followed by 5 dequeues:`);
    
    const queue = new QueueUsingTwoStacksCostlyDequeue();
    
    // Enqueue operations
    console.log(`\n=== Enqueue Phase ===`);
    [1, 2, 3, 4, 5].forEach(num => {
        console.log(`Enqueue ${num}: InStack=[${queue.inStack.toArray().join(', ')}]`);
        queue.inStack.push(num);
        queue.queueSize++;
    });
    
    console.log(`\n=== Dequeue Phase ===`);
    console.log(`First dequeue: Need to transfer all elements`);
    console.log(`InStack=[5,4,3,2,1] → OutStack=[1,2,3,4,5]`);
    console.log(`Cost: 5 operations (transfer) + 1 operation (dequeue) = 6 operations`);
    
    console.log(`\nSubsequent dequeues: Just pop from OutStack`);
    console.log(`Dequeue 2: 1 operation`);
    console.log(`Dequeue 3: 1 operation`);
    console.log(`Dequeue 4: 1 operation`);
    console.log(`Dequeue 5: 1 operation`);
    
    console.log(`\n📈 Total Analysis:`);
    console.log(`Total operations: 5 (enqueues) + 6 (first dequeue) + 4 (remaining dequeues) = 15`);
    console.log(`Average per operation: 15 ÷ 10 = 1.5 operations`);
    console.log(`As n grows larger, this approaches O(1) amortized`);
    
    console.log(`\n💡 Why it's amortized O(1):`);
    console.log(`• Each element is transferred at most once`);
    console.log(`• Transfer cost is "amortized" across multiple dequeues`);
    console.log(`• Long-term average is constant time per operation`);
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeCostlyEnqueueDemo() {
    console.log(`\n🎬 Costly Enqueue Approach Demo`);
    
    const queue = new QueueUsingTwoStacksCostlyEnqueue();
    
    // Enqueue operations
    queue.enqueue('A');
    queue.enqueue('B');
    queue.enqueue('C');
    queue.display();
    
    // Dequeue operations
    console.log(`\nDequeued: ${queue.dequeue()}`);
    console.log(`Dequeued: ${queue.dequeue()}`);
    queue.display();
    
    // Peek operation
    queue.peek();
}

function visualizeCostlyDequeueDemo() {
    console.log(`\n🎬 Costly Dequeue Approach Demo`);
    
    const queue = new QueueUsingTwoStacksCostlyDequeue();
    
    // Enqueue operations
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.display();
    
    // First dequeue (triggers transfer)
    console.log(`\nFirst dequeue (will trigger transfer):`);
    console.log(`Dequeued: ${queue.dequeue()}`);
    queue.display();
    
    // Subsequent dequeues (no transfer needed)
    console.log(`\nSubsequent dequeues (no transfer needed):`);
    console.log(`Dequeued: ${queue.dequeue()}`);
    queue.display();
    
    // Mix enqueue and dequeue
    console.log(`\nMix operations:`);
    queue.enqueue(4);
    queue.enqueue(5);
    queue.display();
    
    console.log(`Dequeued: ${queue.dequeue()}`); // From OutStack
    console.log(`Dequeued: ${queue.dequeue()}`); // Will trigger transfer again
    queue.display();
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Task Scheduling Systems:**`);
    console.log(`   - Operating system process queues`);
    console.log(`   - Print job management`);
    
    console.log(`\n2. **Breadth-First Search:**`);
    console.log(`   - Graph traversal algorithms`);
    console.log(`   - Level-order tree traversal`);
    
    console.log(`\n3. **Buffer Management:**`);
    console.log(`   - IO operations buffering`);
    console.log(`   - Network packet queuing`);
    
    console.log(`\n4. **Real-time Systems:**`);
    console.log(`   - Event handling queues`);
    console.log(`   - Message passing systems`);
    
    // Example: Print job queue
    console.log(`\n📱 Example: Print Job Queue`);
    
    class PrintJobQueue {
        constructor() {
            this.queue = new QueueUsingTwoStacksCostlyDequeue();
            this.jobId = 1;
        }
        
        addJob(document, pages = 1) {
            const job = {
                id: this.jobId++,
                document: document,
                pages: pages,
                timestamp: new Date().toLocaleTimeString()
            };
            
            this.queue.enqueue(job);
            console.log(`📄 Added job ${job.id}: "${document}" (${pages} pages)`);
        }
        
        processNextJob() {
            if (this.queue.isEmpty()) {
                console.log(`📭 No jobs in queue`);
                return null;
            }
            
            const job = this.queue.dequeue();
            console.log(`🖨️  Processing job ${job.id}: "${job.document}" (${job.pages} pages)`);
            return job;
        }
        
        peekNextJob() {
            if (this.queue.isEmpty()) {
                console.log(`📭 No jobs in queue`);
                return null;
            }
            
            const job = this.queue.peek();
            console.log(`👀 Next job: ${job.id} - "${job.document}" (${job.pages} pages)`);
            return job;
        }
        
        getQueueSize() {
            return this.queue.size();
        }
    }
    
    const printer = new PrintJobQueue();
    printer.addJob("Report.pdf", 10);
    printer.addJob("Presentation.pptx", 25);
    printer.addJob("Invoice.doc", 2);
    
    console.log(`\nQueue size: ${printer.getQueueSize()}`);
    printer.peekNextJob();
    printer.processNextJob();
    printer.processNextJob();
    console.log(`Remaining jobs: ${printer.getQueueSize()}`);
}

// ============= PERFORMANCE TESTING =============

function performanceTesting() {
    console.log(`\n⚡ Performance Testing`);
    
    const testSize = 1000;
    
    // Test Costly Enqueue approach
    console.log(`\n📊 Testing Costly Enqueue (${testSize} operations):`);
    const costlyEnqueueQueue = new QueueUsingTwoStacksCostlyEnqueue();
    
    console.time('Costly Enqueue - Enqueue operations');
    for (let i = 0; i < testSize; i++) {
        costlyEnqueueQueue.enqueue(i);
    }
    console.timeEnd('Costly Enqueue - Enqueue operations');
    
    console.time('Costly Enqueue - Dequeue operations');
    for (let i = 0; i < testSize; i++) {
        costlyEnqueueQueue.dequeue();
    }
    console.timeEnd('Costly Enqueue - Dequeue operations');
    
    // Test Costly Dequeue approach
    console.log(`\n📊 Testing Costly Dequeue (${testSize} operations):`);
    const costlyDequeueQueue = new QueueUsingTwoStacksCostlyDequeue();
    
    console.time('Costly Dequeue - Enqueue operations');
    for (let i = 0; i < testSize; i++) {
        costlyDequeueQueue.enqueue(i);
    }
    console.timeEnd('Costly Dequeue - Enqueue operations');
    
    console.time('Costly Dequeue - Dequeue operations');
    for (let i = 0; i < testSize; i++) {
        costlyDequeueQueue.dequeue();
    }
    console.timeEnd('Costly Dequeue - Dequeue operations');
    
    console.log(`\n💡 Performance Insights:`);
    console.log(`• Costly Enqueue: Slow enqueues, fast dequeues`);
    console.log(`• Costly Dequeue: Fast enqueues, amortized fast dequeues`);
    console.log(`• Costly Dequeue is generally preferred in practice`);
}

// ============= TEST CASES =============

function testQueueImplementations() {
    console.log(`\n🧪 Testing Queue Implementations`);
    
    const testCases = [
        { operation: 'enqueue', value: 1 },
        { operation: 'enqueue', value: 2 },
        { operation: 'enqueue', value: 3 },
        { operation: 'peek', expected: 1 },
        { operation: 'dequeue', expected: 1 },
        { operation: 'dequeue', expected: 2 },
        { operation: 'isEmpty', expected: false },
        { operation: 'dequeue', expected: 3 },
        { operation: 'isEmpty', expected: true },
        { operation: 'dequeue', expected: undefined }
    ];
    
    const implementations = [
        { name: 'Costly Enqueue', class: QueueUsingTwoStacksCostlyEnqueue },
        { name: 'Costly Dequeue', class: QueueUsingTwoStacksCostlyDequeue },
        { name: 'Single Stack Recursive', class: QueueUsingOneStackRecursive }
    ];
    
    implementations.forEach(impl => {
        console.log(`\n--- Testing ${impl.name} Implementation ---`);
        const queue = new impl.class();
        let passed = 0;
        
        testCases.forEach((testCase, index) => {
            let result;
            
            try {
                switch (testCase.operation) {
                    case 'enqueue':
                        queue.enqueue(testCase.value);
                        result = 'enqueued';
                        break;
                    case 'dequeue':
                        result = queue.dequeue();
                        break;
                    case 'peek':
                        result = queue.peek();
                        break;
                    case 'isEmpty':
                        result = queue.isEmpty();
                        break;
                }
                
                if (testCase.expected !== undefined) {
                    const success = result === testCase.expected;
                    console.log(`Test ${index + 1}: ${testCase.operation}() → ${result} ${success ? '✅' : '❌'}`);
                    if (success) passed++;
                } else {
                    console.log(`Test ${index + 1}: ${testCase.operation}(${testCase.value}) → ${result}`);
                    passed++;
                }
            } catch (error) {
                console.log(`Test ${index + 1}: ${testCase.operation}() → Error: ${error.message} ❌`);
            }
        });
        
        console.log(`${impl.name}: ${passed}/${testCases.length} tests passed`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 IMPLEMENT QUEUE USING STACKS - BODHI DSA COURSE");
console.log("=" .repeat(60));

compareApproaches();
explainAmortizedAnalysis();
visualizeCostlyEnqueueDemo();
visualizeCostlyDequeueDemo();
practicalApplications();
testQueueImplementations();

// Export classes and functions
module.exports = {
    QueueUsingTwoStacksCostlyEnqueue,
    QueueUsingTwoStacksCostlyDequeue,
    QueueUsingOneStackRecursive,
    Stack,
    compareApproaches,
    explainAmortizedAnalysis,
    visualizeCostlyEnqueueDemo,
    visualizeCostlyDequeueDemo,
    practicalApplications,
    performanceTesting,
    testQueueImplementations
};
