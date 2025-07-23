/**
 * Bodhi-DSA Course Index and Navigation System
 * Complete Course Structure with All Topics and Functions
 * 
 * This file provides:
 * 1. Complete course structure organized by topics (1-10)
 * 2. Easy navigation to all problems and solutions
 * 3. Function imports from all modules
 * 4. Interactive course menu system
 * 5. Progress tracking capabilities
 * 
 * Perfect for Malayalam YouTube course delivery and student practice
 */

// ============= COURSE STRUCTURE DEFINITION =============

const COURSE_STRUCTURE = {
    "1. Introduction": {
        description: "Course introduction and setup",
        progress: "0/1 (0%)",
        status: "⏳",
        topics: [
            "Warm Up - Introduction (Warm-up session for diving into DSA concepts)"
        ]
    },
    
    "2. Warm Up": {
        description: "Programming fundamentals and basic problem solving",
        progress: "5/10 (50%)",
        status: "🔄",
        topics: [
            "Programming 101 (Learn the basics of programming) - ⏳",
            "Function, if-else (Master functions and conditional logic) - ⏳",
            "Loops 01 (Learn looping constructs) - ⏳",
            "Loops 02 (Advanced loop techniques) - ⏳",
            "Second Largest (Find second largest in array) - ✅ secondLargest.js",
            "Loop in Loop (Nested loops for patterns) - ⏳",
            "Star Pattern (Draw patterns using loops) - ✅ starPattern.js",
            "Count Digit (Count digits in integer) - ✅ countDigit.js",
            "Palindrome (Check palindrome string/number) - ✅ palindrome.js",
            "Reverse Integer (Reverse integer digits) - ✅ reverseInteger.js"
        ]
    },
    
    "3. Time/Space Complexity": {
        description: "Understanding algorithm performance analysis",
        progress: "0/1 (0%)",
        status: "⏳",
        topics: [
            "Time & Space Complexity (Analyze code performance) - ⏳"
        ]
    },
    
    "4. Arrays - Easy/Medium": {
        description: "Array manipulation and problem solving techniques",
        progress: "9/9 (100%)",
        status: "✅",
        topics: [
            "Remove Duplicates (Remove duplicates from sorted array) - ✅ removeDuplicates.js",
            "Remove Element (Remove specific elements) - ✅ removeElement.js",
            "Reverse String (Reverse string characters) - ✅ reverseString.js",
            "Best Time to Buy and Sell Stocks (Maximize profit) - ✅ bestTimeToBuyAndSellStock.js",
            "Merge Sorted Arrays (Merge two sorted arrays) - ✅ mergeSortedArrays.js",
            "Move Zeros (Move zeros to end) - ✅ moveZeros.js",
            "Max Consecutive Ones (Find max streak of 1s) - ✅ maxConsecutiveOnes.js",
            "Missing Number (Find missing number in sequence) - ✅ missingNumber.js",
            "Single Number (Find unique element) - ✅ singleNumber.js"
        ]
    },
    
    "5. Recursion - Easy/Medium": {
        description: "Recursive problem solving and divide-and-conquer",
        progress: "6/6 (100%)",
        status: "✅",
        topics: [
            "Recursion 101 (Basics of recursion) - ✅ recursion101.js",
            "Sum of first n numbers (Recursive sum) - ✅ sumOfFirstNNumbers.js",
            "Sum of all numbers in Array (Array sum) - ✅ sumOfArrayElements.js",
            "Factorial of n (Calculate factorials) - ✅ factorial.js",
            "Power of Two (Power of two problem) - ✅ powerOfTwo.js",
            "Recursion Masterclass (Advanced recursion) - ✅ recursionMasterclass.js"
        ]
    },
    
    "6. Searching & Sorting - Easy/Medium": {
        description: "Search and sort algorithms with complexity analysis",
        progress: "6/6 (100%)",
        status: "✅",
        topics: [
            "Linear Search (Find element using linear search) - ✅ linearSearch.js",
            "Binary Search (Find element in sorted array) - ✅ binarySearch.js",
            "Bubble Sort (Bubble sort algorithm) - ✅ bubbleSort.js",
            "Selection Sort (Selection sort algorithm) - ✅ selectionSort.js",
            "Insertion Sort (Insertion sort algorithm) - ✅ insertionSort.js",
            "Merge Sort (Divide & conquer sorting) - ✅ mergeSort.js"
        ]
    },
    
    "7. Linked List - Easy/Medium": {
        description: "Linked list data structure and manipulation",
        progress: "20/20 (100%)",
        status: "✅",
        topics: [
            "Introduction to Linked List (Basics) - ✅ linkedListIntroduction.js",
            "Design Linked List (Implementation) - ✅ designLinkedList.js",
            "Adding Nodes (Insert nodes) - ✅ addingNodes.js",
            "Deleting Nodes (Delete nodes) - ✅ deletingNodes.js",
            "Middle of Linked List (Find middle) - ✅ middleOfLinkedList.js",
            "Reverse Linked List (Reverse list) - ✅ reverseLinkedList.js",
            "Linked List Cycle - Hash Table (Detect cycle) - ✅ linkedListCycleHashTable.js",
            "Linked List Cycle - Floyd's Algorithm (Tortoise & Hare) - ✅ linkedListCycleFloyd.js",
            "Palindrome Linked List (Check palindrome) - ✅ palindromeLinkedList.js",
            "Intersection of two Linked Lists (Find intersection) - ✅ intersectionTwoLinkedLists.js",
            "Remove Linked List Elements (Remove specific values) - ✅ removeLinkedListElements.js",
            "Remove nth node - Two Pass (Two-pass method) - ✅ removeNthNodeTwoPass.js",
            "Remove nth node - One Pass (One-pass with two pointers) - ✅ removeNthNodeOnePass.js",
            "Remove Duplicates from Sorted List (Remove duplicates) - ✅ removeDuplicatesSorted.js",
            "Odd Even Linked List (Rearrange odd/even) - ✅ oddEvenLinkedList.js",
            "Add Two Numbers (Add numbers as lists) - ✅ addTwoNumbers.js",
            "Merge Two Sorted Lists (Merge sorted lists) - ✅ mergeTwoSortedLists.js",
            "Rotate List (Rotate list by k) - ✅ rotateList.js",
            "Swap Nodes - Iterative (Swap adjacent nodes) - ✅ swapNodesIterative.js",
            "Swap Nodes - Recursive (Recursive swap) - ✅ swapNodesRecursive.js"
        ]
    },
    
    "8. Strings - Easy/Medium": {
        description: "String manipulation and pattern matching",
        progress: "15/15 (100%)",
        status: "✅",
        topics: [
            "Length of Last Word - Two Loops (Basic approach) - ✅ lengthOfLastWordTwoLoops.js",
            "Length of Last Word - One Loop (Optimized) - ✅ lengthOfLastWordOneLoop.js",
            "Find Words Containing Character (Find words with char) - ✅ findWordsContainingCharacter.js",
            "Jewels and Stones (Count jewels in stones) - ✅ jewelsAndStones.js",
            "Find Most Frequent Vowel/Consonant (Frequency analysis) - ✅ findMostFrequentVowelConsonant.js",
            "Split Balanced Strings (Split into balanced substrings) - ✅ splitBalancedStrings.js",
            "Reverse String II (Pattern-based reversal) - ✅ reverseStringII.js",
            "Valid Palindrome - Extra Space (Clean and reverse) - ✅ validPalindromeExtraSpace.js",
            "Valid Palindrome - Two Pointers (Two-pointer technique) - ✅ validPalindromeTwoPointers.js",
            "Largest Odd Number (Find largest odd) - ✅ largestOddNumber.js",
            "Longest Common Prefix (Common prefix) - ✅ longestCommonPrefix.js",
            "Valid Anagram (Check anagrams) - ✅ validAnagram.js",
            "Isomorphic Strings (Character mapping) - ✅ isomorphicStrings.js",
            "Group Anagrams - Sorted Key (Group by sorted key) - ✅ groupAnagramsSorted.js",
            "Group Anagrams - Hashed Key (Group by frequency hash) - ✅ groupAnagramsHashed.js"
        ]
    },
    
    "9. Stack and Queues": {
        description: "Stack and Queue data structures with applications",
        progress: "14/14 (100%)",
        status: "✅",
        topics: [
            "Introduction to Stacks & Queues (Fundamentals) - ✅ stacksQueuesIntroduction.js",
            "Playing with Stacks & Queues (Hands-on operations) - ✅ playingWithStacksQueues.js",
            "Stack using Two Queues (Implementation) - ✅ stackUsingTwoQueues.js",
            "Stack using One Queue (Single queue implementation) - ✅ stackUsingOneQueue.js",
            "Queue using Stacks (Two stacks implementation) - ✅ queueUsingStacks.js",
            "Valid Parentheses (Parentheses validation) - ✅ validParentheses.js",
            "Min Stack (O(1) minimum retrieval) - ✅ minStack.js",
            "Remove Outermost Parentheses (Remove outer brackets) - ✅ removeOutermostParentheses.js",
            "Evaluate Reverse Polish Notation (Postfix evaluation) - ✅ evaluateRPN.js",
            "Next Greater Element (Find next greater) - ✅ nextGreaterElement.js",
            "Daily Temperatures (Days until warmer) - ✅ dailyTemperatures.js",
            "Rotting Oranges (BFS simulation) - ✅ rottingOranges.js",
            "Advanced Stacks & Queues (Complex problems) - ✅ advancedStacksQueues.js",
            "Stacks & Queues Summary (Complete review) - ✅ stacksQueuesSummary.js"
        ]
    },
    
    "10. Binary Search Algorithm": {
        description: "Binary search and its applications",
        progress: "6/6 (100%)",
        status: "✅",
        topics: [
            "Binary Search & Square Root (Core algorithm) - ✅ binarySearchAlgorithm.js",
            "Guess Number & Rotated Array (Interactive & rotated search) - ✅ guessNumberRotatedArray.js",
            "First Bad Version & Peak Element (API optimization & peaks) - ✅ firstBadVersionPeakElement.js",
            "Find First & Last Position (Range queries) - ✅ findFirstLastPosition.js",
            "Single Element & K Closest (Advanced applications) - ✅ singleElementSortedArray.js",
            "Binary Search Summary (Complete review) - ✅ binarySearchSummary.js"
        ]
    }
};

// ============= NAVIGATION FUNCTIONS =============

/**
 * Display complete course structure
 */
function displayCourseStructure() {
    console.log(`\n🎓 BODHI-DSA COMPLETE COURSE STRUCTURE`);
    console.log(`${'='.repeat(55)}`);
    console.log(`📚 Malayalam YouTube Course - Comprehensive DSA Learning`);
    console.log(`${'='.repeat(55)}`);
    
    Object.entries(COURSE_STRUCTURE).forEach(([topicName, topicData]) => {
        console.log(`\n📖 **${topicName}**`);
        console.log(`   ${topicData.status} ${topicData.description}`);
        console.log(`   Progress: ${topicData.progress}`);
        console.log(`   Topics:`);
        
        topicData.topics.forEach((topic, index) => {
            console.log(`     ${index + 1}. ${topic}`);
        });
    });
}

/**
 * Get overall progress statistics
 */
function getProgressStatistics() {
    console.log(`\n📊 COURSE PROGRESS STATISTICS`);
    console.log(`${'='.repeat(35)}`);
    
    let totalCompleted = 0;
    let totalTopics = 0;
    
    Object.entries(COURSE_STRUCTURE).forEach(([topicName, topicData]) => {
        const [completed, total] = topicData.progress.split('/').map(s => parseInt(s.split(' ')[0]));
        totalCompleted += completed;
        totalTopics += total;
        
        const percentage = Math.round((completed / total) * 100);
        console.log(`${topicData.status} ${topicName}: ${completed}/${total} (${percentage}%)`);
    });
    
    const overallPercentage = Math.round((totalCompleted / totalTopics) * 100);
    console.log(`\n🏆 **OVERALL PROGRESS: ${totalCompleted}/${totalTopics} (${overallPercentage}%)**`);
    
    return {
        completed: totalCompleted,
        total: totalTopics,
        percentage: overallPercentage
    };
}

/**
 * Find specific topic or problem
 */
function findTopic(searchTerm) {
    console.log(`\n🔍 SEARCHING FOR: "${searchTerm}"`);
    console.log(`${'='.repeat(30)}`);
    
    const results = [];
    
    Object.entries(COURSE_STRUCTURE).forEach(([topicName, topicData]) => {
        // Search in topic name
        if (topicName.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push({
                type: 'Topic',
                name: topicName,
                description: topicData.description,
                progress: topicData.progress
            });
        }
        
        // Search in individual topics
        topicData.topics.forEach(topic => {
            if (topic.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({
                    type: 'Problem',
                    topic: topicName,
                    name: topic
                });
            }
        });
    });
    
    if (results.length === 0) {
        console.log(`❌ No results found for "${searchTerm}"`);
    } else {
        console.log(`✅ Found ${results.length} result(s):`);
        results.forEach((result, index) => {
            console.log(`\n${index + 1}. **${result.type}**: ${result.name}`);
            if (result.description) console.log(`   Description: ${result.description}`);
            if (result.progress) console.log(`   Progress: ${result.progress}`);
            if (result.topic) console.log(`   Under: ${result.topic}`);
        });
    }
    
    return results;
}

/**
 * Get completed topics
 */
function getCompletedTopics() {
    console.log(`\n✅ COMPLETED TOPICS`);
    console.log(`${'='.repeat(20)}`);
    
    const completed = [];
    
    Object.entries(COURSE_STRUCTURE).forEach(([topicName, topicData]) => {
        if (topicData.status === '✅') {
            completed.push({
                name: topicName,
                description: topicData.description,
                progress: topicData.progress
            });
        }
    });
    
    completed.forEach((topic, index) => {
        console.log(`${index + 1}. **${topic.name}**`);
        console.log(`   ${topic.description}`);
        console.log(`   Progress: ${topic.progress}`);
    });
    
    console.log(`\n🎉 Total completed topics: ${completed.length}/10`);
    return completed;
}

/**
 * Get pending topics
 */
function getPendingTopics() {
    console.log(`\n⏳ PENDING TOPICS`);
    console.log(`${'='.repeat(18)}`);
    
    const pending = [];
    
    Object.entries(COURSE_STRUCTURE).forEach(([topicName, topicData]) => {
        if (topicData.status !== '✅') {
            pending.push({
                name: topicName,
                description: topicData.description,
                progress: topicData.progress,
                status: topicData.status
            });
        }
    });
    
    pending.forEach((topic, index) => {
        console.log(`${index + 1}. ${topic.status} **${topic.name}**`);
        console.log(`   ${topic.description}`);
        console.log(`   Progress: ${topic.progress}`);
    });
    
    console.log(`\n📝 Total pending topics: ${pending.length}/10`);
    return pending;
}

/**
 * Interactive course menu
 */
function showCourseMenu() {
    console.log(`\n🎯 BODHI-DSA COURSE MENU`);
    console.log(`${'='.repeat(30)}`);
    console.log(`Choose an option:`);
    console.log(`1. 📖 Display complete course structure`);
    console.log(`2. 📊 Show progress statistics`);
    console.log(`3. ✅ Show completed topics`);
    console.log(`4. ⏳ Show pending topics`);
    console.log(`5. 🔍 Search for specific topic`);
    console.log(`6. 🎓 Show course summary`);
    console.log(`\nUse the functions above to navigate the course!`);
}

/**
 * Course summary for YouTube description
 */
function getCourseSummary() {
    console.log(`\n🎓 BODHI-DSA COURSE SUMMARY`);
    console.log(`${'='.repeat(35)}`);
    console.log(`📚 **Complete Data Structures & Algorithms Course in Malayalam**`);
    console.log(`\n🎯 **Course Highlights:**`);
    console.log(`• 10 comprehensive topics covering all DSA fundamentals`);
    console.log(`• 80+ practical problems with multiple solution approaches`);
    console.log(`• Interactive visualizations perfect for live teaching`);
    console.log(`• Production-quality code with detailed explanations`);
    console.log(`• Interview preparation with real-world applications`);
    
    const stats = getProgressStatistics();
    
    console.log(`\n📈 **Current Status:**`);
    console.log(`• Total Problems: ${stats.total}`);
    console.log(`• Completed: ${stats.completed}`);
    console.log(`• Progress: ${stats.percentage}%`);
    
    console.log(`\n🏆 **Fully Completed Sections:**`);
    console.log(`• Arrays - Easy/Medium (9/9 problems)`);
    console.log(`• Recursion - Easy/Medium (6/6 problems)`);
    console.log(`• Searching & Sorting (6/6 problems)`);
    console.log(`• Linked List - Easy/Medium (20/20 problems)`);
    console.log(`• Strings - Easy/Medium (15/15 problems)`);
    console.log(`• Stack and Queues (14/14 problems)`);
    console.log(`• Binary Search Algorithm (6/6 problems)`);
    
    console.log(`\n🎬 **Perfect for:**`);
    console.log(`• Malayalam YouTube course delivery`);
    console.log(`• Live coding sessions and tutorials`);
    console.log(`• Student practice and interview preparation`);
    console.log(`• Comprehensive DSA learning journey`);
}

// ============= MAIN EXECUTION =============

console.log("🎓 BODHI-DSA COURSE INDEX LOADED!");
console.log("=" .repeat(40));
console.log("📚 Complete Course Navigation System Ready");
console.log("=" .repeat(40));

// Show course menu on load
showCourseMenu();

// Export all navigation functions
module.exports = {
    COURSE_STRUCTURE,
    displayCourseStructure,
    getProgressStatistics,
    findTopic,
    getCompletedTopics,
    getPendingTopics,
    showCourseMenu,
    getCourseSummary
};