/**
 * Find First & Last Position in Sorted Array
 * Bodhi-DSA Course - Binary Search Section
 */

// Approach 1: Two separate binary searches
function searchRange(nums, target) {
    console.log(`\n🎯 FIND FIRST & LAST POSITION`);
    console.log(`Array: [${nums.join(', ')}], Target: ${target}`);
    
    const first = findFirst(nums, target);
    const last = findLast(nums, target);
    
    console.log(`✅ Result: [${first}, ${last}]`);
    return [first, last];
}

function findFirst(nums, target) {
    let left = 0, right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Finding first: mid=${mid}, value=${nums[mid]}`);
        
        if (nums[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

function findLast(nums, target) {
    let left = 0, right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        console.log(`Finding last: mid=${mid}, value=${nums[mid]}`);
        
        if (nums[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Approach 2: Using lower and upper bound
function searchRangeOptimized(nums, target) {
    console.log(`\n⚡ OPTIMIZED APPROACH`);
    
    const lowerBound = findLowerBound(nums, target);
    if (lowerBound === nums.length || nums[lowerBound] !== target) {
        return [-1, -1];
    }
    
    const upperBound = findUpperBound(nums, target);
    return [lowerBound, upperBound - 1];
}

function findLowerBound(nums, target) {
    let left = 0, right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

function findUpperBound(nums, target) {
    let left = 0, right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Test cases
function runTests() {
    console.log(`\n🧪 TEST CASES`);
    
    const tests = [
        { nums: [5,7,7,8,8,10], target: 8, expected: [3,4] },
        { nums: [5,7,7,8,8,10], target: 6, expected: [-1,-1] },
        { nums: [], target: 0, expected: [-1,-1] }
    ];
    
    tests.forEach((test, i) => {
        console.log(`\nTest ${i + 1}:`);
        const result = searchRange([...test.nums], test.target);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        console.log(`${passed ? '✅ PASS' : '❌ FAIL'}`);
    });
}

// Main execution
console.log("🎯 FIND FIRST & LAST POSITION");
console.log("=" .repeat(35));

searchRange([5,7,7,8,8,10], 8);
searchRangeOptimized([5,7,7,8,8,10], 6);
runTests();

module.exports = {
    searchRange,
    searchRangeOptimized,
    findFirst,
    findLast,
    findLowerBound,
    findUpperBound
};
