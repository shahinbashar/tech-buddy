# Telecom & Cellular Networks

Complete exam notes for a telecom Assistant Manager (Technical) syllabus: radio basics, cellular concepts, 2G→5G core, IMS, HLR/HSS, NFV, C-RAN/O-RAN, slicing, power systems, scripting and the Bangladesh telecom industry. Every topic has a Bangla explanation, a mindmap, exam traps and a model answer.

## How to use this page (fast track)

| Pass | What to read                                       | Time  |
| ---- | -------------------------------------------------- | ----- |
| 1    | বাংলা only (button above) — understand every topic | 3–4 h |
| 2    | Mindmaps only + the 4 architecture diagrams        | 1 h   |
| 3    | Exam answers + Exam traps                          | 2 h   |
| 4    | Numericals section + Last-day sheet                | 1 h   |

**Draw from memory:** GSM, LTE (EPC), 5G (5GC), IMS. These four drawings fit almost any written question.

# 1 · Telecom basics

## Telecom basics · signals, units, network parts

### Bangla core

**গল্পে বুঝি:** টেলিকম নেটওয়ার্ক হলো একটা ডাক ব্যবস্থার মতো। আপনার কথা (signal) একটা খামে (packet/frame) ভরে রাস্তা (link) দিয়ে পোস্ট অফিস (switch/router) হয়ে প্রাপকের কাছে যায়।

**ধাপে ধাপে:**

1. যেকোনো telecom system-এর তিন অংশ: **access** (ব্যবহারকারী থেকে নেটওয়ার্ক — mobile tower, fiber to home), **transport/backhaul** (টাওয়ার থেকে core পর্যন্ত), **core** (switching, routing, billing, authentication)।
2. Signal দুই রকম: **analog** (continuous, যেমন পুরোনো voice) আর **digital** (0/1)। আধুনিক নেটওয়ার্ক সব digital।
3. Analog voice-কে digital করতে **PCM**: sampling (Nyquist: 2 × সর্বোচ্চ frequency), quantization, encoding। Voice 4 kHz → 8000 sample/s × 8 bit = **64 kbps** (একটা DS0 channel)।
4. **dB** হলো অনুপাতের log মাপ: 10·log10(P2/P1)। ৩ dB মানে দ্বিগুণ power, ১০ dB মানে ১০ গুণ।
5. **dBm** = 1 mW-এর সাথে তুলনা। 1 W = 30 dBm, 20 W ≈ 43 dBm।
6. **Bandwidth** (Hz) = কত frequency জায়গা পাচ্ছি; **data rate** (bps) = কত bit পাঠাচ্ছি। Shannon: C = B·log2(1 + SNR)।
7. **Multiplexing:** এক link-এ অনেক user — FDM (frequency ভাগ), TDM (সময় ভাগ), CDM (code ভাগ), WDM (fiber-এ আলোর রং ভাগ)।
8. **Duplex:** FDD (upload আর download আলাদা frequency-তে), TDD (একই frequency, আলাদা সময়ে)।
9. **QoS-এর মাপ:** latency, jitter, packet loss, throughput; voice-এর জন্য latency < 150 ms ভালো।

**এক লাইনে:** Telecom = access + transport + core; signal digital, মাপ dB-তে, ক্ষমতা Shannon দিয়ে।

### Picture it

Imagine sending a letter from Dhaka to a village in Satkhira. You drop it at the local post office (**access network**), it rides a truck on the highway (**transport/backhaul**), and the central sorting office decides where it goes, checks the stamp and keeps the records (**core network**). Telecom works the same way, except the "letter" is your voice turned into numbers, and the trip takes milliseconds.

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Signal:** তথ্য বহনকারী তরঙ্গ — যেমন মুখের কথা বাতাসে ঢেউ তোলে।
- **Analog:** ঢেউয়ের মতো একটানা মান (০ থেকে ১০-এর মধ্যে যেকোনো মান)।
- **Digital:** শুধু ০ আর ১ — লাইট সুইচের মতো, হয় অন নয় অফ। Noise-এ কম নষ্ট হয়, তাই আধুনিক নেটওয়ার্ক digital।
- **Sampling:** প্রতি সেকেন্ডে কতবার কথার "ছবি" তোলা হয়। ভিডিও যেমন প্রতি সেকেন্ডে ২৫টা ছবি, কথা তেমনি ৮০০০টা।
- **Bandwidth:** রাস্তার চওড়া — যত চওড়া, তত বেশি গাড়ি (data) একসাথে।
- **dB:** "কত গুণ" বোঝানোর ছোট মাপ। ১০০০ গুণ লিখতে ঝামেলা, dB-তে শুধু ৩০।

**একটা উদাহরণ দিয়ে পুরোটা:** আপনি "হ্যালো" বললেন →

1. ফোনের microphone কথাকে বিদ্যুৎ-তরঙ্গে (analog) বদলায়।
2. প্রতি সেকেন্ডে ৮০০০ বার তরঙ্গের উচ্চতা মাপা হয় (sampling)।
3. প্রতিটা মাপকে ৮ bit-এর একটা সংখ্যায় লেখা হয় (quantization + encoding) → ৮০০০ × ৮ = ৬৪,০০০ bit প্রতি সেকেন্ডে।
4. এই bit-গুলো টাওয়ার (access) → backhaul → core হয়ে বন্ধুর ফোনে যায়।
5. বন্ধুর ফোন উল্টো কাজ করে সংখ্যা থেকে আবার শব্দ বানায়।

**কেন dB এত ব্যবহার হয়:** নেটওয়ার্কে signal লাখো গুণ দুর্বল হয়। গুণ-ভাগ না করে dB-তে শুধু যোগ-বিয়োগ: transmitter 43 dBm, antenna +15 dB, cable −3 dB → 55 dBm। সহজ।

**পরীক্ষায় প্রশ্ন এলে মনে রাখো:** "কেন digital?" → noise প্রতিরোধ, encryption সম্ভব, compression, এক লাইনে voice-video-data সব।

### Understand it step by step

1. **Network segments:** access network (RAN, FTTH, DSL), transport (microwave, fiber, MPLS), core (switching, subscriber database, gateways, billing — OSS/BSS).
2. **PCM:** sample at ≥ 2f_max (Nyquist), quantize, encode. 8 kHz × 8 bits = 64 kbps. E1 = 32 × 64 kbps = **2.048 Mbps** (Bangladesh/Europe); T1 = 24 channels = 1.544 Mbps (USA).
3. **Decibels:** dB = 10 log10(P2/P1); dBm = 10 log10(P/1 mW). Gains and losses in dB simply add.
4. **Shannon capacity:** C = B log2(1 + S/N), with S/N as a ratio (30 dB = 1000).
5. **Multiplexing and duplexing:** FDM, TDM, CDM, WDM; FDD vs TDD.
6. **Switching:** circuit switching (dedicated path, PSTN, 2G voice) vs packet switching (shared, IP, 4G/5G).
7. **OSS/BSS:** OSS runs the network (fault, configuration, performance); BSS runs the business (billing, CRM, orders).

### Mindmap

```mindmap
Telecom basics
  **Network parts**
    access (RAN, FTTH)
    transport / backhaul
    core (switch, DB, billing)
    OSS / BSS
  **Signals**
    analog vs digital
    PCM: sample, quantize, encode
    64 kbps voice, E1 = 2.048 Mbps
  **Units**
    dB = 10 log ratio
    dBm: 1 W = 30 dBm
    3 dB = double
  **Capacity**
    Shannon C = B log2(1+SNR)
    Nyquist 2f
  **Sharing**
    FDM, TDM, CDM, WDM
    FDD vs TDD
  **QoS**
    latency, jitter, loss
```

### Remember it

- **"8 × 8 = 64"** — 8 kHz sampling × 8 bits = 64 kbps.
- **E1 = 32 slots, T1 = 24 slots.**
- **+3 dB = ×2, +10 dB = ×10.**

### Exam trap

- Using SNR in dB directly in Shannon. Convert first: 30 dB → 1000.
- E1 has 32 timeslots but only **30 carry voice** (TS0 sync, TS16 signalling).

### Exam answer · Circuit switching vs packet switching

|              | Circuit switching                            | Packet switching                    |
| ------------ | -------------------------------------------- | ----------------------------------- |
| Path         | Dedicated end-to-end path set up before talk | No fixed path; each packet routed   |
| Resource use | Reserved even when silent (wasteful)         | Shared; used only when data flows   |
| Delay        | Constant, low after setup                    | Variable (queuing, jitter)          |
| Billing      | By time                                      | By volume                           |
| Examples     | PSTN, 2G/3G CS voice (MSC)                   | Internet, GPRS, LTE EPC, 5GC, VoLTE |

Modern operators moved to packet switching because IP links are cheaper, carry voice, video and data together, and scale with demand. QoS mechanisms (QCI/5QI, bearers) give voice the priority that circuits once guaranteed.

# 2 · Radio communication basics

## Radio basics · frequency, propagation, modulation, access

### Bangla core

**গল্পে বুঝি:** রেডিও তরঙ্গ পুকুরের ঢেউয়ের মতো। ঢেউ যত ঘন (high frequency), তত বেশি তথ্য নেয় কিন্তু তত কম দূরে যায় আর দেয়ালে আটকে যায়।

**ধাপে ধাপে:**

1. **λ = c / f** (c = 3×10⁸ m/s)। 900 MHz → λ ≈ 0.333 m; 3.5 GHz → ≈ 8.6 cm।
2. **Low frequency** (700/900 MHz) = বড় coverage, ভবনের ভেতরে ভালো ঢোকে; **high frequency** (3.5 GHz, mmWave 26 GHz) = বেশি bandwidth/speed, কম coverage।
3. **Path loss:** দূরত্ব আর frequency বাড়লে signal দুর্বল হয়। Free space-এ দূরত্ব দ্বিগুণ হলে loss ৬ dB বাড়ে।
4. **Fading:** multipath (একই signal কয়েক পথে এসে মিশে যাওয়া), shadowing (ভবন/পাহাড়ের আড়াল)। প্রতিকার: diversity, MIMO, equalizer।
5. **Modulation:** তথ্য বসানো হয় carrier-এর amplitude (ASK/AM), frequency (FSK/FM) বা phase (PSK)-এ। QAM = amplitude + phase। 64-QAM = 6 bit/symbol, 256-QAM = 8 bit/symbol।
6. Signal ভালো হলে উঁচু QAM, খারাপ হলে QPSK — একে **adaptive modulation** বলে।
7. **Multiple access:** FDMA (1G), TDMA (2G GSM), CDMA (3G), OFDMA (4G/5G downlink), SC-FDMA (4G uplink, battery বাঁচায়)।
8. **OFDM:** একটা চওড়া channel-কে অনেক ছোট orthogonal subcarrier-এ ভাগ করে; multipath সামলায়। LTE subcarrier spacing 15 kHz; 5G-তে 15/30/60/120 kHz (numerology)।
9. **MIMO:** একাধিক antenna দিয়ে একসাথে কয়েকটা stream — speed বাড়ে। **Massive MIMO + beamforming** 5G-এর মূল অস্ত্র।
10. **Antenna gain** dBi-তে; **EIRP** = transmit power + antenna gain − cable loss।

**এক লাইনে:** কম frequency দূরে যায়, বেশি frequency দ্রুত চলে; OFDMA + MIMO + উঁচু QAM = আধুনিক speed।

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Frequency (f):** প্রতি সেকেন্ডে ঢেউ কতবার ওঠানামা করে। 900 MHz মানে সেকেন্ডে ৯০ কোটি বার।
- **Wavelength (λ):** একটা ঢেউয়ের দৈর্ঘ্য। frequency বাড়লে ঢেউ ছোট হয়।
- **Carrier:** যে তরঙ্গের পিঠে তথ্য চড়ে — বাহক ঘোড়ার মতো।
- **Modulation:** ঘোড়ার পিঠে মাল চাপানোর পদ্ধতি — উচ্চতা বদলে (AM), গতি বদলে (FM), দিক বদলে (PM)।
- **QAM:** একসাথে উচ্চতা আর দিক বদলানো → এক চালে বেশি bit।
- **Fading:** signal হঠাৎ দুর্বল হওয়া — যেমন লিফটে ঢুকলে কল কেটে যায়।
- **MIMO:** একাধিক antenna — একাধিক নল দিয়ে পানি ঢালার মতো, তাড়াতাড়ি ভরে।

**কেন কম frequency দূরে যায় — সহজ ব্যাখ্যা:**

1. বড় ঢেউ (কম frequency) দেয়াল, গাছ, বৃষ্টির ফোঁটার পাশ দিয়ে বেঁকে যেতে পারে।
2. ছোট ঢেউ (বেশি frequency) বাধায় ধাক্কা খেয়ে শোষিত হয়।
3. তাই গ্রামে 900 MHz দিয়ে বড় এলাকা ঢাকা হয়; শহরে ভিড়ের জায়গায় 2600/3500 MHz দিয়ে speed দেওয়া হয়।
4. একটা উপমা: ঢাক (low) অনেক দূর থেকে শোনা যায়, বাঁশি (high) কাছেই শোনা যায় কিন্তু সুর বেশি পরিষ্কার।

**QAM-এর হিসাব ছবির মতো:** 16-QAM মানে ১৬টা আলাদা "চিহ্ন" — প্রতিটা চিহ্ন ৪ bit (কারণ 2⁴ = 16)। 64 চিহ্ন → 6 bit। কিন্তু চিহ্ন বেশি হলে একটার সাথে আরেকটা গুলিয়ে যায়, তাই signal ভালো না হলে উঁচু QAM চলে না — দূরে গেলে ফোন নিজেই QPSK-তে নামে।

**OFDM ছবির মতো:** একটা চওড়া নদীতে একটা বড় জাহাজের বদলে শত শত ছোট নৌকা পাশাপাশি — কোনো একটা ঢেউয়ে আটকালেও বাকিগুলো চলে। প্রতিটা ছোট নৌকা = subcarrier।

**পরীক্ষায় প্রশ্ন এলে মনে রাখো:** low band = coverage, mid band = coverage + capacity balance (5G-এর মূল 3.5 GHz), mmWave = শুধু capacity।

### Understand it step by step

1. **Wavelength:** λ = c/f. Antenna size scales with λ (λ/2 dipole).
2. **Spectrum bands:** sub-1 GHz (coverage layer), 1–6 GHz (capacity layer, 1800/2100/2600/3500 MHz), mmWave 24–40 GHz (hotspot capacity).
3. **Free-space path loss:** FSPL(dB) = 20log10(d_km) + 20log10(f_MHz) + 32.44.
4. **Fading:** large-scale (path loss, shadowing) vs small-scale (multipath, Doppler). Fixes: diversity, MIMO, channel coding, interleaving.
5. **Modulation order:** BPSK 1, QPSK 2, 16-QAM 4, 64-QAM 6, 256-QAM 8, 1024-QAM 10 bits/symbol.
6. **Access schemes by generation:** FDMA → TDMA → CDMA (WCDMA) → OFDMA/SC-FDMA → OFDMA (both links in 5G NR).
7. **OFDM benefits:** robust to multipath (cyclic prefix), flexible bandwidth, simple equalization. Drawback: high PAPR (why uplink uses SC-FDMA in LTE).
8. **MIMO:** spatial multiplexing (more throughput), diversity (more reliability), beamforming (focused energy, less interference).

### Mindmap

```mindmap
Radio basics
  **Wave**
    λ = c / f
    low f = coverage
    high f = capacity
  **Propagation**
    path loss (+6 dB per 2× distance)
    shadowing, multipath fading
    Doppler
  **Modulation**
    ASK, FSK, PSK
    QAM: 64 = 6 bit, 256 = 8 bit
    adaptive modulation
  **Access**
    FDMA 1G, TDMA 2G
    CDMA 3G, OFDMA 4G/5G
    SC-FDMA LTE uplink
  **Antenna**
    MIMO, massive MIMO
    beamforming
    EIRP = P + G − L
```

### Remember it

- **"F-T-C-O"** = FDMA, TDMA, CDMA, OFDMA → 1G, 2G, 3G, 4G/5G.
- **bits per symbol = log2(M):** 64-QAM → 6.
- **"Low reaches, high races."**

### Exam trap

- LTE **uplink is SC-FDMA**, not OFDMA (lower PAPR saves phone battery).
- Doubling frequency also adds 6 dB free-space loss — same as doubling distance.

### Exam answer · Why OFDMA for 4G/5G?

OFDMA divides a wide channel into many narrow, mutually orthogonal subcarriers and assigns groups of them (resource blocks) to different users in time and frequency. Each subcarrier sees almost flat fading, so a simple one-tap equalizer works; a cyclic prefix absorbs multipath delay. Bandwidth scales easily (1.4–20 MHz in LTE, up to 100 MHz below 6 GHz in 5G NR), scheduling is flexible per user, and it combines naturally with MIMO. Its weakness is a high peak-to-average power ratio, which is why LTE uses SC-FDMA in the uplink.

# 3 · Basic concept of cellular networks

## Cellular concept · cells, reuse, handover, capacity

### Bangla core

**গল্পে বুঝি:** একটা বড় শহরে একটা মাত্র বিশাল লাউডস্পিকারের বদলে প্রতিটা পাড়ায় ছোট ছোট মাইক — একই গান (frequency) দূরের পাড়ায় আবার বাজানো যায়, পাশের পাড়ায় নয়। এটাই cellular concept।

**ধাপে ধাপে:**

1. পুরো এলাকা ছোট ছোট **cell**-এ ভাগ করা হয়, ছবিতে ষড়ভুজ (hexagon), কারণ hexagon ফাঁক ছাড়া এলাকা ঢাকে।
2. প্রতিটা cell-এ একটা **base station** (BTS/NodeB/eNodeB/gNB)।
3. **Frequency reuse:** মোট channel কয়েকটা cell-এর **cluster**-এ ভাগ হয়; পরের cluster আবার একই channel ব্যবহার করে।
4. Cluster size **N = i² + ij + j²** → N = 1, 3, 4, 7, 12…। GSM-এ সাধারণত N = 7 (বা 4)।
5. ২৮০ channel, N = 7 → প্রতি cell-এ **৪০ channel**।
6. **Reuse distance D = R√(3N)**; N বড় হলে interference কম, কিন্তু প্রতি cell-এ channel কম।
7. **Co-channel interference** (একই frequency-র দূরের cell থেকে) আর **adjacent channel interference** (পাশের frequency থেকে)।
8. **Handover:** চলন্ত user এক cell থেকে আরেক cell-এ যায়। **Hard handover** (আগে ছাড়ো, পরে ধরো — GSM, LTE), **soft handover** (একসাথে দুটো ধরে রাখো — 3G CDMA)।
9. Capacity বাড়ানোর উপায়: **cell splitting** (ছোট cell), **sectoring** (একটা tower-এ ৩টা ১২০° antenna), small cell, নতুন spectrum।
10. **Traffic:** Erlang = calls/hour × গড় সময় (hour)। ১০০ call × ৩ মিনিট = ৩০০ মিনিট = **৫ Erlang**।

**এক লাইনে:** ছোট cell + frequency reuse = সীমিত spectrum দিয়ে লাখো user; চলার সময় handover।

### Picture it

A city wants FM-style radio for every house, but has only 7 channels. One giant tower would let only 7 people talk at once in the whole city. Instead, the city is cut into small neighbourhoods (cells), each with a small tower. Channel 1 is used in Mirpur and again in Motijheel, far enough apart that they don't hear each other. Now thousands can talk at once with the same 7 channels. When you ride a rickshaw from one neighbourhood to the next, your call is passed to the next tower (handover).

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Cell:** একটা টাওয়ার যতটুকু এলাকা ঢাকে।
- **Cluster:** পাশাপাশি কয়েকটা cell-এর দল, যারা মিলে সব channel একবার করে ব্যবহার করে।
- **Reuse:** একই channel দূরের cell-এ আবার ব্যবহার।
- **Interference:** দুই জায়গার একই channel একে অপরের কথায় ঢুকে পড়া — পাশের বাড়ির মাইকের শব্দের মতো।
- **Handover:** চলার পথে কল এক টাওয়ার থেকে আরেকটায় সরানো।
- **Erlang:** একটা লাইন কতক্ষণ ব্যস্ত থাকে তার মাপ। 1 Erlang = এক লাইন পুরো এক ঘণ্টা ব্যস্ত।

**ধাপে ধাপে একটা হিসাব (পরীক্ষায় আসে):**

1. মোট channel = 280, cluster size N = 7।
2. প্রতি cell পায় 280 ÷ 7 = 40 channel।
3. শহরে যদি 70টা cell থাকে, তাহলে মোট একসাথে কল = 70 × 40 = 2800 — যদিও channel মাত্র 280!
4. এটাই reuse-এর জাদু: ১০ গুণ বেশি capacity।

**কেন N ছোট হলে ঝুঁকি:** N = 3 হলে প্রতি cell-এ বেশি channel (280 ÷ 3 ≈ 93), কিন্তু একই channel-এর cell কাছাকাছি চলে আসে → interference বাড়ে। N বড় → নিরাপদ কিন্তু কম capacity। এটাই trade-off।

**Hard vs soft handover উপমা:** Hard = এক নৌকা থেকে লাফ দিয়ে আরেক নৌকায় (মাঝে এক মুহূর্ত কোনোটাতেই নেই); Soft = এক পা এই নৌকায় রেখেই আরেক পা পরের নৌকায় (দুটো একসাথে)।

**Sectoring উপমা:** এক টাওয়ারে চারদিকে একটা বাল্বের বদলে তিনটা টর্চ, প্রতিটা ১২০° দিকে — একই টাওয়ার ৩ গুণ user সামলায়, interference কম।

### Understand it step by step

1. **Cell types:** macro (km), micro (hundreds of m), pico (indoor), femto (home).
2. **Cluster size:** N = i² + ij + j² with integers i, j. Valid N: 1, 3, 4, 7, 9, 12, 13…
3. **Channels per cell:** S/N. 280/7 = 40.
4. **Reuse ratio:** Q = D/R = √(3N). N = 7 → Q ≈ 4.58.
5. **Interference:** co-channel (fixed by larger N, sectoring) and adjacent-channel (fixed by filtering, guard bands).
6. **Handover types:** hard (break-before-make), soft (make-before-break, CDMA), softer (between sectors of one site); intra- vs inter-RAT (LTE ↔ 3G).
7. **Capacity tools:** cell splitting, sectoring (3 × 120°), microcells, carrier aggregation, MIMO.
8. **Erlang:** A = λ × h. Grade of service (blocking probability, e.g. 2%) from the Erlang-B table.

### Mindmap

```mindmap
Cellular concept
  **Cell**
    hexagon model
    macro, micro, pico, femto
    one base station each
  **Reuse**
    cluster N = i² + ij + j²
    N = 7: 280 → 40 per cell
    D = R√(3N)
  **Interference**
    co-channel
    adjacent channel
  **Handover**
    hard (GSM, LTE)
    soft (3G CDMA)
    intra / inter-RAT
  **Capacity**
    cell splitting
    sectoring 120°
    Erlang = calls × hours
```

### Remember it

- **"1-3-4-7-12"** — valid cluster sizes.
- **Hard = break then make; soft = make then break.**
- **Erlang = calls per hour × hours per call.**

### Exam trap

- N = 5 or 6 is **not** a valid cluster size.
- LTE and 5G use **hard handover** (soft handover is a CDMA/3G idea).

### Exam answer · What is frequency reuse?

Frequency reuse is the core idea of cellular systems: the service area is divided into small cells, and the available channels are divided among a cluster of N neighbouring cells. Clusters repeat, so the same channels are reused in cells separated by the reuse distance D = R√(3N), far enough that co-channel interference stays acceptable. With 280 channels and N = 7, each cell gets 40 channels, yet the whole city can carry many times 280 calls. A smaller N gives more capacity but more interference; operators balance it with sectoring and power control. In LTE and 5G, reuse factor 1 is used (every cell uses all frequencies) and interference is handled by scheduling and ICIC.

# 4 · Evolution 2G → 5G and the core network

## Evolution from circuit switching to packet core (EPC & 5GC)

### The past questions

This topic appears directly in the syllabus as "Evolution from Circuit Switching to Packet Core (EPC & 5GC)" and "Mobile Core and Backhaul Architectures". Expect a 10-mark "draw and explain" question.

### Bangla core

**গল্পে বুঝি:** 2G ছিল ট্রেন লাইন — কথা বলার জন্য পুরো লাইন বুক (circuit)। 3G-তে ট্রেন লাইনের পাশে বাস রাস্তা (packet data) যোগ হলো। 4G-তে সব কিছু বাসে (all-IP), কথাও। 5G-তে বাস কোম্পানি cloud-এ software হয়ে গেল — দরকার মতো নতুন রুট (slice) চালু করা যায়।

**ধাপে ধাপে:**

1. **2G GSM:** MS → **BTS** → **BSC** (radio নিয়ন্ত্রণ) → **MSC** (call switching) → PSTN। Database: **HLR** (স্থায়ী subscriber তথ্য), **VLR** (বর্তমান এলাকার visitor তথ্য), **AuC** (authentication key), **EIR** (চুরি যাওয়া ফোনের IMEI তালিকা)।
2. **2.5G GPRS/EDGE:** data-র জন্য packet core যোগ — **SGSN** (mobility, packet routing) আর **GGSN** (internet-এর gateway)।
3. **3G UMTS:** **NodeB** → **RNC**; voice তখনো MSC-তে circuit, data SGSN/GGSN-এ packet। HSPA দিয়ে speed বাড়ে।
4. **4G LTE (EPS = E-UTRAN + EPC):** **eNodeB** নিজেই radio নিয়ন্ত্রণ করে (RNC নেই — flat architecture)। EPC-তে:
   - **MME** = control: attach, authentication, paging, mobility।
   - **S-GW** = user data-র anchor, handover-এ।
   - **P-GW** = internet-এর gateway, IP address দেয়, policy প্রয়োগ।
   - **HSS** = subscriber database (HLR-এর উত্তরসূরি)।
   - **PCRF** = policy আর charging rule।
5. LTE-তে কোনো circuit নেই; voice চলে **VoLTE (IMS)**-এ, অথবা পুরোনো নেটওয়ার্কে ফেরত যায় (**CSFB**)।
6. **Control plane আর user plane আলাদা** — signalling MME-তে, data S-GW/P-GW-তে। পরে **CUPS** দিয়ে S/P-GW-এর ভেতরেও ভাগ হয়।
7. **5G core (5GC) — Service Based Architecture (SBA):** প্রতিটা function একটা software service, HTTP/2 API-তে কথা বলে।
   - **AMF** = registration, mobility (MME-এর অর্ধেক)।
   - **SMF** = session management, IP দেয় (MME + P-GW control অংশ)।
   - **UPF** = user data বহন (S-GW + P-GW user plane)।
   - **AUSF** = authentication; **UDM/UDR** = subscriber data (HSS-এর উত্তরসূরি)।
   - **PCF** = policy (PCRF-এর উত্তরসূরি); **NRF** = service registry; **NSSF** = slice নির্বাচন; **NEF** = বাইরের app-এর জন্য API।
8. **NSA vs SA:** NSA 5G = 5G radio কিন্তু 4G core (EPC) দিয়ে চলে, LTE anchor লাগে; SA = 5G radio + 5GC, slicing আর URLLC পুরোপুরি পাওয়া যায়।
9. **Interfaces মনে রাখো:** GSM-এ Abis (BTS-BSC), A (BSC-MSC); LTE-তে Uu (radio), X2 (eNB-eNB), S1-MME, S1-U, S11, S5/S8, S6a (MME-HSS), SGi (internet); 5G-তে N1 (UE-AMF), N2 (gNB-AMF), N3 (gNB-UPF), N4 (SMF-UPF), N6 (UPF-internet), Xn (gNB-gNB)।

**এক লাইনে:** Circuit (MSC) → circuit + packet (SGSN/GGSN) → all-IP EPC (MME, S-GW, P-GW, HSS) → cloud-native 5GC (AMF, SMF, UPF, UDM)।

### Bangla core · আরও সহজ করে

**প্রতিটা যন্ত্রের কাজ এক লাইনে (মুখস্থের জন্য):**

- **BTS:** টাওয়ারের radio — ফোনের সাথে কথা বলে।
- **BSC:** কয়েকটা BTS-এর ম্যানেজার — কোন ফোন কোন channel পাবে, handover।
- **MSC:** টেলিফোন এক্সচেঞ্জ — কল জোড়া লাগায়, billing record বানায়।
- **HLR:** গ্রাহকের স্থায়ী খাতা (নম্বর, প্যাকেজ, এখন কোথায়)।
- **VLR:** এলাকার অস্থায়ী খাতা।
- **SGSN:** data-র ডাকপিয়ন — ফোন কোথায় আছে জেনে packet পৌঁছায়।
- **GGSN / P-GW:** internet-এর দরজা — ফোনকে IP ঠিকানা দেয়।
- **MME:** 4G-এর ম্যানেজার — শুধু নির্দেশনা (signalling), data ছোঁয় না।
- **S-GW:** 4G-এর data-র মাঝের স্টেশন, handover-এ data হারাতে দেয় না।
- **HSS:** 4G-এর গ্রাহক database।
- **AMF / SMF / UPF:** 5G-তে MME-এর কাজ দুই ভাগ (AMF = কে ঢুকল/কোথায় গেল, SMF = session), আর gateway-রা মিলে UPF (data বহন)।

**একটা গল্পে পুরো evolution:**

1. **2G (১৯৯০-এর দশক):** আপনি কল দিলেন → MSC আপনার আর বন্ধুর মধ্যে একটা "তার" পুরো কলের জন্য বুক করে রাখল। চুপ থাকলেও তার আটকে। SMS ছিল, data প্রায় ছিল না।
2. **2.5G GPRS/EDGE:** মানুষ মোবাইলে internet চাইল। পুরো নেটওয়ার্ক না বদলে পাশে একটা data রাস্তা (SGSN + GGSN) বানানো হলো — packet-ভিত্তিক।
3. **3G:** দুই রাস্তা পাশাপাশি — voice এখনো MSC-তে, data দ্রুত হলো (WCDMA, HSPA)। Video call শুরু।
4. **4G (২০১০-এর দশক):** সিদ্ধান্ত হলো — আলাদা voice রাস্তা আর না, সব IP। MSC বাদ, RNC বাদ। eNodeB সরাসরি EPC-তে। কথাও এখন data (VoLTE)। ফল: সস্তা, দ্রুত, কম latency।
5. **5G:** সব function software হয়ে cloud-এ। দরকার মতো চালু-বন্ধ, নতুন slice, edge-এ UPF বসিয়ে latency ১ ms-এর কাছাকাছি।

**Control plane বনাম user plane — সবচেয়ে গুরুত্বপূর্ণ ধারণা:**

- **Control plane** = ট্রাফিক পুলিশের নির্দেশ ("এদিকে যাও")। 4G-তে MME, 5G-তে AMF/SMF।
- **User plane** = আসল গাড়ি (আপনার video, ছবি)। 4G-তে S-GW/P-GW, 5G-তে UPF।
- আলাদা রাখলে সুবিধা: পুলিশ (control) এক জায়গায় রেখে গাড়ির রাস্তা (UPF) গ্রাহকের কাছে বসানো যায় → দ্রুত।

**NSA vs SA উপমা:** NSA = নতুন গাড়ির বডি (5G radio) কিন্তু পুরোনো ইঞ্জিন (4G core) — দ্রুত বাজারে আনা যায়। SA = নতুন বডি + নতুন ইঞ্জিন (5GC) — slicing, URLLC সব পাওয়া যায়।

### Picture it

Think of a city's transport over 30 years. **2G** is a railway: to talk you book the whole track for the whole trip (circuit). **3G** keeps the railway for voice and adds bus lanes for data (packet core). **4G** tears up the rails: everything, voice included, rides the buses (all-IP EPC), and a dispatcher (MME) is separated from the roads (S-GW, P-GW). **5G** turns the bus company into an app: each function is a software service in a cloud, and you can launch a private bus route (slice) for an ambulance service in minutes.

### Understand it step by step

| Generation | Radio       | Controller     | Voice core  | Data core       | Subscriber DB      |
| ---------- | ----------- | -------------- | ----------- | --------------- | ------------------ |
| 2G GSM     | BTS         | BSC            | MSC (CS)    | —               | HLR, VLR, AuC, EIR |
| 2.5G GPRS  | BTS + PCU   | BSC            | MSC         | SGSN, GGSN      | HLR                |
| 3G UMTS    | NodeB       | RNC            | MSC (CS)    | SGSN, GGSN      | HLR                |
| 4G LTE     | eNodeB      | (none, in eNB) | IMS (VoLTE) | MME, S-GW, P-GW | HSS                |
| 5G NR      | gNB (CU/DU) | (none)         | IMS (VoNR)  | AMF, SMF, UPF   | UDM/UDR, AUSF      |

**4G → 5G function mapping**

| EPC (4G)               | 5GC (5G)                                |
| ---------------------- | --------------------------------------- |
| MME                    | AMF (access, mobility) + SMF (sessions) |
| S-GW + P-GW user plane | UPF                                     |
| P-GW control           | SMF                                     |
| HSS                    | UDM + AUSF (+ UDR)                      |
| PCRF                   | PCF                                     |
| —                      | NRF, NSSF, NEF (new)                    |

**Why the industry moved to a packet core:** one IP network for voice, video and data; lower cost per bit; higher speed; flat architecture with lower latency; easy virtualization and cloud deployment.

### Mindmap

```mindmap
2G → 5G core evolution
  **2G GSM (circuit)**
    BTS → BSC → MSC
    HLR, VLR, AuC, EIR
    Abis, A interfaces
  **2.5G / 3G**
    GPRS: SGSN, GGSN
    NodeB → RNC
    CS voice + PS data
  **4G EPC (all-IP)**
    eNodeB, no RNC
    MME = control
    S-GW, P-GW = data
    HSS, PCRF
    VoLTE or CSFB
  **5GC (SBA)**
    AMF, SMF, UPF
    AUSF, UDM, PCF
    NRF, NSSF, NEF
    HTTP/2 APIs
  **Deployment**
    NSA: 5G radio + EPC
    SA: 5G radio + 5GC
  **Trends**
    CUPS (control/user split)
    cloud-native, NFV
```

### Remember it

- **4G core = "M-S-P-H-P":** MME, S-GW, P-GW, HSS, PCRF.
- **5G core = "A-S-U":** AMF (access), SMF (session), UPF (user data) — plus AUSF, UDM, PCF, NRF.
- **MME splits into AMF + SMF; gateways merge into UPF.**
- **NSA = new radio, old core.**

### Exam trap

- Writing "RNC" in an LTE diagram. LTE has **no RNC**; the eNodeB does radio control.
- Saying the **S-GW** gives the IP address — it is the **P-GW** (4G) / **SMF** (5G).
- Saying NSA 5G supports network slicing fully — slicing needs **SA with 5GC**.

### Exam answer · Explain the evolution from circuit switching to the packet core (EPC and 5GC)

**Introduction.** Mobile core networks evolved from dedicated voice circuits to an all-IP, software-based core, to carry growing data traffic at lower cost.

**1. 2G (circuit-switched).** The MSC sets up a dedicated circuit for each call, using subscriber data in the HLR and VLR, and authentication from the AuC. Resources are reserved for the whole call even in silence.

**2. 2.5G/3G (circuit + packet).** GPRS added a packet-switched domain: the SGSN handles mobility and routing; the GGSN connects to the internet. 3G UMTS kept voice in the MSC but improved data with WCDMA and HSPA.

**3. 4G EPC (all-IP).** LTE removed the circuit domain. The eNodeB connects directly to the Evolved Packet Core: the MME handles signalling (attach, authentication, paging, mobility); the S-GW anchors user data during handover; the P-GW allocates IP addresses and connects to external networks; the HSS stores subscriber profiles; the PCRF provides QoS and charging rules. Voice moved to VoLTE over IMS. Control and user planes are separated.

**4. 5GC (service-based).** 5G splits functions further and runs them as cloud-native services with HTTP/2 APIs: the AMF (registration, mobility), the SMF (sessions), the UPF (user traffic), the AUSF and UDM (authentication and subscriber data), the PCF (policy), the NRF (service discovery) and the NSSF (slice selection). This enables network slicing, edge computing (UPF near users) and URLLC.

**Diagram:** UE — gNB — (N2) AMF / (N3) UPF — (N6) Internet; AMF–SMF–UPF linked via N11/N4; AMF, SMF, AUSF, UDM, PCF, NRF on the service bus.

**Conclusion.** The move from circuits to a packet core cut cost per bit, unified voice and data on IP, lowered latency, and made the network programmable — the base for 5G services.

# 5 · Mobile core and backhaul architectures

## Backhaul, fronthaul and transport

### Bangla core

**গল্পে বুঝি:** Tower হলো গ্রামের দোকান, core হলো শহরের বড় গুদাম। দোকান থেকে গুদামে মাল আনা-নেওয়ার রাস্তা হলো **backhaul**। দোকানের ভেতরে কাউন্টার (radio) থেকে পেছনের ঘর (baseband) পর্যন্ত ছোট রাস্তা **fronthaul**।

**ধাপে ধাপে:**

1. **Backhaul** = cell site থেকে core পর্যন্ত transport link।
2. মাধ্যম: **fiber** (সবচেয়ে বেশি capacity, কম latency, কিন্তু বসাতে খরচ ও সময়), **microwave** (দ্রুত বসানো যায়, line-of-sight লাগে, বৃষ্টিতে দুর্বল — বাংলাদেশে খুব প্রচলিত), **satellite** (দুর্গম এলাকা, latency বেশি), পুরোনো দিনে **E1/TDM**।
3. আধুনিক backhaul = **IP/MPLS** (IP-RAN), Carrier Ethernet।
4. 5G-তে base station ভেঙে তিন ভাগ: **RU** (radio unit, antenna-র কাছে), **DU** (distributed unit), **CU** (central unit)।
5. RU–DU সংযোগ = **fronthaul** (CPRI/eCPRI, খুব কম latency লাগে); DU–CU = **midhaul**; CU–core = **backhaul**।
6. **Synchronization** জরুরি: GPS বা **PTP (IEEE 1588)**, SyncE — বিশেষ করে TDD-তে।
7. Topology: ring (একটা link কাটলে উল্টো পথে চলে — resilience), star, mesh।
8. 5G-এর জন্য backhaul capacity কয়েক Gbps আর latency কয়েক ms দরকার — তাই **fiberization** বড় চ্যালেঞ্জ।

**এক লাইনে:** Fronthaul (RU–DU) → midhaul (DU–CU) → backhaul (CU–core); fiber সেরা, microwave দ্রুত, IP/MPLS এর ভাষা।

### Picture it

A mobile tower in Sylhet is like a village shop. It sells to customers (phones) all day, but it gets its goods from the Dhaka warehouse (core). The road between shop and warehouse is the **backhaul**. If the road is a narrow lane, the shop runs out of stock no matter how big the shop is — that is why a 5G tower on a slow microwave link still feels slow. In 5G, the shop itself is split: the counter on the roof (RU), the stockroom nearby (DU) and the head office (CU); the short paths between them are **fronthaul** and **midhaul**.

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Backhaul:** টাওয়ার → core পর্যন্ত রাস্তা।
- **Fronthaul:** antenna-র radio (RU) → baseband (DU) পর্যন্ত খুব ছোট কিন্তু খুব দ্রুত রাস্তা।
- **Microwave link:** দুই টাওয়ারের মাথায় থালার মতো antenna মুখোমুখি — বাতাস দিয়ে data। টাওয়ারে গোল থালা দেখলেই বুঝবেন।
- **Line of sight (LOS):** দুই থালা একে অপরকে "দেখতে" হবে — মাঝে উঁচু ভবন থাকলে চলবে না।
- **Rain fade:** বেশি frequency-র microwave বৃষ্টির ফোঁটায় দুর্বল হয় — বর্ষায় সমস্যা।
- **MPLS:** packet-এ ছোট label লাগিয়ে আগে থেকে ঠিক করা পথে দ্রুত পাঠানো — এক্সপ্রেস লেনের টিকিটের মতো।
- **Sync:** সব টাওয়ারের ঘড়ি এক সাথে মেলানো — না মিললে TDD-তে এক টাওয়ারের পাঠানো আর আরেকটার শোনা গুলিয়ে যায়।

**কোনটা কখন বেছে নেবো — সিদ্ধান্তের নিয়ম:**

1. শহরে, বেশি traffic, 5G → **fiber**।
2. দ্রুত নতুন টাওয়ার চালু করতে হবে, fiber নেই → **microwave**।
3. চর, পাহাড়, দ্বীপ (যেমন সেন্ট মার্টিন) → **satellite** বা লম্বা microwave hop।
4. গুরুত্বপূর্ণ site → **ring** বানাও, একদিকের তার কাটলে আরেকদিক দিয়ে চলে।

**বাংলাদেশের বাস্তবতা:** অনেক টাওয়ার এখনো microwave-এ; রাস্তা খোঁড়ায় fiber কাটা বড় সমস্যা; NTTN কোম্পানিগুলোর fiber ভাড়া নিয়ে অপারেটর চলে। 5G-র জন্য "fiberization" জাতীয় অগ্রাধিকার।

### Understand it step by step

1. **Transport segments (5G):** RU →(fronthaul, eCPRI)→ DU →(midhaul, F1)→ CU →(backhaul, NG)→ 5GC.
2. **Media comparison:**

| Medium    | Capacity                  | Latency                 | Cost/speed to deploy | Weakness                       |
| --------- | ------------------------- | ----------------------- | -------------------- | ------------------------------ |
| Fiber     | Highest (10–100 Gbps+)    | Lowest                  | High cost, slow      | Cuts from road works           |
| Microwave | 1–10 Gbps (E-band higher) | Low                     | Fast, cheaper        | Needs line of sight; rain fade |
| Satellite | Low–medium                | High (GEO ≈ 600 ms RTT) | Remote sites         | Delay, cost per Mbps           |

3. **IP/MPLS:** labels give traffic engineering, fast reroute and VPNs for 2G/3G/4G/5G on one network.
4. **Sync:** frequency and phase sync via GPS/GNSS, PTP (1588v2), SyncE.
5. **Mobile core placement:** centralised data centres; 5G pushes the UPF to the edge (MEC) for low latency.

### Mindmap

```mindmap
Backhaul & transport
  **Segments**
    fronthaul RU–DU (eCPRI)
    midhaul DU–CU
    backhaul CU–core
  **Media**
    fiber: best capacity
    microwave: fast, LOS, rain
    satellite: remote, delay
  **Protocols**
    IP/MPLS, IP-RAN
    Carrier Ethernet
    old: E1 / TDM
  **Sync**
    GPS, PTP 1588
    SyncE
  **Design**
    ring for resilience
    edge UPF / MEC
```

### Remember it

- **"F-M-B" = Front, Mid, Back** = RU-DU, DU-CU, CU-core.
- **Microwave fears rain; fiber fears shovels.**

### Exam trap

- Calling the RU–DU link "backhaul". It is **fronthaul**.
- Forgetting synchronization — TDD networks fail without phase sync.

### Exam answer · Mobile backhaul options

Mobile backhaul carries traffic between cell sites and the core. Fiber gives the highest capacity and lowest latency and is the long-term choice for 5G, but it is costly and slow to lay. Microwave is quick to deploy and widely used in Bangladesh, but needs line of sight and suffers rain fade at high frequencies. Satellite serves remote sites at higher delay. Most operators run IP/MPLS over these media in ring topologies for resilience, with GPS/PTP synchronization. 5G adds fronthaul (RU–DU) and midhaul (DU–CU), which need very low latency.

# 6 · Packet-switched mobile networks

## Packet-switched mobile networks · GPRS to LTE bearers

### Bangla core

**গল্পে বুঝি:** Packet network হলো পার্সেল সার্ভিস — প্রতিটা পার্সেলে ঠিকানা (IP) থাকে, রাস্তা ভাগাভাগি হয়। Mobile-এ বাড়তি ঝামেলা: প্রাপক হাঁটছে, তাই একটা স্থির ঠিকানা (anchor gateway) রাখতে হয় আর সেখান থেকে **tunnel** দিয়ে পার্সেল ফোনের পিছু পিছু পাঠানো হয়।

**ধাপে ধাপে:**

1. ফোন internet চালু করলে একটা **PDP context** (2G/3G) বা **PDN connection / default bearer** (4G) বা **PDU session** (5G) তৈরি হয়।
2. এতে ফোন একটা **IP address** পায় (GGSN / P-GW / SMF থেকে) আর একটা **APN/DNN** (যেমন "internet") ঠিক হয়।
3. User data যায় **GTP-U tunnel**-এ — eNB থেকে S-GW থেকে P-GW পর্যন্ত। Signalling চলে **GTP-C** দিয়ে।
4. ফোন সরলে tunnel-এর একটা মাথা নতুন tower-এ সরে যায়, কিন্তু anchor (P-GW) আর IP address একই থাকে — তাই download থামে না।
5. **Bearer** = নির্দিষ্ট QoS সহ একটা পথ। **Default bearer** (সাধারণ internet, non-GBR), **dedicated bearer** (যেমন VoLTE voice, GBR = guaranteed bit rate)।
6. QoS চিহ্ন: 4G-তে **QCI** (QCI 1 = conversational voice, QCI 5 = IMS signalling, QCI 9 = সাধারণ internet), 5G-তে **5QI** আর **QoS flow**।
7. সুবিধা: resource ভাগাভাগি, always-on, volume-ভিত্তিক billing।

**এক লাইনে:** Mobile packet data = session/bearer + IP from gateway + GTP tunnel, যাতে চলার মাঝেও IP একই থাকে।

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Session / bearer:** internet ব্যবহারের জন্য ফোন আর নেটওয়ার্কের মধ্যে একটা "চুক্তি" — কোন ঠিকানা, কত গতি, কোন অগ্রাধিকার।
- **APN:** কোন সেবায় যাবে তার নাম — "internet", "ims"। ফোনের setting-এ এটা দেখা যায়।
- **Tunnel:** packet-কে আরেকটা খামে ভরে পাঠানো, যাতে মাঝের রাস্তার ঠিকানা বদলালেও ভেতরের ঠিকানা (IP) একই থাকে।
- **GBR:** নির্দিষ্ট গতি নিশ্চিত (voice)। **Non-GBR:** যতটুকু পাওয়া যায় (browsing)।

**ধাপে ধাপে — আপনি YouTube খুললেন:**

1. ফোন চালু হওয়ার সময়ই (attach) একটা default bearer তৈরি হয়েছে, IP পেয়েছে — তাই 4G "always-on"।
2. YouTube-এর packet ফোন থেকে eNodeB-তে radio দিয়ে যায়।
3. eNodeB packet-টা GTP-U খামে ভরে S-GW-তে পাঠায়।
4. S-GW আবার খামে ভরে P-GW-তে পাঠায়।
5. P-GW খাম খুলে আসল IP packet internet-এ পাঠায়।
6. উত্তর ফেরত আসে একই পথে উল্টো দিকে।
7. আপনি বাসে করে নতুন টাওয়ারে গেলেন — শুধু eNodeB আর S-GW-এর মধ্যের tunnel-এর মাথা সরে, P-GW আর IP একই → video থামে না।

**কেন voice-এর জন্য আলাদা bearer:** browsing-এ ১ সেকেন্ড দেরি কেউ টের পায় না; কথায় ১ সেকেন্ড দেরি অসহ্য। তাই VoLTE কলের জন্য QCI 1 dedicated GBR bearer খোলা হয় — সবার আগে, নিশ্চিত গতিতে।

### Understand it step by step

1. **Session names:** PDP context (2G/3G), EPS bearer / PDN connection (4G), PDU session + QoS flow (5G).
2. **GTP:** GTP-C for control, GTP-U (UDP port 2152) for user data tunnels.
3. **Bearer types:** default (created at attach, always-on) vs dedicated (on demand, e.g. voice); GBR vs non-GBR.
4. **QCI examples:** 1 = VoLTE voice (GBR), 2 = video call, 5 = IMS signalling, 9 = default internet.
5. **Mobility anchor:** the P-GW (4G) / anchor UPF (5G) keeps the IP; the S-GW moves the tunnel end-point on handover.

### Mindmap

```mindmap
Packet-switched mobile
  **Session**
    PDP context (2G/3G)
    EPS bearer (4G)
    PDU session (5G)
  **Address**
    IP from GGSN / P-GW / SMF
    APN / DNN
  **Tunnel**
    GTP-U user data
    GTP-C control
    anchor keeps IP
  **QoS**
    default vs dedicated
    GBR vs non-GBR
    QCI 1 voice, 9 internet
    5QI, QoS flow
  **Benefits**
    shared, always-on
    pay per volume
```

### Remember it

- **"QCI 1 talks, QCI 9 surfs."**
- **GTP = the mobile tunnel.**

### Exam trap

- The default bearer is **non-GBR**; voice needs a **dedicated GBR** bearer.

### Exam answer · What is an EPS bearer?

An EPS bearer is a logical path with a defined QoS between the UE and the P-GW in LTE. A default bearer is created at attach, giving always-on IP connectivity with non-guaranteed bit rate (usually QCI 9). Dedicated bearers are added for services needing special treatment, such as VoLTE voice (QCI 1, GBR). User data on the bearer travels in GTP-U tunnels over S1-U and S5/S8, so the IP address stays fixed while the UE moves.

# 7 · Packet switching and call control

## Packet switching and call control · signalling SS7 to SIP

### Bangla core

**গল্পে বুঝি:** কথা বলা (voice) হলো মালগাড়ি, আর **signalling** হলো স্টেশন মাস্টারদের ফোনালাপ — "লাইন খালি? গাড়ি ছাড়ো, থামাও।" মালগাড়ি আর সিগন্যাল আলাদা পথে চলে।

**ধাপে ধাপে:**

1. **Call control** মানে call তৈরি (setup), চালু রাখা আর শেষ করা (release), সাথে billing-এর তথ্য।
2. পুরোনো নেটওয়ার্কে signalling = **SS7** (out-of-band, আলাদা channel)। প্রধান অংশ: **ISUP** (call setup trunk-এ), **MAP** (HLR/VLR-এর সাথে mobility তথ্য), **SCCP/TCAP**।
3. ফোন আর MSC-এর মধ্যে GSM signalling: **CC (call control), MM (mobility management), RR (radio resource)**।
4. 3GPP Release 4-এ **MSC ভাগ হলো**: **MSC Server** (control) + **Media Gateway, MGW** (voice বহন) — control আর media আলাদা, মাঝে IP। এটাই packet দিকে প্রথম পা।
5. আধুনিক নেটওয়ার্কে signalling = **SIP** (IMS-এ call control), **Diameter** (4G-তে HSS, PCRF, charging), **HTTP/2** (5GC-তে)।
6. SIP-এর মূল message: INVITE → 100 Trying → 180 Ringing → 200 OK → ACK; শেষ করতে **BYE**। Media চলে **RTP**-তে, codec তথ্য **SDP**-তে।
7. **SIGTRAN** = SS7 message IP-র উপর দিয়ে পাঠানোর উপায় (SCTP ব্যবহার করে)।

**এক লাইনে:** Call control = setup-maintain-release; SS7/ISUP/MAP থেকে SIP/Diameter/HTTP2-তে গেছে, আর control ও media আলাদা হয়েছে।

### Picture it

At a railway junction, the trains are the voice and data; the station masters on the phone ("Line clear? Send it. Stop it.") are the **signalling**. Call control is that conversation: set up the path, keep it, release it, and note it in the ledger for billing. Old networks used SS7 phone lines between station masters; new networks use SIP messages over the internet, and the station master (server) no longer has to stand on the same platform as the trains (media gateway).

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Signalling:** কল চালানোর নির্দেশ-বার্তা (কাকে, কখন, শেষ)। আসল কথা নয়।
- **SS7:** পুরোনো টেলিফোন নেটওয়ার্কের নির্দেশ-ভাষা।
- **ISUP:** SS7-এর যে অংশ দুই এক্সচেঞ্জের মধ্যে কল জোড়ে।
- **MAP:** SS7-এর যে অংশ HLR/VLR থেকে গ্রাহকের তথ্য আনে-নেয়।
- **SIP:** IP নেটওয়ার্কের নির্দেশ-ভাষা — দেখতে email/HTTP-এর মতো লেখা।
- **RTP:** আসল কথা (voice packet) বহনের protocol।
- **MGW:** voice-কে এক রূপ থেকে আরেক রূপে বদলায় (TDM ↔ IP)।

**SIP কল — ফোনে কথোপকথনের মতো:**

1. A: "INVITE — B, কথা বলতে চাই, আমি এই codec বুঝি।"
2. নেটওয়ার্ক: "100 Trying — চেষ্টা করছি।"
3. B-এর ফোন: "180 Ringing — বাজছে।"
4. B ধরল: "200 OK — রাজি, আমি এই codec নেব।"
5. A: "ACK — ঠিক আছে।"
6. এখন RTP দিয়ে আসল কথা চলে।
7. কেউ রাখলে: "BYE" → "200 OK"।

**কেন control আর media আলাদা করা হলো:** আগে প্রতিটা শহরে বড় MSC লাগত। এখন কয়েকটা MSC Server (মস্তিষ্ক) কেন্দ্রে, আর ছোট MGW (হাত-পা) প্রতিটা শহরে — খরচ কম, রক্ষণাবেক্ষণ সহজ, voice IP দিয়ে চলে।

### Understand it step by step

| Era         | Call control                              | Mobility/subscriber signalling | Transport     |
| ----------- | ----------------------------------------- | ------------------------------ | ------------- |
| 2G/3G CS    | ISUP (between switches), CC/MM (to phone) | MAP over SS7                   | TDM / SIGTRAN |
| Rel-4 split | MSC Server + MGW (BICC/H.248)             | MAP                            | IP            |
| 4G IMS      | SIP                                       | Diameter (S6a, Cx, Gx)         | IP            |
| 5G          | SIP (IMS)                                 | HTTP/2 service APIs            | IP            |

**SIP call flow (basic):** A → INVITE (with SDP) → proxy → B; B → 180 Ringing; B → 200 OK; A → ACK; RTP media flows; either side → BYE → 200 OK.

### Mindmap

```mindmap
Call control
  **Job**
    setup, maintain, release
    billing records (CDR)
  **Legacy SS7**
    ISUP: call setup
    MAP: HLR/VLR
    SCCP, TCAP
  **Split architecture**
    MSC Server = control
    MGW = media
    H.248 / BICC
  **Modern**
    SIP (IMS)
    Diameter (4G)
    HTTP/2 (5GC)
  **SIP flow**
    INVITE → 180 → 200 OK → ACK
    RTP media, SDP codec
    BYE to end
```

### Remember it

- **"I-R-O-A-B":** INVITE, Ringing, OK, ACK, BYE.
- **ISUP calls, MAP finds.**

### Exam trap

- Saying SIP carries the voice. **SIP signals; RTP carries the voice.**

### Exam answer · Separation of control and media

In early switches the MSC both controlled calls and switched voice. 3GPP Release 4 split it into an MSC Server (call control, signalling with ISUP/BICC and MAP) and Media Gateways (voice transport and transcoding), controlled with H.248. This let voice ride an IP backbone, centralised control in fewer servers and reduced cost. IMS takes the idea further: SIP servers (CSCFs) control sessions while RTP media flows directly between endpoints or through media gateways.

# 8 · Call flow, session management and mobility control

## Call flow, session management and mobility

### Bangla core

**গল্পে বুঝি:** নতুন শহরে গেলে হোটেলে নাম লেখাও (attach/registration), থানায় জানাও কোন এলাকায় আছো (tracking area update), কেউ খুঁজলে পুলিশ মাইকে এলাকায় নাম ডাকে (paging), আর তুমি সাড়া দিলে যোগাযোগ শুরু (service request)।

**ধাপে ধাপে:**

1. **Attach / Registration (4G/5G):** ফোন চালু → RRC connection → MME/AMF-কে attach request → **authentication (AKA)** → **security mode** (encryption চালু) → HSS/UDM-এ location update → default bearer/PDU session তৈরি → ফোন IP পায়।
2. **Identity:** **IMSI** (SIM-এর স্থায়ী পরিচয়), **GUTI/TMSI** (অস্থায়ী, গোপনীয়তার জন্য), 5G-তে **SUPI** (স্থায়ী) আর **SUCI** (encrypted, যাতে IMSI catcher ধরতে না পারে)।
3. **ফোনের অবস্থা:** **Idle** (connection নেই, battery বাঁচে, শুধু এলাকা জানা) আর **Connected** (data চলছে)। 5G-তে বাড়তি **RRC Inactive**।
4. **Location/Tracking Area:** idle ফোন কোন tower-এ জানা নেই, শুধু কোন **Tracking Area (TA)**-তে। নতুন TA-তে গেলে **TAU (tracking area update)** করে; নির্দিষ্ট সময় পর পর periodic update।
5. **Paging:** কল/data এলে network ওই TA-র সব tower-এ ডাকে; ফোন সাড়া দিয়ে **service request** পাঠায়।
6. **Handover (connected অবস্থায়):** ফোন পাশের cell-এর signal মেপে **measurement report** পাঠায় (event A3 = পাশেরটা ভালো) → source eNB সিদ্ধান্ত নেয় → **X2 handover** (eNB থেকে eNB সরাসরি) বা **S1 handover** (MME দিয়ে) → নতুন cell-এ যোগ → data path সরে।
7. **Mobile terminating call (2G):** কলার → GMSC → HLR জিজ্ঞাসা → HLR VLR থেকে **MSRN** নেয় → GMSC কল পাঠায় visited MSC-তে → paging → ফোন বাজে।
8. **Roaming:** বিদেশে visited network তোমার home HLR/HSS থেকে তথ্য নিয়ে সেবা দেয়।

**এক লাইনে:** Attach (authenticate + IP) → idle-এ TAU আর paging → connected-এ measurement report দিয়ে handover।

### Picture it

You move to a new city. First you register at the hotel desk and show your ID (**attach + authentication**). While you sleep, the hotel only knows your floor, not your room's exact position (**idle mode, tracking area**). When a visitor asks for you, the desk announces your name on that floor (**paging**) and you come down (**service request**). If you change floors, you tell the desk (**tracking area update**). If you walk between buildings while talking on the phone, the call is passed from one desk to the next (**handover**).

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Attach / Registration:** নেটওয়ার্কে "নাম লেখানো"।
- **IMSI:** SIM-এর স্থায়ী গোপন পরিচয় নম্বর (ফোন নম্বর নয়)।
- **GUTI/TMSI:** অস্থায়ী ছদ্মনাম, যাতে আসল IMSI বাতাসে বারবার না যায়।
- **Idle:** ফোন ঘুমিয়ে আছে, শুধু কান খোলা।
- **Connected:** ফোন সক্রিয়ভাবে data পাঠাচ্ছে/নিচ্ছে।
- **Tracking Area:** কয়েকটা টাওয়ারের একটা দল — idle ফোন শুধু এই দলের নাম জানায়।
- **Paging:** "অমুক কোথায়?" — দলের সব টাওয়ার দিয়ে ডাকা।
- **Measurement report:** ফোন জানায় পাশের টাওয়ারের signal কতটা ভালো।

**কেন idle ফোনের সঠিক টাওয়ার জানা হয় না:** লাখো ঘুমন্ত ফোন যদি প্রতিবার টাওয়ার বদলে জানাত, নেটওয়ার্ক signalling-এ ডুবে যেত আর ফোনের battery শেষ হতো। তাই শুধু বড় এলাকা (TA) জানায়, দরকার হলে paging।

**বাস্তব উদাহরণ — আপনার ফোনে কল এলো (4G, CSFB ছাড়া, VoLTE):**

1. বন্ধুর কল IMS হয়ে আপনার নেটওয়ার্কে আসে।
2. আপনার ফোন idle — MME জানে আপনি "TA-15"-এ।
3. MME TA-15-এর সব eNodeB দিয়ে paging পাঠায়।
4. আপনার ফোন শুনে service request পাঠায় → connected হয়।
5. Voice-এর dedicated bearer খোলে → ফোন বাজে।

**Handover-এর ধাপ — বাসে বসে কথা বলছেন:**

1. ফোন নিয়মিত চারপাশের টাওয়ার মাপে।
2. পাশের টাওয়ার বর্তমানটার চেয়ে নির্দিষ্ট মাত্রায় ভালো হলে (event A3) রিপোর্ট পাঠায়।
3. বর্তমান eNodeB নতুনটাকে X2 দিয়ে বলে "জায়গা রাখো"।
4. নতুনটা রাজি হলে ফোনকে নির্দেশ: "ওখানে যাও"।
5. ফোন নতুন টাওয়ারে যুক্ত হয়; MME-কে বলা হয় data-র পথ বদলাও (path switch)।
6. পুরোনো টাওয়ার resource ছেড়ে দেয়। সব হয় ১০০ ms-এর কম সময়ে।

### Understand it step by step

1. **LTE attach (simplified):** RRC setup → Attach Request (IMSI/GUTI) → MME ↔ HSS authentication vectors → AKA challenge/response → NAS Security Mode → Update Location (S6a) → Create Session (S-GW, P-GW) → Attach Accept + default bearer → Attach Complete.
2. **5G registration:** similar via AMF; AUSF/UDM authenticate; SMF creates the PDU session on request.
3. **States:** EMM-Registered/Deregistered; ECM-Idle/Connected (4G). 5G: RM-Registered; CM-Idle/Connected; RRC Idle/Inactive/Connected.
4. **Mobility management:** TAU (idle), handover (connected), paging (find an idle UE).
5. **Handover steps:** measure → report → decide → prepare target → command → access target → path switch → release source.
6. **2G MT call:** GMSC → HLR → VLR gives MSRN → route to VMSC → paging → alert.

### Mindmap

```mindmap
Call flow & mobility
  **Attach / register**
    RRC setup
    AKA authentication
    security mode
    default bearer + IP
  **Identities**
    IMSI / SUPI permanent
    GUTI / TMSI temporary
    SUCI encrypted (5G)
  **Idle mode**
    tracking area
    TAU on change
    paging to find UE
  **Connected mode**
    measurement report (A3)
    X2 / Xn handover
    S1 / N2 handover
  **2G call**
    GMSC → HLR → VLR
    MSRN routing
    paging, alert
```

### Remember it

- **"R-A-S-U-B":** RRC, Authenticate, Security, Update location, Bearer.
- **Idle = paged; connected = handed over.**

### Exam trap

- Handover is for **connected** UEs; idle UEs only reselect cells and do TAU.
- IMSI should rarely go over the air; the network uses **GUTI/TMSI** (5G: SUCI).

### Exam answer · Describe the LTE attach procedure

1. The UE sets up an RRC connection with the eNodeB and sends an Attach Request (with its IMSI or GUTI) to the MME.
2. The MME fetches authentication vectors from the HSS and runs EPS-AKA: it sends RAND and AUTN; the SIM verifies the network and returns RES, which the MME compares with XRES.
3. NAS and AS security mode procedures start ciphering and integrity protection.
4. The MME sends Update Location to the HSS and receives the subscriber profile.
5. The MME asks the S-GW to create a session; the S-GW contacts the P-GW, which allocates an IP address and creates the default bearer (with PCRF policy).
6. The MME sends Attach Accept with a GUTI; the eNodeB sets up radio bearers; the UE replies Attach Complete.
   The UE is now registered, has an IP address and is always-on.

# 9 · IMS architecture

## IMS architecture for voice and multimedia (VoLTE)

### Bangla core

**গল্পে বুঝি:** IMS হলো একটা বড় অফিসের রিসেপশন ব্যবস্থা: দরজার দারোয়ান (**P-CSCF**) সবার আগে দেখা দেয়, ইনকোয়ারি ডেস্ক (**I-CSCF**) বলে কোন অফিসার দেখবেন, আর মূল অফিসার (**S-CSCF**) আসল কাজ করেন — ফাইল (subscriber profile) আনেন রেকর্ড রুম (**HSS**) থেকে।

**ধাপে ধাপে:**

1. **IMS (IP Multimedia Subsystem)** = IP নেটওয়ার্কে voice, video, SMS, conference চালানোর 3GPP মানের ব্যবস্থা। signalling **SIP**, media **RTP**।
2. 4G-তে voice = **VoLTE** (IMS দিয়ে), Wi-Fi-তে **VoWiFi**, 5G-তে **VoNR**।
3. **P-CSCF (Proxy):** ফোনের প্রথম যোগাযোগ বিন্দু; security, compression, PCRF-কে বলে voice-এর জন্য dedicated bearer খুলতে।
4. **I-CSCF (Interrogating):** বাইরে থেকে আসা request-এর প্রবেশদ্বার; HSS জিজ্ঞাসা করে কোন S-CSCF দেখবে।
5. **S-CSCF (Serving):** registration, authentication, call routing-এর কেন্দ্র; HSS থেকে profile আনে (**Cx interface, Diameter**), দরকার হলে **Application Server**-এ পাঠায়।
6. **Application Server (AS):** **TAS/MMTel** (call forwarding, waiting, hold), SMS over IP ইত্যাদি সেবা।
7. **PSTN/পুরোনো নেটওয়ার্কের সাথে:** **MGCF** (SIP ↔ ISUP অনুবাদ), **MGW** (RTP ↔ TDM voice), **BGCF** (কোন breakout-এ যাবে ঠিক করে)।
8. **MRF/MRFC-MRFP:** announcement, conference, tone।
9. **SRVCC:** VoLTE call চলার সময় 4G কভারেজ হারালে call-টা 2G/3G circuit-এ সরিয়ে নেওয়া — call না কেটে।
10. **CSFB vs VoLTE:** CSFB-তে কল এলে ফোন 4G ছেড়ে 3G/2G-তে নেমে যায় (call setup ধীর, data থামে); VoLTE-তে 4G-তেই HD voice, দ্রুত setup।

**এক লাইনে:** IMS = SIP দিয়ে IP voice; P-CSCF দরজা, I-CSCF দিকনির্দেশ, S-CSCF মস্তিষ্ক, HSS ডেটা, AS সেবা, MGCF/MGW পুরোনো নেটওয়ার্কের সেতু।

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **IMS:** IP দিয়ে কথা, ভিডিও, মেসেজ চালানোর "সুইচবোর্ড অফিস"।
- **CSCF:** IMS-এর প্রধান সার্ভার (Call Session Control Function) — তিন ধরনের।
- **VoLTE:** 4G-তেই HD কল, IMS দিয়ে।
- **CSFB:** 4G-তে কল এলে ফোন 3G/2G-তে নেমে গিয়ে পুরোনো পদ্ধতিতে কথা বলে।
- **SRVCC:** VoLTE কল চলার সময় 4G হারালে কল না কেটে 3G/2G-তে সরিয়ে দেওয়া।
- **TAS:** call forwarding, waiting, hold-এর মতো "বাড়তি সেবা" দেয়।
- **MGCF:** নতুন (SIP) আর পুরোনো (ISUP) ভাষার দোভাষী।

**ধাপে ধাপে — ফোন চালু করলে IMS registration:**

1. 4G attach হয়, সাথে "ims" APN-এর জন্য আলাদা bearer।
2. ফোন P-CSCF-এর ঠিকানা পায়।
3. ফোন SIP REGISTER পাঠায় → P-CSCF → I-CSCF।
4. I-CSCF HSS-কে জিজ্ঞাসা করে কোন S-CSCF এই গ্রাহককে দেখবে।
5. S-CSCF HSS থেকে authentication তথ্য আনে, ফোনকে challenge দেয়।
6. ফোন সঠিক উত্তর দিলে "200 OK" — এখন ফোনের কোণে "VoLTE" বা "HD" দেখায়।

**ধাপে ধাপে — VoLTE কল:**

1. আপনি নম্বর ডায়াল → ফোন SIP INVITE পাঠায় P-CSCF-এ।
2. P-CSCF → আপনার S-CSCF (প্রয়োজনে TAS-এ যায়, যেমন call barring যাচাই)।
3. S-CSCF বন্ধুর নেটওয়ার্ক খুঁজে বন্ধুর I-CSCF → S-CSCF → P-CSCF → বন্ধুর ফোন।
4. দুই পাশের P-CSCF PCRF-কে বলে voice-এর জন্য QCI 1 bearer খুলতে।
5. 180 Ringing → 200 OK → ACK → RTP-তে কথা।
6. বন্ধু যদি 2G-তে থাকে বা land phone হয় → S-CSCF → BGCF → MGCF/MGW → PSTN।

**CSFB বনাম VoLTE — গ্রাহক কী টের পায়:**
| | CSFB | VoLTE |
|---|---|---|
| কল জোড়া লাগার সময় | ধীর (৪–৮ সেকেন্ড) | দ্রুত (১–৩ সেকেন্ড) |
| কথার মান | সাধারণ | HD voice |
| কলের সময় internet | 3G-তে ধীর বা বন্ধ | 4G গতিতেই চলে |

### Picture it

IMS is an office building for calls. The **P-CSCF** is the security desk at the door — every visitor (SIP message from your phone) passes it. The **I-CSCF** is the information counter that looks up which officer handles you. The **S-CSCF** is your assigned officer who registers you, checks your file in the records room (**HSS**) and sends you to specialist rooms (**Application Servers**) for call forwarding or conferencing. When you need to call someone in the old building next door (PSTN), the **MGCF** translates the language and the **MGW** converts the voice.

### Understand it step by step

| Element        | Role                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| P-CSCF         | First SIP contact for the UE; security association, QoS request to PCRF (Rx) |
| I-CSCF         | Entry point to the home network; queries HSS to pick the S-CSCF              |
| S-CSCF         | Registration, authentication (IMS-AKA), session control, triggers AS via iFC |
| HSS            | Subscriber profile, IMS identities (IMPI, IMPU), Cx/Sh interfaces            |
| TAS / MMTel AS | Supplementary services: forwarding, hold, waiting, barring                   |
| MGCF + IM-MGW  | Interworking SIP/RTP ↔ ISUP/TDM (PSTN, 2G/3G)                               |
| BGCF           | Chooses where to break out to the PSTN                                       |
| MRF            | Announcements, conferencing                                                  |
| IBCF / SBC     | Border control towards other operators                                       |

**VoLTE call (simplified):** UE A → INVITE → P-CSCF → S-CSCF (A) → I-CSCF (B home) → S-CSCF (B) → P-CSCF (B) → UE B; P-CSCFs ask PCRF to set up QCI-1 dedicated bearers; 180 Ringing, 200 OK, ACK; RTP voice flows over the GBR bearers.

### Mindmap

```mindmap
IMS (VoLTE)
  **CSCFs**
    P-CSCF: proxy, door
    I-CSCF: finds S-CSCF
    S-CSCF: brain, registration
  **Data & services**
    HSS (Cx, Diameter)
    TAS / MMTel
    MRF: conference, tones
  **Interworking**
    MGCF: SIP ↔ ISUP
    MGW: RTP ↔ TDM
    BGCF: breakout
  **Protocols**
    SIP signalling
    RTP media, SDP
    Diameter (Cx, Rx)
  **Voice options**
    VoLTE, VoWiFi, VoNR
    CSFB (falls to 3G/2G)
    SRVCC (handover to CS)
```

### Remember it

- **"P-I-S" = Proxy, Interrogating, Serving** — door, desk, officer.
- **MGCF talks, MGW carries.**
- **CSFB drops down; SRVCC hands over.**

### Exam trap

- The **S-CSCF**, not the P-CSCF, performs registration and authentication.
- SRVCC is a handover of an **ongoing** VoLTE call; CSFB is for **setting up** a call without VoLTE.

### Exam answer · Explain IMS architecture with a diagram

**Definition.** The IP Multimedia Subsystem is a 3GPP framework that delivers voice, video and messaging over IP using SIP for signalling and RTP for media. It provides VoLTE, VoWiFi and VoNR.

**Diagram (describe/draw):** UE — LTE/EPC (P-GW) — P-CSCF — S-CSCF ↔ HSS; S-CSCF ↔ Application Server (TAS); I-CSCF between networks; S-CSCF → BGCF → MGCF/MGW → PSTN; MRF for conferencing; PCRF linked to P-CSCF via Rx.

**Functions.** The P-CSCF is the UE's first contact and requests QoS bearers; the I-CSCF locates the serving CSCF using the HSS; the S-CSCF registers and authenticates users and routes sessions, invoking application servers for supplementary services; the HSS stores IMS identities and profiles; the MGCF and MGW interwork with the circuit-switched PSTN; the MRF provides announcements and conferences.

**Benefits.** One IP core for all multimedia services, HD voice, fast call setup, simultaneous voice and data, and easy new services. **Conclusion:** IMS is the voice platform of all-IP 4G/5G networks.

# 10 · Mobile user data management & authentication · HLR, HSS and registries

## HLR, HSS, UDM and registry systems

### Bangla core

**গল্পে বুঝি:** **HLR/HSS** হলো তোমার জন্মস্থানের ইউনিয়ন পরিষদের রেজিস্টার — স্থায়ী তথ্য সেখানে। **VLR** হলো তুমি যে শহরে বেড়াতে গেছ সেখানকার হোটেলের অতিথি খাতা — সাময়িক তথ্য। **AuC** হলো তালার আসল চাবি রাখার সিন্দুক। **EIR** হলো চুরি যাওয়া ফোনের কালো তালিকা।

**ধাপে ধাপে:**

1. **HLR (2G/3G):** subscriber-এর স্থায়ী তথ্য — IMSI, MSISDN (ফোন নম্বর), কোন সেবা চালু, বর্তমানে কোন VLR/MSC-তে আছে।
2. **VLR:** MSC-এর সাথে থাকে; ওই এলাকায় এখন যারা আছে তাদের সাময়িক কপি আর **TMSI**।
3. **AuC:** প্রতিটা SIM-এর গোপন key **Ki** রাখে; authentication triplet/quintet তৈরি করে।
4. **EIR:** **IMEI** তালিকা — white (বৈধ), grey (নজরে), black (চুরি/নিষিদ্ধ)। বাংলাদেশে **NEIR** (জাতীয় পর্যায়ের IMEI নিবন্ধন) চালু হয়েছে।
5. **HSS (4G/IMS):** HLR + AuC-এর উত্তরসূরি, Diameter দিয়ে কথা বলে (MME-এর সাথে **S6a**, IMS-এর সাথে **Cx**)।
6. **5G:** **UDM** (data management, Ki-ভিত্তিক vector তৈরি), **UDR** (আসল database), **AUSF** (authentication server)। Front-end/back-end ভাগ = "user data convergence"।
7. **Authentication (AKA) কীভাবে:**
   - SIM আর AuC/HSS দুজনেই একই গোপন **Ki** জানে; Ki কখনো বাতাসে যায় না।
   - Network একটা random **RAND** পাঠায়।
   - SIM নিজের Ki আর RAND দিয়ে হিসাব করে **RES** পাঠায়; network আগে থেকেই **XRES** জানে — মিললে ফোন বৈধ।
   - 3G থেকে **AUTN** দিয়ে ফোনও network যাচাই করে (**mutual authentication**) — নকল টাওয়ার ঠেকায়।
   - সাথে encryption key (**Kc** 2G-তে; **CK, IK** 3G-তে; **KASME** 4G-তে) তৈরি হয়।
8. **2G-র দুর্বলতা:** শুধু network ফোনকে যাচাই করত (one-way), A5/1 encryption দুর্বল — তাই fake BTS আক্রমণ সম্ভব।
9. **Number portability (MNP)** registry: নম্বর এক অপারেটর থেকে আরেকটায় গেলে কোন নেটওয়ার্কে route হবে তা বলে।

**এক লাইনে:** HLR → HSS → UDM/UDR/AUSF; Ki শুধু SIM আর AuC জানে, RAND-RES মিলিয়ে authentication, 3G থেকে mutual।

### Picture it

Your SIM card and the operator's vault share a secret word (**Ki**) that is never spoken aloud. When you join the network, the guard (network) whispers a random puzzle number (**RAND**). Only someone who knows the secret word can turn that puzzle into the right answer (**RES**). The guard already worked out the answer (**XRES**) in the vault; if yours matches, you are in. From 3G onwards the guard also shows you a token (**AUTN**) that only the real operator could make, so you know the guard is not a fake (mutual authentication). Both of you also derive a fresh lock key for the conversation — without ever saying the secret word.

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **IMSI:** SIM-এর ১৫ সংখ্যার স্থায়ী পরিচয় = দেশ কোড (MCC, বাংলাদেশ 470) + অপারেটর কোড (MNC) + গ্রাহক নম্বর।
- **MSISDN:** আমাদের পরিচিত ফোন নম্বর (+8801…)।
- **IMEI:** হ্যান্ডসেটের পরিচয় — \*#06# চাপলে দেখা যায়।
- **Ki:** SIM-এর ভেতরের গোপন চাবি — SIM থেকে বের করা যায় না।
- **RAND:** নেটওয়ার্কের পাঠানো এলোমেলো সংখ্যা (প্রশ্ন)।
- **RES / XRES:** ফোনের উত্তর / নেটওয়ার্কের প্রত্যাশিত উত্তর।
- **AUTN:** নেটওয়ার্ক আসল কিনা তার প্রমাণ।

**কেন HLR → HSS → UDM বদলাল:**

1. **HLR (2G/3G):** SS7/MAP ভাষায় কথা বলে, শুধু মোবাইল circuit ও GPRS তথ্য।
2. **HSS (4G):** Diameter ভাষা, IP-ভিত্তিক; সাথে IMS (VoLTE) গ্রাহক তথ্যও রাখে।
3. **UDM/UDR/AUSF (5G):** একটা বড় বাক্সের বদলে তিনটা software service — UDR শুধু database, UDM হিসাব-নিকাশ, AUSF authentication। cloud-এ সহজে বড় করা যায়।

**VLR কেন দরকার ছিল:** ঢাকার গ্রাহক চট্টগ্রামে গেলে প্রতিটা কলের জন্য ঢাকার HLR-এ জিজ্ঞাসা করলে দেরি আর ভিড় হতো। তাই চট্টগ্রামের VLR একবার কপি এনে রাখে, পরের কাজ স্থানীয়ভাবে।

**2G কেন অনিরাপদ:** শুধু নেটওয়ার্ক ফোনকে যাচাই করত, ফোন নেটওয়ার্ককে নয় → নকল টাওয়ার (IMSI catcher) বসিয়ে ফোনকে ধরা যেত। 3G থেকে AUTN দিয়ে এই ফাঁক বন্ধ। 5G-তে SUCI দিয়ে IMSI-ও encrypted।

**EIR/NEIR উদাহরণ:** ফোন চুরি হলে IMEI কালো তালিকায় যায় → নতুন SIM দিলেও নেটওয়ার্ক ফোনটা চালু হতে দেয় না।

### Understand it step by step

| Generation | Subscriber DB | Auth | Interface/protocol | Auth vector                       |
| ---------- | ------------- | ---- | ------------------ | --------------------------------- |
| 2G         | HLR + VLR     | AuC  | MAP (SS7)          | Triplet: RAND, SRES, Kc           |
| 3G         | HLR           | AuC  | MAP                | Quintet: RAND, XRES, CK, IK, AUTN |
| 4G         | HSS           | HSS  | Diameter (S6a, Cx) | RAND, XRES, AUTN, KASME           |
| 5G         | UDM / UDR     | AUSF | HTTP/2 (SBA)       | 5G-AKA or EAP-AKA′                |

**Identifiers:** IMSI = MCC (Bangladesh 470) + MNC + MSIN; MSISDN = phone number; IMEI = device; SUPI/SUCI in 5G.

### Mindmap

```mindmap
Subscriber data & auth
  **2G/3G**
    HLR: permanent profile
    VLR: visitor copy, TMSI
    AuC: Ki, vectors
    EIR: IMEI lists
  **4G**
    HSS = HLR + AuC
    Diameter S6a, Cx
  **5G**
    UDM, UDR
    AUSF
    SUPI / SUCI
  **AKA**
    shared secret Ki
    RAND → RES vs XRES
    AUTN: mutual (3G+)
    keys: Kc, CK/IK, KASME
  **Identifiers**
    IMSI (MCC 470)
    MSISDN, IMEI
  **Registries**
    EIR / NEIR
    MNP database
```

### Remember it

- **"Home = HLR, Visiting = VLR, Key = AuC, Equipment = EIR."**
- **Triplet (2G, 3 values) → Quintet (3G, 5 values).**
- **Bangladesh MCC = 470.**

### Exam trap

- **Ki is never transmitted** — only RAND, RES and AUTN go over the air.
- 2G authentication is **one-way**; mutual authentication arrived in 3G (AUTN).

### Exam answer · HLR vs HSS, and how a subscriber is authenticated

The HLR is the 2G/3G master database of subscribers: it stores the IMSI, MSISDN, service profile and current location (serving VLR/SGSN) and works with the AuC over MAP/SS7. The HSS is its 4G/IMS successor: it merges HLR and AuC functions, stores EPS and IMS profiles, and uses Diameter (S6a to the MME, Cx to the CSCFs). In 5G it splits into UDM, UDR and AUSF.

Authentication uses the shared secret Ki stored only in the SIM and the AuC/HSS. The network sends a random RAND and, from 3G onwards, an AUTN token. The SIM checks AUTN (verifying the network), computes RES from Ki and RAND, and returns it. The network compares RES with the expected XRES; if they match, the subscriber is genuine. Both sides derive cipher and integrity keys at the same time, so the session is encrypted without ever sending Ki.

# 11 · Network Function Virtualization (NFV)

## NFV in cellular systems

### Bangla core

**গল্পে বুঝি:** আগে প্রতিটা কাজের জন্য আলাদা যন্ত্র কিনতে হতো — যেমন ক্যালকুলেটর, টর্চ, ক্যামেরা। এখন একটা স্মার্টফোনে সব app। NFV মানে নেটওয়ার্কের যন্ত্রগুলো (MME, firewall, router) app হয়ে সাধারণ server-এ চলে।

**ধাপে ধাপে:**

1. **NFV** = নেটওয়ার্ক function-কে vendor-এর বিশেষ hardware থেকে আলাদা করে সাধারণ x86 server-এ software হিসেবে চালানো।
2. প্রতিটা software function = **VNF** (Virtual Network Function); container-এ চললে **CNF** (Cloud-native NF)।
3. ETSI NFV architecture-এর তিন অংশ:
   - **NFVI** = hardware (compute, storage, network) + virtualization layer (hypervisor)।
   - **VNF** = আসল function (vEPC, vIMS, vFirewall)।
   - **MANO** = Management and Orchestration: **NFVO** (orchestrator, পুরো service), **VNFM** (VNF-এর জীবনচক্র), **VIM** (resource manager, যেমন OpenStack)।
4. **সুবিধা:** hardware খরচ কম (CAPEX), দ্রুত নতুন সেবা, চাহিদা মতো scale out/in, একাধিক function এক server-এ, vendor lock-in কম, স্বয়ংক্রিয়তা।
5. **চ্যালেঞ্জ:** performance (packet processing — DPDK, SR-IOV দিয়ে সমাধান), নানা vendor একসাথে চালানো, দক্ষ জনবল, security।
6. **SDN-এর সাথে পার্থক্য:** NFV = function virtualize করা (কী চলবে); **SDN** = control plane আর data plane আলাদা করে নেটওয়ার্ক প্রোগ্রাম করা (traffic কোথায় যাবে)। একে অপরের পরিপূরক।
7. 5G core পুরোপুরি **cloud-native** — microservice, Kubernetes, CNF।

**এক লাইনে:** NFV = নেটওয়ার্ক যন্ত্রকে software (VNF/CNF) বানিয়ে সাধারণ server-এ চালানো, MANO দিয়ে পরিচালনা।

### Picture it

An old operator data centre looks like a kitchen with a separate machine for every job: a toaster, a rice cooker, a blender, a kettle — each from a different brand, each with its own plug and spare parts. NFV replaces them with one powerful multi-cooker (standard servers) running different recipes (software functions). Need more rice for a wedding (Eid traffic)? Run the rice recipe on two more pots for the evening, then switch them off. The **orchestrator** is the head chef who decides which recipe runs on which pot.

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **COTS server:** দোকানে কেনা সাধারণ server (HP, Dell) — কোনো বিশেষ telecom যন্ত্র নয়।
- **Virtualization:** এক physical server-কে অনেকগুলো "নকল কম্পিউটার" (VM) বানানো।
- **VNF:** VM-এ চলা network function (যেমন virtual MME)।
- **CNF / container:** VM-এর চেয়ে হালকা প্যাকেট — দ্রুত চালু হয়, Kubernetes চালায়।
- **Orchestration:** কোন function কোথায়, কতগুলো চলবে — স্বয়ংক্রিয়ভাবে ঠিক করা।
- **Scale out:** চাহিদা বাড়লে আরও কপি চালু করা।

**ধাপে ধাপে — ঈদের রাতে traffic বাড়ল:**

1. Monitoring দেখে vEPC-র user plane ৯০% ব্যস্ত।
2. NFVO সিদ্ধান্ত নেয় আরও দুটো কপি দরকার।
3. VNFM নতুন দুটো VNF instance চালু করার নির্দেশ দেয়।
4. VIM (OpenStack) server-এ জায়গা খুঁজে VM বানায়।
5. কয়েক মিনিটে নতুন capacity চালু; ভোরে traffic কমলে বন্ধ — বিদ্যুৎ ও খরচ সাশ্রয়।
6. পুরোনো পদ্ধতিতে এর জন্য মাসখানেক আগে নতুন hardware কিনতে হতো।

**NFV বনাম SDN আরেকভাবে:** NFV = "যন্ত্রটাকে software বানাও"; SDN = "রাস্তার সিগন্যাল এক কেন্দ্রীয় কন্ট্রোল রুম থেকে চালাও"। একসাথে ব্যবহার করলে পুরো নেটওয়ার্ক প্রোগ্রামযোগ্য হয়।

### Understand it step by step

1. **ETSI reference architecture:** OSS/BSS → NFVO; VNFM manages VNF lifecycle (instantiate, scale, heal, terminate); VIM manages NFVI resources.
2. **VM vs container:** VNF on a hypervisor (heavier, strong isolation) vs CNF on Kubernetes (lighter, faster scaling, microservices).
3. **Examples in mobile networks:** vEPC, vIMS, virtual 5GC, vBNG, vFirewall, vDNS, vRAN baseband.
4. **NFV vs SDN:**

|               | NFV                               | SDN                                  |
| ------------- | --------------------------------- | ------------------------------------ |
| Idea          | Run network functions as software | Separate control from forwarding     |
| Focus         | What runs (functions)             | Where traffic goes (paths)           |
| Standard body | ETSI ISG NFV                      | ONF (OpenFlow)                       |
| Example       | vEPC on servers                   | Central controller programs switches |

### Mindmap

```mindmap
NFV
  **Idea**
    software on COTS servers
    VNF / CNF
  **ETSI architecture**
    NFVI (compute, storage, network)
    VNFs
    MANO: NFVO, VNFM, VIM
  **Benefits**
    lower CAPEX/OPEX
    fast launch, auto-scale
    no vendor lock-in
  **Challenges**
    performance (DPDK, SR-IOV)
    multi-vendor integration
    skills, security
  **Related**
    SDN: control vs data plane
    cloud-native 5GC, Kubernetes
```

### Remember it

- **MANO = "O-V-V": NFVO, VNFM, VIM.**
- **NFV virtualizes boxes; SDN programs paths.**

### Exam trap

- Treating NFV and SDN as the same thing — they are **complementary**, not identical.
- VIM manages **infrastructure**; VNFM manages **VNFs**.

### Exam answer · What is NFV? Explain its architecture and benefits

**Definition.** Network Function Virtualization decouples network functions from proprietary hardware and runs them as software (VNFs) on commercial off-the-shelf servers.

**Architecture (ETSI).** (1) NFVI — physical compute, storage and networking plus the virtualization layer; (2) VNFs — software functions such as vEPC, vIMS, firewalls; (3) MANO — the NFV Orchestrator (end-to-end services and resources), the VNF Manager (lifecycle of each VNF) and the Virtualized Infrastructure Manager (e.g. OpenStack, Kubernetes) — linked to the operator's OSS/BSS.

**Benefits for a mobile operator.** Lower capital and operating cost; new services in days instead of months; elastic scaling during peaks (e.g. Eid traffic); higher hardware utilisation; less vendor lock-in; automation and self-healing. **Challenges:** data-plane performance, multi-vendor integration, new skills and security. **Conclusion:** NFV, together with SDN, is the foundation of cloud-native 5G cores and network slicing.

# 12 · C-RAN and O-RAN

## Cloud RAN (C-RAN) and Open RAN (O-RAN)

### Bangla core

**গল্পে বুঝি:** আগে প্রতিটা বাড়িতে নিজস্ব রান্নাঘর (প্রতিটা tower-এ নিজস্ব baseband)। **C-RAN** = এক জায়গায় কেন্দ্রীয় রান্নাঘর, সব বাড়িতে খাবার পাঠানো হয়। **O-RAN** = রান্নাঘরের যন্ত্রপাতি বিভিন্ন কোম্পানির হতে পারে, কারণ সব plug একই মাপের (open interface)।

**ধাপে ধাপে:**

1. প্রচলিত base station-এ দুটো অংশ: **RRU/RRH** (radio, antenna-র কাছে tower-এর উপরে) আর **BBU** (baseband — signal processing, tower-এর নিচে)।
2. **C-RAN (Centralized/Cloud RAN):** অনেক tower-এর BBU এক জায়গায় (**BBU pool / hub**) রাখা হয়; tower-এ শুধু RRU। সংযোগ **fronthaul fiber (CPRI)**।
3. C-RAN-এর সুবিধা: site-এ যন্ত্র কম (ভাড়া, বিদ্যুৎ, AC খরচ কম), **pooling** (যেখানে ভিড় সেখানে processing), সহজ coordination (**CoMP**, interference কম), সহজ maintenance।
4. অসুবিধা: খুব বেশি bandwidth আর কম latency-র fronthaul লাগে (অনেক fiber)।
5. **vRAN:** BBU-র কাজ সাধারণ server-এ software হিসেবে (NFV-এর RAN সংস্করণ)।
6. **O-RAN (Open RAN):** RAN-কে **RU, DU, CU**-তে ভাগ করে মাঝের interface খোলা মানের (O-RAN Alliance) করা — যাতে RU এক vendor-এর, DU/CU আরেক vendor-এর হতে পারে।
7. O-RAN-এর নতুন অংশ: **RIC (RAN Intelligent Controller)** — **Near-RT RIC** (10 ms–1 s, xApps) আর **Non-RT RIC** (> 1 s, rApps, SMO-র ভেতরে) — AI/ML দিয়ে নেটওয়ার্ক optimize করে।
8. Interface: **Open Fronthaul** (RU–DU, split 7.2x), **F1** (DU–CU), **E2** (RIC–নোড), **A1** (non-RT থেকে near-RT RIC), **O1** (management)।
9. O-RAN-এর সুবিধা: vendor বৈচিত্র্য, খরচ কম, নতুন উদ্ভাবন; চ্যালেঞ্জ: multi-vendor integration, performance, security, দায় কার।

**এক লাইনে:** C-RAN = baseband কেন্দ্রীভূত; vRAN = baseband software; O-RAN = RU/DU/CU খোলা interface + RIC-এ AI।

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **RAN:** Radio Access Network — টাওয়ার আর তার সাথের যন্ত্র, যা ফোনের সাথে radio-তে কথা বলে।
- **RRU / RU:** antenna-র পাশে লাগানো radio বাক্স।
- **BBU:** baseband — signal-এর হিসাব-নিকাশ করার "মস্তিষ্ক"।
- **DU / CU:** 5G-তে BBU-কে দুই ভাগ — DU দ্রুত কাজ (কাছে থাকে), CU ধীর-সহনশীল কাজ (কেন্দ্রে থাকতে পারে)।
- **Vendor lock-in:** একবার এক কোম্পানির যন্ত্র নিলে সব কিছু তাদের থেকেই কিনতে বাধ্য হওয়া।
- **RIC:** O-RAN-এর "বুদ্ধিমান নিয়ন্ত্রক" — AI app (xApp/rApp) দিয়ে নেটওয়ার্ক সাজায়।

**তিনটা ধাপে বিবর্তন:**

1. **প্রচলিত (D-RAN):** প্রতিটা টাওয়ারের নিচে একটা ঘরে BBU, AC, ব্যাটারি। ১০০ টাওয়ার = ১০০ ঘর, ১০০ AC।
2. **C-RAN:** ১০০ টাওয়ারের BBU এক জায়গায় (hub)। টাওয়ারে শুধু RU, fiber দিয়ে hub-এ যুক্ত। ঘর-ভাড়া, বিদ্যুৎ কমে; hub-এ processing ভাগাভাগি হয় — দিনে অফিস এলাকায় বেশি, রাতে আবাসিক এলাকায় বেশি।
3. **O-RAN:** RU যেকোনো কোম্পানির, DU/CU আরেক কোম্পানির software সাধারণ server-এ — কারণ মাঝের "plug" (interface) সবার জন্য একই মানের। সাথে RIC-এ AI দিয়ে ভিড় অনুযায়ী নিজে নিজে setting বদলায়।

**উপমা:** D-RAN = প্রতি বাড়িতে নিজের জেনারেটর; C-RAN = পাড়ায় একটা বড় জেনারেটর; O-RAN = সেই জেনারেটরের যন্ত্রাংশ যেকোনো দোকান থেকে কেনা যায়, কারণ সব একই মাপের।

**কেন অপারেটর O-RAN চায়:** দাম কমানো, এক vendor-এর উপর নির্ভরতা কমানো, নতুন বৈশিষ্ট্য দ্রুত আনা। **কেন সাবধান:** নানা vendor মেলাতে সময় লাগে, সমস্যা হলে দায় কার তা অস্পষ্ট।

### Understand it step by step

|                   | Traditional D-RAN | C-RAN                | vRAN                | O-RAN                |
| ----------------- | ----------------- | -------------------- | ------------------- | -------------------- |
| Baseband location | At each site      | Central pool         | Central, on servers | DU/CU anywhere       |
| Hardware          | Proprietary       | Proprietary          | COTS servers        | COTS + open RU       |
| Vendors           | Single            | Single               | Usually single      | Multi-vendor         |
| Key need          | —                 | Dark fiber fronthaul | NFV platform        | Open interfaces, RIC |

**Functional split (3GPP/O-RAN):** CU (RRC, PDCP — split 2 to DU), DU (RLC, MAC, high-PHY — split 7.2x to RU), RU (low-PHY, RF).

### Mindmap

```mindmap
C-RAN & O-RAN
  **Classic site**
    RRU on tower
    BBU at site
  **C-RAN**
    BBU pool / hub
    CPRI fronthaul
    pooling, CoMP
    less site cost
  **vRAN**
    baseband as software
    COTS servers
  **O-RAN**
    RU, DU, CU split
    open fronthaul 7.2x
    multi-vendor
  **RIC**
    near-RT: xApps
    non-RT: rApps (SMO)
    E2, A1, O1
  **Trade-offs**
    fiber demand
    integration, security
```

### Remember it

- **"C = Central, v = virtual, O = Open."**
- **Near-RT RIC runs xApps; Non-RT RIC runs rApps.**
- **Split 7.2x = O-RAN fronthaul.**

### Exam trap

- C-RAN does **not** mean multi-vendor; that is O-RAN.
- The **RU stays at the tower**; only baseband moves to the pool.

### Exam answer · C-RAN vs O-RAN

**C-RAN** centralises the baseband units of many cell sites into one pool connected to the remote radio units by high-capacity fronthaul fiber. It cuts site space, power and rent, allows resource pooling and coordinated multipoint transmission, and simplifies maintenance, but needs low-latency fronthaul.

**O-RAN** disaggregates the RAN into RU, DU and CU with open, standard interfaces (O-RAN Alliance: open fronthaul split 7.2x, F1, E2, A1, O1), so components from different vendors interoperate on general-purpose hardware. It adds the RAN Intelligent Controller, which hosts xApps and rApps for AI-driven optimisation. Benefits: vendor diversity, lower cost, faster innovation. Challenges: integration, performance and security.

**Relation:** C-RAN is about _where_ baseband runs; O-RAN is about _how open_ the parts are. Both rely on virtualization (vRAN) and are key to cost-efficient 5G.

# 13 · 5G network slicing

## 5G network slicing · eMBB, URLLC, mMTC

### Bangla core

**গল্পে বুঝি:** একটা মহাসড়কে আলাদা lane — অ্যাম্বুলেন্সের জন্য দ্রুত lane (কম latency), ট্রাকের জন্য বড় lane (বেশি bandwidth), সাইকেলের জন্য সরু কিন্তু অনেক lane (অনেক ডিভাইস)। রাস্তা একটাই, কিন্তু প্রতিটা lane আলাদা নিয়মে চলে। এটাই network slicing।

**ধাপে ধাপে:**

1. **Network slice** = একই physical নেটওয়ার্কের উপর একটা আলাদা, end-to-end (RAN + transport + core) logical নেটওয়ার্ক, নিজস্ব QoS আর নিরাপত্তা সহ।
2. তিনটা মূল ধরন (ITU IMT-2020):
   - **eMBB** (enhanced Mobile Broadband) — উচ্চ speed: 4K/8K ভিডিও, AR/VR। Peak 20 Gbps।
   - **URLLC** (Ultra-Reliable Low-Latency) — 1 ms latency, 99.999% reliability: রিমোট সার্জারি, স্বয়ংক্রিয় গাড়ি, কারখানা।
   - **mMTC** (massive Machine-Type) — প্রতি km²-এ ১০ লাখ ডিভাইস: smart meter, IoT sensor।
3. Slice-এর পরিচয় = **S-NSSAI** = **SST** (Slice/Service Type: 1 = eMBB, 2 = URLLC, 3 = MIoT) + **SD** (Slice Differentiator)।
4. **NSSF** ঠিক করে ফোন কোন slice পাবে; প্রতিটা slice-এর নিজের SMF/UPF থাকতে পারে।
5. সম্ভব হয় কারণ: **SA 5GC** (service-based), **NFV/SDN**, cloud, edge (MEC), আর orchestration।
6. ব্যবসায়িক ব্যবহার: ব্যাংকের জন্য নিরাপদ slice, হাসপাতালের জন্য URLLC slice, স্টেডিয়ামে ভিডিও slice, smart city IoT slice — অপারেটর **B2B** আয় বাড়াতে পারে।
7. চ্যালেঞ্জ: end-to-end orchestration জটিল, isolation নিশ্চিত করা, SLA পর্যবেক্ষণ, transport-এও slicing লাগে।

**এক লাইনে:** এক নেটওয়ার্ক, অনেক virtual নেটওয়ার্ক — eMBB (speed), URLLC (latency), mMTC (ডিভাইস সংখ্যা); S-NSSAI দিয়ে চিনি, NSSF দিয়ে বাছাই।

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Slice:** একটা physical নেটওয়ার্কের ভেতরে আলাদা "ভার্চুয়াল নেটওয়ার্ক"।
- **End-to-end:** ফোন → টাওয়ার → transport → core — পুরো পথ জুড়ে আলাদা নিয়ম।
- **Latency:** তথ্য যেতে-আসতে সময় (milliseconds)।
- **Reliability 99.999%:** ১ লাখ packet-এ মাত্র ১টা হারাতে পারে।
- **SLA:** অপারেটর আর গ্রাহকের মধ্যে চুক্তি — "এই গতি/latency নিশ্চিত, না হলে ক্ষতিপূরণ"।

**তিনটা slice তিনটা বাস্তব গল্পে:**

1. **eMBB (গতি):** বিপিএল ক্রিকেট মাঠে ২০,০০০ দর্শক একসাথে 4K live ভিডিও দেখছে — বড় bandwidth চাই।
2. **URLLC (তাৎক্ষণিকতা):** ঢাকার হাসপাতাল থেকে ডাক্তার রোবট দিয়ে রংপুরে অপারেশন করছেন — ১ ms দেরিও বিপদ, একটা packet-ও হারানো চলবে না।
3. **mMTC (সংখ্যা):** একটা শহরের লাখো বিদ্যুৎ-গ্যাস-পানির smart meter দিনে কয়েকবার ছোট তথ্য পাঠায় — গতি লাগে না, কিন্তু অনেক ডিভাইস আর বছরের পর বছর battery।

**একটা slice কীভাবে তৈরি হয় — ধাপে ধাপে:**

1. ব্যাংক অপারেটরের কাছে নিরাপদ, কম latency-র নেটওয়ার্ক চাইল (SLA)।
2. Orchestrator একটা নতুন S-NSSAI (SST + SD) তৈরি করে।
3. Core-এ ব্যাংকের জন্য আলাদা SMF আর UPF চালু হয় (NFV দিয়ে, মিনিটে)।
4. Transport-এ আলাদা VPN/VLAN।
5. Radio-তে ব্যাংকের ডিভাইসের packet-কে অগ্রাধিকার।
6. ব্যাংকের ATM/শাখার SIM-এ ওই slice অনুমোদিত হয়; NSSF তাদের ঠিক slice-এ পাঠায়।
7. সারাক্ষণ পর্যবেক্ষণ — SLA ভাঙলে সতর্কবার্তা।

**মনে রাখার কৌশল:** এক মহাসড়ক, তিন lane — বাস lane (eMBB, বড়), অ্যাম্বুলেন্স lane (URLLC, দ্রুত), সাইকেল lane (mMTC, অনেক কিন্তু ছোট)।

### Understand it step by step

| Slice type  | SST | Key KPI                             | Use cases                           |
| ----------- | --- | ----------------------------------- | ----------------------------------- |
| eMBB        | 1   | 20 Gbps peak DL, 100 Mbps user rate | 4K video, AR/VR, FWA                |
| URLLC       | 2   | 1 ms user-plane latency, 99.999%    | Remote surgery, V2X, factory robots |
| mMTC / MIoT | 3   | 10⁶ devices/km², long battery       | Smart meters, agriculture sensors   |

**How a slice is built:** RAN resources (scheduling priority, dedicated PRBs) + transport (VLAN/VPN, segment routing) + core (dedicated or shared AMF; dedicated SMF/UPF, edge UPF) + orchestration (NSMF/NSSMF) + SLA assurance.

### Mindmap

```mindmap
5G network slicing
  **Definition**
    logical end-to-end network
    shared physical infra
    own QoS & security
  **Types**
    eMBB: speed (SST 1)
    URLLC: 1 ms (SST 2)
    mMTC: 10⁶/km² (SST 3)
  **Identity**
    S-NSSAI = SST + SD
    NSSF selects
  **Enablers**
    SA 5GC (SBA)
    NFV, SDN
    edge UPF / MEC
  **Business**
    B2B slices (bank, hospital)
    SLA-based pricing
  **Challenges**
    orchestration
    isolation, monitoring
```

### Remember it

- **"Broad-Reliable-Massive" = eMBB, URLLC, mMTC = 1, 2, 3.**
- **S-NSSAI = SST + SD.**

### Exam trap

- Slicing needs **5G SA (5GC)**; NSA mode cannot slice end-to-end.
- A slice is **end-to-end** (RAN + transport + core), not just a radio setting.

### Exam answer · What is 5G network slicing? Give examples

Network slicing creates multiple independent, end-to-end logical networks on one shared physical 5G infrastructure. Each slice is tailored to a service with its own capacity, latency, reliability and security, and is identified by an S-NSSAI (SST + SD); the NSSF chooses the slice and each slice can have its own SMF and UPF. The three standard types are eMBB for high-speed broadband (video, AR/VR), URLLC for 1 ms latency and 99.999% reliability (remote surgery, autonomous vehicles, factory automation) and mMTC for a million IoT devices per square kilometre (smart meters, sensors). Slicing is made possible by the service-based 5G core, NFV, SDN and edge computing. For an operator it opens new enterprise revenue — for example a secure slice for banks or a low-latency slice for hospitals — but needs strong orchestration and SLA monitoring.

# 14 · Power system for telecom

## Telecom power systems · rectifier, battery, generator, solar

### Bangla core

**গল্পে বুঝি:** একটা tower site হলো হাসপাতালের ICU — এক সেকেন্ডও বিদ্যুৎ যেতে পারবে না। তাই মূল বিদ্যুৎ (grid), তার পেছনে ব্যাটারি, তার পেছনে জেনারেটর, সাথে সোলার।

**ধাপে ধাপে:**

1. Telecom যন্ত্র চলে **−48 V DC**-তে (positive ground)। কারণ: নিরাপদ নিম্ন voltage, ব্যাটারির সাথে সরাসরি মেলে, negative polarity তারের ক্ষয় (corrosion) কমায়।
2. **AC mains (grid)** → **ATS** (Automatic Transfer Switch, grid আর generator-এর মধ্যে বদল) → **Rectifier** (AC থেকে −48 V DC) → load (BTS, microwave)।
3. Rectifier-এর সাথে সমান্তরালে **battery bank** (VRLA lead-acid বা এখন **Li-ion LiFePO4**) — grid গেলে বিনা বিরতিতে ব্যাটারি চালায়, grid থাকলে rectifier ব্যাটারি চার্জ রাখে (float charge)।
4. **Rectifier redundancy N+1:** দরকারের চেয়ে একটা module বেশি, একটা নষ্ট হলেও চলবে।
5. **DG (Diesel Generator):** দীর্ঘ লোডশেডিংয়ে চালু হয়; বাংলাদেশে বহু site-এ গুরুত্বপূর্ণ।
6. **Solar hybrid:** solar panel + charge controller + battery — জ্বালানি খরচ ও কার্বন কমায়, off-grid এলাকায় কাজে লাগে।
7. **হিসাব:** Power = V × I; ব্যাটারি capacity (Ah) = load current × backup hours। 48 V, 30 A, 6 ঘণ্টা → P = 1440 W, ব্যাটারি = **180 Ah** (বাস্তবে depth of discharge আর বয়সের জন্য বাড়তি margin)।
8. বাকি অংশ: **earthing/grounding** আর **lightning arrester/SPD** (বজ্রপাত সুরক্ষা), **AC/cooling** (যন্ত্র ঠান্ডা রাখা), **remote monitoring** (NOC থেকে battery, fuel, door alarm দেখা)।
9. কার্যকারিতা মাপ: **PUE** (data center), site energy efficiency; free cooling আর outdoor cabinet দিয়ে বিদ্যুৎ সাশ্রয়।

**এক লাইনে:** Grid → ATS → rectifier (−48 V DC) → load, সমান্তরালে ব্যাটারি, পেছনে generator আর solar; Ah = A × h।

### Picture it

A telecom site must behave like an ICU: the lights can never go out. Grid power is the normal supply. A battery bank sits behind it like an emergency oxygen cylinder that takes over instantly, with no gap. If the outage is long, the generator (backup diesel) starts like a reserve oxygen plant. Solar panels on the roof cut the fuel bill. And the whole room runs on −48 V DC, a safe, battery-friendly voltage.

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **AC:** বাসার বিদ্যুৎ (220 V), দিক বারবার বদলায়।
- **DC:** ব্যাটারির বিদ্যুৎ, এক দিকে চলে।
- **Rectifier:** AC থেকে DC বানানোর যন্ত্র — মোবাইল চার্জারের বড় সংস্করণ।
- **ATS:** grid চলে গেলে নিজে নিজে জেনারেটরে সুইচ করে।
- **Float charge:** ব্যাটারিকে সব সময় হালকা চার্জে ভরা রাখা।
- **DoD (Depth of Discharge):** ব্যাটারির কত শতাংশ খরচ করা নিরাপদ। ৮০% DoD মানে ২০% সব সময় বাকি রাখতে হবে।
- **Ah (Ampere-hour):** ব্যাটারি কত current কত ঘণ্টা দিতে পারে।
- **LVD:** ব্যাটারি খুব কমে গেলে লোড কেটে দেয়, যাতে ব্যাটারি নষ্ট না হয়।

**লোডশেডিং হলে site-এ কী হয় — ধাপে ধাপে:**

1. সকাল ১০টা: grid চলে গেল।
2. শূন্য সেকেন্ডে: rectifier বন্ধ, কিন্তু ব্যাটারি আগেই DC bus-এ যুক্ত — কোনো বিরতি নেই, কল চলছে।
3. NOC-তে alarm যায়: "mains fail"।
4. নির্ধারিত সময় পরে বা ব্যাটারি একটা মাত্রায় নামলে DG চালু; ATS লোড DG-তে সরায়।
5. DG থেকে AC → rectifier → load চালায়, সাথে ব্যাটারি আবার চার্জ।
6. grid ফিরলে ATS আবার grid-এ, DG বন্ধ।
7. DG না থাকলে আর ব্যাটারি শেষ হলে LVD লোড কাটে → site down। তাই ব্যাটারির হিসাব গুরুত্বপূর্ণ।

**হিসাবটা ধীরে ধীরে:**

1. Load: 48 V, 30 A → power = 48 × 30 = 1440 W।
2. ৬ ঘণ্টা backup চাই → 30 A × 6 h = 180 Ah।
3. কিন্তু ব্যাটারি পুরো খালি করা যাবে না (80% DoD) → 180 ÷ 0.8 = 225 Ah।
4. বয়সে ক্ষমতা কমে, তাই বাস্তবে আরও একটু বড় (যেমন 250–300 Ah) নেওয়া হয়।

**কেন −48 V:** কম voltage তাই মানুষের জন্য নিরাপদ; ২৪টা ২-ভোল্টের lead-acid cell মিলে ৪৮ V সহজে হয়; negative রাখলে মাটির নিচের তার কম মরিচা ধরে।

### Understand it step by step

1. **Power chain:** AC grid / DG → ATS → AC distribution → rectifiers (N+1) → DC bus −48 V → BTS, BBU, RRU, microwave; batteries floated on the DC bus; LVD (low-voltage disconnect) protects batteries from deep discharge.
2. **Why −48 V:** below dangerous shock levels, matches 24 lead-acid cells (24 × 2 V), lower current than 12/24 V for the same power, negative polarity reduces electrolytic corrosion.
3. **Battery types:** VRLA (cheap, heavy, heat-sensitive), Li-ion (longer life, more cycles, lighter, costlier, needs BMS).
4. **Sizing:** Ah = I × t ÷ (DoD × efficiency). Example: 30 A × 6 h = 180 Ah ideal; with 80% DoD → 225 Ah.
5. **Renewables:** solar–DG hybrid, solar–battery for off-grid; reduces diesel cost and emissions.
6. **Protection:** earthing (low resistance, e.g. < 5 Ω), SPD, lightning rods, fire suppression.

### Mindmap

```mindmap
Telecom power
  **Sources**
    AC grid
    diesel generator (DG)
    solar hybrid
  **Conversion**
    ATS switches source
    rectifier AC → −48 V DC
    N+1 modules
  **Backup**
    VRLA / Li-ion battery
    float charging
    LVD protection
  **Sizing**
    P = V × I
    Ah = A × hours
    48 V, 30 A, 6 h → 180 Ah
  **Protection**
    earthing, SPD
    lightning arrester
    cooling
  **Monitoring**
    remote site alarms
    fuel, battery, door
```

### Remember it

- **"Minus 48, never late"** — DC with batteries means no break.
- **24 cells × 2 V = 48 V.**
- **Ah = amps × hours.**

### Exam trap

- Telecom DC is **−48 V** (positive grounded), not +48 V.
- Forgetting depth of discharge — real battery size must be **larger** than A × h.

### Exam answer · Describe a telecom site power system

A telecom site needs uninterrupted DC power. Mains AC enters through an automatic transfer switch, which switches to a diesel generator during long outages. Modular rectifiers in N+1 redundancy convert AC to −48 V DC and feed the radio, baseband and transmission equipment. A battery bank (VRLA or Li-ion) floats on the DC bus, is kept charged by the rectifiers and takes over instantly when AC fails; a low-voltage disconnect protects it from deep discharge. Solar panels with charge controllers are added in hybrid systems to cut diesel cost. The site also needs earthing, surge and lightning protection, cooling and remote monitoring of alarms. **Example sizing:** a 30 A load for 6 hours needs 180 Ah (about 225 Ah at 80% depth of discharge); load power = 48 × 30 = 1,440 W.

# 15 · Scripting for simulation, modelling and configuration

## Scripting for cellular systems · Python, Bash, automation

### Bangla core

**গল্পে বুঝি:** ১০০০টা tower-এ হাতে হাতে একই setting বদলানো মানে ১০০০ বার একই কাজ। Script হলো রোবট সহকারী — একবার লিখলে সব জায়গায় নিজে নিজে করে দেয়।

**ধাপে ধাপে:**

1. **কোথায় script লাগে:** configuration (অনেক নোডে একসাথে parameter বদল), KPI report (log/CSV থেকে drop rate বের করা), simulation (coverage, traffic মডেল), test automation।
2. **ভাষা:** **Python** (সবচেয়ে প্রচলিত — pandas, numpy, matplotlib, netmiko, paramiko), **Bash/Shell** (Linux server কাজ), **MATLAB** (signal ও radio simulation), **Perl/TCL** (পুরোনো vendor tool)।
3. **ডিভাইস নিয়ন্ত্রণ:** SSH/CLI (netmiko), **NETCONF/YANG**, REST API, SNMP (monitoring)।
4. **Automation tool:** **Ansible** (playbook দিয়ে অনেক device configure), Git (version control)।
5. **Simulation tool:** **ns-3** (network simulator), MATLAB 5G Toolbox, OMNeT++।
6. ভালো script-এর নিয়ম: input যাচাই, error handling, log রাখা, আগে test নোডে চালানো (dry run), rollback পরিকল্পনা।
7. **KPI মনে রাখো:** CSSR (Call Setup Success Rate), CDR (Call Drop Rate), HOSR (Handover Success Rate), availability, throughput, PRB utilization।

**এক লাইনে:** Python/Bash script দিয়ে configuration, KPI report আর simulation স্বয়ংক্রিয় করা; সব সময় test, log আর rollback।

### Bangla core · আরও সহজ করে

**শব্দগুলো সহজ ভাষায়:**

- **Script:** ছোট program, যা একঘেয়ে কাজ নিজে করে।
- **CSV:** comma দিয়ে আলাদা করা সাধারণ টেবিল ফাইল (Excel খুলতে পারে)।
- **SSH:** দূরের যন্ত্রে নিরাপদে login করার উপায়।
- **NETCONF/YANG:** যন্ত্রের setting নির্দিষ্ট কাঠামোয় পড়া-লেখার আধুনিক মান।
- **Ansible:** একটা "রেসিপি ফাইল" (playbook) দিয়ে শত যন্ত্রে একই setting দেওয়া।
- **KPI:** নেটওয়ার্কের স্বাস্থ্যের মাপকাঠি (কত কল সফল, কত কাটল)।

**ওপরের Python script লাইন ধরে ব্যাখ্যা:**

1. `import csv` — CSV ফাইল পড়ার লাইব্রেরি আনা।
2. `drop_rates(path)` — একটা function, ফাইলের পথ নেয়।
3. `csv.DictReader(f)` — প্রতিটা সারিকে dictionary বানায়: `{"cell": "DHK001", "attempts": "1000", "drops": "15"}`।
4. `int(...)` — লেখাকে সংখ্যায় বদলায়।
5. `0.0 if attempts == 0 else ...` — attempts শূন্য হলে ভাগ করা যাবে না, তাই 0 ধরা (error এড়ানো)।
6. `100.0 * drops / attempts` — শতাংশ: 15/1000 × 100 = 1.5%।
7. `sorted(... key=lambda x: -x[1])` — সবচেয়ে খারাপ cell আগে দেখানো।
8. `rate > 2.0` হলে "HIGH" — ২%-এর বেশি drop হলে নজর দিতে হবে।

**বাস্তবে একজন Assistant Manager কী script লেখেন:**

- প্রতিদিন সকালে OSS থেকে KPI ফাইল নিয়ে খারাপ ২০টা cell-এর তালিকা ইমেইলে পাঠানো।
- নতুন ৫০টা টাওয়ারে একই neighbour list বা parameter বসানো।
- alarm log থেকে কোন site বারবার power fail করছে তা গোনা।
- নতুন টাওয়ারের coverage আগে থেকে হিসাব করা (path loss simulation)।

### Understand it step by step

1. **Use cases:** bulk parameter changes, KPI extraction from OSS exports, alarm parsing, capacity forecasting, drive-test analysis, Monte Carlo coverage simulation.
2. **Python example — call drop rate per cell from a CSV** (columns `cell,attempts,drops`):

```python
import csv

def drop_rates(path):
    rates = {}
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            attempts = int(row["attempts"])
            drops = int(row["drops"])
            rates[row["cell"]] = 0.0 if attempts == 0 else 100.0 * drops / attempts
    return rates

if __name__ == "__main__":
    for cell, rate in sorted(drop_rates("kpi.csv").items(), key=lambda x: -x[1]):
        flag = "HIGH" if rate > 2.0 else "ok"
        print(f"{cell}: {rate:.2f}% {flag}")
```

For a file with `DHK001,1000,15` and `DHK002,800,30` it prints `DHK002: 3.75% HIGH` then `DHK001: 1.50% ok`.

3. **Bash example — count critical alarms in a log:** `grep -c "CRITICAL" alarms.log`
4. **Simple simulation idea:** received power = Pt + Gt + Gr − FSPL(d, f); loop over distances and plot where it drops below receiver sensitivity → cell edge.

### Mindmap

```mindmap
Scripting in telecom
  **Uses**
    bulk configuration
    KPI reports
    simulation & planning
    test automation
  **Languages**
    Python (pandas, netmiko)
    Bash / shell
    MATLAB, TCL
  **Interfaces**
    SSH / CLI
    NETCONF / YANG
    REST API, SNMP
  **Tools**
    Ansible, Git
    ns-3, OMNeT++
  **Good practice**
    validate input
    log, dry run
    rollback
  **KPIs**
    CSSR, CDR, HOSR
    availability, throughput
```

### Remember it

- **KPI trio: CSSR up, CDR down, HOSR up.**
- **"Test, log, rollback."**

### Exam trap

- Dividing by zero attempts — always guard it.
- SNMP is mainly for **monitoring**; NETCONF/YANG is for structured **configuration**.

### Exam answer · Role of scripting in cellular networks

Scripting automates repetitive network tasks. Engineers use Python and Bash to push parameter changes to hundreds of sites through SSH, NETCONF or vendor APIs; to parse OSS exports and compute KPIs such as call setup success rate, drop rate and handover success; to analyse drive-test data; and to simulate coverage and traffic before deployment (ns-3, MATLAB). Automation tools such as Ansible make changes repeatable and auditable. Benefits are speed, fewer human errors and consistent configuration. Good practice: validate inputs, log every action, test on one node first, and keep a rollback script.

# 16 · Bangladesh telecom industry

## Bangladesh telecom industry · operators, regulator, milestones

### Bangla core

**গল্পে বুঝি:** বাংলাদেশের মোবাইল বাজার চার দোকানের বাজার — তিনটা বেসরকারি বড় দোকান আর একটা রাষ্ট্রায়ত্ত দোকান (Teletalk); বাজারের নিয়ম ঠিক করে BTRC।

**ধাপে ধাপে:**

1. **নিয়ন্ত্রক:** **BTRC** (Bangladesh Telecommunication Regulatory Commission), প্রতিষ্ঠা **২০০১ সালের বাংলাদেশ টেলিযোগাযোগ আইনে**; spectrum বরাদ্দ, লাইসেন্স, tariff, মান নিয়ন্ত্রণ করে।
2. **মন্ত্রণালয়:** ডাক ও টেলিযোগাযোগ বিভাগ (Posts and Telecommunications Division)।
3. **মোবাইল অপারেটর:** **Grameenphone** (সবচেয়ে বড়, Telenor-সংশ্লিষ্ট), **Robi** (Axiata; Airtel এর সাথে একীভূত, ২০১৬), **Banglalink** (VEON), **Teletalk** (রাষ্ট্রায়ত্ত)।
4. **Teletalk Bangladesh Ltd:** ২০০৪ সালে প্রতিষ্ঠিত, বাণিজ্যিক কার্যক্রম ২০০৫ থেকে; দেশের প্রথম **3G** চালু (২০১২); পরীক্ষামূলক **5G** চালু করে ডিসেম্বর ২০২১-এ; ভর্তি পরীক্ষা, নিয়োগ আবেদন ইত্যাদি সেবায় পরিচিত। Brand: "আমাদের ফোন"।
5. **প্রজন্মের ইতিহাস:** প্রথম মোবাইল ১৯৯৩ (Citycell, CDMA — পরে বন্ধ), GP ১৯৯৭; 3G ২০১২–১৩; 4G ফেব্রুয়ারি ২০১৮; 5G ট্রায়াল ২০২১।
6. **অন্য প্রতিষ্ঠান:** **BTCL** (রাষ্ট্রায়ত্ত fixed-line ও internet), **BSCCL** (সাবমেরিন ক্যাবল — SEA-ME-WE 4 ও 5), **BSCL** (বঙ্গবন্ধু স্যাটেলাইট-১, ২০১৮), **Tower sharing** কোম্পানি (edotco, Summit Towers ইত্যাদি), **NTTN** অপারেটর (Summit Communications, Fiber@Home, BTCL ইত্যাদি), IIG, ICX, IGW লাইসেন্সধারী।
7. **গুরুত্বপূর্ণ নীতি:** **MNP** (নম্বর রেখে অপারেটর বদল, ২০১৮), **বায়োমেট্রিক SIM নিবন্ধন** (২০১৬), **NEIR** (হ্যান্ডসেট IMEI নিবন্ধন), **SMP** (Significant Market Power) নীতি।
8. **MCC = 470**; GP 470-01, Robi 470-02, Banglalink 470-03, Teletalk 470-04 (পরীক্ষার আগে যাচাই করো)।
9. **চ্যালেঞ্জ:** spectrum-এর উচ্চ দাম, কম ARPU, fiberization কম, tower power খরচ, গ্রামীণ coverage-এর মান।

**এক লাইনে:** BTRC নিয়ন্ত্রক; GP, Robi, Banglalink, Teletalk; Teletalk ২০০৪, প্রথম 3G ২০১২, 5G ট্রায়াল ২০২১; MCC 470।

### Picture it

Think of Bangladesh's mobile market as one big bazaar with four shops (Grameenphone, Robi, Banglalink and the state-owned Teletalk), one market committee that issues trade licences and sets fair rules (BTRC), and shared roads and warehouses that all shops rent (tower companies, NTTN fiber, submarine cables, the satellite). Customers can move their account to another shop without changing their name tag (mobile number portability).

### Bangla core · আরও সহজ করে

**প্রশ্ন-উত্তর আকারে মুখস্থ (MCQ-র জন্য):**

- দেশের নিয়ন্ত্রক সংস্থা কোনটি? → **BTRC**।
- BTRC কোন আইনে? → **বাংলাদেশ টেলিযোগাযোগ আইন, ২০০১**।
- রাষ্ট্রায়ত্ত মোবাইল অপারেটর? → **টেলিটক**।
- টেলিটক কবে প্রতিষ্ঠিত? → **২০০৪** (সেবা শুরু ২০০৫)।
- দেশে প্রথম 3G কে চালু করে? → **টেলিটক, ২০১২**।
- 4G কবে চালু হয়? → **ফেব্রুয়ারি ২০১৮**।
- 5G ট্রায়াল প্রথম কে? → **টেলিটক, ডিসেম্বর ২০২১**।
- MNP কবে? → **অক্টোবর ২০১৮**।
- বাংলাদেশের MCC? → **470**।
- প্রথম সাবমেরিন ক্যাবল? → **SEA-ME-WE 4 (২০০৬)**; দ্বিতীয় **SEA-ME-WE 5 (২০১৭)**।
- প্রথম স্যাটেলাইট? → **বঙ্গবন্ধু স্যাটেলাইট-১, মে ২০১৮**।
- দেশের প্রথম মোবাইল অপারেটর? → **সিটিসেল (১৯৯৩)**, এখন বন্ধ।

**শব্দগুলো সহজ ভাষায়:**

- **NTTN:** দেশজুড়ে fiber নেটওয়ার্কের লাইসেন্সধারী কোম্পানি, অপারেটরদের কাছে fiber ভাড়া দেয়।
- **Tower sharing:** এক কোম্পানির টাওয়ারে একাধিক অপারেটরের antenna — খরচ কমে।
- **IIG / IGW / ICX:** আন্তর্জাতিক internet, আন্তর্জাতিক কল আর অপারেটরদের মধ্যে কল আদান-প্রদানের লাইসেন্স।
- **ARPU:** প্রতি গ্রাহকের গড় মাসিক আয় — বাংলাদেশে বিশ্বের সবচেয়ে কমগুলোর একটা।
- **SMP:** বাজারে অত্যধিক প্রভাবশালী অপারেটর ঘোষণা করে নিয়ন্ত্রণ আরোপ।

**লিখিত প্রশ্নে কী লিখবে (কাঠামো):** নিয়ন্ত্রক → অপারেটর → মাইলফলক → অবকাঠামো → সমস্যা → ভবিষ্যৎ (5G, fiber, ডিজিটাল সেবা)। সংখ্যা দিলে "BTRC-এর তথ্য অনুযায়ী" লিখবে এবং পরীক্ষার আগে সর্বশেষ সংখ্যা মিলিয়ে নেবে।

### Understand it step by step

| Item             | Fact (verify the latest numbers before the exam)                        |
| ---------------- | ----------------------------------------------------------------------- |
| Regulator        | BTRC, under the Bangladesh Telecommunication Act 2001                   |
| Ministry         | Posts and Telecommunications Division                                   |
| Operators        | Grameenphone, Robi, Banglalink, Teletalk (state-owned)                  |
| Teletalk         | Incorporated 2004; first 3G in Bangladesh (Oct 2012); 5G trial Dec 2021 |
| 4G launch        | February 2018 (all operators)                                           |
| MNP              | Launched October 2018                                                   |
| Submarine cables | SEA-ME-WE 4 (2006), SEA-ME-WE 5 (2017); BSCPLC operates                 |
| Satellite        | Bangabandhu Satellite-1, launched May 2018                              |
| MCC              | 470                                                                     |
| Fixed line       | BTCL                                                                    |
| Tower / fiber    | Tower-sharing licensees; NTTN operators                                 |

### Mindmap

```mindmap
Bangladesh telecom
  **Regulation**
    BTRC (Act 2001)
    P&T Division
    licensing, spectrum
  **Mobile operators**
    Grameenphone
    Robi
    Banglalink
    Teletalk (state-owned)
  **Teletalk**
    2004
    first 3G 2012
    5G trial 2021
  **Milestones**
    4G 2018
    MNP 2018
    biometric SIM 2016
    NEIR
  **Infrastructure**
    BTCL, BSCPLC cables
    Bangabandhu Sat-1
    NTTN, tower sharing
  **Challenges**
    spectrum price, ARPU
    fiberization, power
```

### Remember it

- **"G-R-B-T" = GP, Robi, Banglalink, Teletalk.**
- **MCC 470.**
- **Teletalk = first 3G (2012).**

### Exam trap

- Subscriber counts and market shares change monthly — **quote "according to BTRC" and round**; check the latest figures before the exam.
- Citycell (CDMA) was the first mobile operator but is now closed.

### Exam answer · Overview of the Bangladesh telecom industry

Bangladesh's telecom sector is regulated by the BTRC under the Telecommunication Act 2001. Four mobile operators compete: Grameenphone (market leader), Robi, Banglalink and the state-owned Teletalk. Mobile and internet subscriptions have grown to well over a hundred million, driven by low-cost handsets and mobile financial services. Key milestones include 3G in 2012 (Teletalk first), 4G in 2018, mobile number portability in 2018, biometric SIM registration and the Bangabandhu Satellite-1. Supporting infrastructure comes from NTTN fiber operators, tower-sharing companies, the submarine cable company and BTCL. Main challenges are high spectrum costs, low ARPU, limited fiber backhaul and site power costs. 5G rollout, fiberization and digital services are the next growth drivers.

# 17 · Numericals and formulas

## Telecom numericals · worked examples

### Understand it step by step

All answers recomputed.

1. **Wavelength:** f = 900 MHz → λ = 3×10⁸ / 9×10⁸ = **0.333 m**. f = 3.5 GHz → λ = **8.57 cm**.
2. **dBm:** 20 W = 20,000 mW → 10 log10(20,000) = **43 dBm**. 0 dBm = 1 mW; 30 dBm = 1 W.
3. **Shannon:** B = 20 MHz, SNR = 30 dB (= 1000) → C = 20×10⁶ × log2(1001) = 20×10⁶ × 9.967 ≈ **199.3 Mbps**.
4. **Channels per cell:** 280 channels, N = 7 → **40 per cell**.
5. **Cluster size:** i = 2, j = 1 → N = 4 + 2 + 1 = **7**. Reuse ratio D/R = √(3×7) ≈ **4.58**.
6. **Erlang:** 100 calls/h × 3 min average = 300 min = **5 Erlang**.
7. **Bits per symbol:** 256-QAM → log2(256) = **8 bits**. Symbol rate 10 Msym/s → 80 Mbps raw.
8. **PCM voice:** 8 kHz × 8 bits = **64 kbps**; E1 = 32 × 64 = **2.048 Mbps**.
9. **Power and battery:** 48 V × 30 A = **1,440 W**; 6 h backup → 30 × 6 = **180 Ah** (≈ 225 Ah at 80% DoD).
10. **FSPL:** d = 1 km, f = 1800 MHz → 20log(1) + 20log(1800) + 32.44 = 0 + 65.11 + 32.44 ≈ **97.5 dB**.

### Exam trap

- Mixing MHz and Hz in λ = c/f.
- Using 30 instead of 1000 for 30 dB SNR in Shannon.

# 18 · Communication and aptitude

## Communication skills and aptitude · quick prep

### Bangla core

**গল্পে বুঝি:** Technical জ্ঞান হলো গাড়ির ইঞ্জিন, communication হলো স্টিয়ারিং — ইঞ্জিন যত শক্তিশালী হোক, দিক ঠিক না রাখলে লক্ষ্যে পৌঁছানো যায় না।

**ধাপে ধাপে:**

1. **Communication প্রশ্নের ধরন:** email/letter লেখা (গ্রাহকের অভিযোগের উত্তর, ঊর্ধ্বতনকে network outage রিপোর্ট), প্যাসেজ পড়ে উত্তর, grammar/vocabulary MCQ, ছোট essay (যেমন "5G in Bangladesh")।
2. **ভালো email-এর কাঠামো:** subject (স্পষ্ট) → সম্বোধন → উদ্দেশ্য এক লাইনে → মূল তথ্য (কী হয়েছে, প্রভাব, সমাধান, সময়) → পরবর্তী পদক্ষেপ → বিনয়ী সমাপ্তি।
3. **Outage report-এর ৫ প্রশ্ন:** কী হয়েছে, কখন, কতজন প্রভাবিত, কারণ (root cause), কী করা হচ্ছে/প্রতিরোধ।
4. **Aptitude:** percentage, ratio, time-speed-distance, time-work, series, simple/compound interest, probability, coding-decoding, direction, blood relation — Math Practice পাতার পদ্ধতি ব্যবহার করো।
5. **কৌশল:** প্রথমে সহজ প্রশ্ন, সময় ধরে, অনুমান শুধু negative marking না থাকলে।

**এক লাইনে:** Communication = স্পষ্ট কাঠামো (কী-কখন-প্রভাব-কারণ-সমাধান); aptitude = দ্রুত, সহজ প্রশ্ন আগে।

### Exam answer · Model email: reporting a network outage

**Subject:** Service outage in Mirpur cluster — 12 Oct, 14:10–15:40

Dear Sir,

I am writing to report a service outage affecting 18 sites in the Mirpur cluster today from 14:10 to 15:40 (90 minutes).

**Impact:** about 25,000 subscribers had no voice or data service; call setup success fell to zero on the affected sites.

**Cause:** a fiber cut on the backhaul ring between two aggregation nodes during road construction; the protection path was already down for maintenance.

**Action taken:** traffic was rerouted over microwave at 14:45 for priority sites; the fiber was spliced and all sites were back at 15:40.

**Prevention:** we will not schedule maintenance on a protection path while its partner is at risk, and we are coordinating with the city authority on road-work notices.

I will share the full incident report by tomorrow.

Regards,
[Name], Assistant Manager (Technical)

# 19 · Past written questions (solved)

Telecom and IT recruitment papers mix electronics, optical fiber, networking, C/Java, SQL and architecture. These are restated from coaching question banks; every answer below was recomputed, and code and SQL were run. Two book answers are corrected (marked ❌).

## Past paper set A · electronics, fiber, networking

### The past questions

1. Sketch Vo for a ±5 V triangle input: 5 kΩ series, 10 kΩ shunt, Zener (Vz = 3 V), 10 kΩ load.
2. 11/0.415 kV, 200 kVA, Δ-Y transformer: DC resistance between two HT lines = 6 Ω at 20 °C. Find each HT phase winding resistance at 75 °C (α = 0.00393/°C).
3. Op-amp: Vin → 10 kΩ → + input, 10 kΩ from + input to ground, 100 kΩ from output to the + node, − input grounded. Find Vo/Vin.
4. 1550 nm single-mode link, 50 km, 0.2 dB/km, a splice every 2 km at 0.5 dB each. Minimum launch power for 10 µW at the receiver?
5. Identify the protocols: mail to the receiver's server; dynamic IP; IP → MAC; error message to the source.
6. 192.168.10.0/23 → subnet mask, number of hosts, broadcast, last usable host.
7. Write `sumdigits`: 123 → 6.

### Bangla core

**গল্পে বুঝি:** প্রতিটা সংখ্যার প্রশ্ন একটা রেসিপির মতো — আগে উপাদান (দেওয়া মান) সাজাও, তারপর সূত্র, শেষে একক (V, Ω, dBm) বসাও।

**ধাপে ধাপে:**

1. **Zener সার্কিট:** আগে zener সরিয়ে দেখো output কত হয়। Source + 5k + 10k-কে Thevenin বানাও: Vth = Vin × 10/15 = (2/3)Vin, Rth = 5k‖10k = 3.33k। তারপর 10k load-এ Vo = (2/3)Vin × 10/13.33 = **Vin/2**। Vin সর্বোচ্চ 5 V → Vo সর্বোচ্চ 2.5 V, যা Vz = 3 V-এর কম → **zener কখনো breakdown-এ যায় না**। নেগেটিভ দিকে zener সাধারণ diode-এর মতো forward হয়ে Vo-কে **−0.7 V-এ আটকে দেয়** (Vin < −1.4 V হলে)।
2. **Delta winding:** দুই line-এর মাঝে মাপলে একটা winding (R) আরেক দুইটার সিরিজের (2R) সাথে parallel: R‖2R = 2R/3 = 6 → R = **9 Ω** (20 °C)। 75 °C-এ: 9 × (1 + 0.00393 × 55) = **10.95 Ω**।
3. **Op-amp:** − input মাটিতে, ideal ধরে + node-ও 0 V। ওই node-এ current-এর যোগফল শূন্য: Vin/10k + 0 + Vo/100k = 0 → **Vo/Vin = −10**।
4. **Fiber:** fiber loss 50 × 0.2 = 10 dB; joint 50/2 − 1 = 24টা × 0.5 = 12 dB; মোট 22 dB। Receiver 10 µW = −20 dBm। Launch = −20 + 22 = **+2 dBm ≈ 1.58 mW**।
5. **Protocol:** SMTP, DHCP, ARP, ICMP।
6. **/23:** 9 bit host → 2⁹ − 2 = **510** host; mask **255.255.254.0**; broadcast **192.168.11.255**; শেষ host **192.168.11.254**।
7. **sumdigits:** সংখ্যা থেকে % 10 দিয়ে শেষ অঙ্ক নাও, যোগ করো, / 10 দিয়ে অঙ্কটা ফেলে দাও — শূন্য না হওয়া পর্যন্ত।

**এক লাইনে:** Thevenin দিয়ে zener, R‖2R দিয়ে delta, KCL দিয়ে op-amp, dB যোগ দিয়ে fiber।

### Part · Worked answers

#### Solution

**A1 Zener clipper.**

1. Remove the Zener and take the Thevenin equivalent of Vin, 5 kΩ and the 10 kΩ shunt: Vth = Vin × 10/(5 + 10) = 0.667 Vin; Rth = 5‖10 = 3.33 kΩ.
2. Add the 10 kΩ load: Vo = 0.667 Vin × 10/(3.33 + 10) = **0.5 Vin**.
3. Positive half: Vo peaks at 2.5 V < Vz = 3 V, so the Zener stays off and Vo is a triangle of peak **+2.5 V**.
4. Negative half (Zener forward-biased, cathode at the top): Vo is clamped at **−0.7 V** once Vin < −1.4 V (0 V for an ideal diode).
5. Sketch: a triangle following Vin/2 from −0.7 V up to +2.5 V, with flat tops at −0.7 V on the negative side.
6. Trap: answering "clipped at 3 V" — the Zener never reaches 3 V. (If the Zener were reversed, the positive side would clamp at +0.7 V and the negative side would reach −2.5 V unclipped.)

**A2 Transformer resistance.**

- Between two lines of a delta: one phase R in parallel with two phases in series (2R) → R_line = R × 2R / 3R = 2R/3.
- 2R/3 = 6 Ω → **R_phase(20 °C) = 9 Ω**.
- R₇₅ = R₂₀ [1 + α(75 − 20)] = 9 × (1 + 0.00393 × 55) = 9 × 1.216 = **10.95 Ω**.

**A3 Op-amp.** − input is grounded, so V+ = V− = 0 (ideal). KCL at the + node: (Vin − 0)/10k + (0 − 0)/10k + (Vo − 0)/100k = 0 → Vo = −10 Vin → **Vo/Vin = −10**. The 10 kΩ to ground carries no current. Note: feedback to the + input is positive feedback; a real circuit would saturate, so write the ideal answer and mention it.

**A4 Fiber link power budget.**

| Item           | Value                                  |
| -------------- | -------------------------------------- |
| Fiber loss     | 50 km × 0.2 dB/km = 10 dB              |
| Splices        | 50/2 − 1 = 24 joints × 0.5 dB = 12 dB  |
| Total loss     | 22 dB                                  |
| Receiver power | 10 µW = 10 log(10 µW / 1 mW) = −20 dBm |
| Launch power   | −20 + 22 = **+2 dBm = 1.58 mW**        |

If the paper counts a joint at both ends (25 joints → 12.5 dB), the answer is +2.5 dBm = 1.78 mW; state the assumption.

**A5 Protocols.** SMTP (Simple Mail Transfer Protocol) · DHCP (Dynamic Host Configuration Protocol) · ARP (Address Resolution Protocol) · ICMP (Internet Control Message Protocol). ❌ The book spells "Address Resulation"; the word is **Resolution**.

**A6 192.168.10.0/23.**

| Item        | Answer         |
| ----------- | -------------- |
| Subnet mask | 255.255.254.0  |
| Network     | 192.168.10.0   |
| Hosts       | 2⁹ − 2 = 510   |
| First host  | 192.168.10.1   |
| Broadcast   | 192.168.11.255 |
| Last usable | 192.168.11.254 |

**A7 sumdigits (Java, run: prints 6).**

```java
static int sumDigits(int n) {
    n = Math.abs(n);
    int sum = 0;
    while (n > 0) {
        sum += n % 10;   // last digit
        n /= 10;         // drop it
    }
    return sum;
}
```

Trace 123: 3 → 12; 2 → 1; 1 → 0; sum = 6. Time O(digits), space O(1).

### Exam trap

- Delta line measurement is **2R/3**, not R or 2R.
- Splices = segments − 1 (24, not 25), unless the question says connectors at both ends.
- Convert µW to dBm before adding losses.

## Past paper set B · logic, C, SQL, networking

### The past questions

1. Design a 4×1 MUX with two select lines and inputs A, B, C, D.
2. Find the smallest and second smallest elements in an array.
3. Salesperson, Customer, Orders: (a) salespeople with an order with Samsonic; (b) without; (c) with 2 or more orders.
4. What is pipelining? Explain the stages.
5. Linux: mkdir, passwd, telnet, cat, ls, ping, su, nslookup.
6. Output of the C program with `str[] = "abpqx\n"`, `N = 7`, `i%2`, `str[i]++` / `str[i]--`.
7. MAC flooding in a switch; prevention.
8. Disadvantages of static IP; dynamic IP protocol; how DHCP works.
9. Query to display even rows of Employees.
10. Distinct records without DISTINCT.
11. Name of the highest-paid employee in each department.
12. Subnet 195.1.1.0 for at least 2 subnets of 48 hosts — two possible masks.
13. (a) 10 dB attenuation of 5 W; (b) three cascaded 4 dB amplifiers; (c) 100,000-bit frame on 5 kbps.
14. 10.2.3.20/22 → hosts and mask.
15. Program: minimum number in a series.
16. Pipeline: fetch and execution cycles.
    17–18. SQL: minimum salary; matching string; branch with minimum balance; dept_name and roll from Student.

### Bangla core

**গল্পে বুঝি:** এই সেটটা "সব বিষয়ের এক চামচ" — logic, C, SQL, Linux, network, pipeline। প্রতিটার একটা নির্দিষ্ট ছাঁচ আছে, ছাঁচ মুখস্থ থাকলে দ্রুত লেখা যায়।

**ধাপে ধাপে:**

1. **4×1 MUX:** দুই select line S1 S0 দিয়ে চারটা input-এর একটা বাছাই: 00 → A, 01 → B, 10 → C, 11 → D। Y = S1′S0′A + S1′S0B + S1S0′C + S1S0D।
2. **সবচেয়ে ছোট দুইটা:** দুইটা variable (first, second) সবচেয়ে বড় মান দিয়ে শুরু; নতুন সংখ্যা first-এর চেয়ে ছোট হলে আগের first → second; নইলে second-এর চেয়ে ছোট হলে second আপডেট।
3. **SQL Samsonic:** তিন টেবিল join করে customer name = 'Samsonic' ফিল্টার; "নেই" প্রশ্নে NOT IN subquery; "২ বা বেশি" প্রশ্নে GROUP BY + HAVING COUNT(\*) >= 2।
4. **C output:** loop i = 0 থেকে 4 (N−2 = 5 বার)। `str[i]++` আর `str[i]--` আগে মান ছাপে, পরে বদলায় (post)। তাই ছাপা হয় **abpqx**।
5. **MAC flooding:** আক্রমণকারী হাজার হাজার নকল MAC পাঠিয়ে switch-এর টেবিল ভরে ফেলে; switch তখন hub-এর মতো সব port-এ frame ছড়ায় → আক্রমণকারী সব দেখে। প্রতিকার: **port security** (প্রতি port-এ MAC সংখ্যা সীমা)।
6. **DHCP:** DORA — Discover, Offer, Request, Acknowledge।
7. **Subnet 195.1.1.0, 48 host:** 2⁶ − 2 = 62 ≥ 48 → /26 (255.255.255.192, 4 subnet); /25 (255.255.255.128, 2 subnet, 126 host)-ও চলে। দুই উত্তর: **.192 আর .128**।
8. **dB হিসাব:** 10 dB কমা = ১০ ভাগের ১ → 5 W থেকে 0.5 W; 3 × 4 = 12 dB লাভ ≈ 15.85 গুণ; সময় = 100000 / 5000 = 20 s।
9. **/22:** host bit 10 → 1022 host, mask 255.255.252.0।
10. **Pipeline:** k stage, n instruction → (k + n − 1) cycle; pipeline ছাড়া n × k।

**এক লাইনে:** MUX = select দিয়ে বাছাই, C = post-increment আগে ছাপে, SQL = join + filter + group, subnet = 2ⁿ − 2 ≥ দরকার।

### Part · Worked answers

#### Solution

**B1 4×1 MUX.**

| S1  | S0  | Y   |
| --- | --- | --- |
| 0   | 0   | A   |
| 0   | 1   | B   |
| 1   | 0   | C   |
| 1   | 1   | D   |

**Y = S1′S0′A + S1′S0B + S1S0′C + S1S0D.** Circuit: two NOT gates (S1′, S0′), four 3-input AND gates (one per row), one 4-input OR gate.

**B2 Smallest and second smallest (Java, run on {12, 3, 7, 3, 1, 9} → 1 3).**

```java
static int[] twoSmallest(int[] a) {
    int first = Integer.MAX_VALUE, second = Integer.MAX_VALUE;
    for (int x : a) {
        if (x < first) { second = first; first = x; }
        else if (x < second && x != first) second = x;
    }
    return new int[] { first, second };
}
```

One pass: O(n) time, O(1) space. `x != first` skips duplicates of the minimum.

**B3 SQL (tested on sample data).**

```sql
-- (a) salespeople with an order with Samsonic
SELECT DISTINCT s.Name
FROM Salesperson s
JOIN Orders o   ON o.salesperson_id = s.ID
JOIN Customer c ON c.ID = o.cust_id
WHERE c.Name = 'Samsonic';

-- (b) salespeople with no order with Samsonic
SELECT Name FROM Salesperson
WHERE ID NOT IN (
  SELECT o.salesperson_id
  FROM Orders o JOIN Customer c ON c.ID = o.cust_id
  WHERE c.Name = 'Samsonic'
);

-- (c) salespeople with 2 or more orders
SELECT s.Name
FROM Salesperson s JOIN Orders o ON o.salesperson_id = s.ID
GROUP BY s.ID, s.Name
HAVING COUNT(*) >= 2;
```

Trap: if `salesperson_id` can be NULL, `NOT IN` returns no rows; use `NOT EXISTS` in that case.

**B4 Pipelining.** Overlapping the stages of several instructions, like a car-wash line where each car is at a different station. Five classic stages: **IF** (fetch), **ID** (decode, read registers), **EX** (execute/ALU), **MEM** (memory access), **WB** (write back). After the pipeline fills, about one instruction finishes per cycle. Hazards: structural, data (fixed by forwarding/stalls), control (branch prediction).

**B5 Linux commands.**

| Command    | Purpose                                             | Example                    |
| ---------- | --------------------------------------------------- | -------------------------- |
| `mkdir`    | create a directory                                  | `mkdir reports`            |
| `passwd`   | change a password                                   | `passwd`                   |
| `telnet`   | remote terminal or port test (insecure, plain text) | `telnet 10.0.0.1 23`       |
| `cat`      | show or join files                                  | `cat config.txt`           |
| `ls`       | list files                                          | `ls -l`                    |
| `ping`     | test reachability (ICMP echo)                       | `ping 8.8.8.8`             |
| `su`       | switch user                                         | `su - root`                |
| `nslookup` | query DNS                                           | `nslookup teletalk.com.bd` |

(The paper prints "Is"; it is `ls`, lowercase L.)

**B6 C output (compiled and run): `abpqx`.** `N − 2 = 5`, so i = 0…4. Post-increment/decrement prints first, then changes: i = 0 prints a (→ \`), 1 prints b (→ c), 2 prints p (→ o), 3 prints q (→ r), 4 prints x (→ w). Output **abpqx**. (`Char` must be lowercase `char` to compile.)

**B7 MAC flooding.** An attacker sends frames with thousands of fake source MACs, filling the switch's CAM table; the switch then floods every frame to all ports like a hub, so the attacker can sniff traffic. Prevention: **port security** (limit MACs per port, sticky MAC, shutdown on violation), 802.1X authentication, VLAN segmentation, DHCP snooping, and disabling unused ports.

**B8 Static IP and DHCP.** Static IP disadvantages: manual work on every device, typing errors, duplicate IP conflicts, hard to change at scale, wasted addresses. Dynamic protocol: **DHCP**. How it works — **DORA**: Discover (client broadcasts), Offer (server proposes an IP), Request (client asks for it), Acknowledge (server confirms with lease time, mask, gateway, DNS). Ports UDP 67 (server) / 68 (client).

**B9 Even rows.**

```sql
SELECT * FROM (
  SELECT e.*, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM Employee e
) t
WHERE rn % 2 = 0;
```

(Oracle shortcut: `WHERE MOD(ROWNUM, 2) = 0` inside a subquery.)

**B10 Distinct without DISTINCT.** `SELECT name, dept, salary FROM Employee GROUP BY name, dept, salary;` (also `UNION` of the table with itself removes duplicates).

**B11 Highest salary per department.**

```sql
SELECT e.name, e.dept, e.salary
FROM Employee e
WHERE e.salary = (SELECT MAX(x.salary) FROM Employee x WHERE x.dept = e.dept);
```

Returns ties too (two employees with the same top salary both appear).

**B12 195.1.1.0, ≥ 2 subnets of 48 hosts.** Class C default /24. Hosts 48 → need 6 host bits (2⁶ − 2 = 62).

- **255.255.255.192 (/26):** 4 subnets × 62 hosts.
- **255.255.255.128 (/25):** 2 subnets × 126 hosts.
  Both satisfy "at least 2 subnets, 48 hosts each". /27 fails (30 hosts).

**B13 dB.**

- (a) −10 dB = power ÷ 10 → 5 W → **0.5 W**.
- (b) 3 × 4 dB = **12 dB** gain = 10^1.2 ≈ **15.85 times** the input power.
- (c) Transmission time = 100,000 bits ÷ 5,000 bps = **20 s**.

**B14 10.2.3.20/22.** Mask **255.255.252.0**; host bits 10 → **1022 hosts**; network 10.2.0.0, broadcast 10.2.3.255.

**B15 Minimum of a series (Java, run on {8, 4, −2, 10, 5} → −2).**

```java
static int min(int[] a) {
    int m = a[0];
    for (int x : a) if (x < m) m = x;
    return m;
}
```

**B16 Pipeline cycles.** With k stages and n instructions: pipelined = **k + n − 1** cycles; non-pipelined = **n × k**. Example k = 5, n = 10: 14 vs 50 cycles, speedup = 50/14 ≈ 3.57 (approaches k as n grows).

**B17–18 SQL.**

```sql
SELECT MIN(salary) FROM Employee;                       -- minimum salary
SELECT * FROM Employee WHERE name LIKE '%an%';         -- matching string
SELECT branch_name FROM Account
WHERE balance = (SELECT MIN(balance) FROM Account);    -- branch with minimum balance
SELECT dept_name, roll FROM Student;                   -- dept_name and roll
```

### Mindmap

```mindmap
Past written questions
  **Electronics**
    Zener: Thevenin first, Vo = Vin/2
    Δ line R = 2R/3
    op-amp KCL: −10
  **Fiber & dB**
    loss = km × dB/km + joints
    joints = segments − 1
    10 µW = −20 dBm
    −10 dB = ÷10
  **Networking**
    SMTP, DHCP, ARP, ICMP
    /23 → 510, /22 → 1022
    48 hosts → /26 or /25
    MAC flood → port security
  **Logic & arch**
    4×1 MUX equation
    pipeline k + n − 1
    IF ID EX MEM WB
  **Code**
    sum digits % 10
    two smallest in one pass
    post ++ prints first
  **SQL**
    join + WHERE name
    NOT IN / NOT EXISTS
    HAVING COUNT >= 2
    ROW_NUMBER for even rows
```

### Exam trap

- C output: post-increment prints the **old** value.
- `NOT IN` with a NULL in the subquery returns nothing.
- "At least 2 subnets with 48 hosts" has **two** correct masks — give both.
- 12 dB is not 12 times; it is about **15.85 times**.

### Recall check

1. Δ winding: line-to-line resistance 4 Ω — what is the phase resistance?
2. 30 km fiber at 0.25 dB/km with a splice every 3 km at 0.4 dB: total loss?
3. What does `printf("%c", s[i]++)` print when s[i] = 'm'?
4. Two masks for 200.10.5.0 needing at least 2 subnets of 60 hosts?

#### Solution

1. 2R/3 = 4 → R = **6 Ω**.
2. 30 × 0.25 = 7.5 dB; joints 30/3 − 1 = 9 × 0.4 = 3.6 dB; total **11.1 dB**.
3. **m** (then s[i] becomes 'n').
4. 60 hosts → 6 host bits → **255.255.255.192** (/26) or **255.255.255.128** (/25).

# Last-day sheet

## Last-day revision sheet · one screen

### Mindmap

```mindmap
Telecom exam in one screen
  **Radio**
    λ = c/f, low f reaches
    QAM bits = log2 M
    OFDMA DL, SC-FDMA UL (LTE)
    MIMO, beamforming
  **Cellular**
    N = i² + ij + j² (7)
    hard vs soft handover
    Erlang = calls × hours
  **Core evolution**
    2G: BTS-BSC-MSC, HLR/VLR
    4G: eNB, MME, S-GW, P-GW, HSS
    5G: gNB, AMF, SMF, UPF, UDM
    NSA vs SA
  **Voice & control**
    IMS: P/I/S-CSCF, HSS, TAS
    SIP signals, RTP carries
    CSFB vs SRVCC
  **New tech**
    NFV: NFVI, VNF, MANO
    C-RAN pool, O-RAN open + RIC
    slicing: eMBB, URLLC, mMTC
  **Ops & BD**
    −48 V DC, Ah = A × h
    Python KPIs: CSSR, CDR
    BTRC, GRBT, MCC 470
```

### Recall check

1. Draw the LTE EPC and name the interface between MME and HSS.
2. Which 5G function replaces the S-GW/P-GW user plane?
3. Name the three CSCFs and the job of each.
4. What does the UE send back during AKA, and what is it compared with?
5. List the three MANO blocks.
6. Give the SST value and one use case for each slice type.
7. A site draws 25 A at 48 V for 8 hours of backup — load power and battery Ah?
8. How is C-RAN different from O-RAN?

#### Solution

1. UE – eNodeB – (S1-MME) MME, (S1-U) S-GW – (S5) P-GW – (SGi) internet; MME–S-GW via S11; MME–HSS = **S6a** (Diameter); PCRF via Gx.
2. **UPF.**
3. **P-CSCF** — first contact, security, QoS request; **I-CSCF** — entry point, finds the S-CSCF via HSS; **S-CSCF** — registration, authentication, session routing, triggers application servers.
4. The UE sends **RES**; the network compares it with **XRES**.
5. **NFVO, VNFM, VIM.**
6. SST 1 eMBB (4K video), SST 2 URLLC (remote surgery), SST 3 mMTC/MIoT (smart meters).
7. 48 × 25 = **1,200 W**; 25 × 8 = **200 Ah** (≈ 250 Ah at 80% DoD).
8. C-RAN centralises baseband (where it runs); O-RAN opens the interfaces between RU, DU and CU for multi-vendor parts and adds the RIC (how open it is).
