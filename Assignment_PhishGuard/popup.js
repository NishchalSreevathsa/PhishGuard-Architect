document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const targetUrlInput = document.getElementById('target-url');
    const agentStatus = document.getElementById('agent-status');
    const panels = document.querySelectorAll('.panel');
    const verdictCard = document.getElementById('verdict-card');

    analyzeBtn.addEventListener('click', startAnalysis);

    async function startAnalysis() {
        const url = targetUrlInput.value;
        if (!url) return;

        // Reset UI
        document.getElementById('plan-list').innerHTML = '';
        document.getElementById('reasoning-log').innerHTML = '';
        document.getElementById('action-log').innerHTML = '';
        panels.forEach(p => p.classList.remove('hidden'));
        verdictCard.classList.add('hidden');
        analyzeBtn.disabled = true;
        agentStatus.textContent = "AGENT RUNNING...";
        agentStatus.classList.add('running');

        // --- PHASE 1: GOAL DECOMPOSITION (PLANNING) ---
        // Simulating the AI breaking down the task
        await typeWriter('reasoning-log', "Received request to analyze URL. Task is complex. Decomposing into sub-goals...\n");

        const plan = [
            { id: 1, text: "Parse URL Structure & Homoglyphs", status: "pending" },
            { id: 2, text: "Query Reputation Database (CTI)", status: "pending" },
            { id: 3, text: "Analyze Cert Validity (PKI)", status: "pending" },
            { id: 4, text: "Synthesize Evidence & Verdict", status: "pending" }
        ];

        renderPlan(plan);
        await new Promise(r => setTimeout(r, 1000));

        // --- PHASE 2: EXECUTION LOOP (ReACT) ---

        // Step 1: Structure Analysis
        updatePlanStatus(1, 'active');
        await typeWriter('reasoning-log', "> Goal 1: Structure Analysis. Checking for misleading subdomains or typosquatting.\n");
        await simulateReactStep("Parsing URL syntax", `RegEx Analysis on '${url}'`, "Found multiple subdomains. 'apple.com' found but is NOT the root domain.");
        updatePlanStatus(1, 'completed');

        // Step 2: Reputation
        updatePlanStatus(2, 'active');
        await typeWriter('reasoning-log', "> Goal 2: Reputation. Need to check if this domain is new or known malicious.\n");
        await simulateReactStep("Querying VirusTotal API", `GET /api/v3/domains/report`, "Result: Malicious (3/90). Domain Age: 2 days.");
        await typeWriter('reasoning-log', "> Reasoning: Domain is extremely young (2 days). High probability of burner domain.\n");
        updatePlanStatus(2, 'completed');

        // Step 3: Certs
        updatePlanStatus(3, 'active');
        await typeWriter('reasoning-log', "> Goal 3: PKI Check. Phishing sites often use free LetsEncrypt certs.\n");
        await simulateReactStep("Checking SSL Issuer", `openssl x509 -text`, "Issuer: R3 (LetsEncrypt). Validity: 90 days.");
        updatePlanStatus(3, 'completed');

        // Step 4: Verdict
        updatePlanStatus(4, 'active');
        await typeWriter('reasoning-log', "> All evidence collected. Synthesizing final verdict.\n");
        updatePlanStatus(4, 'completed');

        // Final UI Update
        agentStatus.textContent = "COMPLETED";
        agentStatus.classList.remove('running');
        analyzeBtn.disabled = false;
        showVerdict(url);
    }

    // --- HELPER FUNCTIONS ---

    function renderPlan(plan) {
        const list = document.getElementById('plan-list');
        list.innerHTML = plan.map(item =>
            `<div class="plan-step" id="step-${item.id}">
           <span>○</span> ${item.text}
         </div>`
        ).join('');
    }

    function updatePlanStatus(id, status) {
        const el = document.getElementById(`step-${id}`);
        el.className = `plan-step ${status}`;
        if (status === 'active') el.querySelector('span').textContent = '▶';
        if (status === 'completed') el.querySelector('span').textContent = '✓';
    }

    async function typeWriter(elementId, text) {
        const el = document.getElementById(elementId);
        const line = document.createElement('div');
        line.className = 'thought-line';
        el.appendChild(line);

        for (let i = 0; i < text.length; i++) {
            line.textContent += text.charAt(i);
            // Random typing speed for realism
            await new Promise(r => setTimeout(r, Math.random() * 20));
            // Auto scroll
            el.scrollTop = el.scrollHeight;
        }
    }

    async function simulateReactStep(thought, action, observation) {
        const log = document.getElementById('action-log');

        // Add Action
        const actionEl = document.createElement('div');
        actionEl.className = 'action-item';
        actionEl.innerHTML = `<strong>ACTION:</strong> ${action}`;
        log.appendChild(actionEl);
        log.scrollTop = log.scrollHeight;

        await new Promise(r => setTimeout(r, 800)); // Simulate network wait

        // Add Observation
        const obsEl = document.createElement('div');
        obsEl.className = 'observation';
        obsEl.textContent = `OBSERVATION: ${observation}`;
        actionEl.appendChild(obsEl);
        log.scrollTop = log.scrollHeight;

        await new Promise(r => setTimeout(r, 600)); // Think buffer
    }

    function showVerdict(url) {
        const isSafe = url.includes('google.com') || url.includes('github.com');
        const verdict = document.getElementById('verdict-card');
        const level = document.getElementById('threat-level');
        const reason = document.getElementById('verdict-reason');

        verdict.classList.remove('hidden');
        if (isSafe) {
            verdict.style.borderColor = '#00ff41';
            level.style.color = '#00ff41';
            level.textContent = "SAFE";
            reason.textContent = "Domain has high reputation and valid certificates. No anomalies found.";
        } else {
            verdict.style.borderColor = '#ff7b72';
            level.style.color = '#ff7b72';
            level.textContent = "CRITICAL RISK";
            reason.textContent = "Evidence: Logic Analysis detected subdomain masquerading. New domain age (2 days).";
        }
    }
});
