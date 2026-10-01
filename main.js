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
  'talk-resumatch': {
    title: 'ResuMatch', date: '25 Sep, 2026', width: 1280, height: 749,
    tags: ['ASU', 'Hackathon'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vTq_oX750UgGlLaQzoKY_pwBmIEMs-BWxBeMqun5M71Ut6KJ6DY7ApzF0SwclZZt4wGEcFgvxqyZ0Hw/pubembed?start=true&loop=true&delayms=10000',
    content: `<img src="assets/Images/Presentations/rm3.jpg" alt="Punit presenting ResuMatch to the judges and audience"><blockquote><p>ResuMatch was a project focused on helping students find research opportunities, clubs, and other campus activities that match their skills and interests. The idea was to bring students, professors, research labs, and student organizations together in one simple website instead of making students search for opportunities in different places.</p></blockquote><img src="assets/Images/Presentations/rm.jpg" alt="ResuMatch team wins">`,
  },
  'talk-wevibe-midterm': {
    title: 'WeVibe Midterm Presentation', date: '24 Apr, 2026', width: 960, height: 569,
    tags: ['ASU', 'Academic'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vRrUkNjg3FdKiMxRrMN5vqe6-cCY-gQZl5ut9ENMbLdMyNfc1TqrPNwM4OiBoB1qA/pubembed?start=true&loop=true&delayms=10000',
  },
  'talk-survey-ai-software-process-management': {
    title: 'Survey on Role of AI in Software Process Management', date: '3 Dec, 2025', width: 960, height: 569,
    tags: ['ASU', 'Research', 'Academic'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vRgtTPlnEf4l3Kp6wbGXE1pThVBhVHr_Dj7pZYMEgPzk0F2D_P9x7zHk4vrrq5Qa2Ay4L9p_vsb0jmB/pubembed?start=true&loop=true&delayms=10000',
    content: `<blockquote><p>For this project, I worked with a team to study how AI is being used across different parts of software engineering. We looked at research covering planning, requirements, development, testing, and maintenance, and compared where AI was helping with efficiency and accuracy. We also looked at a study of developers using GenAI and found that it was used most often for writing and modifying code and creating tests, while areas like architecture, UI/UX, and collaboration remained mostly human-driven.</p></blockquote>`,
  },
  'talk-sparky-drivers': {
    title: 'Sparky Drivers', date: '23 Nov, 2025', width: 960, height: 569,
    tags: ['ASU', 'Research', 'Hackathon'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vSXJiZfUtmeQbnfLOGsRbp9JT0UwB_NsukNkcq7cZNkEUZiQo1WbRtboqGIjbkZYk_ibRyXZaCQc4ox/pubembed?start=true&loop=true&delayms=10000',
    content: `<img src="assets/Images/Presentations/sd3.jpg" alt="Sparky Drivers concept presentation"><blockquote><p>Sparky's Drivers was a concept for a smarter shopping experience. We designed a system that could combine retailer data, real-time product availability, navigation, and a shared shopping list.</p></blockquote><img src="assets/Images/Presentations/sd.jpg" alt="Sparky Drivers shopping experience"><blockquote><p>It could also suggest healthier alternatives and use past price data to tell users whether it might be a good time to buy a product or wait.</p></blockquote><img src="assets/Images/Presentations/sd4.jpg" alt="Sparky Drivers presentation visual"><img src="assets/Images/Presentations/sd5.png" alt="Sparky Drivers presentation visual"><img src="assets/Images/Presentations/sd6.png" alt="Sparky Drivers presentation visual">`,
  },
  'talk-ai-software-risk-management': {
    title: 'AI for Software Risk Management', date: '6 Oct, 2025', width: 960, height: 569,
    tags: ['ASU', 'Research', 'Academic'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vS0I1DVGegYzX3v6nJCd3hXFwtU39h7nPxEQ-JS4BHA3k9KGweTqu3oveIHSlIzRgpUcWt9QK2g7QtN/pubembed?start=true&loop=true&delayms=10000',
  },
  'talk-tainko': {
    title: 'Tainko', date: '18 Jun, 2025', width: 960, height: 569,
    tags: ['ASU', 'Hackathon', 'Design'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vRNMHimkdpwPbB9bzfQ4k28nI4tFne2OZE93wK9L_HpkIBMOV-DN7mIktC_MkA_q2hzkcbpcKH1xGKF/pubembed?start=true&loop=true&delayms=10000',
    content: `<img src="assets/Images/Presentations/t3.jpg" alt="Tainko concept presentation"><blockquote><p>Tainko was a concept for a digital wallet for students' achievements and credentials. The idea was to give students one place to organize their accomplishments and create a profile they could easily share with recruiters. We also designed a wallet card that could be exported to Apple or Google Wallet and update whenever the student's profile changed.</p></blockquote><img src="assets/Images/Presentations/t6.jpg" alt="Tainko digital wallet card">`,
  },
  'talk-dungeon-unexplorer': {
    title: 'Dungeon Unexplorer', date: '24 Feb, 2025', width: 960, height: 569,
    tags: ['ASU', 'Game Development', 'Hackathon'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vRRysgWNG3TarlIAb4CxW56E22XxgSMQAFHkHPWMqxK8SqEwJjmWykZePhgjh3ktcXZiTwGVUKDamb0/pubembed?start=true&loop=true&delayms=10000',
    content: `<div class="youtube-frame"><iframe src="https://www.youtube.com/embed/lQR36jT7lBU?si=TLc6CHnc--3zA0SP" title="Dungeon Unexplorer video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><img src="assets/Images/Presentations/sc.jpg" alt="Dungeon Unexplorer presentation"><img src="assets/Images/Presentations/sc%20(2).jpg" alt="Dungeon Unexplorer presentation"><p><a href="assets/Images/Presentations/Unite%20AZ%20Hack.pdf" target="_blank" rel="noopener">Unite AZ Hack project document (PDF)</a></p>`,
  },
  'talk-wildlife-protection-system': {
    title: 'Wildlife Protection System', date: '17 Oct, 2023', width: 960, height: 569,
    tags: ['SAKEC', 'Academic', 'IoT'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vQRlW4q_tV2XrK-SDb_ggxC4VMkHnKdK3x9XXIQAYwB8SfRSGfFc8EUFSrxrpB8XQ/pubembed?start=true&loop=true&delayms=10000',
    summary: 'An IoT-based approach to early forest-fire detection.',
    content: `<h3>Overview</h3><p>Forest fires can become devastating long before humans are able to detect them. For this project, I explored how IoT could be used to continuously monitor environmental conditions in wildlife habitats and identify the early signs of a potential fire.</p><p>The goal was simple: <strong>detect abnormal environmental conditions as early as possible, communicate the warning quickly, and create a foundation for automated fire prevention.</strong></p><h3>The Problem</h3><p>Traditional fire detection systems often depend on someone noticing a fire and initiating a response. In a forest environment, that delay can be costly. A fire can spread rapidly, putting wildlife, vegetation, and the surrounding ecosystem at risk.</p><p>I wanted to explore whether a network of inexpensive sensors could continuously monitor a forest environment and provide an automated warning when conditions became dangerous.</p><p>The project therefore focused on three main requirements:</p><ul><li>Detect changes in temperature and smoke early</li><li>Communicate potential fire threats quickly</li><li>Create a foundation for automated prevention mechanisms</li></ul><h3>Research &amp; Exploration</h3><p>Before building the prototype, I looked at existing approaches to forest-fire detection.</p><p>Research included <strong>drones and image processing</strong>, <strong>wireless sensor networks</strong>, and <strong>GIS-based monitoring</strong>. These approaches demonstrated the potential of technology-assisted fire detection, but also highlighted practical challenges such as drone battery and signal limitations, sensor accuracy versus power consumption, and delays in transmitting information.</p><p>This helped shape our approach: rather than relying on a single detection method, we focused on a simple sensor-based system that could continuously monitor environmental conditions.</p><h3>Building the Prototype</h3><p>The prototype was built around an <strong>Arduino Uno R3</strong> with environmental sensors.</p><p>The hardware included:</p><ul><li>Temperature sensor</li><li>Smoke sensor</li><li>Arduino Uno R3</li><li>Red and green LEDs</li><li>Resistors</li><li>Breadboard</li><li>Jumper wires</li></ul><p>For monitoring and visualization, we used <strong>ThingSpeak</strong>.</p><p>The basic idea was to continuously collect environmental readings and use changes in those readings to determine whether conditions might indicate a fire.</p><p>When the system detects potentially dangerous conditions, it can trigger an alarm and communicate the event to the user interface.</p><h3>From Detection to Prevention</h3><p>One of the most interesting parts of the project was thinking beyond simply detecting a fire.</p><p>The proposed system was designed as a foundation for a larger automated response system. Once abnormal readings are detected, the system could eventually:</p><p><strong>Detect → Alert → Respond → Contain</strong></p><p>For example, future iterations could activate sprinklers, notify emergency services, or deploy fire-retardant mechanisms to help contain a fire before it spreads.</p><p>This shift from passive monitoring to proactive response was an important part of the project's concept.</p><h3>What I Learned</h3><p>This project gave me practical experience thinking about how software, hardware, and real-world environments interact.</p><p>More importantly, it taught me that building an IoT system isn't just about collecting sensor data. The real challenge is turning that data into <strong>useful decisions and timely actions</strong>.</p><p>A sensor reading by itself doesn't protect anything. The system needs to reliably interpret the reading, communicate the threat, and eventually trigger an appropriate response.</p><h3>Looking Forward</h3><p>The prototype established the basic architecture for an IoT-based wildlife fire protection system, but there is significant room to expand it.</p><p>Future iterations could include:</p><ul><li>Additional environmental sensors</li><li>More sophisticated fire detection logic</li><li>Automated sprinkler activation</li><li>Emergency-service notifications</li><li>Improved monitoring and visualization</li><li>More robust communication between remote sensor nodes</li><li>Security improvements for connected sensors</li></ul><p>The long-term vision is a system capable of continuously monitoring a wildlife habitat and responding to potential fire threats with minimal human intervention.</p><h3>The Takeaway</h3><p>This project started with a simple question:</p><p><strong>What if a forest could warn us about a fire before the fire became impossible to control?</strong></p><p>By combining inexpensive sensors, IoT communication, and automated response mechanisms, we explored one possible answer.</p>`,
  },
  'talk-parkinsons-disease-detector': {
    title: "Parkinson's Disease Detector", date: '28 Apr, 2023', width: 960, height: 569,
    tags: ['SAKEC', 'Academic', 'Healthcare'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vQGuQENH0U3G_gfQC0WdA1T63LBahHRQtTez98Mg66rDfBFozFNaaosH2evIjUIzL7YlSkcAKolJEaw/pubembed?start=true&loop=true&delayms=10000',
  },
  'talk-apparel-ecommerce': {
    title: 'Apparel E-commerce', date: '3 Nov, 2022', width: 960, height: 569,
    tags: ['SAKEC', 'Academic'],
    src: 'https://docs.google.com/presentation/d/e/2PACX-1vQIH71FUoOlHT5QaGeajQ-ZC182gUifB2ov7KURAznDUrBBEl1i4otaYSeTv2R2n8JMtt6EbuGRs_y_/pubembed?start=true&loop=true&delayms=10000',
  },
};
const talkDetail = document.getElementById('talk-detail');
const talkTitle = document.getElementById('talk-detail-title');
const talkDate = document.getElementById('talk-detail-date');
const talkSummary = document.getElementById('talk-detail-summary');
const talkContent = document.getElementById('talkContent');
const talkTags = document.getElementById('talkTags');
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
    talkContent.innerHTML = talk.content || '';
    talkTags.replaceChildren(...talk.tags.map((tag) => {
      const label = document.createElement('span');
      label.className = 'talk-tag';
      label.textContent = tag;
      return label;
    }));
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
