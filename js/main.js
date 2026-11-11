/**
 * ELEMENTAL — PREMIUM LUXURY FASHION E-COMMERCE
 * File: js/main.js
 * Core application controller:
 *  - Global Glassmorphism Overlays (Search, Cart, Wishlist, Quick-View, Account, Demo Checkout)
 *  - Dynamic Product Grids, Category Filtering & Sorting
 *  - Product Quick-View & Product Detail Page (product.html) hydration
 *  - Newsletter & Contact Form Validation
 *  - Navigation, Sticky Header & Back-to-Top
 */

(function () {
  // =========================================================================
  // 1. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  function showElementalToast(message) {
    let container = document.getElementById('elemental-toast-area');
    if (!container) {
      container = document.createElement('div');
      container.id = 'elemental-toast-area';
      container.className = 'toast-Area';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <span class="pulse-dot"></span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3400);
  }
  window.showElementalToast = showElementalToast;

  // =========================================================================
  // 2. INJECT SHARED GLASSMORPHISM DRAWERS & MODALS ACROSS ALL PAGES
  // =========================================================================
  function injectGlobalOverlays() {
    if (document.getElementById('global-backdrop')) return;

    const overlaysHTML = `
      <!-- Shared Backdrop -->
      <div id="global-backdrop" class="backdrop-overlay" aria-hidden="true"></div>

      <!-- Glassmorphism Search Overlay -->
      <div id="search-overlay" class="search-overlay" role="dialog" aria-modal="true" aria-label="Search Elemental Catalog">
        <div class="container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <span class="eyebrow" style="margin-bottom:0;">Search Atelier Archive</span>
            <button type="button" class="icon-btn" id="close-search-btn" aria-label="Close Search">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="search-bar-wrap">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="search"
                   id="global-search-input"
                   class="search-bar-input"
                   placeholder="Search coats, silk dresses, cashmere, watches, totes..."
                   autocomplete="off"
                   aria-label="Search products" />
          </div>
          <div id="search-results-count" style="font-size:0.76rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--color-taupe); margin-bottom:1.25rem;">
            Showing Popular Atelier Pieces
          </div>
          <div id="search-results-grid" class="search-results-grid"></div>
        </div>
      </div>

      <!-- Shopping Bag Side Drawer -->
      <aside id="cart-drawer" class="side-drawer" role="dialog" aria-modal="true" aria-label="Shopping Bag">
        <div class="drawer-header">
          <div>
            <span class="eyebrow" style="margin-bottom:0.2rem;">Your Selection</span>
            <h3 class="serif-heading">Shopping Bag (<span data-cart-count>0</span>)</h3>
          </div>
          <button type="button" class="icon-btn" data-close-cart aria-label="Close Shopping Bag">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div id="cart-drawer-body" class="drawer-body"></div>
        <div id="cart-drawer-footer" class="drawer-footer">
          <div class="cart-summary-row">
            <span>Subtotal</span>
            <span id="cart-subtotal-amount">PKR 0</span>
          </div>
          <div class="cart-summary-row">
            <span>White-Glove Courier</span>
            <span id="cart-shipping-amount">Complimentary</span>
          </div>
          <div class="cart-summary-row total">
            <span>Total (PKR)</span>
            <span id="cart-total-amount">PKR 0</span>
          </div>
          <p style="font-size:0.72rem; color:var(--color-taupe); margin: 0.75rem 0 1rem;">
            Includes luxury garment packaging &amp; authenticity certificate.
          </p>
          <button type="button" class="btn btn-primary" style="width:100%;" data-proceed-checkout>
            Proceed to Checkout
          </button>
        </div>
      </aside>

      <!-- Wishlist Side Drawer -->
      <aside id="wishlist-drawer" class="side-drawer" role="dialog" aria-modal="true" aria-label="Private Wishlist">
        <div class="drawer-header">
          <div>
            <span class="eyebrow" style="margin-bottom:0.2rem;">Saved Pieces</span>
            <h3 class="serif-heading">Private Wishlist</h3>
          </div>
          <button type="button" class="icon-btn" data-close-wishlist aria-label="Close Wishlist">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div id="wishlist-drawer-body" class="drawer-body"></div>
      </aside>

      <!-- Product Quick-View Glass Modal -->
      <div id="quickview-modal-container" class="modal-container" role="dialog" aria-modal="true" aria-label="Product Quick View">
        <div class="quickview-modal" id="quickview-modal-content"></div>
      </div>

      <!-- Client Account / Atelier Member Demo Modal -->
      <div id="account-modal-container" class="modal-container" role="dialog" aria-modal="true" aria-label="Client Account Portal">
        <div class="glass-panel" style="width:100%; max-width:460px; padding:2.5rem; border-radius:4px; position:relative; background:rgba(245,242,235,0.95);">
          <button type="button" class="modal-close-btn" data-close-modals aria-label="Close Account Modal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <span class="eyebrow">Private Client Services</span>
          <h3 class="serif-heading" style="font-size:2rem; margin-bottom:0.5rem;">ELEMENTAL Privé</h3>
          <p style="font-size:0.86rem; color:var(--color-taupe); margin-bottom:1.4rem;">
            Sign in to access your saved measurements, private appointments, and archive orders.
          </p>
          <div class="demo-badge-notice" style="margin-bottom:1.25rem; width:100%;">
            <span>Interactive Frontend Demo — Client Authentication Preview</span>
          </div>
          <form id="account-demo-form">
            <div class="form-group">
              <label class="form-label" for="acc-email">Email Address</label>
              <input type="email" id="acc-email" class="form-control" placeholder="client@elemental-luxury.com" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="acc-pass">Passcode</label>
              <input type="password" id="acc-pass" class="form-control" placeholder="••••••••" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Enter Atelier Portal</button>
          </form>
        </div>
      </div>

      <!-- Interactive Frontend Demo Checkout Modal -->
      <div id="checkout-demo-modal" class="modal-container" role="dialog" aria-modal="true" aria-label="Luxury Checkout Preview">
        <div class="glass-panel" style="width:100%; max-width:560px; max-height:90vh; overflow-y:auto; padding:2.5rem; border-radius:4px; position:relative; background:rgba(245,242,235,0.96);">
          <button type="button" class="modal-close-btn" data-close-modals aria-label="Close Checkout Modal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <span class="eyebrow">Elemental Concierge Checkout</span>
          <h3 class="serif-heading" style="font-size:2rem; margin-bottom:0.4rem;">Order Reservation</h3>
          <div class="demo-badge-notice" style="margin-bottom:1.2rem; width:100%;">
            <span>Frontend E-Commerce Demo — No real financial charge is processed.</span>
          </div>
          <div id="checkout-modal-summary"></div>
          <form id="checkout-demo-form">
            <div class="form-group">
              <label class="form-label" for="chk-name">Full Name</label>
              <input type="text" id="chk-name" class="form-control" placeholder="Ameer Ibrahim Qamar" required />
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              <div class="form-group">
                <label class="form-label" for="chk-phone">Phone (Pakistan)</label>
                <input type="tel" id="chk-phone" class="form-control" placeholder="0302 0009893" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="chk-city">City</label>
                <input type="text" id="chk-city" class="form-control" placeholder="Lahore / Karachi / Islamabad" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="chk-address">Delivery Residence</label>
              <input type="text" id="chk-address" class="form-control" placeholder="Street, Sector / Phase, Residence No." required />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">Complete Demo Reservation</button>
          </form>
        </div>
      </div>

      <!-- Floating Back-to-Top Action -->
      <div class="floating-actions">
        <button type="button" id="back-to-top-btn" class="floating-btn" aria-label="Back to top" title="Back to top">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', overlaysHTML);
  }

  // =========================================================================
  // 3. PRODUCT GRIDS, FILTERING, SORTING & OPTION SWATCHES
  // =========================================================================
  function initProductGrids() {
    if (!window.ELEMENTAL_PRODUCTS) return;

    // 3A. Homepage Featured Collection (#featured-product-grid)
    const featuredGrid = document.getElementById('featured-product-grid');
    if (featuredGrid) {
      const featuredItems = window.ELEMENTAL_PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
      featuredGrid.innerHTML = featuredItems.map((p) => window.renderProductCardHTML(p)).join('');
    }

    // 3B. Homepage New Arrivals (#new-arrivals-grid) with Category Filter Tabs & Sort
    const newArrivalsGrid = document.getElementById('new-arrivals-grid');
    if (newArrivalsGrid) {
      let currentFilter = 'all';
      let currentSort = 'featured';

      function renderNewArrivals() {
        let list = window.ELEMENTAL_PRODUCTS.filter((p) =>
          currentFilter === 'all' ? p.isNew : p.category === currentFilter && p.isNew
        );
        if (list.length < 4 && currentFilter !== 'all') {
          list = window.ELEMENTAL_PRODUCTS.filter((p) => p.category === currentFilter);
        }
        list = sortProductList(list, currentSort).slice(0, 8);
        newArrivalsGrid.innerHTML = list.map((p) => window.renderProductCardHTML(p)).join('');
        if (window.ElementalWishlist) window.ElementalWishlist.syncUI();
        if (window.refreshRevealObserver) window.refreshRevealObserver();
      }

      document.querySelectorAll('[data-arrival-filter]').forEach((tab) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
        tab.addEventListener('click', () => {
          document.querySelectorAll('[data-arrival-filter]').forEach((t) => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          currentFilter = tab.getAttribute('data-arrival-filter');
          renderNewArrivals();
        });
      });

      const arrivalSort = document.getElementById('arrival-sort-select');
      if (arrivalSort) {
        arrivalSort.addEventListener('change', (e) => {
          currentSort = e.target.value;
          renderNewArrivals();
        });
      }

      renderNewArrivals();
    }

    // 3C. Dedicated Category Catalog Grid (#catalog-product-grid on men.html, women.html, accessories.html)
    const catalogGrid = document.getElementById('catalog-product-grid');
    if (catalogGrid) {
      const defaultCategory = catalogGrid.getAttribute('data-catalog-category') || 'all';
      let activeSubFilter = 'all';
      let activeSort = 'featured';

      function renderCatalog() {
        let list = window.ELEMENTAL_PRODUCTS.filter((p) =>
          defaultCategory === 'all' ? true : p.category === defaultCategory
        );

        if (activeSubFilter !== 'all') {
          list = list.filter(
            (p) =>
              p.subCategory.toLowerCase().includes(activeSubFilter.toLowerCase()) ||
              (activeSubFilter === 'new' && p.isNew)
          );
        }

        list = sortProductList(list, activeSort);
        const countEl = document.getElementById('catalog-count-display');
        if (countEl) countEl.textContent = `${list.length} Pieces`;

        catalogGrid.innerHTML = list.map((p) => window.renderProductCardHTML(p)).join('');
        if (window.ElementalWishlist) window.ElementalWishlist.syncUI();
        if (window.refreshRevealObserver) window.refreshRevealObserver();
      }

      document.querySelectorAll('[data-subfilter]').forEach((btn) => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-subfilter]').forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          activeSubFilter = btn.getAttribute('data-subfilter');
          renderCatalog();
        });
      });

      const catalogSort = document.getElementById('catalog-sort-select');
      if (catalogSort) {
        catalogSort.addEventListener('change', (e) => {
          activeSort = e.target.value;
          renderCatalog();
        });
      }

      renderCatalog();
    }

    if (window.ElementalWishlist) window.ElementalWishlist.syncUI();
    if (window.refreshRevealObserver) window.refreshRevealObserver();
  }

  function sortProductList(list, sortKey) {
    const copy = [...list];
    if (sortKey === 'price-asc') {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortKey === 'price-desc') {
      copy.sort((a, b) => b.price - a.price);
    } else if (sortKey === 'name-asc') {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey === 'newest') {
      copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return copy;
  }

  // =========================================================================
  // 4. PRODUCT QUICK-VIEW MODAL & CARD SWATCH/SIZE SELECTION
  // =========================================================================
  function openQuickViewModal(productId) {
    const product = window.getProductById(productId);
    const container = document.getElementById('quickview-modal-container');
    const content = document.getElementById('quickview-modal-content');
    const backdrop = document.getElementById('global-backdrop');
    if (!product || !container || !content) return;

    let selectedColor = product.colors[0]?.name || 'Deep Charcoal';
    let selectedSize = product.sizes[0] || 'M';

    content.innerHTML = `
      <button type="button" class="modal-close-btn" data-close-modals aria-label="Close Quick View">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="quickview-gallery">
        <img src="${product.image}"
             alt="${product.name}"
             onerror="this.onerror=null;this.src=getEditorialFallbackImage('${product.name.replace(/'/g, '')}');" />
      </div>
      <div class="quickview-details">
        <span class="eyebrow" style="margin-bottom:0;">${product.category.toUpperCase()} &bull; ${product.subCategory}</span>
        <h3 class="serif-heading" style="font-size:2rem;">${product.name}</h3>
        <div style="font-size:1.15rem; font-weight:500;">${window.formatPKR(product.price)}</div>
        <p style="font-size:0.88rem; color:var(--color-taupe); line-height:1.7;">${product.description}</p>

        <div>
          <span class="form-label">Color: <strong id="qv-color-label">${selectedColor}</strong></span>
          <div class="color-swatches" style="gap:0.6rem; margin-top:0.4rem;">
            ${product.colors
              .map(
                (c, i) => `
              <button type="button"
                class="color-swatch ${i === 0 ? 'active' : ''}"
                style="width:24px; height:24px; background-color:${c.hex};"
                data-qv-color="${c.name}"
                aria-label="Color ${c.name}">
              </button>`
              )
              .join('')}
          </div>
        </div>

        <div>
          <span class="form-label">Size: <strong id="qv-size-label">${selectedSize}</strong></span>
          <div class="size-selector-grid">
            ${product.sizes
              .map(
                (s, i) => `
              <button type="button"
                class="size-option-btn ${i === 0 ? 'active' : ''}"
                data-qv-size="${s}">
                ${s}
              </button>`
              )
              .join('')}
          </div>
        </div>

        <div style="font-size:0.78rem; color:var(--color-taupe); padding:0.65rem 0; border-top:1px solid rgba(183,174,162,0.3); border-bottom:1px solid rgba(183,174,162,0.3);">
          <strong>Material:</strong> ${product.fabric} &bull; <strong>Origin:</strong> ${product.origin}
        </div>

        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.4rem;">
          <button type="button" class="btn btn-primary" style="flex:1;" id="qv-add-to-bag-btn">
            Add to Shopping Bag
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-secondary">
            Full Details
          </a>
        </div>
      </div>
    `;

    content.querySelectorAll('[data-qv-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        content.querySelectorAll('[data-qv-color]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.getAttribute('data-qv-color');
        const lbl = document.getElementById('qv-color-label');
        if (lbl) lbl.textContent = selectedColor;
      });
    });

    content.querySelectorAll('[data-qv-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        content.querySelectorAll('[data-qv-size]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.getAttribute('data-qv-size');
        const lbl = document.getElementById('qv-size-label');
        if (lbl) lbl.textContent = selectedSize;
      });
    });

    const qvAddBtn = document.getElementById('qv-add-to-bag-btn');
    if (qvAddBtn) {
      qvAddBtn.addEventListener('click', () => {
        if (window.ElementalCart) {
          window.ElementalCart.addItem(product.id, {
            color: selectedColor,
            size: selectedSize,
            quantity: 1
          });
          closeAllModals();
          window.ElementalCart.openDrawer();
        }
      });
    }

    closeAllModals();
    container.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // =========================================================================
  // 5. SINGLE PRODUCT DETAIL PAGE (product.html) HYDRATION
  // =========================================================================
  function initProductDetailPage() {
    const pdpContainer = document.getElementById('pdp-dynamic-root');
    if (!pdpContainer || !window.ELEMENTAL_PRODUCTS) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || 'elm-m-01';
    const product = window.getProductById(productId);

    document.title = `${product.name} — ELEMENTAL Luxury Fashion`;

    let selectedColor = product.colors[0]?.name || 'Deep Charcoal';
    let selectedSize = product.sizes[0] || 'M';
    let selectedQty = 1;
    const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.image];

    const breadcrumbCat = document.getElementById('pdp-breadcrumb-cat');
    const breadcrumbName = document.getElementById('pdp-breadcrumb-name');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = product.category.toUpperCase();
      breadcrumbCat.href = `${product.category}.html`;
    }
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    pdpContainer.innerHTML = `
      <div class="pdp-grid">
        <div class="pdp-gallery">
          <div class="pdp-thumbs">
            ${galleryImages
              .map(
                (imgUrl, i) => `
              <button type="button" class="pdp-thumb ${i === 0 ? 'active' : ''}" data-pdp-thumb="${imgUrl}" aria-label="View angle ${i + 1}">
                <img src="${imgUrl}" alt="${product.name} view ${i + 1}" onerror="this.onerror=null;this.src=getEditorialFallbackImage('${product.name.replace(/'/g, '')}');" />
              </button>`
              )
              .join('')}
          </div>
          <div class="pdp-main-media">
            <img id="pdp-main-img"
                 src="${galleryImages[0]}"
                 alt="${product.name}"
                 onerror="this.onerror=null;this.src=getEditorialFallbackImage('${product.name.replace(/'/g, '')}');" />
          </div>
        </div>

        <div class="pdp-info-panel">
          <span class="eyebrow">${product.category.toUpperCase()} &bull; ${product.subCategory}</span>
          <h1 class="serif-heading" style="font-size:clamp(2rem, 3.4vw, 3rem); margin-bottom:0.65rem;">${product.name}</h1>
          <div style="font-size:1.35rem; font-weight:500; margin-bottom:1.25rem;">${window.formatPKR(product.price)}</div>
          <p style="font-size:0.95rem; color:var(--color-taupe); line-height:1.75; margin-bottom:1.8rem;">
            ${product.description}
          </p>

          <div style="margin-bottom:1.5rem;">
            <span class="form-label">Selected Finish: <strong id="pdp-color-label">${selectedColor}</strong></span>
            <div class="color-swatches" style="gap:0.75rem; margin-top:0.5rem;">
              ${product.colors
                .map(
                  (c, idx) => `
                <button type="button"
                  class="color-swatch ${idx === 0 ? 'active' : ''}"
                  style="width:28px; height:28px; background-color:${c.hex};"
                  data-pdp-color="${c.name}"
                  title="${c.name}"
                  aria-label="Color ${c.name}">
                </button>`
                )
                .join('')}
            </div>
          </div>

          <div style="margin-bottom:1.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="form-label" style="margin-bottom:0;">Select Size: <strong id="pdp-size-label">${selectedSize}</strong></span>
              <span style="font-size:0.74rem; color:var(--color-taupe); text-decoration:underline;">Fit: ${product.fit}</span>
            </div>
            <div class="size-selector-grid" style="margin-top:0.65rem;">
              ${product.sizes
                .map(
                  (s, idx) => `
                <button type="button"
                  class="size-option-btn ${idx === 0 ? 'active' : ''}"
                  data-pdp-size="${s}">
                  ${s}
                </button>`
                )
                .join('')}
            </div>
          </div>

          <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap; margin-bottom:2rem;">
            <div class="qty-stepper" style="height:48px; padding:0 0.35rem;">
              <button type="button" class="qty-btn" id="pdp-qty-minus" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-value" id="pdp-qty-val" style="min-width:36px;">1</span>
              <button type="button" class="qty-btn" id="pdp-qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="btn btn-primary" id="pdp-add-cart-btn" style="flex:1;">
              Add to Shopping Bag — ${window.formatPKR(product.price)}
            </button>
            <button type="button"
              class="btn btn-secondary"
              style="padding: 1rem 1.2rem;"
              data-wishlist-toggle="${product.id}"
              aria-label="Save to Wishlist">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <div class="glass-panel" style="padding:1.4rem; border-radius:4px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-size:0.84rem;">
              <div>
                <span style="display:block; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--color-taupe);">Composition</span>
                <strong>${product.fabric}</strong>
              </div>
              <div>
                <span style="display:block; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--color-taupe);">Provenance</span>
                <strong>${product.origin}</strong>
              </div>
              <div>
                <span style="display:block; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--color-taupe);">Silhouette</span>
                <strong>${product.fit}</strong>
              </div>
              <div>
                <span style="display:block; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--color-taupe);">Delivery</span>
                <strong>Complimentary Nationwide (PK)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind PDP Thumbnail Switcher
    pdpContainer.querySelectorAll('[data-pdp-thumb]').forEach((btn) => {
      btn.addEventListener('click', () => {
        pdpContainer.querySelectorAll('[data-pdp-thumb]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mainImg = document.getElementById('pdp-main-img');
        if (mainImg) mainImg.src = btn.getAttribute('data-pdp-thumb');
      });
    });

    // Bind PDP Color & Size
    pdpContainer.querySelectorAll('[data-pdp-color]').forEach((btn) => {
      btn.addEventListener('click', () => {
        pdpContainer.querySelectorAll('[data-pdp-color]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.getAttribute('data-pdp-color');
        const lbl = document.getElementById('pdp-color-label');
        if (lbl) lbl.textContent = selectedColor;
      });
    });

    pdpContainer.querySelectorAll('[data-pdp-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        pdpContainer.querySelectorAll('[data-pdp-size]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.getAttribute('data-pdp-size');
        const lbl = document.getElementById('pdp-size-label');
        if (lbl) lbl.textContent = selectedSize;
      });
    });

    // Bind PDP Quantity
    const qtyValEl = document.getElementById('pdp-qty-val');
    const addBtnEl = document.getElementById('pdp-add-cart-btn');
    document.getElementById('pdp-qty-minus')?.addEventListener('click', () => {
      selectedQty = Math.max(1, selectedQty - 1);
      if (qtyValEl) qtyValEl.textContent = selectedQty;
      if (addBtnEl) addBtnEl.textContent = `Add to Shopping Bag — ${window.formatPKR(product.price * selectedQty)}`;
    });
    document.getElementById('pdp-qty-plus')?.addEventListener('click', () => {
      selectedQty += 1;
      if (qtyValEl) qtyValEl.textContent = selectedQty;
      if (addBtnEl) addBtnEl.textContent = `Add to Shopping Bag — ${window.formatPKR(product.price * selectedQty)}`;
    });

    addBtnEl?.addEventListener('click', () => {
      if (window.ElementalCart) {
        window.ElementalCart.addItem(product.id, {
          color: selectedColor,
          size: selectedSize,
          quantity: selectedQty
        });
        window.ElementalCart.openDrawer();
      }
    });

    // Related Products Grid on PDP
    const relatedGrid = document.getElementById('pdp-related-grid');
    if (relatedGrid) {
      const related = window.ELEMENTAL_PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id
      ).slice(0, 4);
      relatedGrid.innerHTML = related.map((p) => window.renderProductCardHTML(p)).join('');
    }

    if (window.ElementalWishlist) window.ElementalWishlist.syncUI();
  }

  // =========================================================================
  // 6. LIVE PRODUCT SEARCH
  // =========================================================================
  function initSearchSystem() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('global-search-input');
    const resultsGrid = document.getElementById('search-results-grid');
    const countLabel = document.getElementById('search-results-count');
    const backdrop = document.getElementById('global-backdrop');

    function renderSearchResults(query = '') {
      if (!resultsGrid || !window.ELEMENTAL_PRODUCTS) return;
      const q = query.trim().toLowerCase();
      const matched = q
        ? window.ELEMENTAL_PRODUCTS.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.subCategory.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q)
          )
        : window.ELEMENTAL_PRODUCTS.slice(0, 4);

      if (countLabel) {
        countLabel.textContent = q
          ? `Found ${matched.length} Result${matched.length === 1 ? '' : 's'} for "${query}"`
          : 'Showing Popular Atelier Pieces';
      }

      if (matched.length === 0) {
        resultsGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 2rem 0; color: var(--color-taupe);">
            No matching garments found for "${query}". Try searching "coat", "silk", "cashmere", "tote", or "watch".
          </div>
        `;
        return;
      }

      resultsGrid.innerHTML = matched
        .slice(0, 8)
        .map(
          (p) => `
          <a href="product.html?id=${p.id}" class="glass-panel" style="padding:0.85rem; border-radius:4px; display:flex; gap:0.85rem; align-items:center;">
            <img src="${p.image}" alt="${p.name}" style="width:64px; height:82px; object-fit:cover; border-radius:2px;" onerror="this.onerror=null;this.src=getEditorialFallbackImage('${p.name.replace(/'/g, '')}');" />
            <div>
              <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--color-taupe);">${p.category}</div>
              <div class="serif-heading" style="font-size:1.05rem; margin:0.15rem 0;">${p.name}</div>
              <div style="font-size:0.8rem; font-weight:500;">${window.formatPKR(p.price)}</div>
            </div>
          </a>
        `
        )
        .join('');
    }

    document.querySelectorAll('[data-open-search]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllModals();
        if (searchOverlay) searchOverlay.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        renderSearchResults(searchInput ? searchInput.value : '');
        setTimeout(() => searchInput && searchInput.focus(), 120);
      });
    });

    document.getElementById('close-search-btn')?.addEventListener('click', closeAllModals);
    searchInput?.addEventListener('input', (e) => renderSearchResults(e.target.value));
  }

  // =========================================================================
  // 7. NEWSLETTER & CONTACT FORM VALIDATION
  // =========================================================================
  function initForms() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Main Newsletter Form
    document.querySelectorAll('.js-newsletter-form').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const feedback = form.parentElement.querySelector('.form-feedback');
        const val = input ? input.value.trim() : '';

        if (!emailRegex.test(val)) {
          if (feedback) {
            feedback.textContent = 'Please enter a valid email address (e.g., name@domain.com).';
            feedback.className = 'form-feedback error';
          }
          return;
        }

        if (feedback) {
          feedback.textContent = 'Welcome to the ELEMENTAL World. You are now subscribed to private releases.';
          feedback.className = 'form-feedback success';
        }
        if (input) input.value = '';
        showElementalToast('Subscribed to ELEMENTAL Private Journal.');
      });
    });

    // Contact Page Form
    const contactForm = document.getElementById('elemental-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();
        const feedback = document.getElementById('contact-form-feedback');

        if (!name || !emailRegex.test(email || '') || !message) {
          if (feedback) {
            feedback.textContent = 'Please complete your name, a valid email address, and your inquiry message.';
            feedback.className = 'form-feedback error';
          }
          return;
        }

        if (feedback) {
          feedback.textContent =
            'Thank you, ' +
            name +
            '. Your inquiry has been received by our Client Concierge (Frontend Demo).';
          feedback.className = 'form-feedback success';
        }
        contactForm.reset();
        showElementalToast('Your message has been sent to ELEMENTAL Concierge.');
      });
    }

    // Account Demo Form
    document.getElementById('account-demo-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAllModals();
      showElementalToast('Signed in to ELEMENTAL Privé (Frontend Demo Session).');
    });

    // Checkout Demo Form
    document.getElementById('checkout-demo-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('chk-name')?.value.trim() || 'Valued Client';
      if (window.ElementalCart) window.ElementalCart.clearCart();
      closeAllModals();
      showElementalToast(`Thank you, ${name}. Your demo order reservation has been confirmed.`);
    });
  }

  // =========================================================================
  // 8. NAVIGATION, STICKY HEADER, MODALS & GLOBAL LISTENERS
  // =========================================================================
  function closeAllModals() {
    document.getElementById('global-backdrop')?.classList.remove('active');
    document.getElementById('search-overlay')?.classList.remove('active');
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.getElementById('wishlist-drawer')?.classList.remove('active');
    document.getElementById('quickview-modal-container')?.classList.remove('active');
    document.getElementById('account-modal-container')?.classList.remove('active');
    document.getElementById('checkout-demo-modal')?.classList.remove('active');
    document.body.style.overflow = '';
  }
  window.closeAllModals = closeAllModals;

  function initHeaderAndGlobalEvents() {
    const header = document.querySelector('.site-header');
    const backToTop = document.getElementById('back-to-top-btn');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 40);
        if (backToTop) backToTop.classList.toggle('visible', y > 480);
      },
      { passive: true }
    );

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    mobileToggle?.addEventListener('click', () => {
      const isOpen = mainNav?.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav?.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Delegate Quick-View, Card Swatches, Card Sizes, Account Modal, and Modal Closers
    document.addEventListener('click', (e) => {
      // Quick view button
      const qvBtn = e.target.closest('[data-quick-view]');
      if (qvBtn) {
        e.preventDefault();
        openQuickViewModal(qvBtn.getAttribute('data-quick-view'));
        return;
      }

      // Card color swatch click
      const cardSwatch = e.target.closest('.product-card .color-swatch');
      if (cardSwatch) {
        const card = cardSwatch.closest('.product-card');
        card.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('active'));
        cardSwatch.classList.add('active');
        card.setAttribute('data-selected-color', cardSwatch.getAttribute('data-color'));
        return;
      }

      // Card size pill click
      const cardSize = e.target.closest('.product-card .size-pill-mini');
      if (cardSize) {
        const card = cardSize.closest('.product-card');
        card.querySelectorAll('.size-pill-mini').forEach((s) => s.classList.remove('active'));
        cardSize.classList.add('active');
        card.setAttribute('data-selected-size', cardSize.getAttribute('data-size'));
        return;
      }

      // Open account modal
      const accBtn = e.target.closest('[data-open-account]');
      if (accBtn) {
        e.preventDefault();
        closeAllModals();
        document.getElementById('account-modal-container')?.classList.add('active');
        document.getElementById('global-backdrop')?.classList.add('active');
        document.body.style.overflow = 'hidden';
        return;
      }

      // Close modals button or clicking backdrop
      if (
        e.target.closest('[data-close-modals]') ||
        e.target.id === 'global-backdrop' ||
        e.target.id === 'quickview-modal-container' ||
        e.target.id === 'account-modal-container' ||
        e.target.id === 'checkout-demo-modal'
      ) {
        closeAllModals();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  // =========================================================================
  // INITIALIZE ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    injectGlobalOverlays();
    if (window.ElementalWishlist) window.ElementalWishlist.init();
    if (window.ElementalCart) window.ElementalCart.init();
    initProductGrids();
    initProductDetailPage();
    initSearchSystem();
    initForms();
    initHeaderAndGlobalEvents();
  });
})();

