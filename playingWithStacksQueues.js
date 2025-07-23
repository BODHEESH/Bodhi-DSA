/**
 * Playing with Stacks & Queues
 * Bodhi-DSA Course
 * 
 * This file provides hands-on exploration of stack and queue operations
 * with interactive examples, games, and practical exercises to master
 * the fundamental concepts through play and experimentation.
 */

// Import basic implementations
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
        return this;
    }
    
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }
    
    peek() {
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
        return this;
    }
}

class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
        return this;
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
        return this;
    }
}

// ============= INTERACTIVE STACK PLAYGROUND =============

class StackPlayground {
    constructor() {
        this.stack = new Stack();
        this.history = [];
    }
    
    // Interactive push with visualization
    push(element) {
        console.log(`\n📥 Pushing "${element}" onto stack`);
        console.log(`Before: [${this.stack.toArray().join(', ')}]`);
        
        this.stack.push(element);
        this.history.push(`push(${element})`);
        
        console.log(`After:  [${this.stack.toArray().join(', ')}] ← TOP`);
        console.log(`Stack size: ${this.stack.size()}`);
        
        return this;
    }
    
    // Interactive pop with visualization
    pop() {
        console.log(`\n📤 Popping from stack`);
        console.log(`Before: [${this.stack.toArray().join(', ')}] ← TOP`);
        
        const popped = this.stack.pop();
        this.history.push(`pop() → ${popped}`);
        
        if (popped !== undefined) {
            console.log(`Popped: "${popped}"`);
            console.log(`After:  [${this.stack.toArray().join(', ')}]${this.stack.isEmpty() ? ' (empty)' : ' ← TOP'}`);
        } else {
            console.log(`Stack is empty! Cannot pop.`);
        }
        
        console.log(`Stack size: ${this.stack.size()}`);
        
        return popped;
    }
    
    // Peek with visualization
    peek() {
        console.log(`\n👀 Peeking at top of stack`);
        const top = this.stack.peek();
        
        if (top !== undefined) {
            console.log(`Top element: "${top}"`);
            console.log(`Stack: [${this.stack.toArray().join(', ')}] ← TOP`);
        } else {
            console.log(`Stack is empty! Nothing to peek.`);
        }
        
        return top;
    }
    
    // Show current state
    showState() {
        console.log(`\n📊 Current Stack State:`);
        console.log(`Elements: [${this.stack.toArray().join(', ')}]${this.stack.isEmpty() ? ' (empty)' : ' ← TOP'}`);
        console.log(`Size: ${this.stack.size()}`);
        console.log(`Is Empty: ${this.stack.isEmpty()}`);
        
        return this;
    }
    
    // Show operation history
    showHistory() {
        console.log(`\n📜 Operation History:`);
        this.history.forEach((op, index) => {
            console.log(`${index + 1}. ${op}`);
        });
        
        return this;
    }
    
    // Reset playground
    reset() {
        console.log(`\n🔄 Resetting stack playground`);
        this.stack.clear();
        this.history = [];
        console.log(`Stack cleared!`);
        
        return this;
    }
}

// ============= INTERACTIVE QUEUE PLAYGROUND =============

class QueuePlayground {
    constructor() {
        this.queue = new Queue();
        this.history = [];
    }
    
    // Interactive enqueue with visualization
    enqueue(element) {
        console.log(`\n📥 Enqueuing "${element}" to queue`);
        console.log(`Before: FRONT → [${this.queue.toArray().join(', ')}] ← REAR`);
        
        this.queue.enqueue(element);
        this.history.push(`enqueue(${element})`);
        
        console.log(`After:  FRONT → [${this.queue.toArray().join(', ')}] ← REAR`);
        console.log(`Queue size: ${this.queue.size()}`);
        
        return this;
    }
    
    // Interactive dequeue with visualization
    dequeue() {
        console.log(`\n📤 Dequeuing from queue`);
        console.log(`Before: FRONT → [${this.queue.toArray().join(', ')}] ← REAR`);
        
        const dequeued = this.queue.dequeue();
        this.history.push(`dequeue() → ${dequeued}`);
        
        if (dequeued !== undefined) {
            console.log(`Dequeued: "${dequeued}"`);
            console.log(`After:  FRONT → [${this.queue.toArray().join(', ')}]${this.queue.isEmpty() ? ' (empty)' : ' ← REAR'}`);
        } else {
            console.log(`Queue is empty! Cannot dequeue.`);
        }
        
        console.log(`Queue size: ${this.queue.size()}`);
        
        return dequeued;
    }
    
    // Peek front with visualization
    peekFront() {
        console.log(`\n👀 Peeking at front of queue`);
        const front = this.queue.front();
        
        if (front !== undefined) {
            console.log(`Front element: "${front}"`);
            console.log(`Queue: FRONT → [${this.queue.toArray().join(', ')}] ← REAR`);
        } else {
            console.log(`Queue is empty! Nothing to peek.`);
        }
        
        return front;
    }
    
    // Show current state
    showState() {
        console.log(`\n📊 Current Queue State:`);
        console.log(`Elements: FRONT → [${this.queue.toArray().join(', ')}]${this.queue.isEmpty() ? ' (empty)' : ' ← REAR'}`);
        console.log(`Size: ${this.queue.size()}`);
        console.log(`Is Empty: ${this.queue.isEmpty()}`);
        
        return this;
    }
    
    // Show operation history
    showHistory() {
        console.log(`\n📜 Operation History:`);
        this.history.forEach((op, index) => {
            console.log(`${index + 1}. ${op}`);
        });
        
        return this;
    }
    
    // Reset playground
    reset() {
        console.log(`\n🔄 Resetting queue playground`);
        this.queue.clear();
        this.history = [];
        console.log(`Queue cleared!`);
        
        return this;
    }
}

// ============= STACK GAMES AND CHALLENGES =============

// Tower of Hanoi game using stacks
class TowerOfHanoi {
    constructor(numDisks = 3) {
        this.numDisks = numDisks;
        this.towers = {
            A: new Stack(),
            B: new Stack(),
            C: new Stack()
        };
        this.moves = 0;
        this.history = [];
        
        // Initialize tower A with disks (largest at bottom)
        for (let i = numDisks; i >= 1; i--) {
            this.towers.A.push(i);
        }
    }
    
    // Display current state
    display() {
        console.log(`\n🗼 Tower of Hanoi State (Move ${this.moves}):`);
        console.log(`Tower A: [${this.towers.A.toArray().join(', ')}]`);
        console.log(`Tower B: [${this.towers.B.toArray().join(', ')}]`);
        console.log(`Tower C: [${this.towers.C.toArray().join(', ')}]`);
        console.log(`Goal: Move all disks to Tower C`);
    }
    
    // Move disk from one tower to another
    moveDisk(from, to) {
        if (!this.towers[from] || !this.towers[to]) {
            console.log(`❌ Invalid tower name. Use A, B, or C.`);
            return false;
        }
        
        if (this.towers[from].isEmpty()) {
            console.log(`❌ Tower ${from} is empty!`);
            return false;
        }
        
        const disk = this.towers[from].peek();
        const targetTop = this.towers[to].peek();
        
        if (targetTop !== undefined && disk > targetTop) {
            console.log(`❌ Cannot place disk ${disk} on top of smaller disk ${targetTop}!`);
            return false;
        }
        
        // Valid move
        const movedDisk = this.towers[from].pop();
        this.towers[to].push(movedDisk);
        this.moves++;
        this.history.push(`Move disk ${movedDisk} from ${from} to ${to}`);
        
        console.log(`✅ Moved disk ${movedDisk} from Tower ${from} to Tower ${to}`);
        
        return true;
    }
    
    // Check if puzzle is solved
    isSolved() {
        return this.towers.C.size() === this.numDisks;
    }
    
    // Get minimum moves required
    getMinMoves() {
        return Math.pow(2, this.numDisks) - 1;
    }
    
    // Show solution steps
    showSolution() {
        console.log(`\n💡 Solution for ${this.numDisks} disks (${this.getMinMoves()} moves):`);
        this.solveHanoi(this.numDisks, 'A', 'C', 'B', 1);
    }
    
    solveHanoi(n, from, to, aux, step) {
        if (n === 1) {
            console.log(`${step}. Move disk 1 from ${from} to ${to}`);
            return step + 1;
        }
        
        step = this.solveHanoi(n - 1, from, aux, to, step);
        console.log(`${step}. Move disk ${n} from ${from} to ${to}`);
        step++;
        step = this.solveHanoi(n - 1, aux, to, from, step);
        
        return step;
    }
}

// Balanced parentheses game
class ParenthesesGame {
    constructor() {
        this.score = 0;
        this.level = 1;
    }
    
    // Check if string has balanced parentheses
    checkBalance(str) {
        console.log(`\n🎯 Level ${this.level}: Check if "${str}" is balanced`);
        
        const stack = new Stack();
        const pairs = { '(': ')', '[': ']', '{': '}' };
        const steps = [];
        
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            
            if (char in pairs) {
                stack.push(char);
                steps.push(`Push '${char}' → Stack: [${stack.toArray().join(', ')}]`);
            } else if (Object.values(pairs).includes(char)) {
                if (stack.isEmpty()) {
                    steps.push(`Found '${char}' but stack is empty → UNBALANCED`);
                    this.showSteps(steps);
                    console.log(`❌ Unbalanced! No matching opening bracket.`);
                    return false;
                }
                
                const top = stack.pop();
                if (pairs[top] !== char) {
                    steps.push(`Pop '${top}' but found '${char}' → MISMATCH`);
                    this.showSteps(steps);
                    console.log(`❌ Unbalanced! Mismatched brackets.`);
                    return false;
                }
                
                steps.push(`Pop '${top}' matches '${char}' → Stack: [${stack.toArray().join(', ')}]`);
            }
        }
        
        const isBalanced = stack.isEmpty();
        steps.push(`Final check: Stack ${isBalanced ? 'is empty' : 'has remaining'} → ${isBalanced ? 'BALANCED' : 'UNBALANCED'}`);
        
        this.showSteps(steps);
        
        if (isBalanced) {
            this.score += this.level * 10;
            console.log(`✅ Balanced! +${this.level * 10} points. Total score: ${this.score}`);
            this.level++;
        } else {
            console.log(`❌ Unbalanced! Remaining in stack: [${stack.toArray().join(', ')}]`);
        }
        
        return isBalanced;
    }
    
    showSteps(steps) {
        console.log(`\n📝 Step-by-step solution:`);
        steps.forEach((step, index) => {
            console.log(`${index + 1}. ${step}`);
        });
    }
    
    // Generate random test cases
    generateChallenge() {
        const challenges = [
            "()",
            "()[]{}",
            "(]",
            "([)]",
            "{[]}",
            "((()))",
            "([{}])",
            "(((",
            ")))",
            "([)]"
        ];
        
        const challenge = challenges[Math.floor(Math.random() * challenges.length)];
        console.log(`\n🎲 Random Challenge: "${challenge}"`);
        return challenge;
    }
    
    // Play multiple rounds
    playRounds(numRounds = 3) {
        console.log(`\n🎮 Starting Parentheses Game - ${numRounds} rounds`);
        
        for (let i = 0; i < numRounds; i++) {
            const challenge = this.generateChallenge();
            this.checkBalance(challenge);
            console.log(`\n${'='.repeat(50)}`);
        }
        
        console.log(`\n🏆 Game Over! Final Score: ${this.score}`);
    }
}

// ============= QUEUE GAMES AND CHALLENGES =============

// Hot Potato game using queue
class HotPotatoGame {
    constructor(players) {
        this.queue = new Queue();
        this.eliminated = [];
        
        // Add all players to queue
        players.forEach(player => this.queue.enqueue(player));
        console.log(`\n🥔 Hot Potato Game Started!`);
        console.log(`Players: [${players.join(', ')}]`);
    }
    
    // Play one round
    playRound(passes) {
        if (this.queue.size() <= 1) {
            console.log(`\n🏆 Game Over! Winner: ${this.queue.front()}`);
            return this.queue.front();
        }
        
        console.log(`\n🔄 Round ${this.eliminated.length + 1}: Passing potato ${passes} times`);
        console.log(`Current players: [${this.queue.toArray().join(', ')}]`);
        
        // Pass the potato
        for (let i = 0; i < passes - 1; i++) {
            const player = this.queue.dequeue();
            this.queue.enqueue(player);
            console.log(`  Pass ${i + 1}: ${player} passes to next player`);
        }
        
        // Eliminate the player holding the potato
        const eliminated = this.queue.dequeue();
        this.eliminated.push(eliminated);
        
        console.log(`💥 ${eliminated} is eliminated!`);
        console.log(`Remaining players: [${this.queue.toArray().join(', ')}]`);
        
        return null; // Game continues
    }
    
    // Play complete game
    playGame(passes = 3) {
        while (this.queue.size() > 1) {
            const winner = this.playRound(passes);
            if (winner) {
                console.log(`\n🎉 ${winner} wins the Hot Potato game!`);
                console.log(`Elimination order: [${this.eliminated.join(', ')}]`);
                return winner;
            }
        }
    }
}

// Printer queue simulation
class PrinterQueue {
    constructor() {
        this.queue = new Queue();
        this.currentJob = null;
        this.completedJobs = [];
        this.jobId = 1;
    }
    
    // Add print job
    addJob(document, pages = 1, priority = 'normal') {
        const job = {
            id: this.jobId++,
            document: document,
            pages: pages,
            priority: priority,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.queue.enqueue(job);
        console.log(`\n📄 Added print job: "${document}" (${pages} pages, ${priority} priority)`);
        console.log(`Queue position: ${this.queue.size()}`);
        
        return job;
    }
    
    // Process next job
    processNext() {
        if (this.currentJob) {
            console.log(`\n⚠️  Printer is busy with: "${this.currentJob.document}"`);
            return null;
        }
        
        if (this.queue.isEmpty()) {
            console.log(`\n📭 Print queue is empty`);
            return null;
        }
        
        this.currentJob = this.queue.dequeue();
        console.log(`\n🖨️  Processing: "${this.currentJob.document}" (${this.currentJob.pages} pages)`);
        
        // Simulate printing time
        setTimeout(() => {
            this.completeJob();
        }, this.currentJob.pages * 1000); // 1 second per page
        
        return this.currentJob;
    }
    
    // Complete current job
    completeJob() {
        if (this.currentJob) {
            this.completedJobs.push(this.currentJob);
            console.log(`\n✅ Completed: "${this.currentJob.document}"`);
            this.currentJob = null;
            
            // Process next job automatically
            if (!this.queue.isEmpty()) {
                this.processNext();
            }
        }
    }
    
    // Show queue status
    showStatus() {
        console.log(`\n📊 Printer Queue Status:`);
        
        if (this.currentJob) {
            console.log(`Currently printing: "${this.currentJob.document}" (${this.currentJob.pages} pages)`);
        } else {
            console.log(`Printer is idle`);
        }
        
        console.log(`Jobs in queue: ${this.queue.size()}`);
        
        if (!this.queue.isEmpty()) {
            console.log(`Next jobs:`);
            this.queue.toArray().forEach((job, index) => {
                console.log(`  ${index + 1}. "${job.document}" (${job.pages} pages, ${job.priority})`);
            });
        }
        
        console.log(`Completed jobs: ${this.completedJobs.length}`);
    }
}

// ============= COMPARISON PLAYGROUND =============

function compareStackVsQueue() {
    console.log(`\n🆚 Stack vs Queue Comparison Playground`);
    
    const stack = new Stack();
    const queue = new Queue();
    const data = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    
    console.log(`\n📥 Adding data: [${data.join(', ')}]`);
    
    // Add same data to both
    data.forEach(item => {
        stack.push(item);
        queue.enqueue(item);
    });
    
    console.log(`\nStack: [${stack.toArray().join(', ')}] ← TOP`);
    console.log(`Queue: FRONT → [${queue.toArray().join(', ')}] ← REAR`);
    
    console.log(`\n📤 Removing all elements:`);
    console.log(`\nStack (LIFO - Last In, First Out):`);
    let stackOrder = [];
    while (!stack.isEmpty()) {
        stackOrder.push(stack.pop());
    }
    console.log(`Order: [${stackOrder.join(', ')}]`);
    
    console.log(`\nQueue (FIFO - First In, First Out):`);
    let queueOrder = [];
    while (!queue.isEmpty()) {
        queueOrder.push(queue.dequeue());
    }
    console.log(`Order: [${queueOrder.join(', ')}]`);
    
    console.log(`\n💡 Key Difference:`);
    console.log(`Stack reverses the order (LIFO)`);
    console.log(`Queue preserves the order (FIFO)`);
}

// ============= PRACTICAL EXERCISES =============

function practicalExercises() {
    console.log(`\n🎯 Practical Exercises`);
    
    // Exercise 1: Undo/Redo system
    console.log(`\n1. Undo/Redo System:`);
    const undoStack = new Stack();
    const redoStack = new Stack();
    
    function executeCommand(command) {
        undoStack.push(command);
        redoStack.clear(); // Clear redo when new command is executed
        console.log(`Executed: ${command}`);
    }
    
    function undo() {
        if (!undoStack.isEmpty()) {
            const command = undoStack.pop();
            redoStack.push(command);
            console.log(`Undid: ${command}`);
        } else {
            console.log(`Nothing to undo`);
        }
    }
    
    function redo() {
        if (!redoStack.isEmpty()) {
            const command = redoStack.pop();
            undoStack.push(command);
            console.log(`Redid: ${command}`);
        } else {
            console.log(`Nothing to redo`);
        }
    }
    
    executeCommand("Type 'Hello'");
    executeCommand("Type ' World'");
    executeCommand("Bold text");
    undo();
    undo();
    redo();
    
    // Exercise 2: Browser tabs simulation
    console.log(`\n2. Browser Tabs (Stack):`);
    const tabs = new Stack();
    
    function openTab(url) {
        tabs.push(url);
        console.log(`Opened tab: ${url}`);
        console.log(`Active tabs: [${tabs.toArray().join(', ')}] ← Current`);
    }
    
    function closeTab() {
        if (!tabs.isEmpty()) {
            const closed = tabs.pop();
            console.log(`Closed tab: ${closed}`);
            console.log(`Active tabs: [${tabs.toArray().join(', ')}]${tabs.isEmpty() ? ' (no tabs)' : ' ← Current'}`);
        }
    }
    
    openTab("google.com");
    openTab("stackoverflow.com");
    openTab("github.com");
    closeTab();
    closeTab();
    
    // Exercise 3: Customer service queue
    console.log(`\n3. Customer Service Queue:`);
    const serviceQueue = new Queue();
    
    function addCustomer(name) {
        serviceQueue.enqueue(name);
        console.log(`${name} joined the queue`);
        console.log(`Queue: [${serviceQueue.toArray().join(', ')}] (${serviceQueue.size()} waiting)`);
    }
    
    function serveCustomer() {
        if (!serviceQueue.isEmpty()) {
            const served = serviceQueue.dequeue();
            console.log(`Now serving: ${served}`);
            console.log(`Queue: [${serviceQueue.toArray().join(', ')}] (${serviceQueue.size()} waiting)`);
        } else {
            console.log(`No customers waiting`);
        }
    }
    
    addCustomer("Alice");
    addCustomer("Bob");
    addCustomer("Charlie");
    serveCustomer();
    addCustomer("David");
    serveCustomer();
    serveCustomer();
}

// ============= PERFORMANCE PLAYGROUND =============

function performancePlayground() {
    console.log(`\n⚡ Performance Playground`);
    
    const sizes = [1000, 10000, 100000];
    
    sizes.forEach(size => {
        console.log(`\n📊 Testing with ${size} elements:`);
        
        // Stack performance
        console.time(`Stack operations (${size})`);
        const stack = new Stack();
        
        // Push all elements
        for (let i = 0; i < size; i++) {
            stack.push(i);
        }
        
        // Pop all elements
        while (!stack.isEmpty()) {
            stack.pop();
        }
        
        console.timeEnd(`Stack operations (${size})`);
        
        // Queue performance
        console.time(`Queue operations (${size})`);
        const queue = new Queue();
        
        // Enqueue all elements
        for (let i = 0; i < size; i++) {
            queue.enqueue(i);
        }
        
        // Dequeue all elements
        while (!queue.isEmpty()) {
            queue.dequeue();
        }
        
        console.timeEnd(`Queue operations (${size})`);
    });
    
    console.log(`\n💡 Note: Queue operations may be slower due to array.shift() being O(n)`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎮 PLAYING WITH STACKS & QUEUES - BODHI DSA COURSE");
console.log("=" .repeat(60));

// Interactive demonstrations
console.log("\n🎯 Interactive Stack Playground:");
const stackPlayground = new StackPlayground();
stackPlayground
    .push("First")
    .push("Second")
    .push("Third")
    .showState()
    .pop()
    .peek()
    .showHistory();

console.log("\n🎯 Interactive Queue Playground:");
const queuePlayground = new QueuePlayground();
queuePlayground
    .enqueue("Customer A")
    .enqueue("Customer B")
    .enqueue("Customer C")
    .showState()
    .dequeue()
    .peekFront()
    .showHistory();

// Games and challenges
console.log("\n🎮 Tower of Hanoi Game:");
const hanoi = new TowerOfHanoi(3);
hanoi.display();
hanoi.moveDisk('A', 'C');
hanoi.moveDisk('A', 'B');
hanoi.moveDisk('C', 'B');
hanoi.display();

console.log("\n🎯 Parentheses Balance Game:");
const parenGame = new ParenthesesGame();
parenGame.checkBalance("()[]{}");
parenGame.checkBalance("([)]");

console.log("\n🥔 Hot Potato Game:");
const hotPotato = new HotPotatoGame(['Alice', 'Bob', 'Charlie', 'David', 'Eve']);
hotPotato.playGame(3);

// Comparisons and exercises
compareStackVsQueue();
practicalExercises();

// Export classes and functions
module.exports = {
    Stack,
    Queue,
    StackPlayground,
    QueuePlayground,
    TowerOfHanoi,
    ParenthesesGame,
    HotPotatoGame,
    PrinterQueue,
    compareStackVsQueue,
    practicalExercises,
    performancePlayground
};
