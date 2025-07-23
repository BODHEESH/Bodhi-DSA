/**
 * Add Two Numbers
 * Bodhi-DSA Course
 * 
 * Problem: Add two numbers represented as linked lists where digits are stored in reverse order.
 * Each node contains a single digit. Add the two numbers and return the sum as a linked list.
 * 
 * Example:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807
 * 
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 * 
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 */

// ============= NODE CLASS =============
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ============= BRUTE FORCE APPROACH (Convert to Numbers) =============
// Time Complexity: O(max(m,n)) | Space Complexity: O(max(m,n))
// Algorithm: Convert to numbers, add, convert back
// Note: This approach has limitations with very large numbers

function addTwoNumbersBruteForce(l1, l2) {
    // Convert linked lists to numbers
    let num1 = 0, num2 = 0;
    let multiplier1 = 1, multiplier2 = 1;
    
    let current1 = l1, current2 = l2;
    
    while (current1) {
        num1 += current1.val * multiplier1;
        multiplier1 *= 10;
        current1 = current1.next;
    }
    
    while (current2) {
        num2 += current2.val * multiplier2;
        multiplier2 *= 10;
        current2 = current2.next;
    }
    
    // Add numbers
    let sum = num1 + num2;
    
    // Convert back to linked list
    if (sum === 0) return new ListNode(0);
    
    let head = null, tail = null;
    
    while (sum > 0) {
        const digit = sum % 10;
        const newNode = new ListNode(digit);
        
        if (!head) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        
        sum = Math.floor(sum / 10);
    }
    
    return head;
}

// ============= BETTER APPROACH (String Conversion) =============
// Time Complexity: O(max(m,n)) | Space Complexity: O(max(m,n))
// Algorithm: Convert to strings, use BigInt for large numbers

function addTwoNumbersBetter(l1, l2) {
    // Convert to strings (reverse order)
    let str1 = '', str2 = '';
    
    let current1 = l1, current2 = l2;
    
    while (current1) {
        str1 = current1.val + str1; // Prepend to reverse
        current1 = current1.next;
    }
    
    while (current2) {
        str2 = current2.val + str2; // Prepend to reverse
        current2 = current2.next;
    }
    
    // Use BigInt for large number arithmetic
    const num1 = BigInt(str1 || '0');
    const num2 = BigInt(str2 || '0');
    const sum = num1 + num2;
    
    // Convert back to linked list
    const sumStr = sum.toString();
    let head = null, tail = null;
    
    // Create linked list in reverse order
    for (let i = sumStr.length - 1; i >= 0; i--) {
        const digit = parseInt(sumStr[i]);
        const newNode = new ListNode(digit);
        
        if (!head) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
    }
    
    return head;
}

// ============= OPTIMIZED APPROACH (Digit by Digit Addition) =============
// Time Complexity: O(max(m,n)) | Space Complexity: O(max(m,n))
// Algorithm: Add digits one by one with carry handling

function addTwoNumbersOptimized(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        const digit = sum % 10;
        
        current.next = new ListNode(digit);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(max(m,n)) | Space Complexity: O(max(m,n))
// Algorithm: Recursively add digits with carry

function addTwoNumbersRecursive(l1, l2, carry = 0) {
    // Base case: no more nodes and no carry
    if (!l1 && !l2 && carry === 0) {
        return null;
    }
    
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    
    const sum = val1 + val2 + carry;
    const digit = sum % 10;
    const newCarry = Math.floor(sum / 10);
    
    const resultNode = new ListNode(digit);
    
    const next1 = l1 ? l1.next : null;
    const next2 = l2 ? l2.next : null;
    
    resultNode.next = addTwoNumbersRecursive(next1, next2, newCarry);
    
    return resultNode;
}

// ============= TAIL RECURSIVE APPROACH =============
// Time Complexity: O(max(m,n)) | Space Complexity: O(max(m,n))
// Algorithm: Tail recursive with accumulator

function addTwoNumbersTailRecursive(l1, l2) {
    return addHelper(l1, l2, 0, null);
}

function addHelper(l1, l2, carry, result) {
    // Base case
    if (!l1 && !l2 && carry === 0) {
        return result;
    }
    
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    
    const sum = val1 + val2 + carry;
    const digit = sum % 10;
    const newCarry = Math.floor(sum / 10);
    
    const newNode = new ListNode(digit);
    
    // Append to result
    if (!result) {
        result = newNode;
    } else {
        let tail = result;
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = newNode;
    }
    
    const next1 = l1 ? l1.next : null;
    const next2 = l2 ? l2.next : null;
    
    return addHelper(next1, next2, newCarry, result);
}

// ============= ADVANCED VARIATIONS =============

// Add multiple numbers (array of linked lists)
function addMultipleNumbers(numbers) {
    if (!numbers || numbers.length === 0) return null;
    if (numbers.length === 1) return numbers[0];
    
    let result = numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        result = addTwoNumbersOptimized(result, numbers[i]);
    }
    
    return result;
}

// Add two numbers with different bases
function addTwoNumbersBase(l1, l2, base = 10) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / base);
        const digit = sum % base;
        
        current.next = new ListNode(digit);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}

// Add with detailed step tracking
function addTwoNumbersWithSteps(l1, l2) {
    const steps = [];
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    let position = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        const digit = sum % 10;
        
        steps.push({
            position,
            digit1: val1,
            digit2: val2,
            carry: carry,
            sum: sum,
            result: digit
        });
        
        current.next = new ListNode(digit);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
        position++;
    }
    
    return {
        result: dummy.next,
        steps: steps
    };
}

// Subtract two numbers (assuming l1 >= l2)
function subtractTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let borrow = 0;
    
    while (l1 || l2) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        let diff = val1 - val2 - borrow;
        
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        
        current.next = new ListNode(diff);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    // Remove leading zeros
    let result = dummy.next;
    while (result && result.next && result.val === 0) {
        result = result.next;
    }
    
    return result;
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

function listToNumber(head) {
    let number = 0;
    let multiplier = 1;
    let current = head;
    
    while (current) {
        number += current.val * multiplier;
        multiplier *= 10;
        current = current.next;
    }
    
    return number;
}

function numberToList(num) {
    if (num === 0) return new ListNode(0);
    
    let head = null, tail = null;
    
    while (num > 0) {
        const digit = num % 10;
        const newNode = new ListNode(digit);
        
        if (!head) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        
        num = Math.floor(num / 10);
    }
    
    return head;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeAddition(l1, l2) {
    console.log("\n=== Visualizing Addition ===");
    
    if (!l1 && !l2) {
        console.log("Both lists are empty");
        return null;
    }
    
    console.log(`Number 1: ${displayList(l1)} (${listToNumber(l1)})`);
    console.log(`Number 2: ${displayList(l2)} (${listToNumber(l2)})`);
    
    const additionResult = addTwoNumbersWithSteps(l1, l2);
    
    console.log("\nStep-by-step addition:");
    additionResult.steps.forEach((step, index) => {
        console.log(`Step ${index + 1}: ${step.digit1} + ${step.digit2} + ${step.carry} = ${step.sum} -> digit: ${step.result}, carry: ${step.carry}`);
    });
    
    const result = additionResult.result;
    console.log(`\nResult: ${displayList(result)} (${listToNumber(result)})`);
    
    return result;
}

function demonstrateAdditionMethods() {
    console.log("\n=== Demonstrating Addition Methods ===");
    
    const testCases = [
        { l1: [2, 4, 3], l2: [5, 6, 4], name: "Standard case (342 + 465)" },
        { l1: [0], l2: [0], name: "Both zero" },
        { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9], name: "Large carry" },
        { l1: [1], l2: [9, 9, 9], name: "Different lengths" },
        { l1: [5], l2: [5], name: "Simple addition" }
    ];
    
    const methods = [
        { name: "Brute Force", func: addTwoNumbersBruteForce },
        { name: "Better (String)", func: addTwoNumbersBetter },
        { name: "Optimized", func: addTwoNumbersOptimized },
        { name: "Recursive", func: addTwoNumbersRecursive }
    ];
    
    testCases.forEach(testCase => {
        console.log(`\n--- ${testCase.name} ---`);
        const list1 = createListFromArray(testCase.l1);
        const list2 = createListFromArray(testCase.l2);
        
        console.log(`L1: [${testCase.l1.join(', ')}] (${listToNumber(list1)})`);
        console.log(`L2: [${testCase.l2.join(', ')}] (${listToNumber(list2)})`);
        
        methods.forEach(method => {
            const l1Copy = createListFromArray(testCase.l1);
            const l2Copy = createListFromArray(testCase.l2);
            
            console.time(method.name);
            const result = method.func(l1Copy, l2Copy);
            console.timeEnd(method.name);
            
            const resultArray = listToArray(result);
            const resultNumber = listToNumber(result);
            console.log(`${method.name}: [${resultArray.join(', ')}] (${resultNumber})`);
        });
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log("\n=== Performance Analysis ===");
    
    const approaches = [
        { name: "Brute Force", time: "O(max(m,n))", space: "O(max(m,n))", notes: "Number conversion limits" },
        { name: "Better (String)", time: "O(max(m,n))", space: "O(max(m,n))", notes: "BigInt for large numbers" },
        { name: "Optimized", time: "O(max(m,n))", space: "O(max(m,n))", notes: "Optimal solution" },
        { name: "Recursive", time: "O(max(m,n))", space: "O(max(m,n))", notes: "Call stack overhead" }
    ];
    
    console.log("\n" + "=".repeat(100));
    console.log("| Approach      | Time         | Space        | Notes                    |");
    console.log("=".repeat(100));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(13);
        const time = approach.time.padEnd(12);
        const space = approach.space.padEnd(12);
        const notes = approach.notes.padEnd(24);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(100));
    
    console.log("\n🏆 Winner: Optimized (Digit by Digit)");
    console.log("• O(max(m,n)) time - single pass through both lists");
    console.log("• O(max(m,n)) space - result list size");
    console.log("• Handles carry efficiently");
    console.log("• Works with numbers of any size");
    console.log("• Most intuitive and clean implementation");
}

// ============= INTERACTIVE LEARNING =============

function interactiveLearning() {
    console.log("\n=== Interactive Learning: Add Two Numbers ===");
    
    console.log("\n🎯 Learning Objectives:");
    console.log("1. Master digit-by-digit arithmetic");
    console.log("2. Handle carry propagation correctly");
    console.log("3. Work with reverse-order representation");
    console.log("4. Manage different length numbers");
    
    console.log("\n📝 Key Concepts:");
    console.log("1. Numbers stored in reverse order (least significant first)");
    console.log("2. Add corresponding digits plus carry");
    console.log("3. Carry = sum ÷ 10, digit = sum % 10");
    console.log("4. Continue until both lists and carry are processed");
    
    console.log("\n🧠 Algorithm Intuition:");
    console.log("1. Use dummy head for easier result construction");
    console.log("2. Process both lists simultaneously");
    console.log("3. Handle missing digits as 0");
    console.log("4. Don't forget final carry if exists");
    
    console.log("\n⚡ Why This Works:");
    console.log("1. Reverse order matches how we add manually (right to left)");
    console.log("2. Carry naturally flows to next higher digit");
    console.log("3. Single pass is sufficient");
    console.log("4. Handles any size numbers without overflow");
    
    console.log("\n🔧 Implementation Tips:");
    console.log("1. Use dummy head: dummy = new ListNode(0)");
    console.log("2. Check for carry even after lists end");
    console.log("3. Handle null nodes as value 0");
    console.log("4. Return dummy.next as final result");
    
    visualizeAddition(
        createListFromArray([2, 4, 3]),
        createListFromArray([5, 6, 4])
    );
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log("\n=== Practical Applications ===");
    
    console.log("\n1. **Big Integer Arithmetic:**");
    console.log("   - Handle numbers beyond language limits");
    console.log("   - Cryptographic calculations");
    
    console.log("\n2. **Financial Systems:**");
    console.log("   - Precise decimal arithmetic");
    console.log("   - Currency calculations");
    
    console.log("\n3. **Scientific Computing:**");
    console.log("   - High precision calculations");
    console.log("   - Mathematical simulations");
    
    console.log("\n4. **Data Processing:**");
    console.log("   - Sum large datasets");
    console.log("   - Aggregate numerical data");
    
    console.log("\n📊 Example Applications:");
    
    // Calculator example
    const num1 = createListFromArray([9, 9, 9]);
    const num2 = createListFromArray([1]);
    console.log(`\nCalculator: ${listToNumber(num1)} + ${listToNumber(num2)}`);
    const calcResult = addTwoNumbersOptimized(num1, num2);
    console.log(`Result: ${displayList(calcResult)} = ${listToNumber(calcResult)}`);
    
    // Multiple numbers
    const numbers = [
        createListFromArray([1, 2, 3]),
        createListFromArray([4, 5, 6]),
        createListFromArray([7, 8, 9])
    ];
    console.log(`\nMultiple addition: 321 + 654 + 987`);
    const multiResult = addMultipleNumbers(numbers);
    console.log(`Result: ${displayList(multiResult)} = ${listToNumber(multiResult)}`);
    
    // Different base
    const base8Num1 = createListFromArray([7, 7, 7]);
    const base8Num2 = createListFromArray([1, 1, 1]);
    console.log(`\nBase-8 addition: 777₈ + 111₈`);
    const base8Result = addTwoNumbersBase(base8Num1, base8Num2, 8);
    console.log(`Result: ${displayList(base8Result)}`);
}

// ============= TEST CASES =============

function testAddTwoNumbers() {
    console.log("\n=== Testing Add Two Numbers ===");
    
    const testCases = [
        { l1: [2, 4, 3], l2: [5, 6, 4], expected: [7, 0, 8], description: "Standard case" },
        { l1: [0], l2: [0], expected: [0], description: "Both zero" },
        { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9], expected: [8, 9, 9, 9, 0, 0, 0, 1], description: "Large carry" },
        { l1: [1], l2: [9, 9, 9], expected: [0, 0, 0, 1], description: "Different lengths" },
        { l1: [5], l2: [5], expected: [0, 1], description: "Simple carry" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        const list1 = createListFromArray(testCase.l1);
        const list2 = createListFromArray(testCase.l2);
        
        console.log(`L1: [${testCase.l1.join(', ')}] (${listToNumber(list1)})`);
        console.log(`L2: [${testCase.l2.join(', ')}] (${listToNumber(list2)})`);
        
        const result = addTwoNumbersOptimized(list1, list2);
        const actual = listToArray(result);
        
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Actual: [${actual.join(', ')}]`);
        
        const isEqual = JSON.stringify(actual) === JSON.stringify(testCase.expected);
        console.log(`Status: ${isEqual ? '✅ PASS' : '❌ FAIL'}`);
    });
    
    // Large number test
    console.log("\n--- Large Number Test ---");
    const largeNum1 = Array(1000).fill(9);
    const largeNum2 = [1];
    
    const large1 = createListFromArray(largeNum1);
    const large2 = createListFromArray(largeNum2);
    
    console.time("Large number addition");
    const largeResult = addTwoNumbersOptimized(large1, large2);
    console.timeEnd("Large number addition");
    
    const resultLength = listToArray(largeResult).length;
    console.log(`Result length: ${resultLength} (expected: 1001)`);
    console.log(`Status: ${resultLength === 1001 ? '✅ PASS' : '❌ FAIL'}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ADD TWO NUMBERS - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateAdditionMethods();
testAddTwoNumbers();
practicalApplications();
interactiveLearning();

// Export functions
module.exports = {
    ListNode,
    addTwoNumbersBruteForce,
    addTwoNumbersBetter,
    addTwoNumbersOptimized,
    addTwoNumbersRecursive,
    addTwoNumbersTailRecursive,
    addMultipleNumbers,
    addTwoNumbersBase,
    subtractTwoNumbers,
    displayList,
    createListFromArray,
    visualizeAddition,
    demonstrateAdditionMethods,
    interactiveLearning
};
