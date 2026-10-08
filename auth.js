// Auth Page Logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const pass = document.getElementById('login-pass').value;
      const role = (email.includes('admin') || pass === 'cmcadmin2026') ? 'admin' : 'member';
      localStorage.setItem('cmc_auth_session', JSON.stringify({ email, role }));
      showToast('Authentication Successful');
      setTimeout(() => {
        window.location.href = role === 'admin' ? 'admin.html' : 'media.html';
      }, 1000);
    });
  }
});
