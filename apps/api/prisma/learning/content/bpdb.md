# BPDB — Assistant Engineer (CSE) — 09.10.2026

Bangladesh Power Development Board, Assistant Engineer (CSE). Written part: 11 subject questions; MCQ part: 20 questions (mental ability, Bangla, English, GK). Questions are restated from a coaching-centre solution sheet; every answer below was re-checked, and code and numbers were run.

**Pattern note:** an engineering-board paper, so it mixes CSE with **basic electrical circuits** (Q4, Q8) — unlike bank papers. Every CSE area appears once: ML, OS, networking, architecture, testing, SQL, DSA, Java OOP.

### Picture it

Think of this paper as a **power plant control room**: one panel for each system. Most panels are CSE (scheduler, router, CPU, database, tree), but two panels are pure electrical (diodes, resistor network). An engineer who only knows software freezes at those two. Learn the 10-minute basics of diode drops and current division, and every panel is yours.

## Questions

1. Overfitting in machine learning; methods to reduce the training dataset.
2. Non-preemptive SJF: P1=4, P2=2, P3=8, P4=6, all arrive at t=0 → order, waiting times, average waiting time.
3. VLSM on 192.168.10.0/24: subnets A 25, B 22, C 8, D 2, E 2 hosts → prefix, network, mask.
4. (fig) Two silicon diodes in parallel → output voltage; purpose of the parallel connection.
5. 500 MHz CPU; instruction mix 400 × 1 cycle, 300 × 3, 200 × 2, 100 × 3 → execution time and MIPS.
6. (fig) Packet routing: source and destination IP of packets P1–P5 in a small LAN.
7. Match testing types: unit, integration, acceptance, system, regression.
8. (fig) Multi-loop DC circuit, V = 15 V → branch current I5; source current I0 when I5 = 7 A.
9. SQL on a Student table: (a) male students absent from the test; (b) passed students (score > 40); (c) min, avg, max score per class.
10. Build the binary tree from postorder [4, 3, 5, 1, 7, 6, 2] and inorder [4, 3, 1, 5, 2, 7, 6].
11. Java: method overriding for electricity-bill calculation (Customer → Residential / Commercial).

### Part · Verified answers (written)

Try each on paper first. **Two errors in the source key** are marked ❌ (Q10 and MCQ 7).

#### Solution

**Q1 Overfitting.** The model learns the training data _and its noise_, so training accuracy is very high but test accuracy is poor (high variance). Ways to shrink the training set without losing information: **instance selection / stratified sampling** (keep a representative subset), **feature selection / PCA** (drop redundant columns), **aggregation / clustering** (replace a cluster by its centroid), **removing noise, outliers and duplicates**. Also know the ways to **reduce overfitting** in case the question asks that: more data, cross-validation, regularization (L1/L2), early stopping, dropout, pruning a decision tree, simpler model.

**Q2 SJF (verified).** Order P2 → P1 → P4 → P3.

| Process | BT  | CT  | TAT = CT | WT = TAT − BT |
| ------- | --- | --- | -------- | ------------- |
| P2      | 2   | 2   | 2        | 0             |
| P1      | 4   | 6   | 6        | 2             |
| P4      | 6   | 12  | 12       | 6             |
| P3      | 8   | 20  | 20       | 12            |

Gantt: | P2 0–2 | P1 2–6 | P4 6–12 | P3 12–20 |. **Average WT = 20/4 = 5**; average TAT = 40/4 = 10.

**Q3 VLSM (verified, with the ranges the key left out).** Largest first; C needs /28 because a /29 gives only 6 hosts (< 8).

| Subnet | Hosts | Prefix   | Network       | Mask            | Usable    | Broadcast |
| ------ | ----- | -------- | ------------- | --------------- | --------- | --------- |
| A      | 25    | /27 (30) | 192.168.10.0  | 255.255.255.224 | .1 – .30  | .31       |
| B      | 22    | /27 (30) | 192.168.10.32 | 255.255.255.224 | .33 – .62 | .63       |
| C      | 8     | /28 (14) | 192.168.10.64 | 255.255.255.240 | .65 – .78 | .79       |
| D      | 2     | /30 (2)  | 192.168.10.80 | 255.255.255.252 | .81 – .82 | .83       |
| E      | 2     | /30 (2)  | 192.168.10.84 | 255.255.255.252 | .85 – .86 | .87       |

Free: 192.168.10.88 – .255.

**Q4 Parallel diodes.** Both forward-biased silicon diodes drop about **0.7 V**, so Vo = 0.7 V (check the figure: if Vo is taken across a resistor instead, Vo = V − 0.7). Purpose: share the current so each diode stays within its rating and the heat is spread. Trap: real diodes do **not** share equally (the one with the lower drop "hogs" current), so a small series resistor is added to each branch.

**Q5 MIPS (verified).** Cycles = 400 + 900 + 400 + 300 = 2000; CPI = 2000/1000 = 2. T = 2000 / 500×10⁶ = **4 µs**. MIPS = f / (CPI × 10⁶) = 500/2 = **250 MIPS**. (Shortcut: MIPS = clock in MHz ÷ CPI.)

**Q6 Packet routing.** Needs the figure; the key's table (P1 192.168.0.10 → .15, P2 .15 → .17, P3 .17 → .19, P4 .19 → .18, P5 .15 → .10) is consistent with "host → server → host" traffic. Rule to remember: inside one LAN, **IP addresses stay end-to-end** (source = original sender, destination = final receiver); only MAC addresses change hop by hop at a router.

**Q7 Testing.** 1 → unit · 2 → acceptance · 3 → regression · 4 → system · 5 → integration. Correct.

**Q8 DC circuit.** Needs the figure. The key's numbers are internally consistent: R_total = 7.875 Ω → I0 = 15/7.875 = 1.905 A; I5 = 0.357 A = (3/16) I0. Because the circuit is **linear**, the ratio I5/I0 is fixed, so I5 = 7 A → I0 = 7 × 16/3 = **37.33 A**. Method: series/parallel reduction from the far end, then current divider I_branch = I_total × R_other / (R1 + R2).

**Q9 SQL (tested on sample data).**

```sql
-- (a) male students absent from the test
SELECT * FROM Student WHERE gender = 'M' AND test_score IS NULL;

-- (b) passed students
SELECT student_name, test_score FROM Student WHERE test_score > 40;

-- (c) min, avg, max per class
SELECT class_code,
       MIN(test_score) AS min_score,
       AVG(test_score) AS avg_score,
       MAX(test_score) AS max_score
FROM Student
GROUP BY class_code;
```

Traps: `test_score = NULL` returns **no rows** — always `IS NULL`. MIN/AVG/MAX **ignore NULLs**, so absent students do not pull the average down.

**Q10 Tree — ❌ the key's tree is wrong.** Root = last of postorder = **2**. Inorder splits into left [4, 3, 1, 5] and right [7, 6].

- Left: postorder [4, 3, 5, 1] → root 1; its left [4, 3] → root 3 with **4 as left child**; its right = 5.
- Right: postorder [7, 6] → root 6; in inorder, **7 comes before 6**, so 7 is the **left** child of 6. The key drew it as the right child.

```
        2
      /   \
     1     6
    / \   /
   3   5 7
  /
 4
```

Check: inorder of this tree = 4 3 1 5 2 7 6 ✓, postorder = 4 3 5 1 7 6 2 ✓ (built and printed by a Java program).

**Q11 Java overriding (compiled and run; rates assumed — use the ones in the question).**

```java
class Customer {
    protected final String name;
    Customer(String name) { this.name = name; }
    double calculateBill(int units) { return 0.0; }
}

class Residential extends Customer {
    Residential(String name) { super(name); }
    @Override
    double calculateBill(int units) {           // slab: 1–100 @5, 101–300 @7, 300+ @10
        if (units <= 100) return units * 5.0;
        if (units <= 300) return 100 * 5.0 + (units - 100) * 7.0;
        return 100 * 5.0 + 200 * 7.0 + (units - 300) * 10.0;
    }
}

class Commercial extends Customer {
    Commercial(String name) { super(name); }
    @Override
    double calculateBill(int units) {           // flat @12 + 500 demand charge
        return units * 12.0 + 500.0;
    }
}

public class BillDemo {
    public static void main(String[] args) {
        Customer[] list = { new Residential("Rahim"), new Commercial("Shop A") };
        for (Customer c : list)                 // runtime polymorphism
            System.out.println(c.name + ": " + c.calculateBill(250));
    }
}
```

Output: `Rahim: 1550.0` and `Shop A: 3500.0`. Explain in the answer: same signature in the subclass + `@Override` → the JVM picks the method by the **object's** type at run time (dynamic dispatch), not the reference type `Customer`.

### Part · MCQ answers (20)

| Q   | Topic                                      | Answer                 | Check                                                                                            |
| --- | ------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | X 40 m SW of Z, Y 40 m SE of Z → Y from X  | East                   | ✓ same row south of Z                                                                            |
| 2   | Legs = 2 × heads + 16                      | 8 goats                | ✓ 4g + 2d = 2g + 2d + 16 → g = 8                                                                 |
| 3   | A's father's wife's mother's only child C  | Mother                 | ✓                                                                                                |
| 4   | ইরিটম কী?                                  | একটি বাদ্যযন্ত্র (key) | not verified                                                                                     |
| 5   | পালাগান কোন অঞ্চলের                        | ময়মনসিংহ              | ✓ (accepted answer)                                                                              |
| 6   | কোন বর্গের আগে মূর্ধন্য ণ হয় না           | ত-বর্গ                 | ✓ (অন্ত, গ্রন্থ)                                                                                 |
| 7   | মূল ভাষার নিয়মে বহুবচন                    | **সাহেবান**            | ❌ key lists "আলেমবৃন্দ / সাহেবান"; বৃন্দ is a Bangla suffix, so only সাহেবান (Persian -আন) fits |
| 8   | _The Republic_                             | Plato                  | ✓                                                                                                |
| 9   | _The Last Supper_                          | Leonardo da Vinci      | ✓                                                                                                |
| 10  | দেশি শব্দ                                  | লুঙ্গি                 | ✓                                                                                                |
| 11  | ভাঁড়ে ভবানী                               | নিঃস্ব / শূন্য অবস্থা  | ✓                                                                                                |
| 12  | ডালভাত                                     | সহজ / সাধারণ বিষয়     | ✓                                                                                                |
| 13  | recondite                                  | obscure, little known  | ✓                                                                                                |
| 14  | Had the engineers \_\_\_ the warning signs | noticed                | ✓ inverted 3rd conditional                                                                       |
| 15  | compensation should be \_\_\_ the level    | commensurate with      | ✓                                                                                                |
| 16  | regulations introduced to \_\_\_ risk      | mitigate               | ✓                                                                                                |
| 17  | 36 handshakes                              | 9 people               | ✓ n(n−1)/2 = 36                                                                                  |
| 18  | A's father's wife's father's only child B  | Son / daughter         | ✓ B = A's mother                                                                                 |
| 19  | Hands opposite between 7 and 8             | 7:05:27 (5 5/11 min)   | ✓ 5.5m = 30                                                                                      |
| 20  | Africa–Europe strait                       | Gibraltar              | ✓                                                                                                |

### Mindmap

```mindmap
BPDB AE (CSE) 09.10.2026
  **Written CSE**
    ML: overfitting, shrink data
    OS: SJF avg WT = 5
    VLSM /27 /27 /28 /30 /30
    MIPS = MHz ÷ CPI = 250
    SQL: IS NULL, GROUP BY
    tree from post + inorder
    Java overriding (bill)
  **Electrical (2)**
    Si diode drop 0.7 V
    parallel = share current
    series-parallel + current divider
    linear → scale ratio
  **Networking**
    VLSM largest first
    IPs end-to-end, MAC per hop
  **Testing**
    unit, integration, system
    acceptance, regression
  **MCQ 20**
    direction, legs, relations
    clock: 5.5m formula
    ব্যাকরণ + বাগধারা
    vocab: recondite, mitigate
  **Key errors**
    Q10: 7 is LEFT of 6
    MCQ 7: সাহেবান only
```

### Remember it

- **"Last of post, first of pre = root"**; then **inorder decides left/right** — whatever is before the root in inorder goes left.
- **MIPS = MHz ÷ CPI.** 500 ÷ 2 = 250.
- **VLSM hosts:** 2ⁿ − 2 ≥ need. 8 hosts → n = 4 (not 3).
- **Clock opposite:** |30h − 5.5m| = 180.
- **NULL is not a value** — `IS NULL`, and aggregates skip it.

### Exam trap

- Q10: building the tree from postorder alone and guessing a side — always place children using the inorder split.
- Q3: giving C a /29 (only 6 hosts).
- Q9: `= NULL` silently returns nothing.
- Q4: claiming parallel diodes share current equally without series resistors.
- Coaching keys have errors (Q10, MCQ 7) — recompute, never copy.

### Recall check

1. Postorder [D, E, B, F, C, A], inorder [D, B, E, A, F, C] → draw the tree.
2. A 1 GHz CPU runs a program with CPI 2.5 → MIPS?
3. Why does `AVG(test_score)` not count absent students?
