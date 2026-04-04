function generateAnalysis() {
  const getVal = (id) => {
    const el = document.getElementById(id);
    return parseFloat(el.value || el.placeholder);
  };
  const pH = getVal('soil-ph');
  const moisture = getVal('soil-moisture');
  const nitrogen = getVal('soil-n');
  const phosphorus = getVal('soil-p');
  const potassium = getVal('soil-k');

  if (isNaN(pH) || isNaN(moisture) || isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium)) {
    alert('Please fill in all soil parameters before generating analysis.');
    return;
  }

  // --- SECTION A: Basic Soil Analysis ---
  const issues = [];
  let riskScore = 0;

  if (pH < 6.0) { issues.push({ type: 'warning', msg: 'Soil pH is too acidic (below 6.0). Apply lime to raise pH.' }); riskScore += 2; }
  else if (pH > 8.5) { issues.push({ type: 'warning', msg: 'Soil pH is too alkaline (above 8.5). Apply sulfur to lower pH.' }); riskScore += 2; }
  else { issues.push({ type: 'good', msg: `Soil pH is optimal at ${pH}.` }); }

  if (moisture < 20) { issues.push({ type: 'danger', msg: 'Soil moisture critically low — immediate irrigation required.' }); riskScore += 3; }
  else if (moisture > 65) { issues.push({ type: 'warning', msg: 'Soil waterlogged — improve drainage to prevent root rot.' }); riskScore += 2; }
  else { issues.push({ type: 'good', msg: `Moisture level is good at ${moisture}%.` }); }

  if (nitrogen < 150) { issues.push({ type: 'warning', msg: `Nitrogen deficient (${nitrogen} mg/kg). Apply urea or ammonium sulfate.` }); riskScore += 2; }
  else { issues.push({ type: 'good', msg: `Nitrogen is adequate at ${nitrogen} mg/kg.` }); }

  if (phosphorus < 20) { issues.push({ type: 'warning', msg: `Phosphorus low (${phosphorus} mg/kg). Apply DAP or SSP fertilizer.` }); riskScore += 1; }
  else { issues.push({ type: 'good', msg: `Phosphorus is adequate at ${phosphorus} mg/kg.` }); }

  if (potassium < 100) { issues.push({ type: 'warning', msg: `Potassium low (${potassium} mg/kg). Apply MOP (Muriate of Potash).` }); riskScore += 1; }
  else { issues.push({ type: 'good', msg: `Potassium is adequate at ${potassium} mg/kg.` }); }

  const riskLevel = riskScore >= 5 ? 'HIGH' : riskScore >= 3 ? 'MODERATE' : 'LOW';
  const riskColor = riskLevel === 'HIGH' ? '#e74c3c' : riskLevel === 'MODERATE' ? '#f39c12' : '#2ecc71';
  const statusMsg = riskScore === 0 ? 'Your soil is in EXCELLENT condition.' : riskScore < 3 ? 'Your farm is in GOOD condition with minor improvements needed.' : riskScore < 5 ? 'Your farm REQUIRES ATTENTION — take corrective action soon.' : 'Your farm is in CRITICAL condition — act immediately.';

  // --- SECTION B: Sowing Date Optimizer ---
  const sowingScenarios = generateSowingScenarios(pH, moisture, nitrogen, phosphorus, potassium);

  // --- SECTION C: Irrigation & Fertilizer Schedule Auto-Tester ---
  const scheduleResults = autoTestSchedules(pH, moisture, nitrogen, phosphorus, potassium);

  // --- SECTION D: Execution Guidance ---
  const executionGuide = generateExecutionGuide(issues, riskLevel);

  // --- Render All Tabs ---
  const resultContainer = document.getElementById('analysis-result');
  resultContainer.innerHTML = `
    <div class="analysis-result-wrapper">
      <div class="analysis-summary-bar" style="border-left: 5px solid ${riskColor}">
        <div>
          <h3 style="margin:0">${statusMsg}</h3>
          <p style="margin:4px 0 0; font-size:13px; color:#666;">Based on your soil inputs — Nagpur, India</p>
        </div>
        <span class="risk-badge" style="background:${riskColor}">${riskLevel} RISK</span>
      </div>

      <!-- Tab Navigation -->
      <div class="analysis-tabs">
        <button class="analysis-tab active" onclick="switchAnalysisTab('soil', this)">🧪 Soil Analysis</button>
        <button class="analysis-tab" onclick="switchAnalysisTab('sowing', this)">🌱 Sowing Dates</button>
        <button class="analysis-tab" onclick="switchAnalysisTab('schedule', this)">💧 Irrigation & Fertilizer</button>
        <button class="analysis-tab" onclick="switchAnalysisTab('guidance', this)">📋 Execution Guide</button>
      </div>

      <!-- Tab: Soil Analysis -->
      <div id="tab-soil" class="analysis-tab-content active">
        <div class="issues-list">
          ${issues.map(i => `
            <div class="issue-item ${i.type}">
              <span class="issue-icon">${i.type === 'good' ? '✅' : i.type === 'warning' ? '⚠️' : '🚨'}</span>
              <span>${i.msg}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab: Sowing Date Optimizer -->
      <div id="tab-sowing" class="analysis-tab-content" style="display:none">
        <p class="tab-intro">Based on your soil conditions, here are the optimal sowing windows tested across different months:</p>
        <div class="sowing-grid">
          ${sowingScenarios.map(s => `
            <div class="sowing-card ${s.recommended ? 'recommended' : ''}">
              ${s.recommended ? '<span class="rec-badge">⭐ RECOMMENDED</span>' : ''}
              <h4>${s.month}</h4>
              <p class="sowing-crop"><strong>Best Crop:</strong> ${s.crop}</p>
              <div class="sowing-score">
                <div class="score-bar"><div class="score-fill" style="width:${s.score}%;background:${s.score > 70 ? '#2ecc71' : s.score > 40 ? '#f39c12' : '#e74c3c'}"></div></div>
                <span>${s.score}% compatibility</span>
              </div>
              <p class="sowing-reason">${s.reason}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab: Irrigation & Fertilizer Schedule -->
      <div id="tab-schedule" class="analysis-tab-content" style="display:none">
        <p class="tab-intro">Auto-tested 3 irrigation and 3 fertilizer strategies against your soil profile:</p>
        <h4>💧 Irrigation Strategy Comparison</h4>
        <table class="schedule-table">
          <thead><tr><th>Strategy</th><th>Frequency</th><th>Efficiency</th><th>Risk</th><th>Recommendation</th></tr></thead>
          <tbody>
            ${scheduleResults.irrigation.map(r => `
              <tr class="${r.best ? 'best-row' : ''}">
                <td><strong>${r.name}</strong></td>
                <td>${r.frequency}</td>
                <td>${r.efficiency}</td>
                <td><span class="risk-pill ${r.risk.toLowerCase()}">${r.risk}</span></td>
                <td>${r.best ? '✅ Best for you' : r.note}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h4 style="margin-top:20px">🌿 Fertilizer Plan Comparison</h4>
        <table class="schedule-table">
          <thead><tr><th>Plan</th><th>NPK Ratio</th><th>Application</th><th>Yield Impact</th><th>Recommendation</th></tr></thead>
          <tbody>
            ${scheduleResults.fertilizer.map(r => `
              <tr class="${r.best ? 'best-row' : ''}">
                <td><strong>${r.name}</strong></td>
                <td>${r.npk}</td>
                <td>${r.schedule}</td>
                <td>${r.yieldImpact}</td>
                <td>${r.best ? '✅ Best for you' : r.note}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Tab: Execution Guide -->
      <div id="tab-guidance" class="analysis-tab-content" style="display:none">
        <div class="guidance-steps">
          ${executionGuide.map((step, i) => `
            <div class="guidance-step">
              <div class="step-number">${i + 1}</div>
              <div class="step-body">
                <h5>${step.title}</h5>
                <p>${step.description}</p>
                ${step.action ? `<div class="step-action">👨‍🌾 Action: ${step.action}</div>` : ''}
                ${step.timeline ? `<div class="step-timeline">⏱️ Timeline: ${step.timeline}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  resultContainer.style.display = 'block';
}

function switchAnalysisTab(tabName, btn) {
  document.querySelectorAll('.analysis-tab-content').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.analysis-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).style.display = 'block';
  btn.classList.add('active');
}

function generateSowingScenarios(pH, moisture, n, p, k) {
  const scenarios = [
    { month: 'June (Kharif Start)', crop: 'Soybean / Cotton', baseScore: 85 },
    { month: 'July (Mid Kharif)', crop: 'Paddy / Maize', baseScore: 78 },
    { month: 'October (Rabi Start)', crop: 'Wheat / Chickpea', baseScore: 72 },
    { month: 'November (Rabi)', crop: 'Mustard / Lentil', baseScore: 65 },
    { month: 'February (Summer)', crop: 'Sunflower / Watermelon', baseScore: 50 },
    { month: 'March (Late Summer)', crop: 'Green Gram / Cowpea', baseScore: 45 },
  ];

  return scenarios.map((s, i) => {
    let score = s.baseScore;
    if (pH >= 6.5 && pH <= 7.5) score += 5;
    if (pH < 6 || pH > 8) score -= 15;
    if (moisture >= 30 && moisture <= 55) score += 5;
    if (moisture < 20) score -= 20;
    if (n >= 150) score += 5;
    if (n < 100) score -= 10;
    score = Math.min(100, Math.max(5, score));

    return {
      ...s,
      score,
      recommended: score === Math.max(...scenarios.map((sc, idx) => {
        let sc2 = sc.baseScore;
        if (pH >= 6.5 && pH <= 7.5) sc2 += 5;
        return Math.min(100, sc2);
      })),
      reason: score > 70 ? 'Soil conditions align well with this season\'s requirements.' :
               score > 40 ? 'Moderate match — some soil improvements recommended first.' :
               'Poor match — correct soil deficiencies before this sowing window.'
    };
  });
}

function autoTestSchedules(pH, moisture, n, p, k) {
  const irrigationStrategies = [
    {
      name: 'Flood Irrigation',
      frequency: 'Every 7 days',
      efficiency: '45–55%',
      risk: moisture < 20 ? 'HIGH' : 'MODERATE',
      best: false,
      note: 'High water wastage'
    },
    {
      name: 'Sprinkler Irrigation',
      frequency: 'Every 4–5 days',
      efficiency: '70–80%',
      risk: 'LOW',
      best: moisture < 40,
      note: 'Good for moderate moisture conditions'
    },
    {
      name: 'Drip Irrigation',
      frequency: 'Daily (automated)',
      efficiency: '90–95%',
      risk: 'LOW',
      best: moisture < 20 || (n >= 150 && p >= 20),
      note: 'Best efficiency but higher setup cost'
    }
  ];

  // Ensure only one "best"
  const bestIrrigation = irrigationStrategies.find(s => s.best) || irrigationStrategies[1];
  irrigationStrategies.forEach(s => s.best = (s === bestIrrigation));

  const fertilizerPlans = [
    {
      name: 'Balanced NPK (Standard)',
      npk: n < 150 ? '20:20:20' : '14:14:14',
      schedule: 'Basal dose at sowing + top dress at 30 days',
      yieldImpact: '+15–25%',
      best: n >= 150 && p >= 20 && k >= 100,
      note: 'For well-balanced soil'
    },
    {
      name: 'Nitrogen-Boost Plan',
      npk: '26:0:0 (Urea heavy)',
      schedule: '3 split doses: sowing, 21 days, 45 days',
      yieldImpact: '+20–30%',
      best: n < 150,
      note: 'When nitrogen is critically low'
    },
    {
      name: 'Micronutrient-Enhanced Plan',
      npk: '12:32:16 + Zinc/Boron',
      schedule: 'Soil test based — basal + foliar spray at flowering',
      yieldImpact: '+25–35%',
      best: p < 20 || k < 100,
      note: 'For phosphorus/potassium deficient soils'
    }
  ];

  const bestFert = fertilizerPlans.find(s => s.best) || fertilizerPlans[0];
  fertilizerPlans.forEach(s => s.best = (s === bestFert));

  return { irrigation: irrigationStrategies, fertilizer: fertilizerPlans };
}

function generateExecutionGuide(issues, riskLevel) {
  const steps = [];

  const dangerIssues = issues.filter(i => i.type === 'danger');
  const warningIssues = issues.filter(i => i.type === 'warning');

  if (dangerIssues.length > 0) {
    steps.push({
      title: '🚨 Immediate Emergency Action (Today)',
      description: dangerIssues.map(i => i.msg).join(' | '),
      action: 'Start emergency irrigation or soil amendment immediately. Do not wait.',
      timeline: 'Within 24 hours'
    });
  }

  if (warningIssues.length > 0) {
    steps.push({
      title: '⚠️ Corrective Measures (This Week)',
      description: warningIssues.map(i => i.msg).join(' '),
      action: 'Visit nearest agricultural supply store. Procure required inputs.',
      timeline: '3–7 days'
    });
  }

  steps.push({
    title: '📊 Soil Re-Testing',
    description: 'After applying corrections, re-test soil to confirm improvement.',
    action: 'Collect 5–10 soil samples from different spots in your farm. Mix and send to KVK or state soil testing lab.',
    timeline: '14–21 days after correction'
  });

  steps.push({
    title: '🌱 Begin Sowing Preparation',
    description: 'Select the highest-compatibility sowing window from the Sowing Dates tab.',
    action: 'Prepare land with 2–3 ploughings. Apply basal fertilizer dose 7 days before sowing.',
    timeline: '7 days before sowing window'
  });

  steps.push({
    title: '💧 Activate Irrigation Schedule',
    description: 'Set up the recommended irrigation system from the schedule tab.',
    action: 'If using drip — install lateral pipes along crop rows, 30 cm apart. Test for uniform water distribution.',
    timeline: 'Before sowing'
  });

  steps.push({
    title: '📅 Weekly Monitoring Routine',
    description: 'After sowing, maintain regular checks every 7 days.',
    action: 'Check: soil moisture with a probe or hand-squeeze test, leaf color (yellowing = N deficiency), presence of pests or disease.',
    timeline: 'Every 7 days post-sowing'
  });

  steps.push({
    title: '📈 Yield Assessment & Record Keeping',
    description: 'After harvest, record inputs used, weather conditions faced, and final yield.',
    action: 'Maintain a farm diary (physical or in this app). Use this data for next season\'s strategy improvement.',
    timeline: 'Post-harvest'
  });

  return steps;
}
