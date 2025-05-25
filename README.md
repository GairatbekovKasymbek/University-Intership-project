# 🛡 Phishing Detector — Chrome Extension

Email Phishing Detector is a Chrome extension designed to help users quickly identify and understand potential phishing threats within their emails AND detect bad websites from local storage. Using lightweight analysis methods, visual indicators, and user-friendly design, the extension makes email protection simple and accessible.

> 📌 *With phishing scams becoming increasingly common in Kyrgyzstan and globally, this tool offers a practical and accessible solution for staying secure online.*

---

## 🌍 Language Support

The extension currently supports:
- 🇬🇧 English
- 🇷🇺 Russian
- 🇰🇬 Kyrgyz  
Users can easily switch between languages from the interface.

---

## ✨ Key Features

### 🔎 Real-Time Detection
- Instantly scans open emails in supported providers
- Flags potential phishing indicators such as:
  - Urgent or manipulative language
  - Suspicious or obfuscated URLs
  - Impersonal or generic greetings
  - Unusual requests for sensitive information
  - Pressure-based tactics and fake deadlines
  - Possible spoofed senders

### 🎯 Risk Level Classification
- Emails are labeled with one of three levels:
  - 🔴 High Risk – Very likely a phishing attempt
  - 🟡 Suspicious – Needs careful attention
  - 🟢 Low Risk – No immediate concerns

### 💬 Interactive Feedback
- Highlights detected issues directly in the email
- Shows visual badges for each threat type
- Offers short explanations and suggestions for each problem
- Actionable recommendations based on risk level

### 📧 Compatible Email Services
- Gmail  
- Outlook  
- Yahoo Mail  
*(Support for additional services is planned)*

---

## 🚀 Installation Guide

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/email-phishing-detector.git

Open Chrome and go to chrome://extensions/

Enable Developer Mode in the top-right corner

Click Load unpacked and select the project folder

The extension icon should now be visible in your Chrome toolbar

## ▶️ How to Use
Open an email from Gmail, Outlook, or Yahoo Mail

Click the Email Phishing Detector icon in your browser

Press Scan Current Email

View the analysis report:

Overall risk score

Badges and descriptions of identified issues

Highlighted content in the email

Tailored recommendations

+++ PLUS +++

auto detect bad list websites and warning via modal (popup) window


## 🗂 Project Structure

email-phishing-detector/
├── manifest.json         # Chrome extension config
├── popup.html            # Extension UI
├── popup.js              # Frontend logic
├── content.js            # Email scanning logic (injected)
└── images/               # Icons and visual assets

## 🧠 Detection Logic
The extension scans emails for:

Suspicious sender domains

Known phishing keywords and phrases

Pressure tactics and time-sensitive language

Unsafe or misleading URL patterns

Generic greetings

Requests for credentials or payments

## 🔐 Security & Privacy
Fully local: all scanning is done in your browser

No data leaves your device. We do not request your data or store it in any form

Your emails, personal data, and login credentials are never stored or transmitted. Because we do not request it.

No third-party tracking or analytics

## 🚧 Future Plans
 Expand support to other email platforms (e.g. ProtonMail, Zoho) 

 Integrate AI/ML-based phishing detection

 Add custom scanning rules

 Save scan history (locally) 
 
 Multi-email (bulk) scanning support 

 Integration with global phishing databases 

 Exportable scan reports (PDF, CSV) 

We welcome contributions and ideas!
Reach out via: burglarbarrelrider@gmail.com
# 🛡 Stay safe, stay informed — protect yourself from phishing with just one click!
