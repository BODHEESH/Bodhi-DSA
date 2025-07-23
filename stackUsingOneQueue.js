/**
 * Implement Stack using One Queue
 * Bodhi-DSA Course
 * 
 * Problem: Design a stack that supports push, pop, top, and empty operations using only one queue.
 * 
 * Key Insight: Since we only have one queue, we need to be clever about how we simulate LIFO behavior.
 * The trick is to rotate the queue after each push operation to bring the newly added element to the front.
 * 
 * Approach: After pushing an element, rotate the queue (size-1) times to bring the new element to front.
 * This makes the most recently added element accessible for O(1) pop operation.
 */

// Basic Queue implementation
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
    }
    
    dequeue() {
        if (this.isEmpty()) return undefined;
        return this.items.shift();
    }
    
    front() {
        if (this.isEmpty()) return undefined;
        return this.items[0];
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

// ============= MAIN APPROACH: ROTATION AFTER PUSH =============
// Time Complexity: Push O(n), Pop O(1), Top O(1)
// Space Complexity: O(n)

class StackUsingOneQueue {
    constructor() {
        this.queue = new Queue();
    }
    
    // Push operation - O(n)
    push(element) {
        console.log(`\n📥 Pushing ${element} to stack`);
        console.log(`Before: [${this.queue.toArray().join(', ')}]`);
        
        // Step 1: Get current size
        const currentSize = this.queue.size();
        
        // Step 2: Enqueue the new element
        this.queue.enqueue(element);
        console.log(`Step 1: Add ${element} → [${this.queue.toArray().join(', ')}]`);
        
        // Step 3: Rotate the queue (currentSize) times to bring new element to front
        console.log(`Step 2: Rotate ${currentSize} times to bring ${element} to front:`);
        
        for (let i = 0; i < currentSize; i++) {
            const item = this.queue.dequeue();
            this.queue.enqueue(item);
            console.log(`  Rotation ${i + 1}: Move ${item} to back → [${this.queue.toArray().join(', ')}]`);
        }
        
        console.log(`After: [${this.queue.toArray().join(', ')}] (${element} is now at front)`);
        console.log(`💡 New element ${element} is at front for O(1) access`);
    }
    
    // Pop operation - O(1)
    pop() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot pop: Stack is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Popping from stack`);
        console.log(`Before: [${this.queue.toArray().join(', ')}]`);
        
        const popped = this.queue.dequeue();
        
        console.log(`After: [${this.queue.toArray().join(', ')}]`);
        console.log(`💡 Simply dequeue from front - O(1) operation`);
        
        return popped;
    }
    
    // Top operation - O(1)
    top() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot peek: Stack is empty`);
            return undefined;
        }
        
        const topElement = this.queue.front();
        console.log(`\n👀 Top element: ${topElement} (O(1) operation)`);
        return topElement;
    }
    
    // Check if empty
    isEmpty() {
        return this.queue.isEmpty();
    }
    
    // Get size
    size() {
        return this.queue.size();
    }
    
    // Display current state
    display() {
        console.log(`\n📊 Stack State:`);
        console.log(`Stack elements (top to bottom): [${this.queue.toArray().join(', ')}]`);
        console.log(`Queue representation: [${this.queue.toArray().join(', ')}] ← rear, front →`);
        console.log(`Size: ${this.size()}, Empty: ${this.isEmpty()}`);
    }
    
    // Get all elements as array (for testing)
    toArray() {
        return this.queue.toArray();
    }
}

// ============= ALTERNATIVE APPROACH: ROTATION ON POP =============
// Time Complexity: Push O(1), Pop O(n), Top O(n)
// Space Complexity: O(n)

class StackUsingOneQueueCostlyPop {
    constructor() {
        this.queue = new Queue();
    }
    
    // Push operation - O(1)
    push(element) {
        console.log(`\n📥 Pushing ${element} (Costly Pop Approach)`);
        console.log(`Before: [${this.queue.toArray().join(', ')}]`);
        
        this.queue.enqueue(element);
        
        console.log(`After: [${this.queue.toArray().join(', ')}]`);
        console.log(`💡 Simply enqueue - O(1) operation`);
    }
    
    // Pop operation - O(n)
    pop() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot pop: Stack is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Popping (Costly Pop Approach)`);
        console.log(`Before: [${this.queue.toArray().join(', ')}]`);
        
        const size = this.queue.size();
        
        // Rotate (size-1) times to bring last element to front
        console.log(`Rotating ${size - 1} times to bring last element to front:`);
        
        for (let i = 0; i < size - 1; i++) {
            const item = this.queue.dequeue();
            this.queue.enqueue(item);
            console.log(`  Rotation ${i + 1}: Move ${item} → [${this.queue.toArray().join(', ')}]`);
        }
        
        // Now the last element (stack top) is at front
        const popped = this.queue.dequeue();
        
        console.log(`After: [${this.queue.toArray().join(', ')}]`);
        console.log(`💡 Required ${size - 1} rotations - O(n) operation`);
        
        return popped;
    }
    
    // Top operation - O(n)
    top() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot peek: Stack is empty`);
            return undefined;
        }
        
        console.log(`\n👀 Getting top element (Costly Pop Approach)`);
        
        const size = this.queue.size();
        
        // Rotate (size-1) times to bring last element to front
        for (let i = 0; i < size - 1; i++) {
            const item = this.queue.dequeue();
            this.queue.enqueue(item);
        }
        
        // Get the top element
        const topElement = this.queue.front();
        
        // Rotate once more to restore original order
        const item = this.queue.dequeue();
        this.queue.enqueue(item);
        
        console.log(`Top element: ${topElement} (required ${size} rotations)`);
        return topElement;
    }
    
    isEmpty() {
        return this.queue.isEmpty();
    }
    
    size() {
        return this.queue.size();
    }
    
    display() {
        console.log(`\n📊 Stack State (Costly Pop):`);
        console.log(`Stack elements (bottom to top): [${this.queue.toArray().join(', ')}]`);
        console.log(`Queue representation: [${this.queue.toArray().join(', ')}]`);
        console.log(`Size: ${this.size()}, Empty: ${this.isEmpty()}`);
    }
    
    toArray() {
        return this.queue.toArray();
    }
}

// ============= RECURSIVE APPROACH =============
// Using recursion to simulate stack behavior

class StackUsingOneQueueRecursive {
    constructor() {
        this.queue = new Queue();
    }
    
    push(element) {
        const size = this.queue.size();
        this.queue.enqueue(element);
        
        // Recursively rotate to bring new element to front
        this.rotateToFront(size);
    }
    
    rotateToFront(rotations) {
        if (rotations === 0) return;
        
        const item = this.queue.dequeue();
        this.queue.enqueue(item);
        this.rotateToFront(rotations - 1);
    }
    
    pop() {
        if (this.isEmpty()) return undefined;
        return this.queue.dequeue();
    }
    
    top() {
        if (this.isEmpty()) return undefined;
        return this.queue.front();
    }
    
    isEmpty() {
        return this.queue.isEmpty();
    }
    
    size() {
        return this.queue.size();
    }
    
    toArray() {
        return this.queue.toArray();
    }
}

// ============= COMPARISON AND ANALYSIS =============

function compareApproaches() {
    console.log(`\n🆚 Comparing Single Queue Approaches`);
    
    console.log(`\n1. Rotation After Push (Main Approach):`);
    console.log(`   ✅ Push: O(n) - Rotate queue to bring new element to front`);
    console.log(`   ✅ Pop:  O(1) - Simply dequeue from front`);
    console.log(`   ✅ Top:  O(1) - Simply peek at front`);
    console.log(`   📝 Best when: More pops/tops than pushes`);
    
    console.log(`\n2. Rotation On Pop:`);
    console.log(`   ✅ Push: O(1) - Simply enqueue`);
    console.log(`   ✅ Pop:  O(n) - Rotate to bring last element to front`);
    console.log(`   ✅ Top:  O(n) - Rotate to access last element`);
    console.log(`   📝 Best when: More pushes than pops/tops`);
    
    const approaches = [
        { name: "Rotation After Push", push: "O(n)", pop: "O(1)", top: "O(1)", space: "O(n)" },
        { name: "Rotation On Pop", push: "O(1)", pop: "O(n)", top: "O(n)", space: "O(n)" },
        { name: "Recursive", push: "O(n)", pop: "O(1)", top: "O(1)", space: "O(n)" }
    ];
    
    console.log(`\n📊 Complexity Comparison:`);
    console.log("=".repeat(75));
    console.log("| Approach           | Push | Pop  | Top  | Space |");
    console.log("=".repeat(75));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(18);
        const push = approach.push.padEnd(4);
        const pop = approach.pop.padEnd(4);
        const top = approach.top.padEnd(4);
        const space = approach.space.padEnd(5);
        console.log(`| ${name} | ${push} | ${pop} | ${top} | ${space} |`);
    });
    
    console.log("=".repeat(75));
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• Single queue requires rotation to simulate LIFO`);
    console.log(`• Trade-off between push vs pop/top complexity`);
    console.log(`• Rotation after push is generally preferred`);
    console.log(`• More space-efficient than two-queue approach`);
}

// ============= STEP-BY-STEP VISUALIZATION =============

function visualizeRotationProcess() {
    console.log(`\n🎬 Step-by-Step Rotation Visualization`);
    
    const stack = new StackUsingOneQueue();
    
    console.log(`\n=== Building Stack: [1, 2, 3] ===`);
    
    // Push 1
    console.log(`\n--- Pushing 1 ---`);
    console.log(`Queue before: []`);
    console.log(`1. Enqueue 1: [1]`);
    console.log(`2. No rotation needed (size was 0)`);
    console.log(`Final: [1] ← front`);
    stack.queue.enqueue(1);
    
    // Push 2
    console.log(`\n--- Pushing 2 ---`);
    console.log(`Queue before: [1]`);
    console.log(`1. Enqueue 2: [1, 2]`);
    console.log(`2. Rotate 1 time:`);
    console.log(`   - Move 1 to back: [2, 1]`);
    console.log(`Final: [2, 1] ← front (2 is now accessible)`);
    
    const item1 = stack.queue.dequeue();
    stack.queue.enqueue(2);
    stack.queue.enqueue(item1);
    
    // Push 3
    console.log(`\n--- Pushing 3 ---`);
    console.log(`Queue before: [2, 1]`);
    console.log(`1. Enqueue 3: [2, 1, 3]`);
    console.log(`2. Rotate 2 times:`);
    console.log(`   - Move 2 to back: [1, 3, 2]`);
    console.log(`   - Move 1 to back: [3, 2, 1]`);
    console.log(`Final: [3, 2, 1] ← front (3 is now accessible)`);
    
    const item2 = stack.queue.dequeue();
    const item3 = stack.queue.dequeue();
    stack.queue.enqueue(3);
    stack.queue.enqueue(item2);
    stack.queue.enqueue(item3);
    
    console.log(`\n🎯 Result: Stack behavior achieved!`);
    console.log(`Stack order (top to bottom): [3, 2, 1]`);
    console.log(`Queue representation: [3, 2, 1] ← front`);
    console.log(`Pop operations will return: 3, then 2, then 1 (LIFO)`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Memory-Constrained Systems:**`);
    console.log(`   - Embedded systems with limited data structures`);
    console.log(`   - Microcontrollers with basic queue support`);
    
    console.log(`\n2. **Educational Purposes:**`);
    console.log(`   - Understanding data structure relationships`);
    console.log(`   - Algorithm design thinking`);
    
    console.log(`\n3. **Interview Preparation:**`);
    console.log(`   - Common coding interview question`);
    console.log(`   - Tests understanding of queue operations`);
    
    console.log(`\n4. **System Design:**`);
    console.log(`   - When only queue primitive is available`);
    console.log(`   - Converting between data structure behaviors`);
    
    // Example: Function call stack simulation
    console.log(`\n📱 Example: Function Call Stack Simulation`);
    
    class CallStack {
        constructor() {
            this.stack = new StackUsingOneQueue();
        }
        
        callFunction(functionName) {
            this.stack.push(functionName);
            console.log(`📞 Called function: ${functionName}`);
            console.log(`Call stack: [${this.stack.toArray().join(' → ')}]`);
        }
        
        returnFromFunction() {
            if (this.stack.isEmpty()) {
                console.log(`❌ No function to return from`);
                return;
            }
            
            const returned = this.stack.pop();
            console.log(`↩️  Returned from: ${returned}`);
            console.log(`Call stack: [${this.stack.toArray().join(' → ')}]`);
        }
        
        getCurrentFunction() {
            if (this.stack.isEmpty()) {
                console.log(`📍 No function currently executing`);
                return null;
            }
            
            const current = this.stack.top();
            console.log(`📍 Currently executing: ${current}`);
            return current;
        }
    }
    
    const callStack = new CallStack();
    callStack.callFunction('main()');
    callStack.callFunction('calculate()');
    callStack.callFunction('helper()');
    callStack.getCurrentFunction();
    callStack.returnFromFunction();
    callStack.returnFromFunction();
    callStack.getCurrentFunction();
}

// ============= PERFORMANCE ANALYSIS =============

function performanceAnalysis() {
    console.log(`\n⚡ Performance Analysis`);
    
    const testSizes = [100, 500, 1000];
    
    testSizes.forEach(size => {
        console.log(`\n📊 Testing with ${size} elements:`);
        
        // Test main approach (rotation after push)
        const stack1 = new StackUsingOneQueue();
        
        console.time(`Single Queue (Rotation After Push) - ${size} pushes`);
        for (let i = 0; i < size; i++) {
            stack1.push(i);
        }
        console.timeEnd(`Single Queue (Rotation After Push) - ${size} pushes`);
        
        console.time(`Single Queue (Rotation After Push) - ${size} pops`);
        for (let i = 0; i < size; i++) {
            stack1.pop();
        }
        console.timeEnd(`Single Queue (Rotation After Push) - ${size} pops`);
        
        // Test alternative approach (rotation on pop)
        const stack2 = new StackUsingOneQueueCostlyPop();
        
        console.time(`Single Queue (Rotation On Pop) - ${size} pushes`);
        for (let i = 0; i < size; i++) {
            stack2.push(i);
        }
        console.timeEnd(`Single Queue (Rotation On Pop) - ${size} pushes`);
        
        console.time(`Single Queue (Rotation On Pop) - ${size} pops`);
        for (let i = 0; i < size; i++) {
            stack2.pop();
        }
        console.timeEnd(`Single Queue (Rotation On Pop) - ${size} pops`);
    });
    
    console.log(`\n💡 Performance Insights:`);
    console.log(`• Rotation after push: O(n²) total for n pushes, O(n) for n pops`);
    console.log(`• Rotation on pop: O(n) for n pushes, O(n²) total for n pops`);
    console.log(`• Choose based on your usage pattern!`);
}

// ============= INTERACTIVE DEMO =============

function interactiveDemo() {
    console.log(`\n🎮 Interactive Demo`);
    
    const stack = new StackUsingOneQueue();
    
    console.log(`\n=== Interactive Stack Operations ===`);
    
    // Simulate a series of operations
    const operations = [
        { op: 'push', val: 'A' },
        { op: 'push', val: 'B' },
        { op: 'push', val: 'C' },
        { op: 'top' },
        { op: 'pop' },
        { op: 'push', val: 'D' },
        { op: 'top' },
        { op: 'pop' },
        { op: 'pop' },
        { op: 'pop' }
    ];
    
    operations.forEach((operation, index) => {
        console.log(`\n--- Operation ${index + 1}: ${operation.op}${operation.val ? `(${operation.val})` : '()'} ---`);
        
        switch (operation.op) {
            case 'push':
                stack.push(operation.val);
                break;
            case 'pop':
                const popped = stack.pop();
                console.log(`Returned: ${popped}`);
                break;
            case 'top':
                const top = stack.top();
                console.log(`Returned: ${top}`);
                break;
        }
        
        stack.display();
    });
}

// ============= TEST CASES =============

function testStackImplementations() {
    console.log(`\n🧪 Testing Stack Implementations`);
    
    const testCases = [
        { operation: 'push', value: 1 },
        { operation: 'push', value: 2 },
        { operation: 'push', value: 3 },
        { operation: 'top', expected: 3 },
        { operation: 'pop', expected: 3 },
        { operation: 'pop', expected: 2 },
        { operation: 'isEmpty', expected: false },
        { operation: 'pop', expected: 1 },
        { operation: 'isEmpty', expected: true },
        { operation: 'pop', expected: undefined }
    ];
    
    const implementations = [
        { name: 'Rotation After Push', class: StackUsingOneQueue },
        { name: 'Rotation On Pop', class: StackUsingOneQueueCostlyPop },
        { name: 'Recursive', class: StackUsingOneQueueRecursive }
    ];
    
    implementations.forEach(impl => {
        console.log(`\n--- Testing ${impl.name} Implementation ---`);
        const stack = new impl.class();
        let passed = 0;
        
        testCases.forEach((testCase, index) => {
            let result;
            
            try {
                switch (testCase.operation) {
                    case 'push':
                        stack.push(testCase.value);
                        result = 'pushed';
                        break;
                    case 'pop':
                        result = stack.pop();
                        break;
                    case 'top':
                        result = stack.top();
                        break;
                    case 'isEmpty':
                        result = stack.isEmpty();
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

console.log("🎓 IMPLEMENT STACK USING ONE QUEUE - BODHI DSA COURSE");
console.log("=" .repeat(60));

compareApproaches();
visualizeRotationProcess();
interactiveDemo();
practicalApplications();
testStackImplementations();

// Export classes and functions
module.exports = {
    StackUsingOneQueue,
    StackUsingOneQueueCostlyPop,
    StackUsingOneQueueRecursive,
    Queue,
    compareApproaches,
    visualizeRotationProcess,
    interactiveDemo,
    practicalApplications,
    performanceAnalysis,
    testStackImplementations
};
