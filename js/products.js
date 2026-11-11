/**
 * ELEMENTAL — PREMIUM LUXURY FASHION E-COMMERCE
 * File: js/products.js
 * Complete product catalog with realistic commercial fashion photography,
 * PKR pricing, available sizes, color palettes, and editorial metadata.
 */

const ELEMENTAL_PRODUCTS = [
  // =========================================================================
  // MEN'S COLLECTION
  // =========================================================================
  {
    id: 'elm-m-01',
    name: 'Architectural Double-Breasted Wool Overcoat',
    category: 'men',
    subCategory: 'Coats & Jackets',
    price: 68500,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Muted Taupe', hex: '#8B8177' }
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Tailored from heavyweight Italian virgin wool with a brushed cashmere hand-feel. Designed with structured peak lapels, horn buttons, and an elongated architectural silhouette.',
    fabric: '90% Virgin Wool, 10% Cashmere',
    origin: 'Woven in Biella, Italy',
    fit: 'Relaxed Tailored Fit',
    has3DModel: 'overcoat'
  },
  {
    id: 'elm-m-02',
    name: 'Milano Unstructured Linen-Wool Blazer',
    category: 'men',
    subCategory: 'Formal Outfits',
    price: 49500,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Muted Taupe', hex: '#8B8177' },
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Warm Ivory', hex: '#F5F2EB' }
    ],
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Effortless continental tailoring crafted with unpadded natural shoulders, breathable half-canvas construction, and subtle pick-stitching along the lapel.',
    fabric: '65% Virgin Wool, 35% Belgian Linen',
    origin: 'Crafted in Portugal',
    fit: 'Contemporary Slim Fit',
    has3DModel: 'overcoat'
  },
  {
    id: 'elm-m-03',
    name: 'Fine-Gauge Merino Mock-Neck Knit',
    category: 'men',
    subCategory: 'Shirts & Knitwear',
    price: 24500,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Soft Stone', hex: '#B7AEA2' },
      { name: 'Warm Ivory', hex: '#F5F2EB' }
    ],
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Knit from extra-fine 18-gauge Australian merino wool for thermal regulation and a sleek second-skin drape underneath tailoring or worn solo.',
    fabric: '100% Extra-Fine Merino Wool',
    origin: 'Knit in Scotland',
    fit: 'Modern Regular Fit',
    has3DModel: 'knitwear'
  },
  {
    id: 'elm-m-04',
    name: 'Pleated Wide-Leg Worsted Trousers',
    category: 'men',
    subCategory: 'Shirts & Trousers',
    price: 28900,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Soft Stone', hex: '#B7AEA2' }
    ],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Double front pleats create fluid movement across these high-waisted worsted wool trousers, finished with side waist tab adjusters and horn buttons.',
    fabric: '100% Virgin Worsted Wool',
    origin: 'Tailored in Italy',
    fit: 'Relaxed Tapered Leg',
    has3DModel: 'overcoat'
  },
  {
    id: 'elm-m-05',
    name: 'Heavyweight Brushed Cotton Overshirt',
    category: 'men',
    subCategory: 'Luxury Streetwear',
    price: 26500,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Muted Taupe', hex: '#8B8177' },
      { name: 'Deep Charcoal', hex: '#171717' }
    ],
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Bridging utilitarian streetwear and refined minimalism. Cut from Japanese 420gsm brushed cotton twill with concealed chest pockets.',
    fabric: '100% Organic Japanese Cotton Twill',
    origin: 'Woven in Okayama, Japan',
    fit: 'Boxy Architectural Fit',
    has3DModel: 'knitwear'
  },
  {
    id: 'elm-m-06',
    name: 'Suede Minimalist Atelier Jacket',
    category: 'men',
    subCategory: 'Coats & Jackets',
    price: 84000,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Muted Taupe', hex: '#8B8177' },
      { name: 'Deep Charcoal', hex: '#171717' }
    ],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Supple full-grain calf suede treated with a water-repellent botanical finish, featuring two-way brushed palladium zip hardware and cupro satin lining.',
    fabric: '100% Calfskin Suede, Cupro Lining',
    origin: 'Handcrafted in Spain',
    fit: 'Tailored Blouson Fit',
    has3DModel: 'overcoat'
  },

  // =========================================================================
  // WOMEN'S COLLECTION
  // =========================================================================
  {
    id: 'elm-w-01',
    name: 'Sculpted Belted Cashmere Trench Coat',
    category: 'women',
    subCategory: 'Coats & Jackets',
    price: 76000,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Warm Ivory', hex: '#F5F2EB' },
      { name: 'Deep Charcoal', hex: '#171717' }
    ],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An icon of quiet luxury. Double-faced wool and cashmere wrap coat hand-stitched by master artisans for featherlight warmth and fluid movement.',
    fabric: '85% Double-Faced Wool, 15% Cashmere',
    origin: 'Atelier Milan, Italy',
    fit: 'Wrap Belted Silhouette',
    has3DModel: 'overcoat'
  },
  {
    id: 'elm-w-02',
    name: 'Fluid Mulberry Silk Bias Midi Dress',
    category: 'women',
    subCategory: 'Dresses',
    price: 54000,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F2EB' },
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Deep Charcoal', hex: '#171717' }
    ],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Cut on a 45-degree bias from luminous 30-momme mulberry silk satin. Skims the silhouette with understated grace and features an asymmetric cowl back.',
    fabric: '100% 30-Momme Mulberry Silk',
    origin: 'Como, Italy',
    fit: 'Fluid Bias Drape',
    has3DModel: 'knitwear'
  },
  {
    id: 'elm-w-03',
    name: 'Atelier Tailored Wool-Silk Pant Suit',
    category: 'women',
    subCategory: 'Formal Outfits',
    price: 62500,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Soft Stone', hex: '#B7AEA2' },
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Warm Ivory', hex: '#F5F2EB' }
    ],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Sharp masculine tailoring reimagined for the modern woman. Features an elongated single-breasted blazer paired with floor-grazing palazzo trousers.',
    fabric: '78% Virgin Wool, 22% Silk',
    origin: 'Parisian Atelier',
    fit: 'Structured Relaxed Fit',
    has3DModel: 'overcoat'
  },
  {
    id: 'elm-w-04',
    name: 'Ribbed Cashmere Lounge Ensemble',
    category: 'women',
    subCategory: 'Premium Casual Wear',
    price: 44000,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Warm Ivory', hex: '#F5F2EB' },
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Muted Taupe', hex: '#8B8177' }
    ],
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Plush Grade-A Mongolian cashmere knit in an architectural fisherman rib. Designed for elevated travel and serene everyday luxury.',
    fabric: '100% Organic Grade-A Cashmere',
    origin: 'Inner Mongolia / Scotland',
    fit: 'Relaxed Draped Fit',
    has3DModel: 'knitwear'
  },
  {
    id: 'elm-w-05',
    name: 'Poplin Architectural Draped Shirt',
    category: 'women',
    subCategory: 'Shirts & Trousers',
    price: 21500,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Warm Ivory', hex: '#F5F2EB' },
      { name: 'Soft Stone', hex: '#B7AEA2' }
    ],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Crisp high-twist Egyptian cotton poplin featuring French cuffs, mother-of-pearl buttons, and an asymmetric wrap placket.',
    fabric: '100% Giza 87 Egyptian Cotton',
    origin: 'Crafted in Italy',
    fit: 'Oversized Editorial Fit',
    has3DModel: 'knitwear'
  },
  {
    id: 'elm-w-06',
    name: 'Monolith Column Evening Gown',
    category: 'women',
    subCategory: 'Dresses',
    price: 79500,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Champagne Beige', hex: '#D8C9B5' }
    ],
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Sculptural matte crepe column gown with a boat neckline and dramatic low draped back. Minimalist eveningwear at its purest expression.',
    fabric: '96% Heavy Silk Crepe, 4% Elastane',
    origin: 'Milan, Italy',
    fit: 'Sculpted Column Fit',
    has3DModel: 'overcoat'
  },

  // =========================================================================
  // ACCESSORIES & FOOTWEAR
  // =========================================================================
  {
    id: 'elm-a-01',
    name: 'Artisanal Box-Calf Architectural Tote',
    category: 'accessories',
    subCategory: 'Leather Goods',
    price: 58000,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Muted Taupe', hex: '#8B8177' }
    ],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Hand-assembled from vegetable-tanned Tuscan box calfskin with raw painted edges, suede interior lining, and a detachable leather pochette.',
    fabric: '100% Vegetable-Tanned Calfskin',
    origin: 'Florence, Italy',
    fit: '38cm × 31cm × 15cm',
    has3DModel: 'tote'
  },
  {
    id: 'elm-a-02',
    name: 'Chronographe Minimaliste 40mm Watch',
    category: 'accessories',
    subCategory: 'Fine Timepieces',
    price: 92000,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    sizes: ['40MM'],
    colors: [
      { name: 'Champagne Beige', hex: '#D8C9B5' },
      { name: 'Deep Charcoal', hex: '#171717' }
    ],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Ultra-thin brushed stainless steel case with anti-reflective sapphire crystal, sunray champagne dial, and hand-stitched alligator-embossed calfskin strap.',
    fabric: '316L Brushed Steel, Sapphire Crystal',
    origin: 'Swiss Quartz Movement',
    fit: '40mm Case / 7mm Profile',
    has3DModel: 'watch'
  },
  {
    id: 'elm-a-03',
    name: 'Hand-Welted Calfskin Chelsea Boots',
    category: 'accessories',
    subCategory: 'Luxury Footwear',
    price: 46500,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    sizes: ['40', '41', '42', '43', '44'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Muted Taupe', hex: '#8B8177' }
    ],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Goodyear-welted from a single piece of French box calfskin over an elongated chisel last for lifetime durability and supreme comfort.',
    fabric: '100% French Box Calfskin Leather',
    origin: 'Northampton / Milan',
    fit: 'True European Sizing',
    has3DModel: 'tote'
  },
  {
    id: 'elm-a-04',
    name: 'Acetate Geometric Atelier Sunglasses',
    category: 'accessories',
    subCategory: 'Eyewear',
    price: 27500,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Deep Charcoal', hex: '#171717' },
      { name: 'Champagne Beige', hex: '#D8C9B5' }
    ],
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Sculpted from 8mm Japanese cellulose acetate with custom titanium core wires and Carl Zeiss 100% UV-protective warm gradient lenses.',
    fabric: 'Japanese Takiron Acetate, Titanium',
    origin: 'Sabae, Japan',
    fit: '51-21-145 Universal Bridge',
    has3DModel: 'watch'
  }
];

// =========================================================================
// CURRENCY FORMATTER & CATALOG HELPERS
// =========================================================================

/**
 * Formats a numeric PKR value into "PKR 68,500"
 */
function formatPKR(amount) {
  const num = Number(amount) || 0;
  return 'PKR ' + num.toLocaleString('en-PK');
}

/**
 * Returns a product by ID
 */
function getProductById(productId) {
  return ELEMENTAL_PRODUCTS.find((p) => p.id === productId) || ELEMENTAL_PRODUCTS[0];
}

/**
 * Generates an elegant luxury editorial SVG placeholder if an external image fails to load
 */
function getEditorialFallbackImage(title = 'ELEMENTAL ATELIER') {
  const safeTitle = String(title).replace(/[<>&"']/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1066" viewBox="0 0 800 1066">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EAE3D5"/>
        <stop offset="50%" stop-color="#D8C9B5"/>
        <stop offset="100%" stop-color="#B7AEA2"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1066" fill="url(#g)"/>
    <rect x="44" y="44" width="712" height="978" fill="none" stroke="#171717" stroke-opacity="0.18" stroke-width="1.5"/>
    <circle cx="400" cy="460" r="140" fill="none" stroke="#171717" stroke-opacity="0.22" stroke-width="1.2"/>
    <path d="M310 640 C340 500, 460 500, 490 640" fill="none" stroke="#171717" stroke-opacity="0.25" stroke-width="1.5"/>
    <text x="400" y="750" text-anchor="middle" font-family="Georgia, serif" font-size="28" letter-spacing="10" fill="#171717">ELEMENTAL</text>
    <text x="400" y="795" text-anchor="middle" font-family="sans-serif" font-size="14" letter-spacing="3" fill="#4A453F">${safeTitle.slice(0, 36).toUpperCase()}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

/**
 * Renders a single product card HTML string
 */
function renderProductCardHTML(product) {
  const isWishlisted = window.ElementalWishlist && window.ElementalWishlist.has(product.id);
  const defaultColor = product.colors[0]?.name || 'Deep Charcoal';
  const defaultSize = product.sizes[0] || 'M';

  const badgesHTML = `
    <div class="product-badges">
      ${product.isNew ? '<span class="product-badge new">New Arrival</span>' : ''}
      ${product.isBestSeller ? '<span class="product-badge">Best Seller</span>' : ''}
    </div>
  `;

  const swatchesHTML = product.colors
    .map(
      (c, idx) => `
      <button type="button"
        class="color-swatch ${idx === 0 ? 'active' : ''}"
        style="background-color: ${c.hex};"
        title="${c.name}"
        aria-label="Select color ${c.name}"
        data-color="${c.name}"
        data-product-id="${product.id}">
      </button>`
    )
    .join('');

  const sizesHTML = product.sizes
    .map(
      (s, idx) => `
      <button type="button"
        class="size-pill-mini ${idx === 0 ? 'active' : ''}"
        data-size="${s}"
        data-product-id="${product.id}"
        aria-label="Select size ${s}">
        ${s}
      </button>`
    )
    .join('');

  return `
    <article class="product-card reveal-up"
      data-id="${product.id}"
      data-category="${product.category}"
      data-price="${product.price}"
      data-selected-color="${defaultColor}"
      data-selected-size="${defaultSize}">
      <div class="product-media">
        ${badgesHTML}
        <button type="button"
          class="wishlist-btn ${isWishlisted ? 'active' : ''}"
          data-wishlist-toggle="${product.id}"
          aria-label="Toggle Wishlist for ${product.name}"
          title="Add to Wishlist">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <a href="product.html?id=${product.id}" aria-label="View ${product.name}">
          <img src="${product.image}"
               alt="${product.name}"
               loading="lazy"
               onerror="this.onerror=null;this.src=getEditorialFallbackImage('${product.name.replace(/'/g, '')}');" />
        </a>
        <div class="product-overlay-actions">
          <button type="button" class="btn-card-cart" data-add-to-cart="${product.id}">
            Add to Bag
          </button>
          <button type="button" class="btn-card-quickview" data-quick-view="${product.id}" aria-label="Quick view ${product.name}" title="Quick View">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-meta-top">
          <span>${product.subCategory}</span>
          <span>${product.category.toUpperCase()}</span>
        </div>
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-price">${formatPKR(product.price)}</div>
        <div class="product-options-row">
          <div class="color-swatches" role="group" aria-label="Available colors">
            ${swatchesHTML}
          </div>
          <div class="size-pills-mini" role="group" aria-label="Available sizes">
            ${sizesHTML}
          </div>
        </div>
      </div>
    </article>
  `;
}

// Export globally
window.ELEMENTAL_PRODUCTS = ELEMENTAL_PRODUCTS;
window.formatPKR = formatPKR;
window.getProductById = getProductById;
window.getEditorialFallbackImage = getEditorialFallbackImage;
window.renderProductCardHTML = renderProductCardHTML;

