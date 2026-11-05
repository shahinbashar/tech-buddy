# Object-Oriented Programming

One page for OOP: concepts for MCQ, model answers for written papers, and tested code. **All examples are in Java**; C++ appears only where the exam asks a C++-only rule (destructor, `virtual`, friend, operator overloading), marked **C++ only**. Read it top to bottom once, then use the **MCQ rapid-fire** and **Written answers** parts for revision.

**How to use this page**

1. Day 1: Parts 1–4 (basics, four pillars, constructors, inheritance).
2. Day 2: Parts 5–7 (polymorphism, abstract class vs interface, relationships, UML).
3. Day 3: Part 8 (MCQ rapid-fire) + Part 9 (output traps) + write two model answers from Part 10 on paper.

## Past questions on OOP

| Paper                          | Question                                                             | Part here                                   |
| ------------------------------ | -------------------------------------------------------------------- | ------------------------------------------- |
| BB AP 2016 (P2 Q3)             | Polymorphism; method overriding vs overloading                       | [Part 5](#oop.part-5-polymorphism)          |
| BB AP 2023 (P4 Q5)             | Java: class B extends A — which methods overload, override or hide   | [Part 5](#oop.part-5-polymorphism)          |
| BB AP 2023 (P4 Q7)             | Class diagram: token-ring LAN                                        | [Part 7](#oop.part-7-relationships-and-uml) |
| Combined SO-IT 2023 (P9 Q9)    | Platform-independent software with examples                          | [Part 8](#oop.part-8-mcq-rapid-fire)        |
| Sonali & Janata 2023 (P10 Q11) | Advantages of OOP over structured programming                        | [Part 1](#oop.part-1-what-oop-is)           |
| Combined AP 2024 (P13 Q4)      | Types of polymorphism with example                                   | [Part 5](#oop.part-5-polymorphism)          |
| Combined AP 2024 (P13 Q5)      | Multithreading; why use it                                           | [Part 8](#oop.part-8-mcq-rapid-fire)        |
| Sonali & Janata 2024 (P17 Q4)  | Advantages of encapsulation and inheritance                          | [Part 10](#oop.part-10-written-answers)     |
| Sonali & Janata 2024 (P17 Q8)  | Use-case diagram: online shopping                                    | [Part 7](#oop.part-7-relationships-and-uml) |
| Sonali & Janata 2024 (P17 Q9)  | C++ Circle class: translate, perimeter, area; data flow of translate | [Part 10](#oop.part-10-written-answers)     |

**Pattern:** polymorphism appears 3 times, overloading vs overriding twice, and "advantages of OOP / pillars" twice. One OOP question is in almost every Programmer and Officer (IT) paper, usually 10–15 marks.

### Mindmap

```mindmap
OOP
  **Basics**
    class = blueprint, object = instance
    OOP vs structured
    message passing
  **Four pillars (A PIE)**
    Abstraction: hide complexity
    Polymorphism: one name, many forms
    Inheritance: is-a, reuse
    Encapsulation: hide data
  **Building blocks**
    constructor, destructor
    this, static, friend
    access: private, protected, public
  **Polymorphism**
    compile time: overloading, templates
    run time: overriding, virtual
    abstract class vs interface
  **Relationships**
    is-a: inheritance
    has-a: aggregation, composition
    uses-a: association, dependency
  **Exam extras**
    UML class and use-case diagrams
    C++ vs Java rules
    output tracing
```

## Part 1: What OOP is

### Bangla core

**গল্পে বুঝি:** এক বিল্ডারের কাছে একটা ফ্ল্যাটের নকশা (blueprint)। সেই এক নকশা দিয়ে তিনি ৫০টা আসল ফ্ল্যাট বানান। নকশা = class, প্রতিটি ফ্ল্যাট = object। প্রতিটি ফ্ল্যাটের নিজের আসবাব (data), কিন্তু সুইচ আর কল একই রকম (method)। দেয়ালের ভেতরের তার না জেনেও আপনি সুইচ টেপেন — নকশা একবার, বানাও অনেক, ভেতর না জেনেই ব্যবহার করো।

**ধাপে ধাপে:**

1. **OOP:** প্রোগ্রামকে কিছু object হিসেবে লেখা, যার ভেতরে data (attribute) আর সেই data নিয়ে কাজ করা function (method) একসাথে থাকে।
2. **Class:** নিজের বানানো type, একটা নকশা। Object না বানানো পর্যন্ত data-র জন্য memory নেয় না।
3. **Object:** class-এর একটা instance। এর আছে state (attribute-এর মান), behaviour (method) আর identity (নিজস্ব ঠিকানা)।
4. **Message passing:** object-রা একে অন্যের method ডেকে কথা বলে, যেমন `account.withdraw(500)`।
5. **Structured বনাম OOP:** C বা Pascal-এ প্রোগ্রাম function-এ ভাগ হয়, data খোলামেলা ঘোরে, যেকোনো function বদলাতে পারে। OOP-তে প্রোগ্রাম object-এ ভাগ হয়, data নিজের object-এর ভেতরে লুকানো থাকে।
6. **OOP-এর সুবিধা:** data নিরাপদ (encapsulation), পুরনো কোড আবার ব্যবহার (inheritance), এক interface-এ অনেক type (polymorphism), এক class বদলালে বাকিগুলো ভাঙে না, আর বাস্তব জগতের মতো মডেল করা যায় (Customer, Account, Transaction)।

**এক লাইনে:** class নকশা, object আসল জিনিস; data আর method এক ঘরে।

### Picture it

A builder has one **blueprint** (plan) for a flat. From that one plan he builds 50 real flats. The blueprint is the **class**; each real flat is an **object**. Every flat has its own furniture (data) but the same switches and taps (methods). You use a switch without knowing the wiring behind the wall. That is OOP in one picture: plan once, build many, use without knowing the inside.

### Understand it step by step

1. **Object-oriented programming (OOP)** is a way of writing programs as a set of **objects** that contain both **data** (attributes) and **functions** (methods) that work on that data.
2. **Class:** a user-defined type, a blueprint. It takes no memory for data until an object is made.
3. **Object:** an instance of a class. It has **state** (values of attributes), **behaviour** (methods) and **identity** (its own address).
4. **Message passing:** objects talk by calling each other's methods, e.g. `account.withdraw(500)`.
5. **Structured (procedural) programming** (C, Pascal) splits a program into **functions**; data moves freely between them. OOP splits a program into **objects**; data stays inside its object.

| Point                | Structured / procedural             | Object-oriented                |
| -------------------- | ----------------------------------- | ------------------------------ |
| Unit of program      | Function                            | Object (class)                 |
| Approach             | Top-down                            | Bottom-up                      |
| Data                 | Global, shared, moves freely        | Hidden inside objects          |
| Security             | Low (any function can change data)  | High (access modifiers)        |
| Reuse                | Copy functions                      | Inheritance, composition       |
| Change               | One change can break many functions | Change stays inside one class  |
| Real-world modelling | Weak                                | Strong (objects = real things) |
| Overloading          | Not supported (C)                   | Supported                      |
| Examples             | C, Pascal, Fortran                  | C++, Java, C#, Python, Dart    |

### Exam answer: Advantages of OOP over structured programming (10 marks)

**Definition.** Structured programming divides a program into functions that operate on shared data. Object-oriented programming divides a program into objects, each combining data and the methods that operate on that data.

**Advantages of OOP:**

1. **Data security (encapsulation):** data is private to an object and can be changed only through its methods, so other parts of the program cannot corrupt it.
2. **Reusability (inheritance):** a new class can reuse an existing class, e.g. `SavingsAccount` reuses `Account`. This reduces code and testing time.
3. **Flexibility (polymorphism):** one interface works with many types, e.g. `shape.area()` works for circles and rectangles; new types can be added without changing old code.
4. **Easy maintenance:** a change inside one class does not affect other classes, as long as its public interface stays the same.
5. **Real-world modelling:** a bank system maps naturally to objects such as Customer, Account and Transaction, which makes design easier to understand.
6. **Abstraction:** users of a class see only what it does, not how, which reduces complexity in large systems.
7. **Team development and scalability:** classes can be built and tested by different developers in parallel.
8. **Fewer bugs:** data hiding and well-defined interfaces reduce side effects.

| Basis         | Structured | OOP                |
| ------------- | ---------- | ------------------ |
| Focus         | Procedure  | Data               |
| Data security | Low        | High               |
| Reuse         | Low        | High (inheritance) |
| Approach      | Top-down   | Bottom-up          |

**Example.** In a banking system written in C, the balance may be a global variable that any function can change. In C++ or Java, `balance` is a private member of `Account`, changed only through `deposit()` and `withdraw()`, which check the rules.

**Conclusion.** OOP gives security, reuse and easier maintenance, which is why large systems such as core banking software are built with object-oriented languages.

## Part 2: The four pillars

### Bangla core

**গল্পে বুঝি:** একটা গাড়ি ভাবো। ইঞ্জিন বনেটের ভেতরে বন্ধ, গতি বদলাও শুধু প্যাডেল দিয়ে — encapsulation। ড্যাশবোর্ড শুধু গতি আর তেল দেখায়, ভেতরের হাজারো যন্ত্রাংশ লুকায় — abstraction। ElectricCar একটা Car; চাকা-ব্রেক Car থেকে পায়, শুধু ব্যাটারি যোগ করে — inheritance। একই "start" বোতাম পেট্রোল গাড়ি তেলে, ইলেকট্রিক গাড়ি ব্যাটারিতে চালু করে — polymorphism।

**ধাপে ধাপে:**

1. **Encapsulation:** data আর method এক class-এ বেঁধে data-তে সরাসরি হাত দেওয়া বন্ধ করা। `private` field আর `public` getter/setter দিয়ে হয়। যেমন `balance` private, শুধু `deposit()` দিয়ে বদলায়, আর `deposit()` ঋণাত্মক টাকা নেয় না।
2. **Abstraction:** object কী করে তা দেখানো, কীভাবে করে তা লুকানো। abstract class আর interface দিয়ে হয়। যেমন ATM-এ "withdraw" চাপেন, ব্যাংকের server-এর কোড দেখেন না।
3. **Inheritance:** নতুন class (child / subclass) পুরনো class-এর (parent / superclass) গুণ পায়। সম্পর্কটা is-a — Car is a Vehicle। এতে কোড আবার ব্যবহার হয়, আর run-time polymorphism-এর ভিত্তি তৈরি হয়।
4. **Polymorphism:** "অনেক রূপ" — এক নাম বা interface ভিন্ন type-এ ভিন্ন আচরণ করে। Compile time-এ overloading, run time-এ overriding (Part 5)।
5. **Encapsulation বনাম Abstraction:** প্রথমটা data লুকায় (implementation স্তরে, access modifier দিয়ে); দ্বিতীয়টা জটিলতা লুকায় (design স্তরে, abstract class বা interface দিয়ে)।

**এক লাইনে:** A PIE — Abstraction, Polymorphism, Inheritance, Encapsulation; প্রশ্নে "private" বা "data hiding" দেখলে উত্তর encapsulation।

### Picture it

Think of a **car**:

- **Encapsulation:** the engine is sealed inside the bonnet; you change speed only with the pedal (a method), not by touching the fuel line (data).
- **Abstraction:** the dashboard shows speed and fuel; it hides the 2,000 parts that make it work.
- **Inheritance:** an _ElectricCar_ is a _Car_; it gets wheels, brakes and doors from Car, and adds a battery.
- **Polymorphism:** the same "start" button starts a petrol car with fuel and an electric car with a battery — one action, different behaviour.

### Understand it step by step

**1. Encapsulation**

- Bundles data and methods into one unit (class) and **restricts direct access** to the data.
- Done with `private` fields and `public` getters and setters.
- Also called **data hiding** (strictly, data hiding is the result; encapsulation is the bundling).

```java
class Account {
    private double balance = 0;                                  // hidden
    public void deposit(double amt) { if (amt > 0) balance += amt; }   // rule enforced
    public double getBalance() { return balance; }
}
// account.deposit(1000); account.deposit(-50);  → balance stays 1000.0
// account.balance = 5;   → compile error: balance has private access
```

**2. Abstraction**

- Shows **what** an object does and hides **how** it does it.
- Done with **abstract classes** and **interfaces** (and, at a lower level, with any well-named public method).

**3. Inheritance**

- A new class (**derived / child / subclass**) acquires the properties of an existing class (**base / parent / superclass**).
- Relationship: **is-a** (a Car _is a_ Vehicle).
- Gives reuse and is the base for run-time polymorphism.

**4. Polymorphism**

- "Many forms": one name or interface behaves differently for different types.
- Compile time: overloading. Run time: overriding with virtual functions. Details in Part 5.

| Encapsulation                          | Abstraction                                |
| -------------------------------------- | ------------------------------------------ |
| Hides **data**                         | Hides **complexity / implementation**      |
| How: access modifiers, getters/setters | How: abstract classes, interfaces          |
| Implementation level                   | Design level                               |
| Protects data from outside change      | Reduces what the user must know            |
| Example: private `balance`             | Example: `ATM` interface with `withdraw()` |

### Remember it

- **"A PIE"**: Abstraction, Polymorphism, Inheritance, Encapsulation.
- Encapsulation = **capsule**: medicine (data) inside a cover (class).
- Abstraction = **ATM screen**: you press "withdraw"; you never see the bank's server code.

### Exam trap

- "Data hiding", "access modifier", "private" → **encapsulation**, not abstraction. (Your diagnostic miss on 2 Oct.)
- "What, not how", "interface", "abstract class" → **abstraction**.
- Some MCQs list only three pillars (encapsulation, inheritance, polymorphism) — then abstraction is treated as part of encapsulation. Pick from the options given.

## Part 3: Building blocks

### Bangla core

**গল্পে বুঝি:** নতুন ব্যাংক হিসাব খোলার মুহূর্তেই হিসাব নম্বর আর শুরুর ব্যালান্স বসে যায় — এটা constructor। হিসাব বন্ধের সময় সব গুছিয়ে ফেরত দেওয়া — destructor (শুধু C++)। শাখার সব কর্মী একটাই নোটিশ বোর্ড দেখেন, প্রত্যেকের আলাদা নয় — এটা static member।

**ধাপে ধাপে:**

1. **Constructor:** object তৈরির সময় নিজে থেকেই চলে, object-কে প্রথম মান দেয়। নাম class-এর নামে, কোনো return type নেই (void-ও না)।
2. **ধরন:** default (argument নেই), parameterized (মান নেয়), copy (একই class-এর আরেকটা object নেয়)। Overload করা যায়, কিন্তু inherit হয় না।
3. **নিজে কোনো constructor না লিখলে** compiler একটা default দেয়; যেকোনো একটা লিখলে আর দেয় না — তখন argument ছাড়া object বানাতে গেলে error হয়।
4. **ক্রম:** আগে parent-এর constructor, পরে child-এর। Java নিজে থেকেই `super();` বসায়। (C++-এ destructor উল্টো ক্রমে চলে: child → parent।)
5. **Destructor (শুধু C++):** `~ClassName()`, argument নেই, overload হয় না। Java-তে destructor নেই; garbage collector memory খালি করে।
6. **Shallow বনাম deep copy:** shallow-এ শুধু reference কপি হয়, দুই variable একই object দেখে — একটা বদলালে অন্যটাও বদলায়। Deep-এ ভেতরের object-সহ নতুন কপি হয়, দুটো স্বাধীন।
7. **this:** বর্তমান object-কে বোঝায় — `this.x = x;`। static method-এ this থাকে না।
8. **Static:** পুরো class-এর একটাই কপি, সব object শেয়ার করে। তিনটা Counter object বানালে `Counter.count` = 3।
9. **Access modifier (Java):** সবচেয়ে কড়া থেকে খোলা — private → default → protected → public।

**এক লাইনে:** constructor-এর return type নেই, আগে parent চলে; static মানে পুরো class-এর একটা কপি।

### Understand it step by step

**Constructor**

1. A special method that **initializes** an object; called automatically when the object is created.
2. Same name as the class, **no return type** (not even `void`).
3. Types: **default** (no arguments), **parameterized** (takes values), **copy** (takes another object of the same class). Java has no built-in copy constructor; you write one, as below, or use `clone()`.
4. Can be **overloaded**. In Java it cannot be `static`, `final`, `abstract` or `synchronized`, and it is not inherited. (C++ only: a constructor cannot be `virtual`.)
5. One constructor can call another of the same class with `this(...)`, or the parent's with `super(...)`; either must be the **first line**.
6. If you write no constructor, the compiler supplies a default one. If you write any constructor, it no longer does.

**Destructor (C++ only; Java has none)**

- `~ClassName()`, no arguments, no return type, **cannot be overloaded**, one per class.
- Releases resources (memory, files). Called automatically when the object goes out of scope or on `delete`.
- Make it **virtual in a base class**, so `delete basePtr` calls the derived destructor too.
- Java has **no destructor**; the **garbage collector** frees memory (`finalize()` is deprecated).

**Order of constructor calls (tested):** the parent's constructor always runs **first**, then the child's. Java adds `super();` automatically if you do not write it.

```java
class Base {
    Base() { System.out.println("Base constructor"); }
}
class Derived extends Base {
    Derived() {
        super();                          // runs first (added automatically if you omit it)
        System.out.println("Derived constructor");
    }
}
// new Derived();  → Base constructor, Derived constructor
```

C++ only (MCQ): destructors run in the **reverse** order, derived → base.

**Shallow vs deep copy**

| Shallow copy                            | Deep copy                                     |
| --------------------------------------- | --------------------------------------------- |
| Copies the reference only               | Copies the object (and objects inside it)     |
| Both variables point to one object      | Each has its own object                       |
| `b = a;` or default `clone()` does this | You write a copy constructor / deep `clone()` |
| Risk: changing one changes the other    | Safe, independent                             |

```java
class Student {
    String name;
    int[] marks;
    Student(String name, int[] marks) { this.name = name; this.marks = marks; }
    Student(Student o) {                  // copy constructor (deep copy)
        this.name = o.name;               // String is immutable, safe to share
        this.marks = o.marks.clone();     // new array, not the same one
    }
}
// Student a = new Student("Shahin", new int[]{80, 90});
// Student shallow = a;  shallow.marks[0] = 10;  → a.marks[0] is 10 (same object)
// Student deep = new Student(a);  deep.marks[1] = 0;  → a.marks[1] is still 90  (tested)
```

C++ only (MCQ): the copy constructor must take its argument **by reference** (`const X &o`); by value it would call itself forever.

**`this` pointer / reference**

- Refers to the current object. Used when a parameter has the same name as a field: `this.x = x;` (C++ writes `this->x = x;`).
- **Not available in static methods** (they have no object).

**Static members**

- Belong to the **class**, not to an object; one copy shared by all objects.
- Static methods can use only static data and are called on the class: `ClassName.method()`. `main` is static, so Java can run it without creating an object.
- C++ only (MCQ): a static data member must be defined outside the class, `int Counter::count = 0;`

```java
class Counter {
    static int count = 0;                 // one copy for the whole class
    Counter() { count++; }
}
// new Counter(); new Counter(); new Counter();
// System.out.println(Counter.count);  → 3  (tested)
```

**Access modifiers**

| Modifier        | Same class | Derived class     | Same package (Java) | Anywhere |
| --------------- | ---------- | ----------------- | ------------------- | -------- |
| private         | Yes        | No                | No                  | No       |
| (default, Java) | Yes        | Same package only | Yes                 | No       |
| protected       | Yes        | Yes               | Yes (Java)          | No       |
| public          | Yes        | Yes               | Yes                 | Yes      |

- C++ `class` members are **private** by default; C++ `struct` members are **public** by default.
- Java default (no keyword) = **package-private**.
- Java order from most to least restrictive: **private → default → protected → public**.

**Friend function (C++ only; Java has none)**

- A non-member function given access to private members: `friend void show(Box b);`
- Friendship is **not inherited, not mutual, not transitive**.
- It weakens encapsulation; use only when needed (e.g. operator `<<`).

**Other keywords**

- `final` (Java): final variable = constant; final method = cannot be overridden; final class = cannot be extended (e.g. `String`).
- `super` (Java): calls the parent's constructor or method; `super()` must be the **first statement** in a constructor.
- `inline` (C++ only): asks the compiler to paste the function body at the call; functions defined inside a class are inline by default.
- `const` member function (C++ only): `double area() const` promises not to change the object. Java's nearest idea is a `final` field.

### Exam trap

- "A constructor returns void" — **false**; it has no return type at all.
- "A destructor can be overloaded" — **false**.
- "Constructors can be virtual in C++" — **false**; destructors can (and should, in base classes).
- Writing a parameterized constructor removes the free default constructor, so `Box b;` then fails to compile.

## Part 4: Inheritance

### Bangla core

**গল্পে বুঝি:** একটা পরিবার-গাছ। ছেলে বাবার কাছ থেকে বাড়ি আর পদবি পায় — single। নাতি পায় ছেলের কাছ থেকে, ছেলে পেয়েছিল দাদার কাছ থেকে — multilevel। বাবা আর মা দুজনের সম্পত্তি পায় — multiple। এক বাবার তিন সন্তান — hierarchical। এগুলো মেশালে — hybrid।

**ধাপে ধাপে:**

1. **Inheritance:** নতুন class পুরনো class-এর গুণ পায়; সম্পর্কটা is-a (Savings is an Account)।
2. **পাঁচ ধরন:** Single (A → B), Multilevel (A → B → C), Hierarchical (A → B, A → C), Multiple (A, B → C), Hybrid (মিশ্রণ, প্রায়ই diamond আকৃতি)।
3. **Java-তে class দিয়ে multiple inheritance নেই** — একটা class শুধু একটাকে extend করতে পারে, কিন্তু অনেক interface implement করতে পারে।
4. **Diamond সমস্যা:** B আর C দুটোই A থেকে আসে, D আসে B আর C থেকে — তাহলে D-তে A-এর দুই কপি, `d.v` কোনটা বোঝা যায় না। C++-এ সমাধান virtual inheritance (একটাই A থাকে)।
5. **Java-র সমাধান:** দুই interface একই default method দিলে class-কে সেটা override করতেই হবে, আর `Printer.super.start()` দিয়ে যেকোনোটা বেছে নেওয়া যায়।
6. **যা inherit হয় না:** constructor, destructor, friend function; Java-তে private member child class-এ ব্যবহার করা যায় না।
7. **সুবিধা ও অসুবিধা:** কোড আবার ব্যবহার, polymorphism-এর ভিত্তি; কিন্তু parent বদলালে child ভাঙতে পারে। has-a সম্পর্ক হলে inheritance নয়, composition নাও।

**এক লাইনে:** এক বাবা, অনেক শিক্ষক — একটা class extend, অনেক interface implement।

### Picture it

A family tree. A child inherits the house and surname from the father (**single**). The grandchild inherits from the child, who inherited from the grandfather (**multilevel**). A child with both a mother's and a father's property inherits from two parents (**multiple**). Three children share one father (**hierarchical**). Mix any of these and you get **hybrid**.

### Understand it step by step

| Type         | Shape                | Example                      | C++ | Java (classes)               |
| ------------ | -------------------- | ---------------------------- | --- | ---------------------------- |
| Single       | A → B                | Account → Savings            | Yes | Yes                          |
| Multilevel   | A → B → C            | Person → Employee → Manager  | Yes | Yes                          |
| Hierarchical | A → B, A → C         | Shape → Circle, Shape → Rect | Yes | Yes                          |
| Multiple     | A, B → C             | Printer, Scanner → Copier    | Yes | **No** (only via interfaces) |
| Hybrid       | Mix, often a diamond | A → B, A → C, B + C → D      | Yes | Only via interfaces          |

**Diamond problem**

1. B and C both inherit A; D inherits B and C.
2. D now has **two copies** of A's members → `d.v` is ambiguous.
3. **C++ fix:** virtual inheritance — `class B : virtual public A`, `class C : virtual public A`. D then has one shared A (tested: `d.v` prints 10).
4. **Java's fix:** a class cannot extend two classes. It can implement many interfaces; if two interfaces give the same default method, the class **must override it** and can pick either with `Interface.super.method()`.

```java
interface Printer { default String start() { return "Printer start"; } }
interface Scanner { default String start() { return "Scanner start"; } }
class Copier implements Printer, Scanner {
    @Override
    public String start() {               // must override: both give start()
        return Printer.super.start() + " + " + Scanner.super.start();
    }
}
// new Copier().start()  → "Printer start + Scanner start"  (tested)
```

**Inheritance modes (C++ only)** (what happens to the base's public and protected members):

| Base member | `public` inheritance | `protected` inheritance | `private` inheritance |
| ----------- | -------------------- | ----------------------- | --------------------- |
| public      | public               | protected               | private               |
| protected   | protected            | protected               | private               |
| private     | not accessible       | not accessible          | not accessible        |

- Default mode: `class` → **private**; `struct` → **public**.
- Private members are inherited (they take memory) but are **not accessible** in the derived class.

**What is not inherited:** constructors, destructors, friend functions, and (C++) the assignment operator. Java: constructors and private members are not inherited.

**Advantages:** code reuse, extensibility, less testing, supports polymorphism, models is-a relationships.
**Disadvantages:** tight coupling between parent and child; a change in the parent can break children; deep hierarchies are hard to follow. Rule of thumb: **prefer composition over inheritance** when the relationship is has-a.

### Remember it

- **"SMHMH"**: Single, Multilevel, Hierarchical, Multiple, Hybrid — "**S**ome **M**en **H**ave **M**any **H**ouses."
- Java: "**One father, many teachers**" — extend one class, implement many interfaces.

### Exam trap

- "Java supports multiple inheritance" — false for classes, true for interfaces. Read the option carefully.
- Multilevel (A→B→C) is **not** multiple (A, B→C).

## Part 5: Polymorphism

### Bangla core

**গল্পে বুঝি:** "চলা" শব্দটা ভাবো — মানুষ পায়ে চলে, গাড়ি তেলে চলে, প্রোগ্রাম CPU-তে চলে। একই শব্দ, কে করছে তার ওপর কাজ বদলায়। আবার ক্যালকুলেটরের "যোগ" 2 + 3-এও চলে, 2.5 + 3.5-এও — একই নাম, input-এর type দেখে ঠিক হয়।

**ধাপে ধাপে:**

1. **Polymorphism:** এক নাম, অনেক রূপ — একই function বা operator ভিন্ন type বা object-এ ভিন্ন আচরণ করে।
2. **Compile-time (static / early binding):** function overloading, operator overloading, template / generics। Argument-এর type দেখে compiler আগেই ঠিক করে। Inheritance লাগে না।
3. **Run-time (dynamic / late binding):** method overriding। আসল object কোনটা, তা দেখে run time-এ ঠিক হয়। Inheritance লাগে।
4. **Overloading:** একই নাম, parameter আলাদা (সংখ্যা, type বা ক্রম)। শুধু return type আলাদা হলে overloading হয় না — compile error।
5. **Overriding:** child class-এ একই signature-এ নতুন কাজ। Access আরও কড়া করা যায় না (public → public); `@Override` দিলে compiler পরীক্ষা করে।
6. **Static method override হয় না, hide হয়:** `A ref = new B();` হলে `ref.greet()` চালায় B-এরটা (object দেখে), কিন্তু `ref.info()` চালায় A-এরটা (reference দেখে)।
7. **Java-তে** non-static, non-final, non-private সব method নিজে থেকেই virtual; `virtual` keyword নেই। (C++-এ `virtual` না লিখলে base pointer base-এর function-ই ডাকে।)
8. **Abstract method:** body নেই; এমন method থাকলে class-ও abstract, তার object বানানো যায় না। Java-তে operator overloading নেই, শুধু String-এ `+` চলে।
9. **Inheritance কীভাবে run-time polymorphism-কে সম্ভব করে:** (ক) Child is-a Parent, তাই একটা parent reference-এ যেকোনো child object রাখা যায় (upcasting); (খ) parent-এর method signature child পায়, তাই caller শুধু parent type জেনেই `p.fee()` ডাকতে পারে; (গ) প্রতিটি child নিজের মতো override করে, আর run time-এ আসল object দেখে ঠিক version চলে। ফল: নতুন child যোগ করলেও পুরনো caller code বদলাতে হয় না। কিন্তু reference-এর type-ই ঠিক করে কোন method ডাকা যাবে — child-এর আলাদা method ডাকতে downcast লাগে।

**এক লাইনে:** Overloading = parameter আলাদা, compile time; Overriding = একই signature, run time; static হলে hide। Inheritance দেয় common type আর common contract, overriding দেয় আলাদা আচরণ।

### Picture it

The word "**run**": a person runs on legs, a car runs on fuel, a program runs on a CPU. Same word, different action depending on **who** does it. And a calculator's "**add**" works for 2 + 3 and for 2.5 + 3.5 — same name, chosen by the **type of input**.

### Understand it step by step

1. **Polymorphism** means one name, many forms: the same function or operator behaves differently for different data types or objects.
2. Two main types:

|                    | Compile-time (static)                                          | Run-time (dynamic)                                                                       |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Also called        | Early binding, static binding                                  | Late binding, dynamic binding, dynamic method dispatch                                   |
| How                | Function overloading, operator overloading, templates/generics | Method overriding with virtual functions (C++) / any non-static, non-final method (Java) |
| Decided by         | Compiler, from argument types                                  | At run time, from the **actual object** type                                             |
| Speed              | Faster                                                         | Slightly slower (vtable lookup)                                                          |
| Inheritance needed | No                                                             | Yes                                                                                      |

3. A textbook four-way split (some MCQs use it): **ad hoc** (overloading), **parametric** (templates/generics), **subtype / inclusion** (overriding), **coercion** (automatic type conversion, e.g. int → double).

**Overloading vs overriding**

| Point                   | Overloading                                           | Overriding                                  |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------- |
| Meaning                 | Same name, **different parameters**                   | Same name, **same signature** in a subclass |
| Where                   | Same class (or inherited)                             | Parent and child class                      |
| Binding                 | Compile time                                          | Run time                                    |
| Parameters              | Must differ (number, type or order)                   | Must be the same                            |
| Return type             | Can differ, but **return type alone cannot overload** | Same (or covariant subtype)                 |
| Inheritance             | Not needed                                            | Required                                    |
| Static methods          | Can be overloaded                                     | Cannot be overridden (they are **hidden**)  |
| private / final methods | Can be overloaded                                     | Cannot be overridden                        |
| Purpose                 | Convenience, readability                              | Specialise behaviour                        |

**Overriding rules (Java):** same name and parameters; return type same or a subtype (covariant); access **cannot be more restrictive** (public → public); cannot throw new or broader checked exceptions; use `@Override` to let the compiler check.

**Method hiding (Java):** a static method in the child with the same signature as a static method in the parent **hides** it. The call is chosen by the **reference type**, not the object.

```java
class A {
    public void show(int x)    { System.out.println("A.show(int)"); }
    public void greet()        { System.out.println("A.greet"); }
    public static void info()  { System.out.println("A.info"); }
}
class B extends A {
    public void show(double x) { System.out.println("B.show(double)"); } // OVERLOAD
    @Override
    public void greet()        { System.out.println("B.greet"); }        // OVERRIDE
    public static void info()  { System.out.println("B.info"); }        // HIDE
}
// A ref = new B();
// ref.greet();   → B.greet          (object type decides)
// ref.info();    → A.info           (reference type decides)
// ref.show(5);   → A.show(int)
// new B().show(5.0); → B.show(double)   (all tested)
```

Compile errors to know: an instance method cannot override a static method, and a static method cannot hide an instance method.

**Dynamic method dispatch (run-time polymorphism in Java)**

1. A parent reference can hold a child object: `Base p = new Derived();` (upcasting).
2. For an **instance method**, Java looks at the **actual object** at run time → the child's version runs.
3. For a **static method**, Java looks at the **reference type** at compile time → the parent's version runs.
4. In Java every non-static, non-final, non-private method is **virtual by default**; there is no `virtual` keyword.

```java
class Base {
    void show()        { System.out.println("Base show"); }
    static void info() { System.out.println("Base info"); }
}
class Derived extends Base {
    @Override
    void show()        { System.out.println("Derived show"); }
    static void info() { System.out.println("Derived info"); }
}
// Base p = new Derived();
// p.show();  → Derived show   (object decides: run time)
// p.info();  → Base info      (reference decides: compile time)   (tested)
```

**How inheritance supports polymorphism** (run-time polymorphism needs all three of these)

1. **A common type.** `CardPayment`, `MfsPayment` and `NpsbTransfer` each _are a_ `Payment`, so one `Payment` reference (or array) can hold any of them. Without a shared parent, no single type could hold different classes. This is upcasting.
2. **A shared contract.** Children inherit the parent's method signatures (`fee()`, `name()`). The compiler lets you call `p.fee()` on any `Payment` and checks the call against the parent type only.
3. **Own behaviour.** Each child overrides the methods. At run time Java picks the body from the **actual object** (dynamic method dispatch).
4. **Reuse.** `receipt()` is written once in the parent. It calls `name()` and `fee()`, so every child gets a correct receipt without extra code.
5. **Open for extension.** `totalFee(Payment[])` was written before the child classes existed. A new `Payment` subclass works with it without any edit (open/closed principle).

```java
class Payment {
    protected final double amount;
    Payment(double amount) { this.amount = amount; }
    double fee()  { return 0.0; }
    String name() { return "Payment"; }
    final String receipt() { return name() + ": fee " + fee(); }   // written once, in the parent
}
class CardPayment extends Payment {
    CardPayment(double amount) { super(amount); }
    @Override double fee()  { return amount * 0.015; }
    @Override String name() { return "Card"; }
}
class MfsPayment extends Payment {
    MfsPayment(double amount) { super(amount); }
    @Override double fee()  { return amount * 0.0185; }
    @Override String name() { return "MFS"; }
}
class NpsbTransfer extends Payment {
    NpsbTransfer(double amount) { super(amount); }
    @Override double fee()  { return 5.0; }
    @Override String name() { return "NPSB"; }
    void showSwitch() { System.out.println("via NPSB switch"); }   // child-only method
}
// inside any class, e.g. the one that holds main()
static double totalFee(Payment[] list) {          // knows only the parent type
    double sum = 0;
    for (Payment p : list) sum += p.fee();        // each call goes to the child's fee()
    return sum;
}
// Payment[] list = { new CardPayment(1000), new MfsPayment(1000), new NpsbTransfer(1000) };
// for (Payment p : list) System.out.println(p.receipt());
//   → Card: fee 15.0 / MFS: fee 18.5 / NPSB: fee 5.0
// totalFee(list) → 38.5                                        (all tested)
// Payment p = new NpsbTransfer(500);
// p.showSwitch();                       → compile error: cannot find symbol
// if (p instanceof NpsbTransfer n) n.showSwitch();   → via NPSB switch
```

**Limits of this link (exam points)**

- The **reference type** decides which methods you may call. A child-only method needs a downcast, ideally guarded by `instanceof`.
- Only **instance methods** are polymorphic. Fields and static methods follow the reference type: `Parent pf = new Child(); pf.tag` prints the parent's field (tested). `private` and `final` methods cannot be overridden.
- **Compile-time** polymorphism (overloading, generics) needs no inheritance. An **interface** also gives the same run-time effect without class inheritance.

**C++ only (MCQ):** C++ methods are _not_ virtual by default. Without the `virtual` keyword, a base pointer calls the base version even on a derived object; with `virtual`, it calls the derived version. It works through a **vtable** (one per class, a table of function addresses) and a hidden **vptr** (one per object).

**Abstract class and abstract method (Java):** an `abstract` method has no body; a class with one must be declared `abstract` and cannot be instantiated, but you can hold child objects in a parent reference. (C++ name for the same idea: a **pure virtual function**, `virtual double area() = 0;`.)

```java
abstract class Shape {
    abstract double area();               // abstract method
    void describe() { System.out.println("Area = " + area()); }   // concrete method
}
class Rect extends Shape {
    private double w, h;
    Rect(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}
class Circle extends Shape {
    private double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return 3.14 * r * r; }
}
class MathUtil {
    static int add(int a, int b)          { return a + b; }    // overloading
    static double add(double a, double b) { return a + b; }
}
// Shape[] s = { new Rect(2, 3), new Circle(1) };
// for (Shape x : s) x.describe();   → Area = 6.0, Area = 3.14
// MathUtil.add(2, 3) → 5    MathUtil.add(2.5, 3.5) → 6.0   (tested)
```

**Operator overloading**

- **Java does not allow it.** The only built-in case is `+` joining Strings. You write a method instead:

```java
public class Complex {
    private final double re, im;
    Complex(double re, double im) { this.re = re; this.im = im; }
    Complex plus(Complex o) { return new Complex(re + o.re, im + o.im); }   // instead of "+"
    @Override public String toString() { return re + " + " + im + "i"; }
}
// new Complex(1, 2).plus(new Complex(3, 4))  → 4.0 + 6.0i   (tested)
```

- **C++ only (MCQ):** C++ lets you write `Complex operator+(const Complex &o)`. Operators that **cannot** be overloaded: `::`, `.`, `.*`, `?:`, `sizeof`, `typeid`. You cannot invent new operators or change precedence.

**Object slicing (C++ only):** assigning a derived object to a base **object** (not pointer/reference) cuts off the derived part: `Base b = derivedObj;` — no polymorphism then.

### Mindmap

```mindmap
Polymorphism
  **Compile time**
    function overloading
    operator overloading
    templates, generics
    early / static binding
  **Run time**
    overriding
    virtual function, vtable + vptr
    base pointer → derived object
    late / dynamic binding
  **Overloading rules**
    params must differ
    return type alone not enough
  **Overriding rules**
    same signature
    not less visible
    static → hidden, final/private → no
  **Abstract**
    pure virtual = 0
    cannot instantiate
  **Inheritance link**
    common type: parent ref holds child (upcast)
    shared contract: same signatures
    overriding: own body per child
    object decides at run time
    new child, no caller change
```

### Remember it

- **OverLoading = Lots of parameter Lists** (same class, compile time).
- **OverRiding = Re-writing the parent's method** (child class, run time).
- **"Static is Stuck to the reference"** — hidden methods follow the reference type.
- **"Virtual looks at the Object"**, non-virtual looks at the pointer.
- **Inheritance gives T-C-O**: **T**ype (parent reference holds a child), **C**ontract (same signatures), then **O**verriding gives each child its own behaviour.

### Exam trap

- `int f(int)` and `double f(int)` — **not** overloading; compile error (only return type differs).
- In Java every non-static, non-final, non-private method is virtual by default — there is no `virtual` keyword. (C++ only: a missing `virtual` means a base pointer calls the base function.)
- Templates/generics are **compile-time** polymorphism.

## Part 6: Abstract class vs interface

### Bangla core

**গল্পে বুঝি:** Abstract class হলো আধা-তৈরি বাড়ি — দেয়াল উঠে গেছে (কিছু method বানানো), কয়েকটা রুম বাকি (abstract method)। Interface হলো চুক্তিপত্র বা চাকরির বিবরণ — "যে সই করবে, তাকে `deposit()` আর `withdraw()` দিতেই হবে"; কী করতে হবে বলে, কীভাবে করতে হবে বলে না।

**ধাপে ধাপে:**

1. **Abstract class:** abstract আর সাধারণ দুই ধরনের method থাকতে পারে; যেকোনো ধরনের variable থাকে; constructor থাকে।
2. **Interface:** method মূলত abstract (Java 8 থেকে default ও static, Java 9 থেকে private-ও); variable শুধু `public static final`, মানে কনস্ট্যান্ট; constructor নেই।
3. **Extend বনাম implement:** abstract class একটাই extend করা যায়, interface অনেকগুলো implement করা যায়।
4. **কখন কোনটা:** সম্পর্কিত class-গুলো কোড আর state শেয়ার করলে abstract class (is-a)। ভিন্ন ভিন্ন class একটা ক্ষমতা শেয়ার করলে interface (can-do), যেমন `Comparable`, `Runnable`।
5. **দুটোরই object বানানো যায় না।** Java-তে abstract class-এ একটাও abstract method না থাকলেও class-টা abstract হতে পারে।

**এক লাইনে:** আধা-তৈরি বাড়ি বনাম চুক্তিপত্র — একটা extend, অনেক implement।

### Picture it

An **abstract class** is a half-built house: walls are built (some methods implemented), rooms are left to finish (abstract methods). An **interface** is a contract or job description: "anyone who signs must provide `deposit()` and `withdraw()`" — it says what, never how (except Java 8 default methods).

### Understand it step by step

| Point             | Abstract class                       | Interface (Java)                                                     |
| ----------------- | ------------------------------------ | -------------------------------------------------------------------- |
| Keyword           | `abstract class`                     | `interface`                                                          |
| Methods           | Abstract and concrete                | Abstract; since Java 8 also `default` and `static`; Java 9 `private` |
| Variables         | Any kind (instance, static, final)   | Only `public static final` (constants)                               |
| Constructor       | Yes                                  | No                                                                   |
| Inheritance       | `extends` — only **one**             | `implements` — **many**                                              |
| Access of members | Any modifier                         | Methods `public` by default                                          |
| Speed             | Slightly faster                      | Slightly slower (older JVMs)                                         |
| Use when          | Related classes share code and state | Unrelated classes share a capability (e.g. `Comparable`, `Runnable`) |
| Relation          | is-a                                 | can-do / behaves-like                                                |

- Both **cannot be instantiated**.
- An abstract class may have **zero** abstract methods (still cannot be instantiated).
- In C++ an "interface" is a class with only pure virtual functions.

### Exam trap

- "An interface can have a constructor" — false.
- "An abstract class must have at least one abstract method" — false in Java.
- Interface variables are automatically `public static final` — you cannot change them.

## Part 7: Relationships and UML

### Bangla core

**গল্পে বুঝি:** একটা বাড়ি আর তার রুম — বাড়ি ভাঙলে রুমও শেষ (composition)। একটা বিভাগ আর তার শিক্ষক — বিভাগ বন্ধ হলেও শিক্ষক অন্য জায়গায় থাকেন (aggregation)। শিক্ষক আর ছাত্র একে অন্যকে চেনেন, কেউ কারও অংশ নন (association)।

**ধাপে ধাপে:**

1. **Inheritance (generalization):** is-a; UML-এ সোজা রেখা, parent-এর দিকে ফাঁপা ত্রিভুজ।
2. **Realization:** interface implement করা; ড্যাশ রেখা, ফাঁপা ত্রিভুজ।
3. **Association:** একে অন্যকে চেনে বা ব্যবহার করে, দুজনের জীবন স্বাধীন; সোজা রেখা।
4. **Aggregation:** দুর্বল has-a, অংশ আলাদা বাঁচতে পারে; সম্পূর্ণের দিকে ফাঁপা ডায়মন্ড।
5. **Composition:** শক্ত has-a, অংশ সম্পূর্ণের সাথেই শেষ হয়; ভরাট ডায়মন্ড।
6. **Dependency:** সাময়িক ব্যবহার; ড্যাশ তীর।
7. **Class diagram বাক্স:** তিন ভাগ — নাম, attribute, method। চিহ্ন: + public, - private, # protected, ~ package।
8. **Use-case diagram:** বাক্সের বাইরে actor (stick figure), ভেতরে use case (ডিম্বাকৃতি)। «include» সবসময় ঘটে, «extend» ঐচ্ছিক।

**এক লাইনে:** ভরাট মানে অংশ মরে (composition), ফাঁপা মানে আলগা বাঁধন (aggregation); প্রশ্ন করো — সম্পূর্ণ ভাঙলে অংশ কি টিকে থাকে?

### Understand it step by step

| Relationship                 | Meaning                 | Life of the part                | UML arrow                                 | Example                |
| ---------------------------- | ----------------------- | ------------------------------- | ----------------------------------------- | ---------------------- |
| Inheritance (generalization) | is-a                    | —                               | Solid line, **hollow triangle** at parent | Savings → Account      |
| Realization                  | implements              | —                               | Dashed line, hollow triangle              | ATM ⇢ Payable          |
| Association                  | uses / knows            | Independent                     | Solid line (arrow optional)               | Teacher — Student      |
| Aggregation                  | has-a (weak)            | Part can live without the whole | Solid line, **hollow diamond** at whole   | Department ◇— Teacher  |
| Composition                  | has-a (strong), part-of | Part dies with the whole        | Solid line, **filled diamond** at whole   | House ◆— Room          |
| Dependency                   | uses temporarily        | —                               | Dashed arrow                              | Order ⇢ PaymentService |

**Remember the diamonds:** composition is "**filled = fatal**" (part dies); aggregation is "**hollow = holds loosely**".

**Class diagram box:** three compartments — name, attributes, methods. Visibility signs: `+` public, `-` private, `#` protected, `~` package. Multiplicity: `1`, `0..1`, `*`, `1..*`.

```text
+--------------------------+
|         Account          |
+--------------------------+
| - accountNo : String     |
| - balance : double       |
+--------------------------+
| + deposit(amt) : void    |
| + withdraw(amt) : bool   |
| + getBalance() : double  |
+--------------------------+
```

**Token-ring LAN class diagram (BB AP 2023, P4 Q7) — how to draw it**

- Abstract class **Node** (`-address`, `+send(p: Packet)`, `+receive(p: Packet)`).
- **Workstation**, **Server**, **Printer** inherit Node (hollow triangles to Node). Server may have `+serve()`, Printer `+print(doc)`.
- **Node** has an association to itself: each node has exactly one **next** node (`1` to `1`) — that is the ring.
- **Packet** (`-source`, `-destination`, `-data`): Node _sends_ 0..\* Packets (association or dependency).
- Optional: **LAN** ◆— 2..\* **Node** (composition: nodes are part of the ring network).

**Use-case diagram (online shopping, P17 Q8)**

- **Actors** (stick figures, outside the system box): Customer, Admin, Payment Gateway (external system), Delivery Agent.
- **Use cases** (ovals inside the system box "Online Shopping System"): Register/Login, Browse products, Search product, Add to cart, Place order, Make payment, Track order, Cancel order; Admin: Manage products, Manage orders, View reports.
- **«include»** (always happens): Place order «include» Make payment; Make payment «include» Login.
- **«extend»** (optional): Apply coupon «extend» Place order.
- Payment Gateway is linked to Make payment.

### Exam trap

- Car–Engine is usually **composition**; Department–Teacher is **aggregation**. Ask: "If the whole is destroyed, does the part die?"
- «include» arrow points **from the base use case to the included one**; «extend» points **from the extension to the base**.

## Part 8: MCQ rapid-fire

Read these as one-liners. Each is a common MCQ.

**History and languages**

1. First OOP language: **Simula 67**. First pure OOP language: **Smalltalk**.
2. C++ was created by **Bjarne Stroustrup** (Bell Labs), first named "C with Classes".
3. Java was created by **James Gosling** at Sun Microsystems, released in **1995**; first named **Oak**.
4. Java is platform independent because the compiler makes **bytecode** (`.class`), which any **JVM** runs: "Write Once, Run Anywhere". The JVM itself is platform dependent.
5. JDK = JRE + development tools (javac); JRE = JVM + libraries.
6. C++ is **not** a pure OOP language (it allows global functions and primitive types). Java is also not 100% pure (primitives such as `int`).
7. Root class of every Java class: **`java.lang.Object`**.

**Classes and objects** 8. An object is an **instance** of a class; a class takes no memory for data until an object is created. 9. Java creates objects with `new` on the **heap**; C++ objects can be on the stack or heap. 10. Size of an empty class object in C++: **1 byte** (so each object has a unique address). 11. A class member function defined inside the class is **inline** by default (C++). 12. The scope resolution operator in C++ is **`::`**.

**Constructors and destructors** 13. Constructor: same name as class, no return type, called automatically. 14. Copy constructor parameter must be a **reference** (`const X&`). 15. Destructor symbol: **`~`** (tilde); cannot be overloaded; takes no arguments. 16. Construction order: base → derived; destruction: derived → base. 17. Java has no destructor; memory is freed by the **garbage collector**; `System.gc()` only requests it. 18. A constructor can be **private** (used in the Singleton pattern).

**Access and keywords** 19. Default access in a C++ class: **private**; in a C++ struct: **public**; in Java: **package-private**. 20. `protected` members are visible in derived classes but not to outside code. 21. `this` is not available inside **static** methods. 22. A **static** member is shared by all objects; C++ static data members are defined outside the class. 23. `final` class cannot be inherited (e.g. Java `String`); `final` method cannot be overridden. 24. `super()` must be the first statement in a Java constructor. 25. Friend function: not a member, can access private data, not inherited.

**Inheritance** 26. Java does not support multiple inheritance with classes, to avoid the **diamond problem**. 27. C++ solves the diamond problem with **virtual base classes**. 28. A class can implement **any number** of interfaces in Java. 29. Default inheritance mode: `class` → private, `struct` → public (C++). 30. Constructors are **not inherited**.

**Polymorphism** 31. Overloading = compile time; overriding = run time. 32. Return type alone cannot overload a function. 33. Static methods are **hidden**, not overridden. 34. Late binding in C++ needs the **`virtual`** keyword. 35. A pure virtual function: `virtual void f() = 0;` makes the class abstract. 36. Operators that cannot be overloaded in C++: `::`, `.`, `.*`, `?:`, `sizeof`, `typeid`. 37. Java does not support operator overloading. 38. vtable is per **class**; vptr is per **object**. 39. Templates (C++) and generics (Java) = **compile-time** (parametric) polymorphism. 40. Upcasting (child → parent reference) is implicit; downcasting needs an explicit cast (check with `instanceof`).

**Abstraction** 41. Abstract classes and interfaces **cannot be instantiated**. 42. An abstract class can have constructors; an interface cannot. 43. Interface fields are implicitly **public static final**. 44. Java 8 added **default** and **static** methods to interfaces.

**Design terms** 45. Good design: **high cohesion, low coupling**. 46. **SOLID**: Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion. 47. Open/closed: open for extension, closed for modification. 48. Liskov: a child object must be usable wherever a parent is expected. 49. Design patterns (Gang of Four, 23): creational (Singleton, Factory), structural (Adapter, Decorator), behavioural (Observer, Strategy).

**Exceptions and threads (Java)** 50. `try`–`catch`–`finally`; `finally` runs whether or not an exception occurs (except `System.exit`). 51. **Checked** exceptions (IOException) must be caught or declared with `throws`; **unchecked** (RuntimeException, NullPointerException) need not. 52. `throw` throws one exception; `throws` declares it in a method signature. 53. A thread is created by **extending `Thread`** or **implementing `Runnable`** (preferred, because the class can still extend another class). Start with `start()`, not `run()`. 54. **Multithreading:** running several threads of one process at the same time. Why: better CPU use, responsive UI, faster work on multi-core CPUs, shared memory makes threads cheaper than processes. Risk: race conditions — fix with `synchronized`.

### Exam trap

- Calling `run()` directly runs the code in the **current** thread; only `start()` creates a new thread.
- "Platform independent" belongs to **Java bytecode**, not to the JVM.

## Part 9: Output traps

Cover the answer, trace on paper, then check.

#### Trap 1 (Java): constructor order

```java
class Base    { Base()    { System.out.println("Base"); } }
class Derived extends Base { Derived() { System.out.println("Derived"); } }
// new Derived();
```

#### Solution

`Base` then `Derived`. Java inserts `super();` as the first line of the child constructor, so the parent is built first.

#### Trap 2 (Java): static hiding

```java
A ref = new B();
ref.info();   // static in both A and B
ref.greet();  // instance, overridden in B
```

#### Solution

`A.info` then `B.greet`. Static follows the reference; instance methods follow the object.

#### Trap 3 (Java): shallow vs deep copy

```java
int[] a = {80, 90};
int[] b = a;            // copies the reference
int[] c = a.clone();    // copies the array
b[0] = 10; c[1] = 0;
System.out.println(a[0] + " " + a[1]);
```

#### Solution

`10 90`. `b` points to the same array as `a`, so `a[0]` changes; `c` is a separate copy, so `a[1]` stays 90.

#### Trap 4 (Java): static counter

```java
new Counter(); new Counter(); new Counter();
System.out.println(Counter.count);   // static int count, ++ in the constructor
```

#### Solution

`3`. One shared variable, incremented by each constructor.

#### Trap 5 (Java): overload resolution

```java
B b = new B();
b.show(5);     // A has show(int), B has show(double)
```

#### Solution

`A.show(int)`. Both methods are visible in B; the exact match `int` wins over widening to `double`.

#### Trap 6 (C++ only, MCQ): virtual vs non-virtual

```cpp
Base *p = new Derived();
p->f();   // f is NOT virtual
p->g();   // g IS virtual
```

#### Solution

`Base f` then `Derived g`. Non-virtual follows the pointer type; virtual follows the object. (Java behaves like `g` for every instance method.)

## Part 10: Written answers

### Exam answer: Polymorphism and its types, with example (10 marks)

**Definition.** Polymorphism (Greek: "many forms") is the ability of one function, method or operator to behave differently depending on the type of data or object it works on. It lets one interface serve many types.

**Types:**

**1. Compile-time (static) polymorphism** — the compiler decides which function to call, from the number and types of arguments.

- _Function overloading:_ several functions with the same name and different parameter lists.
- _Operator overloading:_ giving an operator a meaning for user-defined types (supported in C++, not in Java).
- _Generics / templates:_ one method or class for many types, e.g. `ArrayList<Integer>`, `ArrayList<String>`.

```java
class MathUtil {
    static int add(int a, int b)          { return a + b; }
    static double add(double a, double b) { return a + b; }
}
// MathUtil.add(2, 3) → 5      MathUtil.add(2.5, 3.5) → 6.0
```

**2. Run-time (dynamic) polymorphism** — the call is decided while the program runs, from the actual object type (dynamic method dispatch). It needs inheritance and method overriding.

```java
abstract class Shape { abstract double area(); }
class Rect extends Shape {
    private double w, h;
    Rect(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}
class Circle extends Shape {
    private double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return 3.14 * r * r; }
}
// Shape s = new Circle(1);  s.area() → 3.14 (Circle's version)
```

Internally the JVM keeps a **method table** per class (C++ calls it the vtable), and each object knows its class, so the right method is found at run time.

| Basis       | Compile-time           | Run-time                      |
| ----------- | ---------------------- | ----------------------------- |
| Binding     | Early / static         | Late / dynamic                |
| Achieved by | Overloading, templates | Overriding, virtual functions |
| Inheritance | Not needed             | Needed                        |
| Speed       | Faster                 | Slightly slower               |
| Flexibility | Less                   | More                          |

**Advantages:** one interface for many types; new classes can be added without changing existing code (open/closed principle); cleaner, readable code.

**Conclusion.** Compile-time polymorphism gives convenience and speed; run-time polymorphism gives flexibility. Together they let large systems, such as a payment module that handles card, mobile and bank transfers through one `pay()` method, grow without rewriting old code.

### Exam answer: How inheritance supports polymorphism (5 marks)

**Definition.** _Inheritance_ lets a subclass acquire the members of a superclass (an is-a relationship). _Run-time polymorphism_ means one method call behaves differently depending on the actual object. Inheritance is what makes this possible.

**How it supports polymorphism:**

1. **Common type (upcasting).** A subclass object _is a_ superclass object, so a superclass reference can hold any subclass object: `Payment p = new CardPayment(1000);`.
2. **Common contract.** The subclass inherits the superclass's method signatures, so the same call, `p.fee()`, is valid for every subclass.
3. **Method overriding.** Each subclass redefines the method with its own body.
4. **Dynamic method dispatch.** At run time the JVM looks at the actual object, not the reference type, and runs that class's version.
5. **Extensibility.** Code written against the superclass (`totalFee(Payment[])`) keeps working when new subclasses are added (open/closed principle).

```java
class Payment { double fee() { return 0; } }
class CardPayment extends Payment { @Override double fee() { return 15.0; } }
class NpsbTransfer extends Payment { @Override double fee() { return 5.0; } }
// Payment[] list = { new CardPayment(), new NpsbTransfer() };
// for (Payment p : list) System.out.println(p.fee());   → 15.0, then 5.0
```

| Basis      | Role of inheritance                            | Role of overriding                     |
| ---------- | ---------------------------------------------- | -------------------------------------- |
| Gives      | Common type and common method signatures       | A different body in each subclass      |
| Decided    | At compile time (type checking)                | At run time (actual object)            |
| Without it | No single reference can hold different classes | Every subclass behaves like the parent |

**Limits.** The reference type decides which methods can be called, so subclass-only methods need a cast. Fields, static, private and final methods are not polymorphic. Compile-time polymorphism (overloading, generics) does not need inheritance.

**Conclusion.** Inheritance supplies the shared type and shared signatures; overriding supplies the different behaviour. Together they let one piece of code handle many kinds of objects, which is why a payment module can add a new payment type without touching the old code.

### Exam answer: Method overloading vs method overriding (10 marks)

**Overloading:** defining several methods with the **same name but different parameter lists** (number, type or order) in the same class. Resolved at **compile time**.

**Overriding:** a subclass provides its own implementation of a method that is already defined in its superclass, with the **same name, parameters and return type** (or a covariant subtype). Resolved at **run time** from the actual object.

```java
class Calculator {
    int add(int a, int b)          { return a + b; }        // overloading
    double add(double a, double b) { return a + b; }
}
class Animal { void sound() { System.out.println("..."); } }
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }            // overriding
}
// Animal a = new Dog(); a.sound(); → Bark
```

| Basis                    | Overloading            | Overriding                              |
| ------------------------ | ---------------------- | --------------------------------------- |
| Signature                | Different parameters   | Same signature                          |
| Classes                  | Same class             | Parent and child                        |
| Inheritance              | Not required           | Required                                |
| Binding                  | Compile time           | Run time                                |
| Return type              | Can differ (not alone) | Same or covariant                       |
| Access                   | Any                    | Cannot be more restrictive              |
| static / final / private | Can be overloaded      | Cannot be overridden (static is hidden) |
| Polymorphism type        | Compile-time           | Run-time                                |
| Purpose                  | Readability            | Specialised behaviour                   |

**Conclusion.** Overloading increases readability by reusing one name for related operations; overriding lets a subclass change inherited behaviour and is the base of run-time polymorphism.

### Exam answer: Which methods overload, override or hide (BB AP 2023)

Use the Java `A`/`B` example in [Part 5](#oop.part-5-polymorphism). Answer each method with the rule:

- **Same name, different parameters → overloads** (`show(double)` overloads `show(int)`).
- **Instance method, same signature → overrides** (`greet()`); call decided by the object type.
- **Static method, same signature → hides** (`info()`); call decided by the reference type.
- Instance overriding static, or static hiding instance → **compile error**.
- `private` methods are not inherited, so a same-name method in B is a **new method**, not an override.

### Exam answer: Advantages of encapsulation and inheritance (10 marks)

**Encapsulation** is the bundling of data and the methods that operate on it into a single class, with direct access to the data restricted by access modifiers.

_Advantages:_

1. **Data protection:** private fields can be changed only through methods that check rules (e.g. no negative deposit).
2. **Control:** read-only (getter only) or write-only fields are possible.
3. **Flexibility:** internal code can change without affecting users of the class.
4. **Easy testing and debugging:** each class is a self-contained unit.
5. **Reduced complexity:** users work with a small public interface.

```java
class Account {
    private double balance;
    public void deposit(double amt) { if (amt > 0) balance += amt; }
    public double getBalance() { return balance; }
}
```

**Inheritance** is the mechanism by which a new class acquires the properties and behaviour of an existing class (is-a relationship).

_Advantages:_

1. **Code reuse:** common code is written once in the parent.
2. **Extensibility:** new features are added in child classes without changing the parent.
3. **Less development and testing time.**
4. **Run-time polymorphism:** a parent reference can hold any child object.
5. **Logical hierarchy:** models real relationships (Account → Savings, Current).

```java
class SavingsAccount extends Account {
    private double rate = 0.05;
    public double interest() { return getBalance() * rate; }
}
```

**Conclusion.** Encapsulation keeps each object's data safe and its design flexible; inheritance lets classes share and extend code. Together they make software secure, reusable and easy to maintain.

### Exam answer: Circle class with translate, perimeter, area (Sonali & Janata 2024)

**Java version (learn this one):**

```java
class Circle {
    private double x, y, r;               // centre and radius (hidden data)
    Circle(double x, double y, double r) { this.x = x; this.y = y; this.r = r; }
    void translate(double dx, double dy) { x += dx; y += dy; }
    double perimeter() { return 2 * Math.PI * r; }
    double area() { return Math.PI * r * r; }
    void print() { System.out.println("Centre(" + x + ", " + y + ") r=" + r); }
}
public class CircleDemo {
    public static void main(String[] args) {
        Circle c = new Circle(0, 0, 5);
        c.print();                        // Centre(0.0, 0.0) r=5.0
        c.translate(3, 4);
        c.print();                        // Centre(3.0, 4.0) r=5.0
        System.out.printf("Perimeter = %.2f%n", c.perimeter());   // 31.42
        System.out.printf("Area = %.2f%n", c.area());             // 78.54
    }
}
```

**C++ version (the 2024 paper asked for C++; it is the same class with C++ syntax):** `public:`/`private:` labels, `cout` instead of `println`, and a semicolon after the class's closing brace.

```cpp
#include <iostream>
using namespace std;

class Circle {
private:
    double x, y, r;                 // centre and radius (hidden data)
public:
    Circle(double cx, double cy, double radius) : x(cx), y(cy), r(radius) {}
    void translate(double dx, double dy) { x += dx; y += dy; }
    double perimeter() const { return 2 * 3.14159 * r; }
    double area() const { return 3.14159 * r * r; }
    void print() const { cout << "Centre(" << x << ", " << y << ") r=" << r << endl; }
};

int main() {
    Circle c(0, 0, 5);
    c.print();                      // Centre(0, 0) r=5
    c.translate(3, 4);
    c.print();                      // Centre(3, 4) r=5
    cout << "Perimeter = " << c.perimeter() << endl;   // 31.4159
    cout << "Area = " << c.area() << endl;             // 78.5397
    return 0;
}
```

Tested: both versions print the outputs in the comments.

**Data flow of `translate`:**

1. `main` calls `c.translate(3, 4)`; the values 3 and 4 are copied into the parameters `dx` and `dy` (pass by value).
2. Inside the method, the hidden `this` reference points to object `c`.
3. `x += dx` changes `c.x` from 0 to 3; `y += dy` changes `c.y` from 0 to 4.
4. The radius `r` does not change, so `perimeter()` and `area()` give the same results as before — moving a circle does not change its size.
5. Nothing is returned (`void`); the change is stored in the object's own data, which shows encapsulation: only the class's method can change `x` and `y`.

### Remember it

- Written OOP answers follow one shape: **definition → types or points → table → code → conclusion**.
- Always add a 4-row comparison table: examiners give marks for it quickly.
- Use a **banking example** (Account, Savings) — it fits every bank paper.

### Exam trap

- If the question names no language, answer in **Java** and write "(Java)" above the code. If it names C++, use the C++ version — the logic is the same.
- For "data flow" questions, mention parameter passing, `this`, which members change and what is returned.

## Diagnostic misses (2 Oct)

### Encapsulation vs abstraction

- **Core idea:** encapsulation bundles data with the methods that use it and restricts direct access (private fields, public getters and setters). Abstraction shows only essential features and hides how they work (abstract classes, interfaces).
- **Memory trick:** encapsulation hides **data**; abstraction hides **complexity**.
- **Exam points:** keywords "data hiding", "access modifiers" or "private" point to encapsulation. "Interface", "abstract class" or "what, not how" point to abstraction.
- **Common mistake:** choosing abstraction when the question mentions hiding data.

## Recall check

1. Without notes, draw the overloading vs overriding table with at least 6 rows.
2. In Java, `A ref = new B();` — which version runs for an overridden instance method, and which for a hidden static method? Why?
3. Name the five types of inheritance. Which ones does Java not support with classes, and how does C++ solve the diamond problem?
4. Why must a C++ copy constructor take its argument by reference?
5. Give three differences between an abstract class and an interface.
6. Which C++ operators cannot be overloaded?
7. Composition or aggregation: Bank–Branch? Library–Book? Justify each in one line.
8. Explain in five points how inheritance supports run-time polymorphism. Which of those points would fail if `Payment` were not a parent of `CardPayment`?
9. `Payment p = new NpsbTransfer(500);` — why does `p.showSwitch()` not compile, and how do you call it safely?
