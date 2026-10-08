// Homepage Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Visitor counter
  let count = parseInt(localStorage.getItem('cmc_visitor_counter') || '1482', 10);
  if (!sessionStorage.getItem('cmc_visited')) {
    count += 1;
    localStorage.setItem('cmc_visitor_counter', count.toString());
    sessionStorage.setItem('cmc_visited', 'true');
  }
  const counterEl = document.getElementById('visitor-count');
  if (counterEl) {
    counterEl.textContent = count.toLocaleString();
  }

  // 2. Load Announcements
  const announcementsContainer = document.getElementById('announcements-container');
  if (announcementsContainer) {
    const defaultAnnouncements = [
      {
        title: 'CMC V1 Platform Operational Launch',
        category: 'Release',
        date: 'October 2026',
        content: 'Official launch of the Cyber Muslim Community (CMC) V1 private digital hub. Architected by MD RASEL HOSSEN.'
      },
      {
        title: 'Strict Zero-Payment Discipline Enforced',
        category: 'Security',
        date: 'October 2026',
        content: 'No bKash, no Nagad, no Rocket, no card transactions. CMC is permanently non-monetized.'
      }
    ];

    announcementsContainer.innerHTML = defaultAnnouncements.map(item => `
      <div class="announcement-card">
        <div class="announcement-meta">
          <span>[${item.category}]</span>
          <span>${item.date}</span>
        </div>
        <h3 style="font-size: 1.15rem; margin-bottom: 0.4rem;">${item.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${item.content}</p>
      </div>
    `).join('');
  }

  // 3. Message Drop Form
  const msgForm = document.getElementById('message-form');
  if (msgForm) {
    msgForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('msg-name').value || 'Anonymous Member';
      const contact = document.getElementById('msg-contact').value || 'None';
      const body = document.getElementById('msg-body').value;

      const saved = JSON.parse(localStorage.getItem('cmc_messages') || '[]');
      saved.unshift({
        id: 'msg-' + Date.now(),
        name,
        contact,
        message: body,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('cmc_messages', JSON.stringify(saved));

      msgForm.reset();
      showToast('Message Sent Successfully! Delivered to CMC Administration.');
    });
  }
});
