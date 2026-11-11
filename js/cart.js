/**
 * ELEMENTAL — PREMIUM LUXURY FASHION E-COMMERCE
 * File: js/cart.js
 * Manages Shopping Bag state, localStorage persistence, quantity controls,
 * dynamic PKR calculation, and interactive frontend demo checkout.
 */

const CART_STORAGE_KEY = 'elemental_luxury_cart_v1';
const FREE_SHIPPING_THRESHOLD_PKR = 35000;
const STANDARD_SHIPPING_PKR = 1500;

const ElementalCart = {
  items: [],

  init() {
    this.load();
    this.updateCounters();
    this.renderDrawer();
    this.bindEvents();
  },

  load() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      this.items = Array.isArray(parsed)
        ? parsed.filter(
            (i) =>
              i &&
              typeof i.id === 'string' &&
              Number.isFinite(Number(i.price)) &&
              Number(i.price) >= 0 &&
              Number.isFinite(Number(i.quantity)) &&
              Number(i.quantity) > 0
          )
        : [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      // Ignore storage quota errors in restricted environments
    }
    this.updateCounters();
    this.renderDrawer();
  },

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  },

  getSubtotal() {
    return this.items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    );
  },

  getShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD_PKR) return 0;
    return STANDARD_SHIPPING_PKR;
  },

  getTotal() {
    return this.getSubtotal() + this.getShipping();
  },

  addItem(productId, options = {}) {
    const product = window.getProductById(productId);
    if (!product) return;

    const color = options.color || product.colors[0]?.name || 'Deep Charcoal';
    const size = options.size || product.sizes[0] || 'M';
    const qty = Math.max(1, parseInt(options.quantity || 1, 10));
    const cartKey = `${product.id}__${color}__${size}`;

    const existing = this.items.find((item) => item.cartKey === cartKey);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({
        cartKey,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color,
        size,
        quantity: qty
      });
    }

    this.save();
    this.animateBadge();
    if (window.showElementalToast) {
      window.showElementalToast(`Added "${product.name}" (${size}, ${color}) to your Shopping Bag.`);
    }
  },

  removeItem(cartKey) {
    const removed = this.items.find((item) => item.cartKey === cartKey);
    this.items = this.items.filter((item) => item.cartKey !== cartKey);
    this.save();
    if (removed && window.showElementalToast) {
      window.showElementalToast(`Removed "${removed.name}" from your Shopping Bag.`);
    }
  },

  updateQuantity(cartKey, delta) {
    const item = this.items.find((i) => i.cartKey === cartKey);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(cartKey);
    } else {
      this.save();
    }
  },

  clearCart() {
    this.items = [];
    this.save();
  },

  updateCounters() {
    const count = this.getTotalCount();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = count;
    });
  },

  animateBadge() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    });
  },

  openDrawer() {
    if (window.closeAllModals) window.closeAllModals();
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('global-backdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('global-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  },

  renderDrawer() {
    const bodyEl = document.getElementById('cart-drawer-body');
    const footerEl = document.getElementById('cart-drawer-footer');
    if (!bodyEl || !footerEl) return;

    if (this.items.length === 0) {
      bodyEl.innerHTML = `
        <div style="text-align:center; padding: 4rem 1rem; color: var(--color-taupe);">
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.2" style="margin:0 auto 1.2rem; opacity:0.6;">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4 class="serif-heading" style="font-size:1.45rem; color:var(--color-charcoal); margin-bottom:0.5rem;">Your Shopping Bag is Empty</h4>
          <p style="font-size:0.85rem; margin-bottom:1.8rem;">Explore our curated seasonal pieces crafted for timeless distinction.</p>
          <a href="men.html" class="btn btn-primary" onclick="window.ElementalCart.closeDrawer()">Explore Collections</a>
        </div>
      `;
      footerEl.style.display = 'none';
      return;
    }

    footerEl.style.display = 'block';
    bodyEl.innerHTML = this.items
      .map(
        (item) => `
        <div class="cart-item" data-cart-key="${item.cartKey}">
          <a href="product.html?id=${item.id}">
            <img src="${item.image}"
                 alt="${item.name}"
                 class="cart-item-img"
                 onerror="this.onerror=null;this.src=getEditorialFallbackImage('${item.name.replace(/'/g, '')}');" />
          </a>
          <div>
            <h4 class="cart-item-title"><a href="product.html?id=${item.id}">${item.name}</a></h4>
            <div class="cart-item-variant">${item.color} &bull; Size ${item.size}</div>
            <div class="cart-item-price">${window.formatPKR(item.price * item.quantity)}</div>
            <div class="qty-stepper" aria-label="Quantity selector">
              <button type="button" class="qty-btn" data-qty-minus="${item.cartKey}" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" class="qty-btn" data-qty-plus="${item.cartKey}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="icon-btn" data-cart-remove="${item.cartKey}" aria-label="Remove ${item.name}" title="Remove item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
            </svg>
          </button>
        </div>
      `
      )
      .join('');

    const subtotal = this.getSubtotal();
    const shipping = this.getShipping();
    const total = this.getTotal();
    const subtotalEl = document.getElementById('cart-subtotal-amount');
    const shippingEl = document.getElementById('cart-shipping-amount');
    const totalEl = document.getElementById('cart-total-amount');
    if (subtotalEl) subtotalEl.textContent = window.formatPKR(subtotal);
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'Complimentary' : window.formatPKR(shipping);
    }
    if (totalEl) totalEl.textContent = window.formatPKR(total);
  },

  openCheckoutModal() {
    if (window.closeAllModals) window.closeAllModals();
    const modal = document.getElementById('checkout-demo-modal');
    const backdrop = document.getElementById('global-backdrop');
    const summaryEl = document.getElementById('checkout-modal-summary');
    const subtotal = this.getSubtotal();
    const shipping = this.getShipping();
    const total = this.getTotal();
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="padding:1rem; background:rgba(216,201,181,0.25); border:1px solid var(--color-champagne); border-radius:4px; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; font-size:0.84rem; margin-bottom:0.35rem;">
            <span>Subtotal (${this.getTotalCount()} item${this.getTotalCount() === 1 ? '' : 's'}):</span>
            <strong>${window.formatPKR(subtotal)}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.84rem; margin-bottom:0.35rem;">
            <span>White-Glove Courier Delivery:</span>
            <span>${shipping === 0 ? 'Complimentary' : window.formatPKR(shipping)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:1rem; padding-top:0.5rem; border-top:1px solid rgba(139,129,119,0.3);">
            <strong>Total Payable:</strong>
            <strong>${window.formatPKR(total)}</strong>
          </div>
        </div>
      `;
    }
    if (modal) modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      // Open cart drawer
      const openBtn = e.target.closest('[data-open-cart]');
      if (openBtn) {
        e.preventDefault();
        this.openDrawer();
        return;
      }

      // Close cart drawer
      const closeBtn = e.target.closest('[data-close-cart]');
      if (closeBtn) {
        e.preventDefault();
        this.closeDrawer();
        return;
      }

      // Add to cart from product card
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        e.preventDefault();
        const productId = addBtn.getAttribute('data-add-to-cart');
        const card = addBtn.closest('.product-card');
        const color = card ? card.getAttribute('data-selected-color') : undefined;
        const size = card ? card.getAttribute('data-selected-size') : undefined;
        this.addItem(productId, { color, size, quantity: 1 });
        return;
      }

      // Quantity plus
      const plusBtn = e.target.closest('[data-qty-plus]');
      if (plusBtn) {
        this.updateQuantity(plusBtn.getAttribute('data-qty-plus'), 1);
        return;
      }

      // Quantity minus
      const minusBtn = e.target.closest('[data-qty-minus]');
      if (minusBtn) {
        this.updateQuantity(minusBtn.getAttribute('data-qty-minus'), -1);
        return;
      }

      // Remove item
      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        this.removeItem(removeBtn.getAttribute('data-cart-remove'));
        return;
      }

      // Proceed to checkout demo
      const checkoutBtn = e.target.closest('[data-proceed-checkout]');
      if (checkoutBtn) {
        e.preventDefault();
        this.openCheckoutModal();
      }
    });
  }
};

window.ElementalCart = ElementalCart;

