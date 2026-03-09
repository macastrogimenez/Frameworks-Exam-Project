function showToast() {
  const popup = document.createElement("div");
  popup.className = "popup";

  popup.innerHTML = `
        <p>Straight into your basket!</p>
        <div class="checkmark">✓</div>
    `;

  document.body.appendChild(popup);

  // Trigger animation
  setTimeout(() => popup.classList.add("show"), 10);

  // Hide after 2 seconds
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 350);
  }, 1000);
}
