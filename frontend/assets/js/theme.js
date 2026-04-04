// theme.js - Dark mode and theme switching
function initTheme() {
  const savedTheme = localStorage.getItem('agripuls-theme') || 'light';
  document.body.className = `${savedTheme}-mode`;
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.className;
      const newTheme = current.includes('dark') ? 'light' : 'dark';
      document.body.className = `${newTheme}-mode`;
      localStorage.setItem('agripuls-theme', newTheme);
    });
  }
}

document.addEventListener('DOMContentLoaded', initTheme);
