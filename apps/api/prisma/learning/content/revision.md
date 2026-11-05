# Revision Notes

Recall cards for every topic already studied. Each card has six parts:

- **Picture it:** a short story that carries the whole idea.
- **Understand it step by step:** the _why_ behind each rule, with a small example.
- **Core points:** the facts and formulas to know cold.
- **Mindmap:** the topic on one screen.
- **Exam trap:** the mistakes examiners expect.
- **Recall check:** a self-test with a hidden solution.

A card takes about 10–12 minutes. The full lesson stays on the subject page linked in the card index.

## How to revise with a card

| Step | What you do                                                                                                                                        | Time   |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1    | **Blurt first.** Read only the card title. On a blank page, write everything you remember, and draw the mindmap from memory.                       | 3 min  |
| 2    | **Check.** Open the card and read the story, the step-by-step explanation and the core points. Tick what you got right; underline what you missed. | 5 min  |
| 3    | **Self-test.** Cover the card, answer the recall check on paper, then open the solution.                                                           | 3 min  |
| 4    | **Score yourself 1–5.** 5 = everything recalled, 3 = half, 1 = almost nothing.                                                                     | —      |
| 5    | **Repair.** A score of 1 or 2 means: re-read that part of the full note today, and revise the card again tomorrow.                                 | 10 min |

**Spacing rule:** revise each card about 1, 3, 7, 14 and 30 days after you first study it. Each revision is cheaper than the last, and a topic seen five times this way is very hard to forget.

**Before a mock:** use only the mindmaps. Draw each one from memory, then compare.

## Card index

| Card | Topic                                                    | Full notes                                                                      |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| C1   | Loops: primes, Fibonacci, series, complexity             | [C Programming](#c.loops-and-must-write-programs-primes-fibonacci-series-7-oct) |
| C2   | Recursion, GCD/LCM, matrices                             | [C Programming](#c.recursion-functions-and-matrix-programs-8-oct)               |
| C3   | Arrays, strings, pointers                                | [C Programming](#c.arrays-strings-and-pointers-9-oct)                           |
| O1   | OOP basics, four pillars, constructors, inheritance      | [OOP](#oop) Parts 1–4                                                           |
| O2   | Polymorphism, abstract class vs interface, relationships | [OOP](#oop) Parts 5–9                                                           |
| M1   | Percentage, profit and loss                              | [Math Practice](#bmath.topic-1-percentage-profit-and-loss)                      |
| B1   | সন্ধি                                                    | [Bangla & English MCQ](#langmcq.bangla-1)                                       |
| E1   | Parts of speech                                          | [Bangla & English MCQ](#langmcq.english-1-parts-of-speech)                      |

A new card is added here each time a new topic is studied. The week-by-week timetable for these cards is in [Study Plan](#study-plan.weekly-revision-schedule).

---

## C1 · Loops: primes, Fibonacci, series, complexity

### Picture it

A bank teller counts a bundle of notes. Her thumb is the **loop counter**, "are there notes left?" is the **test**, moving to the next note is the **update**, and what she does with each note (check it, add it, compare it) is the **body**. Checking a number for primes is like checking a note for fakes: you only need to look at half of each pair of factors, so you can stop at the square root.

### Understand it step by step

1. **How a `for` loop runs.** The initialisation runs once. Then the test runs before every round; if it is true, the body runs, then the update, then the test again. When the test is false, the loop ends. In `for (i = 1; i <= 3; i++)` the body runs 3 times, and i is **4** when the loop ends.
2. **Why the prime test stops at √n.** Factors come in pairs: for 36 they are 2 × 18, 3 × 12, 4 × 9 and 6 × 6. The smaller number of each pair is never bigger than √36 = 6. So if nothing from 2 to √n divides n, nothing above √n can either. Writing `d * d <= n` does the same check without `sqrt()` or floating point.
3. **Fibonacci with two variables.** Each new term needs only the last two terms, so keep them in a and b and slide forward one step at a time. The loop computes each term once → O(n). Plain recursion computes the same terms again and again → O(2ⁿ).
4. **Series with a growing gap.** For 1, 2, 4, 7, 11 the differences are 1, 2, 3, 4. So at step i, add i: 1 + 1 = 2, 2 + 2 = 4, 4 + 3 = 7. Always write the differences first; they show you the update line.
5. **The eˣ series.** The next term xⁱ / i! equals the previous term × x / i. Multiplying the previous term avoids computing big powers and factorials, which overflow quickly.
6. **Counting complexity.** Count how often the innermost line runs as n grows, and drop constants. A loop that doubles i (1, 2, 4, 8 …) runs as many times as you can halve n → log₂ n. Nested loops multiply their counts.
7. **C rules behind output questions.** Integer division drops the fraction (7 / 2 = 3). The result of `%` takes the sign of the left number (−7 % 3 = −1). A `static` local is created once, so it remembers its value between calls.

### Remember it · core points

- **Every loop has 4 parts:** initialise → test → body → update.
- **Prime test:** n ≥ 2 and no divisor from 2 to √n. Write `for (d = 2; d * d <= n; d++)`. **1 is not prime; 2 is.**
- **Why √n:** if n = a × b, one of a, b is always ≤ √n.
- **Primes 1..n** by trial division: O(n√n) time, O(1) space.
- **Fibonacci (iterative):** a = 0, b = 1; repeat: print a; next = a + b; a = b; b = next → O(n) time, O(1) space. `long long` holds up to F92 only.
- **Series 1, 2, 4, 7, 11, 16 …:** the gap grows by 1 → `term += i`.
- **Series 1, 2, 2, 3, 3, 3 … up to n:** prints n(n + 1)/2 numbers → O(n²).
- **eˣ series:** reuse the last term, `term = term * x / i`, with `double` variables.
- **Smallest element:** start `min = a[0]` → n − 1 comparisons, O(n).
- **Loop-count rules:** `i < n` → n; `i * i <= n` → √n; `i *= 2` → log n; nested loops multiply.
- **C basics that MCQs test:** `sizeof(char)` is always 1; a `static` local keeps its value between calls; `5 / 2` = 2 (integer division); `-7 % 3` = −1 in C.

### Mindmap

```mindmap
C1 · Loops
  **Loop parts**
    init, test, body, update
    `for(...);` = empty body
  **Primes**
    n < 2 → not prime
    d * d <= n
    1..n → O(n√n)
  **Fibonacci**
    a=0, b=1, next=a+b
    O(n), O(1)
    overflow after F92
  **Series**
    1,2,4,7,11 → term += i
    1,2,2,3,3,3 → n(n+1)/2
    eˣ → term *= x / i
  **Complexity**
    count body runs
    nested → multiply
    halving → log n
```

### Exam trap

- `for (i = 0; i < 3; i++);` — the semicolon makes the body empty; the next line runs once, after the loop.
- Starting `min = 0` fails when all values are positive. Start with `min = a[0]`.
- `x / i` with `int` gives 0 when x < i. Use `double` in the eˣ series.
- "Fibonacci up to 100 numbers" overflows `long long` — say so in the answer.

### Recall check

1. Is 91 prime? How many divisions does the √n loop do before it stops?
2. Write the next two terms of 1, 2, 4, 7, 11, 16, … and the sum of the first 8 terms.
3. Time complexity of `for (i = 1; i < n; i *= 2) for (j = 0; j < n; j++) count++;`?
4. Output: `int i; for (i = 0; i < 3; i++); printf("%d", i);`
5. `int f() { static int c = 5; return c++; }` is called three times. What does each call return?

#### Solution

1. d runs 2, 3, 4, 5, 6, 7; 91 % 7 = 0, so it stops after **6 divisions**. **Not prime** (91 = 7 × 13).
2. **22, 29** (gaps 6, 7). Sum = 1 + 2 + 4 + 7 + 11 + 16 + 22 + 29 = **92**.
3. Outer loop log n times × inner n times → **O(n log n)**.
4. **3**. The loop body is empty; printf runs once after i reaches 3.
5. **5, 6, 7**. `static` is set once; `c++` returns the old value, then adds 1.

---

## C2 · Recursion, GCD/LCM, matrices

### Picture it

**Recursion is a pile of files on an officer's desk.** To finish file fun(5) he needs fun(3), so he puts fun(5) down half done and opens fun(3). When a file needs nothing more (the base case), he finishes it and picks up the file underneath, exactly where he left it. Work done before opening the next file happens on the way **down**; work done after it happens on the way **back up**, in reverse order.

**A matrix is a cinema hall:** a[i][j] is row i, seat j, and C stores the hall row by row.

### Understand it step by step

1. **What a call does.** Each call pushes a stack frame holding its parameters, local variables and the return address. When the call returns, its frame is popped and the caller continues from the next line.
2. **How to trace.** Draw one row per frame. Write what each frame prints before the recursive call, then what it prints after the call. Read the "before" column top to bottom, then the "after" column bottom to top. For `printf(n); p(n-1); printf(n);`, p(2) prints **2 1 1 2**.
3. **`x--` vs `--x`.** `x--` hands over the old value, then subtracts 1. `--x` subtracts 1 first, then hands over the new value. So `printf("%d", x--)` with x = 5 prints 5 and leaves x = 4; then `fun(--x)` makes x = 3 and passes 3.
4. **Why naive Fibonacci is slow.** Every call splits into two more calls, so the calls form a tree. F(5) makes 15 calls and computes F(2) three times. The stack holds only one path of that tree at a time, so the space is just O(n).
5. **Why Euclid's GCD works.** Any number that divides both a and b also divides a % b. So gcd(a, b) = gcd(b, a % b), and the numbers shrink fast: gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = 6.
6. **LCM from GCD.** For any two numbers, gcd × lcm = a × b. So lcm = a / gcd × b. Dividing first keeps the number small.
7. **Row-major address.** C stores row 0 completely, then row 1, and so on. To reach a[i][j], skip i whole rows (i × cols elements) and then j more elements, then multiply by the element size.
8. **Why matrix sizes must match.** C[i][j] is row i of A multiplied element by element with column j of B, then added. A row of A has n numbers and a column of B has p numbers, so the pairing only works when n = p.

### Remember it · core points

- **Every recursive function needs** a base case (stops) and a step that moves toward it. No base case → stack overflow.
- **Each call gets its own stack frame** (its own parameters and locals).
- **Code before the recursive call runs going down; code after it runs coming back up, in reverse order.**
- **`x--`** gives the old value, then decreases. **`--x`** decreases first, then gives the new value.
- **Naive Fibonacci F(5) = 5** with **15 calls**. Time O(2ⁿ), space O(n) (stack depth).
- **GCD (Euclid):** gcd(a, b) = gcd(b, a % b); gcd(a, 0) = a. Time O(log min(a, b)).
- **LCM** = a / gcd × b (divide first to avoid overflow).
- **Digit sum:** f(n) = n % 10 + f(n / 10), f(0) = 0.
- **2D array (row-major):** address of a[i][j] = base + (i × cols + j) × size.
- **Matrix multiply:** (m × n) × (p × q) needs **n = p**; result is m × q; scalar multiplications = m × n × q; three nested loops; set C[i][j] = 0 first.
- **Row sum:** fix the row, loop over columns. **Column sum:** fix the column, loop over rows.

### Mindmap

```mindmap
C2 · Recursion & matrices
  **Recursion**
    base case + step
    frame per call
    no base → overflow
  **Tracing**
    before call → down
    after call → up, reversed
    x-- old, --x new
  **Classics**
    F(5) = 5, 15 calls
    gcd(b, a % b)
    lcm = a / gcd * b
  **Cost**
    Fib O(2ⁿ) time, O(n) space
    Euclid O(log n)
  **Matrices**
    row-major (i×cols + j)×size
    n = p → m × q
    3 loops, C = 0 first
```

### Exam trap

- Printing after the recursive call reverses the order.
- Recursive Fibonacci space is O(n), not O(2ⁿ).
- Check `colsA == rowsB` before multiplying; print "not possible" otherwise.
- Each frame keeps its own x — never carry one frame's value into another.

### Recall check

1. Output of p(3): `void p(int n) { if (n > 0) { p(n - 1); printf("%d ", n); } }`
2. Find gcd(84, 36) step by step, then lcm(84, 36).
3. `int a[5][6]`, base address 3000, 4-byte int. Address of a[2][4]?
4. A 3 × 2 matrix times a 2 × 5 matrix: size of the result, and number of scalar multiplications?
5. How many calls does naive recursive Fibonacci make for F(4)?

#### Solution

1. **1 2 3** (the print runs on the way back up).
2. gcd(84, 36) → gcd(36, 12) → gcd(12, 0) = **12**. lcm = 84 / 12 × 36 = **252**.
3. 3000 + (2 × 6 + 4) × 4 = 3000 + 64 = **3064**.
4. Result **3 × 5**; multiplications = 3 × 2 × 5 = **30**.
5. C(4) = 1 + C(3) + C(2) = 1 + 5 + 3 = **9 calls**.

---

## C3 · Arrays, strings, pointers

### Picture it

**An array is a corridor of same-size bank lockers numbered from 0.** The guard walks straight to locker i: start of the corridor + i × locker width. **A pointer is a slip with a locker number on it:** the slip is not the money, it says where the money is. **A string is a row of lockers with letters, and one empty locker (`'\0'`) at the end** that says "stop here".

### Understand it step by step

1. **Why `a[i]` is instant.** All elements have the same size and sit side by side, so the address is computed directly: base + i × size. No searching is needed → O(1).
2. **What a pointer's type does.** A pointer stores an address. Its type tells the computer how many bytes to read at that address and how far `p + 1` jumps: 4 bytes for an `int *`, 1 byte for a `char *`.
3. **Why `a[i]` equals `*(a + i)`.** The compiler turns every index into pointer arithmetic: start at a, move i elements, read the value. The array name stands for the address of its first element, but it is not a variable, so it cannot be changed with `a++`.
4. **Decay.** When you pass an array to a function, only the starting address is sent. The function has no idea how long the array is, so `sizeof` inside it gives the size of a pointer. That is why every array function also takes n.
5. **Reading `*p++`.** The `++` belongs to p, but it is a post-increment: it hands over the old address first. So `*p++` reads the current element, then moves p to the next one. To change the value instead, write `(*p)++`.
6. **How strings know where they end.** C stores no length. `strlen` walks forward until it meets `'\0'`. `sizeof` on a `char` array counts every byte in it, including `'\0'`. A string literal such as `"Bank"` sits in read-only memory, so writing into it is undefined behaviour.
7. **ASCII arithmetic.** Letters have consecutive codes, so adding 1 gives the next letter, and adding or subtracting 32 switches case. The only problem is at the ends: 'z' + 1 is '{', so 'z' and 'Z' need their own wrap rule.
8. **Floyd's binary triangle.** Row 1 starts with 1, row 2 starts with 0, row 3 with 1, and inside a row the values alternate. The rule "(i + j) even → 1" captures both patterns in one line.

### Remember it · core points

- **Index runs 0 to n − 1.** C does not check bounds.
- **Address:** &a[i] = base + i × sizeof(type).
- **Array name = address of the first element:** `a[i]` is exactly `*(a + i)`. `a++` is a compile error; `p++` on a pointer is fine.
- **`p + 1`** moves to the next element (adds sizeof(type)), not the next byte.
- **`&x`** gives the address; **`*p`** gives the value at that address.
- **An array passed to a function decays to a pointer:** `sizeof` inside the function gives the pointer size (8 on 64-bit), so always pass n.
- **`*p++`** moves the pointer (`*(p++)`); **`(*p)++`** or **`++*p`** changes the value.
- **A string ends with `'\0'`:** `sizeof("ICB")` = 4, `strlen("ICB")` = 3. A `char[]` can be edited; a string literal cannot.
- **ASCII:** 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122, '0' = 48; lower case = upper case + 32. One character = 1 byte.
- **Next-letter shift:** handle 'z' → 'a' and 'Z' → 'A' first, then +1 for other letters; others unchanged → O(n) time, O(1) space.
- **Floyd's binary triangle:** value at row i, column j = 1 if (i + j) is even, else 0 → O(n²).

### Mindmap

```mindmap
C3 · Arrays, strings, pointers
  **Arrays**
    index 0..n−1
    base + i × size
    no bounds check
  **Pointers**
    &x address, *p value
    a[i] = *(a + i)
    p + 1 = next element
  **Array vs pointer**
    a++ error, p++ fine
    decays when passed → pass n
  **Strings**
    ends with '\0'
    sizeof 4, strlen 3
    literal read-only
  **Programs**
    z → a, Z → A first
    Floyd: (i + j) even → 1
    min = a[0]
```

### Exam trap

- `'z' + 1` is `'{'`, and `'Z' + 1` is `'['`. Check the wrap before adding 1.
- `char s[3] = "ICB";` has no room for `'\0'`.
- `sizeof(a)` inside a function that received `int a[]` is the pointer size, not the array size.
- Floyd's **binary** triangle (0/1) is not Floyd's triangle (1, 2 3, 4 5 6 …).

### Recall check

1. `int a[] = {3, 6, 9, 12}; int *p = a + 1;` What do `*p + 2` and `*(p + 2)` give?
2. `sizeof` and `strlen` of `char s[] = "Janata";`?
3. Apply the next-letter shift to "Yazd Z1".
4. `int a[6]` starts at address 1500, 4-byte int. Address of a[5]?
5. Write row 4 of Floyd's binary triangle.

#### Solution

1. `*p` = 6, so `*p + 2` = **8**; `*(p + 2)` = a[3] = **12**.
2. sizeof = **7** (6 letters + '\0'), strlen = **6**.
3. **"Zbae A1"** (Y→Z, a→b, z→a, d→e, space kept, Z→A, 1 kept).
4. 1500 + 5 × 4 = **1520**.
5. **0 1 0 1** (i = 4: j = 1 gives 5, odd → 0).

---

## O1 · OOP basics, four pillars, constructors, inheritance

### Picture it

Think of a **car**. The engine is sealed under the bonnet and you change speed only with the pedal (**encapsulation**). The dashboard shows speed and fuel and hides the 2,000 parts behind it (**abstraction**). An electric car _is a_ car: it gets wheels and brakes from Car and adds a battery (**inheritance**). The same "start" button starts a petrol car and an electric car in different ways (**polymorphism**).

### Understand it step by step

1. **Class vs object.** A class is written once and lists the fields and methods. Each `new` creates an object with its own copy of the fields. One `Account` class can give two accounts with different balances.
2. **Encapsulation.** When fields are `private`, every change must go through a method, and that method can check the rule. A `deposit()` that rejects negative amounts means the balance can never become wrong from outside.
3. **Abstraction.** The caller sees only what an object can do, not how. A program that calls `withdraw()` on an `ATM` interface keeps working even if the bank changes the code behind it.
4. **Inheritance and the "is-a" test.** A child class gets the parent's fields and methods, then adds or changes some. Test with a sentence: "A Savings account is an Account" is true → inheritance. "A Car is an Engine" is false; a car _has_ an engine → composition.
5. **Why constructors run parent first.** Java puts `super()` at the top of every constructor. So building a C object first builds its A part, then its B part, then the C part: the output is A B C.
6. **The free default constructor.** Java gives a class a no-argument constructor only when you write no constructor at all. Write `Box(int w)` and `new Box()` stops compiling.
7. **static.** A static field belongs to the class, not to one object, so all objects share one copy. A typical use is counting how many objects were created.
8. **Why Java blocks multiple class inheritance.** With two parent classes, the child could get two different versions of the same method or field (the diamond problem). Interfaces carry no object state, and if two of them give the same default method, Java forces the class to choose.

### Remember it · core points

- **Class = blueprint; object = an instance of it.**
- **Four pillars, "A PIE":**
  - **Abstraction:** show what, hide how (abstract classes, interfaces).
  - **Polymorphism:** one name, many forms.
  - **Inheritance:** a child class reuses a parent class (is-a).
  - **Encapsulation:** private data + public methods that check it.
- **Encapsulation hides data; abstraction hides complexity.** "Data hiding", "private", "access modifier" → encapsulation.
- **Constructor:** same name as the class, no return type (not even void), runs when the object is created. Writing a constructor with parameters removes the free default constructor.
- **Java constructor order:** `super()` runs first, so the parent is built before the child.
- **static member:** one copy shared by all objects of the class.
- **Java access, narrow → wide:** private → default (package) → protected → public.
- **Inheritance types:** single, multilevel, hierarchical, multiple, hybrid. Java classes allow only one parent; multiple inheritance works through interfaces.
- **Diamond problem in Java:** if two interfaces give the same default method, the class must override it and can call `X.super.method()`. (C++ only: fixed with virtual inheritance.)
- **Not inherited in Java:** constructors and private members.
- **Prefer composition** when the relationship is has-a, not is-a.

### Mindmap

```mindmap
O1 · OOP foundations
  **Basics**
    class = blueprint
    object = instance
  **A PIE**
    Abstraction: what, not how
    Polymorphism: many forms
    Inheritance: is-a
    Encapsulation: private data
  **Constructor**
    no return type
    parent runs first
    param ctor removes default
  **Inheritance types**
    single, multilevel, hierarchical
    multiple, hybrid
    Java: one class, many interfaces
  **Diamond**
    Java: override + X.super.m()
    C++ only: virtual inheritance
```

### Exam trap

- Choosing "abstraction" when the question is about hiding data — that is encapsulation.
- "A constructor returns void" — false; it has no return type.
- "Java supports multiple inheritance" — false for classes, true for interfaces.
- Multilevel (A → B → C) is not multiple (A, B → C).

### Recall check

1. A class has `private double balance` and a `deposit()` method that rejects negative amounts. Which pillar is this?
2. C extends B, B extends A; each constructor prints its class name. What does `new C()` print?
3. Name the five types of inheritance. Which ones can Java classes not do directly?
4. `class Box { Box(int w) { } }` — does `new Box()` compile?

#### Solution

1. **Encapsulation** (private data, access only through a checked method).
2. **A B C** (each child constructor calls `super()` first).
3. Single, multilevel, hierarchical, multiple, hybrid. Java classes cannot do **multiple** (and so hybrid with two class parents); both work through **interfaces**.
4. **No.** Writing `Box(int w)` removes the default constructor.

---

## O2 · Polymorphism, abstract class vs interface, relationships

### Picture it

A bank counter has one sign: **"Pay a bill"**. You can pay with cash, with a card, or with a cheque — the same counter takes different inputs (**overloading**). Behind the counter, a savings account and a current account both answer "calculate interest", but each does it its own way (**overriding**). An **abstract class** is a half-built branch office: some rooms are finished, some are left for each branch. An **interface** is a contract: "whoever signs must offer deposit and withdraw".

### Understand it step by step

1. **Overloading is decided by the compiler.** At the call, the compiler looks at the argument types and picks the matching method: `print(5)` → `print(int)`, `print("Hi")` → `print(String)`. It can only tell methods apart by their parameters. The return type is not enough, because a call such as `sum(2, 3);` may ignore the result.
2. **Overriding is decided when the program runs.** In `Shape s = new Circle();`, the reference type (Shape) decides which methods you may call; the object type (Circle) decides whose body runs. So `s.area()` runs Circle's area.
3. **Why static methods are only hidden.** A static method belongs to the class, so the compiler fixes the call using the reference type. `A ref = new B(); ref.info();` runs A's static `info()`.
4. **Overload resolution.** When several overloads could work, the compiler picks the most specific one: an exact `int` match beats widening the `int` to `double`.
5. **Choosing abstract class or interface.** Use an abstract class when related classes share code and fields (Account → Savings, Current). Use an interface when unrelated classes share an ability (`Comparable`, `Runnable`).
6. **Composition or aggregation.** Ask: "If the whole is destroyed, does the part die too?" A house and its rooms: yes → composition. A department and its teachers: no, teachers move on → aggregation.
7. **`start()` vs `run()`.** `start()` asks the JVM to create a new thread, and that thread then calls `run()`. Calling `run()` yourself is just an ordinary method call in the current thread.
8. **References, not copies.** Arrays and objects are reached through references. `b = a` copies the reference, so both names reach the same array; `a.clone()` makes a separate array.

### Remember it · core points

- **Overloading:** same name, different parameter list, same class, decided at **compile time**. Return type alone is not enough.
- **Overriding:** same signature in a subclass, decided at **run time** by the object's type (dynamic dispatch). Use `@Override`; the method cannot become less visible.
- **static methods are hidden, not overridden;** final and private methods cannot be overridden.
- **`A ref = new B();`** → an instance method runs B's version; a static method runs A's version.
- **Overload resolution:** an exact type match beats widening (`int` before `double`).
- **Abstract class:** abstract and concrete methods, has a constructor, any fields, extend only one. It may have zero abstract methods.
- **Interface:** fields are `public static final` constants, abstract + `default`/`static` methods (Java 8), no constructor, implement many.
- **Neither an abstract class nor an interface can be instantiated.**
- **Relationships:** inheritance = is-a; composition = strong has-a, the part dies with the whole (Car–Engine); aggregation = weak has-a, the part lives on (Department–Teacher); association = uses-a.
- **Threads:** `start()` creates a new thread; calling `run()` directly runs in the current thread.
- **`int[] b = a;`** copies the reference (both see changes); `a.clone()` copies the array.
- **Platform independence** comes from Java bytecode, run by a JVM on each platform.

### Mindmap

```mindmap
O2 · Polymorphism & design
  **Overloading**
    same name, new params
    compile time
    return type alone ✗
  **Overriding**
    same signature, subclass
    run time, object decides
    static → hidden
  **Abstract vs interface**
    abstract: ctor, fields, one
    interface: constants, many
    neither instantiated
  **Relationships**
    is-a: inheritance
    composition: part dies
    aggregation: part lives
  **Java traps**
    start() vs run()
    b = a shares, clone copies
    bytecode = portable
```

### Exam trap

- `int sum(int, int)` and `long sum(int, int)` in one class do not compile.
- Static methods follow the reference type; instance methods follow the object.
- "An interface can have a constructor" — false.
- "An abstract class must have an abstract method" — false in Java.

### Recall check

1. Can one class have both `int sum(int a, int b)` and `long sum(int x, int y)`? Why?
2. `A ref = new B();` `show()` is an instance method overridden in B; `info()` is static in both. What do `ref.show()` and `ref.info()` run?
3. Give three differences between an abstract class and an interface.
4. House–Room and Department–Teacher: composition or aggregation?
5. `int[] a = {1, 2}; int[] b = a; b[1] = 9; System.out.println(a[1]);` prints?

#### Solution

1. **No** — compile error "method sum(int,int) is already defined". Only the return type differs; the parameter lists are the same.
2. **B's `show()`** (run time, the object is a B) and **A's `info()`** (static, the reference is an A).
3. Any three: an abstract class has a constructor, an interface does not; an abstract class can have any fields, an interface only constants; a class extends one abstract class but implements many interfaces; abstract class methods can have any access, interface methods are public by default.
4. House–Room = **composition** (rooms do not exist without the house). Department–Teacher = **aggregation** (a teacher exists without the department).
5. **9** — `b` and `a` refer to the same array.

---

## M1 · Percentage, profit and loss

### Picture it

**Percent is a 100-taka note.** "20%" means 20 taka out of every 100 taka. Every question asks the same thing: _100 of what?_ In a shop, the "100" is the **cost price**, the money the shopkeeper paid. A discount is cut from the price tag, so for a discount the "100" is the **marked price**.

### Understand it step by step

1. **Always divide by the base.** Bought for Tk 400, sold for Tk 500: profit = 100. Profit % = 100 ÷ 400 × 100 = **25%**, not 100 ÷ 500 = 20%, because profit is measured on what was paid.
2. **Why "r% more" is not "r% less" the other way.** If B = 100 and A is 25% more, A = 125. B is 25 less than A, but out of A's 125: 25 ÷ 125 × 100 = **20%**. The base changed, so the percent changed.
3. **Successive changes.** Start at 100. Up 10% → 110. Down 10% of 110 → 99. The result is a **1% fall**, which the formula a + b + ab/100 gives: 10 − 10 − 1 = −1.
4. **Where the SP and CP formulas come from.** A 20% profit means every 100 of CP becomes 120 of SP. So SP = CP × 120 / 100, and going back, CP = SP × 100 / 120. A loss works the same with 100 − loss.
5. **Profit at S₁ = loss at S₂.** The cost price is the same distance from both selling prices, so it sits exactly in the middle: CP = (S₁ + S₂) / 2.
6. **Why same SP with ±x% is always a loss.** The item sold at a profit had a smaller cost price; the item sold at a loss had a bigger one. The same x% loss on a bigger base is more taka than the x% profit on a smaller base, so the total is a loss of x²/100 %.
7. **False weight.** The trader gives 900 g but charges for 1000 g, so for goods that cost him 900 he gets the price of 1000. Gain = 100 on a cost of 900 = **11⅑%**.
8. **Fractions save time.** 16⅔% = 1/6, so "16⅔% of 24 games is the season" becomes 24 × 6 = 144 games.

### Remember it · core points

- **Find the base first ("100 of what?"):** profit and loss % → cost price (CP); discount % → marked price (MP); percent change → the original value.
- **x% of y** = xy / 100. **Percent change** = change ÷ original × 100.
- **A is r% more than B → B is r ÷ (100 + r) × 100 % less than A.** Same formula for "price up r%, cut use to keep spending the same".
- **Successive changes a% then b%** = a + b + ab / 100 (use minus for a fall).
- **SP = CP × (100 ± p) / 100; CP = SP × 100 / (100 ± p).**
- **Marked up m%, discount d%:** profit % = (100 + m)(100 − d) / 100 − 100.
- **Profit at S₁ = loss at S₂ → CP = (S₁ + S₂) / 2.**
- **Two items, same SP, one x% profit and one x% loss → always a net loss of x² / 100 %.**
- **False weight G grams for 1 kg:** gain % = (1000 − G) / G × 100.
- **Fractions:** 16⅔% = 1/6, 33⅓% = 1/3, 12½% = 1/8, 6¼% = 1/16.
- **Written answers:** formula, numbers, then the answer with its unit ("Tk 2000").

### Mindmap

```mindmap
M1 · Percentage & profit-loss
  **Base**
    profit/loss → CP
    discount → MP
  **Percent rules**
    r/(100+r) × 100
    a + b + ab/100
  **CP ↔ SP**
    SP = CP(100 ± p)/100
    CP = SP × 100/(100 ± p)
  **Shortcuts**
    equal profit/loss → middle
    same SP ±x% → loss x²/100
    false weight (1000−G)/G
  **Fractions**
    1/6, 1/3, 1/8, 1/16
```

### Exam trap

- Profit % is on CP, not SP, unless the question says otherwise.
- 20% then 10% discount is 28%, not 30%.
- "+x% then −x%" is never zero — it is a loss of x²/100 %.
- A loss of 25% on SP 150 gives CP = 150 × 100 / 75 = 200, not 150 + 25% of 150.

### Recall check

1. The price of oil rises by 20%. By what percent must a family cut its use to keep spending the same?
2. An article is sold for Tk 1170 at a 10% loss. Find the cost price.
3. Goods are marked 30% above cost and sold at a 10% discount. Profit percent?
4. The profit at Tk 960 equals the loss at Tk 640. What price gives a 30% profit?
5. Two items are sold for Tk 1200 each, one at 20% profit and one at 20% loss. Net result in taka and percent?

#### Solution

1. 20 ÷ 120 × 100 = **16⅔%**.
2. CP = 1170 × 100 ÷ 90 = **Tk 1300**.
3. 130 × 90 ÷ 100 = 117 per 100 of CP → **17% profit**.
4. CP = (960 + 640) ÷ 2 = 800. SP = 800 × 130 ÷ 100 = **Tk 1040**.
5. CP₁ = 1200 × 100 ÷ 120 = 1000; CP₂ = 1200 × 100 ÷ 80 = 1500. Total CP 2500, total SP 2400 → **loss Tk 100 = 4%** (check: 20² ÷ 100 = 4).

---

## B1 · সন্ধি

### Picture it

দুটি রেলের বগি জোড়া লাগানোর কথা ভাবো। প্রথম শব্দের শেষ ধ্বনি আর দ্বিতীয় শব্দের প্রথম ধ্বনি হলো দুটি হুক। জোড়া লাগলে হুকের আকার বদলায়: দুটি "অ/আ" মিলে একটি "আ" হয়, "ই" বেঁকে "য-ফলা" হয়। **সন্ধি শুধু জোড়ার জায়গার ব্যাপার** — পুরো শব্দ নয়, শুধু মিলনস্থল দেখো। _(Two train carriages joining: only the hooks at the joint change shape.)_

### Understand it step by step

1. **কোন সন্ধি চিনবে কীভাবে।** মিলনস্থলে দুটিই স্বর → স্বরসন্ধি। অন্তত একটি ব্যঞ্জন → ব্যঞ্জনসন্ধি। প্রথম অংশের শেষে বিসর্গ (ঃ) → বিসর্গসন্ধি। _(First decide the type from the two sounds at the joint.)_
2. **একই স্বর মিলে দীর্ঘ হয়।** অ/আ + অ/আ = আ (বিদ্যা + আলয় = বিদ্যালয়); ই/ঈ + ই/ঈ = ঈ (রবি + ইন্দ্র = রবীন্দ্র)। _(Two like vowels merge into one long vowel.)_
3. **অ/আ-এর পরে অন্য স্বর এলে নতুন স্বর তৈরি হয়।** অ/আ + ই = এ (নর + ইন্দ্র = নরেন্দ্র); অ/আ + উ = ও (যথা + উচিত = যথোচিত); অ/আ + এ = ঐ (জন + এক = জনৈক); অ/আ + ঔ = ঔ (বন + ঔষধি = বনৌষধি)। _(a + i → e, a + u → o, a + e → ai, a + au → au.)_
4. **ই আর উ নিজের রূপ হারায়।** ই/ঈ-এর পরে ভিন্ন স্বর এলে ই হয়ে যায় য-ফলা (ইতি + আদি = ইত্যাদি); উ/ঊ-এর পরে ভিন্ন স্বর এলে উ হয়ে যায় ব-ফলা (অনু + এষণ = অন্বেষণ)। _(i becomes ya-phala, u becomes ba-phala.)_
5. **এ, ঐ, ও, ঔ ভেঙে যায়।** এদের পরে অ এলে এ → অয়, ঐ → আয়, ও → অব, ঔ → আব: নে + অন = নয়ন, নৈ + অক = নায়ক, পো + অন = পবন, পৌ + অক = পাবক। _(These vowels split into ay, āy, ab, āb.)_
6. **ব্যঞ্জনসন্ধিতে আগের ব্যঞ্জন পরের ধ্বনির মতো হয়ে যায়।** উৎ + জ্বল: ৎ পরের জ-এর মতো হয়ে জ্জ → উজ্জ্বল। দিক্ + অন্ত: ক্ স্বরের আগে নরম হয়ে গ্ → দিগন্ত। সম্ + চয়: ম্ চ-বর্গের আগে ঞ্ → সঞ্চয়। _(The first consonant takes the colour of the next sound.)_
7. **বিসর্গের তিন রূপ।** অঃ-এর পরে ঘোষ ধ্বনি → ও (মনঃ + যোগ = মনোযোগ); ঃ-এর পরে চ → শ্ (নিঃ + চয় = নিশ্চয়); ইঃ/উঃ-এর পরে ঘোষ ধ্বনি → র্ (দুঃ + গতি = দুর্গতি); ঃ-এর পরে র এলে ঃ লোপ পায়, আগের স্বর দীর্ঘ হয় (নিঃ + রস = নীরস)।
8. **বিচ্ছেদ করার কৌশল।** উল্টো পথে চলো: যুক্ত ধ্বনিটি দেখে ভাবো কোন দুটি ধ্বনি থেকে এসেছে, তারপর মিলিয়ে দেখো দুটি অংশই অর্থপূর্ণ শব্দ বা ধাতু কিনা। যেটি কোনো নিয়মে মেলে না (গবাক্ষ, ষোড়শ), সেটি নিপাতনে সিদ্ধ — মুখস্থ রাখতে হয়। _(Work backwards from the joined sound; both parts must be real words.)_

### Remember it · core points

- **সন্ধি = পাশাপাশি দুটি ধ্বনির মিলন।** শুধু মিলনের জায়গা দেখো: প্রথম শব্দের শেষ ধ্বনি + দ্বিতীয় শব্দের প্রথম ধ্বনি। _(Look only at the joint.)_
- **তিন প্রকার:** স্বরসন্ধি (স্বর + স্বর), ব্যঞ্জনসন্ধি (একদিকে ব্যঞ্জন), বিসর্গসন্ধি (বাঁয়ে ঃ)। নিয়মের বাইরে যেগুলো = **নিপাতনে সিদ্ধ**।
- **স্বরসন্ধির মূল নিয়ম:**
  - অ/আ + অ/আ = আ → হিম + আলয় = হিমালয়
  - ই/ঈ + ই/ঈ = ঈ → পরি + ঈক্ষা = পরীক্ষা
  - অ/আ + ই/ঈ = এ → মহা + ঈশ = মহেশ
  - অ/আ + উ/ঊ = ও → সূর্য + উদয় = সূর্যোদয়
  - অ/আ + এ/ঐ = ঐ → জন + এক = জনৈক
  - ই/ঈ + অন্য স্বর = য-ফলা → অতি + অন্ত = অত্যন্ত
  - উ/ঊ + অন্য স্বর = ব-ফলা → সু + আগত = স্বাগত
  - এ, ঐ, ও, ঔ + অ = অয়, আয়, অব, আব → নয়ন, নায়ক, পবন, পাবক
- **ব্যঞ্জনসন্ধি:** দিক্ + অন্ত = দিগন্ত; উৎ + জ্বল = উজ্জ্বল; উৎ + নতি = উন্নতি; সম্ + চয় = সঞ্চয়।
- **বিসর্গসন্ধি:** মনঃ + যোগ = মনোযোগ; নিঃ + চয় = নিশ্চয়; দুঃ + গতি = দুর্গতি; নিঃ + রস = নীরস।
- **নিপাতনে সিদ্ধ (মুখস্থ):** গো + অক্ষ = গবাক্ষ, অন্য + অন্য = অন্যান্য, পর + পর = পরস্পর, বৃহৎ + পতি = বৃহস্পতি, ষট্ + দশ = ষোড়শ, মনস্ + ঈষা = মনীষা, আ + চর্য = আশ্চর্য।

### Mindmap

```mindmap
B1 · সন্ধি
  **পদ্ধতি**
    মিলনের জায়গা খোঁজো
    দুই ধ্বনির নাম দাও
    উল্টো করে মিলিয়ে দেখো
  **স্বরসন্ধি**
    অ+আ = আ, অ+ই = এ, অ+উ = ও
    ই → য-ফলা, উ → ব-ফলা
    এ/ঐ/ও/ঔ + অ = অয়/আয়/অব/আব
  **ব্যঞ্জনসন্ধি**
    দিগন্ত, উজ্জ্বল, সঞ্চয়
  **বিসর্গসন্ধি**
    মনোযোগ, নিশ্চয়, দুর্গতি
  **নিপাতনে সিদ্ধ**
    গবাক্ষ, পরস্পর, বৃহস্পতি
    ষোড়শ, মনীষা, আশ্চর্য
```

### Exam trap

- পরীক্ষা = পরি + ঈক্ষা, **পরী + ক্ষা নয়** (অর্থপূর্ণ মূল ধরে ভাঙো)।
- স্বাগত = **সু** + আগত, স্ব + আগত নয়।
- গবাক্ষ নিয়মে মেলে না — নিপাতনে সিদ্ধ, মুখস্থ রাখো।
- শুদ্ধ বানান **নীরস**, "নিরস" নয়।

### Recall check

সন্ধি বিচ্ছেদ করো (মুখে নয়, কাগজে):

1. বিদ্যালয় 2. মহেশ 3. ইত্যাদি 4. অন্বেষণ 5. নায়ক 6. দুর্গতি 7. সঞ্চয় 8. ষোড়শ 9. জনৈক 10. নীরস

#### Solution

1. বিদ্যা + আলয় (আ + আ = আ)
2. মহা + ঈশ (আ + ঈ = এ)
3. ইতি + আদি (ই + আ = য-ফলা)
4. অনু + এষণ (উ + এ = ব-ফলা)
5. নৈ + অক (ঐ + অ = আয়)
6. দুঃ + গতি (উঃ → র্)
7. সম্ + চয় (ম্ → ঞ্)
8. ষট্ + দশ (নিপাতনে সিদ্ধ)
9. জন + এক (অ + এ = ঐ)
10. নিঃ + রস (ঃ লোপ, ই দীর্ঘ)

---

## E1 · Parts of speech

### Picture it

A word is an **actor**, and its part of speech is the **role** it plays in this scene. The same actor ("fast") can play the hero in one film and the villain in another: "a **fast** car" (adjective), "run **fast**" (adverb), "they **fast** in Ramadan" (verb). You can't tell the role from the actor's face; you have to watch the scene, which means reading the whole sentence.

### Understand it step by step

1. **Ask one question: what job does this word do here?** Does it name something, replace a noun, show an action, describe a noun, describe a verb, link a noun, join two clauses, or show a feeling? The answer is the part of speech.
2. **Look right after the word to separate preposition, conjunction and adverb.**
   - A noun or pronoun follows → **preposition**: "Wait **till** evening."
   - A clause (subject + verb) follows → **conjunction**: "Wait **till** I come."
   - Nothing follows it → **adverb**: "I have seen him **before**."
3. **Find the word being described.** If it describes a noun → adjective ("a **hard** task"). If it describes a verb → adverb ("works **hard**").
4. **The "it" test for -ing words.** Replace the -ing word (with its object) by "it". If the sentence still works, the word is a **gerund** (a noun): "Swimming is good" → "It is good". If the -ing word sits next to a noun and describes it, it is a **participle** (an adjective): "a **sleeping** child".
5. **The "a \_\_\_ person" test for -ly words.** If the word fits "a \_\_\_ person" (a friendly person, a lovely person), it is an adjective. Most -ly words made from nouns (friend + ly, love + ly) are adjectives; the adverb form needs a phrase: "in a friendly way".
6. **this / that / these / those.** Alone, they replace a noun → pronoun ("**That** is mine"). Before a noun, they describe it → adjective ("**That** book is mine").
7. **Interjection.** It stands apart from the sentence's grammar and shows a sudden feeling, usually with "!": "**Alas!**", "**Hurrah!**".

### Remember it · core points

- **A word's part of speech is its job in this sentence**, not its dictionary label.
- **The eight jobs:** noun (names), pronoun (replaces a noun), verb (action/state), adjective (describes a noun), adverb (describes a verb, adjective or adverb), preposition (links a noun to the sentence), conjunction (joins clauses), interjection (sudden feeling).
- **Preposition vs conjunction:** a noun or pronoun after it → preposition; a full clause (subject + verb) after it → conjunction. "since Monday" vs "since he was tired".
- **Adjective vs adverb:** describes a noun → adjective ("a fast car"); describes a verb → adverb ("runs fast").
- **"-ing" words:** used as a noun → gerund ("Swimming is good"); used to describe a noun → participle ("a sleeping child").
- **"-ly" adjectives:** friendly, lovely, lonely, costly, silly, ugly, likely.
- **Many-role words:** fast, but, since, that, round, well. "All **but** John" → preposition; "I am **well**" → adjective.

### Mindmap

```mindmap
E1 · Parts of speech
  **Rule**
    job, not dictionary
  **Prep vs conj**
    + noun → preposition
    + clause → conjunction
  **Adj vs adv**
    noun → adjective
    verb → adverb
  **-ing**
    noun job → gerund
    describes → participle
  **-ly adjectives**
    friendly, lovely, costly
```

### Exam trap

- "friendly" is an adjective, even with "-ly".
- Not every "-ing" word is a verb: "Walking is healthy" → noun (gerund).
- "He is well" (health) → adjective, not adverb.

### Recall check

Name the part of speech of the word in bold.

1. He works **hard**. / It is a **hard** task.
2. Wait here **till** I come. / Wait **till** evening.
3. **Reading** novels is my hobby.
4. Look at the **flying** bird.
5. She is a **lovely** singer.
6. I have never seen him **before**.

#### Solution

1. Adverb (describes "works") / adjective (describes "task").
2. Conjunction (a clause follows: I come) / preposition (a noun follows: evening).
3. Noun (gerund, the subject).
4. Adjective (participle describing "bird").
5. Adjective ("-ly", but it describes "singer").
6. Adverb (no noun after it; it describes "seen").
