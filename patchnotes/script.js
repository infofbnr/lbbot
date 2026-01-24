import { deletePatchnote } from './patchnotes.js';

// Prevent HTML injection
function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Category color mapping
function getCategoryColor(category = "") {
  if (/fix/i.test(category)) return "text-red-400";
  if (/feature/i.test(category)) return "text-green-400";
  if (/change/i.test(category)) return "text-yellow-400";
  if (/remove/i.test(category)) return "text-purple-400";
  return "text-gray-200";
}

export function renderPatchnotes(container, patchnotes, isAdmin = false) {
  container.innerHTML = "";

  patchnotes.forEach(note => {
    const card = document.createElement("div");
    card.id = `patch-${note.id}`;
    card.className = `
      bg-gray-800 p-6 rounded-2xl mb-6 shadow-lg
      border-l-4 border-teal-400 select-none
      hover:shadow-2xl hover:-translate-y-1 transition
    `;

    const changesHTML = note.changes.map(change => `
      <li class="${getCategoryColor(change.category)}">
        <span class="font-semibold">
          [${escapeHTML(change.category)}]
        </span>
        ${escapeHTML(change.text)}
      </li>
    `).join("");

    const categoriesHTML = note.categories?.length
      ? `<p class="italic text-teal-300 mb-3">
          ${note.categories.map(escapeHTML).join(", ")}
        </p>`
      : "";

    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-extrabold">
          v${escapeHTML(note.version)} – ${escapeHTML(note.date)}
        </h2>

        ${isAdmin ? `
          <button class="deleteBtn" data-id="${note.id}">
            <img
              src="../picture/delete.png"
              alt="Delete"
              class="w-6 h-6 hover:opacity-80"
            >
          </button>
        ` : ""}
      </div>

      ${categoriesHTML}

      <ul class="list-disc list-inside space-y-1">
        ${changesHTML}
      </ul>

      <button
        class="shareBtn mt-4 bg-teal-500 hover:bg-teal-600
               px-4 py-2 rounded-full font-semibold shadow-md transition"
        data-id="${note.id}"
      >
        Share
      </button>
      <button
        class="mt-6 bg-purple-600 hover:bg-purple-700
              px-6 py-3 rounded-full font-bold shadow-lg transition"
        onclick='generateShareImage(${JSON.stringify(note)})'
      >
        🖼 Share as Image
      </button>

    `;

    container.appendChild(card);
  });

  // Share buttons (FIXED)
  container.querySelectorAll(".shareBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const text = `Check out this patchnote: ${location.origin}/patchnotes/#patch-${id}`;

      try {
        await navigator.clipboard.writeText(text);
        alert("📋 Patchnote link copied!");
      } catch {
        prompt("Copy this link:", text);
      }
    });
  });

  // Delete buttons (admin only)
  if (isAdmin) {
    container.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this patchnote?")) return;
        await deletePatchnote(btn.dataset.id);
        btn.closest("div").remove();
      });
    });
  }
}
window.generateShareImage = function (note) {
  const card = document.getElementById("shareCard");
  const versionEl = document.getElementById("shareVersion");
  const changesEl = document.getElementById("shareChanges");

  versionEl.textContent = `v${note.version}`;

  const emoji = {
    Fix: "🐞",
    Feature: "✨",
    Change: "⚡",
    Remove: "🗑️"
  };

  const highlights = (note.changes ?? [])
    .filter(c => /fix|feature|change/i.test(c.category))
    .slice(0, 4);

  changesEl.innerHTML = highlights.map(c => `
    <div>
      ${emoji[c.category] ?? "•"} ${c.text}
    </div>
  `).join("");

  html2canvas(card, {
    scale: 2,
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `lbbot-v${note.version}.png`;
    link.click();
  });
};

