/**
 * Single Element in a Sorted Array & Find k Closest Elements
 * Bodhi-DSA Course - Binary Search Section
 */

// ============= SINGLE ELEMENT IN SORTED ARRAY =============

/**
 * Find the single element that appears once in a sorted array
 * where every other element appears exactly twice
 */
function singleNonDuplicate(nums) {
    console.log(`\n🔍 FIND SINGLE ELEMENT IN SORTED ARRAY`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(45)}`);
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nChecking: left=${left}, right=${right}, mid=${mid}`);
        console.log(`Value at mid: ${nums[mid]}`);
        
        // Ensure mid is even for consistent comparison
        const adjustedMid = mid % 2 === 0 ? mid : mid - 1;
        console.log(`Adjusted mid (even): ${adjustedMid}`);
        console.log(`Comparing: nums[${adjustedMid}]=${nums[adjustedMid]} vs nums[${adjustedMid + 1}]=${nums[adjustedMid + 1]}`);
        
        if (nums[adjustedMid] === nums[adjustedMid + 1]) {
            // Pair is intact, single element is in right half
            console.log(`Pair intact, single element in right half`);
            left = adjustedMid + 2;
        } else {
            // Pair is broken, single element is in left half
            console.log(`Pair broken, single element in left half`);
            right = adjustedMid;
        }
    }
    
    console.log(`\n✅ Single element found: ${nums[left]} at index ${left}`);
    return nums[left];
}

/**
 * Alternative approach using XOR properties
 */
function singleNonDuplicateXOR(nums) {
    console.log(`\n⚡ XOR APPROACH (O(n) but educational)`);
    console.log(`Array: [${nums.join(', ')}]`);
    
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result ^= nums[i];
        console.log(`Step ${i + 1}: ${result} (after XOR with ${nums[i]})`);
    }
    
    console.log(`✅ Single element: ${result}`);
    return result;
}

// ============= FIND K CLOSEST ELEMENTS =============

/**
 * Approach 1: Binary Search + Two Pointers
 * Find k elements closest to target in sorted array
 */
function findClosestElements(arr, k, x) {
    console.log(`\n🎯 FIND ${k} CLOSEST ELEMENTS TO ${x}`);
    console.log(`Array: [${arr.join(', ')}]`);
    console.log(`${'='.repeat(40)}`);
    
    // Find the closest element or insertion point
    let left = 0;
    let right = arr.length - 1;
    
    // Binary search to find closest position
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] < x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    console.log(`Starting position: ${left}`);
    
    // Use two pointers to find k closest elements
    right = left;
    left = left - 1;
    
    const result = [];
    
    while (result.length < k) {
        console.log(`\nCurrent state: left=${left}, right=${right}`);
        console.log(`Left value: ${left >= 0 ? arr[left] : 'N/A'}, Right value: ${right < arr.length ? arr[right] : 'N/A'}`);
        
        if (left < 0) {
            // Only right elements available
            result.push(arr[right]);
            console.log(`Added right element: ${arr[right]}`);
            right++;
        } else if (right >= arr.length) {
            // Only left elements available
            result.unshift(arr[left]);
            console.log(`Added left element: ${arr[left]}`);
            left--;
        } else {
            // Compare distances
            const leftDist = Math.abs(arr[left] - x);
            const rightDist = Math.abs(arr[right] - x);
            
            console.log(`Distance comparison: |${arr[left]} - ${x}| = ${leftDist}, |${arr[right]} - ${x}| = ${rightDist}`);
            
            if (leftDist <= rightDist) {
                result.unshift(arr[left]);
                console.log(`Added left element: ${arr[left]} (closer or equal distance)`);
                left--;
            } else {
                result.push(arr[right]);
                console.log(`Added right element: ${arr[right]} (closer distance)`);
                right++;
            }
        }
    }
    
    console.log(`\n✅ ${k} closest elements: [${result.join(', ')}]`);
    return result;
}

/**
 * Approach 2: Binary Search on Answer (Sliding Window)
 * More efficient for large k
 */
function findClosestElementsOptimized(arr, k, x) {
    console.log(`\n⚡ OPTIMIZED SLIDING WINDOW APPROACH`);
    console.log(`Array: [${arr.join(', ')}], k=${k}, x=${x}`);
    
    let left = 0;
    let right = arr.length - k;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nChecking window starting at ${mid}: [${arr.slice(mid, mid + k).join(', ')}]`);
        
        const leftDist = Math.abs(arr[mid] - x);
        const rightDist = Math.abs(arr[mid + k] - x);
        
        console.log(`Comparing boundaries: |${arr[mid]} - ${x}| = ${leftDist}, |${arr[mid + k]} - ${x}| = ${rightDist}`);
        
        if (leftDist > rightDist) {
            console.log(`Right boundary is closer, move window right`);
            left = mid + 1;
        } else {
            console.log(`Left boundary is closer or equal, keep left part`);
            right = mid;
        }
    }
    
    const result = arr.slice(left, left + k);
    console.log(`\n✅ Optimal window: [${result.join(', ')}]`);
    return result;
}

/**
 * Approach 3: Priority Queue approach (for educational purposes)
 */
function findClosestElementsPQ(arr, k, x) {
    console.log(`\n📊 PRIORITY QUEUE APPROACH`);
    console.log(`Array: [${arr.join(', ')}], k=${k}, x=${x}`);
    
    // Create array of [distance, value, index] and sort by distance
    const distances = arr.map((val, idx) => ({
        distance: Math.abs(val - x),
        value: val,
        index: idx
    }));
    
    // Sort by distance, then by value (for stability)
    distances.sort((a, b) => {
        if (a.distance !== b.distance) {
            return a.distance - b.distance;
        }
        return a.value - b.value;
    });
    
    console.log(`\nDistances calculated:`);
    distances.slice(0, Math.min(10, distances.length)).forEach(d => {
        console.log(`Value: ${d.value}, Distance: ${d.distance}, Index: ${d.index}`);
    });
    
    // Take first k elements and sort by original index
    const closest = distances.slice(0, k);
    closest.sort((a, b) => a.index - b.index);
    
    const result = closest.map(item => item.value);
    console.log(`\n✅ ${k} closest elements: [${result.join(', ')}]`);
    return result;
}

// ============= INTERACTIVE VISUALIZATIONS =============

function visualizeSingleElementSearch(nums) {
    console.log(`\n🎬 SINGLE ELEMENT SEARCH VISUALIZATION`);
    console.log(`${'='.repeat(45)}`);
    console.log(`Array: [${nums.join(', ')}]`);
    
    let left = 0;
    let right = nums.length - 1;
    let step = 0;
    
    while (left < right) {
        step++;
        const mid = left + Math.floor((right - left) / 2);
        const adjustedMid = mid % 2 === 0 ? mid : mid - 1;
        
        // Visual representation
        const visual = nums.map((num, index) => {
            if (index === adjustedMid || index === adjustedMid + 1) {
                return `[${num}]`; // Pair being checked
            }
            if (index >= left && index <= right) {
                return ` ${num} `; // Search space
            }
            return ` · `; // Outside search space
        }).join('');
        
        console.log(`\nStep ${step}:`);
        console.log(`Visual: ${visual}`);
        console.log(`Range: [${left}, ${right}], Checking pair at [${adjustedMid}, ${adjustedMid + 1}]`);
        console.log(`Pair: ${nums[adjustedMid]} === ${nums[adjustedMid + 1]}? ${nums[adjustedMid] === nums[adjustedMid + 1]}`);
        
        if (nums[adjustedMid] === nums[adjustedMid + 1]) {
            console.log(`✓ Pair intact, search right half`);
            left = adjustedMid + 2;
        } else {
            console.log(`✗ Pair broken, search left half`);
            right = adjustedMid;
        }
    }
    
    console.log(`\n🎯 Single element found: ${nums[left]} at index ${left}`);
    return nums[left];
}

// ============= COMPREHENSIVE TEST CASES =============

function runComprehensiveTests() {
    console.log(`\n🧪 COMPREHENSIVE TEST CASES`);
    console.log(`${'='.repeat(35)}`);
    
    // Test Single Element
    console.log(`\n🔍 Testing Single Element:`);
    const singleTests = [
        { nums: [1,1,2,3,3,4,4,8,8], expected: 2 },
        { nums: [3,3,7,7,10,11,11], expected: 10 },
        { nums: [1], expected: 1 }
    ];
    
    singleTests.forEach((test, index) => {
        console.log(`\nSingle Test ${index + 1}:`);
        const result = singleNonDuplicate([...test.nums]);
        const passed = result === test.expected;
        console.log(`${passed ? '✅ PASS' : '❌ FAIL'} - Expected: ${test.expected}, Got: ${result}`);
    });
    
    // Test K Closest Elements
    console.log(`\n🎯 Testing K Closest Elements:`);
    const closestTests = [
        { arr: [1,2,3,4,5], k: 4, x: 3, expected: [1,2,3,4] },
        { arr: [1,2,3,4,5], k: 4, x: -1, expected: [1,2,3,4] },
        { arr: [1,1,1,10,10,10], k: 1, x: 9, expected: [10] }
    ];
    
    closestTests.forEach((test, index) => {
        console.log(`\nClosest Test ${index + 1}:`);
        const result = findClosestElements([...test.arr], test.k, test.x);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        console.log(`${passed ? '✅ PASS' : '❌ FAIL'} - Expected: [${test.expected.join(', ')}], Got: [${result.join(', ')}]`);
    });
}

// ============= MAIN EXECUTION =============

console.log("🔍 SINGLE ELEMENT & K CLOSEST ELEMENTS");
console.log("=" .repeat(45));
console.log("📚 BODHI DSA COURSE - ADVANCED BINARY SEARCH");
console.log("=" .repeat(45));

// Demonstrate Single Element
console.log("\n1️⃣ SINGLE ELEMENT IN SORTED ARRAY:");
singleNonDuplicate([1,1,2,3,3,4,4,8,8]);
singleNonDuplicateXOR([3,3,7,7,10,11,11]);

// Demonstrate K Closest Elements
console.log("\n2️⃣ FIND K CLOSEST ELEMENTS:");
findClosestElements([1,2,3,4,5], 4, 3);
findClosestElementsOptimized([1,2,3,4,5], 4, -1);
findClosestElementsPQ([1,1,1,10,10,10], 1, 9);

// Interactive Visualization
console.log("\n3️⃣ INTERACTIVE VISUALIZATION:");
visualizeSingleElementSearch([1,1,2,3,3,4,4,8,8]);

// Comprehensive Testing
console.log("\n4️⃣ COMPREHENSIVE TESTING:");
runComprehensiveTests();

// Export all functions
module.exports = {
    singleNonDuplicate,
    singleNonDuplicateXOR,
    findClosestElements,
    findClosestElementsOptimized,
    findClosestElementsPQ,
    visualizeSingleElementSearch,
    runComprehensiveTests
};
