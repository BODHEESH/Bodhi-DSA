/**
 * Min Stack
 * Bodhi-DSA Course
 * 
 * Problem: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 * 
 * Requirements:
 * - push(val): Pushes the element val onto the stack
 * - pop(): Removes the element on the top of the stack
 * - top(): Gets the top element of the stack
 * - getMin(): Retrieves the minimum element in the stack
 * 
 * All operations must be O(1) time complexity.
 */

// ============= APPROACH 1: TWO STACKS =============
// Time Complexity: All operations O(1) | Space Complexity: O(n)
// Algorithm: Use separate stack to track minimums

class MinStackTwoStacks {
    constructor() {
        this.stack = [];      // Main stack for elements
        this.minStack = [];   // Stack to track minimums
    }
    
    push(val) {
        console.log(`\n📥 Pushing ${val} (Two Stacks)`);
        console.log(`Before: Stack=[${this.stack.join(', ')}], MinStack=[${this.minStack.join(', ')}]`);
        
        this.stack.push(val);
        
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
            console.log(`${val} is new minimum, pushed to MinStack`);
        }
        
        console.log(`After: Stack=[${this.stack.join(', ')}], MinStack=[${this.minStack.join(', ')}]`);
    }
    
    pop() {
        if (this.stack.length === 0) {
            console.log(`\n❌ Cannot pop: Stack is empty`);
            return;
        }
        
        console.log(`\n📤 Popping (Two Stacks)`);
        const popped = this.stack.pop();
        
        if (this.minStack.length > 0 && popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
            console.log(`${popped} was minimum, removed from MinStack`);
        }
        
        return popped;
    }
    
    top() {
        if (this.stack.length === 0) return undefined;
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        if (this.minStack.length === 0) return undefined;
        return this.minStack[this.minStack.length - 1];
    }
    
    isEmpty() {
        return this.stack.length === 0;
    }
    
    display() {
        console.log(`\n📊 MinStack State (Two Stacks):`);
        console.log(`Main Stack: [${this.stack.join(', ')}]`);
        console.log(`Min Stack:  [${this.minStack.join(', ')}]`);
        console.log(`Current Min: ${this.getMin()}`);
    }
}

// ============= APPROACH 2: SINGLE STACK WITH PAIRS =============
// Time Complexity: All operations O(1) | Space Complexity: O(n)
// Algorithm: Store (value, minimum_so_far) pairs in single stack

class MinStackPairs {
    constructor() {
        this.stack = []; // Stack of {val, min} objects
    }
    
    push(val) {
        console.log(`\n📥 Pushing ${val} (Pairs)`);
        const currentMin = this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1].min);
        this.stack.push({ val: val, min: currentMin });
        console.log(`Pushed (${val}, ${currentMin})`);
    }
    
    pop() {
        if (this.stack.length === 0) return;
        const popped = this.stack.pop();
        console.log(`\n📤 Popped (${popped.val}, ${popped.min})`);
        return popped.val;
    }
    
    top() {
        if (this.stack.length === 0) return undefined;
        return this.stack[this.stack.length - 1].val;
    }
    
    getMin() {
        if (this.stack.length === 0) return undefined;
        return this.stack[this.stack.length - 1].min;
    }
    
    isEmpty() {
        return this.stack.length === 0;
    }
    
    display() {
        console.log(`\n📊 MinStack State (Pairs):`);
        console.log(`Stack: ${this.stack.map(item => `(${item.val},${item.min})`).join(', ')}`);
    }
}

// ============= APPROACH 3: MATHEMATICAL TRICK =============
// Time Complexity: All operations O(1) | Space Complexity: O(1) extra
// Algorithm: Use mathematical encoding to store both value and minimum info

class MinStackMath {
    constructor() {
        this.stack = [];
        this.currentMin = null;
    }
    
    push(val) {
        console.log(`\n📥 Pushing ${val} (Mathematical)`);
        
        if (this.stack.length === 0) {
            this.stack.push(val);
            this.currentMin = val;
        } else if (val >= this.currentMin) {
            this.stack.push(val);
        } else {
            // Encode: push (2*val - currentMin)
            const encoded = 2 * val - this.currentMin;
            this.stack.push(encoded);
            console.log(`Encoded ${val} as ${encoded}`);
            this.currentMin = val;
        }
        
        console.log(`Stack: [${this.stack.join(', ')}], Min: ${this.currentMin}`);
    }
    
    pop() {
        if (this.stack.length === 0) return;
        
        const top = this.stack.pop();
        let actualValue;
        
        if (top >= this.currentMin) {
            actualValue = top;
        } else {
            // Decode
            actualValue = this.currentMin;
            this.currentMin = 2 * this.currentMin - top;
            console.log(`\n📤 Decoded: actual=${actualValue}, new min=${this.currentMin}`);
        }
        
        if (this.stack.length === 0) {
            this.currentMin = null;
        }
        
        return actualValue;
    }
    
    top() {
        if (this.stack.length === 0) return undefined;
        const stackTop = this.stack[this.stack.length - 1];
        return stackTop >= this.currentMin ? stackTop : this.currentMin;
    }
    
    getMin() {
        return this.currentMin;
    }
    
    isEmpty() {
        return this.stack.length === 0;
    }
    
    display() {
        console.log(`\n📊 MinStack State (Mathematical):`);
        console.log(`Stack: [${this.stack.join(', ')}]`);
        console.log(`Current Min: ${this.currentMin}`);
    }
}

// ============= COMPARISON AND ANALYSIS =============

function compareApproaches() {
    console.log(`\n🆚 Comparing MinStack Approaches`);
    
    const approaches = [
        { name: "Two Stacks", time: "O(1)", space: "O(n)", notes: "Extra stack for minimums" },
        { name: "Pairs", time: "O(1)", space: "O(n)", notes: "Store (value, min) pairs" },
        { name: "Mathematical", time: "O(1)", space: "O(1)", notes: "Encode min info in values" }
    ];
    
    console.log(`\n📊 Complexity Comparison:`);
    console.log("=".repeat(80));
    console.log("| Approach     | Time | Space | Notes                    |");
    console.log("=".repeat(80));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(12);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log(`\n🏆 Recommendation: Two Stacks Approach`);
    console.log(`• Most intuitive and easy to understand`);
    console.log(`• Reliable and bug-free implementation`);
    console.log(`• Preferred in interviews and production`);
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeTwoStacksDemo() {
    console.log(`\n🎬 Two Stacks Demo`);
    
    const minStack = new MinStackTwoStacks();
    
    [3, 5, 2, 1, 4].forEach(val => minStack.push(val));
    minStack.display();
    
    console.log(`\n--- Operations ---`);
    console.log(`Top: ${minStack.top()}`);
    console.log(`Min: ${minStack.getMin()}`);
    
    minStack.pop();
    minStack.pop();
    minStack.display();
}

function visualizeMathematicalDemo() {
    console.log(`\n🎬 Mathematical Demo`);
    
    const minStack = new MinStackMath();
    
    console.log(`\nKey insight: When pushing new minimum:`);
    console.log(`encoded_value = 2 * new_min - old_min`);
    console.log(`This encoded value is always < new_min`);
    
    [3, 5, 2, 1, 4].forEach(val => minStack.push(val));
    minStack.display();
    
    console.log(`\n--- Pop Operations ---`);
    minStack.pop();
    minStack.pop();
    minStack.display();
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Stock Price Monitoring:**`);
    console.log(`   - Track current price and minimum seen`);
    
    console.log(`\n2. **System Resource Monitoring:**`);
    console.log(`   - Monitor usage and minimum available`);
    
    console.log(`\n3. **Game Score Tracking:**`);
    console.log(`   - Current score and lowest point`);
    
    // Example: Stock tracker
    console.log(`\n📈 Example: Stock Price Tracker`);
    
    class StockTracker {
        constructor(symbol) {
            this.symbol = symbol;
            this.minStack = new MinStackTwoStacks();
        }
        
        addPrice(price) {
            this.minStack.push(price);
            console.log(`\n📊 ${this.symbol}: $${price}`);
            console.log(`Current: $${this.getCurrentPrice()}`);
            console.log(`Lowest: $${this.getLowestPrice()}`);
        }
        
        getCurrentPrice() {
            return this.minStack.top();
        }
        
        getLowestPrice() {
            return this.minStack.getMin();
        }
    }
    
    const stock = new StockTracker('AAPL');
    stock.addPrice(150);
    stock.addPrice(145);
    stock.addPrice(160);
    stock.addPrice(140);
}

// ============= TEST CASES =============

function testMinStack() {
    console.log(`\n🧪 Testing MinStack Implementations`);
    
    const testCases = [
        { operation: 'push', value: 3 },
        { operation: 'push', value: 5 },
        { operation: 'getMin', expected: 3 },
        { operation: 'push', value: 2 },
        { operation: 'push', value: 1 },
        { operation: 'getMin', expected: 1 },
        { operation: 'pop', expected: 1 },
        { operation: 'getMin', expected: 2 },
        { operation: 'top', expected: 5 }
    ];
    
    const implementations = [
        { name: 'Two Stacks', class: MinStackTwoStacks },
        { name: 'Pairs', class: MinStackPairs },
        { name: 'Mathematical', class: MinStackMath }
    ];
    
    implementations.forEach(impl => {
        console.log(`\n--- Testing ${impl.name} ---`);
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
                case 'getMin':
                    result = stack.getMin();
                    break;
            }
            
            if (testCase.expected !== undefined) {
                const success = result === testCase.expected;
                console.log(`Test ${index + 1}: ${testCase.operation}() → ${result} ${success ? '✅' : '❌'}`);
                if (success) passed++;
            } else {
                console.log(`Test ${index + 1}: ${testCase.operation}(${testCase.value})`);
                passed++;
            }
        });
        
        console.log(`${impl.name}: ${passed}/${testCases.length} tests passed`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 MIN STACK - BODHI DSA COURSE");
console.log("=" .repeat(35));

compareApproaches();
visualizeTwoStacksDemo();
visualizeMathematicalDemo();
practicalApplications();
testMinStack();

// Export classes and functions
module.exports = {
    MinStackTwoStacks,
    MinStackPairs,
    MinStackMath,
    compareApproaches,
    visualizeTwoStacksDemo,
    visualizeMathematicalDemo,
    practicalApplications,
    testMinStack
};
