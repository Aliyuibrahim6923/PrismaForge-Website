// PrismaForge Academy — course catalog filters

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const chips = $$('.filters .chip');
  const grid = $('#coursesGrid');
  const emptyState = $('#emptyState');
  if (!chips.length || !grid) return;

  const courses = $$('.course', grid);

  const applyFilter = (filter) => {
    let visibleCount = 0;
    courses.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });
    if (emptyState) emptyState.hidden = visibleCount > 0;
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => {
        c.classList.remove('is-active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-selected', 'true');
      applyFilter(chip.dataset.filter);

      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
