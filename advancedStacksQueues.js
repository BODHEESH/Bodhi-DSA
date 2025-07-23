/**
 * Advanced Stacks & Queues Problems
 * Bodhi-DSA Course
 * 
 * This file contains advanced problems that combine multiple stack/queue concepts
 * and demonstrate sophisticated applications of these data structures.
 * 
 * Problems covered:
 * 1. Sliding Window Maximum (Deque)
 * 2. Largest Rectangle in Histogram (Stack)
 * 3. Trapping Rain Water (Stack)
 * 4. Basic Calculator (Stack)
 * 5. Decode String (Stack)
 * 6. Asteroid Collision (Stack)
 */

// ============= PROBLEM 1: SLIDING WINDOW MAXIMUM =============
// Time Complexity: O(n) | Space Complexity: O(k)
// Algorithm: Use deque to maintain maximum in sliding window

function slidingWindowMaximum(nums, k) {
    if (!Array.isArray(nums) || nums.length === 0 || k <= 0) {
        return [];
    }
    
    console.log(`\n🪟 Sliding Window Maximum: nums=[${nums.join(', ')}], k=${k}`);
    
    const result = [];
    const deque = []; // Store indices in decreasing order of values
    
    console.log(`\nProcessing sliding windows:`);
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length > 0 && deque[0] <= i - k) {
            const removed = deque.shift();
            console.log(`  Removed index ${removed} (outside window)`);
        }
        
        // Remove indices with smaller values (they can't be maximum)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            const removed = deque.pop();
            console.log(`  Removed index ${removed} (smaller value ${nums[removed]} < ${nums[i]})`);
        }
        
        deque.push(i);
        
        // If window is complete, record maximum
        if (i >= k - 1) {
            const maxIndex = deque[0];
            const maxValue = nums[maxIndex];
            result.push(maxValue);
            
            const windowStart = i - k + 1;
            const windowEnd = i;
            const window = nums.slice(windowStart, windowEnd + 1);
            console.log(`Window [${windowStart}, ${windowEnd}]: [${window.join(', ')}] → Max: ${maxValue} (index ${maxIndex})`);
        }
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= PROBLEM 2: LARGEST RECTANGLE IN HISTOGRAM =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to find largest rectangle area

function largestRectangleArea(heights) {
    if (!Array.isArray(heights) || heights.length === 0) {
        return 0;
    }
    
    console.log(`\n📊 Largest Rectangle in Histogram: [${heights.join(', ')}]`);
    
    const stack = []; // Stack to store indices
    let maxArea = 0;
    
    console.log(`\nProcessing each bar:`);
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i < heights.length ? heights[i] : 0;
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            const area = height * width;
            
            maxArea = Math.max(maxArea, area);
            
            console.log(`Bar ${i}: height=${height}, width=${width}, area=${area}, maxArea=${maxArea}`);
        }
        
        if (i < heights.length) {
            stack.push(i);
        }
    }
    
    console.log(`Maximum rectangle area: ${maxArea}`);
    return maxArea;
}

// ============= PROBLEM 3: TRAPPING RAIN WATER =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to calculate trapped water

function trapRainWater(height) {
    if (!Array.isArray(height) || height.length < 3) {
        return 0;
    }
    
    console.log(`\n🌧️ Trapping Rain Water: [${height.join(', ')}]`);
    
    const stack = [];
    let totalWater = 0;
    
    console.log(`\nCalculating trapped water:`);
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const bottom = stack.pop();
            
            if (stack.length === 0) break;
            
            const left = stack[stack.length - 1];
            const right = i;
            const width = right - left - 1;
            const waterHeight = Math.min(height[left], height[right]) - height[bottom];
            const water = width * waterHeight;
            
            totalWater += water;
            
            console.log(`Position ${i}: left=${left}(${height[left]}), bottom=${bottom}(${height[bottom]}), right=${right}(${height[right]})`);
            console.log(`  Water trapped: width=${width} × height=${waterHeight} = ${water}, total=${totalWater}`);
        }
        
        stack.push(i);
    }
    
    console.log(`Total trapped water: ${totalWater}`);
    return totalWater;
}

// ============= PROBLEM 4: BASIC CALCULATOR =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to handle parentheses and operations

function basicCalculator(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return 0;
    }
    
    console.log(`\n🧮 Basic Calculator: "${s}"`);
    
    const stack = [];
    let result = 0;
    let number = 0;
    let sign = 1; // 1 for positive, -1 for negative
    
    console.log(`\nProcessing expression:`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            number = number * 10 + parseInt(char);
        } else if (char === '+') {
            result += sign * number;
            number = 0;
            sign = 1;
            console.log(`Found '+': result=${result}, next sign=+`);
        } else if (char === '-') {
            result += sign * number;
            number = 0;
            sign = -1;
            console.log(`Found '-': result=${result}, next sign=-`);
        } else if (char === '(') {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
            console.log(`Found '(': pushed to stack, reset result=0`);
        } else if (char === ')') {
            result += sign * number;
            number = 0;
            
            const prevSign = stack.pop();
            const prevResult = stack.pop();
            result = prevResult + prevSign * result;
            
            console.log(`Found ')': popped from stack, result=${result}`);
        }
    }
    
    result += sign * number;
    
    console.log(`Final result: ${result}`);
    return result;
}

// ============= PROBLEM 5: DECODE STRING =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to handle nested encoded strings

function decodeString(s) {
    if (typeof s !== 'string' || s.length === 0) {
        return '';
    }
    
    console.log(`\n🔓 Decode String: "${s}"`);
    
    const stack = [];
    let currentString = '';
    let currentNumber = 0;
    
    console.log(`\nDecoding process:`);
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            currentNumber = currentNumber * 10 + parseInt(char);
        } else if (char === '[') {
            stack.push(currentString);
            stack.push(currentNumber);
            currentString = '';
            currentNumber = 0;
            console.log(`Found '[': pushed to stack, reset current`);
        } else if (char === ']') {
            const num = stack.pop();
            const prevString = stack.pop();
            currentString = prevString + currentString.repeat(num);
            console.log(`Found ']': repeat ${num} times, result="${currentString}"`);
        } else {
            currentString += char;
        }
    }
    
    console.log(`Decoded result: "${currentString}"`);
    return currentString;
}

// ============= PROBLEM 6: ASTEROID COLLISION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to simulate asteroid collisions

function asteroidCollision(asteroids) {
    if (!Array.isArray(asteroids) || asteroids.length === 0) {
        return [];
    }
    
    console.log(`\n☄️ Asteroid Collision: [${asteroids.join(', ')}]`);
    console.log(`Positive = moving right, Negative = moving left`);
    
    const stack = [];
    
    console.log(`\nSimulating collisions:`);
    
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        let destroyed = false;
        
        console.log(`\nProcessing asteroid ${asteroid}:`);
        
        // Handle collisions with right-moving asteroids in stack
        while (stack.length > 0 && asteroid < 0 && stack[stack.length - 1] > 0) {
            const rightMoving = stack[stack.length - 1];
            const leftMoving = Math.abs(asteroid);
            
            console.log(`  Collision: ${rightMoving} (right) vs ${leftMoving} (left)`);
            
            if (rightMoving < leftMoving) {
                // Right-moving asteroid destroyed
                stack.pop();
                console.log(`    Right-moving asteroid ${rightMoving} destroyed`);
            } else if (rightMoving === leftMoving) {
                // Both destroyed
                stack.pop();
                destroyed = true;
                console.log(`    Both asteroids destroyed`);
                break;
            } else {
                // Left-moving asteroid destroyed
                destroyed = true;
                console.log(`    Left-moving asteroid ${asteroid} destroyed`);
                break;
            }
        }
        
        if (!destroyed) {
            stack.push(asteroid);
            console.log(`  Asteroid ${asteroid} survives`);
        }
        
        console.log(`  Current state: [${stack.join(', ')}]`);
    }
    
    console.log(`\nFinal surviving asteroids: [${stack.join(', ')}]`);
    return stack;
}

// ============= ADVANCED HELPER FUNCTIONS =============

// Visualize stack operations
function visualizeStackOperations(operations) {
    console.log(`\n📊 Visualizing Stack Operations:`);
    
    const stack = [];
    
    operations.forEach((op, index) => {
        const { operation, value } = op;
        
        console.log(`\nStep ${index + 1}: ${operation}${value !== undefined ? `(${value})` : ''}`);
        console.log(`Before: [${stack.join(', ')}]`);
        
        switch (operation) {
            case 'push':
                stack.push(value);
                break;
            case 'pop':
                const popped = stack.pop();
                console.log(`Popped: ${popped}`);
                break;
            case 'peek':
                const top = stack.length > 0 ? stack[stack.length - 1] : 'empty';
                console.log(`Top: ${top}`);
                break;
        }
        
        console.log(`After:  [${stack.join(', ')}]`);
    });
    
    return stack;
}

// Visualize queue operations
function visualizeQueueOperations(operations) {
    console.log(`\n📊 Visualizing Queue Operations:`);
    
    const queue = [];
    
    operations.forEach((op, index) => {
        const { operation, value } = op;
        
        console.log(`\nStep ${index + 1}: ${operation}${value !== undefined ? `(${value})` : ''}`);
        console.log(`Before: [${queue.join(', ')}] ← rear | front →`);
        
        switch (operation) {
            case 'enqueue':
                queue.push(value);
                break;
            case 'dequeue':
                const dequeued = queue.shift();
                console.log(`Dequeued: ${dequeued}`);
                break;
            case 'front':
                const front = queue.length > 0 ? queue[0] : 'empty';
                console.log(`Front: ${front}`);
                break;
            case 'rear':
                const rear = queue.length > 0 ? queue[queue.length - 1] : 'empty';
                console.log(`Rear: ${rear}`);
                break;
        }
        
        console.log(`After:  [${queue.join(', ')}] ← rear | front →`);
    });
    
    return queue;
}

// Performance comparison of different approaches
function performanceComparison() {
    console.log(`\n⚡ Performance Comparison of Advanced Problems:`);
    
    const problems = [
        { name: "Sliding Window Maximum", time: "O(n)", space: "O(k)", notes: "Deque maintains window maximum" },
        { name: "Largest Rectangle", time: "O(n)", space: "O(n)", notes: "Stack for histogram processing" },
        { name: "Trapping Rain Water", time: "O(n)", space: "O(n)", notes: "Stack for water calculation" },
        { name: "Basic Calculator", time: "O(n)", space: "O(n)", notes: "Stack for parentheses handling" },
        { name: "Decode String", time: "O(n)", space: "O(n)", notes: "Stack for nested decoding" },
        { name: "Asteroid Collision", time: "O(n)", space: "O(n)", notes: "Stack for collision simulation" }
    ];
    
    console.log(`\n📈 Complexity Analysis:`);
    console.log("=".repeat(95));
    console.log("| Problem                | Time | Space | Notes                        |");
    console.log("=".repeat(95));
    
    problems.forEach(problem => {
        const name = problem.name.padEnd(22);
        const time = problem.time.padEnd(4);
        const space = problem.space.padEnd(5);
        const notes = problem.notes.padEnd(28);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(95));
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• All problems achieve linear time complexity`);
    console.log(`• Stack/Queue choice depends on access pattern needed`);
    console.log(`• Deque provides flexibility for both ends access`);
    console.log(`• These patterns appear in many advanced algorithms`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications of Advanced Stack/Queue Problems:`);
    
    console.log(`\n1. **Sliding Window Maximum:**`);
    console.log(`   - Stock price analysis (max in time window)`);
    console.log(`   - System monitoring (peak values in intervals)`);
    console.log(`   - Image processing (local maxima detection)`);
    
    console.log(`\n2. **Largest Rectangle:**`);
    console.log(`   - Building design optimization`);
    console.log(`   - Memory allocation algorithms`);
    console.log(`   - Image analysis (largest rectangular region)`);
    
    console.log(`\n3. **Trapping Rain Water:**`);
    console.log(`   - Urban planning (drainage systems)`);
    console.log(`   - Terrain analysis`);
    console.log(`   - Container design`);
    
    console.log(`\n4. **Basic Calculator:**`);
    console.log(`   - Expression evaluation engines`);
    console.log(`   - Compiler design`);
    console.log(`   - Spreadsheet applications`);
    
    console.log(`\n5. **Decode String:**`);
    console.log(`   - Data compression algorithms`);
    console.log(`   - Template processing`);
    console.log(`   - Configuration file parsing`);
    
    console.log(`\n6. **Asteroid Collision:**`);
    console.log(`   - Game physics simulation`);
    console.log(`   - Network packet collision detection`);
    console.log(`   - Process scheduling conflicts`);
    
    // Example: Stock analysis system
    console.log(`\n📈 Example: Stock Analysis System`);
    
    class StockAnalyzer {
        constructor() {
            this.prices = [];
        }
        
        addPrices(prices) {
            this.prices = prices;
        }
        
        findPeaksInWindow(windowSize) {
            console.log(`\n📊 Finding peaks in ${windowSize}-day windows:`);
            console.log(`Prices: [${this.prices.join(', ')}]`);
            
            const peaks = slidingWindowMaximum(this.prices, windowSize);
            
            console.log(`\n📈 Peak Analysis:`);
            peaks.forEach((peak, index) => {
                const dayStart = index + 1;
                const dayEnd = index + windowSize;
                console.log(`Days ${dayStart}-${dayEnd}: Peak price $${peak}`);
            });
            
            return peaks;
        }
    }
    
    const analyzer = new StockAnalyzer();
    analyzer.addPrices([100, 120, 90, 150, 80, 110, 140, 95]);
    analyzer.findPeaksInWindow(3);
}

// ============= TEST CASES =============

function testAdvancedProblems() {
    console.log(`\n🧪 Testing Advanced Stack & Queue Problems`);
    
    // Test Sliding Window Maximum
    console.log(`\n--- Testing Sliding Window Maximum ---`);
    const testCases1 = [
        { nums: [1,3,-1,-3,5,3,6,7], k: 3, expected: [3,3,5,5,6,7] },
        { nums: [1], k: 1, expected: [1] },
        { nums: [1,-1], k: 1, expected: [1,-1] }
    ];
    
    testCases1.forEach((test, index) => {
        console.log(`\nTest ${index + 1}:`);
        const result = slidingWindowMaximum(test.nums, test.k);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        console.log(`Expected: [${test.expected.join(', ')}]`);
        console.log(`Got: [${result.join(', ')}] ${passed ? '✅' : '❌'}`);
    });
    
    // Test Largest Rectangle
    console.log(`\n--- Testing Largest Rectangle ---`);
    const testCases2 = [
        { heights: [2,1,5,6,2,3], expected: 10 },
        { heights: [2,4], expected: 4 },
        { heights: [1,1], expected: 2 }
    ];
    
    testCases2.forEach((test, index) => {
        console.log(`\nTest ${index + 1}:`);
        const result = largestRectangleArea(test.heights);
        const passed = result === test.expected;
        console.log(`Heights: [${test.heights.join(', ')}]`);
        console.log(`Expected: ${test.expected}, Got: ${result} ${passed ? '✅' : '❌'}`);
    });
    
    // Test other problems with simple cases
    console.log(`\n--- Testing Other Problems ---`);
    
    console.log(`\nTrap Rain Water:`);
    const waterResult = trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1]);
    console.log(`Expected: 6, Got: ${waterResult} ${waterResult === 6 ? '✅' : '❌'}`);
    
    console.log(`\nBasic Calculator:`);
    const calcResult = basicCalculator("1 + 1");
    console.log(`Expected: 2, Got: ${calcResult} ${calcResult === 2 ? '✅' : '❌'}`);
    
    console.log(`\nDecode String:`);
    const decodeResult = decodeString("3[a]2[bc]");
    console.log(`Expected: "aaabcbc", Got: "${decodeResult}" ${decodeResult === "aaabcbc" ? '✅' : '❌'}`);
    
    console.log(`\nAsteroid Collision:`);
    const asteroidResult = asteroidCollision([5,10,-5]);
    const expectedAsteroid = [5,10];
    const asteroidPassed = JSON.stringify(asteroidResult) === JSON.stringify(expectedAsteroid);
    console.log(`Expected: [${expectedAsteroid.join(', ')}], Got: [${asteroidResult.join(', ')}] ${asteroidPassed ? '✅' : '❌'}`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ADVANCED STACKS & QUEUES - BODHI DSA COURSE");
console.log("=" .repeat(55));

performanceComparison();
practicalApplications();
testAdvancedProblems();

// Export functions
module.exports = {
    slidingWindowMaximum,
    largestRectangleArea,
    trapRainWater,
    basicCalculator,
    decodeString,
    asteroidCollision,
    visualizeStackOperations,
    visualizeQueueOperations,
    performanceComparison,
    practicalApplications,
    testAdvancedProblems
};
