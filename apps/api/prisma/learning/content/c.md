# Programming in C

Topics (notes are added under each as you study):

- Data types, operators and precedence
- Control flow: if, switch, loops
- Functions and recursion
- Arrays and strings
- Pointers and pointer arithmetic
- Structures and unions
- Dynamic memory and file handling
- Output-tracing questions

## Diagnostic misses (2 Oct)

### sizeof(char)

- **Core idea:** sizeof(char) is always 1 by the C standard. Sizes of int, long and pointers depend on the platform.
- **Exam points:** on typical 64-bit systems, char = 1, int = 4, float = 4, double = 8, pointer = 8 bytes.
- **Common mistake:** answering "depends on the compiler". That is true for int, not for char.

### static storage class

- **Core idea:** a static local variable is initialized once and keeps its value between function calls. Its scope stays local; its lifetime is the whole program.
- **Exam points:** auto = default for locals, destroyed on return. register = hint to keep in a CPU register (you cannot take its address). extern = declared here, defined in another file.
- **Example:** `int counter() { static int c = 0; return ++c; }` returns 1, 2, 3 on successive calls.
- **Common mistake:** confusing static (lifetime) with extern (linkage across files).

### Semicolon after a loop header

- **Core idea:** `for (...);` has an empty body. The loop runs to completion, then the next line runs once.
- **Exam points:** other output-tracing traps: `=` instead of `==` inside if, integer division (5/2 = 2), and `i++` vs `++i`.
- **Common mistake:** reading the indented printf as the loop body.

## Loops and must-write programs: primes, Fibonacci, series (7 Oct)

Week 1, day 1. The most-asked C topic in the 17 bank papers.

### The past questions

| Question                                                                  | Paper                                         |
| ------------------------------------------------------------------------- | --------------------------------------------- |
| Program: primes from 1 to n                                               | Combined Bank AP, 09.02.2024                  |
| Program: primes between 1 and n                                           | Combined Bank Senior Officer (IT), 17.05.2024 |
| Structured program: Fibonacci series up to 100 numbers                    | Bangladesh Bank AP, 2016                      |
| C++ Fibonacci output + complexity                                         | Rupali Bank Asst Network Engineer, 04.11.2023 |
| C program: sum of 1+2+4+7+11+…+N                                          | Combined Bank AP, 09.02.2024                  |
| Program for 1,2,2,3,3,3,…,100 (100 times) + complexity                    | Sonali & Janata Officer (IT), 14.10.2023      |
| Program: eˣ = 1 + x/1! + x²/2! + …                                        | Sonali Bank Asst DBA, 23.02.2024              |
| Time/space complexity of a triple nested loop i, j, k < n _(O(n³), O(1))_ | Bangladesh Bank AP, 2016                      |
| Function: smallest element in an array                                    | Combined Bank AP, 09.06.2023                  |
| Function: print numbers divisible by 3 in an array                        | Sonali & Janata Officer IT, 04.10.2024        |
| Function: shift each letter to the next letter + time complexity          | ICB Securities AP, 27.06.2026                 |

### Bangla core

**গল্পে বুঝি:** ব্যাংকের ক্যাশিয়ার নোটের বান্ডিল গুনছেন। তাঁর আঙুল নোট থেকে নোটে যাচ্ছে — এটাই loop counter। "আর নোট আছে?" — এটা condition। "পরের নোটে যাও" — update। প্রতিটি নোট নিয়ে যা করেন (জাল কি না দেখা, যোগ করা, সবচেয়ে ছোটটা মনে রাখা) — সেটা body। Fibonacci যেন দুজনের লাইন: নতুন পার্সেলের ওজন = আগের দুটোর যোগফল, তারপর লাইন এক ঘর সরে যায়।

**ধাপে ধাপে:**

1. **Loop-এর ৪ অংশ:** শুরু (initialise) → শর্ত (test) → কাজ (body) → পরিবর্তন (update)। যেমন `for (i = 1; i <= n; i++)`।
2. **মৌলিক সংখ্যা (prime):** n ≥ 2 এবং 2 থেকে √n পর্যন্ত কোনো সংখ্যা দিয়ে ভাগ না গেলে n prime। `i * i <= n` লিখলে sqrt বা math.h লাগে না।
3. **√n কেন যথেষ্ট:** n = a × b হলে a আর b দুটোই √n-এর চেয়ে বড় হতে পারে না, কারণ তাহলে গুণফল n-এর চেয়ে বড় হয়ে যাবে। তাই একটা উৎপাদক সবসময় √n-এর সমান বা ছোট।
4. **উদাহরণ:** n = 97 → i = 2 থেকে 9 (9² = 81 ≤ 97, 10² = 100 > 97) → ৮ বার ভাগ, কোনোটাতেই মেলে না → 97 prime।
5. **Fibonacci:** a = 0, b = 1 রাখো। প্রতি ধাপে a ছাপো; next = a + b; a = b; b = next। n টা পদ → O(n) সময়, O(1) জায়গা।
6. **ধারা 1, 2, 4, 7, 11 …:** পার্থক্য প্রতিবার ১ করে বাড়ে (1, 2, 3, 4), তাই `term += i`। প্রথম ৬ পদের যোগফল 41।
7. **ধারা 1, 2, 2, 3, 3, 3 …:** k-কে k বার ছাপো; 100 পর্যন্ত মোট 5050 বার ছাপা হয় → O(n²)।
8. **eˣ ধারা:** x^i আর i! আলাদা করে হিসাব কোরো না (overflow হয়, ধীরও); আগের পদ থেকে নতুন পদ বের করো: `term = term * x / i`।
9. **Complexity গোনার নিয়ম:** body কতবার চলে গোনো। একটা loop n পর্যন্ত = O(n); দুটো nested = O(n²); প্রতিবার দ্বিগুণ (`i *= 2`) = O(log n)।

**এক লাইনে:** শুরু-শর্ত-কাজ-পরিবর্তন; prime-এ √n পর্যন্ত ভাগ, Fibonacci-তে আগের দুটোর যোগ।

### Picture it

A bank teller counts a bundle of notes. The **loop counter** is her thumb moving note by note. The **condition** is "are there notes left?". The **update** is "move to the next note". The **body** is what she does with each note: check it is not fake (prime test), add it to the total (series sum), or remember the smallest one (minimum).

The Fibonacci series is a queue of two people passing a parcel: each new parcel weighs the sum of the last two, then the line shifts by one.

### Understand it step by step

1. **A loop has 4 parts:** initialise → test → body → update. `for (i = 1; i <= n; i++) { body }`.
2. **Prime test:** n is prime if n ≥ 2 and no number from 2 to √n divides it. Test `i * i <= n` instead of `i <= sqrt(n)` (no floating point, no math.h).
3. **Why √n is enough:** if n = a × b and both a, b > √n, then a × b > n. So one factor is always ≤ √n.
4. **Worked count:** n = 97 → i runs 2, 3, …, 9 (9² = 81 ≤ 97, 10² = 100 > 97) → 8 divisions, none divides → 97 is prime.
5. **Primes 1..n:** call the test for each k from 1 to n → O(n√n) time, O(1) space.
6. **Fibonacci:** keep two variables a = 0, b = 1. Each step: print a; next = a + b; a = b; b = next. n terms → O(n) time, O(1) space.
7. **Series 1, 2, 4, 7, 11, 16 …:** the gap grows by 1 each time (1, 2, 3, 4, 5). So `term += i` after the i-th term. 6 terms: 1+2+4+7+11+16 = **41**.
8. **Series 1, 2, 2, 3, 3, 3, …:** outer loop k = 1..100, inner loop prints k, k times. Total printed = 1+2+…+100 = 100×101/2 = **5050** → O(n²).
9. **eˣ series:** never compute x^i and i! separately (overflow, slow). Use the previous term: `term = term * x / i`. With x = 1 and 10 terms after 1, the sum ≈ 2.718282.
10. **Smallest element:** `min = a[0]`, then compare with a[1] … a[n−1] → n − 1 comparisons, O(n).
11. **Loop-count rules for complexity:**

| Loop shape                         | Body runs | Big-O    |
| ---------------------------------- | --------- | -------- |
| `for i < n`                        | n         | O(n)     |
| `for i*i <= n`                     | √n        | O(√n)    |
| `for (i = 1; i < n; i *= 2)`       | log₂ n    | O(log n) |
| two nested, both to n              | n²        | O(n²)    |
| `for i < n` { `for j = i; j < n` } | n(n+1)/2  | O(n²)    |
| three nested, all to n             | n³        | O(n³)    |

### Mindmap

```mindmap
Loops and must-write programs
  Loop parts
    Initialise
    Test
    Body
    Update
  Primes
    n < 2 not prime
    Divide up to √n
    i * i <= n
    1..n is O(n√n)
  Fibonacci
    a=0, b=1
    next = a + b
    O(n), O(1) space
    Overflow after F92
  Series
    1,2,4,7,11: term += i
    1,2,2,3,3,3: 5050 prints
    eˣ: term *= x / i
  Arrays
    min = a[0]
    n − 1 comparisons
    a[i] % 3 == 0
  Complexity
    Count body runs
    Nested = multiply
    Halving = log n
```

### Remember it

- **"Init, Test, Body, Bump"** — the 4 parts of every loop.
- **"Square stops the search"** — prime loop stops when i × i > n.
- **"Pass the parcel"** — Fibonacci: next = a + b; a = b; b = next.
- **"Gap grows by one"** — 1, 2, 4, 7, 11: `term += i`.
- **"Reuse the last term"** — eˣ: `term = term * x / i`.

### Exam trap

- Forgetting that **1 is not prime** (and 2 is). Start the test with `if (n < 2) return 0;`.
- Using `i < n/2` or `i < n` in the prime loop: correct but slow; examiners give full marks for √n and mention it.
- "Fibonacci up to 100 numbers": the 100th term (≈ 2.19 × 10²⁰) **overflows** even `long long` (signed max ≈ 9.22 × 10¹⁸, last fit is F92). Say so, and use `double` or `unsigned long long` (fits up to F93).
- In C, `-7 % 3` is **−1**, not 2. For "divisible by 3", `a[i] % 3 == 0` still works for negatives.
- `int` division in eˣ: `x / i` with ints gives 0 for x < i. Declare `term` and `x` as `double`.
- A semicolon after `for (...)` makes the body empty (see the diagnostic note above).

### Exam answer

**Q. Write a structured C program to print the first n terms of the Fibonacci series. State its time and space complexity.** _(Bangladesh Bank AP 2016; Rupali Bank 2023)_

**Definition.** The Fibonacci series starts with 0 and 1; every later term is the sum of the two terms before it: F(n) = F(n−1) + F(n−2), with F(0) = 0 and F(1) = 1. Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, …

**Algorithm (flow).**

1. Read n.
2. Set a = 0, b = 1.
3. Repeat n times: print a; next = a + b; a = b; b = next.
4. Stop.

```
Start → Read n → a=0, b=1, i=1 → [i <= n?] --No--> Stop
                                    | Yes
                     print a → next=a+b → a=b → b=next → i++ → back to test
```

**Program.**

```c
#include <stdio.h>

int main(void)
{
    int n, i;
    long long a = 0, b = 1, next;
    printf("Enter n: ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        printf("%lld ", a);
        next = a + b;   /* each term = sum of the previous two */
        a = b;
        b = next;
    }
    printf("\n");
    return 0;
}
```

**Sample run.** Input 10 → `0 1 1 2 3 5 8 13 21 34`

**Complexity.** The loop body runs n times and each step does constant work → **time O(n)**. Only three variables are used whatever n is → **space O(1)**. The naive recursive version `fib(n-1) + fib(n-2)` takes O(2ⁿ) time because it recomputes the same terms.

**Note on "100 numbers".** Terms beyond F92 overflow `long long`; for 100 terms use `double` (approximate) or a big-number method.

**Conclusion.** The iterative method is the best choice in an exam and in practice: linear time, constant memory, and no stack overflow risk.

### Recall check

1. How many divisions does the √n prime test do for n = 121, and what does it conclude?
2. Write the one line that turns the term 7 into the next term 11 in the series 1, 2, 4, 7, 11, … (i = 4).
3. What is the time complexity of printing 1, 2, 2, 3, 3, 3, … up to n, and why?

_Answers: (1) i = 2 … 11 → stops at i = 11 because 121 % 11 = 0 → 10 divisions, not prime. (2) `term += i;` → 7 + 4 = 11. (3) O(n²): it prints n(n+1)/2 numbers._

## Recursion, functions and matrix programs (8 Oct)

Week 1, day 2. Recursion output tracing (3×), LCM/GCD and matrix programs (2×) are the C questions still left after yesterday's loops. OOP already has full notes on its own page: [OOP](#oop).

### The past questions

| Question                                                                               | Paper                                         |
| -------------------------------------------------------------------------------------- | --------------------------------------------- |
| Output of recursive F(n) = F(n−2) + F(n−1), find F(5) _(5)_                            | Sonali & Janata Officer (IT), 14.10.2023      |
| Recursion output: `fun(5)` with `printf x--`, `fun(--x)`, `printf x`                   | Combined Bank AP, 09.02.2024                  |
| C++ Fibonacci output + complexity                                                      | Rupali Bank Asst Network Engineer, 04.11.2023 |
| Program: LCM of A and B                                                                | Bangladesh Bank AP, 03.02.2023                |
| Program: matrices A, B of different dimensions → C = A×B, average of A and B, max of C | Combined Bank Senior Officer (IT), 13.10.2023 |
| Program: row and column sums of an m×n matrix                                          | Combined Bank Senior Officer (IT), 17.05.2024 |
| Program: Floyd's binary triangle, n = 5                                                | Combined Bank AP, 09.02.2024                  |

_The book records the Combined Bank AP 2024 recursion question only as "printf x--, fun(--x), printf x"; the code in step 6 below is the usual form of that question, not the exact paper text._

### Bangla core

**গল্পে বুঝি:** অফিসারের টেবিলে ফাইলের স্তূপ। ম্যানেজার fun(5) চাইলেন, কিন্তু fun(3) শেষ না হলে fun(5) শেষ হবে না। তাই অফিসার fun(5)-এর ফাইল আধা-কাজ অবস্থায় টেবিলে রেখে fun(3) খোলেন; তার জন্য fun(1) লাগে, তাই fun(3) স্তূপের ওপরে যায়। যে ফাইলের আর কিছু লাগে না (base case), সেটা শেষ করে নিচের ফাইলটা ঠিক যেখানে থেমেছিলেন সেখান থেকে ধরেন। আর matrix যেন সিনেমা হল: সারি i, আসন j = `a[i][j]`।

**ধাপে ধাপে:**

1. **প্রতিটি function call = stack-এ নতুন frame।** প্রতিটি কলের নিজস্ব parameter, local variable আর return address থাকে; কল শেষ হলে frame সরে যায় (pop)।
2. **Recursion-এর দুই অংশ:** (ক) base case — যেখানে থামে; (খ) recursive step — যা base case-এর দিকে এগোয়। Base case না থাকলে stack overflow।
3. **কলের আগে না পরে:** কলের আগে লেখা কাজ যাওয়ার পথে চলে (3 2 1); কলের পরে লেখা কাজ ফেরার পথে উল্টো ক্রমে চলে (1 2 3)।
4. **F(5):** F(0) = 0, F(1) = 1 ধরে F(5) = F(3) + F(4) = 2 + 3 = 5; মোট কল 15টি। সময় O(2ⁿ), কিন্তু জায়গা O(n), কারণ একসাথে stack-এ সর্বোচ্চ n টা frame থাকে।
5. **`x--` বনাম `--x`:** `printf("%d", x--)` পুরনো x ছাপে, তারপর কমায়; `fun(--x)` আগে কমায়, তারপর পাঠায়। প্রতিটি frame-এর x আলাদা, তাই fun(5)-এর output 5 3 1 −1 1 3।
6. **GCD (Euclid):** gcd(a, b) = gcd(b, a % b); b = 0 হলে উত্তর a। gcd(48, 18) → (18, 12) → (12, 6) → (6, 0) = 6।
7. **LCM:** lcm = a / gcd × b; আগে ভাগ করলে overflow-এর ভয় কমে। lcm(24, 36) = 72।
8. **2D array:** C-তে সারি ধরে (row-major) জমা থাকে। a[i][j]-এর address = base + (i × n + j) × size।
9. **Matrix গুণ:** A (m×n) × B (p×q) সম্ভব শুধু n = p হলে; ফল m×q। তিনটা nested loop → O(n³)।

**এক লাইনে:** নিজেকে ডাকে, base case-এ থামে, প্রতিটি কলের আলাদা frame; matrix গুণে ভেতরের মাপ মিলতে হবে।

### Picture it

**Recursion is a stack of files on an officer's desk.** The manager asks for fun(5). The officer cannot finish it until fun(3) is done, so he puts the fun(5) file on the desk (half done) and opens fun(3). That needs fun(1), so fun(3) goes on top of the pile. When a file needs nothing more (the **base case**), he finishes it and picks up the file underneath, _exactly where he left it_. Work written before the "open next file" step happens on the way **down**; work written after it happens on the way **back up**, in reverse order.

**A matrix is a cinema hall.** Row i, seat j = `a[i][j]`. A row sum is one usher walking along a row; a column sum is an usher walking front to back. In memory, C stores the hall row by row (row-major).

### Understand it step by step

1. **Function call = new stack frame.** Each call gets its own copy of parameters and locals, plus the return address. When the call returns, the frame is popped.
2. **Every recursive function needs:** (a) a **base case** that stops, and (b) a **recursive step** that moves toward it. No base case → stack overflow.
3. **Before vs after the call:**

| Code shape                      | p(3) prints | Why                       |
| ------------------------------- | ----------- | ------------------------- |
| `printf(n); p(n-1);`            | 3 2 1       | prints on the way down    |
| `p(n-1); printf(n);`            | 1 2 3       | prints on the way back up |
| `printf(n); p(n-1); printf(n);` | 3 2 1 1 2 3 | both                      |

4. **Fibonacci recursion F(5)** with F(0) = 0, F(1) = 1: F(5) = F(3) + F(4) = 2 + 3 = **5**. Calls made: C(n) = 1 + C(n−1) + C(n−2), C(0) = C(1) = 1 → C(2) = 3, C(3) = 5, C(4) = 9, **C(5) = 15**, C(6) = 25. Time O(2ⁿ) (strictly about 1.618ⁿ), space O(n) (the deepest chain of frames).
5. **Recursion vs iteration:**

| Point    | Recursion                        | Iteration               |
| -------- | -------------------------------- | ----------------------- |
| Stops by | base case                        | loop condition          |
| Memory   | O(depth) stack frames            | O(1) usually            |
| Speed    | slower (call overhead)           | faster                  |
| Risk     | stack overflow                   | infinite loop           |
| Best for | trees, divide and conquer, Hanoi | simple counting, series |

6. **Tracing `fun(5)`** (the post-decrement / pre-decrement trap):

```c
void fun(int x)
{
    if (x > 0) {
        printf("%d ", x--);   /* prints x, THEN x = x - 1 */
        fun(--x);             /* x = x - 1 FIRST, then call */
        printf("%d ", x);     /* prints this frame's x now */
    }
}
```

| Frame   | Prints first        | x after `x--` | x after `--x` (passed down) | Prints on return |
| ------- | ------------------- | ------------- | --------------------------- | ---------------- |
| fun(5)  | 5                   | 4             | 3                           | 3                |
| fun(3)  | 3                   | 2             | 1                           | 1                |
| fun(1)  | 1                   | 0             | −1                          | −1               |
| fun(−1) | nothing (base case) | —             | —                           | —                |

Output: **5 3 1 −1 1 3**. Each frame keeps its own x, so the return prints are each frame's final x, in reverse order.

7. **GCD by Euclid:** gcd(a, b) = gcd(b, a % b), gcd(a, 0) = a. gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = **6**. Time O(log min(a, b)).
8. **LCM:** lcm(a, b) = a × b / gcd(a, b). lcm(24, 36) = 864 / 12 = **72**. Write it as `a / gcd(a, b) * b` to avoid overflow.
9. **Digit sum by recursion:** `f(n) = n % 10 + f(n / 10)`, f(0) = 0 → f(1234) = 4 + 3 + 2 + 1 = **10**.
10. **2D arrays:** `int a[m][n]` is stored row-major. Address of a[i][j] = base + (i × n + j) × size. For `int a[3][4]`, base 1000, 4-byte int: a[2][1] → 1000 + (2 × 4 + 1) × 4 = **1036**.
11. **Matrix multiplication:** A (m×n) × B (p×q) is possible only if **n = p**; the result is m×q. `C[i][j] = Σ A[i][k] × B[k][j]` for k = 0..n−1. Scalar multiplications = m × n × q (2×3 times 3×4 → 24). Three nested loops → O(n³) for square matrices.
12. **Row and column sums:** row i sum = Σⱼ a[i][j] (outer loop on rows); column j sum = Σᵢ a[i][j] (outer loop on columns). Each is O(m × n).

### Mindmap

```mindmap
Recursion and matrices
  Recursion basics
    Base case stops
    Step moves closer
    Frame per call
    No base = overflow
  Tracing
    Before call = down
    After call = up, reversed
    x-- prints then drops
    --x drops then passes
  Classic functions
    F(5) = 5, 15 calls
    gcd(b, a % b)
    lcm = a / gcd * b
    Digit sum n % 10
  Cost
    Fib recursion O(2ⁿ)
    Stack space O(depth)
    Euclid O(log n)
  Matrices
    Row-major storage
    (i × n + j) × size
    A×B needs n = p
    Result m × q
  Matrix programs
    Row sum: fix i
    Column sum: fix j
    Multiply: 3 loops
```

### Remember it

- **"Down before, up after"** — code before the recursive call runs going down; code after it runs coming back, in reverse.
- **"Every frame has its own x"** — never carry one frame's variable into another.
- **"Inner must match"** — (m×**n**) × (**n**×q) = m×q.
- **"GCD swaps and mods"** — gcd(a, b) → gcd(b, a % b) until b = 0.
- **"LCM = product ÷ GCD"** — divide first to stay safe from overflow.

### Exam trap

- `printf("%d", x--)` prints the **old** x; `fun(--x)` passes the **new** x. Mixing them up changes the whole trace.
- Printing after the recursive call reverses the order: p(3) with print-after gives **1 2 3**, not 3 2 1.
- Forgetting F(0) = 0: if the paper defines F(1) = F(2) = 1, then F(5) is still 5, but ask yourself which base the question uses.
- Recursive Fibonacci is O(2ⁿ) time but only **O(n)** space (stack depth), not O(2ⁿ) space.
- Matrix multiply: initialise `C[i][j] = 0` before the k-loop, and check `colsA == rowsB` before multiplying; print "not possible" otherwise.
- `a * b / gcd` can overflow `int` for large a, b; `a / gcd * b` is safer.

### Exam answer

**Q. What is recursion? Explain how a recursive function uses the stack, and find the output of F(5) where F(n) = F(n−2) + F(n−1), F(0) = 0, F(1) = 1. State its complexity.** _(Sonali & Janata Officer (IT) 2023; Combined Bank AP 2024)_

**Definition.** Recursion is a technique in which a function solves a problem by calling itself on a smaller instance of the same problem. A recursive function has two parts: a **base case**, which returns a result directly and stops the recursion, and a **recursive case**, which calls the function again with an argument closer to the base case.

**How the stack is used.**

1. Each call pushes an **activation record** (stack frame) holding its parameters, local variables and return address.
2. Calls keep pushing frames until a base case is reached.
3. The base case returns a value; its frame is popped, and control resumes in the caller at the point after the call.
4. Frames are popped in LIFO order until the first call returns the final answer.
5. If the base case is missing or never reached, frames keep growing until a **stack overflow** occurs.

**Recursion tree for F(5).**

```
                    F(5)
               /           \
           F(3)             F(4)
          /    \          /      \
       F(1)   F(2)     F(2)      F(3)
              /  \     /  \     /    \
           F(0) F(1) F(0) F(1) F(1)  F(2)
                                     /  \
                                  F(0) F(1)
```

**Working.** F(2) = F(0) + F(1) = 0 + 1 = 1; F(3) = F(1) + F(2) = 1 + 1 = 2; F(4) = F(2) + F(3) = 1 + 2 = 3; F(5) = F(3) + F(4) = 2 + 3 = **5**. The tree has **15 calls**.

**Program.**

```c
#include <stdio.h>

int F(int n)
{
    if (n == 0) return 0;          /* base case 1 */
    if (n == 1) return 1;          /* base case 2 */
    return F(n - 2) + F(n - 1);    /* recursive case */
}

int main(void)
{
    printf("F(5) = %d\n", F(5));   /* prints F(5) = 5 */
    return 0;
}
```

**Complexity.** Each call makes two more calls, so the number of calls grows exponentially: **time O(2ⁿ)**. At most n frames are on the stack at once (the longest path F(5) → F(4) → … → F(0)), so **space O(n)**. The iterative version, or recursion with memoization, takes O(n) time.

**Conclusion.** Recursion gives short, clear code for problems with a self-similar structure (trees, divide and conquer, Tower of Hanoi), but it costs stack memory and call overhead. For simple series like Fibonacci, iteration is preferred in practice.

### Recall check

1. What does `void p(int n){ if (n > 0) { printf("%d ", n); p(n - 1); printf("%d ", n); } }` print for p(2)?
2. Find lcm(18, 30) using Euclid's GCD; show each gcd step.
3. For `int a[4][5]` with base address 2000 and 4-byte int, what is the address of a[3][2]?

_Answers: (1) 2 1 1 2. (2) gcd(18, 30) → gcd(30, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = 6; lcm = 18 / 6 × 30 = 90. (3) 2000 + (3 × 5 + 2) × 4 = 2000 + 68 = 2068._

## Arrays, strings and pointers (9 Oct)

Week 1, day 3 (Friday, past-paper day). The C questions still left after loops and recursion: array functions (2×), Floyd's binary triangle, and the ICB 2026 string program. Pointers are not asked as a written question in the 18 papers, but they sit under every array and string answer and are common MCQ material.

### Past questions

| Question                                                                                                                           | Paper                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Function: smallest element in an array                                                                                             | Combined Bank AP, 09.06.2023                      |
| Function: print numbers divisible by 3 in an array                                                                                 | Combined (Sonali & Janata) Officer IT, 04.10.2024 |
| Program: Floyd's binary triangle (1 / 01 / 101 / 0101 / 10101), n = 5                                                              | Combined Bank AP, 09.02.2024                      |
| Function: change each alphabetic character of a string to the next character; non-alphabetic unchanged; keep case. Time complexity | ICB Securities AP, 27.06.2026                     |
| 1 million characters in ASCII → memory in MB _(1 MB)_                                                                              | Bangladesh Bank Asst Maintenance Engineer, 2016   |

### Bangla core

**গল্পে বুঝি:** Array হলো ব্যাংকের এক সারি লকার — নম্বর শুরু 0 থেকে, সব লকার সমান মাপের, পাশাপাশি। তাই গার্ড সরাসরি লকার i-তে যেতে পারেন: শুরু + i × লকারের মাপ। এজন্য `a[i]` সঙ্গে সঙ্গে পাওয়া যায়, O(1)। Pointer হলো স্লিপে লেখা লকার নম্বর — স্লিপটা টাকা নয়, টাকা কোথায় আছে তা বলে। String হলো লকারে রাখা অক্ষরের সারি, শেষে একটা খালি লকার (`'\0'`) মানে "এখানে শেষ"।

**ধাপে ধাপে:**

1. **Array:** `int a[5];` একটানা 5টা int-এর জায়গা নেয়; index 0 থেকে 4। `sizeof(a)` = 20 byte (4-byte int)। C সীমা পরীক্ষা করে না — `a[5]` লিখলেও compile হয়, কিন্তু আবর্জনা মান পড়ে।
2. **Address:** `&a[i]` = base + i × sizeof(type)। a যদি 2000-এ শুরু হয়, `&a[3]` = 2000 + 3 × 4 = 2012।
3. **Pointer:** `&x` = x-এর ঠিকানা; `*p` = সেই ঠিকানার মান; `p + 1` = পরের element (পরের byte নয়)।
4. **Array-এর নামই ঠিকানা:** `a` মানে `&a[0]`, আর `a[i]` মানে `*(a + i)`। তবে `a++` লেখা যায় না (compile error); `p++` যায়।
5. **Function-এ array পাঠালে** শুধু প্রথম element-এর ঠিকানা যায়। তাই দৈর্ঘ্য n আলাদা করে পাঠাতে হয়, আর ভেতরে `sizeof(a)` দিলে pointer-এর মাপ (8) আসে।
6. **`*p++` বনাম `++*p`:** `*p++` মান নেয়, তারপর pointer সরায়; `++*p` মানটাই 1 বাড়ায়।
7. **String:** `char s[] = "ICB";` → 'I' 'C' 'B' '\0' → sizeof = 4, strlen = 3।
8. **ASCII:** 'A' = 65, 'a' = 97, '0' = 48; ছোট হাতের অক্ষর = বড় হাতের + 32। ১টা ASCII অক্ষর = 1 byte।
9. **পরের অক্ষর (ICB 2026):** 'z' → 'a' আর 'Z' → 'A' আগে আলাদা করে ধরো, বাকি অক্ষরে +1, অন্য চিহ্ন যেমন আছে তেমন। এক পাসে O(n)।
10. **Floyd's binary triangle:** সারি i, কলাম j-তে (i + j) জোড় হলে 1, বিজোড় হলে 0।

**এক লাইনে:** নামই ঠিকানা, a[i] = \*(a + i); string-এর শেষে '\0' লাগে।

### Picture it

**An array is a row of bank lockers.** Locker numbers start at 0. All lockers are the same size (the data type), side by side in one corridor, so the guard can walk straight to locker i: _start of corridor + i × locker width_. That is why `a[i]` is instant, O(1).

**A pointer is the locker number written on a slip.** The slip is not the money; it tells you _where_ the money is. `p` = the slip, `*p` = open the locker, `&x` = "write down x's locker number". `p + 1` means "the next locker", not "the next byte".

**A string is a queue of letters in lockers, with an empty locker (`'\0'`) at the end** to say "the queue stops here". Forget the empty locker and the guard keeps walking into someone else's corridor.

### Understand it step by step

1. **Array basics.** `int a[5];` reserves 5 ints in one block. Index 0 to 4. `sizeof(a)` = 5 × 4 = 20 bytes (4-byte int); number of elements = `sizeof(a) / sizeof(a[0])`. C does **not** check bounds: `a[5]` compiles and reads garbage.
2. **Address formula.** `&a[i]` = base + i × sizeof(type). `int a[5]` at 2000 → `&a[3]` = 2000 + 3 × 4 = **2012**.
3. **Pointer basics.**

| Expression      | Meaning                             |
| --------------- | ----------------------------------- |
| `int *p = &x;`  | p holds x's address                 |
| `*p`            | value at that address (dereference) |
| `p + 1`         | next element: address + sizeof(int) |
| `int **q = &p;` | pointer to a pointer; `**q` is x    |
| `NULL`          | points nowhere; check before `*p`   |

4. **Array name = address of the first element.** `a` behaves like `&a[0]`, and `a[i]` is exactly `*(a + i)`. But `a` is not a variable: `a = a + 1` or `a++` is a compile error; `p++` on a pointer is fine.
5. **Array vs pointer:**

| Point       | Array `int a[5]`         | Pointer `int *p`                 |
| ----------- | ------------------------ | -------------------------------- |
| What it is  | a block of 5 ints        | one variable holding an address  |
| `sizeof`    | 20 (whole block)         | 8 on 64-bit (just the address)   |
| Can change? | no (`a++` is an error)   | yes (`p++` moves it)             |
| Memory      | allocated at declaration | must point to valid memory first |

6. **Passing an array to a function** passes only the address of a[0] (the array "decays" to a pointer). The function cannot know the length, so always pass `n` too: `int smallest(int a[], int n)`. Changes made inside the function change the caller's array.
7. **`*p++` vs `++*p`.** With `int m[] = {5, 2, 8}; int *r = m;`: `*r++` gives 5 and then moves r to m[1]; `*r` is now 2; `++*r` adds 1 to m[1] → 3. Postfix `++` binds tighter than `*`, so `*p++` = `*(p++)`.
8. **Strings.** `char s[] = "ICB";` stores `'I' 'C' 'B' '\0'` → `sizeof(s)` = **4**, `strlen(s)` = **3**. `strlen` counts up to the first `'\0'`: `strlen("Dhaka\0Bank")` = 5. `char *t = "Bank";` points to a read-only literal: reading `*(t + 2)` = `'n'` is fine; writing `t[0] = 'b'` is undefined behaviour.
9. **ASCII.** `'A'` = 65, `'Z'` = 90, `'a'` = 97, `'z'` = 122, `'0'` = 48; lower = upper + 32. One ASCII character = 1 byte, so 1,000,000 characters = 10⁶ bytes ≈ **1 MB** (≈ 0.95 MiB if 1 MB = 2²⁰ bytes).
10. **Next-letter shift (ICB 2026).** For each character: `'z'` → `'a'`, `'Z'` → `'A'` (wrap), other letters `+1`, everything else unchanged. "Zebra-9z" → **"Afcsb-9a"**. One pass over n characters → O(n) time, O(1) extra space (done in place).
11. **Smallest element.** `min = a[0]`, compare with a[1] … a[n−1] → exactly **n − 1 comparisons**, O(n).
12. **Divisible by 3.** Test `a[i] % 3 == 0` for each i → O(n). For {45, 12, 30, 7, 99, 18, 26, 60} it prints 45 12 30 99 18 60.
13. **Floyd's binary triangle.** Row i (1 to n) has i numbers. The value at row i, column j is **1 if (i + j) is even, else 0**. Check: row 1 → 1; row 2 → 0 1; row 3 → 1 0 1. Total printed = n(n + 1)/2 (15 for n = 5) → O(n²).

```
n = 5
1
0 1
1 0 1
0 1 0 1
1 0 1 0 1
```

### Mindmap

```mindmap
Arrays, strings, pointers
  Arrays
    Index 0 to n−1
    base + i × size
    No bounds check
    Pass n with array
  Pointers
    &x gives address
    *p gives value
    p + 1 = next element
    a[i] = *(a + i)
  Array vs pointer
    sizeof block vs 8
    a++ is an error
    Decays when passed
  Strings
    Ends with '\0'
    sizeof 4, strlen 3
    Literal is read-only
    'a' − 'A' = 32
  Programs
    min: n − 1 comparisons
    a[i] % 3 == 0
    z → a, Z → A
    Floyd: (i + j) even → 1
  Complexity
    One pass O(n)
    Triangle O(n²)
    In place O(1) space
```

### Remember it

- **"Name is the address"** — `a` = `&a[0]`, and `a[i]` = `*(a + i)`.
- **"Star opens, ampersand writes the address"** — `*p` reads the locker, `&x` gives its number.
- **"Plus one means next box, not next byte"** — pointer arithmetic scales by the type size.
- **"Zero at the end"** — every string needs one more byte for `'\0'`.
- **"Even sum, print one"** — Floyd's binary triangle: `(i + j) % 2 == 0 ? 1 : 0`.
- **"Z wraps to A"** — handle `'z'` and `'Z'` before the general `+1`.

### Exam trap

- `s[i]++` on `'z'` gives `'{'` (ASCII 123), not `'a'`. Check the wrap first.
- Testing `isalpha` but forgetting case: `'Z' + 1` = `'['`. Both `'z'` and `'Z'` need their own rule.
- `sizeof(a)` inside a function that received `int a[]` gives the **pointer size** (8), not the array size. Pass n.
- `char s[3] = "ICB";` has no room for `'\0'`; `printf("%s", s)` may print garbage. Use `s[4]` or `s[]`.
- Starting `min = 0` gives a wrong answer when every value is positive (min stays 0). Start with `min = a[0]`.
- `*p++` moves the pointer; `(*p)++` changes the value. They are not the same.
- Floyd's _binary_ triangle (0/1 pattern) is not Floyd's triangle (1, 2 3, 4 5 6 …). Read the question.

### Exam answer

**Q. Write a function in C that changes each alphabetic character of a string to the next character. Non-alphabetic characters stay unchanged and the case is kept ('z' becomes 'a', 'Z' becomes 'A'). Find its time complexity.** _(ICB Securities AP, 27.06.2026)_

**Definition.** A string in C is an array of characters terminated by the null character `'\0'`. Each character is stored as its ASCII code, and consecutive letters have consecutive codes ('a' = 97 … 'z' = 122, 'A' = 65 … 'Z' = 90), so adding 1 to a letter's code gives the next letter, except for 'z' and 'Z', which must wrap round.

**Algorithm.**

1. Start at index i = 0.
2. While s[i] is not `'\0'`:
   - if s[i] is 'z', set it to 'a'; if s[i] is 'Z', set it to 'A';
   - else if s[i] is a letter ('a'–'y' or 'A'–'Y'), add 1;
   - otherwise leave it unchanged.
3. Move to i + 1 and repeat. Stop at `'\0'`.

```
 s:  Z   e   b   r   a   -   9   z   \0
     |   |   |   |   |   |   |   |
     A   f   c   s   b   -   9   a   \0     (wrap, +1, +1, +1, +1, keep, keep, wrap)
```

**Program.**

```c
#include <stdio.h>

void nextChar(char s[])
{
    int i;
    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] == 'z')
            s[i] = 'a';                         /* wrap lower case */
        else if (s[i] == 'Z')
            s[i] = 'A';                         /* wrap upper case */
        else if ((s[i] >= 'a' && s[i] < 'z') ||
                 (s[i] >= 'A' && s[i] < 'Z'))
            s[i] = s[i] + 1;                    /* next letter */
        /* digits, spaces, symbols: unchanged */
    }
}

int main(void)
{
    char s[100];
    printf("Enter a string: ");
    fgets(s, sizeof(s), stdin);
    nextChar(s);
    printf("Result: %s", s);
    return 0;
}
```

**Sample runs.** "Zebra-9z" → `Afcsb-9a`; "Hello, World!" → `Ifmmp, Xpsme!`

**Complexity.** The loop visits each of the n characters once and does constant work per character → **time O(n)**. The string is changed in place with one index variable → **extra space O(1)**.

**Conclusion.** The solution relies on the ASCII ordering of letters, handles the two wrap-around cases explicitly, and leaves non-alphabetic characters untouched, all in a single linear pass. The same idea, with a shift of k and `(c − 'a' + k) % 26`, is the Caesar cipher.

### Recall check

1. For `int a[4] = {2, 4, 6, 8}; int *p = a;`, what is `*(p + 3) - *p`, and what is wrong with `a++`?
2. What are `sizeof` and `strlen` of `char s[] = "Sonali";`?
3. Write row 6 of Floyd's binary triangle.

_Answers: (1) 8 − 2 = 6; `a` is an array name, not a modifiable pointer, so `a++` is a compile error. (2) sizeof = 7 (6 letters + '\0'), strlen = 6. (3) 0 1 0 1 0 1 (i = 6: j = 1 gives 7, odd → 0)._
