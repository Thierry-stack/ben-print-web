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

  function translate(key, fallback) {
    if (typeof window.FP_t === 'function') return window.FP_t(key);
    return fallback;
  }

  const TOP_TICKER_KEYS = [
    'ticker.top.eventDiscount',
    'ticker.top.contact',
    'ticker.top.email',
    'ticker.top.freeQuote',
  ];

  const BOTTOM_TICKER_ITEMS = [
    { icon: 'pin', key: 'ticker.bottom.delivery' },
    { icon: 'check', key: 'ticker.bottom.quality' },
    { icon: 'mail', key: 'ticker.bottom.clients' },
    { icon: 'bolt', key: 'ticker.bottom.rush' },
    { icon: 'clock', key: 'ticker.bottom.proofing' },
    { icon: 'print', key: 'ticker.bottom.products' },
  ];

  const TOP_TICKER_FALLBACK = [
    'Attending or hosting an event in Kigali? Enjoy 15% off your print order.',
    'WhatsApp: 0798546769 — Call: 0788594453',
    'Email: Benjamin@freshprintrwanda.com',
    'Free quotes within 24 hours — no obligation.',
  ];

  const BOTTOM_TICKER_FALLBACK = [
    'Delivery across Rwanda',
    '100% quality guarantee',
    'Local & international clients',
    'Same-day & rush options',
    'Free file review & proofing',
    'Business cards, banners, flyers & apparel',
  ];

  function getTopTickerItems() {
    return TOP_TICKER_KEYS.map((key, i) => ({
      text: translate(key, TOP_TICKER_FALLBACK[i]),
    }));
  }

  function getBottomTickerItems() {
    return BOTTOM_TICKER_ITEMS.map((item, i) => ({
      icon: item.icon,
      text: translate(item.key, BOTTOM_TICKER_FALLBACK[i]),
    }));
  }

  function fillTickerTrack(track, items, variant) {
    track.innerHTML = '';
    track.appendChild(buildTickerGroup(items, variant));
    const duplicate = buildTickerGroup(items, variant);
    duplicate.setAttribute('aria-hidden', 'true');
    track.appendChild(duplicate);
  }

  function refreshSiteTickers() {
    const top = document.getElementById('siteTickerTop');
    const bottom = document.getElementById('siteTickerBottom');
    if (top) {
      top.setAttribute('aria-label', translate('ticker.top.aria', 'Announcements'));
      const track = top.querySelector('.site-ticker__track');
      if (track) fillTickerTrack(track, getTopTickerItems(), 'top');
    }
    if (bottom) {
      bottom.setAttribute('aria-label', translate('ticker.bottom.aria', 'Highlights'));
      const track = bottom.querySelector('.site-ticker__track');
      if (track) fillTickerTrack(track, getBottomTickerItems(), 'bottom');
    }
  }

  function initSiteTickers() {
    if (document.getElementById('siteTickerTop')) return;

    const topTicker = buildTicker('top', getTopTickerItems(), translate('ticker.top.aria', 'Announcements'));
    topTicker.id = 'siteTickerTop';
    document.body.insertBefore(topTicker, document.body.firstChild);

    const bottomTicker = buildTicker('bottom', getBottomTickerItems(), translate('ticker.bottom.aria', 'Highlights'));
    bottomTicker.id = 'siteTickerBottom';

    const page = document.body.dataset.page;
    if (page === 'home') {
      const anchor = document.getElementById('homeHero') || document.getElementById('heroSlider');
      if (anchor) anchor.insertAdjacentElement('afterend', bottomTicker);
    } else {
      const banner = document.querySelector('.page-banner');
      if (banner) banner.insertAdjacentElement('afterend', bottomTicker);
      else document.querySelector('main')?.prepend(bottomTicker);
    }

    document.addEventListener('fp:langchange', refreshSiteTickers);
  }

  initSiteTickers();

  // ---- Welcome slide floating shapes (home only) ----
  const WELCOME_SHAPE_DELAYS = [0.3, 0.5, 0.4, 0.6, 0.7];
  let welcomeShapesEntranceDone = false;

  function restartCssAnimation(el) {
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = '';
  }

  function startWelcomeShapeEntrance(shape, delay) {
    shape.classList.remove('is-floating', 'is-entered');
    restartCssAnimation(shape);
    restartCssAnimation(shape.querySelector('.hero-shape__inner'));

    shape.style.animation = `shapeEnter 2.4s cubic-bezier(0.23, 0.86, 0.39, 0.96) ${delay}s forwards`;

    const onEnterEnd = (event) => {
      if (event.animationName !== 'shapeEnter') return;
      shape.removeEventListener('animationend', onEnterEnd);
      shape.style.animation = '';
      shape.classList.add('is-entered', 'is-floating');
    };

    shape.addEventListener('animationend', onEnterEnd);
  }

  function activateWelcomeShapes() {
    const shapes = document.querySelectorAll('.hero-shapes .hero-shape');
    if (!shapes.length) return;

    if (!welcomeShapesEntranceDone) {
      welcomeShapesEntranceDone = true;
      shapes.forEach((shape, index) => {
        startWelcomeShapeEntrance(shape, WELCOME_SHAPE_DELAYS[index] || 0);
      });
      return;
    }

    shapes.forEach((shape) => {
      shape.classList.add('is-entered', 'is-floating');
      restartCssAnimation(shape);
      restartCssAnimation(shape.querySelector('.hero-shape__inner'));
    });
  }

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

    if (currentSlide === 0) {
      activateWelcomeShapes();
    }

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
      btn.textContent = typeof window.FP_t === 'function' ? window.FP_t('form.contact.sent') : 'Sent! We\'ll be in touch.';
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

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach((el) => el.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  // ---- Fade-in on scroll ----
  const observerTargets = document.querySelectorAll(
    '.reveal, .service-card, .stat, .about__content, .blog-card, .home-link-card, .process-step, .gallery-item, .work-mosaic__item, .value-card, .section-header, .testimonial-card, .price-card, .product-item, .industry-card, .faq-item'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.classList.contains('reveal')) {
              observer.unobserve(entry.target);
              return;
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observerTargets.forEach(el => {
      if (el.classList.contains('reveal')) {
        observer.observe(el);
        return;
      }
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // ---- Showcase carousels (products & industries) ----
  function initShowcases() {
    document.querySelectorAll('.showcase__carousel').forEach((carousel) => {
      const track = carousel.querySelector('[data-showcase]');
      if (!track) return;

      const prevBtns = carousel.querySelectorAll('[data-showcase-prev]');
      const nextBtns = carousel.querySelectorAll('[data-showcase-next]');
      const thumb = carousel.querySelector('.showcase__scrollbar-thumb');

      function getScrollAmount() {
        const card = track.querySelector('.showcase-card');
        return card ? card.offsetWidth + 16 : 220;
      }

      function updateScrollbar() {
        if (!thumb) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) {
          thumb.style.width = '100%';
          thumb.style.left = '0';
          return;
        }
        const ratio = track.clientWidth / track.scrollWidth;
        const thumbWidth = Math.max(ratio * 100, 12);
        const left = (track.scrollLeft / maxScroll) * (100 - thumbWidth);
        thumb.style.width = `${thumbWidth}%`;
        thumb.style.left = `${left}%`;
      }

      function updateButtons() {
        const atStart = track.scrollLeft <= 4;
        const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
        prevBtns.forEach((btn) => { btn.disabled = atStart; });
        nextBtns.forEach((btn) => { btn.disabled = atEnd; });
      }

      function scrollByDir(dir) {
        track.scrollBy({ left: dir * getScrollAmount(), behavior: 'smooth' });
      }

      prevBtns.forEach((btn) => btn.addEventListener('click', () => scrollByDir(-1)));
      nextBtns.forEach((btn) => btn.addEventListener('click', () => scrollByDir(1)));

      track.addEventListener('scroll', () => {
        updateScrollbar();
        updateButtons();
      }, { passive: true });

      window.addEventListener('resize', () => {
        updateScrollbar();
        updateButtons();
      });

      updateScrollbar();
      updateButtons();
    });
  }

  initShowcases();

  // ---- Newsletter form ----
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = typeof window.FP_t === 'function' ? window.FP_t('form.newsletter.subscribed') : 'Subscribed!';
      btn.disabled = true;
      setTimeout(() => {
        newsletterForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2500);
    });
  }
})();
