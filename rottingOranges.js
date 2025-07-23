/**
 * Rotting Oranges (BFS Simulation)
 * Bodhi-DSA Course
 * 
 * Problem: You are given an m x n grid where each cell can have one of three values:
 * - 0 representing an empty cell
 * - 1 representing a fresh orange
 * - 2 representing a rotten orange
 * 
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
 * Return the minimum number of minutes that must elapse until no cell has a fresh orange.
 * If this is impossible, return -1.
 * 
 * Example:
 * Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 */

// ============= APPROACH 1: BFS WITH QUEUE =============
// Time Complexity: O(m*n) | Space Complexity: O(m*n)
// Algorithm: Use BFS to simulate rotting process level by level

function orangesRottingBFS(grid) {
    if (!Array.isArray(grid) || grid.length === 0 || !Array.isArray(grid[0])) {
        return -1;
    }
    
    console.log(`\n📚 BFS Approach:`);
    printGrid(grid, "Initial Grid");
    
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;
    
    // Find all rotten oranges and count fresh ones
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]); // [row, col, time]
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }
    
    console.log(`Initial: ${queue.length} rotten, ${freshCount} fresh oranges`);
    
    if (freshCount === 0) {
        console.log(`No fresh oranges to rot!`);
        return 0;
    }
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
    let minutes = 0;
    
    // BFS simulation
    while (queue.length > 0) {
        const [row, col, time] = queue.shift();
        minutes = Math.max(minutes, time);
        
        // Check all 4 directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            // Check bounds and if it's a fresh orange
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                grid[newRow][newCol] === 1) {
                
                grid[newRow][newCol] = 2; // Make it rotten
                freshCount--;
                queue.push([newRow, newCol, time + 1]);
                
                console.log(`Minute ${time + 1}: Orange at (${newRow}, ${newCol}) becomes rotten`);
            }
        }
    }
    
    printGrid(grid, "Final Grid");
    
    const result = freshCount === 0 ? minutes : -1;
    console.log(`Result: ${result} minutes, Remaining fresh: ${freshCount}`);
    
    return result;
}

// ============= APPROACH 2: BFS WITH LEVEL TRACKING =============
// Time Complexity: O(m*n) | Space Complexity: O(m*n)
// Algorithm: Process entire levels at once for clearer time tracking

function orangesRottingLevels(grid) {
    if (!Array.isArray(grid) || grid.length === 0) {
        return -1;
    }
    
    console.log(`\n⚡ Level-based BFS:`);
    printGrid(grid, "Initial Grid");
    
    const rows = grid.length;
    const cols = grid[0].length;
    let queue = [];
    let freshCount = 0;
    
    // Initialize queue with all rotten oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }
    
    console.log(`Starting: ${queue.length} rotten, ${freshCount} fresh oranges`);
    
    if (freshCount === 0) return 0;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let minutes = 0;
    
    // Process level by level
    while (queue.length > 0 && freshCount > 0) {
        const currentLevelSize = queue.length;
        const nextQueue = [];
        
        console.log(`\nMinute ${minutes + 1}: Processing ${currentLevelSize} rotten oranges`);
        
        for (let i = 0; i < currentLevelSize; i++) {
            const [row, col] = queue[i];
            
            // Check all 4 directions
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < rows && 
                    newCol >= 0 && newCol < cols && 
                    grid[newRow][newCol] === 1) {
                    
                    grid[newRow][newCol] = 2;
                    freshCount--;
                    nextQueue.push([newRow, newCol]);
                    
                    console.log(`  Orange at (${newRow}, ${newCol}) becomes rotten`);
                }
            }
        }
        
        queue = nextQueue;
        if (nextQueue.length > 0) {
            minutes++;
            printGrid(grid, `After Minute ${minutes}`);
        }
    }
    
    const result = freshCount === 0 ? minutes : -1;
    console.log(`\nResult: ${result} minutes, Remaining fresh: ${freshCount}`);
    
    return result;
}

// ============= APPROACH 3: MULTI-SOURCE BFS =============
// Time Complexity: O(m*n) | Space Complexity: O(m*n)
// Algorithm: Treat all rotten oranges as sources for BFS

function orangesRottingMultiSource(grid) {
    if (!Array.isArray(grid) || grid.length === 0) {
        return -1;
    }
    
    console.log(`\n🎯 Multi-source BFS:`);
    printGrid(grid, "Initial Grid");
    
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;
    
    // Add all rotten oranges as starting points
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push({ row: r, col: c, time: 0 });
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }
    
    console.log(`Multi-source BFS: ${queue.length} sources, ${freshCount} fresh`);
    
    if (freshCount === 0) return 0;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let maxTime = 0;
    
    while (queue.length > 0) {
        const current = queue.shift();
        const { row, col, time } = current;
        
        maxTime = Math.max(maxTime, time);
        
        // Spread to adjacent cells
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                grid[newRow][newCol] === 1) {
                
                grid[newRow][newCol] = 2;
                freshCount--;
                queue.push({ row: newRow, col: newCol, time: time + 1 });
                
                console.log(`Time ${time + 1}: (${newRow}, ${newCol}) rots from (${row}, ${col})`);
            }
        }
    }
    
    const result = freshCount === 0 ? maxTime : -1;
    console.log(`Multi-source result: ${result} minutes`);
    
    return result;
}

// ============= HELPER FUNCTIONS =============

function printGrid(grid, title = "Grid") {
    console.log(`\n${title}:`);
    
    const symbols = { 0: '⬜', 1: '🟠', 2: '🟤' };
    
    grid.forEach((row, r) => {
        const visualRow = row.map(cell => symbols[cell] || cell).join(' ');
        const numberRow = row.map(cell => cell.toString().padStart(2)).join(' ');
        console.log(`Row ${r}: ${visualRow} | ${numberRow}`);
    });
}

function validateGrid(grid) {
    if (!Array.isArray(grid) || grid.length === 0) {
        return { valid: false, error: 'Grid must be a non-empty array' };
    }
    
    const cols = grid[0].length;
    if (cols === 0) {
        return { valid: false, error: 'Grid rows cannot be empty' };
    }
    
    for (let r = 0; r < grid.length; r++) {
        if (!Array.isArray(grid[r]) || grid[r].length !== cols) {
            return { valid: false, error: `Row ${r} has invalid length` };
        }
        
        for (let c = 0; c < grid[r].length; c++) {
            const cell = grid[r][c];
            if (![0, 1, 2].includes(cell)) {
                return { valid: false, error: `Invalid cell value at (${r}, ${c}): ${cell}` };
            }
        }
    }
    
    return { valid: true, error: null };
}

function getGridStatistics(grid) {
    let empty = 0, fresh = 0, rotten = 0;
    
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            switch (grid[r][c]) {
                case 0: empty++; break;
                case 1: fresh++; break;
                case 2: rotten++; break;
            }
        }
    }
    
    const total = grid.length * grid[0].length;
    
    console.log(`\n📊 Grid Statistics:`);
    console.log(`Dimensions: ${grid.length} × ${grid[0].length} = ${total} cells`);
    console.log(`Empty: ${empty} (${(empty/total*100).toFixed(1)}%)`);
    console.log(`Fresh: ${fresh} (${(fresh/total*100).toFixed(1)}%)`);
    console.log(`Rotten: ${rotten} (${(rotten/total*100).toFixed(1)}%)`);
    
    return { total, empty, fresh, rotten };
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeRottingProcess(grid) {
    console.log(`\n🎬 Visualizing Rotting Process`);
    
    const validation = validateGrid(grid);
    if (!validation.valid) {
        console.log(`❌ Invalid grid: ${validation.error}`);
        return;
    }
    
    console.log(`✅ Valid grid`);
    getGridStatistics(grid);
    
    const result = orangesRottingLevels(grid.map(row => [...row]));
    
    console.log(`\n🎯 Process completed in ${result} minutes`);
    
    return result;
}

function demonstrateAllApproaches() {
    console.log(`\n🎯 Demonstrating All Approaches`);
    
    const testGrid = [
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1]
    ];
    
    console.log(`Test grid:`);
    printGrid(testGrid, "Original Grid");
    
    const approaches = [
        { name: "BFS with Queue", func: orangesRottingBFS },
        { name: "Level-based BFS", func: orangesRottingLevels },
        { name: "Multi-source BFS", func: orangesRottingMultiSource }
    ];
    
    approaches.forEach(approach => {
        console.log(`\n--- ${approach.name} ---`);
        console.time(approach.name);
        const result = approach.func(testGrid.map(row => [...row]));
        console.timeEnd(approach.name);
        console.log(`Result: ${result} minutes`);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log(`\n📊 Performance Analysis`);
    
    const approaches = [
        { name: "BFS Queue", time: "O(m*n)", space: "O(m*n)", notes: "Standard BFS with queue" },
        { name: "Level BFS", time: "O(m*n)", space: "O(m*n)", notes: "Process levels separately" },
        { name: "Multi-source", time: "O(m*n)", space: "O(m*n)", notes: "All sources simultaneously" }
    ];
    
    console.log(`\n📈 Complexity Comparison:`);
    console.log("=".repeat(75));
    console.log("| Approach     | Time     | Space    | Notes              |");
    console.log("=".repeat(75));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(12);
        const time = approach.time.padEnd(8);
        const space = approach.space.padEnd(8);
        const notes = approach.notes.padEnd(18);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(75));
    
    console.log(`\n🏆 Winner: BFS with Queue (Standard)`);
    console.log(`• O(m*n) time - each cell visited once`);
    console.log(`• O(m*n) space - queue for BFS`);
    console.log(`• Most intuitive and widely used`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Disease Spread Modeling:**`);
    console.log(`   - Epidemic simulation`);
    console.log(`   - Infection rate analysis`);
    
    console.log(`\n2. **Forest Fire Simulation:**`);
    console.log(`   - Fire spread prediction`);
    console.log(`   - Evacuation planning`);
    
    console.log(`\n3. **Network Propagation:**`);
    console.log(`   - Information spread`);
    console.log(`   - Virus propagation`);
    
    // Example: Disease spread simulator
    console.log(`\n🦠 Example: Disease Spread Simulator`);
    
    class DiseaseSpreadSimulator {
        constructor(population) {
            this.grid = population; // 0: empty, 1: healthy, 2: infected
        }
        
        simulate() {
            console.log(`\n🦠 Simulating disease spread:`);
            printGrid(this.grid, "Initial Population");
            
            const result = orangesRottingLevels(this.grid.map(row => [...row]));
            
            console.log(`\n📊 Disease spread completed in ${result} time units`);
            
            return result;
        }
    }
    
    const population = [
        [2, 1, 1, 0],
        [1, 1, 1, 1],
        [0, 1, 1, 1],
        [1, 1, 0, 1]
    ];
    
    const simulator = new DiseaseSpreadSimulator(population);
    simulator.simulate();
}

// ============= TEST CASES =============

function testRottingOranges() {
    console.log(`\n🧪 Testing Rotting Oranges`);
    
    const testCases = [
        {
            grid: [[2,1,1],[1,1,0],[0,1,1]],
            expected: 4,
            description: "Standard case"
        },
        {
            grid: [[2,1,1],[0,1,1],[1,0,1]],
            expected: -1,
            description: "Impossible case"
        },
        {
            grid: [[0,2]],
            expected: 0,
            description: "No fresh oranges"
        },
        {
            grid: [[1]],
            expected: -1,
            description: "Only fresh, no rotten"
        },
        {
            grid: [[2,2],[1,1],[0,0]],
            expected: 1,
            description: "Multiple sources"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test ${index + 1}: ${testCase.description} ---`);
        printGrid(testCase.grid, "Input Grid");
        console.log(`Expected: ${testCase.expected}`);
        
        const result = orangesRottingBFS(testCase.grid.map(row => [...row]));
        const passed = result === testCase.expected;
        console.log(`Actual: ${result} ${passed ? '✅' : '❌'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 ROTTING ORANGES - BODHI DSA COURSE");
console.log("=" .repeat(40));

analyzePerformance();
demonstrateAllApproaches();
visualizeRottingProcess([[2,1,1],[1,1,0],[0,1,1]]);
practicalApplications();
testRottingOranges();

// Export functions
module.exports = {
    orangesRottingBFS,
    orangesRottingLevels,
    orangesRottingMultiSource,
    printGrid,
    validateGrid,
    getGridStatistics,
    visualizeRottingProcess,
    demonstrateAllApproaches,
    analyzePerformance,
    practicalApplications,
    testRottingOranges
};
