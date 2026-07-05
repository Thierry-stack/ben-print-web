/**
 * Fresh Print — Main interactions
 * Moving tabs (home), multi-page nav, forms
 */

(function () {
  'use strict';

  const TAB_DURATION = 5000;
  let currentTab = 0;
  let tabTimer = null;
  let progressRAF = null;
  let progressStart = 0;

  // ---- Active page in nav ----
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll('.nav__link[data-nav]').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === currentPage);
    });
  }

  // ---- Moving Tabs (home page only) ----
  const tabsNav = document.getElementById('tabsNav');
  const tabIndicator = document.getElementById('tabIndicator');
  const tabProgress = document.getElementById('tabProgress');
  const tabButtons = tabsNav ? tabsNav.querySelectorAll('.tabs-nav__btn') : [];
  const tabPanels = document.querySelectorAll('.tabs-panel');
  const totalTabs = tabButtons.length;

  function moveIndicator(index) {
    const btn = tabButtons[index];
    if (!btn || !tabIndicator) return;
    tabIndicator.style.left = btn.offsetLeft + 'px';
    tabIndicator.style.width = btn.offsetWidth + 'px';
  }

  function switchTab(index) {
    if (index === currentTab && tabPanels[index]?.classList.contains('active')) return;
    currentTab = index;

    tabButtons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    tabPanels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });

    moveIndicator(index);
    resetProgress();
  }

  function nextTab() {
    switchTab((currentTab + 1) % totalTabs);
  }

  function resetProgress() {
    if (progressRAF) cancelAnimationFrame(progressRAF);
    progressStart = performance.now();
    if (tabProgress) tabProgress.style.width = '0%';

    function tick(now) {
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / TAB_DURATION) * 100, 100);
      if (tabProgress) tabProgress.style.width = pct + '%';
      if (elapsed < TAB_DURATION) {
        progressRAF = requestAnimationFrame(tick);
      }
    }
    progressRAF = requestAnimationFrame(tick);
  }

  function startAutoRotate() {
    stopAutoRotate();
    tabTimer = setInterval(nextTab, TAB_DURATION);
    resetProgress();
  }

  function stopAutoRotate() {
    if (tabTimer) clearInterval(tabTimer);
    if (progressRAF) cancelAnimationFrame(progressRAF);
    tabTimer = null;
  }

  if (tabsNav && totalTabs > 0) {
    tabButtons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        switchTab(i);
        startAutoRotate();
      });
    });

    switchTab(0);
    startAutoRotate();

    const showcase = document.querySelector('.tabs-showcase');
    if (showcase) {
      showcase.addEventListener('mouseenter', stopAutoRotate);
      showcase.addEventListener('mouseleave', startAutoRotate);
    }

    window.addEventListener('resize', () => moveIndicator(currentTab), { passive: true });
  }

  // ---- Mobile Nav ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ---- Contact form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sent! We\'ll be in touch.';
      btn.disabled = true;
      btn.style.opacity = '0.8';

      setTimeout(() => {
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 3000);
    });
  }

  // ---- Fade-in on scroll ----
  const observerTargets = document.querySelectorAll(
    '.service-card, .stat, .about__content, .blog-card, .home-link-card'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observerTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
})();
