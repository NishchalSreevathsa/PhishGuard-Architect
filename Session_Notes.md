# Session 5: Planning and Reasoning with Language Models - Deep Dive Notes

## Introduction
This document provides a comprehensive breakdown of **Session 5**. We move beyond simple "chatbots" to understanding how AI Agents **Plan**, **Reason**, and **Execute** complex tasks. 

**Theme**: From "Predicting the next word" to "Thinking before speaking".

---

## 1. `uv` - The Next Generation Python Package Manager
### **Concept Definition**
`uv` is a modern, high-performance Python package manager written in **Rust**. It replaces legacy tools like `pip`, `pip-tools`, and `virtualenv`.

### **Key Features & Explanations**
-   **Speed**: It is 10-100x faster than pip because it uses Rust's concurrency and caching mechanisms.
-   **Determinism (`uv.lock`)**: It creates a "Lock File" (`uv.lock`). This file records the *exact* version of every library installed. This ensures that if it works on my machine, it works on yours.
-   **Workspace Isolation**: It automatically creates and manages `.venv` (virtual environments). This means project A's libraries never conflict with project B's.
-   **Global Cache**: It downloads a library once (globally) and links it to projects, saving disk space and bandwidth.

### **Common Commands**
-   `uv init <project_name>`: Creates a new project structure (scaffolding).
-   `uv add <package>`: Installs a package and adds it to `pyproject.toml`.
-   `uv run <script.py>`: Runs a script inside the isolated environment without needing to manually "activate" it.
-   `uv tree`: Visualizes the dependency tree (what depends on what).

### **Cybersecurity Analogy**
Think of Python environments like **Crime Scene Investigations**:
-   **Old Way (`pip`)**: You dump all evidence (libraries) into one big plastic bag. Evidence from "Case A" mixes with "Case B". You lose track of the Chain of Custody (Versions).
-   **New Way (`uv`)**: You use **sealed, barcoded evidence bags** (`.venv`) for each case. The `uv.lock` file is your **Evidence Log**, proving exactly what entered the bag and when. `uv` is the **Forensic Robot** that creates these bags instantly and perfectly every time.

---

## 2. LLM Internals: The "Two Brains"
### **Frozen Memory (Long-Term)**
-   **Definition**: The weights and biases of the model that were fixed during training.
-   **Function**: Stores facts, grammar, coding syntax, and world knowledge (e.g., "Paris is in France", "SQL syntax").
-   **Limitation**: It **cannot change** during a conversation. It cannot "learn" new things permanently.
-   **Cybersecurity Analogy**: Your **SANS/OSCP Certification Training**. You learned the theory of buffer overflows years ago. That knowledge is "frozen" in your brain until you retrain.

### **Working Memory (Short-Term / Context)**
-   **Definition**: The "Context Window" – the prompt you type and the conversation history.
-   **Function**: Stores the *current* problem, intermediate calculations, and temporary variables. Used for reasoning *now*.
-   **Limitation**: It is temporary. Once the chat closes, it's gone.
-   **Cybersecurity Analogy**: The **Incident Response Ticket** you are working on *right now*. You are pasting specific IP addresses (variables) and logs (context) into the ticket. You use your "Frozen" knowledge to analyze this "Working" data.

### **Mechanism: Activation of Features**
Research shows simple prompts activate specific "circuits" in the brain:
-   **Entity Recognition**: "This is a city", "This is a name".
-   **Reasoning Circuits**: "If X happens, then Y must follow".
-   **Chain-of-Thought** acts as a **Key** to unlock these deeper reasoning circuits.

---

## 3. Chain-of-Thought (CoT) prompting
### **Concept Definition**
Technique where you prompt the LLM to **generate intermediate reasoning steps** before giving the final answer.
> *Formula*: `Input` -> `Reasoning Steps` -> `Final Answer`

### **Why it works?**
LLMs are **Autoregressive** (they write one word at a time). By forcing them to write the steps, they:
1.  **Buy Time**: They process the problem longer.
2.  **Self-Correct**: Depending on what they wrote in Step 1, Step 2 becomes more accurate.
3.  **Audit**: Humans can see *why* the model made a decision.

### **Types of CoT**
1.  **Zero-Shot CoT**:
    -   *Prompt*: "Let's think step by step."
    -   *Mechanism*: Nudges the model to use its latent reasoning abilities without examples.
2.  **Few-Shot CoT**:
    -   *Prompt*: You give 2-3 examples of `Question -> Step-by-Step Logic -> Answer`.
    -   *Mechanism*: The model "pattern matches" your logic style and applies it to the new question.

### **Cybersecurity Analogy**
**Analyst Triage Level**:
-   **Zero-Shot (Junior)**: You tell a junior analyst, "Here is an alert, investigate it carefully." (General instruction).
-   **Few-Shot (Playbook)**: You give them a **Standard Operating Procedure (SOP)**: "When you see a Phishing alert: 1. Check Sender, 2. Check Link, 3. Check Attachment." They follow this exact pattern for the new alert.

---

## 4. ReACT (Reasoning + Acting)
### **Concept Definition**
A paradigm where the AI typically loops through three states:
1.  **Thought**: The AI reasons about what it needs to do.
2.  **Action**: The AI executes a tool (search web, run code, query DB).
3.  **Observation**: The AI reads the output of the tool.
*Repeat until finished.*

### **Significance**
This turns a "Chatbot" into an "Agent". It allows the LLM to interact with the real world.

### **Cybersecurity Analogy**
**The Penetration Tester's Loop**:
-   **Thought**: "I need to see if port 80 is open on this server."
-   **Action**: Runs `nmap -p 80 <target>`.
-   **Observation**: Terminal shows `TYPE: EXPLOIT`.
-   **Thought**: "Port 80 is open. Now I will check for vulnerabilities."
-   **Action**: Runs `nikto -h <target>`.
... and so on.

---

## 5. Structured Prompting
### **Concept Definition**
Forcing the LLM to output its reasoning in a specific, machine-readable format (like XML, JSON, or Markdown tables) instead of free text.

### **Formats**
1.  **Step-Labeled Reasoning (SLR)**:
    -   Forces tags like `<Plan>`, `<Evidence>`, `<Conclusion>`.
2.  **JSON Mode**:
    -   Forces output to be a valid JSON object. Essential for coding agents.

### **Why it helps?**
-   **Parsing**: Code can easily read the output.
-   **Compliance**: Forces the model to not "forget" parts of the answer.
-   **Cybersecurity Analogy**: **SIEM Logs**. You don't want a firewall to write a poem about a blocked packet. You want:
    `{ "timestamp": "12:00", "src_ip": "1.2.3.4", "action": "DROP" }`.
    Structured prompting forces the AI to write "Logs", not "Stories".

---

## 6. AI Planning Algorithms
### **Tree Search (BFS/DFS)**
-   **Concept**: Exploring multiple potential "future paths" before committing to one.
-   **Simulation**: Since LLMs are linear, we simulate this by asking: "Generate 3 possible solutions. Critique each one. Pick the best."
-   **Cybersecurity Analogy**: **Attack Path Map**.
    -   You are an attacker. You are at the "Lobby PC".
    -   *Path A*: Try to guess Admin password (Risky, might lock account).
    -   *Path B*: Look for sticky notes with passwords (Safe, low success).
    -   *Path C*: Use an exploit (High tech, might trigger IDS).
    -   You evaluate all 3 *before* acting.

### **Goal Decomposition**
-   **Concept**: Breaking a complex user request ("Build a website") into small, solvable sub-tasks ("Write HTML", "Write CSS", "Write JS").
-   **Dependency Awareness**: Understanding that "Write CSS" implies "I first need to know the HTML structure".
-   **Cybersecurity Analogy**: **CISO Strategy**.
    -   **Goal**: "Zero Trust Architecture". (Too big to do at once).
    -   **Decomposition**:
        1.  Identity Management (MFA).
        2.  Device Health Checks.
        3.  Network Segmentation.
    -   **Dependency**: You can't do "Device Health Checks" effectively if you don't have "Identity Management" (Who owns the device?).

---

## 7. Verification & Self-Correction
### **Concept Definition**
Asking the model to "double-check" its work before finalizing.
-   *Prompt*: "Review your code above. Are there any bugs? If so, fix them."
-   *Mechanism*: Works because the "Reviewer" context has more information (the completed code) than the "Creator" context had when it started.

### **Cybersecurity Analogy**
**Code Review / Red Teaming**.
-   You write a script (Draft).
-   You then put on your "Hacker Hat" and try to break your own script (Verification).
-   You find a bug and fix it (Correction).

---

## 8. Summary of Assignment: "PhishGuard Architect"
Your task is to build a browser extension that uses these concepts to analyze Phishing attempts.
-   Use **Structured Prompting** to guide the analysis.
-   Show the **CoT (Reasoning)** to the user (Transparency).
-   Simulate **ReACT** (checking links, reputation).
-   Provide a **Verdict** based on the logic.
