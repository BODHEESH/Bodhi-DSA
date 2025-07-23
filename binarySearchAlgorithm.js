/**
 * Binary Search Algorithm & Square Root of X
 * Bodhi-DSA Course - Binary Search Section
 * 
 * This file covers:
 * 1. Core Binary Search Algorithm (multiple approaches)
 * 2. Square Root of X using Binary Search
 * 3. Best Practice for Finding Middle Element
 * 4. Variations and Advanced Applications
 * 5. Interactive Learning and Visualizations
 * 
 * Perfect for live Malayalam YouTube teaching with step-by-step explanations
 */

// ============= CORE BINARY SEARCH IMPLEMENTATIONS =============

/**
 * Approach 1: Classic Binary Search (Iterative)
 * Time: O(log n), Space: O(1)
 * Most commonly used approach in interviews
 */
function binarySearchIterative(arr, target) {
    console.log(`\n🔍 Binary Search (Iterative) for target: ${target}`);
    console.log(`Array: [${arr.join(', ')}]`);
    
    let left = 0;
    let right = arr.length - 1;
    let steps = 0;
    
    while (left <= right) {
        steps++;
        // Best practice: Avoid overflow
        const mid = left + Math.floor((right - left) / 2);
        
        console.log(`Step ${steps}: left=${left}, right=${right}, mid=${mid}, arr[mid]=${arr[mid]}`);
        
        if (arr[mid] === target) {
            console.log(`✅ Found target ${target} at index ${mid} in ${steps} steps`);
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
            console.log(`   Target is greater, search right half`);
        } else {
            right = mid - 1;
            console.log(`   Target is smaller, search left half`);
        }
    }
    
    console.log(`❌ Target ${target} not found after ${steps} steps`);
    return -1;
}

/**
 * Approach 2: Binary Search (Recursive)
 * Time: O(log n), Space: O(log n) - due to recursion stack
 * Good for understanding divide and conquer concept
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1, depth = 0) {
    const indent = '  '.repeat(depth);
    console.log(`${indent}🔄 Recursive call: left=${left}, right=${right}`);
    
    if (left > right) {
        console.log(`${indent}❌ Target not found`);
        return -1;
    }
    
    const mid = left + Math.floor((right - left) / 2);
    console.log(`${indent}📍 mid=${mid}, arr[mid]=${arr[mid]}`);
    
    if (arr[mid] === target) {
        console.log(`${indent}✅ Found target at index ${mid}`);
        return mid;
    } else if (arr[mid] < target) {
        console.log(`${indent}➡️ Search right half`);
        return binarySearchRecursive(arr, target, mid + 1, right, depth + 1);
    } else {
        console.log(`${indent}⬅️ Search left half`);
        return binarySearchRecursive(arr, target, left, mid - 1, depth + 1);
    }
}

/**
 * Approach 3: Binary Search with Bounds (Template)
 * Time: O(log n), Space: O(1)
 * Flexible template for various binary search problems
 */
function binarySearchTemplate(arr, target) {
    console.log(`\n🎯 Binary Search Template for target: ${target}`);
    
    let left = 0;
    let right = arr.length; // Note: length, not length - 1
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Checking: left=${left}, right=${right}, mid=${mid}, arr[mid]=${arr[mid]}`);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    if (left < arr.length && arr[left] === target) {
        console.log(`✅ Found target at index ${left}`);
        return left;
    }
    
    console.log(`❌ Target not found`);
    return -1;
}

// ============= SQUARE ROOT OF X IMPLEMENTATIONS =============

/**
 * Approach 1: Square Root using Binary Search (Integer Result)
 * Time: O(log x), Space: O(1)
 * Classic application of binary search on answer space
 */
function mySqrt(x) {
    console.log(`\n🔢 Finding square root of ${x} using binary search`);
    
    if (x < 2) return x;
    
    let left = 1;
    let right = Math.floor(x / 2) + 1; // Optimization: sqrt(x) <= x/2 for x >= 4
    let result = 0;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const square = mid * mid;
        
        console.log(`Trying mid=${mid}, mid²=${square}`);
        
        if (square === x) {
            console.log(`✅ Perfect square! √${x} = ${mid}`);
            return mid;
        } else if (square < x) {
            result = mid; // Store the largest valid answer
            left = mid + 1;
            console.log(`   ${square} < ${x}, try larger numbers`);
        } else {
            right = mid - 1;
            console.log(`   ${square} > ${x}, try smaller numbers`);
        }
    }
    
    console.log(`✅ Integer square root of ${x} is ${result}`);
    return result;
}

/**
 * Approach 2: Square Root with Precision (Decimal Result)
 * Time: O(log x * precision), Space: O(1)
 * Binary search with floating point precision
 */
function mySqrtPrecision(x, precision = 6) {
    console.log(`\n🎯 Finding square root of ${x} with ${precision} decimal places`);
    
    if (x < 0) return NaN;
    if (x === 0 || x === 1) return x;
    
    let left = 0;
    let right = x < 1 ? 1 : x;
    const epsilon = Math.pow(10, -precision);
    
    while (right - left > epsilon) {
        const mid = (left + right) / 2;
        const square = mid * mid;
        
        console.log(`Trying mid=${mid.toFixed(precision + 2)}, mid²=${square.toFixed(precision + 2)}`);
        
        if (Math.abs(square - x) < epsilon) {
            console.log(`✅ Found precise square root: ${mid.toFixed(precision)}`);
            return parseFloat(mid.toFixed(precision));
        } else if (square < x) {
            left = mid;
        } else {
            right = mid;
        }
    }
    
    const result = (left + right) / 2;
    console.log(`✅ Square root of ${x} ≈ ${result.toFixed(precision)}`);
    return parseFloat(result.toFixed(precision));
}

/**
 * Approach 3: Newton's Method for Square Root
 * Time: O(log log x), Space: O(1)
 * Faster convergence than binary search
 */
function mySqrtNewton(x, precision = 6) {
    console.log(`\n⚡ Newton's Method for square root of ${x}`);
    
    if (x < 0) return NaN;
    if (x === 0 || x === 1) return x;
    
    let guess = x / 2; // Initial guess
    const epsilon = Math.pow(10, -precision);
    let iterations = 0;
    
    while (true) {
        iterations++;
        const newGuess = 0.5 * (guess + x / guess);
        
        console.log(`Iteration ${iterations}: guess=${guess.toFixed(precision + 2)}, new_guess=${newGuess.toFixed(precision + 2)}`);
        
        if (Math.abs(newGuess - guess) < epsilon) {
            console.log(`✅ Converged in ${iterations} iterations: ${newGuess.toFixed(precision)}`);
            return parseFloat(newGuess.toFixed(precision));
        }
        
        guess = newGuess;
        
        if (iterations > 50) { // Safety check
            console.log(`⚠️ Max iterations reached`);
            break;
        }
    }
    
    return parseFloat(guess.toFixed(precision));
}

// ============= BEST PRACTICES FOR MIDDLE ELEMENT =============

/**
 * Safe Middle Element Calculation
 * Prevents integer overflow in languages with fixed integer size
 */
function demonstrateMiddleCalculation() {
    console.log(`\n📐 BEST PRACTICES FOR FINDING MIDDLE ELEMENT`);
    console.log(`${'='.repeat(50)}`);
    
    const testCases = [
        { left: 0, right: 10 },
        { left: 1000000000, right: 2000000000 }, // Large numbers
        { left: -5, right: 5 },
        { left: 0, right: 1 }
    ];
    
    testCases.forEach(({ left, right }, index) => {
        console.log(`\nTest Case ${index + 1}: left=${left}, right=${right}`);
        
        // ❌ WRONG: Can cause overflow
        const wrongMid = Math.floor((left + right) / 2);
        console.log(`❌ Wrong way: (${left} + ${right}) / 2 = ${wrongMid}`);
        
        // ✅ CORRECT: Prevents overflow
        const correctMid = left + Math.floor((right - left) / 2);
        console.log(`✅ Correct way: ${left} + (${right} - ${left}) / 2 = ${correctMid}`);
        
        // Alternative correct way
        const alternativeMid = Math.floor(left + (right - left) / 2);
        console.log(`✅ Alternative: floor(${left} + (${right} - ${left}) / 2) = ${alternativeMid}`);
        
        console.log(`Result: All methods give same result: ${wrongMid === correctMid && correctMid === alternativeMid ? '✅' : '❌'}`);
    });
    
    console.log(`\n💡 KEY INSIGHTS:`);
    console.log(`• Use: left + (right - left) / 2`);
    console.log(`• Avoid: (left + right) / 2`);
    console.log(`• Reason: Prevents integer overflow`);
    console.log(`• In JavaScript: Less critical due to Number type, but good practice`);
}

// ============= ADVANCED BINARY SEARCH VARIATIONS =============

/**
 * Find Insert Position (Lower Bound)
 * Finds the leftmost position where target can be inserted
 */
function searchInsertPosition(nums, target) {
    console.log(`\n📍 Finding insert position for ${target} in [${nums.join(', ')}]`);
    
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Checking: left=${left}, right=${right}, mid=${mid}, nums[mid]=${nums[mid] || 'undefined'}`);
        
        if (mid < nums.length && nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    console.log(`✅ Insert position: ${left}`);
    return left;
}

/**
 * Find Upper Bound
 * Finds the rightmost position where target can be inserted
 */
function findUpperBound(nums, target) {
    console.log(`\n📍 Finding upper bound for ${target} in [${nums.join(', ')}]`);
    
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Checking: left=${left}, right=${right}, mid=${mid}, nums[mid]=${nums[mid] || 'undefined'}`);
        
        if (mid < nums.length && nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    console.log(`✅ Upper bound: ${left}`);
    return left;
}

// ============= INTERACTIVE LEARNING FUNCTIONS =============

/**
 * Interactive Binary Search Visualization
 * Step-by-step visualization for teaching
 */
function visualizeBinarySearch(arr, target) {
    console.log(`\n🎬 BINARY SEARCH VISUALIZATION`);
    console.log(`${'='.repeat(40)}`);
    console.log(`Array: [${arr.join(', ')}]`);
    console.log(`Target: ${target}`);
    console.log(`${'='.repeat(40)}`);
    
    let left = 0;
    let right = arr.length - 1;
    let step = 0;
    
    while (left <= right) {
        step++;
        const mid = left + Math.floor((right - left) / 2);
        
        // Visual representation
        const visual = arr.map((num, index) => {
            if (index === mid) return `[${num}]`; // Current middle
            if (index >= left && index <= right) return ` ${num} `; // Search space
            return ` · `; // Outside search space
        }).join('');
        
        console.log(`\nStep ${step}:`);
        console.log(`Visual: ${visual}`);
        console.log(`Range: [${left}, ${right}], Mid: ${mid}, Value: ${arr[mid]}`);
        
        if (arr[mid] === target) {
            console.log(`🎯 FOUND! Target ${target} at index ${mid}`);
            return mid;
        } else if (arr[mid] < target) {
            console.log(`📈 Target is larger, search RIGHT half`);
            left = mid + 1;
        } else {
            console.log(`📉 Target is smaller, search LEFT half`);
            right = mid - 1;
        }
    }
    
    console.log(`\n❌ Target ${target} not found in array`);
    return -1;
}

/**
 * Binary Search Game - Guess the Number
 * Interactive learning through gaming
 */
function binarySearchGame(min = 1, max = 100) {
    console.log(`\n🎮 BINARY SEARCH GUESSING GAME`);
    console.log(`${'='.repeat(35)}`);
    console.log(`I'm thinking of a number between ${min} and ${max}`);
    console.log(`You have to guess it using binary search strategy!`);
    
    // Simulate the hidden number (in real game, this would be user input)
    const hiddenNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`(Hidden number is ${hiddenNumber} - for demonstration)`);
    
    let left = min;
    let right = max;
    let attempts = 0;
    
    while (left <= right) {
        attempts++;
        const guess = left + Math.floor((right - left) / 2);
        
        console.log(`\nAttempt ${attempts}: Guessing ${guess}`);
        console.log(`Current range: [${left}, ${right}]`);
        
        if (guess === hiddenNumber) {
            console.log(`🎉 CORRECT! Found ${hiddenNumber} in ${attempts} attempts!`);
            console.log(`Theoretical minimum attempts: ${Math.ceil(Math.log2(max - min + 1))}`);
            return attempts;
        } else if (guess < hiddenNumber) {
            console.log(`📈 Too low! The number is higher.`);
            left = guess + 1;
        } else {
            console.log(`📉 Too high! The number is lower.`);
            right = guess - 1;
        }
    }
    
    return -1; // Should never reach here
}

// ============= PERFORMANCE ANALYSIS =============

function performanceAnalysis() {
    console.log(`\n📊 BINARY SEARCH PERFORMANCE ANALYSIS`);
    console.log(`${'='.repeat(45)}`);
    
    const sizes = [10, 100, 1000, 10000, 100000, 1000000];
    
    console.log(`Array Size | Max Comparisons | Actual Steps`);
    console.log(`${'='.repeat(45)}`);
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, (_, i) => i);
        const target = size - 1; // Worst case: last element
        
        let steps = 0;
        let left = 0;
        let right = size - 1;
        
        while (left <= right) {
            steps++;
            const mid = left + Math.floor((right - left) / 2);
            if (arr[mid] === target) break;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        
        const theoretical = Math.ceil(Math.log2(size));
        console.log(`${size.toString().padStart(10)} | ${theoretical.toString().padStart(15)} | ${steps.toString().padStart(12)}`);
    });
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• Binary search is O(log n) - very efficient!`);
    console.log(`• Doubling array size adds only 1 more comparison`);
    console.log(`• 1 million elements need at most 20 comparisons`);
    console.log(`• Much better than linear search O(n)`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🌍 PRACTICAL APPLICATIONS OF BINARY SEARCH`);
    console.log(`${'='.repeat(45)}`);
    
    const applications = [
        {
            domain: "Database Systems",
            use: "Index searching in B-trees",
            example: "Finding records in sorted database indexes"
        },
        {
            domain: "Computer Graphics",
            use: "Ray-object intersection",
            example: "Finding intersection points in 3D rendering"
        },
        {
            domain: "Numerical Computing",
            use: "Root finding algorithms",
            example: "Finding square roots, cube roots, equation solutions"
        },
        {
            domain: "Game Development",
            use: "AI decision making",
            example: "Finding optimal moves in game trees"
        },
        {
            domain: "Web Development",
            use: "API response optimization",
            example: "Searching in sorted API results"
        },
        {
            domain: "Machine Learning",
            use: "Hyperparameter tuning",
            example: "Finding optimal learning rates, thresholds"
        }
    ];
    
    applications.forEach((app, index) => {
        console.log(`\n${index + 1}. **${app.domain}:**`);
        console.log(`   Use: ${app.use}`);
        console.log(`   Example: ${app.example}`);
    });
}

// ============= COMPREHENSIVE TEST CASES =============

function runComprehensiveTests() {
    console.log(`\n🧪 COMPREHENSIVE TEST CASES`);
    console.log(`${'='.repeat(35)}`);
    
    // Test cases for binary search
    const testCases = [
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 5, expected: 4 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 1, expected: 0 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 9, expected: 8 },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 10, expected: -1 },
        { arr: [1], target: 1, expected: 0 },
        { arr: [], target: 1, expected: -1 },
        { arr: [1, 3, 5, 7, 9], target: 4, expected: -1 }
    ];
    
    console.log(`\n🔍 Testing Binary Search:`);
    testCases.forEach((test, index) => {
        const result = binarySearchIterative([...test.arr], test.target);
        const passed = result === test.expected;
        console.log(`Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} - Expected: ${test.expected}, Got: ${result}`);
    });
    
    // Test cases for square root
    const sqrtTests = [
        { x: 4, expected: 2 },
        { x: 8, expected: 2 },
        { x: 9, expected: 3 },
        { x: 16, expected: 4 },
        { x: 1, expected: 1 },
        { x: 0, expected: 0 }
    ];
    
    console.log(`\n🔢 Testing Square Root:`);
    sqrtTests.forEach((test, index) => {
        const result = mySqrt(test.x);
        const passed = result === test.expected;
        console.log(`Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} - sqrt(${test.x}) = ${result}, expected: ${test.expected}`);
    });
}

// ============= MAIN EXECUTION =============

console.log("🎓 BINARY SEARCH ALGORITHM & SQUARE ROOT");
console.log("=" .repeat(45));
console.log("📚 BODHI DSA COURSE - COMPREHENSIVE GUIDE");
console.log("=" .repeat(45));

// Demonstrate core concepts
console.log("\n1️⃣ CORE BINARY SEARCH IMPLEMENTATIONS:");
binarySearchIterative([1, 3, 5, 7, 9, 11, 13, 15], 7);
binarySearchRecursive([1, 3, 5, 7, 9, 11, 13, 15], 11);

console.log("\n2️⃣ SQUARE ROOT IMPLEMENTATIONS:");
mySqrt(25);
mySqrtPrecision(2, 4);
mySqrtNewton(50, 3);

console.log("\n3️⃣ BEST PRACTICES:");
demonstrateMiddleCalculation();

console.log("\n4️⃣ ADVANCED VARIATIONS:");
searchInsertPosition([1, 3, 5, 7], 4);
findUpperBound([1, 2, 2, 2, 3], 2);

console.log("\n5️⃣ INTERACTIVE LEARNING:");
visualizeBinarySearch([2, 5, 8, 12, 16, 23, 38, 45, 67, 78], 23);
binarySearchGame(1, 32);

console.log("\n6️⃣ PERFORMANCE ANALYSIS:");
performanceAnalysis();

console.log("\n7️⃣ PRACTICAL APPLICATIONS:");
practicalApplications();

console.log("\n8️⃣ COMPREHENSIVE TESTING:");
runComprehensiveTests();

// Export all functions for external use
module.exports = {
    binarySearchIterative,
    binarySearchRecursive,
    binarySearchTemplate,
    mySqrt,
    mySqrtPrecision,
    mySqrtNewton,
    demonstrateMiddleCalculation,
    searchInsertPosition,
    findUpperBound,
    visualizeBinarySearch,
    binarySearchGame,
    performanceAnalysis,
    practicalApplications,
    runComprehensiveTests
};
