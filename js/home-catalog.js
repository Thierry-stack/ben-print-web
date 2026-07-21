/**
 * Homepage catalog — tap a category to open a swipeable image lightbox
 */
(function () {
  'use strict';

  if (document.body.dataset.page !== 'home') return;

  const CATALOG = {
    'business-cards': {
      titleKey: 'home.catalog.businessCards',
      title: 'Business Cards',
      productLink: 'contact.html#quote',
      cover: 'images/business card 1.jpg',
      coverAlt: 'Business cards',
      images: [
        { src: 'images/business card 2.jpg', alt: 'Business cards sample 2' },
        { src: 'images/business card 3.jpg', alt: 'Business cards sample 3' },
        { src: 'images/business card 4.jpg', alt: 'Business cards sample 4' },
        { src: 'images/business card 8.jpg', alt: 'Business cards sample 8' },
        { src: 'images/business card7.jpg', alt: 'Business cards sample 7' },
        { src: 'images/business card.jpg', alt: 'Business cards' },
      ],
    },
    'custom-bags': {
      titleKey: 'home.catalog.customBags',
      title: 'Custom Bags',
      productLink: 'contact.html#quote',
      cover: 'images/custom bag1.jpg',
      coverAlt: 'Custom branded bags',
      images: [
        { src: 'images/custom bag 2.jpg', alt: 'Custom bag 2' },
        { src: 'images/custom bag 3.jpg', alt: 'Custom bag 3' },
        { src: 'images/custom bag 4.jpg', alt: 'Custom bag 4' },
        { src: 'images/custom bag 5.jpg', alt: 'Custom bag 5' },
        { src: 'images/custom bag6.jpg', alt: 'Custom bag 6' },
        { src: 'images/custom bag 7.jpg', alt: 'Custom bag 7' },
        { src: 'images/custom bag 8.jpg', alt: 'Custom bag 8' },
        { src: 'images/custom bag 9.jpg', alt: 'Custom bag 9' },
      ],
    },
    'drink-wares': {
      titleKey: 'home.catalog.drinkWares',
      title: 'Custom Branded Drink Wares',
      productLink: 'contact.html#quote',
      cover: 'images/drink wares 1.jpg',
      coverAlt: 'Custom branded drink wares',
      images: [
        { src: 'images/drink wares 2.jpg', alt: 'Drink ware 2' },
        { src: 'images/drink wares 3.jpg', alt: 'Drink ware 3' },
        { src: 'images/drink wares 4.jpg', alt: 'Drink ware 4' },
        { src: 'images/drink wares 5.jpg', alt: 'Drink ware 5' },
      ],
    },
    garments: {
      titleKey: 'home.catalog.garments',
      title: 'Garments and Work Wears',
      productLink: 'contact.html#quote',
      cover: 'images/garments and work wears 1.jpg',
      coverAlt: 'Garments and work wear',
      images: [
        { src: 'images/garments and work wears 4.jpg', alt: 'Work wear 4' },
        { src: 'images/garments and work wears 5.jpg', alt: 'Work wear 5' },
        { src: 'images/garmentss and work wears 3.jpg', alt: 'Work wear 3' },
      ],
    },
    stationary: {
      titleKey: 'home.catalog.stationary',
      title: 'Stationery',
      productLink: 'contact.html#quote',
      cover: 'images/stationary 1.jpg',
      coverAlt: 'Stationery printing',
      images: [
        { src: 'images/stationary 2.jpg', alt: 'Stationery 2' },
        { src: 'images/stationary 3.jpg', alt: 'Stationery 3' },
        { src: 'images/stationary 4.jpg', alt: 'Stationery 4' },
        { src: 'images/stationary 5.jpg', alt: 'Stationery 5' },
      ],
    },
    'large-format': {
      titleKey: 'home.catalog.largeFormat',
      title: 'Large Format Printing',
      productLink: 'contact.html#quote',
      cover: 'images/large format printing 1.jpg',
      coverAlt: 'Large format printing',
      images: [
        { src: 'images/large format printing 2.jpg', alt: 'Large format 2' },
        { src: 'images/large format printing 3.jpg', alt: 'Large format 3' },
        { src: 'images/work-banner-signage.jpeg', alt: 'Banner and signage' },
      ],
    },
    electronics: {
      titleKey: 'home.catalog.electronics',
      title: 'Electronics and Accessories',
      productLink: 'contact.html#quote',
      cover: 'images/Electronic and accessories 1.jpg',
      coverAlt: 'Electronics and accessories',
      images: [
        { src: 'images/Electronic and accessories 2.jpg', alt: 'Electronics 2' },
        { src: 'images/Electronic and accessories 3.jpg', alt: 'Electronics 3' },
        { src: 'images/Electronic and accessories 4.jpg', alt: 'Electronics 4' },
        { src: 'images/Electronic and accessories 5.jpg', alt: 'Electronics 5' },
      ],
    },
    giveaways: {
      titleKey: 'home.catalog.giveaways',
      title: 'Other Giveaways',
      productLink: 'contact.html#quote',
      cover: 'images/give aways1.jpg',
      coverAlt: 'Promotional giveaways',
      images: [
        { src: 'images/give aways 2.jpg', alt: 'Giveaway 2' },
        { src: 'images/give aways 4.jpg', alt: 'Giveaway 4' },
        { src: 'images/give aways 6.jpg', alt: 'Giveaway 6' },
        { src: 'images/give aways 7.jpg', alt: 'Giveaway 7' },
        { src: 'images/give aways 8.jpg', alt: 'Giveaway 8' },
        { src: 'images/give aways 9.jpg', alt: 'Giveaway 9' },
        { src: 'images/give aways3.jpg', alt: 'Giveaway 3' },
        { src: 'images/give aways.jpg', alt: 'Giveaways' },
        { src: 'images/key holders.jpeg', alt: 'Promotional key holders' },
      ],
    },
    posters: {
      titleKey: 'home.catalog.posters',
      title: 'Posters, Photo & Frame',
      productLink: 'contact.html#quote',
      cover: 'images/arts design.jpeg',
      coverAlt: 'Posters, photo and frame',
      images: [
        { src: 'images/arts design1.jpeg', alt: 'Poster and design 2' },
        { src: 'images/postcard.jpeg', alt: 'Posters and postcards' },
        { src: 'images/work-flyers-brochures.jpeg', alt: 'Posters and flyers' },
        { src: 'images/books.jpeg', alt: 'Photo books' },
        { src: 'images/books1.jpeg', alt: 'Framed photo prints' },
      ],
    },
    'corporate-events': {
      titleKey: 'home.catalog.corporateEvents',
      title: 'Corporate Event and Display',
      productLink: 'contact.html#quote',
      cover: 'images/coporate event and display 1.jpg',
      coverAlt: 'Corporate event and display',
      images: [
        { src: 'images/coporate event and display 3.jpg', alt: 'Corporate display 3' },
        { src: 'images/coporate event and display 4.jpg', alt: 'Corporate display 4' },
        { src: 'images/coporate event and display 5.jpg', alt: 'Corporate display 5' },
        { src: 'images/corporate event and display 5.jpg', alt: 'Corporate event setup' },
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
  let touchStartY = 0;
  let touchMoved = false;

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
      touchStartY = event.changedTouches[0].screenY;
      touchMoved = false;
      track.style.transition = 'none';
    },
    { passive: true }
  );

  viewport.addEventListener(
    'touchmove',
    (event) => {
      const dx = event.changedTouches[0].screenX - touchStartX;
      const dy = event.changedTouches[0].screenY - touchStartY;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) touchMoved = true;
      const offset = -currentIndex * 100 + (dx / viewport.offsetWidth) * 100;
      track.style.transform = `translateX(${offset}%)`;
    },
    { passive: true }
  );

  viewport.addEventListener(
    'touchend',
    (event) => {
      const delta = event.changedTouches[0].screenX - touchStartX;
      if (!touchMoved && Math.abs(delta) < 12) {
        closeLightbox();
        return;
      }
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
