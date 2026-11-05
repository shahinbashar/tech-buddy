# Networking & Data Communication

Topics:

- OSI and TCP/IP models
- Network devices
- IP addressing, subnetting and CIDR
- Routing
- Protocols and port numbers
- Transmission media
- Modulation and multiplexing
- Error detection and correction
- Wireless and telecommunication
- Network security

## OSI and TCP/IP models

### The past questions

- OSI vs TCP/IP; relation between data, segment, packet and bit (Combined Bank, Senior Officer IT, 13.10.2023).
- OSI vs TCP/IP; MAC-layer functions (Rupali Bank, Asst Network Engineer, 04.11.2023).
- TCP/IP layers: functions, protocols, devices, software (Combined Bank, Asst Maintenance Eng / Asst Engineer IT, 24.02.2024).
- End-to-end encryption: at which OSI layer, considering development time, maintainability and cost? (Bangladesh Bank, Assistant Programmer, 03.02.2023).
- One of the four most-asked networking questions across the bank papers. Devices by layer (hub, switch, bridge, router) follow in the next section of this week.

### Bangla core

**গল্পে বুঝি:** ঢাকার এক অফিস থেকে চট্টগ্রামে একটা চিঠি যাচ্ছে। লেখক চিঠি লেখেন (Application), সেক্রেটারি সেটা অফিসের ভাষা ও ফরম্যাটে সাজান, দরকার হলে গোপন কোডে লেখেন (Presentation), রিসেপশন ঠিক করে কথোপকথন কখন শুরু-শেষ হবে (Session), কুরিয়ার ডেস্ক বড় চিঠিকে নম্বর দেওয়া কয়েকটা খামে ভাগ করে আর পৌঁছানোর রসিদ চায় (Transport), খামে শহরের ঠিকানা বসে, কোন রাস্তায় যাবে ঠিক হয় (Network), প্রতিটা ধাপে স্থানীয় ভ্যানের লেবেল বসে (Data link), শেষে ট্রাক রাস্তা দিয়ে চলে (Physical)। প্রাপকের অফিসে উল্টো ক্রমে প্রতিটা স্তর নিজের লেবেল খুলে পড়ে।

**ধাপে ধাপে:**

1. **কেন layer:** network-এর বিশাল কাজকে ছোট ছোট স্তরে ভাগ করলে প্রতিটা স্তর একটা নির্দিষ্ট কাজ করে, আর একটা স্তর বদলালে (যেমন cable থেকে Wi-Fi) বাকিগুলো বদলাতে হয় না।
2. **OSI model:** ISO ১৯৮৪ সালে এই ৭ স্তরের reference model দেয়। এটা মূলত বোঝার আর troubleshooting-এর কাঠামো; Internet সরাসরি এটা চালায় না।
3. **৭টি স্তর (নিচ থেকে):** Physical (bit, cable, hub), Data link (frame, MAC address, switch), Network (packet, IP address, routing, router), Transport (segment, port, TCP/UDP), Session (সংযোগ শুরু-শেষ, checkpoint), Presentation (encryption, compression, format), Application (HTTP, DNS, SMTP)।
4. **TCP/IP model:** US DoD-এর ARPANET থেকে আসা ৪ স্তরের বাস্তব model, Internet এটাতেই চলে: Network access (OSI ১+২), Internet (OSI ৩), Transport (OSI ৪), Application (OSI ৫+৬+৭)। কিছু বইয়ে Physical আলাদা করে ৫ স্তর দেখানো হয়।
5. **মূল পার্থক্য:** OSI-তে আগে model, পরে protocol; TCP/IP-তে আগে protocol (TCP, IP), পরে model। OSI-র Session আর Presentation-এর কাজ TCP/IP-তে Application স্তরই করে।
6. **Encapsulation:** পাঠানোর সময় প্রতিটা স্তর নিজের header বসায়: data → segment (TCP header) → packet (IP header) → frame (MAC header + trailer) → bit। প্রাপকের দিকে উল্টো ক্রমে খোলা হয় (decapsulation)।
7. **হিসাব:** 1000 byte data + TCP 20 + IP 20 = 1040 byte packet; Ethernet header 14 + FCS 4 যোগ করলে frame = 1058 byte। কাজের data-র ভাগ = 1000/1058 ≈ 94.5%।
8. **Data link-এর MAC sublayer:** কে কখন মাধ্যমে পাঠাবে ঠিক করে (CSMA/CD, CSMA/CA), 48-bit MAC address দিয়ে frame-এর ঠিকানা দেয়, আর CRC দিয়ে ভুল ধরে।
9. **Device কোন স্তরে:** hub ও repeater = ১, switch ও bridge = ২, router = ৩, gateway ও firewall (application-level) = উপরের স্তর।

**এক লাইনে:** OSI = ৭ স্তরের তাত্ত্বিক মানচিত্র, TCP/IP = ৪ স্তরের বাস্তব রাস্তা; পাঠাতে header যোগ, পেতে header খোলা।

### Picture it

A letter goes from an office in Dhaka to a branch in Chattogram. The officer writes it (Application). The secretary puts it into the standard office format and, if needed, seals it in code (Presentation). The reception agrees when the conversation opens and closes (Session). The courier desk splits a thick file into numbered envelopes and asks for a receipt for each (Transport). Each envelope gets the city address and a route (Network). At every hop a local van label is stuck on (Data link). Finally a truck carries it on the road (Physical). At the branch, each desk peels off its own label in reverse order. Each desk talks only to the desk above and below it, and to its "twin" desk at the other office.

### Understand it step by step

1. **Why layers:** networking is split into layers so that each layer does one job and offers a service to the layer above. A change in one layer (copper to Wi-Fi) does not force changes in the others. Each layer talks logically to the same layer on the other machine (peer-to-peer communication).
2. **OSI model:** the Open Systems Interconnection reference model, published by ISO (ISO 7498, 1984). Seven layers; a teaching and troubleshooting framework, not the protocol stack the Internet runs.
3. **The seven layers:**

| #   | OSI layer    | Job                                                                       | PDU                            | Protocols / examples                            | Devices                              |
| --- | ------------ | ------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------- | ------------------------------------ |
| 7   | Application  | network services to the user's program                                    | data                           | HTTP, FTP, SMTP, DNS, DHCP, SNMP                | gateway, proxy, application firewall |
| 6   | Presentation | translation (ASCII/EBCDIC), encryption, compression                       | data                           | TLS/SSL (traditionally placed here), JPEG, MPEG | —                                    |
| 5   | Session      | open, manage and close sessions; dialog control; checkpoints              | data                           | NetBIOS, RPC, PPTP                              | —                                    |
| 4   | Transport    | process-to-process delivery by port, segmentation, flow and error control | segment (TCP) / datagram (UDP) | TCP, UDP                                        | (layer-4 load balancer, firewall)    |
| 3   | Network      | logical (IP) addressing, routing between networks                         | packet                         | IPv4, IPv6, ICMP, OSPF, RIP                     | router, layer-3 switch               |
| 2   | Data link    | framing, MAC addressing, error detection (CRC), media access              | frame                          | Ethernet, PPP, Wi-Fi (802.11), ARP\*            | switch, bridge, NIC, access point    |
| 1   | Physical     | bits as signals; cable, connector, voltage, bit rate                      | bit                            | RS-232, 10BASE-T, DSL                           | hub, repeater, modem, cable          |

\*ARP links layer 3 to layer 2; most books place it at layer 2 (some at 3). Choose the book answer in an MCQ only if the other options are clearly wrong.

4. **TCP/IP model:** grew out of ARPANET (US Department of Defense), with TCP/IP adopted on 1 January 1983. It is the stack the Internet actually runs. Four layers (some books show five, with Physical separate):

| TCP/IP layer          | Matches OSI | Main protocols                                                   |
| --------------------- | ----------- | ---------------------------------------------------------------- |
| Application           | 5, 6, 7     | HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, SSH, Telnet, SNMP |
| Transport             | 4           | TCP, UDP                                                         |
| Internet              | 3           | IP, ICMP, IGMP, (ARP)                                            |
| Network access / Link | 1, 2        | Ethernet, Wi-Fi, PPP                                             |

5. **OSI vs TCP/IP:**

| Basis                    | OSI                                                                | TCP/IP                                                              |
| ------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Full name / origin       | Open Systems Interconnection, ISO                                  | Transmission Control Protocol / Internet Protocol, US DoD (ARPANET) |
| Layers                   | 7                                                                  | 4 (or 5)                                                            |
| Nature                   | reference (conceptual) model                                       | implemented, practical model                                        |
| Order of design          | model first, protocols later                                       | protocols first, model described later                              |
| Session and presentation | separate layers                                                    | merged into Application                                             |
| Physical and data link   | separate layers                                                    | one Network access layer                                            |
| Network layer service    | connectionless and connection-oriented                             | connectionless only (IP)                                            |
| Transport layer service  | connection-oriented only                                           | both: TCP (connection-oriented), UDP (connectionless)               |
| Delivery guarantee       | transport layer always guarantees delivery                         | TCP guarantees; UDP does not                                        |
| Layering                 | strict; clear service–interface–protocol split                     | looser; layers can be bypassed                                      |
| Use today                | teaching, design, troubleshooting vocabulary ("a layer-2 problem") | the Internet and almost every LAN                                   |

6. **Encapsulation (data → segment → packet → frame → bit):** going down, each layer adds its header (the data-link layer also adds a trailer, the FCS). Going up at the receiver, each layer removes its own header: decapsulation.

| Layer       | Adds                                           | Unit becomes   |
| ----------- | ---------------------------------------------- | -------------- |
| Application | —                                              | data (message) |
| Transport   | TCP header (source/dest port, sequence number) | segment        |
| Network     | IP header (source/dest IP, TTL)                | packet         |
| Data link   | MAC header + FCS trailer                       | frame          |
| Physical    | — (line coding)                                | bits           |

7. **Worked example: header overhead.** Data = 1000 bytes; TCP header = 20; IP header = 20; Ethernet header = 14 and FCS = 4.
   - Segment = 1000 + 20 = **1020 bytes**
   - Packet = 1020 + 20 = **1040 bytes**
   - Frame = 1040 + 14 + 4 = **1058 bytes**
   - Efficiency = 1000 / 1058 = **0.945 ≈ 94.5%**
   - Related fact: Ethernet MTU = 1500 bytes, so the largest TCP payload in one frame = 1500 − 20 − 20 = **1460 bytes** (the usual MSS).
8. **Data link layer and its MAC sublayer** (Rupali Bank 2023): the data link layer has two sublayers.
   - **LLC (Logical Link Control, IEEE 802.2):** talks to the network layer, multiplexes protocols, optional flow and error control.
   - **MAC (Media Access Control):** framing (start/end of frame), physical addressing with the 48-bit MAC address, media access control (CSMA/CD on wired Ethernet, CSMA/CA on Wi-Fi), error detection by CRC in the FCS (bad frames are dropped).
9. **End-to-end encryption layer** (Bangladesh Bank 2023): encryption at the **application layer** (e.g., message-level encryption inside a banking app) protects data from sender to final receiver, even through proxies, but every application must implement it (more development time, harder maintenance). Encryption at the **transport layer** (TLS) is a reusable library: faster to build, cheaper to maintain, but data is in clear text at any point where TLS ends (load balancer, proxy). Banks usually use TLS for every connection plus application-level encryption for the most sensitive fields.
10. **How to troubleshoot by layers (bottom-up):** cable/link light (1) → MAC table, VLAN (2) → IP, mask, gateway, `ping` (3) → port open, `telnet host 443` (4) → TLS certificate, DNS name, application (5–7).

### Mindmap

```mindmap
OSI vs TCP/IP
  **Why layers**
    one job per layer
    change one, keep others
    peer talks to peer
  **OSI 7 (ISO 1984)**
    7 App · 6 Pres · 5 Sess
    4 Transport: port, TCP/UDP
    3 Network: IP, router
    2 Data link: MAC, switch
    1 Physical: bits, hub
  **TCP/IP 4 (DoD)**
    App = OSI 5–7
    Transport = 4
    Internet = 3
    Network access = 1–2
  **Differences**
    reference vs practical
    model-first vs protocol-first
    OSI transport: conn-oriented only
    TCP/IP network: connectionless only
  **Encapsulation**
    data → segment → packet → frame → bits
    1000 B data → 1058 B frame (94.5%)
    MTU 1500 → MSS 1460
  **MAC sublayer**
    framing, 48-bit MAC
    CSMA/CD, CSMA/CA
    CRC in FCS
```

### Remember it

- Layers 1→7: **"Please Do Not Throw Sausage Pizza Away"** (Physical, Data link, Network, Transport, Session, Presentation, Application). 7→1: **"All People Seem To Need Data Processing."**
- PDUs 4→1: **"Some People Fear Birthdays"** = Segment, Packet, Frame, Bits.
- Devices: **Hub 1, Switch 2, Router 3** ("H-S-R, one-two-three").
- Addresses: **port at 4, IP at 3, MAC at 2.**
- TCP/IP squeeze: **"top three become one, bottom two become one."**
- Header sizes without options: **TCP 20, IP 20, Ethernet 14 + 4.**

### Exam trap

- Saying TCP/IP has 7 layers, or calling OSI "the model the Internet uses". OSI is the reference; TCP/IP is what runs.
- Mixing PDUs: a **segment** is layer 4, a **packet** is layer 3, a **frame** is layer 2. Writing "IP segment" or "Ethernet packet" loses marks in a definition question.
- Putting the switch at layer 3 by default. A plain switch is layer 2; only a "layer-3 switch" routes.
- Claiming OSI's network layer is connectionless only — it is TCP/IP's network layer (IP) that is connectionless only; OSI's transport layer is connection-oriented only.
- Forgetting the FCS trailer when counting frame size (1054 instead of 1058).

### Exam answer (10 marks)

**Question:** Compare the OSI and TCP/IP reference models. Explain the relation between data, segment, packet, frame and bit.

**Definition.** A network reference model divides the work of communication into layers, each providing a defined service to the layer above. The **OSI (Open Systems Interconnection) model**, published by ISO in 1984, has seven layers and is a conceptual standard. The **TCP/IP model**, developed from the US Department of Defense's ARPANET, has four layers and is the protocol suite on which the Internet runs.

**Diagram.**

| OSI            | TCP/IP         |
| -------------- | -------------- |
| 7 Application  | Application    |
| 6 Presentation | ↑ (merged)     |
| 5 Session      | ↑ (merged)     |
| 4 Transport    | Transport      |
| 3 Network      | Internet       |
| 2 Data link    | Network access |
| 1 Physical     | ↑ (merged)     |

**Functions of the layers.** Physical: transmits bits as signals over the medium (hub, repeater). Data link: framing, MAC addressing, error detection and media access (switch, bridge). Network: logical addressing and routing (IP, router). Transport: process-to-process delivery, segmentation, flow and error control (TCP, UDP). Session: establishes and terminates sessions. Presentation: translation, encryption, compression. Application: services to users (HTTP, SMTP, DNS, FTP).

**Comparison.**

1. OSI has 7 layers; TCP/IP has 4.
2. OSI is a theoretical reference model; TCP/IP is a practical, implemented model.
3. In OSI the model came before the protocols; in TCP/IP the protocols came first.
4. TCP/IP merges OSI's session, presentation and application layers into one application layer, and the physical and data link layers into one network access layer.
5. OSI's network layer supports both connectionless and connection-oriented service, while its transport layer is connection-oriented only; in TCP/IP the network layer is connectionless only, while the transport layer offers both (TCP and UDP).
6. OSI layering is strict, with a clear separation of service, interface and protocol; TCP/IP layering is looser.
7. OSI is used mainly for teaching and troubleshooting; TCP/IP is used on the Internet and in practically all LANs.

**Relation between data, segment, packet, frame and bit.** These are the protocol data units produced by encapsulation. The application creates **data**. The transport layer adds a TCP header with port and sequence numbers, forming a **segment**. The network layer adds an IP header with source and destination IP addresses, forming a **packet**. The data link layer adds a MAC header and an FCS trailer, forming a **frame**. The physical layer sends the frame as **bits**. The receiver reverses the process (decapsulation). For example, 1000 bytes of data become a 1020-byte segment, a 1040-byte packet and a 1058-byte Ethernet frame, so about 94.5% of the transmitted frame is user data.

**Conclusion.** OSI gives a common language for designing and troubleshooting networks, while TCP/IP is the working model of the Internet. Knowing both, and the unit handled at each layer, lets an engineer locate faults quickly, for example separating a cabling problem (layer 1) from a routing problem (layer 3).

### Recall check

1. Which OSI layers does the TCP/IP application layer cover, and which does its network access layer cover?
2. A 1200-byte message is sent with TCP (20), IP (20) and Ethernet (14 + 4). What is the frame size?
3. Name four functions of the MAC sublayer.

#### Solution

1. Application = OSI 5, 6, 7 (session, presentation, application). Network access = OSI 1, 2 (physical, data link).
2. 1200 + 20 + 20 + 14 + 4 = **1258 bytes**.
3. Framing, 48-bit MAC (physical) addressing, media access control (CSMA/CD or CSMA/CA), error detection with CRC/FCS.

## Network devices

### The past questions

- Repeater, hub, bridge, switch, router (Combined Bank, Senior Officer IT, 17.05.2024).
- Switch vs bridge vs router (Sonali & Janata Bank, Officer IT, 14.10.2023).
- Collision domain vs broadcast domain; DNS, DHCP (Rupali Bank, Asst Network Engineer, 04.11.2023).
- TCP/IP layers with the devices and software at each layer (Combined Bank, Asst Maintenance Eng / Asst Engineer IT, 24.02.2024).
- Office with three departments of 50–70 users: benefits of subnets (Combined Bank, Senior Officer IT, 17.05.2024). Splitting broadcast domains is the core of the answer.
- "Network devices" is asked about 3 times across the bank papers, usually as a 10–15 mark "describe and compare" question.

### Picture it

Think of a large office building and its mail.

- A **repeater** is a loudspeaker in a long corridor: it only makes the voice louder so it reaches the far end. It does not understand the words.
- A **hub** is a man who shouts every letter's content to every room on the floor. Everyone hears everything, and if two people speak at once, nobody understands (a collision).
- A **bridge** is a guard at the door between two wings. He keeps a list of who sits in which wing and lets a letter pass only if the receiver is on the other side.
- A **switch** is a smart floor clerk with a list of every room. He walks each letter straight to the right room, and many letters move at the same time.
- A **router** is the building's mail room. It reads the city address (IP), not the room number, and decides which road a letter takes to another building.
- A **gateway** is a translator at the border: a letter written in another office's language is rewritten so this office can read it.
  A **collision domain** is a room where only one person can talk at a time. A **broadcast domain** is the whole area that hears an announcement on the public-address system. Switches give every desk its own room; only the mail room (router) stops announcements from leaving the building.

### Understand it step by step

1. **Why devices matter:** a network is not just cables. Devices decide how far a signal travels, who hears a frame, and how packets find another network. Each device works at a fixed OSI layer, and its layer tells you what it can "read": bits (layer 1), MAC addresses (layer 2) or IP addresses (layer 3).
2. **Repeater (layer 1):** receives a weak or noisy signal and regenerates it at full strength, so a cable segment can be extended (Ethernet copper is limited to 100 m per segment). It has 2 ports, does no filtering and reads no addresses.
3. **Hub (layer 1):** a multiport repeater. A bit arriving on one port is copied out of **every other port**. All devices on a hub share the bandwidth and work in half duplex, so they are in **one collision domain** and use CSMA/CD. Types: passive (just connects), active (regenerates signal), intelligent (adds monitoring).
4. **Bridge (layer 2):** joins two (or a few) LAN segments. It reads the **destination MAC address** and forwards a frame only if the receiver is on the other side (filtering). It learns addresses from the **source MAC** of incoming frames. Each side becomes a separate collision domain, but broadcasts still pass. Old bridges did their switching in software, with few ports.
5. **Switch (layer 2):** a multiport bridge built with hardware (ASIC) switching. It keeps a **MAC address table** (port ↔ MAC):
   - _Learn:_ records the source MAC of every incoming frame against its port.
   - _Forward:_ known destination → only that port.
   - _Flood:_ unknown destination or broadcast (FF:FF:FF:FF:FF:FF) → all ports except the incoming one.
   - _Filter:_ destination on the same port → drop.
     Every port is its own collision domain and can run **full duplex** at full speed. Switching methods: **store-and-forward** (receives the whole frame, checks the CRC, then forwards; safest), **cut-through** (forwards after reading the 6-byte destination MAC; fastest), **fragment-free** (reads the first 64 bytes, where most collisions show). A switch can split one switch into several **VLANs**; each VLAN is a separate broadcast domain. A **layer-3 switch** can also route between VLANs.
6. **Router (layer 3):** connects **different networks** (different IP subnets, LAN to WAN). It reads the destination **IP address**, looks it up in its **routing table** (static routes or dynamic protocols such as RIP and OSPF) and forwards the packet on the best path. Every router interface is a separate **broadcast domain** and a separate collision domain. It can also do NAT, access-control lists and DHCP relay.
7. **Gateway (layers 4–7, can be all seven):** connects networks that use **different protocols or data formats** and converts between them, e.g., an email gateway, a VoIP gateway, or a payment gateway between a bank and card networks. In everyday PC settings, "default gateway" simply means the router address a host sends off-network traffic to.
8. **Other devices worth one line each:** **NIC** (layer 2; holds the 48-bit MAC), **modem** (layer 1; modulates digital data into analog signals and back), **access point** (layer 2; bridges Wi-Fi clients onto the wired LAN), **firewall** (layers 3–7; filters traffic by policy).
9. **Device comparison:**

| Basis             | Repeater        | Hub                      | Bridge              | Switch                          | Router                     | Gateway                     |
| ----------------- | --------------- | ------------------------ | ------------------- | ------------------------------- | -------------------------- | --------------------------- |
| OSI layer         | 1               | 1                        | 2                   | 2 (L3 switch: 3)                | 3                          | 4–7 (up to all)             |
| Unit handled      | bits / signal   | bits                     | frame               | frame                           | packet                     | message / data              |
| Address used      | none            | none                     | MAC                 | MAC                             | IP                         | application data, protocol  |
| Ports             | 2               | many (4–24)              | 2–4                 | many (8–48)                     | few (2–8), LAN + WAN       | —                           |
| Filtering         | no              | no                       | yes                 | yes                             | yes (routing, ACL)         | yes (conversion)            |
| Collision domains | 1 (extends it)  | 1 for all ports          | 1 per port          | 1 per port                      | 1 per interface            | —                           |
| Broadcast domains | 1               | 1                        | 1                   | 1 (1 per VLAN)                  | 1 per interface            | separates networks          |
| Bandwidth         | shared          | shared, half duplex      | per segment         | dedicated per port, full duplex | per interface              | —                           |
| Main job          | extend distance | connect hosts in one LAN | join 2 LAN segments | connect hosts efficiently       | connect different networks | connect different protocols |

10. **Switch vs bridge vs router (Sonali & Janata 2023):**

| Basis             | Bridge                | Switch                          | Router                          |
| ----------------- | --------------------- | ------------------------------- | ------------------------------- |
| Layer             | 2                     | 2                               | 3                               |
| Decision based on | MAC address           | MAC address                     | IP address                      |
| Ports             | few (2–4)             | many (8–48)                     | few, often LAN + WAN            |
| Switching         | software, slower      | hardware (ASIC), wire speed     | routing table lookup            |
| Broadcasts        | forwarded             | forwarded (except across VLANs) | blocked                         |
| Connects          | 2 segments of one LAN | hosts of one LAN                | different networks / LAN to WAN |
| Table kept        | MAC (bridging) table  | MAC address (CAM) table         | routing table                   |
| Extra features    | —                     | VLANs, port security, PoE       | NAT, ACL, DHCP relay, VPN       |

11. **Collision domain vs broadcast domain (Rupali Bank 2023):**

| Basis                  | Collision domain                                        | Broadcast domain                                                |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| Meaning                | part of a network where two frames sent at once collide | part of a network that receives a broadcast frame from any host |
| OSI layer              | 1 / 2 (shared medium)                                   | 2 / 3                                                           |
| Split by               | bridge, switch, router (each port)                      | router (each interface), or VLANs on a switch                   |
| Not split by           | hub, repeater                                           | hub, repeater, bridge, plain layer-2 switch                     |
| Problem when too large | many collisions, low throughput                         | broadcast storms, wasted bandwidth and CPU                      |

12. **Worked example: counting domains.** Router R has two interfaces. Interface G0/0 connects to switch S1. On S1 are: hub H1 (3 PCs), hub H2 (3 PCs) and 4 PCs connected directly. Interface G0/1 connects to hub H3 with 5 PCs.
    - Collision domains on S1: every switch port in use is one domain → router uplink (1) + H1 (1) + H2 (1) + 4 PCs (4) = **7**. All PCs on a hub share their port's domain.
    - Collision domains on H3: the hub and router port G0/1 form one shared segment = **1**.
    - Total collision domains = 7 + 1 = **8**.
    - Broadcast domains = number of router interfaces in use = **2** (no VLANs).
13. **Worked example: shared vs dedicated bandwidth.** Ten PCs on a 100 Mbps hub share one 100 Mbps half-duplex medium: when all transmit, each gets at best 100 / 10 = **10 Mbps** (less in practice, because of collisions). On a 100 Mbps switch, each PC has its own full-duplex port: **100 Mbps each way** per PC.

### Bangla core

হাব সব পোর্টে সবকিছু পাঠায় (এক collision domain), সুইচ MAC দেখে শুধু ঠিক পোর্টে পাঠায় (প্রতি পোর্ট আলাদা collision domain), আর রাউটার IP দেখে ভিন্ন network জোড়ে ও broadcast আটকায় (প্রতি interface আলাদা broadcast domain)। Repeater ও hub = স্তর ১, bridge ও switch = স্তর ২, router = স্তর ৩, gateway = উপরের স্তর।

### Mindmap

```mindmap
Network devices
  **Layer 1**
    Repeater: regenerate, 2 ports
    Hub: copy to all ports
    1 collision domain, shared
  **Layer 2**
    Bridge: 2 segments, software
    Switch: MAC table, ASIC
    learn · forward · flood · filter
    1 collision domain per port
  **Layer 3**
    Router: IP, routing table
    blocks broadcasts
    1 broadcast domain per interface
  **Upper layers**
    Gateway: protocol conversion
    Firewall: policy filter
  **Domains**
    collision: split by switch/bridge
    broadcast: split by router/VLAN
  **Numbers**
    10 PCs on 100 Mbps hub = 10 each
    switch = 100 each, full duplex
```

### Remember it

- **"Hub 1, Switch 2, Router 3"**; repeater rides with the hub, bridge with the switch.
- **"Hub shouts, switch whispers, router directs."**
- Switch table steps: **"Learn the sender, forward to the receiver"** (source MAC in, destination MAC out).
- Domains: **"Switch splits collisions, router splits broadcasts."**
- Switching methods by speed: **"Cut fast, Fragment middle, Store safe."**

### Exam trap

- Saying a switch splits broadcast domains. A plain layer-2 switch floods broadcasts to all ports; only a router or VLANs split them.
- Saying a switch learns from the destination MAC. It learns from the **source** MAC and forwards on the **destination** MAC.
- Counting a hub's ports as separate collision domains. A whole hub (and anything cascaded on it) is one collision domain.
- Counting a switch-to-switch link twice. One link between two ports is one collision domain.
- Calling the "default gateway" a separate device. On a LAN it is normally the router's interface address.
- Putting a bridge at layer 3 because it "joins networks". It joins segments of the same network using MAC addresses.

### Exam answer (10 marks)

**Question:** Describe repeater, hub, bridge, switch and router. Compare them and explain how each affects collision and broadcast domains.

**Introduction.** Network devices connect hosts and networks and control how data moves between them. Each device works at a specific OSI layer, which decides the information it can read (signals, MAC addresses or IP addresses) and therefore how intelligently it forwards traffic.

**Diagram (position of devices).**

| OSI layer   | Device                  | Reads                    |
| ----------- | ----------------------- | ------------------------ |
| 3 Network   | Router (layer-3 switch) | IP address               |
| 2 Data link | Bridge, switch          | MAC address              |
| 1 Physical  | Repeater, hub           | electrical signal / bits |

A typical LAN: PCs → access switch → router → WAN / Internet.

**Description.**

1. **Repeater** (physical layer): regenerates a weakened signal so that a segment can be extended beyond its distance limit. It has two ports, no addressing and no filtering.
2. **Hub** (physical layer): a multiport repeater that sends every incoming signal out of all other ports. All connected devices share the bandwidth in half duplex and form one collision domain and one broadcast domain.
3. **Bridge** (data link layer): connects two LAN segments, keeps a table of MAC addresses and forwards a frame only when the destination is on the other segment. Each segment becomes a separate collision domain, but broadcasts pass through.
4. **Switch** (data link layer): a multiport bridge with hardware switching. It learns source MAC addresses into its MAC address table and forwards each frame only to the destination port, flooding only broadcasts and unknown addresses. Each port is a separate collision domain with dedicated, full-duplex bandwidth; VLANs can divide it into several broadcast domains.
5. **Router** (network layer): connects different networks, reads the destination IP address, consults its routing table (static or dynamic routes such as OSPF) and forwards packets along the best path. It does not forward broadcasts, so each interface is a separate broadcast domain. It can also perform NAT, access control and DHCP relay.

**Comparison.**

| Basis             | Repeater     | Hub             | Bridge            | Switch            | Router                 |
| ----------------- | ------------ | --------------- | ----------------- | ----------------- | ---------------------- |
| OSI layer         | 1            | 1               | 2                 | 2                 | 3                      |
| Address used      | none         | none            | MAC               | MAC               | IP                     |
| Filtering         | no           | no              | yes               | yes               | yes                    |
| Collision domains | 1            | 1               | 1 per port        | 1 per port        | 1 per interface        |
| Broadcast domains | 1            | 1               | 1                 | 1 (1 per VLAN)    | 1 per interface        |
| Typical use       | extend cable | small, old LANs | join two segments | modern LAN access | LAN–WAN, inter-network |

**Example.** A router with two interfaces connects a switch and a hub. The switch has the router uplink, two hubs and four PCs on its ports; the second hub has five PCs. The network has 8 collision domains (7 on the switch ports and 1 on the second hub) and 2 broadcast domains (one per router interface).

**Conclusion.** Hubs and repeaters only move signals, so they suit no modern network. Switches give each host its own collision domain and are the standard for LAN access, while routers separate broadcast domains and link networks. A bank branch therefore uses switches (with VLANs) for its users and a router, with a firewall, to connect to the head office and the Internet.

### Recall check

1. A 16-port switch has every port connected to a PC and no VLANs. How many collision and broadcast domains are there?
2. A switch receives a frame whose destination MAC is not in its table. What does it do?
3. Give three differences between a bridge and a router.

#### Solution

1. **16 collision domains** (one per port) and **1 broadcast domain**.
2. It **floods** the frame out of every port except the one it came in on (and records the source MAC against the incoming port).
3. Layer 2 vs layer 3; MAC address vs IP address; forwards broadcasts vs blocks broadcasts (also: joins segments of one LAN vs connects different networks; bridging table vs routing table).

## Topologies and transmission media

### The past questions

- What is topology? Bus vs ring vs tree vs star; purpose of IEEE 802.11 (Combined Bank, Senior Officer IT, 13.10.2023).
- Topologies; how a bus topology works (Rupali Bank, Asst Network Engineer, 04.11.2023).
- Guided vs unguided media; STP vs UTP; why UTP is used (Sonali & Janata Bank, Officer IT, 14.10.2023).
- TCP vs UDP; **Cat5 vs Cat6** (Sonali & Janata Bank, Officer IT, 14.10.2023).
- Broadband vs baseband; attenuation; twisted pair vs coaxial vs fiber (Rupali Bank, Asst Network Engineer, 04.11.2023).
- Transmission media: advantages and disadvantages (Combined Bank, Senior Officer IT, 17.05.2024).
- Optical vs satellite communication (Combined Bank, Asst Maintenance Eng / Asst Engineer IT, 24.02.2024).
- Topologies are asked about 3 times and media about 4 times across the bank papers, usually as a 10-mark "define, compare, give advantages" question.

### Picture it

Think of how a town lays out its roads and what the roads are made of.

- **Topology is the road map.** A **bus** is one main road with houses along it: everyone uses the same road, and if the road breaks, the whole town is cut. A **ring** is a circular road where traffic flows one way and a "token" car decides who may drive. A **star** is a roundabout in the middle with a private lane to every house: one lane breaking hurts one house, but if the roundabout closes, nobody moves. A **tree** is a city of roundabouts linked to a bigger central roundabout. A **mesh** is a direct road from every house to every other house: never stuck, but very expensive to build.
- **Transmission media is the road surface.** **Twisted pair** is an ordinary paved lane: cheap and everywhere. **Coaxial** is a lane with a wall around it: better shielded, used for cable TV. **Fiber** is a bullet-train track carrying light: very fast, very long, and lightning (electrical noise) cannot touch it. **Wireless** is air travel: no road at all, but weather and walls get in the way, and anyone can look up and see the plane.

### Understand it step by step

1. **Topology** is the arrangement of nodes and links in a network. **Physical topology** is how the cables are actually laid; **logical topology** is how data flows (a hub-based Ethernet is physically a star but logically a bus, because every frame reaches every node).
2. **Bus:** all devices tap into one backbone cable through drop lines.
   - _How it works:_ a station puts its frame on the backbone; the signal travels in both directions to every station; each station compares the destination MAC with its own and keeps only its frames. **Terminators** at both ends absorb the signal so it does not reflect back. Only one station can send at a time, so access is controlled by **CSMA/CD**.
   - _Pros:_ least cable, easy to add a node, cheap. _Cons:_ a break in the backbone stops everyone, many collisions under load, hard to find faults, limited length and nodes. Example: old 10BASE2 / 10BASE5 Ethernet on coaxial cable.
3. **Ring:** each device connects to exactly two neighbours, forming a closed loop; data travels one way, and each node regenerates (repeats) the signal. Access is usually by **token passing**: only the node holding the token may send, so there are no collisions.
   - _Pros:_ fair, predictable access; no collisions; performs well under heavy load. _Cons:_ one broken node or link can stop the ring (a **dual ring**, as in FDDI, fixes this); adding a node disturbs the ring. Example: IEEE 802.5 Token Ring, FDDI, SONET rings.
4. **Star:** every device has its own cable to a central **hub or switch**.
   - _Pros:_ one cable failure affects one node only; easy to install, add and troubleshoot; the standard for modern Ethernet LANs. _Cons:_ the central device is a **single point of failure**; more cable than bus.
5. **Tree (hierarchical star):** several stars joined to a higher-level device, e.g. floor switches connected to a building core switch. It scales well and suits large organisations, but a failure of an upper-level device or the backbone cuts off a whole branch.
6. **Mesh:** devices are linked to many others; in a **full mesh** every device links to every other.
   - Links needed = **n(n − 1) / 2**; ports per device = **n − 1**.
   - Worked example: 8 devices → 8 × 7 / 2 = **28 links**, each device needs **7 ports**. 5 core routers → 5 × 4 / 2 = **10 links**.
   - _Pros:_ highest fault tolerance, dedicated links, privacy, no traffic sharing. _Cons:_ very costly in cable and ports, hard to install. Used for WAN cores and bank data-center backbones (often a **partial mesh**).
7. **Hybrid** combines two or more types, e.g. a star-of-stars (tree) inside each building with a mesh between buildings.
8. **Topology comparison:**

| Basis                   | Bus                      | Ring                         | Star                                     | Tree                      | Mesh                              |
| ----------------------- | ------------------------ | ---------------------------- | ---------------------------------------- | ------------------------- | --------------------------------- |
| Layout                  | one backbone, drop lines | closed loop, 2 neighbours    | each node to a central device            | stars joined to a root    | every node to many (full: to all) |
| Cables for n nodes      | 1 backbone + n drops     | n                            | n                                        | n (+ links between hubs)  | n(n − 1)/2 (full)                 |
| Data flow               | broadcast both ways      | one way, node to node        | through the centre                       | through the hierarchy     | direct, many paths                |
| Collisions              | yes (CSMA/CD)            | no (token)                   | depends on centre (hub: yes, switch: no) | depends on devices        | no                                |
| One link fails          | whole network down       | ring down (unless dual ring) | only that node                           | that branch               | traffic re-routes                 |
| Single point of failure | backbone                 | any node/link                | central hub/switch                       | root/backbone             | none                              |
| Cost                    | lowest                   | low                          | medium                                   | medium–high               | highest                           |
| Example                 | 10BASE2 Ethernet         | Token Ring, FDDI             | office Ethernet LAN                      | campus or multi-floor LAN | WAN core, data center             |

9. **Transmission media** is the physical path between sender and receiver. **Guided (wired)** media keep the signal inside a physical conductor; **unguided (wireless)** media send electromagnetic waves through air or space.

| Basis        | Guided media                          | Unguided media                               |
| ------------ | ------------------------------------- | -------------------------------------------- |
| Path         | solid conductor (copper, glass)       | air, water or vacuum                         |
| Types        | twisted pair, coaxial, optical fiber  | radio waves, microwaves, infrared, satellite |
| Direction    | follows the cable                     | broadcast (omnidirectional) or line of sight |
| Interference | low (fiber: none from EMI)            | high (weather, walls, other signals)         |
| Security     | harder to tap                         | easier to intercept; needs encryption        |
| Mobility     | fixed                                 | users can move                               |
| Installation | cables, ducts, rights of way          | towers, antennas, little digging             |
| Example      | office LAN, backbone, submarine cable | Wi-Fi, mobile, microwave link, VSAT          |

10. **Twisted pair:** two insulated copper wires twisted together; a cable usually holds 4 pairs and ends in an **RJ-45** connector. **Why twist?** Each wire picks up the same noise; the twists make the noise cancel out at the receiver, which reduces **crosstalk** and **EMI**. More twists per metre = less crosstalk.
    - **UTP (unshielded):** no metal shield. **STP (shielded):** a foil or braided metal shield around the pairs (or each pair), which must be grounded.

| Basis                          | UTP                      | STP                                    |
| ------------------------------ | ------------------------ | -------------------------------------- |
| Shield                         | none                     | metal foil or braid                    |
| Noise and crosstalk protection | moderate (twisting only) | better (twisting + shield)             |
| Cost                           | cheaper                  | costlier                               |
| Weight and flexibility         | light, thin, flexible    | heavier, stiffer                       |
| Installation                   | easy, no grounding       | harder; shield must be grounded        |
| Use                            | almost all office LANs   | factories, near motors, high-EMI areas |

    - **Why UTP is used most:** it is cheap, thin, easy to bend and terminate, needs no grounding, works with RJ-45 and standard switches, and Cat5e/Cat6 UTP already carries 1 Gbps over 100 m, which is all an office desk needs.

11. **Cable categories (Cat5 vs Cat6):**

| Basis                 | Cat5           | Cat5e   | Cat6                                                         | Cat6a             |
| --------------------- | -------------- | ------- | ------------------------------------------------------------ | ----------------- |
| Bandwidth (frequency) | 100 MHz        | 100 MHz | 250 MHz                                                      | 500 MHz           |
| Typical speed         | 100 Mbps       | 1 Gbps  | 1 Gbps (10 Gbps up to about 55 m)                            | 10 Gbps           |
| Max channel length    | 100 m          | 100 m   | 100 m (55 m at 10 Gbps)                                      | 100 m             |
| Crosstalk             | higher         | reduced | low: tighter twists, often a plastic spline separating pairs | lowest            |
| Cost and thickness    | cheapest, thin | cheap   | higher, thicker                                              | highest, thickest |
| Connector             | RJ-45          | RJ-45   | RJ-45                                                        | RJ-45             |

12. **Coaxial cable:** a central copper conductor, an insulating layer, a braided metal shield and an outer jacket, all sharing one axis. Better shielding and higher bandwidth than twisted pair; used for cable TV and cable internet (RG-6, F connector), old Ethernet (RG-58, BNC connector) and CCTV. It is thicker and costlier than UTP and has been replaced by UTP and fiber in LANs.
13. **Optical fiber:** a thin glass **core** surrounded by **cladding** of lower refractive index; light pulses stay in the core by **total internal reflection**. Light in glass travels at about **2 × 10⁸ m/s**.
    - **Single-mode:** very thin core (about 9 µm), laser light, one path; tens of km and more; used for WAN, inter-building and submarine links.
    - **Multimode:** thicker core (50 or 62.5 µm), LED or VCSEL light, many paths, which spread the pulse (modal dispersion); a few hundred metres; used inside buildings and data centers.
    - _Pros:_ huge bandwidth, very low attenuation, immune to EMI and lightning, hard to tap, thin and light. _Cons:_ costly to install and splice, fragile, needs special connectors (LC, SC) and converters.
14. **Comparison of guided media:**

| Basis                | Twisted pair                     | Coaxial         | Optical fiber                 |
| -------------------- | -------------------------------- | --------------- | ----------------------------- |
| Signal               | electrical                       | electrical      | light                         |
| Bandwidth            | lowest (up to 500 MHz for Cat6a) | medium          | highest (THz range)           |
| Distance per segment | 100 m (Ethernet)                 | about 185–500 m | km (multimode: hundreds of m) |
| EMI immunity         | low (STP better)                 | good            | complete                      |
| Attenuation          | highest                          | medium          | lowest                        |
| Security             | easy to tap                      | moderate        | very hard to tap              |
| Cost                 | lowest                           | medium          | highest (cable + optics)      |
| Use                  | desk to switch                   | cable TV, CCTV  | backbone, WAN, data center    |

15. **Unguided media:**
    - **Radio waves** (about 3 kHz–1 GHz): omnidirectional, pass through walls; AM/FM radio, paging. Wi-Fi and mobile networks use nearby higher bands (2.4 / 5 / 6 GHz for Wi-Fi).
    - **Microwaves** (about 1–300 GHz): narrow, **line-of-sight** beams between towers about 30–50 km apart, or to satellites; used for long-distance links, mobile backhaul and VSAT.
    - **Infrared** (above 300 GHz): very short range, cannot pass walls; TV remotes, short device links.
    - **Satellite:** a microwave relay in space; covers remote areas (char lands, hill tracts, ships) but has high delay (a geostationary satellite is about 36,000 km up, so about 0.24 s up and down).
16. **IEEE 802.11** is the IEEE standard family for **wireless LANs (Wi-Fi)**. It defines the physical layer (radio bands, modulation, data rates) and the MAC layer, which uses **CSMA/CA** (collision avoidance) because a wireless station cannot detect collisions while sending. Versions: 802.11b/g (2.4 GHz), 802.11a (5 GHz), 802.11n (Wi-Fi 4), 802.11ac (Wi-Fi 5), 802.11ax (Wi-Fi 6/6E), 802.11be (Wi-Fi 7). Wired Ethernet is IEEE 802.3.
17. **Attenuation** is the loss of signal strength with distance, measured in decibels: **dB = 10 log₁₀(P₂ / P₁)**.
    - Worked example: power falls from 10 mW to 5 mW → 10 log₁₀(0.5) = **−3 dB** (half the power).
    - Power falls to 1/100 → 10 log₁₀(0.01) = **−20 dB**.
    - Cure: repeaters or amplifiers; use a medium with lower attenuation (fiber).
18. **Propagation delay** = distance ÷ propagation speed. Worked example: a 50 km fiber link → 50,000 m ÷ (2 × 10⁸ m/s) = 2.5 × 10⁻⁴ s = **0.25 ms**; a 30 km link → **0.15 ms**. (Delay calculations return in week 4.)

### Bangla core

**গল্পে বুঝি:** Topology হলো শহরের রাস্তার নকশা, আর transmission media হলো রাস্তাটা কী দিয়ে বানানো। Bus মানে একটাই বড় রাস্তা, সবাই সেটাতেই চলে; রাস্তা ভাঙলে পুরো শহর আটকে যায়। Ring মানে গোল রাস্তা, গাড়ি এক দিকে চলে, যার হাতে token সে-ই চালাতে পারে। Star মানে মাঝখানে একটা চত্বর (switch), প্রতিটি বাড়ির নিজের গলি; একটা গলি ভাঙলে শুধু সেই বাড়ির ক্ষতি, কিন্তু চত্বর বন্ধ হলে সবাই আটকা। Mesh মানে প্রতিটি বাড়ি থেকে প্রতিটি বাড়িতে সরাসরি রাস্তা: কখনো আটকায় না, কিন্তু খরচ অনেক। Media-র দিক থেকে twisted pair সাধারণ পাকা রাস্তা, coaxial দেয়ালঘেরা রাস্তা, fiber আলোর বুলেট ট্রেন, আর wireless আকাশপথ।

**ধাপে ধাপে:**

1. Topology হলো network-এর node আর link কীভাবে সাজানো। Physical topology = তার কীভাবে বসানো; logical topology = data কীভাবে চলে।
2. Bus: একটা backbone cable-এ সবাই যুক্ত। Frame দুই দিকে সবার কাছে যায়, যার MAC মেলে সে নেয়। দুই প্রান্তে terminator signal শুষে নেয়, যাতে প্রতিফলন না হয়। একসাথে একজনই পাঠাতে পারে (CSMA/CD)। Backbone কাটলে সব বন্ধ।
3. Ring: প্রতিটি device দুই প্রতিবেশীর সাথে যুক্ত, data এক দিকে ঘোরে। Token যার কাছে, সে-ই পাঠায়, তাই collision নেই। একটা link কাটলে ring বন্ধ, তাই FDDI-তে dual ring থাকে।
4. Star: প্রতিটি device-এর নিজস্ব cable কেন্দ্রের switch-এ যায়। একটা cable নষ্ট হলে শুধু সেই PC বন্ধ; কিন্তু switch নষ্ট হলে পুরো network বন্ধ (single point of failure)। আজকের office LAN প্রায় সবই star।
5. Tree: অনেকগুলো star একটা উপরের switch-এ যুক্ত, যেমন প্রতিটি floor-এর switch building-এর core switch-এ। বড় প্রতিষ্ঠানে সহজে বাড়ানো যায়।
6. Mesh: full mesh-এ n টি device-এর জন্য link লাগে n(n − 1)/2, প্রতিটি device-এ port লাগে n − 1। যেমন 8 টি device → 8 × 7 / 2 = 28 link, প্রতিটিতে 7 port। সবচেয়ে নির্ভরযোগ্য, সবচেয়ে ব্যয়বহুল; bank-এর data center core-এ partial mesh ব্যবহার হয়।
7. Guided media-তে signal তারের ভেতর দিয়ে যায় (twisted pair, coaxial, fiber); unguided media-তে বাতাস দিয়ে (radio, microwave, infrared, satellite)।
8. Twisted pair-এ তার পেঁচানো থাকে, কারণ দুই তারে একই noise ঢোকে আর পেঁচানোর ফলে receiver-এ তা কেটে যায়। UTP-তে shield নেই, সস্তা ও সহজ; STP-তে ধাতব shield আছে, noise কম, কিন্তু দামি ও grounding লাগে। তাই office-এ UTP বেশি চলে।
9. Cat5 = 100 MHz, 100 Mbps; Cat6 = 250 MHz, 1 Gbps (55 m পর্যন্ত 10 Gbps), কম crosstalk, মোটা ও দামি। দুটোতেই সর্বোচ্চ 100 m, connector RJ-45।
10. Fiber-এ আলো total internal reflection-এ core-এর ভেতর চলে। Single-mode = সরু core, laser, অনেক km; multimode = মোটা core, LED, কয়েকশো m। EMI একদম ঢোকে না, tap করা কঠিন, কিন্তু দামি।
11. IEEE 802.11 হলো wireless LAN (Wi-Fi)-এর standard; এর MAC layer CSMA/CA ব্যবহার করে। তারযুক্ত Ethernet হলো 802.3।
12. Attenuation = দূরত্বে signal দুর্বল হওয়া। dB = 10 log₁₀(P₂/P₁); 10 mW থেকে 5 mW হলে −3 dB। Fiber-এ আলোর গতি প্রায় 2 × 10⁸ m/s, তাই 50 km-এ delay 0.25 ms।

**এক লাইনে:** Topology ঠিক করে কে কার সাথে কীভাবে যুক্ত (bus, ring, star, tree, mesh), আর media ঠিক করে signal কী দিয়ে যাবে; office-এ star + UTP, backbone-এ fiber, দূরের শাখায় wireless।

### Mindmap

```mindmap
Topologies & media
  **Topologies**
    Bus: 1 backbone, terminators, CSMA/CD
    Ring: token, one way, dual ring
    Star: central switch, SPOF
    Tree: star of stars
    Mesh: n(n−1)/2 links, n−1 ports
  **Guided**
    Twisted pair: RJ-45, 100 m
    UTP vs STP: shield, cost
    Coax: core + braid, cable TV
    Fiber: light, TIR, no EMI
  **Cables**
    Cat5: 100 MHz, 100 Mbps
    Cat5e: 1 Gbps
    Cat6: 250 MHz, 10G ≤ 55 m
    Cat6a: 500 MHz, 10G 100 m
  **Unguided**
    Radio: omnidirectional
    Microwave: line of sight
    Infrared: short, no walls
    802.11 = Wi-Fi, CSMA/CA
  **Numbers**
    8 nodes mesh: 28 links, 7 ports
    10 → 5 mW = −3 dB
    50 km fiber = 0.25 ms
```

### Remember it

- Topologies: **"Be Really Smart, Try Mesh"** = Bus, Ring, Star, Tree, Mesh.
- **Bus breaks all, Ring breaks the loop, Star breaks one (unless the centre dies), Mesh never breaks.**
- Mesh formula: **"n into n-minus-1, halved"** = n(n − 1)/2 links; each box needs n − 1 ports.
- **Twist cancels noise; shield blocks noise.** UTP = twist only; STP = twist + shield.
- Cable numbers: **"5 – 100, 6 – 250, 6a – 500"** MHz; every copper Ethernet run stops at **100 m**.
- Fiber: **"Single = skinny, laser, long; Multi = mid-size, LED, local."**
- **802.3 = wired (CD), 802.11 = wireless (CA).**
- **−3 dB = half the power.**

### Exam trap

- Calling a hub-based LAN a "bus" topology. Physically it is a star; only its logical behaviour is like a bus.
- Writing n(n − 1) for full-mesh links. Each link joins two devices, so divide by 2: 8 devices → 28 links, not 56. Ports per device are n − 1 (7), not n.
- Saying star has no single point of failure. The central switch or hub is exactly that.
- Saying STP is always better, so banks should use it. STP costs more and only helps when it is properly grounded; UTP is the normal office choice.
- Saying Cat6 gives 10 Gbps at 100 m. It reaches 10 Gbps only up to about 55 m; Cat6a is needed for 10 Gbps at 100 m.
- Mixing up single-mode and multimode: single-mode has the **thinner** core but goes **farther**.
- Listing Wi-Fi as using CSMA/CD. Wireless uses CSMA/CA.
- Calling attenuation a positive dB value when the signal falls. A loss gives a negative dB (or write "a loss of 3 dB").

### Exam answer (10 marks)

**Question:** What is network topology? Describe bus, ring, star, tree and mesh topologies with their advantages and disadvantages. Explain how a bus topology works. What is the purpose of IEEE 802.11?

**Definition.** Network topology is the arrangement of nodes (computers, switches, routers) and the links between them in a network. Physical topology describes how the devices are actually cabled; logical topology describes how data flows between them.

**Diagram (text form).**

| Topology | Shape                                                 |
| -------- | ----------------------------------------------------- |
| Bus      | A — B — C — D on one backbone, terminator at each end |
| Ring     | A → B → C → D → A (closed loop)                       |
| Star     | A, B, C, D each linked to a central switch            |
| Tree     | floor switches → core switch (star of stars)          |
| Mesh     | every node linked to every other node                 |

**Description.**

1. **Bus topology:** all devices connect to a single backbone cable through drop lines. _Advantages:_ least cable, cheap, easy to extend. _Disadvantages:_ a backbone fault stops the whole network; collisions increase with load; faults are hard to locate.
2. **Ring topology:** each device connects to two neighbours to form a closed loop, and data travels in one direction. A token-passing method lets only the token holder transmit. _Advantages:_ no collisions, fair and predictable access. _Disadvantages:_ a single break can stop the ring unless a dual ring is used; adding a node disturbs the network.
3. **Star topology:** each device has a dedicated link to a central hub or switch. _Advantages:_ a cable fault affects only one device; easy to install, expand and troubleshoot. _Disadvantages:_ the central device is a single point of failure; more cable than a bus.
4. **Tree topology:** several star networks are connected to a higher-level device in a hierarchy. _Advantages:_ scalable and easy to manage by department or floor. _Disadvantages:_ failure of the root or backbone disconnects whole branches; more cabling.
5. **Mesh topology:** devices are interconnected by multiple links; in a full mesh of n devices there are n(n − 1)/2 links and each device needs n − 1 ports. _Advantages:_ highest reliability, dedicated links, privacy. _Disadvantages:_ very high cost and complex installation. For example, 8 devices need 28 links.

**How a bus topology works.** A sending station places its frame on the backbone. The signal travels in both directions and reaches every station. Each station checks the destination MAC address and accepts only frames addressed to it. Terminators at both ends absorb the signal to prevent reflections. Because all stations share one medium, only one can transmit at a time, and Ethernet controls access with CSMA/CD: a station listens before sending and, if a collision is detected, stops and retries after a random back-off time.

**Comparison.**

| Basis                      | Bus           | Ring             | Star             | Mesh                  |
| -------------------------- | ------------- | ---------------- | ---------------- | --------------------- |
| Effect of one link failure | whole network | whole ring       | one node         | none (re-routes)      |
| Cost                       | lowest        | low              | medium           | highest               |
| Collisions                 | yes           | no               | no with a switch | no                    |
| Typical use                | old Ethernet  | Token Ring, FDDI | office LAN       | WAN core, data center |

**Purpose of IEEE 802.11.** IEEE 802.11 is the standard for wireless local area networks (Wi-Fi). It defines the physical layer (frequency bands such as 2.4, 5 and 6 GHz, modulation and data rates) and the MAC layer, which uses CSMA/CA to avoid collisions on the shared radio channel. Its versions include 802.11n (Wi-Fi 4), 802.11ac (Wi-Fi 5) and 802.11ax (Wi-Fi 6), which let laptops and phones join a LAN without cables.

**Example.** A bank head office uses a tree topology: each floor has a star of PCs around an access switch, the floor switches connect to two core switches, and the core switches and data-center routers are joined in a partial mesh so that one failure does not stop banking services.

**Conclusion.** No single topology is best. Star and tree topologies dominate modern LANs because they are easy to manage and fault-tolerant at the edge, while mesh links are used where uptime matters most, such as a bank's core network and data center.

### Recall check

1. A full mesh connects 6 routers. How many links are needed, and how many ports does each router need?
2. Give three differences between UTP and STP, and one reason UTP is preferred in offices.
3. Why does IEEE 802.11 use CSMA/CA instead of CSMA/CD?

#### Solution

1. 6 × 5 / 2 = **15 links**; each router needs **5 ports**.
2. STP has a metal shield, UTP has none; STP resists EMI and crosstalk better; STP costs more, is heavier and must be grounded. UTP is preferred because it is cheap, thin, easy to install and already carries 1 Gbps over 100 m (Cat5e/Cat6).
3. A wireless station cannot listen while it transmits, and hidden stations may not hear each other, so collisions cannot be detected reliably; 802.11 therefore tries to **avoid** them (listen, wait a random back-off, optional RTS/CTS, acknowledgements).

## Diagnostic misses (2 Oct)

### Common port numbers

| Port  | Protocol | Port | Protocol |
| ----- | -------- | ---- | -------- |
| 20/21 | FTP      | 110  | POP3     |
| 22    | SSH      | 143  | IMAP     |
| 23    | Telnet   | 161  | SNMP     |
| 25    | SMTP     | 443  | HTTPS    |
| 53    | DNS      | 3389 | RDP      |
| 67/68 | DHCP     | 80   | HTTP     |

- **Common mistake:** 8080 is an alternative HTTP port, not the HTTPS default.

### Usable hosts in a subnet

- **Core idea:** usable hosts = 2^(32 − prefix) − 2. Subtract one network address and one broadcast address.
- **Bangla core:** হোস্ট বিট = ৩২ − প্রিফিক্স। মোট ঠিকানা = ২^হোস্ট বিট। প্রথমটি নেটওয়ার্ক আর শেষটি ব্রডকাস্ট, তাই ২টি বাদ দিতে হয়।
- **Exam points:** /24 = 254, /25 = 126, /26 = 62, /27 = 30, /28 = 14, /30 = 2. For /26 the block size is 64, so subnets start at .0, .64, .128, .192.
- **Common mistake:** forgetting to subtract 2 (answering 64).

### Part · Worked example: 192.16.13.0/30

1. Host bits = 32 − 30 = **2** → total addresses = 2² = **4** → usable = 4 − 2 = **2**.
2. Mask: 30 ones = 11111111.11111111.11111111.111111**00** = **255.255.255.252**. Block size = 256 − 252 = **4**.
3. Subnets in the 4th octet start at multiples of 4: .0, .4, .8 … The host .0 falls in the **.0 – .3** block.

| Item              | Value                 |
| ----------------- | --------------------- |
| Network address   | 192.16.13.0           |
| Subnet mask       | 255.255.255.252 (/30) |
| First valid host  | 192.16.13.1           |
| Last valid host   | 192.16.13.2           |
| Broadcast address | 192.16.13.3           |
| Valid hosts       | 2                     |
| Next subnet       | 192.16.13.4/30        |

- **Use:** /30 is the classic **point-to-point router link** (exactly 2 routers). (/31 gives 2 addresses with no network/broadcast, RFC 3021, for P2P links only.)
- **Trap:** 192.16.x.x is a **public** class C range; the private one is 192.**168**.x.x.

### Address-resolution protocols

- **Core idea:** ARP finds the MAC address for a known IP address.
- **Exam points:** RARP = MAC → IP. DNS = name → IP. DHCP assigns IP addresses automatically. ICMP carries errors and diagnostics (ping).
- **Common mistake:** choosing DNS because it also "resolves" addresses.

### Private IP ranges

- **Core idea:** three ranges are reserved for private networks (RFC 1918): 10.0.0.0/8, 172.16.0.0 to 172.31.255.255 (/12), and 192.168.0.0/16.
- **Exam points:** loopback = 127.0.0.0/8. APIPA (auto-assigned when DHCP fails) = 169.254.0.0/16.
- **Common mistake:** 172.32.x.x and 192.169.x.x look private but are public.

## NAT (Network Address Translation)

### The past questions

- Related PYQs: public vs private IP (Rupali Bank ANE, 04.11.2023); why move from classful to classless IP (Sonali Bank AsstDBA, 23.02.2024); IP address and why it is necessary (Pubali Bank HW Eng, 18.03.2023).
- Typical written form: "Briefly explain NAT. How can NAT help with IP address depletion?" (5–10 marks).

### Bangla core

**গল্পে বুঝি:** একটা অফিসে বাইরের জন্য একটাই ফোন নম্বর (রিসেপশন), ভেতরে ২০০টা extension। কেউ বাইরে ফোন করলে বাইরের লোক শুধু রিসেপশনের নম্বর দেখে। রিসেপশনিস্ট খাতায় লিখে রাখেন কোন কল কোন extension-এর; উত্তর এলে খাতা দেখে ঠিক extension-এ দেন। এখানে router = রিসেপশনিস্ট, public IP = রিসেপশনের নম্বর, private IP = extension, NAT table = খাতা।

**ধাপে ধাপে:**

1. **কী:** NAT হলো router বা firewall-এর এমন কৌশল, যা private network আর Internet-এর মাঝখানে packet যাওয়া-আসার সময় header-এর IP address (প্রায়ই port-ও) বদলে দেয়।
2. **কেন দরকার:** IPv4-এ মোট address মাত্র প্রায় ৪৩০ কোটি (2³²), অথচ ডিভাইস তার চেয়ে অনেক বেশি। তাই ভেতরে private address (10/8, 172.16/12, 192.168/16) ব্যবহার হয়, যা Internet-এ route হয় না।
3. **বাইরে যাওয়ার সময়:** PC 192.168.1.10:5000 থেকে packet গেলে router source বদলে নিজের public IP 103.20.5.1:40001 বসায় এবং mapping-টা NAT table-এ লিখে রাখে।
4. **উত্তর আসার সময়:** server উত্তর পাঠায় 103.20.5.1:40001-এ; router table দেখে destination আবার 192.168.1.10:5000 করে ভেতরে পাঠায়।
5. **তিন ধরন:** Static NAT = ১টা private ↔ ১টা public, স্থায়ী (বাইরে থেকে যেখানে ঢুকতে হয়, যেমন web server)। Dynamic NAT = public IP-এর একটা pool থেকে যে আগে আসে সে পায়। PAT / NAT overload = অনেক private → একটা public, port নম্বর দিয়ে আলাদা করা; বাসা-অফিসে এটাই চলে।
6. **IPv4 সংকট কমায় কীভাবে:** private range পৃথিবীর সব network বারবার ব্যবহার করতে পারে; PAT-এ একটা public IP দিয়ে হাজার হাজার ডিভাইস চলে; ISP-কে প্রতিটি ডিভাইসের জন্য আলাদা public IP দিতে হয় না। তবে NAT নতুন address বানায় না, শুধু ভাগ করে দেয়; স্থায়ী সমাধান IPv6।
7. **সুবিধা ও অসুবিধা:** ভেতরের address লুকানো থাকে, ISP বদলালে ভেতরে নতুন করে address বসাতে হয় না। কিন্তু end-to-end সংযোগ ভাঙে, বাইরে থেকে ঢুকতে port forwarding লাগে, আর VoIP, IPsec, P2P-তে সমস্যা হয়।

**এক লাইনে:** ভেতরে অনেক, বাইরে একটা, port দিয়ে চেনা — এটাই PAT।

### Picture it

An office building has one public phone number (the reception) and 200 internal extensions. When an employee calls outside, the outsider only sees the reception number. The receptionist keeps a notebook: "call to the bank on line 7 belongs to extension 214." When the bank calls back, the receptionist checks the notebook and forwards it to extension 214. The router is the receptionist, the public IP is the reception number, private IPs are the extensions, and the NAT table is the notebook.

### Understand it step by step

1. **Definition:** NAT is a technique, usually on a router or firewall, that rewrites the source (or destination) IP address — and often the port — in packet headers as they pass between a private network and the Internet. Defined in RFC 3022.
2. **Why it exists:** IPv4 has only about 4.3 billion addresses (2³²), far fewer than the number of devices. Hosts inside use **private addresses** (RFC 1918: 10/8, 172.16/12, 192.168/16), which are not routable on the Internet.
3. **Outgoing packet:** PC 192.168.1.10:5000 → router replaces the source with its public IP 103.20.5.1:40001 and records the mapping in the **NAT table**.
4. **Reply:** the server answers 103.20.5.1:40001 → router looks up the table → rewrites the destination back to 192.168.1.10:5000 → delivers it.
5. **Types:**

| Type                        | Mapping                                                              | Use                                                           |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- |
| Static NAT                  | 1 private ↔ 1 public, fixed                                         | Servers that must be reached from outside (web, mail)         |
| Dynamic NAT                 | Private → one from a **pool** of public IPs, first come first served | Many hosts, limited pool; no saving if all are online at once |
| PAT / NAPT / "NAT overload" | **Many private → one public**, separated by **port numbers**         | Homes, offices, banks' branch LANs — the common type          |

6. **How NAT helps with IP address depletion:**
   - **Address reuse:** private ranges are reused in millions of networks; only the edge router needs a public IP.
   - **Port multiplexing (PAT):** one public IP can serve thousands of hosts at once, because each session gets a unique port (16-bit → up to ~65,000 per protocol per IP).
   - **Fewer allocations needed:** an ISP gives an organisation 1 or a few public IPs instead of one per device. **CGNAT** (carrier-grade NAT) lets ISPs share even those among customers (shared range 100.64.0.0/10).
   - **Bought time for IPv4:** together with CIDR, NAT delayed IPv4 exhaustion until IPv6 adoption — it is a **workaround, not a cure**.
7. **Side benefits:** hides the internal address plan (some security by obscurity), lets you change ISP without re-addressing inside.
8. **Drawbacks:** breaks true end-to-end connectivity; inbound connections need port forwarding/static NAT; problems with some protocols (IPsec AH, SIP/VoIP, FTP active mode, peer-to-peer) without NAT traversal (ALG, STUN); extra processing and a state table on the router; harder logging and tracing (which user had which port at what time).

### Mindmap

```mindmap
NAT
  **What**
    rewrites IP (+ port) at the router
    private ↔ public
    NAT table keeps mappings
  **Types**
    Static: 1 ↔ 1
    Dynamic: pool
    PAT / overload: many → 1 by port
  **Helps IPv4 depletion**
    private ranges reused (RFC 1918)
    1 public IP for many hosts
    CGNAT at ISP (100.64/10)
    with CIDR, bought time for IPv6
  **Benefits**
    hides internal addresses
    change ISP without re-addressing
  **Drawbacks**
    breaks end-to-end
    inbound needs port forwarding
    VoIP, IPsec, P2P issues
    router state + logging load
```

### Remember it

- **"Many inside, one outside, ports decide"** — that is PAT.
- **S-D-P:** Static (1:1), Dynamic (pool), PAT (port).
- NAT is a **painkiller**, IPv6 is the **cure**.

### Exam trap

- Saying NAT "creates more IP addresses" — it does not; it **shares** public addresses.
- Mixing up Dynamic NAT and PAT: Dynamic NAT still needs one public IP per active host; only PAT shares one IP among many.
- Calling NAT a firewall — it hides addresses but does not inspect or filter traffic by policy.
- Forgetting that NAT works mainly at the **network layer** but PAT also changes **transport-layer** ports.

### Exam answer (10 marks)

**Definition.** Network Address Translation (NAT) is a method, implemented on a router or firewall at the boundary of a private network, that modifies the IP address information in packet headers while they are in transit. It maps private (non-routable) IP addresses used inside an organisation to one or more public IP addresses used on the Internet, and keeps the mappings in a translation table so that replies reach the correct internal host.

**Operation.** When an internal host (192.168.1.10:5000) sends a packet to the Internet, the NAT router replaces the source address with its public address (e.g., 103.20.5.1:40001) and stores the mapping. When the reply arrives at 103.20.5.1:40001, the router looks up the table, restores the original private address and port, and forwards the packet inside.

Private LAN (192.168.1.0/24) → [NAT router: translation table] → Internet (public IP 103.20.5.1)

**Types.** (i) Static NAT — one private address permanently mapped to one public address, used for servers; (ii) Dynamic NAT — private addresses mapped to a pool of public addresses on demand; (iii) Port Address Translation (PAT/NAT overload) — many private addresses share one public address, distinguished by port numbers.

**Role in IP address depletion.** IPv4 provides about 4.3 billion addresses, which is insufficient for today's devices. NAT relieves this shortage in four ways:

1. Organisations use private address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) internally, and these ranges can be reused by every network in the world.
2. With PAT, a single public address can serve hundreds or thousands of hosts simultaneously, because each session is identified by a unique port number.
3. ISPs therefore need to allocate only one or a few public addresses per customer; with carrier-grade NAT they can even share public addresses among customers.
4. Combined with CIDR, NAT has greatly slowed the exhaustion of IPv4 addresses and given time for the transition to IPv6.

**Additional advantages and limitations.** NAT hides the internal addressing scheme and lets an organisation change ISP without renumbering. However, it breaks end-to-end connectivity, requires port forwarding for inbound services, complicates protocols such as IPsec, VoIP and peer-to-peer applications, and adds processing load on the router.

**Conclusion.** NAT is not a permanent solution to address shortage but an effective conservation technique; the long-term solution is IPv6, whose 128-bit address space removes the need for address translation.

### Recall check

1. In PAT, what lets the router tell two internal hosts apart when both use the same public IP?
2. Why does Dynamic NAT alone not save public addresses when all hosts are online?
3. Name two applications or protocols that NAT can break, and one fix.
