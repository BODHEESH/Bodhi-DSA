/**
 * Star Patterns
 * Bodhi-DSA Course
 * 
 * Problem: Draw various star patterns using nested loops
 * Practice nested loops and pattern recognition
 */

// ============= PATTERN 1: RIGHT TRIANGLE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Basic right triangle pattern
function rightTrianglePattern(n) {
    console.log("=== Right Triangle Pattern ===");
    let result = "";
    
    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += "* ";
        }
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 2: INVERTED RIGHT TRIANGLE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Inverted right triangle pattern
function invertedRightTrianglePattern(n) {
    console.log("=== Inverted Right Triangle Pattern ===");
    let result = "";
    
    for (let i = n; i >= 1; i--) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += "* ";
        }
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 3: PYRAMID (CENTERED TRIANGLE) =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Centered pyramid pattern
function pyramidPattern(n) {
    console.log("=== Pyramid Pattern ===");
    let result = "";
    
    for (let i = 1; i <= n; i++) {
        let row = "";
        
        // Add spaces for centering
        for (let j = 1; j <= n - i; j++) {
            row += " ";
        }
        
        // Add stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += "*";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 4: INVERTED PYRAMID =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Inverted pyramid pattern
function invertedPyramidPattern(n) {
    console.log("=== Inverted Pyramid Pattern ===");
    let result = "";
    
    for (let i = n; i >= 1; i--) {
        let row = "";
        
        // Add spaces for centering
        for (let j = 1; j <= n - i; j++) {
            row += " ";
        }
        
        // Add stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += "*";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 5: DIAMOND =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Diamond pattern (pyramid + inverted pyramid)
function diamondPattern(n) {
    console.log("=== Diamond Pattern ===");
    let result = "";
    
    // Upper half (pyramid)
    for (let i = 1; i <= n; i++) {
        let row = "";
        
        // Add spaces
        for (let j = 1; j <= n - i; j++) {
            row += " ";
        }
        
        // Add stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += "*";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    // Lower half (inverted pyramid)
    for (let i = n - 1; i >= 1; i--) {
        let row = "";
        
        // Add spaces
        for (let j = 1; j <= n - i; j++) {
            row += " ";
        }
        
        // Add stars
        for (let k = 1; k <= 2 * i - 1; k++) {
            row += "*";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 6: HOLLOW SQUARE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Hollow square pattern
function hollowSquarePattern(n) {
    console.log("=== Hollow Square Pattern ===");
    let result = "";
    
    for (let i = 1; i <= n; i++) {
        let row = "";
        
        for (let j = 1; j <= n; j++) {
            // Print star for border, space for inside
            if (i === 1 || i === n || j === 1 || j === n) {
                row += "* ";
            } else {
                row += "  ";
            }
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 7: HOLLOW PYRAMID =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Hollow pyramid pattern
function hollowPyramidPattern(n) {
    console.log("=== Hollow Pyramid Pattern ===");
    let result = "";
    
    for (let i = 1; i <= n; i++) {
        let row = "";
        
        // Add spaces for centering
        for (let j = 1; j <= n - i; j++) {
            row += " ";
        }
        
        // Add stars and spaces
        for (let k = 1; k <= 2 * i - 1; k++) {
            if (k === 1 || k === 2 * i - 1 || i === n) {
                row += "*";
            } else {
                row += " ";
            }
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 8: NUMBER TRIANGLE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Triangle with numbers instead of stars
function numberTrianglePattern(n) {
    console.log("=== Number Triangle Pattern ===");
    let result = "";
    
    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += j + " ";
        }
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 9: FLOYD'S TRIANGLE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Floyd's triangle with consecutive numbers
function floydsTrianglePattern(n) {
    console.log("=== Floyd's Triangle Pattern ===");
    let result = "";
    let num = 1;
    
    for (let i = 1; i <= n; i++) {
        let row = "";
        for (let j = 1; j <= i; j++) {
            row += num + " ";
            num++;
        }
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= PATTERN 10: PASCAL'S TRIANGLE =============
// Time Complexity: O(n²) | Space Complexity: O(n)
// Pascal's triangle pattern
function pascalsTrianglePattern(n) {
    console.log("=== Pascal's Triangle Pattern ===");
    let result = "";
    
    for (let i = 0; i < n; i++) {
        let row = "";
        
        // Add spaces for centering
        for (let j = 0; j < n - i - 1; j++) {
            row += " ";
        }
        
        // Calculate and print Pascal's triangle values
        for (let j = 0; j <= i; j++) {
            row += binomialCoeff(i, j) + " ";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// Helper function for Pascal's triangle
function binomialCoeff(n, k) {
    let result = 1;
    
    if (k > n - k) {
        k = n - k;
    }
    
    for (let i = 0; i < k; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    
    return result;
}

// ============= PATTERN 11: BUTTERFLY PATTERN =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Butterfly pattern
function butterflyPattern(n) {
    console.log("=== Butterfly Pattern ===");
    let result = "";
    
    // Upper half
    for (let i = 1; i <= n; i++) {
        let row = "";
        
        // Left stars
        for (let j = 1; j <= i; j++) {
            row += "*";
        }
        
        // Middle spaces
        for (let j = 1; j <= 2 * (n - i); j++) {
            row += " ";
        }
        
        // Right stars
        for (let j = 1; j <= i; j++) {
            row += "*";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    // Lower half
    for (let i = n - 1; i >= 1; i--) {
        let row = "";
        
        // Left stars
        for (let j = 1; j <= i; j++) {
            row += "*";
        }
        
        // Middle spaces
        for (let j = 1; j <= 2 * (n - i); j++) {
            row += " ";
        }
        
        // Right stars
        for (let j = 1; j <= i; j++) {
            row += "*";
        }
        
        console.log(row);
        result += row + "\n";
    }
    
    return result;
}

// ============= OPTIMIZED PATTERN GENERATOR =============
// Generic pattern generator with customizable parameters
function generatePattern(type, size, symbol = "*") {
    const patterns = {
        'right-triangle': () => rightTrianglePattern(size),
        'inverted-triangle': () => invertedRightTrianglePattern(size),
        'pyramid': () => pyramidPattern(size),
        'inverted-pyramid': () => invertedPyramidPattern(size),
        'diamond': () => diamondPattern(size),
        'hollow-square': () => hollowSquarePattern(size),
        'hollow-pyramid': () => hollowPyramidPattern(size),
        'number-triangle': () => numberTrianglePattern(size),
        'floyds-triangle': () => floydsTrianglePattern(size),
        'pascals-triangle': () => pascalsTrianglePattern(size),
        'butterfly': () => butterflyPattern(size)
    };
    
    if (patterns[type]) {
        return patterns[type]();
    } else {
        console.log("Pattern type not found!");
        return "";
    }
}

// ============= TEST CASES =============
function testStarPatterns() {
    const size = 5;
    
    console.log("=== Star Pattern Tests ===");
    console.log(`Testing with size: ${size}\n`);
    
    // Test all patterns
    rightTrianglePattern(size);
    console.log();
    
    invertedRightTrianglePattern(size);
    console.log();
    
    pyramidPattern(size);
    console.log();
    
    invertedPyramidPattern(size);
    console.log();
    
    diamondPattern(size);
    console.log();
    
    hollowSquarePattern(size);
    console.log();
    
    hollowPyramidPattern(size);
    console.log();
    
    numberTrianglePattern(size);
    console.log();
    
    floydsTrianglePattern(size);
    console.log();
    
    pascalsTrianglePattern(size);
    console.log();
    
    butterflyPattern(size);
    console.log();
}

// Test different sizes
function testDifferentSizes() {
    console.log("=== Testing Different Sizes ===");
    
    const sizes = [3, 4, 6, 8];
    
    sizes.forEach(size => {
        console.log(`\n--- Size ${size} ---`);
        pyramidPattern(size);
    });
}

// Performance test
function performanceTest() {
    console.log("=== Performance Test ===");
    
    const largeSize = 50;
    
    console.time("Large Pyramid Pattern");
    pyramidPattern(largeSize);
    console.timeEnd("Large Pyramid Pattern");
    
    console.time("Large Diamond Pattern");
    diamondPattern(largeSize);
    console.timeEnd("Large Diamond Pattern");
}

// Interactive pattern selector
function patternSelector(patternName, size) {
    console.log(`\n=== ${patternName.toUpperCase()} PATTERN (Size: ${size}) ===`);
    return generatePattern(patternName, size);
}

// Run tests
testStarPatterns();
testDifferentSizes();

// Export functions for use in other files
module.exports = {
    rightTrianglePattern,
    invertedRightTrianglePattern,
    pyramidPattern,
    invertedPyramidPattern,
    diamondPattern,
    hollowSquarePattern,
    hollowPyramidPattern,
    numberTrianglePattern,
    floydsTrianglePattern,
    pascalsTrianglePattern,
    butterflyPattern,
    generatePattern,
    patternSelector,
    binomialCoeff
};
