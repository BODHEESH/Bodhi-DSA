/**
 * Implement Stack using Two Queues
 * Bodhi-DSA Course
 * 
 * Problem: Design a stack that supports push, pop, top, and empty operations using only two queues.
 * 
 * Key Insight: Since queues are FIFO and stacks are LIFO, we need to reverse the order.
 * We can achieve this by using two queues and transferring elements between them.
 * 
 * Approaches:
 * 1. Make push operation costly - O(n) push, O(1) pop
 * 2. Make pop operation costly - O(1) push, O(n) pop
 */

// Basic Queue implementation for our stack
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

// ============= APPROACH 1: COSTLY PUSH =============
// Time Complexity: Push O(n), Pop O(1), Top O(1)
// Space Complexity: O(n)

class StackUsingTwoQueuesCostlyPush {
    constructor() {
        this.queue1 = new Queue(); // Main queue
        this.queue2 = new Queue(); // Helper queue
        this.stackSize = 0;
    }
    
    // Push operation - O(n)
    push(element) {
        console.log(`\n📥 Pushing ${element} (Costly Push Approach)`);
        console.log(`Before: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}]`);
        
        // Step 1: Enqueue new element to queue2
        this.queue2.enqueue(element);
        console.log(`Step 1: Add ${element} to Q2 → Q2=[${this.queue2.toArray().join(', ')}]`);
        
        // Step 2: Move all elements from queue1 to queue2
        while (!this.queue1.isEmpty()) {
            const item = this.queue1.dequeue();
            this.queue2.enqueue(item);
            console.log(`Step 2: Move ${item} from Q1 to Q2 → Q2=[${this.queue2.toArray().join(', ')}]`);
        }
        
        // Step 3: Swap the queues (queue1 becomes main queue)
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
        this.stackSize++;
        
        console.log(`After: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}] (size: ${this.stackSize})`);
        console.log(`💡 New element ${element} is now at front of Q1 for O(1) pop`);
    }
    
    // Pop operation - O(1)
    pop() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot pop: Stack is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Popping (Costly Push Approach)`);
        console.log(`Before: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}]`);
        
        const popped = this.queue1.dequeue();
        this.stackSize--;
        
        console.log(`After: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}] (size: ${this.stackSize})`);
        console.log(`💡 Simply dequeue from Q1 - O(1) operation`);
        
        return popped;
    }
    
    // Top operation - O(1)
    top() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot peek: Stack is empty`);
            return undefined;
        }
        
        const topElement = this.queue1.front();
        console.log(`\n👀 Top element: ${topElement} (O(1) operation)`);
        return topElement;
    }
    
    // Check if empty
    isEmpty() {
        return this.stackSize === 0;
    }
    
    // Get size
    size() {
        return this.stackSize;
    }
    
    // Display current state
    display() {
        console.log(`\n📊 Stack State (Costly Push):`);
        console.log(`Stack elements (top to bottom): [${this.queue1.toArray().join(', ')}]`);
        console.log(`Queue1: [${this.queue1.toArray().join(', ')}]`);
        console.log(`Queue2: [${this.queue2.toArray().join(', ')}]`);
        console.log(`Size: ${this.stackSize}, Empty: ${this.isEmpty()}`);
    }
}

// ============= APPROACH 2: COSTLY POP =============
// Time Complexity: Push O(1), Pop O(n), Top O(n)
// Space Complexity: O(n)

class StackUsingTwoQueuesCostlyPop {
    constructor() {
        this.queue1 = new Queue(); // Main queue
        this.queue2 = new Queue(); // Helper queue
        this.stackSize = 0;
    }
    
    // Push operation - O(1)
    push(element) {
        console.log(`\n📥 Pushing ${element} (Costly Pop Approach)`);
        console.log(`Before: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}]`);
        
        // Simply enqueue to queue1
        this.queue1.enqueue(element);
        this.stackSize++;
        
        console.log(`After: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}] (size: ${this.stackSize})`);
        console.log(`💡 Simply add to Q1 - O(1) operation`);
    }
    
    // Pop operation - O(n)
    pop() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot pop: Stack is empty`);
            return undefined;
        }
        
        console.log(`\n📤 Popping (Costly Pop Approach)`);
        console.log(`Before: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}]`);
        
        // Move all elements except the last one from queue1 to queue2
        while (this.queue1.size() > 1) {
            const item = this.queue1.dequeue();
            this.queue2.enqueue(item);
            console.log(`Move ${item} from Q1 to Q2 → Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}]`);
        }
        
        // The last element in queue1 is our stack top
        const popped = this.queue1.dequeue();
        this.stackSize--;
        
        // Swap the queues
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
        
        console.log(`After: Q1=[${this.queue1.toArray().join(', ')}], Q2=[${this.queue2.toArray().join(', ')}] (size: ${this.stackSize})`);
        console.log(`💡 Moved ${this.stackSize} elements to get the last one - O(n) operation`);
        
        return popped;
    }
    
    // Top operation - O(n)
    top() {
        if (this.isEmpty()) {
            console.log(`\n❌ Cannot peek: Stack is empty`);
            return undefined;
        }
        
        console.log(`\n👀 Getting top element (Costly Pop Approach)`);
        
        // Move all elements except the last one from queue1 to queue2
        while (this.queue1.size() > 1) {
            const item = this.queue1.dequeue();
            this.queue2.enqueue(item);
        }
        
        // Get the last element (top of stack)
        const topElement = this.queue1.front();
        
        // Move the top element to queue2 as well
        this.queue2.enqueue(this.queue1.dequeue());
        
        // Swap the queues to restore original order
        [this.queue1, this.queue2] = [this.queue2, this.queue1];
        
        console.log(`Top element: ${topElement} (required O(n) operations)`);
        return topElement;
    }
    
    // Check if empty
    isEmpty() {
        return this.stackSize === 0;
    }
    
    // Get size
    size() {
        return this.stackSize;
    }
    
    // Display current state
    display() {
        console.log(`\n📊 Stack State (Costly Pop):`);
        console.log(`Stack elements (bottom to top): [${this.queue1.toArray().join(', ')}]`);
        console.log(`Queue1: [${this.queue1.toArray().join(', ')}]`);
        console.log(`Queue2: [${this.queue2.toArray().join(', ')}]`);
        console.log(`Size: ${this.stackSize}, Empty: ${this.isEmpty()}`);
    }
}

// ============= OPTIMIZED APPROACH (Recursive) =============
// Alternative implementation using recursion for pop operation

class StackUsingTwoQueuesRecursive {
    constructor() {
        this.queue1 = new Queue();
        this.queue2 = new Queue();
        this.stackSize = 0;
    }
    
    push(element) {
        this.queue1.enqueue(element);
        this.stackSize++;
    }
    
    // Recursive pop implementation
    pop() {
        if (this.isEmpty()) return undefined;
        
        return this.popRecursive();
    }
    
    popRecursive() {
        if (this.queue1.size() === 1) {
            this.stackSize--;
            return this.queue1.dequeue();
        }
        
        // Move front element to queue2
        const item = this.queue1.dequeue();
        this.queue2.enqueue(item);
        
        // Recursive call
        const result = this.popRecursive();
        
        // Move back the element
        this.queue1.enqueue(this.queue2.dequeue());
        
        return result;
    }
    
    top() {
        if (this.isEmpty()) return undefined;
        
        const topElement = this.topRecursive();
        return topElement;
    }
    
    topRecursive() {
        if (this.queue1.size() === 1) {
            const topElement = this.queue1.front();
            return topElement;
        }
        
        // Move front element to queue2
        const item = this.queue1.dequeue();
        this.queue2.enqueue(item);
        
        // Recursive call
        const result = this.topRecursive();
        
        // Move back the element
        this.queue1.enqueue(this.queue2.dequeue());
        
        return result;
    }
    
    isEmpty() {
        return this.stackSize === 0;
    }
    
    size() {
        return this.stackSize;
    }
}

// ============= COMPARISON AND ANALYSIS =============

function compareApproaches() {
    console.log(`\n🆚 Comparing Both Approaches`);
    
    console.log(`\n1. Costly Push Approach:`);
    console.log(`   ✅ Push: O(n) - Need to rearrange elements`);
    console.log(`   ✅ Pop:  O(1) - Simply dequeue from front`);
    console.log(`   ✅ Top:  O(1) - Simply peek at front`);
    console.log(`   📝 Best when: More pops than pushes`);
    
    console.log(`\n2. Costly Pop Approach:`);
    console.log(`   ✅ Push: O(1) - Simply enqueue`);
    console.log(`   ✅ Pop:  O(n) - Need to find last element`);
    console.log(`   ✅ Top:  O(n) - Need to find last element`);
    console.log(`   📝 Best when: More pushes than pops`);
    
    const approaches = [
        { name: "Costly Push", push: "O(n)", pop: "O(1)", top: "O(1)", space: "O(n)" },
        { name: "Costly Pop", push: "O(1)", pop: "O(n)", top: "O(n)", space: "O(n)" },
        { name: "Recursive", push: "O(1)", pop: "O(n)", top: "O(n)", space: "O(n)" }
    ];
    
    console.log(`\n📊 Complexity Comparison:`);
    console.log("=".repeat(70));
    console.log("| Approach    | Push | Pop  | Top  | Space |");
    console.log("=".repeat(70));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const push = approach.push.padEnd(4);
        const pop = approach.pop.padEnd(4);
        const top = approach.top.padEnd(4);
        const space = approach.space.padEnd(5);
        console.log(`| ${name} | ${push} | ${pop} | ${top} | ${space} |`);
    });
    
    console.log("=".repeat(70));
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeCostlyPushDemo() {
    console.log(`\n🎬 Costly Push Approach Demo`);
    
    const stack = new StackUsingTwoQueuesCostlyPush();
    
    // Push operations
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.display();
    
    // Pop operations
    console.log(`\nPopped: ${stack.pop()}`);
    console.log(`Popped: ${stack.pop()}`);
    stack.display();
    
    // Top operation
    stack.top();
}

function visualizeCostlyPopDemo() {
    console.log(`\n🎬 Costly Pop Approach Demo`);
    
    const stack = new StackUsingTwoQueuesCostlyPop();
    
    // Push operations
    stack.push('A');
    stack.push('B');
    stack.push('C');
    stack.display();
    
    // Pop operations
    console.log(`\nPopped: ${stack.pop()}`);
    console.log(`Popped: ${stack.pop()}`);
    stack.display();
    
    // Top operation
    stack.top();
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Expression Evaluation:**`);
    console.log(`   - Converting infix to postfix`);
    console.log(`   - Evaluating mathematical expressions`);
    
    console.log(`\n2. **Function Call Management:**`);
    console.log(`   - Simulating call stack behavior`);
    console.log(`   - Recursive function tracking`);
    
    console.log(`\n3. **Undo Operations:**`);
    console.log(`   - Text editor undo functionality`);
    console.log(`   - Game state management`);
    
    console.log(`\n4. **Browser History:**`);
    console.log(`   - Back button functionality`);
    console.log(`   - Tab management systems`);
    
    // Example: Simple calculator using stack
    console.log(`\n📱 Example: Simple Calculator`);
    
    class Calculator {
        constructor() {
            this.stack = new StackUsingTwoQueuesCostlyPush();
        }
        
        pushNumber(num) {
            this.stack.push(num);
            console.log(`Pushed ${num} to calculator stack`);
        }
        
        add() {
            if (this.stack.size() < 2) {
                console.log(`Need at least 2 numbers for addition`);
                return;
            }
            
            const b = this.stack.pop();
            const a = this.stack.pop();
            const result = a + b;
            
            this.stack.push(result);
            console.log(`${a} + ${b} = ${result}`);
        }
        
        getResult() {
            return this.stack.isEmpty() ? 0 : this.stack.top();
        }
    }
    
    const calc = new Calculator();
    calc.pushNumber(5);
    calc.pushNumber(3);
    calc.add();
    console.log(`Final result: ${calc.getResult()}`);
}

// ============= PERFORMANCE TESTING =============

function performanceTesting() {
    console.log(`\n⚡ Performance Testing`);
    
    const testSize = 1000;
    
    // Test Costly Push approach
    console.log(`\n📊 Testing Costly Push (${testSize} operations):`);
    const costlyPushStack = new StackUsingTwoQueuesCostlyPush();
    
    console.time('Costly Push - Push operations');
    for (let i = 0; i < testSize; i++) {
        costlyPushStack.push(i);
    }
    console.timeEnd('Costly Push - Push operations');
    
    console.time('Costly Push - Pop operations');
    for (let i = 0; i < testSize; i++) {
        costlyPushStack.pop();
    }
    console.timeEnd('Costly Push - Pop operations');
    
    // Test Costly Pop approach
    console.log(`\n📊 Testing Costly Pop (${testSize} operations):`);
    const costlyPopStack = new StackUsingTwoQueuesCostlyPop();
    
    console.time('Costly Pop - Push operations');
    for (let i = 0; i < testSize; i++) {
        costlyPopStack.push(i);
    }
    console.timeEnd('Costly Pop - Push operations');
    
    console.time('Costly Pop - Pop operations');
    for (let i = 0; i < testSize; i++) {
        costlyPopStack.pop();
    }
    console.timeEnd('Costly Pop - Pop operations');
    
    console.log(`\n💡 Observations:`);
    console.log(`- Costly Push: Fast pops, slow pushes`);
    console.log(`- Costly Pop: Fast pushes, slow pops`);
    console.log(`- Choose based on your use case!`);
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
        { operation: 'isEmpty', expected: true }
    ];
    
    const implementations = [
        { name: 'Costly Push', class: StackUsingTwoQueuesCostlyPush },
        { name: 'Costly Pop', class: StackUsingTwoQueuesCostlyPop },
        { name: 'Recursive', class: StackUsingTwoQueuesRecursive }
    ];
    
    implementations.forEach(impl => {
        console.log(`\n--- Testing ${impl.name} Implementation ---`);
        const stack = new impl.class();
        let passed = 0;
        
        testCases.forEach((testCase, index) => {
            let result;
            
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
        });
        
        console.log(`${impl.name}: ${passed}/${testCases.length} tests passed`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 IMPLEMENT STACK USING TWO QUEUES - BODHI DSA COURSE");
console.log("=" .repeat(65));

compareApproaches();
visualizeCostlyPushDemo();
visualizeCostlyPopDemo();
practicalApplications();
testStackImplementations();

// Export classes and functions
module.exports = {
    StackUsingTwoQueuesCostlyPush,
    StackUsingTwoQueuesCostlyPop,
    StackUsingTwoQueuesRecursive,
    Queue,
    compareApproaches,
    visualizeCostlyPushDemo,
    visualizeCostlyPopDemo,
    practicalApplications,
    performanceTesting,
    testStackImplementations
};
