/**
 * Best Time to Buy and Sell Stock
 * Bodhi-DSA Course
 * 
 * Problem: Find the maximum profit from buying and selling stock once
 * You can only buy once and sell once, and you must buy before you sell
 */

// ============= BRUTE FORCE APPROACH =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Check all possible buy-sell combinations
function maxProfitBruteForce(prices) {
    if (prices.length < 2) return 0;
    
    let maxProfit = 0;
    
    // Try every possible buy day
    for (let buyDay = 0; buyDay < prices.length - 1; buyDay++) {
        // Try every possible sell day after buy day
        for (let sellDay = buyDay + 1; sellDay < prices.length; sellDay++) {
            const profit = prices[sellDay] - prices[buyDay];
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    
    return maxProfit;
}

// ============= BETTER APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Track maximum price seen so far from right
function maxProfitBetter(prices) {
    if (prices.length < 2) return 0;
    
    const n = prices.length;
    const maxPriceFromRight = new Array(n);
    
    // Fill array with maximum price from right
    maxPriceFromRight[n - 1] = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxPriceFromRight[i] = Math.max(prices[i], maxPriceFromRight[i + 1]);
    }
    
    let maxProfit = 0;
    
    // For each day, calculate profit if we buy on that day
    for (let i = 0; i < n - 1; i++) {
        const profit = maxPriceFromRight[i + 1] - prices[i];
        maxProfit = Math.max(maxProfit, profit);
    }
    
    return maxProfit;
}

// ============= OPTIMIZED APPROACH (Kadane's Algorithm Variant) =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Track minimum price seen so far and maximum profit
function maxProfitOptimized(prices) {
    if (prices.length < 2) return 0;
    
    let minPrice = prices[0];    // Minimum price seen so far
    let maxProfit = 0;           // Maximum profit possible
    
    // Iterate through prices starting from day 1
    for (let i = 1; i < prices.length; i++) {
        // If current price is lower than minimum, update minimum
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            // Calculate profit if we sell today
            const currentProfit = prices[i] - minPrice;
            maxProfit = Math.max(maxProfit, currentProfit);
        }
    }
    
    return maxProfit;
}

// ============= ALTERNATIVE: TRACK BUY AND SELL DAYS =============
// Time Complexity: O(n) | Space Complexity: O(1)
// Also return the optimal buy and sell days
function maxProfitWithDays(prices) {
    if (prices.length < 2) {
        return { maxProfit: 0, buyDay: -1, sellDay: -1 };
    }
    
    let minPrice = prices[0];
    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;
    let tempBuyDay = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
            tempBuyDay = i;
        } else {
            const currentProfit = prices[i] - minPrice;
            if (currentProfit > maxProfit) {
                maxProfit = currentProfit;
                buyDay = tempBuyDay;
                sellDay = i;
            }
        }
    }
    
    return {
        maxProfit,
        buyDay,
        sellDay,
        buyPrice: prices[buyDay],
        sellPrice: prices[sellDay]
    };
}

// ============= RECURSIVE APPROACH =============
// Time Complexity: O(2^n) | Space Complexity: O(n) - due to recursion stack
// Recursive solution (inefficient but educational)
function maxProfitRecursive(prices, day = 0, holding = false, buyPrice = 0) {
    // Base case: no more days
    if (day >= prices.length) {
        return 0;
    }
    
    let maxProfit = 0;
    
    if (holding) {
        // We're holding stock, can either sell or hold
        // Option 1: Sell today
        const sellProfit = prices[day] - buyPrice;
        maxProfit = Math.max(maxProfit, sellProfit);
        
        // Option 2: Hold and continue
        maxProfit = Math.max(maxProfit, maxProfitRecursive(prices, day + 1, true, buyPrice));
    } else {
        // We're not holding stock, can either buy or skip
        // Option 1: Buy today
        maxProfit = Math.max(maxProfit, maxProfitRecursive(prices, day + 1, true, prices[day]));
        
        // Option 2: Skip today
        maxProfit = Math.max(maxProfit, maxProfitRecursive(prices, day + 1, false, 0));
    }
    
    return maxProfit;
}

// ============= DYNAMIC PROGRAMMING APPROACH =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Use DP to store maximum profit at each day
function maxProfitDP(prices) {
    if (prices.length < 2) return 0;
    
    const n = prices.length;
    const dp = new Array(n).fill(0);
    let minPrice = prices[0];
    
    for (let i = 1; i < n; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        dp[i] = Math.max(dp[i - 1], prices[i] - minPrice);
    }
    
    return dp[n - 1];
}

// ============= HELPER FUNCTIONS =============

// Function to validate if profit calculation is correct
function validateProfit(prices, buyDay, sellDay, expectedProfit) {
    if (buyDay >= sellDay || buyDay < 0 || sellDay >= prices.length) {
        return false;
    }
    
    const actualProfit = prices[sellDay] - prices[buyDay];
    return actualProfit === expectedProfit;
}

// Function to find all profitable transactions
function findAllProfitableTransactions(prices) {
    const transactions = [];
    
    for (let i = 0; i < prices.length - 1; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            const profit = prices[j] - prices[i];
            if (profit > 0) {
                transactions.push({
                    buyDay: i,
                    sellDay: j,
                    buyPrice: prices[i],
                    sellPrice: prices[j],
                    profit: profit
                });
            }
        }
    }
    
    // Sort by profit in descending order
    return transactions.sort((a, b) => b.profit - a.profit);
}

// Function to simulate trading strategy
function simulateTrading(prices, strategy = 'optimal') {
    const result = maxProfitWithDays(prices);
    
    return {
        strategy: strategy,
        initialCapital: 1000, // Assume $1000 initial capital
        sharesBought: result.buyDay !== -1 ? Math.floor(1000 / result.buyPrice) : 0,
        finalValue: result.buyDay !== -1 ? Math.floor(1000 / result.buyPrice) * result.sellPrice : 1000,
        profit: result.maxProfit > 0 ? Math.floor(1000 / result.buyPrice) * result.maxProfit : 0,
        profitPercentage: result.maxProfit > 0 ? (result.maxProfit / result.buyPrice) * 100 : 0,
        transaction: result
    };
}

// ============= TEST CASES =============
function testMaxProfit() {
    const testCases = [
        [7, 1, 5, 3, 6, 4],     // Expected: 5 (buy at 1, sell at 6)
        [7, 6, 4, 3, 1],        // Expected: 0 (prices only decrease)
        [1, 2, 3, 4, 5],        // Expected: 4 (buy at 1, sell at 5)
        [2, 4, 1],              // Expected: 2 (buy at 2, sell at 4)
        [3, 2, 6, 5, 0, 3],     // Expected: 4 (buy at 2, sell at 6)
        [1, 2],                 // Expected: 1 (buy at 1, sell at 2)
        [2, 1],                 // Expected: 0 (can't make profit)
        [1],                    // Expected: 0 (need at least 2 days)
        [],                     // Expected: 0 (empty array)
        [5, 5, 5, 5]           // Expected: 0 (all prices same)
    ];
    
    console.log("=== Best Time to Buy and Sell Stock Tests ===");
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest Case ${index + 1}: [${testCase}]`);
        
        console.log(`Brute Force: ${maxProfitBruteForce(testCase)}`);
        console.log(`Better: ${maxProfitBetter(testCase)}`);
        console.log(`Optimized: ${maxProfitOptimized(testCase)}`);
        console.log(`DP: ${maxProfitDP(testCase)}`);
        
        const detailedResult = maxProfitWithDays(testCase);
        console.log(`Detailed Result:`, detailedResult);
        
        if (detailedResult.maxProfit > 0) {
            const isValid = validateProfit(testCase, detailedResult.buyDay, detailedResult.sellDay, detailedResult.maxProfit);
            console.log(`Validation: ${isValid}`);
        }
        
        const simulation = simulateTrading(testCase);
        console.log(`Trading Simulation:`, simulation);
    });
}

// Edge cases test
function testEdgeCases() {
    console.log("\n=== Edge Cases Tests ===");
    
    const edgeCases = [
        { prices: [], desc: "Empty array" },
        { prices: [5], desc: "Single price" },
        { prices: [1, 2], desc: "Two prices - profit possible" },
        { prices: [2, 1], desc: "Two prices - no profit" },
        { prices: [1, 1, 1, 1], desc: "All prices same" },
        { prices: [10, 9, 8, 7, 6], desc: "Strictly decreasing" },
        { prices: [1, 2, 3, 4, 5], desc: "Strictly increasing" },
        { prices: [1, 100, 1, 100], desc: "Multiple peaks and valleys" }
    ];
    
    edgeCases.forEach((testCase, index) => {
        console.log(`\nEdge Case ${index + 1}: [${testCase.prices}] (${testCase.desc})`);
        
        const result = maxProfitOptimized(testCase.prices);
        const detailed = maxProfitWithDays(testCase.prices);
        
        console.log(`Max Profit: ${result}`);
        console.log(`Details:`, detailed);
    });
}

// Performance comparison
function performanceTest() {
    // Create large array with random prices
    const largePrices = [];
    for (let i = 0; i < 100000; i++) {
        largePrices.push(Math.floor(Math.random() * 1000) + 1);
    }
    
    const iterations = 100;
    
    console.log("\n=== Performance Comparison ===");
    console.log(`Testing with array of length: ${largePrices.length}`);
    
    console.time("Better Approach");
    for (let i = 0; i < iterations; i++) {
        maxProfitBetter([...largePrices]);
    }
    console.timeEnd("Better Approach");
    
    console.time("Optimized Approach");
    for (let i = 0; i < iterations; i++) {
        maxProfitOptimized([...largePrices]);
    }
    console.timeEnd("Optimized Approach");
    
    console.time("DP Approach");
    for (let i = 0; i < iterations; i++) {
        maxProfitDP([...largePrices]);
    }
    console.timeEnd("DP Approach");
}

// Analysis function
function analyzeStockData(prices) {
    console.log("\n=== Stock Data Analysis ===");
    console.log(`Prices: [${prices}]`);
    
    const result = maxProfitWithDays(prices);
    const allTransactions = findAllProfitableTransactions(prices);
    
    console.log(`\nOptimal Strategy:`);
    console.log(`- Buy on day ${result.buyDay} at price ${result.buyPrice}`);
    console.log(`- Sell on day ${result.sellDay} at price ${result.sellPrice}`);
    console.log(`- Maximum profit: ${result.maxProfit}`);
    
    console.log(`\nTop 5 Profitable Transactions:`);
    allTransactions.slice(0, 5).forEach((transaction, index) => {
        console.log(`${index + 1}. Buy day ${transaction.buyDay} (${transaction.buyPrice}) → Sell day ${transaction.sellDay} (${transaction.sellPrice}) = Profit ${transaction.profit}`);
    });
    
    console.log(`\nStatistics:`);
    console.log(`- Total profitable transactions: ${allTransactions.length}`);
    console.log(`- Average profit per transaction: ${allTransactions.length > 0 ? (allTransactions.reduce((sum, t) => sum + t.profit, 0) / allTransactions.length).toFixed(2) : 0}`);
    console.log(`- Price volatility: ${Math.max(...prices) - Math.min(...prices)}`);
}

// Run tests
testMaxProfit();
testEdgeCases();
performanceTest();

// Example analysis
analyzeStockData([7, 1, 5, 3, 6, 4]);

// Export functions for use in other files
module.exports = {
    maxProfitBruteForce,
    maxProfitBetter,
    maxProfitOptimized,
    maxProfitWithDays,
    maxProfitRecursive,
    maxProfitDP,
    validateProfit,
    findAllProfitableTransactions,
    simulateTrading,
    analyzeStockData
};
