// =========================================================
// Marcela Lima Epilação — Interações do site
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Alternância de tema claro/escuro ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Header: sombra ao rolar ---------- */
  const header = document.querySelector('.header');
  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Destaque do item ativo no menu ---------- */
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- Menu mobile ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  const closeMenu = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('mobile-open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navToggle.classList.add('active');
    navMenu.classList.add('mobile-open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (navToggle && navMenu && navOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('mobile-open');
      isOpen ? closeMenu() : openMenu();
    });
    navOverlay.addEventListener('click', closeMenu);
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Animação de revelação ao rolar ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Botão voltar ao topo ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Formulário de contato -> WhatsApp ---------- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#form-name').value.trim();
      const service = contactForm.querySelector('#form-service').value;
      const message = contactForm.querySelector('#form-message').value.trim();

      const whatsappNumber = document.body.dataset.whatsapp || '5585999999999';

      let text = `Olá, Marcela! Meu nome é ${name}.`;
      if (service) text += ` Gostaria de agendar: ${service}.`;
      if (message) text += ` ${message}`;

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ---------- Ano dinâmico no rodapé ---------- */
  const yearEl = document.querySelector('#current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
