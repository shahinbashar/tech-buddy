# Bank IT Question Bank (2016–2026)

Source: "Compact IT Written", Previous Year Exam Questions, pp. 802–871. **18 written papers** (P18 added from "COMPACT IT Job Solution", Question Bank 2026). Book answer hints are in _italics_; "(fig)" marks a question that depends on a figure.

## Index

| #   | Exam                             | Post                                      | Date       | Body    |
| --- | -------------------------------- | ----------------------------------------- | ---------- | ------- |
| P1  | Bangladesh Bank                  | Assistant Maintenance Engineer            | 2016       | —       |
| P2  | Bangladesh Bank                  | Assistant Programmer                      | 2016       | —       |
| P3  | Bangladesh Bank                  | Assistant Maintenance Engineer            | 2017       | —       |
| P4  | Bangladesh Bank                  | Assistant Programmer                      | 03.02.2023 | BIBM    |
| P5  | Bangladesh Bank                  | Assistant Maintenance Engineer            | 04.02.2023 | BIBM    |
| P6  | Pubali Bank                      | Hardware Engineer                         | 18.03.2023 | —       |
| P7  | Pubali Bank                      | Software Quality Assurance                | 18.03.2023 | —       |
| P8  | Combined Bank                    | Assistant Programmer                      | 09.06.2023 | —       |
| P9  | Combined Bank                    | Senior Officer (IT)                       | 13.10.2023 | MIST    |
| P10 | Sonali & Janata                  | Officer (IT)                              | 14.10.2023 | MIST    |
| P11 | Rupali Bank                      | Assistant Network Engineer                | 04.11.2023 | MIST    |
| P12 | Combined Bank                    | Asst Maintenance Eng / Asst Hardware Eng  | 23.11.2023 | BIBM    |
| P13 | Combined Bank                    | Assistant Programmer                      | 09.02.2024 | BIBM    |
| P14 | Sonali Bank PLC                  | Assistant Database Administrator          | 23.02.2024 | —       |
| P15 | Combined Bank                    | Asst Maintenance Eng / Asst Engineer (IT) | 24.02.2024 | BIBM    |
| P16 | Combined Bank                    | Senior Officer (IT)                       | 17.05.2024 | BIBM    |
| P17 | Combined (Sonali & Janata)       | Officer IT                                | 04.10.2024 | —       |
| P18 | Combined Bank (Job ID 25104)     | Senior Officer (IT)                       | 25.07.2026 | e-Zone  |
| P19 | ICB Asset Management Company Ltd | Assistant Programmer                      | 01.01.2024 | FBS, DU |

## Analysis — 17 papers

### Topic frequency (approximate number of questions)

| Topic                               | Hits | Most repeated                                                                                                                  |
| ----------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| Networking                          | ~40  | OSI vs TCP/IP (4×), topologies (3×), subnetting/IP calc (4×), TCP vs UDP (3×), DHCP/DNS (4×), firewall/NGFW (4×), devices (3×) |
| Programming (C/C++/Java)            | ~22  | Primes 1..n (**3×**), Fibonacci (3×), series sum (3×), matrix ops (2×), recursion output (3×), array functions                 |
| Security & crypto                   | ~18  | Top 10 cyber attacks (**4×**), symmetric vs asymmetric (2×), web-server/e-banking security (3×), session hijacking, MitM, TLS  |
| OS / architecture / memory          | ~18  | Cache mapping/bits (**2× same 16 KB question**), memory hierarchy (3×), paging/page faults, scheduling, deadlock, pipelining   |
| DBMS / SQL                          | ~16  | JOIN+GROUP BY+HAVING analysis (2×), joins inner/left/right/full, keys & indexing, normalization/ER, backup                     |
| Server / data center / cloud / RAID | ~16  | RAID (**4×**), virtualization (3×), data center for a bank (3×), backup types (3×), cloud (2×)                                 |
| Data structures & algorithms        | ~10  | Heap insert (2×), hashing, adjacency list/matrix (2×), stack/queue, linked list, quicksort, infix→postfix (2×)                 |
| Software engineering & testing      | ~10  | SDLC models (2×), V&V (2×), function point, SQA                                                                                |
| Banking-tech scenarios              | ~10  | Digital banking, payment-gateway audit, OTP/biometric, online-banking ICT apps, 0-bit data loss, BI dashboard                  |
| Digital electronics                 | ~8   | Logic circuit from Boolean (2×), full adder, latch/flip-flop, transistor, DAC                                                  |

### Pattern by exam type

- **Programmer / Officer (IT) / Senior Officer:** programming, DBMS/SQL, DSA, OOP, SE, plus networking and security. Usually 10–15 subject Qs × 10–15 marks, plus essays, translation and GK.
- **Maintenance / Hardware / Network Engineer:** networking, hardware/OS, digital electronics, data center, and more math.
- **Bangladesh Bank:** more numerical and computational Qs (hashing, cache bits, packetization, data rate) plus math.
- **Non-IT part, almost every paper:** a Bangla and an English essay or focus writing (150–200 words), translation both ways, GK (current affairs from the past 1–2 years), sometimes math (percent, interest, ratio, geometry, time-speed).

### High-yield list (prepare these first)

1. Top 10 cyber attacks + ransomware/DDoS/phishing/SQLi/XSS mitigation
2. OSI vs TCP/IP (layers, protocols, devices) + topologies + network devices
3. Subnetting/CIDR calculations (hosts, subnets, mask, binary conversion)
4. Firewall types (packet filter, stateful, proxy, NGFW)
5. RAID levels + backup types (full/incremental/differential) + DR/BCP
6. Virtualization, cloud (IaaS/PaaS/SaaS), data center for a bank
7. SQL: JOIN types, GROUP BY/HAVING, subqueries, second-highest salary
8. C programs: primes, Fibonacci, series sum, matrix ops, recursion tracing + Big-O
9. Cache mapping (tag/index/offset), memory hierarchy, page replacement
10. Symmetric vs asymmetric, digital signature/certificate, TLS
11. Heap insert, hashing with linear probing, infix↔postfix
12. SDLC (Agile/Waterfall/Incremental), V&V, testing types

## P1 — Bangladesh Bank, Asst Maintenance Engineer — 2016

1. System vs application software, 3 examples each
2. Problem with your monitor: which factors to consider when buying a new one
3. OMR vs MICR
4. 1 million characters in ASCII → memory in MB _(1 MB)_
5. Intranet vs extranet
6. URL, VoIP, broadband

## P2 — Bangladesh Bank, Assistant Programmer — 2016

1. Tautology; prove [(A→B)∧A]→B with a truth table
2. Prefix & postfix of ((A+B)\*C−(D−E)^F) _(postfix AB+C\*DE−F^−)_
3. Polymorphism; method overriding vs overloading
4. Domain vs workgroup
5. Structured program: Fibonacci series up to 100 numbers
6. Integrity rules of databases; SQL: second-highest salary from Employee
7. Cardinality and modality
8. Minimum HTML tags for a web page; how to hide comments from the browser
9. Time/space complexity of triple nested loop i,j,k<n, count++ _(O(n³), O(1))_

## P3 — Bangladesh Bank, Asst Maintenance Engineer — 2017

1. Addressing modes of the 8086 microprocessor
2. 172.20.0.0/27 → subnets & hosts per subnet _(2048 subnets, 30 hosts)_
3. Latch vs flip-flop
4. Battery vs capacitor
5. Short notes: DHCP, SMTP
6. Session hijacking; encrypting username/password in PHP (md5)
7. Important steps to secure a web server
8. Main memory 100 ns, cache 50 ns, hit rate 90% → average read time

## P4 — Bangladesh Bank, Assistant Programmer — 03.02.2023 (BIBM)

1. Hash table size 13, h(k)=k mod 13, linear probing: insert 10, 3, 6, 16, 17, 19 _(16→4, 19→7)_
2. Man-in-the-middle attack on Diffie-Hellman (two key pairs)
3. Program: LCM of A and B
4. Adjacency list & adjacency matrix for a complete binary tree on 7 vertices (binary-heap numbering)
5. Java: classes A and B extends A — which methods overload, override or hide superclass methods
6. Confidentiality, integrity, availability vs falsification, interception, masquerade, DoS
7. Class diagram: token-ring LAN (nodes, workstations, servers, printers, packets)
8. SQL: Movies(mid,title,year), People(pid,name), Genres(gid,genre), HasRole(pid,mid,role), HasGenre(gid,mid) → number of romantic comedies
9. End-to-end encryption: which OSI layer (dev time, maintainability, cost)? _(application vs transport, trade-offs)_
10. Focus writing: Growing use of technology in the financial service industry
11. English→Bangla translation (global economic turbulence, banking); 12. Bangla→English
12. Math: x + 1/x = 17/4 → x − 1/x
13. Math: won 15, lost 9; these are 16⅔% of season — how many more wins to reach 75%
14. Math: students in rows (extra/less per row) → class size
15. Math (fig): PQT right triangle → area of square QRST

## P5 — Bangladesh Bank, Asst Maintenance Engineer — 04.02.2023 (BIBM)

1. 16 KB direct-mapped cache, 4-word blocks, 32-bit address → tag/index/offset _(18/10/4)_
2. Parity method for error detection; bit strings of "Delta" in ASCII
3. Digitized TV 480×500 pixels, 32 intensity levels, 30 pictures/s → source rate R (bps)
4. Packetization delay: P=1500 B, H=5 B, 128 kbps voice _(≈0.0935 s)_
5. IaaS, PaaS, SaaS
6. Virtual machine with a diagram; benefits of VMs
7. Challenges in optimizing energy efficiency of data centers
8. Bank uses 2 payment-gateway providers; auditor Mr. X — risk & threat scenarios he'll face
9. CMMI Level 3: verification & validation — definition and how to fulfil them in testing
10. Transistor cut-off, saturation, active regions; n-channel JFET working with V_GS, V_DS
11. Math: father divides property; A at 8% compound, B at 10% simple, 2 yrs, B gets Tk 1336 more → A's share of Tk 25000
12. Math (fig): AD is the longest side of △ABD → length of longest side of △ABC
13. Math: 4(√6+√2)/(√6−√2) − (2+√3)/(2−√3)
14. Math: profit at Tk 1920 = loss at Tk 1280 → price for 25% profit

## P6 — Pubali Bank, Hardware Engineer — 18.03.2023

1. IP address; why it is necessary
2. Purpose of RAID
3. How DHCP works
4. Booting process in Windows
5. SAS vs SATA — which is better for a server
6. How virtualization helps a physical server
7. Linux ownership & group permissions — `chown`, `chmod`

## P7 — Pubali Bank, Software Quality Assurance — 18.03.2023

1. Test plan and test case
2. Verification vs validation
3. White-box vs black-box testing
4. Defect report; test harness
5. Phases of STLC

## P8 — Combined Bank, Assistant Programmer — 09.06.2023

1. Function point: inputs 50, outputs 40, inquiries 35, files 6, external interfaces 4, average CAF _(FP ≈ 671.96)_
2. Page faults: reference string 1,3,0,3,5,6,3 with 3 frames _(6)_
3. CRC: data 11100, divisor 1001
4. Function: smallest element in an array
5. Attacker steals a TLS website's private key and stays undetected — what can he do?
6. Browser frames A & B from different origins: A may navigate B only if A's display area contains B _(same-origin / clickjacking)_
7. SQL on S(sid,A), T(tid,B), U(uid,C), R(sid,tid,D), Q(tid,uid,E): (A) all (sid, uid) pairs related through R and Q; (B) (A, C) pairs — no DISTINCT
8. Problems solved better with adjacency list vs adjacency matrix
9. Shannon capacity: bandwidth 3000 Hz, SNR 3162 _(≈34,860 bps)_
10. Max-heap operations [a–j] — show the heap
11. Bangla→English (bank, economy); 12. English→Bangla (bank, risk management)
12. Essay: Digital Financial Literacy

## P9 — Combined Bank, Senior Officer (IT) — 13.10.2023 (MIST)

1. CPU registers vs cache vs main memory vs secondary memory
2. 32-bit vs 64-bit microprocessor; meaning of 2.40 GHz; Core i3 vs i5 vs i7; why SSD over HDD
3. OSI vs TCP/IP; relation between data, segment, packet and bit
4. TDM vs FDM vs WDM; how TDM works
5. Topology; Bus vs Ring vs Tree vs Star; purpose of IEEE 802.11
6. Cyber security; top 10 cyber attacks; ransomware and DDoS
7. Cryptography; symmetric vs asymmetric with example; diagram of public-key encryption with a hash for e-commerce
8. Blockchain, how it works, 5 benefits; traditional vs digital banking
9. Platform-independent software with examples
10. Program: matrices A, B of different dimensions → C = A×B, average of A and B, max of C
11. Database vs data warehouse vs data mining, with examples
12. "0-bit data loss" for 24×7×365 online banking — steps and technology
13. BI dashboard for a bank — tools, capturing and aggregating data
14. Project management approaches
15. Software scenario: Business Intelligence model
16. Bangla essay (বিজ্ঞানমনস্কতা — partly legible); 17. ChatGPT pros & cons
17. Bangla→English; 19. English→Bangla (green-economy investment)
18. GK: Physics Nobel 2023; new BRICS members; UNESCO purposes; RTGS; 2023 Asian Games host city

## P10 — Sonali & Janata Bank, Officer (IT) — 14.10.2023 (MIST)

1. Analyze SQL: dept AVG(salary), JOIN, salary > subquery AVG, GROUP BY, HAVING COUNT(\*)>2, ORDER BY DESC
2. Output of recursive F(n)=F(n−2)+F(n−1), F(5) _(5)_
3. Program for 1,2,2,3,3,3,…,100 (100 times) + complexity
4. Agile vs Waterfall — which do you prefer
5. Guided vs unguided media; STP vs UTP; why UTP
6. Switch vs bridge vs router
7. TCP vs UDP; Cat5 vs Cat6; exFAT vs FAT32 vs NTFS
8. Routing types; ad-hoc routing; shortest-path algorithm benefit
9. 10 common cyber attacks; black/white/grey-hat hackers
10. Digital signature vs digital certificate
11. Advantages of OOP over structured programming
12. Firewall types
13. Virtualization benefits; top 5 virtualization platforms
14. Scenario: handling a server problem
15. Bangla essay: শিক্ষাবিস্তারে গণমাধ্যমের ভূমিকা; 16. English: Role of ICT in education
16. Translations (both ways)
17. GK: Independence Award 2023; teams in CWC 2023; number of SDGs; Global Climate Fund

## P11 — Rupali Bank, Asst Network Engineer — 04.11.2023 (MIST)

- Bangla focus writing (15): "সমৃদ্ধির অগ্রযাত্রায় বাংলাদেশ" (partly legible); English essay (15): Women's Empowerment & Gender Equality in Bangladesh
- GK 5×2: first ODI 1971; longest/shortest day; largest planet; author of _Ekatturer Diary_ / _Ekatturer Dinguli_; Meril-Prothom Alo Lifetime Award 2022
- Subject Q8–23 (16×10 = 160): 8. Topologies; how bus works 9. Broadband vs baseband; attenuation; twisted pair vs coax vs fiber 10. OSI vs TCP/IP; MAC-layer functions 11. LAN with security; 5 firewall types; traditional vs NGFW 12. Public vs private IP; TLS 1.2 vs 1.3 13. Symmetric vs asymmetric; ciphers; cryptographic strength 14. Collision vs broadcast domain; DNS, DHCP 15. Packet vs circuit switching 16. Subnet mask; 172.16.0.0/19 _(8 subnets, 8190 hosts)_; OSPF 17. Server hardware components 18. 192.168.101.5 to binary + IP class table 19. Backup vs recovery 20. Server maintenance best practices 21. Factors affecting CPU speed 22. C++ Fibonacci output + complexity 23. Same SQL as P10 Q1

## P12 — Combined Bank, Asst Maintenance / Hardware Engineer — 23.11.2023 (BIBM)

1. Physical vs virtual memory
2. Types of multiplexing
3. Digital vs traditional banking; financial inclusion
4. RAID — why important in a data center
5. Characteristics of digital ICs
6. Encryption/decryption; top 10 cyber attacks
7. Data-center factors for a bank
8. Memory organization; SRAM vs DRAM
9. Math: plane speed _(750 km/h)_; notebook price _(Rs 10)_; plot area _(684 m²)_
10. Translations; focus writing: Metro Rail / Equal Opportunity

## P13 — Combined Bank, Assistant Programmer — 09.02.2024 (BIBM)

Departmental 10×15 = 150, non-departmental 50.

1. Program: primes from 1 to n
2. Program: Floyd's binary triangle (1 / 01 / 101 / 0101 / 10101), n=5
3. C program: sum of 1+2+4+7+11+…+N
4. Polymorphism types with example
5. Multithreading; why use it
6. Types of relations in a DBMS
7. Stack vs queue; 2 problems each solves
8. Recursion output: `fun(5)` with `printf x--`, `fun(--x)`, `printf x`
9. A real-life software project you built; problems faced and how you solved them
10. Database queries: GROUP BY; average salary
11. Short composition: Role of computers in the education system of Bangladesh
12. Letter to your younger brother about professional/vocational training
13. Math: interest; sets (72%, 40%, both 30%); gold purity; geometry
14. Translations (both ways)

## P14 — Sonali Bank PLC, Asst Database Administrator — 23.02.2024

- A: Bangla essay (about improving administration — partly legible); B: Roadside tree plantation in reducing noise pollution; C/D: Translations
- E (GK): GI; green economy vs blue economy; Westminster government; ECG vs echocardiogram; ECNEC
- F (Departmental, Q10–25, 150): 10. Justify: "Invention of the transistor changed the world" 11. Securing client-app ↔ DB-server communication 12. Truth table of a 2-bit full adder with carry 13. Boolean logic circuit, Q for (0,0,1) 14. Normalization; ER diagram 15. Why move from classful to classless IP 16. Program: eˣ = 1 + x/1! + x²/2! + … 17. MS Access vs MS FoxPro in SQL 18. What to check before buying servers 19. Incremental vs differential backup — which suits banking 20. Best RAID level and why 21. RAID in databases 22. Client + DB login page program 23. SQL interest-rate program 24. Database data-loss case study 25. Database case study _(ACID)_

## P15 — Combined Bank, Asst Maintenance Eng / Asst Engineer (IT) — 24.02.2024 (BIBM)

- A Subject (150):
  1. Multiprocessor vs multicomputer; shared memory; cache-coherence schemes; 4-stage pipeline
  2. CSMA/CD vs CSMA/CA; optical vs satellite communication; parity, CRC, checksum
  3. TCP/IP layers — functions, protocols, devices, software; firewall types; NGFW vs traditional
  4. Socket, kernel, process, program, multiprogramming, context switching; preemptive priority scheduling; LRU, NRU
  5. ICT's transformative power — 10 innovative online-banking applications
  6. Data-center generator type (DC generator — cost, energy, budget)
  7. OTP vs biometric policy — strategy to secure online banking
  8. Logic circuit for Q = (A′B)′ + BC(B + C′)…, Q at (1,0,1)
  9. Moving a bank's data center to the cloud — strategy and plan
  10. Tools to secure an e-banking web server
  11. Policy vs guideline vs procedure; why auditors look at controls as a system; 4 risk types
- B Math (5×4): milk:water jars 1:2, 2:3, 3:4; rectangle with EBFD = ½ area → AD (fig); age-group problem; boat (15 km up + 22 km down in 5 h → stream speed)
- C: Translations; focus writing: Impacts of air pollution on human health (150 words)

## P16 — Combined Bank, Senior Officer (IT) — 17.05.2024 (BIBM)

- A: Bangla focus writing (heatwave / environment protection, 150 words); B: English essay — Modern Technology and Its Effect on Student Academic Achievements; C/D: Translations (solar power; Earth Day / green finance)
- E (GK 5×2): Padma Shri, BD singer _(Rezwana Choudhury Bannya)_; BIMSTEC; International Mother's Day; T20 WC 2024 host _(WI & USA)_; first Governor of BB _(A.N. Hamidullah)_
- F (Subject Q10–24, 10×15 = 150): 10. Microprocessor vs microcontroller; RISC vs CISC 11. Office with 3 depts × 50–70 Windows users, roaming logins: Active Directory? Benefits of subnets 12. Repeater, hub, bridge, switch, router 13. Transmission media — advantages and disadvantages 14. SaaS & multi-tenant architecture; multi-vendor e-commerce: one DB or per-vendor DB 15. SQA; what an SQA lead checks when buying software 16. Program: row & column sums of an m×n matrix 17. Program: primes between 1 and n 18. Microfinance app in your own data center — cyber threats and mitigation 19. Customers/Orders tables → inner, left, right, full join results 20. IT disaster recovery & BCP for your data center 21. Primary key, foreign key, index; does indexing always speed things up? 22. Data-transfer modes; TCP vs UDP 23. Lead a team to ship fast: Waterfall or Incremental? 24. ML: supervised vs unsupervised vs reinforcement

## P17 — Combined (Sonali & Janata), Officer IT — 04.10.2024

10×15 = 150.

1. 12-bit DAC, 0–3.3 V → resolution _(≈0.806 mV)_
2. Sets: X∪Y={1,2,3,5,6,8,9,10}, X∩Y={1,5}, Y−X={2,6,9,10} → X, Y _(X={1,3,5,8})_
3. Infix P=12/(7−3)+2 → postfix and evaluate _(12 7 3 − / 2 +, = 5)_
4. Advantages of encapsulation and inheritance
5. Two dice, P(sum=7) _(1/6)_
6. Total bits for a direct-mapped cache: 16 KB data, 4-word blocks, 32-bit address
7. Deadlock conditions; can a single process deadlock?
8. Use-case diagram: online shopping
9. C++ Circle class: translate, perimeter, area; data flow of translate
10. Flow control vs congestion control; end-to-end latency
11. Singly vs doubly linked list
12. Insert into a binary max-heap + cost
13. Quicksort worst-case time/space _(O(n²), O(n))_
14. Function: print numbers divisible by 3 in an array
15. SQL "Pet Society": total adoptions on 30-06-2024 per animal type

**B — GK & language (1×10):** Org born of the Language Movement _(Bangla Academy)_ · UNDP HQ _(New York)_ · International Day for Universal Access to Information _(28 Sep)_ · First ultra-supercritical coal plant on the grid _(2020, Payra)_ · First BD film at the Oscars _(Matir Moina)_ · ICAN · Allen Ginsberg's 1971 poem _(September on Jessore Road)_ · Blue Economy priority sectors _(26)_ · Hardest substance _(diamond)_ · Smart Bangladesh year _(2041)_

**Writing:** 17. English→Bangla (capacity development in banking); 18. Bangla→English; 19. Bangla focus writing: কৃত্রিম বুদ্ধিমত্তা ও ভবিষ্যতের শ্রমবাজার; 20. English: Technology and Banking Sector of Bangladesh

## P18 — Combined Bank (Job ID 25104), Senior Officer (IT) — 25.07.2026 (e-Zone)

6 questions, answer all. Q1–5 = 10 marks each (50), Q6 = 15 subject questions × 10 (150). **Pattern note:** shorter, more definition- and numerical-style subject questions than the 2023–24 papers; every IT area appears once.

**Writing & GK (50):**

1. Bangla focus writing: 4th Industrial Revolution's impact on Bangladesh's banking sector — digital transformation, modern technology, customer service, tech challenges
2. English focus writing: Digital literacy in expanding cashless transactions in Bangladesh — financial inclusion, digital payment adoption, challenges
3. Bangla→English: a passage on the value of time and hard work (proverb "a stitch in time saves nine")
4. English→Bangla: a passage on someone pulling out of an agreement at the last minute (idioms: _at the eleventh hour, at stake, from scratch, take at their word_)
5. GK (5×2): NPSB full form _(National Payment Switch Bangladesh)_ · architect of the National Martyrs' Memorial, Savar _(Syed Mainul Hossain)_ · UK central bank _(Bank of England)_ · publisher of _World Economic Outlook_ _(IMF)_ · Bangladesh's first submarine cable _(SEA-ME-WE 4)_

**Q6 — Subject (15×10 = 150):**

1. Why multi-stage pipelining over single-cycle design — _Architecture_
2. Operational difference between hashing and encryption — _Security_
3. Compulsory (cold) miss vs capacity miss — _Cache_
4. SQL: `Employee(EmpID, Name, Department, Salary)` → department, employee count, average salary — _SQL_
5. Unit testing vs integration testing — _SE/testing_
6. Why a circular queue over a linear queue in an OS; one example — _DSA/OS_
7. HTTP status codes 200, 403, 503 — exact phrase — _Web_
8. K-map: F(A,B,C,D) = Σm(0,3,5,7,8,10,11,12,13,14,15) → minimal SOP — _Digital logic_
9. FDM: 5 channels × 100 kHz, 10 kHz guard band → minimum link bandwidth _(540 kHz)_ — _Data comm_
10. VLSM: 14.24.74.0/24 → Subnet A 120, Subnet B 60 → network (CIDR) and broadcast — _Subnetting_
11. Startup wants to deploy only code: IaaS, PaaS or SaaS? Two platforms _(PaaS)_ — _Cloud_
12. Define tree, leaf, internal node, height, with example — _DSA_
13. Java static-variable recursion output: `fun(3)` _(19)_ — _Programming_
14. One million sorted integers: which search? _(binary)_ — _Algorithms_
15. Show `E → E+E | E*E | id` is ambiguous for `id + id * id` — _Theory of computation_

### Picture it

This paper is a **sampler plate**: one spoon from every dish on the syllabus — architecture, security, cache, SQL, testing, DSA, web, logic, data comm, subnetting, cloud, Java, algorithms and even compiler theory. No dish is deep. The paper rewards breadth and quick, exact answers (a status phrase, a bandwidth number, a CIDR block).

### Part · Verified answers (Q6)

Try each question on paper first. Book answers were checked; the K-map answer was corrected and the Java output was compiled and run.

#### Solution

**6.1 Pipelining.** Single-cycle: every instruction takes one long clock set by the slowest instruction (e.g., a load), so fast instructions waste time. Pipelined (IF → ID → EX → MEM → WB): each stage is short, so the clock is faster, and up to 5 instructions overlap — after the fill, about one instruction finishes per cycle. Gains: higher throughput and clock rate, better hardware utilization, base for superscalar/out-of-order/branch prediction. Costs: complex control and **hazards** (structural, data, control) handled by forwarding, stalls and branch prediction. Note: pipelining improves _throughput_, not the latency of one instruction.

**6.2 Hashing vs encryption.**

|           | Hashing                                                          | Encryption                                      |
| --------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| Direction | One-way, cannot be reversed                                      | Two-way, reversible with the key                |
| Key       | No key (HMAC adds one)                                           | Needs a key (symmetric or public/private)       |
| Output    | Fixed length (SHA-256 → 256 bits)                                | Length ≈ input length                           |
| Goal      | **Integrity**, password storage                                  | **Confidentiality**                             |
| Examples  | SHA-256, bcrypt, Argon2                                          | AES, RSA                                        |
| Bank use  | Store PINs/passwords (salted), verify file/transaction integrity | Protect card data, TLS traffic, database fields |

**6.3 Cold vs capacity miss.** Cold: first access to a block; occurs at any cache size; reduced only by larger blocks or prefetching. Capacity: the working set is larger than the whole cache, so blocks are evicted and missed again; reduced by a bigger cache. (Third "C": **conflict** miss — too many blocks map to the same set in a direct-mapped or set-associative cache; fixed by more associativity.)

**6.4 SQL.**

```sql
SELECT Department,
       COUNT(EmpID) AS Total_Employees,
       AVG(Salary)  AS Average_Salary
FROM Employee
GROUP BY Department;
```

**6.5 Unit vs integration testing.** Unit: one function/class in isolation, dependencies mocked, written by developers (JUnit), fast, pinpoints the faulty line. Integration: several modules together, checks interfaces and data flow (API ↔ DB), done after unit testing by developers/QA, slower, finds interface mismatches. Approaches: big-bang, top-down (stubs), bottom-up (drivers).

**6.6 Circular queue.** Linear array queue: after dequeues, front slots are empty but `rear == size−1` reports full (**false overflow**). Circular queue reuses slots: `rear = (rear + 1) % size`. OS example: **round-robin CPU scheduling** ready queue, keyboard/printer buffers. Size 5: insert A–E, delete A, B → linear says full; circular puts F, G in slots 0 and 1.

**6.7 HTTP.** 200 **OK** (success) · 403 **Forbidden** (server understood, refuses — authenticated but not allowed; compare 401 Unauthorized = not authenticated) · 503 **Service Unavailable** (overload or maintenance, temporary).

**6.8 K-map — the book's answer is correct but not minimal.** Book: AB + AD′ + AC + BD + A′CD + B′C′D′ (6 terms). Minimal groups:

- **BD** = 5, 7, 13, 15 (quad)
- **CD** = 3, 7, 11, 15 (quad)
- **AD′** = 8, 10, 12, 14 (quad)
- **B′C′D′** = 0, 8 (pair, corner wrap)

**F = BD + CD + AD′ + B′C′D′** (checked against all 16 rows). AB and AC are redundant: every cell they cover is already covered. Exam tip: after looping, check whether each group covers at least one cell no other group covers; drop it if not.

**6.9 FDM.** 5 × 100 = 500 kHz; guard bands between 5 channels = 4 × 10 = 40 kHz; **540 kHz**.

**6.10 VLSM (largest first).**

| Subnet | Need | Block | Network         | Broadcast    | Usable    |
| ------ | ---- | ----- | --------------- | ------------ | --------- |
| A      | 120  | 128   | 14.24.74.0/25   | 14.24.74.127 | .1–.126   |
| B      | 60   | 64    | 14.24.74.128/26 | 14.24.74.191 | .129–.190 |

Free: 14.24.74.192/26.

**6.11 Cloud.** **PaaS** — the provider runs hardware, OS, middleware and runtime; the startup only pushes code. Examples: Google App Engine, Heroku (also AWS Elastic Beanstalk, Azure App Service). IaaS would leave OS/runtime to them; SaaS is a finished app (Gmail), not a place to deploy code.

**6.12 Tree terms** (A → B, C; B → D, E; C → F). Tree: hierarchical, acyclic, one root, each other node has one parent. Leaf: no children (D, E, F). Internal: at least one child (A, B, C — the book excludes the root; many texts count the root as internal if it has children, so say so). Height: edges on the longest root-to-leaf path = **2** (if counted in nodes = 3; state your convention).

**6.13 Java output: 19** (compiled and run). Java evaluates the left operand of `+` first, so `fun(n-1)` finishes before `x` is read. fun(3): x=7 → fun(2): x=9 → fun(1)=1 → fun(2)=1+9=10 → fun(3)=10+**9**=19 (x is already 9, not 7). Trap: answering 17 by using x=7. (In C/C++ the order of operand evaluation is unspecified, so this question is only well-defined in Java.)

**6.14 Binary search.** The array is sorted, so halve the range each step: O(log n). ⌈log₂ 1,000,000⌉ = **20** comparisons worst case vs 1,000,000 for linear search. Space O(1) iterative.

**6.15 Ambiguous grammar.** `id + id * id` has two leftmost derivations / parse trees:

- Tree 1: E → E + E, right E → E _ E ⇒ id + (id _ id)
- Tree 2: E → E _ E, left E → E + E ⇒ (id + id) _ id

Two parse trees for one string ⇒ ambiguous. Fix by encoding precedence: E → E + T | T, T → T \* F | F, F → id.

### Exam trap

- 6.8: a "correct" SOP can still lose marks if the question says _simplified_ — look for quads (CD) before pairs/triples.
- 6.13: the value of a static variable is read _after_ the recursive call returns.
- 6.9: guard bands = channels − 1, not channels.

## P19 — ICB Asset Management Company Ltd, Assistant Programmer — 01.01.2024 (FBS, DU)

_Time: 1 hour. Source: bitBox Recent IT Question Bank pp. 320–324. Written/descriptive section Q7–Q10 visible (Q1–Q6 on earlier pages not in source); Standard Aptitude Test (SAT) Q1–Q2 visible._

### Written / Descriptive (Q7–Q10)

7. Write various types of CPU scheduling algorithms with working principle. Which method has the best performance?
8. Write a program that checks a given number is prime.
9. Write various types of information security against cyber threats.
10. What is a trigger? Explain with example. Why is a trigger needed?

### Standard Aptitude Test (SAT)

SAT-1. The cost of a stock on each day is given in an array. Find the maximum profit you can make by buying and selling on those days. Example: `{100, 180, 260, 310, 40, 535, 695}`. If the array is sorted in decreasing order, can profit be earned?

SAT-2. Given a positive integer N, return the Nth row of Pascal's triangle (a triangular array of binomial coefficients formed by summing adjacent elements of the previous row).

---

**Q7 — CPU Scheduling types:**

| Algorithm                            | Working Principle                                                |
| ------------------------------------ | ---------------------------------------------------------------- |
| First Come First Serve (FCFS)        | Non-preemptive; processes run in arrival order                   |
| Shortest Job First (SJF)             | Non-preemptive or preemptive; picks shortest burst time          |
| Priority Scheduling                  | CPU allocated to highest-priority process                        |
| Round Robin (RR)                     | Each process gets a fixed time quantum; preemptive               |
| Multilevel Queue                     | Ready queue split into multiple queues with different strategies |
| Multilevel Feedback Queue            | Like multilevel queue but processes can move between queues      |
| Shortest Remaining Time First (SRTF) | Preemptive version of SJF; selects least remaining time          |

**Best performance:** SJF gives the **minimum average waiting time** of all non-preemptive algorithms. Example: P1=6ms, P2=8ms, P3=7ms, P4=3ms → SJF order P4→P1→P3→P2. Limitation: requires knowing burst times in advance; may cause starvation.

---

**Q8 — Prime check (C):**

```c
#include <stdio.h>
int main() {
    int num, i, isPrime = 1;
    printf("Enter a number: ");
    scanf("%d", &num);
    if (num <= 1) {
        isPrime = 0;
    } else {
        for (i = 2; i <= num / 2; i++) {
            if (num % i == 0) { isPrime = 0; break; }
        }
    }
    if (isPrime)
        printf("%d is a prime number.\n", num);
    else
        printf("%d is not a prime number.\n", num);
    return 0;
}
```

Output: `17 is a prime number.` / `20 is not a prime number.` Complexity: O(n/2) ≈ O(n). Improvement: loop to √n → O(√n).

---

**Q9 — Types of information security against cyber threats:**

- **Network Security** — Protecting networks from unauthorised access, hacking, and cyber attacks.
- **Application Security** — Securing software and applications from viruses, malware, or bugs.
- **Endpoint Security** — Protecting devices like computers, mobiles, and servers from threats.
- **Data Security** — Safeguarding sensitive data through encryption and backups.
- **Identity and Access Management (IAM)** — Controlling user identities and access permissions.
- **Cloud Security** — Securing data and services stored in the cloud.
- **Operational Security (OPSEC)** — Protecting internal business information, policies, and processes.
- **Disaster Recovery & Business Continuity** — Ensuring quick system recovery in case of attacks or failures.
- **Physical Security** — Protecting hardware and servers from theft or physical damage.

Goal of information security: maintain the **CIA Triad** — Confidentiality, Integrity, and Availability.

---

**Q10 — Database Trigger:**

A trigger is a stored procedure that is automatically executed (fired) when a specified event (INSERT, UPDATE, or DELETE) occurs on a table.

Why needed: maintains data integrity automatically; audits and logs changes; enforces business rules; updates related tables; avoids manual errors.

Example — log every INSERT on `Employees` into `AuditLog`:

```sql
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50)
);

CREATE TABLE AuditLog (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT,
    action VARCHAR(20),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER after_employee_insert
AFTER INSERT ON Employees
FOR EACH ROW
BEGIN
    INSERT INTO AuditLog(emp_id, action)
    VALUES (NEW.emp_id, 'INSERT');
END;
```

After any INSERT on Employees, a row like `(1, 1, 'insert', 2025-06-17 10:35:00)` is automatically added to AuditLog.

---

**SAT-1 — Maximum stock profit (C++):**

```cpp
#include <iostream>
using namespace std;

int maxProfit(int price[], int n) {
    int profit = 0;
    for (int i = 1; i < n; i++) {
        if (price[i] > price[i - 1])
            profit += price[i] - price[i - 1];
    }
    return profit;
}

int main() {
    int price[] = {100, 180, 260, 310, 40, 535, 695};
    int n = sizeof(price) / sizeof(price[0]);
    cout << "Maximum Profit: " << maxProfit(price, n) << endl;
    return 0;
}
```

Output: `Maximum Profit: 865`

Logic: sum every positive day-over-day rise (buy yesterday, sell today). If the array is in decreasing order, every difference is negative → profit = 0 (no profitable trade exists). This is the local-minima/maxima greedy approach; no explicit min/max tracking needed.

Verification: 80 + 80 + 50 + 0 + 495 + 160 = **865** ✓

---

**SAT-2 — Pascal's Triangle Nth row (C):**

```c
#include <stdio.h>
void pascalRow(int n) {
    long long val = 1;
    printf("%lld ", val);           /* First element C(n,0) = 1 */
    for (int i = 1; i <= n; i++) {
        val = val * (n - i + 1) / i;   /* C(n,i) = C(n,i-1) × (n-i+1) / i */
        printf("%lld ", val);
    }
}
int main() {
    int N = 5;
    pascalRow(N);
    return 0;
}
```

Output: `1 5 10 10 5 1`

Formula: C(n,k) = n! / (k!(n−k)!). The iterative recurrence `next = current × (n−i+1) / i` avoids computing large factorials. Row 5: 1 5 10 10 5 1 ✓
