/* =========================================================
   Vallmar — fichas de tratamiento dinámicas
   Se abren desde el nav o las tarjetas de servicio (data-procedure).
   Arte SVG propio y estilos por clases (advanced.css).
   ========================================================= */

const procedures = {
  implantes: {
    titulo: "Implantes dentales",
    subtitulo: "Cirugía guiada por ordenador para implantes más precisos y seguros.",
    icono: "implante",
    descripcion: "Recuperamos las piezas perdidas con implantes de titanio de calidad certificada. Planificamos cada caso con un TAC y cirugía guiada para colocar el implante en la posición exacta.",
    beneficios: ["Precisión milimétrica con cirugía guiada", "Menos molestias y recuperación más rápida", "Resultado natural y duradero", "Garantía por escrito"],
    proceso: [
      { titulo: "Estudio con TAC", descripcion: "Valoramos hueso y encía y planificamos el implante en 3D." },
      { titulo: "Colocación", descripcion: "Cirugía guiada, mínimamente invasiva y sin dolor." },
      { titulo: "Osteointegración", descripcion: "El implante se integra con el hueso (2-4 meses)." },
      { titulo: "Corona definitiva", descripcion: "Colocamos la corona a medida sobre el implante." }
    ],
    duracion: "3-5 meses en total",
    intervencion: "45-60 minutos por implante"
  },
  ortodoncia: {
    titulo: "Ortodoncia infantil y adulta",
    subtitulo: "Alinea tus dientes de forma discreta, con férulas transparentes.",
    icono: "ortodoncia",
    descripcion: "Ortodoncia a medida para cada edad. Con férulas invisibles alineamos los dientes de forma cómoda y prácticamente imperceptible, con revisiones incluidas durante todo el tratamiento.",
    beneficios: ["Prácticamente invisible", "Removible para comer y lavarte los dientes", "Más cómoda que los brackets", "Revisiones incluidas"],
    proceso: [
      { titulo: "Escaneo 3D", descripcion: "Tomamos una imagen digital exacta de tu boca." },
      { titulo: "Plan de tratamiento", descripcion: "Te mostramos el resultado final antes de empezar." },
      { titulo: "Fabricación", descripcion: "Se fabrican tus férulas personalizadas." },
      { titulo: "Cambio periódico", descripcion: "Cambias de férula cada 1-2 semanas." }
    ],
    duracion: "12-18 meses",
    intervencion: "Revisiones cada 6-8 semanas"
  },
  estetica: {
    titulo: "Estética dental",
    subtitulo: "Carillas y diseño de sonrisa con resultados naturales.",
    icono: "estetica",
    descripcion: "Diseñamos tu sonrisa de forma digital antes de empezar, para que veas el resultado. Carillas de porcelana y blanqueamiento para una sonrisa armónica y natural.",
    beneficios: ["Diseño digital previo de la sonrisa", "Aspecto completamente natural", "Carillas resistentes a las manchas", "Resultados duraderos"],
    proceso: [
      { titulo: "Diseño digital", descripcion: "Simulamos tu sonrisa futura y la validamos contigo." },
      { titulo: "Preparación mínima", descripcion: "Preparamos los dientes de forma conservadora." },
      { titulo: "Prueba", descripcion: "Comprobamos color y forma antes de fijar." },
      { titulo: "Cementado", descripcion: "Colocamos las carillas de forma definitiva." }
    ],
    duracion: "2-3 semanas",
    intervencion: "2 sesiones de 1-2 horas"
  },
  endodoncia: {
    titulo: "Endodoncia",
    subtitulo: "Tratamiento de conducto sin dolor para salvar tu diente.",
    icono: "endodoncia",
    descripcion: "Con anestesia eficaz y tecnología rotatoria realizamos el tratamiento de conducto de forma cómoda, eliminando la infección y conservando tu diente natural.",
    beneficios: ["Conserva tu diente natural", "Sin dolor durante el procedimiento", "Tecnología que acorta el tiempo", "Alta tasa de éxito"],
    proceso: [
      { titulo: "Diagnóstico", descripcion: "Radiografía para valorar la infección." },
      { titulo: "Anestesia", descripcion: "Anestesia local eficaz y cómoda." },
      { titulo: "Limpieza", descripcion: "Eliminamos el tejido infectado del conducto." },
      { titulo: "Sellado", descripcion: "Obturamos y protegemos el diente." }
    ],
    duracion: "1-2 sesiones",
    intervencion: "60-90 minutos por sesión"
  },
  periodoncia: {
    titulo: "Periodoncia",
    subtitulo: "Cuidamos tus encías para frenar la enfermedad a tiempo.",
    icono: "periodoncia",
    descripcion: "Tratamientos preventivos y correctivos de las encías, desde la limpieza profunda hasta la cirugía periodontal cuando es necesaria, para conservar tus dientes.",
    beneficios: ["Previene la pérdida de dientes", "Detiene el sangrado y la inflamación", "Protege tu inversión en implantes", "Mantenimiento personalizado"],
    proceso: [
      { titulo: "Evaluación", descripcion: "Medimos la profundidad de las encías." },
      { titulo: "Limpieza profunda", descripcion: "Eliminamos sarro bajo la encía con ultrasonidos." },
      { titulo: "Alisado radicular", descripcion: "Pulimos las raíces para evitar recaídas." },
      { titulo: "Mantenimiento", descripcion: "Revisiones cada 3-4 meses." }
    ],
    duracion: "Según severidad",
    intervencion: "45-60 minutos por sesión"
  },
  general: {
    titulo: "Odontología general",
    subtitulo: "Revisiones, empastes y limpiezas para mantener tu boca sana.",
    icono: "general",
    descripcion: "La base de una boca sana. Revisiones periódicas, empastes y limpiezas profesionales para detectar y tratar a tiempo cualquier problema, evitando tratamientos más costosos.",
    beneficios: ["Detección precoz de caries", "Limpiezas profesionales", "Empastes estéticos", "Consejos de higiene personalizados"],
    proceso: [
      { titulo: "Revisión", descripcion: "Exploración completa de dientes y encías." },
      { titulo: "Diagnóstico", descripcion: "Te explicamos el estado de tu boca con claridad." },
      { titulo: "Tratamiento", descripcion: "Empaste o limpieza según lo que necesites." },
      { titulo: "Prevención", descripcion: "Plan de mantenimiento para el futuro." }
    ],
    duracion: "Sesión única en la mayoría de casos",
    intervencion: "30-45 minutos"
  }
};

// Fotos de simulación (IA) por tratamiento. Fallback a arte SVG si falta la imagen.
const PROC_IMG = {
  implantes: "./assets/img/tratamientos/implantes.png",
  ortodoncia: "./assets/img/tratamientos/ortodoncia-invisible.png",
  estetica: "./assets/img/tratamientos/estetica-dental.png",
  endodoncia: "./assets/img/tratamientos/tratamiento-conducto.png",
  periodoncia: "./assets/img/tratamientos/tratamiento-encias.png",
  general: "./assets/img/tratamientos/limpiezas-empastes.png"
};

function procArtSVG(key) {
  const inner = (typeof ICONS !== 'undefined' && ICONS[key]) ? ICONS[key] : (ICONS.general || '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
    <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7ECE6"/><stop offset="1" stop-color="#F0DFD8"/></linearGradient></defs>
    <rect width="600" height="400" fill="url(#pg)"/>
    <circle cx="120" cy="90" r="120" fill="#A34A52" opacity="0.06"/>
    <circle cx="500" cy="330" r="140" fill="#C79A3F" opacity="0.09"/>
    <g transform="translate(300 200) scale(7)" fill="none" stroke="#A34A52" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
      <g transform="translate(-12 -12)">${inner}</g>
    </g>
  </svg>`;
}

function procArt(key, titulo) {
  const img = PROC_IMG[key];
  if (img) return `<img src="${img}" alt="Simulación de ${titulo}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
  return procArtSVG(key);
}

function renderProcedurePage(key, cfg) {
  const p = procedures[key];
  if (!p) return;
  cfg = cfg || (typeof config !== 'undefined' ? config : {});
  const main = document.querySelector('main');
  if (!main) return;

  const waMsg = `Hola, quería información sobre ${p.titulo} en ${cfg.nombre || 'la clínica'}`;
  const waHref = (typeof whatsappHref === 'function') ? whatsappHref(cfg, waMsg) : '#';
  const iconSvg = (typeof icon === 'function') ? icon('check') : '';
  const arrow = (typeof icon === 'function') ? icon('arrow') : '';

  main.innerHTML = `
    <div class="procedure-page">
      <section class="procedure-hero">
        <div class="container">
          <a href="#" class="back-button" data-home>${arrow ? '' : ''}← Volver al inicio</a>
          <h1>${p.titulo}</h1>
          <p>${p.subtitulo}</p>
        </div>
      </section>

      <section class="proc-section">
        <div class="proc-grid">
          <div class="proc-art">${procArt(key, p.titulo)}</div>
          <div>
            <p class="proc-lead">${p.descripcion}</p>
            <ul class="proc-benefits">
              ${p.beneficios.map(b => `<li>${iconSvg}<span>${b}</span></li>`).join('')}
            </ul>
            <div class="proc-meta">
              <p><strong>Duración total:</strong> ${p.duracion}</p>
              <p><strong>Cada sesión:</strong> ${p.intervencion}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="proc-section alt">
        <div class="section-header"><span class="section-header-label">Cómo trabajamos</span><h2 class="section-header-title">El proceso, paso a paso</h2></div>
        <div class="proc-steps">
          ${p.proceso.map((s, i) => `
            <div class="proc-step">
              <div class="step-num">${i + 1}</div>
              <h3>${s.titulo}</h3>
              <p>${s.descripcion}</p>
            </div>`).join('')}
        </div>
      </section>

      <section class="proc-section">
        <div class="proc-cta">
          <h2>¿Damos el primer paso?</h2>
          <p>Primera visita de valoración gratuita y presupuesto por escrito, sin compromiso.</p>
          <div class="hero-buttons">
            <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${typeof icon === 'function' ? icon('whatsapp', 'icon') : ''} Pedir cita por WhatsApp</a>
            <a href="#" class="btn btn-secondary" data-home>Volver al inicio</a>
          </div>
        </div>
      </section>
    </div>`;

  main.querySelectorAll('[data-home]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); location.reload(); });
  });

  window.scrollTo(0, 0);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderProcedurePage, procedures };
}
