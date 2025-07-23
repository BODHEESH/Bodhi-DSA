/**
 * Second Largest Element in Array
 * Malayalam DSA Course - NamasteDSA
 * 
 * Problem: Find the second largest element in an array
 * ഒരു array-ൽ രണ്ടാമത്തെ വലിയ element കണ്ടെത്തുക
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n log n) | Space Complexity: O(1)
// സാധാരണ രീതി: Array sort ചെയ്ത് രണ്ടാമത്തെ element എടുക്കുക
function secondLargestBruteForce(arr) {
    // Edge case: Array-ൽ 2-ൽ കുറവ് elements ഉണ്ടെങ്കിൽ
    if (arr.length < 2) {
        return -1; // Invalid case
    }
    
    // Array-നെ descending order-ൽ sort ചെയ്യുക
    arr.sort((a, b) => b - a);
    
    // Duplicates handle ചെയ്യാൻ വേണ്ടി
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[0]) {
            return arr[i]; // രണ്ടാമത്തെ വലിയ element
        }
    }
    
    return -1; // എല്ലാ elements ഒരേ പോലെ ആണെങ്കിൽ
}

// ============= BETTER APPROACH =============
// Time Complexity: O(2n) | Space Complexity: O(1)
// മെച്ചപ്പെട്ട രീതി: രണ്ട് pass-ൽ കണ്ടെത്തുക
function secondLargestBetter(arr) {
    if (arr.length < 2) {
        return -1;
    }
    
    // First pass: ഏറ്റവും വലിയ element കണ്ടെത്തുക
    let largest = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }
    
    // Second pass: രണ്ടാമത്തെ വലിയ element കണ്ടെത്തുക
    let secondLargest = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > secondLargest && arr[i] !== largest) {
            secondLargest = arr[i];
        }
    }
    
    return secondLargest;
}

// ============= OPTIMIZED APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(1)
// ഏറ്റവും നല്ല രീതി: ഒരു pass-ൽ തന്നെ കണ്ടെത്തുക
function secondLargestOptimized(arr) {
    if (arr.length < 2) {
        return -1;
    }
    
    let largest = -Infinity;    // ഏറ്റവും വലിയ element
    let secondLargest = -Infinity; // രണ്ടാമത്തെ വലിയ element
    
    for (let i = 0; i < arr.length; i++) {
        // Current element largest-നേക്കാൾ വലുതാണെങ്കിൽ
        if (arr[i] > largest) {
            secondLargest = largest; // പഴയ largest-നെ second largest ആക്കുക
            largest = arr[i];        // പുതിയ largest update ചെയ്യുക
        }
        // Current element largest-നേക്കാൾ ചെറുതും secondLargest-നേക്കാൾ വലുതും ആണെങ്കിൽ
        else if (arr[i] > secondLargest && arr[i] !== largest) {
            secondLargest = arr[i];  // Second largest update ചെയ്യുക
        }
    }
    
    // Second largest കിട്ടിയില്ലെങ്കിൽ -1 return ചെയ്യുക
    return secondLargest === -Infinity ? -1 : secondLargest;
}

// ============= TEST CASES =============
function testSecondLargest() {
    const testCases = [
        [12, 35, 1, 10, 34, 1],     // Expected: 34
        [10, 5, 10],                // Expected: 5
        [10, 10, 10],               // Expected: -1
        [1],                        // Expected: -1
        [1, 2],                     // Expected: 1
        [2, 1, 3, 4, 5]            // Expected: 4
    ];
    
    console.log("=== Second Largest Element Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        console.log(`Brute Force: ${secondLargestBruteForce([...testCase])}`);
        console.log(`Better: ${secondLargestBetter([...testCase])}`);
        console.log(`Optimized: ${secondLargestOptimized([...testCase])}`);
    });
}

// Test function call ചെയ്യുക
testSecondLargest();

// Export functions for use in other files
module.exports = {
    secondLargestBruteForce,
    secondLargestBetter,
    secondLargestOptimized
};
