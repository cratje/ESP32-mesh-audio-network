// Function to copy code text
function copyCode(button) {
  const code = button.nextElementSibling.innerText;
  const lang = document.body.classList.contains("lang-nl") ? "nl" : "en";
  navigator.clipboard.writeText(code).then(() => {
    button.textContent = lang === "nl" ? "Gekopieerd!" : "Copied!";
    setTimeout(() => {
      button.textContent = lang === "nl" ? button.dataset.nl : button.dataset.en;
    }, 1500);
  });
}

// Load external code into each .code-box
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".code-box").forEach(box => {
    const file = box.getAttribute("data-file");
    const codeEl = box.querySelector("code");
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(text => {
          codeEl.textContent = text;
          codeEl.removeAttribute("data-loading-en");
          codeEl.removeAttribute("data-loading-nl");
        })
        .catch(err => {
          const lang = document.body.classList.contains("lang-nl") ? "nl" : "en";
          codeEl.textContent = (lang === "nl" ? "⚠️ Kon code niet laden: " : "⚠️ Unable to load code: ") + err;
        });
    }
  });

  initLanguageToggle();
});

// Language toggle
function applyLanguage(lang) {
  const body = document.body;
  if (lang === "nl") {
    body.classList.add("lang-nl");
  } else {
    body.classList.remove("lang-nl");
  }
  document.documentElement.lang = lang;

  // Update the copy button label(s) to match the active language,
  // unless it's currently showing a temporary "Copied!" message.
  document.querySelectorAll(".copy-btn").forEach(btn => {
    if (btn.textContent !== "Copied!" && btn.textContent !== "Gekopieerd!") {
      btn.textContent = lang === "nl" ? btn.dataset.nl : btn.dataset.en;
    }
  });

  // Update the "loading code" placeholder if the code hasn't loaded yet.
  document.querySelectorAll(".code-box code[data-loading-en]").forEach(codeEl => {
    codeEl.textContent = lang === "nl" ? codeEl.dataset.loadingNl : codeEl.dataset.loadingEn;
  });

  try {
    localStorage.setItem("cratje-lang", lang);
  } catch (e) {
    // localStorage unavailable (e.g. private browsing) — ignore, language just won't persist.
  }
}

function initLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");
  let lang = "en";
  try {
    const saved = localStorage.getItem("cratje-lang");
    if (saved === "nl" || saved === "en") {
      lang = saved;
    } else if (navigator.language && navigator.language.toLowerCase().startsWith("nl")) {
      lang = "nl";
    }
  } catch (e) {
    if (navigator.language && navigator.language.toLowerCase().startsWith("nl")) {
      lang = "nl";
    }
  }

  applyLanguage(lang);

  toggleBtn.addEventListener("click", () => {
    const next = document.body.classList.contains("lang-nl") ? "en" : "nl";
    applyLanguage(next);
  });
}