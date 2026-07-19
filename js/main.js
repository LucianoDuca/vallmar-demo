/* =========================================================
   Vallmar — motor de render (config-driven)
   Todo el contenido se genera desde data/config.json.
   El arte es SVG propio inline: la página es 100% autónoma.
   ========================================================= */

/* ---------- Biblioteca de iconos (inner SVG markup) ---------- */
const ICONS = {
  implante: '<path d="M12 2c-2.5 0-4 1.8-4 4.5 0 1.6.6 2.7.6 4.3 0 .8-.2 1.6-.2 2.4M12 2c2.5 0 4 1.8 4 4.5 0 1.6-.6 2.7-.6 4.3 0 .8.2 1.6.2 2.4"/><path d="M9 10.5h6M10 22l-.7-6M14 22l.7-6"/>',
  ortodoncia: '<path d="M4 9c2.5-2 13.5-2 16 0"/><path d="M4 9v3a8 8 0 0 0 16 0V9"/><path d="M8 10v3M12 10.5v3.5M16 10v3"/>',
  estetica: '<path d="M12 3l1.9 4.3L18.5 8l-3.3 3.2.8 4.6L12 13.8 8 15.8l.8-4.6L5.5 8l4.6-.7z"/>',
  endodoncia: '<path d="M12 2c-3 0-5 2.2-5 5.2 0 3.8 2.4 5.3 2.8 8.8.2 1.8.5 4 2.2 4s2-2.2 2.2-4c.4-3.5 2.8-5 2.8-8.8C17 4.2 15 2 12 2z"/><path d="M9.5 8.2c.8-.7 2-1 2.5-1"/>',
  periodoncia: '<path d="M12 21c4-3 7-6 7-10a5 5 0 0 0-9-3 5 5 0 0 0-5 4c0 4 3 6 7 9z"/>',
  general: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
  leaf: '<path d="M4 20c0-8 6-14 16-14 0 10-6 14-16 14z"/><path d="M4 20c3-4 6-6 10-8"/>',
  tooth: '<path d="M12 3.2c-1.7 0-2.6 1-4 1-1.7 0-3.2 1-3.2 3.4 0 2.4 1.1 3.6 1.7 6.2.5 2.3.7 6 2.4 6 1.4 0 1.3-2.7 1.7-4.4.2-.9.6-1.4 1.4-1.4s1.2.5 1.4 1.4c.4 1.7.3 4.4 1.7 4.4 1.7 0 1.9-3.7 2.4-6 .6-2.6 1.7-3.8 1.7-6.2C21.2 8.2 19.7 7.2 18 7.2c-1.4 0-2.3-1-4-1z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin: '<path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  google: '<path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4z" fill="#4285F4" stroke="none"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853" stroke="none"/><path d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" fill="#FBBC05" stroke="none"/><path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.4 3-4.1 5.6-4.1z" fill="#EA4335" stroke="none"/>',
  whatsapp: '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.56-1.17-2.98 0-1.41.74-2.11 1-2.4.26-.29.57-.36.76-.36h.55c.18 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.15.12.32.02.51-.34.68-.7.65-.43 1.12.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.34.07.13.07.75-.17 1.43Z" stroke="none" fill="currentColor"/>'
};

function icon(name, cls) {
  const inner = ICONS[name] || '';
  const stroked = (name === 'google' || name === 'whatsapp') ? '' : 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
  return `<svg class="${cls || ''}" viewBox="0 0 24 24" ${stroked} aria-hidden="true">${inner}</svg>`;
}

/* ---------- Arte SVG: hero + sonrisas antes/después ---------- */
function svgDataUri(svg) {
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function smileSVG(toothColor, opts) {
  opts = opts || {};
  const bright = !!opts.bright;
  const bg = opts.bg || '#F7ECE6';
  const n = 10;
  let teeth = '';
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = 60 + t * 280;
    const center = Math.abs(t - 0.5) * 2;      // 0 centro, 1 bordes
    const arc = center * center * 46;          // curva del arco
    const y = 150 + arc;
    const w = 30 - center * 8;
    const h = 46 - center * 10;
    const jitter = bright ? 0 : (i % 3 === 0 ? 3 : (i % 2 ? -2 : 1));
    teeth += `<rect x="${(x - w / 2).toFixed(1)}" y="${(y + jitter).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="9" fill="${toothColor}" stroke="rgba(0,0,0,0.06)"/>`;
  }
  const sparkle = bright
    ? '<g transform="translate(300 120)"><path d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z" fill="#C79A3F"/></g><g transform="translate(120 110) scale(0.6)" opacity="0.8"><path d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z" fill="#C79A3F"/></g>'
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="${bg}"/>
    <path d="M40 210 Q200 90 360 210 Q200 340 40 210 Z" fill="#E7A6A6"/>
    <path d="M40 210 Q200 118 360 210" fill="none" stroke="#D98E8E" stroke-width="6" opacity="0.6"/>
    ${teeth}
    <path d="M60 214 Q200 300 340 214" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="4"/>
    ${sparkle}
  </svg>`;
}

function heroArtSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 560" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FBF3EE"/><stop offset="1" stop-color="#F2E3DC"/>
      </linearGradient>
      <linearGradient id="ht" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#F7ECE6"/>
      </linearGradient>
    </defs>
    <rect width="520" height="560" fill="url(#hg)"/>
    <circle cx="90" cy="110" r="150" fill="#A34A52" opacity="0.06"/>
    <circle cx="450" cy="470" r="180" fill="#C79A3F" opacity="0.08"/>
    <g transform="translate(260 280)">
      <path d="M0 -150 C-70 -150 -110 -104 -110 -46 C-110 12 -78 42 -66 108 C-58 150 -44 196 -14 196 C6 196 8 150 14 120 C18 100 24 96 30 116 C38 150 44 196 66 190 C96 182 100 132 108 74 C118 8 110 -30 88 -78 C70 -116 44 -150 0 -150 Z" fill="url(#ht)" stroke="#A34A52" stroke-width="3" stroke-opacity="0.18"/>
      <path d="M-64 -78 C-40 -104 6 -104 24 -74" fill="none" stroke="#A34A52" stroke-width="5" stroke-linecap="round" stroke-opacity="0.28"/>
    </g>
    <g transform="translate(372 190)">
      <path d="M0 -26 L7 -7 L26 0 L7 7 L0 26 L-7 7 L-26 0 L-7 -7 Z" fill="#C79A3F"/>
    </g>
    <g transform="translate(150 400) scale(0.6)" opacity="0.85">
      <path d="M0 -26 L7 -7 L26 0 L7 7 L0 26 L-7 7 L-26 0 L-7 -7 Z" fill="#A34A52"/>
    </g>
  </svg>`;
}

/* ---------- Utilidades ---------- */
function whatsappHref(config, mensaje) {
  const m = encodeURIComponent(mensaje || config.whatsappMensaje);
  return `https://wa.me/${config.whatsapp}?text=${m}`;
}
function telefonoHref(config) {
  return `tel:${config.telefono.replace(/\s+/g, '')}`;
}
function renderStars(rating) {
  let html = '<div class="stars" aria-hidden="true">';
  for (let i = 0; i < 5; i++) {
    const cls = i < Math.round(rating) ? 'star star-filled' : 'star star-empty';
    const fill = i < Math.round(rating) ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.5"';
    html += `<svg class="${cls}" viewBox="0 0 24 24" ${fill}><path d="M12 2.5l2.9 6.06 6.6.77-4.86 4.6 1.28 6.57L12 17.35l-5.92 3.15 1.28-6.57-4.86-4.6 6.6-.77L12 2.5Z"/></svg>`;
  }
  return html + '</div>';
}
function updateYear() {
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}
function getAverageRating(resenas, notaGoogle) {
  if (notaGoogle) return notaGoogle;
  if (!resenas || !resenas.length) return 0;
  return resenas.reduce((s, r) => s + r.estrellas, 0) / resenas.length;
}

/* ---------- Carga ---------- */
let config = null;

async function loadConfig() {
  try {
    const res = await fetch('./data/config.json');
    config = await res.json();
    renderPage();
  } catch (e) {
    console.error('Error cargando config:', e);
  }
}

function renderPage() {
  if (!config) return;

  const root = document.documentElement.style;
  if (config.colores) {
    root.setProperty('--primary', config.colores.primario);
    root.setProperty('--accent', config.colores.acento);
  }
  document.title = `${config.nombre} · Dentista en ${config.ciudad}`;

  renderDemoBanner();
  renderHeader();
  renderHero();
  renderTrust();
  renderStats();
  renderServices();
  renderReviews();
  renderTeam();
  renderLocation();
  renderFooter();

  if (typeof initializeAdvancedFeatures === 'function') {
    initializeAdvancedFeatures(config);
  }
  updateYear();
}

function renderDemoBanner() {
  const banner = document.querySelector('.demo-banner');
  if (banner && config.demo) {
    banner.innerHTML = `<span class="demo-tag">Demo</span> Propuesta de diseño para <strong>${config.nombre}</strong> · datos y contactos ficticios.`;
  }
}

function renderHeader() {
  const brand = document.querySelector('.logo');
  if (brand) {
    brand.innerHTML = `
      <span class="logo-mark">${icon('tooth')}</span>
      <span class="logo-text">${config.marca || config.nombre}<small>Clínica dental · ${config.ciudad}</small></span>`;
  }
  const cta = document.querySelector('.header-cta');
  if (cta) {
    cta.innerHTML = `<a href="${whatsappHref(config)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">${icon('whatsapp', 'icon')} Pedir cita</a>`;
  }
}

function renderHero() {
  const el = document.getElementById('hero');
  if (!el) return;
  const avg = getAverageRating(config.resenas, config.notaGoogle);
  const total = config.resenasTotales || (config.resenas ? config.resenas.length : 0);
  el.innerHTML = `
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-badge"><span class="dot"></span> Aceptamos nuevos pacientes esta semana</div>
        <h1>${config.heroTitulo || config.eslogan}</h1>
        <p class="hero-sub">${config.heroSubtitulo || ''}</p>
        <div class="hero-buttons">
          <a href="${whatsappHref(config)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${icon('whatsapp', 'icon')} Pedir cita por WhatsApp</a>
          <a href="${telefonoHref(config)}" class="btn btn-ghost-light">${icon('phone', 'icon')} ${config.telefono}</a>
        </div>
        <div class="hero-rating">
          ${renderStars(avg)}
          <span><strong>${avg.toFixed(1).replace('.', ',')}</strong> · ${total} reseñas en Google</span>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-art">${config.heroImagen ? `<img src="${config.heroImagen}" alt="Sonrisa tratada en ${config.nombre}" style="width:100%;height:100%;object-fit:cover;display:block;">` : heroArtSVG()}</div>
        <div class="hero-float-badge">${icon('shield', 'icon')} Garantía por escrito</div>
        <div class="hero-stat-card">
          <span class="big">+12.000</span>
          <span class="lbl">tratamientos realizados con éxito</span>
        </div>
      </div>
    </div>`;
}

function renderTrust() {
  const el = document.getElementById('trust');
  if (!el || !config.confianza) return;
  el.innerHTML = `<div class="trust-strip-inner">
    ${config.confianza.map(c => `<div class="trust-item">${icon(c.icono, 'icon')}<span>${c.texto}</span></div>`).join('')}
  </div>`;
}

function renderStats() {
  const el = document.getElementById('stats');
  if (!el || !config.stats) return;
  el.innerHTML = `<div class="stats-row">
    ${config.stats.map(s => `<div class="stat-block"><div class="num">${s.num}<span style="color:var(--accent)">${s.sufijo || ''}</span></div><div class="cap">${s.cap}</div></div>`).join('')}
  </div>`;
}

function renderServices() {
  const el = document.getElementById('servicios');
  if (!el) return;
  el.innerHTML = `
    <div class="services-content">
      <div class="section-header">
        <span class="section-header-label">Tratamientos</span>
        <h2 class="section-header-title">Todo lo que tu sonrisa necesita, en un solo sitio</h2>
        <p class="section-header-description">Un equipo estable que te acompaña en cada fase, desde la primera revisión hasta el mantenimiento.</p>
      </div>
      <div class="grid grid-3">
        ${config.servicios.map(s => `
          <article class="service-card" ${s.slug ? `data-procedure="${s.slug}" role="button" tabindex="0" aria-label="Ver tratamiento: ${s.nombre}"` : ''}>
            <div class="service-icon">${icon(s.icono || 'general')}</div>
            <h3 class="service-title">${s.nombre}</h3>
            <p class="service-description">${s.descripcion}</p>
            ${s.slug ? `<span class="service-link">Ver tratamiento ${icon('arrow')}</span>` : ''}
          </article>`).join('')}
      </div>
    </div>`;
}

function renderReviews() {
  const el = document.getElementById('resenas');
  if (!el) return;
  el.innerHTML = `
    <div class="reviews-content">
      <div class="section-header">
        <span class="section-header-label">Opiniones reales</span>
        <h2 class="section-header-title">Lo que dicen nuestros pacientes</h2>
        <p class="section-header-description">Valoración media de ${config.notaGoogle.toString().replace('.', ',')} sobre 5 en ${config.resenasTotales} reseñas de Google.</p>
      </div>
      <div class="grid grid-4">
        ${config.resenas.map(r => `
          <article class="review-card">
            <div class="review-stars">${renderStars(r.estrellas)}</div>
            <p class="review-text">${r.texto}</p>
            <div class="review-footer">
              <span class="review-avatar">${r.autor.charAt(0)}</span>
              <div>
                <div class="review-author">${r.autor}</div>
                <div class="review-source">${icon('google')} Reseña de Google</div>
              </div>
            </div>
          </article>`).join('')}
      </div>
    </div>`;
}

function renderTeam() {
  const el = document.getElementById('equipo');
  if (!el) return;
  el.innerHTML = `
    <div class="team-content">
      <div class="section-header">
        <span class="section-header-label">Nuestro equipo</span>
        <h2 class="section-header-title">Profesionales en los que puedes confiar</h2>
      </div>
      <div class="grid grid-3">
        ${config.equipo.map(m => `
          <article class="team-member">
            <div class="team-member-avatar">${m.iniciales}</div>
            <div class="team-member-info">
              <h3>${m.nombre}</h3>
              <div class="team-member-role">${m.rol}</div>
              <p class="team-member-bio">${m.bio}</p>
            </div>
          </article>`).join('')}
      </div>
    </div>`;
}

function renderLocation() {
  const el = document.getElementById('ubicacion');
  if (!el) return;
  el.innerHTML = `
    <div class="location-content">
      <div class="location-map">
        <iframe src="${config.mapaEmbedUrl}" title="Ubicación de ${config.nombre}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="location-info">
        <div class="section-header" style="text-align:left; align-items:flex-start; margin:0;">
          <span class="section-header-label">Visítanos</span>
          <h2 class="section-header-title">Estamos en el centro de ${config.ciudad}</h2>
        </div>
        <div class="location-details">
          <div class="location-detail">
            <div class="location-detail-icon">${icon('pin')}</div>
            <div class="location-detail-content"><dt>Dirección</dt><dd>${config.direccion}</dd></div>
          </div>
          <div class="location-detail">
            <div class="location-detail-icon">${icon('clock')}</div>
            <div class="location-detail-content"><dt>Horario</dt><dd>${config.horarios}</dd></div>
          </div>
          <div class="location-detail">
            <div class="location-detail-icon">${icon('phone')}</div>
            <div class="location-detail-content"><dt>Teléfono</dt><dd><a href="${telefonoHref(config)}">${config.telefono}</a></dd></div>
          </div>
        </div>
        <div class="location-cta">
          <a href="${whatsappHref(config)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${icon('whatsapp', 'icon')} Pedir cita ahora</a>
        </div>
      </div>
    </div>`;
}

function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-col">
        <div class="footer-brand-name">${config.marca || config.nombre}</div>
        <p style="font-size:0.9rem; color:rgba(255,255,255,0.6); max-width:24rem;">${config.eslogan}. ${config.direccion}.</p>
      </div>
      <div class="footer-col">
        <h4>Tratamientos</h4>
        <ul>${config.servicios.slice(0, 5).map(s => `<li><a href="#servicios">${s.nombre}</a></li>`).join('')}</ul>
      </div>
      <div class="footer-col">
        <h4>Clínica</h4>
        <ul>
          <li><a href="#resenas">Opiniones</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#faq">Preguntas frecuentes</a></li>
          <li><a href="#ubicacion">Cómo llegar</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <ul>
          <li><a href="${telefonoHref(config)}">${config.telefono}</a></li>
          <li><a href="${whatsappHref(config)}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li style="color:rgba(255,255,255,0.6);font-size:0.9rem;">${config.horarios}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year></span> ${config.nombre}. Todos los derechos reservados.</span>
      <span class="footer-legal">
        <a href="aviso-legal.html">Aviso legal</a> ·
        <a href="privacidad.html">Privacidad</a> ·
        <a href="cookies.html">Cookies</a>
      </span>
    </div>`;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadConfig);
} else {
  loadConfig();
}
