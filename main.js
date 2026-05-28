/* main.js — Punit Portfolio */

// ── Scroll progress bar ──────────────────────────
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';
}, { passive: true });

// ── Navbar scroll ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Hamburger ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  s1.style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s2.style.opacity   = open ? '0' : '';
  s3.style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
}));

// ── Hero particle canvas ──────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); build(); });

  function build() {
    const count = Math.floor((W * H) / 10000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));
  }
  build();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,166,35,${p.alpha})`;
      ctx.fill();
    });
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Typewriter ───────────────────────────────────
const roles = [
  'Full-Stack Developer',
  'AI Application Builder',
  'React & Python Engineer',
  'Stand User',               // JoJo wink #1
  'Hackathon Winner',
  'Game Dev Enthusiast',
];
const typedEl = document.getElementById('typed');
let ri = 0, ci = 0, deleting = false;

function type() {
  if (!typedEl) return;
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; return setTimeout(type, 1800); }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 42 : 78);
}
setTimeout(type, 900);

// ── Scroll reveal ────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revObs  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 0.07}s`;
    entry.target.classList.add('visible');
    revObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });
reveals.forEach(el => revObs.observe(el));

// ── Stat counters ────────────────────────────────
const statNums = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const target = +el.dataset.target;
    const dur = 1400;
    const step = Math.ceil(target / (dur / 16));
    let cur = 0;
    const tick = () => {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString();
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
statNums.forEach(el => counterObs.observe(el));

// ── Skill bar fill on scroll ──────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs   = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.width = entry.target.dataset.w + '%';
    skillObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObs.observe(el));

// ── 3D tilt cards ────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Active nav link on scroll ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');
const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navAs.forEach(a => { a.style.color = ''; a.style.background = ''; });
    const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
    if (active && !active.classList.contains('nav-cta')) {
      active.style.color = '#f5a623';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => activeObs.observe(s));
