// Function to copy code text
function copyCode(button) {
  const code = button.nextElementSibling.innerText;
  navigator.clipboard.writeText(code).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => button.textContent = "Copy", 1500);
  });
}

// Load external code into each .code-box
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".code-box").forEach(box => {
    const file = box.getAttribute("data-file");
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(text => {
          box.querySelector("code").textContent = text;
        })
        .catch(err => {
          box.querySelector("code").textContent = "⚠️ Unable to load code: " + err;
        });
    }
  });
});