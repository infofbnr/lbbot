import { deletePatchnote } from './patchnotes.js';

function escapeHTML(str) {
  if (!str) str = ""; // default to empty string if undefined/null
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderPatchnotes(container, patchnotes, isAdmin = false) {
  container.innerHTML = '';
  patchnotes.forEach(note => {
    const div = document.createElement('div');
    div.className = `
      bg-gray-800 p-6 rounded-2xl mb-6 shadow-lg 
      select-none border-l-4 border-teal-400
      hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200
    `;

    const patchUrl = `${window.location.origin}${window.location.pathname}#patch-${note.id}`;

    // Render changes with color per category
    const changeList = note.changes.map(change => {
      let colorClass = "text-gray-200"; // default
      if (/fix/i.test(change.category)) colorClass = "text-red-400";
      else if (/feature/i.test(change.category)) colorClass = "text-green-400";
      else if (/change/i.test(change.category)) colorClass = "text-yellow-400";
      else if (/remove/i.test(change.category)) colorClass = "text-purple-400";

      return `
        <li class="${colorClass}">
          <span class="font-semibold">[${escapeHTML(change.category)}]</span> 
          ${escapeHTML(change.text)}
        </li>
      `;
    }).join('');

    // Render categories at the top of the patchnote
    const categoriesHTML = note.categories && note.categories.length
      ? `<p class="text-teal-300 italic mb-3">${note.categories.map(c => escapeHTML(c)).join(', ')}</p>`
      : '';

    div.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-extrabold text-white">v${escapeHTML(note.version)} - ${escapeHTML(note.date)}</h2>
        ${isAdmin ? `<button class="deleteBtn" data-id="${note.id}">
          <img src="../picture/delete.png" alt="delete" class="w-6 h-6 hover:opacity-80">
        </button>` : ""}
      </div>
      ${categoriesHTML}
      <ul class="list-disc list-inside space-y-1">
        ${changeList}
      </ul>
      <button class="shareBtn mt-4 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition"
        data-url="${patchUrl}" data-version="${escapeHTML(note.version)}">
        Share
      </button>
    `;

    div.id = `patch-${note.id}`;
    container.appendChild(div);
  });

  // Share button listeners
  container.querySelectorAll('.shareBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.url;
      const version = btn.dataset.version;
      const text = `Check out patchnote ${version}: ${url}`;
      try {
        await navigator.clipboard.writeText(text);
        alert("📋 Patchnote link copied to clipboard!");
      } catch {
        prompt("Copy this link:", text);
      }
    });
  });

  // Delete button listeners (only if admin)
  if (isAdmin) {
    container.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (confirm("Are you sure you want to delete this patchnote?")) {
          await deletePatchnote(id);
          btn.closest('div').remove();
        }
      });
    });
  }
}
