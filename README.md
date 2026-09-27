# MVP 1: The WhatsApp-First Claim Auditor (Low Friction Intake)

> **Part of the ClaimAdvocate Legal-Tech Suite**  
> Focus: Maximum user acquisition, instant value, and low friction.

---

## 🎯 Value Proposition

Users stressed about a rejected insurance claim or a massive hospital bill deduction won’t want to fill out complex 10-page web forms. This MVP taps directly into daily behavior patterns.

* **Core Value Proposition:** Instantly decode why an insurer rejected a claim just by taking a photo on WhatsApp.
* **Instant Verdict Output:** Generates a clean, jargon-free summary and a win-probability score (e.g., *"78% chance of winning based on IRDAI guidelines"*).

---

## 🚀 Key Features

1. **WhatsApp Bot Integration:** Allows users to chat, forward rejection letters, or send voice notes to an official WhatsApp number without downloading an app or registering.
2. **OCR & Document Scanner:** Users snap a photo of their rejection letter, surveyor assessment report, or hospital discharge summary.
3. **AI Policy & Rejection Analyzer:** An LLM backend (backed by OCR text extraction) reads the rejection clause, scans it against common loopholes (like the E20 fuel loophole or vague room-rent capping medical deductions), and highlights whether the insurer is legally in the wrong.
4. **Instant Verdict & Win-Probability Score:** Live calculation comparing dispute grounds against 4,800+ indexed Insurance Ombudsman circulars and Supreme Court rulings.

---

## 🛠️ Architecture & Tech Stack

* **Messaging Layer:** Twilio / WhatsApp Cloud API Webhooks.
* **Vision & OCR Intelligence:** OpenAI GPT-4o / Claude Vision API.
* **Core API Backend:** Python (FastAPI) async microservice.
* **Database & PII Sanitization:** Supabase (PostgreSQL with Row-Level Security) with client-side AES-256 redaction of PAN and Aadhaar cards.

---

## 💻 How to Run Locally

This standalone MVP is 100% self-contained with zero runtime dependencies.

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 2: Local HTTP Server (Python / Node)
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```
Then visit: `http://localhost:8080/`

---

## 📦 Drag & Drop to GitHub Instructions

This folder has been optimized to be **under 25 MB** with zero bloat:
1. Create a new repository on [GitHub](https://github.com/new) named `claimadvocate-mvp1-whatsapp-auditor`.
2. Select **"uploading an existing file"** or drag and drop this entire folder directly into the GitHub web interface.
3. Commit changes to `main` branch.
4. (Optional) Go to **Settings > Pages** to deploy it for free on GitHub Pages!
