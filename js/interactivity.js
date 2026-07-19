/* =========================================================
   Vallmar — interactividad avanzada
   Navbar, slider antes/después, galería, FAQ, reveal.
   Las imágenes son SVG propios (smileSVG en main.js): sin
   dependencias externas.
   ========================================================= */

/* ===== NAVBAR ===== */
function initNavbar() {
  const menuToggle = document.getElementById('menuToggle');
  const navDesktop = document.querySelector('.nav-desktop');

  if (menuToggle && navDesktop) {
    menuToggle.addEventListener('click', () => navDesktop.classList.toggle('active'));
  }

  // Dropdowns en móvil: expandir al tocar
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const navLink = dropdown.querySelector('.nav-link');
    if (navLink) {
      navLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) { e.preventDefault(); dropdown.classList.toggle('active'); }
      });
    }
  });

  // Cualquier elemento con data-procedure abre la ficha de tratamiento
  document.querySelectorAll('[data-procedure]').forEach(item => {
    const openProcedure = (e) => {
      const key = item.getAttribute('data-procedure');
      if (key && typeof renderProcedurePage === 'function') {
        e.preventDefault();
        if (navDesktop) navDesktop.classList.remove('active');
        renderProcedurePage(key, config);
      }
    };
    item.addEventListener('click', openProcedure);
    // Accesibilidad: activar con Enter o Espacio cuando el foco está en la tarjeta
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') openProcedure(e);
    });
  });

  // Enlaces ancla del nav
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        const section = document.querySelector(href);
        if (section) { e.preventDefault(); section.scrollIntoView({ behavior: 'smooth' }); if (navDesktop) navDesktop.classList.remove('active'); }
      }
    });
  });
}

/* ===== Header con sombra al hacer scroll ===== */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ===== BEFORE/AFTER SLIDER ===== */
function initBeforeAfterSlider() {
  document.querySelectorAll('.slider-container').forEach(slider => {
    const handle = slider.querySelector('.slider-handle');
    const afterImage = slider.querySelector('.slider-image.after');
    if (!handle || !afterImage) return;
    let active = false;

    const setPct = (pct) => {
      pct = Math.max(0, Math.min(100, pct));
      handle.style.left = pct + '%';
      afterImage.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    };
    const fromEvent = (e) => {
      const rect = slider.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPct(((clientX - rect.left) / rect.width) * 100);
    };

    handle.addEventListener('mousedown', () => { active = true; });
    document.addEventListener('mouseup', () => { active = false; });
    document.addEventListener('mousemove', (e) => { if (active) fromEvent(e); });
    handle.addEventListener('touchstart', () => { active = true; }, { passive: true });
    document.addEventListener('touchend', () => { active = false; });
    document.addEventListener('touchmove', (e) => { if (active) fromEvent(e); }, { passive: true });
    slider.addEventListener('click', fromEvent);
  });
}

// Devuelve una fuente de imagen: ruta/URL directa, o SVG generado si es un color
function caseImg(value, bright) {
  if (typeof value === 'string' && /^(\.|\/|https?:|data:)/.test(value)) return value;
  return svgDataUri(smileSVG(value || (bright ? '#ffffff' : '#d9c9a3'), { bright: bright }));
}

function renderBeforeAfterSlider(config) {
  const section = document.querySelector('.before-after-slider');
  if (!section) return;
  const s = config.slider || {};
  const caso = (config.casos && config.casos[0]) || { before: '#d9c9a3', after: '#ffffff' };
  const beforeImg = caseImg(caso.before, false);
  const afterImg = caseImg(caso.after, true);

  section.innerHTML = `
    <div class="slider-content">
      <div class="slider-container">
        <img src="${beforeImg}" alt="Antes del tratamiento" class="slider-image before">
        <img src="${afterImg}" alt="Después del tratamiento" class="slider-image after">
        <span class="slider-tag left">Antes</span>
        <span class="slider-tag right">Después</span>
        <div class="slider-handle"></div>
      </div>
      <div class="slider-text">
        <span class="section-header-label" style="justify-content:flex-start;">Antes y después</span>
        <h2>${s.titulo || 'El cambio está en los detalles'}</h2>
        <p>${s.texto || ''}</p>
        <a href="#galeria" class="btn btn-primary slider-button">${s.cta || 'Ver más casos'}</a>
      </div>
    </div>`;
  setTimeout(initBeforeAfterSlider, 0);
}

/* ===== GALLERY ===== */
function initGallery() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    const after = item.querySelector('.gallery-item-after');
    if (!after) return;
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    });
    item.addEventListener('mouseleave', () => { after.style.clipPath = 'inset(0 50% 0 0)'; });
  });
}

function renderGallery(config) {
  const section = document.querySelector('.gallery');
  if (!section) return;
  const casos = (config.casos || []).slice(0, 4);
  section.innerHTML = `
    <div class="gallery-content">
      <div class="gallery-header">
        <h2>Algunos de nuestros casos clínicos</h2>
        <p>Trabajos reales realizados en la clínica. Pasa el cursor (o desliza) sobre cada imagen para ver el antes y el después.</p>
      </div>
      <div class="gallery-grid">
        ${casos.map(c => `
          <div class="gallery-item" title="${c.titulo}">
            <img src="${caseImg(c.before, false)}" alt="${c.titulo} — antes" class="gallery-item-image gallery-item-before">
            <img src="${caseImg(c.after, true)}" alt="${c.titulo} — después" class="gallery-item-image gallery-item-after">
            <div class="gallery-divider"></div>
            <span class="gallery-toggle">${c.titulo}</span>
          </div>`).join('')}
      </div>
    </div>`;
  setTimeout(initGallery, 0);
}

/* ===== FAQ ===== */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) q.addEventListener('click', () => item.classList.toggle('active'));
  });
}

function renderFAQ(config) {
  const section = document.querySelector('.faq');
  if (!section) return;
  const faqs = config.faq || [];
  section.innerHTML = `
    <div class="faq-content">
      <div class="section-header">
        <span class="section-header-label">Dudas frecuentes</span>
        <h2 class="section-header-title">Preguntas frecuentes</h2>
      </div>
      <div class="faq-list">
        ${faqs.map((f, i) => `
          <div class="faq-item ${i === 0 ? 'active' : ''}">
            <div class="faq-question"><h3>${f.q}</h3><span class="faq-toggle">+</span></div>
            <div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div>
          </div>`).join('')}
      </div>
    </div>`;
  setTimeout(initFAQ, 0);
}

/* ===== Scroll reveal ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .service-card, .review-card, .team-member, .stat-block');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

/* ===== Smooth scroll para anclas genéricas ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ===== Init ===== */
function initializeAdvancedFeatures(config) {
  renderBeforeAfterSlider(config);
  renderGallery(config);
  renderFAQ(config);
  initNavbar();
  initHeaderScroll();
  setTimeout(() => { initScrollReveal(); initSmoothScroll(); }, 60);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeAdvancedFeatures };
}
