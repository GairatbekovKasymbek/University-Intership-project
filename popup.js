document.addEventListener("DOMContentLoaded", function () {
  const scanBtn = document.getElementById("scanBtn");
  const results = document.getElementById("results");
  const loading = document.getElementById("loading");
  const riskLevel = document.getElementById("riskLevel");
  const details = document.getElementById("details");
  const errorMessage = document.getElementById("errorMessage");
  const warningBadges = document.getElementById("warningBadges");

  const recommendationsList = document.getElementById("recommendationsList");

  const btnEn = document.getElementById("btn-en");
  const btnRu = document.getElementById("btn-ru");
  const btnKy = document.getElementById("btn-ky"); // Кнопка для кыргызского

  // Текущий язык: 'en', 'ru' или 'ky'
  let currentLang = "en";

  // Тексты для языков
  const texts = {
    en: {
      scanButton: "Scan Current Email",
      phishingDetector: "✉️ Phishing Detector",
      errorNotSupported:
        "Please open an email in Gmail, Outlook, or Yahoo Mail to scan.",
      analyzing: "Analyzing email... 🔍",
      detectedIssues: "Detected Issues:",
      noIssues: "No suspicious elements detected.",
      recommendationsTitle: "Recommendations:",
      riskLevels: {
        high: "🔴 High Risk - Likely Phishing Attempt",
        suspicious: "🟡 Suspicious - Exercise Caution",
        low: "🟢 Low Risk - No Obvious Red Flags",
      },
      recommendations: {
        high: [
          "Do not click any links in this email",
          "Do not download any attachments",
          "Do not reply to this email",
          "Report this email as phishing",
        ],
        suspicious: [
          "Verify the sender through other means",
          "Do not provide sensitive information",
          "When in doubt, contact the company directly",
        ],
        low: [
          "Always remain vigilant with email communications",
          "Keep your security software up to date",
        ],
      },
      badges: {
        urgency: "🚨 Urgency Tactics",
        links: "🔗 Suspicious Links",
        generic: "👤 Generic/Impersonal",
        sensitive: "⚠️ Asks for Sensitive Info",
        pressure: "🕒 Time Pressure",
        spoofing: "🏢 Possible Spoofing",
      },
      clickToHighlight: "(click to highlight)",
    },
    ru: {
      scanButton: "Сканировать текущее письмо",
      phishingDetector: "✉️ Обнаружитель Фишинга",
      errorNotSupported:
        "Пожалуйста, откройте письмо в Gmail, Outlook или Yahoo Mail для сканирования.",
      analyzing: "Анализ письма... 🔍",
      detectedIssues: "Обнаруженные проблемы:",
      noIssues: "Подозрительных элементов не обнаружено.",
      recommendationsTitle: "Рекомендации:",
      riskLevels: {
        high: "🔴 Высокий риск — вероятная фишинговая атака",
        suspicious: "🟡 Подозрительно — будьте осторожны",
        low: "🟢 Низкий риск — явных признаков нет",
      },
      recommendations: {
        high: [
          "Не переходите по ссылкам в этом письме",
          "Не скачивайте вложения",
          "Не отвечайте на это письмо",
          "Сообщите о письме как о фишинге",
        ],
        suspicious: [
          "Проверьте отправителя другими способами",
          "Не предоставляйте конфиденциальную информацию",
          "В случае сомнений свяжитесь с компанией напрямую",
        ],
        low: [
          "Всегда будьте внимательны при работе с письмами",
          "Обновляйте антивирусное ПО",
        ],
      },
      badges: {
        urgency: "🚨 Тактика срочности",
        links: "🔗 Подозрительные ссылки",
        generic: "👤 Общее/Безличное",
        sensitive: "⚠️ Запрос чувствительной информации",
        pressure: "🕒 Давление по времени",
        spoofing: "🏢 Возможное подделывание",
      },
      clickToHighlight: "(клик — выделить)",
    },
    ky: {
      scanButton: "Учурдагы катты сканерлөө",
      phishingDetector: "✉️ Фишингди аныктоочу",
      errorNotSupported:
        "Сканерлөө үчүн Gmail, Outlook же Yahoo Mailдеги катты ачыңыз.",
      analyzing: "Кат анализделүүдө... 🔍",
      detectedIssues: "Табылган көйгөйлөр:",
      noIssues: "Шектүү элементтер табылган жок.",
      recommendationsTitle: "Кеңештер:",
      riskLevels: {
        high: "🔴 Жогорку тобокелдик — мүмкүн фишинг",
        suspicious: "🟡 Шектүү — сак болуңуз",
        low: "🟢 Төмөн тобокелдик — көрүнүктүү белгилер жок",
      },
      recommendations: {
        high: [
          "Каттагы шилтемелерге баспаңыз",
          "Тиркемелерди жүктөп албаңыз",
          "Бул катка жооп жазбаңыз",
          "Катты фишинг катары билдирүү",
        ],
        suspicious: [
          "Жөнөтүүчүнү башка жолдор менен текшериңиз",
          "Жеке маалымат бербеңиз",
          "Шектүү учурда компания менен түздөн-түз байланышкыла",
        ],
        low: [
          "Кат алмашууда дайыма сак болуңуз",
          "Коопсуздук программаларыңызды жаңылап туруңуз",
        ],
      },
      badges: {
        urgency: "🚨 Өзгөчө кырдаал тактикасы",
        links: "🔗 Шектүү шилтемелер",
        generic: "👤 Жалпы/Жеке эмес",
        sensitive: "⚠️ Жеке маалымат суралып жатат",
        pressure: "🕒 Убакыт басымы",
        spoofing: "🏢 Мүмкүн болгон жасалма",
      },
      clickToHighlight: "(басуу — белгилөө)",
    },
  };

  // Функция для переключения языка в UI
  function updateLanguageUI() {
    const t = texts[currentLang];
    scanBtn.textContent = t.scanButton;
    document.querySelector("h1").textContent = t.phishingDetector;
    loading.textContent = t.analyzing;

    // Обновляем бейджи предупреждений
    for (const [type, label] of Object.entries(t.badges)) {
      const badge = warningBadges.querySelector(`[data-type="${type}"]`);
      if (badge) badge.textContent = label;
    }

    // Если сейчас показываются результаты, обновим их, чтобы поменять язык
    if (results.style.display === "block" && lastAnalysis) {
      displayResults(lastAnalysis);
    }
  }

  // Сохраняем последний анализ для обновления UI при смене языка
  let lastAnalysis = null;

  btnEn.addEventListener("click", () => {
    currentLang = "en";
    updateLanguageUI();
  });

  btnRu.addEventListener("click", () => {
    currentLang = "ru";
    updateLanguageUI();
  });

  btnKy.addEventListener("click", () => {
    currentLang = "ky";
    updateLanguageUI();
  });

  scanBtn.addEventListener("click", async () => {
    // Reset UI
    loading.style.display = "block";
    results.style.display = "none";
    errorMessage.style.display = "none";
    scanBtn.disabled = true;

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const supportedDomains = [
        "mail.google.com",
        "outlook.live.com",
        "outlook.office.com",
        "mail.yahoo.com",
      ];

      const url = new URL(tab.url);
      if (!supportedDomains.includes(url.hostname)) {
        throw new Error(texts[currentLang].errorNotSupported);
      }

      const response = await new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(
          tab.id,
          { action: "getEmailContent" },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
              return;
            }
            if (!response) {
              reject(new Error("Empty response from content script"));
              return;
            }
            resolve(response);
          }
        );
      });

      lastAnalysis = response; // сохраняем для обновления UI
      displayResults(response);
    } catch (error) {
      console.error("Error:", error);
      errorMessage.textContent =
        error.message || "Error analyzing email. Please try again.";
      errorMessage.style.display = "block";
      results.style.display = "none";
    } finally {
      loading.style.display = "none";
      scanBtn.disabled = false;
    }
  });

  async function highlightIssue(text, location) {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      await chrome.tabs.sendMessage(tab.id, {
        action: "highlightText",
        text: text,
        location: location,
      });
    } catch (error) {
      console.error("Error highlighting text:", error);
    }
  }

  function createClickableListItem(issue) {
    const li = document.createElement("li");
    li.textContent = issue.detail;
    li.style.cursor = "pointer";
    li.style.padding = "5px";
    li.style.marginBottom = "5px";
    li.style.borderRadius = "4px";
    li.style.transition = "background-color 0.2s";

    li.addEventListener("mouseenter", () => {
      li.style.backgroundColor = "#f0f0f0";
    });

    li.addEventListener("mouseleave", () => {
      li.style.backgroundColor = "transparent";
    });

    if (issue.text && issue.location) {
      li.addEventListener("click", () => {
        highlightIssue(issue.text, issue.location);
      });

      // Добавляем индикатор кликабельности с учётом языка
      li.innerHTML +=
        ' <span style="color: #6c5ce7; font-size: 12px;">' +
        texts[currentLang].clickToHighlight +
        "</span>";
    }

    return li;
  }

  function displayResults(analysis) {
    results.style.display = "block";

    // Скрыть все бейджи
    warningBadges.querySelectorAll(".badge").forEach((badge) => {
      badge.style.display = "none";
      badge.classList.remove("active");
    });

    let riskClass = "";
    let riskText = "";
    let recommendations = [];
    let activeBadges = new Set();

    // Собираем типы предупреждений
    if (analysis.highRiskFactors) {
      analysis.highRiskFactors.forEach((factor) => {
        activeBadges.add(factor.type);
      });
    }
    if (analysis.warnings) {
      analysis.warnings.forEach((warning) => {
        activeBadges.add(warning.type);
      });
    }

    // Показываем активные бейджи с надписями на нужном языке
    activeBadges.forEach((type) => {
      const badge = warningBadges.querySelector(`[data-type="${type}"]`);
      if (badge) {
        badge.style.display = "flex";
        badge.classList.add("active");
        badge.textContent =
          texts[currentLang].badges[type] || badge.textContent;
      }
    });

    // Устанавливаем уровень риска и рекомендации
    if (analysis.highRiskFactors && analysis.highRiskFactors.length > 0) {
      riskClass = "high-risk";
      riskText = texts[currentLang].riskLevels.high;
      recommendations = texts[currentLang].recommendations.high;
    } else if (analysis.warnings && analysis.warnings.length > 0) {
      riskClass = "suspicious";
      riskText = texts[currentLang].riskLevels.suspicious;
      recommendations = texts[currentLang].recommendations.suspicious;
    } else {
      riskClass = "low-risk";
      riskText = texts[currentLang].riskLevels.low;
      recommendations = texts[currentLang].recommendations.low;
    }

    riskLevel.className = `risk-level ${riskClass}`;
    riskLevel.textContent = riskText;

    if (
      (analysis.highRiskFactors && analysis.highRiskFactors.length > 0) ||
      (analysis.warnings && analysis.warnings.length > 0)
    ) {
      const detailsList = document.createElement("ul");
      detailsList.style.listStyle = "none";
      detailsList.style.padding = "0";

      if (analysis.highRiskFactors) {
        analysis.highRiskFactors.forEach((factor) => {
          detailsList.appendChild(createClickableListItem(factor));
        });
      }

      if (analysis.warnings) {
        analysis.warnings.forEach((warning) => {
          detailsList.appendChild(createClickableListItem(warning));
        });
      }

      details.innerHTML = `<h3>${texts[currentLang].detectedIssues}</h3>`;
      details.appendChild(detailsList);
    } else {
      details.innerHTML = `<p>${texts[currentLang].noIssues}</p>`;
    }

    recommendationsList.innerHTML = recommendations
      .map((rec) => `<li>${rec}</li>`)
      .join("");
    warningBadges.style.display = activeBadges.size > 0 ? "flex" : "none";
  }

  // Инициализация текста при загрузке
  updateLanguageUI();
});
