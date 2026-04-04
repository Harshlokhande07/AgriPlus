// dashboard.js - Dashboard functionality
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.dashboard-section').forEach(sec => {
    sec.classList.remove('active');
  });
  
  // Show selected section
  const section = document.getElementById(`section-${sectionName}`);
  if (section) {
    section.classList.add('active');
  }
  
  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionName) {
      item.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidebar navigation
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      showSection(item.dataset.section);
    });
  });
});
