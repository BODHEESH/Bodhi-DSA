/**
 * Merge Two Sorted Lists
 * Bodhi-DSA Course
 * 
 * Problem: Merge two sorted linked lists and return it as a sorted list.
 * The list should be made by splicing together the nodes of the first two lists.
 * 
 * Example:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * 
 * Input: list1 = [], list2 = []
 * Output: []
 * 
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Collect and Sort) =============
// Time Complexity: O((m+n)log(m+n)) | Space Complexity: O(m+n)
// Algorithm: Collect all values, sort, create new list

function mergeTwoListsBruteForce(list1, list2) {
    const values = [];
    
    // Collect all values
    let current = list1;
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    current = list2;
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    // Sort values
    values.sort((a, b) => a - b);
    
    // Create new sorted list
    if (values.length === 0) return null;
    
    const head = new ListNode(values[0]);
    current = head;
    
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
    }
    
    return head;
}

// ============= BETTER APPROACH (Two Pointers with New Nodes) =============
// Time Complexity: O(m+n) | Space Complexity: O(m+n)
// Algorithm: Compare and create new nodes

function mergeTwoListsBetter(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    let p1 = list1;
    let p2 = list2;
    
    while (p1 && p2) {
        if (p1.val <= p2.val) {
            current.next = new ListNode(p1.val);
            p1 = p1.next;
        } else {
            current.next = new ListNode(p2.val);
            p2 = p2.next;
        }
        current = current.next;
    }
    
    // Add remaining nodes
    while (p1) {
        current.next = new ListNode(p1.val);
        current = current.next;
        p1 = p1.next;
    }
    
    while (p2) {
        current.next = new ListNode(p2.val);
        current = current.next;
        p2 = p2.next;
    }
    
    return dummy.next;
}

// ============= OPTIMIZED APPROACH (In-place Merge) =============
// Time Complexity: O(m+n) | Space Complexity: O(1)
// Algorithm: Reuse existing nodes, optimal solution

function mergeTwoListsOptimized(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes
    current.next = list1 || list2;
    
    return dummy.next;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(m+n) | Space Complexity: O(m+n) - recursion stack
// Algorithm: Recursively merge smaller and smaller sublists

function mergeTwoListsRecursive(list1, list2) {
    // Base cases
    if (!list1) return list2;
    if (!list2) return list1;
    
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}

// ============= TAIL RECURSIVE APPROACH =============
// Time Complexity: O(m+n) | Space Complexity: O(m+n)
// Algorithm: Tail recursive with accumulator

function mergeTwoListsTailRecursive(list1, list2) {
    const dummy = new ListNode(0);
    return mergeHelper(list1, list2, dummy, dummy);
}

function mergeHelper(list1, list2, dummy, current) {
    // Base case: one or both lists exhausted
    if (!list1 && !list2) {
        return dummy.next;
    }
    
    if (!list1) {
        current.next = list2;
        return dummy.next;
    }
    
    if (!list2) {
        current.next = list1;
        return dummy.next;
    }
    
    if (list1.val <= list2.val) {
        current.next = list1;
        return mergeHelper(list1.next, list2, dummy, list1);
    } else {
        current.next = list2;
        return mergeHelper(list1, list2.next, dummy, list2);
    }
}

// ============= ADVANCED VARIATIONS =============

// Merge multiple sorted lists
function mergeMultipleLists(lists) {
    if (!lists || lists.length === 0) return null;
    if (lists.length === 1) return lists[0];
    
    // Divide and conquer approach
    while (lists.length > 1) {
        const mergedLists = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            const list1 = lists[i];
            const list2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoListsOptimized(list1, list2));
        }
        
        lists = mergedLists;
    }
    
    return lists[0];
}

// Merge with custom comparator
function mergeTwoListsCustom(list1, list2, compareFn = (a, b) => a - b) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (compareFn(list1.val, list2.val) <= 0) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}

// Merge and remove duplicates
function mergeTwoListsUnique(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let lastValue = null;
    
    while (list1 && list2) {
        let nextValue;
        let nextNode;
        
        if (list1.val <= list2.val) {
            nextValue = list1.val;
            nextNode = list1;
            list1 = list1.next;
        } else {
            nextValue = list2.val;
            nextNode = list2;
            list2 = list2.next;
        }
        
        // Only add if different from last value
        if (nextValue !== lastValue) {
            current.next = nextNode;
            current = current.next;
            lastValue = nextValue;
        }
    }
    
    // Handle remaining nodes
    let remaining = list1 || list2;
    while (remaining) {
        if (remaining.val !== lastValue) {
            current.next = remaining;
            current = current.next;
            lastValue = remaining.val;
        }
        remaining = remaining.next;
    }
    
    // Ensure last node points to null
    if (current !== dummy) {
        current.next = null;
    }
    
    return dummy.next;
}

// Merge with intersection only
function mergeTwoListsIntersection(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val === list2.val) {
            current.next = new ListNode(list1.val);
            current = current.next;
            list1 = list1.next;
            list2 = list2.next;
        } else if (list1.val < list2.val) {
            list1 = list1.next;
        } else {
            list2 = list2.next;
        }
    }
    
    return dummy.next;
}

// Merge alternating nodes
function mergeTwoListsAlternating(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let useFirst = true;
    
    while (list1 && list2) {
        if (useFirst) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
        useFirst = !useFirst;
    }
    
    // Attach remaining nodes
    current.next = list1 || list2;
    
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

function isSorted(head) {
    if (!head || !head.next) return true;
    
    let current = head;
    while (current.next) {
        if (current.val > current.next.val) {
            return false;
        }
        current = current.next;
    }
    
    return true;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeMerge(list1, list2) {
    console.log("\n=== Visualizing Merge Process ===");
    
    if (!list1 && !list2) {
        console.log("Both lists are empty");
        return null;
    }
    
    console.log(`List 1: ${displayList(list1)}`);
    console.log(`List 2: ${displayList(list2)}`);
    
    const dummy = new ListNode(0);
    let current = dummy;
    let p1 = list1, p2 = list2;
    let step = 0;
    
    console.log("\nStep-by-step merge:");
    
    while (p1 && p2) {
        step++;
        if (p1.val <= p2.val) {
            console.log(`Step ${step}: Choose ${p1.val} from list1`);
            current.next = p1;
            p1 = p1.next;
        } else {
            console.log(`Step ${step}: Choose ${p2.val} from list2`);
            current.next = p2;
            p2 = p2.next;
        }
        current = current.next;
        
        const partialResult = listToArray(dummy.next);
        console.log(`         Current result: [${partialResult.join(', ')}]`);
    }
    
    // Handle remaining
    if (p1) {
        step++;
        console.log(`Step ${step}: Attach remaining from list1: ${displayList(p1)}`);
        current.next = p1;
    }
    
    if (p2) {
        step++;
        console.log(`Step ${step}: Attach remaining from list2: ${displayList(p2)}`);
        current.next = p2;
    }
    
    const result = dummy.next;
    console.log(`\nFinal result: ${displayList(result)}`);
    
    return result;
}

function demonstrateMergeMethods() {
    console.log("\n=== Demonstrating Merge Methods ===");
    
    const testCases = [
        { list1: [1, 2, 4], list2: [1, 3, 4], name: "Standard case" },
        { list1: [], list2: [], name: "Both empty" },
        { list1: [], list2: [0], name: "One empty" },
        { list1: [1, 3, 5], list2: [2, 4, 6], name: "Alternating" },
        { list1: [1, 1, 1], list2: [2, 2, 2], name: "All different" },
        { list1: [1, 2, 3, 4, 5], list2: [6, 7, 8], name: "No overlap" }
    ];
    
    const methods = [
        { name: "Brute Force", func: mergeTwoListsBruteForce },
        { name: "Better", func: mergeTwoListsBetter },
        { name: "Optimized", func: mergeTwoListsOptimized },
        { name: "Recursive", func: mergeTwoListsRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`List1: [${testCase.list1.join(', ')}]`);
        console.log(`List2: [${testCase.list2.join(', ')}]`);
        
        methods.forEach(method => {
            const l1 = createListFromArray(testCase.list1);
            const l2 = createListFromArray(testCase.list2);
            
            console.time(method.name);
            const result = method.func(l1, l2);
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
        { name: "Brute Force", time: "O((m+n)log(m+n))", space: "O(m+n)", notes: "Sorting overhead" },
        { name: "Better", time: "O(m+n)", space: "O(m+n)", notes: "New nodes created" },
        { name: "Optimized", time: "O(m+n)", space: "O(1)", notes: "Optimal solution" },
        { name: "Recursive", time: "O(m+n)", space: "O(m+n)", notes: "Call stack" }
    ];
    
    console.log("\n" + "=".repeat(100));
    console.log("| Approach    | Time              | Space    | Notes            |");
    console.log("=".repeat(100));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(17);
        const space = approach.space.padEnd(8);
        const notes = approach.notes.padEnd(16);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(100));
    
    console.log("\n🏆 Winner: Optimized (In-place Merge)");
    console.log("• O(m+n) time - single pass through both lists");
    console.log("• O(1) space - reuses existing nodes");
    console.log("• Maintains sorted order efficiently");
    console.log("• Most practical for real-world use");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Merge Two Sorted Lists ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master two-pointer merge technique");
    console.log("2. Leverage sorted property for efficiency");
    console.log("3. Handle edge cases (empty lists)");
    console.log("4. Optimize space complexity to O(1)");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Both input lists are already sorted");
    console.log("2. Compare heads of both lists");
    console.log("3. Choose smaller value and advance that pointer");
    console.log("4. Attach remaining nodes at the end");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Use dummy head for easier result construction");
    console.log("2. Two pointers: one for each input list");
    console.log("3. Always pick the smaller current value");
    console.log("4. When one list exhausted, attach the other");
    
    console.log("\n⚡ Why This Works:");
    console.log("1. Sorted property ensures correct order");
    console.log("2. Greedy choice (always pick smaller) is optimal");
    console.log("3. Single pass is sufficient");
    console.log("4. No need to sort - just merge");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Use dummy head: dummy = new ListNode(0)");
    console.log("2. Handle null lists gracefully");
    console.log("3. Reuse existing nodes for O(1) space");
    console.log("4. Don't forget remaining nodes");
    
    visualizeMerge(
        createListFromArray([1, 3, 5]),
        createListFromArray([2, 4, 6])
    );
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Database Operations:**");
    console.log("   - Merge sorted query results");
    console.log("   - Combine ordered datasets");
    
    console.log("\n2. **External Sorting:**");
    console.log("   - Merge phase in merge sort");
    console.log("   - Combine sorted chunks");
    
    console.log("\n3. **Data Processing:**");
    console.log("   - Merge sorted logs by timestamp");
    console.log("   - Combine ordered streams");
    
    console.log("\n4. **Search Systems:**");
    console.log("   - Merge ranked search results");
    console.log("   - Combine sorted indices");
    
    console.log("\n📊 Example Applications:");
    
    // Merge student scores
    const class1Scores = createListFromArray([85, 90, 95]);
    const class2Scores = createListFromArray([88, 92, 97]);
    console.log(`\nClass 1 scores: ${displayList(class1Scores)}`);
    console.log(`Class 2 scores: ${displayList(class2Scores)}`);
    const allScores = mergeTwoListsOptimized(class1Scores, class2Scores);
    console.log(`Combined scores: ${displayList(allScores)}`);
    
    // Multiple lists merge
    const lists = [
        createListFromArray([1, 4, 7]),
        createListFromArray([2, 5, 8]),
        createListFromArray([3, 6, 9])
    ];
    console.log(`\nMerging multiple lists:`);
    lists.forEach((list, i) => console.log(`List ${i + 1}: ${displayList(list)}`));
    const multiMerged = mergeMultipleLists(lists);
    console.log(`Result: ${displayList(multiMerged)}`);
    
    // Custom comparator (descending)
    const desc1 = createListFromArray([9, 7, 5]);
    const desc2 = createListFromArray([8, 6, 4]);
    console.log(`\nDescending merge:`);
    console.log(`List 1: ${displayList(desc1)}`);
    console.log(`List 2: ${displayList(desc2)}`);
    const descMerged = mergeTwoListsCustom(desc1, desc2, (a, b) => b - a);
    console.log(`Result: ${displayList(descMerged)}`);
}

// ============= TEST CASES =============

function testMergeTwoLists() {
    console.log("\n=== Testing Merge Two Sorted Lists ===");
    
    const testCases = [
        { list1: [1, 2, 4], list2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4], description: "Standard case" },
        { list1: [], list2: [], expected: [], description: "Both empty" },
        { list1: [], list2: [0], expected: [0], description: "One empty" },
        { list1: [1], list2: [2], expected: [1, 2], description: "Single nodes" },
        { list1: [1, 3, 5], list2: [2, 4, 6], expected: [1, 2, 3, 4, 5, 6], description: "Alternating" },
        { list1: [1, 2, 3], list2: [4, 5, 6], expected: [1, 2, 3, 4, 5, 6], description: "No overlap" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list1 = createListFromArray(testCase.list1);
        const list2 = createListFromArray(testCase.list2);
        
        console.log(`List1: [${testCase.list1.join(', ')}]`);
        console.log(`List2: [${testCase.list2.join(', ')}]`);
        
        const result = mergeTwoListsOptimized(list1, list2);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        const isSortedResult = isSorted(result);
        
        console.log(`Correct: ${isEqual ? '✅' : '❌'} | Sorted: ${isSortedResult ? '✅' : '❌'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const large1 = createListFromArray(Array.from({ length: 1000 }, (_, i) => i * 2));
    const large2 = createListFromArray(Array.from({ length: 1000 }, (_, i) => i * 2 + 1));
    
    console.time("Large list merge");
    const largeResult = mergeTwoListsOptimized(large1, large2);
    console.timeEnd("Large list merge");
    
    const resultLength = getListLength(largeResult);
    const resultSorted = isSorted(largeResult);
    
    console.log(`Result length: ${resultLength} (expected: 2000)`);
    console.log(`Result sorted: ${resultSorted ? '✅' : '❌'}`);
    console.log(`Status: ${resultLength === 2000 && resultSorted ? '✅ PASS' : '❌ FAIL'}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 MERGE TWO SORTED LISTS - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateMergeMethods();
testMergeTwoLists();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    mergeTwoListsBruteForce,
    mergeTwoListsBetter,
    mergeTwoListsOptimized,
    mergeTwoListsRecursive,
    mergeTwoListsTailRecursive,
    mergeMultipleLists,
    mergeTwoListsCustom,
    mergeTwoListsUnique,
    displayList,
    createListFromArray,
    visualizeMerge,
    demonstrateMergeMethods,
    interactiveLearning
};
