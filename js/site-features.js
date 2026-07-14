/**
 * Fresh Print — Language (EN/FR), currency, site search
 * Requires js/i18n-content.js loaded first.
 */
(function () {
  'use strict';

  const RWF_TO_USD = 1 / 1300;

  const EXTRA_I18N = {
    en: {
      'nav.search': 'Search',
      'util.phone': 'Call',
      'search.placeholder': 'Search products, services, pages…',
      'search.short': 'Search…',
      'search.empty': 'No results found. Try "business cards" or "banners".',
      'search.title': 'Search Fresh Print',
      'search.close': 'Close search',
      'currency.rwf': 'RWF',
      'currency.usd': 'USD',
      'form.contact.sent': 'Sent! We\'ll be in touch.',
      'form.newsletter.subscribed': 'Subscribed!',
      'ticker.top.aria': 'Announcements',
      'ticker.bottom.aria': 'Highlights',
    },
    fr: {
      'nav.search': 'Rechercher',
      'util.phone': 'Appeler',
      'search.placeholder': 'Rechercher produits, services, pages…',
      'search.short': 'Rechercher…',
      'search.empty': 'Aucun résultat. Essayez « cartes de visite » ou « bannières ».',
      'search.title': 'Rechercher Fresh Print',
      'search.close': 'Fermer la recherche',
      'currency.rwf': 'RWF',
      'currency.usd': 'USD',
      'form.contact.sent': 'Envoyé ! Nous vous recontacterons.',
      'form.newsletter.subscribed': 'Inscription confirmée !',
      'ticker.top.aria': 'Annonces',
      'ticker.bottom.aria': 'Points forts',
    },
  };

  const SEARCH_INDEX = [
    { key: 'search.item.businessCards', url: 'products.html#business-cards', keywords: 'business cards stationery cards kigali' },
    { key: 'search.item.banners', url: 'products.html#banners', keywords: 'banner signage large format roll-up' },
    { key: 'search.item.marketing', url: 'products.html#marketing', keywords: 'flyers brochures posters marketing' },
    { key: 'search.item.apparel', url: 'products.html#apparel', keywords: 'apparel t-shirt hoodie embroidery screen print' },
    { key: 'search.item.promotional', url: 'products.html#promotional', keywords: 'mug bag promotional giveaway merchandise' },
    { key: 'search.item.stickers', url: 'products.html#stickers', keywords: 'stickers labels decals' },
    { key: 'search.item.packaging', url: 'products.html#packaging', keywords: 'packaging boxes custom print' },
    { key: 'search.item.design', url: 'products.html#design', keywords: 'design branding logo artwork' },
    { key: 'search.item.events', url: 'products.html#events', keywords: 'event conference expo booth badges' },
    { key: 'search.item.copy', url: 'products.html#copy', keywords: 'copy printing binding documents' },
    { key: 'search.item.photo', url: 'products.html#photo', keywords: 'photo canvas wall art print' },
    { key: 'search.item.books', url: 'products.html#books', keywords: 'books calendars binding wire' },
    { key: 'search.item.deals', url: 'deals.html', keywords: 'deals offers discount promo 15% expo' },
    { key: 'search.item.boothKit', url: 'deals.html#booth-kit', keywords: 'expo booth kit banner t-shirt flyers package' },
    { key: 'search.item.services', url: 'services.html', keywords: 'services printing rush turnaround' },
    { key: 'search.item.about', url: 'about.html', keywords: 'about story kigali rwanda fresh print' },
    { key: 'search.item.contact', url: 'contact.html', keywords: 'contact quote phone whatsapp email kn 87' },
    { key: 'search.item.faq', url: 'faq.html', keywords: 'faq questions help turnaround delivery payment' },
    { key: 'search.item.blog', url: 'blog.html', keywords: 'blog tips design eco-friendly' },
    { key: 'search.item.industryEvents', url: 'products.html#industry-events', keywords: 'conference event delegate exhibitor' },
    { key: 'search.item.industryWeddings', url: 'products.html#industry-weddings', keywords: 'wedding invitation party' },
    { key: 'search.item.industryCorporate', url: 'products.html#industry-corporate', keywords: 'corporate office branding stationery' },
  ];

  const SEARCH_LABELS = {
    en: {
      'search.item.businessCards': 'Business Cards & Stationery',
      'search.item.banners': 'Banners & Large Format',
      'search.item.marketing': 'Flyers, Brochures & Marketing',
      'search.item.apparel': 'Custom Apparel & T-Shirts',
      'search.item.promotional': 'Promotional Items & Giveaways',
      'search.item.stickers': 'Stickers & Labels',
      'search.item.packaging': 'Packaging & Boxes',
      'search.item.design': 'Graphic Design & Branding',
      'search.item.events': 'Event Branding & Setup',
      'search.item.copy': 'Copy & Document Services',
      'search.item.photo': 'Photo, Canvas & Wall Décor',
      'search.item.books': 'Books, Calendars & Binding',
      'search.item.deals': 'Current Deals & Offers',
      'search.item.boothKit': 'Expo Booth Kit — RWF 450,000',
      'search.item.services': 'Services Overview',
      'search.item.about': 'About Fresh Print',
      'search.item.contact': 'Contact & Quote',
      'search.item.faq': 'FAQs',
      'search.item.blog': 'Blog — Printing Tips',
      'search.item.industryEvents': 'Conferences & Events Industry',
      'search.item.industryWeddings': 'Weddings & Parties',
      'search.item.industryCorporate': 'Office & Corporate Branding',
    },
    fr: {
      'search.item.businessCards': 'Cartes de visite & papeterie',
      'search.item.banners': 'Bannières & grand format',
      'search.item.marketing': 'Flyers, brochures & marketing',
      'search.item.apparel': 'Vêtements personnalisés & T-shirts',
      'search.item.promotional': 'Articles promotionnels & cadeaux',
      'search.item.stickers': 'Autocollants & étiquettes',
      'search.item.packaging': 'Emballages & boîtes',
      'search.item.design': 'Design graphique & branding',
      'search.item.events': 'Branding & stands événementiels',
      'search.item.copy': 'Copie & services documentaires',
      'search.item.photo': 'Photo, canvas & déco murale',
      'search.item.books': 'Livres, calendriers & reliure',
      'search.item.deals': 'Offres & promotions actuelles',
      'search.item.boothKit': 'Kit stand expo — 450 000 RWF',
      'search.item.services': 'Aperçu des services',
      'search.item.about': 'À propos de Fresh Print',
      'search.item.contact': 'Contact & devis',
      'search.item.faq': 'Questions fréquentes',
      'search.item.blog': 'Blog — conseils d\'impression',
      'search.item.industryEvents': 'Conférences & événements',
      'search.item.industryWeddings': 'Mariages & fêtes',
      'search.item.industryCorporate': 'Bureau & entreprise',
    },
  };

  let storedLang = localStorage.getItem('fp-lang') || 'en';
  if (storedLang !== 'en' && storedLang !== 'fr') storedLang = 'en';
  let currentLang = storedLang;
  let currentCurrency = localStorage.getItem('fp-currency') || 'RWF';

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

  function formatPrice(rwf) {
    if (currentCurrency === 'USD') {
      const usd = Math.round(rwf * RWF_TO_USD);
      return `USD ${usd.toLocaleString('en-US')}`;
    }
    return `RWF ${Number(rwf).toLocaleString('en-US')}`;
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
    document.querySelectorAll('.currency-switcher__btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.currency === currentCurrency);
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

  function applyCurrency() {
    document.querySelectorAll('[data-rwf]').forEach((el) => {
      const rwf = parseInt(el.dataset.rwf, 10);
      if (!isNaN(rwf)) el.textContent = formatPrice(rwf);
    });
    document.querySelectorAll('[data-rwf-from][data-rwf-to]').forEach((el) => {
      const from = parseInt(el.dataset.rwfFrom, 10);
      const to = parseInt(el.dataset.rwfTo, 10);
      if (!isNaN(from) && !isNaN(to)) {
        el.textContent = `${formatPrice(from)} – ${formatPrice(to)}`;
      }
    });
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
          <div class="currency-switcher" id="currencySwitcher" role="group" aria-label="Currency">
            <button type="button" class="currency-switcher__btn active" data-currency="RWF">RWF</button>
            <button type="button" class="currency-switcher__btn" data-currency="USD">USD</button>
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

    bar.querySelector('#currencySwitcher').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-currency]');
      if (!btn) return;
      currentCurrency = btn.dataset.currency;
      localStorage.setItem('fp-currency', currentCurrency);
      applyCurrency();
      applyTranslations();
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
        : SEARCH_INDEX.slice(0, 8);

      results.innerHTML = matches.length
        ? matches.slice(0, 10).map((item) => `
            <li><a href="${item.url}" class="site-search__result">
              <strong>${t(item.key)}</strong>
              <span>${item.keywords.split(' ').slice(0, 4).join(' · ')}</span>
            </a></li>
          `).join('')
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
      products: 'nav.products',
      services: 'nav.services',
      deals: 'nav.deals',
      about: 'nav.about',
      blog: 'nav.blog',
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
  applyCurrency();
})();
