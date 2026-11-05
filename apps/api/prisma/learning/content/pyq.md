# PYQ Priority Topics

13 topics from 17 past bank IT papers, most-asked first. Each topic follows the same path: a story to picture it, a step-by-step explanation in simple words, the past questions worked out, memory hooks, and a full 10-mark answer to write in the exam.

## Ranking

| #   | Topic                      | Asked |
| --- | -------------------------- | ----- |
| 1   | Cyber attacks              | 4×    |
| 2   | OSI vs TCP/IP              | 4×    |
| 3   | Subnetting                 | 4×    |
| 4   | RAID                       | 4×    |
| 5   | Firewalls                  | 4×    |
| 6   | Topology and devices       | 3×    |
| 7   | Virtualization and cloud   | 3×    |
| 8   | Backup and DR              | 3×    |
| 9   | SQL                        | 2×+   |
| 10  | C programs                 | 3×    |
| 11  | Cache and memory           | 2×    |
| 12  | Cryptography               | 2×    |
| 13  | Heap, graph, hash, postfix | 2×    |

## 1. Cyber attacks

**Past questions (asked 4×):** "What is cyber security? Top 10 cyber attacks; discuss ransomware and DDoS" (Combined SO-IT 2023) · "10 most common cyber attacks; black, white and grey-hat hackers" (Sonali & Janata 2023) · "Encryption, cyber security, top 10 attacks" (Combined AME 2023) · "Microfinance app in your data center: threats and mitigation" (Combined SO-IT 2024) · "Session hijacking" (BB 2017).

### Picture it

Think of the bank as a **house full of money**. A thief has only four ways to get at it:

1. **Get inside the house:** sneak something in that works for him (malware, ransomware, rootkit, zero-day).
2. **Fool the people in the house:** trick the guard into opening the door (phishing, password guessing).
3. **Break the front desk (the website):** hand the receptionist a fake form that makes her do something wrong (SQL injection, XSS).
4. **Attack the road to the house:** listen to the phone line, or jam the road so no customer can reach the door (man-in-the-middle, DDoS).

Remember the four ways, and the 10 attacks fall into place.

### Understand it step by step

**What is being protected?** Every attack hurts at least one of three things, the **CIA triad**:

- **Confidentiality:** only the right people can see the data. (A thief reading account numbers breaks this.)
- **Integrity:** the data is not changed wrongly. (Changing a balance from 1,000 to 100,000 breaks this.)
- **Availability:** the service works when customers need it. (A website that won't open breaks this.)

In the exam, naming which part of CIA an attack hits shows the examiner you understand it.

**The 10 attacks, grouped by the four ways:**

| Way in            | Attack                         | What happens, in plain words                                                                                           | Hits    | How to stop it                                     |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------- |
| Get inside        | **Malware**                    | Bad software (virus, worm, trojan, spyware) gets installed and damages or spies                                        | C, I, A | Antivirus, patching, don't run unknown files       |
|                   | **Ransomware**                 | Locks (encrypts) all your files and asks for money to unlock them                                                      | A       | Offline backups, patching, email filtering         |
|                   | **Rootkit**                    | Malware that hides itself with administrator power                                                                     | C, I    | Integrity checks, secure boot                      |
|                   | **Zero-day exploit**           | Uses a software bug that has no fix yet ("zero days" to prepare)                                                       | C, I, A | IDS/IPS, fast patching, defence in depth           |
| Fool people       | **Phishing**                   | Fake email or website that looks real and steals passwords                                                             | C       | Staff training, MFA, email filtering               |
|                   | **Password attack**            | Guessing passwords again and again (brute force, dictionary)                                                           | C       | Strong passwords, account lockout, MFA             |
| Break the website | **SQL injection**              | Typing SQL code into a login or search box so the database obeys the attacker                                          | C, I    | Parameterized queries, input validation, WAF       |
|                   | **Cross-site scripting (XSS)** | Hiding a script in a web page so it runs in other users' browsers                                                      | C       | Encode output, validate input                      |
| Attack the road   | **Man-in-the-middle (MitM)**   | Secretly sitting between two people and reading or changing their messages                                             | C, I    | HTTPS/TLS, certificate checks, VPN                 |
|                   | **DoS / DDoS**                 | Flooding a server with fake traffic so real customers can't get in. DDoS uses thousands of hacked computers (a botnet) | A       | DDoS protection, rate limiting, CDN, load balancer |

**The two they ask about in detail:**

**Ransomware.** (1) An employee opens a phishing email or a server is unpatched. (2) The ransomware spreads and encrypts files and databases. (3) A message demands payment, usually in cryptocurrency. (4) The bank cannot work. **Stop it:** keep offline backups (so you can restore instead of paying), patch quickly, filter email, train staff, limit admin rights.

**DDoS.** (1) The attacker infects thousands of devices to form a **botnet**. (2) On command, all of them send requests to the bank's website at once. (3) The server's bandwidth or CPU runs out. (4) Real customers see "site not available". **Stop it:** DDoS protection services that absorb traffic, rate limiting, CDNs, load balancers, extra bandwidth.

**Session hijacking** (BB 2017). After you log in, the website gives your browser a **session ID** (like a token at a bank counter). If an attacker steals that token from a cookie or an unencrypted connection, the site thinks he is you. **Stop it:** HTTPS everywhere, mark cookies HttpOnly and Secure, issue a new session ID after login, end sessions after a short idle time.

**Hacker hats:**

| Hat   | Who                                | Permission? | Goal                                                                              |
| ----- | ---------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| White | Ethical hacker, penetration tester | Yes         | Find holes so they get fixed                                                      |
| Black | Criminal                           | No          | Steal, damage, earn money                                                         |
| Grey  | In between                         | No          | Breaks in without permission, but usually reports the hole instead of misusing it |

Picture: white hat = police doing a security check, black hat = thief, grey hat = a neighbour who climbs your wall uninvited, then tells you your back door is open.

### Bangla core

সাইবার আক্রমণ মানে তথ্য চুরি (Confidentiality), তথ্য বদলানো (Integrity) বা সেবা বন্ধ করা (Availability)। আক্রমণকারীর পথ ৪টি: ভেতরে ঢোকা, মানুষকে ঠকানো, ওয়েবসাইট ভাঙা, আর লাইনে আক্রমণ।

### Mindmap

```mindmap
Cyber attacks
  Get inside
    Malware: virus, worm, trojan
    Ransomware → offline backup
    Rootkit, zero-day → patch, secure boot
  Fool the people
    Phishing → training, email filter
    Password attacks → MFA, lockout
  Break the website
    SQL injection → parameterized queries
    XSS → escape output, CSP
  Attack the road
    Man-in-the-middle → TLS, certificates
    DDoS → absorb and filter the flood
  CIA triad
    Confidentiality: thief reads
    Integrity: thief changes
    Availability: thief blocks
```

### Remember it

- **Four ways in:** Inside → People → Website → Road. Two or three attacks under each.
- **CIA:** a thief **reads** (C), **changes** (I) or **blocks** (A).
- **Ransomware's cure = backup. DDoS's cure = absorb the flood. SQL injection's cure = parameterized queries.** One cure each, easy to recall.

### Exam trap

Writing only names. Each attack needs one line on what it does and one way to stop it; that is where the marks are.

### Exam answer (10 marks)

> **Cyber security** is the practice of protecting computer systems, networks and data from digital attacks that threaten their confidentiality, integrity and availability (the CIA triad). In banking it protects customers' money, personal data and trust.
>
> **Top 10 cyber attacks:**
>
> 1. **Malware:** malicious software such as viruses, worms and trojans that damages systems or steals data.
> 2. **Ransomware:** encrypts the victim's data and demands a ransom for the key.
> 3. **Phishing:** fraudulent emails or websites that trick users into revealing credentials.
> 4. **Man-in-the-middle:** the attacker secretly intercepts and alters communication between two parties.
> 5. **DoS/DDoS:** overwhelming a server with traffic so legitimate users cannot access it.
> 6. **SQL injection:** inserting malicious SQL through input fields to read or modify the database.
> 7. **Cross-site scripting:** injecting malicious scripts into web pages viewed by other users.
> 8. **Zero-day exploit:** attacking a vulnerability before a patch is available.
> 9. **Password attacks:** brute-force and dictionary attacks to guess passwords.
> 10. **Rootkits:** hidden malware that gives an attacker privileged control.
>
> **Ransomware** usually enters through phishing or unpatched software, encrypts files and demands payment. It is prevented by regular offline backups, patch management, email filtering and user awareness.
>
> **DDoS** uses a botnet of compromised devices to flood a target with traffic until it crashes. It is mitigated by DDoS protection services, rate limiting, content delivery networks and load balancing.
>
> **Conclusion:** no single control stops every attack. Banks follow **defence in depth**: firewalls, IDS/IPS, encryption, multi-factor authentication, patching, backups and regular staff training.

### Recall check

1. Which part of CIA does DDoS attack?
2. Name the four ways in and one attack under each.
3. What is the single best defence against ransomware, and why?

## 2. OSI vs TCP/IP

**Past questions (asked 4×):** "Difference between OSI and TCP/IP; relation between data, segment, packet and bit" (Combined SO-IT 2023) · "Differentiate OSI and TCP/IP; draw the 4 TCP/IP layers with protocols; functions of the MAC layer" (Rupali ANE 2023) · "Tabular TCP/IP layers: functions, protocols, devices" (Combined AE-IT 2024) · "TCP vs UDP" (3 papers) · "Which OSI layer for end-to-end encryption?" (BB AP 2023).

### Picture it

You are sending a **gift parcel** from Dhaka to a friend in Chattogram. Follow it from top to bottom:

| OSI layer      | In the parcel story                                             | In the network                                                                |
| -------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 7 Application  | You write the letter                                            | The app (browser, email) creates the data                                     |
| 6 Presentation | You translate it and seal it in an envelope                     | Data is formatted, encrypted, compressed                                      |
| 5 Session      | You phone your friend: "a parcel is coming"                     | A conversation (session) is opened and kept alive                             |
| 4 Transport    | The courier splits it into numbered boxes and promises delivery | Data is split into **segments** with port numbers; TCP checks they all arrive |
| 3 Network      | Each box gets a city address and a route is chosen              | Each segment becomes a **packet** with IP addresses; routers choose the path  |
| 2 Data link    | Boxes are loaded onto the local van going to the next stop      | Each packet becomes a **frame** with MAC addresses for the next device        |
| 1 Physical     | The van drives on the road                                      | **Bits** travel as electrical, light or radio signals                         |

At the receiver, the same steps happen in reverse: the road delivers, the van unloads, boxes are opened, the letter is read.

### Understand it step by step

**1. Why layers?** One big job is split into small jobs. Each layer does one job and only talks to the layers just above and below it. If Wi-Fi replaces a cable (layer 1–2), the browser (layer 7) doesn't care.

**2. Encapsulation:** going down, each layer **adds its own header** (like adding another envelope with its own label). Going up, each layer removes its header. That is why the data has a different name at each layer:

**Data → Segment → Packet → Frame → Bits**

**3. The two models side by side:**

| OSI (7)                                  | TCP/IP (4)         | Main protocols                         | Device                                  |
| ---------------------------------------- | ------------------ | -------------------------------------- | --------------------------------------- |
| 7 Application, 6 Presentation, 5 Session | **Application**    | HTTP, HTTPS, FTP, SMTP, DNS, DHCP, TLS | Gateway                                 |
| 4 Transport                              | **Transport**      | TCP, UDP                               | Firewall (L4)                           |
| 3 Network                                | **Internet**       | IP, ICMP, ARP, OSPF                    | Router                                  |
| 2 Data link, 1 Physical                  | **Network access** | Ethernet, Wi-Fi (802.11), cables       | Switch, bridge (L2); hub, repeater (L1) |

**Easy rule:** TCP/IP = OSI with the **top three squeezed into one** and the **bottom two squeezed into one**. 3 + 1 + 1 + 2 = 7 becomes 1 + 1 + 1 + 1 = 4.

**4. The differences:**

| Point                    | OSI                          | TCP/IP                                         |
| ------------------------ | ---------------------------- | ---------------------------------------------- |
| Layers                   | 7                            | 4                                              |
| Type                     | Reference (theory) model     | Practical model the internet uses              |
| Made by                  | ISO                          | US Department of Defense (ARPANET)             |
| Order of creation        | Model first, protocols later | Protocols first, model described later         |
| Session and presentation | Separate layers              | Inside the application layer                   |
| Transport service        | Mainly connection-oriented   | Both TCP (connection) and UDP (connectionless) |
| Used for                 | Teaching and troubleshooting | Building real networks                         |

**5. TCP vs UDP:**

| TCP                                                            | UDP                                            |
| -------------------------------------------------------------- | ---------------------------------------------- |
| Connection-oriented: 3-way handshake (SYN, SYN-ACK, ACK) first | Connectionless: just sends                     |
| Reliable: lost segments are re-sent                            | No guarantee                                   |
| Keeps order, has flow and congestion control                   | No order, no control                           |
| Slower, bigger header (20 bytes)                               | Faster, small header (8 bytes)                 |
| Web, email, file transfer, banking                             | Video calls, live streaming, DNS, online games |

Picture: **TCP = registered post** (you get a receipt for every box). **UDP = a loudspeaker announcement** (fast, but nobody confirms they heard).

**6. MAC sublayer functions** (part of layer 2, asked by Rupali): physical (MAC) addressing, framing, deciding who may transmit (CSMA/CD on Ethernet, CSMA/CA on Wi-Fi), error detection with CRC, and flow control.

### Bangla core

OSI হলো বইয়ের মডেল (৭ তলা), TCP/IP হলো ইন্টারনেটের আসল মডেল (৪ তলা)। প্রতিটি তলা নিজের একটি খাম (header) যোগ করে — তাই নাম বদলায়: segment, packet, frame, bit।

### Mindmap

```mindmap
OSI vs TCP/IP
  OSI: 7 layers
    7 Application · 6 Presentation · 5 Session
    4 Transport: TCP, UDP, ports
    3 Network: IP, routers
    2 Data link: MAC, switches
    1 Physical: bits, cables, hubs
  TCP/IP: 4 layers
    Application = OSI 5 + 6 + 7
    Transport = OSI 4
    Internet = OSI 3
    Network access = OSI 1 + 2
  Data units going down
    Data → Segment → Packet → Frame → Bits
  Key differences
    OSI = reference model
    TCP/IP = the one the internet runs on
```

### Remember it

- **OSI from 7 down:** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing.
- **OSI from 1 up:** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.
- **Data units going down:** **S**ome **P**eople **F**ear **B**irthdays = Segment, Packet, Frame, Bits.
- **Devices by layer:** hub = 1, switch = 2, router = 3. "Hub is dumb, switch knows MACs, router knows IPs."

### Exam trap

Saying TCP/IP has 5 layers. Some textbooks show a 5-layer hybrid, but the standard TCP/IP model has **4**. If you draw 5, label it "hybrid model".

### Exam answer (10 marks)

> The **OSI (Open Systems Interconnection) model** is a seven-layer reference model developed by ISO that describes how data travels from one computer to another. The **TCP/IP model** is a four-layer practical model on which the internet is built.
>
> &#91;Draw both stacks side by side and join the matching layers with arrows: Application + Presentation + Session → Application; Transport → Transport; Network → Internet; Data link + Physical → Network access. Write two protocols beside each TCP/IP layer.\]
>
> **Differences:**
>
> | OSI                                      | TCP/IP                                    |
> | ---------------------------------------- | ----------------------------------------- |
> | 7 layers                                 | 4 layers                                  |
> | Theoretical reference model              | Practical, implemented model              |
> | Developed by ISO                         | Developed by the US Department of Defense |
> | Model came before protocols              | Protocols came before the model           |
> | Separate session and presentation layers | Merged into the application layer         |
>
> **Relation between data, segment, packet and bit:** the application creates **data**; the transport layer divides it into **segments** and adds port numbers; the network layer adds IP addresses to form **packets**; the data link layer adds MAC addresses to form **frames**; the physical layer sends them as **bits**. This process is called encapsulation.
>
> **Conclusion:** the OSI model is used to understand and troubleshoot networks, while the TCP/IP model is used to build and run them.

### Recall check

1. At which layer does a router work, and what data unit does it handle?
2. Which three OSI layers become TCP/IP's application layer?
3. Give two uses of UDP and say why UDP suits them.

## 3. Subnetting and IP addressing

**Past questions (asked 4×):** "172.16.0.0/19: how many subnets and hosts? Function of OSPF" (Rupali ANE 2023) · "Subnets and hosts from 172.20.0.0/27" (BB AME 2017) · "Convert 192.168.101.5 to binary; fill the class table" (Rupali ANE 2023) · "Classful vs classless addressing" (Sonali DBA 2024) · "Public vs private IP" (Rupali 2023) · "What is an IP address and why is it needed?" (Pubali 2023) · "Benefits of subnets for an office" (Combined SO-IT 2024).

### Picture it

An IP address is like a **postal address: area + house number**. "Dhanmondi Road 7, House 12": the area tells the postman which part of the city, the house number tells him which door.

In an IP address, the **network part** is the area and the **host part** is the house. The **subnet mask** is the line that shows where the area ends and the house number begins.

**Subnetting = cutting one big area into smaller blocks.** A developer buys one big plot and cuts it into smaller plots. Every time you take **one bit from the host part** to make more blocks, the number of blocks **doubles** and each block holds **half as many houses**.

### Understand it step by step

**1. An IPv4 address is 32 bits**, written as 4 numbers (octets) of 8 bits each, from 0 to 255. Example: 192.168.1.10.

**2. The mask shows the split.** 1s mean network, 0s mean host. /24 means the first 24 bits are network:

255.255.255.0 = 11111111.11111111.11111111.00000000 → 24 ones, 8 zeros.

**3. Classes and default masks** (memorize the first-number ranges):

| Class | First number | Default mask        | Hosts per network | Private range                 |
| ----- | ------------ | ------------------- | ----------------- | ----------------------------- |
| A     | 1–126        | /8 = 255.0.0.0      | 16,777,214        | 10.0.0.0 – 10.255.255.255     |
| B     | 128–191      | /16 = 255.255.0.0   | 65,534            | 172.16.0.0 – 172.31.255.255   |
| C     | 192–223      | /24 = 255.255.255.0 | 254               | 192.168.0.0 – 192.168.255.255 |
| D     | 224–239      | Multicast           | —                 | —                             |
| E     | 240–255      | Research            | —                 | —                             |

127.x.x.x is loopback (your own computer). **Private** addresses work only inside an office or home; **public** addresses are unique on the internet. NAT on the router translates between them.

**4. The three formulas:**

- **Number of subnets = 2^(borrowed bits)**, where borrowed bits = new prefix − default prefix.
- **Usable hosts per subnet = 2^(host bits) − 2**, where host bits = 32 − new prefix. Minus 2 because the first address is the **network address** and the last is the **broadcast address**; neither can go to a computer.
- **Block size = 256 − the last mask number that isn't 255.** Subnets start at multiples of the block size.

**5. Mask values to know by heart** (the bits fill from the left):

| Bits on     | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
| Octet value | 128 | 192 | 224 | 240 | 248 | 252 | 254 | 255 |

### The past questions, worked out

**Q: 172.16.0.0/19. How many subnets and hosts?**

1. First number 172 → Class B → default /16.
2. Borrowed bits = 19 − 16 = 3 → subnets = 2³ = **8**.
3. Host bits = 32 − 19 = 13 → hosts = 2¹³ − 2 = 8,192 − 2 = **8,190 per subnet**.
4. Mask: 16 ones + 3 more ones in the third octet → 3 bits on = 224 → **255.255.224.0**.
5. Block size = 256 − 224 = 32 → the subnets are 172.16.**0**.0, 172.16.**32**.0, 172.16.**64**.0, … 172.16.**224**.0 (8 of them).

**Q: 172.20.0.0/27.**

1. Class B, default /16. Borrowed = 27 − 16 = 11 → 2¹¹ = **2,048 subnets**.
2. Host bits = 32 − 27 = 5 → 2⁵ − 2 = **30 hosts**.
3. Mask: 255.255.255.224 (27 = 8 + 8 + 8 + 3, and 3 bits on = 224).

**Q: Convert 192.168.101.5 to binary.** Use the place values **128 64 32 16 8 4 2 1** and take the biggest that fit:

- 192 = 128 + 64 → 11000000
- 168 = 128 + 32 + 8 → 10101000
- 101 = 64 + 32 + 4 + 1 → 01100101
- 5 = 4 + 1 → 00000101

Answer: **11000000.10101000.01100101.00000101**. First number 192 → Class C → network ID 192.168.101.0, host ID .5.

**Q: Why move from classful to classless (CIDR)?** Classful addressing gave only three sizes. A company needing 300 addresses was too big for Class C (254), so it got a Class B (65,534) and wasted over 65,000. This waste ran IPv4 out quickly. **CIDR** lets the prefix be any length (/19, /27), so blocks fit the real need (VLSM), routers can combine many routes into one (route summarization, smaller routing tables), and IPv4 lasts longer.

**OSPF in one breath:** Open Shortest Path First is a **link-state** routing protocol. Every router learns the full map of the network and runs **Dijkstra's shortest-path algorithm** to choose the best route. It is classless, converges fast, and splits big networks into areas.

### Bangla core

IP ঠিকানা = এলাকা (network) + বাড়ির নম্বর (host)। হোস্ট থেকে ১টি বিট ধার করলে সাবনেট দ্বিগুণ হয়, প্রতিটিতে হোস্ট অর্ধেক হয়। হোস্ট গুনলে সবসময় ২ বাদ (network + broadcast)।

### Mindmap

```mindmap
Subnetting
  Read the address
    Prefix /n = network bits
    Host bits = 32 − n
  Count
    Hosts = 2^(host bits) − 2
    Subnets = 2^(borrowed bits)
    Block size = 256 − mask octet
  Ranges
    Network = first, broadcast = last
    Usable = between them
  Classes
    A 1–126 · B 128–191 · C 192–223
    Private: 10, 172.16–31, 192.168
  VLSM
    Sort needs largest first
    Give each the smallest block that fits
```

### Remember it

- **"Borrow bits, double plots, halve houses."**
- **Hosts always minus 2.** Subnets never minus 2.
- Class first numbers: **A up to 126, B up to 191, C up to 223**: think "**1-2-6, 1-9-1, 2-2-3**".
- Private ranges: **10, 172.16 to 31, 192.168**. "Ten, sixteen-to-thirty-one, one-nine-two-one-six-eight."
- Mask ladder: **128, 192, 224, 240, 248, 252, 254, 255**: each step adds half of what's left.

### Exam trap

Using /24 as the default for 172.x. It is Class B, so the default is **/16**. Also, never forget the −2 for hosts.

### Exam answer: "What is a subnet mask? Benefits of subnetting" (10 marks)

> An **IP address** is a 32-bit logical address that uniquely identifies a device on a network; it has a network part and a host part. **Subnetting** is the process of dividing one network into smaller logical networks by borrowing bits from the host part. A **subnet mask** is a 32-bit number in which 1-bits mark the network and subnet portion and 0-bits mark the host portion.
>
> **Example:** 172.16.0.0/19 is a Class B address with 3 borrowed bits. It gives 2³ = 8 subnets, each with 2¹³ − 2 = 8,190 usable hosts. The mask is 255.255.224.0 and the subnets start at 172.16.0.0, 172.16.32.0, 172.16.64.0 and so on.
>
> **Benefits of subnetting:**
>
> 1. **Less broadcast traffic**, so better network performance.
> 2. **Better security**: departments can be separated and controlled with access lists.
> 3. **Efficient use of IP addresses**, with less waste.
> 4. **Easier management and troubleshooting**: a problem stays inside one subnet.
> 5. **Organized growth**: each branch or department gets its own block.
>
> **Conclusion:** subnetting with CIDR lets an organization such as a bank design a network that is fast, secure and economical with addresses.

### Recall check

1. 192.168.10.0/26: how many subnets, how many hosts, what mask?
2. What is the binary of 200?
3. Why do we subtract 2 when counting hosts?

## 4. RAID

**Past questions (asked 4×):** "What is RAID? Why is it important for servers in a data center?" (Combined AME 2023) · "Explain the purpose of RAID" (Pubali HE 2023) · "Which RAID level is best and why?" and "Concept of RAID; its relevance in databases" (Sonali DBA 2024).

### Picture it

You have a big **exam answer book to copy**, and several helpers (disks):

- **RAID 0, two helpers split the pages:** helper A copies odd pages, B copies even pages. Twice as fast. But if one helper falls sick, half the book is lost. **Fast, no safety.**
- **RAID 1, a photocopy:** both helpers write the full book. If one is sick, the other has everything. **Safe, but you pay for two books.**
- **RAID 5, split pages plus a shared answer key:** three or more helpers split the pages, and each also keeps a small "parity" note. If any one helper is sick, the others can rebuild his pages from the notes. **Good balance.**
- **RAID 6, two answer keys:** like RAID 5, but two sick helpers can be covered.
- **RAID 10, photocopy plus split:** pairs of helpers photocopy each other (1), and the pairs split the pages (0). **Fast and safe, but costs half your disks.**

### Understand it step by step

**1. What is RAID?** RAID stands for **Redundant Array of Independent Disks**. Several physical hard disks or SSDs are combined so the server sees them as **one logical disk**.

**2. RAID uses only three tricks:**

- **Striping:** data is split into blocks and spread across disks, so they work in parallel. More **speed**.
- **Mirroring:** the same data is written to two disks. More **safety**.
- **Parity:** extra calculated data (using XOR) is stored, so a missing disk's data can be rebuilt. Safety at **lower cost** than mirroring.

**3. The levels:**

| Level   | Trick                         | Min disks | Disk failures it survives | Usable space | Speed                     | Good for                        |
| ------- | ----------------------------- | --------- | ------------------------- | ------------ | ------------------------- | ------------------------------- |
| RAID 0  | Striping                      | 2         | 0                         | 100%         | Fastest                   | Video editing, temporary data   |
| RAID 1  | Mirroring                     | 2         | 1                         | 50%          | Fast reads                | OS disk, small critical data    |
| RAID 5  | Striping + distributed parity | 3         | 1                         | (n−1)/n      | Good reads, slower writes | File servers, read-heavy data   |
| RAID 6  | Striping + double parity      | 4         | 2                         | (n−2)/n      | Good reads, slow writes   | Big archives, backup storage    |
| RAID 10 | Mirror, then stripe           | 4         | 1 in each mirror pair     | 50%          | Fast reads and writes     | Databases, banking transactions |

**4. Which is best?** There is no single best: it depends on the goal.

- Only speed → RAID 0.
- Cheap safety for mostly-read data → RAID 5 or 6.
- **A bank's transaction database → RAID 10**, because it needs fast writes and must survive a disk failure.

**5. RAID in databases:** databases write constantly (every transaction goes to a log). Parity RAID (5, 6) is slow on writes because parity must be recalculated each time. So: **RAID 10 for data and log files**, RAID 1 for the OS disk.

**6. RAID is not a backup.** If someone deletes a table or ransomware encrypts files, RAID copies the damage to every disk instantly. You still need backups (topic 8).

### Bangla core

RAID মানে কয়েকটি ডিস্ক একসাথে ব্যবহার করে একটি ডিস্কের মতো চালানো — ভাগ করলে গতি (striping), কপি করলে নিরাপত্তা (mirroring), হিসাব রাখলে কম খরচে নিরাপত্তা (parity)। RAID ব্যাকআপ নয়।

### Mindmap

```mindmap
RAID
  Three tricks
    Split (striping) = speed
    Copy (mirroring) = safety
    Calculate (parity) = cheap safety
  Levels
    RAID 0: split, no safety, 2 disks
    RAID 1: copy, 2 disks
    RAID 5: parity spread, 3 disks, survives 1
    RAID 6: double parity, 4 disks, survives 2
    RAID 10: copy then split, 4 disks
  For a bank
    Database → RAID 10
    File/archive → RAID 5 or 6
  Trap
    RAID ≠ backup
    Deletes and ransomware copy across
```

### Remember it

- **0 = zero safety. 1 = one exact copy. 5 = parity spread across. 6 = parity twice. 10 = 1 + 0 (copy, then split).**
- Minimum disks: **2, 2, 3, 4, 4** for RAID 0, 1, 5, 6, 10.
- Three tricks: **Split for speed, Copy for safety, Calculate for cheap safety.**
- Bank database = **RAID 10**. RAID ≠ backup.

### Exam trap

Writing "RAID 0 is best" without a reason. The book's answer means _fastest_. For a bank, say RAID 10 and explain why: speed plus fault tolerance.

### Exam answer (10 marks)

> **RAID (Redundant Array of Independent Disks)** is a storage technology that combines several physical disks into one logical unit to improve performance, provide fault tolerance, or both. It uses three techniques: **striping** (spreading data across disks for speed), **mirroring** (duplicating data for safety) and **parity** (storing calculated data to rebuild a failed disk).
>
> &#91;Draw RAID 0 as blocks A1, A2 split across two disks; RAID 1 as the same blocks on both disks.\]
>
> &#91;Table of RAID 0, 1, 5, 6 and 10: technique, minimum disks, fault tolerance, usable capacity, use.\]
>
> **Importance of RAID for servers in a data center:**
>
> 1. **Fault tolerance:** the server keeps running when a disk fails.
> 2. **High availability:** a failed disk can be replaced and rebuilt while the server stays online (hot swap).
> 3. **Performance:** striping lets several disks read and write in parallel.
> 4. **Data integrity:** parity helps detect and correct errors.
> 5. **Fast recovery:** data is rebuilt from mirrors or parity, without restoring from tape.
>
> **Relevance in databases:** database servers need fast writes and zero data loss, so RAID 10 is preferred for data and transaction-log files.
>
> **Conclusion:** RAID increases availability and speed, but it is not a backup; a bank needs both RAID and regular backups.

### Recall check

1. What is the minimum number of disks for RAID 5, and how many failures does it survive?
2. Why are RAID 5 writes slower than RAID 10 writes?
3. Give one situation where RAID cannot save your data.

## 5. Firewalls and NGFW

**Past questions (asked 4×):** "What is a firewall? Discuss its types" (Sonali & Janata 2023) · "Draw a LAN with network security; list 5 major firewall types; why firewalls are important; traditional firewall vs NGFW" (Rupali ANE 2023) · "Types of network firewall; NGFW compared to traditional" (Combined AE-IT 2024) · "Tools to secure an e-banking web server" (Combined AE-IT 2024).

### Picture it

A firewall is the **security guard at the bank's gate**. Five kinds of guard, each checking more deeply than the last:

1. **Packet filter = the gate guard who only reads the address label.** "From where? To which door?" He never remembers anyone. Fast, simple, easy to fool.
2. **Stateful firewall = the guard with a visitors' register.** He notes who went in, so he lets their replies come back out and stops strangers pretending to be replies.
3. **Circuit-level gateway = the guard who checks the appointment.** He confirms the meeting (the TCP handshake) is real, but doesn't look in the bag.
4. **Proxy firewall = the receptionist.** You never meet the manager directly; she takes your parcel, opens it, checks it, then passes it on.
5. **Next-generation firewall (NGFW) = a smart guard with CCTV, an ID scanner and an X-ray machine.** He knows who you are, what app you're using, opens encrypted parcels, and matches you against a list of known criminals.

### Understand it step by step

**1. What a firewall does:** it sits between a **trusted network** (the bank's LAN) and an **untrusted network** (the internet) and checks every bit of traffic against **rules**: allow or deny.

**2. Where it sits (draw this for the Rupali question):**

Internet → Router → **Firewall** → **DMZ** (public servers: web, email) and → internal switch → employee PCs, database server

The **DMZ** (demilitarized zone) holds servers the public must reach, kept apart from the internal network so a hacked web server can't reach the database directly.

**3. The five types in detail:**

| Type                              | OSI layer | What it checks                                                                        | Strength                          | Weakness                                    |
| --------------------------------- | --------- | ------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------- |
| Packet filtering                  | 3–4       | Source/destination IP, port, protocol of each packet alone                            | Fast, cheap                       | No memory, can't see content, easy to spoof |
| Stateful inspection               | 3–4       | Same, plus a **state table** of open connections                                      | Blocks fake replies               | Still can't see content                     |
| Circuit-level gateway             | 5         | That the TCP handshake/session is legitimate                                          | Light, hides the inside network   | Doesn't inspect data                        |
| Proxy (application-level gateway) | 7         | Full content of one application (e.g. HTTP)                                           | Deep checking, hides internal IPs | Slower, one proxy per app                   |
| NGFW                              | 3–7       | Everything above + deep packet inspection, IPS, app and user identity, TLS inspection | Strongest protection              | Costly, needs tuning                        |

**Bonus: a WAF (web application firewall)** sits in front of a website and blocks web attacks such as SQL injection and XSS. Banks put one in front of internet banking.

**4. Traditional firewall vs NGFW:**

| Point                  | Traditional firewall        | NGFW                                                   |
| ---------------------- | --------------------------- | ------------------------------------------------------ |
| Looks at               | Headers: IP, port, protocol | Full content (deep packet inspection)                  |
| Knows the application? | No: port 443 is just "web"  | Yes: tells Facebook from internet banking, even on 443 |
| Intrusion prevention   | Needs a separate device     | Built in                                               |
| Rules by user          | No                          | Yes, linked to Active Directory                        |
| Encrypted traffic      | Passes it blind             | Can decrypt and inspect (TLS inspection)               |
| Threat intelligence    | No                          | Live threat feeds, sandboxing                          |

**5. Tools to secure an e-banking web server** (one more past question): NGFW at the edge, WAF in front of the site, HTTPS with TLS 1.2/1.3, IDS/IPS, MFA for admins, SSH keys instead of passwords, regular patching and vulnerability scans, SIEM for log monitoring, and DDoS protection.

### Bangla core

ফায়ারওয়াল হলো ব্যাংকের গেটের দারোয়ান — নিয়ম দেখে ট্রাফিক ঢুকতে দেয় বা আটকায়। সাধারণ ফায়ারওয়াল শুধু ঠিকানা দেখে; NGFW পার্সেল খুলে ভেতরের জিনিসও দেখে।

### Mindmap

```mindmap
Firewalls
  Types, by depth
    Packet filter: layer 3–4 rules
    Stateful: remembers connections
    Circuit-level: layer 5 sessions
    Proxy: layer 7, speaks for you
    NGFW: layers 3–7, all of it
  NGFW adds
    Deep packet inspection
    App and user awareness
    IPS, TLS inspection, threat feeds
  Traditional vs NGFW
    Reads the label: IP, port
    Opens the parcel: content, app, user
  In a bank
    Perimeter + internal segments
    DMZ for web servers
```

### Remember it

- **The deeper the guard looks, the higher the layer:** Packet (3–4) → Stateful (3–4 + memory) → Circuit (5) → Proxy (7) → NGFW (3–7, everything).
- Order of the five: **P**lease **S**top **C**yber **P**irates **N**ow.
- Traditional = **reads the label**. NGFW = **opens the parcel and checks your ID**.

### Exam trap

Calling a stateful firewall "application-aware". It tracks connections, not applications; only proxy and NGFW understand applications.

### Exam answer (10 marks)

> A **firewall** is a network security device or software that monitors incoming and outgoing traffic and allows or blocks it according to a defined set of security rules. It creates a barrier between a trusted internal network and untrusted external networks such as the internet.
>
> &#91;Diagram: Internet → Router → Firewall → DMZ (web and mail servers) and internal LAN (switch, PCs, database server).\]
>
> **Why firewalls are important:** they block unauthorized access, enforce the organization's security policy, separate public servers from internal systems through a DMZ, log traffic for auditing, and stop many attacks before they reach servers.
>
> **Five major types:**
>
> 1. **Packet-filtering firewall:** checks each packet's IP addresses, ports and protocol at layers 3–4.
> 2. **Stateful inspection firewall:** keeps a state table of active connections and allows only traffic that belongs to them.
> 3. **Circuit-level gateway:** works at the session layer and checks that the TCP handshake is legitimate.
> 4. **Proxy (application-level) firewall:** works at layer 7, stands between client and server and inspects application content.
> 5. **Next-generation firewall (NGFW):** combines stateful inspection with deep packet inspection, intrusion prevention, application and user awareness, and TLS inspection.
>
> **Traditional firewall vs NGFW:** \[the comparison table\].
>
> **Conclusion:** modern banks place an NGFW at the network edge and a WAF in front of internet-banking servers, supported by IDS/IPS and SIEM monitoring.

### Recall check

1. Which firewall keeps a table of connections?
2. Name three things an NGFW can do that a packet filter can't.
3. What is a DMZ and why is the web server placed there?

## 6. Topology and network devices

**Past questions (asked 3× each):** "What is topology? Differences between Bus, Ring, Tree and Star; purpose of IEEE 802.11" (Combined SO-IT 2023) · "Network topology; distinguish Bus, Ring, Tree and Star; how Bus works" (Rupali ANE 2023) · "Switch vs bridge vs router" (Sonali & Janata 2023) · "Repeater, hub, bridge, switch and router" (Combined SO-IT 2024) · "Guided vs unguided media; STP vs UTP" (Sonali & Janata 2023) · "Collision domain vs broadcast domain" (Rupali 2023).

### Picture it

Topology is the **road map of a town**. Houses are computers, roads are cables:

| Topology | The town looks like                                         | What happens if one road breaks                                         |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Bus**  | One main road, every house on it                            | The whole town is cut off                                               |
| **Ring** | A circular railway, each station joined to the next         | The whole ring stops (unless there's a second ring)                     |
| **Star** | A bus terminal in the middle, a road from it to every house | Only that one house is cut off; but if the terminal closes, everyone is |
| **Tree** | Several bus terminals joined to one main terminal           | That branch is cut off                                                  |
| **Mesh** | A road from every house to every other house                | Nothing: traffic takes another road                                     |

Network devices are the **people who move the post**:

- **Repeater = a loudspeaker**: makes a weak voice louder so it travels further.
- **Hub = someone shouting the letter to the whole room**: everyone hears it, only the right one keeps it.
- **Bridge = a doorman between two rooms**: passes a letter across only if it's for the other room.
- **Switch = a postman with a list of door numbers (MAC addresses)**: delivers each letter only to the right door.
- **Router = a GPS driver between cities**: reads the city address (IP) and picks the best route to another network.

### Understand it step by step

**1. Topology** is the arrangement of devices and links in a network. **Physical** topology is how cables actually run; **logical** topology is how data flows.

**2. The four they ask about:**

| Point                 | Bus                                    | Ring                                         | Star                              | Tree                                |
| --------------------- | -------------------------------------- | -------------------------------------------- | --------------------------------- | ----------------------------------- |
| Structure             | Single backbone cable with terminators | Each node to two neighbours in a closed loop | All nodes to a central hub/switch | Star networks joined in a hierarchy |
| Cable needed          | Least                                  | Low                                          | More                              | Most of the four                    |
| One cable fault       | Whole network down                     | Whole ring down                              | Only that node                    | That branch                         |
| Central failure point | The backbone                           | Any node/link                                | The hub                           | The root hub                        |
| Adding a node         | Easy, but slows the network            | Hard, breaks the ring                        | Easy                              | Easy                                |
| Troubleshooting       | Hard                                   | Hard                                         | Easy                              | Medium                              |
| Example               | Early Ethernet (10Base2)               | Token Ring, FDDI                             | Office LAN                        | Campus or bank head office          |

**3. How a bus works:** a computer puts its data on the shared backbone. The signal travels **both ways** to every computer. Each one checks the destination address; only the matching one accepts it. **Terminators** at both ends absorb the signal so it doesn't bounce back. If two send at once, data **collides**; CSMA/CD makes them wait and retry.

**4. Devices by layer:**

| Device   | OSI layer    | Works with    | What it does                                               | Domains                          |
| -------- | ------------ | ------------- | ---------------------------------------------------------- | -------------------------------- |
| Repeater | 1 Physical   | Signals       | Regenerates a weak signal                                  | —                                |
| Hub      | 1 Physical   | Bits          | Sends every frame to every port                            | 1 collision domain for all ports |
| Bridge   | 2 Data link  | MAC addresses | Joins two LAN segments, filters by MAC                     | Each side = own collision domain |
| Switch   | 2 Data link  | MAC addresses | Multi-port bridge; sends a frame only to the right port    | Each port = own collision domain |
| Router   | 3 Network    | IP addresses  | Joins different networks, picks paths with a routing table | Each port = own broadcast domain |
| Gateway  | All, up to 7 | Protocols     | Joins networks that use different protocols                | —                                |

**Collision domain:** the area where two devices' signals can crash into each other. **Broadcast domain:** the area a broadcast message reaches. Switches break up collision domains; routers break up broadcast domains.

**5. Media in one breath:** **guided** (wired: twisted pair, coaxial, fiber) vs **unguided** (wireless: radio, microwave, infrared, satellite). **UTP** has no shield (cheap, flexible, most LANs); **STP** has a foil shield (less interference, costlier). Cat5 supports 100 Mbps; Cat6 supports 1 Gbps (10 Gbps over short runs). **IEEE 802.11** is the Wi-Fi standard family (b, g, n, ac, ax).

### Bangla core

টপোলজি হলো শহরের রাস্তার ম্যাপ — এক রাস্তা (Bus), গোল রেল (Ring), মাঝখানে টার্মিনাল (Star), টার্মিনালের শাখা (Tree)। Hub সবাইকে শোনায়, Switch সঠিক দরজায় দেয়, Router অন্য শহরে পথ দেখায়।

### Mindmap

```mindmap
Topology & devices
  Topologies
    Bus: one cable, cheap, one break kills all
    Ring: token passes, one break hurts
    Star: central switch, office favourite
    Tree: stars joined in levels
    Mesh: many links, most reliable
  Devices by layer
    Layer 1: repeater, hub (shouts)
    Layer 2: bridge, switch (MAC)
    Layer 3: router (IP, navigates)
  Domains
    Switch splits collisions
    Router splits broadcasts
```

### Remember it

- **Devices climb the layers as they get smarter:** **R**eal **H**ackers (layer 1) **B**reak **S**witches (layer 2) and **R**outers (layer 3).
- **Hub shouts, switch delivers, router navigates.**
- **Star is the office favourite:** one broken cable hurts only one PC.
- **Switch splits collisions, router splits broadcasts.**

### Exam trap

Saying a switch works at layer 3. A normal switch is **layer 2** (MAC); only a "layer 3 switch" also routes.

### Exam answer: "Topology; Bus, Ring, Tree and Star" (10 marks)

> **Network topology** is the arrangement of computers, devices and links in a network. Physical topology describes the cabling layout; logical topology describes how data flows.
>
> &#91;Draw four small diagrams: a line with computers hanging off it; a circle of computers; a hub with computers around it; two hubs joined to a root hub.\]
>
> &#91;Comparison table: structure, cabling, effect of a cable fault, central failure point, scalability, example.\]
>
> **How bus topology works:** all nodes share one backbone cable. A sender places data on the cable; it travels in both directions, and every node checks the destination address; only the addressed node accepts it. Terminators at both ends prevent signal reflection, and CSMA/CD handles collisions.
>
> **IEEE 802.11** is the family of standards for wireless LANs (Wi-Fi), defining how devices communicate over radio.
>
> **Conclusion:** star and tree topologies are most common today because they are easy to expand and a single cable fault affects only one device or branch.

### Exam answer: "Repeater, hub, bridge, switch and router" (10 marks)

> These are network connecting devices that work at different OSI layers. \[Device table above.\] A **repeater** regenerates signals to extend distance; a **hub** is a multi-port repeater that broadcasts every frame; a **bridge** connects two LAN segments and filters by MAC address; a **switch** is an intelligent multi-port bridge that forwards frames only to the destination port; a **router** connects different networks and forwards packets by IP address using a routing table. Moving up the layers, devices become more intelligent and reduce unnecessary traffic.

### Recall check

1. Which topology fails completely if one backbone cable breaks?
2. Hub vs switch: what is the difference in one line?
3. Which device separates broadcast domains?

## 7. Virtualization, cloud and the bank data center

**Past questions (asked 3× each):** "What is virtualization? Benefits; top 5 virtual platform software" (Sonali & Janata 2023) · "How does virtualization help a physical server?" (Pubali HE 2023) · "Define a VM with a diagram; benefits" and "Explain IaaS, PaaS, SaaS" (BB AME 2023) · "SaaS and multi-tenant architecture" (Combined SO-IT 2024) · "Important data-center factors for a bank" (Combined AME 2023) · "Move the bank's data center to the cloud: strategy" (Combined AE-IT 2024) · "Energy-efficiency challenges in data centers" (BB AME 2023).

### Picture it

**Virtualization = turning one big house into flats.** You own one large building (a powerful server). Instead of one family using it and leaving most rooms empty, you divide it into several **flats (virtual machines)**. Each flat has its own door, kitchen and lock (its own OS and apps). The **landlord (the hypervisor)** gives each flat its share of water and electricity (CPU, RAM, disk) and makes sure no tenant enters another's flat.

**Cloud = renting a flat instead of building a house.** You pay monthly, the owner handles repairs, and you can move to a bigger flat any time.

**Cloud models as pizza:**

- **IaaS:** they give you the **kitchen and oven**; you bring the ingredients and cook.
- **PaaS:** they give you a **ready base**; you add your toppings.
- **SaaS:** they **deliver the finished pizza**; you just eat.

### Understand it step by step

**1. Virtualization** creates virtual versions of hardware (servers, storage, networks) using software. One physical server runs many **virtual machines (VMs)**, each behaving like a separate computer.

**2. VM diagram (draw this):**

| Layer of the drawing | What it holds                                   |
| -------------------- | ----------------------------------------------- |
| Top                  | VM 1, VM 2, VM 3, each with its own OS and apps |
| Middle               | **Hypervisor**                                  |
| Bottom               | Physical hardware: CPU, RAM, disk, network card |

**3. Two types of hypervisor:**

| Type               | Runs on                  | Examples                                        | Used in             |
| ------------------ | ------------------------ | ----------------------------------------------- | ------------------- |
| Type 1, bare metal | Directly on the hardware | VMware ESXi, Microsoft Hyper-V, KVM, Citrix Xen | Data centers, banks |
| Type 2, hosted     | On top of an ordinary OS | Oracle VirtualBox, VMware Workstation           | Laptops, testing    |

**Top 5 virtualization platforms:** VMware vSphere/ESXi, Microsoft Hyper-V, KVM, Citrix XenServer, Oracle VirtualBox.

**4. How virtualization helps a physical server (benefits):**

1. **Consolidation:** 10 lightly used servers become 10 VMs on 1–2 physical servers.
2. **Cost saving:** less hardware, power, cooling and floor space.
3. **Isolation:** a crash or virus in one VM doesn't affect the others.
4. **Snapshots:** save a VM's state before an update; roll back if it fails.
5. **Live migration:** move a running VM to another server with no downtime (for maintenance).
6. **Fast provisioning:** a new server in minutes from a template.
7. **Easier disaster recovery:** VMs are files, so they can be copied to a DR site.

**5. Cloud service models:**

| Model                     | You manage                  | Provider manages                           | Examples                                               |
| ------------------------- | --------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| **IaaS** (Infrastructure) | OS, middleware, apps, data  | Hardware, network, storage, virtualization | AWS EC2, Azure Virtual Machines, Google Compute Engine |
| **PaaS** (Platform)       | Your apps and data          | Everything up to the runtime               | Google App Engine, Heroku, Azure App Service           |
| **SaaS** (Software)       | Only your data and settings | Everything                                 | Gmail, Microsoft 365, Salesforce, Zoom                 |

**6. Multi-tenant SaaS:** one copy of the software serves many customers (tenants), and each tenant's data is kept separate. Like one apartment building with many families: cheaper to run and to update, but if isolation fails, one tenant could see another's data. For a **multi-vendor e-commerce** app: one shared database is simpler, cheaper and makes cross-vendor reports easy; a database per vendor gives stronger isolation, customization and fault containment. Small platform → shared; large or sensitive → separate.

**7. Data-center factors for a bank.** Remember **"Smart People Can Never Drop Customers"**:

- **S**ecurity: physical (access cards, biometrics, CCTV, guards) and cyber (NGFW, IDS/IPS, encryption, SIEM).
- **P**ower: dual power feeds, UPS, generator, N+1 redundancy.
- **C**ooling: precision air conditioning, hot/cold aisles, fire suppression (FM-200 gas, not water).
- **N**etwork: multiple ISPs, redundant switches and routers, low latency.
- **D**isaster recovery: a DR site in another seismic zone, replication, defined RTO and RPO.
- **C**ompliance: Bangladesh Bank ICT Security Guideline, PCI DSS, audits, Tier III/IV design, 24/7 monitoring.

**8. Moving the bank to the cloud, in 6 steps:** assess and classify workloads → choose the model (hybrid: sensitive core banking stays on-premises, the rest goes to cloud) → check regulation and data location → plan security (encryption, IAM, MFA) → migrate in phases, starting with non-critical systems (lift-and-shift, then re-platform) → test, monitor, optimize cost.

### Bangla core

একটি বড় সার্ভারকে সফটওয়্যার (হাইপারভাইজার) দিয়ে অনেকগুলো আলাদা কম্পিউটারে (VM) ভাগ করাই ভার্চুয়ালাইজেশন — যেমন একটি বড় বাড়িকে অনেকগুলো ফ্ল্যাটে ভাগ করা।

### Mindmap

```mindmap
Virtualization & cloud
  Virtualization
    Server → VMs → hypervisor
    Type 1: bare metal (ESXi, Hyper-V)
    Type 2: on an OS (VirtualBox)
    Benefits: fewer servers, isolation, snapshots
  Cloud models
    IaaS: you get the machine
    PaaS: you get the platform
    SaaS: you get the app
  Bank data center
    Security · Power · Cooling
    Network · DR · Compliance
  Moving to cloud
    Classify data, check regulator rules
    Pilot, migrate, keep DR
```

### Remember it

- **House → flats → landlord** = server → VMs → hypervisor.
- **Type 1 = bare metal (on the floor). Type 2 = on top of an OS (on a table).**
- **Pizza: IaaS kitchen, PaaS base, SaaS delivered.**
- Bank data center: **Smart People Can Never Drop Customers** = Security, Power, Cooling, Network, DR, Compliance.

### Exam trap

Calling Gmail PaaS. Anything you just log in and use is **SaaS**.

### Exam answer: "What is virtualization? Benefits" (10 marks)

> **Virtualization** is a technology that creates virtual versions of computing resources such as servers, storage and networks on a single physical machine. A software layer called a **hypervisor** sits between the hardware and the virtual machines and allocates CPU, memory and storage to each VM, so several operating systems run independently on one server.
>
> &#91;Draw the VM diagram: hardware → hypervisor → VM 1, VM 2, VM 3.\]
>
> **Types:** Type 1 (bare-metal) hypervisors such as VMware ESXi and Hyper-V run directly on hardware; Type 2 (hosted) hypervisors such as VirtualBox run on an existing OS.
>
> **Benefits:**
>
> 1. **Server consolidation:** many workloads on fewer physical servers.
> 2. **Lower cost:** savings in hardware, power, cooling and space.
> 3. **Isolation and security:** a fault in one VM does not affect others.
> 4. **Snapshots:** quick backup and rollback.
> 5. **High availability:** live migration of VMs without downtime.
> 6. **Fast provisioning:** new servers created in minutes.
> 7. **Simpler disaster recovery:** VMs can be replicated to a DR site.
>
> **Top five platforms:** VMware vSphere/ESXi, Microsoft Hyper-V, KVM, Citrix XenServer and Oracle VirtualBox.
>
> **Conclusion:** virtualization is the foundation of cloud computing and of modern bank data centers.

### Recall check

1. Type 1 vs Type 2 hypervisor: one example of each.
2. Is Microsoft 365 IaaS, PaaS or SaaS?
3. Name the six data-center factors for a bank from the mnemonic.

## 8. Backup, recovery, DR and BCP

**Past questions (asked 3×):** "Data recovery vs data backup, with real-world examples" (Rupali ANE 2023) · "Incremental vs differential backup; which suits a banking system?" (Sonali DBA 2024) · "IT disaster recovery and business continuity plan for your data center" (Combined SO-IT 2024) · "0-bit data loss for 24×7×365 online banking" (Combined SO-IT 2023) · "Database data-loss case study" (Sonali DBA 2024).

### Picture it

You are writing a **thesis notebook** and you're afraid of losing it.

- **Full backup:** every Friday you **photocopy the whole notebook**. Safe, but slow and uses a lot of paper.
- **Incremental backup:** every other day you photocopy **only the pages changed since yesterday's copy**. Quick each day, but to rebuild the notebook you need Friday's copy **plus every daily copy** in order.
- **Differential backup:** every other day you photocopy **all pages changed since Friday**. Each day's copy grows a bit, but to rebuild you need only **Friday's copy plus the latest one**.

**Backup** is making the photocopies. **Recovery** is using them to rebuild the notebook after it falls in the rain.

### Understand it step by step

**1. Backup vs recovery:**

| Backup                                                            | Recovery                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------- |
| Copying data to a separate place **before** a problem             | Restoring data **after** loss, damage or corruption      |
| Done regularly and automatically                                  | Done when needed                                         |
| Needs extra storage                                               | Uses the backups                                         |
| Example: nightly copy of the core banking database to the DR site | Example: restoring yesterday's copy after a server crash |

**2. The three backup types:**

| Point         | Full     | Incremental                                   | Differential                           |
| ------------- | -------- | --------------------------------------------- | -------------------------------------- |
| Copies        | All data | Changes since the **last backup of any type** | Changes since the **last full** backup |
| Backup speed  | Slowest  | Fastest                                       | Medium (grows each day)                |
| Storage       | Most     | Least                                         | Medium                                 |
| Restore needs | 1 set    | Last full + **every** incremental since       | Last full + **latest** differential    |
| Restore speed | Fastest  | Slowest                                       | Fast                                   |

**Example:** full backup on Friday, crash on Tuesday morning.

- Incremental: restore Friday full → Saturday → Sunday → Monday (**4 sets**, and if one is damaged, the chain breaks).
- Differential: restore Friday full → Monday's differential (**2 sets**).

**3. Which suits a bank?** A bank cares most about **restoring quickly** (customers are waiting). So: **weekly full + daily differential**, plus **continuous transaction-log backups** so the database can be restored to the exact minute before the failure (point-in-time recovery). Keep backups encrypted and follow the **3-2-1 rule**: **3** copies of data, on **2** different media, **1** copy off-site.

**4. Two numbers that drive every plan:**

- **RPO (Recovery Point Objective):** how much data you can afford to lose, measured in time. RPO = 1 hour → back up at least hourly. For core banking, RPO ≈ 0.
- **RTO (Recovery Time Objective):** how long you can afford to be down. RTO = 2 hours → systems must be running again within 2 hours.

Picture: **RPO looks back** (how much work is lost), **RTO looks forward** (how long until we're open again).

**5. "0-bit data loss" (RPO = 0) for 24×7×365 banking:** synchronous real-time replication to a second data center, database clustering (e.g. Always On availability groups), RAID 10 storage, transaction-log backups, load balancing, redundant power and network, encryption, and regular DR drills.

**6. DR vs BCP:**

- **Disaster Recovery (DR):** restoring **IT systems and data** after a disaster: servers, databases, network.
- **Business Continuity Plan (BCP):** keeping the **whole bank working** during and after a disaster: people, branches, customer communication, manual workarounds. **DR is one part of BCP.**

**7. DR sites:** **hot site** (fully running copy, takes over in minutes, costliest), **warm site** (hardware ready, data needs loading, hours), **cold site** (empty room with power, days).

### Bangla core

ব্যাকআপ হলো সমস্যার আগে কপি রাখা; রিকভারি হলো সমস্যার পরে সেই কপি থেকে ফেরত আনা। Incremental = গতকালের পর যা বদলেছে; Differential = শেষ Full এর পর যা বদলেছে।

### Mindmap

```mindmap
Backup & DR
  Backup types
    Full: everything, slow to take
    Incremental: since last backup, small
    Differential: since last full
  Restore
    Incremental: full + every piece
    Differential: full + latest diff
  Rules
    3 copies · 2 media · 1 off-site
    Test restores regularly
  Targets
    RPO: how much data you can lose
    RTO: how fast you must be back
  DR vs BCP
    DR fixes the systems
    BCP keeps the bank open
```

### Remember it

- **I**ncremental = **I**tsy-bitsy pieces (smallest copies, slowest restore). **D**ifferential = **D**ifference from the full (two sets to restore).
- **3-2-1:** 3 copies, 2 media, 1 off-site.
- **RPO = data (Point in the past). RTO = Time to come back.**
- **DR fixes the computers; BCP keeps the bank open.**

### Exam trap

Mixing up the base of incremental and differential. Incremental is from the **last backup (any type)**; differential is always from the **last full**.

### Exam answer: "Incremental vs differential; which suits banking?" (10 marks)

> **Data backup** is the process of copying data to a separate storage location so it can be restored if the original is lost. **Data recovery** is the process of restoring lost, damaged or corrupted data from those backups.
>
> An **incremental backup** copies only the data changed since the last backup of any type. A **differential backup** copies all data changed since the last full backup.
>
> &#91;Comparison table: what is copied, backup time, storage, restore needs, restore speed.\]
>
> **Example:** with a full backup on Friday and a failure on Tuesday, incremental recovery needs Friday's full backup plus the Saturday, Sunday and Monday incrementals, while differential recovery needs only Friday's full backup and Monday's differential.
>
> **For a banking system, differential backup is more suitable** because restoration is faster and depends on only two backup sets, which reduces downtime (RTO) and the risk of a broken chain. In practice a bank combines a weekly full backup, daily differential backups and continuous transaction-log backups for point-in-time recovery, following the 3-2-1 rule.
>
> **Conclusion:** the right backup strategy is chosen from the bank's RPO and RTO; for critical banking data, fast and reliable recovery matters more than saving storage.

### Recall check

1. Full on Sunday, failure on Thursday: how many sets do you restore with incremental, and with differential?
2. What do RPO and RTO each measure?
3. What is the difference between DR and BCP?

## 9. SQL: query analysis and joins

**Past questions (2× for the same query, plus many SQL writing questions):** "Analyze the output of this SQL" (the identical query in Sonali & Janata 2023 and Rupali ANE 2023) · "Customers and Orders: explain the inner, left, right and full join results" (Combined SO-IT 2024) · "SQL query for the second-highest salary" (BB AP 2016) · "Total adoptions on 30 June 2024 per animal type" (Combined Officer 2024) · "Number of romantic comedies" (BB AP 2023) · "GROUP BY; average salary" (Combined AP 2024).

### Picture it

A SQL query is like **a teacher preparing a result sheet**:

1. **FROM / JOIN:** take out the attendance register and join it with the marks register.
2. **WHERE:** remove students who were absent (filter **individual rows**).
3. **GROUP BY:** put the remaining students into groups by section.
4. **HAVING:** keep only sections with more than 2 students (filter **whole groups**).
5. **SELECT:** write the section name and its average mark on the sheet.
6. **ORDER BY:** sort the sheet from highest average to lowest.

That is exactly the order the database runs a query, even though we **write** SELECT first.

### Understand it step by step

**1. The running order (memorize it):** **FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**.

**2. WHERE vs HAVING:**

| WHERE                                   | HAVING                  |
| --------------------------------------- | ----------------------- |
| Filters **rows**                        | Filters **groups**      |
| Runs **before** GROUP BY                | Runs **after** GROUP BY |
| Cannot use aggregates (COUNT, AVG, SUM) | Uses aggregates         |
| `WHERE salary > 50000`                  | `HAVING COUNT(*) > 2`   |

**3. The repeated past query:**

```sql
SELECT d.department_name, AVG(e.salary) AS average_salary
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > (SELECT AVG(salary) FROM employees)
GROUP BY d.department_name
HAVING COUNT(*) > 2
ORDER BY average_salary DESC;
```

**Analyze it in the running order:**

1. **Subquery:** `(SELECT AVG(salary) FROM employees)` finds the company-wide average salary, say 40,000.
2. **FROM + JOIN:** each employee row is matched with its department, so we know the department name.
3. **WHERE:** keeps only employees earning **more than 40,000**.
4. **GROUP BY:** groups those high earners by department.
5. **HAVING:** keeps only departments with **more than 2** high earners.
6. **SELECT:** shows the department name and the **average salary of its high earners**.
7. **ORDER BY … DESC:** highest average first.

**In one sentence:** "The query lists departments that have more than two employees earning above the company average, with the average salary of those employees, sorted from highest to lowest."

**4. Joins: picture two overlapping circles**, Customers on the left and Orders on the right.

- **INNER JOIN** = only the overlap (customers who have orders).
- **LEFT JOIN** = the whole left circle; no match → NULL on the right.
- **RIGHT JOIN** = the whole right circle; no match → NULL on the left.
- **FULL JOIN** = both circles completely.

**The past-paper tables:** Customers = 1 Rahim, 2 Karim, 3 Belal, 4 Rony, 5 Helal. Orders (order id, amount, customer id) = (1, 200, 10), (2, 500, 3), (3, 300, 6), (4, 800, 5), (5, 150, 8). Only customers **3 (Belal)** and **5 (Helal)** appear in Orders.

| Join  | Rows | Result                                                              |
| ----- | ---- | ------------------------------------------------------------------- |
| INNER | 2    | Belal – 500, Helal – 800                                            |
| LEFT  | 5    | Belal – 500, Helal – 800, Rahim – NULL, Karim – NULL, Rony – NULL   |
| RIGHT | 5    | Belal – 500, Helal – 800, NULL – 200, NULL – 300, NULL – 150        |
| FULL  | 8    | 2 matched + 3 customers without orders + 3 orders without customers |

**Quick count rule:** inner = matches · left = all left rows · right = all right rows · full = matches + unmatched left + unmatched right.

**5. Second-highest salary (two ways):**

```sql
-- Way 1: the biggest salary that is smaller than the maximum
SELECT MAX(salary) FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- Way 2: sort, skip the first, take one
SELECT DISTINCT salary FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

**6. Count per group with a filter (the Pet Society pattern):**

```sql
SELECT a.Type, COUNT(*) AS TotalAdoptions
FROM Animals a
JOIN Adoption ad ON a.ID = ad.AnimalID
WHERE ad.AdoptDate = '2024-06-30'
GROUP BY a.Type;
```

Template for any "how many per …" question: **JOIN the tables → WHERE the condition → GROUP BY the "per" column → COUNT(\*)**.

### Bangla core

WHERE আলাদা আলাদা সারি ছাঁকে, HAVING গ্রুপ ছাঁকে। INNER JOIN = দুই টেবিলেই আছে এমন; LEFT JOIN = বামের সব, না মিললে NULL।

### Mindmap

```mindmap
SQL
  Running order
    FROM → WHERE → GROUP BY
    HAVING → SELECT → ORDER BY
  Filters
    WHERE: rows, before grouping
    HAVING: groups, uses COUNT/AVG
  Joins
    INNER: matches only
    LEFT / RIGHT: one side kept whole
    FULL: both sides kept
  Classic queries
    2nd highest: MAX below MAX
    Above average: salary > (SELECT AVG)
    Duplicates: GROUP BY … HAVING COUNT > 1
  Analysis answer
    Read clause by clause in running order
```

### Remember it

- **Running order:** **F**ancy **W**aiters **G**ive **H**ot **S**oup **O**nly = From, Where, Group by, Having, Select, Order by.
- **WHERE = students, HAVING = sections.**
- **Joins = two circles:** middle, left circle, right circle, both.
- **Second highest = "max of everything below the max".**

### Exam trap

Writing `WHERE COUNT(*) > 2` or `WHERE AVG(salary) > …`: that is an error. Aggregates in a condition always go in **HAVING** (or in a subquery).

### Exam answer: "Analyze the output of the SQL" (10 marks)

> The query joins the **employees** table with the **departments** table on department_id, so each employee is linked to a department name.
>
> 1. The subquery `SELECT AVG(salary) FROM employees` calculates the average salary of all employees.
> 2. The WHERE clause keeps only employees whose salary is greater than this overall average.
> 3. GROUP BY department_name groups these employees by department.
> 4. HAVING COUNT(\*) > 2 keeps only departments that have more than two such employees.
> 5. SELECT returns each department name and the average salary of its above-average employees, named average_salary.
> 6. ORDER BY average_salary DESC sorts the result from the highest average to the lowest.
>
> **Output:** a list of departments that have more than two employees earning above the company average, together with the average salary of those employees, in descending order of that average.
>
> **Note:** the order of execution is FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

### Recall check

1. Why can't WHERE use AVG()?
2. In the Customers/Orders example, how many rows does a LEFT JOIN return, and why?
3. Write the second-highest salary query from memory.

## 10. Must-write C programs

**Past questions (each family 2–3×):** primes from 1 to n (Combined AP 2024, Combined SO-IT 2024) · Fibonacci up to 100 numbers (BB AP 2016) and Fibonacci output with complexity (Rupali 2023) · recursive F(5) output (Sonali & Janata 2023) · series 1+2+4+7+11+… (Combined AP 2024) · e^x series (Sonali DBA 2024) · 1, 2, 2, 3, 3, 3 … with complexity (Sonali & Janata 2023) · matrix product, average, max (Combined SO-IT 2023) · row and column sums (Combined SO-IT 2024) · LCM (BB AP 2023) · Floyd's binary triangle (Combined AP 2024) · recursion trace (Combined AP 2024).

### Picture it

Nearly every exam program is built from **three bricks**:

1. **A counter loop** (`for i = 1 to n`): walks through numbers.
2. **A test** (`if`): checks something about each number (is it prime? is it even?).
3. **A running total** (`sum`, `max`, `count`): remembers the answer as you go.

Learn to see these three bricks in each question, and you can write programs you have never practised.

### Understand it step by step

**How examiners mark:** correct logic (most marks) → a clean structure (`#include`, `main`, `return 0`) → a sample input/output → time and space complexity in one line. A missing semicolon costs little; wrong logic costs a lot. **Always write the sample output and the complexity.**

**1. Primes from 1 to n.** Idea: a number is prime if **no number from 2 to its square root divides it**. Why the square root? If 36 = 4 × 9, one factor is always ≤ 6 (√36), so checking up to 6 is enough.

```c
#include <stdio.h>
int main() {
    int n, i, j, isPrime;
    printf("Enter n: ");
    scanf("%d", &n);
    for (i = 2; i <= n; i++) {          /* 1 is not prime */
        isPrime = 1;
        for (j = 2; j * j <= i; j++) {
            if (i % j == 0) { isPrime = 0; break; }
        }
        if (isPrime) printf("%d ", i);
    }
    return 0;
}
/* Input: 20  Output: 2 3 5 7 11 13 17 19
   Time O(n√n), Space O(1) */
```

**2. Fibonacci series (n terms).** Idea: each term = sum of the previous two. Keep only the last two in `a` and `b` and slide forward.

```c
int n, i;
long long a = 0, b = 1, next;
scanf("%d", &n);
for (i = 1; i <= n; i++) {
    printf("%lld ", a);
    next = a + b;   /* new term   */
    a = b;          /* slide left */
    b = next;
}
/* n = 10 → 0 1 1 2 3 5 8 13 21 34   Time O(n), Space O(1) */
```

For "up to 100 numbers" use `long long` or `double`; terms soon exceed `int`. **Recursive version** `F(n) = F(n-1) + F(n-2)`, with F(0) = 0 and F(1) = 1: F(5) = **5**, but it takes O(2ⁿ) time because it recalculates the same values.

**3. Series 1 + 2 + 4 + 7 + 11 + … (n terms).** Look at the gaps: +1, +2, +3, +4 … The gap grows by 1 each time.

```c
int n, i, term = 1, sum = 0;
scanf("%d", &n);
for (i = 1; i <= n; i++) {
    sum += term;
    term += i;      /* next gap is i */
}
printf("Sum = %d", sum);
/* n = 5 → 1+2+4+7+11 = 25   Time O(n) */
```

**4. e^x = 1 + x/1! + x²/2! + x³/3! + …** Don't compute powers and factorials separately. Each term = previous term × x / i.

```c
int n, i;
double x, term = 1, sum = 1;
scanf("%lf %d", &x, &n);
for (i = 1; i < n; i++) {
    term = term * x / i;
    sum += term;
}
printf("e^%.2f = %.4f", x, sum);
/* x = 1, n = 10 → 2.7183   Time O(n) */
```

**5. 1, 2, 2, 3, 3, 3 … (each number i printed i times, up to 100).** Two loops: the outer picks the number, the inner repeats it.

```c
for (i = 1; i <= 100; i++)
    for (j = 1; j <= i; j++)
        printf("%d ", i);
```

**Complexity:** total prints = 1 + 2 + … + n = n(n+1)/2 → **O(n²)**. For n = 100, that is 5,050 prints.

**6. GCD and LCM.** Euclid's idea: GCD(a, b) = GCD(b, a mod b), until b = 0. Then **LCM = a × b / GCD**.

```c
int a, b, x, y, t;
scanf("%d %d", &a, &b);
x = a; y = b;
while (y != 0) { t = y; y = x % y; x = t; }
printf("GCD = %d, LCM = %d", x, a / x * b);
/* 12 18 → GCD = 6, LCM = 36   Time O(log min(a,b)) */
```

**7. Matrix product C = A × B.** Rule: **columns of A must equal rows of B**. C\[i\]\[j\] = row i of A · column j of B.

```c
if (c1 != r2) { printf("Multiplication not possible"); return 0; }
for (i = 0; i < r1; i++)
    for (j = 0; j < c2; j++) {
        C[i][j] = 0;
        for (k = 0; k < c1; k++)
            C[i][j] += A[i][k] * B[k][j];
    }
/* Time O(r1 · c2 · c1), O(n³) for square matrices */
```

**Average** of a matrix = sum of all elements ÷ (rows × cols). **Max** = start with `max = C[0][0]`, update when a bigger element appears.

**8. Row and column sums of an m × n matrix.**

```c
int colSum[10] = {0};
for (i = 0; i < m; i++) {
    rowSum = 0;
    for (j = 0; j < n; j++) {
        rowSum += a[i][j];
        colSum[j] += a[i][j];
    }
    printf("Row %d sum = %d\n", i + 1, rowSum);
}
for (j = 0; j < n; j++) printf("Column %d sum = %d\n", j + 1, colSum[j]);
/* Time O(m·n) */
```

**9. Floyd's binary triangle** (1 / 0 1 / 1 0 1 / 0 1 0 1 / 1 0 1 0 1). Pattern: print **1 when (row + column) is even**, else 0.

```c
for (i = 1; i <= n; i++) {
    for (j = 1; j <= i; j++)
        printf("%d ", (i + j) % 2 == 0 ? 1 : 0);
    printf("\n");
}
```

**10. Recursion trace (Combined AP 2024).**

```c
void fun(int x) {
    if (x < 0) return;
    printf("%d\n", x--);   /* print, THEN decrease */
    fun(--x);              /* decrease, THEN call  */
    printf("%d\n", x);
}
/* fun(5) prints: 5 3 1 -1 1 3 */
```

**Trace it like a ladder going down, then up:**

| Call    | Prints first | x after `x--` | Calls with `--x` | Prints after return |
| ------- | ------------ | ------------- | ---------------- | ------------------- |
| fun(5)  | 5            | 4             | fun(3)           | 3                   |
| fun(3)  | 3            | 2             | fun(1)           | 1                   |
| fun(1)  | 1            | 0             | fun(−1)          | −1                  |
| fun(−1) | returns      | —             | —                | —                   |

Read column 2 going **down** (5, 3, 1), then column 5 going **up** (−1, 1, 3) → **5 3 1 −1 1 3**.

### Bangla core

প্রায় সব প্রোগ্রাম ৩টি ইট দিয়ে তৈরি: লুপ (গনা), if (পরীক্ষা), আর একটি জমানো মান (sum/max/count)। x-- আগে ব্যবহার, পরে কমায়; --x আগে কমায়, পরে ব্যবহার।

### Mindmap

```mindmap
C programs
  Three bricks
    Loop · test · running total
  Number programs
    Prime: test 2 … √n
    Fibonacci: add, slide, slide
    GCD: Euclid, LCM = a×b/GCD
  Series
    Find the gap pattern first
    e^x: term = term × x / i
  Arrays & matrices
    One pass for min, max, sum
    A×B: cols(A) = rows(B)
  Tracing
    x-- use then drop, --x drop then use
    Integer division cuts the fraction
  Big-O
    One loop O(n), nested O(n²)
```

### Remember it

- **Three bricks:** loop, test, running total.
- **Prime:** check only up to √n; start from 2.
- **Fibonacci:** "add, slide, slide" (next = a + b; a = b; b = next).
- **e^x:** "term × x ÷ i".
- **LCM = product ÷ GCD.**
- **x-- = use then drop. --x = drop then use.**
- **Nested loops 1 + 2 + … + n = O(n²).**

### Exam trap

Starting the prime loop at 1 (1 is not prime). Forgetting the matrix-size check before multiplying. Mixing up `x--` and `--x` in a trace.

### Recall check

1. Write the prime program from memory, then check it.
2. What does fun(4) print with the code above?
3. Why is the 1, 2, 2, 3, 3, 3 … program O(n²)?

## 11. Cache and memory hierarchy

**Past questions (2× for the same cache question, 3× for the hierarchy):** "16 KB of data in a direct-mapped cache with 4-word blocks, 32-bit address: sizes of tag, index and offset" (BB AME 2023) · "How many total bits does that cache need?" (Combined Officer 2024) · "Main memory 100 ns, cache 50 ns, hit rate 90%: average read time" (BB AME 2017) · "CPU register vs cache vs main vs secondary memory" (Combined SO-IT 2023) · "Memory organization; SRAM vs DRAM" and "Physical vs virtual memory" (Combined AME 2023).

### Picture it

**The memory hierarchy is your study desk.**

- **Registers = what's in your hand right now.** Instant, but you can hold only a few things.
- **Cache = the books open on your desk.** Very quick to reach, little space.
- **Main memory (RAM) = the bookshelf in your room.** Takes a few seconds, holds much more.
- **Secondary storage (SSD/HDD) = the library down the road.** Slow, but holds everything, and it's still there tomorrow (non-volatile).

You keep what you're using **close**, and the rest **further away**. That is the whole idea.

**A cache address is a hotel booking.** The hotel (cache) has 1,024 rooms (lines). Each room has 16 beds (bytes in a block).

- **Offset = which bed** inside the room.
- **Index = which room** number.
- **Tag = the guest's name on the booking.** Many guests share the same room number over time, so the receptionist checks the name to be sure it's the right guest.

### Understand it step by step

**1. The hierarchy, top to bottom:**

| Level          | Built from                | Speed            | Size     | Volatile? |
| -------------- | ------------------------- | ---------------- | -------- | --------- |
| Registers      | Flip-flops inside the CPU | Fastest (< 1 ns) | Bytes    | Yes       |
| Cache L1/L2/L3 | SRAM                      | \~1–10 ns        | KB to MB | Yes       |
| Main memory    | DRAM                      | \~50–100 ns      | GB       | Yes       |
| Secondary      | SSD, HDD                  | µs to ms         | TB       | No        |

Going down: **slower, bigger, cheaper per bit**. It works because of **locality**: programs reuse the same data soon (temporal) and use nearby addresses (spatial).

**2. Splitting a cache address:** | **Tag** | **Index** | **Offset** |

- Offset bits = log₂(block size in bytes)
- Index bits = log₂(number of cache lines)
- Tag bits = address bits − index − offset

**3. The past question, worked out (16 KB data, 4-word blocks, 32-bit address):**

1. One word = 4 bytes on a 32-bit machine. Block = 4 words × 4 bytes = 16 bytes = 2⁴ → **offset = 4 bits**.
2. Number of lines = 16 KB ÷ 16 B = 2¹⁴ ÷ 2⁴ = 2¹⁰ = 1,024 → **index = 10 bits**.
3. **Tag = 32 − 10 − 4 = 18 bits.**
4. **Total bits** (the 2024 version): each line stores 16 bytes of data (128 bits) + an 18-bit tag + 1 valid bit = **147 bits**. Total = 1,024 × 147 = **150,528 bits ≈ 147 Kbits** (about 18.4 KB), more than the 16 KB of data.

**4. Average memory access time (100 ns main, 50 ns cache, 90% hit).** Write your assumption, then calculate:

- **Cache checked first, then memory on a miss** (the usual assumption):

```latex
T = h \times t_c + (1 - h)(t_c + t_m) = 0.9 \times 50 + 0.1 \times (50 + 100) = 45 + 15 = 60\ \text{ns}
```

- **Cache and memory searched at the same time:** T = 0.9 × 50 + 0.1 × 100 = 45 + 10 = **55 ns**.

**5. SRAM vs DRAM:**

| Point            | SRAM (Static)            | DRAM (Dynamic)                                      |
| ---------------- | ------------------------ | --------------------------------------------------- |
| Cell             | Flip-flop, 6 transistors | 1 transistor + 1 capacitor                          |
| Refresh          | Not needed               | Needed every few milliseconds (the capacitor leaks) |
| Speed            | Faster                   | Slower                                              |
| Cost and density | Expensive, less dense    | Cheap, dense                                        |
| Used as          | Cache                    | Main memory (RAM)                                   |

**6. Physical vs virtual memory:** physical memory is the real RAM chips. **Virtual memory** uses part of the disk as an extension of RAM: each program sees a large address space split into **pages**, and the OS keeps only the needed pages in RAM (**frames**). If a needed page isn't in RAM, a **page fault** loads it from disk. Advantages: run more or bigger programs than RAM allows, isolation between programs. Disadvantages: disk is slow; too much paging causes **thrashing**.

### Bangla core

কাছের জিনিস দ্রুত কিন্তু ছোট, দূরের জিনিস ধীর কিন্তু বড় — এটাই মেমোরি হায়ারার্কি। অফসেট = ব্লকের ভেতরে কোন বাইট, ইন্ডেক্স = কোন লাইন, ট্যাগ = সঠিক ব্লক কিনা যাচাই।

### Mindmap

```mindmap
Cache & memory
  Hierarchy
    Register → cache → RAM → disk
    Faster and smaller going up
  Cache address
    Offset = byte in the block
    Index = which line
    Tag = what is left
  Solve in order
    Offset bits = log₂(block size)
    Index bits = log₂(lines)
    Tag = address bits − index − offset
  Access time
    Avg = hit × cache + miss × (cache + RAM)
  RAM types
    SRAM: static, fast, cache
    DRAM: refresh, cheap, main memory
```

### Remember it

- **Desk ladder:** hand → desk → shelf → library = register → cache → RAM → disk.
- **Hotel booking:** offset = bed, index = room, tag = guest's name.
- **Order of solving:** offset first (block size), index next (number of lines), tag last (what's left).
- **S**RAM = **S**tatic = **S**peedy, no refresh, cache. **D**RAM = **D**ynamic = **D**rains, needs refresh, main memory.

### Exam trap

Forgetting to convert **words to bytes** (4-word block = 16 bytes, not 4), and leaving out the **valid bit** when asked for "total bits".

### Exam answer: "CPU register, cache, main and secondary memory" (10 marks)

> Computer memory is organized as a **hierarchy** to balance speed, cost and capacity. Faster memory is smaller and more expensive, so it is placed closest to the CPU.
>
> &#91;Draw a pyramid: registers at the top, then cache, main memory, secondary storage at the base. Arrow down: "capacity increases"; arrow up: "speed and cost per bit increase".\]
>
> 1. **CPU registers** are a few small, very fast storage locations inside the CPU, such as the accumulator, program counter and instruction register. They hold the data being processed right now.
> 2. **Cache memory** is a small, high-speed SRAM between the CPU and main memory. It stores frequently used instructions and data so the CPU does not wait for RAM. It has levels L1, L2 and L3.
> 3. **Main memory (RAM)** is DRAM that holds the programs and data currently in use. It is volatile and much larger than cache.
> 4. **Secondary memory** (HDD, SSD) is non-volatile storage for programs and files. It is the largest and slowest; data must be loaded into RAM before the CPU uses it.
>
> &#91;Comparison table: location, technology, speed, size, cost, volatility.\]
>
> **Conclusion:** the hierarchy works because of locality of reference: programs tend to reuse recent data and access nearby addresses, so a small fast memory serves most requests.

### Recall check

1. 32 KB cache, 8-word blocks, 32-bit address: find tag, index and offset.
2. Why does DRAM need refreshing but SRAM doesn't?
3. Hit rate 95%, cache 10 ns, memory 100 ns: average access time (cache first)?

## 12. Cryptography and digital signatures

**Past questions (asked 2× plus related ones):** "What is cryptography? Symmetric vs asymmetric with example; diagram of public-key encryption using a hash for e-commerce" (Combined SO-IT 2023) · "Symmetric vs asymmetric; types of ciphers; factors for cryptographic strength" (Rupali ANE 2023) · "Digital signature vs digital certificate" (Sonali & Janata 2023) · "Man-in-the-middle attack on Diffie-Hellman" (BB AP 2023) · "Attacker steals a TLS website's private key" (Combined AP 2023) · "TLS 1.2 vs 1.3" (Rupali 2023).

### Picture it

**Symmetric encryption = one house key with a copy.** You and your friend each have a copy of the same key. Whatever one locks, the other unlocks. Fast and simple, but how do you get the copy to your friend safely? If a thief copies it on the way, he can open everything.

**Asymmetric encryption = a letterbox with a slot.** Anyone can drop a letter through the slot (the **public key** is given to everyone). Only you have the key to open the box (the **private key**, never shared). No need to send any secret key.

**Digital signature = your personal seal (seal-mohor).** Only you own the seal (private key). Anyone who has seen your seal's pattern (public key) can check that the letter really came from you and wasn't changed.

**Digital certificate = a national ID card for a public key.** A trusted authority (the CA, like the passport office) confirms: "this public key really belongs to Sonali Bank."

### Understand it step by step

**1. Cryptography** turns readable **plaintext** into unreadable **ciphertext** using an algorithm and a **key**, so only authorized people can read it. It gives four things: **confidentiality** (secret), **integrity** (not changed), **authentication** (who sent it) and **non-repudiation** (the sender can't deny it).

**2. Symmetric vs asymmetric:**

| Point       | Symmetric                           | Asymmetric                            |
| ----------- | ----------------------------------- | ------------------------------------- |
| Keys        | One shared secret key               | A pair: public key + private key      |
| Speed       | Fast                                | Slow (heavy maths)                    |
| Key sharing | Hard: the key must be sent secretly | Easy: the public key can be published |
| Key length  | 128–256 bits                        | 2,048+ bits (RSA)                     |
| Used for    | Encrypting large data               | Key exchange, digital signatures      |
| Algorithms  | AES, DES, 3DES, Blowfish            | RSA, ECC, Diffie-Hellman, DSA         |

**3. Best of both (hybrid), how HTTPS works:** the browser uses the bank's **public key** (asymmetric) to agree a random **session key**; then all data is encrypted with that session key using **AES** (symmetric). Asymmetric solves key sharing; symmetric gives speed.

**4. Hash function:** turns any message into a short fixed-size "fingerprint" (e.g. SHA-256 gives 256 bits). The same message always gives the same hash; change one letter and the hash changes completely; you can't reverse a hash to get the message. Used to check **integrity**.

**5. How a digital signature works:**

1. The sender makes a **hash** of the message.
2. The sender encrypts the hash with **their own private key** → this is the signature.
3. The message and signature are sent.
4. The receiver decrypts the signature with the **sender's public key** to get the hash.
5. The receiver hashes the received message and **compares**. Same → genuine and unchanged.

**6. Digital signature vs digital certificate:**

| Point          | Digital signature                                    | Digital certificate                                              |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| What it proves | This message came from the sender and wasn't changed | This public key belongs to this person or website                |
| Created by     | The sender, with their private key                   | A Certificate Authority (CA)                                     |
| Contains       | An encrypted hash                                    | Owner's name, public key, validity dates, CA's signature (X.509) |
| Used in        | Signing documents, transactions, emails              | HTTPS websites, verifying signatures                             |

**7. E-commerce diagram (draw this):** Customer → hash the order with SHA-256 → sign the hash with the **customer's private key** → encrypt order + signature with the **merchant's public key** → send → Merchant decrypts with the **merchant's private key** → verifies the signature with the **customer's public key** → compares hashes.

**8. Man-in-the-middle on Diffie-Hellman:** DH lets two people create a shared key over an open line, but it **doesn't check who is on the other end**. Eve sits in the middle: she does one DH exchange with Alice and another with Bob, so she ends up with **two keys** (Alice–Eve and Eve–Bob). Every message is decrypted, read, re-encrypted and passed on, and neither side notices. **Fix:** authenticate the exchange with digital certificates or signatures.

**9. Factors for cryptographic strength:** key length (longer = harder to brute-force), strength of the algorithm, true randomness of keys, secrecy and good management of keys, and the mode of operation.

**10. Types of ciphers:** substitution (replace letters, e.g. Caesar), transposition (rearrange letters), block ciphers (AES encrypts 128-bit blocks), stream ciphers (encrypt bit by bit, e.g. RC4).

### Bangla core

সিমেট্রিকে একটাই চাবি, দুজনের কাছে কপি। অ্যাসিমেট্রিকে দুটি চাবি — পাবলিক চাবি দিয়ে তালা মারা যায়, খোলা যায় শুধু প্রাইভেট চাবি দিয়ে। ডিজিটাল সিগনেচার = নিজের সিলমোহর, সার্টিফিকেট = পাবলিক চাবির জাতীয় পরিচয়পত্র।

### Mindmap

```mindmap
Cryptography
  Symmetric
    One shared key
    AES, DES · fast
    Problem: sharing the key
  Asymmetric
    Public + private key pair
    RSA, Diffie-Hellman · slow
    Lock with THEIR public key
  Digital signature
    Hash, then sign with YOUR private key
    Proves who sent it, and no change
  Digital certificate
    CA vouches: this public key is theirs
  In practice
    TLS: asymmetric to agree, symmetric to talk
    DH without auth → man-in-the-middle
```

### Remember it

- **Symmetric = house key copy. Asymmetric = letterbox. Signature = seal. Certificate = ID card.**
- **"Sign with YOUR private, lock with THEIR public."**
- Symmetric algorithms sound short: **AES, DES**. Asymmetric sound like names: **RSA** (Rivest–Shamir–Adleman), **Diffie-Hellman**.
- **DH + MitM = Eve with two keys.**

### Exam trap

Saying the signature is made with the **receiver's** key, or verified with the **sender's private** key. Signing always uses the sender's **private** key; verifying uses the sender's **public** key.

### Exam answer (10 marks)

> **Cryptography** is the science of protecting information by converting readable plaintext into unreadable ciphertext with an algorithm and a key, so that only authorized parties can read it. It provides confidentiality, integrity, authentication and non-repudiation.
>
> **Symmetric encryption** uses one shared secret key for both encryption and decryption (e.g. AES, DES). It is fast but requires the key to be shared securely. **Asymmetric encryption** uses a key pair: data encrypted with the public key can be decrypted only with the matching private key (e.g. RSA, ECC). It solves key distribution but is slower.
>
> &#91;Comparison table: keys, speed, key distribution, key length, use, examples.\]
>
> **Example:** in online banking, the browser obtains the bank's public key from its digital certificate and uses it to agree a session key; all further data is then encrypted with that key using AES.
>
> **Public-key encryption with hashing in e-commerce:** \[diagram from step 7\]. The hash ensures integrity, the customer's signature ensures authentication and non-repudiation, and encryption with the merchant's public key ensures confidentiality.
>
> **Conclusion:** symmetric encryption provides speed and asymmetric encryption provides secure key exchange and signatures; together, as in TLS, they secure internet banking and e-commerce.

### Recall check

1. Which key verifies a digital signature?
2. Name two symmetric and two asymmetric algorithms.
3. Why is plain Diffie-Hellman open to a man-in-the-middle attack, and how is it fixed?

## 13. Heap, graph, hashing, infix to postfix

**Past questions (each 2×):** "Describe and estimate the cost of inserting into a binary max-heap" (Combined Officer 2024) · "Max-heap operations \[a–j\]: show the heap" (Combined AP 2023) · "Adjacency list and adjacency matrix for a complete binary tree on 7 vertices" (BB AP 2023) · "Problems solved better with an adjacency list than a matrix" (Combined AP 2023) · "Hash table of size 13, h(k) = k mod 13, linear probing; insert 10, 3, 6, 16, 17, 19" (BB AP 2023) · "Infix P = 12/(7−3)+2 to postfix and evaluate" (Combined Officer 2024) · "Prefix and postfix of ((A+B)\*C−(D−E)^F)" (BB AP 2016).

### Part A: Max-heap insert

**Picture it: an office hierarchy.** A max-heap is a company where **every boss earns more than the people under them**, and the CEO (root) earns the most. A new employee always joins at **the bottom, in the next empty seat** (so the tree stays complete). If they earn more than their boss, they **swap places**, and keep moving up until their boss earns more, or they become CEO. This is **heapify up** (or "bubble up").

**Understand it:**

- A heap is a **complete binary tree** stored in an **array**. For the element at index i (starting at 0): parent = (i − 1) / 2, left child = 2i + 1, right child = 2i + 2.
- **Insert rule:** (1) put the new value at the end of the array; (2) compare with its parent; (3) if bigger, swap; (4) repeat until it's smaller than its parent or it's the root.

**Worked (the past question): insert 45 into \[50, 30, 40, 10, 20\].**

| Step  | Array                          | What happened                                     |
| ----- | ------------------------------ | ------------------------------------------------- |
| Start | \[50, 30, 40, 10, 20\]         | A valid max-heap                                  |
| 1     | \[50, 30, 40, 10, 20, **45**\] | 45 added at index 5                               |
| 2     | \[50, 30, **45**, 10, 20, 40\] | Parent of index 5 is index 2 (40). 45 > 40 → swap |
| 3     | \[50, 30, 45, 10, 20, 40\]     | Parent of index 2 is index 0 (50). 45 < 50 → stop |

**Cost:** a complete tree with n nodes has height log₂ n. The new item moves up at most one level per swap → **time O(log n)**. Only one temporary variable is used for swapping → **space O(1)**. (Finding the end of the array is O(1).)

### Part B: Adjacency list vs adjacency matrix

**Picture it.** An **adjacency matrix** is a **class attendance grid**: every student down the side, every student across the top, a 1 if they are friends. It has a box for every pair, even strangers. An **adjacency list** is **each student's phone contact list**: only the friends they actually have.

**The past question: a complete binary tree on 7 vertices.** Number the nodes 1–7 like a heap: node i has children 2i and 2i + 1. So 1 → (2, 3), 2 → (4, 5), 3 → (6, 7).

**Adjacency list:** 1: 2, 3 · 2: 1, 4, 5 · 3: 1, 6, 7 · 4: 2 · 5: 2 · 6: 3 · 7: 3

**Adjacency matrix (1 = edge):**

|       | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ----- | --- | --- | --- | --- | --- | --- | --- |
| **1** | 0   | 1   | 1   | 0   | 0   | 0   | 0   |
| **2** | 1   | 0   | 0   | 1   | 1   | 0   | 0   |
| **3** | 1   | 0   | 0   | 0   | 0   | 1   | 1   |
| **4** | 0   | 1   | 0   | 0   | 0   | 0   | 0   |
| **5** | 0   | 1   | 0   | 0   | 0   | 0   | 0   |
| **6** | 0   | 0   | 1   | 0   | 0   | 0   | 0   |
| **7** | 0   | 0   | 1   | 0   | 0   | 0   | 0   |

The matrix is **symmetric** (undirected graph) and mostly zeros: 49 boxes for only 6 edges.

| Point                             | Adjacency matrix                                       | Adjacency list                                                           |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| Space                             | O(V²)                                                  | O(V + E)                                                                 |
| Is there an edge between u and v? | O(1): look at one box                                  | O(degree of u): scan u's list                                            |
| Visit all neighbours of u         | O(V)                                                   | O(degree of u)                                                           |
| Best for                          | **Dense** graphs; frequent edge checks; Floyd-Warshall | **Sparse** graphs; BFS, DFS, Dijkstra; road maps, social networks, trees |

**Answer to "which problems are better with a list?"** Traversals (BFS, DFS), shortest paths on sparse road networks (Dijkstra), and any large graph with few edges per node, such as social networks, computer networks and trees.

### Part C: Hashing with linear probing

**Picture it: a cinema with numbered seats.** Your ticket number (the hash) tells you your seat. If someone is already sitting there (a **collision**), you take **the next empty seat** to the right. That's linear probing. If you reach the last seat, you wrap round to seat 0.

**Worked (the past question): table size 13, h(k) = k mod 13, insert 10, 3, 6, 16, 17, 19.**

| Key | k mod 13 | Seat free?              | Final position |
| --- | -------- | ----------------------- | -------------- |
| 10  | 10       | Yes                     | **10**         |
| 3   | 3        | Yes                     | **3**          |
| 6   | 6        | Yes                     | **6**          |
| 16  | 3        | No (3 is taken) → try 4 | **4**          |
| 17  | 4        | No (16 took it) → try 5 | **5**          |
| 19  | 6        | No (6 is taken) → try 7 | **7**          |

Final table: index 3 = 3, 4 = 16, 5 = 17, 6 = 6, 7 = 19, 10 = 10; the rest are empty.

### Part D: Infix to postfix

**Picture it: a waiting room for operators.** Numbers (operands) go **straight to the output**. Operators wait on a **stack**. A new operator may enter only after every waiting operator that is **stronger or equal** has left for the output. Brackets are a private room: "(" opens it; ")" sends everyone inside to the output.

**Strength (precedence):** **^** (highest, and right-to-left) > **\* /** > **+ −**

**Rules:**

1. Operand → write to output.
2. "(" → push.
3. ")" → pop to output until "("; throw away both brackets.
4. Operator → pop operators of **higher or equal** precedence to output (for ^, only higher), then push it.
5. At the end → pop everything left.

**Worked 1 (the past question): P = 12 / (7 − 3) + 2**

| Read | Stack | Output             |
| ---- | ----- | ------------------ |
| 12   |       | 12                 |
| /    | /     | 12                 |
| (    | / (   | 12                 |
| 7    | / (   | 12 7               |
| −    | / ( − | 12 7               |
| 3    | / ( − | 12 7 3             |
| )    | /     | 12 7 3 −           |
| +    | +     | 12 7 3 − /         |
| 2    | +     | 12 7 3 − / 2       |
| end  |       | **12 7 3 − / 2 +** |

**Evaluate the postfix with a stack:** push 12, 7, 3 → see −: pop 3 and 7, push 7 − 3 = 4 → see /: pop 4 and 12, push 12 / 4 = 3 → push 2 → see +: pop 2 and 3, push 3 + 2 = **5**. Answer **P = 5**.

**Worked 2 (BB 2016):** `((A+B)*C-(D-E)^F)` → postfix **`AB+C*DE-F^-`** → prefix **`-*+ABC^-DEF`**.

To get **prefix**, put the operator first in each part: `(A+B)` → `+AB`; times C → `*+ABC`; `(D-E)` → `-DE`; power F → `^-DEF`; the main minus joins both → `-*+ABC^-DEF`.

### Bangla core

Heap এ নতুন সদস্য সবসময় নিচে ঢোকে, বসের চেয়ে বড় হলে উপরে উঠে যায় (O(log n))। Matrix = সব জোড়ার ঘর, List = শুধু আসল বন্ধুদের তালিকা। Postfix-এ সংখ্যা সরাসরি আউটপুটে, অপারেটর স্ট্যাকে অপেক্ষা করে।

### Mindmap

```mindmap
Heap · graph · hash · postfix
  Max-heap
    Insert at the end, sift up
    Parent (i−1)/2 · children 2i+1, 2i+2
    Cost O(log n)
  Graph storage
    Matrix: dense, O(V²) space, O(1) edge check
    List: sparse, O(V+E) space
  Hashing
    h(k) = k mod size
    Collision → next free slot (linear probing)
  Infix → postfix
    Operands go straight out
    Operators wait on a stack
    Higher precedence leaves first
    ) pops until (
```

### Remember it

- **Heap:** "Join at the bottom, bubble up past weaker bosses." Cost = height = **log n**.
- **Graph storage:** "Grid for crowded friendships (dense), contact list for few (sparse)."
- **Hashing:** "Seat taken? Move one seat right."
- **Postfix:** "Numbers walk straight out; operators wait in line; stronger ones leave first."

### Exam trap

Heap: inserting the new item at the root instead of the end. Hashing: forgetting to wrap round to index 0. Postfix: popping a weaker operator before a stronger one, or forgetting that ^ is right-associative.

### Exam answer: "Insert into a binary max-heap and estimate the cost" (10 marks)

> A **binary max-heap** is a complete binary tree in which every parent node is greater than or equal to its children, so the maximum element is at the root. It is stored in an array where, for index i, the parent is at (i − 1)/2 and the children at 2i + 1 and 2i + 2.
>
> **Insertion procedure:**
>
> 1. Place the new element at the next free position at the end of the array, keeping the tree complete.
> 2. Compare it with its parent.
> 3. If it is larger, swap them (heapify up).
> 4. Repeat until the element is smaller than its parent or becomes the root.
>
> **Example:** inserting 45 into \[50, 30, 40, 10, 20\] first gives \[50, 30, 40, 10, 20, 45\]; 45 is greater than its parent 40, so they swap to give \[50, 30, 45, 10, 20, 40\]; 45 is less than its new parent 50, so the process stops.
>
> &#91;Draw the tree before and after.\]
>
> **Cost:** the height of a heap with n elements is log₂ n, and the element moves up at most one level per swap, so insertion takes **O(log n)** time in the worst case and **O(1)** extra space when done iteratively.

### Recall check

1. Insert 60 into \[50, 30, 45, 10, 20, 40\]: what is the final array?
2. Convert A + B \* C to postfix.
3. Insert 29 into the hash table above: where does it go?
