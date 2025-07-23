/**
 * Guess Higher or Lower & Search in Rotated Sorted Array
 * Bodhi-DSA Course - Binary Search Section
 * 
 * This file covers:
 * 1. Guess Number Higher or Lower (Interactive Binary Search)
 * 2. Search in Rotated Sorted Array (Multiple Approaches)
 * 3. Find Minimum in Rotated Sorted Array
 * 4. Advanced Rotated Array Variations
 * 5. Interactive Learning and Visualizations
 * 
 * Perfect for live Malayalam YouTube teaching with step-by-step explanations
 */

// ============= GUESS NUMBER HIGHER OR LOWER =============

/**
 * Approach 1: Classic Guessing Game Implementation
 * Time: O(log n), Space: O(1)
 * Interactive binary search learning through gaming
 */
class GuessGame {
    constructor(hiddenNumber, maxNumber = 100) {
        this.hiddenNumber = hiddenNumber;
        this.maxNumber = maxNumber;
        this.attempts = 0;
        this.maxAttempts = Math.ceil(Math.log2(maxNumber)) + 1;
        
        console.log(`🎮 GUESS THE NUMBER GAME`);
        console.log(`I'm thinking of a number between 1 and ${maxNumber}`);
        console.log(`You have maximum ${this.maxAttempts} attempts to guess it!`);
        console.log(`(Hidden number: ${hiddenNumber} - for demonstration)\n`);
    }
    
    guess(num) {
        this.attempts++;
        console.log(`Attempt ${this.attempts}: Guessing ${num}`);
        
        if (num === this.hiddenNumber) {
            console.log(`🎉 CORRECT! You found ${this.hiddenNumber} in ${this.attempts} attempts!`);
            return 0; // Found
        } else if (num < this.hiddenNumber) {
            console.log(`📈 My number is HIGHER than ${num}`);
            return 1; // Higher
        } else {
            console.log(`📉 My number is LOWER than ${num}`);
            return -1; // Lower
        }
    }
    
    getAttempts() {
        return this.attempts;
    }
    
    getMaxAttempts() {
        return this.maxAttempts;
    }
}

/**
 * Optimal Guessing Strategy using Binary Search
 * Always guess the middle of current range
 */
function guessNumberOptimal(n, hiddenNumber) {
    console.log(`\n🎯 OPTIMAL GUESSING STRATEGY`);
    console.log(`Range: 1 to ${n}, Hidden: ${hiddenNumber}`);
    console.log(`${'='.repeat(40)}`);
    
    const game = new GuessGame(hiddenNumber, n);
    let left = 1;
    let right = n;
    
    while (left <= right) {
        // Always guess the middle
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Current range: [${left}, ${right}]`);
        
        const result = game.guess(mid);
        
        if (result === 0) {
            console.log(`✅ Game completed in ${game.getAttempts()} attempts`);
            console.log(`Theoretical minimum: ${Math.ceil(Math.log2(n))} attempts`);
            return mid;
        } else if (result === 1) {
            left = mid + 1; // Number is higher
        } else {
            right = mid - 1; // Number is lower
        }
        
        console.log(''); // Empty line for readability
    }
    
    return -1; // Should never reach here
}

/**
 * Interactive Guessing Game with User Strategy Analysis
 */
function analyzeGuessingStrategy(n, hiddenNumber, userGuesses) {
    console.log(`\n📊 ANALYZING GUESSING STRATEGY`);
    console.log(`${'='.repeat(35)}`);
    
    console.log(`Hidden number: ${hiddenNumber}`);
    console.log(`User guesses: [${userGuesses.join(', ')}]`);
    
    let currentRange = [1, n];
    let attempts = 0;
    
    for (const guess of userGuesses) {
        attempts++;
        console.log(`\nAttempt ${attempts}: Guess ${guess}`);
        console.log(`Current range: [${currentRange[0]}, ${currentRange[1]}]`);
        
        if (guess === hiddenNumber) {
            console.log(`🎉 Found the number!`);
            break;
        } else if (guess < hiddenNumber) {
            console.log(`📈 Too low! Number is higher.`);
            currentRange[0] = Math.max(currentRange[0], guess + 1);
        } else {
            console.log(`📉 Too high! Number is lower.`);
            currentRange[1] = Math.min(currentRange[1], guess - 1);
        }
        
        // Analyze if this was optimal
        const optimalGuess = currentRange[0] + Math.floor((currentRange[1] - currentRange[0]) / 2);
        const isOptimal = Math.abs(guess - optimalGuess) <= 1;
        console.log(`Optimal guess would be: ${optimalGuess}`);
        console.log(`Your guess was: ${isOptimal ? '✅ Good' : '⚠️ Suboptimal'}`);
    }
    
    const theoreticalMin = Math.ceil(Math.log2(n));
    console.log(`\n📈 PERFORMANCE ANALYSIS:`);
    console.log(`Your attempts: ${attempts}`);
    console.log(`Theoretical minimum: ${theoreticalMin}`);
    console.log(`Efficiency: ${attempts <= theoreticalMin ? '✅ Excellent' : attempts <= theoreticalMin + 2 ? '👍 Good' : '⚠️ Can improve'}`);
}

// ============= SEARCH IN ROTATED SORTED ARRAY =============

/**
 * Approach 1: Find Pivot and Binary Search
 * Time: O(log n), Space: O(1)
 * Two-step approach: find rotation point, then search
 */
function searchRotatedArray(nums, target) {
    console.log(`\n🔄 SEARCH IN ROTATED SORTED ARRAY`);
    console.log(`Array: [${nums.join(', ')}], Target: ${target}`);
    console.log(`${'='.repeat(50)}`);
    
    if (nums.length === 0) return -1;
    
    // Step 1: Find the pivot (minimum element index)
    const pivot = findPivot(nums);
    console.log(`Pivot found at index: ${pivot}`);
    
    // Step 2: Determine which part to search
    if (nums[pivot] === target) {
        console.log(`✅ Target found at pivot index: ${pivot}`);
        return pivot;
    }
    
    // If array is not rotated
    if (pivot === 0) {
        console.log(`Array is not rotated, using normal binary search`);
        return binarySearch(nums, target, 0, nums.length - 1);
    }
    
    // Decide which part to search
    if (target >= nums[0]) {
        console.log(`Target ${target} >= ${nums[0]}, searching left part [0, ${pivot - 1}]`);
        return binarySearch(nums, target, 0, pivot - 1);
    } else {
        console.log(`Target ${target} < ${nums[0]}, searching right part [${pivot}, ${nums.length - 1}]`);
        return binarySearch(nums, target, pivot, nums.length - 1);
    }
}

/**
 * Helper function to find pivot (minimum element) in rotated array
 */
function findPivot(nums) {
    console.log(`Finding pivot in rotated array...`);
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`  Checking: left=${left}, right=${right}, mid=${mid}`);
        console.log(`  Values: nums[${left}]=${nums[left]}, nums[${mid}]=${nums[mid]}, nums[${right}]=${nums[right]}`);
        
        if (nums[mid] > nums[right]) {
            // Pivot is in right half
            console.log(`  nums[${mid}] > nums[${right}], pivot is in right half`);
            left = mid + 1;
        } else {
            // Pivot is in left half (including mid)
            console.log(`  nums[${mid}] <= nums[${right}], pivot is in left half`);
            right = mid;
        }
    }
    
    console.log(`  Pivot found at index: ${left}`);
    return left;
}

/**
 * Helper function for standard binary search
 */
function binarySearch(nums, target, left, right) {
    console.log(`  Binary search in range [${left}, ${right}]`);
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`    Checking mid=${mid}, value=${nums[mid]}`);
        
        if (nums[mid] === target) {
            console.log(`    ✅ Found target at index: ${mid}`);
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    console.log(`    ❌ Target not found in this range`);
    return -1;
}

/**
 * Approach 2: One-Pass Binary Search (More Elegant)
 * Time: O(log n), Space: O(1)
 * Single binary search with rotation logic
 */
function searchRotatedArrayOnePass(nums, target) {
    console.log(`\n🎯 ONE-PASS ROTATED ARRAY SEARCH`);
    console.log(`Array: [${nums.join(', ')}], Target: ${target}`);
    console.log(`${'='.repeat(45)}`);
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nStep: left=${left}, right=${right}, mid=${mid}`);
        console.log(`Values: nums[${left}]=${nums[left]}, nums[${mid}]=${nums[mid]}, nums[${right}]=${nums[right]}`);
        
        if (nums[mid] === target) {
            console.log(`✅ Found target at index: ${mid}`);
            return mid;
        }
        
        // Determine which part is sorted
        if (nums[left] <= nums[mid]) {
            console.log(`Left part [${left}, ${mid}] is sorted`);
            // Left part is sorted
            if (target >= nums[left] && target < nums[mid]) {
                console.log(`Target is in sorted left part`);
                right = mid - 1;
            } else {
                console.log(`Target is in right part`);
                left = mid + 1;
            }
        } else {
            console.log(`Right part [${mid}, ${right}] is sorted`);
            // Right part is sorted
            if (target > nums[mid] && target <= nums[right]) {
                console.log(`Target is in sorted right part`);
                left = mid + 1;
            } else {
                console.log(`Target is in left part`);
                right = mid - 1;
            }
        }
    }
    
    console.log(`❌ Target not found`);
    return -1;
}

// ============= FIND MINIMUM IN ROTATED SORTED ARRAY =============

/**
 * Approach 1: Find Minimum Element
 * Time: O(log n), Space: O(1)
 * Classic binary search on rotated array
 */
function findMinInRotatedArray(nums) {
    console.log(`\n🔍 FIND MINIMUM IN ROTATED ARRAY`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(40)}`);
    
    let left = 0;
    let right = nums.length - 1;
    
    // If array is not rotated
    if (nums[left] <= nums[right]) {
        console.log(`Array is not rotated, minimum is: ${nums[left]}`);
        return nums[left];
    }
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Checking: left=${left}, right=${right}, mid=${mid}`);
        console.log(`Values: nums[${left}]=${nums[left]}, nums[${mid}]=${nums[mid]}, nums[${right}]=${nums[right]}`);
        
        if (nums[mid] > nums[right]) {
            // Minimum is in right half
            console.log(`nums[${mid}] > nums[${right}], minimum is in right half`);
            left = mid + 1;
        } else {
            // Minimum is in left half (including mid)
            console.log(`nums[${mid}] <= nums[${right}], minimum is in left half`);
            right = mid;
        }
    }
    
    console.log(`✅ Minimum element found: ${nums[left]} at index ${left}`);
    return nums[left];
}

/**
 * Approach 2: Find Minimum with Duplicates
 * Time: O(log n) average, O(n) worst case, Space: O(1)
 * Handles arrays with duplicate elements
 */
function findMinInRotatedArrayWithDuplicates(nums) {
    console.log(`\n🔍 FIND MINIMUM IN ROTATED ARRAY (WITH DUPLICATES)`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(55)}`);
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Checking: left=${left}, right=${right}, mid=${mid}`);
        console.log(`Values: nums[${left}]=${nums[left]}, nums[${mid}]=${nums[mid]}, nums[${right}]=${nums[right]}`);
        
        if (nums[mid] > nums[right]) {
            // Minimum is in right half
            console.log(`nums[${mid}] > nums[${right}], minimum is in right half`);
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            // Minimum is in left half (including mid)
            console.log(`nums[${mid}] < nums[${right}], minimum is in left half`);
            right = mid;
        } else {
            // nums[mid] == nums[right], can't determine, reduce right
            console.log(`nums[${mid}] == nums[${right}], reducing search space`);
            right--;
        }
    }
    
    console.log(`✅ Minimum element found: ${nums[left]} at index ${left}`);
    return nums[left];
}

// ============= ADVANCED ROTATED ARRAY PROBLEMS =============

/**
 * Check if Array is Rotated and Sorted
 */
function isRotatedSortedArray(nums) {
    console.log(`\n✅ CHECK IF ARRAY IS ROTATED AND SORTED`);
    console.log(`Array: [${nums.join(', ')}]`);
    
    let rotationCount = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            rotationCount++;
            console.log(`Rotation point found at index ${i}: ${nums[i]} > ${nums[i + 1]}`);
        }
    }
    
    // Check if last element is greater than first (for rotation)
    if (nums[nums.length - 1] > nums[0]) {
        rotationCount++;
        console.log(`Additional rotation: last element ${nums[nums.length - 1]} > first element ${nums[0]}`);
    }
    
    const isValid = rotationCount <= 1;
    console.log(`Rotation count: ${rotationCount}`);
    console.log(`Is rotated sorted array: ${isValid ? '✅ Yes' : '❌ No'}`);
    
    return isValid;
}

/**
 * Find Rotation Count in Sorted Array
 */
function findRotationCount(nums) {
    console.log(`\n🔢 FIND ROTATION COUNT`);
    console.log(`Array: [${nums.join(', ')}]`);
    
    const minIndex = findPivot(nums);
    console.log(`Minimum element at index: ${minIndex}`);
    console.log(`Rotation count: ${minIndex}`);
    
    return minIndex;
}

// ============= INTERACTIVE VISUALIZATIONS =============

/**
 * Visualize Rotated Array Search Process
 */
function visualizeRotatedArraySearch(nums, target) {
    console.log(`\n🎬 ROTATED ARRAY SEARCH VISUALIZATION`);
    console.log(`${'='.repeat(45)}`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`Target: ${target}`);
    console.log(`${'='.repeat(45)}`);
    
    let left = 0;
    let right = nums.length - 1;
    let step = 0;
    
    while (left <= right) {
        step++;
        const mid = left + Math.floor((right - left) / 2);
        
        // Create visual representation
        const visual = nums.map((num, index) => {
            if (index === mid) return `[${num}]`; // Current middle
            if (index >= left && index <= right) return ` ${num} `; // Search space
            return ` · `; // Outside search space
        }).join('');
        
        console.log(`\nStep ${step}:`);
        console.log(`Visual: ${visual}`);
        console.log(`Range: [${left}, ${right}], Mid: ${mid}, Value: ${nums[mid]}`);
        
        if (nums[mid] === target) {
            console.log(`🎯 FOUND! Target ${target} at index ${mid}`);
            return mid;
        }
        
        // Determine which part is sorted and where to search
        if (nums[left] <= nums[mid]) {
            console.log(`Left part [${left}, ${mid}] is sorted`);
            if (target >= nums[left] && target < nums[mid]) {
                console.log(`📍 Target is in sorted left part`);
                right = mid - 1;
            } else {
                console.log(`📍 Target is in right part`);
                left = mid + 1;
            }
        } else {
            console.log(`Right part [${mid}, ${right}] is sorted`);
            if (target > nums[mid] && target <= nums[right]) {
                console.log(`📍 Target is in sorted right part`);
                left = mid + 1;
            } else {
                console.log(`📍 Target is in left part`);
                right = mid - 1;
            }
        }
    }
    
    console.log(`\n❌ Target ${target} not found in array`);
    return -1;
}

// ============= COMPREHENSIVE TEST CASES =============

function runComprehensiveTests() {
    console.log(`\n🧪 COMPREHENSIVE TEST CASES`);
    console.log(`${'='.repeat(35)}`);
    
    // Test cases for guess number
    console.log(`\n🎮 Testing Guess Number Game:`);
    const guessTests = [
        { n: 10, hidden: 6 },
        { n: 32, hidden: 1 },
        { n: 100, hidden: 50 }
    ];
    
    guessTests.forEach((test, index) => {
        console.log(`\nGuess Test ${index + 1}:`);
        guessNumberOptimal(test.n, test.hidden);
    });
    
    // Test cases for rotated array search
    console.log(`\n🔄 Testing Rotated Array Search:`);
    const rotatedTests = [
        { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
        { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
        { nums: [1], target: 0, expected: -1 },
        { nums: [1], target: 1, expected: 0 },
        { nums: [1, 3], target: 3, expected: 1 }
    ];
    
    rotatedTests.forEach((test, index) => {
        console.log(`\nRotated Test ${index + 1}:`);
        const result = searchRotatedArrayOnePass([...test.nums], test.target);
        const passed = result === test.expected;
        console.log(`${passed ? '✅ PASS' : '❌ FAIL'} - Expected: ${test.expected}, Got: ${result}`);
    });
    
    // Test cases for find minimum
    console.log(`\n🔍 Testing Find Minimum:`);
    const minTests = [
        { nums: [3, 4, 5, 1, 2], expected: 1 },
        { nums: [4, 5, 6, 7, 0, 1, 2], expected: 0 },
        { nums: [11, 13, 15, 17], expected: 11 },
        { nums: [2, 1], expected: 1 }
    ];
    
    minTests.forEach((test, index) => {
        console.log(`\nMin Test ${index + 1}:`);
        const result = findMinInRotatedArray([...test.nums]);
        const passed = result === test.expected;
        console.log(`${passed ? '✅ PASS' : '❌ FAIL'} - Expected: ${test.expected}, Got: ${result}`);
    });
}

// ============= MAIN EXECUTION =============

console.log("🎮 GUESS NUMBER & ROTATED ARRAY SEARCH");
console.log("=" .repeat(45));
console.log("📚 BODHI DSA COURSE - BINARY SEARCH APPLICATIONS");
console.log("=" .repeat(45));

// Demonstrate guessing game
console.log("\n1️⃣ GUESS NUMBER GAME:");
guessNumberOptimal(32, 22);
analyzeGuessingStrategy(16, 11, [8, 12, 10, 11]);

console.log("\n2️⃣ ROTATED ARRAY SEARCH:");
searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0);
searchRotatedArrayOnePass([4, 5, 6, 7, 0, 1, 2], 5);

console.log("\n3️⃣ FIND MINIMUM IN ROTATED ARRAY:");
findMinInRotatedArray([3, 4, 5, 1, 2]);
findMinInRotatedArrayWithDuplicates([2, 2, 2, 0, 1]);

console.log("\n4️⃣ ADVANCED PROBLEMS:");
isRotatedSortedArray([3, 4, 5, 1, 2]);
findRotationCount([4, 5, 6, 7, 0, 1, 2]);

console.log("\n5️⃣ INTERACTIVE VISUALIZATION:");
visualizeRotatedArraySearch([4, 5, 6, 7, 0, 1, 2], 6);

console.log("\n6️⃣ COMPREHENSIVE TESTING:");
runComprehensiveTests();

// Export all functions
module.exports = {
    GuessGame,
    guessNumberOptimal,
    analyzeGuessingStrategy,
    searchRotatedArray,
    searchRotatedArrayOnePass,
    findMinInRotatedArray,
    findMinInRotatedArrayWithDuplicates,
    isRotatedSortedArray,
    findRotationCount,
    visualizeRotatedArraySearch,
    runComprehensiveTests
};
