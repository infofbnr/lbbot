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
  const version = document.getElementById('version').value.trim();
  const date = document.getElementById('date').value;
  const categories = document.getElementById('categories').value.split(',').map(c => c.trim()).filter(Boolean);
  const changes = document.getElementById('changes').value.split('\n').map(c => c.trim()).filter(Boolean);

  if (!version || !date || !changes.length) {
    alert("Please fill out all fields!");
    return;
  }

  await addPatchnote(version, date, categories, changes);
  alert("✅ Patchnote saved!");

  document.getElementById('version').value = '';
  document.getElementById('date').value = '';
  document.getElementById('categories').value = '';
  document.getElementById('changes').value = '';
});
