/* ===================================================
   PPDB PORTAL — Sekolah Global Nusantara
   script.js — Form Validation & Toast Notification
   =================================================== */

// ─── Toast Utility ──────────────────────────────────
let toastTimer = null;

/**
 * Tampilkan Custom Toast Notification
 * @param {string} message  - 
 * @param {'success'|'error'} type -
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  
  toast.classList.remove('show', 'toast-error');

  
  const icon = type === 'success' ? '✅' : '❌';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;

  if (type === 'error') toast.classList.add('toast-error');

  
  void toast.offsetWidth;
  toast.classList.add('show');

  
  if (toastTimer) clearTimeout(toastTimer);

  
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


(function markActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


(function initForm() {
  const btn = document.getElementById('btn-kirim');
  if (!btn) return; // Hanya berjalan di form.html

  btn.addEventListener('click', function () {
    const nama   = document.getElementById('nama');
    const nik    = document.getElementById('nik');
    const jalur  = document.getElementById('jalur');

    const namaVal  = nama  ? nama.value.trim()  : '';
    const nikVal   = nik   ? nik.value.trim()   : '';
    const jalurVal = jalur ? jalur.value        : '';

    
    if (!namaVal) {
      showToast('Nama Lengkap wajib diisi!', 'error');
      nama.focus();
      return;
    }

    if (!nikVal) {
      showToast('NIK wajib diisi!', 'error');
      nik.focus();
      return;
    }

    // 2. Validasi NIK: harus tepat 16 digit angka
    const nikPattern = /^\d{16}$/;
    if (!nikPattern.test(nikVal)) {
      showToast('NIK harus berupa 16 digit angka!', 'error');
      nik.focus();
      return;
    }

    if (!jalurVal) {
      showToast('Jalur Pendaftaran wajib dipilih!', 'error');
      jalur.focus();
      return;
    }

    
    showToast('Pendaftaran berhasil dikirim!', 'success');

    // Reset form setelah sedikit delay agar toast terlihat
    setTimeout(() => {
      if (nama)  nama.value  = '';
      if (nik)   nik.value   = '';
      if (jalur) jalur.value = '';
    }, 400);
  });
})();