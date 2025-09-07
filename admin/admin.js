import { addPatchnote } from '../patchnotes/patchnotes.js';

const ADMIN_PASSWORD = 'manoonly';

function checkPassword() {
  const stored = localStorage.getItem('adminPass');
  if (stored === ADMIN_PASSWORD) return true;

  const input = prompt("Enter admin password:");
  if (input === ADMIN_PASSWORD) {
    localStorage.setItem('adminPass', ADMIN_PASSWORD);
    return true;
  } else {
    alert("❌ Wrong password.");
    return false;
  }
}

if (checkPassword()) {
  document.getElementById('adminContent').classList.remove('hidden');
}

document.getElementById('saveBtn').addEventListener('click', async () => {
  const version = document.getElementById("version").value.trim();
  const date = document.getElementById("date").value;

  const rawChanges = document.getElementById("changes").value.trim().split("\n");

  const changes = rawChanges.map(line => {
    const [category, ...rest] = line.split(":");
    return {
      category: category ? category.trim() : "Other",
      text: rest.length ? rest.join(":").trim() : ""
    };
  }).filter(c => c.text.length > 0);

  if (!version || !date || changes.length === 0) {
    alert("❌ Please fill out all fields!");
    return;
  }

  const categories = document.getElementById("categories").value.split(',')
    .map(c => c.trim()).filter(Boolean);

  await addPatchnote(version, date, categories, changes);

  alert("✅ Patchnote saved!");

  document.getElementById("version").value = '';
  document.getElementById("date").value = '';
  document.getElementById("categories").value = '';
  document.getElementById("changes").value = '';
});