/* ============================================================
   SolBemol — main.js
   JavaScript puro (sin dependencias). Interacciones base:
   1. Menú móvil accesible (abrir/cerrar, foco, Escape)
   2. Sombra del header al hacer scroll
   3. Animación de aparición de secciones al hacer scroll
   4. Año dinámico en el footer
   (La validación del formulario de contacto se añade con
    su sección — ver README.)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. MENÚ MÓVIL ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    body.classList.remove('nav-open');
  }

  function openNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    nav.classList.add('is-open');
    body.classList.add('nav-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    // Cerrar al pinchar un enlace del menú
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- 2. SOMBRA DEL HEADER AL SCROLL ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. APARICIÓN AL SCROLL (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Sin soporte: mostrar todo
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. AÑO DINÁMICO EN EL FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
