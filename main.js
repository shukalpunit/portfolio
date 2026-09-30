const themeChoices = document.querySelectorAll('[data-theme-choice]');
const themeCycle = document.getElementById('themeCycle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeColors = { light: '#fbfaf7', dark: '#191a18', sepia: '#f4ead8' };
const themeOrder = ['light', 'dark', 'sepia'];
const savedTheme = localStorage.getItem('theme');
let currentTheme = themeOrder.includes(savedTheme) ? savedTheme : 'sepia';

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  themeChoices.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
  if (themeCycle) {
    const nextTheme = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    themeCycle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  }
  themeMeta?.setAttribute('content', themeColors[theme]);
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

themeChoices.forEach((button) => {
  button.addEventListener('click', () => saveTheme(button.dataset.themeChoice));
});
themeCycle?.addEventListener('click', () => {
  const nextTheme = themeOrder[(themeOrder.indexOf(currentTheme) + 1) % themeOrder.length];
  saveTheme(nextTheme);
});
applyTheme(currentTheme);

document.querySelectorAll('[data-filter-controls]').forEach((controls) => {
  const group = controls.dataset.filterControls;
  const entries = document.querySelectorAll(`[data-filter-list="${group}"] .listing-entry`);
  controls.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      controls.querySelectorAll('[data-filter]').forEach((filter) => {
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      entries.forEach((entry) => {
        const tags = (entry.dataset.tags || '').split(/\s+/);
        entry.hidden = button.dataset.filter !== 'all' && !tags.includes(button.dataset.filter);
      });
    });
  });
});

const pages = [...document.querySelectorAll('.page-section')];
const navLinks = document.querySelectorAll('.site-nav a');
const talks = {
  'talk-resumatch': { title: 'ResuMatch', date: '25 Sep, 2026', width: 1280, height: 749, src: 'https://docs.google.com/presentation/d/e/2PACX-1vTq_oX750UgGlLaQzoKY_pwBmIEMs-BWxBeMqun5M71Ut6KJ6DY7ApzF0SwclZZt4wGEcFgvxqyZ0Hw/pubembed?start=true&loop=true&delayms=10000' },
  'talk-wevibe-midterm': { title: 'WeVibe midterm presentation', date: '24 Apr, 2026', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vRrUkNjg3FdKiMxRrMN5vqe6-cCY-gQZl5ut9ENMbLdMyNfc1TqrPNwM4OiBoB1qA/pubembed?start=true&loop=true&delayms=10000' },
  'talk-ai-software-process': { title: 'Survey on Role of AI in Software Process Management', date: '3 Dec, 2025', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vRgtTPlnEf4l3Kp6wbGXE1pThVBhVHr_Dj7pZYMEgPzk0F2D_P9x7zHk4vrrq5Qa2Ay4L9p_vsb0jmB/pubembed?start=true&loop=true&delayms=10000' },
  'talk-sparky-drivers': { title: 'Sparky Drivers', date: '23 Nov, 2025', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vSXJiZfUtmeQbnfLOGsRbp9JT0UwB_NsukNkcq7cZNkEUZiQo1WbRtboqGIjbkZYk_ibRyXZaCQc4ox/pubembed?start=true&loop=true&delayms=10000' },
  'talk-ai-risk-management': { title: 'AI for Software Risk Management', date: '6 Oct, 2025', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vS0I1DVGegYzX3v6nJCd3hXFwtU39h7nPxEQ-JS4BHA3k9KGweTqu3oveIHSlIzRgpUcWt9QK2g7QtN/pubembed?start=true&loop=true&delayms=10000' },
  'talk-tainko': { title: 'Tainko', date: '18 Jun, 2025', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vRNMHimkdpwPbB9bzfQ4k28nI4tFne2OZE93wK9L_HpkIBMOV-DN7mIktC_MkA_q2hzkcbpcKH1xGKF/pubembed?start=true&loop=true&delayms=10000' },
  'talk-dungeon-unexplorer': { title: 'Dungeon Unexplorer', date: '24 Feb, 2025', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vRRysgWNG3TarlIAb4CxW56E22XxgSMQAFHkHPWMqxK8SqEwJjmWykZePhgjh3ktcXZiTwGVUKDamb0/pubembed?start=true&loop=true&delayms=10000' },
  'talk-wildlife-protection': { title: 'Wildlife protection system', date: '17 Oct, 2023', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vQRlW4q_tV2XrK-SDb_ggxC4VMkHnKdK3x9XXIQAYwB8SfRSGfFc8EUFSrxrpB8XQ/pubembed?start=true&loop=true&delayms=10000', summary: 'An IoT-based forest-fire detection prototype using temperature and smoke sensors, an Arduino Uno, and ThingSpeak. The concept monitors environmental conditions to raise early warnings and lays a foundation for automated prevention.' },
  'talk-parkinsons-detector': { title: 'Parkinson’s Disease detector', date: '28 Apr, 2023', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vQGuQENH0U3G_gfQC0WdA1T63LBahHRQtTez98Mg66rDfBFozFNaaosH2evIjUIzL7YlSkcAKolJEaw/pubembed?start=true&loop=true&delayms=10000' },
  'talk-apparel-ecommerce': { title: 'Apparel E-commerce', date: '3 Nov, 2022', width: 960, height: 569, src: 'https://docs.google.com/presentation/d/e/2PACX-1vQIH71FUoOlHT5QaGeajQ-ZC182gUifB2ov7KURAznDUrBBEl1i4otaYSeTv2R2n8JMtt6EbuGRs_y_/pubembed?start=true&loop=true&delayms=10000' },
};
const talkDetail = document.getElementById('talk-detail');
const talkTitle = document.getElementById('talk-detail-title');
const talkDate = document.getElementById('talk-detail-date');
const talkSummary = document.getElementById('talk-detail-summary');
const talkFrame = document.getElementById('talkSlides');
const slideFrame = document.getElementById('slideFrame');

function showPage(hash = window.location.hash) {
  const id = hash.slice(1);
  const talk = talks[id];
  const target = talk ? talkDetail : pages.find((page) => page.id === id) || pages.find((page) => page.id === 'home');
  if (talk) {
    talkTitle.textContent = talk.title;
    talkDate.textContent = talk.date;
    talkSummary.textContent = talk.summary || '';
    talkSummary.hidden = !talk.summary;
    slideFrame.style.aspectRatio = `${talk.width} / ${talk.height}`;
    talkFrame.title = `Google Slides: ${talk.title}`;
    if (talkFrame.src !== talk.src) talkFrame.src = talk.src;
  }
  pages.forEach((page) => page.classList.toggle('is-active', page === target));
  navLinks.forEach((link) => {
    const currentSection = target === talkDetail ? 'talks' : target.id;
    if (link.hash === `#${currentSection}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

document.querySelectorAll('.reading-portfolio a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    if (window.location.hash !== link.hash) window.location.hash = link.hash;
    showPage(link.hash);
  });
});
window.addEventListener('hashchange', () => showPage());
window.addEventListener('popstate', () => showPage());
showPage();

document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const cat = document.getElementById('catCompanion');
if (cat) {
  let position = 8;
  let direction = 1;
  let previousTime = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setCatDirection(nextDirection) {
    direction = nextDirection;
    cat.dataset.direction = direction > 0 ? 'right' : 'left';
  }

  function walkCat(time) {
    const elapsed = previousTime ? Math.min(time - previousTime, 40) : 0;
    previousTime = time;
    const maxPosition = Math.max(8, window.innerWidth - cat.offsetWidth - 8);
    position += direction * elapsed * 0.035;
    if (position >= maxPosition || position <= 8) {
      position = Math.max(8, Math.min(position, maxPosition));
      setCatDirection(-direction);
    }
    cat.style.left = `${position}px`;
    requestAnimationFrame(walkCat);
  }

  cat.addEventListener('click', () => {
    setCatDirection(-direction);
    cat.classList.remove('is-nudging');
    void cat.offsetWidth;
    cat.classList.add('is-nudging');
  });
  cat.addEventListener('animationend', () => cat.classList.remove('is-nudging'));
  if (!reducedMotion) requestAnimationFrame(walkCat);
}
