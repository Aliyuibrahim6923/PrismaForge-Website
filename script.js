// PrismaForge — UI interactions

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- Year in footer ----------
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Sticky nav shadow on scroll ----------
  const nav = $('#nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Mobile nav toggle ----------
  const toggle = $('#navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    $$('.nav__links a').forEach((link) =>
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---------- Reveal on scroll ----------
  const revealTargets = [
    '.hero__content', '.hero__mockup',
    '.section-head', '.service-card',
    '.division__intro', '.feature',
    '.product', '.it-card',
    '.why__intro', '.why-card',
    '.cta__inner',
    '.contact__info', '.contact__form',
    // Academy page
    '.acad-hero__content', '.acad-hero__mockup',
    '.pillar', '.course',
    '.step', '.instructor',
    '.plan', '.testimonial',
    '.faq__intro', '.faq-item',
    '.enroll__info', '.enroll__form'
  ];
  const elements = $$(revealTargets.join(','));
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    elements.forEach((el) => io.observe(el));
  } else {
    elements.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Animated counters in hero ----------
  const counters = $$('.hero__stats strong, .why__stats strong, .acad-stats__inner strong');
  const animateCounter = (el) => {
    const text = el.textContent.trim();
    const match = text.match(/^([\d.,]+)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2];
    if (!isFinite(target)) return;

    const isInt = !match[1].includes('.');
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (target - start) * eased;
      el.textContent = isInt
        ? Math.round(value).toLocaleString() + suffix
        : value.toFixed(1) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => co.observe(el));
  }

  // ---------- Generic form handling (contact + enroll) ----------
  const handleForm = (form, note, requiredFields, successMsg) => {
    if (!form || !note) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const missing = requiredFields.find((f) => !data[f]);
      if (missing) {
        note.textContent = 'Please fill in all required fields before submitting.';
        note.classList.add('error');
        return;
      }
      note.classList.remove('error');
      note.textContent = successMsg;
      form.reset();
      setTimeout(() => { note.textContent = ''; }, 6000);
    });
  };

  handleForm(
    $('#contactForm'),
    $('#formNote'),
    ['name', 'email', 'interest'],
    'Thanks! Your message has been received. We\'ll be in touch shortly.'
  );

  handleForm(
    $('#enrollForm'),
    $('#formNote'),
    ['name', 'email', 'program'],
    'Application received! An Academy advisor will reach out within 1 business day.'
  );
})();
