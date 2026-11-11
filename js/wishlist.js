/**
 * ELEMENTAL — PREMIUM LUXURY FASHION E-COMMERCE
 * File: js/wishlist.js
 * Manages customer Wishlist state with localStorage persistence, heart button sync,
 * and Wishlist drawer rendering.
 */

const WISHLIST_STORAGE_KEY = 'elemental_luxury_wishlist_v1';

const ElementalWishlist = {
  ids: [],

  init() {
    this.load();
    this.syncUI();
    this.bindEvents();
  },

  load() {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const validIds = new Set((window.ELEMENTAL_PRODUCTS || []).map((p) => p.id));
      this.ids = Array.isArray(parsed)
        ? [...new Set(parsed.filter((id) => typeof id === 'string' && (validIds.size === 0 || validIds.has(id))))]
        : [];
    } catch (e) {
      this.ids = [];
    }
  },

  save() {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(this.ids));
    } catch (e) {
      // Ignore storage quota errors
    }
    this.syncUI();
  },

  has(productId) {
    return this.ids.includes(productId);
  },

  toggle(productId) {
    const product = window.getProductById(productId);
    if (!product) return;

    const index = this.ids.indexOf(productId);
    if (index > -1) {
      this.ids.splice(index, 1);
      if (window.showElementalToast) {
        window.showElementalToast(`Removed "${product.name}" from your Wishlist.`);
      }
    } else {
      this.ids.push(productId);
      if (window.showElementalToast) {
        window.showElementalToast(`Saved "${product.name}" to your Private Wishlist.`);
      }
    }
    this.save();
  },

  syncUI() {
    // Update wishlist count badges
    document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
      el.textContent = this.ids.length;
      el.style.display = this.ids.length > 0 ? 'inline-flex' : 'none';
    });

    // Update heart buttons
    document.querySelectorAll('[data-wishlist-toggle]').forEach((btn) => {
      const id = btn.getAttribute('data-wishlist-toggle');
      if (this.has(id)) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    this.renderDrawer();
  },

  openDrawer() {
    if (window.closeAllModals) window.closeAllModals();
    const drawer = document.getElementById('wishlist-drawer');
    const backdrop = document.getElementById('global-backdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    const drawer = document.getElementById('wishlist-drawer');
    const backdrop = document.getElementById('global-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  },

  renderDrawer() {
    const bodyEl = document.getElementById('wishlist-drawer-body');
    if (!bodyEl) return;

    if (this.ids.length === 0) {
      bodyEl.innerHTML = `
        <div style="text-align:center; padding: 4rem 1rem; color: var(--color-taupe);">
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.2" style="margin:0 auto 1.2rem; opacity:0.6;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h4 class="serif-heading" style="font-size:1.45rem; color:var(--color-charcoal); margin-bottom:0.5rem;">Your Wishlist is Empty</h4>
          <p style="font-size:0.85rem; margin-bottom:1.8rem;">Curate your personal wardrobe by saving pieces with the heart icon.</p>
          <a href="women.html" class="btn btn-primary" onclick="window.ElementalWishlist.closeDrawer()">Discover Pieces</a>
        </div>
      `;
      return;
    }

    bodyEl.innerHTML = this.ids
      .map((id) => {
        const product = window.getProductById(id);
        if (!product) return '';
        return `
          <div class="cart-item">
            <a href="product.html?id=${product.id}">
              <img src="${product.image}"
                   alt="${product.name}"
                   class="cart-item-img"
                   onerror="this.onerror=null;this.src=getEditorialFallbackImage('${product.name.replace(/'/g, '')}');" />
            </a>
            <div>
              <h4 class="cart-item-title"><a href="product.html?id=${product.id}">${product.name}</a></h4>
              <div class="cart-item-variant">${product.subCategory}</div>
              <div class="cart-item-price">${window.formatPKR(product.price)}</div>
              <button type="button"
                class="btn btn-primary"
                style="padding: 0.45rem 0.9rem; font-size: 0.65rem;"
                data-wishlist-move-to-cart="${product.id}">
                Move to Bag
              </button>
            </div>
            <button type="button" class="icon-btn" data-wishlist-toggle="${product.id}" aria-label="Remove from wishlist">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `;
      })
      .join('');
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('[data-wishlist-toggle]');
      if (toggleBtn) {
        e.preventDefault();
        const productId = toggleBtn.getAttribute('data-wishlist-toggle');
        this.toggle(productId);
        return;
      }

      const openBtn = e.target.closest('[data-open-wishlist]');
      if (openBtn) {
        e.preventDefault();
        this.openDrawer();
        return;
      }

      const closeBtn = e.target.closest('[data-close-wishlist]');
      if (closeBtn) {
        e.preventDefault();
        this.closeDrawer();
        return;
      }

      const moveBtn = e.target.closest('[data-wishlist-move-to-cart]');
      if (moveBtn) {
        e.preventDefault();
        const id = moveBtn.getAttribute('data-wishlist-move-to-cart');
        if (window.ElementalCart) {
          window.ElementalCart.addItem(id);
        }
        this.toggle(id);
        this.closeDrawer();
        if (window.ElementalCart) {
          window.ElementalCart.openDrawer();
        }
      }
    });
  }
};

window.ElementalWishlist = ElementalWishlist;

