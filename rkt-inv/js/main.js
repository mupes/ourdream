/* ─────────────────────────────────────────────────
   main.js — Wedding Invitation Logic
   ───────────────────────────────────────────────── */

// ── GUEST NAME FROM URL ──────────────────────────
(function readGuestFromURL() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('to') || params.get('nama');
  if (name) {
    const el = document.getElementById('guest-name');
    if (el) el.textContent = decodeURIComponent(name);
  }
})();

// ── PETAL ANIMATION ─────────────────────────────
(function createPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${6 + Math.random() * 8}px;
      height: ${8 + Math.random() * 10}px;
      animation-duration: ${5 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 6}s;
      opacity: ${0.3 + Math.random() * 0.5};
      border-radius: ${Math.random() > 0.5 ? '0 100% 0 100%' : '100% 0 100% 0'};
    `;
    container.appendChild(p);
  }
})();

// ── OPEN INVITATION ─────────────────────────────
document.getElementById('openBtn')?.addEventListener('click', function () {
  const cover = document.getElementById('cover');
  const main  = document.getElementById('mainContent');

  cover.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  cover.style.opacity = '0';
  cover.style.transform = 'scale(0.96)';

  setTimeout(() => {
    cover.style.display = 'none';
    main.classList.remove('hidden');
    main.classList.add('visible');
    // Try autoplay music
    bgMusic.play().catch(() => {});
    startCountdown();
    initObserver();
    initGallery();
    renderStoredRSVP();
  }, 800);
});

// ── COUNTDOWN ───────────────────────────────────
const WEDDING_DATE = new Date('2025-06-14T08:00:00');

function startCountdown() {
  function tick() {
    const diff = WEDDING_DATE - new Date();
    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<p style="color:var(--gold);font-family:var(--ff-serif);font-size:1.5rem;font-style:italic">Hari Bahagia Telah Tiba! 🎉</p>';
      return;
    }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// ── ADD TO CALENDAR ─────────────────────────────
document.getElementById('calendarBtn')?.addEventListener('click', function () {
  const title = encodeURIComponent('Pernikahan Arjuna & Sinta');
  const start = '20250614T080000';
  const end   = '20250614T140000';
  const loc   = encodeURIComponent('Jakarta, Indonesia');
  const url   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${loc}`;
  window.open(url, '_blank');
});

// ── SCROLL ANIMATION OBSERVER ───────────────────
function initObserver() {
  const els = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

// ── GALLERY LIGHTBOX ─────────────────────────────
function initGallery() {
  const items    = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightboxImg');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src || item.style.backgroundImage.replace(/url\(["']?|["']?\)/g, '');
      img.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ── RSVP FORM ────────────────────────────────────
const STORAGE_KEY = 'wedding_rsvp_v1';

function renderStoredRSVP() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const container = document.getElementById('rsvpMessages');
  if (!container) return;
  container.innerHTML = '';
  stored.slice().reverse().forEach(item => appendMessage(item));
}

function appendMessage(item) {
  const container = document.getElementById('rsvpMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'rsvp-message-item';
  div.innerHTML = `
    <div class="rsvp-msg-name">${escapeHtml(item.name)}</div>
    <div class="rsvp-msg-attend">${item.attend === 'hadir' ? '✅ Insya Allah Hadir' : '❌ Berhalangan Hadir'} · ${item.guests} orang</div>
    ${item.message ? `<div class="rsvp-msg-text">"${escapeHtml(item.message)}"</div>` : ''}
  `;
  container.prepend(div);
}

document.getElementById('rsvpSubmit')?.addEventListener('click', function () {
  const name    = document.getElementById('rsvpName').value.trim();
  const phone   = document.getElementById('rsvpPhone').value.trim();
  const message = document.getElementById('rsvpMessage').value.trim();
  const attend  = document.querySelector('input[name="attend"]:checked')?.value;
  const guests  = document.getElementById('rsvpGuests').value;

  if (!name || !phone || !attend) {
    showToast('⚠️ Mohon lengkapi data yang wajib diisi.');
    return;
  }

  const data = { name, phone, message, attend, guests, time: new Date().toISOString() };
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  stored.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

  appendMessage(data);
  showToast('🎉 Terima kasih! Konfirmasi berhasil dikirim.');

  // Reset form
  document.getElementById('rsvpName').value = '';
  document.getElementById('rsvpPhone').value = '';
  document.getElementById('rsvpMessage').value = '';
  document.querySelector('input[name="attend"]').checked = false;
  if (document.querySelector('input[name="attend"]:checked')) {
    document.querySelector('input[name="attend"]:checked').checked = false;
  }
  document.querySelectorAll('input[name="attend"]').forEach(r => r.checked = false);
  document.getElementById('rsvpGuests').value = '1';
});

// ── COPY TO CLIPBOARD ───────────────────────────
window.copyText = function (text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Tersalin!';
    btn.classList.add('copied');
    showToast('📋 Nomor rekening tersalin!');
    setTimeout(() => {
      btn.textContent = 'Salin Nomor';
      btn.classList.remove('copied');
    }, 2000);
  });
};

// ── MUSIC ────────────────────────────────────────
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

bgMusic.volume = 0.35;

musicToggle?.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.classList.add('paused');
    isPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.classList.remove('paused');
      isPlaying = true;
    });
  }
});

// ── SHARE ────────────────────────────────────────
window.shareWA = function () {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Anda diundang ke Pernikahan Arjuna & Sinta 🌸\nSabtu, 14 Juni 2025\n\nBuka undangan di sini:');
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
};

window.shareCopy = function () {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('🔗 Link undangan tersalin!');
  });
};

// ── TOAST ────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── ESCAPE HTML ──────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
