# ICB Securities — Assistant Programmer — 27.06.2026

Source: Debug IT Job Solution (shared 5 Oct 2026). This is the main model paper for the upcoming ICB Securities exam.

## Questions

1. Function: change each alphabetic character of a string to the next character; non-alphabetic unchanged; keep case. Time complexity.
2. Student and Course tables: (a) find student information; (b) courses and number of students where enrollment ≤ 30.
3. A /22 network divided into 5 subnets for host needs 250, 250, 125, 120, 60 → network address, mask, usable host range for each (VLSM).
4. Propositional logic expression → tautology, contradiction or contingency, with a truth table.
5. CPU fast, RAM slow, CPU waits: (a) upgrade CPU or RAM? (b) if RAM speed doubles, is memory latency halved?
6. Why is a zero-day attack dangerous for ICB? Two reasons.
7. Server X: 60% traffic, 2% failure; Server Y: 40% traffic, 5% failure. (a) P(total failure); (b) P(failed request is from Y).
8. Essay: effects of transitioning to a renewable-energy economy on the economy and environment; challenges.
9. Essay: opportunities, employment prospects and side effects of social media.
10. (a) Bangla→English translation: 21st February. (b) ICB server traffic rises from 10,000 to 50,000 hits without cloud migration — business and technical consequences.

## Pattern (vs. bank papers)

- Short paper (10 Qs), scenario-heavy, framed around ICB's own business (capital market, trading).
- Mix: 1 program, 1 SQL, 1 subnetting (VLSM), 1 discrete math (logic), 1 probability (Bayes), 1 architecture reasoning, 2 security/scalability scenarios, 2 essays, 1 translation.
- No pure GK section; no Bangla essay.

## Answer keys (short)

- **Q1:** loop over chars; 'z'→'a', 'Z'→'A' (wrap), else +1 for letters. O(n) time, O(1) extra space (in place).
- **Q3** (assume 192.168.0.0/22, largest first):

| Need | Prefix | Network       | Mask            | Usable range    |
| ---- | ------ | ------------- | --------------- | --------------- |
| 250  | /24    | 192.168.0.0   | 255.255.255.0   | .0.1 – .0.254   |
| 250  | /24    | 192.168.1.0   | 255.255.255.0   | .1.1 – .1.254   |
| 125  | /25    | 192.168.2.0   | 255.255.255.128 | .2.1 – .2.126   |
| 120  | /25    | 192.168.2.128 | 255.255.255.128 | .2.129 – .2.254 |
| 60   | /26    | 192.168.3.0   | 255.255.255.192 | .3.1 – .3.62    |

Free: 192.168.3.64 – 3.255.

- **Q5:** (a) RAM/memory side (system is memory-bound; a faster CPU just waits faster; a bigger cache also helps). (b) No — latency = cycles × cycle time + controller/bus overhead; faster RAM usually has higher CAS cycles, and cache hits are unchanged.
- **Q7:** P(F) = 0.6×0.02 + 0.4×0.05 = 0.032; P(Y|F) = 0.02/0.032 = 0.625.
