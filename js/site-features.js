/**
 * Fresh Print — Language (EN/FR), site search
 * Requires js/i18n-content.js loaded first.
 */
(function () {
  'use strict';

  const EXTRA_I18N = {
    en: {
      'nav.search': 'Search',
      'util.phone': 'Call',
      'search.placeholder': 'Search catalogue, services, pages…',
      'search.short': 'Search…',
      'search.empty': 'No results found. Try "business cards", "bags", or "quote".',
      'search.title': 'Search Fresh Print',
      'search.close': 'Close search',
      'form.contact.sent': 'Sent! We\'ll be in touch.',
      'form.newsletter.subscribed': 'Subscribed!',
      'ticker.top.aria': 'Announcements',
      'ticker.bottom.aria': 'Highlights',
    },
    fr: {
      'nav.search': 'Rechercher',
      'util.phone': 'Appeler',
      'search.placeholder': 'Rechercher catalogue, services, pages…',
      'search.short': 'Rechercher…',
      'search.empty': 'Aucun résultat. Essayez « cartes de visite », « sacs » ou « devis ».',
      'search.title': 'Rechercher Fresh Print',
      'search.close': 'Fermer la recherche',
      'form.contact.sent': 'Envoyé ! Nous vous recontacterons.',
      'form.newsletter.subscribed': 'Inscription confirmée !',
      'ticker.top.aria': 'Annonces',
      'ticker.bottom.aria': 'Points forts',
    },
  };

  const SEARCH_INDEX = [
    { key: 'search.item.quote', url: 'contact.html#quote', keywords: 'quote estimate price free request devis', hintKey: 'search.hint.page' },
    { key: 'search.item.home', url: 'index.html#homeCatalog', keywords: 'home homepage catalogue catalog categories', hintKey: 'search.hint.page' },
    { key: 'nav.services', url: 'services.html', keywords: 'services printing solutions professional', hintKey: 'search.hint.page' },
    { key: 'nav.contact', url: 'contact.html', keywords: 'contact phone whatsapp email kn 87 kigali location', hintKey: 'search.hint.page' },
    { key: 'nav.about', url: 'about.html', keywords: 'about story team experience kigali rwanda', hintKey: 'search.hint.page' },
    { key: 'nav.faq', url: 'faq.html', keywords: 'faq questions help delivery payment turnaround rush', hintKey: 'search.hint.page' },

    { key: 'home.catalog.businessCards', url: 'index.html#homeCatalog', keywords: 'business cards cards stationery visit card kigali', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.customBags', url: 'index.html#homeCatalog', keywords: 'bags tote custom bag branded shopping', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.drinkWares', url: 'index.html#homeCatalog', keywords: 'drink ware mug cup bottle tumbler branded', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.garments', url: 'index.html#homeCatalog', keywords: 'garments apparel t-shirt work wear uniform hoodie embroidery', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.stationary', url: 'index.html#homeCatalog', keywords: 'stationery letterhead envelope notebook office print', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.largeFormat', url: 'index.html#homeCatalog', keywords: 'large format banner signage poster roll-up outdoor', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.electronics', url: 'index.html#homeCatalog', keywords: 'electronics accessories usb power bank tech branded', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.giveaways', url: 'index.html#homeCatalog', keywords: 'giveaways promotional gift merchandise swag key holder', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.posters', url: 'index.html#homeCatalog', keywords: 'posters photo frame canvas wall art print', hintKey: 'search.hint.catalog' },
    { key: 'home.catalog.corporateEvents', url: 'index.html#homeCatalog', keywords: 'corporate event conference display expo booth branding', hintKey: 'search.hint.catalog' },

    { key: 'services.card1.title', url: 'services.html', keywords: 'business cards foil spot uv premium stock', hintKey: 'search.hint.services' },
    { key: 'services.card2.title', url: 'services.html', keywords: 'large format banner poster signage window graphics', hintKey: 'search.hint.services' },
    { key: 'services.card3.title', url: 'services.html', keywords: 'marketing flyers brochures catalog direct mail', hintKey: 'search.hint.services' },
    { key: 'services.card4.title', url: 'services.html', keywords: 'apparel t-shirt hoodie hat screen print embroidery', hintKey: 'search.hint.services' },
    { key: 'services.card5.title', url: 'services.html', keywords: 'rush same-day next-day fast turnaround urgent', hintKey: 'search.hint.services' },
    { key: 'services.card6.title', url: 'services.html', keywords: 'design support artwork file preparation in-house designer', hintKey: 'search.hint.services' },
  ];

  const SEARCH_LABELS = {
    en: {
      'search.item.home': 'Home — print catalogue',
      'search.item.quote': 'Get a Free Quote',
      'search.hint.catalog': 'Home catalogue',
      'search.hint.services': 'On Services page',
      'search.hint.page': 'Page',
    },
    fr: {
      'search.item.home': 'Accueil — catalogue',
      'search.item.quote': 'Devis gratuit',
      'search.hint.catalog': 'Catalogue accueil',
      'search.hint.services': 'Page Services',
      'search.hint.page': 'Page',
    },
  };

  let storedLang = localStorage.getItem('fp-lang') || 'en';
  if (storedLang !== 'en' && storedLang !== 'fr') storedLang = 'en';
  let currentLang = storedLang;

  function getDict() {
    const base = window.FP_I18N || { en: {}, fr: {} };
    return {
      en: { ...base.en, ...EXTRA_I18N.en, ...SEARCH_LABELS.en },
      fr: { ...base.fr, ...EXTRA_I18N.fr, ...SEARCH_LABELS.fr },
    };
  }

  function t(key) {
    const dict = getDict();
    return dict[currentLang]?.[key] || dict.en[key] || key;
  }

  function applyBinding([selector, key, mode]) {
    document.querySelectorAll(selector).forEach((el) => {
      const value = t(key);
      if (!value || value === key) return;
      switch (mode) {
        case 'html':
          el.innerHTML = value;
          break;
        case 'aria':
          el.setAttribute('aria-label', value);
          break;
        case 'alt':
          el.setAttribute('alt', value);
          break;
        case 'placeholder':
          el.setAttribute('placeholder', value);
          break;
        case 'title':
          el.setAttribute('title', value);
          break;
        default:
          el.textContent = value;
      }
    });
  }

  function applyPageBindings() {
    const bindings = window.FP_I18N_BINDINGS;
    if (!bindings) return;
    const page = document.body.dataset.page || '';
    (bindings.shared || []).forEach(applyBinding);
    (bindings[page] || []).forEach(applyBinding);
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = t(el.dataset.i18n);
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    applyPageBindings();

    const page = document.body.dataset.page;
    if (page) {
      const title = t(`meta.title.${page}`);
      if (title && title !== `meta.title.${page}`) document.title = title;
    }

    document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    const searchInput = document.getElementById('siteSearchInput');
    if (searchInput) searchInput.placeholder = t('search.placeholder');
    const searchTitle = document.getElementById('siteSearchTitle');
    if (searchTitle) searchTitle.textContent = t('search.title');
    const searchLabel = document.querySelector('.search-beam__label');
    if (searchLabel) searchLabel.textContent = t('search.short');
    const searchClose = document.querySelector('.site-search__close');
    if (searchClose) searchClose.setAttribute('aria-label', t('search.close'));

    document.dispatchEvent(new CustomEvent('fp:langchange', { detail: { lang: currentLang } }));
  }

  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'fr') return;
    currentLang = lang;
    localStorage.setItem('fp-lang', currentLang);
    applyTranslations();
  }

  function initUtilBar() {
    if (document.getElementById('siteUtil')) return;

    const bar = document.createElement('div');
    bar.className = 'site-util';
    bar.id = 'siteUtil';
    bar.innerHTML = `
      <div class="container site-util__inner">
        <div class="site-util__contact">
          <a href="tel:+250788594453"><span data-i18n="util.phone">Call</span>: 0788594453</a>
          <a href="mailto:Benjamin@freshprintrwanda.com">Benjamin@freshprintrwanda.com</a>
        </div>
        <div class="site-util__controls">
          <div class="lang-switcher" id="langSwitcher" role="group" aria-label="Language">
            <button type="button" class="lang-switcher__btn active" data-lang="en">EN</button>
            <button type="button" class="lang-switcher__btn" data-lang="fr">FR</button>
          </div>
        </div>
      </div>
    `;

    const header = document.getElementById('header');
    if (header) header.before(bar);
    else document.body.prepend(bar);

    bar.querySelector('#langSwitcher').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      setLanguage(btn.dataset.lang);
    });
  }

  function initSearch() {
    if (document.getElementById('siteSearchModal')) return;

    const modal = document.createElement('div');
    modal.className = 'site-search';
    modal.id = 'siteSearchModal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="site-search__backdrop" data-close-search></div>
      <div class="site-search__panel" role="dialog" aria-modal="true" aria-labelledby="siteSearchTitle">
        <h2 id="siteSearchTitle" class="visually-hidden" data-i18n="search.title">Search Fresh Print</h2>
        <div class="search-beam search-beam--modal">
          <div class="search-beam__track" aria-hidden="true"></div>
          <div class="search-beam__inner">
            <svg class="search-beam__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="search" class="search-beam__input" id="siteSearchInput" autocomplete="off" data-i18n-placeholder="search.placeholder">
            <button type="button" class="site-search__close search-beam__close" data-close-search aria-label="Close search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <ul class="site-search__results" id="siteSearchResults"></ul>
      </div>
    `;
    document.body.appendChild(modal);

    const nav = document.querySelector('.nav');
    if (nav && !document.getElementById('siteSearchOpen')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav__search-bar search-beam';
      btn.id = 'siteSearchOpen';
      btn.setAttribute('aria-label', 'Search');
      btn.dataset.i18nAria = 'nav.search';
      btn.innerHTML = `
        <div class="search-beam__track" aria-hidden="true"></div>
        <span class="search-beam__inner">
          <svg class="search-beam__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span class="search-beam__label" data-i18n="search.short">Search…</span>
        </span>
      `;
      const toggle = document.getElementById('navToggle');
      const navLinks = document.getElementById('navLinks');
      if (navLinks) navLinks.insertAdjacentElement('afterend', btn);
      else if (toggle) toggle.insertAdjacentElement('afterend', btn);
      else nav.appendChild(btn);
    }

    const openBtn = document.getElementById('siteSearchOpen');
    const input = document.getElementById('siteSearchInput');
    const results = document.getElementById('siteSearchResults');

    function openSearch() {
      modal.hidden = false;
      document.body.classList.add('search-open');
      setTimeout(() => input.focus(), 50);
      runSearch('');
    }

    function closeSearch() {
      modal.hidden = true;
      document.body.classList.remove('search-open');
      input.value = '';
    }

    function runSearch(query) {
      const q = query.trim().toLowerCase();
      const matches = q
        ? SEARCH_INDEX.filter((item) => {
            const title = t(item.key);
            const hay = `${title} ${item.keywords}`.toLowerCase();
            return hay.includes(q) || q.split(/\s+/).some((w) => w.length > 2 && hay.includes(w));
          })
        : SEARCH_INDEX.slice(0, 10);

      results.innerHTML = matches.length
        ? matches.slice(0, 10).map((item) => {
            const subtitle = item.hintKey ? t(item.hintKey) : '';
            return `
            <li><a href="${item.url}" class="site-search__result">
              <strong>${t(item.key)}</strong>
              ${subtitle ? `<span>${subtitle}</span>` : ''}
            </a></li>
          `;
          }).join('')
        : `<li class="site-search__empty">${t('search.empty')}</li>`;
    }

    openBtn?.addEventListener('click', openSearch);
    modal.querySelectorAll('[data-close-search]').forEach((el) => el.addEventListener('click', closeSearch));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeSearch();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });
    input.addEventListener('input', () => runSearch(input.value));
    document.addEventListener('fp:langchange', () => {
      if (!modal.hidden) runSearch(input.value);
    });
  }

  function initNavI18n() {
    const navMap = {
      home: 'nav.home',
      services: 'nav.services',
      about: 'nav.about',
      faq: 'nav.faq',
      contact: 'nav.contact',
    };
    document.querySelectorAll('.nav__link[data-nav]').forEach((link) => {
      const key = navMap[link.dataset.nav];
      if (key) link.dataset.i18n = key;
    });
    const cta = document.querySelector('.nav__link--cta');
    if (cta) cta.dataset.i18n = 'nav.quote';
  }

  window.FP_t = t;
  window.FP_setLanguage = setLanguage;

  initUtilBar();
  initSearch();
  initNavI18n();
  applyTranslations();
})();
