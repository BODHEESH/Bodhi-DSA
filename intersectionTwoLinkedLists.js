/**
 * Intersection of Two Linked Lists
 * Bodhi-DSA Course
 * 
 * Problem: Find the node at which two linked lists intersect
 * Return null if the two linked lists have no intersection at all
 * 
 * Example:
 * List A: 4 -> 1 -> 8 -> 4 -> 5 -> null
 * List B:      5 -> 6 -> 1 -> 8 -> 4 -> 5 -> null
 *                            ^
 *                      Intersection at node 8
 * 
 * Note: The intersection is based on reference, not value
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Nested Loops) =============
// Time Complexity: O(m * n) | Space Complexity: O(1)
// Algorithm: For each node in list A, traverse entire list B to find match

function getIntersectionBruteForce(headA, headB) {
    if (!headA || !headB) return null;
    
    let currentA = headA;
    
    // For each node in list A
    while (currentA) {
        let currentB = headB;
        
        // Check against every node in list B
        while (currentB) {
            if (currentA === currentB) {
                return currentA; // Found intersection
            }
            currentB = currentB.next;
        }
        currentA = currentA.next;
    }
    
    return null; // No intersection found
}

// ============= BETTER APPROACH (Hash Set) =============
// Time Complexity: O(m + n) | Space Complexity: O(m)
// Algorithm: Store all nodes of list A in set, then check list B

function getIntersectionBetter(headA, headB) {
    if (!headA || !headB) return null;
    
    const visitedNodes = new Set();
    
    // Store all nodes from list A
    let currentA = headA;
    while (currentA) {
        visitedNodes.add(currentA);
        currentA = currentA.next;
    }
    
    // Check each node in list B
    let currentB = headB;
    while (currentB) {
        if (visitedNodes.has(currentB)) {
            return currentB; // Found intersection
        }
        currentB = currentB.next;
    }
    
    return null; // No intersection
}

// ============= OPTIMIZED APPROACH (Two Pointers with Length Difference) =============
// Time Complexity: O(m + n) | Space Complexity: O(1)
// Algorithm: Calculate lengths, align pointers, then traverse together

function getIntersectionOptimized(headA, headB) {
    if (!headA || !headB) return null;
    
    // Calculate lengths of both lists
    const lengthA = getListLength(headA);
    const lengthB = getListLength(headB);
    
    let currentA = headA;
    let currentB = headB;
    
    // Align the starting positions
    const diff = Math.abs(lengthA - lengthB);
    
    if (lengthA > lengthB) {
        // Move pointer A forward by difference
        for (let i = 0; i < diff; i++) {
            currentA = currentA.next;
        }
    } else {
        // Move pointer B forward by difference
        for (let i = 0; i < diff; i++) {
            currentB = currentB.next;
        }
    }
    
    // Now traverse both lists together
    while (currentA && currentB) {
        if (currentA === currentB) {
            return currentA; // Found intersection
        }
        currentA = currentA.next;
        currentB = currentB.next;
    }
    
    return null; // No intersection
}

// ============= MOST ELEGANT APPROACH (Two Pointers - Switch Lists) =============
// Time Complexity: O(m + n) | Space Complexity: O(1)
// Algorithm: When reaching end, switch to other list's head

function getIntersectionElegant(headA, headB) {
    if (!headA || !headB) return null;
    
    let pointerA = headA;
    let pointerB = headB;
    
    // Keep traversing until pointers meet
    while (pointerA !== pointerB) {
        // When reaching end, switch to other list's head
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    return pointerA; // Either intersection node or null
}

// ============= MATHEMATICAL PROOF APPROACH =============
// Time Complexity: O(m + n) | Space Complexity: O(1)
// Algorithm: Mathematical insight - both pointers travel same distance

function getIntersectionMath(headA, headB) {
    if (!headA || !headB) return null;
    
    let pointerA = headA;
    let pointerB = headB;
    
    // Mathematical insight:
    // If lists intersect: pointerA travels (a + c + b), pointerB travels (b + c + a)
    // Both travel same total distance and meet at intersection
    // If no intersection: both travel (a + b) and meet at null
    
    while (pointerA !== pointerB) {
        pointerA = pointerA === null ? headB : pointerA.next;
        pointerB = pointerB === null ? headA : pointerB.next;
    }
    
    return pointerA;
}

// ============= ADVANCED VARIATIONS =============

// Find intersection with additional metadata
function getIntersectionWithInfo(headA, headB) {
    if (!headA || !headB) {
        return {
            intersection: null,
            lengthA: 0,
            lengthB: 0,
            commonLength: 0,
            uniqueA: 0,
            uniqueB: 0
        };
    }
    
    const lengthA = getListLength(headA);
    const lengthB = getListLength(headB);
    
    const intersection = getIntersectionOptimized(headA, headB);
    
    let commonLength = 0;
    if (intersection) {
        commonLength = getListLength(intersection);
    }
    
    return {
        intersection: intersection,
        lengthA: lengthA,
        lengthB: lengthB,
        commonLength: commonLength,
        uniqueA: lengthA - commonLength,
        uniqueB: lengthB - commonLength
    };
}

// Check if lists intersect without finding the node
function doListsIntersect(headA, headB) {
    if (!headA || !headB) return false;
    
    // Find the last nodes of both lists
    let lastA = headA;
    while (lastA.next) {
        lastA = lastA.next;
    }
    
    let lastB = headB;
    while (lastB.next) {
        lastB = lastB.next;
    }
    
    // If last nodes are same, lists intersect
    return lastA === lastB;
}

// Find all intersection points (in case of multiple intersections - rare)
function getAllIntersections(headA, headB) {
    if (!headA || !headB) return [];
    
    const intersections = [];
    const visitedA = new Set();
    
    // Store all nodes from list A
    let currentA = headA;
    while (currentA) {
        visitedA.add(currentA);
        currentA = currentA.next;
    }
    
    // Find all intersections in list B
    let currentB = headB;
    while (currentB) {
        if (visitedA.has(currentB)) {
            intersections.push(currentB);
        }
        currentB = currentB.next;
    }
    
    return intersections;
}

// ============= HELPER FUNCTIONS =============

function getListLength(head) {
    let length = 0;
    let current = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    return length;
}

function displayList(head, maxNodes = 20) {
    if (!head) return "Empty list";
    
    const values = [];
    let current = head;
    let count = 0;
    
    while (current && count < maxNodes) {
        values.push(current.val);
        current = current.next;
        count++;
    }
    
    if (current) {
        values.push("...");
    } else {
        values.push("null");
    }
    
    return values.join(' -> ');
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

// Create intersecting lists for testing
function createIntersectingLists(arrA, arrB, intersectionArray, intersectionIndex) {
    // Create the common part (intersection)
    const intersectionHead = createListFromArray(intersectionArray);
    
    // Create unique part of list A
    const headA = createListFromArray(arrA);
    if (headA) {
        let current = headA;
        while (current.next) {
            current = current.next;
        }
        current.next = intersectionHead; // Connect to intersection
    }
    
    // Create unique part of list B
    const headB = createListFromArray(arrB);
    if (headB) {
        let current = headB;
        while (current.next) {
            current = current.next;
        }
        current.next = intersectionHead; // Connect to same intersection
    }
    
    return { headA, headB, intersectionHead };
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeIntersection(headA, headB) {
    console.log("\n=== Visualizing Intersection Detection ===");
    
    if (!headA || !headB) {
        console.log("One or both lists are empty");
        return null;
    }
    
    console.log(`List A: ${displayList(headA)}`);
    console.log(`List B: ${displayList(headB)}`);
    
    // Show the elegant approach step by step
    let pointerA = headA;
    let pointerB = headB;
    let step = 0;
    
    console.log("\nStep-by-step traversal (Elegant approach):");
    console.log(`Step ${step}: A=[${pointerA.val}], B=[${pointerB.val}]`);
    
    while (pointerA !== pointerB && step < 20) { // Safety limit
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
        step++;
        
        const aVal = pointerA ? pointerA.val : 'null';
        const bVal = pointerB ? pointerB.val : 'null';
        console.log(`Step ${step}: A=[${aVal}], B=[${bVal}]`);
        
        if (pointerA === pointerB) {
            if (pointerA) {
                console.log(`🎯 INTERSECTION FOUND at node with value: ${pointerA.val}`);
            } else {
                console.log(`🚫 NO INTERSECTION - both pointers reached null`);
            }
            break;
        }
    }
    
    return pointerA;
}

function demonstrateIntersectionMethods() {
    console.log("\n=== Demonstrating Intersection Detection Methods ===");
    
    // Create test case with intersection
    const { headA, headB, intersectionHead } = createIntersectingLists(
        [4, 1],           // Unique part of A
        [5, 6, 1],        // Unique part of B  
        [8, 4, 5],        // Common intersection part
        0
    );
    
    console.log("Test Case: Lists with intersection");
    console.log(`List A: ${displayList(headA)}`);
    console.log(`List B: ${displayList(headB)}`);
    console.log(`Expected intersection at node with value: ${intersectionHead.val}`);
    
    const methods = [
        { name: "Brute Force", func: getIntersectionBruteForce },
        { name: "Hash Set", func: getIntersectionBetter },
        { name: "Length Difference", func: getIntersectionOptimized },
        { name: "Elegant Switch", func: getIntersectionElegant },
        { name: "Mathematical", func: getIntersectionMath }
    ];
    
    methods.forEach(method => {
        console.log(`\n${method.name}:`);
        console.time(method.name);
        const result = method.func(headA, headB);
        console.timeEnd(method.name);
        console.log(`Result: ${result ? `Node with value ${result.val}` : 'No intersection'}`);
        console.log(`Correct: ${result === intersectionHead ? '✅' : '❌'}`);
    });
    
    // Test case without intersection
    console.log("\n--- Test Case: Lists without intersection ---");
    const listC = createListFromArray([1, 2, 3]);
    const listD = createListFromArray([4, 5, 6]);
    
    console.log(`List C: ${displayList(listC)}`);
    console.log(`List D: ${displayList(listD)}`);
    
    const noIntersection = getIntersectionElegant(listC, listD);
    console.log(`Result: ${noIntersection ? `Node with value ${noIntersection.val}` : 'No intersection ✅'}`);
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(m × n)", space: "O(1)", notes: "Nested loops, inefficient" },
        { name: "Hash Set", time: "O(m + n)", space: "O(m)", notes: "Fast but uses extra space" },
        { name: "Length Difference", time: "O(m + n)", space: "O(1)", notes: "Two passes, optimal space" },
        { name: "Elegant Switch", time: "O(m + n)", space: "O(1)", notes: "One pass, most elegant" },
        { name: "Mathematical", time: "O(m + n)", space: "O(1)", notes: "Same as elegant, clear logic" }
    ];
    
    console.log("\n" + "=".repeat(95));
    console.log("| Approach            | Time      | Space | Notes                        |");
    console.log("=".repeat(95));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(19);
        const time = approach.time.padEnd(9);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(28);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(95));
    
    console.log("\n🏆 Winner: Elegant Switch Method");
    console.log("• O(m + n) time complexity");
    console.log("• O(1) space complexity");
    console.log("• Single pass through both lists");
    console.log("• Most intuitive and elegant solution");
}

function compareApproaches() {
    console.log("\n=== Comparing Intersection Detection Approaches ===");
    
    const sizes = [[10, 15], [100, 150], [1000, 1500]];
    
    sizes.forEach(([sizeA, sizeB]) => {
        console.log(`\nTesting with list sizes: A=${sizeA}, B=${sizeB}`);
        
        // Create large intersecting lists
        const uniqueA = Array.from({length: sizeA - 50}, (_, i) => i);
        const uniqueB = Array.from({length: sizeB - 50}, (_, i) => i + 10000);
        const common = Array.from({length: 50}, (_, i) => i + 20000);
        
        const { headA, headB } = createIntersectingLists(uniqueA, uniqueB, common, 0);
        
        const approaches = [
            { name: "Hash Set", func: getIntersectionBetter },
            { name: "Length Diff", func: getIntersectionOptimized },
            { name: "Elegant", func: getIntersectionElegant }
        ];
        
        approaches.forEach(approach => {
            console.time(`${approach.name}-${sizeA}-${sizeB}`);
            const result = approach.func(headA, headB);
            console.timeEnd(`${approach.name}-${sizeA}-${sizeB}`);
            console.log(`  ${approach.name}: ${result ? 'Found' : 'Not found'}`);
        });
    });
}

// ============= EDGE CASES =============

function testEdgeCases() {
    console.log("\n=== Testing Edge Cases ===");
    
    const testCases = [
        {
            name: "Both lists null",
            headA: null,
            headB: null,
            expected: null
        },
        {
            name: "One list null",
            headA: createListFromArray([1, 2, 3]),
            headB: null,
            expected: null
        },
        {
            name: "Same single node",
            headA: new ListNode(1),
            headB: null, // Will be set to same node as headA
            expected: "same"
        },
        {
            name: "No intersection",
            headA: createListFromArray([1, 2, 3]),
            headB: createListFromArray([4, 5, 6]),
            expected: null
        },
        {
            name: "Intersection at head",
            headA: null, // Will be set up
            headB: null, // Will be set up  
            expected: "intersection"
        }
    ];
    
    // Set up special cases
    const singleNode = new ListNode(1);
    testCases[2].headB = singleNode;
    testCases[2].headA = singleNode;
    testCases[2].expected = singleNode;
    
    // Intersection at head
    const commonList = createListFromArray([1, 2, 3]);
    testCases[4].headA = commonList;
    testCases[4].headB = commonList;
    testCases[4].expected = commonList;
    
    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}:`);
        console.log(`List A: ${displayList(testCase.headA)}`);
        console.log(`List B: ${displayList(testCase.headB)}`);
        
        const result = getIntersectionElegant(testCase.headA, testCase.headB);
        const expected = testCase.expected;
        
        let isCorrect = false;
        if (expected === null && result === null) {
            isCorrect = true;
        } else if (expected === "same" && result === testCase.headA) {
            isCorrect = true;
        } else if (expected === "intersection" && result === testCase.headA) {
            isCorrect = true;
        } else if (result === expected) {
            isCorrect = true;
        }
        
        console.log(`Result: ${result ? `Node with value ${result.val}` : 'null'}`);
        console.log(`Status: ${isCorrect ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Intersection of Two Linked Lists ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master different intersection detection techniques");
    console.log("2. Understand the elegant two-pointer approach");
    console.log("3. Learn space-time trade-offs");
    console.log("4. Apply mathematical insights to optimize");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Intersection is based on node reference, not value");
    console.log("2. If lists intersect, they share the same tail");
    console.log("3. Two pointers can traverse equal distances");
    console.log("4. Switching lists equalizes the path lengths");
    
    console.log("\n🧠 Elegant Algorithm Intuition:");
    console.log("1. Let list A have length 'a + c', list B have length 'b + c'");
    console.log("2. Where 'c' is the common part length");
    console.log("3. Pointer A travels: a + c + b = a + b + c");
    console.log("4. Pointer B travels: b + c + a = a + b + c");
    console.log("5. Both travel same distance and meet at intersection!");
    
    console.log("\n⚡ Why It Works:");
    console.log("1. If intersection exists: pointers meet at intersection node");
    console.log("2. If no intersection: both pointers reach null together");
    console.log("3. Mathematical guarantee of meeting point");
    console.log("4. No need to calculate lengths explicitly");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Use === for reference comparison, not value");
    console.log("2. Handle null cases carefully");
    console.log("3. Switch to other list's head when reaching null");
    console.log("4. Both pointers will eventually meet");
    
    // Demonstrate with example
    const { headA, headB, intersectionHead } = createIntersectingLists(
        [4, 1], [5, 6, 1], [8, 4, 5], 0
    );
    
    visualizeIntersection(headA, headB);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Version Control Systems:**");
    console.log("   - Find merge points in Git branches");
    console.log("   - Detect common ancestors in commit history");
    
    console.log("\n2. **Social Networks:**");
    console.log("   - Find mutual connections between users");
    console.log("   - Detect common paths in friendship graphs");
    
    console.log("\n3. **File Systems:**");
    console.log("   - Find shared directories or symbolic links");
    console.log("   - Detect circular references in file structures");
    
    console.log("\n4. **Memory Management:**");
    console.log("   - Detect shared memory regions");
    console.log("   - Find common data structures");
    
    console.log("\n5. **Web Crawling:**");
    console.log("   - Find common pages between crawl paths");
    console.log("   - Detect link intersections");
    
    console.log("\n📊 Example Analysis:");
    const { headA, headB, intersectionHead } = createIntersectingLists(
        [1, 2], [3, 4], [5, 6, 7], 0
    );
    
    const info = getIntersectionWithInfo(headA, headB);
    console.log(`List A length: ${info.lengthA}`);
    console.log(`List B length: ${info.lengthB}`);
    console.log(`Common part length: ${info.commonLength}`);
    console.log(`Unique to A: ${info.uniqueA} nodes`);
    console.log(`Unique to B: ${info.uniqueB} nodes`);
}

// ============= TEST CASES =============

function testIntersectionDetection() {
    console.log("\n=== Testing Intersection Detection ===");
    
    console.log("\n--- Basic Test Cases ---");
    
    const testCases = [
        {
            name: "Standard intersection",
            setup: () => createIntersectingLists([4, 1], [5, 6, 1], [8, 4, 5], 0),
            expectedValue: 8
        },
        {
            name: "Intersection at head",
            setup: () => {
                const common = createListFromArray([1, 2, 3]);
                return { headA: common, headB: common, intersectionHead: common };
            },
            expectedValue: 1
        },
        {
            name: "No intersection",
            setup: () => ({
                headA: createListFromArray([1, 2, 3]),
                headB: createListFromArray([4, 5, 6]),
                intersectionHead: null
            }),
            expectedValue: null
        },
        {
            name: "Single node intersection",
            setup: () => {
                const single = new ListNode(42);
                return { headA: single, headB: single, intersectionHead: single };
            },
            expectedValue: 42
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.name}`);
        const { headA, headB, intersectionHead } = testCase.setup();
        
        console.log(`List A: ${displayList(headA)}`);
        console.log(`List B: ${displayList(headB)}`);
        
        const result = getIntersectionElegant(headA, headB);
        const actualValue = result ? result.val : null;
        
        console.log(`Expected: ${testCase.expectedValue}`);
        console.log(`Actual: ${actualValue}`);
        console.log(`Status: ${actualValue === testCase.expectedValue ? '✅ PASS' : '❌ FAIL'}`);
        
        // Additional verification
        if (result && intersectionHead) {
            console.log(`Reference match: ${result === intersectionHead ? '✅' : '❌'}`);
        }
    });
    
    console.log("\n--- Performance Test ---");
    
    console.log("\n1. Large lists intersection:");
    const largeA = Array.from({length: 500}, (_, i) => i);
    const largeB = Array.from({length: 300}, (_, i) => i + 1000);
    const largeCommon = Array.from({length: 200}, (_, i) => i + 2000);
    
    const { headA: largeHeadA, headB: largeHeadB } = createIntersectingLists(
        largeA, largeB, largeCommon, 0
    );
    
    console.time("Large intersection detection");
    const largeResult = getIntersectionElegant(largeHeadA, largeHeadB);
    console.timeEnd("Large intersection detection");
    console.log(`Large intersection found: ${largeResult ? 'Yes' : 'No'}`);
    
    console.log("\n2. Method comparison:");
    const methods = [
        { name: "Hash Set", func: getIntersectionBetter },
        { name: "Elegant", func: getIntersectionElegant }
    ];
    
    methods.forEach(method => {
        console.time(`${method.name} - large test`);
        const result = method.func(largeHeadA, largeHeadB);
        console.timeEnd(`${method.name} - large test`);
        console.log(`  ${method.name}: ${result ? 'Found' : 'Not found'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 INTERSECTION OF TWO LINKED LISTS - BODHI DSA COURSE");
console.log("=" .repeat(70));

analyzePerformance();
compareApproaches();
testEdgeCases();
demonstrateIntersectionMethods();
practicalApplications();
testIntersectionDetection();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    getIntersectionBruteForce,
    getIntersectionBetter,
    getIntersectionOptimized,
    getIntersectionElegant,
    getIntersectionMath,
    getIntersectionWithInfo,
    doListsIntersect,
    getAllIntersections,
    createIntersectingLists,
    displayList,
    createListFromArray,
    visualizeIntersection,
    demonstrateIntersectionMethods,
    interactiveLearning
};
