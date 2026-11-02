# 🎯 Turing.com Prep Hub — Java & Spring Boot Vetting System

A specialized preparation workspace and knowledge base tailored directly for passing the **Turing.com Java & Spring Boot Developer Vetting Process**.

---

## 📁 System Architecture

```
turing_prep/
├── knowledge_base/
│   ├── topics.json          # Deep guides: JVM Internals, Concurrency, Collections, Spring Boot, JPA, Seniority Survey
│   ├── mcq_bank.json        # Official Turing sample MCQs + Core Java & Spring Boot vetting questions
│   ├── leetcode_log.json    # Top 10 Turing community-reported coding challenges with frequencies
│   └── progress.json        # Real-time mastery scores, weak spot tracker, and study recommendations
├── app/
│   ├── index.html           # Interactive UI (Dark/Light mode, Study Mode, Explanation Toggles)
│   ├── style.css            # Clean, responsive design system
│   └── app.js               # Adaptive MCQ engine, LeetCode tracker, and bi-directional storage sync
├── server.py                # Zero-dependency local Python API server (persists updates directly to disk)
├── start_app.bat            # 1-click Windows launcher
└── README.md                # System documentation & vetting roadmap
```

---

## 🚀 How to Launch the Application

### Option 1: One-Click Launch (Recommended)
1. Double-click [`start_app.bat`](file:///c:/Users/Office/Documents/dubi/turing_prep/start_app.bat) in the `turing_prep` folder.
2. It launches `server.py` and opens `http://localhost:8000` in your default browser.
3. Any question you answer or note you save **automatically persists directly to your `knowledge_base/*.json` files on disk**.

### Option 2: Standalone Browser Mode (Zero Setup)
- Double-click [`app/index.html`](file:///c:/Users/Office/Documents/dubi/turing_prep/app/index.html) in Windows Explorer.
- Runs 100% offline in your browser with full LocalStorage caching and JSON backup support.

### Option 3: Host Online for Free (Access from Any Phone or PC)

You can host this entire web app online for **100% free** so you can practice on your phone, work computer, or laptop anywhere:

#### Method A: Netlify Drop (Fastest — 30 Seconds, Zero Installs)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in any browser (sign in with GitHub or email).
2. Drag and drop the ready-made [`turing-prep-deploy.zip`](file:///c:/Users/Office/Documents/dubi/turing_prep/turing-prep-deploy.zip) (or the [`dist/`](file:///c:/Users/Office/Documents/dubi/turing_prep/dist/) folder) straight onto the Netlify webpage.
3. Netlify will immediately publish your app with a free, permanent HTTPS URL (e.g. `https://turing-prep-hub.netlify.app`).
4. Open the link on your phone, tap **"Add to Home Screen"** in Safari or Chrome, and use it as a native full-screen app!

#### Method B: GitHub Pages (Free Forever, Developer Standard)
1. Create a free repository on [GitHub](https://github.com).
2. Push the files in this folder (or the `dist/` folder).
3. In GitHub, go to **Settings** $\rightarrow$ **Pages** $\rightarrow$ select your branch (`main` / root) and click **Save**.
4. Your app goes live at `https://<your-username>.github.io/<repo-name>/`.

---

## 🎮 Gamification, Habit Loop & Mobile Features

To make daily practice rewarding and engaging, several psychological habit-building mechanics are built into the app:

* **🔥 Daily Streak System**:
  * Tracks consecutive practice days. Log in and answer questions to grow your streak (e.g. `🔥 3 Day Streak`).
* **⚡ Level & XP Progression**:
  * Earn **+15 XP** for every correct MCQ.
  * Earn **+50 XP** for logging or updating a LeetCode problem.
  * Rank progression:
    * `Level 1: Java Apprentice` (0 – 150 XP)
    * `Level 2: OOP Practitioner` (150 – 400 XP)
    * `Level 3: Spring Boot Builder` (400 – 850 XP)
    * `Level 4: Concurrency Crafter` (850 – 1600 XP)
    * `Level 5: Turing Senior Engineer` (1600+ XP)
* **🎯 Daily Quest (5 MCQs/Day)**:
  * An interactive daily goal bar on your dashboard. Completing your 5 daily questions grants an instant **+50 XP bonus** and triggers fanfare celebration!
* **⚡ 1-Click Rapid Warmup**:
  * Click **"⚡ Launch 5-Question Daily Warmup Drill"** on the dashboard for a balanced 5-question blitz across JVM, Spring Boot, Seniority, and System Design.
* **⏱️ Turing Blitz Speed Timer (60s)**:
  * Toggle **"⏱️ Blitz Timer (60s)"** in MCQ practice to simulate real Turing test time pressure with an animated countdown bar.
* **🔊 Synthesized Web Audio Effects**:
  * Built using the standard Web Audio API (zero audio files to download, works everywhere): pleasant success chimes, subtle mistake blips, and level-up celebratory fanfares (toggleable via the 🔊 icon).
* **🎉 Fullscreen Particle Confetti**:
  * Custom lightweight canvas celebration that bursts when you ace a quiz drill, hit your daily goal, or level up.
* **📱 Mobile-First Bottom Dock & PWA ("Add to Home Screen")**:
  * On smartphones, the top tabs automatically convert into a native-feeling bottom dock with safe-area thumb ergonomics.
  * Includes `manifest.json` and `sw.js` (Service Worker) so you can install it on iOS & Android as a standalone app with no browser address bar.

---

## ☕ What is Ingested for Java & Spring Boot

### 1. Core Java & JVM Architecture
* **5 JVM Runtime Data Areas**:
  * **Heap Memory**: Shared runtime storage for all object instances and arrays; managed by Garbage Collection.
  * **Method Area / Metaspace**: Shared storage for class metadata, field/method descriptors, bytecode, and runtime constant pool.
  * **JVM Stack**: Thread-local stack frames storing local variables, operand stacks, and return frame data.
  * **Native Method Stack**: Dedicated memory for C/C++ native methods executed via JNI.
  * **Program Counter (PC) Register**: Thread-local pointer recording the memory address of the JVM instruction currently being executed by that thread.
* **ClassLoader Parent Delegation Hierarchy**:
  * Loading sequence delegates upwards: Application/System ClassLoader $\rightarrow$ Extension/Platform ClassLoader $\rightarrow$ Bootstrap ClassLoader.
* **JIT (Just-In-Time) Compilation**:
  * Monitors bytecode execution to detect hot spots (frequently called loops/methods) and translates them into native CPU machine instructions at runtime with method inlining and escape analysis.
* **Absence of Explicit Pointers**:
  * Java omits raw pointer arithmetic to enforce memory safety (preventing buffer overflows and arbitrary memory access), simplify syntax, and allow the Garbage Collector to relocate and compact objects on the heap.
* **Multithreading & Concurrency**:
  * 6 Thread States (`NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, `TERMINATED`).
  * `Thread.sleep()` (keeps locks) vs. `object.wait()` (releases monitor lock).
  * `volatile` visibility guarantee vs. lack of compound atomicity (`counter++`).
  * Instance synchronized monitors (`this`) vs. static synchronized monitors (`MyClass.class`).
* **Collections & Java 8+ Streams**:
  * `HashMap` Java 8 treeification threshold (`TREEIFY_THRESHOLD = 8`, `MIN_TREEIFY_CAPACITY = 64`).
  * `ConcurrentHashMap` bucket-level CAS & synchronization.
  * Fail-Fast vs. Fail-Safe iterators (`ConcurrentModificationException`).
  * `equals()` and `hashCode()` contract.

### 2. Spring Boot Core, Starters & JPA
* **Auto-Configuration Mechanics**:
  * Composition of `@SpringBootApplication` (`@Configuration`, `@EnableAutoConfiguration`, `@ComponentScan`).
  * Registering custom auto-configurations: `META-INF/spring.factories` (Boot 2.x) vs. `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` (Boot 3.x).
  * DevTools vs. Actuator: DevTools = fast local iteration/LiveReload; Actuator = production CPU/RAM metrics and health checks.
  * `CommandLineRunner.run(String... args)` vs `ApplicationRunner.run(ApplicationArguments args)`.
* **Dependency Injection & Stereotypes**:
  * Scopes: `singleton`, `prototype`, `request`, `session`.
  * Stereotypes: `@Component`, `@Service`, `@Repository` (automatic persistence exception translation into Spring `DataAccessException`).
  * Resolving `NoUniqueBeanDefinitionException` with `@Qualifier` and `@Primary`.
* **Spring Data JPA & Transactions**:
  * `@Transactional` proxy self-invocation trap: direct internal method calls bypass Spring AOP proxies.
  * Propagation: `REQUIRED`, `REQUIRES_NEW` (independent physical transaction), `NESTED` (JDBC savepoints).
  * Rollback rules: rolls back only on unchecked exceptions by default unless `rollbackFor = Exception.class` is specified.
  * Pagination: `Page<T>` (runs expensive `SELECT COUNT(*)` for total page count) vs. `Slice<T>` (queries `limit + 1` rows without count query for infinite scrolling).
  * `@TransactionalEventListener`: defaults to `TransactionPhase.AFTER_COMMIT` to prevent side-effects if transaction aborts.
  * Bean Validation: `BindingResult` parameter MUST immediately follow the `@Valid` payload object.

### 2.1 Back-End Architecture & Database Indexing (Turing Core)
* **Clustered vs. Non-Clustered Indexes**:
  * *Clustered Index*: Physically sorts and stores actual data rows on disk in index order (strictly **1 per table**).
  * *Non-Clustered Index*: Separate secondary B-Tree structure containing sorted index columns and pointers (RowIDs or clustered keys) back to the physical rows (multiple allowed).
* **Brewer's CAP Theorem**:
  * In distributed systems across a network, network partitions ($P$) are unavoidable. Architectures must choose between **Consistency ($CP$)** (refusing requests to avoid stale data) or **Availability ($AP$)** (responding immediately with potentially stale data).
* **SQL Injection Mitigation**:
  * `PreparedStatement` pre-compiles the SQL syntax tree with placeholders (`?`). Parameters are transmitted separately as raw literal data and are never evaluated as executable SQL tokens.
* **Testing Taxonomy**:
  * *Functional Testing*: Verifies software conforms to technical specifications ("Did we build the system right?").
  * *Acceptance Testing (UAT)*: Validates software fulfills customer business needs ("Did we build the right system?").

### 3. Turing Work Experience Survey (57 Questions, 60 Min Allocated)
The survey aims to evaluate a developer's engineering maturity, ownership level, ethics, and past experience to feed Turing's AI Matching Engine (AIME). The questions feature 4 distinct seniority tiers:

| Survey Question Dimension | Junior / Intern Response | Mid-Level IC Response | Senior / Staff Lead Response (Highest Score) |
|:---|:---|:---|:---|
| **Q1: Knowing What to Improve** | "I don't know" or waits for manager | Actively pings others to ask what to improve | **"I provide expectations as well as detailed steps on how to achieve them to people in my team."** |
| **Q2: Learning New Technologies** | Self-teaches isolated APIs from scratch | Studies trade-offs of individual libraries | **"I focus more on new system architectures and design patterns."** |
| **Q3: Assessing Bug Severity** | "Other people do that for me" | Evaluates surface user experience impact | **"I use my knowledge of the core metrics of the team and the company to assess bug severity."** |
| **Q4: Improving Code Quality** | Asks for code reviews; follows basic linting | Adheres to existing team conventions | **"I define coding conventions and standards for the team."** |
| **Q5: Measuring Feature Results** | Waits for manager / user feedback | Defines loose success criteria before tasks | **"I define success metrics before working on tasks and have AB tests to compare the results."** |

---

### 3.1 Official Turing Developer Test Strategies & Retake Policy
From Turing's official test preparation guide (*"Six Tips to Prepare for the Turing Developer Tests or Tech Stack MCQ Tests"* by Ankit Sahu):
1. **The "Cover-the-Options" Strategy**: Cover options on screen when reading the question and formulate your own solution first. Look for your match; if not found, evaluate each option as an independent True/False statement.
2. **Watch for Subtle Qualifier Traps**: Turing MCQ questions frequently distinguish correct from incorrect answers using single qualifier words (`strictly greater than` vs `greater than or equal to`, `at most` vs `at least`).
3. **Timed Assessments**: Tech stack MCQ tests run between **45 and 120 minutes** depending on the stack.
4. **Official 3-Month Retake Policy**: If a candidate does not pass a tech stack test, Turing permits retaking the test **3 months** after the unsuccessful attempt.
5. **DevOps & Git Stack Traps**:
   - `git checkout <ref>` simultaneously updates the `HEAD` pointer and synchronizes the working directory files.
   - Regular expression greedy quantifiers: `you.*n` on quotes will greedily extend from the very first `you` to the *last* valid `n` in the string.

### 4. Turing Coding Assessment Intelligence & Blueprint (50 Problems Ingested)
Extracted from public company-tagged interview report databases (GiveInterview & StealthCoder leaked data):
* **Difficulty Distribution**: **68% Medium** (31 problems), **27% Easy** (15 problems), **5% Hard** (4 problems).
* **Topic Distribution**: **Array (56%)**, **String (39%)**, **Hash Table (27%)**, **Dynamic Programming (27%)**, **Sorting (12%)**, **Two Pointers (12%)**, **Sliding Window (10%)**.
* **Live Assessment Format**: 30–45 minutes total, typically featuring **1 Easy speed warmup** (nail in first 5 minutes) + **1 Medium algorithmic gate** (manage time carefully).
* **Strategic Play**:
  1. Master **Arrays & Strings cold** using **Sliding Window** and **Two Pointers**.
  2. Pair them with **Hash Tables** to eliminate $O(N^2)$ timeouts on hidden test suites.
  3. Tackle **Dynamic Programming** (1D and 2D arrays) after string confidence is built.
  4. Skip or pace yourself on rare Hard questions.

#### High-Frequency Tracked Problems (Sorted by Turing Reported Frequency):
Directly logged into [`leetcode_log.json`](file:///c:/Users/Office/Documents/dubi/turing_prep/knowledge_base/leetcode_log.json):

| Rank / # | Problem Name | LeetCode # | Difficulty | Patterns | Frequency / Status |
|:---:|:---|:---:|:---:|:---|:---|
| **01** | **Valid Parentheses** | LC #20 | Easy | String, Stack | **100.0%** (Top Turing Gate) |
| **02** | **Longest Substring Without Repeating Characters** | LC #3 | Medium | Sliding Window, Hash Table | **91.8%** |
| **03** | **Baseball Game** | LC #682 | Easy | Array, Stack, Simulation | **81.2%** (Classic Warmup) |
| **04** | **Minimum Cost For Tickets** | LC #983 | Medium | Dynamic Programming | **73.8%** |
| **05** | **Koko Eating Bananas** | LC #875 | Medium | Binary Search on Answer | **71.5%** |
| **06** | **Validate IP Address** | LC #468 | Medium | String Parsing | **65.7%** (Asked in Last 6 Mo) |
| **07** | **Longest Common Prefix** | LC #14 | Easy | String, Trie | **65.7%** |
| **08** | **Number of Islands** | LC #200 | Medium | 2D Grid DFS / BFS | **65.7%** |
| **09** | **Minimum Length of Anagram Concatenation** | LC #3138 | Medium | Hash Table, String, Counting | **62.0%** (Asked in Last 6 Mo) |
| **10** | **Find the Town Judge** | LC #997 | Easy | Graph Indegree / Array | **62.0%** |
| **11** | **Apply Operations to Make Sum >= k** | LC #3091 | Medium | Math, Greedy, Enumeration | **57.5%** |
| **12** | **Maximum Subarray (Kadane's)** | LC #53 | Medium | Array, Dynamic Programming | **57.5%** |
| **13** | **Climbing Stairs** | LC #70 | Easy | Math, Dynamic Programming | **57.5%** |
| **14** | **Merge Intervals** | LC #56 | Medium | Array, Sorting | **57.5%** |
| **15** | **Regular Expression Matching** | LC #10 | Hard | String, DP, Recursion | **51.8%** (Rare Hard) |
| **16** | **Find Duplicate File in System** | LC #609 | Medium | Hash Table, String Parsing | **51.8%** |
| **17** | **Longest Consecutive Sequence** | LC #128 | Medium | Hash Set, Array | **51.8%** |
| **18** | **Partition Array Into Three Parts With Equal Sum** | LC #1013 | Easy | Array, Greedy | **51.8%** |
| **19** | **Product of Array Except Self** | LC #238 | Medium | Prefix / Suffix Products | **51.8%** |
| **20** | **Max Vowels in a Substring of Given Length** | LC #1456 | Medium | Sliding Window, String | **51.8%** |
| **21** | **House Robber** | LC #198 | Medium | Dynamic Programming | **51.8%** |
| **22** | **Degree of an Array** | LC #697 | Easy | Hash Table, Array | **51.8%** |
| **23** | **Race Car** | LC #818 | Hard | Dynamic Programming, BFS | **43.7%** |
| **24** | **Jump Game** | LC #55 | Medium | Greedy, Dynamic Programming | **43.7%** |
| **25** | **Sum of Digit Differences of All Pairs** | LC #3153 | Medium | Array, Hash Table, Math | **43.7%** (2025/2026 Leaked) |
| **26** | **Subsequences That Satisfy Sum Condition** | LC #1498 | Medium | Two Pointers, Binary Search | **43.7%** |
| **27** | **Find All Anagrams in a String** | LC #438 | Medium | Sliding Window, Hash Table | **43.7%** |
| **28** | **Best Time to Buy and Sell Stock** | LC #121 | Easy | Array, One-Pass Greedy | **43.7%** |
| **29** | **Kth Largest Element in an Array** | LC #215 | Medium | Quickselect / Min-Heap | **43.7%** |
| **30** | **Maximum Repeating Substring** | LC #1668 | Easy | String Matching, DP | **43.7%** |
| **31** | **Spiral Matrix** | LC #54 | Medium | 2D Matrix, Simulation | **43.7%** |
| **32** | **Longest Palindromic Substring** | LC #5 | Medium | Two Pointers, DP | **43.7%** |
| **33** | **Consecutive Numbers (SQL)** | LC #180 | Medium | Window Functions / Self Join | **43.7%** |
| **34** | **Valid Palindrome** | LC #125 | Easy | Two Pointers, String | **43.7%** |
| **35** | **Longest Repeating Character Replacement** | LC #424 | Medium | Sliding Window, Hash Table | **43.7%** |
| **36** | **Group Anagrams** | LC #49 | Medium | Hash Table, Sorting | **43.7%** |
| **37** | **Reverse Only Letters** | LC #917 | Easy | Two Pointers, String | **43.7%** |
| **38** | **3Sum** | LC #15 | Medium | Two Pointers, Sorting | **43.7%** |
| **39** | **Minimum Operations to Make Word K-Periodic** | LC #3137 | Medium | Hash Table, Counting | **43.7%** (2025/2026 Leaked) |
| **40** | **First & Last Position in Sorted Array** | LC #34 | Medium | Binary Search | **43.7%** |
| **41** | **Operations to Satisfy Conditions** | LC #3122 | Medium | Dynamic Programming, Matrix | **43.7%** (2025/2026 Leaked) |
| **42** | **Longest Arithmetic Subsequence** | LC #1027 | Medium | DP, Hash Map | Asked in Last 6 Mo |
| **43** | **Ugly Number II** | LC #264 | Medium | Three Pointers, DP | Asked in Last 6 Mo |
| **44** | **Permutation Sequence** | LC #60 | Hard | Factorial Number System | Asked in Last 6 Mo |
| **45** | **Two Sum** | LC #1 | Easy | Hash Table | Universal Core |
| **46** | **First Unique Character in a String** | LC #387 | Easy | LinkedHashMap / Array | Rapid Screening Core |
| **47** | **Flatten Nested List Iterator** | LC #341 | Medium | Stack, Recursion | Rapid Screening Core |
| **48** | **Missing Number in 1..N** | LC #268 | Easy | Bitwise XOR / Gauss | Rapid Screening Core |
| **49** | **Merge Two Sorted Lists** | LC #21 | Easy | Linked List Two Pointers | Rapid Screening Core |
| **50** | **Minimum Cost Walk in Weighted Graph** | LC #3108 | Hard | DSU, Bitwise AND | Asked in Last 6 Mo |

---

## 🕵️ Insider Assessment Traps & Platform Rules (From Real Candidate Recordings)

### 1. The "Do Not Edit Main" Runner Rule
* In Turing's browser IDE, two classes are provided: `Main` (harness that parses `System.in` and prints formatted output) and `Solution` (your logic).
* **Never modify the `Main` class!** Doing so breaks the automated test runner and fails hidden test suites even if your algorithm is correct.

### 2. Production Scenario MCQ Traps in the 45-Minute Quiz
* **Flaky Unit Tests**: When 5 unit tests pass individually in isolation but fail randomly when run together as a suite $\rightarrow$ Root cause: **Shared mutable state** (static variables or un-reset Spring singletons across tests).
* **Time-Dependent Task Schedulers**: To unit-test a scheduler triggering at $t + x$ without slow `Thread.sleep()` pauses $\rightarrow$ Solution: **Inject `java.time.Clock`** and supply `Clock.fixed(...)` or `Clock.offset(...)` in tests.
* **Ordering Preservation**: When deduplicating or grouping ties, `HashSet` scrambles bucket order. Use **`LinkedHashSet` / `LinkedHashMap`** to preserve original first-appearance order.

### 3. Spring Boot 10-Second Defaults Cheat Sheet
| Category | Spring Boot Default | Crucial Interview Nuance |
|:---|:---|:---|
| **Minimum Java Version (Boot 3)** | **Java 17** | Java 8 and 11 are not supported in Spring Boot 3+ |
| **Default `JpaRepository` Impl** | **`SimpleJpaRepository`** | NOT `DefaultJpaRepository` or `CustomJpaRepository` |
| **Default `@Scheduled` Thread Pool** | **Single-threaded executor (1 thread)** | Scheduled jobs block each other unless a pool is configured |
| **Request Execution Pipeline** | **Filter $\rightarrow$ DispatcherServlet $\rightarrow$ Interceptor** | Filter is Servlet container; Interceptor is Spring MVC |
| **Interceptor Lifecycle Sequence** | **`preHandle` $\rightarrow$ `postHandle` $\rightarrow$ `afterCompletion`** | `preHandle` returns boolean; `afterCompletion` always runs |
| **Default Cache Provider** | **Simple in-memory (`ConcurrentHashMap`)** | Enabled with `@EnableCaching` |
| **Default Embedded Server & Logging**| **Apache Tomcat (8080) & Logback (SLF4J)** | Default JSON library is Jackson; static assets in `src/main/resources/static` |

---

## 📝 Turing Practice Question Bank (55 Questions Ingested)

The question bank contains **55 vetted Turing questions**, including all 25 code-snippet questions, all 5 official Work Experience Survey questions, DevOps/Git & Regex questions from Turing's test guide, real candidate scenario questions, and the official Basic Core Java, Back-End Architecture & Spring Boot Q&A across 6 distinct parts:

| Section | Questions | Core Traps & Concepts Covered |
|:---|:---:|:---|
| **Part 1: Core Java & JVM Internals** | Q1 – Q5, Q44, Q45, Q54 | String pool vs. heap, static method hiding, 5 JVM memory allocations (PC register, Heap, Metaspace, Stacks), ClassLoader parent delegation hierarchy, and omission of pointers. |
| **Part 2: Collections, Generics & Streams** | Q6 – Q10 | `HashMap` mutable key bucket traps, `Fail-Fast` `ConcurrentModificationException`, Stream lazy evaluation, `TreeSet` `Comparable` requirements, and `@FunctionalInterface` SAM rules (**Multi-Select**). |
| **Part 3: Concurrency, Exceptions & Serialization** | Q11 – Q15 | Instance vs. static `synchronized` monitors, `Thread.start()` vs. `run()`, `try-finally` return register caching, `transient` default deserialization, and `Runnable` vs. `Callable` (**Multi-Select**). |
| **Part 4: Spring Boot Core, DI & Configuration** | Q16 – Q20, Q50 | `@SpringBootApplication` bundle, `NoUniqueBeanDefinitionException` with `@Qualifier`/`@Primary` (**Multi-Select**), `CommandLineRunner` vs `ApplicationRunner.run(ApplicationArguments)`, and `@Value` vs. `@ConfigurationProperties` (**Multi-Select**). |
| **Part 5: Spring Web, Data JPA, Transactions & Testing** | Q21 – Q25, Q51 – Q53 | `@Transactional` self-invocation proxy bypass, `Propagation.NESTED` savepoints, `Page<T>` (count query) vs `Slice<T>` pagination, `@TransactionalEventListener(phase = AFTER_COMMIT)`, and `@Valid` + `BindingResult` parameter order. |
| **Part 6: Back-End Architecture, Distributed Systems & Vetting** | Q26 – Q43, Q46 – Q49, Q55 | Clustered vs Non-Clustered Indexes, Brewer's CAP Theorem ($CP$ vs $AP$), `PreparedStatement` AST SQL injection defense, Functional vs Acceptance Testing (UAT), Agile 3-part daily standups, and all 5 Seniority Survey questions. |

### 🔲 Single-Choice & Multi-Select ("Choose All That Apply") Support
* **Multi-Select Detection**: Turing uses both single-choice and multi-select prompts where options are worded similarly.
* Questions Q10, Q15, Q17, Q20, Q21, and Q24 automatically display the `Multi-Select (Choose All That Apply)` badge.
* You can select multiple options with visual checkboxes/highlights and verify your selections via the **"✓ Check Selected Answers"** button.

---

## 💡 MCQ Engine: Explanations on Demand & Study Mode

You requested being able to see explanations for correct answers as well as having options to inspect explanations whenever you want:
1. **Immediate Detailed Feedback on Every Answer**:
   - Whether you answer correctly or incorrectly, the app displays the **full conceptual breakdown** of why the right option is correct, why distractors are wrong, and what happens under the hood.
2. **"💡 Show / Hide Explanation" Button**:
   - Every question card features a one-click toggle to view the explanation and deep-dive guide at any time (even before answering).
3. **"📖 Study Mode (Always Show Explanations)" Toggle**:
   - Check this box at the top of the MCQ tab to review questions in open-book study mode.
4. **Deep-Dive Action Box**:
   - 🔭 Core Concept
   - 🧭 Rule-of-Thumb / Mental Model
   - 🔍 Exact Google / DevDocs Search Query with a `📋 Copy` button
   - 📚 Reference links (Baeldung, Turing Official Guides)
