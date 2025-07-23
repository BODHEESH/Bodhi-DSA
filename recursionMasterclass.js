/**
 * Recursion Masterclass
 * Bodhi-DSA Course
 * 
 * Advanced recursion patterns, techniques, and problem-solving strategies
 * This file covers complex recursion concepts and real-world applications
 */

// ============= ADVANCED RECURSION PATTERNS =============

// 1. MULTIPLE RECURSIVE CALLS (Tree Recursion)
// Fibonacci sequence - classic example of tree recursion
function fibonacciNaive(n) {
    // Base cases
    if (n <= 1) return n;
    
    // Two recursive calls create a binary tree of calls
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// Optimized with memoization
function fibonacciMemoized(n, memo = {}) {
    if (n <= 1) return n;
    
    if (memo[n] !== undefined) {
        return memo[n];
    }
    
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

// 2. INDIRECT RECURSION (Mutual Recursion)
// Functions that call each other
function isEven(n) {
    if (n === 0) return true;
    return isOdd(n - 1);
}

function isOdd(n) {
    if (n === 0) return false;
    return isEven(n - 1);
}

// 3. NESTED RECURSION
// Recursive calls with recursive parameters
function ackermann(m, n) {
    if (m === 0) return n + 1;
    if (n === 0) return ackermann(m - 1, 1);
    return ackermann(m - 1, ackermann(m, n - 1));
}

// 4. TAIL RECURSION OPTIMIZATION
// Last operation is the recursive call
function factorialTailRecursive(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return factorialTailRecursive(n - 1, n * accumulator);
}

// Convert non-tail recursive to tail recursive
function fibonacciTailRecursive(n, a = 0, b = 1) {
    if (n === 0) return a;
    if (n === 1) return b;
    return fibonacciTailRecursive(n - 1, b, a + b);
}

// ============= BACKTRACKING PROBLEMS =============

// 1. N-QUEENS PROBLEM
function solveNQueens(n) {
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isSafe(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right to bottom-left)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            // Found a solution
            solutions.push(board.map(row => row.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.'; // Backtrack
            }
        }
    }
    
    backtrack(0);
    return solutions;
}

// 2. SUDOKU SOLVER
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) return false;
            }
        }
        
        return true;
    }
    
    function solve(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let num = '1'; num <= '9'; num++) {
                        if (isValid(board, i, j, num)) {
                            board[i][j] = num;
                            
                            if (solve(board)) {
                                return true;
                            }
                            
                            board[i][j] = '.'; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    solve(board);
    return board;
}

// 3. GENERATE PARENTHESES
function generateParentheses(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

// ============= DIVIDE AND CONQUER =============

// 1. MERGE SORT
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// 2. QUICK SORT
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// 3. BINARY SEARCH
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
    return binarySearch(arr, target, mid + 1, right);
}

// ============= TREE RECURSION PROBLEMS =============

// 1. BINARY TREE TRAVERSALS
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function inorderTraversal(root, result = []) {
    if (root === null) return result;
    
    inorderTraversal(root.left, result);
    result.push(root.val);
    inorderTraversal(root.right, result);
    
    return result;
}

function preorderTraversal(root, result = []) {
    if (root === null) return result;
    
    result.push(root.val);
    preorderTraversal(root.left, result);
    preorderTraversal(root.right, result);
    
    return result;
}

function postorderTraversal(root, result = []) {
    if (root === null) return result;
    
    postorderTraversal(root.left, result);
    postorderTraversal(root.right, result);
    result.push(root.val);
    
    return result;
}

// 2. TREE PROBLEMS
function maxDepth(root) {
    if (root === null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function isValidBST(root, min = -Infinity, max = Infinity) {
    if (root === null) return true;
    
    if (root.val <= min || root.val >= max) return false;
    
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}

function lowestCommonAncestor(root, p, q) {
    if (root === null || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

// ============= DYNAMIC PROGRAMMING WITH RECURSION =============

// 1. LONGEST COMMON SUBSEQUENCE
function longestCommonSubsequence(text1, text2, i = 0, j = 0, memo = {}) {
    if (i === text1.length || j === text2.length) return 0;
    
    const key = `${i},${j}`;
    if (memo[key] !== undefined) return memo[key];
    
    if (text1[i] === text2[j]) {
        memo[key] = 1 + longestCommonSubsequence(text1, text2, i + 1, j + 1, memo);
    } else {
        memo[key] = Math.max(
            longestCommonSubsequence(text1, text2, i + 1, j, memo),
            longestCommonSubsequence(text1, text2, i, j + 1, memo)
        );
    }
    
    return memo[key];
}

// 2. COIN CHANGE
function coinChange(coins, amount, memo = {}) {
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    
    if (memo[amount] !== undefined) return memo[amount];
    
    let minCoins = Infinity;
    
    for (const coin of coins) {
        const result = coinChange(coins, amount - coin, memo);
        if (result !== -1) {
            minCoins = Math.min(minCoins, result + 1);
        }
    }
    
    memo[amount] = minCoins === Infinity ? -1 : minCoins;
    return memo[amount];
}

// ============= ADVANCED TECHNIQUES =============

// 1. RECURSION WITH MULTIPLE PARAMETERS
function editDistance(str1, str2, i = 0, j = 0, memo = {}) {
    if (i === str1.length) return str2.length - j;
    if (j === str2.length) return str1.length - i;
    
    const key = `${i},${j}`;
    if (memo[key] !== undefined) return memo[key];
    
    if (str1[i] === str2[j]) {
        memo[key] = editDistance(str1, str2, i + 1, j + 1, memo);
    } else {
        memo[key] = 1 + Math.min(
            editDistance(str1, str2, i + 1, j, memo),     // Delete
            editDistance(str1, str2, i, j + 1, memo),     // Insert
            editDistance(str1, str2, i + 1, j + 1, memo)  // Replace
        );
    }
    
    return memo[key];
}

// 2. RECURSION WITH STATE TRACKING
function wordBreak(s, wordDict, start = 0, memo = {}) {
    if (start === s.length) return true;
    
    if (memo[start] !== undefined) return memo[start];
    
    for (let end = start + 1; end <= s.length; end++) {
        const word = s.substring(start, end);
        if (wordDict.includes(word) && wordBreak(s, wordDict, end, memo)) {
            memo[start] = true;
            return true;
        }
    }
    
    memo[start] = false;
    return false;
}

// ============= HELPER FUNCTIONS =============

// Function to visualize recursion tree
function visualizeRecursionTree(func, args, maxDepth = 5) {
    const tree = [];
    
    function trace(func, args, depth = 0) {
        if (depth > maxDepth) return "...";
        
        const indent = "  ".repeat(depth);
        const call = `${func.name}(${args.join(', ')})`;
        
        console.log(`${indent}${call}`);
        tree.push({ depth, call });
        
        // This is a simplified visualization
        // In practice, you'd need to instrument the actual function
        return func(...args);
    }
    
    return trace(func, args);
}

// Function to measure recursion performance
function measureRecursionPerformance(func, args, iterations = 1) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        const result = func(...args);
        const end = performance.now();
        
        results.push({
            iteration: i + 1,
            result: result,
            time: end - start,
            memory: process.memoryUsage ? process.memoryUsage().heapUsed : 'N/A'
        });
    }
    
    return results;
}

// Function to convert recursion to iteration
function recursionToIteration(recursiveFunc) {
    // This is a conceptual example
    // Converting recursion to iteration using explicit stack
    return function iterativeVersion(...args) {
        const stack = [{ args, phase: 'call' }];
        const results = [];
        
        while (stack.length > 0) {
            const { args, phase } = stack.pop();
            
            if (phase === 'call') {
                // Push return phase
                stack.push({ args, phase: 'return' });
                
                // Check base case
                if (/* base case condition */ exampleBaseCaseCondition) {
                    results.push(/* base case result */);
                } else {
                    // Push recursive calls
                    // This depends on the specific recursive function
                }
            } else if (phase === 'return') {
                // Combine results from recursive calls
                // This depends on the specific recursive function
            }
        }
        
        return results[results.length - 1];
    };
}

// ============= RECURSION DEBUGGING TOOLS =============

// Function to trace recursion calls
function traceRecursion(func) {
    let callCount = 0;
    const callStack = [];
    
    return function traced(...args) {
        callCount++;
        const depth = callStack.length;
        const indent = "  ".repeat(depth);
        
        console.log(`${indent}→ Call ${callCount}: ${func.name}(${args.join(', ')})`);
        callStack.push({ func: func.name, args, callNumber: callCount });
        
        const result = func(...args);
        
        console.log(`${indent}← Return ${callCount}: ${result}`);
        callStack.pop();
        
        return result;
    };
}

// Function to detect infinite recursion
function detectInfiniteRecursion(func, maxCalls = 1000) {
    let callCount = 0;
    
    return function safeguarded(...args) {
        callCount++;
        
        if (callCount > maxCalls) {
            throw new Error(`Possible infinite recursion detected: ${callCount} calls exceeded`);
        }
        
        const result = func(...args);
        callCount--;
        
        return result;
    };
}

// ============= TEST CASES =============
function testAdvancedRecursion() {
    console.log("=== Advanced Recursion Tests ===");
    
    // Test tree recursion
    console.log("\n1. Fibonacci (Tree Recursion):");
    console.log(`Naive fib(10): ${fibonacciNaive(10)}`);
    console.log(`Memoized fib(10): ${fibonacciMemoized(10)}`);
    console.log(`Tail recursive fib(10): ${fibonacciTailRecursive(10)}`);
    
    // Test mutual recursion
    console.log("\n2. Mutual Recursion:");
    console.log(`isEven(4): ${isEven(4)}`);
    console.log(`isOdd(4): ${isOdd(4)}`);
    console.log(`isEven(7): ${isEven(7)}`);
    console.log(`isOdd(7): ${isOdd(7)}`);
    
    // Test nested recursion
    console.log("\n3. Nested Recursion (Ackermann):");
    console.log(`ackermann(2, 3): ${ackermann(2, 3)}`);
    console.log(`ackermann(3, 2): ${ackermann(3, 2)}`);
    
    // Test backtracking
    console.log("\n4. Backtracking (N-Queens):");
    const queens4 = solveNQueens(4);
    console.log(`4-Queens solutions: ${queens4.length}`);
    console.log("First solution:");
    queens4[0].forEach(row => console.log(row));
    
    // Test divide and conquer
    console.log("\n5. Divide and Conquer:");
    const arr = [64, 34, 25, 12, 22, 11, 90];
    console.log(`Original: [${arr}]`);
    console.log(`Merge Sort: [${mergeSort([...arr])}]`);
    console.log(`Quick Sort: [${quickSort([...arr])}]`);
    console.log(`Binary Search for 25: ${binarySearch([11, 12, 22, 25, 34, 64, 90], 25)}`);
}

// Test dynamic programming
function testDynamicProgramming() {
    console.log("\n=== Dynamic Programming with Recursion ===");
    
    console.log("\n1. Longest Common Subsequence:");
    console.log(`LCS("abcde", "ace"): ${longestCommonSubsequence("abcde", "ace")}`);
    
    console.log("\n2. Coin Change:");
    console.log(`Coin change for 11 with [1,2,5]: ${coinChange([1, 2, 5], 11)}`);
    
    console.log("\n3. Edit Distance:");
    console.log(`Edit distance("kitten", "sitting"): ${editDistance("kitten", "sitting")}`);
    
    console.log("\n4. Word Break:");
    console.log(`Word break "leetcode" with ["leet","code"]: ${wordBreak("leetcode", ["leet", "code"])}`);
}

// Test tree operations
function testTreeOperations() {
    console.log("\n=== Tree Operations ===");
    
    // Create a sample tree
    const root = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, null, new TreeNode(6))
    );
    
    console.log(`Inorder: [${inorderTraversal(root)}]`);
    console.log(`Preorder: [${preorderTraversal(root)}]`);
    console.log(`Postorder: [${postorderTraversal(root)}]`);
    console.log(`Max Depth: ${maxDepth(root)}`);
}

// Performance comparison
function performanceComparison() {
    console.log("\n=== Performance Comparison ===");
    
    console.log("\nFibonacci Performance (n=30):");
    
    console.time("Naive Fibonacci");
    fibonacciNaive(30);
    console.timeEnd("Naive Fibonacci");
    
    console.time("Memoized Fibonacci");
    fibonacciMemoized(30);
    console.timeEnd("Memoized Fibonacci");
    
    console.time("Tail Recursive Fibonacci");
    fibonacciTailRecursive(30);
    console.timeEnd("Tail Recursive Fibonacci");
}

// Educational demonstration
function educationalDemo() {
    console.log("\n=== Recursion Masterclass Demo ===");
    
    console.log("\n1. Recursion Patterns:");
    console.log("- Linear Recursion: factorial, sum");
    console.log("- Tree Recursion: fibonacci, binary tree");
    console.log("- Tail Recursion: optimized factorial");
    console.log("- Mutual Recursion: even/odd check");
    console.log("- Nested Recursion: Ackermann function");
    
    console.log("\n2. Problem-Solving Strategies:");
    console.log("- Backtracking: N-Queens, Sudoku");
    console.log("- Divide & Conquer: Merge Sort, Quick Sort");
    console.log("- Dynamic Programming: LCS, Coin Change");
    console.log("- Tree Traversal: DFS, BFS variations");
    
    console.log("\n3. Optimization Techniques:");
    console.log("- Memoization: Cache results");
    console.log("- Tail Recursion: Reduce stack usage");
    console.log("- Iterative Conversion: Use explicit stack");
    console.log("- Base Case Optimization: Handle edge cases");
    
    console.log("\n4. Common Pitfalls:");
    console.log("- Missing base cases → Infinite recursion");
    console.log("- Stack overflow → Use iteration or tail recursion");
    console.log("- Exponential time complexity → Use memoization");
    console.log("- Incorrect state management → Debug carefully");
}

// Interactive learning function
function interactiveMasterclass(topic) {
    console.log(`\n=== Recursion Masterclass: ${topic} ===`);
    
    switch (topic.toLowerCase()) {
        case 'fibonacci':
            console.log("Fibonacci demonstrates tree recursion:");
            console.log("fib(n) = fib(n-1) + fib(n-2)");
            console.log("Without memoization: O(2^n) time");
            console.log("With memoization: O(n) time");
            
            const tracedFib = traceRecursion(fibonacciNaive);
            console.log("\nTracing fib(5):");
            tracedFib(5);
            break;
            
        case 'backtracking':
            console.log("Backtracking pattern:");
            console.log("1. Choose: Make a choice");
            console.log("2. Explore: Recursively explore");
            console.log("3. Unchoose: Backtrack if needed");
            
            console.log("\nGenerating parentheses for n=2:");
            console.log(generateParentheses(2));
            break;
            
        case 'tree':
            console.log("Tree recursion patterns:");
            console.log("- Process current node");
            console.log("- Recurse on children");
            console.log("- Combine results");
            
            testTreeOperations();
            break;
            
        default:
            console.log("Available topics: fibonacci, backtracking, tree");
    }
}

// Run comprehensive tests
testAdvancedRecursion();
testDynamicProgramming();
testTreeOperations();
performanceComparison();
educationalDemo();

// Interactive examples
interactiveMasterclass('fibonacci');
interactiveMasterclass('backtracking');

// Export functions for use in other files
module.exports = {
    // Tree recursion
    fibonacciNaive,
    fibonacciMemoized,
    fibonacciTailRecursive,
    
    // Mutual recursion
    isEven,
    isOdd,
    
    // Nested recursion
    ackermann,
    
    // Backtracking
    solveNQueens,
    solveSudoku,
    generateParentheses,
    
    // Divide and conquer
    mergeSort,
    quickSort,
    binarySearch,
    
    // Tree operations
    TreeNode,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    maxDepth,
    isValidBST,
    lowestCommonAncestor,
    
    // Dynamic programming
    longestCommonSubsequence,
    coinChange,
    editDistance,
    wordBreak,
    
    // Utilities
    traceRecursion,
    detectInfiniteRecursion,
    measureRecursionPerformance,
    interactiveMasterclass
};
