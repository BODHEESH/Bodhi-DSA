/**
 * Remove Linked List Elements
 * Bodhi-DSA Course
 * 
 * Problem: Remove all nodes from a linked list that have a specific value
 * 
 * Example:
 * Input: head = [1,2,6,3,4,5,6], val = 6
 * Output: [1,2,3,4,5]
 * 
 * Input: head = [7,7,7,7], val = 7
 * Output: []
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Multiple Passes) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Algorithm: Keep removing first occurrence until no more found

function removeElementsBruteForce(head, val) {
    if (!head) return null;
    
    let changed = true;
    
    while (changed) {
        changed = false;
        
        // Remove from head if needed
        while (head && head.val === val) {
            head = head.next;
            changed = true;
        }
        
        if (!head) return null;
        
        // Remove from middle/end
        let current = head;
        while (current.next) {
            if (current.next.val === val) {
                current.next = current.next.next;
                changed = true;
            } else {
                current = current.next;
            }
        }
    }
    
    return head;
}

// ============= BETTER APPROACH (Single Pass with Careful Handling) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Handle head separately, then traverse once

function removeElementsBetter(head, val) {
    if (!head) return null;
    
    // Remove all matching nodes from the beginning
    while (head && head.val === val) {
        head = head.next;
    }
    
    if (!head) return null;
    
    // Remove matching nodes from the rest
    let current = head;
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return head;
}

// ============= OPTIMIZED APPROACH (Dummy Node) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Use dummy node to handle head removal uniformly

function removeElementsOptimized(head, val) {
    // Create dummy node to simplify edge cases
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Recursively process rest of list, then decide current node

function removeElementsRecursive(head, val) {
    // Base case: empty list
    if (!head) return null;
    
    // Recursively process the rest of the list
    head.next = removeElementsRecursive(head.next, val);
    
    // Return next node if current should be removed, otherwise current
    return head.val === val ? head.next : head;
}

// ============= TAIL RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use helper function with accumulator

function removeElementsTailRecursive(head, val) {
    return removeElementsHelper(head, val, null);
}

function removeElementsHelper(current, val, newHead) {
    // Base case: reached end
    if (!current) return newHead;
    
    if (current.val === val) {
        // Skip current node
        return removeElementsHelper(current.next, val, newHead);
    } else {
        // Include current node
        const newNode = new ListNode(current.val);
        if (!newHead) {
            newHead = newNode;
            return removeElementsHelper(current.next, val, newHead);
        } else {
            // Find end of new list and append
            let tail = newHead;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = newNode;
            return removeElementsHelper(current.next, val, newHead);
        }
    }
}

// ============= ADVANCED VARIATIONS =============

// Remove elements with count tracking
function removeElementsWithCount(head, val) {
    if (!head) return { newHead: null, removedCount: 0 };
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    let removedCount = 0;
    
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
            removedCount++;
        } else {
            current = current.next;
        }
    }
    
    return {
        newHead: dummy.next,
        removedCount: removedCount
    };
}

// Remove elements and return removed nodes
function removeElementsWithRemovedNodes(head, val) {
    if (!head) return { newHead: null, removedNodes: [] };
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    const removedNodes = [];
    
    while (current.next) {
        if (current.next.val === val) {
            const removedNode = current.next;
            current.next = current.next.next;
            
            // Clean up removed node and store
            removedNode.next = null;
            removedNodes.push(removedNode);
        } else {
            current = current.next;
        }
    }
    
    return {
        newHead: dummy.next,
        removedNodes: removedNodes
    };
}

// Remove elements by custom predicate
function removeElementsByPredicate(head, predicate) {
    if (!head) return null;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    
    while (current.next) {
        if (predicate(current.next.val)) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}

// Remove multiple values
function removeMultipleValues(head, values) {
    if (!head || !values || values.length === 0) return head;
    
    const valuesToRemove = new Set(values);
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    
    while (current.next) {
        if (valuesToRemove.has(current.next.val)) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}

// Remove elements in range
function removeElementsInRange(head, min, max) {
    if (!head) return null;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    
    while (current.next) {
        if (current.next.val >= min && current.next.val <= max) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}

// ============= HELPER FUNCTIONS =============

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

function getListLength(head) {
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    return length;
}

function listToArray(head) {
    const result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRemoval(head, val) {
    console.log("\n=== Visualizing Element Removal ===");
    
    if (!head) {
        console.log("Empty list - nothing to remove");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    console.log(`Removing all nodes with value: ${val}`);
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let current = dummy;
    let step = 0;
    let removedCount = 0;
    
    console.log("\nStep-by-step removal process:");
    console.log(`Step ${step}: Starting with dummy -> ${displayList(head)}`);
    
    while (current.next) {
        if (current.next.val === val) {
            const removedValue = current.next.val;
            current.next = current.next.next;
            removedCount++;
            step++;
            
            console.log(`Step ${step}: Removed node [${removedValue}]`);
            console.log(`         Current list: ${displayList(dummy.next)}`);
        } else {
            current = current.next;
            step++;
            console.log(`Step ${step}: Kept node [${current.val}], moving forward`);
        }
    }
    
    console.log(`\nFinal result: ${displayList(dummy.next)}`);
    console.log(`Total nodes removed: ${removedCount}`);
    
    return dummy.next;
}

function demonstrateRemovalMethods() {
    console.log("\n=== Demonstrating Removal Methods ===");
    
    const testCases = [
        { list: [1, 2, 6, 3, 4, 5, 6], val: 6, name: "Remove from middle and end" },
        { list: [7, 7, 7, 7], val: 7, name: "Remove all nodes" },
        { list: [1, 2, 3, 4, 5], val: 6, name: "Remove non-existent value" },
        { list: [1], val: 1, name: "Remove single node" },
        { list: [1, 1, 1, 2, 3], val: 1, name: "Remove from head" }
    ];
    
    const methods = [
        { name: "Brute Force", func: removeElementsBruteForce },
        { name: "Better", func: removeElementsBetter },
        { name: "Optimized (Dummy)", func: removeElementsOptimized },
        { name: "Recursive", func: removeElementsRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: [${testCase.list.join(', ')}], Remove: ${testCase.val}`);
        
        methods.forEach(method => {
            const testList = createListFromArray(testCase.list);
            
            console.time(method.name);
            const result = method.func(testList, testCase.val);
            console.timeEnd(method.name);
            
            const resultArray = listToArray(result);
            console.log(`${method.name}: [${resultArray.join(', ')}]`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n²)", space: "O(1)", notes: "Multiple passes, inefficient" },
        { name: "Better", time: "O(n)", space: "O(1)", notes: "Single pass, head handling" },
        { name: "Optimized (Dummy)", time: "O(n)", space: "O(1)", notes: "Single pass, uniform logic" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursion stack overhead" },
        { name: "Tail Recursive", time: "O(n)", space: "O(n)", notes: "Still uses call stack" }
    ];
    
    console.log("\n" + "=".repeat(95));
    console.log("| Approach            | Time  | Space | Notes                        |");
    console.log("=".repeat(95));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(28);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(95));
    
    console.log("\n🏆 Winner: Optimized (Dummy Node) Method");
    console.log("• O(n) time complexity - single pass");
    console.log("• O(1) space complexity - constant extra space");
    console.log("• Uniform logic for all cases");
    console.log("• Clean and maintainable code");
}

function compareApproaches() {
    console.log("\n=== Comparing Removal Approaches ===");
    
    const sizes = [100, 1000, 10000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with list size: ${size}`);
        
        // Create test list with every 3rd element being the target value
        const testArray = Array.from({length: size}, (_, i) => i % 3 === 0 ? 999 : i);
        
        const approaches = [
            { name: "Better", func: removeElementsBetter },
            { name: "Optimized", func: removeElementsOptimized },
            { name: "Recursive", func: removeElementsRecursive }
        ];
        
        approaches.forEach(approach => {
            const testList = createListFromArray(testArray);
            
            console.time(`${approach.name}-${size}`);
            const result = approach.func(testList, 999);
            console.timeEnd(`${approach.name}-${size}`);
            
            const resultLength = getListLength(result);
            console.log(`  ${approach.name}: Result length ${resultLength}`);
        });
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        { name: "Empty list", list: [], val: 1, expected: [] },
        { name: "Single node - remove", list: [1], val: 1, expected: [] },
        { name: "Single node - keep", list: [1], val: 2, expected: [1] },
        { name: "All same values", list: [5, 5, 5, 5], val: 5, expected: [] },
        { name: "Remove from head", list: [1, 1, 2, 3], val: 1, expected: [2, 3] },
        { name: "Remove from tail", list: [1, 2, 3, 3], val: 3, expected: [1, 2] },
        { name: "Remove from middle", list: [1, 2, 2, 3], val: 2, expected: [1, 3] },
        { name: "No matches", list: [1, 2, 3, 4], val: 5, expected: [1, 2, 3, 4] },
        { name: "Alternating pattern", list: [1, 2, 1, 2, 1], val: 1, expected: [2, 2] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        const list = createListFromArray(testCase.list);
        console.log(`Input: [${testCase.list.join(', ')}], Remove: ${testCase.val}`);
        
        const result = removeElementsOptimized(list, testCase.val);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Remove Linked List Elements ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master different node removal techniques");
    console.log("2. Understand the dummy node pattern");
    console.log("3. Handle edge cases properly");
    console.log("4. Learn iterative vs recursive trade-offs");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Removal requires updating previous node's pointer");
    console.log("2. Head removal is a special case");
    console.log("3. Dummy node simplifies edge case handling");
    console.log("4. Single pass is more efficient than multiple passes");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Use dummy node to handle head removal uniformly");
    console.log("2. Maintain pointer to previous node");
    console.log("3. Skip nodes by updating next pointer");
    console.log("4. Continue until end of list");
    
    console.log("\n⚡ Dummy Node Benefits:");
    console.log("1. Eliminates special head handling");
    console.log("2. Uniform logic for all positions");
    console.log("3. Cleaner and more maintainable code");
    console.log("4. Reduces chance of bugs");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Always use dummy node for removal problems");
    console.log("2. Be careful with pointer updates");
    console.log("3. Don't advance current when removing");
    console.log("4. Test with all edge cases");
    
    visualizeRemoval(createListFromArray([1, 2, 6, 3, 4, 5, 6]), 6);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Data Cleaning:**");
    console.log("   - Remove invalid or corrupted records");
    console.log("   - Filter out unwanted data points");
    
    console.log("\n2. **Content Filtering:**");
    console.log("   - Remove spam or inappropriate content");
    console.log("   - Filter by user preferences");
    
    console.log("\n3. **Database Operations:**");
    console.log("   - Delete records matching criteria");
    console.log("   - Cleanup operations");
    
    console.log("\n4. **Stream Processing:**");
    console.log("   - Filter real-time data streams");
    console.log("   - Remove outliers or noise");
    
    console.log("\n5. **Configuration Management:**");
    console.log("   - Remove deprecated settings");
    console.log("   - Clean up configuration lists");
    
    console.log("\n📊 Example Applications:");
    
    // Remove negative numbers
    const numbersWithNegatives = createListFromArray([-1, 2, -3, 4, -5, 6]);
    console.log(`\nNumbers with negatives: ${displayList(numbersWithNegatives)}`);
    const positiveOnly = removeElementsByPredicate(numbersWithNegatives, val => val < 0);
    console.log(`Positive only: ${displayList(positiveOnly)}`);
    
    // Remove multiple values
    const mixedData = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log(`\nMixed data: ${displayList(mixedData)}`);
    const filtered = removeMultipleValues(mixedData, [2, 4, 6, 8]);
    console.log(`After removing evens: ${displayList(filtered)}`);
    
    // Remove in range
    const scoreList = createListFromArray([10, 25, 30, 45, 55, 70, 85, 90]);
    console.log(`\nScores: ${displayList(scoreList)}`);
    const passingScores = removeElementsInRange(scoreList, 0, 49);
    console.log(`Passing scores (≥50): ${displayList(passingScores)}`);
}

// ============= TEST CASES =============

function testRemovalOperations() {
    console.log("\n=== Testing Removal Operations ===");
    
    console.log("\n--- Comprehensive Test Suite ---");
    
    const testCases = [
        { input: [1, 2, 6, 3, 4, 5, 6], val: 6, expected: [1, 2, 3, 4, 5], description: "Standard case" },
        { input: [7, 7, 7, 7], val: 7, expected: [], description: "Remove all" },
        { input: [1, 2, 3, 4, 5], val: 6, expected: [1, 2, 3, 4, 5], description: "No matches" },
        { input: [1], val: 1, expected: [], description: "Single node removal" },
        { input: [2, 1], val: 1, expected: [2], description: "Remove from tail" },
        { input: [1, 2], val: 1, expected: [2], description: "Remove from head" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = createListFromArray(testCase.input);
        console.log(`Input: [${testCase.input.join(', ')}], Remove: ${testCase.val}`);
        
        const result = removeElementsOptimized(list, testCase.val);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Advanced Feature Tests ---");
    
    console.log("\n1. Removal with count:");
    const countList = createListFromArray([1, 2, 2, 3, 2, 4]);
    const countResult = removeElementsWithCount(countList, 2);
    console.log(`Original: [1, 2, 2, 3, 2, 4]`);
    console.log(`After removing 2s: ${displayList(countResult.newHead)}`);
    console.log(`Removed count: ${countResult.removedCount}`);
    
    console.log("\n2. Custom predicate removal:");
    const predicateList = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const evenRemoved = removeElementsByPredicate(predicateList, val => val % 2 === 0);
    console.log(`Original: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`);
    console.log(`After removing evens: ${displayList(evenRemoved)}`);
    
    console.log("\n3. Multiple values removal:");
    const multiList = createListFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const multiRemoved = removeMultipleValues(multiList, [2, 4, 6, 8]);
    console.log(`Original: [1, 2, 3, 4, 5, 6, 7, 8, 9]`);
    console.log(`After removing [2,4,6,8]: ${displayList(multiRemoved)}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REMOVE LINKED LIST ELEMENTS - BODHI DSA COURSE");
console.log("=" .repeat(60));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstrateRemovalMethods();
practicalApplications();
testRemovalOperations();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    removeElementsBruteForce,
    removeElementsBetter,
    removeElementsOptimized,
    removeElementsRecursive,
    removeElementsTailRecursive,
    removeElementsWithCount,
    removeElementsWithRemovedNodes,
    removeElementsByPredicate,
    removeMultipleValues,
    removeElementsInRange,
    displayList,
    createListFromArray,
    visualizeRemoval,
    demonstrateRemovalMethods,
    interactiveLearning
};
