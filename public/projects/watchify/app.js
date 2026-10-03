/* ==========================================================================
   WATCHIFY - LUXURY HOROLOGY INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PRODUCTS DATA STORE
  // ==========================================
  const PRODUCTS = [
    {
      id: 'prod-1',
      name: 'Grand Obsidian Tourbillon',
      category: 'tourbillon',
      price: 24500,
      rating: 4.9,
      badge: 'Flagship Edition',
      image: 'images/hero_watch.png',
      specs: 'Caliber 9001 • 18K Rose Gold • 72h Reserve',
      description: 'Hand-carved skeleton tourbillon movement with dark obsidian mainplate, sapphire crystal caseback, and hand-stitched crocodile strap.'
    },
    {
      id: 'prod-2',
      name: 'Aureus Chrono Rose Gold',
      category: 'chronograph',
      price: 18200,
      rating: 4.85,
      badge: 'Bestseller',
      image: 'images/chronograph_gold.png',
      specs: 'Precision Flyback • 18K Rose Gold • Sunburst Dial',
      description: 'Engineered for precision timing. Features dual chronograph sub-dials, dark navy blue sunburst dial, and rose gold pushers.'
    },
    {
      id: 'prod-3',
      name: 'Oceanus Deep Sapphire',
      category: 'diver',
      price: 12800,
      rating: 4.95,
      badge: '300m Hydrostatic',
      image: 'images/sapphire_diver.png',
      specs: 'Ceramic Bezel • 316L Brushed Steel • SuperLuminova',
      description: 'Deep sea exploration timepiece crafted with scratchproof sapphire crystal, unidirectional rotating ceramic bezel, and luminous index hands.'
    },
    {
      id: 'prod-4',
      name: 'Vanguard Emerald Reserve',
      category: 'limited',
      price: 21000,
      rating: 4.9,
      badge: 'Limited 1 of 50',
      image: 'images/emerald_limited.png',
      specs: 'Emerald Dial • Champagne Gold • Alligator Leather',
      description: 'Exclusive release featuring an ethereal emerald green dial with brushed champagne gold case and green alligator leather strap.'
    },
    {
      id: 'prod-5',
      name: 'Regal Chrono Platinum',
      category: 'chronograph',
      price: 19800,
      rating: 4.8,
      badge: 'Swiss Made',
      image: 'images/chronograph_gold.png',
      specs: 'Platinum Finish • Navy Sub-dials • Sapphire Glass',
      description: 'Heavyweight luxury chronograph built with solid platinum finish, anti-reflective double glareproof sapphire, and high-frequency movement.'
    },
    {
      id: 'prod-6',
      name: 'Mariner Steel Blue Diver',
      category: 'diver',
      price: 11500,
      rating: 4.75,
      badge: 'Professional',
      image: 'images/sapphire_diver.png',
      specs: 'Oyster Steel • Deep Sea Blue • Helium Release',
      description: 'Built to withstand extreme aquatic conditions. Equipped with helium escape valve, brushed oyster steel bracelet, and luminescent markers.'
    }
  ];

  // Application State
  let cart = [];
  let wishlist = new Set();
  let currentCategory = 'all';
  let currentSort = 'featured';
  let searchQuery = '';

  // Configurator State
  const customizerState = {
    dial: 'obsidian',
    dialName: 'Obsidian Black Dial',
    dialImg: 'images/hero_watch.png',
    caseType: 'rosegold',
    caseName: '18K Rose Gold Case',
    casePrice: 0,
    strapType: 'alligator',
    strapName: 'Alligator Leather Strap',
    strapPrice: 0,
    basePrice: 24500,
    engraving: ''
  };

  // DOM Elements Selection
  const productGrid = document.getElementById('productGrid');
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartCountEl = document.getElementById('cartCount');
  const cartDrawerCountEl = document.getElementById('cartDrawerCount');
  const wishlistCountEl = document.getElementById('wishlistCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCartMsg = document.getElementById('emptyCartMsg');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartFooter = document.getElementById('cartFooter');
  
  const searchOverlay = document.getElementById('searchOverlay');
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');

  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewContent = document.getElementById('quickViewContent');

  const vipModal = document.getElementById('vipModal');
  const vipBtn = document.getElementById('vipBtn');
  const openVipModalLink = document.getElementById('openVipModal');
  const closeVipBtn = document.getElementById('closeVipBtn');
  const vipForm = document.getElementById('vipForm');

  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const finishCheckoutBtn = document.getElementById('finishCheckoutBtn');

  const toastContainer = document.getElementById('toastContainer');

  // ==========================================
  // 2. NAVBAR & NAVIGATION LOGIC
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Search Toggle
  searchToggleBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
  });
  closeSearchBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });

  // ==========================================
  // 3. PRODUCT CATALOG RENDERING & FILTERING
  // ==========================================
  function renderProducts() {
    let filtered = PRODUCTS.filter(p => {
      const matchesCat = (currentCategory === 'all' || p.category === currentCategory);
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery) || 
        p.description.toLowerCase().includes(searchQuery) ||
        p.specs.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    });

    // Sorting
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-hourglass-empty" style="font-size: 3rem; color: var(--gold-primary); margin-bottom: 1rem;"></i>
          <h3>No matching timepieces found</h3>
          <p>Try adjusting your search criteria or collection filters.</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(p => {
      const isWishlisted = wishlist.has(p.id);
      return `
        <div class="product-card glass-card">
          <span class="product-card-badge">${p.badge}</span>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" title="Add to Wishlist">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          
          <div class="product-image-box">
            <img src="${p.image}" alt="${p.name}" class="product-img">
          </div>

          <div class="product-info">
            <span class="product-category">${p.category}</span>
            <h3 class="product-title">${p.name}</h3>
            <p class="product-specs">${p.specs}</p>
          </div>

          <div class="product-footer">
            <span class="product-price">$${p.price.toLocaleString()}</span>
            <div class="card-actions">
              <button class="icon-btn qv-btn" data-id="${p.id}" title="Quick View">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-gold btn-sm add-cart-btn" data-id="${p.id}">
                <i class="fa-solid fa-bag-shopping"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Event Listeners to dynamic product cards
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const product = PRODUCTS.find(p => p.id === id);
        if (product) addToCart(product);
      });
    });

    document.querySelectorAll('.qv-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openQuickView(id);
      });
    });

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        toggleWishlist(id);
      });
    });
  }

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Wishlist Toggle
  function toggleWishlist(id) {
    if (wishlist.has(id)) {
      wishlist.delete(id);
      showToast('Removed from Wishlist', 'remove');
    } else {
      wishlist.add(id);
      showToast('Added to Wishlist Vault', 'success');
    }
    wishlistCountEl.textContent = wishlist.size;
    renderProducts();
  }

  // ==========================================
  // 4. BESPOKE CONFIGURATOR / CUSTOMIZER
  // ==========================================
  const configWatchImg = document.getElementById('configWatchImg');
  const configDialName = document.getElementById('configDialName');
  const configCaseName = document.getElementById('configCaseName');
  const configStrapName = document.getElementById('configStrapName');
  const customizerPrice = document.getElementById('customizerPrice');
  const engravingInput = document.getElementById('engravingInput');

  function updateCustomizerPrice() {
    const total = customizerState.basePrice + customizerState.casePrice + customizerState.strapPrice;
    customizerPrice.textContent = `$${total.toLocaleString()}`;
    configDialName.textContent = customizerState.dialName;
    configCaseName.textContent = customizerState.caseName;
    configStrapName.textContent = customizerState.strapName;
  }

  // Dial Switcher
  document.querySelectorAll('#dialOptions .color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#dialOptions .color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customizerState.dial = btn.dataset.dial;
      customizerState.dialName = btn.dataset.name;
      customizerState.dialImg = btn.dataset.img;
      configWatchImg.src = customizerState.dialImg;
      updateCustomizerPrice();
    });
  });

  // Case Switcher
  document.querySelectorAll('#caseOptions .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#caseOptions .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customizerState.caseType = btn.dataset.case;
      customizerState.caseName = btn.dataset.name;
      customizerState.casePrice = parseInt(btn.dataset.price);
      updateCustomizerPrice();
    });
  });

  // Strap Switcher
  document.querySelectorAll('#strapOptions .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#strapOptions .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customizerState.strapType = btn.dataset.strap;
      customizerState.strapName = btn.dataset.name;
      customizerState.strapPrice = parseInt(btn.dataset.price);
      updateCustomizerPrice();
    });
  });

  // Add Custom Creation to Cart
  document.getElementById('addCustomizerToCart').addEventListener('click', () => {
    const engraving = engravingInput.value.trim();
    const customPrice = customizerState.basePrice + customizerState.casePrice + customizerState.strapPrice;
    
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${customizerState.dialName}`,
      price: customPrice,
      image: customizerState.dialImg,
      specs: `${customizerState.caseName} • ${customizerState.strapName}${engraving ? ' • Engraved: "' + engraving + '"' : ''}`,
      quantity: 1
    };

    addToCart(customItem);
  });

  // ==========================================
  // 5. SHOPPING CART & DRAWER MANAGEMENT
  // ==========================================
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        specs: product.specs || 'Swiss Luxury Timepiece',
        quantity: 1
      });
    }
    updateCartUI();
    openCartDrawer();
    showToast(`Added ${product.name} to Vault`, 'success');
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCountEl.textContent = totalCount;
    cartDrawerCountEl.textContent = totalCount;
    cartSubtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    cartTotalEl.textContent = `$${subtotal.toLocaleString()}`;

    if (cart.length === 0) {
      emptyCartMsg.style.display = 'block';
      cartItemsList.innerHTML = '';
      cartFooter.style.display = 'none';
      return;
    }

    emptyCartMsg.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">$${item.price.toLocaleString()}</span>
          <div class="cart-qty-ctrl">
            <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-cart-item" data-id="${item.id}" title="Remove Item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');

    // Quantity Handlers
    document.querySelectorAll('.inc-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = cart.find(i => i.id === btn.dataset.id);
        if (item) { item.quantity++; updateCartUI(); }
      });
    });

    document.querySelectorAll('.dec-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = cart.find(i => i.id === btn.dataset.id);
        if (item) {
          item.quantity--;
          if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== btn.dataset.id);
          }
          updateCartUI();
        }
      });
    });

    document.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', () => {
        cart = cart.filter(i => i.id !== btn.dataset.id);
        updateCartUI();
        showToast('Item removed from Vault', 'remove');
      });
    });
  }

  function openCartDrawer() {
    cartDrawerOverlay.classList.add('active');
  }

  function closeCartDrawer() {
    cartDrawerOverlay.classList.remove('active');
  }

  cartToggleBtn.addEventListener('click', openCartDrawer);
  closeCartBtn.addEventListener('click', closeCartDrawer);
  cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) closeCartDrawer();
  });

  // ==========================================
  // 6. QUICK VIEW MODAL
  // ==========================================
  function openQuickView(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    quickViewContent.innerHTML = `
      <div class="quick-view-grid">
        <div class="qv-image-box">
          <img src="${product.image}" alt="${product.name}" class="qv-img">
        </div>
        <div class="qv-details">
          <span class="product-category">${product.category}</span>
          <h2 class="qv-title">${product.name}</h2>
          <div class="qv-price">$${product.price.toLocaleString()}</div>
          <p class="qv-desc">${product.description}</p>
          <ul class="qv-spec-list">
            <li><strong>Movement:</strong> Swiss Mechanical Caliber 9001</li>
            <li><strong>Case Material:</strong> 18K Solid Gold / Glareproof Sapphire</li>
            <li><strong>Water Resistance:</strong> 100m Hydrostatic Pressure</li>
            <li><strong>Warranty:</strong> 10-Year Global Concierge Warranty</li>
          </ul>
          <button class="btn btn-gold w-100 qv-add-btn">
            <i class="fa-solid fa-bag-shopping"></i> Add to Vault
          </button>
        </div>
      </div>
    `;

    quickViewModal.classList.add('active');

    document.querySelector('.qv-add-btn').addEventListener('click', () => {
      addToCart(product);
      quickViewModal.classList.remove('active');
    });
  }

  closeQuickViewBtn.addEventListener('click', () => {
    quickViewModal.classList.remove('active');
  });

  // ==========================================
  // 7. CRAFTSMANSHIP TABS
  // ==========================================
  document.querySelectorAll('.craft-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.craft-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.craft-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // ==========================================
  // 8. VIRTUAL WRIST SIMULATOR
  // ==========================================
  const simAttireBg = document.getElementById('simAttireBg');
  const simWatchImg = document.getElementById('simWatchImg');
  const simWatchTitle = document.getElementById('simWatchTitle');
  const simAttireTitle = document.getElementById('simAttireTitle');

  document.querySelectorAll('#attireBtns .sim-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#attireBtns .sim-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const bg = btn.dataset.bg;
      simAttireBg.className = `sim-attire-bg ${bg}-bg`;
      simAttireTitle.textContent = btn.textContent;
    });
  });

  document.querySelectorAll('#modelSimBtns .sim-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#modelSimBtns .sim-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simWatchImg.src = btn.dataset.img;
      simWatchTitle.textContent = btn.dataset.title;
    });
  });

  // ==========================================
  // 9. VIP CONSULTATION & MODALS
  // ==========================================
  function openVipModal() {
    vipModal.classList.add('active');
  }

  if (vipBtn) vipBtn.addEventListener('click', openVipModal);
  if (openVipModalLink) openVipModalLink.addEventListener('click', (e) => { e.preventDefault(); openVipModal(); });
  closeVipBtn.addEventListener('click', () => vipModal.classList.remove('active'));

  vipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    vipModal.classList.remove('active');
    showToast('VIP Consultation Request Dispatched. Concierge will contact you within 2 hours.', 'success');
    vipForm.reset();
  });

  // ==========================================
  // 10. CHECKOUT FLOW
  // ==========================================
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = document.getElementById('checkoutOrderDetails');
    
    orderDetails.innerHTML = `
      <div><strong>Items Reserved:</strong> ${cart.length} Timepiece(s)</div>
      <div><strong>Total Amount:</strong> $${total.toLocaleString()}</div>
      <div><strong>Delivery Method:</strong> Insured Armored Courier Express</div>
      <div><strong>Order Reference:</strong> #WCH-${Math.floor(100000 + Math.random() * 900000)}</div>
    `;

    closeCartDrawer();
    checkoutModal.classList.add('active');
  });

  closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.remove('active'));
  finishCheckoutBtn.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
    cart = [];
    updateCartUI();
    showToast('Order Confirmed. Welcome to Watchify Circle.', 'success');
  });

  // Newsletter Form
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Welcome to the Watchify Private Circle.', 'success');
    document.getElementById('newsletterEmail').value = '';
  });

  // ==========================================
  // 11. TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'remove' ? 'toast-remove' : ''}`;
    toast.innerHTML = `
      <i class="${type === 'remove' ? 'fa-solid fa-circle-minus' : 'fa-solid fa-circle-check'}"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Initial Render
  renderProducts();
  updateCartUI();
});
