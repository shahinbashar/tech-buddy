# Operating Systems

Topics:

- Processes and threads
- CPU scheduling algorithms
- Synchronization: semaphores, mutex
- Deadlock
- Memory management and paging
- Virtual memory and page replacement
- File systems
- Linux commands

## Diagnostic misses (2 Oct)

### Deadlock conditions

- **Core idea:** deadlock needs all four Coffman conditions at once: mutual exclusion, hold and wait, **no preemption**, and circular wait. Break any one and deadlock cannot happen.
- **Bangla core:** ডেডলক হয় যখন প্রতিটি প্রসেস একটি রিসোর্স ধরে রেখে অন্যের রিসোর্সের জন্য অপেক্ষা করে, আর কেউ ছাড়ে না। চারটি শর্তের যেকোনো একটি ভাঙলেই ডেডলক হবে না।
- **Exam points:** handling methods are prevention, avoidance (Banker's algorithm), detection and recovery, and ignoring it (ostrich approach).
- **Common mistake:** picking "preemption" as a condition. The condition is **no** preemption.

#### Exam answer (10 marks)

**Q. What is deadlock? State the necessary conditions for deadlock and explain how it can be handled.**

**Definition:** A deadlock is a situation in which a set of processes is permanently blocked because each process holds a resource and waits for another resource held by another process in the same set.

**Diagram (resource allocation graph with a cycle):**

```
P1 --holds--> R1 --requested by--> P2
 ^                                  |
 +---requested by--- R2 <---holds---+
```

**Necessary conditions (Coffman conditions).** A deadlock can occur only if all four hold at the same time:

1. **Mutual exclusion:** at least one resource is non-sharable; only one process can use it at a time.
2. **Hold and wait:** a process holds at least one resource while waiting to acquire others.
3. **No preemption:** a resource cannot be taken away forcibly; the process releases it only voluntarily.
4. **Circular wait:** a closed chain of processes exists, P1 → P2 → … → Pn → P1, where each waits for a resource held by the next.

**Example:** P1 holds the printer and requests the scanner, while P2 holds the scanner and requests the printer. Neither can proceed.

**Methods of handling deadlock:**

1. **Prevention:** ensure at least one condition can never hold, for example by requesting all resources at once or by numbering resources and requesting them in order.
2. **Avoidance:** grant a request only if the system stays in a safe state, using the Banker's algorithm.
3. **Detection and recovery:** detect a cycle in the wait-for graph, then recover by terminating processes or preempting resources.
4. **Ignoring the problem (ostrich approach):** used by most general-purpose operating systems because deadlocks are rare and prevention is costly.

**Conclusion:** Deadlock occurs only when all four conditions hold together. Breaking any one of them prevents deadlock.

**Shorter versions:** 2 marks = definition + example. 5 marks = definition + diagram + the four conditions.

### CPU scheduling algorithms

- **Core idea:** SJF gives the minimum average waiting time but can starve long jobs.
- **Exam points:** FCFS suffers the convoy effect. SRTF is preemptive SJF. Priority scheduling can starve low-priority jobs; aging fixes this. Round Robin uses a time quantum and is fair for time-sharing.
- **Common mistake:** choosing Round Robin because it sounds fair.

### Belady's anomaly

- **Core idea:** with FIFO page replacement, adding more frames can **increase** page faults.
- **Exam points:** LRU and Optimal are stack algorithms and never show the anomaly. Optimal gives the fewest faults but needs future knowledge.
- **Common mistake:** thinking all algorithms can show it.

### Linux permission commands

- **Core idea:** chmod changes permissions; chown changes owner; chgrp changes group; umask sets defaults for new files.
- **Exam points:** octal digits: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--. `chmod 755 file` = rwxr-xr-x (owner full; group and others read and execute).
- **Common mistake:** confusing chmod with chown.
