/**
 * ELEMENTAL — PREMIUM LUXURY FASHION E-COMMERCE
 * File: js/animations.js
 * Orchestrates GSAP + ScrollTrigger entrance & scroll animations,
 * subtle editorial parallax, and IntersectionObserver fallbacks.
 */

(function () {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initElementalAnimations() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-up').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Use GSAP if loaded
    if (typeof window.gsap !== 'undefined') {
      const gsap = window.gsap;
      if (typeof window.ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(window.ScrollTrigger);
      }

      // Hero Entrance Timeline
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });
        tl.fromTo(
          '.hero-philosophy-pill',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75 }
        )
          .fromTo(
            '.hero-title',
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 1.0 },
            '-=0.45'
          )
          .fromTo(
            '.hero-description',
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.85 },
            '-=0.65'
          )
          .fromTo(
            '.hero-cta-group',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75 },
            '-=0.55'
          )
          .fromTo(
            '.hero-editorial-frame',
            { opacity: 0, scale: 0.96, y: 24 },
            { opacity: 1, scale: 1, y: 0, duration: 1.15 },
            '-=0.85'
          );
      }
    }

    // IntersectionObserver for all .reveal-up elements (works both with and without GSAP)
    refreshRevealObserver();
  }

  function refreshRevealObserver() {
    const elements = document.querySelectorAll('.reveal-up:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('js-anim-ready');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  window.refreshRevealObserver = refreshRevealObserver;
  document.addEventListener('DOMContentLoaded', initElementalAnimations);
})();

