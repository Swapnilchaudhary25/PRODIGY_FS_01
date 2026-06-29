// ─── Toggle Password Visibility ────────────────────────────────────────────────
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    const icon = btn.querySelector('i');

    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });
});

// ─── Password Strength Meter ───────────────────────────────────────────────────
const passwordInput = document.getElementById('password');
const strengthBar   = document.getElementById('strength-bar');

if (passwordInput && strengthBar) {
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;

    if (val.length >= 6)                      strength++;
    if (val.length >= 10)                     strength++;
    if (/[A-Z]/.test(val))                    strength++;
    if (/[0-9]/.test(val))                    strength++;
    if (/[^A-Za-z0-9]/.test(val))            strength++;

    const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
    const widths  = ['0%', '20%', '40%', '60%', '80%', '100%'];

    strengthBar.style.width     = widths[strength];
    strengthBar.style.background = colors[strength];
  });
}

// ─── Auto-dismiss Flash Alerts ─────────────────────────────────────────────────
document.querySelectorAll('.alert').forEach(alert => {
  setTimeout(() => {
    alert.style.transition = 'opacity .5s';
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 500);
  }, 4000);
});
