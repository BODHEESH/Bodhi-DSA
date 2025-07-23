/**
 * Daily Temperatures
 * Bodhi-DSA Course
 * 
 * Problem: Given an array of integers temperatures represents the daily temperatures,
 * return an array answer such that answer[i] is the number of days you have to wait
 * after the ith day to get a warmer temperature. If there is no future day for which
 * this is possible, keep answer[i] == 0.
 * 
 * Example:
 * Input: temperatures = [73,74,75,71,69,72,76,73]
 * Output: [1,1,4,2,1,1,0,0]
 */

// ============= APPROACH 1: BRUTE FORCE =============
// Time Complexity: O(n²) | Space Complexity: O(1)
// Algorithm: For each day, scan forward to find next warmer day

function dailyTemperaturesBruteForce(temperatures) {
    if (!Array.isArray(temperatures) || temperatures.length === 0) {
        return [];
    }
    
    console.log(`\n🔄 Brute Force: [${temperatures.join('°, ')}°]`);
    
    const result = [];
    
    for (let i = 0; i < temperatures.length; i++) {
        const currentTemp = temperatures[i];
        let daysToWait = 0;
        
        for (let j = i + 1; j < temperatures.length; j++) {
            if (temperatures[j] > currentTemp) {
                daysToWait = j - i;
                break;
            }
        }
        
        result.push(daysToWait);
        console.log(`Day ${i} (${currentTemp}°): ${daysToWait} days to wait`);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= APPROACH 2: STACK-BASED SOLUTION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Use stack to track days waiting for warmer temperature

function dailyTemperaturesStack(temperatures) {
    if (!Array.isArray(temperatures) || temperatures.length === 0) {
        return [];
    }
    
    console.log(`\n📚 Stack Approach: [${temperatures.join('°, ')}°]`);
    
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // Stack to store day indices
    
    console.log(`\nProcessing each day:`);
    
    for (let day = 0; day < temperatures.length; day++) {
        const currentTemp = temperatures[day];
        
        // Pop days from stack while current temperature is warmer
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < currentTemp) {
            const prevDay = stack.pop();
            const waitDays = day - prevDay;
            result[prevDay] = waitDays;
            console.log(`Day ${prevDay} (${temperatures[prevDay]}°) → Day ${day} (${currentTemp}°): ${waitDays} days`);
        }
        
        stack.push(day);
    }
    
    console.log(`Final result: [${result.join(', ')}]`);
    return result;
}

// ============= APPROACH 3: OPTIMIZED STACK =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Cleaner stack implementation

function dailyTemperaturesOptimized(temperatures) {
    if (!Array.isArray(temperatures) || temperatures.length === 0) {
        return [];
    }
    
    console.log(`\n⚡ Optimized: [${temperatures.join('°, ')}°]`);
    
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let day = 0; day < temperatures.length; day++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[day]) {
            const prevDay = stack.pop();
            result[prevDay] = day - prevDay;
        }
        stack.push(day);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= APPROACH 4: REVERSE ITERATION =============
// Time Complexity: O(n) | Space Complexity: O(n)
// Algorithm: Process from right to left with stack

function dailyTemperaturesReverse(temperatures) {
    if (!Array.isArray(temperatures) || temperatures.length === 0) {
        return [];
    }
    
    console.log(`\n🔄 Reverse: [${temperatures.join('°, ')}°]`);
    
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let day = temperatures.length - 1; day >= 0; day--) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[day]) {
            stack.pop();
        }
        
        if (stack.length > 0) {
            result[day] = stack[stack.length - 1] - day;
        }
        
        stack.push(day);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// ============= ADVANCED VARIATIONS =============

// Find days to wait for cooler temperature
function dailyTemperaturesCooler(temperatures) {
    console.log(`\n❄️ Days for cooler weather: [${temperatures.join('°, ')}°]`);
    
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let day = 0; day < temperatures.length; day++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] > temperatures[day]) {
            const prevDay = stack.pop();
            result[prevDay] = day - prevDay;
        }
        stack.push(day);
    }
    
    console.log(`Result: [${result.join(', ')}]`);
    return result;
}

// Temperature statistics
function temperatureStatistics(temperatures) {
    console.log(`\n📈 Temperature Statistics: [${temperatures.join('°, ')}°]`);
    
    const waitDays = dailyTemperaturesOptimized([...temperatures]);
    
    const stats = {
        totalDays: temperatures.length,
        minTemp: Math.min(...temperatures),
        maxTemp: Math.max(...temperatures),
        avgTemp: (temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length).toFixed(1),
        daysWithWarmerFuture: waitDays.filter(days => days > 0).length,
        avgWaitDays: (waitDays.reduce((sum, days) => sum + days, 0) / temperatures.length).toFixed(1),
        maxWaitDays: Math.max(...waitDays)
    };
    
    console.log(`📊 Statistics:`);
    console.log(`Total days: ${stats.totalDays}`);
    console.log(`Temperature range: ${stats.minTemp}° to ${stats.maxTemp}°`);
    console.log(`Average temperature: ${stats.avgTemp}°`);
    console.log(`Days with warmer future: ${stats.daysWithWarmerFuture}`);
    console.log(`Average wait days: ${stats.avgWaitDays}`);
    console.log(`Maximum wait days: ${stats.maxWaitDays}`);
    
    return stats;
}

// ============= HELPER FUNCTIONS =============

function validateTemperatures(temperatures) {
    if (!Array.isArray(temperatures)) {
        return { valid: false, error: 'Input must be an array' };
    }
    
    if (temperatures.length === 0) {
        return { valid: false, error: 'Array cannot be empty' };
    }
    
    for (let i = 0; i < temperatures.length; i++) {
        const temp = temperatures[i];
        if (typeof temp !== 'number' || !Number.isInteger(temp)) {
            return { valid: false, error: `Invalid temperature at day ${i}: ${temp}` };
        }
        
        if (temp < -100 || temp > 150) {
            return { valid: false, error: `Temperature out of range at day ${i}: ${temp}°` };
        }
    }
    
    return { valid: true, error: null };
}

function formatTemperatureReport(temperatures, waitDays) {
    console.log(`\n📋 Daily Temperature Report`);
    console.log(`Day | Temp | Wait | Next Warmer Day | Next Temp`);
    console.log(`----|------|------|-----------------|----------`);
    
    for (let i = 0; i < temperatures.length; i++) {
        const temp = temperatures[i];
        const wait = waitDays[i];
        const nextDay = wait > 0 ? i + wait : 'N/A';
        const nextTemp = wait > 0 ? temperatures[i + wait] : 'N/A';
        
        console.log(`${i.toString().padStart(3)} | ${temp.toString().padStart(4)}° | ${wait.toString().padStart(4)} | ${nextDay.toString().padStart(15)} | ${nextTemp.toString().padStart(8)}°`);
    }
}

// ============= VISUALIZATION FUNCTIONS =============

function visualizeDailyTemperatures(temperatures) {
    console.log(`\n🎬 Visualizing Daily Temperatures`);
    console.log(`Temperatures: [${temperatures.join('°, ')}°]`);
    
    const validation = validateTemperatures(temperatures);
    if (!validation.valid) {
        console.log(`❌ Invalid input: ${validation.error}`);
        return;
    }
    
    const waitDays = dailyTemperaturesStack([...temperatures]);
    formatTemperatureReport(temperatures, waitDays);
    temperatureStatistics([...temperatures]);
    
    return { waitDays, temperatures };
}

function demonstrateAllApproaches() {
    console.log(`\n🎯 Demonstrating All Approaches`);
    
    const testTemperatures = [73, 74, 75, 71, 69, 72, 76, 73];
    console.log(`Test: [${testTemperatures.join('°, ')}°]`);
    
    const approaches = [
        { name: "Brute Force", func: dailyTemperaturesBruteForce },
        { name: "Stack-based", func: dailyTemperaturesStack },
        { name: "Optimized", func: dailyTemperaturesOptimized },
        { name: "Reverse", func: dailyTemperaturesReverse }
    ];
    
    approaches.forEach(approach => {
        console.log(`\n--- ${approach.name} ---`);
        console.time(approach.name);
        const result = approach.func([...testTemperatures]);
        console.timeEnd(approach.name);
    });
}

// ============= PERFORMANCE ANALYSIS =============

function analyzePerformance() {
    console.log(`\n📊 Performance Analysis`);
    
    const approaches = [
        { name: "Brute Force", time: "O(n²)", space: "O(1)", notes: "Nested loops" },
        { name: "Stack-based", time: "O(n)", space: "O(n)", notes: "Each day processed once" },
        { name: "Optimized", time: "O(n)", space: "O(n)", notes: "Cleaner implementation" },
        { name: "Reverse", time: "O(n)", space: "O(n)", notes: "Right to left processing" }
    ];
    
    console.log(`\n📈 Complexity Comparison:`);
    console.log("=".repeat(75));
    console.log("| Approach    | Time  | Space | Notes              |");
    console.log("=".repeat(75));
    
    approaches.forEach(approach => {
        const name = approach.name.padEnd(11);
        const time = approach.time.padEnd(5);
        const space = approach.space.padEnd(5);
        const notes = approach.notes.padEnd(18);
        console.log(`| ${name} | ${time} | ${space} | ${notes} |`);
    });
    
    console.log("=".repeat(75));
    
    console.log(`\n🏆 Winner: Stack-based Approach`);
    console.log(`• O(n) time - each day processed once`);
    console.log(`• O(n) space - stack for waiting days`);
    console.log(`• Optimal solution for this problem`);
}

// ============= PRACTICAL APPLICATIONS =============

function practicalApplications() {
    console.log(`\n🎯 Practical Applications`);
    
    console.log(`\n1. **Weather Planning:**`);
    console.log(`   - Outdoor activity scheduling`);
    console.log(`   - Agricultural planning`);
    
    console.log(`\n2. **Energy Management:**`);
    console.log(`   - HVAC optimization`);
    console.log(`   - Energy consumption prediction`);
    
    console.log(`\n3. **Tourism:**`);
    console.log(`   - Travel recommendations`);
    console.log(`   - Seasonal planning`);
    
    // Example: Weather planner
    console.log(`\n🌤️ Example: Weather Planner`);
    
    class WeatherPlanner {
        constructor() {
            this.temperatures = [];
        }
        
        addTemperatures(temps) {
            this.temperatures = temps;
        }
        
        planActivities() {
            console.log(`\n🌤️ Planning for warmer days:`);
            console.log(`Temperatures: [${this.temperatures.join('°, ')}°]`);
            
            const warmerDays = dailyTemperaturesOptimized(this.temperatures);
            
            for (let day = 0; day < this.temperatures.length; day++) {
                const currentTemp = this.temperatures[day];
                const daysToWait = warmerDays[day];
                
                if (daysToWait > 0) {
                    const warmerTemp = this.temperatures[day + daysToWait];
                    console.log(`Day ${day} (${currentTemp}°): Wait ${daysToWait} days for ${warmerTemp}°`);
                } else {
                    console.log(`Day ${day} (${currentTemp}°): No warmer days ahead`);
                }
            }
        }
    }
    
    const planner = new WeatherPlanner();
    planner.addTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
    planner.planActivities();
}

// ============= TEST CASES =============

function testDailyTemperatures() {
    console.log(`\n🧪 Testing Daily Temperatures`);
    
    const testCases = [
        { 
            input: [73,74,75,71,69,72,76,73], 
            expected: [1,1,4,2,1,1,0,0], 
            description: "Standard example" 
        },
        { 
            input: [30,40,50,60], 
            expected: [1,1,1,0], 
            description: "Increasing temperatures" 
        },
        { 
            input: [90,80,70,60], 
            expected: [0,0,0,0], 
            description: "Decreasing temperatures" 
        },
        { 
            input: [75,75,75,75], 
            expected: [0,0,0,0], 
            description: "Same temperatures" 
        },
        { 
            input: [55], 
            expected: [0], 
            description: "Single day" 
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n--- Test ${index + 1}: ${testCase.description} ---`);
        console.log(`Input: [${testCase.input.join('°, ')}°]`);
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        
        const result = dailyTemperaturesOptimized([...testCase.input]);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        console.log(`Actual: [${result.join(', ')}] ${passed ? '✅' : '❌'}`);
    });
}

// ============= RUN DEMONSTRATIONS =============

console.log("🎓 DAILY TEMPERATURES - BODHI DSA COURSE");
console.log("=" .repeat(45));

analyzePerformance();
demonstrateAllApproaches();
visualizeDailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
practicalApplications();
testDailyTemperatures();

// Export functions
module.exports = {
    dailyTemperaturesBruteForce,
    dailyTemperaturesStack,
    dailyTemperaturesOptimized,
    dailyTemperaturesReverse,
    dailyTemperaturesCooler,
    temperatureStatistics,
    validateTemperatures,
    formatTemperatureReport,
    visualizeDailyTemperatures,
    demonstrateAllApproaches,
    analyzePerformance,
    practicalApplications,
    testDailyTemperatures
};
