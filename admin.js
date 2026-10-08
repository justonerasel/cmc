// Admin Panel Logic
document.addEventListener('DOMContentLoaded', () => {
  const gateEl = document.getElementById('admin-auth-gate');
  const dashEl = document.getElementById('admin-dashboard');
  const logoutBtn = document.getElementById('admin-logout-btn');

  function checkAdmin() {
    const session = JSON.parse(localStorage.getItem('cmc_auth_session') || '{}');
    if (session.role === 'admin' || session.email === 'admin@cmc.community') {
      gateEl.style.display = 'none';
      dashEl.style.display = 'block';
      loadAdminData();
    } else {
      gateEl.style.display = 'block';
      dashEl.style.display = 'none';
    }
  }

  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-email').value;
      const pass = document.getElementById('admin-pass').value;
      if (email.includes('admin') || pass === 'cmcadmin2026') {
        localStorage.setItem('cmc_auth_session', JSON.stringify({ email, role: 'admin' }));
        showToast('Admin Access Granted');
        checkAdmin();
      } else {
        showToast('Invalid administrator credentials', false);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('cmc_auth_session');
      showToast('Admin session terminated');
      checkAdmin();
    });
  }

  function loadAdminData() {
    const messages = JSON.parse(localStorage.getItem('cmc_messages') || '[]');
    const msgList = document.getElementById('admin-messages-list');
    if (msgList) {
      if (messages.length === 0) {
        msgList.innerHTML = '<p class="text-muted">No messages received yet.</p>';
      } else {
        msgList.innerHTML = messages.map(m => `
          <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8;">
              <strong>${m.name} (${m.contact})</strong>
              <span>${new Date(m.created_at).toLocaleDateString()}</span>
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.95rem;">${m.message}</p>
          </div>
        `).join('');
      }
    }
  }

  checkAdmin();
});
