// Supabase Initialization & State Management
const CMC_CONFIG_KEY = 'cmc_supabase_config';
let supabaseClient = null;

function getSupabaseConfig() {
  try {
    const raw = localStorage.getItem(CMC_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { url: '', anonKey: '' };
}

function initSupabase() {
  const cfg = getSupabaseConfig();
  if (cfg.url && cfg.anonKey && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
    } catch (e) {
      console.warn('Could not init Supabase client:', e);
    }
  }
}

function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.borderColor = isSuccess ? '#10b981' : '#ef4444';
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

document.addEventListener('DOMContentLoaded', initSupabase);
