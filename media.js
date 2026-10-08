// Media Hub Logic & Gate Protection
document.addEventListener('DOMContentLoaded', () => {
  const gateEl = document.getElementById('media-gate');
  const contentEl = document.getElementById('media-content');
  const logoutBtn = document.getElementById('logout-btn');
  const gridEl = document.getElementById('media-grid');

  const defaultMedia = [
    {
      id: 'm1',
      title: 'CMC Companion Android APK',
      desc: 'Official Android companion application. Verified SHA-256 signature.',
      type: 'apk',
      filename: 'cmc-companion-v1.0.apk',
      size: '14.8 MB'
    },
    {
      id: 'm2',
      title: 'CMC Digital Sovereignty Whitepaper',
      desc: 'Manifesto on cybersecurity, data ownership, and self-hosted privacy.',
      type: 'document',
      filename: 'CMC_Privacy_Manifesto.pdf',
      size: '2.4 MB'
    },
    {
      id: 'm3',
      title: 'Cybersecurity & Ethical Computing Audio',
      desc: 'Audio masterclass on maintaining opsec and professional integrity.',
      type: 'audio',
      filename: 'cyber_ethics_briefing.mp3',
      size: '8.9 MB'
    },
    {
      id: 'm4',
      title: 'Encrypted Vault Schematic Diagram',
      desc: 'Technical infrastructure diagram of the storage mesh.',
      type: 'image',
      filename: 'cmc_vault_schematic.png',
      size: '4.2 MB'
    },
    {
      id: 'm5',
      title: 'Platform Overview Keynote Video',
      desc: 'Video tour of community architecture and safeguards.',
      type: 'video',
      filename: 'cmc_intro_keynote.mp4',
      size: '38.5 MB'
    }
  ];

  function checkSession() {
    const session = localStorage.getItem('cmc_auth_session');
    if (session) {
      gateEl.style.display = 'none';
      contentEl.style.display = 'block';
      logoutBtn.style.display = 'inline-flex';
      renderMedia('all');
    } else {
      gateEl.style.display = 'block';
      contentEl.style.display = 'none';
      logoutBtn.style.display = 'none';
    }
  }

  function renderMedia(filterType) {
    if (!gridEl) return;
    const items = defaultMedia.filter(item => filterType === 'all' || item.type === filterType);
    gridEl.innerHTML = items.map(item => `
      <div class="media-card">
        <div>
          <span class="media-tag">[${item.type.toUpperCase()}]</span>
          <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">${item.title}</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;">${item.desc}</p>
          <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 1rem;">
            File: ${item.filename} &bull; Size: ${item.size}
          </div>
        </div>
        <button class="btn btn-primary w-full" onclick="downloadMedia('${item.filename}')">
          Download ${item.type.toUpperCase()}
        </button>
      </div>
    `).join('');
  }

  window.downloadMedia = (filename) => {
    showToast(`Initiating verified download for ${filename}...`);
  };

  const gateForm = document.getElementById('gate-login-form');
  if (gateForm) {
    gateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('gate-email').value;
      const pass = document.getElementById('gate-pass').value;
      if (pass.length >= 6) {
        localStorage.setItem('cmc_auth_session', JSON.stringify({ email, role: 'member' }));
        showToast('Access Granted to CMC Private Media Vault');
        checkSession();
      } else {
        showToast('Password must be at least 6 characters', false);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('cmc_auth_session');
      showToast('Logged out of Media Vault');
      checkSession();
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMedia(btn.getAttribute('data-type'));
    });
  });

  checkSession();
});
