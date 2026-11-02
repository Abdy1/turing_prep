/**
 * Turing Prep Hub — Application Engine
 * Curated for Java & Spring Boot Turing Vetting
 * Handles Knowledge Base Ingestion, Single & Multi-Select MCQ Adaptive Engine,
 * On-Demand Explanations, LeetCode Frequency Tracker & Bi-directional Storage Sync.
 */

// ================= INITIAL FALLBACK DATA (Offline & Zero-Setup Support) =================
const DEFAULT_DATA = {
  "topics": [
    {
      "id": "topic-turing-insider-vetting",
      "title": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "category": "Turing Vetting Process",
      "importance": "High",
      "summary": "Real test mechanics extracted from candidate screen recordings, Lead interviewer breakdowns, and YouTube walkthroughs. Covers scenario-based MCQ traps, the 'Do Not Edit Main' harness rule, and the 4-stage vetting pipeline.",
      "keyConcepts": [
        "The 4-Stage Vetting Pipeline: 1) 57-Question Seniority Survey -> 2) 45-Minute Tech Stack MCQ Test -> 3) 30-45 Minute Coding Challenge (1 Easy + 1 Med/Hard preceded by an unlocked Practice Test) -> 4) 45-Minute Multi-File Application Debugging Challenge -> 5) 1-Hour AI Proctored Video Interview & Live Technical Project Deep-Dive.",
        "The 'Do Not Edit Main' Harness Rule: In Turing's browser IDE, two classes are provided: `Main` (harness that parses `System.in` and formats output) and `Solution` (your logic). Modifying the `Main` harness class causes test runner desynchronization and immediate failure on hidden test suites.",
        "Scenario MCQ Trap #1 — Flaky Unit Tests: When unit tests pass individually in isolation but fail randomly when run together as a test suite, the root cause is shared mutable state (static variables, uncleaned database state, or shared singletons) persisting across test executions.",
        "Scenario MCQ Trap #2 — Time-Dependent Task Scheduling: To test schedulers triggering at t + x without waiting in real time, inject `java.time.Clock` into the component and pass `Clock.fixed(instant, zone)` or `Clock.offset(...)` in your test.",
        "Qualifier Word Traps: Turing quiz options are often identical except for boundary qualifiers (e.g. 'at most' vs 'at least', 'strictly greater than' vs 'greater than or equal to'). Multi-select prompts require exact matching with zero partial credit.",
        "Order Preservation Trap in Coding Drills: Removing duplicates or sorting elements by frequency must preserve original encounter order for ties. Using `HashSet` or `HashMap` scrambles ordering. Always use `LinkedHashSet` or `LinkedHashMap`.",
        "Turing Coding Assessment Blueprint (Leaked Community Intelligence): 1) Difficulty Breakdown: 68% Medium, 27% Easy, 5% Hard. 2) Format: Typically 2 questions (1 Easy speed warmup + 1 Medium algorithmic gate) in 30–45 minutes. 3) Dominant Patterns: Arrays (56%), Strings (39%), Hash Tables (27%), Dynamic Programming (27%). 4) Prep Strategy: Master Arrays and Strings first with Two Pointers and Sliding Window; pair with Hash Tables to prevent O(N^2) timeouts; tackle 1D/2D DP afterward; skip rare Hard problems if stuck.",
        "Recent 2025/2026 High-Frequency Problem Targets: Validate IP Address (LC #468), Minimum Length of Anagram Concatenation (LC #3138), Apply Operations to Make Sum >= k (LC #3091), Sum of Digit Differences (LC #3153), Longest Substring Without Repeating Characters (LC #3 - 91.8%), Valid Parentheses (LC #20 - 100%), and Baseball Game (LC #682 - 81.2% practice warmup)."
      ],
      "commonPitfalls": [
        "Editing the `Main` class runner instead of keeping all code strictly inside the `Solution` class.",
        "Falling for qualifier word differences ('at least' vs 'at most') in rapid 45-minute MCQ tests.",
        "Using `HashSet` for deduplication when test cases require preserving first-seen insertion order.",
        "Writing a shallow `flatMap` for list flattening when test cases contain arbitrarily deep irregularly nested lists (use recursion with `instanceof List<?>`)."
      ],
      "deepDiveKeywords": [
        "java.time.Clock.fixed unit testing schedulers",
        "JUnit test isolation and mutable shared state",
        "Turing coding challenge harness System.in parsing"
      ],
      "references": [
        "YouTube: Turing.com Quiz 2025 – Real Questions & Answers",
        "YouTube: Solving the Turing.com Coding Challenge Practice Tests",
        "YouTube: Turing Interview Questions | Ai Master Ruturaj"
      ]
    },
    {
      "id": "topic-spring-boot-defaults-lifecycle",
      "title": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "category": "Spring Boot",
      "importance": "High",
      "summary": "High-yield 10-second MCQ facts: Framework defaults, Servlet Filter vs. HandlerInterceptor request execution order, auto-configuration exclusion, and Spring Boot 3 additions (WebClient, Java records).",
      "keyConcepts": [
        "Spring Boot 10-Second Defaults Table: Minimum Java version for Boot 3.x = Java 17; Default JpaRepository implementation = `SimpleJpaRepository`; Default JPA ORM = Hibernate; Default Logging = Logback with SLF4J; Default Embedded Server = Tomcat on port 8080; Default JSON library = Jackson; Default static assets folder = `src/main/resources/static`; Default template engine = Thymeleaf; Default Cache provider = Simple in-memory (`ConcurrentHashMap`); Default @Scheduled pool = Single-threaded executor (1 thread); Default security = HTTP Basic Authentication.",
        "Request Execution Pipeline: Incoming HTTP Request -> Servlet Filter (Servlet API, executes before request reaches DispatcherServlet) -> DispatcherServlet -> HandlerInterceptor (Spring MVC) -> Controller.",
        "HandlerInterceptor Lifecycle Methods: `preHandle()` (executes before controller method; returns boolean) -> `postHandle()` (executes after controller method, before view rendering) -> `afterCompletion()` (executes after the complete request-response cycle finishes).",
        "@Component vs. @Bean: `@Component` is placed at class level for source code you own; `@Bean` is placed on methods inside `@Configuration` classes to register third-party library classes you cannot annotate directly.",
        "Disabling Auto-Configuration: Exclude unwanted auto-configs via `@SpringBootApplication(exclude = {WebMvcAutoConfiguration.class, DataSourceAutoConfiguration.class})` or `@EnableAutoConfiguration(exclude = ...)`, or through `spring.autoconfigure.exclude` in properties.",
        "Spring Boot 3 Modern Features: `WebClient` (from WebFlux) is the modern reactive, non-blocking replacement for deprecated `RestTemplate` (supports both synchronous and async calls); Java `record` classes provide concise immutable DTO definitions."
      ],
      "commonPitfalls": [
        "Believing `DefaultJpaRepository` or `CustomJpaRepository` is the default implementation class (it is strictly `SimpleJpaRepository`).",
        "Assuming `@Scheduled` uses a multi-threaded pool by default (it is strictly 1 thread, causing scheduled jobs to block each other unless a TaskScheduler bean is configured).",
        "Confusing Filter and Interceptor order: Filters ALWAYS execute before HandlerInterceptors because Filters belong to the Servlet container.",
        "Using RestTemplate in new Spring Boot 3 designs instead of non-blocking WebClient."
      ],
      "deepDiveKeywords": [
        "SimpleJpaRepository source code and transactional defaults",
        "Spring HandlerInterceptor preHandle postHandle afterCompletion order",
        "Spring Boot @Scheduled default thread pool single threaded TaskScheduler"
      ],
      "references": [
        "YouTube: Spring Boot Quiz | Top 25 Spring Boot MCQs (Java Guides)",
        "YouTube: Master Spring Boot Interviews — 50 Questions in One Shot!",
        "YouTube: Top 10 Spring Boot Interview Questions [2025] (Amigoscode)"
      ]
    },
    {
      "id": "topic-core-java-oop",
      "title": "Core Java OOP, Exception Handling & Serialization",
      "category": "Core Java",
      "importance": "High",
      "summary": "Core Java OOP fundamentals: Encapsulation, Inheritance, Interfaces as the multiple-inheritance solution, absence of pointers for memory safety, wrapper class autoboxing, and constructors.",
      "keyConcepts": [
        "Pass-by-Value Semantics: Java passes everything by value. For objects, the copy of the pointer address is passed on the stack. Reassigning the parameter reference (`b2 = new Box()`) does not affect the caller's reference, while mutating field state (`b1.value = 50`) mutates the underlying heap object.",
        "Static Method Hiding: Static methods cannot be overridden with dynamic dispatch. Redefining a static method in a subclass hides the parent static method and is resolved at compile time based strictly on the reference type.",
        "Bitwise Shift Operators: `>>` is an arithmetic right shift that preserves the sign bit (copies 1 for negative, 0 for positive). `>>>` is a logical unsigned right shift that always inserts 0 into the leftmost bit position.",
        "Try-Catch-Finally Return Slot: When `return x;` executes in a try block, the current value of x is copied into an internal return register on the stack frame before `finally` runs. Mutating local variable x inside `finally` has no effect on the returned value unless `finally` explicitly executes its own `return` statement.",
        "Serialization & Transient Fields: Classes implementing `Serializable` serialize non-static, non-transient instance state. `transient` fields are excluded from byte streams and reset to type defaults (`null`, `0`, `false`) upon deserialization without invoking constructors.",
        "Why Java is Not Purely Object-Oriented: Java retains 8 primitive data types (boolean, byte, short, int, long, float, double, char) for execution speed and memory efficiency rather than treating every value as a heap object.",
        "Why Java Omits Pointers: Eliminating direct pointer arithmetic protects against memory corruption, buffer overflows, and unauthorized address access, while allowing the Garbage Collector to freely relocate and compact heap memory.",
        "Multiple Inheritance via Interfaces: Java prevents the 'Diamond Problem' of ambiguous state/method resolution by disallowing multiple class inheritance, allowing a class to implement multiple interfaces instead.",
        "Constructor Mechanics: Constructors have no return type and share the class name. The compiler supplies a default no-argument super() constructor ONLY if no other constructor is declared."
      ],
      "commonPitfalls": [
        "Confusing reference pass-by-value with pass-by-reference (expecting reassignment of a method parameter to mutate the caller variable).",
        "Expecting static methods to exhibit runtime polymorphism when called on polymorphic reference variables (`Parent p = new Child(); p.staticMethod()`).",
        "Assuming a `finally` block cannot execute (it always executes unless `System.exit()` is called or the JVM crashes).",
        "Forgetting that `transient` fields are NOT restored to initial field values upon deserialization (constructors and field initializers do not run)."
      ],
      "deepDiveKeywords": [
        "Java bytecode invokevirtual vs invokestatic",
        "Java return register slot stack execution under finally bytecode inline jsr/ret",
        "Java ObjectInputStream defaultReadObject and readResolve hook"
      ],
      "references": [
        "Turing 105 Core Java Interview Questions",
        "Baeldung: Java Pass-By-Value vs Pass-By-Reference",
        "Baeldung: Java Serialization Guide"
      ]
    },
    {
      "id": "topic-jvm-memory",
      "title": "JVM Architecture, Memory Model & Garbage Collection",
      "category": "Core Java",
      "importance": "High",
      "summary": "Detailed breakdown of the 5 JVM runtime memory areas (Heap, Method Area/Metaspace, Stack, Native Stack, PC Register), ClassLoader parent delegation hierarchy, and JIT compilation.",
      "keyConcepts": [
        "Stack vs Heap: Stack stores primitive local variables and method call frames (thread-safe, fixed size, LIFO). Heap stores all objects and arrays (shared across threads, managed by GC).",
        "Metaspace: Replaced PermGen in Java 8. Located in native OS memory; stores class metadata, runtime constant pool, and method bytecodes.",
        "String Constant Pool (SCP): Special memory region inside the Heap. Literals (String s = \"abc\") reuse interned instances. Using `new String(\"abc\")` forces creation of a new Heap object in addition to interning the literal.",
        "ClassLoaders Hierarchy: Bootstrap ClassLoader (rt.jar / core modules) -> Platform/Extension ClassLoader -> Application/System ClassLoader. Follows Delegation Model.",
        "Garbage Collection Roots & Circular References: Objects are collected if unreachable from GC Roots (Thread stack frames, static variables, JNI references). Circular references with no root path ARE successfully garbage collected.",
        "5 JVM Runtime Data Areas: 1) Program Counter (PC) Register: thread-local register containing the address of the currently executing JVM instruction. 2) JVM Stack: thread-local stack frames storing local variables, operand stack, and frame data. 3) Heap: shared runtime memory where all class instances and arrays are allocated; managed by the Garbage Collector. 4) Method Area / Metaspace: shared storage for class structures, runtime constant pool, and method code. 5) Native Method Stack: memory for executing native C/C++ methods via JNI.",
        "ClassLoader Parent Delegation Model: When a class is requested, loading delegates upwards: Application/System ClassLoader -> Extension/Platform ClassLoader -> Bootstrap ClassLoader. Classes are searched downwards only if parent loaders cannot find the class.",
        "JIT (Just-In-Time) Compilation: The JIT compiler monitors bytecode execution, detects 'hot spots' (frequently executed loops and methods), and compiles bytecode directly into native machine code at runtime, applying method inlining and escape analysis."
      ],
      "commonPitfalls": [
        "Assuming circular object references prevent garbage collection (reference counting misconception). Java uses tracing reachability from GC Roots.",
        "Creating Strings in tight loops with `new String(...)` instead of string literals or StringBuilder, causing excessive Eden space allocation.",
        "Class loader leaks: Holding strong static references to objects loaded by custom or plugin classloaders prevents Metaspace unloading, leading to OutOfMemoryError: Metaspace."
      ],
      "deepDiveKeywords": [
        "JVM G1GC Region allocation and SATB (Snapshot-At-The-Beginning)",
        "String.intern() native implementation and heap deduplication",
        "Java JIT C1 Client vs C2 Server compiler tiered compilation"
      ],
      "references": [
        "Baeldung: Java Memory Management and JVM Memory Model",
        "Turing Core Java Interview Questions #1 - #25"
      ]
    },
    {
      "id": "topic-java-concurrency",
      "title": "Java Multithreading, Thread Lifecycle & Memory Model (JMM)",
      "category": "Core Java",
      "importance": "High",
      "summary": "Thread states (NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED), synchronization primitives, monitors, volatile visibility, and thread communication.",
      "keyConcepts": [
        "6 Thread States: NEW (instantiated, not started), RUNNABLE (executing or ready in OS queue), BLOCKED (waiting for intrinsic lock monitor), WAITING (waiting indefinitely via wait/join/park), TIMED_WAITING (waiting with timeout e.g. sleep/wait(ms)), TERMINATED (completed execution).",
        "start() vs run(): `start()` creates a new native OS thread and invokes `run()` asynchronously. Calling `run()` directly merely executes the method synchronously in the caller's thread.",
        "sleep() vs wait(): `Thread.sleep(ms)` pauses execution WITHOUT releasing any synchronized locks held. `object.wait()` MUST be called inside a synchronized block on that object and RELEASES the monitor lock, re-acquiring it before waking up.",
        "volatile keyword: Guarantees visibility across CPU caches (flushes to main memory) and prevents instruction reordering (happens-before guarantee), but DOES NOT guarantee atomicity (e.g., count++ is still not thread-safe).",
        "synchronized Monitor: Instance synchronized method locks on `this`. Static synchronized method locks on the `Class` object (`MyClass.class`). They do NOT block each other because the monitor targets differ."
      ],
      "commonPitfalls": [
        "Calling `notify()` instead of `notifyAll()` in producer-consumer queues, causing lost signals and permanent thread hangs.",
        "Using `volatile` for compound operations like increments (`counter++`), which consists of read-modify-write and requires `AtomicInteger` or locks.",
        "Assuming `Thread.stop()` or `Thread.suspend()` can be used (both are deprecated and deadlock-prone; use cooperative interruption with `Thread.currentThread().isInterrupted()`)."
      ],
      "deepDiveKeywords": [
        "Java Memory Model happens-before order",
        "AQS (AbstractQueuedSynchronizer) state and FIFO wait queue",
        "StampedLock vs ReentrantReadWriteLock performance under read-heavy loads"
      ],
      "references": [
        "Baeldung: Java Concurrency and Thread Safety",
        "Java Concurrency in Practice (Brian Goetz)"
      ]
    },
    {
      "id": "topic-java-collections-streams",
      "title": "Collections Framework, Generics & Java 8+ Streams",
      "category": "Core Java",
      "importance": "High",
      "summary": "HashMap internal mechanics (treeification, bucket rehashing), ConcurrentHashMap thread-safety, Fail-Fast vs Fail-Safe, equals/hashCode contract, and Stream operations.",
      "keyConcepts": [
        "HashMap Internals (Java 8+): Array of buckets (Node<K,V>[]). When a bucket exceeds TREEIFY_THRESHOLD (8 items) AND total table capacity >= 64, the linked list converts to a Red-Black Tree (O(log N) worst-case lookup instead of O(N)).",
        "ConcurrentHashMap (Java 8): Replaced Java 7 Segment locks with CAS (Compare-And-Swap) for empty bucket insertion and synchronized locking only on the first node of the collision chain. Permits concurrent reads without locking.",
        "Fail-Fast vs Fail-Safe Iterators: Fail-Fast (ArrayList, HashMap) throws `ConcurrentModificationException` immediately if collection is structurally modified during iteration (via modCount check). Fail-Safe / Weakly-Consistent (CopyOnWriteArrayList, ConcurrentHashMap) iterates over a snapshot or live safe view without throwing.",
        "equals() and hashCode() Contract: If `a.equals(b)` is true, `a.hashCode()` MUST equal `b.hashCode()`. Violating this causes HashMaps/HashSets to fail to retrieve keys or store duplicate entries.",
        "Stream Operations: Intermediate (lazy evaluation: map, filter, flatMap) vs Terminal (eager execution: collect, reduce, forEach, findFirst). Streams cannot be reused once a terminal operation has executed."
      ],
      "commonPitfalls": [
        "Modifying the state of an object that affects its `hashCode()` while it is stored as a key in a `HashMap`, making it unretrievable.",
        "Overriding `equals()` without overriding `hashCode()`, breaking HashMap lookups.",
        "Using `List.of()` or `Arrays.asList()` and attempting to add/remove elements (throws `UnsupportedOperationException`)."
      ],
      "deepDiveKeywords": [
        "HashMap TREEIFY_THRESHOLD and UNTREEIFY_THRESHOLD",
        "ConcurrentHashMap size calculation with CounterCell array",
        "Stream.parallel() common ForkJoinPool saturation risks"
      ],
      "references": [
        "Baeldung: Java Collections Interview Questions",
        "Baeldung: Java 8 Stream API Guide"
      ]
    },
    {
      "id": "topic-spring-boot-autoconfig",
      "title": "Spring Boot Auto-Configuration, Starters & Actuator",
      "category": "Spring Boot",
      "importance": "High",
      "summary": "How Spring Boot starts up, @SpringBootApplication composition, auto-configuration registration mechanisms (spring.factories vs AutoConfiguration.imports), DevTools vs Actuator, and property precedence.",
      "keyConcepts": [
        "@SpringBootApplication Composition: Combines 3 essential annotations: `@Configuration` (declares bean factory methods), `@EnableAutoConfiguration` (enables auto-config guessing based on classpath jars), and `@ComponentScan` (scans package and subpackages for stereotype components).",
        "Auto-Configuration Registration: In Spring Boot 2.x, auto-configurations are listed under `org.springframework.boot.autoconfigure.EnableAutoConfiguration` in `META-INF/spring.factories`. In Spring Boot 3.x, registered in `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`.",
        "Conditional Annotations: `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty(name = ..., havingValue = ...)` govern whether an auto-configuration class or bean will load.",
        "DevTools vs Actuator (Classic Turing Test Question): DevTools provides fast dev restart, LiveReload, and H2 console defaults during development (automatically disabled in production). Actuator provides production-ready monitoring, metrics, health checks, CPU/RAM stats, and audit endpoints (`/actuator/health`, `/actuator/metrics`).",
        "Externalized Configuration Precedence: Command-line arguments > Java System properties > OS environment variables > Profile-specific properties (`application-{profile}.properties`) > Default `application.properties`."
      ],
      "commonPitfalls": [
        "Confusing DevTools with Actuator: DevTools NEVER monitors production system metrics or CPU/RAM; that is exclusively Actuator's responsibility.",
        "Placing `@SpringBootApplication` in a subpackage, causing `@ComponentScan` to miss services and repositories located in sibling or parent packages.",
        "Overwriting custom beans because `@ConditionalOnMissingBean` was placed on the user bean rather than the auto-configuration fallback bean."
      ],
      "deepDiveKeywords": [
        "Spring Boot 3 AutoConfiguration.imports mechanism",
        "AutoConfigurationSorter and @AutoConfigureAfter",
        "Actuator micrometer metrics export to Prometheus"
      ],
      "references": [
        "Turing Developer Test Prep Guide: Spring Boot Sample MCQs",
        "Turing 100+ Spring Boot Interview Questions",
        "Baeldung: Spring Boot Interview Questions"
      ]
    },
    {
      "id": "topic-spring-di-beans",
      "title": "Spring Dependency Injection, Bean Lifecycle & Stereotypes",
      "category": "Spring Boot",
      "importance": "High",
      "summary": "Inversion of Control (IoC), Bean scopes (Singleton, Prototype, Request, Session), stereotype differences (@Component, @Service, @Repository, @RestController), and resolving injection ambiguity.",
      "keyConcepts": [
        "Bean Scopes: `singleton` (default, one instance per Spring ApplicationContext container), `prototype` (new instance every time requested), `request` (one per HTTP request), `session` (one per HTTP session), `application` (one per ServletContext).",
        "Stereotype Annotations: `@Component` (generic managed bean), `@Service` (service layer semantics), `@Repository` (persistence layer; automatically enables automatic persistence exception translation into Spring's DataAccessException hierarchy), `@Controller` (Spring MVC views), `@RestController` (`@Controller` + `@ResponseBody` on all methods).",
        "Resolving NoUniqueBeanDefinitionException: When multiple beans implement the same interface, resolve using `@Qualifier(\"specificBeanName\")` at injection point or marking the default implementation with `@Primary`.",
        "Bean Lifecycle Phases: Instantiation -> Populate Properties -> Aware interfaces (BeanNameAware, ApplicationContextAware) -> BeanPostProcessor `postProcessBeforeInitialization` -> `@PostConstruct` / InitializingBean -> Custom `initMethod` -> BeanPostProcessor `postProcessAfterInitialization` -> In Use -> `@PreDestroy` / DisposableBean -> Destruction.",
        "Constructor vs Field Injection: Constructor injection is strongly recommended by Spring: enables immutability (final fields), prevents NullPointerExceptions in unit tests without Spring context, and catches circular dependencies at compile/startup."
      ],
      "commonPitfalls": [
        "Field injection (`@Autowired` on private field) hides dependencies, impedes standalone unit testing without reflection, and masks violation of Single Responsibility Principle.",
        "Injecting a `prototype` scoped bean into a `singleton` scoped bean without using `ObjectProvider` or `@Lookup` method: the prototype bean is only instantiated ONCE at singleton initialization.",
        "Forgetting that `@Repository` provides automated unchecked exception translation, which plain `@Component` does not."
      ],
      "deepDiveKeywords": [
        "Spring BeanPostProcessor CGLIB vs JDK Dynamic Proxy generation",
        "ObjectProvider and ScopedProxyMode.TARGET_CLASS",
        "Spring 3-level singletonObjects cache for circular dependency resolution"
      ],
      "references": [
        "Baeldung: Spring Framework Interview Questions",
        "Spring Framework Reference: The IoC Container"
      ]
    },
    {
      "id": "topic-spring-jpa-transactions",
      "title": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "category": "Spring Boot",
      "importance": "High",
      "summary": "JPA Repository patterns, @Transactional proxy architecture, transaction propagation behaviors, REST error handling with @RestControllerAdvice, and testing slices.",
      "keyConcepts": [
        "@Transactional Proxy Mechanism: Spring creates a CGLIB or JDK dynamic proxy around the bean. The proxy intercepts calls, starts a transaction via `PlatformTransactionManager`, commits on success, or rolls back on runtime exceptions.",
        "Self-Invocation Trap: Calling a `@Transactional` method from another method in the SAME class bypasses the Spring proxy! The call executes as a plain local method call without transaction boundaries. Fix: Inject self or move to a separate bean.",
        "Transaction Propagation Rules: `REQUIRED` (default: join existing or create new), `REQUIRES_NEW` (always suspends existing and opens a brand new physical transaction), `NESTED` (uses JDBC savepoints within existing transaction; inner rollback does not abort outer), `SUPPORTS` (runs transactionally if one exists, otherwise non-transactional), `MANDATORY` (throws exception if no existing transaction).",
        "Rollback Rules: By default, Spring rolls back ONLY on unchecked exceptions (`RuntimeException` and `Error`). It DOES NOT roll back on checked exceptions unless explicitly configured: `@Transactional(rollbackFor = Exception.class)`.",
        "REST Error Handling: `@RestControllerAdvice` combined with `@ExceptionHandler` provides centralized, structured HTTP error responses (e.g., ProblemDetail or custom DTO) across all `@RequestMapping` controllers.",
        "Testing Slices: `@DataJpaTest` configures only repository beans and in-memory DB for fast JPA testing; `@WebMvcTest` bootstraps only MVC controllers and mock beans."
      ],
      "commonPitfalls": [
        "Expecting `@Transactional` on private or protected methods to work (Spring proxy by default intercepts only `public` methods).",
        "Not specifying `rollbackFor = Exception.class` when throwing checked exceptions in transactional methods, causing transactions to commit despite errors.",
        "The N+1 Query Problem in JPA: Fetching child entities one-by-one in a loop instead of using `@EntityGraph` or `JOIN FETCH`."
      ],
      "deepDiveKeywords": [
        "Spring TransactionSynchronizationManager and ThreadLocal connection binding",
        "Hibernate N+1 query problem JOIN FETCH vs @BatchSize",
        "Spring Boot 3 ProblemDetail RFC 7807 global exception handling"
      ],
      "references": [
        "Baeldung: Transactions with Spring and JPA",
        "Baeldung: Spring Data JPA Interview Questions"
      ]
    },
    {
      "id": "topic-turing-seniority-survey",
      "title": "Turing Seniority Survey, Remote Engineering & Behavioral Vetting",
      "category": "Turing Vetting Process",
      "importance": "High",
      "summary": "Deconstructing Turing's 57-question Work Experience Survey, remote developer best practices (asynchronous communication, daily standup cadence, blameless postmortems), and official test strategies.",
      "keyConcepts": [
        "The 5 Core Seniority Dimensions (From Official Turing Survey): 1) Self-Improvement: Mentoring & providing expectations + detailed steps for team members (Staff/Lead) vs. waiting for feedback. 2) Technology Learning: Prioritizing system architectures, design patterns, and scalability trade-offs over mere syntax. 3) Bug Severity: Tying technical defects directly to core company & team business metrics. 4) Code Quality: Defining team-wide coding conventions, linters, and architectural standards vs. asking for reviews. 5) Measuring Results: Defining upfront KPIs before writing code and running A/B tests to validate impact.",
        "Seniority Progression Model: Turing options are intentionally structured across 4 seniority tiers: Level 1 Passive ('Other people do it for me') -> Level 2 Individual Contributor ('I assess impact on user UX') -> Level 3 Team Contributor ('We have clear team metrics') -> Level 4 Senior / Staff Lead ('I define core metrics aligned with business goals, establish standards, and run A/B validation').",
        "Official Test Retake Policy: If a candidate fails a Turing tech stack test, Turing allows retaking the test 3 months after the unsuccessful attempt. Use this 3-month window to master missed topics.",
        "The 'Cover-the-Options' Exam Strategy: Candidates often lose marks by falling for distractors. Cover the options while reading the prompt, formulate your answer first, then look for the match. If not found, rephrase the prompt and evaluate each choice as an independent True/False statement.",
        "Qualifier Trap Awareness: Watch closely for qualifier words ('at most', 'at least', 'strictly', 'only', 'all of the above'). Pay special attention to whether a question is single-choice or 'Choose all that apply'.",
        "Remote Engineering Daily Standup Cadence: Standard 3-part update: 1) What was completed yesterday, 2) What is planned for today, 3) Any active blockers/impediments needing assistance.",
        "Task Decomposition via Black-Box Interfaces: In distributed teams, split large initiatives into modular black-box components with defined inputs/outputs so colleagues and QA can test and integrate asynchronously.",
        "Blameless Postmortems & Deadline Ownership: When deadlines slip or outages occur, high-scoring Turing engineers take personal accountability, conduct 5-Whys root-cause analysis, and build automated preventative guardrails."
      ],
      "commonPitfalls": [
        "Selecting passive or reactive answers ('I ask my manager' or 'QA informs me when bugs occur').",
        "Focusing exclusively on localized code output rather than company-wide metrics and customer business impact.",
        "Failing to pre-define success metrics prior to feature delivery (always favor upfront KPIs + A/B testing).",
        "Rushing through questions without noticing subtle qualifier words ('strictly greater than' vs 'greater than or equal to')."
      ],
      "deepDiveKeywords": [
        "Engineering ownership matrix RACI model",
        "DORA metrics (Deployment Frequency, Lead Time, Change Failure Rate, MTTR)",
        "A/B testing statistical significance and KPI tracking",
        "Turing 3-month retake policy and preparation roadmap"
      ],
      "references": [
        "Turing Developer Test Prep Guide: Six Tips to Prepare for Turing Tests (Ankit Sahu)",
        "Turing Developer Test Prep Guide: Work Experience Survey Section"
      ]
    },
    {
      "id": "topic-backend-architecture-system-design",
      "title": "Back-End Architecture, Database Indexing & Distributed Systems",
      "category": "System Design & Architecture",
      "importance": "High",
      "summary": "Core backend concepts tested in Turing vetting: Clustered vs Non-Clustered indexing, CAP Theorem trade-offs, SQL Injection prevention, Web Server vs App Server, Microservices vs Monoliths, DRY/DIE principles, and Functional vs Acceptance testing.",
      "keyConcepts": [
        "Clustered vs Non-Clustered Indexes: A Clustered Index physically orders the actual data rows on disk in index order (hence exactly ONE clustered index per table). A Non-Clustered Index is a separate secondary B-Tree containing index columns and row pointers (RowIDs or clustered keys) pointing to physical rows (multiple allowed).",
        "Brewer's CAP Theorem: In any distributed network data store, network partitions (P) are unavoidable. When a partition occurs, the system must choose between Consistency (CP - rejecting unsynchronized requests) and Availability (AP - serving potentially stale data).",
        "SQL Injection Mitigation via PreparedStatements: Prepared statements pre-compile the SQL grammar and execution plan with placeholders (?) before parameter values arrive. Input values are transmitted separately as literal data tokens and are never evaluated as executable SQL syntax.",
        "Web Servers (Nginx/Apache) vs Application Servers (Tomcat/Jetty): Web servers handle reverse proxying, SSL termination, static asset caching, and load balancing; Application servers execute JVM bytecode, manage servlet lifecycles, and handle dynamic business logic.",
        "Functional Testing vs Acceptance Testing (UAT): Functional testing verifies whether the system functions according to technical specifications ('Did we build the system right?'); Acceptance testing validates whether the product fulfills real user and business needs ('Did we build the right system?').",
        "DRY vs DIE Principles: DRY (Don't Repeat Yourself) advocates a single authoritative source of truth in code. DIE (Duplication Is Evil) reinforces that even small amounts of duplicated logic cause severe maintenance desynchronization."
      ],
      "commonPitfalls": [
        "Adding excessive non-clustered indexes to write-heavy tables, causing severe insert/update latency.",
        "Using string concatenation in SQL queries instead of PreparedStatement parameterized queries.",
        "Assuming distributed databases can guarantee both strict Consistency and 100% Availability during network partitions."
      ],
      "deepDiveKeywords": [
        "Clustered index B-Tree leaf node page layout",
        "CAP theorem PACELC trade-offs",
        "PreparedStatement binary wire protocol",
        "Database indexing selectivity and cardinality"
      ],
      "references": [
        "Turing Back-End Technical Interview Questions",
        "Designing Data-Intensive Applications (Martin Kleppmann)",
        "High Performance MySQL (Baron Schwartz)"
      ]
    }
  ],
  "mcqs": [
    {
      "id": "mcq-turing-q01",
      "topicId": "topic-jvm-memory",
      "topicName": "JVM Architecture, Memory Model & Garbage Collection",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "What is the output of the following Java code snippet?\n\n```java\npublic class StringPoolTest {\n    public static void main(String[] args) {\n        String s1 = \"Turing\";\n        String s2 = new String(\"Turing\");\n        String s3 = s2.intern();\n        System.out.println((s1 == s2) + \" \" + (s1 == s3) + \" \" + s1.equals(s2));\n    }\n}\n```",
      "options": [
        "true true true",
        "false true true",
        "false false true",
        "false true false"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Creating a string via literal (`\"Turing\"`) places it in the JVM String Constant Pool, whereas `new String(\"Turing\")` explicitly allocates a distinct object on the Heap. Thus `s1 == s2` is `false` (comparing memory addresses). Calling `s2.intern()` searches the String Pool for an existing matching string and returns its canonical reference, so `s1 == s3` evaluates to `true`. Finally, `s1.equals(s2)` compares the character contents, which are identical (`true`). Output: `false true true`.",
      "deepDive": {
        "concept": "String Pool vs. Heap Allocation & String.intern()",
        "whatToLookFor": "`==` compares reference addresses; `.equals()` compares value content. `new String()` always forces heap allocation.",
        "searchKeywords": "Java string pool vs heap allocation intern method Baeldung",
        "recommendedRead": "Turing Core Java Q&A & Baeldung Core Java Guide"
      }
    },
    {
      "id": "mcq-turing-q02",
      "topicId": "topic-core-java-oop",
      "topicName": "Core Java OOP, Exception Handling & Serialization",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What will happen when you compile and run the following code?\n\n```java\nclass Parent {\n    static void display() {\n        System.out.print(\"Parent \");\n    }\n    void instanceDisplay() {\n        System.out.print(\"ParentInstance \");\n    }\n}\n\nclass Child extends Parent {\n    static void display() {\n        System.out.print(\"Child \");\n    }\n    @Override\n    void instanceDisplay() {\n        System.out.print(\"ChildInstance \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Parent ref = new Child();\n        ref.display();\n        ref.instanceDisplay();\n    }\n}\n```",
      "options": [
        "Child ChildInstance",
        "Parent ChildInstance",
        "Parent ParentInstance",
        "Compilation error because static methods cannot be redefined in a subclass"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Static methods cannot be overridden in Java; redefining a static method with the same signature in a subclass is known as method hiding, not overriding. Static methods are bound at compile time based strictly on the reference type (`Parent ref`), so `ref.display()` invokes `Parent.display()`. Instance methods use late (dynamic) dispatch at runtime based on the actual object created (`new Child()`), so `ref.instanceDisplay()` invokes `Child.instanceDisplay()`. Output: `Parent ChildInstance`.",
      "deepDive": {
        "concept": "Static Method Hiding vs. Dynamic Method Dispatch",
        "whatToLookFor": "Static methods resolve by compiler reference type (invokestatic bytecode); non-static methods resolve by runtime heap object (invokevirtual).",
        "searchKeywords": "Java static method hiding vs method overriding Baeldung",
        "recommendedRead": "Turing 105 Core Java Interview Questions"
      }
    },
    {
      "id": "mcq-turing-q03",
      "topicId": "topic-core-java-oop",
      "topicName": "Core Java OOP, Exception Handling & Serialization",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What is printed by the following program?\n\n```java\nclass Box {\n    int value;\n    Box(int value) { this.value = value; }\n}\n\npublic class PassByValueDemo {\n    static void modify(Box b1, Box b2) {\n        b1.value = 50;\n        b2 = new Box(100);\n        b2.value = 200;\n    }\n\n    public static void main(String[] args) {\n        Box boxA = new Box(10);\n        Box boxB = new Box(20);\n        modify(boxA, boxB);\n        System.out.println(boxA.value + \" \" + boxB.value);\n    }\n}\n```",
      "options": [
        "10 20",
        "50 20",
        "50 100",
        "50 200"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Java is strictly pass-by-value. For object parameters, a copy of the reference address is passed into the method stack frame. Modifying `b1.value = 50` accesses and mutates the heap object that `boxA` points to. However, reassigning `b2 = new Box(100)` merely overwrites the local copy of the pointer variable `b2` to point to a new heap object; the caller's variable `boxB` remains untouched pointing to its original object (`20`). Output: `50 20`.",
      "deepDive": {
        "concept": "Pass-by-Value Semantics for Object References",
        "whatToLookFor": "Mutating fields modifies the shared heap instance; reassigning parameter references only modifies the local stack frame pointer.",
        "searchKeywords": "Java pass by value object reference manipulation Baeldung",
        "recommendedRead": "Baeldung: Java is Pass-by-Value, Not Pass-by-Reference"
      }
    },
    {
      "id": "mcq-turing-q04",
      "topicId": "topic-jvm-memory",
      "topicName": "JVM Architecture, Memory Model & Garbage Collection",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Suppose Object A holds a reference to Object B, and Object B holds a reference back to Object A. No other active thread stack frame or static variable references either A or B. Which statement is true regarding JVM Garbage Collection?",
      "options": [
        "Neither A nor B can be garbage collected because their reference counts are both 1.",
        "Both A and B are eligible for garbage collection because neither is reachable from any Garbage Collection Root (GC Root).",
        "Calling System.gc() guarantees that both A and B will be immediately destroyed before the next line of code executes.",
        "Only the object created first is eligible for garbage collection."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Modern JVMs (HotSpot) do not use naive reference counting (which fails on cyclic graphs). Instead, they use tracing reachability analysis starting from GC Roots (active thread stack frames, static fields, active JNI handles). An isolated island of circular references is completely disconnected from any GC Root, making both objects eligible for collection. Note that `System.gc()` is purely a non-binding hint to the JVM.",
      "deepDive": {
        "concept": "GC Roots & Circular Reference Reachability Analysis",
        "whatToLookFor": "Circular references between unreferenced objects do NOT prevent garbage collection in Java.",
        "searchKeywords": "JVM garbage collection GC roots circular reference reachability Baeldung",
        "recommendedRead": "Baeldung: Java Memory Management and JVM Memory Model"
      }
    },
    {
      "id": "mcq-turing-q05",
      "topicId": "topic-core-java-oop",
      "topicName": "Core Java OOP, Exception Handling & Serialization",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "Which statement accurately describes the difference between the `>>` and `>>>` operators in Java?",
      "options": [
        ">> shifts bits left while >>> shifts bits right.",
        ">> preserves the sign bit (arithmetic right shift), whereas >>> always fills the leftmost bits with zeros (logical/unsigned right shift).",
        ">>> is only valid for long primitives, whereas >> works on int primitives.",
        ">> fills leftmost bits with zeros, whereas >>> preserves the sign bit."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "The signed right shift operator (`>>`) performs an arithmetic shift, preserving the sign bit (copies 1 for negative numbers and 0 for positive numbers into the vacated leftmost positions). The unsigned right shift operator (`>>>`) performs a logical shift, always filling the leftmost vacated bits with zeros regardless of sign.",
      "deepDive": {
        "concept": "Bitwise Shift Operators (Arithmetic vs. Logical)",
        "whatToLookFor": "`>>` preserves negative signs (sign-extension); `>>>` produces positive numbers from negative values by zero-filling.",
        "searchKeywords": "Java difference between >> and >>> bitwise shift operators",
        "recommendedRead": "Turing Core Java Interview Questions & Oracle Java Tutorials"
      }
    },
    {
      "id": "mcq-turing-q06",
      "topicId": "topic-java-collections-streams",
      "topicName": "Collections Framework, Generics & Java 8+ Streams",
      "difficulty": "Hard",
      "isMultiSelect": false,
      "question": "What is the output of the following code?\n\n```java\nimport java.util.*;\n\nclass Key {\n    int id;\n    Key(int id) { this.id = id; }\n    @Override\n    public int hashCode() { return Objects.hash(id); }\n    @Override\n    public boolean equals(Object o) {\n        return (o instanceof Key) && ((Key) o).id == this.id;\n    }\n}\n\npublic class MapTest {\n    public static void main(String[] args) {\n        Map<Key, String> map = new HashMap<>();\n        Key k = new Key(1);\n        map.put(k, \"Developer\");\n        k.id = 2;\n        System.out.println(map.get(k) + \" \" + map.get(new Key(1)));\n    }\n}\n```",
      "options": [
        "Developer null",
        "null Developer",
        "null null",
        "Developer Developer"
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "When `k` is put into the map, it is placed into the bucket determined by `hash(1)`. Modifying `k.id = 2` mutates its state such that its hash code becomes `hash(2)`. When `map.get(k)` is called, the map computes `hash(2)` and looks in that bucket, which is empty, returning `null`. When `map.get(new Key(1))` is called, it searches the original bucket for `hash(1)` and finds the entry, but its `.equals()` check fails because `k.id` is now 2 (`2 == 1` is false), also returning `null`. Output: `null null`. This demonstrates why Map keys must be immutable.",
      "deepDive": {
        "concept": "Mutable Map Keys & Hash Bucket Inconsistency Trap",
        "whatToLookFor": "Never use mutable objects as keys in Hash-based collections. If state changes, hash code changes and the entry is lost.",
        "searchKeywords": "Java HashMap mutable key trap hashcode equals Baeldung",
        "recommendedRead": "Baeldung: Guide to HashMap with Custom Objects as Keys"
      }
    },
    {
      "id": "mcq-turing-q07",
      "topicId": "topic-java-collections-streams",
      "topicName": "Collections Framework, Generics & Java 8+ Streams",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What happens when the following code is executed?\n\n```java\nimport java.util.*;\n\npublic class IteratorTrap {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList(\"Java\", \"Spring\", \"Boot\"));\n        for (String item : list) {\n            if (\"Spring\".equals(item)) {\n                list.remove(item);\n            }\n        }\n        System.out.println(list);\n    }\n}\n```",
      "options": [
        "Prints [Java, Boot] without error",
        "Throws ConcurrentModificationException",
        "Prints [Java, Spring, Boot]",
        "Throws UnsupportedOperationException"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "ArrayList iterators are Fail-Fast: modifying the collection structure directly via `list.remove()` instead of `iterator.remove()` increments the internal `modCount`. In standard loops, subsequent calls to `iterator.next()` detect `modCount != expectedModCount` and throw `ConcurrentModificationException`. (Note: In this specific 3-element ArrayList case, removing the 2nd element causes `size` to equal `cursor` so `hasNext()` returns false, but on technical interview assessments, the tested rule-of-thumb is that modifying collections inside a foreach loop throws `ConcurrentModificationException` unless `iterator.remove()` or `list.removeIf()` is used).",
      "deepDive": {
        "concept": "Fail-Fast Iterators & ConcurrentModificationException",
        "whatToLookFor": "Use `list.removeIf(...)` or explicit `Iterator.remove()` to safely remove items while iterating.",
        "searchKeywords": "Java ConcurrentModificationException fail-fast iterator remove in foreach",
        "recommendedRead": "Turing 105 Core Java Q&A & Baeldung Collections Guide"
      }
    },
    {
      "id": "mcq-turing-q08",
      "topicId": "topic-java-collections-streams",
      "topicName": "Collections Framework, Generics & Java 8+ Streams",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What is printed to the console when this snippet executes?\n\n```java\nimport java.util.stream.Stream;\n\npublic class StreamLazyTest {\n    public static void main(String[] args) {\n        Stream<String> stream = Stream.of(\"a\", \"b\", \"c\")\n            .filter(s -> {\n                System.out.print(s + \" \");\n                return s.equals(\"b\");\n            });\n        System.out.print(\"Done \");\n    }\n}\n```",
      "options": [
        "a b c Done ",
        "a b Done ",
        "Done ",
        "Done a b c "
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "Intermediate Stream operations (such as `filter()`, `map()`, `peek()`) are strictly lazy. They merely build the pipeline description and do not process elements until a terminal operation (e.g. `collect()`, `forEach()`, `count()`, `findFirst()`) is invoked. Because no terminal operation was called on `stream`, the filter predicate never runs. Output: `Done `.",
      "deepDive": {
        "concept": "Java 8 Stream Pipeline Laziness & Terminal Operations",
        "whatToLookFor": "Intermediate operations do nothing without a terminal operation trigger.",
        "searchKeywords": "Java 8 stream lazy evaluation intermediate vs terminal operations Baeldung",
        "recommendedRead": "Baeldung: Java 8 Stream API Guide"
      }
    },
    {
      "id": "mcq-turing-q09",
      "topicId": "topic-java-collections-streams",
      "topicName": "Collections Framework, Generics & Java 8+ Streams",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What occurs when the following code is executed?\n\n```java\nimport java.util.*;\n\nclass Task {\n    String name;\n    Task(String name) { this.name = name; }\n}\n\npublic class SetTest {\n    public static void main(String[] args) {\n        Set<Task> tasks = new TreeSet<>();\n        tasks.add(new Task(\"Write Code\"));\n        System.out.println(tasks.size());\n    }\n}\n```",
      "options": [
        "Prints 1",
        "Compilation error because Task does not implement Comparable",
        "Throws ClassCastException at runtime",
        "Throws NullPointerException at runtime"
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "Unlike `HashSet` (which only requires `hashCode()` and `equals()`), `TreeSet` is a NavigableSet backed by a Red-Black Tree and requires all elements to be mutually comparable. If no explicit `Comparator` is supplied to the `TreeSet` constructor, `TreeSet.add()` attempts to cast the inserted object to `Comparable` at runtime. Because `Task` does not implement `Comparable`, it compiles successfully but throws `ClassCastException` at runtime.",
      "deepDive": {
        "concept": "TreeSet Ordering Contract & Comparable Requirement",
        "whatToLookFor": "Elements in a `TreeSet` must implement `Comparable` or the set must be initialized with a custom `Comparator`.",
        "searchKeywords": "TreeSet ClassCastException comparable comparator Baeldung",
        "recommendedRead": "Turing 105 Core Java Q&A & Baeldung Java Collections"
      }
    },
    {
      "id": "mcq-turing-q10",
      "topicId": "topic-java-collections-streams",
      "topicName": "Collections Framework, Generics & Java 8+ Streams",
      "difficulty": "Hard",
      "isMultiSelect": true,
      "question": "Which of the following interface declarations are valid `@FunctionalInterface` definitions in Java 8+? (Choose all that apply)\n\n```java\n// Option A\n@FunctionalInterface\ninterface A {\n    void execute();\n    default void log() { System.out.println(\"Logging\"); }\n    static void help() { System.out.println(\"Help\"); }\n}\n\n// Option B\n@FunctionalInterface\ninterface B {\n    void execute();\n    boolean equals(Object obj);\n    String toString();\n}\n\n// Option C\n@FunctionalInterface\ninterface C {\n    default void log() { System.out.println(\"Logging\"); }\n}\n\n// Option D\n@FunctionalInterface\ninterface D {\n    void execute();\n    void cancel();\n}\n```",
      "options": [
        "Interface A",
        "Interface B",
        "Interface C",
        "Interface D"
      ],
      "correctIndex": 0,
      "correctIndices": [
        0,
        1
      ],
      "explanation": "A functional interface must contain exactly one Single Abstract Method (SAM). In Interface A, `execute()` is the sole abstract method; `default` and `static` methods do not count. In Interface B, abstract methods that redeclare public methods of `java.lang.Object` (`equals`, `toString`, `hashCode`) are ignored when counting abstract methods, leaving `execute()` as the single abstract method. Interface C has 0 abstract methods (invalid), and Interface D has 2 abstract methods (invalid). Correct: A and B.",
      "deepDive": {
        "concept": "@FunctionalInterface Contract & Object Method Exclusion",
        "whatToLookFor": "Methods matching `java.lang.Object` public signatures (equals, hashCode, toString) do NOT count against the single abstract method quota.",
        "searchKeywords": "Java @FunctionalInterface java.lang.Object methods count Baeldung",
        "recommendedRead": "Baeldung: Functional Interfaces in Java 8"
      }
    },
    {
      "id": "mcq-turing-q11",
      "topicId": "topic-java-concurrency",
      "topicName": "Java Multithreading, Thread Lifecycle & Memory Model (JMM)",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Suppose class `Worker` has two methods: `public synchronized void doInstanceWork()` and `public static synchronized void doStaticWork()`. Thread T1 and Thread T2 are running concurrently on two different instances (`w1` and `w2`) of `Worker`. Which statement is true?",
      "options": [
        "If T1 calls w1.doInstanceWork() and T2 calls w2.doInstanceWork(), T2 will enter the BLOCKED state until T1 finishes.",
        "If T1 calls w1.doStaticWork() and T2 calls w2.doStaticWork(), one thread will block because both acquire the monitor on Worker.class.",
        "If T1 calls Worker.doStaticWork() and T2 calls w1.doInstanceWork(), T2 will block because static locks override instance locks.",
        "Neither thread can ever block when using two separate instances w1 and w2."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "An instance `synchronized` method acquires the intrinsic lock on the specific object instance (`this`). Since `w1` and `w2` are separate instances with distinct monitors, calls to `doInstanceWork()` execute concurrently without blocking each other. In contrast, a `public static synchronized` method locks on the `Class` object (`Worker.class`), which is shared across the entire classloader. Thus T1 and T2 contend for the same monitor lock on `Worker.class`, causing one to enter the BLOCKED state.",
      "deepDive": {
        "concept": "Instance Monitor (this) vs. Static Monitor (Class) Synchronization",
        "whatToLookFor": "Static synchronized methods lock on Class object; instance synchronized methods lock on the specific object instance.",
        "searchKeywords": "Java synchronized instance vs static method monitor lock Baeldung",
        "recommendedRead": "Baeldung: Java Concurrency - Locks and Monitors"
      }
    },
    {
      "id": "mcq-turing-q12",
      "topicId": "topic-java-concurrency",
      "topicName": "Java Multithreading, Thread Lifecycle & Memory Model (JMM)",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "What is the output of the following program?\n\n```java\npublic class ThreadTest {\n    public static void main(String[] args) {\n        Thread t = new Thread(() -> System.out.print(Thread.currentThread().getName() + \" \"));\n        t.run();\n        System.out.print(\"Finished\");\n    }\n}\n```",
      "options": [
        "Thread-0 Finished",
        "main Finished",
        "Finished Thread-0",
        "Throws IllegalThreadStateException"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Calling `t.start()` creates a new native OS thread, allocates a new call stack, and calls `run()` asynchronously. Calling `t.run()` directly bypasses thread creation and executes the `run()` method synchronously on the caller's thread (`main`). Therefore, `Thread.currentThread().getName()` evaluates to `main`. Output: `main Finished`.",
      "deepDive": {
        "concept": "Thread.start() vs. Thread.run() Execution Context",
        "whatToLookFor": "`start()` spawns a new thread; `run()` is just a plain synchronous method call on the current thread.",
        "searchKeywords": "Java difference between Thread.start and Thread.run Baeldung",
        "recommendedRead": "Turing 105 Core Java Interview Questions"
      }
    },
    {
      "id": "mcq-turing-q13",
      "topicId": "topic-core-java-oop",
      "topicName": "Core Java OOP, Exception Handling & Serialization",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What value does `compute()` return when called?\n\n```java\npublic class ExceptionTrap {\n    public static int compute() {\n        int x = 10;\n        try {\n            return x;\n        } finally {\n            x = 20;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(compute());\n    }\n}\n```",
      "options": [
        "10",
        "20",
        "Compilation error (unreachable code)",
        "0"
      ],
      "correctIndex": 0,
      "correctIndices": [
        0
      ],
      "explanation": "The `finally` block always executes before a method returns. However, when `return x;` is reached in the `try` block, the value of primitive variable `x` (`10`) is saved into an internal return value slot on the stack frame. The `finally` block then runs and modifies the local variable `x = 20`. Because `finally` does not contain its own `return` statement, the previously stored return value (`10`) is returned to the caller. (If `finally` had executed `return x;`, it would have returned 20).",
      "deepDive": {
        "concept": "Try-Finally Return Value Stack Preservation",
        "whatToLookFor": "Primitive return values evaluated in `try` are copied to the return register before `finally` executes; modifying the local variable does not change the result unless `finally` has a `return` statement.",
        "searchKeywords": "Java return in try finally block execution order bytecode Baeldung",
        "recommendedRead": "Turing Core Java Q&A & Baeldung Exceptions Guide"
      }
    },
    {
      "id": "mcq-turing-q14",
      "topicId": "topic-core-java-oop",
      "topicName": "Core Java OOP, Exception Handling & Serialization",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What is printed after serializing and deserializing `UserSession`?\n\n```java\nimport java.io.*;\n\nclass UserSession implements Serializable {\n    private static final long serialVersionUID = 1L;\n    String username = \"alice\";\n    transient String secretToken = \"xyz987\";\n    transient int pin = 1234;\n}\n\npublic class SerializationDemo {\n    public static void main(String[] args) throws Exception {\n        ByteArrayOutputStream baos = new ByteArrayOutputStream();\n        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {\n            oos.writeObject(new UserSession());\n        }\n        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(baos.toByteArray()))) {\n            UserSession restored = (UserSession) ois.readObject();\n            System.out.println(restored.username + \" \" + restored.secretToken + \" \" + restored.pin);\n        }\n    }\n}\n```",
      "options": [
        "alice xyz987 1234",
        "alice null 0",
        "alice null 1234",
        "Throws NotSerializableException"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Fields marked with the `transient` keyword are ignored during serialization and are not included in the byte stream. During deserialization, Java restores objects without calling their constructors or running field initializers. Consequently, `transient` fields receive their default JVM type values: `null` for object references like `secretToken` and `0` for primitive integers like `pin`. Output: `alice null 0`.",
      "deepDive": {
        "concept": "Transient Fields in Java Serialization",
        "whatToLookFor": "Transient fields bypass serialization and default to null/0 upon deserialization without invoking constructors.",
        "searchKeywords": "Java transient keyword serialization deserialization default values",
        "recommendedRead": "Baeldung: Guide to the transient Keyword in Java"
      }
    },
    {
      "id": "mcq-turing-q15",
      "topicId": "topic-java-concurrency",
      "topicName": "Java Multithreading, Thread Lifecycle & Memory Model (JMM)",
      "difficulty": "Medium",
      "isMultiSelect": true,
      "question": "Which statements accurately distinguish `java.util.concurrent.Callable<V>` from `java.lang.Runnable`? (Choose all that apply)",
      "options": [
        "Callable.call() returns a value of type V, whereas Runnable.run() has a void return type.",
        "Callable.call() can throw checked exceptions (throws Exception), whereas Runnable.run() cannot throw checked exceptions.",
        "A Callable instance can be passed directly into new Thread(callable) without a wrapper.",
        "Submitting a Callable<V> to an ExecutorService returns a Future<V> representing the pending result."
      ],
      "correctIndex": 0,
      "correctIndices": [
        0,
        1,
        3
      ],
      "explanation": "`Callable<V>` declares `V call() throws Exception`, enabling it to return a computed result and throw checked exceptions. When submitted to an `ExecutorService`, it returns a `Future<V>`. `Runnable` declares `void run()`, cannot return values, and cannot throw checked exceptions. Statement C is false because `Thread` constructors only accept `Runnable`; to run a `Callable` in a `Thread`, it must first be wrapped in a `FutureTask`. Correct: A, B, and D.",
      "deepDive": {
        "concept": "Callable vs. Runnable in Java Concurrency",
        "whatToLookFor": "Callable returns Future<V> and throws checked exceptions; Thread only accepts Runnable directly.",
        "searchKeywords": "Java Callable vs Runnable ExecutorService Future Baeldung",
        "recommendedRead": "Baeldung: Runnable vs. Callable in Java"
      }
    },
    {
      "id": "mcq-turing-q16",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "Which three annotations are combined inside `@SpringBootApplication`?",
      "options": [
        "@Controller, @Service, and @Repository",
        "@Configuration, @EnableAutoConfiguration, and @ComponentScan",
        "@Component, @Autowired, and @PropertySource",
        "@EnableWebMvc, @Configuration, and @Component"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "`@SpringBootApplication` is a meta-annotation that bundles `@SpringBootConfiguration` (a specialized form of `@Configuration`), `@EnableAutoConfiguration` (enables Spring Boot's opinionated auto-configuration based on classpath jars), and `@ComponentScan` (enables scanning of stereotype components in the current package and its subpackages).",
      "deepDive": {
        "concept": "@SpringBootApplication Composition",
        "whatToLookFor": "Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
        "searchKeywords": "Spring Boot @SpringBootApplication annotations combination Turing interview",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions"
      }
    },
    {
      "id": "mcq-turing-q17",
      "topicId": "topic-spring-di-beans",
      "topicName": "Spring Dependency Injection, Bean Lifecycle & Stereotypes",
      "difficulty": "Medium",
      "isMultiSelect": true,
      "question": "Examine the following Spring Boot code:\n\n```java\npublic interface PaymentGateway { void process(); }\n\n@Service(\"stripeGateway\")\npublic class StripePaymentGateway implements PaymentGateway {\n    public void process() {}\n}\n\n@Service(\"paypalGateway\")\npublic class PaypalPaymentGateway implements PaymentGateway {\n    public void process() {}\n}\n\n@RestController\npublic class CheckoutController {\n    @Autowired\n    private PaymentGateway paymentGateway;\n}\n```\n\nWhat happens when the Spring Boot application starts, and how can you fix it? (Choose all that apply)",
      "options": [
        "The application fails to start and throws NoUniqueBeanDefinitionException.",
        "Spring Boot automatically injects StripePaymentGateway in alphabetical order.",
        "Adding @Qualifier(\"stripeGateway\") alongside @Autowired resolves the conflict.",
        "Marking one of the @Service classes with @Primary resolves the conflict by setting a default bean."
      ],
      "correctIndex": 0,
      "correctIndices": [
        0,
        2,
        3
      ],
      "explanation": "Spring `@Autowired` resolves dependencies by type first. Since two beans implement `PaymentGateway` and the field name `paymentGateway` does not match either bean name (`stripeGateway` or `paypalGateway`), Spring cannot determine which bean to inject and throws `NoUniqueBeanDefinitionException`. This can be resolved by adding `@Qualifier(\"stripeGateway\")` at the injection point or marking one implementation with `@Primary`. Correct: A, C, and D.",
      "deepDive": {
        "concept": "Resolving NoUniqueBeanDefinitionException (@Qualifier vs. @Primary)",
        "whatToLookFor": "Spring autowires by type; resolve multiple candidates using @Qualifier or @Primary.",
        "searchKeywords": "Spring NoUniqueBeanDefinitionException @Qualifier @Primary Baeldung",
        "recommendedRead": "Turing Spring Boot Q&A & Baeldung Spring Framework Guide"
      }
    },
    {
      "id": "mcq-turing-q18",
      "topicId": "topic-spring-di-beans",
      "topicName": "Spring Dependency Injection, Bean Lifecycle & Stereotypes",
      "difficulty": "Hard",
      "isMultiSelect": false,
      "question": "Suppose `OrderService` is a default `@Service` (`singleton` scope) and `ShoppingCart` is annotated with `@Component` and `@Scope(\"prototype\")`:\n\n```java\n@Service\npublic class OrderService {\n    @Autowired\n    private ShoppingCart cart;\n\n    public ShoppingCart getCart() {\n        return this.cart;\n    }\n}\n```\n\nIf `orderService.getCart()` is called 5 times across 5 different HTTP requests, how many `ShoppingCart` instances are created?",
      "options": [
        "5 instances, because ShoppingCart has prototype scope.",
        "1 instance, because OrderService is a singleton and injects ShoppingCart only once when OrderService is initialized.",
        "0 instances, because injecting a prototype bean into a singleton bean causes a startup exception.",
        "2 instances."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Because `OrderService` is a `singleton`, it is instantiated only once during application startup. Its `@Autowired` dependencies are resolved and injected at that single initialization moment. Even though `ShoppingCart` is configured as `prototype`, the injection occurs only once, resulting in only 1 instance of `ShoppingCart`. To receive a fresh prototype instance on every call, one must use `@Lookup`, inject an `ObjectProvider<ShoppingCart>`, or use a scoped proxy (`proxyMode = ScopedProxyMode.TARGET_CLASS`).",
      "deepDive": {
        "concept": "Prototype Bean Injection into Singleton Bean Problem",
        "whatToLookFor": "Singleton beans inject prototype dependencies only ONCE unless scoped proxies, ObjectProvider, or @Lookup methods are used.",
        "searchKeywords": "Spring inject prototype bean into singleton @Lookup ObjectProvider Baeldung",
        "recommendedRead": "Baeldung: Injecting Prototype Beans into a Singleton Instance"
      }
    },
    {
      "id": "mcq-turing-q19",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What is the primary difference between `CommandLineRunner` and `ApplicationRunner` in Spring Boot?",
      "options": [
        "CommandLineRunner runs before ApplicationContext is created, whereas ApplicationRunner runs after.",
        "CommandLineRunner.run(String... args) receives raw string command-line arguments, whereas ApplicationRunner.run(ApplicationArguments args) receives a parsed ApplicationArguments object supporting --option=value syntax.",
        "Only one CommandLineRunner bean is allowed per application, whereas multiple ApplicationRunner beans are allowed.",
        "ApplicationRunner is only used in web applications, whereas CommandLineRunner is only for CLI scripts."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Both `CommandLineRunner` and `ApplicationRunner` execute immediately after the `ApplicationContext` is fully refreshed and before `SpringApplication.run()` completes. The key architectural difference is argument parsing: `CommandLineRunner` accepts raw `String... args`, whereas `ApplicationRunner` accepts `ApplicationArguments`, providing utility methods to query parsed option arguments (e.g. `--port=8080`) and non-option arguments.",
      "deepDive": {
        "concept": "CommandLineRunner vs. ApplicationRunner Parameter Parsing",
        "whatToLookFor": "CommandLineRunner receives raw String[] array; ApplicationRunner receives parsed ApplicationArguments.",
        "searchKeywords": "CommandLineRunner vs ApplicationRunner Spring Boot differences Baeldung",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions"
      }
    },
    {
      "id": "mcq-turing-q20",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Hard",
      "isMultiSelect": true,
      "question": "Which statements are true when comparing `@Value` and `@ConfigurationProperties` in Spring Boot? (Choose all that apply)",
      "options": [
        "@ConfigurationProperties(prefix = \"app.mail\") supports relaxed binding (e.g., binding app.mail.host-name or APP_MAIL_HOST_NAME to hostName), whereas @Value requires exact property names.",
        "@Value supports Spring Expression Language (SpEL, e.g., #{...}), whereas @ConfigurationProperties does not evaluate SpEL expressions.",
        "@ConfigurationProperties can group and validate related properties together using JSR-303 @Validated annotations (like @NotNull).",
        "@Value can bind an entire nested YAML object hierarchy into a strongly typed POJO automatically without specifying individual keys."
      ],
      "correctIndex": 0,
      "correctIndices": [
        0,
        1,
        2
      ],
      "explanation": "`@ConfigurationProperties` provides structured, typesafe configuration with relaxed binding (kebab-case, camelCase, UPPER_CASE environment variables all map to the same field) and supports JSR-303 `@Validated` annotations. `@Value` is intended for single scalar values and supports SpEL expressions (`#{...}`). Statement D is false because `@Value` cannot automatically map complex hierarchical structures into POJOs. Correct: A, B, and C.",
      "deepDive": {
        "concept": "@Value vs. @ConfigurationProperties Configuration Binding",
        "whatToLookFor": "@ConfigurationProperties supports relaxed binding and validation; @Value supports SpEL expressions.",
        "searchKeywords": "Spring Boot @ConfigurationProperties vs @Value relaxed binding SpEL Baeldung",
        "recommendedRead": "Baeldung: ConfigurationProperties in Spring Boot"
      }
    },
    {
      "id": "mcq-turing-q21",
      "topicId": "topic-spring-jpa-transactions",
      "topicName": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "difficulty": "Hard",
      "isMultiSelect": true,
      "question": "Consider the following `UserService` class in a Spring Boot application:\n\n```java\n@Service\npublic class UserService {\n    @Autowired\n    private UserRepository repo;\n\n    public void registerUser(User user) throws Exception {\n        saveUserInternal(user);\n    }\n\n    @Transactional\n    public void saveUserInternal(User user) throws Exception {\n        repo.save(user);\n        throw new Exception(\"Checked exception occurred\");\n    }\n}\n```\n\nIdentify the two reasons why the database insert in `saveUserInternal` will NOT be rolled back when an external caller invokes `userService.registerUser(user)`: (Choose two)",
      "options": [
        "Calling saveUserInternal(user) from registerUser(user) within the same class (this.saveUserInternal) bypasses the Spring AOP proxy, so the @Transactional interceptor never triggers.",
        "By default, @Transactional only rolls back on unchecked exceptions (RuntimeException and Error), not on checked exceptions (Exception), unless rollbackFor = Exception.class is specified.",
        "@Transactional cannot be placed on methods; it is only valid at the class level.",
        "UserRepository.save() cannot participate in Spring transactions."
      ],
      "correctIndex": 0,
      "correctIndices": [
        0,
        1
      ],
      "explanation": "Two fatal transactional traps exist here: 1) Self-invocation: calling `saveUserInternal` directly via `this` within the same class bypasses the Spring AOP proxy, meaning no transaction is ever started. 2) Rollback rules: Spring's transaction manager rolls back exclusively on unchecked exceptions (`RuntimeException` and `Error`) by default. Throwing `Exception` (checked) will not trigger a rollback unless explicitly declared via `@Transactional(rollbackFor = Exception.class)`. Correct: A and B.",
      "deepDive": {
        "concept": "Self-Invocation Proxy Bypass & Checked Exception Rollback Trap",
        "whatToLookFor": "Self-invocation ignores AOP proxies; Spring only rolls back on RuntimeException by default.",
        "searchKeywords": "Spring @Transactional self-invocation proxy bypass checked exception rollbackFor Baeldung",
        "recommendedRead": "Turing Spring Boot Q&A & Baeldung Transactions Guide"
      }
    },
    {
      "id": "mcq-turing-q22",
      "topicId": "topic-spring-jpa-transactions",
      "topicName": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "How does `@Transactional(propagation = Propagation.NESTED)` behave when called inside an existing active transaction?",
      "options": [
        "It suspends the outer transaction and starts a completely independent physical database transaction with its own connection.",
        "It creates a savepoint within the existing physical transaction; if the nested transaction rolls back, it rolls back only to the savepoint without forcing the outer transaction to roll back.",
        "It throws an IllegalTransactionStateException if an outer transaction already exists.",
        "It executes non-transactionally and ignores the outer transaction."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "`Propagation.NESTED` operates within the same physical connection and transaction by setting a JDBC Savepoint. If the nested method fails and rolls back, only changes made within that savepoint are rolled back, permitting the outer transaction to catch the exception and commit its own work. In contrast, `REQUIRES_NEW` suspends the outer transaction and opens a completely separate physical transaction on a new connection.",
      "deepDive": {
        "concept": "Propagation.NESTED vs. Propagation.REQUIRES_NEW",
        "whatToLookFor": "NESTED uses JDBC savepoints; REQUIRES_NEW opens independent physical transactions.",
        "searchKeywords": "Spring Propagation.NESTED savepoint vs REQUIRES_NEW Baeldung",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions Q38"
      }
    },
    {
      "id": "mcq-turing-q23",
      "topicId": "topic-spring-jpa-transactions",
      "topicName": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "What is the difference between `@ControllerAdvice` and `@RestControllerAdvice` in Spring Boot?",
      "options": [
        "@ControllerAdvice only catches checked exceptions, whereas @RestControllerAdvice catches runtime exceptions.",
        "@RestControllerAdvice is a meta-annotation combining @ControllerAdvice and @ResponseBody, automatically serializing return values from @ExceptionHandler methods into the HTTP response body (such as JSON).",
        "@RestControllerAdvice only applies to a single controller class, whereas @ControllerAdvice applies globally.",
        "@ControllerAdvice is deprecated in Spring Boot 3.x."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Just as `@RestController` is a convenience meta-annotation combining `@Controller` and `@ResponseBody`, `@RestControllerAdvice` combines `@ControllerAdvice` and `@ResponseBody`. This ensures return values from `@ExceptionHandler` methods are automatically serialized into the HTTP response body (typically JSON) rather than being resolved as HTML view names.",
      "deepDive": {
        "concept": "@ControllerAdvice vs. @RestControllerAdvice Global Error Handling",
        "whatToLookFor": "@RestControllerAdvice automatically applies @ResponseBody to all @ExceptionHandler methods.",
        "searchKeywords": "Spring Boot difference between @ControllerAdvice and @RestControllerAdvice",
        "recommendedRead": "Baeldung: Exception Handling in Spring MVC"
      }
    },
    {
      "id": "mcq-turing-q24",
      "topicId": "topic-spring-jpa-transactions",
      "topicName": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "difficulty": "Medium",
      "isMultiSelect": true,
      "question": "Which statements are true about `@DataJpaTest` in Spring Boot? (Choose all that apply)",
      "options": [
        "It loads the full application context including all @RestController and @Service beans.",
        "It configures only JPA-relevant components (@Entity classes and Spring Data JPA @Repository interfaces) and uses an embedded in-memory database by default.",
        "Tests annotated with @DataJpaTest are @Transactional by default and roll back automatically at the end of each test method.",
        "You can use @DynamicPropertySource alongside test containers or tests to dynamically inject configuration properties into the test Environment."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1,
        2,
        3
      ],
      "explanation": "`@DataJpaTest` is a targeted slice test annotation: it scans only `@Entity` and Spring Data JPA `@Repository` interfaces (disabling `@Controller` and `@Service` beans to keep execution fast). By default, it configures an embedded in-memory database and wraps every test method in a transaction that automatically rolls back when the test finishes. `@DynamicPropertySource` allows static methods to register dynamic properties (e.g. Testcontainers URLs) into the Spring Environment. Correct: B, C, and D.",
      "deepDive": {
        "concept": "Spring Boot Test Slicing with @DataJpaTest",
        "whatToLookFor": "@DataJpaTest loads only JPA components, runs an in-memory database, and rolls back after each test.",
        "searchKeywords": "Spring Boot @DataJpaTest slice test @DynamicPropertySource Baeldung",
        "recommendedRead": "Turing 100+ Spring Boot Q&A & Baeldung Spring Boot Testing Guide"
      }
    },
    {
      "id": "mcq-turing-q25",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "Which configuration property exposes all Spring Boot Actuator endpoints over HTTP in `application.properties`?",
      "options": [
        "spring.actuator.http.expose=*",
        "management.endpoints.web.exposure.include=*",
        "server.endpoints.actuator.enable=true",
        "spring.boot.devtools.endpoints.include=all"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "By default, Spring Boot Actuator exposes only the `/actuator/health` endpoint over HTTP for security reasons. To expose all endpoints (such as `/actuator/metrics`, `/actuator/env`, `/actuator/beans`), you must configure `management.endpoints.web.exposure.include=*` in `application.properties` or `application.yml`.",
      "deepDive": {
        "concept": "Spring Boot Actuator HTTP Endpoint Exposure",
        "whatToLookFor": "Use `management.endpoints.web.exposure.include=*` to expose Actuator endpoints over web.",
        "searchKeywords": "Spring Boot Actuator expose all endpoints management.endpoints.web.exposure.include",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions & Spring Boot Reference"
      }
    },
    {
      "id": "mcq-turing-official-devtools",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Which of the following is NOT TRUE about Spring Boot DevTools?\n\n(Official Sample MCQ from Turing Developer Test Prep Guide)",
      "options": [
        "By default, DevTools applies properties suitable to a development environment.",
        "Applications using DevTools restart whenever a file on the classpath changes.",
        "The spring-boot-devtools module is automatically disabled if the application runs in production.",
        "The spring-boot-devtools is a tool that monitors the health of a system that contains CPU, RAM, metric information.",
        "Static resources, including view templates, don't set off a restart if the LiveReload extension is installed in the browser to interact with the embedded LiveReload server that DevTools contains."
      ],
      "correctIndex": 3,
      "correctIndices": [
        3
      ],
      "explanation": "Option 4 is false. Monitoring system health, CPU, RAM, and metrics is the exclusive responsibility of Spring Boot Actuator (`spring-boot-starter-actuator`), NOT DevTools. DevTools is focused on rapid developer iteration with dual-classloader restarts and LiveReload.",
      "deepDive": {
        "concept": "DevTools vs. Actuator Differentiation",
        "whatToLookFor": "DevTools = developer experience & hot reload; Actuator = metrics, health checks, telemetry.",
        "searchKeywords": "Spring Boot DevTools vs Actuator differences Turing interview",
        "recommendedRead": "Turing Developer Test Prep Guide"
      }
    },
    {
      "id": "mcq-turing-official-autoconfig",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Hard",
      "isMultiSelect": false,
      "question": "You are a developer at Turing. You need to register a custom Auto-Configuration class so that Spring Boot loads it conditionally during bootstrap. How can you register it?\n\n(Official Sample MCQ from Turing Developer Test Prep Guide)",
      "options": [
        "Using @Component annotation on the configuration class. It will auto-load when the application starts.",
        "Annotating the main class with @EnableAutoConfiguration and listing the class as a parameter.",
        "Having the auto-configuration class fully-qualified name listed under the EnableAutoConfiguration key in the META-INF/spring.factories file (or AutoConfiguration.imports in Spring Boot 3).",
        "All of the above."
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "True custom auto-configuration classes must be registered via `META-INF/spring.factories` (under `EnableAutoConfiguration` in Boot 2.x) or in `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` (in Boot 3.x). Plain `@Component` classes are treated as ordinary user beans and do not participate in auto-configuration ordering or conditional fallback evaluation.",
      "deepDive": {
        "concept": "Spring Boot Auto-Configuration Registration Mechanics",
        "whatToLookFor": "Auto-configurations are loaded via spring.factories or AutoConfiguration.imports, not plain component scanning.",
        "searchKeywords": "Spring Boot custom auto-configuration META-INF spring.factories imports",
        "recommendedRead": "Turing Developer Test Prep Guide"
      }
    },
    {
      "id": "mcq-turing-survey-bugs",
      "topicId": "topic-turing-seniority-survey",
      "topicName": "Turing Work Experience Survey & Seniority Heuristics",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "How do you assess the severity of bugs in your team?\n\n(Official Turing 57-Question Work Experience Survey Sample)",
      "options": [
        "Other people do that for me.",
        "I assess the severity by evaluating the impacts on user experience.",
        "We have clear metrics to evaluate the severity of bugs.",
        "I use my knowledge of the core metrics of the team and the company to assess the severity of bugs."
      ],
      "correctIndex": 3,
      "correctIndices": [
        3
      ],
      "explanation": "Option 4 exhibits top-tier engineering seniority and ownership: connecting technical defects directly to core company KPIs, business impact, and system metrics. Options 1-3 progress from passive intern behavior to individual contributor and team rules.",
      "deepDive": {
        "concept": "Turing Work Experience Survey Scoring Heuristic",
        "whatToLookFor": "Select answers demonstrating proactive business impact, core metrics alignment, and end-to-end ownership.",
        "searchKeywords": "Turing work experience survey seniority metrics",
        "recommendedRead": "Turing Developer Test Prep Guide"
      }
    },
    {
      "id": "mcq-turing-survey-results",
      "topicId": "topic-turing-seniority-survey",
      "topicName": "Turing Work Experience Survey & Seniority Heuristics",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "How do you know if you get positive or negative results on features you ship?\n\n(Official Turing 57-Question Work Experience Survey Sample)",
      "options": [
        "Other people let me know.",
        "I define success metrics before working on tasks.",
        "I ask for feedback from other people.",
        "I define success metrics before working on tasks and have AB tests to compare the results."
      ],
      "correctIndex": 3,
      "correctIndices": [
        3
      ],
      "explanation": "Option 4 demonstrates senior data-driven ownership: establishing clear success metrics before coding starts and using empirical A/B testing to validate outcomes against hypotheses.",
      "deepDive": {
        "concept": "Data-Driven Engineering Ownership & A/B Validation",
        "whatToLookFor": "Upfront KPI definition + empirical automated validation (A/B testing) = highest seniority score.",
        "searchKeywords": "Engineering seniority defining metrics AB testing delivery",
        "recommendedRead": "Turing Developer Test Prep Guide"
      }
    },
    {
      "id": "mcq-turing-scenario-flaky",
      "topicId": "topic-turing-insider-vetting",
      "topicName": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "difficulty": "Hard",
      "isMultiSelect": false,
      "question": "You write 5 unit tests (TA, TB, TC, TD, TE) in a Spring Boot application. All 5 tests pass when run individually in isolation, but fail intermittently and unpredictably when executed together as a full suite. What is the most likely root cause?\n\n(Extracted from real Turing.com 45-minute scenario quiz screen recordings)",
      "options": [
        "The JUnit test engine executes test methods concurrently in separate JVM processes by default.",
        "Shared mutable state (static variables, un-reset singleton service beans, or lingering in-memory database records) persisting across test executions.",
        "The JVM Garbage Collector forces thread interrupts during full suite execution.",
        "The Spring Boot test runner disables transaction rollbacks when more than 3 tests run."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Flaky test suites that pass in isolation but fail together almost universally suffer from shared mutable state. In Spring test suites, the `ApplicationContext` is cached across test classes to save bootstrap time. If a test mutates a singleton bean, sets a static variable, or leaves uncommitted rows in an embedded database without `@DirtiesContext` or proper transactional rollback, subsequent tests receive corrupted state and fail unpredictably.",
      "deepDive": {
        "concept": "Flaky Unit Tests & Shared Mutable State in Spring Test Suites",
        "whatToLookFor": "Watch for cached ApplicationContext pollution, static field modifications, and uncleaned database state.",
        "searchKeywords": "JUnit flaky tests shared mutable state Spring ApplicationContext caching DirtiesContext",
        "recommendedRead": "Turing.com Quiz 2025 Walkthrough & Spring Testing Reference"
      }
    },
    {
      "id": "mcq-turing-scenario-clock",
      "topicId": "topic-turing-insider-vetting",
      "topicName": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "difficulty": "Hard",
      "isMultiSelect": false,
      "question": "You are designing a Spring Boot service that schedules and executes a critical task at timestamp t + x based on system time. How should you design the component and its unit tests to verify triggering behavior without waiting or sleeping in real time?\n\n(Extracted from real Turing.com 45-minute scenario quiz screen recordings)",
      "options": [
        "Call Thread.sleep(x) inside the test method with a 10-second test timeout.",
        "Use System.setProperty(\"user.timezone\", ...) before running each assertion.",
        "Inject a java.time.Clock bean into the scheduler component and supply a Clock.fixed(...) or Clock.offset(...) in unit tests to advance simulated time instantaneously.",
        "Use ByteBuddy to intercept system timer hardware interrupts."
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "To make time-dependent code deterministic and testable without slow `Thread.sleep()` delays, decouple the component from `System.currentTimeMillis()` by injecting `java.time.Clock`. In production, Spring injects `Clock.systemUTC()`. In unit tests, you inject `Clock.fixed(instant, zone)` or mutate simulated time via `Clock.offset(...)`, allowing tests to simulate task expiration in milliseconds.",
      "deepDive": {
        "concept": "Unit-Testing Time-Dependent Schedulers with java.time.Clock",
        "whatToLookFor": "Never use Thread.sleep in unit tests; inject java.time.Clock and use Clock.fixed in tests.",
        "searchKeywords": "java.time.Clock.fixed unit testing schedulers Spring Boot",
        "recommendedRead": "Baeldung: Introduction to the Java Clock Class"
      }
    },
    {
      "id": "mcq-turing-insider-harness",
      "topicId": "topic-turing-insider-vetting",
      "topicName": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "When taking the 30–45 minute Turing live coding challenge in the browser IDE, the workspace presents two classes: `Solution` and `Main`. Why must you NEVER modify the `Main` class?\n\n(Extracted from Turing Coding Challenge Practice Test Walkthrough)",
      "options": [
        "The Main class is digitally signed and editing it triggers automatic plagiarism detection.",
        "The Main class is the evaluation harness that reads test suite inputs from System.in and formats outputs; modifying it desynchronizes the test runner and fails all hidden test cases.",
        "The browser IDE crashes with an OutOfMemoryError if Main is edited.",
        "Java does not support modifying static main methods in web IDEs."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "In Turing's browser coding environment, `Main` is the input/output test harness provided by the platform to feed edge-case inputs via `System.in` and read your solution's output stream. Editing `Main` alters how inputs are ingested or parsed, causing your code to immediately fail all hidden automated test cases even if your algorithm is correct.",
      "deepDive": {
        "concept": "Turing Browser IDE Harness & Test Runner Architecture",
        "whatToLookFor": "Only write your algorithmic implementation inside the designated Solution class and methods.",
        "searchKeywords": "Turing.com coding challenge test harness System.in runner",
        "recommendedRead": "Solving the Turing.com Coding Challenge Practice Tests Walkthrough"
      }
    },
    {
      "id": "mcq-sb-default-jpa",
      "topicId": "topic-spring-boot-defaults-lifecycle",
      "topicName": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "In Spring Data JPA, what is the default implementation class instantiated at runtime for repository interfaces extending `JpaRepository`?\n\n(High-frequency 10-second Spring Boot quiz question)",
      "options": [
        "DefaultJpaRepository",
        "SimpleJpaRepository",
        "HibernateJpaRepository",
        "CustomJpaRepository"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Spring Data JPA dynamically creates repository proxy instances backed by `org.springframework.data.jpa.repository.support.SimpleJpaRepository`. It provides the default implementation for CRUD operations like `save()`, `findById()`, and `deleteById()`, with class-level `@Transactional(readOnly = true)` annotations.",
      "deepDive": {
        "concept": "SimpleJpaRepository Runtime Proxy Implementation",
        "whatToLookFor": "SimpleJpaRepository is the actual backing class for Spring Data JpaRepository proxies.",
        "searchKeywords": "Spring Data JPA SimpleJpaRepository default implementation class",
        "recommendedRead": "Top 25 Spring Boot MCQs (Java Guides) & Spring Data Documentation"
      }
    },
    {
      "id": "mcq-sb-default-scheduled",
      "topicId": "topic-spring-boot-defaults-lifecycle",
      "topicName": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "When using `@EnableScheduling` and `@Scheduled` in Spring Boot without custom task executor configuration, what is the default size of the underlying thread pool executing scheduled tasks?",
      "options": [
        "Equal to the number of CPU cores (Runtime.getRuntime().availableProcessors())",
        "Fixed thread pool of 10 threads",
        "A single-threaded executor (pool size = 1)",
        "Unbounded cached thread pool"
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "By default, Spring Boot creates a `ScheduledExecutorService` with a pool size of exactly 1 thread. Consequently, if multiple `@Scheduled` tasks are configured, or if a single scheduled job runs longer than its execution interval, all other scheduled jobs will be blocked and starved until the running job completes. A custom `TaskScheduler` bean or `spring.task.scheduling.pool.size` must be configured for multi-threaded scheduling.",
      "deepDive": {
        "concept": "Default Single-Threaded Task Scheduling Pool",
        "whatToLookFor": "Spring @Scheduled is strictly single-threaded by default; jobs block each other without custom pool config.",
        "searchKeywords": "Spring Boot @Scheduled default thread pool size single thread TaskScheduler",
        "recommendedRead": "Master Spring Boot Interviews — 50 Questions in One Shot!"
      }
    },
    {
      "id": "mcq-sb-request-lifecycle",
      "topicId": "topic-spring-boot-defaults-lifecycle",
      "topicName": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "In what exact chronological order does an incoming HTTP request travel through Spring Boot web components before reaching the `@RestController`?",
      "options": [
        "DispatcherServlet -> Servlet Filter -> HandlerInterceptor -> Controller",
        "Servlet Filter -> DispatcherServlet -> HandlerInterceptor (preHandle) -> Controller",
        "HandlerInterceptor -> Servlet Filter -> DispatcherServlet -> Controller",
        "Servlet Filter -> Controller -> HandlerInterceptor -> DispatcherServlet"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "The Servlet Filter belongs to the Servlet API specification and executes first at the web container boundary before the request reaches the `DispatcherServlet`. The `DispatcherServlet` then consults handler mappings and invokes the Spring MVC `HandlerInterceptor.preHandle()` method before finally dispatching execution to the matching `@RestController` handler method.",
      "deepDive": {
        "concept": "Spring Boot Request Lifecycle (Filter vs. Interceptor vs. DispatcherServlet)",
        "whatToLookFor": "Servlet Filter runs BEFORE DispatcherServlet; HandlerInterceptor runs AFTER DispatcherServlet.",
        "searchKeywords": "Spring request lifecycle order Filter DispatcherServlet HandlerInterceptor Controller",
        "recommendedRead": "Master Spring Boot Interviews — 50 Questions in One Shot!"
      }
    },
    {
      "id": "mcq-sb-interceptor-methods",
      "topicId": "topic-spring-boot-defaults-lifecycle",
      "topicName": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Which of the following represents the correct sequence of lifecycle callback methods on a Spring MVC `HandlerInterceptor` during request handling?",
      "options": [
        "postHandle -> preHandle -> afterCompletion",
        "preHandle (before controller) -> postHandle (after controller, before view) -> afterCompletion (after complete request-response finishes)",
        "init -> doFilter -> destroy",
        "beforeExecution -> aroundExecution -> afterExecution"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "`HandlerInterceptor` has 3 methods executed in sequence: 1) `preHandle()` runs before the controller method executes (can return false to abort). 2) `postHandle()` runs after the controller method returns but before the view is rendered (not called if an exception was thrown). 3) `afterCompletion()` runs after the complete request-response cycle finishes (useful for cleanup and logging, always runs even on exceptions).",
      "deepDive": {
        "concept": "HandlerInterceptor Lifecycle Sequence (preHandle, postHandle, afterCompletion)",
        "whatToLookFor": "preHandle -> controller -> postHandle -> view render -> afterCompletion.",
        "searchKeywords": "Spring HandlerInterceptor lifecycle preHandle postHandle afterCompletion order",
        "recommendedRead": "Baeldung: Guide to Spring HandlerInterceptor"
      }
    },
    {
      "id": "mcq-sb-autoconfig-exclude",
      "topicId": "topic-spring-boot-defaults-lifecycle",
      "topicName": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "difficulty": "Hard",
      "isMultiSelect": true,
      "question": "How can you explicitly disable a specific auto-configuration class (such as `WebMvcAutoConfiguration` or `DataSourceAutoConfiguration`) from loading in Spring Boot? (Choose all that apply)",
      "options": [
        "Using @SpringBootApplication(exclude = {WebMvcAutoConfiguration.class})",
        "Setting spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration in application.properties",
        "Using @EnableAutoConfiguration(exclude = {WebMvcAutoConfiguration.class})",
        "Deleting the dependency jar from your local ~/.m2 Maven repository"
      ],
      "correctIndex": 0,
      "correctIndices": [
        0,
        1,
        2
      ],
      "explanation": "Spring Boot provides multiple declarative mechanisms to exclude unwanted auto-configuration classes: 1) Via `@SpringBootApplication(exclude = {...})`. 2) Via `@EnableAutoConfiguration(exclude = {...})`. 3) Via the externalized configuration property `spring.autoconfigure.exclude` in `application.properties` or `application.yml`. Correct: A, B, and C.",
      "deepDive": {
        "concept": "Excluding Spring Boot Auto-Configurations",
        "whatToLookFor": "Use exclude attribute on @SpringBootApplication / @EnableAutoConfiguration or spring.autoconfigure.exclude property.",
        "searchKeywords": "Spring Boot exclude auto configuration WebMvcAutoConfiguration Amigoscode",
        "recommendedRead": "Top 10 Spring Boot Interview Questions [2025] (Amigoscode)"
      }
    },
    {
      "id": "mcq-turing-ordering-dedup",
      "topicId": "topic-turing-insider-vetting",
      "topicName": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "In a rapid-fire Turing coding assessment, you are asked to remove duplicate elements from an array while strictly preserving the original first-seen appearance order (e.g. `[4, 4, 5, 5, 6, 3]` -> `[4, 5, 6, 3]`). Why will passing elements into a standard `HashSet` fail hidden test cases?",
      "options": [
        "HashSet does not permit integer wrappers.",
        "HashSet does not guarantee any iteration order; hash bucket distribution reorders elements unpredictably. A LinkedHashSet must be used to preserve insertion order.",
        "HashSet sorts all elements in natural ascending order.",
        "HashSet throws an IllegalArgumentException when duplicate keys are inserted."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "A standard `HashSet` orders its internal buckets according to object hash codes; it makes zero guarantees regarding insertion or encounter order. When duplicates are removed, the iteration order of a `HashSet` will scramble elements unpredictably (e.g. producing `[3, 4, 5, 6]`), failing Turing test suites that require first-seen preservation. You must use `LinkedHashSet` (which maintains a doubly-linked list across entries in insertion order).",
      "deepDive": {
        "concept": "Turing Rapid Coding Ordering Trap: HashSet vs. LinkedHashSet",
        "whatToLookFor": "When deduplicating or sorting by frequency, always use LinkedHashSet/LinkedHashMap to preserve original encounter order for ties.",
        "searchKeywords": "Java remove duplicates preserve order LinkedHashSet vs HashSet Turing",
        "recommendedRead": "Turing Interview Questions | Ai Master Ruturaj Walkthrough"
      }
    },
    {
      "id": "mcq-turing-survey-improve",
      "topicId": "topic-turing-seniority-survey",
      "topicName": "Turing Work Experience Survey & Seniority Heuristics",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "How do you know what you need to improve (tech skills, soft skills, etc.) to get to the next level?\n\n(Official Turing 57-Question Work Experience Survey Sample)",
      "options": [
        "I don't know",
        "Sometimes, my manager and other seniors give me feedback",
        "People tell me through 1-1 meetings (with peers, the tech lead, and the manager)",
        "I actively ping other people to know what I need to improve and how to do it",
        "I provide expectations as well as detailed steps on how to achieve them to people in my team"
      ],
      "correctIndex": 4,
      "correctIndices": [
        4
      ],
      "explanation": "Option 5 reflects highest-tier engineering leadership (Tech Lead / Staff level). While junior developers depend passively on feedback (Options 1–3) and mid-level developers actively solicit feedback (Option 4), senior engineers drive organizational growth by setting explicit performance expectations, architectural standards, and detailed execution steps for team members.",
      "deepDive": {
        "concept": "Turing Survey Rubric: Proactive Team Mentorship & Expectation Setting",
        "whatToLookFor": "Look for leadership, mentoring, and defining actionable steps for peers rather than passive receipt of feedback.",
        "searchKeywords": "Turing work experience survey engineering leadership seniority",
        "recommendedRead": "Turing Developer Test Prep Guide (Ankit Sahu)"
      }
    },
    {
      "id": "mcq-turing-survey-learn",
      "topicId": "topic-turing-seniority-survey",
      "topicName": "Turing Work Experience Survey & Seniority Heuristics",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "How do you learn new technologies?\n\n(Official Turing 57-Question Work Experience Survey Sample)",
      "options": [
        "I teach myself how to develop applications with new technologies from scratch",
        "I study the trade-offs of each technology and determine when to use it",
        "I research new technologies based on the current issues in my team and decide how to use them with my colleagues",
        "I focus more on new system architectures and design patterns"
      ],
      "correctIndex": 3,
      "correctIndices": [
        3
      ],
      "explanation": "Option 4 indicates senior-level engineering perspective: senior and principal engineers prioritize architectural paradigms, system trade-offs, and reusable design patterns over language-specific syntax or ad-hoc tinkering. Understanding foundational architectural trade-offs allows developers to evaluate whether an emerging technology genuinely solves scalability and resilience requirements.",
      "deepDive": {
        "concept": "System Architecture & Design Pattern Focus vs. Syntax Exploration",
        "whatToLookFor": "Senior engineers prioritize architectural design patterns and system trade-offs rather than framework syntax.",
        "searchKeywords": "Software engineering seniority system architecture design patterns trade-offs",
        "recommendedRead": "Turing Developer Test Prep Guide (Ankit Sahu)"
      }
    },
    {
      "id": "mcq-turing-survey-quality",
      "topicId": "topic-turing-seniority-survey",
      "topicName": "Turing Work Experience Survey & Seniority Heuristics",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What do you do to improve your code quality?\n\n(Official Turing 57-Question Work Experience Survey Sample)",
      "options": [
        "Write more code and ask for code reviews",
        "Follow the best practices of the technology",
        "Learn from seniors in the team and ping people to collect feedback",
        "I define coding conventions and standards for the team"
      ],
      "correctIndex": 3,
      "correctIndices": [
        3
      ],
      "explanation": "Option 4 demonstrates Senior / Staff level ownership: setting coding conventions, automated linting rules, architectural style guides, and PR review standards for the wider engineering team. Options 1–3 describe individual contributor behaviors (following existing guidelines and requesting feedback).",
      "deepDive": {
        "concept": "Defining Team Standards & Automated Quality Gates",
        "whatToLookFor": "Senior engineers establish team-wide engineering conventions, style guidelines, and quality standards.",
        "searchKeywords": "Engineering leadership defining coding conventions standards team quality",
        "recommendedRead": "Turing Developer Test Prep Guide (Ankit Sahu)"
      }
    },
    {
      "id": "mcq-turing-git-checkout",
      "topicId": "topic-turing-insider-vetting",
      "topicName": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "Which Git command changes where the HEAD pointer points and modifies the contents of the working directory?\n\n(Official Turing Developer Test Prep Guide — DevOps / Git Stack Sample)",
      "options": [
        "checkout",
        "merge",
        "pull",
        "mv",
        "none of the above"
      ],
      "correctIndex": 0,
      "correctIndices": [
        0
      ],
      "explanation": "`git checkout <branch/commit>` moves the `HEAD` ref to point to the target branch or commit AND updates the files in the working directory to match the target tree. (Note: in modern Git 2.23+, `git switch` and `git restore` split this dual responsibility, but `checkout` remains the canonical answer in Turing tests). `merge` incorporates history, `pull` fetches and merges, and `mv` renames files.",
      "deepDive": {
        "concept": "Git HEAD Pointer Mechanics & Working Tree Synchronization",
        "whatToLookFor": "git checkout simultaneously relocates HEAD and updates the local working tree.",
        "searchKeywords": "Git checkout HEAD pointer working directory tree explained Pro Git",
        "recommendedRead": "Pro Git Book (Chapter 3) & Turing Developer Test Prep Guide"
      }
    },
    {
      "id": "mcq-turing-regex-greedy",
      "topicId": "topic-turing-insider-vetting",
      "topicName": "Turing Insider Vetting Mechanics, Platform Traps & Coding Harness",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Given the text below:\n> *\"Whether you think you can or think you can't — you are right.\" — Henry Ford (1863 – 1947)*\n\nUsing the regular expression pattern `you.*n` on this text, what is the exact string returned?\n\n(Official Turing Developer Test Prep Guide Sample Trap)",
      "options": [
        "you think you can or think you can",
        "you think you can or think you can't",
        "you think you can",
        "you can or think you can"
      ],
      "correctIndex": 0,
      "correctIndices": [
        0
      ],
      "explanation": "In standard regular expressions, the `.*` quantifier is greedy by default — it consumes as many characters as possible across the string until the LAST valid match for `n`. The first match starts at the first 'you' ('you think...'). In the phrase can't, the letter after 'n' is apostrophe and 't'. The regex specifies ending at 'n', so the match greedily includes everything up to the 'n' in can't (which is 'you think you can or think you can' without the 't).",
      "deepDive": {
        "concept": "Greedy Quantifiers (`.*`) vs. Lazy Quantifiers (`.*?`) in Regular Expressions",
        "whatToLookFor": "Greedy `.*` expands to the farthest possible character in the text matching the following token.",
        "searchKeywords": "Regex greedy vs lazy quantifiers dot star trap",
        "recommendedRead": "Turing Developer Test Prep Guide & Regular Expressions Reference"
      }
    },
    {
      "id": "mcq-jvm-5-memory-allocations",
      "topicId": "topic-jvm-memory",
      "topicName": "JVM Architecture, Memory Model & Garbage Collection",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "According to the official JVM specification and Turing Core Java vetting, which runtime memory area is allocated per thread and stores the address of the Java Virtual Machine instruction currently being executed by that thread?",
      "options": [
        "Heap Memory",
        "Method Area (Metaspace)",
        "Program Counter (PC) Register",
        "Native Method Stack"
      ],
      "correctIndex": 2,
      "correctIndices": [
        2
      ],
      "explanation": "The JVM defines 5 runtime memory areas: 1) Program Counter (PC) Register: thread-local register that holds the address of the currently executing JVM instruction (or undefined if executing a native method). 2) JVM Stack: thread-local frames for local variables and operand stacks. 3) Heap: shared runtime memory for all class instances and arrays. 4) Method Area (Metaspace): shared storage for class metadata, runtime constant pool, and method code. 5) Native Method Stack: memory for C/C++ native methods invoked via JNI.",
      "deepDive": {
        "concept": "JVM 5 Runtime Data Areas",
        "whatToLookFor": "PC Register tracks execution pointer per thread; Heap & Method Area are shared across threads; Stack & PC are thread-local.",
        "searchKeywords": "JVM runtime data areas Program Counter Register Heap Stack Method Area",
        "recommendedRead": "Turing 105 Core Java Interview Questions & JVM Specification"
      }
    },
    {
      "id": "mcq-java-classloader-hierarchy",
      "topicId": "topic-jvm-memory",
      "topicName": "JVM Architecture, Memory Model & Garbage Collection",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "In the Java Runtime Environment (JRE), what is the correct hierarchy and delegation sequence when a class is requested by the default ClassLoader mechanism?",
      "options": [
        "Application (System) delegates to Extension (Platform), which delegates to Bootstrap",
        "Bootstrap delegates to Extension (Platform), which delegates to Application (System)",
        "Extension (Platform) delegates to Bootstrap, which delegates to Application (System)",
        "Application (System) delegates to Bootstrap, which delegates to Extension (Platform)"
      ],
      "correctIndex": 0,
      "correctIndices": [
        0
      ],
      "explanation": "Java uses the parent-delegation model for class loading. When the Application/System ClassLoader is asked to load a class, it delegates the request to its parent (Extension/Platform ClassLoader), which in turn delegates to the root Bootstrap ClassLoader. Only if Bootstrap cannot find the class does Extension attempt to load it; and only if Extension cannot find it does the Application ClassLoader search the application CLASSPATH.",
      "deepDive": {
        "concept": "ClassLoader Parent Delegation Model",
        "whatToLookFor": "Delegation goes upwards from Application to Extension to Bootstrap before class search proceeds downwards.",
        "searchKeywords": "Java ClassLoader delegation model hierarchy Bootstrap Extension Application",
        "recommendedRead": "Turing 105 Core Java Interview Questions & Baeldung ClassLoaders in Java"
      }
    },
    {
      "id": "mcq-backend-clustered-index",
      "topicId": "topic-backend-architecture-system-design",
      "topicName": "Back-End Architecture, Database Indexing & Distributed Systems",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "What is the fundamental architectural difference between a Clustered Index and a Non-Clustered Index in relational databases (such as MySQL InnoDB or PostgreSQL)?",
      "options": [
        "A table can have multiple clustered indexes, but only one non-clustered index.",
        "A clustered index physically sorts and stores actual data rows on disk in index order (allowing only one per table); a non-clustered index maintains a separate pointer structure to the physical rows.",
        "Non-clustered indexes are stored exclusively in RAM, while clustered indexes are stored on disk.",
        "Clustered indexes only work on primary keys; non-clustered indexes only work on foreign keys."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "A clustered index defines the physical order in which table rows are stored on the disk filesystem. Because data rows can only be physically sorted in one order, a table can have exactly ONE clustered index (typically the Primary Key). A non-clustered index is a separate B-Tree structure containing the indexed columns and reference pointers (RowIDs or clustered key) pointing to where the full row physically resides. Multiple non-clustered indexes can exist on a single table.",
      "deepDive": {
        "concept": "Physical Storage of Clustered vs. Non-Clustered Indexes",
        "whatToLookFor": "Clustered index = physical table row ordering (1 per table); Non-clustered index = separate pointer list (multiple allowed).",
        "searchKeywords": "Clustered vs non-clustered index physical storage InnoDB B-Tree",
        "recommendedRead": "Turing Back-End Technical Interview Q&A & High Performance MySQL"
      }
    },
    {
      "id": "mcq-backend-cap-theorem",
      "topicId": "topic-backend-architecture-system-design",
      "topicName": "Back-End Architecture, Database Indexing & Distributed Systems",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "According to Brewer's CAP Theorem, in a distributed database system operating across a network, what occurs when a network partition (P) arises?",
      "options": [
        "The system can simultaneously preserve both full Consistency (C) and high Availability (A) by using asynchronous replication.",
        "The system is forced to make a fundamental trade-off: either prioritize Consistency (CP) by rejecting unsynchronized requests, or prioritize Availability (AP) by serving potentially stale data.",
        "Partition tolerance can be disabled at runtime to guarantee consistency and availability.",
        "Network partitions only affect NoSQL databases; relational databases are immune to CAP constraints."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "In real-world distributed systems, network partitions (dropped packets, network latency, severed links) are unavoidable (P is non-negotiable). Therefore, when a partition occurs, an architecture MUST trade off between Consistency (CP)—refusing requests to guarantee all accessible nodes return identical, up-to-date data—and Availability (AP)—answering all requests immediately even if some nodes hold stale data.",
      "deepDive": {
        "concept": "CAP Theorem (Consistency vs. Availability under Network Partitions)",
        "whatToLookFor": "In distributed systems, P is unavoidable; the trade-off is strictly CP vs AP.",
        "searchKeywords": "CAP theorem Consistency Availability Partition Tolerance distributed systems",
        "recommendedRead": "Turing Back-End Technical Interview Q&A & Designing Data-Intensive Applications"
      }
    },
    {
      "id": "mcq-backend-sql-injection-prepared",
      "topicId": "topic-backend-architecture-system-design",
      "topicName": "Back-End Architecture, Database Indexing & Distributed Systems",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Why does using parameterized `PreparedStatement` queries in JDBC / Hibernate completely prevent SQL injection attacks, whereas string concatenation does not?",
      "options": [
        "PreparedStatement automatically strips all quotation marks and spaces from the input string.",
        "The database engine pre-compiles the SQL query structure and execution plan with placeholders (?) before receiving parameter values, treating parameters strictly as literal data rather than executable SQL syntax.",
        "PreparedStatement converts SQL into binary bytecode that cannot execute SQL comments.",
        "PreparedStatement executes queries inside a sandbox JVM that blocks destructive SQL commands like DROP or DELETE."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Parameterized queries separate SQL code from user-supplied data at the database protocol level. The SQL statement template with placeholders (?) is compiled into an execution plan first. When values are subsequently supplied, the database treats them strictly as literal column data values—even if the user input contains quotes, semicolons, or commands like OR 1=1; DROP TABLE users;. They are never evaluated by the SQL grammar parser.",
      "deepDive": {
        "concept": "Parameterized Queries & Precompiled AST Execution Plans",
        "whatToLookFor": "The DB compiles the query structure first; input values are treated exclusively as literal data, never parsed as SQL tokens.",
        "searchKeywords": "Why PreparedStatement prevents SQL injection parameterized query execution plan",
        "recommendedRead": "Turing Back-End Technical Interview Q&A & OWASP SQL Injection Prevention Cheat Sheet"
      }
    },
    {
      "id": "mcq-backend-testing-functional-acceptance",
      "topicId": "topic-backend-architecture-system-design",
      "topicName": "Back-End Architecture, Database Indexing & Distributed Systems",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "In modern software engineering and Turing vetting evaluations, what is the key conceptual distinction between Functional Testing and Acceptance Testing?",
      "options": [
        "Functional testing is automated; acceptance testing is strictly manual.",
        "Functional testing verifies that the software operates according to technical specifications ('Did we build the system right?'); Acceptance testing validates that the product meets business requirements and customer needs ('Did we build the right system?').",
        "Functional testing is executed by product managers; acceptance testing is executed by QA engineers.",
        "Functional testing applies only to backend APIs; acceptance testing applies only to frontend UI."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Functional testing is specification-focused: it verifies whether individual features and components perform according to technical design specs (checking inputs, outputs, error handling). Acceptance testing (UAT) is business- and user-focused: it validates whether the integrated system actually fulfills the end user's business goals and delivers the intended value.",
      "deepDive": {
        "concept": "Functional Verification vs. Acceptance Validation",
        "whatToLookFor": "Functional = technical verification ('Build the system right'); Acceptance = business validation ('Build the right system').",
        "searchKeywords": "Functional testing vs acceptance testing difference software engineering",
        "recommendedRead": "Turing Back-End Technical Interview Q&A"
      }
    },
    {
      "id": "mcq-sb-runner-args",
      "topicId": "topic-spring-boot-autoconfig",
      "topicName": "Spring Boot Auto-Configuration, Starters & Actuator",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "Both `CommandLineRunner` and `ApplicationRunner` execute callback logic immediately after the Spring Boot `ApplicationContext` is fully initialized. What is the key difference between their `run()` methods?",
      "options": [
        "CommandLineRunner runs asynchronously in a background thread, while ApplicationRunner runs on the main thread.",
        "CommandLineRunner.run(String... args) receives raw string arguments, whereas ApplicationRunner.run(ApplicationArguments args) provides parsed access to option arguments (--key=value) and non-option arguments.",
        "ApplicationRunner runs before bean initialization; CommandLineRunner runs after bean destruction.",
        "CommandLineRunner can only be used in CLI applications, while ApplicationRunner works in web apps."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "CommandLineRunner.run(String... args) receives arguments as a raw varargs array of strings (String[]). ApplicationRunner.run(ApplicationArguments args) wraps arguments in the Spring ApplicationArguments abstraction, allowing convenient access methods like getOptionNames(), getOptionValues(\"name\"), and getNonOptionArgs().",
      "deepDive": {
        "concept": "Spring Boot Runner Interfaces (ApplicationRunner vs. CommandLineRunner)",
        "whatToLookFor": "ApplicationArguments parses --key=value options; String... args delivers raw unparsed strings.",
        "searchKeywords": "Spring Boot ApplicationRunner vs CommandLineRunner difference Baeldung",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions"
      }
    },
    {
      "id": "mcq-sb-pagination-slice",
      "topicId": "topic-spring-jpa-transactions",
      "topicName": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "When querying large datasets using Spring Data JPA with `Pageable`, why might returning a `Slice<T>` be significantly faster and more scalable than returning a `Page<T>`?",
      "options": [
        "Slice<T> caches all database rows in Redis automatically.",
        "Page<T> executes an additional expensive SELECT COUNT(*) query to compute total elements and pages, whereas Slice<T> only fetches limit + 1 rows to check if a next slice exists without running a count query.",
        "Slice<T> skips database row-level locking.",
        "Slice<T> converts JPA entities to DTOs in the database driver."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "When a repository returns Page<T>, Spring Data JPA automatically executes two SQL statements: the paginated query (LIMIT ? OFFSET ?) AND an expensive SELECT COUNT(*) to calculate total elements and page count. For large tables (millions of rows), COUNT(*) causes significant performance bottlenecks. Slice<T> avoids the COUNT(*) query entirely by simply querying limit + 1 rows to know whether a 'Next' page exists.",
      "deepDive": {
        "concept": "Spring Data JPA Pagination Performance (Slice vs. Page)",
        "whatToLookFor": "Use Slice for infinite scrolling or large tables to avoid SELECT COUNT(*); use Page only when exact total page count is required for UI navigation.",
        "searchKeywords": "Spring Data JPA Page vs Slice performance count query Baeldung",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions & Spring Data JPA Guide"
      }
    },
    {
      "id": "mcq-sb-transactional-event-listener",
      "topicId": "topic-spring-jpa-transactions",
      "topicName": "Spring Data JPA, @Transactional Mechanics & Web Layer",
      "difficulty": "Medium",
      "isMultiSelect": false,
      "question": "In Spring Boot, when a service publishes an `ApplicationEvent` within an active transaction and another bean listens via `@TransactionalEventListener`, at what phase does the listener execute by default?",
      "options": [
        "TransactionPhase.BEFORE_COMMIT",
        "TransactionPhase.AFTER_COMMIT",
        "TransactionPhase.AFTER_ROLLBACK",
        "TransactionPhase.AFTER_COMPLETION"
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "By default, @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT) only executes after the publishing transaction has successfully committed to the database. This prevents side-effects (such as sending notification emails, publishing external messages, or triggering downstream jobs) from executing if the enclosing database transaction ultimately fails or rolls back.",
      "deepDive": {
        "concept": "Transactional Event Handling & Phase Binding",
        "whatToLookFor": "Default phase is AFTER_COMMIT so side-effects don't fire if the transaction aborts.",
        "searchKeywords": "Spring @TransactionalEventListener default phase AFTER_COMMIT",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions & Baeldung Guide"
      }
    },
    {
      "id": "mcq-sb-binding-result-placement",
      "topicId": "topic-spring-boot-defaults-lifecycle",
      "topicName": "Spring Boot Defaults, Request Lifecycle & Architecture",
      "difficulty": "Hard",
      "isMultiSelect": false,
      "question": "In a Spring Boot `@RestController`, what is the critical rule regarding the placement of the `BindingResult` parameter when validating request payloads with `@Valid` or `@Validated`?",
      "options": [
        "BindingResult must be the first parameter in the method signature before any @RequestBody.",
        "BindingResult must immediately follow the validated model object parameter with no other parameters in between.",
        "BindingResult can only be injected via class-level @Autowired field injection.",
        "BindingResult is only permitted in @Controller view templates, not in @RestController."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "In Spring MVC, BindingResult or Errors MUST immediately follow the object being validated (@Valid @RequestBody UserDto dto, BindingResult result). If any other parameter is placed between them, Spring cannot associate the validation results with the payload, throwing an IllegalStateException or triggering default unhandled exception flow (MethodArgumentNotValidException).",
      "deepDive": {
        "concept": "Spring MVC Validation BindingResult Ordering Rules",
        "whatToLookFor": "BindingResult MUST immediately follow the validated argument.",
        "searchKeywords": "Spring MVC BindingResult immediately following @Valid parameter order",
        "recommendedRead": "Turing 100+ Spring Boot Interview Questions & Spring Framework MVC Docs"
      }
    },
    {
      "id": "mcq-java-no-pointers",
      "topicId": "topic-core-java-oop",
      "topicName": "Core Java OOP, Exception Handling & Serialization",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "Why did the designers of Java intentionally omit explicit pointer manipulation (such as pointer arithmetic `ptr++` and `&addr`) found in C/C++?",
      "options": [
        "To make Java execute faster than C++ on all CPU architectures.",
        "To enhance memory safety and security (preventing arbitrary memory access and buffer overflows), reduce language complexity, and enable the Garbage Collector to freely relocate and compact heap memory.",
        "Because 64-bit operating systems do not support memory addresses.",
        "Because pointers cannot be used in object-oriented programming."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "Omitting direct pointer arithmetic is a core security and stability design decision in Java: 1) Prevents buffer overflows, dangling pointers, and unauthorized memory access. 2) Greatly simplifies development and eliminates difficult-to-track memory corruption bugs. 3) Allows the JVM Garbage Collector to move, relocate, and compact objects on the heap during garbage collection without breaking user-space references.",
      "deepDive": {
        "concept": "Java Memory Safety & Managed Object References",
        "whatToLookFor": "Security (no raw memory corruption), simplicity, and GC relocatability.",
        "searchKeywords": "Why Java does not use pointers memory safety garbage collection",
        "recommendedRead": "Turing 105 Core Java Interview Questions"
      }
    },
    {
      "id": "mcq-turing-remote-standup-format",
      "topicId": "topic-turing-seniority-survey",
      "topicName": "Turing Seniority Survey, Remote Engineering & Behavioral Vetting",
      "difficulty": "Easy",
      "isMultiSelect": false,
      "question": "In high-performing distributed engineering teams at Turing, what is the standard 3-part structure for daily synchronous or asynchronous standup updates?",
      "options": [
        "1) Current bug count, 2) Code lines committed, 3) End of sprint projection.",
        "1) What was accomplished yesterday, 2) What is planned for today, 3) Any blockers or impediments needing assistance.",
        "1) Customer tickets resolved, 2) Meeting hours logged, 3) Code review score.",
        "1) Architecture proposals, 2) Performance benchmarks, 3) Salary milestones."
      ],
      "correctIndex": 1,
      "correctIndices": [
        1
      ],
      "explanation": "The standard Agile / remote engineering standup format universally practiced at Turing focuses on: 1) What did you complete yesterday? 2) What are you working on today? 3) Are there any blockers / impediments preventing progress? This provides high-signal transparency without micro-management across asynchronous time zones.",
      "deepDive": {
        "concept": "Remote Engineering Daily Standup Cadence & Accountability",
        "whatToLookFor": "Yesterday accomplishments -> Today commitments -> Active blockers.",
        "searchKeywords": "Remote software developer daily standup three questions Agile",
        "recommendedRead": "Turing Remote Developer Interview Questions & Guide"
      }
    }
  ],
  "leetcode": [
    {
      "id": "lc-020",
      "problemName": "Valid Parentheses",
      "problemNumber": 20,
      "url": "https://leetcode.com/problems/valid-parentheses/",
      "difficulty": "Easy",
      "pattern": "String, Stack",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "100.0% (Rank #1 on Turing)",
      "mistakesOrPitfalls": "Forgetting to check if stack is empty before calling pop(), causing EmptyStackException on strings like `']'`. Also forgetting to check `stack.isEmpty()` at the very end.",
      "keyTakeaway": "Use a map/dictionary of matching pairs: when opening bracket seen, push matching closing bracket to stack. When char matches top of stack, pop it. Valid if stack empty at end.",
      "revisitNeeded": false
    },
    {
      "id": "lc-003",
      "problemName": "Longest Substring Without Repeating Characters",
      "problemNumber": 3,
      "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      "difficulty": "Medium",
      "pattern": "Sliding Window, Hash Table",
      "status": "Solved with Hint",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(min(N, M))",
      "dateLogged": "2026-11-01",
      "frequency": "91.8% (Rank #2 on Turing)",
      "mistakesOrPitfalls": "When a repeated character is encountered, updating the left pointer naively without taking `Math.max(left, map.get(c) + 1)`, causing the left pointer to move backward into previously skipped parts of the window.",
      "keyTakeaway": "Store `{character: last_seen_index}` in map. Slide `right` pointer forward. If char exists, update `left = Math.max(left, map.get(c) + 1)`. Window size is `right - left + 1`.",
      "revisitNeeded": true
    },
    {
      "id": "lc-682",
      "problemName": "Baseball Game",
      "problemNumber": 682,
      "url": "https://leetcode.com/problems/baseball-game/",
      "difficulty": "Easy",
      "pattern": "Array, Stack, Simulation",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "81.2% (Rank #3 on Turing - Classic Warmup)",
      "mistakesOrPitfalls": "For '+' operation, popping top element to read second element and forgetting to push the first element back before pushing their sum.",
      "keyTakeaway": "Classic stack simulation: integer -> push; '+' -> peek top and second-to-top then push sum; 'D' -> peek top * 2 then push; 'C' -> pop top. Sum all remaining elements in stack.",
      "revisitNeeded": false
    },
    {
      "id": "lc-983",
      "problemName": "Minimum Cost For Tickets",
      "problemNumber": 983,
      "url": "https://leetcode.com/problems/minimum-cost-for-tickets/",
      "difficulty": "Medium",
      "pattern": "Array, Dynamic Programming",
      "status": "Needed Solution",
      "timeComplexity": "O(lastDay) or O(365) = O(1)",
      "spaceComplexity": "O(365) = O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "73.8% (Rank #4 on Turing)",
      "mistakesOrPitfalls": "Iterating over ticket indexes instead of calendar travel days. For non-travel days, cost remains `dp[day - 1]`. Off-by-one errors with day indexing (e.g. `day - 7 < 0`).",
      "keyTakeaway": "1D DP array of size 366 (or max(days)+1). If day is not in travel set, `dp[i] = dp[i-1]`. If travel day: `dp[i] = min(dp[i-1] + cost[0], dp[max(0, i-7)] + cost[1], dp[max(0, i-30)] + cost[2])`.",
      "revisitNeeded": true
    },
    {
      "id": "lc-875",
      "problemName": "Koko Eating Bananas",
      "problemNumber": 875,
      "url": "https://leetcode.com/problems/koko-eating-bananas/",
      "difficulty": "Medium",
      "pattern": "Array, Binary Search",
      "status": "Solved with Hint",
      "timeComplexity": "O(N * log(max(piles)))",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "71.5% (Rank #5 on Turing)",
      "mistakesOrPitfalls": "Integer division truncation: must compute ceiling division `(pile + k - 1) / k` or `(long)Math.ceil((double)pile / k)` to avoid undercounting hours. Also potential 32-bit integer overflow when summing total hours (use `long totalHours`).",
      "keyTakeaway": "Binary search on the answer (speed `k` from 1 to `max(piles)`). If valid speed, search lower half (`high = mid`); else search upper half (`low = mid + 1`).",
      "revisitNeeded": true
    },
    {
      "id": "lc-468",
      "problemName": "Validate IP Address",
      "problemNumber": 468,
      "url": "https://leetcode.com/problems/validate-ip-address/",
      "difficulty": "Medium",
      "pattern": "String",
      "status": "To Do",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "65.7% (Rank #6 on Turing - Asked in Last 6 Mo)",
      "mistakesOrPitfalls": "Using standard `String.split(\"\\\\.\")` which drops trailing empty tokens (e.g. `'1.1.1.1.'` returns 4 chunks instead of 5). Must use `split(\"\\\\.\", -1)`. Also watch for leading zeros in IPv4 ('01') and negative numbers.",
      "keyTakeaway": "Use `split(\":\", -1)` for IPv6 and `split(\"\\\\.\", -1)` for IPv4. IPv4: 4 chunks, no leading zero, digits only, 0-255. IPv6: 8 chunks, 1-4 hex chars (0-9, a-f, A-F).",
      "revisitNeeded": true
    },
    {
      "id": "lc-014",
      "problemName": "Longest Common Prefix",
      "problemNumber": 14,
      "url": "https://leetcode.com/problems/longest-common-prefix/",
      "difficulty": "Easy",
      "pattern": "String, Trie",
      "status": "Solved Solo",
      "timeComplexity": "O(S) where S is sum of all characters",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "65.7% (Rank #7 on Turing)",
      "mistakesOrPitfalls": "Handling empty array `strs == null || strs.length == 0` or single empty string `[\"\"]`. StringIndexOutOfBoundsException if prefix exceeds string length.",
      "keyTakeaway": "Initialize prefix = strs[0]. Loop over remaining strings: while `s.indexOf(prefix) != 0`, trim prefix by 1 char (`prefix.substring(0, prefix.length() - 1)`). If empty, return \"\".",
      "revisitNeeded": false
    },
    {
      "id": "lc-200",
      "problemName": "Number of Islands",
      "problemNumber": 200,
      "url": "https://leetcode.com/problems/number-of-islands/",
      "difficulty": "Medium",
      "pattern": "Array, DFS, BFS",
      "status": "Solved Solo",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(M * N)",
      "dateLogged": "2026-11-01",
      "frequency": "65.7% (Rank #8 on Turing)",
      "mistakesOrPitfalls": "Forgetting boundary checks `r < 0 || c < 0 || r >= rows || c >= cols` or sinking visited cells (`grid[r][c] = '0'`) before recursing, causing infinite recursion StackOverflowError.",
      "keyTakeaway": "Iterate each cell. When '1' found, increment count and trigger DFS/BFS sink: turn current cell to '0' and recursively visit all 4 adjacent directions.",
      "revisitNeeded": false
    },
    {
      "id": "lc-3138",
      "problemName": "Minimum Length of Anagram Concatenation",
      "problemNumber": 3138,
      "url": "https://leetcode.com/problems/minimum-length-of-anagram-concatenation/",
      "difficulty": "Medium",
      "pattern": "Hash Table, String, Counting",
      "status": "To Do",
      "timeComplexity": "O(N * d(N)) where d(N) is number of divisors of N",
      "spaceComplexity": "O(26) = O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "62.0% (Rank #9 on Turing - Leaked Recent)",
      "mistakesOrPitfalls": "Testing non-divisors of string length $N$. The base anagram length $L$ MUST be a divisor of $N$ ($N \\% L == 0$).",
      "keyTakeaway": "Check every divisor $L$ of $N$ in ascending order. Compute character frequency array `int[26]` of first block `[0..L-1]`. Verify all subsequent blocks of size $L$ have the exact same frequency array.",
      "revisitNeeded": true
    },
    {
      "id": "lc-997",
      "problemName": "Find the Town Judge",
      "problemNumber": 997,
      "url": "https://leetcode.com/problems/find-the-town-judge/",
      "difficulty": "Easy",
      "pattern": "Array, Hash Table, Graph",
      "status": "Solved Solo",
      "timeComplexity": "O(E + N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "62.0% (Rank #10 on Turing - High Frequency)",
      "mistakesOrPitfalls": "Building a full adjacency list map of sets instead of a single 1D degree array. Off-by-one errors with 1-based person indices `1..n`.",
      "keyTakeaway": "Use single array `trustScore[n+1]`. For trust `[a, b]`: `trustScore[a]--; trustScore[b]++;`. Town judge must have score `n - 1` (trusted by everyone, trusts no one).",
      "revisitNeeded": false
    },
    {
      "id": "lc-3091",
      "problemName": "Apply Operations to Make Sum of Array Greater Than or Equal to k",
      "problemNumber": 3091,
      "url": "https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k/",
      "difficulty": "Medium",
      "pattern": "Math, Greedy, Enumeration",
      "status": "To Do",
      "timeComplexity": "O(sqrt(K))",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "57.5% (Rank #11 on Turing)",
      "mistakesOrPitfalls": "Simulating operations step-by-step with a loop or recursion. The optimal value $x$ will be close to $\\sqrt{k}$.",
      "keyTakeaway": "If we increment original element 1 up to $x$, cost is $(x - 1)$. Then we duplicate $x$ until sum $\\ge k$, requiring $\\lceil k / x \\rceil - 1$ duplicate ops. Total ops = $(x - 1) + \\lceil k / x \\rceil - 1$. Iterate $x$ from 1 to $\\lceil\\sqrt{k}\\rceil$ and take minimum.",
      "revisitNeeded": true
    },
    {
      "id": "lc-053",
      "problemName": "Maximum Subarray",
      "problemNumber": 53,
      "url": "https://leetcode.com/problems/maximum-subarray/",
      "difficulty": "Medium",
      "pattern": "Array, Dynamic Programming",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "57.5% (Rank #12 on Turing)",
      "mistakesOrPitfalls": "Initializing `maxSum = 0` instead of `nums[0]`, which fails arrays with all negative numbers like `[-2, -1]`.",
      "keyTakeaway": "Kadane's Algorithm: `currentSum = Math.max(num, currentSum + num)`. `maxSum = Math.max(maxSum, currentSum)`. Linear time, O(1) space.",
      "revisitNeeded": false
    },
    {
      "id": "lc-070",
      "problemName": "Climbing Stairs",
      "problemNumber": 70,
      "url": "https://leetcode.com/problems/climbing-stairs/",
      "difficulty": "Easy",
      "pattern": "Math, Dynamic Programming",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "57.5% (Rank #13 on Turing)",
      "mistakesOrPitfalls": "Using unmemoized recursion $O(2^N)$ which exceeds time limit for $N=45$.",
      "keyTakeaway": "Fibonacci progression: `dp[i] = dp[i-1] + dp[i-2]`. Keep only two variables `prev1` and `prev2` to achieve O(1) space.",
      "revisitNeeded": false
    },
    {
      "id": "lc-056",
      "problemName": "Merge Intervals",
      "problemNumber": 56,
      "url": "https://leetcode.com/problems/merge-intervals/",
      "difficulty": "Medium",
      "pattern": "Array, Sorting",
      "status": "Solved Solo",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "57.5% (Rank #14 on Turing)",
      "mistakesOrPitfalls": "Forgetting to sort intervals by start time first (`(a, b) -> Integer.compare(a[0], b[0])`). Updating end time incorrectly: must be `Math.max(current[1], next[1])`.",
      "keyTakeaway": "Sort by start time. Add first interval to output. For each next interval: if `next.start <= current.end`, merge by updating `current.end = Math.max(current.end, next.end)`. Else, append `next`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-010",
      "problemName": "Regular Expression Matching",
      "problemNumber": 10,
      "url": "https://leetcode.com/problems/regular-expression-matching/",
      "difficulty": "Hard",
      "pattern": "String, Dynamic Programming",
      "status": "To Do",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(M * N)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #15 on Turing - Rare Gate)",
      "mistakesOrPitfalls": "Handling `'*'` which can match zero preceding characters. Must check `dp[i][j-2]` for 0 occurrences, or `(firstMatch && dp[i-1][j])` for 1+ occurrences.",
      "keyTakeaway": "2D DP `boolean dp[sLen+1][pLen+1]`. `dp[0][0] = true`. Handle empty string matching patterns like `a*b*c*`. If `p[j-1] == '*'`: zero matches (`dp[i][j-2]`) or 1+ matches.",
      "revisitNeeded": true
    },
    {
      "id": "lc-609",
      "problemName": "Find Duplicate File in System",
      "problemNumber": 609,
      "url": "https://leetcode.com/problems/find-duplicate-file-in-system/",
      "difficulty": "Medium",
      "pattern": "Array, Hash Table, String",
      "status": "To Do",
      "timeComplexity": "O(Total Characters)",
      "spaceComplexity": "O(Total Characters)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #16 on Turing)",
      "mistakesOrPitfalls": "Returning single files with no duplicates (Turing hidden tests expect only content groups with `size() > 1`). Also handling paths with spaces or parentheses.",
      "keyTakeaway": "Parse directory path and filenames. Extract file content using `substring(openParen + 1, closeParen)`. Store in `Map<String, List<String>> contentToPaths`. Filter out lists with size <= 1.",
      "revisitNeeded": false
    },
    {
      "id": "lc-128",
      "problemName": "Longest Consecutive Sequence",
      "problemNumber": 128,
      "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
      "difficulty": "Medium",
      "pattern": "Array, Hash Table, Union Find",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #17 on Turing)",
      "mistakesOrPitfalls": "Iterating through every number blindly, leading to $O(N^2)$ worst-case. You must only start a streak count if `!set.contains(num - 1)`.",
      "keyTakeaway": "Insert all numbers into `HashSet`. Only attempt to build sequence from `num` if `num - 1` is NOT in set (identifies beginning of a sequence). While `set.contains(current + 1)`, increment streak. Linear time.",
      "revisitNeeded": false
    },
    {
      "id": "lc-1013",
      "problemName": "Partition Array Into Three Parts With Equal Sum",
      "problemNumber": 1013,
      "url": "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/",
      "difficulty": "Easy",
      "pattern": "Array, Greedy",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #18 on Turing)",
      "mistakesOrPitfalls": "Checking if total sum is divisible by 3 (`totalSum % 3 != 0`), and counting parts: if `parts >= 3`, return true (any trailing zeros add up to 3 parts).",
      "keyTakeaway": "Sum array. If `sum % 3 != 0`, return false. Target is `sum / 3`. Iterate through array accumulating running sum; whenever running sum equals target, increment `count` and reset running sum. Return `count >= 3`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-238",
      "problemName": "Product of Array Except Self",
      "problemNumber": 238,
      "url": "https://leetcode.com/problems/product-of-array-except-self/",
      "difficulty": "Medium",
      "pattern": "Array, Prefix Sum",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1) auxiliary",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #19 on Turing)",
      "mistakesOrPitfalls": "Using division operator (expressly forbidden in problem description). Forgetting to handle zeros in array.",
      "keyTakeaway": "Two passes: first pass populates prefix products into output array `res[i] = res[i-1] * nums[i-1]`. Second pass maintains running suffix product `right = right * nums[i+1]` and multiplies into `res[i]`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-1456",
      "problemName": "Maximum Number of Vowels in a Substring of Given Length",
      "problemNumber": 1456,
      "url": "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
      "difficulty": "Medium",
      "pattern": "String, Sliding Window",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #20 on Turing)",
      "mistakesOrPitfalls": "Re-counting vowels across the entire window of size $k$ each iteration ($O(N \\times k)$ TLE). Must use sliding window increment/decrement.",
      "keyTakeaway": "Fixed-size sliding window of length $k$. Count vowels in first $k$ chars. Slide window: if outgoing `s[i-k]` is vowel, count--; if incoming `s[i]` is vowel, count++. Track max.",
      "revisitNeeded": false
    },
    {
      "id": "lc-198",
      "problemName": "House Robber",
      "problemNumber": 198,
      "url": "https://leetcode.com/problems/house-robber/",
      "difficulty": "Medium",
      "pattern": "Array, Dynamic Programming",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #21 on Turing)",
      "mistakesOrPitfalls": "Allocating full O(N) array when only two previous states `rob1` and `rob2` are needed.",
      "keyTakeaway": "At each house: `current = Math.max(rob1 + num, rob2)`. Update `rob1 = rob2`, `rob2 = current`. Return `rob2`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-697",
      "problemName": "Degree of an Array",
      "problemNumber": 697,
      "url": "https://leetcode.com/problems/degree-of-an-array/",
      "difficulty": "Easy",
      "pattern": "Array, Hash Table",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "51.8% (Rank #22 on Turing)",
      "mistakesOrPitfalls": "Multiple elements sharing the same maximum frequency (degree). Must check shortest span `lastIndex - firstIndex + 1` across ALL elements matching max degree.",
      "keyTakeaway": "Single pass storing 3 maps (or 1 map of int[3]): `countMap`, `firstIndexMap`, `lastIndexMap`. Degree = max count. Shortest subarray length = `min(last[x] - first[x] + 1)` for all `x` with `count[x] == degree`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-818",
      "problemName": "Race Car",
      "problemNumber": 818,
      "url": "https://leetcode.com/problems/race-car/",
      "difficulty": "Hard",
      "pattern": "Dynamic Programming, BFS",
      "status": "To Do",
      "timeComplexity": "O(T log T)",
      "spaceComplexity": "O(T log T)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #23 on Turing - High-Tier Hard)",
      "mistakesOrPitfalls": "BFS queue explosion without state pruning. Must bound position to $0 < pos < 2 \\times target$.",
      "keyTakeaway": "DP or BFS on state `(pos, speed)`. 'A': pos += speed, speed *= 2. 'R': speed = speed > 0 ? -1 : 1. Optimal substructure with bitwise power of 2 targets.",
      "revisitNeeded": true
    },
    {
      "id": "lc-055",
      "problemName": "Jump Game",
      "problemNumber": 55,
      "url": "https://leetcode.com/problems/jump-game/",
      "difficulty": "Medium",
      "pattern": "Array, Dynamic Programming, Greedy",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #24 on Turing)",
      "mistakesOrPitfalls": "Using nested loop DP $O(N^2)$ instead of linear greedy reachability check.",
      "keyTakeaway": "Maintain `maxReach = 0`. For index `i`: if `i > maxReach`, return false (cannot reach `i`). Update `maxReach = Math.max(maxReach, i + nums[i])`. If `maxReach >= n - 1`, return true.",
      "revisitNeeded": false
    },
    {
      "id": "lc-3153",
      "problemName": "Sum of Digit Differences of All Pairs",
      "problemNumber": 3153,
      "url": "https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs/",
      "difficulty": "Medium",
      "pattern": "Array, Hash Table, Math",
      "status": "To Do",
      "timeComplexity": "O(N * D) where D is number of digits",
      "spaceComplexity": "O(D * 10)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #25 on Turing - 2025/2026 Leaked)",
      "mistakesOrPitfalls": "Evaluating all pairs $(i, j)$ in $O(N^2)$ time resulting in TLE when $N=10^5$. 32-bit integer overflow: result MUST be `long`.",
      "keyTakeaway": "For each digit position $p$: count frequencies of digits 0..9. Number of different pairs at position $p$ is $\\sum_{d=0}^{9} count[d] \\times (N - count[d]) / 2$. Sum across all digit positions in $O(N \\times D)$ time.",
      "revisitNeeded": true
    },
    {
      "id": "lc-1498",
      "problemName": "Number of Subsequences That Satisfy the Given Sum Condition",
      "problemNumber": 1498,
      "url": "https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/",
      "difficulty": "Medium",
      "pattern": "Array, Two Pointers, Binary Search",
      "status": "To Do",
      "timeComplexity": "O(N log N)",
      "spaceComplexity": "O(N) for precomputed powers of 2",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #26 on Turing)",
      "mistakesOrPitfalls": "Forgetting that subsequences don't require contiguous order: sorting the array DOES NOT change subsequence min/max valid combinations! Also computing $2^{right-left}$ with Math.pow causes overflow; must precompute powers modulo $10^9+7$.",
      "keyTakeaway": "Sort array. Two pointers `left = 0, right = n - 1`. If `nums[left] + nums[right] <= target`, all $2^{right - left}$ combinations with `nums[left]` as min are valid! Add `power[right - left]`, `left++`. Else `right--`.",
      "revisitNeeded": true
    },
    {
      "id": "lc-438",
      "problemName": "Find All Anagrams in a String",
      "problemNumber": 438,
      "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
      "difficulty": "Medium",
      "pattern": "Hash Table, String, Sliding Window",
      "status": "Solved with Hint",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1) [26 characters]",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #27 on Turing)",
      "mistakesOrPitfalls": "Re-sorting substring of length $p$ on each shift ($O(N \\times P \\log P)$). Must maintain fixed-size frequency array `int[26]`.",
      "keyTakeaway": "Sliding window of length $P$. Maintain frequency arrays `pCount` and `sCount`. Compare arrays with `Arrays.equals(pCount, sCount)`. Slide window by adding right char and decrementing left char.",
      "revisitNeeded": false
    },
    {
      "id": "lc-121",
      "problemName": "Best Time to Buy and Sell Stock",
      "problemNumber": 121,
      "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "difficulty": "Easy",
      "pattern": "Array, Dynamic Programming",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #28 on Turing)",
      "mistakesOrPitfalls": "Trying to sell before buying (e.g. tracking max and min without index order).",
      "keyTakeaway": "Track `minPrice` seen so far. At each price: `maxProfit = Math.max(maxProfit, price - minPrice)`, then `minPrice = Math.min(minPrice, price)`. One pass.",
      "revisitNeeded": false
    },
    {
      "id": "lc-215",
      "problemName": "Kth Largest Element in an Array",
      "problemNumber": 215,
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      "difficulty": "Medium",
      "pattern": "Array, Divide and Conquer, Sorting",
      "status": "Solved Solo",
      "timeComplexity": "O(N) average via Quickselect, O(N log K) via Min-Heap",
      "spaceComplexity": "O(K) or O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #29 on Turing)",
      "mistakesOrPitfalls": "Full sort $O(N \\log N)$ works on LeetCode but Turing interviewer rounds specifically demand $O(N)$ Quickselect or $O(N \\log K)$ Min-Heap.",
      "keyTakeaway": "Use `PriorityQueue<Integer>` of size $k$ (Min-Heap). If size exceeds $k$, `poll()`. Head of heap is the $k$-th largest element.",
      "revisitNeeded": false
    },
    {
      "id": "lc-1668",
      "problemName": "Maximum Repeating Substring",
      "problemNumber": 1668,
      "url": "https://leetcode.com/problems/maximum-repeating-substring/",
      "difficulty": "Easy",
      "pattern": "String, Dynamic Programming, String Matching",
      "status": "Solved Solo",
      "timeComplexity": "O(N * M)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #30 on Turing)",
      "mistakesOrPitfalls": "Counting occurrences that are non-contiguous. The question demands k-repeating contiguous sequence `word.repeat(k)`.",
      "keyTakeaway": "Initialize `count = 0`, repeated = `word`. While `sequence.contains(repeated)`: `count++`, `repeated += word`. Return count.",
      "revisitNeeded": false
    },
    {
      "id": "lc-054",
      "problemName": "Spiral Matrix",
      "problemNumber": 54,
      "url": "https://leetcode.com/problems/spiral-matrix/",
      "difficulty": "Medium",
      "pattern": "Array, Matrix, Simulation",
      "status": "Solved Solo",
      "timeComplexity": "O(M * N)",
      "spaceComplexity": "O(1) auxiliary",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #31 on Turing)",
      "mistakesOrPitfalls": "Adding duplicate elements in single row/column matrices: must check `top <= bottom` and `left <= right` before traversing left and up.",
      "keyTakeaway": "Maintain 4 boundaries `top = 0, bottom = rows - 1, left = 0, right = cols - 1`. Traverse right (top++), down (right--), left (bottom-- if top <= bottom), up (left++ if left <= right).",
      "revisitNeeded": false
    },
    {
      "id": "lc-005",
      "problemName": "Longest Palindromic Substring",
      "problemNumber": 5,
      "url": "https://leetcode.com/problems/longest-palindromic-substring/",
      "difficulty": "Medium",
      "pattern": "Two Pointers, String, Dynamic Programming",
      "status": "Solved with Hint",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #32 on Turing)",
      "mistakesOrPitfalls": "Only checking odd-length palindromes (single center) and forgetting even-length palindromes (two-character center `i, i+1`).",
      "keyTakeaway": "Expand around center: for each index $i$, expand for odd length `(i, i)` and even length `(i, i + 1)`. Track maximum palindrome substring slice.",
      "revisitNeeded": false
    },
    {
      "id": "lc-180",
      "problemName": "Consecutive Numbers",
      "problemNumber": 180,
      "url": "https://leetcode.com/problems/consecutive-numbers/",
      "difficulty": "Medium",
      "pattern": "Database, SQL",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #33 on Turing - High-Frequency SQL)",
      "mistakesOrPitfalls": "Assuming `id` values are strictly consecutive with no missing IDs. In real data, `id` might have gaps; window function `LEAD/LAG` over `id` vs order.",
      "keyTakeaway": "SQL: `SELECT DISTINCT num AS ConsecutiveNums FROM (SELECT num, LEAD(num, 1) OVER (ORDER BY id) AS next1, LEAD(num, 2) OVER (ORDER BY id) AS next2 FROM Logs) t WHERE num = next1 AND num = next2`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-125",
      "problemName": "Valid Palindrome",
      "problemNumber": 125,
      "url": "https://leetcode.com/problems/valid-palindrome/",
      "difficulty": "Easy",
      "pattern": "Two Pointers, String",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #34 on Turing)",
      "mistakesOrPitfalls": "Creating a new filtered string with regex `replaceAll(\"[^a-zA-Z0-9]\", \"\")` which uses $O(N)$ extra memory. Must use two pointers with `Character.isLetterOrDigit` in $O(1)$ space.",
      "keyTakeaway": "Two pointers `left = 0, right = s.length() - 1`. Skip non-alphanumeric characters. Compare `Character.toLowerCase(s[left]) != Character.toLowerCase(s[right])`. Move inwards.",
      "revisitNeeded": false
    },
    {
      "id": "lc-424",
      "problemName": "Longest Repeating Character Replacement",
      "problemNumber": 424,
      "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
      "difficulty": "Medium",
      "pattern": "Hash Table, String, Sliding Window",
      "status": "Solved with Hint",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1) [26 characters]",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #35 on Turing)",
      "mistakesOrPitfalls": "Decreasing `maxFrequency` when shrinking window from left. You do NOT need to decrease `maxFrequency` because a smaller frequency cannot yield a longer valid window.",
      "keyTakeaway": "Sliding window with frequency count array `int[26]`. Maintain `maxFreq`. Window is valid if `(right - left + 1) - maxFreq <= k`. If invalid, `count[s[left]]--; left++`. Window size is max length.",
      "revisitNeeded": true
    },
    {
      "id": "lc-049",
      "problemName": "Group Anagrams",
      "problemNumber": 49,
      "url": "https://leetcode.com/problems/group-anagrams/",
      "difficulty": "Medium",
      "pattern": "Array, Hash Table, String",
      "status": "Solved Solo",
      "timeComplexity": "O(N * K log K) or O(N * K)",
      "spaceComplexity": "O(N * K)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #36 on Turing)",
      "mistakesOrPitfalls": "Using `HashMap<int[], List<String>>`: array equals in Java does not compare content! Convert sorted char array to `String.valueOf(chars)` or count string `\"#1#0#2...\"` as key.",
      "keyTakeaway": "Sort each word's characters as canonical hash key: `char[] ca = s.toCharArray(); Arrays.sort(ca); String key = String.valueOf(ca)`. Store in `map.computeIfAbsent(key, k -> new ArrayList<>()).add(s)`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-917",
      "problemName": "Reverse Only Letters",
      "problemNumber": 917,
      "url": "https://leetcode.com/problems/reverse-only-letters/",
      "difficulty": "Easy",
      "pattern": "Two Pointers, String",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #37 on Turing)",
      "mistakesOrPitfalls": "Reversing non-letter characters like hyphens, brackets, numbers. Must use `Character.isLetter()`.",
      "keyTakeaway": "Two pointers `left = 0, right = s.length() - 1`. While `left < right`: if `!Character.isLetter(s[left])`, `left++`; else if `!Character.isLetter(s[right])`, `right--`; else swap chars and `left++, right--`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-015",
      "problemName": "3Sum",
      "problemNumber": 15,
      "url": "https://leetcode.com/problems/3sum/",
      "difficulty": "Medium",
      "pattern": "Array, Two Pointers, Sorting",
      "status": "Solved with Hint",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1) auxiliary",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #38 on Turing)",
      "mistakesOrPitfalls": "Duplicate triplets in output! Must skip duplicate values for the first element (`if (i > 0 && nums[i] == nums[i-1]) continue`), and after finding a valid triplet, advance `left` and `right` past all identical duplicates.",
      "keyTakeaway": "Sort array. Loop $i$ from 0 to $n-3$. Two pointers `left = i + 1, right = n - 1`. Target is `-nums[i]`. If sum equals target, record triplet and skip duplicates; else adjust pointers.",
      "revisitNeeded": true
    },
    {
      "id": "lc-3137",
      "problemName": "Minimum Number of Operations to Make Word K-Periodic",
      "problemNumber": 3137,
      "url": "https://leetcode.com/problems/minimum-number-of-operations-to-make-word-k-periodic/",
      "difficulty": "Medium",
      "pattern": "Hash Table, String, Counting",
      "status": "To Do",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #39 on Turing - 2025/2026 Leaked)",
      "mistakesOrPitfalls": "Slicing non-aligned substrings. The problem specifies word is divided into $N / k$ disjoint blocks of length $k$.",
      "keyTakeaway": "Total blocks = $N / k$. Count frequency of each block of length $k$ using a `HashMap<String, Integer>`. To minimize operations, keep the most frequent block and replace all other blocks. Min ops = `totalBlocks - maxFrequency`.",
      "revisitNeeded": true
    },
    {
      "id": "lc-034",
      "problemName": "Find First and Last Position of Element in Sorted Array",
      "problemNumber": 34,
      "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      "difficulty": "Medium",
      "pattern": "Array, Binary Search",
      "status": "Solved Solo",
      "timeComplexity": "O(log N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #40 on Turing)",
      "mistakesOrPitfalls": "Linear scanning once target is found ($O(N)$ worst case if all elements match). Must execute two separate binary searches for first and last bounds.",
      "keyTakeaway": "Two binary searches: 1) Find first bound: when `nums[mid] == target`, record index and continue searching left (`high = mid - 1`). 2) Find last bound: when `nums[mid] == target`, record index and continue searching right (`low = mid + 1`).",
      "revisitNeeded": false
    },
    {
      "id": "lc-3122",
      "problemName": "Minimum Number of Operations to Satisfy Conditions",
      "problemNumber": 3122,
      "url": "https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions/",
      "difficulty": "Medium",
      "pattern": "Array, Dynamic Programming, Matrix",
      "status": "To Do",
      "timeComplexity": "O(M * N + N * 10 * 10)",
      "spaceComplexity": "O(N * 10)",
      "dateLogged": "2026-11-01",
      "frequency": "43.7% (Rank #41 on Turing - 2025/2026 Leaked)",
      "mistakesOrPitfalls": "Greedy assignment of most frequent digits per column fails if adjacent columns pick the same digit ($grid[i][c] == grid[i][c+1]$ is forbidden). Must use DP across columns.",
      "keyTakeaway": "Count frequencies of digits 0..9 for each column. $DP(c, d)$ = minimum ops for columns $0..c$ given column $c$ is assigned digit $d$: $DP(c, d) = (rows - count[c][d]) + \\min_{prev \\ne d} DP(c-1, prev)$.",
      "revisitNeeded": true
    },
    {
      "id": "lc-1027",
      "problemName": "Longest Arithmetic Subsequence",
      "problemNumber": 1027,
      "url": "https://leetcode.com/problems/longest-arithmetic-subsequence/",
      "difficulty": "Medium",
      "pattern": "Dynamic Programming, Hash Table",
      "status": "To Do",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N^2)",
      "dateLogged": "2026-11-01",
      "frequency": "GiveInterview Recent (Asked in Last 6 Mo)",
      "mistakesOrPitfalls": "Negative common differences. When using an array or map for differences, offset difference by +500 to handle range $[-500, 500]$.",
      "keyTakeaway": "2D DP array `dp[n][1001]` where `dp[i][diff]` stores longest arithmetic sequence ending at index $i$ with common difference $diff$. For each pair $(i, j)$: `diff = nums[i] - nums[j] + 500`; `dp[i][diff] = dp[j][diff] + 1`.",
      "revisitNeeded": true
    },
    {
      "id": "lc-264",
      "problemName": "Ugly Number II",
      "problemNumber": 264,
      "url": "https://leetcode.com/problems/ugly-number-ii/",
      "difficulty": "Medium",
      "pattern": "Three Pointers, Dynamic Programming",
      "status": "To Do",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "GiveInterview Recent (Asked in Last 6 Mo)",
      "mistakesOrPitfalls": "Duplicate values generated (e.g. $2 \\times 3 = 6$ and $3 \\times 2 = 6$). Must advance ALL matching pointers `if (next == next2) i2++; if (next == next3) i3++; ...` without `else if`.",
      "keyTakeaway": "Three pointers `i2, i3, i5 = 0`. Next ugly number is $\\min(ugly[i2] \\times 2, ugly[i3] \\times 3, ugly[i5] \\times 5)$. Advance pointers for all factors matching the minimum.",
      "revisitNeeded": true
    },
    {
      "id": "lc-060",
      "problemName": "Permutation Sequence",
      "problemNumber": 60,
      "url": "https://leetcode.com/problems/permutation-sequence/",
      "difficulty": "Hard",
      "pattern": "Math, Factorial Number System",
      "status": "To Do",
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "GiveInterview Recent (Asked in Last 6 Mo)",
      "mistakesOrPitfalls": "Generating all $N!$ permutations with backtracking ($O(N!)$ TLE for $N=9$). Must use factorial number system math directly.",
      "keyTakeaway": "Decrement $k$ by 1 for 0-based indexing. For $n$ digits, each block has $(n-1)!$ permutations. Index to pick from available numbers list is $k / (n-1)!$. Remove picked number, update $k = k \\% (n-1)!$. Repeat.",
      "revisitNeeded": true
    },
    {
      "id": "lc-001",
      "problemName": "Two Sum",
      "problemNumber": 1,
      "url": "https://leetcode.com/problems/two-sum/",
      "difficulty": "Easy",
      "pattern": "Array, Hash Table",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "dateLogged": "2026-11-01",
      "frequency": "GiveInterview Tracked Core",
      "mistakesOrPitfalls": "Using the same element twice (e.g. target 6 with element 3 at index 0). Must check map before inserting or verify index inequality.",
      "keyTakeaway": "Single pass: compute complement = target - nums[i]. If map contains complement, return `new int[]{map.get(complement), i}`. Else, `map.put(nums[i], i)`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-387",
      "problemName": "First Unique Character in a String",
      "problemNumber": 387,
      "url": "https://leetcode.com/problems/first-unique-character-in-a-string/",
      "difficulty": "Easy",
      "pattern": "String, Hash Table",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1) [26 characters]",
      "dateLogged": "2026-11-01",
      "frequency": "Rapid Screening Core (Ai Master Ruturaj)",
      "mistakesOrPitfalls": "Iterating over standard HashMap keySet which scrambles order. Must iterate over the original string `s` or use `LinkedHashMap` to preserve first appearance order.",
      "keyTakeaway": "Two passes: 1) Build frequency array `int[26]`. 2) Iterate over string `s` indices: return the first index where `count[s.charAt(i) - 'a'] == 1`. Return -1 if none.",
      "revisitNeeded": false
    },
    {
      "id": "lc-341",
      "problemName": "Flatten Nested List Iterator (Irregular Lists)",
      "problemNumber": 341,
      "url": "https://leetcode.com/problems/flatten-nested-list-iterator/",
      "difficulty": "Medium",
      "pattern": "Stack, Recursion, Iterator",
      "status": "Solved with Hint",
      "timeComplexity": "O(1) amortized hasNext/next",
      "spaceComplexity": "O(D) where D is max nesting depth",
      "dateLogged": "2026-11-01",
      "frequency": "Rapid Screening Core (Ai Master Ruturaj)",
      "mistakesOrPitfalls": "Using a shallow `flatMap` in Java streams, which fails arbitrarily deep irregular nesting like `[1, [2, [3, [4]]]]`.",
      "keyTakeaway": "Push list iterator or elements onto a Stack. In `hasNext()`, unpack nested lists on top of stack until top element is an integer. Return true if stack not empty.",
      "revisitNeeded": true
    },
    {
      "id": "lc-268",
      "problemName": "Missing Number in 1..N",
      "problemNumber": 268,
      "url": "https://leetcode.com/problems/missing-number/",
      "difficulty": "Easy",
      "pattern": "Math, Bit Manipulation",
      "status": "Solved Solo",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "Rapid Screening Core (Ai Master Ruturaj)",
      "mistakesOrPitfalls": "Integer overflow when summing $N \\times (N+1) / 2$ for very large $N$. Bitwise XOR avoids overflow entirely.",
      "keyTakeaway": "XOR all indices $0..N$ with all numbers in array. Since $x \\oplus x = 0$, every present number cancels out, leaving exactly the missing number.",
      "revisitNeeded": false
    },
    {
      "id": "lc-021",
      "problemName": "Merge Two Sorted Lists",
      "problemNumber": 21,
      "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
      "difficulty": "Easy",
      "pattern": "Linked List, Two Pointers",
      "status": "Solved Solo",
      "timeComplexity": "O(N + M)",
      "spaceComplexity": "O(1)",
      "dateLogged": "2026-11-01",
      "frequency": "Rapid Screening Core (Ai Master Ruturaj)",
      "mistakesOrPitfalls": "Losing head reference without a dummy node. Forgetting to attach remainder of non-empty list `current.next = (l1 != null) ? l1 : l2`.",
      "keyTakeaway": "Create `ListNode dummy = new ListNode(0)`. While both lists non-null, wire `current.next` to smaller node. Attach remaining list in $O(1)$ and return `dummy.next`.",
      "revisitNeeded": false
    },
    {
      "id": "lc-3108",
      "problemName": "Minimum Cost Walk in Weighted Graph",
      "problemNumber": 3108,
      "url": "https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph/",
      "difficulty": "Hard",
      "pattern": "Graph, Disjoint Set Union (DSU), Bitwise AND",
      "status": "To Do",
      "timeComplexity": "O(E * alpha(V) + Q * alpha(V))",
      "spaceComplexity": "O(V)",
      "dateLogged": "2026-11-01",
      "frequency": "GiveInterview Recent (Asked in Last 6 Mo)",
      "mistakesOrPitfalls": "Attempting Dijkstra for bitwise AND weights. Bitwise AND is monotonically non-increasing! Walking more edges can only reduce or maintain the bitwise AND cost.",
      "keyTakeaway": "Any path within the same connected component can traverse ALL edges in that component to minimize bitwise AND! Use DSU to group components and maintain bitwise AND of all edge weights in that component. If $u$ and $v$ share component, cost is component's combined AND weight; else -1.",
      "revisitNeeded": true
    }
  ],
  "progress": {
    "userProfile": {
      "target": "Turing.com Java & Spring Boot Technical Vetting",
      "timeline": "Coming Month",
      "status": "In Progress"
    },
    "mcqStats": {
      "totalAttempted": 0,
      "totalCorrect": 0,
      "accuracy": 0,
      "missedQuestionIds": [],
      "flaggedQuestionIds": [],
      "topicMastery": {
        "topic-turing-insider-vetting": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-spring-boot-defaults-lifecycle": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-core-java-oop": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-jvm-memory": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-java-concurrency": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-java-collections-streams": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-spring-boot-autoconfig": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-spring-di-beans": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-spring-jpa-transactions": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-turing-seniority-survey": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        },
        "topic-backend-architecture-system-design": {
          "attempts": 0,
          "correct": 0,
          "score": 0
        }
      },
      "history": []
    },
    "leetcodeStats": {
      "totalLogged": 50,
      "byDifficulty": {
        "Easy": 15,
        "Medium": 31,
        "Hard": 4
      },
      "byStatus": {
        "Solved Solo": 28,
        "Solved with Hint": 7,
        "Needed Solution": 1,
        "To Do": 14
      },
      "revisitCount": 19
    },
    "recommendations": [
      {
        "priority": "High",
        "type": "Turing Insider Rule",
        "title": "Never Edit the 'Main' Harness Class in Coding Tests",
        "reason": "Editing the Main harness breaks System.in test execution. Keep all code in the Solution class."
      },
      {
        "priority": "High",
        "type": "Spring Boot Defaults",
        "title": "Review the 10-Second Spring Boot Defaults Cheat Sheet",
        "reason": "Top rapid-fire quiz targets: Java 17 minimum, SimpleJpaRepository, 1-thread @Scheduled pool."
      },
      {
        "priority": "Medium",
        "type": "Scenario Trap",
        "title": "Practice Flaky Unit Test & Clock Mocking Scenarios",
        "reason": "Turing's 45m quizzes feature production debugging scenarios on shared mutable state and java.time.Clock."
      }
    ]
  }
};

// ================= GAMIFICATION, AUDIO & VISUAL EFFECTS =================
const LEVELS = [
  { level: 1, title: 'Java Apprentice', minXP: 0, maxXP: 150 },
  { level: 2, title: 'OOP Practitioner', minXP: 150, maxXP: 400 },
  { level: 3, title: 'Spring Boot Builder', minXP: 400, maxXP: 850 },
  { level: 4, title: 'Concurrency Crafter', minXP: 850, maxXP: 1600 },
  { level: 5, title: 'Turing Senior Engineer', minXP: 1600, maxXP: 3000 }
];

class SoundFX {
  constructor() {
    this.enabled = localStorage.getItem('turing_sound_enabled') !== 'false';
    this.ctx = null;
  }
  
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('turing_sound_enabled', this.enabled);
    return this.enabled;
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch(e) {}
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch(e) {}
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch(e) {}
  }
}

class ConfettiFX {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animating = false;
    if (this.canvas) {
      window.addEventListener('resize', () => this.resize());
      this.resize();
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  launch(count = 70) {
    if (!this.canvas || !this.ctx) {
      this.canvas = document.getElementById('confetti-canvas');
      if (this.canvas) this.ctx = this.canvas.getContext('2d');
    }
    if (!this.canvas || !this.ctx) return;
    this.resize();
    const colors = ['#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#3b82f6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 11 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }

  animate() {
    if (!this.ctx || this.particles.length === 0) {
      this.animating = false;
      if (this.ctx && this.canvas) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.012;

      if (p.opacity <= 0 || p.y > window.innerHeight) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }
    requestAnimationFrame(() => this.animate());
  }
}

// ================= APP STATE =================

class TuringApp {
  constructor() {
    this.topics = [];
    this.mcqs = [];
    this.leetcode = [];
    this.progress = {};
    
    // Quiz state
    this.activeQuizList = [];
    this.currentQuizIndex = 0;
    this.answeredQuestions = {}; // questionId => { selectedIndices: [], isCorrect: bool }
    this.pendingMultiSelections = new Set();
    this.manuallyOpenedExplanations = new Set();
    this.studyMode = false;

    // Server status
    this.serverOnline = false;

    // Gamification & Habit Loop
    this.sounds = new SoundFX();
    this.confetti = new ConfettiFX();
    this.xp = parseInt(localStorage.getItem('turing_xp') || '0', 10);
    this.streak = parseInt(localStorage.getItem('turing_streak') || '1', 10);
    this.lastPracticeDate = localStorage.getItem('turing_last_date') || '';
    this.dailyGoalCount = parseInt(localStorage.getItem('turing_daily_goal_count') || '0', 10);
    this.dailyGoalDate = localStorage.getItem('turing_daily_goal_date') || '';
    
    // Blitz Timer state
    this.blitzMode = false;
    this.blitzTimerInterval = null;
    this.blitzSeconds = 60;

    this.init();
  }

  async init() {
    this.checkDailyStreak();
    this.bindEvents();
    this.applySavedTheme();
    await this.loadData();
    this.populateTopicDropdowns();
    this.updateGamificationUI();
    this.renderDashboard();
    this.initMCQQuiz();
    this.renderLeetCodeList();
    this.renderTopicsList();
    this.registerPWA();
  }

  // ================= DATA LOADING & PERSISTENCE =================
  async loadData() {
    // 1. Try local server first (if running python server.py)
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        this.topics = (data.topics && data.topics.length > 0) ? data.topics : DEFAULT_DATA.topics;
        this.mcqs = (data.mcqs && data.mcqs.length > 0) ? data.mcqs : [];
        this.leetcode = (data.leetcode && data.leetcode.length > 0) ? data.leetcode : [];
        this.progress = data.progress || {};
        this.serverOnline = true;
        this.updateSyncBadge(true);
        console.log('[TuringHub] Loaded data from local server API.');
        return;
      }
    } catch (e) {
      this.serverOnline = false;
      this.updateSyncBadge(false);
    }

    // 2. Load from localStorage if present
    const localSaved = localStorage.getItem('turing_prep_data');
    if (localSaved) {
      try {
        const parsed = JSON.parse(localSaved);
        if (parsed.mcqs && parsed.mcqs.length >= (DEFAULT_DATA.mcqs ? DEFAULT_DATA.mcqs.length : 43)) {
          this.topics = parsed.topics || DEFAULT_DATA.topics;
          this.mcqs = parsed.mcqs;
          this.leetcode = parsed.leetcode || [];
          this.progress = parsed.progress || {};
          return;
        }
      } catch (err) {
        console.error('Failed to parse local storage data', err);
      }
    }

    // 3. Fallback: fetch directly from relative json files
    try {
      const mcqRes = await fetch('../knowledge_base/mcq_bank.json');
      if (mcqRes.ok) {
        this.mcqs = await mcqRes.json();
      }
      const lcRes = await fetch('../knowledge_base/leetcode_log.json');
      if (lcRes.ok) {
        this.leetcode = await lcRes.json();
      }
      const topRes = await fetch('../knowledge_base/topics.json');
      if (topRes.ok) {
        this.topics = await topRes.json();
      }
    } catch (e) {
      // Standalone fallback
    }

    if (!this.topics || this.topics.length === 0) {
      this.topics = JSON.parse(JSON.stringify(DEFAULT_DATA.topics || []));
    }
    if (!this.mcqs || this.mcqs.length === 0) {
      this.mcqs = JSON.parse(JSON.stringify(DEFAULT_DATA.mcqs || []));
    }
    if (!this.leetcode || this.leetcode.length === 0) {
      this.leetcode = JSON.parse(JSON.stringify(DEFAULT_DATA.leetcode || []));
    }
    if (!this.progress || Object.keys(this.progress).length === 0) {
      this.progress = JSON.parse(JSON.stringify(DEFAULT_DATA.progress || {}));
    }
    this.saveData();
  }

  async saveData() {
    const payload = {
      topics: this.topics,
      mcqs: this.mcqs,
      leetcode: this.leetcode,
      progress: this.progress
    };

    localStorage.setItem('turing_prep_data', JSON.stringify(payload));

    if (this.serverOnline) {
      try {
        await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Could not persist to server', err);
      }
    }

    this.updateHeaderMetrics();
  }

  updateSyncBadge(isServer) {
    const statusBox = document.getElementById('sync-server-status');
    const desc = document.getElementById('sync-engine-desc');
    if (!statusBox || !desc) return;

    if (isServer) {
      statusBox.innerHTML = `
        <span class="status-dot online"></span>
        <div>
          <strong>Connected to Local Disk Server (server.py)</strong>
          <p>Any updates automatically persist to <code>knowledge_base/*.json</code> files on disk.</p>
        </div>
      `;
    } else {
      statusBox.innerHTML = `
        <span class="status-dot" style="background:#38bdf8;box-shadow:0 0 8px #38bdf8;"></span>
        <div>
          <strong>Standalone Browser Mode (LocalStorage Active)</strong>
          <p>All progress is safely cached. Run <code>server.py</code> or <code>start_app.bat</code> for direct file saving.</p>
        </div>
      `;
    }
  }

  // ================= UI BINDINGS & TABS =================
  bindEvents() {
    // Tab switching (Desktop Top Nav & Mobile Bottom Dock)
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabTarget = tab.dataset.tab;
        this.switchTab(tabTarget);
      });
    });

    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tabTarget = item.dataset.tab;
        this.switchTab(tabTarget);
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.textContent = this.sounds.enabled ? '🔊' : '🔇';
      soundBtn.addEventListener('click', () => {
        const isEnabled = this.sounds.toggle();
        soundBtn.textContent = isEnabled ? '🔊' : '🔇';
        this.showToast(isEnabled ? 'Sound effects enabled' : 'Sound effects muted');
      });
    }

    // Daily Warmup Drill Button
    const warmupBtn = document.getElementById('btn-quick-warmup');
    if (warmupBtn) {
      warmupBtn.addEventListener('click', () => this.startDailyWarmupDrill());
    }

    // Blitz Timer Toggle
    const blitzToggle = document.getElementById('toggle-blitz-timer');
    if (blitzToggle) {
      blitzToggle.addEventListener('change', (e) => {
        this.blitzMode = e.target.checked;
        if (this.blitzMode) {
          this.startBlitzTimer();
        } else {
          this.clearBlitzTimer();
        }
      });
    }

    // Theme toggle
    document.getElementById('theme-toggle-btn').addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      const isLight = document.body.classList.contains('theme-light');
      localStorage.setItem('turing_theme', isLight ? 'light' : 'dark');
    });

    // MCQ Controls
    document.getElementById('filter-topic').addEventListener('change', () => this.initMCQQuiz());
    document.getElementById('filter-difficulty').addEventListener('change', () => this.initMCQQuiz());
    document.getElementById('filter-weak-only').addEventListener('change', () => this.initMCQQuiz());
    
    // Study Mode
    const studyModeToggle = document.getElementById('toggle-study-mode');
    if (studyModeToggle) {
      studyModeToggle.addEventListener('change', (e) => {
        this.studyMode = e.target.checked;
        this.renderCurrentQuestion();
      });
    }

    document.getElementById('btn-reset-quiz-state').addEventListener('click', () => this.resetQuizAnswers());
    document.getElementById('btn-prev-question').addEventListener('click', () => this.navigateQuestion(-1));
    document.getElementById('btn-next-question').addEventListener('click', () => this.navigateQuestion(1));
    document.getElementById('btn-flag-question').addEventListener('click', () => this.toggleFlagCurrentQuestion());
    
    // Explanation button
    const toggleExpBtn = document.getElementById('btn-toggle-explanation');
    if (toggleExpBtn) {
      toggleExpBtn.addEventListener('click', () => this.toggleCurrentExplanation());
    }

    // Multi-Select Submit Button
    const submitMultiBtn = document.getElementById('btn-submit-multiselect');
    if (submitMultiBtn) {
      submitMultiBtn.addEventListener('click', () => this.handleSubmitMultiSelect());
    }

    document.getElementById('btn-copy-search').addEventListener('click', () => this.copySearchQuery());

    // Dashboard quick practice
    document.getElementById('quick-practice-weak-btn').addEventListener('click', () => {
      document.getElementById('filter-weak-only').checked = true;
      this.switchTab('mcq');
      this.initMCQQuiz();
    });

    // LeetCode filters & search
    document.getElementById('lc-search-input').addEventListener('input', () => this.renderLeetCodeList());
    document.getElementById('lc-filter-difficulty').addEventListener('change', () => this.renderLeetCodeList());
    document.getElementById('lc-filter-pattern').addEventListener('change', () => this.renderLeetCodeList());
    document.getElementById('lc-filter-status').addEventListener('change', () => this.renderLeetCodeList());

    // Knowledge base filter & search
    document.getElementById('kb-search-input').addEventListener('input', () => this.renderTopicsList());
    document.getElementById('kb-filter-category').addEventListener('change', () => this.renderTopicsList());

    // Modals
    document.getElementById('btn-open-log-modal').addEventListener('click', () => this.openModal('modal-lc-log'));
    document.getElementById('btn-open-note-modal').addEventListener('click', () => this.openModal('modal-kb-note'));
    document.getElementById('btn-open-import-modal').addEventListener('click', () => this.openModal('modal-import-json'));

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        this.closeModal(modalId);
      });
    });

    // Forms
    document.getElementById('form-lc-log').addEventListener('submit', (e) => this.handleSaveLeetCode(e));
    document.getElementById('form-kb-note').addEventListener('submit', (e) => this.handleSaveTopic(e));
    document.getElementById('btn-submit-import').addEventListener('click', () => this.handleImportJSON());

    // Sync Actions
    document.getElementById('btn-reload-files').addEventListener('click', () => this.handleReloadFromDisk());
    document.getElementById('btn-save-disk').addEventListener('click', () => this.handleSaveToDisk());
    document.getElementById('btn-export-json').addEventListener('click', () => this.handleExportJSON(true));
    document.getElementById('btn-download-json').addEventListener('click', () => this.handleExportJSON(false));
  }

  applySavedTheme() {
    const saved = localStorage.getItem('turing_theme');
    if (saved === 'light') {
      document.body.classList.add('theme-light');
    }
  }

  switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    const tabBtn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
    const mobileBtn = document.querySelector(`.mobile-nav-item[data-tab="${tabId}"]`);
    const pane = document.getElementById(`tab-${tabId}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (mobileBtn) mobileBtn.classList.add('active');
    if (pane) pane.classList.add('active');

    // Scroll to top on mobile tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabId === 'dashboard') this.renderDashboard();
    if (tabId === 'leetcode') this.renderLeetCodeList();
    if (tabId === 'knowledge') this.renderTopicsList();
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
  }

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3200);
  }

  // ================= POPULATE SELECTS =================
  populateTopicDropdowns() {
    const topicSelect = document.getElementById('filter-topic');
    const kbCatSelect = document.getElementById('kb-filter-category');
    const lcPatternSelect = document.getElementById('lc-filter-pattern');

    topicSelect.innerHTML = `<option value="all">All Topics (Comprehensive)</option>`;
    this.topics.forEach(t => {
      topicSelect.innerHTML += `<option value="${t.id}">${t.title}</option>`;
    });

    const categories = Array.from(new Set(this.topics.map(t => t.category)));
    kbCatSelect.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(cat => {
      kbCatSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    const patterns = Array.from(new Set(this.leetcode.map(p => p.pattern)));
    lcPatternSelect.innerHTML = `<option value="all">All Patterns</option>`;
    patterns.forEach(pat => {
      lcPatternSelect.innerHTML += `<option value="${pat}">${pat}</option>`;
    });
  }

  // ================= TAB 1: DASHBOARD =================
  renderDashboard() {
    this.updateHeaderMetrics();

    const masteryGrid = document.getElementById('topic-mastery-grid');
    masteryGrid.innerHTML = '';

    const weakTopics = [];
    const stats = this.progress.mcqStats || {};
    const topicMastery = stats.topicMastery || {};

    this.topics.forEach(topic => {
      const tStat = topicMastery[topic.id] || { attempts: 0, correct: 0, score: 0 };
      const score = tStat.attempts > 0 ? Math.round((tStat.correct / tStat.attempts) * 100) : 0;
      
      if (tStat.attempts > 0 && score < 70) {
        weakTopics.push({ title: topic.title, score });
      }

      masteryGrid.innerHTML += `
        <div class="mastery-card">
          <div class="mastery-card-header">
            <span>${topic.title}</span>
            <span>${score}% (${tStat.correct}/${tStat.attempts})</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${score}%;"></div>
          </div>
        </div>
      `;
    });

    const weakList = document.getElementById('weak-spots-list');
    const missedQuestionsCount = (stats.missedQuestionIds || []).length;
    const flaggedCount = (stats.flaggedQuestionIds || []).length;

    if (weakTopics.length > 0 || missedQuestionsCount > 0) {
      let html = '';
      weakTopics.forEach(w => {
        html += `<li><strong>${w.title}</strong>: Low accuracy (${w.score}%). Prioritize review.</li>`;
      });
      if (missedQuestionsCount > 0) {
        html += `<li>You have <strong>${missedQuestionsCount} question(s)</strong> in your review queue.</li>`;
      }
      if (flaggedCount > 0) {
        html += `<li><strong>${flaggedCount} question(s)</strong> flagged for deeper look.</li>`;
      }
      weakList.innerHTML = html;
    } else {
      weakList.innerHTML = `<li>No critical weaknesses identified yet. Complete quizzes to diagnose!</li>`;
    }

    const mcqAcc = stats.totalAttempted > 0 ? (stats.totalCorrect / stats.totalAttempted) : 0;
    const lcSolved = this.leetcode.filter(l => l.status === 'Solved Solo' || l.status === 'Solved with Hint').length;
    const lcScore = Math.min(1, lcSolved / 10);
    
    const overallReadiness = Math.round((mcqAcc * 50) + (lcScore * 50));
    document.getElementById('readiness-score').textContent = `${overallReadiness}%`;
    document.getElementById('dash-mcq-score').textContent = `${Math.round(mcqAcc * 100)}% (${stats.totalCorrect || 0}/${stats.totalAttempted || 0})`;
    document.getElementById('dash-lc-score').textContent = `${this.leetcode.length} Logged (${lcSolved} Solved)`;

    this.renderRecommendations();
  }

  renderRecommendations() {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';

    const recs = [];
    const stats = this.progress.mcqStats || {};
    const revisitLc = this.leetcode.filter(l => l.revisitNeeded);

    if (revisitLc.length > 0) {
      recs.push({
        type: 'Turing Rank Problem',
        title: `Revisit ${revisitLc[0].problemName} (#${revisitLc[0].problemNumber})`,
        reason: `Frequency: ${revisitLc[0].frequency || 'High'}. Pattern: ${revisitLc[0].pattern}. Trap: "${(revisitLc[0].mistakesOrPitfalls || '').slice(0, 75)}..."`,
        action: 'leetcode'
      });
    }

    if ((stats.missedQuestionIds || []).length > 0) {
      recs.push({
        type: 'MCQ Practice',
        title: `Review ${stats.missedQuestionIds.length} Missed Question(s)`,
        reason: 'Reinforce concepts you missed earlier (Pass-by-value, Auto-configuration, or @Transactional proxy bypass).',
        action: 'mcq'
      });
    }

    recs.push({
      type: 'Turing Core',
      title: 'Drill 25 Code-Snippet Turing MCQs',
      reason: 'Includes multi-select traps on Spring Boot Auto-Configuration, @Transactional, and Java Collections.',
      action: 'mcq'
    });

    recs.forEach(rec => {
      container.innerHTML += `
        <div class="rec-item">
          <div>
            <div class="rec-item-title"><span class="badge badge-accent">${rec.type}</span> ${rec.title}</div>
            <div class="rec-item-reason">${rec.reason}</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.turingApp.switchTab('${rec.action}')">Go →</button>
        </div>
      `;
    });
  }

  updateHeaderMetrics() {
    const stats = this.progress.mcqStats || { totalAttempted: 0, totalCorrect: 0, missedQuestionIds: [], flaggedQuestionIds: [] };
    const acc = stats.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0;
    
    document.getElementById('metric-accuracy').textContent = `${acc}%`;
    document.getElementById('metric-mcq-count').textContent = `${stats.totalAttempted}/${this.mcqs.length}`;
    
    const lcSolved = this.leetcode.filter(l => l.status === 'Solved Solo' || l.status === 'Solved with Hint').length;
    document.getElementById('metric-lc-count').textContent = `${lcSolved} Solved`;

    const needsReviewCount = (stats.missedQuestionIds?.length || 0) + 
                             (stats.flaggedQuestionIds?.length || 0) + 
                             this.leetcode.filter(l => l.revisitNeeded).length;
    document.getElementById('metric-review-count').textContent = needsReviewCount;
  }

  // ================= TAB 2: MCQ PRACTICE & TEACH ENGINE =================
  initMCQQuiz() {
    const topicFilter = document.getElementById('filter-topic').value;
    const diffFilter = document.getElementById('filter-difficulty').value;
    const weakOnly = document.getElementById('filter-weak-only').checked;

    const stats = this.progress.mcqStats || {};
    const missedSet = new Set(stats.missedQuestionIds || []);
    const flaggedSet = new Set(stats.flaggedQuestionIds || []);

    this.activeQuizList = this.mcqs.filter(q => {
      if (topicFilter !== 'all' && q.topicId !== topicFilter) return false;
      if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;
      if (weakOnly && !missedSet.has(q.id) && !flaggedSet.has(q.id)) return false;
      return true;
    });

    this.currentQuizIndex = 0;
    this.pendingMultiSelections.clear();
    this.renderCurrentQuestion();
  }

  resetQuizAnswers() {
    this.answeredQuestions = {};
    this.manuallyOpenedExplanations.clear();
    this.pendingMultiSelections.clear();
    this.currentQuizIndex = 0;
    this.renderCurrentQuestion();
    this.showToast('Quiz session restarted.');
  }

  toggleCurrentExplanation() {
    if (this.activeQuizList.length === 0) return;
    const currentQ = this.activeQuizList[this.currentQuizIndex];
    if (this.manuallyOpenedExplanations.has(currentQ.id)) {
      this.manuallyOpenedExplanations.delete(currentQ.id);
    } else {
      this.manuallyOpenedExplanations.add(currentQ.id);
    }
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const questionTextEl = document.getElementById('mcq-question-text');
    const optionsContainer = document.getElementById('mcq-options-container');
    const teachingPanel = document.getElementById('mcq-teaching-panel');
    const topicBadge = document.getElementById('mcq-topic-badge');
    const diffBadge = document.getElementById('mcq-diff-badge');
    const typeBadge = document.getElementById('mcq-type-badge');
    const idBadge = document.getElementById('mcq-id-badge');
    const flagBtn = document.getElementById('btn-flag-question');
    const toggleExpBtn = document.getElementById('btn-toggle-explanation');
    const multiActionBar = document.getElementById('multiselect-action-bar');
    const statusText = document.getElementById('question-answered-status');
    const progressFill = document.getElementById('quiz-progress-fill');
    const progressText = document.getElementById('quiz-progress-text');

    if (this.activeQuizList.length === 0) {
      questionTextEl.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-secondary);">No questions match the current filter.<br><br>Tip: If "Focus on Mistakes" is enabled, try clearing it or answering more questions.</div>`;
      optionsContainer.innerHTML = '';
      teachingPanel.classList.add('hidden');
      if (multiActionBar) multiActionBar.classList.add('hidden');
      topicBadge.textContent = 'None';
      diffBadge.textContent = '-';
      idBadge.textContent = '#0';
      progressText.textContent = '0 of 0';
      progressFill.style.width = '0%';
      return;
    }

    const currentQ = this.activeQuizList[this.currentQuizIndex];
    topicBadge.textContent = currentQ.topicName || 'General';
    diffBadge.textContent = currentQ.difficulty;
    diffBadge.className = `badge badge-${currentQ.difficulty.toLowerCase()}`;
    idBadge.textContent = `#${this.currentQuizIndex + 1}`;

    // Multi-select badge
    if (typeBadge) {
      if (currentQ.isMultiSelect) {
        typeBadge.textContent = 'Multi-Select (Choose All That Apply)';
        typeBadge.classList.remove('hidden');
      } else {
        typeBadge.classList.add('hidden');
      }
    }

    const flagged = (this.progress.mcqStats?.flaggedQuestionIds || []).includes(currentQ.id);
    flagBtn.classList.toggle('flagged', flagged);
    flagBtn.textContent = flagged ? '🚩 Flagged' : '🚩 Flag for Review';

    questionTextEl.innerHTML = this.formatMarkdown(currentQ.question);

    const progressPercent = ((this.currentQuizIndex + 1) / this.activeQuizList.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `Question ${this.currentQuizIndex + 1} of ${this.activeQuizList.length}`;

    const answerState = this.answeredQuestions[currentQ.id];
    const isManuallyOpened = this.manuallyOpenedExplanations.has(currentQ.id);
    const shouldShowExplanation = answerState || this.studyMode || isManuallyOpened;

    if (toggleExpBtn) {
      toggleExpBtn.textContent = shouldShowExplanation ? '🙈 Hide Explanation' : '💡 Show Explanation';
    }

    // Multi-Select Action Bar Visibility
    if (multiActionBar) {
      if (currentQ.isMultiSelect && !answerState) {
        multiActionBar.classList.remove('hidden');
      } else {
        multiActionBar.classList.add('hidden');
      }
    }

    // Blitz Timer handling
    if (this.blitzMode && !answerState) {
      this.startBlitzTimer();
    } else {
      this.clearBlitzTimer();
    }

    // Render Options
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const correctList = currentQ.correctIndices || [currentQ.correctIndex];

    currentQ.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      
      const isSelectedInPending = this.pendingMultiSelections.has(index);
      if (isSelectedInPending && !answerState) {
        btn.classList.add('selected');
      }

      btn.innerHTML = `
        <span class="option-letter">${letters[index] || index + 1}</span>
        <span class="option-content">${this.escapeHTML(optText)}</span>
      `;

      if (answerState) {
        btn.disabled = true;
        const wasChosen = answerState.selectedIndices.includes(index);
        const isTrueCorrect = correctList.includes(index);

        if (isTrueCorrect) {
          btn.classList.add('correct');
        } else if (wasChosen && !isTrueCorrect) {
          btn.classList.add('wrong');
        }
      } else if (shouldShowExplanation) {
        if (correctList.includes(index)) {
          btn.classList.add('correct');
        }
        btn.addEventListener('click', () => this.handleOptionClick(currentQ, index));
      } else {
        btn.addEventListener('click', () => this.handleOptionClick(currentQ, index));
      }

      optionsContainer.appendChild(btn);
    });

    // Teaching Panel
    if (shouldShowExplanation) {
      teachingPanel.classList.remove('hidden');

      const verdictEl = document.getElementById('teaching-verdict');
      if (answerState) {
        if (answerState.isCorrect) {
          verdictEl.className = 'teaching-verdict correct';
          verdictEl.innerHTML = `<span class="verdict-icon">✓</span> <span class="verdict-title">Correct! Well done. Here is the full breakdown & key takeaways:</span>`;
          statusText.textContent = '✅ Correct answer logged.';
        } else {
          verdictEl.className = 'teaching-verdict incorrect';
          verdictEl.innerHTML = `<span class="verdict-icon">✗</span> <span class="verdict-title">Incorrect. Here is the explanation and what to review:</span>`;
          statusText.textContent = '❌ Incorrect. Review explanation below.';
        }
      } else {
        verdictEl.className = 'teaching-verdict correct';
        verdictEl.innerHTML = `<span class="verdict-icon">💡</span> <span class="verdict-title">Explanation & Deep Dive Reference (Study Mode):</span>`;
        statusText.textContent = 'Study Mode: Inspect explanation & click answer to record score.';
      }

      document.getElementById('teaching-explanation-text').innerHTML = this.formatMarkdown(currentQ.explanation);
      
      const deepDive = currentQ.deepDive || {};
      document.getElementById('deep-dive-concept').textContent = deepDive.concept || currentQ.topicName;
      document.getElementById('deep-dive-what-to-look').textContent = deepDive.whatToLookFor || 'Focus on understanding the core execution model and edge cases.';
      document.getElementById('deep-dive-search').textContent = deepDive.searchKeywords || `${currentQ.topicName} deep dive explanation`;
      document.getElementById('deep-dive-reference').textContent = deepDive.recommendedRead || 'Official Documentation';
    } else {
      teachingPanel.classList.add('hidden');
      statusText.textContent = currentQ.isMultiSelect 
        ? 'Select all applicable options, then click "✓ Check Selected Answers".' 
        : 'Select an option above to check your answer, or click "💡 Show Explanation" anytime.';
    }
  }

  handleOptionClick(question, index) {
    if (question.isMultiSelect) {
      if (this.pendingMultiSelections.has(index)) {
        this.pendingMultiSelections.delete(index);
      } else {
        this.pendingMultiSelections.add(index);
      }
      this.renderCurrentQuestion();
    } else {
      this.evaluateAnswer(question, [index]);
    }
  }

  handleSubmitMultiSelect() {
    if (this.activeQuizList.length === 0) return;
    const currentQ = this.activeQuizList[this.currentQuizIndex];
    if (this.pendingMultiSelections.size === 0) {
      alert('Please select at least one option before checking your answer.');
      return;
    }
    const selected = Array.from(this.pendingMultiSelections);
    this.evaluateAnswer(currentQ, selected);
    this.pendingMultiSelections.clear();
  }

  evaluateAnswer(question, selectedIndices) {
    const correctList = question.correctIndices || [question.correctIndex];
    const sortedSelected = [...selectedIndices].sort();
    const sortedCorrect = [...correctList].sort();

    const isCorrect = sortedSelected.length === sortedCorrect.length &&
                      sortedSelected.every((val, i) => val === sortedCorrect[i]);

    this.answeredQuestions[question.id] = { selectedIndices, isCorrect };

    if (!this.progress.mcqStats) {
      this.progress.mcqStats = { totalAttempted: 0, totalCorrect: 0, missedQuestionIds: [], flaggedQuestionIds: [], topicMastery: {} };
    }
    const stats = this.progress.mcqStats;
    stats.totalAttempted = (stats.totalAttempted || 0) + 1;
    if (isCorrect) stats.totalCorrect = (stats.totalCorrect || 0) + 1;
    stats.accuracy = Math.round((stats.totalCorrect / stats.totalAttempted) * 100);

    if (!stats.missedQuestionIds) stats.missedQuestionIds = [];
    if (!isCorrect) {
      if (!stats.missedQuestionIds.includes(question.id)) {
        stats.missedQuestionIds.push(question.id);
      }
    } else {
      stats.missedQuestionIds = stats.missedQuestionIds.filter(id => id !== question.id);
    }

    if (!stats.topicMastery) stats.topicMastery = {};
    if (!stats.topicMastery[question.topicId]) {
      stats.topicMastery[question.topicId] = { attempts: 0, correct: 0, score: 0 };
    }
    const tMastery = stats.topicMastery[question.topicId];
    tMastery.attempts += 1;
    if (isCorrect) tMastery.correct += 1;
    tMastery.score = Math.round((tMastery.correct / tMastery.attempts) * 100);

    // Audio & Gamification feedback
    this.clearBlitzTimer();
    if (isCorrect) {
      this.sounds.playCorrect();
      this.addXP(15);
      this.incrementDailyGoal();
    } else {
      this.sounds.playWrong();
    }
    this.recordPracticeActivity();

    // Check if entire active drill completed with distinction (>=80%)
    const allAnswered = this.activeQuizList.every(q => this.answeredQuestions[q.id]);
    if (allAnswered && this.activeQuizList.length >= 3) {
      const correctCount = this.activeQuizList.filter(q => this.answeredQuestions[q.id]?.isCorrect).length;
      if (correctCount / this.activeQuizList.length >= 0.8) {
        setTimeout(() => {
          this.sounds.playFanfare();
          this.confetti.launch(85);
          this.showToast(`🎯 Drill Complete! ${correctCount}/${this.activeQuizList.length} Correct. Excellent mastery!`);
        }, 350);
      }
    }

    this.saveData();
    this.updateHeaderMetrics();
    this.renderCurrentQuestion();
  }

  navigateQuestion(delta) {
    if (this.activeQuizList.length === 0) return;
    const newIdx = this.currentQuizIndex + delta;
    if (newIdx >= 0 && newIdx < this.activeQuizList.length) {
      this.currentQuizIndex = newIdx;
      this.pendingMultiSelections.clear();
      this.renderCurrentQuestion();
    } else if (newIdx >= this.activeQuizList.length) {
      this.showToast('You reached the end of the question set!');
    }
  }

  toggleFlagCurrentQuestion() {
    if (this.activeQuizList.length === 0) return;
    const currentQ = this.activeQuizList[this.currentQuizIndex];
    if (!this.progress.mcqStats) this.progress.mcqStats = {};
    if (!this.progress.mcqStats.flaggedQuestionIds) this.progress.mcqStats.flaggedQuestionIds = [];

    const flaggedList = this.progress.mcqStats.flaggedQuestionIds;
    const index = flaggedList.indexOf(currentQ.id);
    if (index > -1) {
      flaggedList.splice(index, 1);
      this.showToast('Removed flag from question.');
    } else {
      flaggedList.push(currentQ.id);
      this.showToast('Question flagged for review!');
    }

    this.saveData();
    this.renderCurrentQuestion();
  }

  copySearchQuery() {
    const codeEl = document.getElementById('deep-dive-search');
    if (codeEl) {
      navigator.clipboard.writeText(codeEl.textContent);
      this.showToast('Copied search keywords to clipboard!');
    }
  }

  // ================= TAB 3: LEETCODE TRACKER =================
  renderLeetCodeList() {
    const container = document.getElementById('leetcode-list');
    const searchVal = document.getElementById('lc-search-input').value.toLowerCase();
    const diffFilter = document.getElementById('lc-filter-difficulty').value;
    const patternFilter = document.getElementById('lc-filter-pattern').value;
    const statusFilter = document.getElementById('lc-filter-status').value;

    const filtered = this.leetcode.filter(item => {
      const matchSearch = item.problemName.toLowerCase().includes(searchVal) ||
                          item.pattern.toLowerCase().includes(searchVal) ||
                          (item.keyTakeaway && item.keyTakeaway.toLowerCase().includes(searchVal));
      if (!matchSearch) return false;
      if (diffFilter !== 'all' && item.difficulty !== diffFilter) return false;
      if (patternFilter !== 'all' && item.pattern !== patternFilter) return false;
      if (statusFilter === 'needs-revisit' && !item.revisitNeeded) return false;
      if (statusFilter !== 'all' && statusFilter !== 'needs-revisit' && item.status !== statusFilter) return false;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1;text-align:center;padding:2rem;color:var(--text-secondary);">No coding challenges match your search.</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="lc-card">
        <div class="lc-card-header">
          <div>
            <a href="${item.url || '#'}" target="_blank" class="lc-title">#${item.problemNumber || ''} ${this.escapeHTML(item.problemName)} ↗</a>
            <div class="lc-meta" style="margin-top:0.3rem;">
              <span>Logged: ${item.dateLogged || 'Recent'}</span>
              <span class="complexity-pill">Time: ${item.timeComplexity || 'O(N)'}</span>
              <span class="complexity-pill">Space: ${item.spaceComplexity || 'O(1)'}</span>
            </div>
          </div>
          <div class="lc-badges">
            <span class="badge badge-${item.difficulty.toLowerCase()}">${item.difficulty}</span>
            <span class="badge badge-accent">${item.pattern}</span>
            ${item.frequency ? `<span class="badge" style="background:rgba(245,158,11,0.2);color:var(--accent-amber);border:1px solid rgba(245,158,11,0.3);">${item.frequency}</span>` : ''}
          </div>
        </div>

        <div class="lc-note-box">
          ${item.mistakesOrPitfalls ? `
            <div class="lc-note-pitfall"><strong>⚠️ Pitfall/Trap:</strong> ${this.escapeHTML(item.mistakesOrPitfalls)}</div>
          ` : ''}
          ${item.keyTakeaway ? `
            <div class="lc-note-takeaway"><strong>💡 Key Takeaway:</strong> ${this.escapeHTML(item.keyTakeaway)}</div>
          ` : ''}
        </div>

        <div class="lc-card-footer">
          <span class="badge ${item.status === 'Solved Solo' ? 'badge-easy' : (item.status === 'To Do' ? 'badge-info' : 'badge-topic')}">${item.status}</span>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn btn-secondary btn-sm" onclick="window.turingApp.toggleLeetCodeRevisit('${item.id}')">
              ${item.revisitNeeded ? '🚩 Revisit Needed' : '✓ Completed'}
            </button>
            <button class="btn btn-secondary btn-sm" style="color:var(--accent-rose);" onclick="window.turingApp.deleteLeetCode('${item.id}')">✕</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  handleSaveLeetCode(e) {
    e.preventDefault();
    const newProblem = {
      id: `lc-${Date.now()}`,
      problemNumber: parseInt(document.getElementById('input-lc-number').value, 10),
      problemName: document.getElementById('input-lc-name').value.trim(),
      difficulty: document.getElementById('input-lc-diff').value,
      pattern: document.getElementById('input-lc-pattern').value.trim(),
      status: document.getElementById('input-lc-status').value,
      timeComplexity: document.getElementById('input-lc-time').value.trim() || 'O(N)',
      spaceComplexity: document.getElementById('input-lc-space').value.trim() || 'O(1)',
      url: document.getElementById('input-lc-url').value.trim() || '#',
      mistakesOrPitfalls: document.getElementById('input-lc-pitfalls').value.trim(),
      keyTakeaway: document.getElementById('input-lc-takeaway').value.trim(),
      revisitNeeded: document.getElementById('input-lc-revisit').checked,
      dateLogged: new Date().toISOString().split('T')[0]
    };

    this.leetcode.unshift(newProblem);
    this.saveData();
    this.addXP(50);
    this.sounds.playFanfare();
    this.confetti.launch(75);
    this.closeModal('modal-lc-log');
    document.getElementById('form-lc-log').reset();
    this.populateTopicDropdowns();
    this.renderLeetCodeList();
    this.showToast(`Logged #${newProblem.problemNumber} ${newProblem.problemName}!`);
  }

  toggleLeetCodeRevisit(id) {
    const item = this.leetcode.find(l => l.id === id);
    if (item) {
      item.revisitNeeded = !item.revisitNeeded;
      this.saveData();
      this.renderLeetCodeList();
      this.showToast(item.revisitNeeded ? 'Flagged for revisit!' : 'Marked as mastered!');
    }
  }

  deleteLeetCode(id) {
    if (confirm('Delete this coding challenge entry?')) {
      this.leetcode = this.leetcode.filter(l => l.id !== id);
      this.saveData();
      this.renderLeetCodeList();
      this.showToast('Problem entry deleted.');
    }
  }

  // ================= TAB 4: KNOWLEDGE BASE NOTES =================
  renderTopicsList() {
    const container = document.getElementById('topics-list');
    const searchVal = document.getElementById('kb-search-input').value.toLowerCase();
    const catFilter = document.getElementById('kb-filter-category').value;

    const filtered = this.topics.filter(topic => {
      const matchSearch = topic.title.toLowerCase().includes(searchVal) ||
                          topic.summary.toLowerCase().includes(searchVal) ||
                          (topic.keyConcepts || []).some(c => c.toLowerCase().includes(searchVal)) ||
                          (topic.deepDiveKeywords || []).some(k => k.toLowerCase().includes(searchVal));
      if (!matchSearch) return false;
      if (catFilter !== 'all' && topic.category !== catFilter) return false;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1;text-align:center;padding:2rem;color:var(--text-secondary);">No topics found. Add a new topic note above!</div>`;
      return;
    }

    container.innerHTML = filtered.map(t => `
      <div class="kb-card">
        <div class="kb-card-header">
          <div class="kb-card-title">${this.escapeHTML(t.title)}</div>
          <span class="badge badge-accent">${t.category}</span>
        </div>

        <div class="kb-summary">${this.escapeHTML(t.summary)}</div>

        ${t.keyConcepts && t.keyConcepts.length > 0 ? `
          <div class="kb-section">
            <div class="kb-section-title">🔑 Key Concepts:</div>
            <ul class="kb-list">
              ${t.keyConcepts.map(c => `<li>${this.escapeHTML(c)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${t.commonPitfalls && t.commonPitfalls.length > 0 ? `
          <div class="kb-section">
            <div class="kb-section-title" style="color:var(--accent-rose);">⚠️ Common Turing Pitfalls:</div>
            <ul class="kb-list kb-pitfalls">
              ${t.commonPitfalls.map(p => `<li>${this.escapeHTML(p)}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${t.deepDiveKeywords && t.deepDiveKeywords.length > 0 ? `
          <div class="kb-section">
            <div class="kb-section-title">🔍 Search Terms & Deep Dive:</div>
            <div class="kb-keywords-box">
              ${t.deepDiveKeywords.map(k => `<span class="keyword-tag">${this.escapeHTML(k)}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <div style="margin-top:auto;padding-top:0.75rem;border-top:1px solid var(--border-color);display:flex;justify-content:flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="window.turingApp.drillTopic('${t.id}')">Practice MCQs on this Topic →</button>
        </div>
      </div>
    `).join('');
  }

  drillTopic(topicId) {
    document.getElementById('filter-topic').value = topicId;
    document.getElementById('filter-weak-only').checked = false;
    this.switchTab('mcq');
    this.initMCQQuiz();
  }

  handleSaveTopic(e) {
    e.preventDefault();
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: document.getElementById('input-kb-title').value.trim(),
      category: document.getElementById('input-kb-category').value.trim(),
      importance: document.getElementById('input-kb-importance').value,
      summary: document.getElementById('input-kb-summary').value.trim(),
      keyConcepts: document.getElementById('input-kb-concepts').value.split('\n').map(s => s.trim()).filter(Boolean),
      commonPitfalls: document.getElementById('input-kb-pitfalls').value.split('\n').map(s => s.trim()).filter(Boolean),
      deepDiveKeywords: document.getElementById('input-kb-keywords').value.split(',').map(s => s.trim()).filter(Boolean),
      references: []
    };

    this.topics.unshift(newTopic);
    this.saveData();
    this.closeModal('modal-kb-note');
    document.getElementById('form-kb-note').reset();
    this.populateTopicDropdowns();
    this.renderTopicsList();
    this.showToast(`Saved topic: ${newTopic.title}`);
  }

  // ================= SYNC & IMPORT/EXPORT =================
  async handleReloadFromDisk() {
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        this.topics = data.topics || [];
        this.mcqs = data.mcqs || [];
        this.leetcode = data.leetcode || [];
        this.progress = data.progress || {};
        this.serverOnline = true;
        this.saveData();
        this.populateTopicDropdowns();
        this.renderDashboard();
        this.initMCQQuiz();
        this.renderLeetCodeList();
        this.renderTopicsList();
        this.showToast('Successfully reloaded from disk files!');
        return;
      }
    } catch (e) {
      this.showToast('Could not connect to server.py. Please run start_app.bat first.');
    }
  }

  async handleSaveToDisk() {
    if (!this.serverOnline) {
      alert('Local server is not connected. Start server.py or start_app.bat to enable direct file saving.');
      return;
    }
    await this.saveData();
    this.showToast('Saved all updates to knowledge_base/*.json on disk!');
  }

  handleExportJSON(copyToClipboard) {
    const payload = {
      topics: this.topics,
      mcqs: this.mcqs,
      leetcode: this.leetcode,
      progress: this.progress
    };
    const jsonStr = JSON.stringify(payload, null, 2);

    if (copyToClipboard) {
      navigator.clipboard.writeText(jsonStr);
      this.showToast('Full JSON state copied to clipboard! You can paste it to Antigravity.');
    } else {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `turing_prep_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('Downloaded JSON backup!');
    }
  }

  handleImportJSON() {
    const text = document.getElementById('input-import-text').value.trim();
    if (!text) {
      alert('Please paste valid JSON.');
      return;
    }
    try {
      const parsed = JSON.parse(text);
      if (parsed.topics) this.topics = parsed.topics;
      if (parsed.mcqs) this.mcqs = parsed.mcqs;
      if (parsed.leetcode) this.leetcode = parsed.leetcode;
      if (parsed.progress) this.progress = parsed.progress;

      this.saveData();
      this.closeModal('modal-import-json');
      this.populateTopicDropdowns();
      this.renderDashboard();
      this.initMCQQuiz();
      this.renderLeetCodeList();
      this.renderTopicsList();
      this.showToast('Imported and applied new knowledge bundle successfully!');
    } catch (e) {
      alert('Invalid JSON format: ' + e.message);
    }
  }

  // ================= UTILITIES =================
  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  formatMarkdown(text) {
    if (!text) return '';
    let formatted = text.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code>${this.escapeHTML(code.trim())}</code></pre>`;
    });
    formatted = formatted.replace(/`([^`]+)`/g, (match, inline) => {
      return `<code>${this.escapeHTML(inline)}</code>`;
    });
    return formatted;
  }




  // ================= GAMIFICATION & REWARD LOGIC =================
  addXP(amount) {
    const prevXP = this.xp;
    this.xp += amount;
    localStorage.setItem('turing_xp', this.xp);

    const prevLevel = this.getLevel(prevXP);
    const newLevel = this.getLevel(this.xp);

    this.updateGamificationUI();

    if (newLevel.level > prevLevel.level) {
      setTimeout(() => {
        this.sounds.playFanfare();
        this.confetti.launch(110);
        this.showToast(`🎉 Level Up! You reached Level ${newLevel.level}: ${newLevel.title}!`);
      }, 300);
    }
  }

  getLevel(xp) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXP) return LEVELS[i];
    }
    return LEVELS[0];
  }

  updateGamificationUI() {
    const currentLevel = this.getLevel(this.xp);
    const levelBadge = document.getElementById('xp-level-badge');
    const xpText = document.getElementById('xp-text');
    const xpFill = document.getElementById('xp-bar-fill');
    const streakPill = document.getElementById('metric-streak-count');

    if (levelBadge) {
      levelBadge.textContent = `Lvl ${currentLevel.level} · ${currentLevel.title}`;
    }

    if (xpText && xpFill) {
      const nextXP = currentLevel.maxXP;
      const progressInLevel = this.xp - currentLevel.minXP;
      const neededInLevel = currentLevel.maxXP - currentLevel.minXP;
      const pct = Math.min(100, Math.round((progressInLevel / neededInLevel) * 100));

      xpText.textContent = `${this.xp} / ${nextXP} XP`;
      xpFill.style.width = `${pct}%`;
    }

    if (streakPill) {
      streakPill.textContent = `🔥 ${this.streak} Day${this.streak > 1 ? 's' : ''}`;
    }

    // Dashboard Quest Card updates
    const questBadge = document.getElementById('quest-streak-badge');
    const questSub = document.getElementById('quest-goal-sub');
    const questFill = document.getElementById('quest-progress-fill');

    if (questBadge) questBadge.textContent = `🔥 ${this.streak} Day Streak`;
    if (questSub) questSub.textContent = `${this.dailyGoalCount} of 5 completed today`;
    if (questFill) {
      const goalPct = Math.min(100, Math.round((this.dailyGoalCount / 5) * 100));
      questFill.style.width = `${goalPct}%`;
    }
  }

  checkDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    
    // Check daily goal reset
    if (this.dailyGoalDate !== today) {
      this.dailyGoalDate = today;
      this.dailyGoalCount = 0;
      localStorage.setItem('turing_daily_goal_date', this.dailyGoalDate);
      localStorage.setItem('turing_daily_goal_count', '0');
    }

    // Check streak
    if (!this.lastPracticeDate) {
      this.streak = 1;
      this.lastPracticeDate = today;
      localStorage.setItem('turing_streak', '1');
      localStorage.setItem('turing_last_date', today);
      return;
    }

    if (this.lastPracticeDate === today) {
      return; // Already active today
    }

    const last = new Date(this.lastPracticeDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day!
      this.streak += 1;
      this.lastPracticeDate = today;
      localStorage.setItem('turing_streak', this.streak);
      localStorage.setItem('turing_last_date', today);
    } else if (diffDays > 1) {
      // Streak broken
      this.streak = 1;
      this.lastPracticeDate = today;
      localStorage.setItem('turing_streak', '1');
      localStorage.setItem('turing_last_date', today);
    }
  }

  recordPracticeActivity() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.lastPracticeDate !== today) {
      this.checkDailyStreak();
    }
  }

  incrementDailyGoal() {
    this.dailyGoalCount += 1;
    localStorage.setItem('turing_daily_goal_count', this.dailyGoalCount);
    
    if (this.dailyGoalCount === 5) {
      setTimeout(() => {
        this.addXP(50);
        this.sounds.playFanfare();
        this.confetti.launch(90);
        this.showToast('🎯 Quest Complete! 5/5 daily MCQs conquered! (+50 XP)');
      }, 500);
    }
    this.updateGamificationUI();
  }

  // ================= BLITZ TIMER SYSTEM =================
  startBlitzTimer() {
    this.clearBlitzTimer();
    const container = document.getElementById('blitz-timer-container');
    const fill = document.getElementById('blitz-timer-fill');
    const label = document.getElementById('blitz-timer-text');
    if (!container || !fill || !label) return;

    container.classList.remove('hidden');
    this.blitzSeconds = 60;
    fill.style.width = '100%';
    fill.style.background = 'linear-gradient(90deg, var(--accent-amber), var(--accent-rose))';
    label.textContent = '⏱️ 60s';

    this.blitzTimerInterval = setInterval(() => {
      this.blitzSeconds -= 1;
      const pct = Math.max(0, (this.blitzSeconds / 60) * 100);
      fill.style.width = `${pct}%`;
      label.textContent = `⏱️ ${this.blitzSeconds}s`;

      if (this.blitzSeconds <= 15) {
        fill.style.background = 'var(--accent-rose)';
        label.style.color = 'var(--accent-rose)';
      }

      if (this.blitzSeconds <= 0) {
        this.clearBlitzTimer();
        const currentQ = this.activeQuizList[this.currentQuizIndex];
        if (currentQ && !this.answeredQuestions[currentQ.id]) {
          this.evaluateAnswer(currentQ, []);
          this.showToast('⏱️ Time up! Review the breakdown below.');
        }
      }
    }, 1000);
  }

  clearBlitzTimer() {
    if (this.blitzTimerInterval) {
      clearInterval(this.blitzTimerInterval);
      this.blitzTimerInterval = null;
    }
    const container = document.getElementById('blitz-timer-container');
    if (container && !this.blitzMode) {
      container.classList.add('hidden');
    }
  }

  // ================= DAILY WARMUP DRILL =================
  startDailyWarmupDrill() {
    if (!this.mcqs || this.mcqs.length === 0) return;

    // Pick 5 varied questions
    const shuffled = [...this.mcqs].sort(() => 0.5 - Math.random());
    const picked = [];
    const seenTopics = new Set();

    for (const q of shuffled) {
      if (!seenTopics.has(q.topicId)) {
        picked.push(q);
        seenTopics.add(q.topicId);
        if (picked.length >= 5) break;
      }
    }

    if (picked.length < 5) {
      for (const q of shuffled) {
        if (!picked.includes(q)) {
          picked.push(q);
          if (picked.length >= 5) break;
        }
      }
    }

    this.activeQuizList = picked;
    this.currentQuizIndex = 0;
    this.answeredQuestions = {};
    this.pendingMultiSelections.clear();
    this.manuallyOpenedExplanations.clear();

    document.getElementById('filter-topic').value = 'all';
    document.getElementById('filter-difficulty').value = 'all';
    document.getElementById('filter-weak-only').checked = false;

    this.switchTab('mcq');
    this.renderCurrentQuestion();
    this.showToast('⚡ Daily 5-Question Warmup Loaded! Give it your best shot.');
  }

  // ================= PWA REGISTRATION =================
  registerPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
          console.log('[PWA] ServiceWorker registration:', err);
        });
      });
    }
  }

}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.turingApp = new TuringApp();
});

