/**
 * First Bad Version & Find Peak Element
 * Bodhi-DSA Course - Binary Search Section
 * 
 * This file covers:
 * 1. First Bad Version Problem (Binary Search on Answer)
 * 2. Find Peak Element (Multiple Approaches)
 * 3. Find Peak in Mountain Array
 * 4. Advanced Peak Finding Variations
 * 5. Interactive Learning and Visualizations
 * 
 * Perfect for live Malayalam YouTube teaching with step-by-step explanations
 */

// ============= FIRST BAD VERSION PROBLEM =============

/**
 * Mock API for First Bad Version Problem
 * In real scenario, this would be provided by the system
 */
class VersionAPI {
    constructor(firstBadVersion, totalVersions) {
        this.firstBadVersion = firstBadVersion;
        this.totalVersions = totalVersions;
        this.apiCalls = 0;
        
        console.log(`🔧 Version API initialized:`);
        console.log(`Total versions: 1 to ${totalVersions}`);
        console.log(`First bad version: ${firstBadVersion} (hidden from algorithm)`);
        console.log(`Goal: Find first bad version with minimum API calls\n`);
    }
    
    isBadVersion(version) {
        this.apiCalls++;
        const isBad = version >= this.firstBadVersion;
        console.log(`API Call ${this.apiCalls}: isBadVersion(${version}) = ${isBad}`);
        return isBad;
    }
    
    getApiCalls() {
        return this.apiCalls;
    }
    
    reset() {
        this.apiCalls = 0;
    }
}

/**
 * Approach 1: Binary Search for First Bad Version
 * Time: O(log n), Space: O(1)
 * Classic binary search on answer space
 */
function firstBadVersion(n, api) {
    console.log(`\n🔍 FINDING FIRST BAD VERSION`);
    console.log(`Versions: 1 to ${n}`);
    console.log(`${'='.repeat(35)}`);
    
    let left = 1;
    let right = n;
    let result = n;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nChecking range: [${left}, ${right}], mid: ${mid}`);
        
        if (api.isBadVersion(mid)) {
            // This version is bad, but there might be an earlier bad version
            result = mid;
            right = mid - 1;
            console.log(`Version ${mid} is bad, searching for earlier bad versions in [${left}, ${mid - 1}]`);
        } else {
            // This version is good, bad version must be later
            left = mid + 1;
            console.log(`Version ${mid} is good, searching in [${mid + 1}, ${right}]`);
        }
    }
    
    console.log(`\n✅ First bad version found: ${result}`);
    console.log(`Total API calls used: ${api.getApiCalls()}`);
    console.log(`Theoretical minimum calls: ${Math.ceil(Math.log2(n))}`);
    
    return result;
}

/**
 * Approach 2: Optimized First Bad Version (Early Termination)
 * Time: O(log n), Space: O(1)
 * With additional optimizations for edge cases
 */
function firstBadVersionOptimized(n, api) {
    console.log(`\n⚡ OPTIMIZED FIRST BAD VERSION SEARCH`);
    console.log(`${'='.repeat(40)}`);
    
    api.reset();
    
    // Edge case: Check if first version is bad
    if (api.isBadVersion(1)) {
        console.log(`✅ First version itself is bad!`);
        return 1;
    }
    
    // Edge case: Check if last version is good
    if (!api.isBadVersion(n)) {
        console.log(`❌ No bad version found!`);
        return -1; // Or handle as per requirements
    }
    
    let left = 1;
    let right = n;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Checking: left=${left}, right=${right}, mid=${mid}`);
        
        if (api.isBadVersion(mid)) {
            right = mid; // Include mid as it could be the first bad version
            console.log(`Version ${mid} is bad, narrow to [${left}, ${mid}]`);
        } else {
            left = mid + 1; // Exclude mid as it's good
            console.log(`Version ${mid} is good, narrow to [${mid + 1}, ${right}]`);
        }
    }
    
    console.log(`\n✅ First bad version: ${left}`);
    console.log(`API calls used: ${api.getApiCalls()}`);
    
    return left;
}

/**
 * Interactive First Bad Version Game
 * Educational tool for understanding the problem
 */
function firstBadVersionGame(totalVersions, actualFirstBad) {
    console.log(`\n🎮 FIRST BAD VERSION GAME`);
    console.log(`${'='.repeat(30)}`);
    console.log(`You are a QA engineer testing software versions.`);
    console.log(`Versions are numbered 1 to ${totalVersions}.`);
    console.log(`Once a version becomes bad, all subsequent versions are also bad.`);
    console.log(`Your goal: Find the first bad version with minimum API calls!\n`);
    
    const api = new VersionAPI(actualFirstBad, totalVersions);
    const result = firstBadVersion(totalVersions, api);
    
    console.log(`\n🏆 GAME RESULTS:`);
    console.log(`Correct answer: ${actualFirstBad}`);
    console.log(`Your answer: ${result}`);
    console.log(`Success: ${result === actualFirstBad ? '✅' : '❌'}`);
    console.log(`Efficiency: ${api.getApiCalls()} calls (theoretical min: ${Math.ceil(Math.log2(totalVersions))})`);
    
    return result === actualFirstBad;
}

// ============= FIND PEAK ELEMENT PROBLEMS =============

/**
 * Approach 1: Linear Search for Peak Element
 * Time: O(n), Space: O(1)
 * Simple approach for understanding the problem
 */
function findPeakElementLinear(nums) {
    console.log(`\n📈 FIND PEAK ELEMENT (LINEAR SEARCH)`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(40)}`);
    
    const n = nums.length;
    
    // Check first element
    if (n === 1 || nums[0] > nums[1]) {
        console.log(`First element ${nums[0]} is a peak at index 0`);
        return 0;
    }
    
    // Check middle elements
    for (let i = 1; i < n - 1; i++) {
        console.log(`Checking index ${i}: ${nums[i - 1]} < ${nums[i]} > ${nums[i + 1]}?`);
        if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
            console.log(`✅ Peak found at index ${i}: ${nums[i]}`);
            return i;
        }
    }
    
    // Check last element
    if (nums[n - 1] > nums[n - 2]) {
        console.log(`Last element ${nums[n - 1]} is a peak at index ${n - 1}`);
        return n - 1;
    }
    
    console.log(`❌ No peak found`);
    return -1;
}

/**
 * Approach 2: Binary Search for Peak Element
 * Time: O(log n), Space: O(1)
 * Optimal solution using binary search
 */
function findPeakElement(nums) {
    console.log(`\n🎯 FIND PEAK ELEMENT (BINARY SEARCH)`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(45)}`);
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nChecking: left=${left}, right=${right}, mid=${mid}`);
        console.log(`Values: nums[${mid}]=${nums[mid]}, nums[${mid + 1}]=${nums[mid + 1]}`);
        
        if (nums[mid] > nums[mid + 1]) {
            // Peak is in left half (including mid)
            console.log(`nums[${mid}] > nums[${mid + 1}], peak is in left half`);
            right = mid;
        } else {
            // Peak is in right half
            console.log(`nums[${mid}] < nums[${mid + 1}], peak is in right half`);
            left = mid + 1;
        }
    }
    
    console.log(`\n✅ Peak found at index ${left}: ${nums[left]}`);
    return left;
}

/**
 * Approach 3: Find All Peaks in Array
 * Time: O(n), Space: O(k) where k is number of peaks
 * Finds all peak elements in the array
 */
function findAllPeaks(nums) {
    console.log(`\n🏔️ FIND ALL PEAK ELEMENTS`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(30)}`);
    
    const peaks = [];
    const n = nums.length;
    
    if (n === 0) return peaks;
    if (n === 1) {
        peaks.push({ index: 0, value: nums[0] });
        console.log(`Single element is a peak: index 0, value ${nums[0]}`);
        return peaks;
    }
    
    // Check first element
    if (nums[0] > nums[1]) {
        peaks.push({ index: 0, value: nums[0] });
        console.log(`Peak found at index 0: ${nums[0]}`);
    }
    
    // Check middle elements
    for (let i = 1; i < n - 1; i++) {
        if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
            peaks.push({ index: i, value: nums[i] });
            console.log(`Peak found at index ${i}: ${nums[i]}`);
        }
    }
    
    // Check last element
    if (nums[n - 1] > nums[n - 2]) {
        peaks.push({ index: n - 1, value: nums[n - 1] });
        console.log(`Peak found at index ${n - 1}: ${nums[n - 1]}`);
    }
    
    console.log(`\n✅ Total peaks found: ${peaks.length}`);
    return peaks;
}

// ============= FIND PEAK IN MOUNTAIN ARRAY =============

/**
 * Mountain Array Implementation
 * A mountain array has the property: arr[0] < arr[1] < ... < arr[i] > arr[i+1] > ... > arr[n-1]
 */
class MountainArray {
    constructor(arr) {
        this.arr = arr;
        this.getCalls = 0;
        this.lengthCalls = 0;
        
        console.log(`🏔️ Mountain Array created: [${arr.join(', ')}]`);
    }
    
    get(index) {
        this.getCalls++;
        console.log(`get(${index}) called - returns ${this.arr[index]} (call #${this.getCalls})`);
        return this.arr[index];
    }
    
    length() {
        this.lengthCalls++;
        return this.arr.length;
    }
    
    getApiCalls() {
        return { getCalls: this.getCalls, lengthCalls: this.lengthCalls };
    }
    
    reset() {
        this.getCalls = 0;
        this.lengthCalls = 0;
    }
}

/**
 * Find Peak in Mountain Array
 * Time: O(log n), Space: O(1)
 * Binary search on mountain array with limited API calls
 */
function peakIndexInMountainArray(mountainArr) {
    console.log(`\n⛰️ FIND PEAK IN MOUNTAIN ARRAY`);
    console.log(`${'='.repeat(35)}`);
    
    const n = mountainArr.length();
    let left = 0;
    let right = n - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nChecking: left=${left}, right=${right}, mid=${mid}`);
        
        const midVal = mountainArr.get(mid);
        const midPlusOneVal = mountainArr.get(mid + 1);
        
        console.log(`Comparing: arr[${mid}]=${midVal} vs arr[${mid + 1}]=${midPlusOneVal}`);
        
        if (midVal < midPlusOneVal) {
            // We're in ascending part, peak is to the right
            console.log(`Ascending part detected, peak is in right half`);
            left = mid + 1;
        } else {
            // We're in descending part, peak is to the left (including mid)
            console.log(`Descending part detected, peak is in left half`);
            right = mid;
        }
    }
    
    const peakValue = mountainArr.get(left);
    console.log(`\n✅ Peak found at index ${left}: ${peakValue}`);
    
    const apiCalls = mountainArr.getApiCalls();
    console.log(`API calls used: get() = ${apiCalls.getCalls}, length() = ${apiCalls.lengthCalls}`);
    
    return left;
}

/**
 * Find Target in Mountain Array
 * Time: O(log n), Space: O(1)
 * First find peak, then binary search in both halves
 */
function findInMountainArray(target, mountainArr) {
    console.log(`\n🎯 FIND TARGET IN MOUNTAIN ARRAY`);
    console.log(`Target: ${target}`);
    console.log(`${'='.repeat(35)}`);
    
    mountainArr.reset();
    
    // Step 1: Find peak
    console.log(`Step 1: Finding peak...`);
    const peakIndex = peakIndexInMountainArray(mountainArr);
    
    // Step 2: Search in ascending part (left side)
    console.log(`\nStep 2: Searching in ascending part [0, ${peakIndex}]...`);
    let result = binarySearchAscending(mountainArr, target, 0, peakIndex);
    if (result !== -1) {
        console.log(`✅ Target found in ascending part at index: ${result}`);
        return result;
    }
    
    // Step 3: Search in descending part (right side)
    console.log(`\nStep 3: Searching in descending part [${peakIndex + 1}, ${mountainArr.length() - 1}]...`);
    result = binarySearchDescending(mountainArr, target, peakIndex + 1, mountainArr.length() - 1);
    if (result !== -1) {
        console.log(`✅ Target found in descending part at index: ${result}`);
        return result;
    }
    
    console.log(`❌ Target not found in mountain array`);
    return -1;
}

/**
 * Binary search in ascending order
 */
function binarySearchAscending(mountainArr, target, left, right) {
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const midVal = mountainArr.get(mid);
        
        console.log(`  Ascending search: mid=${mid}, value=${midVal}`);
        
        if (midVal === target) {
            return mid;
        } else if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

/**
 * Binary search in descending order
 */
function binarySearchDescending(mountainArr, target, left, right) {
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const midVal = mountainArr.get(mid);
        
        console.log(`  Descending search: mid=${mid}, value=${midVal}`);
        
        if (midVal === target) {
            return mid;
        } else if (midVal > target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// ============= ADVANCED PEAK FINDING VARIATIONS =============

/**
 * Find Local Maxima in 2D Array
 * Time: O(n log m) or O(m log n), Space: O(1)
 * Extension of peak finding to 2D arrays
 */
function findPeakElement2D(matrix) {
    console.log(`\n🗻 FIND PEAK IN 2D ARRAY`);
    console.log(`Matrix:`);
    matrix.forEach((row, i) => {
        console.log(`Row ${i}: [${row.join(', ')}]`);
    });
    console.log(`${'='.repeat(30)}`);
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    
    let left = 0;
    let right = cols - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`\nChecking column ${mid}`);
        
        // Find maximum element in current column
        let maxRow = 0;
        for (let i = 1; i < rows; i++) {
            if (matrix[i][mid] > matrix[maxRow][mid]) {
                maxRow = i;
            }
        }
        
        const currentVal = matrix[maxRow][mid];
        const leftVal = mid > 0 ? matrix[maxRow][mid - 1] : -Infinity;
        const rightVal = mid < cols - 1 ? matrix[maxRow][mid + 1] : -Infinity;
        
        console.log(`Max in column ${mid}: ${currentVal} at row ${maxRow}`);
        console.log(`Left neighbor: ${leftVal}, Right neighbor: ${rightVal}`);
        
        if (currentVal >= leftVal && currentVal >= rightVal) {
            console.log(`✅ Peak found at [${maxRow}, ${mid}]: ${currentVal}`);
            return [maxRow, mid];
        } else if (leftVal > currentVal) {
            console.log(`Moving to left half`);
            right = mid - 1;
        } else {
            console.log(`Moving to right half`);
            left = mid + 1;
        }
    }
    
    return [-1, -1];
}

/**
 * Find Peak with Minimum Comparisons
 * Optimized version that minimizes array accesses
 */
function findPeakMinimumComparisons(nums) {
    console.log(`\n⚡ FIND PEAK WITH MINIMUM COMPARISONS`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(40)}`);
    
    let comparisons = 0;
    const compare = (i, j) => {
        comparisons++;
        console.log(`Comparison ${comparisons}: nums[${i}]=${nums[i]} vs nums[${j}]=${nums[j]}`);
        return nums[i] > nums[j];
    };
    
    const n = nums.length;
    if (n === 1) return 0;
    
    let left = 0;
    let right = n - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (compare(mid, mid + 1)) {
            // nums[mid] > nums[mid + 1], peak is in left half
            right = mid;
        } else {
            // nums[mid] <= nums[mid + 1], peak is in right half
            left = mid + 1;
        }
    }
    
    console.log(`\n✅ Peak found at index ${left}: ${nums[left]}`);
    console.log(`Total comparisons used: ${comparisons}`);
    console.log(`Theoretical minimum: ${Math.ceil(Math.log2(n))}`);
    
    return left;
}

// ============= INTERACTIVE VISUALIZATIONS =============

/**
 * Visualize Peak Finding Process
 */
function visualizePeakFinding(nums) {
    console.log(`\n🎬 PEAK FINDING VISUALIZATION`);
    console.log(`${'='.repeat(35)}`);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`${'='.repeat(35)}`);
    
    let left = 0;
    let right = nums.length - 1;
    let step = 0;
    
    while (left < right) {
        step++;
        const mid = left + Math.floor((right - left) / 2);
        
        // Create visual representation
        const visual = nums.map((num, index) => {
            if (index === mid) return `[${num}]`; // Current middle
            if (index === mid + 1) return `(${num})`; // Comparison element
            if (index >= left && index <= right) return ` ${num} `; // Search space
            return ` · `; // Outside search space
        }).join('');
        
        console.log(`\nStep ${step}:`);
        console.log(`Visual: ${visual}`);
        console.log(`Range: [${left}, ${right}], Mid: ${mid}`);
        console.log(`Comparing: nums[${mid}]=${nums[mid]} vs nums[${mid + 1}]=${nums[mid + 1]}`);
        
        if (nums[mid] > nums[mid + 1]) {
            console.log(`📉 Descending slope, peak is in left half`);
            right = mid;
        } else {
            console.log(`📈 Ascending slope, peak is in right half`);
            left = mid + 1;
        }
    }
    
    console.log(`\n🎯 FINAL RESULT:`);
    console.log(`Peak found at index ${left}: ${nums[left]}`);
    
    return left;
}

// ============= COMPREHENSIVE TEST CASES =============

function runComprehensiveTests() {
    console.log(`\n🧪 COMPREHENSIVE TEST CASES`);
    console.log(`${'='.repeat(35)}`);
    
    // Test First Bad Version
    console.log(`\n🔧 Testing First Bad Version:`);
    const badVersionTests = [
        { n: 5, firstBad: 4 },
        { n: 1, firstBad: 1 },
        { n: 10, firstBad: 1 },
        { n: 100, firstBad: 50 }
    ];
    
    badVersionTests.forEach((test, index) => {
        console.log(`\nBad Version Test ${index + 1}:`);
        const api = new VersionAPI(test.firstBad, test.n);
        const result = firstBadVersion(test.n, api);
        const passed = result === test.firstBad;
        console.log(`${passed ? '✅ PASS' : '❌ FAIL'} - Expected: ${test.firstBad}, Got: ${result}`);
    });
    
    // Test Peak Element
    console.log(`\n📈 Testing Peak Element:`);
    const peakTests = [
        { nums: [1, 2, 3, 1], description: "Single peak in middle" },
        { nums: [1, 2, 1, 3, 5, 6, 4], description: "Multiple peaks" },
        { nums: [1, 2, 3, 4, 5], description: "Ascending array" },
        { nums: [5, 4, 3, 2, 1], description: "Descending array" },
        { nums: [1], description: "Single element" }
    ];
    
    peakTests.forEach((test, index) => {
        console.log(`\nPeak Test ${index + 1}: ${test.description}`);
        const result = findPeakElement([...test.nums]);
        const isValid = (result === 0 || test.nums[result] > test.nums[result - 1]) && 
                       (result === test.nums.length - 1 || test.nums[result] > test.nums[result + 1]);
        console.log(`${isValid ? '✅ VALID PEAK' : '❌ INVALID'} - Found peak at index ${result}: ${test.nums[result]}`);
    });
    
    // Test Mountain Array
    console.log(`\n⛰️ Testing Mountain Array:`);
    const mountainTests = [
        [0, 1, 0],
        [0, 2, 1, 0],
        [1, 2, 3, 4, 5, 3, 1],
        [3, 4, 5, 1]
    ];
    
    mountainTests.forEach((test, index) => {
        console.log(`\nMountain Test ${index + 1}:`);
        const mountainArr = new MountainArray(test);
        const result = peakIndexInMountainArray(mountainArr);
        const isValid = (result === 0 || test[result] > test[result - 1]) && 
                       (result === test.length - 1 || test[result] > test[result + 1]);
        console.log(`${isValid ? '✅ VALID PEAK' : '❌ INVALID'} - Peak at index ${result}: ${test[result]}`);
    });
}

// ============= MAIN EXECUTION =============

console.log("🔧 FIRST BAD VERSION & PEAK ELEMENT");
console.log("=" .repeat(45));
console.log("📚 BODHI DSA COURSE - BINARY SEARCH APPLICATIONS");
console.log("=" .repeat(45));

// Demonstrate First Bad Version
console.log("\n1️⃣ FIRST BAD VERSION PROBLEM:");
firstBadVersionGame(20, 13);

// Demonstrate Peak Finding
console.log("\n2️⃣ PEAK ELEMENT FINDING:");
findPeakElement([1, 2, 3, 1]);
findAllPeaks([1, 3, 20, 4, 1, 0]);

// Demonstrate Mountain Array
console.log("\n3️⃣ MOUNTAIN ARRAY PROBLEMS:");
const mountainArr = new MountainArray([1, 2, 3, 4, 5, 3, 1]);
peakIndexInMountainArray(mountainArr);
findInMountainArray(3, new MountainArray([1, 2, 3, 4, 5, 3, 1]));

// Demonstrate Advanced Problems
console.log("\n4️⃣ ADVANCED VARIATIONS:");
findPeakElement2D([[1, 4], [3, 2]]);
findPeakMinimumComparisons([1, 2, 1, 3, 5, 6, 4]);

console.log("\n5️⃣ INTERACTIVE VISUALIZATION:");
visualizePeakFinding([1, 2, 1, 3, 5, 6, 4]);

console.log("\n6️⃣ COMPREHENSIVE TESTING:");
runComprehensiveTests();

// Export all functions
module.exports = {
    VersionAPI,
    firstBadVersion,
    firstBadVersionOptimized,
    firstBadVersionGame,
    findPeakElementLinear,
    findPeakElement,
    findAllPeaks,
    MountainArray,
    peakIndexInMountainArray,
    findInMountainArray,
    findPeakElement2D,
    findPeakMinimumComparisons,
    visualizePeakFinding,
    runComprehensiveTests
};
