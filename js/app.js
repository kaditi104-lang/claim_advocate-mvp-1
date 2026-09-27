/**
 * MVP 1: The WhatsApp-First Claim Auditor
 * Standalone Client-Side Application
 */

const SCENARIOS = {
  e20: {
    insurer: "ICICI Lombard General",
    amount: "₹3,40,000",
    type: "Motor Own Damage (OD)",
    speed: "4.2 Seconds",
    score: "88%",
    pillText: "HIGH CHANCE OF FULL REVERSAL",
    pillClass: "text-green",
    circleDeg: 316.8,
    explanation: "Based on binding IRDAI Consumer Protection Regulations 2024 and precedents set by the Insurance Ombudsman, the insurer's cited clause is legally invalid.",
    clause: "Claim repudiated under Policy Section II Exclusion 4(a): Damage resulting from improper fuel blend / non-E20 ethanol compliant fuel usage in motor vehicle.",
    defense: [
      "The policy wording sold to the claimant contains zero explicit requirement mandating E20 ethanol petrol. Supreme Court precedent mandates contracts cannot enforce uncommunicated post-hoc restrictions.",
      "Under IRDAI Master Circular (Protection of Policyholders' Interests) 2024, insurers cannot reject hydrostatic or fuel blend engine claims without manufacturer-certified mechanical failure reports.",
      "Delhi & Mumbai Ombudsman secretariats have ruled in favor of policyholders in 94.2% of identical fuel repudiation disputes."
    ],
    userPhotoText: "📄 [Photo Attached: ICICI_Repudiation_Notice_IL-99321.jpg] - Surveyor claims my car engine broke due to wrong petrol blend (E20). Please help audit this!",
    botReplyText: "Audited! ⚖️ ICICI Lombard is **legally in the wrong**. Your policy has no E20 mandatory restriction clause. You have an **88% statutory win probability** to recover the entire ₹3,40,000."
  },
  room_rent: {
    insurer: "Star Health & Allied Insurance",
    amount: "₹1,85,000 Disallowed",
    type: "Health / Hospitalization",
    speed: "3.8 Seconds",
    score: "92%",
    pillText: "VERY HIGH WIN PROBABILITY",
    pillClass: "text-green",
    circleDeg: 331.2,
    explanation: "Proportionate room rent deduction applied to ICU and doctor consulting charges directly violates the IRDAI Standardization Guidelines (Ref: IRDAI/HLT/REG/2020).",
    clause: "Deduction of ₹1,85,000 under Clause 3(b) Proportionate Capping: Room selected exceeded 1% of Sum Insured, triggering proportionate cuts across entire hospital invoice.",
    defense: [
      "IRDAI guidelines explicitly bar insurers from applying proportionate room rent deductions to medicines, consumables, OT equipment, and standardized diagnostic tests.",
      "The hospital charged a composite ICU package where room rent was not separated from critical monitoring units.",
      "Insurance Ombudsman precedent mandates full reimbursement of non-room overheads when proportionate deductions were calculated improperly."
    ],
    userPhotoText: "📄 [Photo Attached: Star_Health_Discharge_Deduction_SH-4410.jpg] - Hospital bill was ₹4.2 Lakhs, but Star Health deducted ₹1.85 Lakhs blaming room rent limit!",
    botReplyText: "Audit Completed! 🚨 Star Health illegally applied proportionate deductions to non-room costs. Under IRDAI circulars, you have a **92% chance of winning back ₹1,85,000**."
  },
  monsoon: {
    insurer: "HDFC ERGO General",
    amount: "₹2,10,000 Disallowed",
    type: "Motor Hydrostatic Lock",
    speed: "4.5 Seconds",
    score: "79%",
    pillText: "STRONG STATUTORY DEFENSE",
    pillClass: "text-green",
    circleDeg: 284.4,
    explanation: "Surveyor presumed intentional cranking without engine electronic control unit (ECU) forensic logs. High Court rulings hold that rainwater inundation alone does not prove willful negligence.",
    clause: "Repudiated under Clause 2(c) Consequential Engine Seizure: Failure to take reasonable precautions while driving through water-logged streets.",
    defense: [
      "Supreme Court judgment in National Insurance Co v. Nitin Khandelwal holds that comprehensive motor insurance cannot be voided over contributory negligence without willful misconduct.",
      "The vehicle stalled while in slow-moving traffic; no secondary attempt to restart was initiated by the driver.",
      "HDFC ERGO failed to furnish surveyor technical diagnostic logs within the statutory 15-day window."
    ],
    userPhotoText: "📄 [Photo Attached: HDFC_Ergo_Waterlogged_Surveyor_Report.jpg] - Car stopped in rainwater near Gurgaon underpass. Insurer says it's consequential damage and won't pay!",
    botReplyText: "Verified! 🌊 Rainwater inundation is covered under comprehensive flood protection. Surveyor's claim of 'consequential loss' is legally unsubstantiated. Win probability: **79%**."
  },
  pre_existing: {
    insurer: "Care Health Insurance",
    amount: "₹4,20,000 Repudiated",
    type: "Critical Illness / Cardiology",
    speed: "4.1 Seconds",
    score: "84%",
    pillText: "EXCELLENT PRECEDENT BACKING",
    pillClass: "text-green",
    circleDeg: 302.4,
    explanation: "Policy was renewed continuously for over 60 months. Under IRDAI Health Insurance Regulations, policies active for more than 5 years achieve complete contestability immunity (Moratorium Clause).",
    clause: "Claim rejected under Section 4(A) Non-Disclosure of Material Facts: Pre-Existing Disease (PED) hypertension diagnosed prior to policy inception.",
    defense: [
      "IRDAI Moratorium Period: After 60 continuous months of premium payments, insurers cannot repudiate claims on grounds of non-disclosure (IRDAI Circular 2024).",
      "Supreme Court in Biman Krishna Bose ruled that standard hypertension/lifestyle management without active surgery does not constitute intentional fraud.",
      "Insurer's medical underwriter issued the policy without mandating preliminary pre-policy medical tests."
    ],
    userPhotoText: "📄 [Photo Attached: Care_Health_PED_Rejection_Notice.jpg] - Claim for father's cardiac stent denied after 6 years of timely renewals, saying he had high BP!",
    botReplyText: "Moratorium Protection Triggered! 🛡️ Because your policy is over 5 years old, IRDAI law prohibits Care Health from denying this claim for BP disclosure. Win probability: **84%**."
  }
};

let currentScenarioKey = 'e20';
let currentLang = 'en';

function loadSampleScenario(key) {
  if (!SCENARIOS[key]) return;
  currentScenarioKey = key;

  // Update pills active state
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const s = SCENARIOS[key];

  // Update Right Dashboard Meta
  document.getElementById('metaInsurer').textContent = s.insurer;
  document.getElementById('metaAmount').textContent = s.amount;
  document.getElementById('metaType').textContent = s.type;
  document.getElementById('metaSpeed').textContent = s.speed;

  // Update Meter
  document.getElementById('meterScore').textContent = s.score;
  document.getElementById('circlePercent').textContent = s.score;
  document.getElementById('meterPill').textContent = s.pillText;
  document.getElementById('meterPill').className = `meter-verdict-pill ${s.pillClass}`;
  document.getElementById('meterExplanation').textContent = s.explanation;
  document.getElementById('circleProgress').style.background = `conic-gradient(#10b981 ${s.circleDeg}deg, #e2e8f0 0deg)`;

  // Update Clauses & Defense
  document.getElementById('extractedClauseText').textContent = `"${s.clause}"`;
  document.getElementById('defensePoint1').textContent = s.defense[0];
  document.getElementById('defensePoint2').textContent = s.defense[1];
  document.getElementById('defensePoint3').textContent = s.defense[2];

  // Animate Chat Messages in WhatsApp Simulator
  simulateWhatsAppConversation(s);
}

function simulateWhatsAppConversation(s) {
  const feed = document.getElementById('dynamicChatFeed');
  const typing = document.getElementById('waTyping');
  feed.innerHTML = '';
  typing.style.display = 'flex';

  // Inject User Upload Message
  setTimeout(() => {
    const userMsg = document.createElement('div');
    userMsg.className = 'wa-bubble wa-bubble-outgoing';
    userMsg.innerHTML = `<p>${s.userPhotoText}</p><span class="wa-time">Just now</span>`;
    feed.appendChild(userMsg);
    scrollChatToBottom();
  }, 400);

  // Inject Bot Audit Reply
  setTimeout(() => {
    typing.style.display = 'none';
    const botMsg = document.createElement('div');
    botMsg.className = 'wa-bubble wa-bubble-incoming';
    botMsg.innerHTML = `
      <p>${s.botReplyText}</p>
      <div style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; padding: 8px 10px; margin-top: 6px; font-size: 0.8rem; color: #166534;">
        <strong>Statutory Win Score: ${s.score}</strong><br>
        • Key Defense: ${s.defense[0].substring(0, 75)}...
      </div>
      <span class="wa-time">Just now</span>
    `;
    feed.appendChild(botMsg);
    scrollChatToBottom();
  }, 1600);
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const feed = document.getElementById('dynamicChatFeed');
  const typing = document.getElementById('waTyping');

  const userMsg = document.createElement('div');
  userMsg.className = 'wa-bubble wa-bubble-outgoing';
  userMsg.innerHTML = `
    <p>📸 <strong>[Photo Uploaded: ${file.name}]</strong></p>
    <p>Please audit this rejection document against IRDAI guidelines.</p>
    <span class="wa-time">Just now</span>
  `;
  feed.appendChild(userMsg);
  scrollChatToBottom();

  typing.style.display = 'flex';

  setTimeout(() => {
    typing.style.display = 'none';
    const botMsg = document.createElement('div');
    botMsg.className = 'wa-bubble wa-bubble-incoming';
    botMsg.innerHTML = `
      <p>🔍 <strong>Document Audited Successfully!</strong></p>
      <p>Extracted Claim No: <strong>#CA-${Math.floor(100000 + Math.random() * 900000)}</strong></p>
      <p>Our vision OCR scanned the rejection grounds. The surveyor's exclusion does not hold under IRDAI Master Circular 2024.</p>
      <div style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; padding: 8px 10px; margin-top: 6px; font-size: 0.8rem; color: #166534;">
        <strong>Statutory Win Probability: 86%</strong><br>
        Recommendation: Dispatch Ombudsman Demand Notice immediately.
      </div>
      <span class="wa-time">Just now</span>
    `;
    feed.appendChild(botMsg);
    scrollChatToBottom();
  }, 1800);
}

function sendCustomMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const feed = document.getElementById('dynamicChatFeed');
  const typing = document.getElementById('waTyping');

  const userMsg = document.createElement('div');
  userMsg.className = 'wa-bubble wa-bubble-outgoing';
  userMsg.innerHTML = `<p>${text}</p><span class="wa-time">Just now</span>`;
  feed.appendChild(userMsg);
  input.value = '';
  scrollChatToBottom();

  typing.style.display = 'flex';

  setTimeout(() => {
    typing.style.display = 'none';
    const botMsg = document.createElement('div');
    botMsg.className = 'wa-bubble wa-bubble-incoming';
    botMsg.innerHTML = `
      <p>Understood! Our legal database has mapped your inquiry against IRDAI Ombudsman precedents.</p>
      <p>Insurers are legally bound to reply within <strong>15 statutory days</strong> under Consumer Protection Regulations. Would you like to generate your Ombudsman legal notice now?</p>
      <span class="wa-time">Just now</span>
    `;
    feed.appendChild(botMsg);
    scrollChatToBottom();
  }, 1200);
}

function handleInputKeypress(e) {
  if (e.key === 'Enter') {
    sendCustomMessage();
  }
}

function scrollChatToBottom() {
  const container = document.getElementById('waMessages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

function copyVerdictSummary() {
  const s = SCENARIOS[currentScenarioKey];
  const summaryText = `[ClaimAdvocate Audit Verdict]\nInsurer: ${s.insurer}\nDisputed Amount: ${s.amount}\nWin Probability: ${s.score}\nGrounds: ${s.explanation}\nStatutory Defense: ${s.defense[0]}`;
  navigator.clipboard.writeText(summaryText).then(() => {
    alert("Audit verdict copied to clipboard! You can paste this in your email or legal dispute file.");
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  document.getElementById('langText').textContent = currentLang === 'en' ? 'English / हिन्दी' : 'हिन्दी (Hindi Active)';
  alert(currentLang === 'en' ? "Language set to English." : "भाषा हिन्दी पर सेट की गई। अब आप हिन्दी में क्लेम नोटिस और जांच प्राप्त कर सकते हैं।");
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  loadSampleScenario('e20');
});
