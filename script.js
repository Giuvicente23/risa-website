const intro = document.getElementById('intro');

if (intro) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const holdTime = prefersReducedMotion ? 0 : 900;
  const hideDuration = prefersReducedMotion ? 0 : 800;

  document.body.classList.add('intro-active');

  window.setTimeout(() => {
    intro.classList.add('is-hidden');
    document.body.classList.remove('intro-active');
    document.body.classList.add('is-ready');

    window.setTimeout(() => {
      intro.remove();
    }, hideDuration);
  }, holdTime);
}

const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
