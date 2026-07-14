/* ════════════════════════════════════════
   EL RAYGA — MAIN SCRIPT
   ════════════════════════════════════════ */

// ── IMAGE PATHS ─────────────────────────
const BEFORE_DIR = "images/before fire the place was a piece of heaven/";
const AFTER_DIR  = "images/after fire/";

const beforeImgs = [
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.43.40 AM.jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.43.40 AM (1).jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.43.41 AM.jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.43.41 AM (1).jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.45.11 AM.jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.45.11 AM (1).jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.45.12 AM.jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.45.14 AM.jpeg",
  BEFORE_DIR + "WhatsApp Image 2026-07-14 at 1.45.14 AM (1).jpeg",
];

const afterImgs = [
  AFTER_DIR + "WhatsApp Image 2026-07-14 at 1.39.17 AM.jpeg",
  AFTER_DIR + "WhatsApp Image 2026-07-14 at 1.39.18 AM.jpeg",
  AFTER_DIR + "WhatsApp Image 2026-07-14 at 1.39.19 AM.jpeg",
  AFTER_DIR + "fire.jpeg",
];

// ── GALLERY DATA ─────────────────────────
const galleryItems = [
  { src: beforeImgs[0], filter: "friends",  label: "الأصدقاء" },
  { src: beforeImgs[1], filter: "nature",   label: "الطبيعة"  },
  { src: beforeImgs[2], filter: "camp",     label: "الكامب"   },
  { src: beforeImgs[3], filter: "friends",  label: "الأصدقاء" },
  { src: beforeImgs[4], filter: "sunset",   label: "الغروب"   },
  { src: beforeImgs[5], filter: "nature",   label: "الطبيعة"  },
  { src: beforeImgs[6], filter: "camp",     label: "الكامب"   },
  { src: beforeImgs[7], filter: "sunset",   label: "الغروب"   },
  { src: beforeImgs[8], filter: "friends",  label: "الأصدقاء" },
];

// ── MEMORY WALL — no seed data, filled by real user submissions only ──────

// ── ROADMAP DATA ─────────────────────────
const roadmapSteps = [
  { icon:"🔥", label:"الحريق",           lit: true  },
  { icon:"🤝", label:"دعم المجتمع",      lit: true  },
  { icon:"🧹", label:"التنظيف والإزالة", lit: false },
  { icon:"🏗️", label:"إعادة البناء",     lit: false },
  { icon:"🌅", label:"عودة الرايجة",     lit: false },
  { icon:"❤️", label:"ذكريات جديدة",    lit: false },
];

// ── LANTERN MESSAGES ─────────────────────
const lanternMsgs = [
  "شكراً... الذكريات تستحق أن تعود ❤️",
  "الرايجة في قلبنا دايماً 🏕️",
  "نتمنى لكم عودة أجمل 🌅",
  "من هنا بدأت أجمل صداقاتي 🤝",
  "لك كل الحب يا عماد 🙏",
  "الأماكن بتُبنى بالحب وبالحب بترجع ✨",
  "سنعود قريباً 🌿",
  "فانوسي لكم ولذكرياتنا الجميلة 🏮",
];

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initGallery();
  initMemoryWall();
  initBeforeAfter();
  initFireImages();
  initLanterns();
  initRoadmap();
  initReveal();
  initSharedMemories();
  initCTABg();
  initNav();
  spawnFireParticles();
});

// ═══════════════════════════════════════════
// HERO SLIDESHOW
// ═══════════════════════════════════════════
function initHero() {
  const ss = document.getElementById("heroSlideshow");
  beforeImgs.forEach((src, i) => {
    const d = document.createElement("div");
    d.className = "hero-slide" + (i === 0 ? " active" : "");
    d.style.backgroundImage = `url('${CSS.escape ? src : src}')`;
    d.style.backgroundImage = `url("${src}")`;
    ss.appendChild(d);
  });

  let cur = 0;
  const slides = ss.querySelectorAll(".hero-slide");
  setInterval(() => {
    slides[cur].classList.remove("active");
    cur = (cur + 1) % slides.length;
    slides[cur].classList.add("active");
  }, 3500);

  // Show quote after 5s
  setTimeout(() => {
    document.getElementById("heroQuote").classList.add("visible");
  }, 5000);
}

// ═══════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════
function initGallery() {
  const gallery = document.getElementById("gallery");
  renderGallery("all");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGallery(btn.dataset.filter);
    });
  });

  function renderGallery(filter) {
    gallery.innerHTML = "";
    const items = filter === "all" ? galleryItems : galleryItems.filter(i => i.filter === filter);
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `
        <img src="${item.src}" alt="${item.label}" loading="lazy">
        <div class="gallery-item-overlay"><span class="gallery-item-label">${item.label}</span></div>
      `;
      gallery.appendChild(div);
    });
  }
}

// ═══════════════════════════════════════════
// MEMORY WALL
// ═══════════════════════════════════════════
function initMemoryWall() {
  const container = document.getElementById("memoryCards");
  // Start with an empty-state message; it disappears when users add memories
  const empty = document.createElement("p");
  empty.id = "memoryWallEmpty";
  empty.className = "memory-wall-empty";
  empty.textContent = "لا توجد ذكريات بعد — كن أول من يشارك ذكرياته! 💬";
  container.appendChild(empty);
}

function buildMemoryCard(m, isUser) {
  const div = document.createElement("div");
  div.className = "memory-card" + (isUser ? " user-memory-card" : "");
  div.innerHTML = `
    <p class="memory-card-text">${m.text}</p>
    <div class="memory-card-author">${m.name}</div>
    <div class="memory-card-year">${m.year}</div>
  `;
  return div;
}

// ═══════════════════════════════════════════
// BEFORE & AFTER SLIDER
// ═══════════════════════════════════════════
function initBeforeAfter() {
  const carousel = document.getElementById("baCarousel");
  const dotsEl   = document.getElementById("baDots");
  let current = 0;

  const pairs = [
    { before: beforeImgs[4], after: afterImgs[0] },
    { before: beforeImgs[2], after: afterImgs[1] },
    { before: beforeImgs[6], after: afterImgs[2] },
    { before: beforeImgs[0], after: afterImgs[3] },
  ];

  pairs.forEach((pair, i) => {
    const slide = document.createElement("div");
    slide.className = "ba-slide" + (i === 0 ? " active" : "");
    slide.innerHTML = `
      <div class="ba-comparison" id="baCmp${i}">
        <img class="ba-after-img" src="${pair.after}" alt="بعد">
        <div class="ba-before" id="baBefore${i}">
          <img src="${pair.before}" alt="قبل">
        </div>
        <div class="ba-handle" id="baHandle${i}"></div>
        <span class="ba-label ba-label-after">🔥 بعد</span>
        <span class="ba-label ba-label-before">🏕️ قبل</span>
      </div>
    `;
    carousel.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "ba-dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(i);
    dotsEl.appendChild(dot);

    // Init drag
    setTimeout(() => setupDrag(i), 100);
  });

  function setupDrag(i) {
    const cmp    = document.getElementById(`baCmp${i}`);
    const before = document.getElementById(`baBefore${i}`);
    const handle = document.getElementById(`baHandle${i}`);
    if (!cmp) return;

    let dragging = false;
    const move = (x) => {
      const rect = cmp.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      before.style.width = pct + "%";
      handle.style.left  = pct + "%";
    };

    handle.addEventListener("mousedown",  () => dragging = true);
    handle.addEventListener("touchstart", () => dragging = true, { passive:true });
    window.addEventListener("mouseup",    () => dragging = false);
    window.addEventListener("touchend",   () => dragging = false);
    window.addEventListener("mousemove",  e => dragging && move(e.clientX));
    window.addEventListener("touchmove",  e => { if (dragging) move(e.touches[0].clientX); }, { passive:true });
  }

  function goToSlide(idx) {
    document.querySelectorAll(".ba-slide").forEach((s, i) => s.classList.toggle("active", i === idx));
    document.querySelectorAll(".ba-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    current = idx;
  }

  document.getElementById("baNext").onclick = () => goToSlide((current + pairs.length - 1) % pairs.length);
  document.getElementById("baPrev").onclick = () => goToSlide((current + 1) % pairs.length);
}

// ═══════════════════════════════════════════
// FIRE IMAGES
// ═══════════════════════════════════════════
function initFireImages() {
  const container = document.getElementById("fireImages");
  afterImgs.forEach(src => {
    const div = document.createElement("div");
    div.className = "fire-img-item";
    div.innerHTML = `<img src="${src}" alt="بعد الحريق" loading="lazy">`;
    container.appendChild(div);
  });
}

// ═══════════════════════════════════════════
// LANTERNS
// ═══════════════════════════════════════════
let lanternCount = 0;

function initLanterns() {
  // Start with a handful of seed lanterns
  const seeds = [
    { x:15, msg: lanternMsgs[0] }, { x:34, msg: lanternMsgs[1] },
    { x:55, msg: lanternMsgs[2] }, { x:72, msg: lanternMsgs[3] },
    { x:85, msg: lanternMsgs[4] },
  ];
  seeds.forEach(s => spawnLantern(s.x, s.msg));
}

function spawnLantern(xPct, msg) {
  const sky = document.getElementById("lanternSky");
  if (!sky) return;

  const el = document.createElement("div");
  el.className = "lantern";
  el.innerHTML = `🏮<span class="lantern-tooltip">${msg}</span>`;
  el.style.left = (xPct || 10 + Math.random() * 80) + "%";
  el.style.bottom = "-40px";
  el.style.animationDuration  = (8 + Math.random() * 8) + "s";
  el.style.animationDelay     = (Math.random() * 2) + "s";

  sky.appendChild(el);
  lanternCount++;
  document.getElementById("lanternCount").textContent = lanternCount;

  setTimeout(() => el.remove(), 18000);
}

window.lightNewLantern = function() {
  const xPct = 5 + Math.random() * 90;
  const msg  = lanternMsgs[lanternCount % lanternMsgs.length];
  spawnLantern(xPct, msg);

  const btn = document.getElementById("lightLanternBtn");
  btn.textContent = "🏮 فانوسك اتضاء!";
  setTimeout(() => btn.textContent = "🏮 أضئ فانوسك", 2000);
  showToast("فانوسك أُضيء في سماء الرايجة 🏮");

  // Scroll to donate
  setTimeout(() => {
    document.getElementById("donate").scrollIntoView({ behavior:"smooth" });
  }, 2500);
};

// ═══════════════════════════════════════════
// ROADMAP
// ═══════════════════════════════════════════
function initRoadmap() {
  const container = document.getElementById("roadmap");
  roadmapSteps.forEach((step, i) => {
    const item = document.createElement("div");
    item.className = "roadmap-item";
    item.innerHTML = `<div class="roadmap-node${step.lit ? ' lit' : ''}">${step.icon}</div>
                      <div class="roadmap-label">${step.label}</div>`;
    container.appendChild(item);

    if (i < roadmapSteps.length - 1) {
      const line = document.createElement("div");
      line.className = "roadmap-connector" + (step.lit && roadmapSteps[i+1].lit ? " lit" : step.lit ? " lit" : "");
      container.appendChild(line);
    }
  });
}

// ═══════════════════════════════════════════
// SHARE YOUR MEMORY
// ═══════════════════════════════════════════
function initSharedMemories() {
  // No pre-populated examples — only real user submissions appear here
  const container = document.getElementById("sharedMemories");
  const empty = document.createElement("p");
  empty.id = "sharedMemoriesEmpty";
  empty.className = "memory-wall-empty";
  empty.textContent = "ذكرياتك ستظهر هنا — شاركنا لحظة لا تُنسى! ✨";
  container.appendChild(empty);
}

window.submitMemory = function(e) {
  e.preventDefault();
  const name = document.getElementById("memName").value.trim();
  const year = document.getElementById("memYear").value;
  const text = document.getElementById("memText").value.trim();
  if (!name || !text) return;

  // ── Shared Memories list ──────────────────────────────
  const container = document.getElementById("sharedMemories");
  // Hide empty-state placeholder once first memory is added
  const sharedEmpty = document.getElementById("sharedMemoriesEmpty");
  if (sharedEmpty) sharedEmpty.remove();

  const card = document.createElement("div");
  card.className = "user-memory-card";
  card.innerHTML = `
    <div class="user-memory-name">✦ ${name}</div>
    <div class="user-memory-year">${year ? "زارها سنة " + year : ""}</div>
    <div class="user-memory-text">${text}</div>
  `;
  container.prepend(card);
  document.getElementById("memoryForm").reset();
  card.scrollIntoView({ behavior:"smooth", block:"nearest" });
  showToast("✓ شكراً! ذكريتك انضافت للجدار ❤️");

  // ── Memory Wall ───────────────────────────────────────
  const wallContainer = document.getElementById("memoryCards");
  // Hide empty-state placeholder once first memory is added
  const wallEmpty = document.getElementById("memoryWallEmpty");
  if (wallEmpty) wallEmpty.remove();

  const wallCard = document.createElement("div");
  wallCard.className = "memory-card";
  wallCard.innerHTML = `
    <p class="memory-card-text">${text}</p>
    <div class="memory-card-author">${name}</div>
    <div class="memory-card-year">${year || ""}</div>
  `;
  wallContainer.prepend(wallCard);
};

// ═══════════════════════════════════════════
// FINAL CTA BACKGROUND
// ═══════════════════════════════════════════
function initCTABg() {
  const bg = document.getElementById("ctaBg");
  bg.style.backgroundImage = `url("${beforeImgs[7]}")`;
}

// ═══════════════════════════════════════════
// FIRE PARTICLES (transition section)
// ═══════════════════════════════════════════
function spawnFireParticles() {
  const container = document.getElementById("fireParticles");
  setInterval(() => {
    const p = document.createElement("div");
    p.className = "fire-particle";
    p.style.left   = Math.random() * 100 + "%";
    p.style.bottom = "0";
    p.style.animationDuration  = (2 + Math.random() * 3) + "s";
    p.style.animationDelay     = Math.random() * 0.5 + "s";
    p.style.width  = (3 + Math.random() * 5) + "px";
    p.style.height = (3 + Math.random() * 5) + "px";
    const hue = 10 + Math.random() * 30;
    p.style.background = `hsl(${hue}, 90%, 55%)`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }, 180);
}

// ═══════════════════════════════════════════
// REVEAL ON SCROLL
// ═══════════════════════════════════════════
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

// ═══════════════════════════════════════════
// NAVBAR SCROLL
// ═══════════════════════════════════════════
function initNav() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 60));
}

// ═══════════════════════════════════════════
// COPY TEXT
// ═══════════════════════════════════════════
window.copyText = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = "✓ تم النسخ!";
    setTimeout(() => btn.textContent = orig, 2000);
    showToast("✓ تم نسخ الرقم بنجاح");
  });
};

// ═══════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}
