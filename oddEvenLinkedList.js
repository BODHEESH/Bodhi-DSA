/**
 * Odd Even Linked List
 * Bodhi-DSA Course
 * 
 * Problem: Rearrange a linked list so that all odd-positioned nodes come first,
 * followed by all even-positioned nodes. Maintain relative order within groups.
 * 
 * Example:
 * Input: head = [1,2,3,4,5]
 * Output: [1,3,5,2,4]
 * 
 * Input: head = [2,1,3,5,6,4,7]
 * Output: [2,3,6,7,1,5,4]
 * 
 * Note: Position is 1-indexed (first node is odd position)
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Array Storage) =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Store values in arrays, then reconstruct

function oddEvenListBruteForce(head) {
    if (!head || !head.next) return head;
    
    const oddValues = [];
    const evenValues = [];
    let current = head;
    let position = 1;
    
    // Separate odd and even positioned values
    while (current) {
        if (position % 2 === 1) {
            oddValues.push(current.val);
        } else {
            evenValues.push(current.val);
        }
        current = current.next;
        position++;
    }
    
    // Reconstruct list: odd values first, then even values
    current = head;
    
    // Fill odd values
    for (let i = 0; i < oddValues.length; i++) {
        current.val = oddValues[i];
        current = current.next;
    }
    
    // Fill even values
    for (let i = 0; i < evenValues.length; i++) {
        current.val = evenValues[i];
        current = current.next;
    }
    
    return head;
}

// ============= BETTER APPROACH (Two Pass with Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: First pass to separate, second pass to connect

function oddEvenListBetter(head) {
    if (!head || !head.next) return head;
    
    let oddHead = null, oddTail = null;
    let evenHead = null, evenTail = null;
    let current = head;
    let position = 1;
    
    // First pass: separate odd and even nodes
    while (current) {
        const nextNode = current.next;
        current.next = null; // Disconnect current node
        
        if (position % 2 === 1) {
            // Odd position
            if (!oddHead) {
                oddHead = oddTail = current;
            } else {
                oddTail.next = current;
                oddTail = current;
            }
        } else {
            // Even position
            if (!evenHead) {
                evenHead = evenTail = current;
            } else {
                evenTail.next = current;
                evenTail = current;
            }
        }
        
        current = nextNode;
        position++;
    }
    
    // Connect odd list to even list
    if (oddTail) {
        oddTail.next = evenHead;
    }
    
    return oddHead || evenHead;
}

// ============= OPTIMIZED APPROACH (Single Pass Two Pointers) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Algorithm: Maintain odd and even chains simultaneously

function oddEvenListOptimized(head) {
    if (!head || !head.next) return head;
    
    let odd = head;           // Points to current odd node
    let even = head.next;     // Points to current even node
    let evenHead = even;      // Remember start of even chain
    
    // Rearrange nodes by connecting odd->odd and even->even
    while (even && even.next) {
        // Connect current odd to next odd
        odd.next = even.next;
        odd = odd.next;
        
        // Connect current even to next even
        even.next = odd.next;
        even = even.next;
    }
    
    // Connect end of odd chain to start of even chain
    odd.next = evenHead;
    
    return head;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n) - recursion stack
// Algorithm: Recursively separate and connect chains

function oddEvenListRecursive(head) {
    if (!head || !head.next) return head;
    
    const result = separateOddEven(head, 1);
    
    // Connect odd chain to even chain
    if (result.oddTail) {
        result.oddTail.next = result.evenHead;
    }
    
    return result.oddHead || result.evenHead;
}

function separateOddEven(node, position) {
    if (!node) {
        return {
            oddHead: null,
            oddTail: null,
            evenHead: null,
            evenTail: null
        };
    }
    
    // Recursively process rest of the list
    const rest = separateOddEven(node.next, position + 1);
    
    // Disconnect current node
    node.next = null;
    
    if (position % 2 === 1) {
        // Current is odd position
        if (!rest.oddHead) {
            return {
                oddHead: node,
                oddTail: node,
                evenHead: rest.evenHead,
                evenTail: rest.evenTail
            };
        } else {
            node.next = rest.oddHead;
            return {
                oddHead: node,
                oddTail: rest.oddTail,
                evenHead: rest.evenHead,
                evenTail: rest.evenTail
            };
        }
    } else {
        // Current is even position
        if (!rest.evenHead) {
            return {
                oddHead: rest.oddHead,
                oddTail: rest.oddTail,
                evenHead: node,
                evenTail: node
            };
        } else {
            node.next = rest.evenHead;
            return {
                oddHead: rest.oddHead,
                oddTail: rest.oddTail,
                evenHead: node,
                evenTail: rest.evenTail
            };
        }
    }
}

// ============= ADVANCED VARIATIONS =============

// Odd-even by value instead of position
function oddEvenListByValue(head) {
    if (!head) return head;
    
    let oddHead = null, oddTail = null;
    let evenHead = null, evenTail = null;
    let current = head;
    
    while (current) {
        const nextNode = current.next;
        current.next = null;
        
        if (current.val % 2 === 1) {
            // Odd value
            if (!oddHead) {
                oddHead = oddTail = current;
            } else {
                oddTail.next = current;
                oddTail = current;
            }
        } else {
            // Even value
            if (!evenHead) {
                evenHead = evenTail = current;
            } else {
                evenTail.next = current;
                evenTail = current;
            }
        }
        
        current = nextNode;
    }
    
    // Connect odd values to even values
    if (oddTail) {
        oddTail.next = evenHead;
    }
    
    return oddHead || evenHead;
}

// Reverse odd-even arrangement (even positions first)
function evenOddList(head) {
    if (!head || !head.next) return head;
    
    let even = head;
    let odd = head.next;
    let oddHead = odd;
    
    while (odd && odd.next) {
        even.next = odd.next;
        even = even.next;
        
        odd.next = even.next;
        odd = odd.next;
    }
    
    even.next = oddHead;
    return head;
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

// ============= VISUALIZATION FUNCTIONS =============

function visualizeOddEvenRearrangement(head) {
    console.log("\n=== Visualizing Odd-Even Rearrangement ===");
    
    if (!head) {
        console.log("Empty list");
        return null;
    }
    
    console.log(`Original list: ${displayList(head)}`);
    
    // Analyze positions
    let current = head;
    let position = 1;
    const oddPositions = [];
    const evenPositions = [];
    
    while (current) {
        if (position % 2 === 1) {
            oddPositions.push(`[${position}:${current.val}]`);
        } else {
            evenPositions.push(`[${position}:${current.val}]`);
        }
        current = current.next;
        position++;
    }
    
    console.log(`Odd positions: ${oddPositions.join(', ')}`);
    console.log(`Even positions: ${evenPositions.join(', ')}`);
    
    // Perform rearrangement
    const result = oddEvenListOptimized(head);
    console.log(`Final result: ${displayList(result)}`);
    
    return result;
}

function demonstrateOddEvenMethods() {
    console.log("\n=== Demonstrating Odd-Even Methods ===");
    
    const testCases = [
        { list: [1, 2, 3, 4, 5], name: "Standard case" },
        { list: [2, 1, 3, 5, 6, 4, 7], name: "Mixed values" },
        { list: [1, 2, 3, 4], name: "Even length" },
        { list: [1, 2, 3], name: "Odd length" },
        { list: [1, 2], name: "Two nodes" },
        { list: [1], name: "Single node" }
    ];
    
    const methods = [
        { name: "Brute Force", func: oddEvenListBruteForce },
        { name: "Better", func: oddEvenListBetter },
        { name: "Optimized", func: oddEvenListOptimized },
        { name: "Recursive", func: oddEvenListRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        console.log(`Input: [${testCase.list.join(', ')}]`);
        
        methods.forEach(method => {
            const testList = createListFromArray(testCase.list);
            const result = method.func(testList);
            const resultArray = listToArray(result);
            console.log(`${method.name}: [${resultArray.join(', ')}]`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(n)", space: "O(n)", notes: "Extra arrays" },
        { name: "Better", time: "O(n)", space: "O(1)", notes: "Two passes" },
        { name: "Optimized", time: "O(n)", space: "O(1)", notes: "Single pass" },
        { name: "Recursive", time: "O(n)", space: "O(n)", notes: "Call stack" }
    ];
    
    console.log("\n" + "=".repeat(80));
    console.log("| Approach    | Time | Space | Notes        |");
    console.log("=".repeat(80));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(4);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(12);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(80));
    
    console.log("\n🏆 Winner: Optimized (Single Pass)");
    console.log("• O(n) time - single traversal");
    console.log("• O(1) space - in-place rearrangement");
    console.log("• Elegant two-pointer technique");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Odd-Even Linked List ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master position-based rearrangement");
    console.log("2. Understand two-pointer chain manipulation");
    console.log("3. Maintain relative order within groups");
    console.log("4. Optimize to O(1) space complexity");
    
    console.log("\n📝 Key Algorithm:");
    console.log("1. Use two pointers: odd and even");
    console.log("2. Odd connects: 1->3->5->...");
    console.log("3. Even connects: 2->4->6->...");
    console.log("4. Finally: odd chain -> even chain");
    
    console.log("\n🔧 Implementation:");
    console.log("• odd = head, even = head.next");
    console.log("• while (even && even.next):");
    console.log("  - odd.next = even.next");
    console.log("  - even.next = odd.next");
    console.log("• odd.next = evenHead");
    
    visualizeOddEvenRearrangement(createListFromArray([1, 2, 3, 4, 5, 6]));
}

// ============= TEST CASES =============

function testOddEvenRearrangement() {
    console.log("\n=== Testing Odd-Even Rearrangement ===");
    
    const testCases = [
        { input: [1, 2, 3, 4, 5], expected: [1, 3, 5, 2, 4], description: "Standard" },
        { input: [2, 1, 3, 5, 6, 4, 7], expected: [2, 3, 6, 7, 1, 5, 4], description: "Mixed" },
        { input: [1, 2, 3, 4], expected: [1, 3, 2, 4], description: "Even length" },
        { input: [1, 2, 3], expected: [1, 3, 2], description: "Odd length" },
        { input: [1, 2], expected: [1, 2], description: "Two nodes" },
        { input: [1], expected: [1], description: "Single" },
        { input: [], expected: [], description: "Empty" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list = createListFromArray(testCase.input);
        console.log(`Input: [${testCase.input.join(', ')}]`);
        
        const result = oddEvenListOptimized(list);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Performance test
    console.log("\n--- Performance Test ---");
    const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
    const largeList = createListFromArray(largeArray);
    
    console.time("Large list rearrangement");
    const result = oddEvenListOptimized(largeList);
    console.timeEnd("Large list rearrangement");
    
    console.log(`Result length: ${getListLength(result)}`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Data Processing:** Separate by priority");
    console.log("2. **Game Development:** Player turn arrangements");
    console.log("3. **UI Design:** Visual grouping patterns");
    console.log("4. **Memory Management:** Access pattern optimization");
    
    // Example: Student seating
    const students = createListFromArray([101, 102, 103, 104, 105, 106]);
    console.log(`\nStudents: ${displayList(students)}`);
    const seating = oddEvenListOptimized(students);
    console.log(`Seating (odd rows first): ${displayList(seating)}`);
    
    // Example: By value
    const numbers = createListFromArray([1, 2, 3, 4, 5, 6]);
    console.log(`\nNumbers: ${displayList(numbers)}`);
    const byValue = oddEvenListByValue(numbers);
    console.log(`By value (odds first): ${displayList(byValue)}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ODD-EVEN LINKED LIST - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateOddEvenMethods();
testOddEvenRearrangement();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    oddEvenListBruteForce,
    oddEvenListBetter,
    oddEvenListOptimized,
    oddEvenListRecursive,
    oddEvenListByValue,
    evenOddList,
    displayList,
    createListFromArray,
    visualizeOddEvenRearrangement,
    demonstrateOddEvenMethods,
    interactiveLearning
};
