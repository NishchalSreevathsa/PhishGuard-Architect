# PhishGuard Architect - AI Safety Agent

> **AI-Powered Phishing Defense Browser Agent**

## 1. Overview
**PhishGuard Architect** is a browser extension that demonstrates **Agentic AI** principles (Planning, Reasoning, and Goal Decomposition) applied to cybersecurity. Instead of using simple keyword matching, it simulates a **Security Analyst** investigating a suspicious URL step-by-step.

It showcases the concepts learned in **Session 5: Planning and Reasoning with Language Models**.

---

## 2. Current Industry Problem
Phishing attacks are becoming increasingly sophisticated.
-   **Legacy Defenses**: Rely on blacklists (which are slow to update) or simple keyword matching (which attackers bypass with homoglyphs, e.g., `googIe.com`).
-   **Analyst Burnout**: Security analysts manually perform repetitive checks (Whois, SSL validity, Subdomain analysis) for thousands of alerts.
-   **The Gap**: We need tools that don't just "flag" but "reason" about *why* something is suspicious, mimicking human intuition at scale.

## 3. Solution: PhishGuard Architect
PhishGuard solves this by implementing an **AI Agent Loop**:
1.  **Decomposes** the analysis task into logical sub-goals.
2.  **Reasons** about each piece of evidence (Chain-of-Thought).
3.  **Acts** by querying simulated Threat Intelligence (CTI) sources (ReACT).
4.  **Synthesizes** a final verdict based on the aggregated evidence.

---

## 4. Technical Architecture (Session 5 Concepts)

This project directly implements the theoretical concepts from Session 5:

### A. Chain-of-Thought (CoT) prompting
-   **Concept**: Forcing the model to "think" before "speaking".
-   **Implementation**: The extension displays a live "Reasoning Log" (`> Checking domain age... > Suspiciously new...`). This transparency allows the user to trust the verdict.

### B. ReACT (Reasoning + Acting)
-   **Concept**: Interleaving Thoughts with Actions/Tools.
-   **Implementation**:
    -   *Thought*: "I need to check the SSL certificate issuer."
    -   *Action*: `openssl x509 -text` (Simulated).
    -   *Observation*: "Issuer is Let's Encrypt (90 days)."
    -   *Reasoning*: "Common in phishing kits."

### C. Goal Decomposition & Planning
-   **Concept**: Breaking complex tasks into a dependency graph.
-   **Implementation**: The "Planner Panel" visually breaks the task into 4 distinct phases:
    1.  Structure Analysis (Homoglyphs).
    2.  Reputation Check (CTI).
    3.  PKI Validity (Certificates).
    4.  Final Verdict.

### D. Structured Prompting
-   **Concept**: Enforcing a strict schema for the AI's output.
-   **Implementation**: The agent follows a strict JSON-like structure for its internal state, ensuring consistent execution.

---

## 5. The "Qualified Prompt" (Assignment Requirement)

This project was built based on the following **System Prompt**, designed to meet the criteria of "Explicit Reasoning", "Structured Output", and "Error Healing".

```markdown
# SYSTEM PROMPT: PhishGuard Agent

## ROLE
You are an expert Cybersecurity Analyst Agent specialized in detecting Phishing and Social Engineering attacks. Your goal is to analyze a given URL and provide a definitive RISK VERDICT.

## OUTPUT FORMAT (STRICT JSON)
You must output your response in valid JSON with the following schema:
{
  "plan": ["List of sub-goals"],
  "reasoning_trace": [
    {"step": 1, "thought": "Internal monologue", "action": "ToolName", "observation": "ToolOutput"}
  ],
  "verdict": {
    "risk_level": "SAFE | SUSPICIOUS | CRITICAL",
    "confidence": 0-100,
    "summary": "Executive summary for the user"
  }
}

## INSTRUCTIONS
1. **THINK OF A PLAN**: Before analyzing, break the task into at least 3 sub-goals (e.g., Syntax Check, Reputation, Content Analysis).
2. **REASON STEP-BY-STEP**: For each sub-goal:
   - EXPLAIN your thinking ("Checking for homoglyphs because...").
   - ACT by calling a tool.
   - OBSERVE the result.
   - VERIFY if the result makes sense.
3. **SELF-CORRECTION**: If a tool fails or returns ambiguous data, explicitly state your uncertainty in the reasoning trace and degrade confidence gracefully.
4. **NO HALLUCINATION**: If the domain is unknown, do not invent a reputation. Mark it as "Unverified".

## EXAMPLE
User Input: "http://secure-login-apple.com.verify.net"
Agent Output:
{
  "plan": ["Parse URL structure", "Check Whois Age", "Analyze SSL"],
  "reasoning_trace": [
    {"step": 1, "thought": "Domain looks like a sub-domain attack. Main domain is 'verify.net', not 'apple.com'.", "action": "parse_url", "observation": "Root: verify.net"},
    {"step": 2, "thought": "Checking age of verify.net", "action": "whois", "observation": "Created: 2 days ago"}
  ],
  "verdict": {
    "risk_level": "CRITICAL",
    "summary": "Sophisticated phishing attempt using subdomain masquerading on a freshly registered domain."
  }
}
```

---

## 6. How It Works (Working Mechanism)
1.  **Input**: User enters a URL (e.g., `http://secure-login-update.com.verify-acct.net`).
2.  **Planning**: The internal logic generates a plan:
    -   *Goal 1*: Parse URL Structure.
    -   *Goal 2*: Check Reputation.
    -   *Goal 3*: Verify Certificates.
3.  **Execution (Simulation)**:
    -   The script simulates network latency and tool execution.
    -   It logs "Thoughts" and "Actions" to the UI console.
4.  **Verdict**: It applies a heuristic (e.g., if domain age < 7 days AND suspicious keywords found -> CRITICAL RISK).

---

## 7. Demo Test Cases

| Scenario | Input URL | Expected Result | Reason |
| :--- | :--- | :--- | :--- |
| **Puntive Phishing** | `http://secure-login-update.com.verify-acct.net` | **CRITICAL RISK** | Subdomain masquerading (Apple/Login keywords) + Young Domain Age. |
| **Legitimate Site** | `https://google.com` | **SAFE** | High reputation domain + Valid SSL + No anomalies. |
| **Typosquatting** | `https://goggle.com` | **SUSPICIOUS** | High Levenshtein distance similarity to a known brand ("Google"). |

---

## 8. Conclusion
PhishGuard Architect demonstrates that the future of cybersecurity is **Agentic**. By combining **CoT reasoning** with **automated tool use**, we can reduce false positives and provide users with actionable, explainable security insights.

---

> Built for School of AI - Session 5 Assignment
