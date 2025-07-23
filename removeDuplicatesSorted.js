/**
 * Remove Duplicates from Sorted List
 * Bodhi-DSA Course
 * 
 * Problem: Remove all duplicate nodes from a sorted linked list
 * Leave only distinct numbers from the original list
 * 
 * Example:
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 * 
 * Input: head = [1,1,2,2,3,3,3]
 * Output: [1,2,3]
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Using Set) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use Set to track seen values, create new list

function removeDuplicatesBruteForce(head) {
    if (!head) return null;
    
    const seen = new Set();
    const values = [];
    let current = head;
    
    // Collect unique values in order
    while (current) {
        if (!seen.has(current.val)) {
            seen.add(current.val);
            values.push(current.val);
        }
        current = current.next;
    }
    
    // Create new list with unique values
    if (values.length === 0) return null;
    
    const newHead = new ListNode(values[0]);
    current = newHead;
    
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }
    
    return newHead;
}

// ============= BETTER APPROACH (In-place with Previous Pointer) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Keep track of previous node, skip duplicates

function removeDuplicatesBetter(head) {
    if (!head || !head.next) return head;
    
    let current = head;
    
    while (current.next) {
        if (current.val === current.next.val) {
            // Skip the duplicate
            current.next = current.next.next;
        } else {
            // Move to next unique value
            current = current.next;
        }
    }
    
    return head;
}

// ============= OPTIMIZED APPROACH (Single Pass) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Optimal in-place removal using single pointer

function removeDuplicatesOptimized(head) {
    if (!head) return null;
    
    let current = head;
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            // Skip all nodes with same value
            current.next = current.next.next;
        } else {
            // Move to next different value
            current = current.next;
        }
    }
    
    return head;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Recursively process and remove duplicates

function removeDuplicatesRecursive(head) {
    // Base case: empty or single node
    if (!head || !head.next) return head;
    
    // Recursively process the rest
    head.next = removeDuplicatesRecursive(head.next);
    
    // If current and next have same value, skip current
    if (head.val === head.next.val) {
        return head.next;
    }
    
    return head;
}

// ============= TAIL RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use helper function with accumulator

function removeDuplicatesTailRecursive(head) {
    if (!head) return null;
    
    return removeDuplicatesHelper(head, null);
}

function removeDuplicatesHelper(current, result) {
    // Base case: reached end
    if (!current) return result;
    
    // Check if we should include current node
    if (!result || result.val !== current.val) {
        const newNode = new ListNode(current.val);
        if (!result) {
            return removeDuplicatesHelper(current.next, newNode);
        } else {
            // Find end of result list and append
            let tail = result;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = newNode;
        }
    }
    
    return removeDuplicatesHelper(current.next, result);
}

// ============= ADVANCED VARIATIONS =============

// Remove duplicates and count removed nodes
function removeDuplicatesWithCount(head) {
    if (!head) return { newHead: null, removedCount: 0 };
    
    let current = head;
    let removedCount = 0;
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
            removedCount++;
        } else {
            current = current.next;
        }
    }
    
    return {
        newHead: head,
        removedCount: removedCount
    };
}

// Remove duplicates and return removed values
function removeDuplicatesWithRemovedValues(head) {
    if (!head) return { newHead: null, removedValues: [] };
    
    let current = head;
    const removedValues = [];
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            removedValues.push(current.next.val);
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return {
        newHead: head,
        removedValues: removedValues
    };
}

// Remove duplicates keeping only first occurrence of each value
function removeDuplicatesKeepFirst(head) {
    if (!head) return null;
    
    let current = head;
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            // Skip all duplicates
            while (current.next && current.val === current.next.val) {
                current.next = current.next.next;
            }
        }
        current = current.next;
    }
    
    return head;
}

// Remove duplicates keeping only last occurrence of each value
function removeDuplicatesKeepLast(head) {
    if (!head) return null;
    
    // First pass: identify positions of last occurrences
    const lastOccurrence = new Map();
    let current = head;
    let position = 0;
    
    while (current) {
        lastOccurrence.set(current.val, position);
        current = current.next;
        position++;
    }
    
    // Second pass: keep only last occurrences
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    current = head;
    position = 0;
    
    while (current) {
        if (lastOccurrence.get(current.val) === position) {
            // Keep this node
            prev = current;
            current = current.next;
        } else {
            // Remove this node
            prev.next = current.next;
            current = current.next;
        }
        position++;
    }
    
    return dummy.next;
}

// Remove all duplicates (keep no duplicates at all)
function removeAllDuplicates(head) {
    if (!head) return null;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let prev = dummy;
    let current = head;
    
    while (current) {
        // Check if current value has duplicates
        if (current.next && current.val === current.next.val) {
            // Skip all nodes with this value
            const duplicateValue = current.val;
            while (current && current.val === duplicateValue) {
                current = current.next;
            }
            prev.next = current;
        } else {
            prev = current;
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

function listToArray(head) {
    const result = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
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

function countDuplicates(head) {
    if (!head) return 0;
    
    let count = 0;
    let current = head;
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            count++;
        }
        current = current.next;
    }
    
    return count;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRemoval(head) {
    console.log("\n=== Visualizing Duplicate Removal ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    console.log(`Duplicates to remove: ${countDuplicates(head)}`);
    
    let current = head;
    let step = 0;
    
    console.log("\nStep-by-step removal:");
    console.log(`Step ${step}: Current at [${current.val}]`);
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            step++;
            console.log(`Step ${step}: Found duplicate [${current.next.val}] - removing`);
            current.next = current.next.next;
            console.log(`         Current list: ${displayList(head)}`);
        } else {
            step++;
            current = current.next;
            console.log(`Step ${step}: Moving to [${current ? current.val : 'null'}]`);
        }
    }
    
    console.log(`\nFinal result: ${displayList(head)}`);
    return head;
}

function demonstrateRemovalMethods() {
    console.log("\n=== Demonstrating Duplicate Removal Methods ===");
    
    const testCases = [
        { list: [1, 1, 2, 3, 3], name: "Standard duplicates" },
        { list: [1, 1, 1, 2, 2, 3], name: "Multiple consecutive duplicates" },
        { list: [1, 2, 3, 4, 5], name: "No duplicates" },
        { list: [1, 1, 1, 1, 1], name: "All same values" },
        { list: [1], name: "Single node" },
        { list: [], name: "Empty list" }
    ];
    
    const methods = [
        { name: "Brute Force (Set)", func: removeDuplicatesBruteForce },
        { name: "Better (Previous)", func: removeDuplicatesBetter },
        { name: "Optimized (Single Pass)", func: removeDuplicatesOptimized },
        { name: "Recursive", func: removeDuplicatesRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: [${testCase.list.join(', ')}]`);
        
        methods.forEach(method => {
            const testList = createListFromArray(testCase.list);
            
            console.time(method.name);
            const result = method.func(testList);
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
        { name: "Brute Force (Set)", time: "O(n)", space: "O(n)", notes: "Extra space for Set" },
        { name: "Better (Previous)", time: "O(n)", space: "O(1)", notes: "In-place with tracking" },
        { name: "Optimized (Single)", time: "O(n)", space: "O(1)", notes: "Optimal solution" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Recursion stack" },
        { name: "Tail Recursive", time: "O(n)", space: "O(n)", notes: "Still uses call stack" }
    ];
    
    console.log("\n" + "=".repeat(90));
    console.log("| Approach            | Time | Space | Notes                    |");
    console.log("=".repeat(90));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(90));
    
    console.log("\n🏆 Winner: Optimized (Single Pass)");
    console.log("• O(n) time complexity - single traversal");
    console.log("• O(1) space complexity - in-place modification");
    console.log("• Simple and elegant implementation");
    console.log("• Takes advantage of sorted property");
}

function compareApproaches() {
    console.log("\n=== Comparing Duplicate Removal Approaches ===");
    
    const sizes = [1000, 5000, 10000];
    
    sizes.forEach(size => {
        console.log(`\nTesting with list size: ${size}`);
        
        // Create list with many duplicates (every 3rd element is duplicate)
        const testArray = [];
        for (let i = 0; i < size; i++) {
            testArray.push(Math.floor(i / 3));
        }
        
        const approaches = [
            { name: "Better", func: removeDuplicatesBetter },
            { name: "Optimized", func: removeDuplicatesOptimized },
            { name: "Recursive", func: removeDuplicatesRecursive }
        ];
        
        approaches.forEach(approach => {
            const testList = createListFromArray(testArray);
            
            console.time(`${approach.name}-${size}`);
            const result = approach.func(testList);
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
        { name: "Empty list", list: [], expected: [] },
        { name: "Single node", list: [1], expected: [1] },
        { name: "Two identical", list: [1, 1], expected: [1] },
        { name: "Two different", list: [1, 2], expected: [1, 2] },
        { name: "All same", list: [5, 5, 5, 5, 5], expected: [5] },
        { name: "No duplicates", list: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
        { name: "Alternating duplicates", list: [1, 1, 2, 2, 3, 3], expected: [1, 2, 3] },
        { name: "Long consecutive", list: [1, 1, 1, 2, 2, 2, 3, 3, 3], expected: [1, 2, 3] },
        { name: "Mixed pattern", list: [1, 2, 2, 3, 4, 4, 4, 5], expected: [1, 2, 3, 4, 5] }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        const list = createListFromArray(testCase.list);
        console.log(`Input: [${testCase.list.join(', ')}]`);
        
        const result = removeDuplicatesOptimized(list);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Remove Duplicates from Sorted List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master in-place duplicate removal");
    console.log("2. Leverage sorted property for efficiency");
    console.log("3. Handle consecutive duplicates properly");
    console.log("4. Optimize space complexity to O(1)");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Sorted list: duplicates are consecutive");
    console.log("2. Compare current with next node");
    console.log("3. Skip duplicates by updating next pointer");
    console.log("4. Only advance when values differ");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Since list is sorted, duplicates are adjacent");
    console.log("2. Compare current.val with current.next.val");
    console.log("3. If equal: skip next node (current.next = current.next.next)");
    console.log("4. If different: move to next node (current = current.next)");
    
    console.log("\n⚡ Why This Works:");
    console.log("1. Sorted property ensures all duplicates are consecutive");
    console.log("2. Single pass is sufficient to find all duplicates");
    console.log("3. In-place modification saves space");
    console.log("4. No need for additional data structures");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Always check current.next exists before comparing");
    console.log("2. Don't advance current when removing duplicates");
    console.log("3. Handle edge cases (empty, single node)");
    console.log("4. Test with various duplicate patterns");
    
    console.log("\n🎨 Sorted vs Unsorted:");
    console.log("• Sorted: O(n) time, O(1) space - optimal");
    console.log("• Unsorted: O(n) time, O(n) space - need hash table");
    console.log("• Sorting first: O(n log n) time - usually not worth it");
    
    visualizeRemoval(createListFromArray([1, 1, 2, 3, 3, 3, 4]));
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Database Query Results:**");
    console.log("   - Remove duplicate records from sorted results");
    console.log("   - Efficient deduplication in SQL ORDER BY");
    
    console.log("\n2. **Data Processing Pipelines:**");
    console.log("   - Clean sorted data streams");
    console.log("   - Remove duplicate entries in ETL processes");
    
    console.log("\n3. **Search Results:**");
    console.log("   - Deduplicate sorted search results");
    console.log("   - Remove repeated entries in autocomplete");
    
    console.log("\n4. **Log Analysis:**");
    console.log("   - Remove duplicate log entries");
    console.log("   - Clean sorted timestamp data");
    
    console.log("\n5. **Data Structures:**");
    console.log("   - Maintain unique elements in sorted lists");
    console.log("   - Implement set operations efficiently");
    
    console.log("\n📊 Example Applications:");
    
    // Student grades example
    const grades = createListFromArray([85, 85, 90, 92, 92, 95, 98, 98, 98]);
    console.log(`\nStudent grades: ${displayList(grades)}`);
    const uniqueGrades = removeDuplicatesOptimized(grades);
    console.log(`Unique grades: ${displayList(uniqueGrades)}`);
    
    // Product prices example
    const prices = createListFromArray([10, 15, 15, 20, 25, 25, 30]);
    console.log(`\nProduct prices: ${displayList(prices)}`);
    const uniquePrices = removeDuplicatesOptimized(prices);
    console.log(`Unique prices: ${displayList(uniquePrices)}`);
    
    // Advanced variations demonstration
    console.log(`\n--- Advanced Variations ---`);
    
    const testList = createListFromArray([1, 1, 2, 2, 2, 3, 4, 4, 5]);
    console.log(`Original: ${displayList(testList)}`);
    
    const countResult = removeDuplicatesWithCount(createListFromArray([1, 1, 2, 2, 2, 3, 4, 4, 5]));
    console.log(`Removed ${countResult.removedCount} duplicates: ${displayList(countResult.newHead)}`);
    
    const removedValues = removeDuplicatesWithRemovedValues(createListFromArray([1, 1, 2, 2, 2, 3, 4, 4, 5]));
    console.log(`Removed values: [${removedValues.removedValues.join(', ')}]`);
    
    const allRemoved = removeAllDuplicates(createListFromArray([1, 1, 2, 3, 3, 4, 5, 5]));
    console.log(`Remove all duplicates: ${displayList(allRemoved)}`);
}

// ============= TEST CASES =============

function testDuplicateRemoval() {
    console.log("\n=== Testing Duplicate Removal ===");
    
    console.log("\n--- Comprehensive Test Suite ---");
    
    const testCases = [
        { input: [1, 1, 2, 3, 3], expected: [1, 2, 3], description: "Standard case" },
        { input: [1, 1, 2, 2, 3, 3], expected: [1, 2, 3], description: "All pairs" },
        { input: [1, 1, 1, 2, 2, 3], expected: [1, 2, 3], description: "Multiple consecutive" },
        { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5], description: "No duplicates" },
        { input: [1, 1, 1, 1, 1], expected: [1], description: "All same" },
        { input: [1], expected: [1], description: "Single node" },
        { input: [], expected: [], description: "Empty list" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = createListFromArray(testCase.input);
        console.log(`Input: [${testCase.input.join(', ')}]`);
        
        const result = removeDuplicatesOptimized(list);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    console.log("\n--- Performance Test ---");
    
    console.log("\n1. Large list with many duplicates:");
    const largeArray = [];
    for (let i = 0; i < 10000; i++) {
        largeArray.push(Math.floor(i / 10)); // Every 10 elements have same value
    }
    
    const largeList = createListFromArray(largeArray);
    
    console.time("Large duplicate removal");
    const largeResult = removeDuplicatesOptimized(largeList);
    console.timeEnd("Large duplicate removal");
    
    const resultLength = getListLength(largeResult);
    console.log(`Original: 10,000 nodes, Result: ${resultLength} nodes`);
    console.log(`Expected: 1,000 unique values, Actual: ${resultLength}`);
    console.log(`Status: ${resultLength === 1000 ? '✅ PASS' : '❌ FAIL'}`);
    
    console.log("\n2. Method comparison:");
    const methods = [
        { name: "Better", func: removeDuplicatesBetter },
        { name: "Optimized", func: removeDuplicatesOptimized }
    ];
    
    methods.forEach(method => {
        const testList = createListFromArray(largeArray.slice(0, 1000));
        
        console.time(`${method.name} - 1000 nodes`);
        const result = method.func(testList);
        console.timeEnd(`${method.name} - 1000 nodes`);
        
        console.log(`  ${method.name}: Result length ${getListLength(result)}`);
    });
    
    console.log("\n3. Advanced variations test:");
    const variationsList = createListFromArray([1, 1, 2, 2, 3, 4, 4, 5, 5, 5]);
    
    console.log(`Original: ${displayList(variationsList)}`);
    
    const keepFirst = removeDuplicatesKeepFirst(createListFromArray([1, 1, 2, 2, 3, 4, 4, 5, 5, 5]));
    console.log(`Keep first: ${displayList(keepFirst)}`);
    
    const keepLast = removeDuplicatesKeepLast(createListFromArray([1, 1, 2, 2, 3, 4, 4, 5, 5, 5]));
    console.log(`Keep last: ${displayList(keepLast)}`);
    
    const removeAll = removeAllDuplicates(createListFromArray([1, 1, 2, 2, 3, 4, 4, 5, 5, 5]));
    console.log(`Remove all duplicates: ${displayList(removeAll)}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 REMOVE DUPLICATES FROM SORTED LIST - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstrateRemovalMethods();
practicalApplications();
testDuplicateRemoval();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    removeDuplicatesBruteForce,
    removeDuplicatesBetter,
    removeDuplicatesOptimized,
    removeDuplicatesRecursive,
    removeDuplicatesTailRecursive,
    removeDuplicatesWithCount,
    removeDuplicatesWithRemovedValues,
    removeDuplicatesKeepFirst,
    removeDuplicatesKeepLast,
    removeAllDuplicates,
    displayList,
    createListFromArray,
    visualizeRemoval,
    demonstrateRemovalMethods,
    interactiveLearning
};
