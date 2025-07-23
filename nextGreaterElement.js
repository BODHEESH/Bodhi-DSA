/**
 * Next Greater Element
 * Bodhi-DSA Course
 * 
 * Problem: Given an array, find the next greater element for each element.
 * The next greater element for an element x is the first greater element 
 * to the right of x in the array.
 * 
 * If no greater element exists, return -1 for that element.
 * 
 * Example:
 * Input: [4, 5, 2, 25]
 * Output: [5, 25, 25, -1]
 * Explanation: 
 * - Next greater of 4 is 5
 * - Next greater of 5 is 25
 * - Next greater of 2 is 25
 * - Next greater of 25 is -1 (no element greater than 25)
 */

// ============= APPROACH 1: BRUTE FORCE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Algorithm: For each element, scan right to find next greater

function nextGreaterElementBruteForce(nums) {
    if (!Array.isArray(nums) || nums.length === 0) {
        return [];
    }
    
    console.log(`\n🔄 Brute Force Approach: [${nums.join(', ')}]`);
    
    const result = [];
    
    console.log(`\nStep-by-step process:`);
    console.log(`Index | Element | Search Right | Next Greater | Notes`);
    console.log(`------|---------|--------------|--------------|-------`);
    
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        let nextGreater = -1;
        const searchElements = [];
        
        // Search for next greater element
        for (let j = i + 1; j < nums.length; j++) {
            searchElements.push(nums[j]);
            if (nums[j] > current) {
                nextGreater = nums[j];
                break;
            }
        }
        
        result.push(nextGreater);
        
        const searchStr = searchElements.length > 0 ? `[${searchElements.join(', ')}]` : '[]';
        const notes = nextGreater === -1 ? 'No greater element' : `Found ${nextGreater}`;
        
        console.log(`${i.toString().padStart(5)} | ${current.toString().padStart(7)} | ${searchStr.padStart(12)} | ${nextGreater.toString().padStart(12)} | ${notes}`);
    }
    
    console.log(`\nResult: [${result.join(', ')}]`);
    return result;
}

// ============= APPROACH 2: STACK-BASED SOLUTION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to track elements waiting for next greater

function nextGreaterElementStack(nums) {
    if (!Array.isArray(nums) || nums.length === 0) {
        return [];
    }
    
    console.log(`\n📚 Stack Approach: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(-1);
    const stack = []; // Stack to store indices
    
    console.log(`\nStep-by-step process:`);
    console.log(`Index | Element | Stack Before | Action | Stack After | Result Updates`);
    console.log(`------|---------|--------------|--------|-------------|----------------`);
    
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const stackBefore = [...stack];
        let action = '';
        const updates = [];
        
        // Pop elements from stack while current is greater
        while (stack.length > 0 && nums[stack[stack.length - 1]] < current) {
            const index = stack.pop();
            result[index] = current;
            updates.push(`result[${index}] = ${current}`);
        }
        
        // Push current index to stack
        stack.push(i);
        action = updates.length > 0 ? `Pop & update, Push ${i}` : `Push ${i}`;
        
        const stackBeforeStr = `[${stackBefore.join(', ')}]`;
        const stackAfterStr = `[${stack.join(', ')}]`;
        const updatesStr = updates.length > 0 ? updates.join(', ') : 'None';
        
        console.log(`${i.toString().padStart(5)} | ${current.toString().padStart(7)} | ${stackBeforeStr.padStart(12)} | ${action.padStart(6)} | ${stackAfterStr.padStart(11)} | ${updatesStr}`);
    }
    
    console.log(`\nFinal result: [${result.join(', ')}]`);
    console.log(`Remaining stack elements have no next greater: [${stack.join(', ')}]`);
    
    return result;
}

// ============= APPROACH 3: OPTIMIZED STACK =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Cleaner stack implementation

function nextGreaterElementOptimized(nums) {
    if (!Array.isArray(nums) || nums.length === 0) {
        return [];
    }
    
    console.log(`\n⚡ Optimized Stack: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            const index = stack.pop();
            result[index] = nums[i];
            console.log(`Found next greater for nums[${index}] = ${nums[index]}: ${nums[i]}`);
        }
        stack.push(i);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= APPROACH 4: REVERSE ITERATION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Process array from right to left

function nextGreaterElementReverse(nums) {
    if (!Array.isArray(nums) || nums.length === 0) {
        return [];
    }
    
    console.log(`\n🔄 Reverse Iteration: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    console.log(`\nProcessing from right to left:`);
    
    for (let i = nums.length - 1; i >= 0; i--) {
        const current = nums[i];
        
        // Remove elements smaller than current
        while (stack.length > 0 && stack[stack.length - 1] <= current) {
            stack.pop();
        }
        
        // Next greater element is top of stack (if exists)
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
            console.log(`nums[${i}] = ${current}, next greater = ${result[i]}`);
        } else {
            console.log(`nums[${i}] = ${current}, no next greater`);
        }
        
        // Push current element to stack
        stack.push(current);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= NEXT GREATER ELEMENT I (LEETCODE 496) =============
// Problem: Find next greater elements for nums1 elements in nums2

function nextGreaterElementI(nums1, nums2) {
    console.log(`\n🎯 Next Greater Element I`);
    console.log(`nums1: [${nums1.join(', ')}]`);
    console.log(`nums2: [${nums2.join(', ')}]`);
    
    // Build next greater map for nums2
    const nextGreaterMap = new Map();
    const stack = [];
    
    for (const num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            nextGreaterMap.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    console.log(`Next greater map:`, nextGreaterMap);
    
    // Build result for nums1
    const result = nums1.map(num => nextGreaterMap.get(num) || -1);
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= NEXT GREATER ELEMENT II (CIRCULAR ARRAY) =============
// Problem: Find next greater in circular array

function nextGreaterElementII(nums) {
    console.log(`\n🔄 Next Greater Element II (Circular)`);
    console.log(`Input: [${nums.join(', ')}]`);
    
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    // Process array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
        const current = nums[i % n];
        
        while (stack.length > 0 && nums[stack[stack.length - 1]] < current) {
            const index = stack.pop();
            result[index] = current;
        }
        
        // Only push indices in first iteration
        if (i < n) {
            stack.push(i);
        }
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= ADVANCED VARIATIONS =============

// Next greater to the left
function nextGreaterToLeft(nums) {
    console.log(`\n⬅️ Next Greater to Left: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            stack.pop();
        }
        
        if (stack.length > 0) {
            result[i] = nums[stack[stack.length - 1]];
        }
        
        stack.push(i);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// Next smaller element
function nextSmallerElement(nums) {
    console.log(`\n🔽 Next Smaller Element: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
            const index = stack.pop();
            result[index] = nums[i];
        }
        stack.push(i);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// Previous greater element
function previousGreaterElement(nums) {
    console.log(`\n⬅️ Previous Greater Element: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
            stack.pop();
        }
        
        if (stack.length > 0) {
            result[i] = nums[stack[stack.length - 1]];
        }
        
        stack.push(i);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// Count of next greater elements
function countNextGreater(nums) {
    console.log(`\n📊 Count Next Greater: [${nums.join(', ')}]`);
    
    const result = new Array(nums.length).fill(0);
    
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] > nums[i]) {
                count++;
            }
        }
        result[i] = count;
    }
    
    console.log(`Counts: [${result.join(', ')}]`);
    return result;
}

// ============= HELPER FUNCTIONS =============

function validateInput(nums) {
    if (!Array.isArray(nums)) {
        return { valid: false, error: 'Input must be an array' };
    }
    
    if (nums.length === 0) {
        return { valid: false, error: 'Array cannot be empty' };
    }
    
    for (let i = 0; i < nums.length; i++) {
        if (typeof nums[i] !== 'number' || !Number.isFinite(nums[i])) {
            return { valid: false, error: `Invalid number at index ${i}: ${nums[i]}` };
        }
    }
    
    return { valid: true, error: null };
}

function findAllGreaterElements(nums, target) {
    const greaterElements = [];
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > target) {
            greaterElements.push({ value: nums[i], index: i });
        }
    }
    
    return greaterElements;
}

function getElementStatistics(nums) {
    const stats = {
        length: nums.length,
        min: Math.min(...nums),
        max: Math.max(...nums),
        unique: [...new Set(nums)].length,
        duplicates: nums.length - [...new Set(nums)].length
    };
    
    console.log(`\n📈 Array Statistics:`);
    console.log(`Length: ${stats.length}`);
    console.log(`Min: ${stats.min}, Max: ${stats.max}`);
    console.log(`Unique elements: ${stats.unique}`);
    console.log(`Duplicates: ${stats.duplicates}`);
    
    return stats;
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeNextGreater(nums) {
    console.log(`\n🎬 Visualizing Next Greater Element Process`);
    console.log(`Array: [${nums.join(', ')}]`);
    
    const result = nextGreaterElementStack([...nums]);
    
    console.log(`\n📋 Summary Table:`);
    console.log(`Index | Element | Next Greater | Distance`);
    console.log(`------|---------|--------------|----------`);
    
    for (let i = 0; i < nums.length; i++) {
        let distance = -1;
        if (result[i] !== -1) {
            // Find distance to next greater element
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] === result[i]) {
                    distance = j - i;
                    break;
                }
            }
        }
        
        const distanceStr = distance === -1 ? 'N/A' : distance.toString();
        console.log(`${i.toString().padStart(5)} | ${nums[i].toString().padStart(7)} | ${result[i].toString().padStart(12)} | ${distanceStr.padStart(8)}`);
    }
    
    return { result, distances: result.map((val, i) => val === -1 ? -1 : findDistance(nums, i, val)) };
}

function findDistance(nums, startIndex, target) {
    for (let i = startIndex + 1; i < nums.length; i++) {
        if (nums[i] === target) {
            return i - startIndex;
        }
    }
    return -1;
}

function demonstrateAllApproaches() {
    console.log(`\n🎯 Demonstrating All Approaches`);
    
    const testArray = [4, 5, 2, 25, 1, 3];
    console.log(`Test array: [${testArray.join(', ')}]`);
    
    const approaches = [
        { name: "Brute Force", func: nextGreaterElementBruteForce },
        { name: "Stack-based", func: nextGreaterElementStack },
        { name: "Optimized", func: nextGreaterElementOptimized },
        { name: "Reverse", func: nextGreaterElementReverse }
    ];
    
    approaches.forEach(approach => {
        console.log(`\n--- ${approach.name} Approach ---`);
        console.time(approach.name);
        const result = approach.func([...testArray]);
        console.timeEnd(approach.name);
        console.log(`Result: [${result.join(', ')}]`);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log(`\n📊 Performance Analysis`);
    
    const approaches = [
        { name: "Brute Force", time: "O(n²)", space: "O(1)", notes: "Nested loops for each element" },
        { name: "Stack-based", time: "O(n)", space: "O(n)", notes: "Each element pushed/popped once" },
        { name: "Optimized", time: "O(n)", space: "O(n)", notes: "Cleaner stack implementation" },
        { name: "Reverse", time: "O(n)", space: "O(n)", notes: "Right to left processing" }
    ];
    
    console.log(`\n📈 Complexity Comparison:`);
    console.log("=".repeat(85));
    console.log("| Approach    | Time  | Space | Notes                         |");
    console.log("=".repeat(85));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(29);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(85));
    
    console.log(`\n🏆 Winner: Stack-based Approach`);
    console.log(`• O(n) time complexity - each element processed once`);
    console.log(`• O(n) space complexity - stack for pending elements`);
    console.log(`• Optimal solution for this problem`);
    console.log(`• Foundation for many stack-based algorithms`);
    
    console.log(`\n💡 Key Insights:`);
    console.log(`• Stack maintains decreasing sequence`);
    console.log(`• When larger element found, resolve all smaller ones`);
    console.log(`• Each element pushed and popped at most once`);
    console.log(`• Amortized O(1) per element`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Stock Price Analysis:**`);
    console.log(`   - Find next day with higher price`);
    console.log(`   - Trading strategy optimization`);
    
    console.log(`\n2. **Weather Forecasting:**`);
    console.log(`   - Next warmer day prediction`);
    console.log(`   - Temperature trend analysis`);
    
    console.log(`\n3. **Web Analytics:**`);
    console.log(`   - Next page with higher engagement`);
    console.log(`   - User behavior pattern analysis`);
    
    console.log(`\n4. **Performance Monitoring:**`);
    console.log(`   - Next spike in system metrics`);
    console.log(`   - Threshold breach prediction`);
    
    // Example: Stock price analyzer
    console.log(`\n📈 Example: Stock Price Analyzer`);
    
    class StockAnalyzer {
        constructor() {
            this.prices = [];
            this.dates = [];
        }
        
        addPrice(price, date) {
            this.prices.push(price);
            this.dates.push(date);
        }
        
        findNextHigherPriceDays() {
            console.log(`\n📊 Finding next higher price days:`);
            console.log(`Prices: [${this.prices.join(', ')}]`);
            
            const nextHigher = nextGreaterElementOptimized(this.prices);
            
            console.log(`\nAnalysis Results:`);
            for (let i = 0; i < this.prices.length; i++) {
                const currentPrice = this.prices[i];
                const nextPrice = nextHigher[i];
                const currentDate = this.dates[i] || `Day ${i + 1}`;
                
                if (nextPrice !== -1) {
                    // Find the date of next higher price
                    const nextIndex = this.prices.indexOf(nextPrice, i + 1);
                    const nextDate = this.dates[nextIndex] || `Day ${nextIndex + 1}`;
                    console.log(`${currentDate}: $${currentPrice} → Next higher: $${nextPrice} on ${nextDate}`);
                } else {
                    console.log(`${currentDate}: $${currentPrice} → No higher price found`);
                }
            }
        }
    }
    
    const analyzer = new StockAnalyzer();
    analyzer.addPrice(100, 'Mon');
    analyzer.addPrice(120, 'Tue');
    analyzer.addPrice(90, 'Wed');
    analyzer.addPrice(150, 'Thu');
    analyzer.addPrice(80, 'Fri');
    
    analyzer.findNextHigherPriceDays();
    
    // Example: Temperature tracker
    console.log(`\n🌡️ Example: Temperature Tracker`);
    
    class TemperatureTracker {
        constructor() {
            this.temperatures = [];
        }
        
        addTemperature(temp) {
            this.temperatures.push(temp);
        }
        
        findNextWarmerDays() {
            console.log(`\n🌡️ Finding next warmer days:`);
            console.log(`Temperatures: [${this.temperatures.join('°, ')}°]`);
            
            const nextWarmer = nextGreaterElementOptimized(this.temperatures);
            
            console.log(`\nWarmer Day Predictions:`);
            nextWarmer.forEach((temp, index) => {
                const current = this.temperatures[index];
                if (temp !== -1) {
                    console.log(`Day ${index + 1}: ${current}° → Next warmer: ${temp}°`);
                } else {
                    console.log(`Day ${index + 1}: ${current}° → No warmer day ahead`);
                }
            });
        }
    }
    
    const tempTracker = new TemperatureTracker();
    [73, 74, 75, 71, 69, 72, 76, 73].forEach(temp => tempTracker.addTemperature(temp));
    tempTracker.findNextWarmerDays();
}

// ============= TEST CASES =============

function testNextGreaterElement() {
    console.log(`\n🧪 Testing Next Greater Element`);
    
    const testCases = [
        { input: [4, 5, 2, 25], expected: [5, 25, 25, -1], description: "Basic case" },
        { input: [13, 7, 6, 12], expected: [-1, 12, 12, -1], description: "Mixed pattern" },
        { input: [1, 2, 3, 4, 5], expected: [2, 3, 4, 5, -1], description: "Increasing sequence" },
        { input: [5, 4, 3, 2, 1], expected: [-1, -1, -1, -1, -1], description: "Decreasing sequence" },
        { input: [1, 1, 1, 1], expected: [-1, -1, -1, -1], description: "All equal" },
        { input: [5], expected: [-1], description: "Single element" },
        { input: [1, 3, 2, 4], expected: [3, 4, 4, -1], description: "Random pattern" }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test ${index + 1}: ${testCase.description} ---`);
        console.log(`Input: [${testCase.input.join(', ')}]`);
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        
        const result = nextGreaterElementOptimized([...testCase.input]);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        console.log(`Actual: [${result.join(', ')}] ${passed ? '✅' : '❌'}`);
    });
    
    // Test variations
    console.log(`\n--- Testing Variations ---`);
    
    const testArray = [4, 5, 2, 25, 1, 3];
    console.log(`\nTest array: [${testArray.join(', ')}]`);
    
    console.log(`\nNext Greater (Right):`);
    const nextRight = nextGreaterElementOptimized([...testArray]);
    console.log(`[${nextRight.join(', ')}]`);
    
    console.log(`\nNext Greater (Left):`);
    const nextLeft = nextGreaterToLeft([...testArray]);
    console.log(`[${nextLeft.join(', ')}]`);
    
    console.log(`\nNext Smaller:`);
    const nextSmaller = nextSmallerElement([...testArray]);
    console.log(`[${nextSmaller.join(', ')}]`);
    
    console.log(`\nPrevious Greater:`);
    const prevGreater = previousGreaterElement([...testArray]);
    console.log(`[${prevGreater.join(', ')}]`);
    
    // Test LeetCode problems
    console.log(`\n--- LeetCode Problems ---`);
    
    console.log(`\nNext Greater Element I:`);
    const nums1 = [4, 1, 2];
    const nums2 = [1, 3, 4, 2];
    const result1 = nextGreaterElementI(nums1, nums2);
    console.log(`Expected: [-1, 3, -1], Got: [${result1.join(', ')}]`);
    
    console.log(`\nNext Greater Element II (Circular):`);
    const circular = [1, 2, 1];
    const result2 = nextGreaterElementII(circular);
    console.log(`Expected: [2, -1, 2], Got: [${result2.join(', ')}]`);
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 NEXT GREATER ELEMENT - BODHI DSA COURSE");
console.log("=" .repeat(50));

analyzePerformance();
demonstrateAllApproaches();
visualizeNextGreater([4, 5, 2, 25, 1, 3]);
practicalApplications();
testNextGreaterElement();

// Export functions
module.exports = {
    nextGreaterElementBruteForce,
    nextGreaterElementStack,
    nextGreaterElementOptimized,
    nextGreaterElementReverse,
    nextGreaterElementI,
    nextGreaterElementII,
    nextGreaterToLeft,
    nextSmallerElement,
    previousGreaterElement,
    countNextGreater,
    validateInput,
    findAllGreaterElements,
    getElementStatistics,
    visualizeNextGreater,
    demonstrateAllApproaches,
    analyzePerformance,
    practicalApplications,
    testNextGreaterElement
};
