/**
 * Homepage catalog — tap a category to open a swipeable image lightbox
 */
(function () {
  'use strict';

  if (document.body.dataset.page !== 'home') return;

  const CATALOG = {
    'business-cards': {
      titleKey: 'products.businessCards.title',
      title: 'Business Cards',
      productLink: 'products.html#business-cards',
      cover: 'images/business cards.png',
      coverAlt: 'Business cards printing',
      images: [
        { src: 'images/business cards 1.jpeg', alt: 'Premium business cards' },
        { src: 'images/business cards..jpeg', alt: 'Business card samples' },
        { src: 'images/brandings.jpeg', alt: 'Branded stationery' },
        { src: 'images/postcard.jpeg', alt: 'Postcards and flyers' },
      ],
    },
    banners: {
      titleKey: 'products.banners.title',
      title: 'Banners',
      productLink: 'products.html#banners',
      cover: 'images/work-banner-signage.jpeg',
      coverAlt: 'Large format banners and signage',
      images: [
        { src: 'images/branding.jpeg', alt: 'Branded banner display' },
        { src: 'images/branding1. .jpeg', alt: 'Roll-up banner' },
        { src: 'images/branding2.jpeg', alt: 'Event signage' },
        { src: 'images/umbrella 1.jpeg', alt: 'Branded umbrellas' },
        { src: 'images/package 1.png', alt: 'Banner package' },
        { src: 'images/package 2.png', alt: 'Display package' },
        { src: 'images/package 3.jpeg', alt: 'Booth branding' },
        { src: 'images/package 4.jpeg', alt: 'Large format print' },
      ],
    },
    apparel: {
      titleKey: 'products.apparel.title',
      title: 'Apparel',
      productLink: 'products.html#apparel',
      cover: 'images/apparel 1.png',
      coverAlt: 'Custom apparel printing',
      images: [
        { src: 'images/apparel 2.png', alt: 'Branded T-shirts' },
        { src: 'images/apparel 3.jpeg', alt: 'Event apparel' },
        { src: 'images/apparel 4.jpeg', alt: 'Staff uniforms' },
        { src: 'images/apparel 5.jpeg', alt: 'Custom hoodies' },
        { src: 'images/apparel 6.png', alt: 'Team wear' },
        { src: 'images/T-shirt3.jpeg', alt: 'T-shirt printing' },
        { src: 'images/hat1.jpeg', alt: 'Branded caps' },
      ],
    },
    events: {
      titleKey: 'home.catalogue.eventsConference',
      title: 'Events & Conference',
      productLink: 'products.html#events',
      cover: 'images/events and conference..jpeg',
      coverAlt: 'Events and conference branding',
      images: [
        { src: 'images/events and conference 1.jpeg', alt: 'Conference setup' },
        { src: 'images/events and conference 2.jpeg', alt: 'Event branding' },
      ],
    },
  };

  function t(key, fallback) {
    if (typeof window.FP_t === 'function') return window.FP_t(key);
    return fallback;
  }

  function encodeSrc(path) {
    return path.split('/').map((part, i) => (i === 0 ? part : encodeURIComponent(part))).join('/');
  }

  const grid = document.getElementById('homeCatalogGrid');
  const lightbox = document.getElementById('homeCatalogLightbox');
  const track = document.getElementById('homeCatalogTrack');
  const viewport = document.getElementById('homeCatalogViewport');
  const titleEl = document.getElementById('homeCatalogLightboxTitle');
  const counterEl = document.getElementById('homeCatalogCounter');
  const linkEl = document.getElementById('homeCatalogLightboxLink');
  const prevBtn = document.getElementById('homeCatalogPrev');
  const nextBtn = document.getElementById('homeCatalogNext');

  if (!grid || !lightbox || !track || !viewport) return;

  let activeId = null;
  let slides = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchDeltaX = 0;

  function getCategoryTitle(id) {
    const cat = CATALOG[id];
    if (!cat) return '';
    return t(cat.titleKey, cat.title);
  }

  function getSlides(cat) {
    const all = [{ src: cat.cover, alt: cat.coverAlt }, ...cat.images];
    const seen = new Set();
    return all.filter((img) => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    });
  }

  function updateCounter() {
    if (!counterEl || slides.length === 0) return;
    counterEl.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  function updateNav() {
    const single = slides.length <= 1;
    if (prevBtn) prevBtn.disabled = single || currentIndex === 0;
    if (nextBtn) nextBtn.disabled = single || currentIndex === slides.length - 1;
  }

  function goTo(index, animate) {
    if (slides.length === 0) return;
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transition = animate === false ? 'none' : 'transform 0.35s ease';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateCounter();
    updateNav();
  }

  function openCategory(id) {
    const cat = CATALOG[id];
    if (!cat) return;

    activeId = id;
    slides = getSlides(cat);
    currentIndex = 0;

    titleEl.textContent = getCategoryTitle(id);
    linkEl.href = cat.productLink;

    track.innerHTML = slides
      .map(
        (img) => `
        <figure class="home-catalog-lightbox__slide">
          <img src="${encodeSrc(img.src)}" alt="${img.alt.replace(/"/g, '&quot;')}" draggable="false">
        </figure>`
      )
      .join('');

    goTo(0, false);

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('catalog-lightbox-open');
    lightbox.querySelector('.home-catalog-lightbox__close')?.focus();
  }

  function closeLightbox() {
    activeId = null;
    slides = [];
    currentIndex = 0;
    track.innerHTML = '';
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('catalog-lightbox-open');
  }

  grid.addEventListener('click', (event) => {
    const item = event.target.closest('[data-catalog]');
    if (!item) return;
    openCategory(item.dataset.catalog);
  });

  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const item = event.target.closest('[data-catalog]');
    if (!item) return;
    event.preventDefault();
    openCategory(item.dataset.catalog);
  });

  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

  lightbox.querySelectorAll('[data-catalog-close]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (event.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  viewport.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
      touchDeltaX = 0;
      track.style.transition = 'none';
    },
    { passive: true }
  );

  viewport.addEventListener(
    'touchmove',
    (event) => {
      touchDeltaX = event.changedTouches[0].screenX - touchStartX;
      const offset = -currentIndex * 100 + (touchDeltaX / viewport.offsetWidth) * 100;
      track.style.transform = `translateX(${offset}%)`;
    },
    { passive: true }
  );

  viewport.addEventListener(
    'touchend',
    (event) => {
      const delta = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 50) {
        goTo(delta < 0 ? currentIndex + 1 : currentIndex - 1);
      } else {
        goTo(currentIndex);
      }
    },
    { passive: true }
  );

  document.addEventListener('fp:langchange', () => {
    if (activeId) titleEl.textContent = getCategoryTitle(activeId);
  });
})();
