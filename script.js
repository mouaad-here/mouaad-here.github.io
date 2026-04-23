/* ─────────────────────────────────────────────
   TAB SWITCHING
───────────────────────────────────────────── */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(`panel-${target}`).classList.add('active');
  });
});

/* ─────────────────────────────────────────────
   LIGHT / DARK THEME TOGGLE
───────────────────────────────────────────── */
const html = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

// Restore saved theme
const savedTheme = localStorage.getItem('devfolio-theme') || 'dark';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('devfolio-theme', next);
});

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  } else {
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function handleSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    event.target.reset();
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }, 1200);
}


/* ─────────────────────────────────────────────
   PROJECT CARD — open GitHub on click
───────────────────────────────────────────── */
document.querySelectorAll('.proj-card').forEach((card) => {
  card.addEventListener('click', () => {
    // Subtle scale feedback
    card.style.transform = 'scale(.97)';
    setTimeout(() => { card.style.transform = ''; }, 180);
  });
});

/* ─────────────────────────────────────────────
   SUBTLE ENTRANCE ANIMATIONS on DOMContentLoaded
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Stagger project cards
  document.querySelectorAll('.proj-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity .4s ease ${i * 0.07}s, transform .4s ease ${i * 0.07}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = '';
      });
    });
  });

  // Stagger resume items
  document.querySelectorAll('.resume-item, .sidebar-meta li').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transition = `opacity .4s ease ${i * 0.06}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.opacity = '1'; });
    });
  });

  // Animate avatar
  const avatar = document.querySelector('.avatar-wrap');
  avatar.style.opacity = '0';
  avatar.style.transform = 'scale(.9)';
  avatar.style.transition = 'opacity .5s ease, transform .5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      avatar.style.opacity = '1';
      avatar.style.transform = '';
    });
  });
});

/* ─────────────────────────────────────────────
   RE-ANIMATE panels on tab switch
───────────────────────────────────────────── */
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    const panel = document.getElementById(`panel-${target}`);

    // Stagger children
    const children = panel.querySelectorAll(
      '.proj-card, .resume-item, .skill-badge, .contact-item, .form-field, .form-heading, .social-icons'
    );
    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(12px)';
      child.style.transition = `opacity .35s ease ${i * 0.05}s, transform .35s ease ${i * 0.05}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          child.style.opacity = '1';
          child.style.transform = '';
        });
      });
    });
  });
});


