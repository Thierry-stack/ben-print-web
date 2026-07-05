/**
 * Fresh Print — Main interactions
 * Full-page hero slider, multi-page nav, forms
 */

(function () {
  'use strict';

  // ---- Scrolling announcement tickers ----
  const TICKER_ICONS = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  };

  function buildTickerGroup(items, variant) {
    const group = document.createElement('div');
    group.className = 'site-ticker__group';

    items.forEach((item) => {
      const el = document.createElement('span');
      el.className = 'site-ticker__item';

      if (variant === 'top') {
        const star = document.createElement('span');
        star.className = 'site-ticker__star';
        star.textContent = '★';
        el.appendChild(star);
        el.appendChild(document.createTextNode(item.text));
      } else {
        const icon = document.createElement('span');
        icon.className = 'site-ticker__icon';
        icon.innerHTML = TICKER_ICONS[item.icon] || TICKER_ICONS.check;
        el.appendChild(icon);
        el.appendChild(document.createTextNode(item.text));
      }

      group.appendChild(el);
    });

    return group;
  }

  function buildTicker(variant, items, label) {
    const ticker = document.createElement('div');
    ticker.className = `site-ticker site-ticker--${variant}`;
    ticker.setAttribute('aria-label', label);

    const viewport = document.createElement('div');
    viewport.className = 'site-ticker__viewport';

    const track = document.createElement('div');
    track.className = 'site-ticker__track';

    track.appendChild(buildTickerGroup(items, variant));
    const duplicate = buildTickerGroup(items, variant);
    duplicate.setAttribute('aria-hidden', 'true');
    track.appendChild(duplicate);

    viewport.appendChild(track);
    ticker.appendChild(viewport);
    return ticker;
  }

  function initSiteTickers() {
    if (document.getElementById('siteTickerTop')) return;

    const topItems = [
      { text: 'Attending or hosting an event in Kigali? Enjoy 15% off your print order.' },
      { text: 'WhatsApp: 0798546769 — Call: 0788594453' },
      { text: 'Email: Benjamin@freshprintrwanda.com' },
      { text: 'Free quotes within 24 hours — no obligation.' },
    ];

    const bottomItems = [
      { icon: 'pin', text: 'Delivery across Rwanda' },
      { icon: 'check', text: '100% quality guarantee' },
      { icon: 'mail', text: 'Local & international clients' },
      { icon: 'bolt', text: 'Same-day & rush options' },
      { icon: 'clock', text: 'Free file review & proofing' },
      { icon: 'print', text: 'Business cards, banners, flyers & apparel' },
    ];

    const topTicker = buildTicker('top', topItems, 'Announcements');
    topTicker.id = 'siteTickerTop';
    document.body.insertBefore(topTicker, document.body.firstChild);

    const bottomTicker = buildTicker('bottom', bottomItems, 'Highlights');
    bottomTicker.id = 'siteTickerBottom';

    const page = document.body.dataset.page;
    if (page === 'home') {
      const hero = document.getElementById('heroSlider');
      if (hero) hero.appendChild(bottomTicker);
    } else {
      const banner = document.querySelector('.page-banner');
      if (banner) banner.insertAdjacentElement('afterend', bottomTicker);
      else document.querySelector('main')?.prepend(bottomTicker);
    }
  }

  initSiteTickers();

  // ---- Active page in nav ----
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll('.nav__link[data-nav]').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === currentPage);
    });
  }

  // ---- Full-page hero slider ----
  const heroSlider = document.getElementById('heroSlider');
  const heroSliderTrack = document.getElementById('heroSliderTrack');
  const slideLabels = document.querySelectorAll('.hero-slider__label');
  const slideProgress = document.getElementById('slideProgress');
  const totalSlides = slideLabels.length;

  const SLIDE_DURATIONS = [3500, 5000, 5000, 5000, 5000]; // Welcome is shorter
  let currentSlide = 0;
  let slideTimer = null;
  let progressRAF = null;
  let progressStart = 0;

  function getSlideDuration(index) {
    return SLIDE_DURATIONS[index] || 5000;
  }

  function goToSlide(index) {
    if (!heroSliderTrack || totalSlides === 0) return;
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;

    heroSliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    slideLabels.forEach((label, i) => {
      const isActive = i === currentSlide;
      label.classList.toggle('active', isActive);
      label.setAttribute('aria-selected', isActive);
    });

    resetProgress();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function resetProgress() {
    if (progressRAF) cancelAnimationFrame(progressRAF);
    progressStart = performance.now();
    const duration = getSlideDuration(currentSlide);
    if (slideProgress) slideProgress.style.width = '0%';

    function tick(now) {
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / duration) * 100, 100);
      if (slideProgress) slideProgress.style.width = pct + '%';
      if (elapsed < duration) {
        progressRAF = requestAnimationFrame(tick);
      }
    }
    progressRAF = requestAnimationFrame(tick);
  }

  function scheduleNext() {
    stopSlider();
    const duration = getSlideDuration(currentSlide);
    slideTimer = setTimeout(() => {
      nextSlide();
      scheduleNext();
    }, duration);
    resetProgress();
  }

  function stopSlider() {
    if (slideTimer) clearTimeout(slideTimer);
    if (progressRAF) cancelAnimationFrame(progressRAF);
    slideTimer = null;
  }

  if (heroSlider && heroSliderTrack && totalSlides > 0) {
    slideLabels.forEach((label) => {
      label.addEventListener('click', () => {
        goToSlide(parseInt(label.dataset.slide, 10));
        scheduleNext();
      });
    });

    goToSlide(0);
    scheduleNext();

    heroSlider.addEventListener('mouseenter', stopSlider);
    heroSlider.addEventListener('mouseleave', scheduleNext);

    // Touch swipe support
    let touchStartX = 0;
    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentSlide - 1 : currentSlide + 1);
        scheduleNext();
      }
    }, { passive: true });
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
