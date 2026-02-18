# Video Script: PhishGuard Architect - AI Security Agent

**Target Audience**: Cybersecurity professionals, Developers, AI enthusiasts.
**Goal**: Showcase how Agentic AI can revolutionize Phishing Detection.
**Context**: Standalone Project Showcase (No references to coursework).

---

## **Part 1: Introduction & The "Why" (0:00 - 1:00)**

**Visual**: 
-   Start with a slide or screen showing the Title: **"PhishGuard Architect: The Future of AI Phishing Defense"**.
-   Cut to a screen recording of the **PhishGuard GitHub Repository / README**.

**Narration**:
"Welcome back! Today I'm excited to share a project I've been working on called **PhishGuard Architect**.

It's a Browser-Based **AI Security Agent** designed to detect sophisticated phishing attacks that traditional tools miss.

**The Industry Problem**:
Right now, phishing defense relies heavily on static blacklists or simple keyword matching. Hackers bypass these easily using:
1.  **Homoglyphs**: Using hidden characters that look like real letters (e.g., `googIe.com`).
2.  **Brand New Domains**: Launching a site for 2 hours and burning it before blacklists catch up.
3.  **Subdomain Abuse**: Hiding malicious login pages deep inside innocent-looking URLs.

**The Solution**:
We need a tool that doesn't just 'match patterns' but actually **reasons** like a human security analyst. That's what PhishGuard does. It simulates a forensic investigation in real-time right in your browser."

---

## **Part 2: Technical Architecture Breakdown (1:00 - 3:00)**

**Visual**: 
-   Show a diagram or simple text overlay of the 4 concepts: **Chain of Thought**, **ReACT**, **Planning**, **Structured Prompting**.
-   (Optional) Scroll to the "Technical Architecture" section of the README.

**Narration**:
"Before we jump into the demo, let's explain the **Agentic AI** concepts powering this tool. It's not just a basic LLM wrapper; it uses advanced reasoning architectures.

### 1. Chain-of-Thought (CoT)
**What it is**: Large Language Models are great at predicting the next word, but can be bad at logic if rushed. CoT forces the AI to 'think out loud' step-by-step before giving an answer.
**In PhishGuard**: You will see a live 'Reasoning Log' where the agent writes down its hypothesis (e.g., 'This domain looks like a typo-squat of Google...') before it makes a decision. This builds trust.

### 2. ReACT (Reasoning + Acting)
**What it is**: This stands for **Reasoning** plus **Acting**. It's how agents interact with the world. The loop is: *Thought* -> *Action* (Tool Use) -> *Observation*.
**In PhishGuard**: The agent doesn't just guess. It 'acts' by querying simulated Threat Intelligence tools (like VirusTotal or Whois) and 'observes' the returned data to update its belief.

### 3. Goal Decomposition & Planning
**What it is**: Complex tasks overwhelm AI. Planning involves breaking a big goal ('Secure this site') into dependency-based sub-tasks.
**In PhishGuard**: You'll see a 'Planner Panel' that breaks the analysis into 4 phases:
    1. Structure Analysis (checking for homoglyphs).
    2. Reputation Check (is the domain new?).
    3. PKI Validity (is the SSL cert legit?).
    4. Final Verdict.

### 4. Structured Prompting
**What it is**: We don't want the AI to write a poem. We need data. Structured prompting forces the AI to output its internal state in strict JSON format. This ensures the tool always runs reliably."

---

## **Part 3: Live Demo - The Interface (3:00 - 3:30)**

**Visual**: 
-   Open the Browser.
-   Click the **Shield Icon** 🛡️ to open the extension.
-   Hover over the UI sections while explaining.

**Narration**:
"Let's look at the implementation. The UI is designed for transparency.
-   **Top Section**: Input for the URL.
-   **Planner Panel**: This will light up as the agent moves through its checklist.
-   **Reasoning Log (The Brain)**: Where we see the CoT in action.
-   **Action Log (The Hands)**: Where we see the ReACT tool execution."

---

## **Part 4: Scenario A - The Phishing Attack (3:30 - 4:30)**

**Visual**: 
-   Enter the URL: `http://secure-login-update.com.verify-acct.net`
-   Click **ANALYZE**.

**Narration**:
"Let's simulate a sophisticated attack. This URL uses a 'Subdomain Masquerading' technique.

Watch the **Planner**: It starts by breaking down the task.
Now look at the **Reasoning Log**. It immediately spots the anomaly: 'Wait, the root domain is verify-acct.net, NOT secure-login-update.com'.

Now the **ReACT Loop**: It decides to check the domain age.
*Action*: Querying Whois.
*Observation*: Created 2 days ago.

The agent combines these facts using logic: 'New Domain + Financial Keywords = High Risk'.

**Verdict**: The card turns **RED (Critical Risk)**. It successfully detected the threat not because of a blacklist, but because it reasoned through the evidence."

---

## **Part 5: Scenario B - The Safe Site (4:30 - 5:00)**

**Visual**: 
-   Enter: `https://google.com`
-   Click **ANALYZE**.

**Narration**:
"Now let's try a safe site, like Google.

The agent follows the same rigorous process.
It checks the SSL certificate.
*Observation*: Issued by Google Trust Services. Valid for 90 days.
It checks the reputation.
*Observation*: Domain age > 20 years.

**Verdict**: It correctly flags it as **SAFE**. This shows the system isn't just paranoid; it validates trust signals correctly."

---

## **Part 6: Scenario C - Typosquatting (5:00 - 5:30)**

**Visual**: 
-   Enter: `https://goggle.com` (Typosquat).
-   Click **ANALYZE**.

**Narration**:
"Finally, a Typosquatting attempt: `goggle.com`.
The agent's Structure Analysis step calculates the 'Levenshtein Distance'—a metric for how similar two words are.
It realizes 'goggle' is suspiciously close to 'google'.
**Verdict**: **SUSPICIOUS**. It warns the user to be careful."

---

## **Conclusion (5:30 - End)**

**Visual**: Return to the Title Slide or the GitHub Repo.

**Narration**:
"To wrap up, **PhishGuard Architect** proves that Agentic AI is a game-changer for cybersecurity.

By moving from simple pattern matching to **Planning and Reasoning Agents**, we can build defenses that adapt to new attacks faster than human analysts can write rules.

The full source code is available on my GitHub (link in description). Thanks for watching!"
