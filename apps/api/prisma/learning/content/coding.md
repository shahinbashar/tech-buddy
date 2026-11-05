# Coding Practice

18 LeetCode Easy problems, 2 exam-only problems and 6 SQL problems, each tied to a real past question. Solve every one on paper first; the goal is a program that runs the first time you type it.

## The paper-first rule

Do these five steps for every problem. The point is not LeetCode's green tick; it is writing correct C without a compiler, as in the exam hall.

1. **Read and plan (3 min).** Say what goes in and what comes out. Pick the pattern from the master mindmap below.
2. **Write on paper (15 min timer).** Full C code, neat, with a one-line comment on the idea and the time complexity.
3. **Dry run on paper.** Trace a small input in a table (i, j, sum…). Check the first and the last loop turn.
4. **Type it exactly as written and submit.** No fixing while typing.
5. **Count the fixes** you needed to get it accepted and log the number below. That number is your paper accuracy; it should fall every week.

Open the hidden **Solution** only after step 5, or after 25 minutes of honest effort.

**LeetCode's C templates** use `malloc`, `returnSize` and `returnColumnSizes` for anything that returns an array. The exam never asks for these. On paper, write the plain exam version (read with `scanf`, print with `printf`); the solutions here show the LeetCode version so you can submit it.

## Master mindmap: attacking any exam program

```mindmap
Any exam program
  1 · Read
    What goes in? What comes out?
    Print it or return it?
    Underline n, the range, the size
  2 · Spot the pattern
    One loop → sum, count, max, min
    Nested loops → triangle, matrix, pairs
    Two pointers → reverse, palindrome
    Stack → brackets, undo, reverse order
    Recursion → Fibonacci, trace the output
  3 · Edge cases
    n = 0, 1 or negative
    Empty array or one element
    Big values → long long
  4 · Dry run
    Small input in a table
    First and last loop turn
  5 · Write neat
    #include, main, scanf, printf
    One-line comment on the idea
    State Time O( ) and Space O( )
```

## Schedule

Three problems a week, inside time you already have: the 15-minute evening C drill (paper only) and the Friday past-paper block (full paper-first rule).

| Week | Dates        | Problems                                                           | Pattern                     |
| ---- | ------------ | ------------------------------------------------------------------ | --------------------------- |
| 2    | 11–17 Oct    | LC 509, LC 204, LC 412                                             | Number loops                |
| 3    | 18–24 Oct    | LC 70, LC 1480, LC 136                                             | Number loops, arrays        |
| 4    | 25–31 Oct    | LC 1, LC 704, LC 344                                               | Arrays, strings             |
| 5    | 1–7 Nov      | LC 9, LC 118, LC 867                                               | Strings, patterns, matrices |
| 6    | 8–14 Nov     | LC 1572, LC 20, LC 232                                             | Matrices, stack and queue   |
| 7    | 15–21 Nov    | LC 206, LC 21, LC 1046                                             | Linked list, heap           |
| 8    | 22–28 Nov    | Exam: ICB letter shift, Floyd's binary triangle; redo your 2 worst | Exam-only, repair           |
| 9    | 29 Nov–5 Dec | SQL 175, 176, 181, 182, 183, 596                                   | SQL                         |

## Paper accuracy log

Tell Claude your result after each attempt ("LC 204, 18 min, 2 fixes") and it goes here.

| Date | Problem         | Minutes on paper | Fixes to pass | What went wrong |
| ---- | --------------- | ---------------- | ------------- | --------------- |
| —    | No attempts yet | —                | —             | —               |

## 1. Number loops

**Asked in exams:** primes 1..n (Combined AP Feb 2024, Combined SO May 2024), Fibonacci (BB AP 2016, Rupali 2023), F(5) by recursion (Sonali & Janata 2023), numbers divisible by 3 (Sonali & Janata 2024).

```mindmap
Number loops
  Primes
    Trial division: test 2 … √n
    Sieve: cross out multiples of each prime
    1 is not prime
  Fibonacci
    Keep two variables a, b
    Next = a + b, then slide
    Recursive = O(2ⁿ), loop = O(n)
  Divisibility
    % gives the remainder
    Check 15 before 3 and 5
  Climbing stairs
    Same as Fibonacci in disguise
    ways(n) = ways(n-1) + ways(n-2)
```

### LC 509 · Fibonacci Number

**Task:** return the n-th Fibonacci number, where F(0) = 0 and F(1) = 1. · [Open on LeetCode](https://leetcode.com/problems/fibonacci-number/) · Easy

**Exam link:** Fibonacci series (BB AP 2016), recursive F(5) output (Sonali & Janata 2023).

**Think first:**

- Each term needs only the two before it, so keep two variables, not an array.
- Write the recursive version too, and say why it is slow: it recomputes the same values.

**Paper check:** n = 0 and n = 1 must return directly. **Complexity:** O(n) time, O(1) space.

#### Solution

```c
int fib(int n) {
    if (n < 2) return n;          /* F(0)=0, F(1)=1 */
    int a = 0, b = 1, t;
    for (int i = 2; i <= n; i++) {
        t = a + b;                /* next term */
        a = b;
        b = t;
    }
    return b;
}
/* Recursive: return n < 2 ? n : fib(n-1) + fib(n-2);  O(2^n) */
```

### LC 204 · Count Primes

**Task:** count the prime numbers that are strictly less than n. · [Open on LeetCode](https://leetcode.com/problems/count-primes/) · Easy

**Exam link:** "Primes from 1 to n" (Combined AP 2024, Combined SO 2024).

**Think first:**

- Trial division up to √n works for the exam, but LeetCode's n is large, so use the **Sieve of Eratosthenes**.
- Start crossing out at i × i; smaller multiples were crossed out already.

**Paper check:** n = 0, 1, 2 → 0 primes. Use `long long` for i × i. **Complexity:** O(n log log n) time, O(n) space.

#### Solution

```c
int countPrimes(int n) {
    if (n < 3) return 0;
    char *composite = calloc(n, 1);       /* 0 = still possibly prime */
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (!composite[i]) {
            count++;
            for (long long j = (long long)i * i; j < n; j += i)
                composite[j] = 1;         /* cross out multiples */
        }
    }
    free(composite);
    return count;
}
```

### LC 412 · Fizz Buzz

**Task:** for 1 to n, give "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for both, else the number. · [Open on LeetCode](https://leetcode.com/problems/fizz-buzz/) · Easy

**Exam link:** "Print the numbers divisible by 3 in an array" (Sonali & Janata 2024).

**Think first:**

- Test the "both" case (15) first, or 15 will print "Fizz".
- On paper, just `printf` inside the loop. LeetCode wants an array of strings.

**Paper check:** order of the if-else chain. **Complexity:** O(n) time.

#### Solution

```c
char** fizzBuzz(int n, int* returnSize) {
    char **ans = malloc(n * sizeof(char*));
    for (int i = 1; i <= n; i++) {
        ans[i - 1] = malloc(9);
        if (i % 15 == 0)     strcpy(ans[i - 1], "FizzBuzz");   /* both first */
        else if (i % 3 == 0) strcpy(ans[i - 1], "Fizz");
        else if (i % 5 == 0) strcpy(ans[i - 1], "Buzz");
        else                 sprintf(ans[i - 1], "%d", i);
    }
    *returnSize = n;
    return ans;
}
```

### LC 70 · Climbing Stairs

**Task:** you climb 1 or 2 steps at a time; count the distinct ways to reach step n. · [Open on LeetCode](https://leetcode.com/problems/climbing-stairs/) · Easy

**Exam link:** recursion and Fibonacci (3× in past papers); a classic first dynamic-programming problem.

**Think first:**

- To reach step n, your last move came from n − 1 or n − 2. So ways(n) = ways(n − 1) + ways(n − 2).
- That is Fibonacci starting from 1, 1.

**Paper check:** n = 1 → 1, n = 2 → 2, n = 3 → 3. **Complexity:** O(n) time, O(1) space.

#### Solution

```c
int climbStairs(int n) {
    int a = 1, b = 1, t;          /* ways(0)=1, ways(1)=1 */
    for (int i = 2; i <= n; i++) {
        t = a + b;
        a = b;
        b = t;
    }
    return b;
}
```

## 2. Arrays and searching

**Asked in exams:** smallest element in an array (Combined AP 2023), series sums like 1 + 2 + 4 + 7 + 11 (Combined AP 2024), time complexity of loops (BB AP 2016), Big-O in almost every program question.

```mindmap
Arrays
  Running total
    sum += a[i] as you go
    Prefix sum: a[i] += a[i-1]
  Find one value
    Linear scan: O(n)
    Binary search: sorted only, O(log n)
    mid = lo + (hi - lo) / 2
  Pairs
    Two loops i, j > i: O(n²)
    Hash map idea: O(n)
  Tricks
    XOR: x ^ x = 0, x ^ 0 = x
    Track min/max in one pass
```

### LC 1480 · Running Sum of 1d Array

**Task:** replace each element with the sum of itself and all elements before it. · [Open on LeetCode](https://leetcode.com/problems/running-sum-of-1d-array/) · Easy

**Exam link:** series sums (1 + 2 + 4 + 7 + …, Combined AP 2024); the "keep a running total" habit.

**Think first:** each new total = previous total + this element. You can do it in place.

**Paper check:** loop starts at i = 1, not 0. **Complexity:** O(n) time, O(1) extra space.

#### Solution

```c
int* runningSum(int* nums, int numsSize, int* returnSize) {
    for (int i = 1; i < numsSize; i++)
        nums[i] += nums[i - 1];       /* add the total so far */
    *returnSize = numsSize;
    return nums;
}
```

### LC 136 · Single Number

**Task:** every number appears twice except one; find that one using O(1) extra space. · [Open on LeetCode](https://leetcode.com/problems/single-number/) · Easy

**Exam link:** one-pass array scans (smallest element, Combined AP 2023) and bitwise operators in output tracing.

**Think first:**

- XOR of a number with itself is 0, and XOR with 0 leaves it unchanged.
- So XOR everything: the pairs cancel and the single number remains.

**Paper check:** start with x = 0. **Complexity:** O(n) time, O(1) space.

#### Solution

```c
int singleNumber(int* nums, int numsSize) {
    int x = 0;
    for (int i = 0; i < numsSize; i++)
        x ^= nums[i];                 /* pairs cancel out */
    return x;
}
```

### LC 1 · Two Sum

**Task:** return the indices of the two numbers that add up to a target. · [Open on LeetCode](https://leetcode.com/problems/two-sum/) · Easy

**Exam link:** nested-loop complexity (BB AP 2016, triple loop → O(n³)); pairs are the two-loop case.

**Think first:**

- Brute force: every pair i, j with j > i. That is O(n²) and fine in C here.
- Say the faster idea in words for the exam: store each value in a hash table and look up target − value, O(n).

**Paper check:** j starts at i + 1, so an element is not paired with itself. **Complexity:** O(n²) time, O(1) space.

#### Solution

```c
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int *r = malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++)
        for (int j = i + 1; j < numsSize; j++)
            if (nums[i] + nums[j] == target) {
                r[0] = i; r[1] = j;
                *returnSize = 2;
                return r;
            }
    *returnSize = 0;
    return r;
}
```

### LC 704 · Binary Search

**Task:** find a target in a sorted array and return its index, or −1. · [Open on LeetCode](https://leetcode.com/problems/binary-search/) · Easy

**Exam link:** binary search complexity (diagnostic miss), searching in DSA week 7.

**Think first:**

- Look at the middle. Too small → search the right half; too big → the left half.
- Each step halves the range, hence O(log n).

**Paper check:** `while (lo <= hi)` with `<=`; mid = lo + (hi − lo) / 2 avoids overflow. **Complexity:** O(log n) time, O(1) space.

#### Solution

```c
int search(int* nums, int numsSize, int target) {
    int lo = 0, hi = numsSize - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;   /* go right */
        else hi = mid - 1;                     /* go left */
    }
    return -1;
}
```

## 3. Strings

**Asked in exams:** change each letter to the next one, keeping case (ICB Securities 2026), and string handling inside output-tracing questions.

```mindmap
Strings
  Walk the string
    for (i = 0; s[i] != '\0'; i++)
    strlen(s) is O(n): don't call it in the loop test
  Two pointers
    i from the left, j from the right
    Swap, then i++ and j--
    Stop when i >= j
  Characters are numbers
    'a' + 1 = 'b'
    Check range: c >= 'a' && c <= 'z'
    Wrap: 'z' → 'a', 'Z' → 'A'
  Number as text
    Last digit: x % 10
    Drop last digit: x / 10
```

### LC 344 · Reverse String

**Task:** reverse a character array in place. · [Open on LeetCode](https://leetcode.com/problems/reverse-string/) · Easy

**Exam link:** two-pointer string handling (ICB 2026 Q1 uses the same character walk).

**Think first:** swap the first and last, then move both pointers inward.

**Paper check:** `while (i < j)`, not `<=`. **Complexity:** O(n) time, O(1) space.

#### Solution

```c
void reverseString(char* s, int sSize) {
    int i = 0, j = sSize - 1;
    while (i < j) {
        char t = s[i]; s[i] = s[j]; s[j] = t;   /* swap ends */
        i++; j--;
    }
}
```

### LC 9 · Palindrome Number

**Task:** decide whether an integer reads the same backwards. · [Open on LeetCode](https://leetcode.com/problems/palindrome-number/) · Easy

**Exam link:** digit loops with % and / (common in output tracing).

**Think first:**

- Build the reversed number digit by digit: rev = rev × 10 + x % 10.
- Negative numbers are never palindromes (the minus sign).

**Paper check:** use `long long` for rev; keep a copy of the original x. **Complexity:** O(number of digits).

#### Solution

```c
bool isPalindrome(int x) {
    if (x < 0) return false;
    long long rev = 0;
    int orig = x;
    while (x > 0) {
        rev = rev * 10 + x % 10;   /* append last digit */
        x /= 10;                   /* drop last digit */
    }
    return rev == orig;
}
```

### Exam · ICB letter shift

**Task (ICB Securities AP, 27.06.2026, Q1):** change every letter of a string to the next letter, keep upper or lower case, wrap z to a, and leave other characters unchanged. State the time complexity. No LeetCode version; write and test it yourself.

**Think first:**

- Handle the two wrap cases first: 'z' → 'a' and 'Z' → 'A'.
- Otherwise, if it is a letter, add 1.

**Paper check:** "Az zZ-9b!" → "Ba aA-9c!". **Complexity:** O(n) time, O(1) extra space (in place).

#### Solution

```c
#include <stdio.h>

void shiftLetters(char *s) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == 'z') s[i] = 'a';            /* wrap lower */
        else if (s[i] == 'Z') s[i] = 'A';       /* wrap upper */
        else if ((s[i] >= 'a' && s[i] < 'z') ||
                 (s[i] >= 'A' && s[i] < 'Z'))
            s[i]++;                              /* next letter */
    }
}

int main(void) {
    char s[100];
    scanf("%99[^\n]", s);
    shiftLetters(s);
    printf("%s\n", s);
    return 0;
}
/* Time O(n), Space O(1) */
```

## 4. Patterns and matrices

**Asked in exams:** Floyd's binary triangle (Combined AP 2024), matrix multiply, average and max (Combined SO 2023), row and column sums (Combined SO 2024).

```mindmap
Patterns & matrices
  Triangle patterns
    Outer loop = rows i
    Inner loop j runs 1 … i
    Value from i and j: (i + j + 1) % 2 (Floyd binary)
  Pascal's triangle
    Edges are 1
    Inside = up-left + up
  Matrix walk
    Row-major: for i, then for j
    Transpose: t[j][i] = a[i][j]
    Diagonals: a[i][i] and a[i][n-1-i]
  Multiply A × B
    cols(A) must equal rows(B)
    Three loops: i, j, k
    O(n³)
```

### LC 118 · Pascal's Triangle

**Task:** build the first numRows rows of Pascal's triangle. · [Open on LeetCode](https://leetcode.com/problems/pascals-triangle/) · Easy

**Exam link:** triangle patterns with nested loops (Floyd's binary triangle, Combined AP 2024).

**Think first:**

- Row i has i + 1 numbers; the first and last are 1.
- Each inside number = the two numbers above it: t[i−1][j−1] + t[i−1][j].

**Paper check:** inner loop j runs 1 … i − 1. **Complexity:** O(n²) time and space.

#### Solution

```c
int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    int **t = malloc(numRows * sizeof(int*));
    *returnColumnSizes = malloc(numRows * sizeof(int));
    for (int i = 0; i < numRows; i++) {
        t[i] = malloc((i + 1) * sizeof(int));
        (*returnColumnSizes)[i] = i + 1;
        t[i][0] = t[i][i] = 1;                         /* edges */
        for (int j = 1; j < i; j++)
            t[i][j] = t[i - 1][j - 1] + t[i - 1][j];   /* two above */
    }
    *returnSize = numRows;
    return t;
}
```

### Exam · Floyd's binary triangle

**Task (Combined Bank AP, 09.02.2024, Q2):** print this for n = 5:

```
1
01
101
0101
10101
```

**Think first:** row i, position j. The value is 1 when i + j is even, so print (i + j + 1) % 2. Check: i = 1, j = 1 → 1; i = 2, j = 1 → 0.

**Paper check:** both loops start at 1. **Complexity:** O(n²).

#### Solution

```c
#include <stdio.h>

int main(void) {
    int n, i, j;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= i; j++)
            printf("%d", (i + j + 1) % 2);   /* 1 when i+j is even */
        printf("\n");
    }
    return 0;
}
```

### LC 867 · Transpose Matrix

**Task:** flip a matrix over its main diagonal (rows become columns). · [Open on LeetCode](https://leetcode.com/problems/transpose-matrix/) · Easy

**Exam link:** matrix operations with different dimensions (Combined SO 2023).

**Think first:** an r × c matrix becomes c × r, and t[i][j] = a[j][i].

**Paper check:** the result's size is swapped; don't transpose in place unless it is square. **Complexity:** O(r × c).

#### Solution

```c
int** transpose(int** matrix, int matrixSize, int* matrixColSize,
                int* returnSize, int** returnColumnSizes) {
    int r = matrixSize, c = matrixColSize[0];
    int **t = malloc(c * sizeof(int*));
    *returnColumnSizes = malloc(c * sizeof(int));
    for (int i = 0; i < c; i++) {
        t[i] = malloc(r * sizeof(int));
        (*returnColumnSizes)[i] = r;
        for (int j = 0; j < r; j++)
            t[i][j] = matrix[j][i];      /* rows become columns */
    }
    *returnSize = c;
    return t;
}
```

### LC 1572 · Matrix Diagonal Sum

**Task:** add the numbers on both diagonals of a square matrix, counting the centre only once. · [Open on LeetCode](https://leetcode.com/problems/matrix-diagonal-sum/) · Easy

**Exam link:** row, column and diagonal sums (Combined SO 2024).

**Think first:** primary diagonal a[i][i], secondary a[i][n−1−i]. They meet in the centre when n is odd.

**Paper check:** skip the second add when i == n − 1 − i. **Complexity:** O(n).

#### Solution

```c
int diagonalSum(int** mat, int matSize, int* matColSize) {
    int s = 0, n = matSize;
    for (int i = 0; i < n; i++) {
        s += mat[i][i];                         /* primary */
        if (i != n - 1 - i) s += mat[i][n - 1 - i];  /* secondary, centre once */
    }
    return s;
}
```

## 5. Stack, queue, linked list, heap

**Asked in exams:** stack vs queue and two problems each solves (Combined AP 2024), singly vs doubly linked list (Sonali & Janata 2024), max-heap insert and cost (Combined AP 2023, Sonali & Janata 2024).

```mindmap
Data structures
  Stack (LIFO)
    Array + top index
    Push: st[top++] = x
    Pop: x = st[--top]
    Uses: brackets, undo, recursion
  Queue (FIFO)
    Two stacks: in and out
    Pour in → out only when out is empty
    Uses: printer jobs, BFS
  Linked list
    Three pointers: prev, cur, next
    Dummy head avoids special cases
    Draw boxes and arrows on paper
  Max-heap
    Parent (i-1)/2, children 2i+1, 2i+2
    Insert: add at end, sift up
    Remove max: last to root, sift down
    Each costs O(log n)
```

### LC 20 · Valid Parentheses

**Task:** check that every bracket in a string closes in the right order. · [Open on LeetCode](https://leetcode.com/problems/valid-parentheses/) · Easy

**Exam link:** "Stack vs queue; two problems each solves" (Combined AP 2024). Bracket matching is the textbook stack answer.

**Think first:**

- Push every opening bracket.
- On a closing bracket, the top of the stack must be its partner; pop it.
- At the end the stack must be empty.

**Paper check:** a closing bracket on an empty stack → false; leftovers → false. **Complexity:** O(n) time, O(n) space.

#### Solution

```c
bool isValid(char* s) {
    int n = strlen(s), top = 0;
    char *st = malloc(n + 1);
    for (int i = 0; i < n; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') st[top++] = c;   /* push */
        else {
            if (top == 0) { free(st); return false; }        /* nothing to match */
            char o = st[--top];                               /* pop */
            if ((c == ')' && o != '(') || (c == '}' && o != '{') ||
                (c == ']' && o != '[')) { free(st); return false; }
        }
    }
    free(st);
    return top == 0;                                          /* all closed */
}
```

### LC 232 · Implement Queue using Stacks

**Task:** build a first-in-first-out queue using only two stacks. · [Open on LeetCode](https://leetcode.com/problems/implement-queue-using-stacks/) · Easy

**Exam link:** stack vs queue (Combined AP 2024); shows you understand LIFO and FIFO, not just their names.

**Think first:**

- Push onto the "in" stack.
- To pop, pour "in" into "out" (this reverses the order), but only when "out" is empty.

**Paper check:** pour only when "out" is empty, or the order breaks. **Complexity:** amortized O(1) per operation.

#### Solution

```c
typedef struct { int in[100], out[100]; int inTop, outTop; } MyQueue;

MyQueue* myQueueCreate() {
    MyQueue *q = malloc(sizeof(MyQueue));
    q->inTop = q->outTop = 0;
    return q;
}
static void transfer(MyQueue* q) {          /* pour in → out */
    if (q->outTop == 0)
        while (q->inTop > 0) q->out[q->outTop++] = q->in[--q->inTop];
}
void myQueuePush(MyQueue* q, int x) { q->in[q->inTop++] = x; }
int myQueuePop(MyQueue* q)  { transfer(q); return q->out[--q->outTop]; }
int myQueuePeek(MyQueue* q) { transfer(q); return q->out[q->outTop - 1]; }
bool myQueueEmpty(MyQueue* q) { return q->inTop == 0 && q->outTop == 0; }
void myQueueFree(MyQueue* q) { free(q); }
```

### LC 206 · Reverse Linked List

**Task:** reverse a singly linked list and return the new head. · [Open on LeetCode](https://leetcode.com/problems/reverse-linked-list/) · Easy

**Exam link:** singly vs doubly linked list (Sonali & Janata 2024); pointer handling.

**Think first:**

- Walk the list with three pointers: prev, cur, next.
- Save next, point cur back to prev, then move both forward.

**Paper check:** draw 1 → 2 → 3 as boxes and redraw after each loop turn. **Complexity:** O(n) time, O(1) space.

#### Solution

```c
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode *prev = NULL, *cur = head, *next;
    while (cur) {
        next = cur->next;    /* save */
        cur->next = prev;    /* turn the arrow back */
        prev = cur;          /* step forward */
        cur = next;
    }
    return prev;
}
```

### LC 21 · Merge Two Sorted Lists

**Task:** join two sorted linked lists into one sorted list. · [Open on LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy

**Exam link:** linked lists (Sonali & Janata 2024); the merge step of merge sort.

**Think first:**

- Use a dummy node so you never special-case the first node.
- Take the smaller head each time; when one list ends, attach the rest of the other.

**Paper check:** the final `tail->next = a ? a : b;`. **Complexity:** O(n + m).

#### Solution

```c
struct ListNode* mergeTwoLists(struct ListNode* a, struct ListNode* b) {
    struct ListNode dummy, *tail = &dummy;
    dummy.next = NULL;
    while (a && b) {
        if (a->val <= b->val) { tail->next = a; a = a->next; }
        else                  { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = a ? a : b;     /* attach what is left */
    return dummy.next;
}
```

### LC 1046 · Last Stone Weight

**Task:** repeatedly smash the two heaviest stones; equal stones vanish, otherwise the difference stays. Return the last stone's weight, or 0. · [Open on LeetCode](https://leetcode.com/problems/last-stone-weight/) · Easy

**Exam link:** "Insert into a binary max-heap and state the cost" (Sonali & Janata 2024), max-heap operations (Combined AP 2023).

**Think first:**

- "Take the two largest, again and again" means a max-heap.
- Write sift-up and sift-down yourself; this is exactly the exam's heap question.

**Paper check:** children of i are 2i + 1 and 2i + 2; parent is (i − 1) / 2. **Complexity:** O(n log n).

#### Solution

```c
static void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

static void siftDown(int *h, int n, int i) {
    while (1) {
        int l = 2 * i + 1, r = l + 1, big = i;
        if (l < n && h[l] > h[big]) big = l;
        if (r < n && h[r] > h[big]) big = r;
        if (big == i) return;
        swap(&h[i], &h[big]);
        i = big;
    }
}
static void siftUp(int *h, int i) {
    while (i > 0 && h[(i - 1) / 2] < h[i]) {
        swap(&h[i], &h[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}
static int popMax(int *h, int *n) {
    int top = h[0];
    h[0] = h[--(*n)];          /* last to root */
    siftDown(h, *n, 0);
    return top;
}
static void pushHeap(int *h, int *n, int x) { h[*n] = x; siftUp(h, (*n)++); }

int lastStoneWeight(int* stones, int stonesSize) {
    int n = stonesSize;
    for (int i = n / 2 - 1; i >= 0; i--) siftDown(stones, n, i);   /* build heap */
    while (n > 1) {
        int y = popMax(stones, &n), x = popMax(stones, &n);
        if (y != x) pushHeap(stones, &n, y - x);
    }
    return n ? stones[0] : 0;
}
```

## 6. SQL

**Asked in exams:** second-highest salary (BB AP 2016), JOIN + GROUP BY + HAVING analysis (Sonali & Janata 2023, Rupali 2023), inner/left/right/full join results (Combined SO 2024), courses with enrollment ≤ 30 (ICB 2026). Do these in week 9, on paper first, in MySQL.

```mindmap
SQL
  Order of execution
    FROM → WHERE → GROUP BY
    HAVING → SELECT → ORDER BY
  Joins
    INNER: only matching rows
    LEFT: all of the left + matches
    "Who has none?" → LEFT JOIN … IS NULL
    Self join: same table, two aliases
  Groups
    GROUP BY the thing you count per
    WHERE filters rows, HAVING filters groups
    COUNT(*) > 1 → duplicates
  Nth highest
    MAX where value < MAX
    ORDER BY … DESC LIMIT 1 OFFSET n-1
    DISTINCT for ties
```

### LC 175 · Combine Two Tables

**Task:** list every person's first name, last name, city and state, showing NULL when a person has no address. · [Open on LeetCode](https://leetcode.com/problems/combine-two-tables/) · Easy

**Exam link:** inner vs left join results (Combined SO 2024).

**Think first:** "every person, even without an address" → LEFT JOIN with Person on the left.

**Paper check:** INNER JOIN would drop people without an address.

#### Solution

```sql
SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;
```

### LC 176 · Second Highest Salary

**Task:** return the second-highest distinct salary, or NULL if there is none. · [Open on LeetCode](https://leetcode.com/problems/second-highest-salary/) · Medium

**Exam link:** the same question was asked by Bangladesh Bank (AP 2016). It is marked Medium on LeetCode only because of the NULL case.

**Think first:**

- Exam answer: the highest salary that is less than the maximum.
- Wrapping the query in an outer SELECT returns NULL when there is no second salary.

**Paper check:** duplicates of the top salary must not count; DISTINCT or the MAX-below-MAX form handles that.

#### Solution

```sql
-- Version 1: the exam favourite
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- Version 2: works for any N (change OFFSET to N-1)
SELECT (SELECT DISTINCT salary FROM Employee
        ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;
```

### LC 181 · Employees Earning More Than Their Managers

**Task:** find employees who earn more than their own manager. · [Open on LeetCode](https://leetcode.com/problems/employees-earning-more-than-their-managers/) · Easy

**Exam link:** multi-table joins (Combined AP 2023) and "salary > another value" comparisons (Sonali & Janata 2023).

**Think first:** manager and employee are in the same table, so join the table to itself with two aliases.

**Paper check:** join on e.managerId = m.id, not the other way round.

#### Solution

```sql
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
```

### LC 182 · Duplicate Emails

**Task:** list the emails that appear more than once. · [Open on LeetCode](https://leetcode.com/problems/duplicate-emails/) · Easy

**Exam link:** GROUP BY with HAVING COUNT(\*) (Sonali & Janata 2023, Rupali 2023).

**Think first:** group by email, then keep groups with a count above 1.

**Paper check:** WHERE COUNT(\*) > 1 is an error; aggregates go in HAVING.

#### Solution

```sql
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;
```

### LC 183 · Customers Who Never Order

**Task:** list customers who have never placed an order. · [Open on LeetCode](https://leetcode.com/problems/customers-who-never-order/) · Easy

**Exam link:** left join results (Combined SO 2024, Customers/Orders tables — the same table names).

**Think first:** LEFT JOIN Orders; customers with no order get NULL on the Orders side.

**Paper check:** test the Orders key with IS NULL, not = NULL.

#### Solution

```sql
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;
```

### LC 596 · Classes More Than 5 Students

**Task:** list the classes that have at least five students. · [Open on LeetCode](https://leetcode.com/problems/classes-more-than-5-students/) · Easy

**Exam link:** "courses and number of students where enrollment ≤ 30" (ICB Securities 2026, Q2b) is the same shape with the opposite comparison.

**Think first:** group by class, count students, keep groups with HAVING.

**Paper check:** for the ICB version, also SELECT the count: `SELECT course_id, COUNT(*) AS students … HAVING COUNT(*) <= 30`.

#### Solution

```sql
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(student) >= 5;
```
